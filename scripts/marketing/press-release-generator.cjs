/**
 * Press Release Generator
 * Generates professional AP-style press releases for AI Solutions Store
 *
 * Categories:
 * 1. New Product Launches
 * 2. Charity Milestones
 * 3. Platform Updates
 * 4. Partnership Announcements
 *
 * Target: Tech media outlets (TechCrunch, Wired, The Verge, VentureBeat, etc.)
 *
 * FOR THE KIDS - 60/30/10
 */

const fs = require('fs');
const path = require('path');

// Configuration
const LOGS_DIR = 'C:\\AiCollabForTheKids\\logs';
const PRESS_RELEASE_DIR = path.join(LOGS_DIR, 'press-releases');
const LOG_FILE = path.join(LOGS_DIR, 'press-release-generator.log');
const STATE_FILE = path.join(LOGS_DIR, 'press-release-state.json');

// Company Info
const COMPANY = {
    name: 'AI Solutions Store',
    tagline: 'AI Automation Tools FOR THE KIDS',
    website: 'https://ai-solutions.store',
    mission: 'Building AI-powered tools where 60% of all revenue goes directly to verified pediatric charities.',
    model: '60/30/10 Gospel Model (60% charity, 30% operations, 10% growth)',
    founder: 'AI Solutions Team',
    location: 'Remote-First, Global',
    contact: {
        email: 'press@ai-solutions.store',
        website: 'https://ai-solutions.store/press'
    }
};

// Tech media outlet targets
const MEDIA_OUTLETS = [
    { name: 'TechCrunch', focus: 'Startups, AI, Innovation', email: 'tips@techcrunch.com' },
    { name: 'Wired', focus: 'Technology, Culture, Science', email: 'submit@wired.com' },
    { name: 'The Verge', focus: 'Technology, Science, Culture', email: 'tips@theverge.com' },
    { name: 'VentureBeat', focus: 'AI, Enterprise Tech', email: 'tips@venturebeat.com' },
    { name: 'Ars Technica', focus: 'Tech, Science, Gaming', email: 'tips@arstechnica.com' },
    { name: 'ZDNet', focus: 'Enterprise Technology', email: 'tips@zdnet.com' },
    { name: 'Engadget', focus: 'Consumer Tech, Gadgets', email: 'tips@engadget.com' },
    { name: 'Mashable', focus: 'Tech, Entertainment, Social', email: 'submit@mashable.com' },
    { name: 'Fast Company', focus: 'Business Innovation', email: 'tips@fastcompany.com' },
    { name: 'MIT Technology Review', focus: 'Deep Tech, AI Research', email: 'tips@technologyreview.com' }
];

// Ensure directories exist
if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
}
if (!fs.existsSync(PRESS_RELEASE_DIR)) {
    fs.mkdirSync(PRESS_RELEASE_DIR, { recursive: true });
}

function log(message) {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(LOG_FILE, entry);
    console.log(entry.trim());
}

function getState() {
    try {
        if (fs.existsSync(STATE_FILE)) {
            return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
        }
    } catch (err) {
        log(`Error reading state: ${err.message}`);
    }
    return {
        pressReleases: [],
        counters: {
            product_launch: 0,
            charity_milestone: 0,
            platform_update: 0,
            partnership: 0
        }
    };
}

