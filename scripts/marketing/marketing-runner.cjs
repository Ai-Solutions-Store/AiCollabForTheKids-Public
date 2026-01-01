/**
 * Marketing Runner - Node.js wrapper for PM2
 * Executes PowerShell marketing scripts on schedule
 * FOR THE KIDS - 60/30/10
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env (always override)
const envPath = 'C:\\AiCollabForTheKids\\api\\.env';
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    // Handle both LF and CRLF line endings
    envContent.split(/\r?\n/).forEach(line => {
        const match = line.match(/^([^#=]+)=(.*)$/);
        if (match) {
            const key = match[1].trim();
            const value = match[2].trim();
            process.env[key] = value;
        }
    });
    console.log('Loaded env vars: TELEGRAM_BOT_TOKEN=' + (process.env.TELEGRAM_BOT_TOKEN ? 'SET' : 'MISSING'));
    console.log('Loaded env vars: DEV_TO_API_KEY=' + (process.env.DEV_TO_API_KEY ? 'SET' : 'MISSING'));
    console.log('Loaded env vars: HASHNODE_API_KEY=' + (process.env.HASHNODE_API_KEY ? 'SET' : 'MISSING'));
    console.log('Loaded env vars: HASHNODE_PUBLICATION_ID=' + (process.env.HASHNODE_PUBLICATION_ID ? 'SET' : 'MISSING'));
    console.log('Loaded env vars: MASTODON_ACCESS_TOKEN=' + (process.env.MASTODON_ACCESS_TOKEN ? 'SET' : 'MISSING'));
    console.log('Loaded env vars: PINTEREST_ACCESS_TOKEN=' + (process.env.PINTEREST_ACCESS_TOKEN ? 'SET' : 'MISSING'));
}

const SCRIPTS_DIR = 'C:\\AiCollabForTheKids\\scripts\\marketing';
const LOGS_DIR = 'C:\\AiCollabForTheKids\\logs';

// Ensure logs directory exists
if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
}

const logFile = path.join(LOGS_DIR, 'marketing-runner.log');

function log(message) {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(logFile, entry);
    console.log(entry.trim());
}

function runScript(scriptPath, args = [], isNode = false) {
    return new Promise((resolve, reject) => {
        const argsStr = args.length ? ` ${args.join(' ')}` : '';
        log(`Executing: ${scriptPath}${argsStr}`);

        // Pass environment variables to child processes
        const spawnOptions = {
            cwd: SCRIPTS_DIR,
            env: { ...process.env }
        };

        let proc;
        if (isNode) {
            proc = spawn('node', [scriptPath, ...args], spawnOptions);
        } else {
            const psArgs = ['-ExecutionPolicy', 'Bypass', '-File', scriptPath, ...args];
            proc = spawn('powershell.exe', psArgs, spawnOptions);
        }

        let output = '';
        let errorOutput = '';

        proc.stdout.on('data', (data) => {
            output += data.toString();
        });

        proc.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });

        proc.on('close', (code) => {
            if (code === 0) {
                log(`SUCCESS: ${path.basename(scriptPath)}`);
                resolve(output);
            } else {
                log(`FAILED: ${path.basename(scriptPath)} - Code ${code}`);
                log(`Error: ${errorOutput}`);
                resolve(null); // Don't reject, continue with other tasks
            }
        });

        proc.on('error', (err) => {
            log(`ERROR: ${err.message}`);
            resolve(null);
        });
    });
}

// Backwards compatible alias
function runPowerShellScript(scriptPath, args = []) {
    return runScript(scriptPath, args, false);
}

// Reddit subreddit/product rotation
const REDDIT_SUBREDDITS = ['SideProject', 'EntrepreneurRideAlong', 'Startup_Ideas', 'SaaS'];
const REDDIT_PRODUCTS = ['claude-droid', 'income-droid', 'marketing-engine', 'jules-ai', 'affiliate-system', 'dating-platform'];
let redditIndex = 0;

function getNextRedditArgs() {
    const subreddit = REDDIT_SUBREDDITS[redditIndex % REDDIT_SUBREDDITS.length];
    const product = REDDIT_PRODUCTS[Math.floor(redditIndex / REDDIT_SUBREDDITS.length) % REDDIT_PRODUCTS.length];
    redditIndex++;
    return ['-Subreddit', subreddit, '-Product', product];
}

// Twitter has 50 tweets/24hr limit. With 5 twitter scripts, space them out.
// Max safe: 10 tweets/day = 1 tweet every 2.4 hours per script
// Adjusted intervals to avoid overlap and rate limits
const MARKETING_TASKS = [
    {
        name: 'Twitter AI Store',
        script: path.join(SCRIPTS_DIR, 'ai-store-tweet.ps1'),
        intervalMinutes: 360 // 6 hours (4 tweets/day)
    },
    {
        name: 'Discord Announcement',
        script: path.join(SCRIPTS_DIR, 'ai-store-discord.ps1'),
        intervalMinutes: 480 // 8 hours (3 posts/day)
    },
    {
        name: 'Reddit Post (Devvit)',
        script: path.join(SCRIPTS_DIR, 'reddit-devvit-post.cjs'),
        intervalMinutes: 720, // 12 hours - respects Reddit 10:1 rule (2 posts/day)
        isNode: true
    },
    {
        name: 'Twitter Urgency',
        script: path.join(SCRIPTS_DIR, '..', 'urgency-tweet.ps1'),
        intervalMinutes: 720 // 12 hours (2 tweets/day)
    },
    {
        name: 'Twitter Founder Story',
        script: path.join(SCRIPTS_DIR, '..', 'founder-tweet.ps1'),
        intervalMinutes: 1440 // 24 hours (1 tweet/day)
    },
    {
        name: 'Twitter AI Story',
        script: path.join(SCRIPTS_DIR, '..', 'ai-story-tweet.ps1'),
        intervalMinutes: 1440 // 24 hours (1 tweet/day)
    },
    {
        name: 'Twitter Gospel',
        script: path.join(SCRIPTS_DIR, '..', 'gospel-tweet.ps1'),
        intervalMinutes: 1440 // 24 hours (1 tweet/day)
    },
    {
        name: 'Dev.to Article',
        script: path.join(SCRIPTS_DIR, 'devto-post.cjs'),
        intervalMinutes: 4320, // 3 days - long-form content
        isNode: true,
        requiresEnv: ['DEV_TO_API_KEY']
    },
    {
        name: 'Telegram Channel',
        script: path.join(SCRIPTS_DIR, 'telegram-post.ps1'),
        intervalMinutes: 480, // 8 hours (3 posts/day)
        requiresEnv: ['TELEGRAM_BOT_TOKEN', 'TELEGRAM_CHANNEL_ID']
    },
    // === NEW PLATFORMS (Dec 22, 2025) ===
    {
        name: 'Hacker News Content',
        script: path.join(SCRIPTS_DIR, 'hackernews-post.cjs'),
        intervalMinutes: 10080, // 7 days - generates content for manual HN submission
        isNode: true
    },
    {
        name: 'Product Hunt Content',
        script: path.join(SCRIPTS_DIR, 'producthunt-post.cjs'),
        intervalMinutes: 10080, // 7 days - generates launch content
        isNode: true,
        requiresEnv: [] // Optional: PRODUCTHUNT_ACCESS_TOKEN for API posting
    },
    {
        name: 'Hashnode Article',
        script: path.join(SCRIPTS_DIR, 'hashnode-post.cjs'),
        intervalMinutes: 4320, // 3 days - long-form content
        isNode: true,
        requiresEnv: ['HASHNODE_API_KEY', 'HASHNODE_PUBLICATION_ID']
    },
    // === MORE NEW PLATFORMS (Dec 22, 2025 - Batch 2) ===
    {
        name: 'Mastodon/Fediverse',
        script: path.join(SCRIPTS_DIR, 'mastodon-post.cjs'),
        intervalMinutes: 480, // 8 hours (3 posts/day)
        isNode: true,
        requiresEnv: ['MASTODON_ACCESS_TOKEN']
    },
    {
        name: 'Pinterest Pins',
        script: path.join(SCRIPTS_DIR, 'pinterest-post.cjs'),
        intervalMinutes: 1440, // 24 hours (1 pin/day) - generates content even without API
        isNode: true,
        requiresEnv: [] // Optional: PINTEREST_ACCESS_TOKEN for API posting
    },
    {
        name: 'IndieHackers Content',
        script: path.join(SCRIPTS_DIR, 'indiehackers-post.cjs'),
        intervalMinutes: 10080, // 7 days - generates authentic founder content
        isNode: true
    },
    {
        name: 'Quora Answers',
        script: path.join(SCRIPTS_DIR, 'quora-post.cjs'),
        intervalMinutes: 4320, // 3 days - SEO-optimized Q&A content
        isNode: true
    },
    {
        name: 'GitHub Content',
        script: path.join(SCRIPTS_DIR, 'github-sponsor-content.cjs'),
        intervalMinutes: 10080, // 7 days - README, discussions, sponsor tiers
        isNode: true
    },
    // === YOUANDINOTAI DATING APP (Dec 24, 2025) ===
    {
        name: 'YouAndINotAI Tweet',
        script: path.join(SCRIPTS_DIR, 'youandinotai-tweet.ps1'),
        intervalMinutes: 720 // 12 hours (2 tweets/day) - dating app promo
    },
    {
        name: 'YouAndINotAI TikTok Content',
        script: path.join(SCRIPTS_DIR, 'youandinotai-tiktok.cjs'),
        intervalMinutes: 1440, // 24 hours - video content ideas
        isNode: true
    },
    {
        name: 'Holiday Campaign',
        script: path.join(SCRIPTS_DIR, 'holiday-campaign.cjs'),
        intervalMinutes: 720, // 12 hours - urgency content
        isNode: true
    },
    // === NEW PLATFORMS (Dec 24, 2025 - Batch 3) ===
    {
        name: 'Threads Content',
        script: path.join(SCRIPTS_DIR, 'threads-post.cjs'),
        intervalMinutes: 480, // 8 hours (3 posts/day)
        isNode: true
    },
    {
        name: 'Substack Newsletter',
        script: path.join(SCRIPTS_DIR, 'substack-post.cjs'),
        intervalMinutes: 10080, // 7 days - weekly newsletter
        isNode: true
    },
    {
        name: 'Facebook Groups Content',
        script: path.join(SCRIPTS_DIR, 'facebook-groups-post.cjs'),
        intervalMinutes: 4320, // 3 days - community posts
        isNode: true
    }
];
// Total tweets/day now: 4 + 2 + 1 + 1 + 1 = 9 (well under 50 limit)
// Platform count: 23 total (17 + 3 new date app + 3 new batch 3)

// Track last run times
const lastRuns = {};

function checkEnvRequirements(task) {
    if (!task.requiresEnv) return true;
    for (const envVar of task.requiresEnv) {
        if (!process.env[envVar]) {
            return false;
        }
    }
    return true;
}

async function runScheduledTasks() {
    const now = Date.now();

    for (const task of MARKETING_TASKS) {
        const lastRun = lastRuns[task.name] || 0;
        const intervalMs = task.intervalMinutes * 60 * 1000;

        if (now - lastRun >= intervalMs) {
            // Check env requirements
            if (!checkEnvRequirements(task)) {
                log(`SKIP ${task.name}: Missing required env vars (${task.requiresEnv.join(', ')})`);
                lastRuns[task.name] = now; // Don't spam logs
                continue;
            }

            if (fs.existsSync(task.script)) {
                const args = task.getArgs ? task.getArgs() : [];
                await runScript(task.script, args, task.isNode || false);
                lastRuns[task.name] = now;
            } else {
                log(`Script not found: ${task.script}`);
            }
            // Small delay between tasks
            await new Promise(r => setTimeout(r, 30000));
        }
    }
}

async function main() {
    log('═══════════════════════════════════════════════════════════════');
    log('24/7 MARKETING ENGINE STARTED - Node.js Runner');
    log(`Node: ${process.env.COMPUTERNAME || 'SABERTOOTH'}`);
    log('FOR THE KIDS - 60/30/10');
    log('═══════════════════════════════════════════════════════════════');

    // Run immediately on startup
    await runScheduledTasks();

    // Then check every 5 minutes
    setInterval(async () => {
        log('Checking scheduled marketing tasks...');
        await runScheduledTasks();
    }, 5 * 60 * 1000);
}

main().catch(err => {
    log(`Fatal error: ${err.message}`);
    process.exit(1);
});
