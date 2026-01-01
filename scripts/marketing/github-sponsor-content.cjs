/**
 * GitHub Sponsors & Discussions Content Generator
 * Generates content for GitHub presence and sponsor engagement
 *
 * FOR THE KIDS - 60/30/10 (backend only)
 */

const fs = require('fs');
const path = require('path');

const LOGS_DIR = 'C:\\AiCollabForTheKids\\logs';
const STATE_FILE = path.join(LOGS_DIR, 'github-content-state.json');
const LOG_FILE = path.join(LOGS_DIR, 'github-content-marketing.log');
const CONTENT_FILE = path.join(LOGS_DIR, 'github-ready-to-post.md');

// Ensure logs directory exists
if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
}

function log(message) {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(LOG_FILE, entry);
    console.log(entry.trim());
}

// GitHub content templates
const CONTENT_TEMPLATES = [
    {
        id: 'readme-update',
        type: 'readme',
        title: 'AI Solutions Store - README Update',
        content: `# AI Solutions Store

> Automation tools that work 24/7 so you don't have to.

## Products

| Product | Price | Description |
|---------|-------|-------------|
| [Claude Droid](https://ai-solutions.store/claude-droid) | $299 | YouTube Shorts automation |
| [Income Droid](https://ai-solutions.store/income-droid) | $499 | Multi-platform content syndication |
| [Marketing Engine](https://ai-solutions.store/marketing-engine) | $199 | 12-platform marketing automation |
| [Jules AI](https://ai-solutions.store/jules-ai) | $399 | AI agent monitoring dashboard |

## Why One-Time Purchases?

- **Own the code** - No vendor lock-in
- **No subscriptions** - Pay once, use forever
- **Self-hosted** - Your data stays yours
- **Updates included** - GitHub repo access

## Tech Stack

- Node.js + PM2
- Claude/GPT APIs
- FFmpeg
- Cloudflare Pages

## Quick Start

\`\`\`bash
git clone https://github.com/Ai-Solutions-Store/product-name.git
cd product-name
npm install
cp .env.example .env
# Add your API keys
npm start
\`\`\`

## Support

- Email: support@ai-solutions.store
- Twitter: [@AiCollab4Kids](https://twitter.com/AiCollab4Kids)

## License

MIT - Use it however you want.

---

*Building automation tools since 2025*`
    },
    {
        id: 'discussion-intro',
        type: 'discussion',
        title: 'Welcome - Introduce Yourself!',
        content: `# Welcome to AI Solutions Store Discussions! 👋

This is a place for:
- Questions about our products
- Feature requests
- Sharing what you've built
- General AI automation chat

## About This Project

We build automation tools that run 24/7:
- **Claude Droid** - YouTube Shorts automation
- **Income Droid** - Content syndication
- **Marketing Engine** - Multi-platform posting
- **Jules AI** - Monitoring dashboard

All one-time purchases. No subscriptions.

## Introduce Yourself

Drop a comment below:
1. What brought you here?
2. What are you trying to automate?
3. Any questions we can help with?

Looking forward to meeting you!`
    },
    {
        id: 'discussion-showcase',
        type: 'discussion',
        title: 'Show & Tell - What Have You Built?',
        content: `# Show & Tell 🚀

Share what you've built with our tools (or inspired by them)!

## Template

**What I built:** [Brief description]

**Tools used:** [Claude Droid / Income Droid / etc.]

**Results:** [Views, revenue, time saved, etc.]

**Screenshot/Link:** [Optional]

**Lessons learned:** [What would you do differently?]

---

## Example

**What I built:** Automated tech news YouTube channel

**Tools used:** Claude Droid + custom RSS feeds

**Results:**
- 120 videos/month
- 45k views/month
- ~$400/month ad revenue

**Lessons learned:**
- Hook in first 3 seconds is crucial
- Consistency beats quality for YouTube algorithm
- FFmpeg's drawtext filter is powerful but docs are rough

---

Your turn! 👇`
    },
    {
        id: 'discussion-faq',
        type: 'discussion',
        title: 'FAQ - Frequently Asked Questions',
        content: `# Frequently Asked Questions

## General

**Q: Are these really one-time purchases?**
A: Yes. Pay once, own forever. You get GitHub repo access with updates included.

**Q: Do I need to know how to code?**
A: Basic command line knowledge helps. Our docs walk you through setup step-by-step.

**Q: What if I get stuck?**
A: Open an issue here or email support@ai-solutions.store. We respond within 24 hours.

---

## Technical

**Q: What APIs do I need?**
A: Depends on the product:
- Claude Droid: Anthropic API + YouTube Data API
- Marketing Engine: Various social media APIs
- See individual product docs for details

**Q: Can I run this on Windows?**
A: Yes! All products work on Windows, Mac, and Linux.

**Q: How much does it cost to run?**
A: Typical monthly costs:
- API usage: $50-150/month
- Hosting: $0-20/month (can self-host)

---

## Pricing

**Q: Why no subscriptions?**
A: We hate subscriptions as customers. Why would we inflict that on you?

**Q: Can I get a refund?**
A: Within 14 days if the product doesn't work as described and we can't fix it.

**Q: Do you offer discounts?**
A: Occasionally on Twitter. Follow @AiCollab4Kids.

---

More questions? Ask below! 👇`
    },
    {
        id: 'sponsor-tier-1',
        type: 'sponsor',
        title: 'GitHub Sponsors - $5/month Tier',
        content: `## ☕ Coffee Supporter - $5/month

Thanks for buying me a coffee!

### What You Get:
- Name in SUPPORTERS.md
- Early access to new features
- Sponsor-only Discord channel
- My eternal gratitude

### Why Sponsor?

I build these tools because I use them myself. Sponsorship helps me:
- Cover API costs for development
- Dedicate more time to improvements
- Keep products affordable

No pressure. If you find value in what I build, this is a way to say thanks.

[Become a Sponsor →](https://github.com/sponsors/Ai-Solutions-Store)`
    },
    {
        id: 'sponsor-tier-2',
        type: 'sponsor',
        title: 'GitHub Sponsors - $25/month Tier',
        content: `## 🚀 Builder Supporter - $25/month

For indie hackers and small teams.

### What You Get:
- Everything in Coffee tier
- Monthly 30-min call (Q&A, strategy, debugging)
- Priority feature requests
- Beta access to new products
- Logo in README

### Who This Is For:

- Using our tools for business
- Want direct access for questions
- Want to influence product direction

The monthly call alone is worth it if you're stuck on automation challenges.

[Become a Sponsor →](https://github.com/sponsors/Ai-Solutions-Store)`
    },
    {
        id: 'release-notes',
        type: 'release',
        title: 'Release Notes Template',
        content: `# v1.X.X Release Notes

**Release Date:** ${new Date().toISOString().split('T')[0]}

## What's New

### Features
- ✨ Feature 1 description
- ✨ Feature 2 description

### Improvements
- ⚡ Performance improvement
- 🔧 Configuration update

### Bug Fixes
- 🐛 Fixed issue with X
- 🐛 Resolved edge case in Y

## Breaking Changes

None in this release.

## Upgrade Guide

\`\`\`bash
git pull origin main
npm install
# Restart your PM2 process
pm2 restart your-app
\`\`\`

## Full Changelog

See commits since last release.

---

Questions? Open an issue or discussion.`
    },
    {
        id: 'contributing-guide',
        type: 'contributing',
        title: 'Contributing Guidelines',
        content: `# Contributing to AI Solutions Store

Thanks for your interest in contributing!

## Ways to Contribute

### 1. Report Bugs
- Open an issue with reproduction steps
- Include your environment (OS, Node version)
- Attach logs if relevant

### 2. Suggest Features
- Open a discussion first
- Explain the use case
- We'll discuss feasibility

### 3. Submit PRs
- Fork the repo
- Create a feature branch
- Follow existing code style
- Add tests if applicable
- Submit PR with clear description

## Code Style

- Use ES modules (\`.mjs\`) or CommonJS (\`.cjs\`)
- 2-space indentation
- Meaningful variable names
- Comments for complex logic

## Commit Messages

Format: \`type: description\`

Types:
- \`feat:\` New feature
- \`fix:\` Bug fix
- \`docs:\` Documentation
- \`refactor:\` Code restructure
- \`test:\` Tests

Example: \`feat: add Pinterest integration\`

## Questions?

Open a discussion or reach out on Twitter @AiCollab4Kids.

We appreciate all contributions! 🙏`
    }
];

