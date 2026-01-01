/**
 * Revenue Generation Agents - PM2 Ecosystem Config
 * Runs all agents on schedule to generate conversion content
 * 
 * BUSINESS FIRST: These agents create content that converts
 * The 60/30/10 split happens automatically on every sale
 */

module.exports = {
  apps: [
    {
      name: 'email-drip-agent',
      script: 'C:\\AiCollabForTheKids\\scripts\\agents\\email-drip-agent.cjs',
      cron_restart: '0 6 * * 1',  // Weekly Monday 6 AM - refresh sequences
      autorestart: false,
      watch: false,
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'recovery-agent',
      script: 'C:\\AiCollabForTheKids\\scripts\\agents\\recovery-agent.cjs',
      cron_restart: '0 6 * * 1',  // Weekly Monday 6 AM
      autorestart: false,
      watch: false,
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'seo-landing-agent',
      script: 'C:\\AiCollabForTheKids\\scripts\\agents\\seo-landing-agent.cjs',
      cron_restart: '0 6 1 * *',  // Monthly 1st at 6 AM
      autorestart: false,
      watch: false,
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'upsell-agent',
      script: 'C:\\AiCollabForTheKids\\scripts\\agents\\upsell-agent.cjs',
      cron_restart: '0 6 * * 1',  // Weekly Monday 6 AM
      autorestart: false,
      watch: false,
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'affiliate-agent',
      script: 'C:\\AiCollabForTheKids\\scripts\\agents\\affiliate-agent.cjs',
      cron_restart: '0 6 * * 1',  // Weekly Monday 6 AM
      autorestart: false,
      watch: false,
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'social-proof-agent',
      script: 'C:\\AiCollabForTheKids\\scripts\\agents\\social-proof-agent.cjs',
      cron_restart: '0 6 * * 1',  // Weekly Monday 6 AM
      autorestart: false,
      watch: false,
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
