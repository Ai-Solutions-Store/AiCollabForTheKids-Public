# Telegram Bot Setup - Quick Start Guide

**Get your Telegram channel posting in 10 minutes**

## Step-by-Step Setup

### Step 1: Create Your Bot (2 minutes)

1. **Open Telegram** on your phone or desktop

2. **Search for:** `@BotFather`
   - Official Telegram bot (verified blue checkmark)
   - Do NOT use fake BotFathers (there are scammers)

3. **Start conversation** and send:
   ```
   /newbot
   ```

4. **Choose bot name** (what users see):
   ```
   AI Solutions Store Bot
   ```
   Or any name you prefer (can include spaces)

5. **Choose username** (must end in 'bot'):
   ```
   ai_solutions_store_bot
   ```
   Or: `aistore_bot`, `aisolutions_bot`, etc.

6. **Save your token**

   BotFather will reply with something like:
   ```
   Done! Congratulations on your new bot.

   Use this token to access the HTTP API:
   1234567890:ABCdefGHIjklMNOpqrsTUVwxyz1234567890

   Keep your token secure and store it safely.
   ```

   **COPY THIS TOKEN** - You'll need it in Step 4

7. **Optional: Customize your bot**
   ```
   /setdescription
   ```
   Then send:
   ```
   Official bot for AI Solutions Store. Get AI automation tips, deals, and product updates.
   ```

   Set profile picture:
   ```
   /setuserpic
   ```
   Upload your logo/image

### Step 2: Create Your Channel (3 minutes)

1. **Open Telegram** → Click menu → **New Channel**

2. **Channel name:**
   ```
   AI Solutions Store
   ```

3. **Channel description:**
   ```
   AI automation products, business tips, and exclusive deals.

   🤖 AI tools for entrepreneurs
   💰 One-time pricing, no subscriptions
   🚀 Automate your business

   Visit: https://ai-solutions.store
   ```

4. **Choose channel type:**

   **Option A: Public Channel (Recommended)**
   - Choose "Public Channel"
   - Set username: `ai_solutions_store` (or similar)
   - Your channel ID will be: `@ai_solutions_store`
   - Anyone can find and join

   **Option B: Private Channel**
   - Choose "Private Channel"
   - Invite-only access
   - You'll need numeric chat ID (see Step 3)

5. **Add bot as admin:**
   - Open channel info
   - **Administrators** → **Add Administrator**
   - Search for your bot username (e.g., `@ai_solutions_store_bot`)
   - **Check permissions:**
     - ✓ **Post Messages** (REQUIRED)
     - ✗ Edit Messages (optional)
     - ✗ Delete Messages (optional)
   - Click **Save**

### Step 3: Get Channel ID (Only for Private Channels)

If you chose **Public Channel**, skip this step. Use `@your_channel_name` as the ID.

If you chose **Private Channel**:

#### Method 1: Using @RawDataBot (Easiest)

1. Search for `@RawDataBot` on Telegram
2. **Add @RawDataBot** to your channel as admin temporarily
3. **Post any message** to your channel
4. **Check @RawDataBot** messages - it will send channel info
5. Look for `"chat": {"id": -1001234567890}`
6. **Copy that number** (includes the minus sign)
7. **Remove @RawDataBot** from your channel

#### Method 2: Using Bot API

1. Add your bot to the channel
2. Post a test message to the channel
3. Open in browser (replace `<BOT_TOKEN>` with your actual token):
   ```
   https://api.telegram.org/bot<BOT_TOKEN>/getUpdates
   ```
4. Look for: `"chat":{"id":-1001234567890}`
5. Copy that ID

### Step 4: Set Environment Variables (2 minutes)

**PowerShell (Recommended - Permanent):**

```powershell
# Open PowerShell as Administrator

# Set bot token
[System.Environment]::SetEnvironmentVariable("TELEGRAM_BOT_TOKEN", "1234567890:ABCdefGHI...", "User")

# Set channel ID (use your actual channel username or numeric ID)
[System.Environment]::SetEnvironmentVariable("TELEGRAM_CHANNEL_ID", "@ai_solutions_store", "User")
```

**Or for current session only:**

```powershell
$env:TELEGRAM_BOT_TOKEN = "1234567890:ABCdefGHI..."
$env:TELEGRAM_CHANNEL_ID = "@ai_solutions_store"
```

**Verify:**

```powershell
$env:TELEGRAM_BOT_TOKEN
$env:TELEGRAM_CHANNEL_ID
```

Should print your values.

### Step 5: Test the Script (1 minute)

**Dry run (preview only):**

```powershell
cd C:\AiCollabForTheKids\scripts\marketing
.\telegram-post.ps1 -DryRun
```

You should see a preview of the message without actually posting.

**Test post:**

```powershell
.\telegram-post.ps1 -ContentType "tip" -DryRun
```

**Actual post (if dry run looks good):**

```powershell
.\telegram-post.ps1
```

Check your Telegram channel - you should see a new post!

### Step 6: Automate (Optional)

