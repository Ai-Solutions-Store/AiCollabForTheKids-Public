# Marketing Automation - Platform Quick Reference

**AI Solutions Store Marketing Scripts**

All scripts located in: `C:\AiCollabForTheKids\scripts\marketing\`

---

## Available Platforms

| Platform | Script | Status | Auth Method | Env Vars Required |
|----------|--------|--------|-------------|-------------------|
| **Twitter** | `ai-store-tweet.ps1` | ✅ LIVE | OAuth 1.0a | Hardcoded in script |
| **Discord** | `ai-store-discord.ps1` | ✅ LIVE | Webhook URL | DISCORD_WEBHOOK_URL |
| **Reddit** | `reddit-post.ps1` | ✅ READY | OAuth2 | REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET, REDDIT_USERNAME, REDDIT_PASSWORD |
| **LinkedIn** | `linkedin-post.ps1` | ✅ READY | OAuth 2.0 Bearer | LINKEDIN_ACCESS_TOKEN |
| **Bluesky** | `bluesky-post.ps1` | ✅ READY | App Password | BLUESKY_HANDLE, BLUESKY_APP_PASSWORD |
| **Email** | `email-blast.ps1` | ⏸️ PENDING | SendGrid | SENDGRID_API_KEY, SENDGRID_SENDER |

---

## Quick Start Commands

### Twitter (AI Store)
```powershell
.\ai-store-tweet.ps1
```
- No env vars needed (credentials hardcoded)
- Posts immediately
- Logs to: `logs/twitter-marketing.log`

### Discord
```powershell
.\ai-store-discord.ps1
```
- Requires: `DISCORD_WEBHOOK_URL`
- Posts to configured webhook
- Logs to: `logs/discord-marketing.log`

### Reddit
```powershell
.\reddit-post.ps1 -Subreddit "SideProject" -Product "claude-droid" [-DryRun]
```
- Requires: Reddit API credentials (4 env vars)
- Target subreddits: SideProject, EntrepreneurRideAlong, Startup_Ideas, SaaS
- Logs to: `logs/reddit-marketing.log`
- **README**: `README-REDDIT-POST.md` (if exists)

### LinkedIn
```powershell
.\linkedin-post.ps1 [-ProductIndex 1-6] [-DryRun]
```
- Requires: `LINKEDIN_ACCESS_TOKEN`
- Auto-rotates by day of month
- Logs to: `logs/linkedin-marketing.log`
- **README**: `README-LINKEDIN-POST.md`

### Bluesky
```powershell
.\bluesky-post.ps1 [-Product "product-name"] [-DryRun]
```
- Requires: `BLUESKY_HANDLE`, `BLUESKY_APP_PASSWORD`
- Auto-rotates by day of month
- Logs to: `logs/bluesky-marketing.log`
- **README**: `README-BLUESKY-POST.md`

---

## Product Names (for scripts)

Use these exact strings for `-Product` parameter:

- `claude-droid` - AI video generator ($299)
- `income-droid` - Video monetization automation ($499)
- `marketing-engine` - Social media automation ($199)
- `jules-ai` - Business AI assistant ($399)
- `affiliate-system` - White-label affiliate platform ($599)
- `dating-platform` - Human-verified dating app ($2,499)

---

## Setup Credentials

### Bluesky (New!)

1. Log into Bluesky (app or https://bsky.app)
2. Settings > App Passwords
3. Click "Add App Password"
4. Name it (e.g., "AI Store Bot")
5. Copy password (shown once only)
6. Set environment variables:

**PowerShell:**
```powershell
$env:BLUESKY_HANDLE = "yourusername.bsky.social"
$env:BLUESKY_APP_PASSWORD = "abcd-1234-efgh-5678"
```

**System Environment Variables (Permanent):**
```powershell
[Environment]::SetEnvironmentVariable("BLUESKY_HANDLE", "yourusername.bsky.social", "User")
[Environment]::SetEnvironmentVariable("BLUESKY_APP_PASSWORD", "your-app-password", "User")
```

### LinkedIn

1. Create LinkedIn App at https://www.linkedin.com/developers/apps
2. Request access to "Sign In with LinkedIn" and "Share on LinkedIn" products
3. Get OAuth 2.0 access token (see README-LINKEDIN-POST.md)
4. Set environment variable:

```powershell
$env:LINKEDIN_ACCESS_TOKEN = "your-token-here"
```

### Reddit

1. Create Reddit App at https://www.reddit.com/prefs/apps
2. Choose "script" type
3. Get client ID and secret
4. Set environment variables:

```powershell
$env:REDDIT_CLIENT_ID = "your-client-id"
$env:REDDIT_CLIENT_SECRET = "your-client-secret"
$env:REDDIT_USERNAME = "your-reddit-username"
$env:REDDIT_PASSWORD = "your-reddit-password"
```

---

## Automation Integration

### 24/7 Marketing Runner (PM2)

Currently running on **Sabertooth** (192.168.0.104):

**File:** `scripts/marketing/marketing-runner.cjs`

**Active platforms:**
- Twitter AI Store (every 4 hours)
- Discord (every 6 hours)
- Reddit via Devvit (every 8 hours)
- Twitter variants (8-12 hour cycles)

**To add Bluesky/LinkedIn:**

Edit `marketing-runner.cjs` and add task:

```javascript
{
  name: 'bluesky-ai-store',
  interval: 8, // hours
  command: 'powershell',
  args: [
    '-ExecutionPolicy', 'Bypass',
    '-File', 'C:\\AiCollabForTheKids\\scripts\\marketing\\bluesky-post.ps1'
  ],
  description: 'Post to Bluesky for AI Solutions Store'
}
```

Restart PM2:
```bash
pm2 restart marketing-24-7
```

### Windows Task Scheduler

For scheduled posts at specific times:

1. Open Task Scheduler
2. Create New Task
3. Set Trigger (e.g., Daily at 10 AM)
4. Set Action:
   - Program: `powershell.exe`
   - Arguments: `-ExecutionPolicy Bypass -File "C:\AiCollabForTheKids\scripts\marketing\bluesky-post.ps1"`
   - Start in: `C:\AiCollabForTheKids\scripts\marketing`
5. Save and test

---

## Posting Frequency Best Practices

| Platform | Recommended Frequency | Notes |
|----------|----------------------|-------|
| Twitter | 3-5x daily | High volume acceptable |
| Discord | 1-2x daily | Community-focused |
| Reddit | 1x per week per subreddit | 10:1 ratio rule |
| LinkedIn | 1-2x daily | Professional audience |
| Bluesky | 1-3x daily | Building presence |
| Email | 1x weekly | Subscriber-based |

---

## Logging

All scripts log to: `C:\AiCollabForTheKids\logs\`

**View recent logs:**

```powershell
# Bluesky
Get-Content C:\AiCollabForTheKids\logs\bluesky-marketing.log -Tail 20

