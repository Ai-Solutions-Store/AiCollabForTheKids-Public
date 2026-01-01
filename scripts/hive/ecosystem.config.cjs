// C:\AiCollabForTheKids\scripts\hive\ecosystem.config.cjs
// OPUS HIVE - PM2 ECOSYSTEM CONFIG v1.0.0
// FOR THE KIDS. ALWAYS.

module.exports = {
  apps: [
    {
      name: 'OPUS-HIVE',
      script: 'queen-bee.cjs',
      cwd: 'C:\\AiCollabForTheKids\\scripts\\hive',
      instances: 1,  // Queen manages her own workers via cluster
      autorestart: true,
      watch: false,
      max_memory_restart: '4G',
      env: {
        NODE_ENV: 'production'
      },
      error_file: 'C:\\AiCollabForTheKids\\logs\\hive-error.log',
      out_file: 'C:\\AiCollabForTheKids\\logs\\hive-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 10000
    }
  ]
};
