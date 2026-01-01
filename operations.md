# Operations Reference

## ⚡ OPERATIONAL MODE: DECEMBER 2025

```
STATUS: ✅ PRODUCTION — THE MACHINE IS LIVE
MODE: REVENUE GENERATION (Not Building)
```

**We are OPERATING, not building.** All systems are live and processing.

## 🎯 BUSINESS FIRST DOCTRINE (CRITICAL)

**DO NOT market this as a charity platform.** Sell products on their merits.

### The Rule
| Context | Charity Mention |
|---------|-----------------|
| Marketing/Sales | **NEVER** |
| Product Pages | **NEVER** |
| Advertisements | **NEVER** |
| Receipt/Invoice | **YES** - "Thank You" breakdown |

### Receipt Format
```
Thank you for your purchase!
----------------------
Your purchase breakdown:
60% → Children's Medical Care
30% → Platform Infrastructure  
10% → Founder Operations
----------------------
You just helped a kid. No action needed.
```

### Why?
- Avoids "charity scam" skepticism
- Product sells on quality, not guilt
- More ruthless at business = more money for kids
- Gospel handles charity automatically

**Priority: REVENUE GENERATION. Every dollar = 60 cents to kids.**

## Daily Operations Checklist

### Starting Work on T5500
1. **Read FLEET-STATUS.md first** - `C:\AiCollabForTheKids\FLEET-STATUS.md`
2. **Confirm with "Gospel Aligned"** - This signals you've read current state
3. **Check pending tasks** - Listed in FLEET-STATUS.md
4. **Verify tunnel status** - Ensure Cloudflare tunnel is active
5. **Update FLEET-STATUS.md when done** - Document what was accomplished

### Starting Work on Sabertooth
1. Check PM2 status: `pm2 status`
2. Verify marketing engine running: `pm2 logs marketing-runner`
3. Check API health: curl https://api.aidoesitall.website/health

## Credentials Management

### Golden Rule
**Credentials live in `api/.env`** - This is the source of truth.

### Reading Credentials
1. Never hardcode credentials in code
2. Read from .env file at runtime
3. GitHub PAT in git remote is authoritative
4. If memory shows different tokens than .env, trust .env

### Updating Credentials
1. Update `api/.env` first
2. Update FLEET-STATUS.md to note the change
3. Update GitHub secrets if affected
4. Restart affected services

### Current Active Credentials (as of Dec 2025)
Located in api/.env:
- GitHub PAT (no expiration)
- Cloudflare API Token (expires Jul 31, 2026)
- Square Access Token (production)
- SendGrid API Key
- Telegram Bot Token
- Google Gemini API Key

## Deployment Workflows

### Deploying API Changes
```powershell
# On Sabertooth
cd C:\AiCollabForTheKids
git pull origin main
cd api
npm install
pm2 restart api-server
```

### Deploying Dashboard Changes
```powershell
cd C:\AiCollabForTheKids
git pull origin main
npm run build
pm2 restart dashboard
```

### Verifying Deployment
1. Check PM2: `pm2 status`
2. Check logs: `pm2 logs <service-name>`
3. Test endpoint: `curl https://api.aidoesitall.website/health`
4. Verify Square webhook: Check webhook logs in Square dashboard

## PM2 Service Management

### Common Commands (Windows PowerShell)
```powershell
pm2 status              # View all services
pm2 logs <name>         # View service logs
pm2 restart <name>      # Restart service
pm2 stop <name>         # Stop service
pm2 start <name>        # Start service
pm2 save                # Save current process list
```

### Active Services
- **marketing-runner** - 17-platform automated marketing
- **api-server** - Main API endpoint
- **dashboard** - Frontend dashboard

## Cloudflare Tunnel Management

### Tunnel: for-the-kids
**ID:** db46c9fd-4387-4ee3-86ad-ed0c80171bf6

### Checking Tunnel Status
```powershell
cloudflared tunnel info for-the-kids
```

### Restarting Tunnel
```powershell
cloudflared tunnel run for-the-kids
```

### Route Configuration
Managed via Cloudflare dashboard or CLI:
- aidoesitall.website → localhost:8081
- api.aidoesitall.website → localhost:3000
- youandinotai.com → localhost:9000

## Git Operations

### Standard Workflow
```powershell
git pull origin main
# Make changes
git add .
git commit -m "Description of changes"
git push origin main
```

### Repository Cleanup
Repository was recently cleaned from 1.5GB to 858MB. Avoid committing:
- node_modules/
- Large binary files
- Credentials or .env files

### GitHub Token
The PAT in git remote is authoritative. If push fails:
```powershell
git remote set-url origin https://ghp_TOKEN@github.com/Ai-Solutions-Store/AiCollabForTheKids.git
```

## Payment Processing

### Square Webhook Flow
1. Customer purchases via Square link
2. Square sends webhook to https://api.aidoesitall.website/api/ai-store-webhook
3. API processes payment, triggers delivery
4. 60/30/10 split executed via blockchain

### Testing Payments
1. Use $1 consultation link for testing
2. Check webhook logs: `pm2 logs api-server`
3. Verify delivery triggered
4. Confirm blockchain split executed

### Polling Workaround
Due to webhook limitations, payment polling is implemented as backup:
- Polls Square for recent payments
- Processes any missed webhook deliveries
- Runs every 5 minutes

## Marketing Automation

### 17-Platform Marketing Engine
Located: `scripts/marketing/marketing-runner.cjs`
Runs via PM2 on Sabertooth

### BUSINESS FIRST Marketing Rules
**NEVER include in marketing content:**
- "Portion of proceeds go to charity"
- "Buy this to help kids"
- "Charitable platform"
- Any guilt-based selling
- Charity statistics or impact claims

**ALWAYS focus on:**
- Product features and benefits
- User value proposition
- Competitive advantages
- Quality and reliability
- Testimonials (product-focused)

### Platforms Include:
- Dev.to
- Hashnode  
- Telegram
- (+ 14 others configured in script)

### Checking Marketing Status
```powershell
pm2 logs marketing-runner
```

## Troubleshooting

### API Not Responding
1. Check PM2: `pm2 status`
2. Check logs: `pm2 logs api-server`
3. Verify tunnel: `cloudflared tunnel info for-the-kids`
4. Restart: `pm2 restart api-server`

### Webhook Not Triggering
1. Check Square dashboard for webhook delivery status
2. Verify webhook URL in Square settings
3. Check API logs for incoming requests
4. Fallback: Payment polling will catch missed webhooks

### Tunnel Down
1. Check cloudflared process
2. Restart tunnel: `cloudflared tunnel run for-the-kids`
3. Verify DNS routing in Cloudflare dashboard

### Git Push Failing
1. Check PAT expiration (current PAT has no expiration)
2. Verify remote URL has correct token
3. Check network connectivity

## Documentation Updates

### After Any Work Session
1. Update FLEET-STATUS.md with:
   - What was done
   - Current tunnel status
   - Any pending tasks
   - Any issues encountered
2. Commit documentation changes
3. Push to main branch

### Weekly
1. Review LLC compliance status
2. Check domain renewals
3. Verify charitable escrow balance
4. Review payment processing reports
