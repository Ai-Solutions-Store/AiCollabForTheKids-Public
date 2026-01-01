#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════
 * FLEET HEALTH MONITOR - Gospel V1.3
 * ═══════════════════════════════════════════════════════════════
 *
 * Monitors the FOR THE KIDS distributed fleet infrastructure:
 * - Sabertooth (192.168.0.104) - Main node
 * - T5500 (192.168.0.101) - Compute node
 * - 9020 (192.168.0.103) - Auxiliary
 * - EC2 (3.84.226.108) - Cloud
 *
 * Checks:
 * 1. Node connectivity (ping/SSH)
 * 2. PM2 service status
 * 3. Health endpoints (HTTP)
 * 4. Resource usage (CPU/Memory/Disk)
 * 5. Service-specific checks
 *
 * Alerts via:
 * - Telegram (critical issues)
 * - Discord (all alerts)
 * - Console logs
 *
 * Usage:
 *   node scripts/fleet-health-monitor.js
 *   node scripts/fleet-health-monitor.js --critical-only
 *   node scripts/fleet-health-monitor.js --node=t5500
 *   node scripts/fleet-health-monitor.js --json
 *
 * FOR THE KIDS - 60/30/10 IMMUTABLE
 * ═══════════════════════════════════════════════════════════════
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ═══════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════

const FLEET_CONFIG = {
  sabertooth: {
    name: 'Sabertooth',
    ip: '192.168.0.104',
    role: 'Command Node',
    os: 'Windows',
    local: true,
    services: ['claude-droid', 'dashboard-dev'],
    healthEndpoint: 'http://localhost:3000/health',
    pm2Host: 'local'
  },
  t5500: {
    name: 'T5500',
    ip: '192.168.0.101',
    role: 'Compute Node',
    os: 'Windows',
    user: 't55o',
    sshAlias: 't5500',
    services: ['jules-api', 'dao-platform', 'gospel-ledger'],
    healthEndpoint: 'https://light-customize-fare-tournaments.trycloudflare.com/health',
    pm2Host: 'remote'
  },
  node9020: {
    name: '9020',
    ip: '192.168.0.103',
    role: 'DAO Tribute Node',
    os: 'Windows',
    user: 'joshl',
    sshAlias: '9020',
    services: ['shriners-tribute'],
    healthEndpoint: null,
    pm2Host: 'remote'
  },
  ec2: {
    name: 'EC2',
    ip: '3.84.226.108',
    role: 'Cloud Node',
    os: 'Linux',
    user: 'ec2-user',
    sshAlias: 'ec2-gospel',
    services: ['api-public'],
    healthEndpoint: 'http://3.84.226.108:3000/health',
    pm2Host: 'remote'
  }
};

const ALERT_CONFIG = {
  telegram: {
    enabled: true,
    token: process.env.TELEGRAM_BOT_TOKEN || '',
    chatId: process.env.TELEGRAM_CHAT_ID || '',
    levels: ['critical', 'error']
  },
  discord: {
    enabled: true,
    webhook: process.env.DISCORD_WEBHOOK_URL || '',
    levels: ['critical', 'error', 'warning']
  }
};

const THRESHOLDS = {
  cpu: 90, // Alert if CPU > 90%
  memory: 85, // Alert if Memory > 85%
  disk: 90, // Alert if Disk > 90%
  responseTime: 5000 // Alert if response time > 5s
};

// ═══════════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════════

class Logger {
  constructor(jsonMode = false) {
    this.jsonMode = jsonMode;
    this.results = [];
  }

  log(level, message, data = {}) {
    const entry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...data
    };

    this.results.push(entry);

