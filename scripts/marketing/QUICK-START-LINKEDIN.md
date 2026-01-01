# LinkedIn Marketing - Quick Start Guide

**Time to First Post:** 15 minutes
**Script:** `linkedin-post.ps1`
**Store:** https://ai-solutions.store

---

## 3 Steps to Start

### Step 1: Get LinkedIn API Token (10 minutes)

1. Go to https://www.linkedin.com/developers/apps
2. Click "Create app"
3. Fill in:
   - App name: "AI Solutions Store Marketing"
   - LinkedIn Page: (select your company page)
   - Privacy policy URL: https://ai-solutions.store/privacy
4. Click "Create app"
5. Go to "Products" tab
6. Request "Share on LinkedIn" product
7. Go to "Auth" tab
8. Generate access token with these scopes:
   - `w_member_social` (required for posting)
   - `r_basicprofile` (recommended)
9. Copy the token (looks like: `AQV...` long string)

### Step 2: Set Token (2 minutes)

**Option A: Quick Test (Session Only)**
```powershell
$env:LINKEDIN_ACCESS_TOKEN = "PASTE_YOUR_TOKEN_HERE"
```

**Option B: Permanent (Recommended)**

Add this line to `C:\AiCollabForTheKids\api\.env`:
```
LINKEDIN_ACCESS_TOKEN=PASTE_YOUR_TOKEN_HERE
```

Then load it:
```powershell
Get-Content "C:\AiCollabForTheKids\api\.env" | ForEach-Object {
    if ($_ -match '^LINKEDIN_ACCESS_TOKEN=(.+)$') {
        $env:LINKEDIN_ACCESS_TOKEN = $matches[1]
    }
}
```

### Step 3: Post to LinkedIn (1 minute)

```powershell
# Navigate to script directory
cd C:\AiCollabForTheKids\scripts\marketing

# Test with dry run (preview only)
.\linkedin-post.ps1 -DryRun

# Post to LinkedIn (live)
.\linkedin-post.ps1
```

**Done!** Check LinkedIn to see your post.

---

## Daily Usage

### Automatic Rotation

Just run this daily:
```powershell
.\linkedin-post.ps1
```

The script automatically rotates through 6 products based on day of month.

### Manual Product Selection

```powershell
.\linkedin-post.ps1 -ProductIndex 1  # Claude Droid ($299)
.\linkedin-post.ps1 -ProductIndex 2  # Income Droid ($499)
.\linkedin-post.ps1 -ProductIndex 3  # Marketing Engine ($199)
.\linkedin-post.ps1 -ProductIndex 4  # Jules AI ($399)
.\linkedin-post.ps1 -ProductIndex 5  # Affiliate System ($599)
.\linkedin-post.ps1 -ProductIndex 6  # Dating Platform ($2,499)
```

---

## Automate It (Optional)

### Windows Task Scheduler

Run this once:
```powershell
$action = New-ScheduledTaskAction -Execute "PowerShell.exe" `
    -Argument "-File C:\AiCollabForTheKids\scripts\marketing\linkedin-post.ps1"

$trigger = New-ScheduledTaskTrigger -Daily -At "9:00AM"

Register-ScheduledTask -TaskName "LinkedIn Marketing" `
    -Action $action -Trigger $trigger
```

Now posts automatically every day at 9 AM.

### Best Schedule

**Optimal Days:** Tuesday, Wednesday, Thursday
**Optimal Times:** 9-10 AM or 12-1 PM

To post only on optimal days:
```powershell
$trigger = New-ScheduledTaskTrigger -Weekly `
    -DaysOfWeek Tuesday,Wednesday,Thursday -At "9:00AM"
```

---

## Products Rotation

The script auto-rotates through these 6 products:

| Product | Price | Key Benefit |
|---------|-------|-------------|
| Claude Droid | $299 | AI video generation - replaces $8K/month agency |
| Income Droid | $499 | 4 daily revenue videos - 24/7 automation |
| Marketing Engine | $199 | Enterprise social presence - no overhead |
| Jules AI | $399 | Gemini AI business intelligence |
| Affiliate System | $599 | White-label platform - days not months |
| Dating Platform | $2,499 | Complete source code - own it, not rent it |

Each post includes:
- Problem statement
- Solution overview
- ROI comparison
- Real case study
- Call to action
- Relevant hashtags

---

## Check Results

### View Logs
```powershell
Get-Content C:\AiCollabForTheKids\logs\linkedin-marketing.log -Tail 20
```

### LinkedIn Analytics
1. Go to your post on LinkedIn
2. Click "View post analytics"
3. Track: Impressions, Clicks, Engagement

### Store Traffic
- Check Google Analytics for traffic from linkedin.com
- Monitor consultation bookings
- Track product sales

---

## Troubleshooting

**Token not working?**
- Verify it's set: `$env:LINKEDIN_ACCESS_TOKEN`
- Check app has "Share on LinkedIn" product approved
- Ensure `w_member_social` permission granted

**Post not appearing?**
- Check logs: `logs\linkedin-marketing.log`
- Verify you're looking at your personal profile feed
- LinkedIn may take a few minutes to show post

**Rate limit error?**
- LinkedIn has daily posting limits
- Reduce posting frequency
- Wait 24 hours before trying again

---

## What's Next?

1. Post first time manually to test
2. Monitor engagement for 2-3 days
3. Set up automation if results are good
4. Respond to comments within 2 hours
5. Track which products get best engagement
6. Adjust strategy based on data

---

## Full Documentation

For complete details, see:
- `README-LINKEDIN-POST.md` - Full setup guide
- `linkedin-post-variations.md` - Product templates
- `EXAMPLE-LINKEDIN-USAGE.ps1` - Usage examples
- `LINKEDIN-DEPLOYMENT-SUMMARY.md` - Overview

---

## Support

**Script Location:** `C:\AiCollabForTheKids\scripts\marketing\linkedin-post.ps1`
**Logs:** `C:\AiCollabForTheKids\logs\linkedin-marketing.log`
**Store:** https://ai-solutions.store
**LinkedIn API:** https://www.linkedin.com/developers/apps

---

**FOR THE KIDS. ALWAYS.**
