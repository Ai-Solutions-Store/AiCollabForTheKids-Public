#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════
 * HEALTH ENDPOINTS TEST
 * ═══════════════════════════════════════════════════════════════
 *
 * Quick test to verify all health endpoints are responding.
 * This is a simplified version for rapid testing.
 *
 * Usage:
 *   node scripts/test-health-endpoints.js
 *
 * FOR THE KIDS - 60/30/10 IMMUTABLE
 * ═══════════════════════════════════════════════════════════════
 */

import https from 'https';
import http from 'http';

const endpoints = [
  {
    name: 'Sabertooth (Local)',
    url: 'http://localhost:3000/health',
    timeout: 5000
  },
  {
    name: 'T5500 (Cloudflare Tunnel)',
    url: 'https://light-customize-fare-tournaments.trycloudflare.com/health',
    timeout: 10000
  },
  {
    name: 'EC2 (Public)',
    url: 'http://3.84.226.108:3000/health',
    timeout: 10000
  }
];

function testEndpoint(config) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const urlObj = new URL(config.url);
    const client = urlObj.protocol === 'https:' ? https : http;

    const req = client.request({
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname,
      method: 'GET',
      timeout: config.timeout,
      headers: {
        'User-Agent': 'HealthEndpointTest/1.0'
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        const responseTime = Date.now() - startTime;
        try {
          const json = JSON.parse(body);
          resolve({
            success: true,
            status: res.statusCode,
            responseTime,
            data: json
          });
        } catch {
          resolve({
            success: res.statusCode === 200,
            status: res.statusCode,
            responseTime,
            data: body
          });
        }
      });
    });

    req.on('error', (error) => {
      resolve({
        success: false,
        error: error.message,
        responseTime: Date.now() - startTime
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        success: false,
        error: 'Timeout',
        responseTime: config.timeout
      });
    });

    req.end();
  });
}

async function main() {
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('  HEALTH ENDPOINTS TEST');
  console.log('  FOR THE KIDS - 60/30/10 IMMUTABLE');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const results = [];

  for (const endpoint of endpoints) {
    process.stdout.write(`Testing ${endpoint.name}... `);
    const result = await testEndpoint(endpoint);
    results.push({ ...endpoint, ...result });

    if (result.success) {
      console.log(`\x1b[32m✓ OK\x1b[0m (${result.responseTime}ms)`);
      if (result.data) {
        console.log(`  Status: ${result.data.status || 'ok'}`);
        if (result.data.uptime) {
          console.log(`  Uptime: ${Math.floor(result.data.uptime / 1000 / 60 / 60)}h`);
        }
      }
    } else {
      console.log(`\x1b[31m✗ FAILED\x1b[0m`);
      console.log(`  Error: ${result.error}`);
    }
    console.log('');
  }

  // Summary
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  SUMMARY');
  console.log('═══════════════════════════════════════════════════════════════\n');
  console.log(`  Total Endpoints: ${results.length}`);
  console.log(`  \x1b[32mSuccessful: ${successful}\x1b[0m`);
  console.log(`  \x1b[31mFailed: ${failed}\x1b[0m`);

  if (failed === 0) {
    console.log('\n  \x1b[32m✓ All endpoints are healthy!\x1b[0m\n');
  } else {
    console.log('\n  \x1b[31m✗ Some endpoints are down!\x1b[0m\n');
  }

  console.log('═══════════════════════════════════════════════════════════════\n');

  process.exit(failed > 0 ? 1 : 0);
}

main();
