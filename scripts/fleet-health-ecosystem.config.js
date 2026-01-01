/**
 * ═══════════════════════════════════════════════════════════════
 * PM2 ECOSYSTEM - Fleet Health Monitor
 * ═══════════════════════════════════════════════════════════════
 *
 * Optional: Run the fleet health monitor as a PM2 service
 * for continuous monitoring with automatic restarts.
 *
 * Usage:
 *   pm2 start scripts/fleet-health-ecosystem.config.js
 *   pm2 logs fleet-health-monitor
 *   pm2 restart fleet-health-monitor
 *
 * Note: This is an alternative to Windows Task Scheduler.
 * Choose one scheduling method, not both.
 *
 * FOR THE KIDS - 60/30/10 IMMUTABLE
 * ═══════════════════════════════════════════════════════════════
 */

module.exports = {
  apps: [
    {
      name: 'fleet-health-monitor',
      script: './scripts/fleet-health-monitor.js',
      cwd: 'C:/AiCollabForTheKids',
      interpreter: 'node',
      args: '--save',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '200M',

      // Run every 15 minutes
      cron_restart: '*/15 * * * *',

      // Environment
      env: {
        NODE_ENV: 'production',
        FORCE_COLOR: '1'
      },

      // Logs
      error_file: 'C:/AiCollabForTheKids/logs/fleet-health/pm2-error.log',
      out_file: 'C:/AiCollabForTheKids/logs/fleet-health/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,

      // Restart settings
      min_uptime: '10s',
      max_restarts: 5,
      restart_delay: 5000,

      // Kill timeout
      kill_timeout: 10000,

      // Metadata
      instance_var: 'INSTANCE_ID',

      // Advanced
      listen_timeout: 10000,
      shutdown_with_message: true
    }
  ]
};
