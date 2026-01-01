# Dev.to Article Posting Automation

**Status:** Production Ready
**Platform:** Dev.to (Forem API)
**Purpose:** Automated technical blog posting for AI Solutions Store marketing

---

## Overview

This script automates posting technical articles to Dev.to, covering:
- YouTube automation with AI
- Content creation systems
- Passive income strategies
- AI tool monetization
- Marketing automation

## Features

- **Automated Publishing** - Posts articles via Dev.to API
- **Content Rotation** - Cycles through 4+ article templates
- **State Management** - Tracks which article to post next
- **Comprehensive Logging** - All activity logged to `logs/devto-marketing.log`
- **Error Handling** - Detailed error messages and troubleshooting
- **Product Integration** - Natural links to ai-solutions.store products

---

## Setup

### 1. Get Your Dev.to API Key

1. Go to https://dev.to/settings/extensions
2. Scroll to "DEV Community API Keys"
3. Click "Generate API Key"
4. Give it a description (e.g., "AI Solutions Store Marketing")
5. Copy the key (starts with `dev_`)

### 2. Set Environment Variable

**Windows (PowerShell):**
```powershell
$env:DEV_TO_API_KEY = "your_api_key_here"
```

**Windows (Permanent):**
```powershell
[System.Environment]::SetEnvironmentVariable('DEV_TO_API_KEY', 'your_api_key_here', 'User')
```

**Linux/Mac:**
```bash
export DEV_TO_API_KEY="your_api_key_here"
```

Add to `~/.bashrc` or `~/.zshrc` for persistence.

### 3. Install Dependencies

```bash
cd C:\AiCollabForTheKids
npm install
```

(No additional dependencies needed - uses Node.js built-ins)

---

## Usage

### Manual Posting

Post the next article in rotation:
```bash
node scripts/marketing/devto-post.cjs
```

### Automated Posting (PM2)

Add to your marketing runner or run standalone:

**Option 1: Standalone PM2 Process**
```bash
pm2 start scripts/marketing/devto-post.cjs --name "devto-marketing" --cron "0 0 */3 * *"
pm2 save
```

This posts every 3 days at midnight.

**Option 2: Add to Existing Marketing Runner**

Edit `scripts/marketing/marketing-runner.cjs`:
```javascript
const devtoPost = require('./devto-post.cjs');

// Add to task schedule
schedules.push({
  name: 'Dev.to Article',
  interval: 72 * 60 * 60 * 1000, // Every 3 days
  lastRun: 0,
  task: async () => {
    const article = devtoPost.getNextArticle();
    await devtoPost.postToDevTo(article);
  }
});
```

---

## Article Templates

The script includes 4 rotating article templates:

### 1. YouTube Automation System ($299 - Claude Droid)
- **Title:** "Building a YouTube Automation System with Claude AI"
- **Tags:** ai, automation, youtube, nodejs
- **Focus:** Technical implementation of automated video creation
- **Target:** Developers interested in AI automation

### 2. Passive Income with AI ($499 - Income Droid)
- **Title:** "Passive Income with AI: Revenue-Generating Video Engine"
- **Tags:** ai, passiveincome, automation, entrepreneurship
- **Focus:** Economics and scaling strategies
- **Target:** Entrepreneurs and side-hustlers

### 3. Marketing Automation ($199 - Marketing Engine)
- **Title:** "Building a 24/7 Marketing Engine"
- **Tags:** marketing, automation, ai, saas
- **Focus:** Multi-platform social media automation
- **Target:** Founders and marketing professionals

### 4. AI Tool Monetization ($199-$2,499 - All Products)
- **Title:** "AI Tool Monetization: Scripts to Revenue"
- **Tags:** startup, ai, saas, monetization
- **Focus:** Product business journey and sales
- **Target:** Indie hackers and startup builders

---

## Article Rotation Logic

The script uses a simple index-based rotation:
- First run: Posts Article 1
- Second run: Posts Article 2
- Third run: Posts Article 3
- Fourth run: Posts Article 4
- Fifth run: Posts Article 1 (cycles back)

State is saved in `logs/devto-state.json`.

---

## Publishing Schedule

**Recommended Frequency:** Every 3 days

**Optimal Posting Times:**
- Monday 9:00 AM EST (start of week)
- Wednesday 10:30 AM EST (mid-week)
- Thursday 2:00 PM EST (planning mode)

**Complete Cycle:** 12 days (4 articles × 3 days between posts)

---

## Dev.to API Reference

### Authentication
```
Header: api-key: YOUR_DEV_TO_API_KEY
```

### Create Article (POST /api/articles)

**Request:**
```json
{
  "article": {
    "title": "Article Title",
    "published": true,
    "body_markdown": "# Article content...",
    "tags": ["tag1", "tag2", "tag3"],
    "description": "Short description",
    "canonical_url": null
  }
}
```

**Response (201 Created):**
```json
{
  "id": 123456,
  "title": "Article Title",
  "url": "https://dev.to/username/article-slug",
  "published_at": "2025-12-21T10:30:00Z",
  "tags": ["tag1", "tag2"]
}
```

**Rate Limits:**
- 10 articles per 30 seconds
- 10 articles per 1 hour

---

## Logging

All activity is logged to `logs/devto-marketing.log`.

**Log Format:**
```
[2025-12-21T10:30:00.000Z] DEV.TO MARKETING AUTOMATION
[2025-12-21T10:30:00.100Z] Publishing article: "Building a YouTube Automation System..."
[2025-12-21T10:30:02.450Z] SUCCESS: Article published!
[2025-12-21T10:30:02.451Z] URL: https://dev.to/username/article-slug
```

