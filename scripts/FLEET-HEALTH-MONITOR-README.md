# Fleet Health Monitoring System

**Gospel V1.3 - FOR THE KIDS (60/30/10 IMMUTABLE)**

## Overview

Automated health monitoring and alerting system for the FOR THE KIDS distributed fleet infrastructure.

## Monitored Nodes

| Node | IP | Role | Services |
|------|-----|------|----------|
| **Sabertooth** | 192.168.0.104 | Command Node | claude-droid, dashboard-dev |
| **T5500** | 192.168.0.101 | Compute Node | jules-api, dao-platform, gospel-ledger |
| **9020** | 192.168.0.103 | DAO Tribute Node | shriners-tribute |
| **EC2** | 3.84.226.108 | Cloud Node | api-public |

## Health Checks

### 1. Connectivity
- Ping test to verify node is reachable
- Latency measurement
- Critical alert if unreachable

### 2. Health Endpoints
- HTTP health check on configured endpoints
- Response time monitoring
- Alert if response time > 5 seconds
- Critical alert if endpoint is down

### 3. PM2 Service Status
- Verifies all configured services are running
- Checks service status (online/stopped/errored)
- Monitors restart counts
- Alerts on service failures
- Warns on excessive restarts (>10)

### 4. Resource Usage
- CPU usage monitoring (alert if > 90%)
- Memory usage monitoring (alert if > 85%)
- Disk usage monitoring (alert if > 90%)
- Linux nodes only (Windows support pending)

## Alert Channels

### Telegram (Critical Issues Only)
- Node unreachable
- Service down/crashed
- Configured via environment variables:
  - `TELEGRAM_BOT_TOKEN`
  - `TELEGRAM_CHAT_ID`

### Discord (All Alerts)
- Critical issues
- Errors
- Warnings (slow responses, high resource usage)
- Configured via environment variable:
  - `DISCORD_WEBHOOK_URL`

## Usage

### Manual Execution

```bash
# Check all nodes
node scripts/fleet-health-monitor.js

# Check specific node
node scripts/fleet-health-monitor.js --node=t5500

# JSON output
node scripts/fleet-health-monitor.js --json

# Save results to file
node scripts/fleet-health-monitor.js --save

# Critical issues only
node scripts/fleet-health-monitor.js --critical-only

# Help
node scripts/fleet-health-monitor.js --help
```

### PowerShell Wrapper

```powershell
# Run health check
.\scripts\RUN-FLEET-HEALTH-CHECK.ps1

# Check specific node
.\scripts\RUN-FLEET-HEALTH-CHECK.ps1 -Node t5500

# Save results
.\scripts\RUN-FLEET-HEALTH-CHECK.ps1 -SaveResults

# Silent mode (for scheduled tasks)
.\scripts\RUN-FLEET-HEALTH-CHECK.ps1 -SaveResults -Silent
```

### Automated Scheduling

**Setup (Run as Administrator):**

```powershell
# Create scheduled task (runs every 15 minutes)
.\scripts\SETUP-FLEET-HEALTH-SCHEDULER.ps1

# Custom interval (e.g., every 30 minutes)
.\scripts\SETUP-FLEET-HEALTH-SCHEDULER.ps1 -IntervalMinutes 30
```

**Management:**

```powershell
# Disable scheduled task
.\scripts\SETUP-FLEET-HEALTH-SCHEDULER.ps1 -Disable

# Enable scheduled task
.\scripts\SETUP-FLEET-HEALTH-SCHEDULER.ps1 -Enable

# Remove scheduled task
.\scripts\SETUP-FLEET-HEALTH-SCHEDULER.ps1 -Remove
```

## Configuration

### Environment Variables

Required for alerting:

```bash
# Telegram
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id

# Discord
DISCORD_WEBHOOK_URL=your_webhook_url
```

### Thresholds

Edit `scripts/fleet-health-monitor.js` to adjust:

```javascript
const THRESHOLDS = {
  cpu: 90,           // Alert if CPU > 90%
  memory: 85,        // Alert if Memory > 85%
  disk: 90,          // Alert if Disk > 90%
  responseTime: 5000 // Alert if response time > 5s
};
```

### Fleet Configuration

Add/modify nodes in `scripts/fleet-health-monitor.js`:

