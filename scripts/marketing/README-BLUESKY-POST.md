# Bluesky Marketing Automation for AI Solutions Store

**Automated posting to Bluesky using the AT Protocol API**

## Overview

This PowerShell script automates promotional posts to Bluesky for the AI Solutions Store. It features:

- **Product rotation** - 6 products with multiple post variations
- **Professional content** - Value-focused, non-spammy messaging
- **Automatic scheduling** - Day-based product rotation, hour-based variation selection
- **Comprehensive logging** - All posts tracked in `logs/bluesky-marketing.log`
- **Error handling** - Robust error capture and troubleshooting guidance
- **Dry run mode** - Test posts before going live

## Products Featured

| Product | Price | Description |
|---------|-------|-------------|
| Claude Droid | $299 | AI video generator for YouTube Shorts |
| Income Droid | $499 | Video monetization automation |
| Marketing Engine | $199 | Social media posting automation |
| Jules AI | $399 | AI business operations assistant |
| Affiliate System | $599 | White-label affiliate platform |
| Dating Platform | $2,499 | Human-verified dating app (full source) |

## Setup Instructions

### 1. Create Bluesky App Password

App passwords are more secure than using your main account password and can be revoked individually.

**Steps:**

1. Log into Bluesky (app or web at https://bsky.app)
2. Navigate to **Settings > App Passwords**
3. Click **"Add App Password"**
4. Give it a name (e.g., "AI Store Marketing Bot")
5. **Copy the password immediately** (it's only shown once)
6. Store it securely

**Screenshot locations:**
- Mobile: Settings (gear icon) → Privacy and Security → App Passwords
- Web: Settings → Advanced → App Passwords

### 2. Set Environment Variables

You need two environment variables:

- `BLUESKY_HANDLE` - Your Bluesky handle (e.g., `yourusername.bsky.social`)
- `BLUESKY_APP_PASSWORD` - The app password you just created

#### Option A: PowerShell Session (Temporary)

```powershell
$env:BLUESKY_HANDLE = "yourusername.bsky.social"
$env:BLUESKY_APP_PASSWORD = "your-app-password-here"
```

**Note:** These expire when you close PowerShell.

#### Option B: System Environment Variables (Permanent)

**Windows GUI Method:**

1. Open **Start Menu** → Search for **"Environment Variables"**
2. Click **"Edit the system environment variables"**
3. Click **"Environment Variables..."** button
4. Under **"User variables"**, click **"New..."**
5. Add both variables:
   - Variable name: `BLUESKY_HANDLE`
   - Variable value: `yourusername.bsky.social`
   - (Repeat for `BLUESKY_APP_PASSWORD`)
6. Click **OK** to save
7. **Restart PowerShell** for changes to take effect

**PowerShell Method:**

```powershell
[Environment]::SetEnvironmentVariable("BLUESKY_HANDLE", "yourusername.bsky.social", "User")
[Environment]::SetEnvironmentVariable("BLUESKY_APP_PASSWORD", "your-app-password-here", "User")
```

**Restart PowerShell** after setting system variables.

#### Option C: .env File (Requires Script Modification)

Create a `.env` file in `C:\AiCollabForTheKids\api\.env`:

```
BLUESKY_HANDLE=yourusername.bsky.social
BLUESKY_APP_PASSWORD=your-app-password-here
```

Then load it in PowerShell:

```powershell
Get-Content C:\AiCollabForTheKids\api\.env | ForEach-Object {
    if ($_ -match '^(BLUESKY_\w+)=(.*)$') {
        [Environment]::SetEnvironmentVariable($matches[1], $matches[2], "Process")
    }
}
```

### 3. Verify Setup

Test that credentials are loaded:

```powershell
echo $env:BLUESKY_HANDLE
echo $env:BLUESKY_APP_PASSWORD
```

Both should display the values (not blank).

## Usage

### Basic Usage (Auto-Rotation)

Automatically selects product based on day of month:

```powershell
cd C:\AiCollabForTheKids\scripts\marketing
.\bluesky-post.ps1
```

**Product Rotation Schedule:**
- Day 1, 7, 13, 19, 25, 31 → Claude Droid
- Day 2, 8, 14, 20, 26 → Income Droid
- Day 3, 9, 15, 21, 27 → Marketing Engine
- Day 4, 10, 16, 22, 28 → Jules AI
- Day 5, 11, 17, 23, 29 → Affiliate System
- Day 6, 12, 18, 24, 30 → Dating Platform

### Specify Product Manually

```powershell
.\bluesky-post.ps1 -Product "claude-droid"
```

Available products:
- `claude-droid`
- `income-droid`
- `marketing-engine`
- `jules-ai`
- `affiliate-system`
- `dating-platform`

### Dry Run Mode (Preview Without Posting)

Test what will be posted without actually posting:

```powershell
.\bluesky-post.ps1 -Product "income-droid" -DryRun
```

This is **highly recommended** before first use to verify content and credentials.

### Schedule with Task Scheduler

To automate posting at specific times:

1. Open **Task Scheduler** (Windows)
2. Create **New Task**
3. Set **Trigger** (e.g., daily at 10 AM)
4. Set **Action**:
   - Program: `powershell.exe`
   - Arguments: `-ExecutionPolicy Bypass -File "C:\AiCollabForTheKids\scripts\marketing\bluesky-post.ps1"`
   - Start in: `C:\AiCollabForTheKids\scripts\marketing`
5. Save and test

**Recommended Schedule:**
- Post 1-3 times per day
- Morning (9-10 AM), Afternoon (2-3 PM), Evening (7-8 PM)
- Avoid weekends for business-focused content

## Output Examples

### Successful Post

```
═══════════════════════════════════════════════════════════════
AI SOLUTIONS STORE - BLUESKY MARKETING AUTOMATION
═══════════════════════════════════════════════════════════════

Auto-selected product: claude-droid (day 15 rotation)

Post Preview:
───────────────────────────────────────────────────────────────
Product: claude-droid
Variation: 1 of 3
Length: 245 characters

Content:
Tired of spending hours creating video content?

Claude Droid generates professional YouTube Shorts automatically:
• Trending news → Video script (AI-powered)
• Text-to-speech voiceover
• Auto-upload to YouTube
• 4 posts/day on autopilot

Turn content creation into a "set it and forget it" system.

https://ai-solutions.store

#AIAutomation #ContentCreation #YouTubeAutomation #AITools #VideoMarketing
───────────────────────────────────────────────────────────────

Authenticating with Bluesky...
Authentication successful
DID: did:plc:abc123xyz789

Submitting post to Bluesky...
Post submitted successfully

═══════════════════════════════════════════════════════════════
SUCCESS - POST SUBMITTED!
═══════════════════════════════════════════════════════════════

Post URL: https://bsky.app/profile/yourusername.bsky.social/post/3kjh2kj3h5k
Post CID: bafyreigq4zkjgjk3j4k5j6k7j8k9j0
Product: claude-droid

Tip: Monitor and engage with replies for best results!
```

### Dry Run Mode

```
═══════════════════════════════════════════════════════════════
DRY RUN MODE - NO POST SUBMITTED
═══════════════════════════════════════════════════════════════

This post would be submitted to Bluesky
Remove -DryRun flag to actually post
```

## Logging

All posts are logged to `C:\AiCollabForTheKids\logs\bluesky-marketing.log`:

```
[2025-12-21 14:30:45] SUCCESS - Product: claude-droid - URL: https://bsky.app/profile/user.bsky.social/post/abc123
[2025-12-21 18:15:22] SUCCESS - Product: income-droid - URL: https://bsky.app/profile/user.bsky.social/post/def456
[2025-12-21 22:45:10] FAILED - Product: marketing-engine - Error: Authentication failed
```

View recent logs:

```powershell
Get-Content C:\AiCollabForTheKids\logs\bluesky-marketing.log -Tail 20
```

## Bluesky AT Protocol API Details

### Authentication Flow

1. **Create Session**: `POST /xrpc/com.atproto.server.createSession`
   - Body: `{ "identifier": "handle", "password": "app-password" }`
   - Returns: `{ "accessJwt": "token", "did": "did:plc:..." }`

2. **Use Token**: Include in Authorization header for API requests
   - Header: `Authorization: Bearer {accessJwt}`

3. **Token Expiry**: Access tokens expire after a few minutes
   - Script creates fresh token for each post
   - Refresh tokens available for long-running apps (not implemented here)

### Post Creation Flow

1. **Endpoint**: `POST /xrpc/com.atproto.repo.createRecord`

2. **Request Body**:
```json
{
  "repo": "did:plc:abc123",
  "collection": "app.bsky.feed.post",
  "record": {
    "text": "Your post content here",
    "createdAt": "2025-12-21T14:30:00.000Z"
  }
}
```

3. **Response**:
```json
{
  "uri": "at://did:plc:abc123/app.bsky.feed.post/3kjh2kj3h5k",
  "cid": "bafyreigq4zkjgjk3j4k5j6k7j8k9j0"
}
```

4. **Construct URL**: Extract `rkey` from URI and build:
   - Format: `https://bsky.app/profile/{handle}/post/{rkey}`

### API Rate Limits

Bluesky doesn't publicly document rate limits, but observed best practices:

- **Max 10-15 posts per day** for automated accounts
- **Space posts 1-2 hours apart** minimum
- **Monitor for errors** - rate limit returns HTTP 429
- **Use app passwords** - safer than main password, can be revoked

## Content Strategy

### Post Characteristics

- **Length**: 150-280 characters (Twitter-like)
- **Hashtags**: 3-5 relevant tags per post
- **Links**: Always include call-to-action (ai-solutions.store)
- **Tone**: Professional, value-focused, problem-solving
- **Format**: Bullet points, clear structure, easy scanning

### Engagement Tips

1. **Monitor replies within first hour** - Bluesky rewards early engagement
2. **Be authentic** - Respond genuinely, not with sales pitches
3. **Share value** - Focus on problems solved, not features
4. **Vary content** - Script includes 3 variations per product
5. **Timing matters** - Post when your audience is active

### What to Avoid

- ❌ Posting multiple times in quick succession
- ❌ Copy-pasting same content repeatedly
- ❌ Ignoring replies and mentions
- ❌ Sales-heavy or spammy language
- ❌ Posting during off-hours (late night)

## Troubleshooting

### Error: "Missing Bluesky credentials"

**Cause:** Environment variables not set

**Solution:**
```powershell
# Verify variables are set
echo $env:BLUESKY_HANDLE
echo $env:BLUESKY_APP_PASSWORD

# If blank, set them
$env:BLUESKY_HANDLE = "yourusername.bsky.social"
$env:BLUESKY_APP_PASSWORD = "your-app-password"
```

### Error: "Authentication failed"

**Possible causes:**

1. **Wrong handle format**
   - ✅ Correct: `yourusername.bsky.social`
   - ❌ Wrong: `@yourusername` or `yourusername`

2. **Incorrect app password**
   - App passwords are case-sensitive
   - They're long random strings (e.g., `abcd-1234-efgh-5678`)
   - **Regenerate if unsure**: Settings > App Passwords > Add new

3. **App password revoked**
   - Check Settings > App Passwords
   - If password isn't listed, create a new one

4. **Network issues**
   - Test: `curl https://bsky.social` (should return data)
   - Check firewall/antivirus blocking outbound HTTPS

### Error: "Post submission failed"

**Possible causes:**

1. **Rate limit exceeded**
   - Wait 1-2 hours before next post
   - Reduce posting frequency

2. **Post content too long**
   - Bluesky limit: 300 characters
   - Script templates are under this, but verify manually

3. **Invalid characters**
   - Avoid special Unicode that might break JSON encoding

4. **Account restricted**
   - Check if your Bluesky account is in good standing
   - Verify account isn't flagged for spam

### Error: "Access token expired"

**Cause:** Script reuses old token (shouldn't happen with current implementation)

**Solution:** Script creates fresh token each run - if this occurs, it's a bug

### Verification Steps

1. **Test authentication only**:
   - Modify script to call `Get-BlueskyAccessToken` and exit
   - Verify you get a JWT token back

2. **Test dry run**:
   ```powershell
   .\bluesky-post.ps1 -DryRun
   ```

3. **Check Bluesky service status**:
   - Visit https://status.bsky.app
   - API outages will cause all posts to fail

4. **Verify post manually**:
   - Log into Bluesky
   - Try posting manually
   - If manual posting works but script fails, it's an auth issue

## Integration with Marketing Automation

### Add to 24/7 Marketing Runner

Edit `scripts/marketing/marketing-runner.cjs` to include Bluesky:

```javascript
// Add Bluesky task
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

### PM2 Process Manager

Run as standalone PM2 process:

```bash
pm2 start powershell --name "bluesky-marketing" -- -ExecutionPolicy Bypass -File "C:\AiCollabForTheKids\scripts\marketing\bluesky-post.ps1"

# Schedule with cron (every 8 hours)
pm2 start powershell --name "bluesky-marketing" --cron "0 */8 * * *" -- -ExecutionPolicy Bypass -File "C:\AiCollabForTheKids\scripts\marketing\bluesky-post.ps1"
```

## Best Practices

### Posting Frequency

- **Start slow**: 1 post/day for first week
- **Ramp up**: 2-3 posts/day after establishing pattern
- **Optimal times**:
  - Morning: 9-10 AM (weekdays)
  - Afternoon: 2-3 PM (weekdays)
  - Evening: 7-8 PM (any day)

### Content Rotation

- Script automatically rotates:
  - **Products** by day of month (6-day cycle)
  - **Variations** by hour of day (3 variations per product)
- This prevents repetitive content
- Each post is unique

### Monitoring

Track these metrics:

1. **Engagement**: Likes, reposts, replies
2. **Click-through**: Link clicks to ai-solutions.store
3. **Follower growth**: Track weekly
4. **Post performance**: Which products/variations perform best

Use Bluesky analytics (when available) or manual tracking.

### Compliance

- **No spam**: Follow Bluesky community guidelines
- **Authentic engagement**: Respond to genuine questions
- **Transparent promotion**: It's okay to promote your business
- **Add value**: Share insights, not just sales pitches

## Advanced Usage

### Custom Post Content

Edit templates in the script at `$PostTemplates` hashtable:

```powershell
"claude-droid" = @(
    @"
Your custom post content here.

Include hashtags and link:
https://ai-solutions.store

#CustomTag #AnotherTag
"@,
    @"
Second variation here...
"@
)
```

### Add Rich Text Features

Bluesky supports:

- **Mentions**: `@username.bsky.social`
- **Links**: Automatically detected and clickable
- **Hashtags**: `#AIAutomation`
- **Images**: Requires additional API calls (not implemented)

### Image Embedding (Future Enhancement)

To add images to posts, you need to:

1. Upload blob via `com.atproto.repo.uploadBlob`
2. Get blob reference
3. Add to post record as `embed`

Example:

```powershell
$record = @{
    text = "Post with image"
    createdAt = $timestamp
    embed = @{
        '$type' = "app.bsky.embed.images"
        images = @(
            @{
                alt = "Description"
                image = $blobRef
            }
        )
    }
}
```

## Security Considerations

### App Password Security

- **Never commit** app passwords to Git
- **Use environment variables** instead of hardcoding
- **Rotate regularly** (every 3-6 months)
- **Revoke unused** passwords in Bluesky settings

### Access Control

App passwords can:
- ✅ Create posts
- ✅ Read your timeline
- ✅ Manage follows
- ❌ Change account password
- ❌ Delete account

**Least privilege**: Create separate app password per automation.

### Credential Storage

**Good practices:**
- ✅ System environment variables
- ✅ Encrypted credential store (Windows Credential Manager)
- ✅ .env file with restricted permissions (chmod 600 on Linux)

**Bad practices:**
- ❌ Hardcoded in script
- ❌ Committed to version control
- ❌ Shared in plain text files

## Resources

### Bluesky Documentation

- **Getting Started**: https://docs.bsky.app/docs/get-started
- **Posting Guide**: https://docs.bsky.app/blog/create-post
- **API Reference**: https://docs.bsky.app/docs/api/com-atproto-repo-create-record
- **AT Protocol**: https://docs.bsky.app/docs/advanced-guides/atproto
- **OAuth Guide**: https://docs.bsky.app/blog/oauth-atproto

### Community Resources

- **PowerShell Tutorial**: https://blog-en.topedia.com/2025/04/how-to-post-on-bluesky-with-powershell/
- **AT Protocol GitHub**: https://github.com/bluesky-social/atproto
- **NPM Package**: https://www.npmjs.com/package/@atproto/api

### Status and Support

- **Service Status**: https://status.bsky.app
- **Community Forum**: https://github.com/bluesky-social/atproto/discussions
- **Report Issues**: https://github.com/bluesky-social/social-app/issues

## Version History

### v1.0.0 (2025-12-21)

- Initial release
- 6 products with 3 variations each (18 unique posts)
- Auto-rotation by day/hour
- Dry run mode
- Comprehensive error handling
- Logging to file
- App password authentication
- AT Protocol API integration

## License

This script is part of the AI Solutions Store marketing automation suite.

**FOR THE KIDS. ALWAYS.**
- 60% of revenue → Verified Pediatric Charities
- 30% → Infrastructure
- 10% → Founder

Gospel V1.3 compliant.

---

**Questions or issues?** Check logs at `C:\AiCollabForTheKids\logs\bluesky-marketing.log`

**Need help?** Review troubleshooting section above or check Bluesky API documentation.