**Check Logs:**
```bash
# View recent activity
tail -n 50 logs/devto-marketing.log

# Monitor in real-time
tail -f logs/devto-marketing.log

# Search for errors
findstr /i "error" logs\devto-marketing.log
```

---

## Troubleshooting

### Error: "DEV_TO_API_KEY environment variable not set"

**Cause:** API key not configured.

**Solution:**
```powershell
$env:DEV_TO_API_KEY = "your_api_key_here"
```

### Error: "API returned 401: Unauthorized"

**Cause:** Invalid API key.

**Solution:**
1. Verify key is correct (starts with `dev_`)
2. Regenerate key at https://dev.to/settings/extensions
3. Update environment variable

### Error: "API returned 422: Unprocessable Entity"

**Cause:** Article validation failed (likely duplicate title).

**Solution:**
- Dev.to prevents duplicate titles
- Wait 24 hours or manually edit article title in script

### Error: "API returned 429: Too Many Requests"

**Cause:** Rate limit exceeded.

**Solution:**
- Wait 1 hour before retrying
- Reduce posting frequency

### Articles Not Linking to Products

**Issue:** URLs to ai-solutions.store aren't clickable.

**Solution:**
- Dev.to markdown requires full URLs with `https://`
- Links are already formatted correctly in templates
- Check if Dev.to flagged as spam (new accounts may have restrictions)

---

## Content Strategy

### Value-First Approach
- Lead with problem-solving, not product pitching
- Share real code, real results, real challenges
- Link to products naturally in context

### Engagement Protocol
**Within 1 hour:** Respond to first 3 comments
**Within 24 hours:** Comment on related Dev.to articles
**Within 1 week:** Publish follow-up if article performs well

### SEO Optimization
- All articles include keywords: "AI automation", "YouTube", "passive income"
- Tags target Dev.to's algorithm: #ai, #automation, #nodejs
- Descriptions optimized for Google search snippets

---

## Performance Tracking

### Dev.to Analytics

Check article performance:
1. Go to https://dev.to/dashboard
2. Click "Posts"
3. View metrics: views, reactions, comments

### Expected Metrics (Per Article)

**Conservative:**
- 500-1,000 views
- 20-50 reactions
- 5-15 comments
- 10-30 click-throughs to ai-solutions.store

**Ambitious:**
- 2,000-5,000 views
- 100+ reactions
- 20+ comments
- 50+ click-throughs

### Track in Logs

The script logs:
- Article ID
- Published URL
- Timestamp

Cross-reference with Dev.to analytics.

---

## Advanced Configuration

### Add Custom Articles

Edit `ARTICLE_TEMPLATES` array in `devto-post.cjs`:

```javascript
const ARTICLE_TEMPLATES = [
  // ... existing templates
  {
    title: "Your Custom Title",
    description: "Short description (160 chars max)",
    tags: ["tag1", "tag2", "tag3", "tag4"],
    body_markdown: `
# Your Article Content

Write in markdown...

[Link to product](https://ai-solutions.store/your-product)
    `.trim()
  }
];
```

### Modify Posting Frequency

**In PM2:**
```javascript
// Every 2 days
cron_restart: '0 0 */2 * *'

// Every week (Monday 9am)
cron_restart: '0 9 * * 1'
```

**In Marketing Runner:**
```javascript
interval: 2 * 24 * 60 * 60 * 1000  // 2 days in milliseconds
```

---

## Integration with Marketing Runner

The script is designed to work standalone or integrated with the 24/7 marketing runner.

**Add to marketing-runner.cjs:**

```javascript
const devtoPost = require('./devto-post.cjs');

const tasks = [
  // ... existing tasks

  {
    name: 'Dev.to Article Publishing',
    interval: 3 * 24 * 60 * 60 * 1000, // Every 3 days
    task: async () => {
      const article = devtoPost.getNextArticle();
      const result = await devtoPost.postToDevTo(article);
      return result.url;
    }
  }
];
```

---

## Gospel V1.3 Compliance

This marketing automation supports the FOR THE KIDS mission:
- 60% of AI Solutions Store revenue → Verified Pediatric Charities
- 30% → Infrastructure & Operations
- 10% → Founder

While articles don't explicitly mention the charity split (per customer-facing guidelines), the products being marketed follow Gospel V1.3.

---

## Security Best Practices

1. **Never commit API keys to Git**
   - Use environment variables only
   - Add `.env` to `.gitignore`

2. **Rotate API keys quarterly**
   - Generate new key every 3 months
   - Update environment variable

3. **Monitor for unauthorized access**
   - Check Dev.to dashboard for unexpected posts
   - Review API key usage

---

## FAQ

**Q: Can I post the same article multiple times?**
A: No. Dev.to prevents duplicate titles. Each article template is designed to be posted once every 12+ days.

**Q: Will this get me banned for spam?**
A: No, if you follow the recommended schedule (every 3 days) and provide valuable technical content.

**Q: Can I edit articles after posting?**
A: Yes, via Dev.to dashboard or API. The script only handles initial publishing.

**Q: What if I want to post manually sometimes?**
A: Totally fine. The script just cycles to the next article when you run it.

**Q: Can I use this for other products?**
A: Yes! Edit the article templates to match your products and messaging.

---

## Support

- **Script Issues:** Check logs at `logs/devto-marketing.log`
- **Dev.to API Issues:** https://developers.forem.com/api
- **AI Solutions Store:** https://ai-solutions.store
- **FOR THE KIDS Mission:** https://aidoesitall.website

---

**Created:** 2025-12-21
**Author:** Claude Opus 4.5
**Platform:** Dev.to (Forem API v1)
**License:** Included with AI Solutions Store Marketing Engine

**FOR THE KIDS. ALWAYS.**