**Add to marketing automation suite:**

Edit `C:\AiCollabForTheKids\scripts\marketing\marketing-runner.cjs`:

```javascript
// Add this to your existing cron jobs:

// Telegram every 8 hours
cron.schedule('0 */8 * * *', () => {
  console.log(`[${new Date().toISOString()}] Running Telegram post...`);
  exec(
    'powershell -ExecutionPolicy Bypass -File "C:\\AiCollabForTheKids\\scripts\\marketing\\telegram-post.ps1"',
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Telegram Error: ${error.message}`);
        return;
      }
      console.log(stdout);
    }
  );
});
```

**Restart PM2:**

```bash
pm2 restart marketing-24-7
pm2 logs marketing-24-7
```

---

## Quick Troubleshooting

### "Bot token not set"

**Fix:**
```powershell
$env:TELEGRAM_BOT_TOKEN = "your-token-here"
```

### "Chat not found"

**Causes:**
- Bot not added to channel
- Wrong channel ID
- Bot doesn't have permissions

**Fix:**
1. Go to channel settings
2. Administrators → Add your bot
3. Enable "Post Messages" permission
4. Try again

### "Forbidden: bot is not a member"

**Fix:**
Add bot as administrator to the channel (see Step 2.5)

### "Can't parse entities"

**Cause:** Markdown syntax error in content

**Fix:**
Script handles this automatically, but if you modify content:
- Escape special characters: `\* \_ \[`
- Close all formatting markers

### Test Bot Connection

```powershell
$token = $env:TELEGRAM_BOT_TOKEN
Invoke-RestMethod -Uri "https://api.telegram.org/bot$token/getMe"
```

Should return bot info. If error, token is invalid.

---

## Usage Examples

### Auto-rotate content daily

```powershell
.\telegram-post.ps1
```

Automatically selects content based on day of month.

### Post about specific product

```powershell
# Claude Droid
.\telegram-post.ps1 -ContentType "product" -ProductIndex 1

# Income Droid
.\telegram-post.ps1 -ContentType "product" -ProductIndex 2

# Marketing Engine
.\telegram-post.ps1 -ContentType "product" -ProductIndex 3
```

### Post educational tips

```powershell
.\telegram-post.ps1 -ContentType "tip"
```

### Post special deals

```powershell
.\telegram-post.ps1 -ContentType "deal"
```

### Platform announcements

```powershell
.\telegram-post.ps1 -ContentType "announcement"
```

### Preview before posting

```powershell
.\telegram-post.ps1 -ContentType "product" -ProductIndex 1 -DryRun
```

---

## What's Next?

1. **Test** - Post a few times manually to verify everything works
2. **Schedule** - Add to PM2/Task Scheduler for automation
3. **Monitor** - Check `logs/telegram-marketing.log` for issues
4. **Grow** - Share channel link on other platforms
5. **Engage** - Respond to comments, run polls, ask questions

---

## Channel Growth Tips

### 1. Cross-Promotion

Add to your:
- Website footer: "Join our Telegram channel"
- Twitter bio: Link to channel
- LinkedIn posts: "Exclusive Telegram updates"
- Email signature: Channel link

### 2. Exclusive Content

Offer Telegram-only:
- Early product announcements
- Special discount codes
- Behind-the-scenes updates
- Direct Q&A with founders

### 3. Consistency

- Post 4-6 times per day
- Space posts evenly (every 4-8 hours)
- Maintain voice and tone
- Mix content types (not all sales)

### 4. Engagement

- Ask questions
- Run polls
- Share customer wins
- Respond to comments
- Feature community members

---

## Security Best Practices

### Protect Your Bot Token

- **NEVER commit to GitHub**
- Store in environment variables only
- Don't share in screenshots
- Regenerate if compromised

### Regenerate Token (if leaked)

1. Message @BotFather
2. Send `/mybots`
3. Select your bot
4. **API Token** → **Revoke current token**
5. Update environment variable with new token

### Channel Security

- Make bot admin with minimal permissions
- Only enable "Post Messages" (unless you need others)
- Review admins regularly
- For private channels, use chat ID (more secure than username)

---

## Resources

- **Telegram Bot API:** https://core.telegram.org/bots/api
- **@BotFather:** https://t.me/botfather
- **Bot Support:** https://t.me/BotSupport
- **Script Documentation:** `README-TELEGRAM-POST.md`
- **Content Templates:** `telegram-content-variations.md`

---

## Support

Need help?

1. **Check logs:** `C:\AiCollabForTheKids\logs\telegram-marketing.log`
2. **Review README:** `README-TELEGRAM-POST.md`
3. **Test in dry-run mode:** `.\telegram-post.ps1 -DryRun`
4. **Verify environment:** `$env:TELEGRAM_BOT_TOKEN`, `$env:TELEGRAM_CHANNEL_ID`

---

**You're ready to automate Telegram marketing!**

Start posting, grow your audience, drive traffic to ai-solutions.store.

**FOR THE KIDS. ALWAYS.**
