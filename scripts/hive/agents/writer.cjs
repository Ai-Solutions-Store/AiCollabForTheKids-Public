// C:\AiCollabForTheKids\scripts\hive\agents\writer.js
// OPUS HIVE - WRITER AGENT v1.0.0
// The Content Creator - Generates social posts with Algorithmic Camouflage
// FOR THE KIDS. ALWAYS.

const fs = require('fs');
const path = require('path');

// Import tag bank for viral tagging
let tagBank;
try {
    tagBank = require('../../marketing/tag-bank.cjs');
} catch (err) {
    // Fallback if tag-bank not available
    tagBank = {
        getViralTags: (cat, count) => '#AI #Tech #BuildInPublic #GoodVibes',
        getPlatformTags: (cat, platform) => '#AI #Tech #BuildInPublic'
    };
}

const LOG_FILE = path.join(__dirname, '../../../logs/writer-agent.log');
const OUTPUT_DIR = path.join(__dirname, '../../../logs/generated-content');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Content templates by category - BUSINESS FIRST (no charity begging)
const TEMPLATES = {
    tech: [
        "Built something cool this week. {trend} is changing the game.",
        "Stop building in secret. Ship it. {trend} waits for no one.",
        "The future of {trend} is now. Are you building or watching?",
        "Real talk: {trend} will make or break your next project.",
        "Just deployed a {trend} solution. The grind never stops."
    ],
    merch: [
        "New drop just hit. {trend} vibes only.",
        "Your fit needs an upgrade. {trend} aesthetic loading...",
        "Copped the new gear. {trend} season is here.",
        "Fresh threads, fresh mindset. {trend} energy.",
        "The drip speaks for itself. {trend} collection live."
    ],
    dating: [
        "Tired of swiping? {trend} is the move.",
        "Dating apps are broken. {trend} fixes that.",
        "Hot take: {trend} > endless swiping.",
        "Real connections over algorithm games. {trend}.",
        "Your love life needs {trend}. Trust."
    ],
    income: [
        "Passive income isn't a dream. {trend} makes it real.",
        "While you sleep, {trend} works.",
        "Side hustle culture meets {trend}.",
        "Financial freedom starts with {trend}.",
        "The {trend} playbook: automate everything."
    ]
};

const STORE_URL = 'https://www.ai-solutions.store';
const DATING_URL = 'https://youandinotai.com';

function log(message) {
    const timestamp = new Date().toISOString();
    const logLine = `[${timestamp}] [WRITER] ${message}`;
    console.log(logLine);
    try {
        fs.appendFileSync(LOG_FILE, logLine + '\n');
    } catch (err) {
        // Ignore
    }
}

function getTemplate(category) {
    const pool = TEMPLATES[category] || TEMPLATES.tech;
    return pool[Math.floor(Math.random() * pool.length)];
}

function getUrl(category) {
    return category === 'dating' ? DATING_URL : STORE_URL;
}

function generatePost(category, trend, platform = 'twitter') {
    const template = getTemplate(category);
    const body = template.replace('{trend}', trend);
    const url = getUrl(category);
    const tags = tagBank.getPlatformTags(category, platform);

    // Compose final post
    const post = `${body}\n\n${url}\n\n${tags}`;

    return {
        body: body,
        url: url,
        tags: tags,
        fullPost: post,
        platform: platform,
        charCount: post.length
    };
}

/**
 * Execute writer job
 * @param {Object} job - Job object with category and trend
 * @returns {Object} Generated content
 */
async function execute(job) {
    const category = job.category || 'tech';
    const trend = job.trend || 'AI Automation';
    const platform = job.platform || 'twitter';

    log(`Writing content for: ${category} / "${trend}" / ${platform}`);

    try {
        const content = generatePost(category, trend, platform);

        // Save to file for later use
        const filename = `${category}-${Date.now()}.json`;
        const filepath = path.join(OUTPUT_DIR, filename);

        const output = {
            ...content,
            category: category,
            trend: trend,
            generatedAt: new Date().toISOString(),
            jobId: job.id
        };

        fs.writeFileSync(filepath, JSON.stringify(output, null, 2));
        log(`Content saved to: ${filename}`);

        // Also save as ready-to-post markdown
        const mdFilename = `${category}-${Date.now()}.md`;
        const mdFilepath = path.join(OUTPUT_DIR, mdFilename);
        const mdContent = `# Generated Post - ${category}

**Trend:** ${trend}
**Platform:** ${platform}
**Generated:** ${new Date().toISOString()}

---

${content.fullPost}

---

**Character Count:** ${content.charCount}
**Ready to Post:** Yes
`;
        fs.writeFileSync(mdFilepath, mdContent);

        return {
            success: true,
            category: category,
            trend: trend,
            platform: platform,
            post: content.fullPost,
            charCount: content.charCount,
            savedTo: filename,
            generatedAt: new Date().toISOString()
        };
    } catch (err) {
        log(`Writer failed: ${err.message}`);
        throw err;
    }
}

module.exports = { execute, generatePost, TEMPLATES };
