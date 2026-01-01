# Dev.to Marketing Script - Usage Examples

**Quick reference for running the Dev.to automation script.**

---

## Basic Usage

### Post Next Article

```bash
cd C:\AiCollabForTheKids
node scripts/marketing/devto-post.cjs
```

**Output:**
```
[2025-12-21T16:30:00.000Z] ═══════════════════════════════════════════════════════════════
[2025-12-21T16:30:00.100Z] DEV.TO MARKETING AUTOMATION
[2025-12-21T16:30:00.200Z] AI Solutions Store - Technical Content Marketing
[2025-12-21T16:30:00.300Z] FOR THE KIDS - 60/30/10
[2025-12-21T16:30:00.400Z] ═══════════════════════════════════════════════════════════════
[2025-12-21T16:30:00.500Z] Publishing article: "Building a YouTube Automation System..."
[2025-12-21T16:30:00.600Z] Tags: ai, automation, youtube, nodejs
[2025-12-21T16:30:02.450Z] SUCCESS: Article published!
[2025-12-21T16:30:02.451Z] URL: https://dev.to/username/building-youtube-automation-slug
[2025-12-21T16:30:02.452Z] ID: 123456
[2025-12-21T16:30:02.453Z] Published at: 2025-12-21T16:30:02Z
```

---

## Automated Scheduling

### Option 1: PM2 Standalone

Post every 3 days at midnight:
```bash
pm2 start scripts/marketing/devto-post.cjs --name "devto-marketing" --cron "0 0 */3 * *"
pm2 save
```

Check status:
```bash
pm2 list
pm2 logs devto-marketing
```

### Option 2: Add to Marketing Runner

Edit `scripts/marketing/marketing-runner.cjs` and add:

```javascript
const devtoPost = require('./devto-post.cjs');

// Add to existing schedules array
schedules.push({
  name: 'Dev.to Article',
  interval: 3 * 24 * 60 * 60 * 1000, // 3 days
  lastRun: 0,
  task: async () => {
    log('Running Dev.to article posting...');
    const article = devtoPost.getNextArticle();
    const result = await devtoPost.postToDevTo(article);
    log(`Article published: ${result.url}`);
    return result.url;
  }
});
```

Then restart the marketing runner:
```bash
pm2 restart marketing-24-7
```

---

## Environment Setup

### Get Your API Key

1. Visit: https://dev.to/settings/extensions
2. Generate API Key
3. Copy the key (starts with `dev_`)

### Set Environment Variable

**PowerShell (current session):**
```powershell
$env:DEV_TO_API_KEY = "dev_YOUR_KEY_HERE"
```

**PowerShell (permanent):**
```powershell
[System.Environment]::SetEnvironmentVariable('DEV_TO_API_KEY', 'dev_YOUR_KEY_HERE', 'User')
```

**Verify:**
```powershell
echo $env:DEV_TO_API_KEY
```

---

## Monitoring

### View Logs

**Recent activity:**
```bash
tail -n 50 logs/devto-marketing.log
```

**Real-time monitoring:**
```bash
tail -f logs/devto-marketing.log
```

**Search for errors:**
```bash
findstr /i "error" logs\devto-marketing.log
findstr /i "failed" logs\devto-marketing.log
```

### Check Article State

The script tracks which article to post next in `logs/devto-state.json`:

```json
{
  "articleIndex": 2
}
```

This means the next run will post Article 3 (0-indexed, so 0, 1, **2**, 3...).

---

## Article Rotation

The script cycles through 4 articles:

| Index | Article Title | Product | Focus |
|-------|---------------|---------|-------|
| 0 | YouTube Automation System | Claude Droid | Technical |
| 1 | Passive Income with AI | Income Droid | Economics |
| 2 | Marketing Automation Engine | Marketing Engine | Multi-platform |
| 3 | AI Tool Monetization | All Products | Business |

After posting Article 3, it cycles back to Article 0.

---

## Customization

### Add Your Own Article

Edit `scripts/marketing/devto-post.cjs` and add to the `ARTICLE_TEMPLATES` array:

```javascript
const ARTICLE_TEMPLATES = [
  // ... existing templates
  {
    title: "Your Article Title Here",
    description: "A short description (160 chars max)",
    tags: ["tag1", "tag2", "tag3", "tag4"],
    body_markdown: `
# Your Article Title

Your content here in markdown format.

## Code Example

\`\`\`javascript
const example = "Include real code samples";
console.log(example);
\`\`\`

## Product Link

Check out the full solution at [ai-solutions.store/your-product](https://ai-solutions.store/your-product).
    `.trim()
  }
];
```

### Adjust Publishing Frequency

**Every 2 days:**
```bash
pm2 start scripts/marketing/devto-post.cjs --cron "0 0 */2 * *"
```

**Every week (Monday at 9am):**
```bash
pm2 start scripts/marketing/devto-post.cjs --cron "0 9 * * 1"
```

**Every month (1st at midnight):**
```bash
pm2 start scripts/marketing/devto-post.cjs --cron "0 0 1 * *"
```

---

## Testing

### Dry Run (Without API Key)

To test the script structure without posting:

```javascript
// In devto-post.cjs, comment out the API call:
// const result = await postToDevTo(article);
console.log('Would post:', article.title);
console.log('Tags:', article.tags);
console.log('Body length:', article.body_markdown.length, 'chars');
```

---

## Troubleshooting

### "DEV_TO_API_KEY environment variable not set"

**Solution:**
```powershell
$env:DEV_TO_API_KEY = "dev_YOUR_KEY_HERE"
```

### "API returned 401: Unauthorized"

**Causes:**
- Invalid API key
- API key expired
- API key was regenerated on Dev.to

**Solution:**
1. Go to https://dev.to/settings/extensions
2. Generate new API key
3. Update environment variable

### "API returned 422: Unprocessable Entity"

**Cause:** Duplicate article title detected.

**Solution:**
- Dev.to prevents duplicate titles
- Edit the article title in the script
- Or wait 24+ hours before retrying

### "API returned 429: Too Many Requests"

**Cause:** Rate limit exceeded (10 posts/hour).

**Solution:**
- Wait 1 hour before retrying
- Reduce posting frequency
- Check if another process is posting

---

## Performance Tracking

### Dev.to Dashboard

View article analytics:
1. Visit: https://dev.to/dashboard
2. Click "Posts"
3. See: views, reactions, comments, reading time

### Expected Metrics (Per Article)

**Week 1:**
- 200-500 views
- 10-30 reactions
- 2-8 comments

**Week 2-4:**
- 500-1,000 total views
- 20-50 total reactions
- 5-15 total comments

**Long-term (3+ months):**
- 1,000-3,000 views
- SEO traffic from Google
- Backlinks to ai-solutions.store

---

## Best Practices

### 1. Engage Quickly
- Respond to first comments within 1 hour
- Pin a "Ask me anything" comment
- Share on social media immediately

### 2. Cross-Promote
- Share on Twitter with thread
- Post to LinkedIn (condensed version)
- Share in relevant Discord/Slack communities

### 3. Monitor Performance
- Check analytics weekly
- Note which articles perform best
- Create follow-ups for high-performing content

### 4. Maintain Quality
- Don't just automate and forget
- Read comments and respond thoughtfully
- Update articles with new learnings

---

## Next Steps After Setup

1. **Post first article** manually to test
2. **Monitor for 24 hours** - engage with comments
3. **Review analytics** - views, reactions, click-throughs
4. **Set up automation** - PM2 or marketing runner
5. **Plan next articles** - use variations document for ideas

---

**FOR THE KIDS. ALWAYS.**
