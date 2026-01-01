/**
 * Hacker News Content Generator
 * Generates HN-style submission content for AI Solutions Store
 *
 * NOTE: Hacker News doesn't have a public submission API.
 * This script generates properly formatted content for:
 * 1. Manual submission via https://news.ycombinator.com/submit
 * 2. Future API integration if available
 * 3. Content preview and logging
 *
 * FOR THE KIDS - 60/30/10
 */

const fs = require('fs');
const path = require('path');

const LOGS_DIR = 'C:\\AiCollabForTheKids\\logs';
const STATE_FILE = path.join(LOGS_DIR, 'hackernews-state.json');
const LOG_FILE = path.join(LOGS_DIR, 'hackernews-marketing.log');

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

// HN-style submissions - technical, value-focused, no marketing fluff
const SUBMISSIONS = [
    {
        id: 'claude-droid-show',
        type: 'Show HN',
        title: 'Show HN: I built a YouTube Shorts automation system with Claude AI',
        url: 'https://ai-solutions.store/claude-droid',
        text: `After months of manual video creation, I automated the entire pipeline:

- RSS feeds → trending topics
- Claude AI → script generation
- FFmpeg → video rendering
- YouTube API → automatic uploads

Running 4 videos/day on autopilot. The system monitors news feeds, generates scripts, renders with stock footage, and uploads - all unattended.

Built with Node.js, FFmpeg, Claude API. Source available for $299 (one-time, no subscription).

Happy to answer questions about the architecture or share learnings from 6 months of running this.`,
        product: 'claude-droid'
    },
    {
        id: 'income-droid-show',
        type: 'Show HN',
        title: 'Show HN: Multi-platform content syndication engine I built for passive income',
        url: 'https://ai-solutions.store/income-droid',
        text: `Built a system that takes one piece of content and distributes it across multiple platforms automatically:

- YouTube (Shorts + long-form)
- TikTok
- Instagram Reels
- Twitter/X threads
- Blog posts

Each platform gets format-optimized content. The AI rewrites for each audience.

Currently generating ~$2k/month in ad revenue across channels. Took about 3 months to build and tune.

Tech stack: Node.js, Claude API, various platform APIs.

Would love feedback on the approach. Source available at ai-solutions.store.`,
        product: 'income-droid'
    },
    {
        id: 'marketing-engine-show',
        type: 'Show HN',
        title: 'Show HN: 24/7 marketing automation engine running on a single node',
        url: 'https://ai-solutions.store/marketing-engine',
        text: `Got tired of manually posting to social media, so I built a marketing engine that runs continuously:

Platforms covered:
- Twitter (rate-limit aware, 9 tweets/day)
- Discord webhooks
- Reddit (using Devvit)
- Telegram channels
- Dev.to articles
- More coming

Each platform has content variations to avoid repetition. The system tracks what was posted and rotates through templates.

Running on PM2 on a Windows machine. Uses about 50MB RAM.

Interested in how others approach automated marketing without getting flagged as spam.`,
        product: 'marketing-engine'
    },
    {
        id: 'jules-ai-show',
        type: 'Show HN',
        title: 'Show HN: AI agent dashboard for monitoring autonomous tasks',
        url: 'https://ai-solutions.store/jules-ai',
        text: `Built a dashboard for monitoring AI agents running various automation tasks:

Features:
- Real-time task status
- Error tracking and alerts
- Resource usage monitoring
- Task scheduling interface
- Multi-node fleet management

Currently managing 4 nodes (2 local, 1 EC2, 1 auxiliary) running different workloads.

Built with vanilla JS (no framework), deployed on Cloudflare Pages. The backend is a simple Express API.

Looking for feedback on the monitoring approach. What metrics do you track for your AI agents?`,
        product: 'jules-ai'
    },
    {
        id: 'ai-automation-article',
        type: 'Article',
        title: 'Lessons from 6 months of running AI automation in production',
        url: 'https://ai-solutions.store/blog/lessons-learned',
        text: null, // URL submission only
        product: 'general'
    },
    {
        id: 'cost-analysis',
        type: 'Article',
        title: 'Real costs of running Claude API for content generation ($847/month breakdown)',
        url: 'https://ai-solutions.store/blog/api-costs',
        text: null,
        product: 'general'
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
    return { lastIndex: -1, submissions: [] };
}

function saveState(state) {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function getNextSubmission() {
    const state = getState();
    const nextIndex = (state.lastIndex + 1) % SUBMISSIONS.length;
    return { submission: SUBMISSIONS[nextIndex], index: nextIndex };
}

function generateSubmissionContent() {
    const { submission, index } = getNextSubmission();

    log('═══════════════════════════════════════════════════════════════');
    log('HACKER NEWS CONTENT GENERATOR');
    log('═══════════════════════════════════════════════════════════════');

    log(`\nSubmission ${index + 1} of ${SUBMISSIONS.length}`);
    log(`Type: ${submission.type}`);
    log(`Product: ${submission.product}`);

    log('\n--- SUBMISSION CONTENT ---');
    log(`Title: ${submission.title}`);
    log(`URL: ${submission.url}`);

    if (submission.text) {
        log('\nText (for self-posts):');
        log('---');
        log(submission.text);
        log('---');
    }

    log('\n--- SUBMISSION INSTRUCTIONS ---');
    log('1. Go to: https://news.ycombinator.com/submit');
    log('2. Log in with your HN account');
    log('3. Copy the title and URL above');
    if (submission.text) {
        log('4. For Show HN: paste the text in the "text" field');
        log('   (Leave URL blank for text posts, or include URL for link posts)');
    }
    log('\nBest posting times: 6-9 AM PT (weekdays)');
    log('Avoid: Weekends, holidays, major tech news days');

    // Update state
    const state = getState();
    state.lastIndex = index;
    state.submissions.push({
        id: submission.id,
        generatedAt: new Date().toISOString(),
        title: submission.title
    });
    // Keep only last 50 entries
    if (state.submissions.length > 50) {
        state.submissions = state.submissions.slice(-50);
    }
    saveState(state);

    log('\n═══════════════════════════════════════════════════════════════');
    log('Content generated and logged. Ready for manual submission.');
    log('═══════════════════════════════════════════════════════════════');

    return submission;
}

// Main execution
async function main() {
    try {
        const submission = generateSubmissionContent();
        log(`SUCCESS: Generated HN content for "${submission.title}"`);
        process.exit(0);
    } catch (err) {
        log(`ERROR: ${err.message}`);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

module.exports = { generateSubmissionContent, SUBMISSIONS };