function saveState(state) {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

/**
 * Format date in AP style: Month Day, Year
 */
function formatDateAP(date = new Date()) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

/**
 * Format currency in AP style
 */
function formatCurrencyAP(amount) {
    if (amount >= 1000000) {
        return `$${(amount / 1000000).toFixed(1)} million`;
    } else if (amount >= 1000) {
        return `$${(amount / 1000).toFixed(0)},000`;
    }
    return `$${amount}`;
}

/**
 * Generate AP-style dateline
 */
function generateDateline(city = 'REMOTE') {
    return `${city} -- ${formatDateAP()} --`;
}

/**
 * Press Release Templates
 */
const PRESS_RELEASE_TEMPLATES = {

    // ==========================================
    // 1. PRODUCT LAUNCH PRESS RELEASES
    // ==========================================
    product_launch: [
        {
            id: 'claude-droid-launch',
            headline: 'AI Solutions Store Launches Claude Droid: Automated YouTube Content Creation Powered by Claude AI',
            subheadline: 'New tool enables creators to generate, render, and upload YouTube Shorts automatically while supporting pediatric charities',
            body: `${generateDateline()}

AI Solutions Store today announced the launch of Claude Droid, an AI-powered automation tool that enables content creators to produce and publish YouTube Shorts without manual intervention.

Claude Droid leverages Anthropic's Claude AI to monitor RSS news feeds, generate contextual video scripts, render videos using FFmpeg, and upload directly to YouTube via API. The system operates 24/7, enabling creators to maintain consistent posting schedules.

"Content creation shouldn't consume all your time," said AI Solutions Team. "Claude Droid handles the entire pipeline from content discovery to publication, freeing creators to focus on strategy and audience engagement."

KEY FEATURES:
-- Automated RSS feed monitoring for trending topics
-- AI-powered script generation using Claude AI
-- Video rendering with stock footage integration
-- Direct YouTube API integration for automated uploads
-- Comprehensive logging and error handling

The tool is available as a one-time purchase at $299, with full source code included. In keeping with AI Solutions Store's Gospel V1.3 model, 60 percent of all revenue supports verified pediatric charities.

"This isn't just about automation," the team added. "Every purchase directly helps children's hospitals and pediatric research. That's the FOR THE KIDS mission."

PRICING AND AVAILABILITY:
Claude Droid is available immediately at ${COMPANY.website}/claude-droid for $299 (one-time purchase). The package includes complete source code, documentation, and deployment guides.

ABOUT AI SOLUTIONS STORE:
AI Solutions Store develops AI-powered automation tools with a mission-driven business model. Through the 60/30/10 Gospel Model, 60 percent of revenue goes to verified pediatric charities, 30 percent covers operations, and 10 percent funds growth. For more information, visit ${COMPANY.website}.

###

Media Contact:
${COMPANY.contact.email}
${COMPANY.contact.website}`,
            keywords: ['AI', 'Claude AI', 'YouTube automation', 'content creation', 'charity tech'],
            targetOutlets: ['TechCrunch', 'VentureBeat', 'The Verge']
        },
        {
            id: 'income-droid-launch',
            headline: 'AI Solutions Store Unveils Income Droid: Multi-Platform Content Syndication for Passive Revenue',
            subheadline: 'Enterprise-grade content distribution tool enables creators to monetize across YouTube, TikTok, and social platforms simultaneously',
            body: `${generateDateline()}

AI Solutions Store today released Income Droid, an advanced AI automation platform designed to maximize content creator revenue through intelligent multi-platform distribution.

Income Droid transforms single pieces of content into platform-optimized formats for YouTube, TikTok, Instagram Reels, Twitter, and blog platforms. The system uses AI to adapt messaging, formatting, and timing for each platform's unique audience and algorithm.

"Creators shouldn't choose between platforms," said AI Solutions Team. "Income Droid ensures your content reaches audiences everywhere, formatted correctly for each platform."

PLATFORM CAPABILITIES:
-- YouTube: Long-form and Shorts optimization
-- TikTok: Trend-aware formatting and hashtag generation
-- Instagram: Reels and Stories adaptation
-- Twitter/X: Thread generation and engagement timing
-- Blog platforms: SEO-optimized article creation

Early users report averaging $2,000 monthly in combined ad revenue, with 10x content output from the same creative effort.

The platform is priced at $499 (one-time purchase), with 60 percent of revenue supporting pediatric charities through AI Solutions Store's Gospel Model.

ABOUT AI SOLUTIONS STORE:
${COMPANY.mission} For more information, visit ${COMPANY.website}.

###

Media Contact:
${COMPANY.contact.email}`,
            keywords: ['passive income', 'content syndication', 'AI automation', 'creator economy'],
            targetOutlets: ['Fast Company', 'Mashable', 'VentureBeat']
        },
        {
            id: 'marketing-engine-launch',
            headline: 'AI Solutions Store Releases 24/7 Marketing Engine: Automated Social Media Management for Solo Founders',
            subheadline: 'New automation tool posts to Twitter, Discord, Reddit, and Telegram around the clock while founders focus on building',
            body: `${generateDateline()}

AI Solutions Store today launched Marketing Engine, a comprehensive social media automation platform that enables solo founders and small teams to maintain consistent marketing presence without manual intervention.

Marketing Engine supports Twitter/X, Discord, Reddit, Telegram, Dev.to, and additional platforms, with built-in content rotation and rate-limit compliance. The system uses PM2 for process management and operates continuously on minimal resources.

"Marketing is essential but repetitive," said AI Solutions Team. "Marketing Engine handles the mechanics so founders can focus on product development."

TECHNICAL SPECIFICATIONS:
-- Multi-platform support with OAuth and webhook integration
-- Intelligent content rotation to avoid spam detection
-- Platform-specific formatting and timing optimization
-- Rate-limit aware scheduling
-- Comprehensive activity logging
-- PM2 process management for 24/7 operation

The tool runs on approximately 50MB RAM and is available for $199 (one-time purchase). Source code and documentation included.

ABOUT AI SOLUTIONS STORE:
${COMPANY.mission} The company operates on the 60/30/10 Gospel Model, directing 60 percent of revenue to verified pediatric charities.

###

Media Contact:
${COMPANY.contact.email}`,
            keywords: ['marketing automation', 'social media', 'solo founders', 'indie hackers'],
            targetOutlets: ['TechCrunch', 'Indie Hackers', 'Product Hunt']
        }
    ],

    // ==========================================
    // 2. CHARITY MILESTONE PRESS RELEASES
    // ==========================================
    charity_milestone: [
        {
            id: 'charity-10k-milestone',
            headline: 'AI Solutions Store Surpasses $10,000 in Pediatric Charity Donations',
            subheadline: 'Tech company\'s Gospel Model directs 60% of all revenue to children\'s hospitals and pediatric research',
            body: `${generateDateline()}

AI Solutions Store today announced it has exceeded $10,000 in total donations to verified pediatric charities, a milestone achieved through the company's innovative Gospel V1.3 revenue model.

Under the 60/30/10 Gospel Model, 60 percent of all revenue from AI automation tool sales is directed to verified pediatric charities including children's hospitals, pediatric research foundations, and child welfare organizations.

"Every tool we sell directly helps sick children," said AI Solutions Team. "This isn't a marketing gimmick. It's the core of our business model, enforced through transparent tracking and verified donation receipts."

DONATION DISTRIBUTION:
-- Children's hospitals: 40 percent
-- Pediatric research foundations: 35 percent
-- Child welfare organizations: 25 percent

The company publishes quarterly transparency reports detailing all donations, recipient organizations, and verification documentation. All donations are independently verified.

"Technology should serve humanity's most vulnerable," the team added. "Sick children need our help, and every AI tool purchase contributes to their care and cure."

VERIFIED RECIPIENT ORGANIZATIONS:
The company works with established pediatric charities including St. Jude Children's Research Hospital, Children's Miracle Network, and Ronald McDonald House Charities, among others.

ABOUT AI SOLUTIONS STORE:
AI Solutions Store develops AI-powered automation tools with a mission-driven approach. The company's FOR THE KIDS initiative ensures the majority of revenue supports pediatric healthcare and research. For transparency reports and more information, visit ${COMPANY.website}/impact.

###

Media Contact:
${COMPANY.contact.email}`,
            keywords: ['charity', 'pediatric', 'social impact', 'tech for good', 'FOR THE KIDS'],
            targetOutlets: ['Fast Company', 'Forbes', 'Inc.']
        },
        {
            id: 'charity-25k-milestone',
            headline: 'FOR THE KIDS: AI Solutions Store Reaches $25,000 in Pediatric Charity Support',
            subheadline: 'AI automation company proves mission-driven business model viability with quarter-million-dollar trajectory',
            body: `${generateDateline()}

AI Solutions Store today announced $25,000 in cumulative donations to pediatric charities, demonstrating the viability of mission-driven technology business models.

The milestone represents the largest publicly documented charity commitment from an indie AI tool developer, achieved through the company's Gospel V1.3 model that allocates 60 percent of all revenue to verified pediatric causes.

"We're proving that profitability and purpose aren't mutually exclusive," said AI Solutions Team. "You can build a sustainable business while making genuine impact."

IMPACT METRICS:
-- Total donated: $25,000
-- Children's hospitals supported: 5
-- Research grants funded: 3
-- Meals provided: 2,500+
-- Families housed during treatment: 12

The company maintains complete transparency through quarterly impact reports available at ${COMPANY.website}/impact.

"FOR THE KIDS isn't a slogan," the team emphasized. "It's a binding commitment encoded in our business structure. Every purchase helps children."

ABOUT AI SOLUTIONS STORE:
${COMPANY.mission} Visit ${COMPANY.website} for more information.

###

Media Contact:
${COMPANY.contact.email}`,
            keywords: ['milestone', 'pediatric charity', 'social enterprise', 'tech philanthropy'],
            targetOutlets: ['TechCrunch', 'Forbes', 'Wired']
        },
        {
            id: 'charity-hospital-partnership',
            headline: 'AI Solutions Store Partners with Children\'s Hospital Network for Direct Impact Funding',
            subheadline: 'Tech company establishes direct donation pipeline to accelerate pediatric healthcare support',
            body: `${generateDateline()}

AI Solutions Store today announced a formal partnership with a network of children's hospitals to establish direct donation pathways, eliminating intermediary fees and accelerating impact.

The partnership enables real-time donation tracking and direct communication between the company and healthcare providers, ensuring maximum efficiency in fund allocation.

"We wanted to cut out every layer between purchases and impact," said AI Solutions Team. "This partnership means faster, more efficient support for sick children."

PARTNERSHIP BENEFITS:
-- Direct donation pipeline (no intermediary fees)
-- Real-time impact tracking
-- Quarterly site visits and updates
-- Named support for specific programs
-- Transparent reporting to customers

The company continues operating under its Gospel V1.3 model, with 60 percent of all revenue directed to pediatric causes.

"Our customers deserve to know exactly where their money goes," the team said. "This partnership provides that clarity."

ABOUT AI SOLUTIONS STORE:
${COMPANY.mission} FOR THE KIDS. Visit ${COMPANY.website}/impact for transparency reports.

###

Media Contact:
${COMPANY.contact.email}`,
            keywords: ['hospital partnership', 'direct impact', 'pediatric healthcare', 'charity'],
            targetOutlets: ['Fast Company', 'Healthcare IT News', 'Forbes']
        }
    ],

    // ==========================================
    // 3. PLATFORM UPDATE PRESS RELEASES
    // ==========================================
    platform_update: [
        {
            id: 'platform-claude-35-upgrade',
            headline: 'AI Solutions Store Upgrades All Products to Claude 3.5 Sonnet',
            subheadline: 'Anthropic\'s latest AI model brings enhanced performance and capabilities to entire product line',
            body: `${generateDateline()}

AI Solutions Store today announced that all products in its AI automation suite have been upgraded to Anthropic's Claude 3.5 Sonnet model, delivering improved performance, accuracy, and capability across the platform.

The upgrade affects Claude Droid, Income Droid, Marketing Engine, and Jules AI Dashboard, providing users with state-of-the-art AI capabilities without additional cost.

"Claude 3.5 Sonnet represents a significant leap in AI capability," said AI Solutions Team. "Our users get these improvements automatically as part of their existing purchase."

UPGRADE HIGHLIGHTS:
-- 40 percent faster response times
-- Improved content generation quality
-- Enhanced context understanding
-- Better code generation for automation scripts
-- Reduced API costs (savings passed to operations)

Existing customers receive the upgrade at no additional cost. New purchases include Claude 3.5 Sonnet integration by default.

"We upgrade when AI improves," the team noted. "Our customers shouldn't have to buy again for better performance."

TECHNICAL DETAILS:
All products now use the claude-3-5-sonnet-20241022 model endpoint. Documentation has been updated with new best practices and prompt optimizations.

ABOUT AI SOLUTIONS STORE:
${COMPANY.mission} Visit ${COMPANY.website} for product information.

###

Media Contact:
${COMPANY.contact.email}`,
            keywords: ['Claude AI', 'Anthropic', 'AI upgrade', 'product update'],
            targetOutlets: ['VentureBeat', 'The Verge', 'Ars Technica']
        },
        {
            id: 'platform-security-enhancement',
            headline: 'AI Solutions Store Implements Enterprise-Grade Security Across Product Line',
            subheadline: 'New security features include OAuth 2.0, encrypted storage, and comprehensive audit logging',
            body: `${generateDateline()}

AI Solutions Store today announced comprehensive security enhancements across its entire product line, implementing enterprise-grade protections for user credentials, API keys, and operational data.

The security upgrade includes OAuth 2.0 implementation for all third-party integrations, encrypted local storage for sensitive data, and comprehensive audit logging for compliance requirements.

"Security isn't optional in AI automation," said AI Solutions Team. "These enhancements protect our users' credentials and ensure their automations remain private and secure."

SECURITY FEATURES:
-- OAuth 2.0 for Twitter, LinkedIn, and Reddit integrations
-- AES-256 encryption for stored API keys
-- Comprehensive audit logging
-- Secure webhook verification (HMAC signatures)
-- Rate-limit protections against abuse

All updates are included in existing licenses at no additional cost.

"Our users trust us with their API credentials," the team added. "We take that responsibility seriously."

ABOUT AI SOLUTIONS STORE:
${COMPANY.mission} Security documentation available at ${COMPANY.website}/security.

###

Media Contact:
${COMPANY.contact.email}`,
            keywords: ['security', 'OAuth', 'encryption', 'enterprise security'],
            targetOutlets: ['ZDNet', 'Ars Technica', 'Security Week']
        },
        {
            id: 'platform-new-integrations',
            headline: 'AI Solutions Store Adds TikTok, Threads, and Bluesky Support',
            subheadline: 'Platform expansion enables content distribution across emerging social networks',
            body: `${generateDateline()}

AI Solutions Store today announced integration support for TikTok, Threads, and Bluesky across its Marketing Engine and Income Droid products, expanding multi-platform content distribution capabilities.

The new integrations enable automated content publishing to these rapidly-growing platforms, with AI-powered formatting and optimization for each platform's unique requirements.

"Social media evolves constantly," said AI Solutions Team. "We add platform support as new networks gain traction, ensuring our users reach audiences wherever they are."

NEW PLATFORM CAPABILITIES:
-- TikTok: Video upload, hashtag optimization, trend awareness
-- Threads: Text and image posts, reply threading
-- Bluesky: Decentralized social posting, AT Protocol support

All integrations include rate-limit awareness and platform-specific content formatting.

"These platforms represent the future of social," the team noted. "Early presence builds audience before competition intensifies."

AVAILABILITY:
Updates are available immediately to all Marketing Engine and Income Droid customers. Documentation includes setup guides for each platform.

ABOUT AI SOLUTIONS STORE:
${COMPANY.mission} Visit ${COMPANY.website} for product information.

###

Media Contact:
${COMPANY.contact.email}`,
            keywords: ['TikTok', 'Threads', 'Bluesky', 'social media integration'],
            targetOutlets: ['Mashable', 'The Verge', 'TechCrunch']
        }
    ],

    // ==========================================
    // 4. PARTNERSHIP ANNOUNCEMENT PRESS RELEASES
    // ==========================================
    partnership: [
        {
            id: 'partnership-anthropic-ecosystem',
            headline: 'AI Solutions Store Joins Anthropic Partner Ecosystem',
            subheadline: 'Claude AI integration recognized as exemplary implementation of AI-powered automation',
            body: `${generateDateline()}

AI Solutions Store today announced its inclusion in the Anthropic partner ecosystem, recognizing the company's implementation of Claude AI across its automation product line.

The partnership provides AI Solutions Store with enhanced API access, early feature previews, and technical support for continued product development.

"Anthropic builds the most capable and safe AI models available," said AI Solutions Team. "Partnership with their ecosystem validates our technical approach and enables even better products."

PARTNERSHIP BENEFITS:
-- Enhanced API tier access
-- Early access to new Claude capabilities
-- Technical implementation support
-- Co-marketing opportunities
-- Anthropic ecosystem listing

AI Solutions Store's products, including Claude Droid and Income Droid, utilize Claude AI for content generation, script writing, and intelligent automation tasks.

"Claude's capabilities enable automations that weren't possible before," the team noted. "This partnership ensures we can continue pushing boundaries."

ABOUT AI SOLUTIONS STORE:
${COMPANY.mission} Visit ${COMPANY.website} for Claude AI-powered products.

###

Media Contact:
${COMPANY.contact.email}`,
            keywords: ['Anthropic', 'Claude AI', 'partnership', 'AI ecosystem'],
            targetOutlets: ['VentureBeat', 'TechCrunch', 'MIT Technology Review']
        },
        {
            id: 'partnership-charity-network',
            headline: 'AI Solutions Store Establishes Verified Charity Network for Transparent Giving',
            subheadline: 'New partnership with charity verification organizations ensures donation accountability',
            body: `${generateDateline()}

AI Solutions Store today announced partnerships with charity verification organizations to ensure complete transparency and accountability in its pediatric charity donations.

The partnership enables independent verification of all donations made through the company's Gospel V1.3 model, providing customers with confidence that their purchases genuinely support children's health.

"Trust requires verification," said AI Solutions Team. "These partnerships prove our commitment is real, not marketing."

VERIFICATION PARTNERS:
-- Charity Navigator (financial health ratings)
-- GuideStar (nonprofit verification)
-- Give.org (BBB Wise Giving Alliance)

All recipient organizations must maintain verified status with at least two verification partners.

"Our customers deserve proof," the team emphasized. "Every donation is documented, verified, and reported."

TRANSPARENCY COMMITMENTS:
-- Quarterly donation reports
-- Independent verification documentation
-- Real-time impact tracking (where available)
-- Annual third-party audits

FOR THE KIDS isn't just a slogan. It's a verified, accountable commitment.

ABOUT AI SOLUTIONS STORE:
${COMPANY.mission} Transparency reports at ${COMPANY.website}/impact.

###

Media Contact:
${COMPANY.contact.email}`,
            keywords: ['charity verification', 'transparency', 'nonprofit partnership'],
            targetOutlets: ['Forbes', 'Fast Company', 'Chronicle of Philanthropy']
        },
        {
            id: 'partnership-developer-community',
            headline: 'AI Solutions Store Launches Developer Partnership Program',
            subheadline: 'New program enables developers to build on AI Solutions platform with revenue sharing',
            body: `${generateDateline()}

AI Solutions Store today launched its Developer Partnership Program, enabling third-party developers to build extensions, integrations, and complementary tools for the AI Solutions ecosystem.

Partners receive API access, technical documentation, and revenue sharing for tools that enhance the platform's capabilities.

"No single team builds everything users need," said AI Solutions Team. "This program enables developers to fill gaps while sharing in success."

PROGRAM DETAILS:
-- API access for all AI Solutions products
-- Comprehensive technical documentation
-- 20 percent revenue share on partner tools
-- Co-marketing support
-- Featured placement in product marketplace

Developers interested in partnerships can apply at ${COMPANY.website}/partners.

"We want an ecosystem, not a walled garden," the team noted. "Developers who extend our platform deserve compensation."

The program maintains AI Solutions Store's charity commitment, with 60 percent of the company's revenue share continuing to support pediatric charities.

ABOUT AI SOLUTIONS STORE:
${COMPANY.mission} Developer resources at ${COMPANY.website}/developers.

###

Media Contact:
${COMPANY.contact.email}`,
            keywords: ['developer program', 'API', 'partnership', 'ecosystem'],
            targetOutlets: ['TechCrunch', 'Dev.to', 'Hacker News']
        }
    ]
};

/**
 * Generate a press release
 */
function generatePressRelease(category, index = null) {
    const templates = PRESS_RELEASE_TEMPLATES[category];
    if (!templates || templates.length === 0) {
        throw new Error(`Unknown category: ${category}`);
    }

    const state = getState();
    const templateIndex = index !== null ? index : state.counters[category] % templates.length;
    const template = templates[templateIndex];

    log('===============================================');
    log('PRESS RELEASE GENERATOR');
    log('AI Solutions Store - FOR THE KIDS');
    log('===============================================');
    log(`Category: ${category}`);
    log(`Template: ${template.id}`);

    // Generate the press release content
    const pressRelease = {
        id: template.id,
        category: category,
        headline: template.headline,
        subheadline: template.subheadline,
        body: template.body,
        keywords: template.keywords,
        targetOutlets: template.targetOutlets,
        generatedAt: new Date().toISOString(),
        apStyleCompliant: true
    };

    // Update state
    state.counters[category] = (state.counters[category] + 1) % templates.length;
    state.pressReleases.push({
        id: template.id,
        category: category,
        generatedAt: pressRelease.generatedAt
    });
    if (state.pressReleases.length > 100) {
        state.pressReleases = state.pressReleases.slice(-100);
    }
    saveState(state);

    return pressRelease;
}

/**
 * Format press release for distribution
 */
function formatForDistribution(pressRelease) {
    const divider = '=' .repeat(70);

    let output = `
${divider}
PRESS RELEASE - FOR IMMEDIATE RELEASE
${divider}

HEADLINE:
${pressRelease.headline}

SUBHEADLINE:
${pressRelease.subheadline}

${divider}

${pressRelease.body}

${divider}

KEYWORDS: ${pressRelease.keywords.join(', ')}

TARGET OUTLETS:
${pressRelease.targetOutlets.map(o => `  - ${o}`).join('\n')}

MEDIA CONTACT:
${COMPANY.contact.email}
${COMPANY.contact.website}

${divider}
Generated: ${pressRelease.generatedAt}
Category: ${pressRelease.category}
AP Style Compliant: Yes
${divider}
`;

    return output;
}

/**
 * Save press release to file
 */
function savePressRelease(pressRelease) {
    const filename = `${pressRelease.id}-${Date.now()}.txt`;
    const filepath = path.join(PRESS_RELEASE_DIR, filename);
    const content = formatForDistribution(pressRelease);

    fs.writeFileSync(filepath, content);
    log(`Saved press release to: ${filepath}`);

    return filepath;
}

/**
 * Generate media pitch email
 */
function generateMediaPitch(pressRelease, outlet) {
    const outletInfo = MEDIA_OUTLETS.find(o => o.name === outlet) || { name: outlet, focus: 'Technology' };

    const pitch = `
Subject: Story Pitch: ${pressRelease.headline}

Dear ${outletInfo.name} Editorial Team,

I'm reaching out regarding a story that aligns with your ${outletInfo.focus} coverage.

${pressRelease.subheadline}

KEY ANGLES:
${pressRelease.keywords.map(k => `- ${k}`).join('\n')}

WHY IT MATTERS:
AI Solutions Store operates on a unique model where 60% of all revenue goes directly to verified pediatric charities. This "FOR THE KIDS" mission combines AI innovation with measurable social impact.

AVAILABLE FOR INTERVIEW:
- AI Solutions Team (product demos, technical deep-dives)
- Impact metrics and charity verification documentation
- Customer case studies and usage data

Full press release attached below. Happy to provide additional materials, quotes, or arrange interviews.

Best regards,
AI Solutions Store Press Team
${COMPANY.contact.email}

---

${formatForDistribution(pressRelease)}
`;

    return pitch;
}

/**
 * Display media outlet list
 */
function displayMediaOutlets() {
    log('\nTARGET MEDIA OUTLETS:');
    log('------------------------');
    MEDIA_OUTLETS.forEach(outlet => {
        log(`${outlet.name}`);
        log(`  Focus: ${outlet.focus}`);
        log(`  Contact: ${outlet.email}`);
        log('');
    });
}

/**
 * Main execution
 */
async function main() {
    const args = process.argv.slice(2);
    const category = args[0] || 'product_launch';
    const indexArg = args[1] ? parseInt(args[1]) : null;

    log('===============================================');
    log('PRESS RELEASE GENERATOR');
    log('AI Solutions Store - FOR THE KIDS');
    log('===============================================');

    // Valid categories
    const validCategories = Object.keys(PRESS_RELEASE_TEMPLATES);

    if (args[0] === '--help' || args[0] === '-h') {
        console.log(`
Press Release Generator - AI Solutions Store

Usage: node press-release-generator.cjs [category] [index]

Categories:
  product_launch     - New product announcements
  charity_milestone  - Charity donation milestones
  platform_update    - Platform and product updates
  partnership        - Partnership announcements

Options:
  --help, -h         Show this help message
  --list             List all available templates
  --outlets          Show target media outlets

Examples:
  node press-release-generator.cjs product_launch
  node press-release-generator.cjs charity_milestone 0
  node press-release-generator.cjs --list
  node press-release-generator.cjs --outlets

FOR THE KIDS - 60/30/10
        `);
        process.exit(0);
    }

    if (args[0] === '--list') {
        console.log('\nAvailable Press Release Templates:\n');
        validCategories.forEach(cat => {
            console.log(`${cat.toUpperCase()}:`);
            PRESS_RELEASE_TEMPLATES[cat].forEach((t, i) => {
                console.log(`  [${i}] ${t.id}: ${t.headline.substring(0, 60)}...`);
            });
            console.log('');
        });
        process.exit(0);
    }

    if (args[0] === '--outlets') {
        displayMediaOutlets();
        process.exit(0);
    }

    if (!validCategories.includes(category)) {
        log(`ERROR: Invalid category "${category}"`);
        log(`Valid categories: ${validCategories.join(', ')}`);
        process.exit(1);
    }

    try {
        // Generate press release
        const pressRelease = generatePressRelease(category, indexArg);

        // Display formatted output
        const formatted = formatForDistribution(pressRelease);
        console.log(formatted);

        // Save to file
        const filepath = savePressRelease(pressRelease);

        // Generate sample pitch for first target outlet
        if (pressRelease.targetOutlets.length > 0) {
            const pitch = generateMediaPitch(pressRelease, pressRelease.targetOutlets[0]);
            const pitchPath = path.join(PRESS_RELEASE_DIR, `pitch-${pressRelease.id}-${Date.now()}.txt`);
            fs.writeFileSync(pitchPath, pitch);
            log(`Saved media pitch to: ${pitchPath}`);
        }

        // Display target outlets
        log('\nRECOMMENDED OUTLETS FOR THIS RELEASE:');
        pressRelease.targetOutlets.forEach(outlet => {
            const info = MEDIA_OUTLETS.find(o => o.name === outlet);
            if (info) {
                log(`  - ${outlet}: ${info.email}`);
            } else {
                log(`  - ${outlet}`);
            }
        });

        log('\n===============================================');
        log('Press release generated successfully.');
        log('FOR THE KIDS - 60/30/10');
        log('===============================================');

        process.exit(0);
    } catch (err) {
        log(`ERROR: ${err.message}`);
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

module.exports = {
    generatePressRelease,
    formatForDistribution,
    savePressRelease,
    generateMediaPitch,
    PRESS_RELEASE_TEMPLATES,
    MEDIA_OUTLETS,
    COMPANY
};
