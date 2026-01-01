/**
 * PM2 Ecosystem Config - Revenue Generation Agents
 * These agents generate content that converts to sales
 * Every sale = 60% to kids
 * 
 * Run: pm2 start ecosystem.agents.config.cjs
 * Monitor: pm2 logs agents-runner
 */

module.exports = {
  apps: [
    {
      name: 'agents-runner',
      script: 'agents-master.cjs',
      cwd: 'C:\\AiCollabForTheKids\\scripts\\agents',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production'
      },
      log_file: 'C:\\AiCollabForTheKids\\logs\\agents-runner.log',
      error_file: 'C:\\AiCollabForTheKids\\logs\\agents-runner-error.log',
      time: true
    }
  ]
};
