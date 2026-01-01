/**
 * Reddit Marketing via Devvit OAuth Token
 * Posts to subreddits using the authenticated Devvit CLI token
 *
 * FOR THE KIDS - 60/30/10
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Load Devvit token
const TOKEN_PATH = path.join(process.env.USERPROFILE || 'C:\\Users\\t55o', '.devvit', 'token');
const LOGS_DIR = 'C:\\AiCollabForTheKids\\logs';

// Ensure logs directory exists
if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
}

const logFile = path.join(LOGS_DIR, 'reddit-marketing.log');

function log(message) {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(logFile, entry);
    console.log(entry.trim());
}

function getAccessToken() {
    try {
        const fileContent = fs.readFileSync(TOKEN_PATH, 'utf8');
        const tokenData = JSON.parse(fileContent);

        // The token field is base64 encoded JSON
        const tokenB64 = tokenData.token;
        const decoded = Buffer.from(tokenB64, 'base64').toString('utf8');
        const tokenPayload = JSON.parse(decoded);

        const expiresAt = new Date(tokenPayload.expiresAt);
        log(`Token expires at: ${expiresAt.toISOString()}`);

        if (expiresAt < new Date()) {
            log('WARNING: Token may be expired. Run: cd forthekids-auto && npx devvit login');
        }

        return tokenPayload.accessToken;
    } catch (err) {
        log(`ERROR: Failed to read Devvit token: ${err.message}`);
        log(`Token path: ${TOKEN_PATH}`);
        return null;
    }
}

// Post templates by subreddit and product
const POST_TEMPLATES = {
    'claude-droid': {
        'SideProject': {
            title: 'Built an AI that turns news into YouTube Shorts on autopilot',
            text: `I got tired of manually creating content for YouTube, so I built a system that does it while I sleep.

It pulls trending news headlines, generates a script using Claude AI, creates a voiceover with text-to-speech, renders the video with FFmpeg, and uploads directly to YouTube.

**The problem I was solving:**
- Creating consistent video content is exhausting
- Editing takes forever
- I couldn't maintain the posting frequency needed for growth

**What it does:**
- Monitors news RSS feeds
- Generates contextual scripts (not just headline reading)
- Auto-renders and uploads 4 videos daily

Happy to answer questions about the architecture. Built with Node.js + Claude API.

https://ai-solutions.store/claude-droid`
        },
        'EntrepreneurRideAlong': {
            title: 'From 0 to 4 YouTube videos/day without touching my keyboard',
            text: `Sharing my automation journey - built a system that creates and uploads YouTube Shorts automatically.

**The Setup:**
- News feed monitoring
- AI script generation (Claude)
- Text-to-speech rendering
- Automatic YouTube upload

**Why I built it:**
Video content is king but production is a nightmare. This removes the bottleneck.

**Results so far:**
- 120+ videos created in first month
- Growing subscribers while I focus on other projects

Full system available at https://ai-solutions.store if anyone wants to skip the build time.`
        }
    },
    'income-droid': {
        'SideProject': {
            title: 'Built a passive income engine that creates monetizable videos 24/7',
            text: `After months of manual video creation, I automated the entire workflow.

**Income Droid generates:**
- 4 revenue-optimized videos daily
- Trending topic selection
- SEO-optimized titles/descriptions
- Automatic monetization tags

**The tech stack:**
- Node.js orchestration
- Claude AI for scripts
- FFmpeg for rendering
- YouTube API for uploads

The goal was truly passive content creation. Now I wake up to new videos posted while I slept.

Details: https://ai-solutions.store/income-droid`
        }
    },
    'marketing-engine': {
        'SaaS': {
            title: 'Open sourcing my social media automation engine',
            text: `Built this for my own projects, figured others might find it useful.

**What it does:**
- Auto-posts to Twitter, Discord, LinkedIn
- Rotates through content variations
- Respects rate limits
- Runs 24/7 via PM2

**Why I built it:**
Marketing is necessary but repetitive. This handles the posting while I focus on building.

Simple PowerShell + Node.js architecture.

Source: https://ai-solutions.store/marketing-engine`
        }
    }
};

// Subreddit rotation
const SUBREDDITS = ['SideProject', 'EntrepreneurRideAlong', 'Startup_Ideas', 'SaaS'];
const PRODUCTS = ['claude-droid', 'income-droid', 'marketing-engine'];

let postIndex = 0;

function getNextPost() {
    const product = PRODUCTS[postIndex % PRODUCTS.length];
    const subreddit = SUBREDDITS[Math.floor(postIndex / PRODUCTS.length) % SUBREDDITS.length];
    postIndex++;

    const templates = POST_TEMPLATES[product];
    if (!templates) return null;

    const template = templates[subreddit];
    if (!template) {
        // Fallback to first available template for this product
        const fallbackSub = Object.keys(templates)[0];
        return { subreddit, ...templates[fallbackSub] };
    }

    return { subreddit, ...template };
}

function postToReddit(accessToken, subreddit, title, text) {
    return new Promise((resolve, reject) => {
        const postData = new URLSearchParams({
            api_type: 'json',
            kind: 'self',
            sr: subreddit,
            title: title,
            text: text,
            sendreplies: 'true'
        }).toString();

        const options = {
            hostname: 'oauth.reddit.com',
            port: 443,
            path: '/api/submit',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'User-Agent': 'windows:ai-solutions-store:v1.0 (by /u/GamersVsCancer)',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const response = JSON.parse(data);
                    if (response.json && response.json.errors && response.json.errors.length > 0) {
                        reject(new Error(response.json.errors[0].join(': ')));
                    } else if (response.json && response.json.data && response.json.data.url) {
                        resolve(response.json.data.url);
                    } else {
                        resolve(data);
                    }
                } catch (e) {
                    resolve(data);
                }
            });
        });

        req.on('error', reject);
        req.write(postData);
        req.end();
    });
}

async function main() {
    log('═══════════════════════════════════════════════════════════════');
    log('REDDIT MARKETING - Devvit OAuth');
    log('Account: u/GamersVsCancer');
    log('FOR THE KIDS - 60/30/10');
    log('═══════════════════════════════════════════════════════════════');

    const accessToken = getAccessToken();
    if (!accessToken) {
        log('ERROR: No access token available. Run: npx devvit login');
        process.exit(1);
    }

    const post = getNextPost();
    if (!post) {
        log('ERROR: No post template available');
        process.exit(1);
    }

    log(`Posting to r/${post.subreddit}: ${post.title}`);

    try {
        const result = await postToReddit(accessToken, post.subreddit, post.title, post.text);
        log(`SUCCESS: Posted to r/${post.subreddit}`);
        log(`URL: ${result}`);
    } catch (err) {
        log(`FAILED: ${err.message}`);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main().catch(err => {
        log(`Fatal error: ${err.message}`);
        process.exit(1);
    });
}

module.exports = { postToReddit, getAccessToken, getNextPost };
