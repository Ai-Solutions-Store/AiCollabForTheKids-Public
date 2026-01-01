# Telegram Marketing - Quick Reference Card

**Fast commands for daily use**

## Setup (One-Time)

```powershell
# 1. Create bot via @BotFather on Telegram → Get token
# 2. Create channel → Add bot as admin with "Post Messages" permission
# 3. Set environment variables:

[System.Environment]::SetEnvironmentVariable("TELEGRAM_BOT_TOKEN", "your-token", "User")
[System.Environment]::SetEnvironmentVariable("TELEGRAM_CHANNEL_ID", "@your_channel", "User")
```

## Common Commands

```powershell
# Location
cd C:\AiCollabForTheKids\scripts\marketing

# Auto-post (rotates content daily)
.\telegram-post.ps1

# Preview before posting
.\telegram-post.ps1 -DryRun

# Specific content type
.\telegram-post.ps1 -ContentType "product"
.\telegram-post.ps1 -ContentType "tip"
.\telegram-post.ps1 -ContentType "deal"
.\telegram-post.ps1 -ContentType "announcement"

# Specific product
.\telegram-post.ps1 -ContentType "product" -ProductIndex 1  # Claude Droid
.\telegram-post.ps1 -ContentType "product" -ProductIndex 2  # Income Droid
.\telegram-post.ps1 -ContentType "product" -ProductIndex 3  # Marketing Engine
```

## Products

| Index | Product | Price |
|-------|---------|-------|
| 1 | Claude Droid | $299 |
| 2 | Income Droid | $499 |
| 3 | Marketing Engine | $199 |
| 4 | Jules AI | $399 |
| 5 | Affiliate System | $599 |
| 6 | Dating Platform | $2,499 |

## Troubleshooting

```powershell
# Check environment variables
$env:TELEGRAM_BOT_TOKEN
$env:TELEGRAM_CHANNEL_ID

# View recent logs
Get-Content C:\AiCollabForTheKids\logs\telegram-marketing.log -Tail 20

# Test bot connection
$token = $env:TELEGRAM_BOT_TOKEN
Invoke-RestMethod -Uri "https://api.telegram.org/bot$token/getMe"
```

## Common Errors

**"Bot token not set"**
→ `$env:TELEGRAM_BOT_TOKEN = "your-token"`

**"Chat not found"**
→ Add bot as admin to channel

**"Forbidden: bot is not a member"**
→ Enable "Post Messages" permission for bot

## Automation

**Add to marketing-runner.cjs:**

```javascript
// Telegram every 8 hours
cron.schedule('0 */8 * * *', () => {
  exec('powershell -ExecutionPolicy Bypass -File "C:\\AiCollabForTheKids\\scripts\\marketing\\telegram-post.ps1"',
    (error, stdout) => {
      if (error) console.error(`Telegram: ${error.message}`);
      else console.log(stdout);
    }
  );
});
```

**Restart PM2:**
```bash
pm2 restart marketing-24-7
```

## Files

| File | Purpose |
|------|---------|
| `telegram-post.ps1` | Main script |
| `README-TELEGRAM-POST.md` | Full documentation |
| `SETUP-TELEGRAM-BOT.md` | Setup walkthrough |
| `telegram-content-variations.md` | 30+ content templates |
| `logs/telegram-marketing.log` | Activity log |

## Resources

- **Bot Setup:** Talk to @BotFather on Telegram
- **API Docs:** https://core.telegram.org/bots/api
- **Script Help:** See README-TELEGRAM-POST.md
- **Content Ideas:** See telegram-content-variations.md

---

**FOR THE KIDS. ALWAYS.**
