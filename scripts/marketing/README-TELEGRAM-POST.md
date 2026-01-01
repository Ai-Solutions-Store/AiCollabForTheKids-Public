# Telegram Channel Marketing Automation

**AI Solutions Store - Automated Telegram Channel Posting**

## Overview

PowerShell script for posting rich, formatted content to Telegram channels with:
- Markdown formatting (bold, italic, code blocks)
- Inline keyboard buttons with CTAs
- Product announcements, tips, deals, and updates
- Automatic content rotation
- Environment-based configuration
- Comprehensive logging

## Features

### Content Types

1. **Product Announcements** - Feature individual products with pricing and CTAs
2. **Tips & Tricks** - Educational content about AI automation
3. **Deals & Promotions** - Special offers and bundle pricing
4. **Platform Updates** - News and announcements

### Rich Formatting

- **Bold text** for emphasis
- *Italic text* for subtle highlights
- `Code blocks` for technical content
- Clickable links inline
- Emoji support for visual appeal

### Inline Buttons

- Call-to-action buttons below each message
- Direct links to ai-solutions.store
- "Buy Now", "Learn More", "Claim Deal" variations
- Professional, high-conversion design

## Prerequisites

### 1. Create Telegram Bot

#### Step-by-Step with @BotFather

1. **Open Telegram** and search for `@BotFather` (verified bot)

2. **Start conversation** and send `/newbot`

3. **Choose bot name** (what users see):
   ```
   AI Solutions Store Bot
   ```

4. **Choose username** (must end in 'bot'):
   ```
   ai_solutions_store_bot
   ```

5. **Receive bot token** (looks like):
   ```
   1234567890:ABCdefGHIjklMNOpqrsTUVwxyz1234567890
   ```

6. **Save this token** - you'll need it for `TELEGRAM_BOT_TOKEN`

7. **Optional: Set bot description** (send to @BotFather):
   ```
   /setdescription
   ```
   Then send:
   ```
   Official bot for AI Solutions Store - AI automation products and services.
   ```

8. **Optional: Set bot profile picture**:
   ```
   /setuserpic
   ```
   Upload your store logo

### 2. Create Telegram Channel

1. **Open Telegram** → **New Channel**

2. **Channel name**:
   ```
   AI Solutions Store
   ```

3. **Channel description**:
   ```
   AI automation products, tips, and exclusive deals.
   Visit: https://ai-solutions.store
   ```

4. **Choose channel type**:
   - **Public channel** → Set username (e.g., `@ai_solutions_store`)
   - **Private channel** → Will need chat ID (see below)

5. **Add your bot as administrator**:
   - Go to channel info
   - **Administrators** → **Add Administrator**
   - Search for your bot username
   - **Enable permissions**: ✓ Post Messages
   - Save

### 3. Get Channel ID (for private channels)

If using a **private channel**, you need the numeric chat ID:

#### Method 1: Using @RawDataBot

1. **Search** for `@RawDataBot` on Telegram
2. **Add bot** to your channel temporarily
3. **Post any message** to the channel
4. **Check @RawDataBot** - it will show channel info including `chat.id`
5. **Copy the chat ID** (looks like `-1001234567890`)
6. **Remove @RawDataBot** from channel

#### Method 2: Using Telegram API

1. Add your bot to the channel
2. Post a test message to the channel
3. Visit in browser (replace `<BOT_TOKEN>`):
   ```
   https://api.telegram.org/bot<BOT_TOKEN>/getUpdates
   ```
4. Look for `"chat":{"id":-1001234567890}` in the response
5. Copy that ID

### 4. Set Environment Variables

#### PowerShell (Session):

```powershell
$env:TELEGRAM_BOT_TOKEN = "1234567890:ABCdefGHIjklMNOpqrsTUVwxyz1234567890"
$env:TELEGRAM_CHANNEL_ID = "@ai_solutions_store"  # or numeric ID for private
```

#### PowerShell (Permanent - User):