    if (!this.jsonMode) {
      const colors = {
        critical: '\x1b[41m\x1b[37m', // Red bg, white text
        error: '\x1b[31m',             // Red
        warning: '\x1b[33m',           // Yellow
        info: '\x1b[36m',              // Cyan
        success: '\x1b[32m',           // Green
        reset: '\x1b[0m'
      };

      const color = colors[level] || colors.info;
      console.log(`${color}[${level.toUpperCase()}] ${message}${colors.reset}`);
      if (Object.keys(data).length > 0) {
        console.log('  ', JSON.stringify(data, null, 2));
      }
    }
  }

  critical(message, data) { this.log('critical', message, data); }
  error(message, data) { this.log('error', message, data); }
  warning(message, data) { this.log('warning', message, data); }
  info(message, data) { this.log('info', message, data); }
  success(message, data) { this.log('success', message, data); }

  getResults() {
    return this.results;
  }

  printSummary() {
    if (this.jsonMode) {
      console.log(JSON.stringify(this.results, null, 2));
      return;
    }

    const critical = this.results.filter(r => r.level === 'critical').length;
    const errors = this.results.filter(r => r.level === 'error').length;
    const warnings = this.results.filter(r => r.level === 'warning').length;

    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('  FLEET HEALTH SUMMARY');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`  Critical Issues: ${critical}`);
    console.log(`  Errors: ${errors}`);
    console.log(`  Warnings: ${warnings}`);
    console.log(`  Total Checks: ${this.results.length}`);
    console.log('═══════════════════════════════════════════════════════════════\n');
  }
}

// ═══════════════════════════════════════════════════════════════
// ALERTING
// ═══════════════════════════════════════════════════════════════

async function sendTelegramAlert(message, level = 'info') {
  if (!ALERT_CONFIG.telegram.enabled || !ALERT_CONFIG.telegram.levels.includes(level)) {
    return;
  }

  const { token, chatId } = ALERT_CONFIG.telegram;
  if (!token || !chatId) return;

  const emoji = {
    critical: '🚨',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  }[level] || 'ℹ️';

  const text = `${emoji} *FLEET ALERT*\n\n${message}\n\n_FOR THE KIDS - 60/30/10 IMMUTABLE_`;

  try {
    await httpRequest({
      url: `https://api.telegram.org/bot${token}/sendMessage`,
      method: 'POST',
      data: {
        chat_id: chatId,
        text,
        parse_mode: 'Markdown'
      }
    });
  } catch (error) {
    console.error('Failed to send Telegram alert:', error.message);
  }
}

async function sendDiscordAlert(message, level = 'info') {
  if (!ALERT_CONFIG.discord.enabled || !ALERT_CONFIG.discord.levels.includes(level)) {
    return;
  }

  const { webhook } = ALERT_CONFIG.discord;
  if (!webhook) return;

  const colors = {
    critical: 0xFF0000, // Red
    error: 0xFF6B6B,    // Light red
    warning: 0xFFD93D,  // Yellow
    info: 0x6BCB77      // Green
  };

  try {
    await httpRequest({
      url: webhook,
      method: 'POST',
      data: {
        embeds: [{
          title: '🏥 Fleet Health Alert',
          description: message,
          color: colors[level] || colors.info,
          timestamp: new Date().toISOString(),
          footer: {
            text: 'FOR THE KIDS - 60/30/10 IMMUTABLE'
          }
        }]
      }
    });
  } catch (error) {
    console.error('Failed to send Discord alert:', error.message);
  }
}

// ═══════════════════════════════════════════════════════════════
// HEALTH CHECKS
// ═══════════════════════════════════════════════════════════════

