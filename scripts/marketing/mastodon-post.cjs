/**
 * Mastodon/Fediverse Post Publisher
 * Posts to Mastodon instances via their open API
 *
 * Mastodon API: https://docs.joinmastodon.org/api/
 * Requires: MASTODON_INSTANCE_URL and MASTODON_ACCESS_TOKEN
 *
 * FOR THE KIDS - 60/30/10 (backend only)
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const LOGS_DIR = 'C:\\AiCollabForTheKids\\logs';
const STATE_FILE = path.join(LOGS_DIR, 'mastodon-state.json');
const LOG_FILE = path.join(LOGS_DIR, 'mastodon-marketing.log');

// Get credentials from environment
const MASTODON_INSTANCE = process.env.MASTODON_INSTANCE_URL || 'https://mastodon.social';
const MASTODON_TOKEN = process.env.MASTODON_ACCESS_TOKEN;

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

// Post variations - tech-focused, Fediverse-friendly tone
const POSTS = [
    {
        id: 'youtube-automation',
        content: `Built a YouTube Shorts automation system that runs 24/7.

The stack:
- Node.js orchestration
- Claude AI for scripts
- FFmpeg for rendering
- YouTube Data API

Creates 4 videos/day while I sleep.

Full source: ai-solutions.store/claude-droid

#AI #Automation #NodeJS #YouTubeShorts #OpenSource`
    },
    {
        id: 'marketing-engine',
        content: `Running a 12-platform marketing engine from a single Node.js process.

Platforms:
- Twitter, Discord, Reddit
- Telegram, Dev.to, Hashnode
- Product Hunt, HN content

~50MB RAM, zero daily maintenance.

Code: ai-solutions.store/marketing-engine

#Automation #Marketing #NodeJS #IndieHacker`
    },
    {
        id: 'passive-income',
        content: `Built $2k/month in automated income streams:

1. YouTube automation ($1,200/mo)
   - AI-generated content
   - Auto uploads

2. Content syndication ($600/mo)
   - One piece → multiple platforms

3. Marketing engine ($200/mo indirect)
   - Drives traffic 24/7

Details: ai-solutions.store

#PassiveIncome #AI #Automation #IndieHacker`
    },
    {
        id: 'no-subscriptions',
        content: `Hot take: Stop paying monthly for AI tools.

Our products are one-time purchases:
- Claude Droid $299
- Income Droid $499
- Marketing Engine $199

Own the code. Run it yourself. No vendor lock-in.

ai-solutions.store

#NoSubscription #SelfHosted #AI #IndieWeb`
    },
    {
        id: 'consultation',
        content: `Offering $1 AI consultations.

Not a gimmick - 30 minutes of honest advice:
- What to automate
- Which AI tools actually work
- How to avoid subscription traps

No upsells. Just help.

Book: ai-solutions.store

#AI #Consulting #IndieHacker #Automation`
    },
    {
        id: 'tech-stack',
        content: `My automation tech stack (all self-hosted):

- PM2 for process management
- Node.js for orchestration
- PowerShell for Windows tasks
- Cloudflare for hosting/CDN
- Square for payments (no Stripe fees)

Total monthly cost: ~$100
Monthly revenue: $2,000+

#SelfHosted #IndieHacker #TechStack #Automation`
    },
    {
        id: 'dev-tools',
        content: `Tools I use daily for AI automation:

Free:
- Claude (via API)
- FFmpeg
- PM2
- Cloudflare Pages

Paid once:
- My own products (dogfooding)

No SaaS subscriptions eating my revenue.

ai-solutions.store

#DevTools #AI #IndieHacker #NoCode`
    },
    {
        id: 'open-approach',
        content: `Why I share my automation code:

1. Others can learn and build
2. Feedback improves the product
3. Transparency builds trust
4. The Fediverse values open

All my AI tools: ai-solutions.store

Source available. No black boxes.

#OpenSource #Transparency #IndieWeb #AI`
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
    return { lastIndex: -1, posts: [] };
}

function saveState(state) {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function getNextPost() {
    const state = getState();
    const nextIndex = (state.lastIndex + 1) % POSTS.length;
    return { post: POSTS[nextIndex], index: nextIndex };
}

// Post to Mastodon via API
function postToMastodon(content) {
    return new Promise((resolve, reject) => {
        const url = new URL(MASTODON_INSTANCE);
        const payload = JSON.stringify({ status: content });

        const options = {
            hostname: url.hostname,
            port: 443,
            path: '/api/v1/statuses',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload),
                'Authorization': `Bearer ${MASTODON_TOKEN}`,
                'User-Agent': 'AI-Solutions-Marketing/1.0'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                log(`Mastodon API Response: ${res.statusCode}`);
                if (data) {
                    log(`Response: ${data.substring(0, 300)}`);
                }
                try {
                    const response = JSON.parse(data);
                    if (res.statusCode === 200 || res.statusCode === 201) {
                        resolve(response);
                    } else {
                        reject(new Error(response.error || `Status ${res.statusCode}`));
                    }
                } catch (e) {
                    reject(new Error(`Parse error: ${e.message}`));
                }
            });
        });

        req.on('error', reject);
        req.write(payload);
        req.end();
    });
}

async function main() {
    const { post, index } = getNextPost();

    log('═══════════════════════════════════════════════════════════════');
    log('MASTODON/FEDIVERSE PUBLISHER');
    log(`Instance: ${MASTODON_INSTANCE}`);
    log('═══════════════════════════════════════════════════════════════');

    log(`\nPost ${index + 1} of ${POSTS.length}: ${post.id}`);
    log(`Content preview: ${post.content.substring(0, 100)}...`);

    if (!MASTODON_TOKEN) {
        log('\nMissing credentials. To set up:');
        log('1. Go to your Mastodon instance Settings > Development');
        log('2. Create a new application');
        log('3. Copy the access token');
        log('4. Set MASTODON_INSTANCE_URL and MASTODON_ACCESS_TOKEN in api/.env');
        log('\nPopular instances: mastodon.social, hachyderm.io, fosstodon.org');

        // Still update state to rotate posts
        const state = getState();
        state.lastIndex = index;
        state.posts.push({
            id: post.id,
            generatedAt: new Date().toISOString(),
            status: 'skipped_no_credentials'
        });
        if (state.posts.length > 50) state.posts = state.posts.slice(-50);
        saveState(state);

        process.exit(0);
        return;
    }

    try {
        log('\nPosting to Mastodon...');
        const result = await postToMastodon(post.content);

        // Update state
        const state = getState();
        state.lastIndex = index;
        state.posts.push({
            id: post.id,
            mastodonId: result.id,
            url: result.url,
            postedAt: new Date().toISOString()
        });
        if (state.posts.length > 50) state.posts = state.posts.slice(-50);
        saveState(state);

        log('\n═══════════════════════════════════════════════════════════════');
        log(`SUCCESS: Posted to Mastodon`);
        log(`URL: ${result.url}`);
        log('═══════════════════════════════════════════════════════════════');

        process.exit(0);
    } catch (err) {
        log(`ERROR: ${err.message}`);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

module.exports = { postToMastodon, POSTS };