```powershell
[System.Environment]::SetEnvironmentVariable("TELEGRAM_BOT_TOKEN", "your-token-here", "User")
[System.Environment]::SetEnvironmentVariable("TELEGRAM_CHANNEL_ID", "@ai_solutions_store", "User")
```

#### PowerShell (Permanent - System):

```powershell
# Requires Administrator
[System.Environment]::SetEnvironmentVariable("TELEGRAM_BOT_TOKEN", "your-token-here", "Machine")
[System.Environment]::SetEnvironmentVariable("TELEGRAM_CHANNEL_ID", "@ai_solutions_store", "Machine")
```

#### Verify Environment Variables:

```powershell
$env:TELEGRAM_BOT_TOKEN
$env:TELEGRAM_CHANNEL_ID
```

## Usage

### Basic Usage (Auto-Rotate Content)

```powershell
.\telegram-post.ps1
```

- Automatically selects content type based on day of month
- Rotates through products, tips, deals, announcements

### Post Specific Content Type

```powershell
# Product announcement
.\telegram-post.ps1 -ContentType "product"

# AI automation tips
.\telegram-post.ps1 -ContentType "tip"

# Special deals
.\telegram-post.ps1 -ContentType "deal"

# Platform announcements
.\telegram-post.ps1 -ContentType "announcement"
```

### Feature Specific Product

```powershell
# Claude Droid
.\telegram-post.ps1 -ContentType "product" -ProductIndex 1

# Income Droid
.\telegram-post.ps1 -ContentType "product" -ProductIndex 2

# Marketing Engine
.\telegram-post.ps1 -ContentType "product" -ProductIndex 3

# Jules AI
.\telegram-post.ps1 -ContentType "product" -ProductIndex 4

# Affiliate System
.\telegram-post.ps1 -ContentType "product" -ProductIndex 5

# Dating Platform
.\telegram-post.ps1 -ContentType "product" -ProductIndex 6
```

### Dry Run (Preview Only)

```powershell
# Preview without posting
.\telegram-post.ps1 -DryRun

# Preview specific content
.\telegram-post.ps1 -ContentType "deal" -DryRun

# Preview specific product
.\telegram-post.ps1 -ContentType "product" -ProductIndex 1 -DryRun
```

## Products Catalog

| Index | Product | Price | Description |
|-------|---------|-------|-------------|
| 1 | Claude Droid | $299 | 24/7 AI assistant for business automation |
| 2 | Income Droid | $499 | Autonomous YouTube content generation |
| 3 | Marketing Engine | $199 | 24/7 social media automation |
| 4 | Jules AI | $399 | Custom AI voice assistant platform |
| 5 | Affiliate System | $599 | White-label affiliate platform |
| 6 | Dating Platform | $2,499 | Full-stack AI dating platform |

## Automation Setup

### Schedule with Task Scheduler

1. **Open Task Scheduler** → Create Task

2. **General Tab**:
   - Name: `Telegram Marketing - AI Store`
   - Run whether user is logged on or not

3. **Triggers Tab** → New:
   - Daily at 10:00 AM
   - Repeat every 8 hours for duration of 1 day

4. **Actions Tab** → New:
   - Action: Start a program
   - Program: `powershell.exe`
   - Arguments:
     ```
     -ExecutionPolicy Bypass -File "C:\AiCollabForTheKids\scripts\marketing\telegram-post.ps1"
     ```

5. **Conditions Tab**:
   - Uncheck "Start only if on AC power" (for laptops)

6. **Settings Tab**:
   - Allow task to run on demand
   - If task fails, restart every 1 hour

### Schedule with PM2 (via Node.js wrapper)

Create `telegram-runner.cjs`:

```javascript
const { exec } = require('child_process');
const cron = require('node-cron');

// Post every 8 hours
cron.schedule('0 */8 * * *', () => {
  console.log(`[${new Date().toISOString()}] Running Telegram post...`);

  exec(
    'powershell -ExecutionPolicy Bypass -File "C:\\AiCollabForTheKids\\scripts\\marketing\\telegram-post.ps1"',
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      console.log(stdout);
    }
  );
});

console.log('Telegram marketing scheduler started (every 8 hours)');
```