```javascript
const FLEET_CONFIG = {
  mynode: {
    name: 'My Node',
    ip: '192.168.0.100',
    role: 'Custom Role',
    os: 'Windows', // or 'Linux'
    user: 'username',
    sshAlias: 'mynode-alias',
    services: ['service1', 'service2'],
    healthEndpoint: 'http://192.168.0.100:3000/health',
    pm2Host: 'remote' // or 'local'
  }
};
```

## Output Examples

### Console Output

```
[INFO] Checking T5500 connectivity...
[SUCCESS] T5500 is reachable
[INFO] Checking T5500 health endpoint...
[SUCCESS] T5500 health endpoint OK
[INFO] Checking T5500 PM2 services...
[SUCCESS] T5500: Service "jules-api" is ONLINE
[SUCCESS] T5500: Service "dao-platform" is ONLINE
```

### JSON Output

```json
{
  "timestamp": "2025-12-14T10:30:00.000Z",
  "results": {
    "t5500": {
      "node": "t5500",
      "name": "T5500",
      "ip": "192.168.0.101",
      "role": "Compute Node",
      "checks": {
        "connectivity": {
          "alive": true,
          "latency": 15
        },
        "health": {
          "healthy": true,
          "responseTime": 234
        },
        "pm2": {
          "healthy": true,
          "services": {
            "jules-api": {
              "status": "online",
              "healthy": true,
              "restarts": 2,
              "uptime": "72h"
            }
          }
        }
      }
    }
  }
}
```

## Logs

Health check results and errors are saved to:

```
C:\AiCollabForTheKids\logs\fleet-health\
├── health-2025-12-14T10-30-00.json
├── health-2025-12-14T10-45-00.json
├── error-2025-12-14T11-00-00.log
└── scheduled-task.log
```

## SSH Configuration

The monitor uses SSH aliases defined in `~/.ssh/config`:

```
Host t5500
    HostName 192.168.0.101
    User t55o
    IdentityFile ~/.ssh/gospel_fleet_key

Host 9020
    HostName 192.168.0.103
    User joshl
    IdentityFile ~/.ssh/id_ed25519

Host ec2-gospel
    HostName 3.84.226.108
    User ec2-user
    IdentityFile ~/.ssh/dateapp.pem
```

Ensure SSH keys are properly configured before running remote checks.

## Alert Examples

### Telegram Alert

```
🚨 FLEET ALERT

T5500: Service jules-api is STOPPED!

Restarts: 15

FOR THE KIDS - 60/30/10 IMMUTABLE
```

### Discord Alert

```
🏥 Fleet Health Alert

T5500 has HIGH resource usage:

CPU: 95%
Memory: 88%

FOR THE KIDS - 60/30/10 IMMUTABLE
```

## Troubleshooting

### SSH Connection Failed

1. Verify SSH key exists: `ls ~/.ssh/gospel_fleet_key`
2. Test SSH manually: `ssh t5500 "echo test"`
3. Check SSH config: `cat ~/.ssh/config`

### PM2 Check Failed

1. Verify PM2 is installed on remote node
2. Test PM2 access: `ssh t5500 "pm2 jlist"`
3. Check service names in FLEET_CONFIG

### Health Endpoint Failed

1. Verify endpoint URL is correct
2. Test manually: `curl http://192.168.0.101:3000/health`
3. Check firewall rules

### No Alerts Received

1. Verify environment variables are set: `echo $TELEGRAM_BOT_TOKEN`
2. Test Telegram bot manually
3. Check Discord webhook URL
4. Review logs for error messages

## Integration with Other Systems

### PM2 Ecosystem

The health monitor integrates with PM2 services defined in `ecosystem.config.js`.

### Gospel Fleet Sync

Works in conjunction with `FLEET-SYNC.ps1` for fleet management.

### FLEET-STATUS.md

Health check results should be documented in `FLEET-STATUS.md` after major incidents.

## Roadmap

- [ ] Windows resource monitoring (CPU/Memory/Disk)
- [ ] Database health checks (PostgreSQL, Redis)
- [ ] API endpoint response time tracking
- [ ] Historical trend analysis
- [ ] Web dashboard for fleet status
- [ ] Slack integration
- [ ] Email alerts
- [ ] Auto-recovery actions (restart services)

## Support

For issues or questions:
- Check logs: `C:\AiCollabForTheKids\logs\fleet-health\`
- Review FLEET-STATUS.md for known issues
- Contact: joshlcoleman@gmail.com

---

**FOR THE KIDS - 60/30/10 IMMUTABLE**

Gospel V1.3 (Ethics Override)
