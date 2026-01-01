/**
 * Pinterest Pin Creator
 * Creates pins via Pinterest API for visual marketing
 *
 * Pinterest API: https://developers.pinterest.com/docs/api/v5/
 * Requires: PINTEREST_ACCESS_TOKEN and PINTEREST_BOARD_ID
 *
 * FOR THE KIDS - 60/30/10 (backend only)
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const LOGS_DIR = 'C:\\AiCollabForTheKids\\logs';
const STATE_FILE = path.join(LOGS_DIR, 'pinterest-state.json');
const LOG_FILE = path.join(LOGS_DIR, 'pinterest-marketing.log');

// Get credentials from environment
const PINTEREST_TOKEN = process.env.PINTEREST_ACCESS_TOKEN;
const PINTEREST_BOARD_ID = process.env.PINTEREST_BOARD_ID;

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

// Pin templates - visual, e-commerce friendly
const PINS = [
    {
        id: 'claude-droid-pin',
        title: 'YouTube Automation System - Create Shorts While You Sleep',
        description: `Automate your YouTube Shorts creation with AI.

What it does:
✓ Pulls trending topics automatically
✓ Generates scripts with Claude AI
✓ Renders videos with FFmpeg
✓ Uploads to YouTube 24/7

One-time $299 - No subscriptions.
Full source code included.

#YouTubeAutomation #AI #PassiveIncome #ContentCreation #Automation`,
        link: 'https://ai-solutions.store/claude-droid',
        // Use a placeholder - in production, would use actual image URLs
        imageUrl: 'https://ai-solutions.store/images/claude-droid-pin.png'
    },
    {
        id: 'income-droid-pin',
        title: 'Build Passive Income with AI Automation',
        description: `Turn AI into income streams that work 24/7.

Income Droid includes:
✓ YouTube monetization system
✓ Content syndication engine
✓ Multi-platform distribution
✓ Revenue tracking dashboard

$499 one-time purchase.
No monthly fees. Ever.

#PassiveIncome #AI #Automation #OnlineBusiness #SideHustle`,
        link: 'https://ai-solutions.store/income-droid',
        imageUrl: 'https://ai-solutions.store/images/income-droid-pin.png'
    },
    {
        id: 'marketing-engine-pin',
        title: '24/7 Marketing Automation - 12 Platforms, Zero Effort',
        description: `Automate your marketing across 12 platforms.

Included platforms:
✓ Twitter, Discord, Reddit
✓ Telegram, Dev.to, Hashnode
✓ Product Hunt prep, HN content

Set it up once. It runs forever.
$199 one-time purchase.

#MarketingAutomation #SocialMedia #Automation #IndieHacker #Startup`,
        link: 'https://ai-solutions.store/marketing-engine',
        imageUrl: 'https://ai-solutions.store/images/marketing-engine-pin.png'
    },
    {
        id: 'consultation-pin',
        title: '$1 AI Consultation - Real Advice, No Upsells',
        description: `Get honest AI automation advice for just $1.

30 minutes covers:
✓ What to automate in your business
✓ Which AI tools actually work
✓ How to avoid subscription traps
✓ Custom recommendations

No pressure. No upsells. Just help.

#AIConsulting #BusinessAdvice #Automation #SmallBusiness`,
        link: 'https://ai-solutions.store',
        imageUrl: 'https://ai-solutions.store/images/consultation-pin.png'
    },
    {
        id: 'no-subscription-pin',
        title: 'Own Your AI Tools - No Monthly Subscriptions',
        description: `Stop paying monthly for AI software.

Our one-time purchases:
• Claude Droid - $299
• Income Droid - $499
• Marketing Engine - $199
• Jules AI Dashboard - $399

Full source code. Self-hosted. No vendor lock-in.

#NoSubscription #AITools #SelfHosted #SaveMoney #Business`,
        link: 'https://ai-solutions.store',
        imageUrl: 'https://ai-solutions.store/images/no-subscription-pin.png'
    },
    {
        id: 'tech-stack-pin',
        title: 'My $2k/Month Automation Tech Stack',
        description: `The exact tools generating $2,000/month passively:

Tech Stack:
• Node.js + PM2
• Claude AI API
• FFmpeg
• Cloudflare Pages
• Square Payments

Monthly cost: ~$100
Monthly revenue: $2,000+

Learn more at ai-solutions.store

#TechStack #Automation #PassiveIncome #Developer #IndieHacker`,
        link: 'https://ai-solutions.store',
        imageUrl: 'https://ai-solutions.store/images/tech-stack-pin.png'
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
    return { lastIndex: -1, pins: [] };
}

function saveState(state) {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function getNextPin() {
    const state = getState();
    const nextIndex = (state.lastIndex + 1) % PINS.length;
    return { pin: PINS[nextIndex], index: nextIndex };
}

// Create pin via Pinterest API
function createPin(pin) {
    return new Promise((resolve, reject) => {
        const payload = JSON.stringify({
            board_id: PINTEREST_BOARD_ID,
            title: pin.title,
            description: pin.description,
            link: pin.link,
            media_source: {
                source_type: 'image_url',
                url: pin.imageUrl
            }
        });

        const options = {
            hostname: 'api.pinterest.com',
            port: 443,
            path: '/v5/pins',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload),
                'Authorization': `Bearer ${PINTEREST_TOKEN}`,
                'User-Agent': 'AI-Solutions-Marketing/1.0'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                log(`Pinterest API Response: ${res.statusCode}`);
                if (data) {
                    log(`Response: ${data.substring(0, 300)}`);
                }
                try {
                    const response = JSON.parse(data);
                    if (res.statusCode === 200 || res.statusCode === 201) {
                        resolve(response);
                    } else {
                        reject(new Error(response.message || `Status ${res.statusCode}`));
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
    const { pin, index } = getNextPin();

    log('═══════════════════════════════════════════════════════════════');
    log('PINTEREST PIN CREATOR');
    log('═══════════════════════════════════════════════════════════════');

    log(`\nPin ${index + 1} of ${PINS.length}: ${pin.title}`);
    log(`Link: ${pin.link}`);

    if (!PINTEREST_TOKEN || !PINTEREST_BOARD_ID) {
        log('\nMissing credentials. To set up:');
        log('1. Go to https://developers.pinterest.com/apps/');
        log('2. Create a new app');
        log('3. Generate an access token with pins:write scope');
        log('4. Get your board ID from the board URL');
        log('5. Set PINTEREST_ACCESS_TOKEN and PINTEREST_BOARD_ID in api/.env');
        log('\nNote: Pinterest requires real image URLs for pins');

        // Generate content for manual pinning
        log('\n--- CONTENT FOR MANUAL PINNING ---');
        log(`Title: ${pin.title}`);
        log(`Description:\n${pin.description}`);
        log(`Link: ${pin.link}`);
        log('--- END CONTENT ---');

        // Still update state to rotate pins
        const state = getState();
        state.lastIndex = index;
        state.pins.push({
            id: pin.id,
            generatedAt: new Date().toISOString(),
            title: pin.title,
            status: 'content_generated'
        });
        if (state.pins.length > 50) state.pins = state.pins.slice(-50);
        saveState(state);

        process.exit(0);
        return;
    }

    try {
        log('\nCreating Pinterest Pin...');
        const result = await createPin(pin);

        // Update state
        const state = getState();
        state.lastIndex = index;
        state.pins.push({
            id: pin.id,
            pinterestId: result.id,
            postedAt: new Date().toISOString(),
            title: pin.title
        });
        if (state.pins.length > 50) state.pins = state.pins.slice(-50);
        saveState(state);

        log('\n═══════════════════════════════════════════════════════════════');
        log(`SUCCESS: Created Pin "${pin.title}"`);
        log(`Pin ID: ${result.id}`);
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

module.exports = { createPin, PINS };