Run with PM2:

```bash
pm2 start telegram-runner.cjs --name "telegram-marketing"
pm2 save
```

## API Reference

### Telegram Bot API Endpoints Used

#### sendMessage

```
POST https://api.telegram.org/bot<TOKEN>/sendMessage
```

**Request Body:**
```json
{
  "chat_id": "@channel_username",
  "text": "Message text with *markdown*",
  "parse_mode": "Markdown",
  "reply_markup": {
    "inline_keyboard": [
      [
        {
          "text": "Button Text",
          "url": "https://example.com"
        }
      ]
    ]
  }
}
```

**Response (Success):**
```json
{
  "ok": true,
  "result": {
    "message_id": 123,
    "chat": {
      "id": -1001234567890,
      "title": "AI Solutions Store",
      "type": "channel"
    },
    "date": 1734796800,
    "text": "Message text"
  }
}
```

### Markdown Formatting

Telegram supports basic Markdown:

```
*bold text*
_italic text_
[inline URL](http://www.example.com/)
`inline fixed-width code`
```

**Escaping:** Use `\` to escape special characters: `\* \_ \[`

### Inline Keyboard Buttons

Each button can have:
- `text`: Button label (required)
- `url`: External link (opens in browser)
- `callback_data`: For bot interactions (not used in channel posts)

Example multi-button row:

```json
{
  "inline_keyboard": [
    [
      {"text": "Button 1", "url": "https://link1.com"},
      {"text": "Button 2", "url": "https://link2.com"}
    ],
    [
      {"text": "Button 3", "url": "https://link3.com"}
    ]
  ]
}
```

## Rate Limits

### Telegram API Limits

- **Messages per second:** 30 (per bot)
- **Daily message limit:** None for channels
- **Channel posts per day:** Unlimited
- **Edits per message:** Unlimited

### Recommended Posting Frequency

For optimal engagement:

- **Product announcements:** 1-2 per day
- **Tips & tricks:** 2-3 per day
- **Deals:** 1 per day (special occasions)
- **Updates:** As needed

**Total:** 4-6 posts per day (spaced evenly)

## Logging

All activity logged to: `C:\AiCollabForTheKids\logs\telegram-marketing.log`

### Log Format

```
[2025-12-21 14:30:00] [INFO] Script started
[2025-12-21 14:30:00] [INFO] Environment validated - Bot token and channel ID found
[2025-12-21 14:30:00] [INFO] Generated product content (25 lines)
[2025-12-21 14:30:00] [INFO] Posting to Telegram channel: @ai_solutions_store
[2025-12-21 14:30:01] [SUCCESS] Message posted successfully (ID: 123)
```

### View Logs

```powershell
# Last 50 lines
Get-Content "C:\AiCollabForTheKids\logs\telegram-marketing.log" -Tail 50

# Filter by level
Select-String -Path "C:\AiCollabForTheKids\logs\telegram-marketing.log" -Pattern "ERROR"

# Today's activity
Get-Content "C:\AiCollabForTheKids\logs\telegram-marketing.log" | Where-Object { $_ -match (Get-Date -Format "yyyy-MM-dd") }
```

## Troubleshooting

### Error: "TELEGRAM_BOT_TOKEN environment variable not set"

**Fix:**
```powershell
$env:TELEGRAM_BOT_TOKEN = "your-bot-token-here"
```

### Error: "Bad Request: chat not found"

**Causes:**
1. Bot not added to channel
2. Invalid channel ID/username
3. Channel is private but using @username

**Fix:**
1. Add bot to channel as admin
2. Enable "Post Messages" permission
3. For private channels, use numeric chat ID

### Error: "Forbidden: bot is not a member of the channel"

**Fix:**
1. Go to channel settings
2. Administrators → Add Administrator
3. Search for bot username
4. Add with "Post Messages" permission

### Error: "Bad Request: message text is empty"

**Cause:** Content generation failed

**Fix:**
- Check script for syntax errors
- Verify content templates are intact
- Run with `-DryRun` to preview content

### Error: "Bad Request: can't parse entities"

**Cause:** Invalid Markdown syntax

**Fix:**
- Escape special characters: `\* \_ \[`
- Check for unmatched formatting markers
- Review content templates

### Bot Token Invalid

**Test token validity:**
```powershell
$token = "your-token-here"
Invoke-RestMethod -Uri "https://api.telegram.org/bot$token/getMe"
```

Should return bot info. If error, regenerate token via @BotFather.

### Find Channel Chat ID

**Get updates:**
```powershell
$token = "your-token-here"
Invoke-RestMethod -Uri "https://api.telegram.org/bot$token/getUpdates"
```

Look for `"chat":{"id":-1001234567890}` in response.

## Best Practices

### Content Strategy

1. **Vary content types** - Don't post only products
2. **Add value** - Tips and educational content build trust
3. **Time zone awareness** - Post when audience is active
4. **Test first** - Use `-DryRun` for new content
5. **Monitor engagement** - Check views/clicks in Telegram

### Posting Schedule

| Time (UTC) | Content Type | Rationale |
|------------|--------------|-----------|
| 08:00 | Tip | Morning inspiration |
| 14:00 | Product | Lunch break browsing |
| 20:00 | Deal | Evening purchasing time |
| 22:00 | Announcement | Low-pressure updates |

### Growth Tactics

1. **Cross-promote** - Mention channel on Twitter, LinkedIn
2. **Exclusive content** - "Telegram subscribers only" deals
3. **Interactive** - Ask questions, run polls
4. **Consistency** - Post regularly, same times
5. **CTAs** - Always include actionable next step

### Compliance

- **No spam** - Respect audience attention
- **Value-first** - Educate before selling
- **Transparency** - Clear pricing, no hidden fees
- **Gospel V1.3** - Silent backend 60/30/10 split

## Integration with Marketing Suite

### Combine with Other Channels

This script is part of the AI Solutions Store marketing automation:

```
├── twitter-marketing (ai-store-tweet.ps1)
├── linkedin-marketing (linkedin-post.ps1)
├── reddit-marketing (reddit-post.ps1)
└── telegram-marketing (telegram-post.ps1)  ← YOU ARE HERE
```

### Unified Scheduling

All platforms can run from single PM2 process:

**File: `marketing-runner.cjs`**

```javascript
const cron = require('node-cron');
const { exec } = require('child_process');

// Twitter every 4 hours
cron.schedule('0 */4 * * *', () => runScript('ai-store-tweet.ps1'));

// LinkedIn every 6 hours
cron.schedule('0 */6 * * *', () => runScript('linkedin-post.ps1'));

// Reddit every 8 hours
cron.schedule('0 */8 * * *', () => runScript('reddit-post.ps1'));

// Telegram every 8 hours
cron.schedule('0 */8 * * *', () => runScript('telegram-post.ps1'));

function runScript(scriptName) {
  exec(`powershell -ExecutionPolicy Bypass -File "C:\\AiCollabForTheKids\\scripts\\marketing\\${scriptName}"`,
    (error, stdout, stderr) => {
      console.log(`[${scriptName}] ${stdout}`);
      if (error) console.error(`[${scriptName}] ${error.message}`);
    }
  );
}
```

Run all platforms:

```bash
pm2 start marketing-runner.cjs --name "marketing-24-7"
pm2 save
```

## Support

### Resources

- **Telegram Bot API Docs:** https://core.telegram.org/bots/api
- **@BotFather:** https://t.me/botfather
- **Bot API Support:** @BotSupport on Telegram

### AI Solutions Store

- **Website:** https://ai-solutions.store
- **Twitter:** @AiCollab4Kids
- **Support:** Contact via website

## License

Part of AI Solutions Store marketing automation suite.

**Gospel V1.3 Compliant:**
- 60% to verified pediatric charities
- 30% to infrastructure
- 10% to founder

**FOR THE KIDS. ALWAYS.**
