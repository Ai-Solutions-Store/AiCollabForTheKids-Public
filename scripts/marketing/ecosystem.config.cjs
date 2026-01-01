// PM2 Ecosystem for 24/7 Marketing Engine
// Run: pm2 start ecosystem.config.js

module.exports = {
  apps: [
    {
      name: 'marketing-engine-sabertooth',
      script: 'powershell.exe',
      args: '-ExecutionPolicy Bypass -File C:\\AiCollabForTheKids\\scripts\\marketing\\24-7-marketing-engine.ps1',
      cwd: 'C:\\AiCollabForTheKids\\scripts\\marketing',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_NAME: 'SABERTOOTH',
        MARKETING_MODE: 'production'
      },
      log_file: 'C:\\AiCollabForTheKids\\logs\\pm2-marketing-engine.log',
      error_file: 'C:\\AiCollabForTheKids\\logs\\pm2-marketing-error.log',
      out_file: 'C:\\AiCollabForTheKids\\logs\\pm2-marketing-out.log',
      time: true
    },
    {
      name: 'twitter-scheduler',
      script: 'powershell.exe',
      args: '-ExecutionPolicy Bypass -Command "while($true) { & C:\\AiCollabForTheKids\\scripts\\marketing\\ai-store-tweet.ps1; Start-Sleep -Seconds 14400 }"',
      cwd: 'C:\\AiCollabForTheKids\\scripts\\marketing',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        SCHEDULE: '4h'
      }
    },
    {
      name: 'discord-scheduler',
      script: 'powershell.exe',
      args: '-ExecutionPolicy Bypass -Command "while($true) { & C:\\AiCollabForTheKids\\scripts\\marketing\\ai-store-discord.ps1; Start-Sleep -Seconds 21600 }"',
      cwd: 'C:\\AiCollabForTheKids\\scripts\\marketing',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        SCHEDULE: '6h'
      }
    }
  ]
};
