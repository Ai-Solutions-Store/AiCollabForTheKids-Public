# Dev.to Marketing - Quick Start Guide

**Get your first article published in 5 minutes.**

---

## Step 1: Get API Key (2 minutes)

1. Go to https://dev.to/settings/extensions
2. Scroll to "DEV Community API Keys"
3. Click "Generate API Key"
4. Description: `AI Solutions Marketing`
5. Copy the key (starts with `dev_`)

---

## Step 2: Set Environment Variable (1 minute)

**Windows PowerShell:**
```powershell
$env:DEV_TO_API_KEY = "dev_YOUR_KEY_HERE"
```

**Make it permanent:**
```powershell
[System.Environment]::SetEnvironmentVariable('DEV_TO_API_KEY', 'dev_YOUR_KEY_HERE', 'User')
```

**Verify it's set:**
```powershell
echo $env:DEV_TO_API_KEY
```

---

## Step 3: Post Your First Article (1 minute)

```bash
cd C:\AiCollabForTheKids
node scripts/marketing/devto-post.cjs
```

**Expected Output:**
```
[2025-12-21T10:30:00.000Z] ═══════════════════════════════════════════════════════════════
[2025-12-21T10:30:00.100Z] DEV.TO MARKETING AUTOMATION
[2025-12-21T10:30:00.200Z] AI Solutions Store - Technical Content Marketing
[2025-12-21T10:30:00.300Z] FOR THE KIDS - 60/30/10
[2025-12-21T10:30:00.400Z] ═══════════════════════════════════════════════════════════════
[2025-12-21T10:30:00.500Z] Publishing article: "Building a YouTube Automation System..."
[2025-12-21T10:30:00.600Z] Tags: ai, automation, youtube, nodejs
[2025-12-21T10:30:02.450Z] SUCCESS: Article published!
[2025-12-21T10:30:02.451Z] URL: https://dev.to/yourname/building-youtube-automation-system-slug
[2025-12-21T10:30:02.452Z] ID: 123456
[2025-12-21T10:30:02.453Z] Published at: 2025-12-21T10:30:02Z
```

---

## Step 4: Verify on Dev.to (1 minute)

1. Go to https://dev.to/dashboard
2. Click "Posts"
3. See your published article!

---

## Step 5: Set Up Automation (Optional)

**Post every 3 days automatically:**

```bash
pm2 start scripts/marketing/devto-post.cjs --name "devto-marketing" --cron "0 0 */3 * *"
pm2 save
```

**Check status:**
```bash
pm2 list
```

---

## What's Next?

### Engage with Your Article

1. **Within 1 hour:** Respond to first comments
2. **Within 24 hours:** Comment on related Dev.to articles
3. **Track analytics:** https://dev.to/dashboard

### Customize Content

Edit `scripts/marketing/devto-post.cjs`:
- Modify article templates
- Add new articles
- Adjust tags and descriptions

### Monitor Performance

**Check logs:**
```bash
tail -n 50 logs/devto-marketing.log
```

**View analytics:**
- Go to https://dev.to/dashboard
- Click "Posts"
- View: views, reactions, comments

---

## Troubleshooting

### "DEV_TO_API_KEY environment variable not set"

Run:
```powershell
$env:DEV_TO_API_KEY = "your_key_here"
```

### "API returned 401: Unauthorized"

Your API key is invalid. Regenerate at https://dev.to/settings/extensions

### "API returned 422: Unprocessable Entity"

Duplicate title detected. Dev.to prevents republishing the same article. Wait 24 hours or edit the title.

---

## Publishing Schedule

**Recommended:**
- Post every 3 days
- 4 articles in rotation
- Complete cycle: 12 days

**Optimal Times:**
- Monday 9:00 AM EST
- Wednesday 10:30 AM EST
- Thursday 2:00 PM EST

---

## Article Rotation

1. **Article 1:** YouTube Automation System (Claude Droid)
2. **Article 2:** Passive Income with AI (Income Droid)
3. **Article 3:** Marketing Automation Engine
4. **Article 4:** AI Tool Monetization (All Products)

Then cycles back to Article 1.

---

## Support

- **Logs:** `logs/devto-marketing.log`
- **README:** `scripts/marketing/README-DEVTO-POST.md`
- **Dev.to API:** https://developers.forem.com/api

---

**FOR THE KIDS. ALWAYS.**