async function httpRequest({ url, method = 'GET', data = null, timeout = 10000 }) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const client = urlObj.protocol === 'https:' ? https : http;

    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname + urlObj.search,
      method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'FleetHealthMonitor/1.0'
      },
      timeout
    };

    const req = client.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          resolve({ status: res.statusCode, data: json });
        } catch {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function checkNodeConnectivity(nodeKey, config, logger) {
  logger.info(`Checking ${config.name} connectivity...`, { node: nodeKey, ip: config.ip });

  if (config.local) {
    logger.success(`${config.name} is local node`, { node: nodeKey });
    return { alive: true, latency: 0 };
  }

  try {
    const startTime = Date.now();
    const pingCmd = process.platform === 'win32'
      ? `ping -n 1 -w 2000 ${config.ip}`
      : `ping -c 1 -W 2 ${config.ip}`;

    const { stdout } = await execAsync(pingCmd);
    const latency = Date.now() - startTime;

    if (stdout.includes('TTL=') || stdout.includes('ttl=')) {
      logger.success(`${config.name} is reachable`, { node: nodeKey, latency: `${latency}ms` });
      return { alive: true, latency };
    }

    throw new Error('Ping failed');
  } catch (error) {
    logger.critical(`${config.name} is UNREACHABLE`, { node: nodeKey, error: error.message });
    await sendTelegramAlert(`🚨 *${config.name}* is UNREACHABLE!\n\nIP: ${config.ip}\nRole: ${config.role}`, 'critical');
    await sendDiscordAlert(`**${config.name}** (${config.ip}) is UNREACHABLE!\n\nRole: ${config.role}`, 'critical');
    return { alive: false, latency: null, error: error.message };
  }
}

async function checkHealthEndpoint(nodeKey, config, logger) {
  if (!config.healthEndpoint) {
    logger.info(`${config.name} has no health endpoint configured`, { node: nodeKey });
    return { healthy: null, reason: 'No endpoint configured' };
  }

  logger.info(`Checking ${config.name} health endpoint...`, { node: nodeKey, url: config.healthEndpoint });

  try {
    const startTime = Date.now();
    const result = await httpRequest({ url: config.healthEndpoint, timeout: 10000 });
    const responseTime = Date.now() - startTime;

    if (result.status === 200) {
      if (responseTime > THRESHOLDS.responseTime) {
        logger.warning(`${config.name} health endpoint SLOW`, {
          node: nodeKey,
          responseTime: `${responseTime}ms`,
          threshold: `${THRESHOLDS.responseTime}ms`
        });
        await sendDiscordAlert(`**${config.name}** health endpoint is slow (${responseTime}ms)`, 'warning');
      } else {
        logger.success(`${config.name} health endpoint OK`, {
          node: nodeKey,
          responseTime: `${responseTime}ms`,
          status: result.data?.status || 'ok'
        });
      }
      return { healthy: true, responseTime, data: result.data };
    }

    throw new Error(`HTTP ${result.status}`);
  } catch (error) {
    logger.error(`${config.name} health endpoint FAILED`, { node: nodeKey, error: error.message });
    await sendDiscordAlert(`**${config.name}** health endpoint is DOWN!\n\nError: ${error.message}`, 'error');
    return { healthy: false, error: error.message };
  }
}

async function checkPM2Services(nodeKey, config, logger) {
  logger.info(`Checking ${config.name} PM2 services...`, { node: nodeKey });

  try {
    let cmd;
    if (config.local) {
      cmd = 'pm2 jlist';
    } else {
      cmd = `ssh ${config.sshAlias} "pm2 jlist"`;
    }

    const { stdout } = await execAsync(cmd, { timeout: 15000 });
    const processes = JSON.parse(stdout);

    const serviceStatus = {};
    let allHealthy = true;

    for (const serviceName of config.services) {
      const proc = processes.find(p => p.name === serviceName);

      if (!proc) {
        serviceStatus[serviceName] = { status: 'NOT_FOUND', healthy: false };
        allHealthy = false;
        logger.error(`${config.name}: Service "${serviceName}" NOT FOUND`, { node: nodeKey });
        await sendDiscordAlert(`**${config.name}**: Service **${serviceName}** is NOT FOUND in PM2!`, 'error');
      } else if (proc.pm2_env.status !== 'online') {
        serviceStatus[serviceName] = {
          status: proc.pm2_env.status,
          healthy: false,
          restarts: proc.pm2_env.restart_time,
          uptime: proc.pm2_env.pm_uptime
        };
        allHealthy = false;
        logger.critical(`${config.name}: Service "${serviceName}" is ${proc.pm2_env.status.toUpperCase()}`, {
          node: nodeKey,
          restarts: proc.pm2_env.restart_time
        });
        await sendTelegramAlert(
          `🚨 *${config.name}*: Service *${serviceName}* is ${proc.pm2_env.status.toUpperCase()}!\n\nRestarts: ${proc.pm2_env.restart_time}`,
          'critical'
        );
        await sendDiscordAlert(
          `**${config.name}**: Service **${serviceName}** is ${proc.pm2_env.status.toUpperCase()}!\n\nRestarts: ${proc.pm2_env.restart_time}`,
          'critical'
        );
      } else {
        const uptimeMs = Date.now() - proc.pm2_env.pm_uptime;
        const uptimeHours = Math.floor(uptimeMs / 1000 / 60 / 60);

        serviceStatus[serviceName] = {
          status: 'online',
          healthy: true,
          restarts: proc.pm2_env.restart_time,
          uptime: `${uptimeHours}h`,
          memory: proc.monit.memory,
          cpu: proc.monit.cpu
        };

        // Check for excessive restarts
        if (proc.pm2_env.restart_time > 10) {
          logger.warning(`${config.name}: Service "${serviceName}" has ${proc.pm2_env.restart_time} restarts`, {
            node: nodeKey
          });
          await sendDiscordAlert(
            `**${config.name}**: Service **${serviceName}** has ${proc.pm2_env.restart_time} restarts (may be unstable)`,
            'warning'
          );
        } else {
          logger.success(`${config.name}: Service "${serviceName}" is ONLINE`, {
            node: nodeKey,
            uptime: `${uptimeHours}h`,
            restarts: proc.pm2_env.restart_time
          });
        }
      }
    }

    return { healthy: allHealthy, services: serviceStatus };
  } catch (error) {
    logger.error(`${config.name} PM2 check FAILED`, { node: nodeKey, error: error.message });
    await sendDiscordAlert(`**${config.name}**: PM2 check FAILED!\n\nError: ${error.message}`, 'error');
    return { healthy: false, error: error.message };
  }
}

async function checkNodeResources(nodeKey, config, logger) {
  if (config.local) {
    // Skip resource check for local node (would need platform-specific commands)
    logger.info(`${config.name} resource check skipped (local node)`, { node: nodeKey });
    return { checked: false, reason: 'Local node' };
  }

  logger.info(`Checking ${config.name} resources...`, { node: nodeKey });

  try {
    let cmd;
    if (config.os === 'Windows') {
      // Windows resource check is complex, skip for now
      logger.info(`${config.name} resource check skipped (Windows)`, { node: nodeKey });
      return { checked: false, reason: 'Windows resource monitoring not implemented' };
    } else {
      // Linux resource check
      cmd = `ssh ${config.sshAlias} "free -m | grep Mem | awk '{print \\$3,\\$2}' && df -h / | tail -1 | awk '{print \\$5}' && top -bn1 | grep 'Cpu(s)' | sed 's/.*, *\\([0-9.]*\\)%* id.*/\\1/'"`;
    }

    const { stdout } = await execAsync(cmd, { timeout: 15000 });
    const lines = stdout.trim().split('\n');

    // Parse memory (used total)
    const [memUsed, memTotal] = lines[0].split(' ').map(Number);
    const memPercent = Math.round((memUsed / memTotal) * 100);

    // Parse disk (e.g., "85%")
    const diskPercent = parseInt(lines[1].replace('%', ''));

    // Parse CPU idle and convert to used
    const cpuIdle = parseFloat(lines[2]);
    const cpuPercent = Math.round(100 - cpuIdle);

    const resources = {
      cpu: cpuPercent,
      memory: memPercent,
      disk: diskPercent
    };

    // Check thresholds
    const alerts = [];
    if (cpuPercent > THRESHOLDS.cpu) {
      alerts.push(`CPU: ${cpuPercent}%`);
      logger.warning(`${config.name} HIGH CPU usage`, { node: nodeKey, cpu: `${cpuPercent}%` });
    }
    if (memPercent > THRESHOLDS.memory) {
      alerts.push(`Memory: ${memPercent}%`);
      logger.warning(`${config.name} HIGH MEMORY usage`, { node: nodeKey, memory: `${memPercent}%` });
    }
    if (diskPercent > THRESHOLDS.disk) {
      alerts.push(`Disk: ${diskPercent}%`);
      logger.warning(`${config.name} HIGH DISK usage`, { node: nodeKey, disk: `${diskPercent}%` });
    }

    if (alerts.length > 0) {
      await sendDiscordAlert(
        `**${config.name}** has HIGH resource usage:\n\n${alerts.join('\n')}`,
        'warning'
      );
    } else {
      logger.success(`${config.name} resources OK`, { node: nodeKey, ...resources });
    }

    return { checked: true, ...resources };
  } catch (error) {
    logger.error(`${config.name} resource check FAILED`, { node: nodeKey, error: error.message });
    return { checked: false, error: error.message };
  }
}

// ═══════════════════════════════════════════════════════════════
// MAIN MONITOR
// ═══════════════════════════════════════════════════════════════

async function monitorNode(nodeKey, config, logger) {
  logger.info(`\n${'═'.repeat(65)}`);
  logger.info(`  Monitoring ${config.name} (${config.role})`);
  logger.info(`${'═'.repeat(65)}`);

  const results = {
    node: nodeKey,
    name: config.name,
    ip: config.ip,
    role: config.role,
    timestamp: new Date().toISOString(),
    checks: {}
  };

  // 1. Connectivity
  results.checks.connectivity = await checkNodeConnectivity(nodeKey, config, logger);

  // If node is unreachable, skip other checks
  if (!results.checks.connectivity.alive) {
    logger.warning(`Skipping further checks for ${config.name} (unreachable)`);
    return results;
  }

  // 2. Health endpoint
  results.checks.health = await checkHealthEndpoint(nodeKey, config, logger);

  // 3. PM2 services
  if (config.services.length > 0) {
    results.checks.pm2 = await checkPM2Services(nodeKey, config, logger);
  }

  // 4. Resources
  results.checks.resources = await checkNodeResources(nodeKey, config, logger);

  return results;
}

async function monitorFleet(options = {}) {
  const logger = new Logger(options.json);

  logger.info('═══════════════════════════════════════════════════════════════');
  logger.info('  FLEET HEALTH MONITOR - Gospel V1.3');
  logger.info('  FOR THE KIDS - 60/30/10 IMMUTABLE');
  logger.info('═══════════════════════════════════════════════════════════════');
  logger.info(`Started at: ${new Date().toISOString()}`);

  const fleetResults = {};

  // Determine which nodes to check
  const nodesToCheck = options.node
    ? [options.node]
    : Object.keys(FLEET_CONFIG);

  // Run checks
  for (const nodeKey of nodesToCheck) {
    const config = FLEET_CONFIG[nodeKey];
    if (!config) {
      logger.error(`Unknown node: ${nodeKey}`);
      continue;
    }

    try {
      fleetResults[nodeKey] = await monitorNode(nodeKey, config, logger);
    } catch (error) {
      logger.critical(`Failed to monitor ${config.name}`, { node: nodeKey, error: error.message });
      fleetResults[nodeKey] = {
        node: nodeKey,
        name: config.name,
        error: error.message
      };
    }
  }

  // Print summary
  logger.printSummary();

  // Save results to file if requested
  if (options.saveResults) {
    const resultsDir = join(__dirname, '..', 'logs', 'fleet-health');
    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const resultsFile = join(resultsDir, `health-${timestamp}.json`);

    fs.writeFileSync(resultsFile, JSON.stringify({
      timestamp: new Date().toISOString(),
      results: fleetResults,
      logs: logger.getResults()
    }, null, 2));

    logger.info(`Results saved to: ${resultsFile}`);
  }

  return {
    success: logger.getResults().filter(r => r.level === 'critical').length === 0,
    results: fleetResults,
    logs: logger.getResults()
  };
}

// ═══════════════════════════════════════════════════════════════
// CLI
// ═══════════════════════════════════════════════════════════════

async function main() {
  const args = process.argv.slice(2);
  const options = {
    json: args.includes('--json'),
    criticalOnly: args.includes('--critical-only'),
    saveResults: args.includes('--save'),
    node: null
  };

  // Parse --node=<name>
  const nodeArg = args.find(arg => arg.startsWith('--node='));
  if (nodeArg) {
    options.node = nodeArg.split('=')[1];
  }

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
FLEET HEALTH MONITOR - Gospel V1.3

Usage:
  node scripts/fleet-health-monitor.js [options]

Options:
  --node=<name>       Monitor specific node (sabertooth, t5500, node9020, ec2)
  --json              Output results as JSON
  --critical-only     Only log critical issues
  --save              Save results to logs/fleet-health/
  --help, -h          Show this help

Examples:
  node scripts/fleet-health-monitor.js
  node scripts/fleet-health-monitor.js --node=t5500
  node scripts/fleet-health-monitor.js --json --save
  node scripts/fleet-health-monitor.js --critical-only

FOR THE KIDS - 60/30/10 IMMUTABLE
    `);
    process.exit(0);
  }

  try {
    const result = await monitorFleet(options);
    process.exit(result.success ? 0 : 1);
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { monitorFleet, FLEET_CONFIG, THRESHOLDS };
