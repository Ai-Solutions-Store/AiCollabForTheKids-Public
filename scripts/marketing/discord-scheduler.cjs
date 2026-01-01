/**
 * DISCORD SCHEDULER
 * FOR THE KIDS - Automated Discord Promotions
 * 
 * Runs ai-store-discord.ps1 every 6 hours (21600 seconds)
 * Replaces unreliable PM2+PowerShell inline approach
 */

const { exec } = require('child_process');
const path = require('path');

const SCRIPT_PATH = path.join(__dirname, 'ai-store-discord.ps1');
const INTERVAL_MS = 6 * 60 * 60 * 1000; // 6 hours

function runDiscordPromo() {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] Running Discord promotion...`);
  
  exec(`powershell -ExecutionPolicy Bypass -File "${SCRIPT_PATH}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`[${timestamp}] ERROR: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`[${timestamp}] STDERR: ${stderr}`);
    }
    if (stdout) {
      console.log(`[${timestamp}] ${stdout.trim()}`);
    }
  });
}

// Run immediately on start
console.log('Discord Scheduler started. Interval: 6 hours');
console.log('Gospel v1.3 | 60/30/10 | FOR THE KIDS');
console.log('---');
runDiscordPromo();

// Then run every 6 hours
setInterval(runDiscordPromo, INTERVAL_MS);

// Keep alive
process.on('SIGINT', () => {
  console.log('Discord Scheduler shutting down...');
  process.exit(0);
});