# LinkedIn
Get-Content C:\AiCollabForTheKids\logs\linkedin-marketing.log -Tail 20

# Reddit
Get-Content C:\AiCollabForTheKids\logs\reddit-marketing.log -Tail 20

# Twitter
Get-Content C:\AiCollabForTheKids\logs\twitter-marketing.log -Tail 20

# Marketing Runner (all platforms)
Get-Content C:\AiCollabForTheKids\logs\marketing-runner.log -Tail 50
```

---

## Troubleshooting

### "Missing credentials" error

**Solution:** Set required environment variables (see Setup Credentials above)

### "Authentication failed"

**Causes:**
- Expired token (LinkedIn, Reddit)
- Wrong credentials (all platforms)
- Revoked app password (Bluesky)

**Solution:** Regenerate credentials and update env vars

### "Rate limit exceeded"

**Solution:** Reduce posting frequency, wait 1-2 hours

### "Post submission failed"

**Check:**
1. Platform service status
2. Network connectivity
3. Content length (Twitter 280 chars, Bluesky 300 chars)
4. API permissions/scopes

---

## Documentation

Detailed setup guides available for:

- **Bluesky**: `README-BLUESKY-POST.md`
- **LinkedIn**: `README-LINKEDIN-POST.md`
- **LinkedIn Variations**: `linkedin-post-variations.md`
- **Twitter**: `README-AI-STORE-TWEET.md`
- **Twitter Variations**: `ai-store-tweet-variations.md`

---

## Gospel Compliance

All marketing content is **Gospel V1.3 compliant**:

- **60%** of revenue → Verified Pediatric Charities
- **30%** → Infrastructure
- **10%** → Founder

Customer-facing sites do NOT display charity split (business focus).

Backend DAO silently enforces 60/30/10 split on all payments.

---

**FOR THE KIDS. ALWAYS.**
