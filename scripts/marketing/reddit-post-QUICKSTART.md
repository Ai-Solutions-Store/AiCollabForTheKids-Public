# Reddit Marketing - Quick Start Guide

**Script:** `reddit-post.ps1`
**Purpose:** Post to Reddit with pre-written, value-first content

---

## 1. Setup (One-Time)

### Get Reddit API Credentials

1. Go to https://www.reddit.com/prefs/apps
2. Click "Create App"
3. Fill in:
   - Name: `AI Solutions Store Marketing`
   - Type: `script`
   - Redirect URI: `http://localhost:8080`
4. Click "Create app"
5. Save your credentials:
   - **Client ID:** Under "personal use script"
   - **Client Secret:** The "secret" field

### Set Environment Variables

```powershell
# Run these once (permanent)
[Environment]::SetEnvironmentVariable("REDDIT_CLIENT_ID", "YOUR_CLIENT_ID", "User")
[Environment]::SetEnvironmentVariable("REDDIT_CLIENT_SECRET", "YOUR_CLIENT_SECRET", "User")
[Environment]::SetEnvironmentVariable("REDDIT_USERNAME", "your_reddit_username", "User")
[Environment]::SetEnvironmentVariable("REDDIT_PASSWORD", "your_reddit_password", "User")
```

**Then restart PowerShell.**

---

## 2. Usage

### Test First (Recommended)

```powershell
cd C:\AiCollabForTheKids\scripts\marketing

# Preview what will be posted
.\reddit-post.ps1 -Subreddit "SideProject" -Product "claude-droid" -DryRun
```

### Post for Real

```powershell
# Remove -DryRun to actually post
.\reddit-post.ps1 -Subreddit "SideProject" -Product "claude-droid"
```

---

## 3. Available Combinations

### Claude Droid ($299 - AI Video Generator)
```powershell
.\reddit-post.ps1 -Subreddit "SideProject" -Product "claude-droid"
.\reddit-post.ps1 -Subreddit "EntrepreneurRideAlong" -Product "claude-droid"
```

### Income Droid ($499 - Video Monetization)
```powershell
.\reddit-post.ps1 -Subreddit "EntrepreneurRideAlong" -Product "income-droid"
.\reddit-post.ps1 -Subreddit "Startup_Ideas" -Product "income-droid"
```

### Marketing Engine ($199 - Social Media Automation)
```powershell
.\reddit-post.ps1 -Subreddit "SaaS" -Product "marketing-engine"
.\reddit-post.ps1 -Subreddit "EntrepreneurRideAlong" -Product "marketing-engine"
```

### Jules AI ($399 - Business AI Assistant)
```powershell
.\reddit-post.ps1 -Subreddit "SaaS" -Product "jules-ai"
.\reddit-post.ps1 -Subreddit "Startup_Ideas" -Product "jules-ai"
```

### Affiliate System ($599 - White-Label Platform)
```powershell
.\reddit-post.ps1 -Subreddit "SaaS" -Product "affiliate-system"
.\reddit-post.ps1 -Subreddit "EntrepreneurRideAlong" -Product "affiliate-system"
```

### Dating Platform ($2,499 - Full Source Code)
```powershell
.\reddit-post.ps1 -Subreddit "Startup_Ideas" -Product "dating-platform"
.\reddit-post.ps1 -Subreddit "SaaS" -Product "dating-platform"
```

---

## 4. Best Posting Times

| Subreddit | Best Days | Best Time (EST) |
|-----------|-----------|-----------------|
| r/SideProject | Sat/Sun | 10AM - 2PM |
| r/EntrepreneurRideAlong | Tue/Thu | 9AM - 11AM |
| r/Startup_Ideas | Mon/Thu | 11AM - 1PM |
| r/SaaS | Tue/Wed | 2PM - 4PM |

---

## 5. After Posting

### Critical: First 2 Hours

**YOU MUST:**
1. Monitor the post constantly
2. Reply to EVERY comment quickly
3. Be helpful, not salesy
4. Share technical details when asked
5. Acknowledge criticisms genuinely

**If someone asks "where can I get this?"**
- Send them a DM (don't reply in thread)
- In thread say: "Happy to share details - sent you a DM!"

---

## 6. Reddit Self-Promotion Rules

### The 10:1 Rule
- For every 1 promotional post
- Make 10+ helpful comments/posts first

### Before Posting:
- [ ] Have you made 10+ helpful comments recently?
- [ ] Is this post value-first (not just sales)?
- [ ] Are you ready to engage in comments for 2+ hours?
- [ ] Have you read the subreddit rules?

### Violations = Ban
- Post removal
- Subreddit ban
- Site-wide shadowban

---

## 7. Posting Schedule (Recommended)

### Week 1
- Monday: Build karma with 10+ helpful comments
- Saturday 11AM: Post to r/SideProject (Claude Droid)

### Week 2
- Monday-Wednesday: More helpful comments (10+)
- Thursday 10AM: Post to r/EntreprenourRideAlong (Income Droid)

### Week 3
- Monday-Tuesday: More helpful comments (10+)
- Wednesday 2PM: Post to r/SaaS (Marketing Engine)

**Key:** Space out posts, build karma between promotional posts

---

## 8. Troubleshooting

### "Missing Reddit API credentials"
- Set environment variables (see Setup above)
- Restart PowerShell after setting variables

### "No post template found"
- That product/subreddit combination doesn't exist
- Run script to see all available combinations

### "Authentication failed"
- Check username/password (case-sensitive)
- Verify client ID/secret from reddit.com/prefs/apps
- Ensure app type is "script" not "web app"

### Post removed by moderators
- Read subreddit rules carefully
- May have violated self-promotion ratio
- Account may be too new (age it with helpful comments)

---

## 9. Success Metrics

### Good Post
- 50+ upvotes
- 20+ comments
- 3-5 DMs asking for details

### Great Post
- 200+ upvotes
- 50+ comments
- Front page for 12+ hours

---

## 10. Where Posts Are Logged

All attempts logged to:
```
C:\AiCollabForTheKids\logs\reddit-marketing.log
```

Check this to:
- See posting history
- Debug issues
- Track success rate

---

## Full Documentation

For complete details, see:
- `README-REDDIT-POST.md` - Full documentation
- `marketing/reddit-store-posts.md` - Post content guidelines

---

**Last Updated:** 2025-12-21
**Store:** https://ai-solutions.store
