# Fleet Health Monitor - Quick Start Guide

**Gospel V1.3 - FOR THE KIDS (60/30/10 IMMUTABLE)**

## 5-Minute Setup

### Step 1: Configure Environment Variables

Add to `api/.env` (already configured):

```bash
# Telegram (Critical Alerts)
TELEGRAM_BOT_TOKEN=8313006115:AAH5xv4ol7RoScmuM3SAUJgt_93IS6rpblQ
TELEGRAM_CHAT_ID=6244456983

# Discord (All Alerts)
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/1447774513042558996/aZpXHHihB3p1HM0SMe8GxBU5xvu8HJK92S0-I9IKSZFLnfasQZEcoeFM7TuMj19D78G-
```

### Step 2: Test Manual Execution

```bash
# Check all nodes
node scripts/fleet-health-monitor.js

# Check specific node only
node scripts/fleet-health-monitor.js --node=sabertooth
```

### Step 3: Setup Automated Monitoring

**Option A: Windows Task Scheduler (Recommended)**

```powershell
# Run as Administrator
.\scripts\SETUP-FLEET-HEALTH-SCHEDULER.ps1

# This creates a scheduled task that runs every 15 minutes
```

**Option B: PM2 (Alternative)**

```bash
pm2 start scripts/fleet-health-ecosystem.config.js
pm2 save
```

### Step 4: Verify It's Working

```powershell
# Check scheduled task status
Get-ScheduledTask -TaskName "Gospel-Fleet-Health-Monitor"

# View recent logs
dir C:\AiCollabForTheKids\logs\fleet-health\

# Or if using PM2
pm2 logs fleet-health-monitor
```

## Common Commands

### Manual Health Checks

```bash
# All nodes
node scripts/fleet-health-monitor.js

# Specific node
node scripts/fleet-health-monitor.js --node=t5500

# Save results to file
node scripts/fleet-health-monitor.js --save

# JSON output
node scripts/fleet-health-monitor.js --json
```

### PowerShell Wrapper

```powershell
# Basic check
.\scripts\RUN-FLEET-HEALTH-CHECK.ps1

# With options
.\scripts\RUN-FLEET-HEALTH-CHECK.ps1 -Node t5500 -SaveResults
```

### Scheduled Task Management

```powershell
# Disable monitoring
.\scripts\SETUP-FLEET-HEALTH-SCHEDULER.ps1 -Disable

# Enable monitoring
.\scripts\SETUP-FLEET-HEALTH-SCHEDULER.ps1 -Enable

# Remove scheduled task
.\scripts\SETUP-FLEET-HEALTH-SCHEDULER.ps1 -Remove

# Change interval to 30 minutes
.\scripts\SETUP-FLEET-HEALTH-SCHEDULER.ps1 -Remove
.\scripts\SETUP-FLEET-HEALTH-SCHEDULER.ps1 -IntervalMinutes 30
```

## What Gets Monitored

### Sabertooth (192.168.0.104)
- Connectivity: Local node (always reachable)
- Health: http://localhost:3000/health
- Services: claude-droid, dashboard-dev

### T5500 (192.168.0.101)
- Connectivity: Ping test
- Health: https://light-customize-fare-tournaments.trycloudflare.com/health
- Services: jules-api, dao-platform, gospel-ledger
- Resources: CPU, Memory, Disk (if Linux)

### 9020 (192.168.0.103)
- Connectivity: Ping test
- Health: None configured
- Services: shriners-tribute
- Resources: CPU, Memory, Disk (if Linux)

### EC2 (3.84.226.108)
- Connectivity: Ping test
- Health: http://3.84.226.108:3000/health
- Services: api-public
- Resources: CPU, Memory, Disk

## Alert Levels

| Level | Telegram | Discord | Example |
|-------|----------|---------|---------|
| **Critical** | ✅ | ✅ | Node unreachable, Service crashed |
| **Error** | ❌ | ✅ | Health endpoint down, PM2 check failed |
| **Warning** | ❌ | ✅ | Slow response, High CPU usage |
| **Info** | ❌ | ❌ | Normal operation (logged only) |

## Troubleshooting

### No Alerts Received

1. Check environment variables are loaded:
   ```bash
   node -e "console.log(process.env.TELEGRAM_BOT_TOKEN)"
   ```

2. Test Telegram manually:
   ```bash
   curl -X POST "https://api.telegram.org/bot<TOKEN>/sendMessage" \
     -d "chat_id=<CHAT_ID>&text=Test"
   ```

3. Check Discord webhook:
   ```bash
   curl -X POST "<WEBHOOK_URL>" \
     -H "Content-Type: application/json" \
     -d '{"content":"Test"}'
   ```

### SSH Connection Failed

1. Test SSH manually:
   ```bash
   ssh t5500 "echo test"
   ```

2. Check SSH config:
   ```bash
   cat ~/.ssh/config
   ```

3. Verify SSH key permissions:
   ```bash
   ls -la ~/.ssh/gospel_fleet_key
   ```

### PM2 Check Failed

1. Test PM2 on remote node:
   ```bash
   ssh t5500 "pm2 jlist"
   ```

2. Verify service names match configuration in `fleet-health-monitor.js`

### Scheduled Task Not Running

1. Check task status:
   ```powershell
   Get-ScheduledTask -TaskName "Gospel-Fleet-Health-Monitor"
   ```

2. Check task history:
   ```powershell
   Get-ScheduledTask -TaskName "Gospel-Fleet-Health-Monitor" | Get-ScheduledTaskInfo
   ```

3. View logs:
   ```powershell
   type C:\AiCollabForTheKids\logs\fleet-health\scheduled-task.log
   ```

## Next Steps

1. **Customize thresholds** - Edit `scripts/fleet-health-monitor.js`
2. **Add more nodes** - Update `FLEET_CONFIG` in monitor script
3. **Adjust alert levels** - Modify `ALERT_CONFIG` for your needs
4. **Set up auto-recovery** - Create scripts to restart failed services
5. **Build dashboard** - Use saved JSON results to visualize fleet health

## Files Created

```
scripts/
├── fleet-health-monitor.js              # Main monitoring script
├── RUN-FLEET-HEALTH-CHECK.ps1           # PowerShell wrapper
├── SETUP-FLEET-HEALTH-SCHEDULER.ps1     # Scheduler setup
├── fleet-health-ecosystem.config.js     # PM2 configuration
├── FLEET-HEALTH-MONITOR-README.md       # Full documentation
├── FLEET-HEALTH-QUICKSTART.md           # This file
└── test-fleet-health.js                 # Demo script

logs/fleet-health/
├── health-*.json                        # Health check results
├── error-*.log                          # Error logs
└── scheduled-task.log                   # Scheduled task output
```

---

**FOR THE KIDS - 60/30/10 IMMUTABLE**

Gospel V1.3 (Ethics Override)