function getState() {
    try {
        if (fs.existsSync(STATE_FILE)) {
            return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
        }
    } catch (err) {
        log(`Error reading state: ${err.message}`);
    }
    return { lastIndex: -1, generated: [] };
}

function saveState(state) {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function getNextContent() {
    const state = getState();
    const nextIndex = (state.lastIndex + 1) % CONTENT_TEMPLATES.length;
    return { content: CONTENT_TEMPLATES[nextIndex], index: nextIndex };
}

async function main() {
    const { content, index } = getNextContent();

    log('═══════════════════════════════════════════════════════════════');
    log('GITHUB CONTENT GENERATOR');
    log('═══════════════════════════════════════════════════════════════');

    log(`\nContent ${index + 1} of ${CONTENT_TEMPLATES.length}`);
    log(`Type: ${content.type}`);
    log(`Title: ${content.title}`);

    // Generate content file
    const contentOutput = `# GitHub Content - Ready to Use

**Generated:** ${new Date().toISOString()}
**Type:** ${content.type}

---

## Title
${content.title}

---

## Content

${content.content}

---

## Usage Instructions

**For ${content.type}:**
${content.type === 'readme' ? `
1. Copy content above
2. Paste into README.md
3. Customize as needed
4. Commit and push` : ''}
${content.type === 'discussion' ? `
1. Go to repo Discussions tab
2. Click "New Discussion"
3. Select appropriate category
4. Paste title and content
5. Submit` : ''}
${content.type === 'sponsor' ? `
1. Go to github.com/sponsors/settings
2. Edit your tier description
3. Paste content above
4. Save changes` : ''}
${content.type === 'release' ? `
1. Go to repo Releases
2. Click "Draft a new release"
3. Create new tag
4. Paste content as description
5. Publish release` : ''}
${content.type === 'contributing' ? `
1. Save as CONTRIBUTING.md in repo root
2. Commit and push
3. GitHub will auto-link it` : ''}

---

*Generated by AI Solutions Marketing Engine*
*https://ai-solutions.store*
`;

    fs.writeFileSync(CONTENT_FILE, contentOutput);
    log(`\nContent saved to: ${CONTENT_FILE}`);

    // Update state
    const state = getState();
    state.lastIndex = index;
    state.generated.push({
        id: content.id,
        type: content.type,
        title: content.title,
        generatedAt: new Date().toISOString()
    });
    if (state.generated.length > 50) state.generated = state.generated.slice(-50);
    saveState(state);

    log('\n═══════════════════════════════════════════════════════════════');
    log('CONTENT PREVIEW');
    log('═══════════════════════════════════════════════════════════════');
    log(`\nType: ${content.type}`);
    log(`Title: ${content.title}`);
    log(`\nFirst 400 chars:\n${content.content.substring(0, 400)}...`);
    log('\n═══════════════════════════════════════════════════════════════');
    log(`SUCCESS: GitHub content generated`);
    log(`File: ${CONTENT_FILE}`);
    log('═══════════════════════════════════════════════════════════════');

    process.exit(0);
}

if (require.main === module) {
    main();
}

module.exports = { CONTENT_TEMPLATES };
