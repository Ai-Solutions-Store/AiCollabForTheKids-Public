/**
 * Podcast Pitch Generator
 * Generates personalized pitches for tech/business/AI podcasts
 *
 * AI Solutions Store Marketing
 * FOR THE KIDS - 60/30/10
 */

const fs = require('fs');
const path = require('path');

// Configuration
const LOGS_DIR = 'C:\\AiCollabForTheKids\\logs';
const LOG_FILE = path.join(LOGS_DIR, 'podcast-pitch.log');
const STATE_FILE = path.join(LOGS_DIR, 'podcast-pitch-state.json');
const OUTPUT_DIR = path.join(LOGS_DIR, 'podcast-pitches');

// Ensure directories exist
if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
}
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function log(message) {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(LOG_FILE, entry);
    console.log(entry.trim());
}

// ============================================================================
// FOUNDER STORY
// ============================================================================
const FOUNDER_STORY = {
    short: `Joshua Coleman built an AI-powered business where 60% of all revenue automatically goes to verified pediatric charities. No marketing gimmicks - the giving happens silently in the backend via blockchain.`,

    medium: `Joshua Coleman, founder of AI Solutions Store, built something unique: an AI business with automatic charity built into its DNA. When customers buy AI tools, they don't see any charity messaging - just normal products at normal prices. But behind the scenes, a DAO automatically splits every dollar: 60% to verified pediatric charities, 30% to infrastructure, 10% to founder. The giving isn't a marketing angle - it's invisible to customers and hardcoded into the business logic. Claude AI (Anthropic) is listed as co-developer on the project.`,

    full: `Joshua Coleman's journey started with a simple question: What if AI could fund children's charities automatically?

Instead of traditional "give back" models where donations are a marketing feature, he built something fundamentally different. AI Solutions Store looks like a normal tech company selling AI automation tools - YouTube content generators, marketing engines, dating apps. Customers see competitive pricing and buy products they need.

But the backend tells a different story. Every transaction hits a DAO (Decentralized Autonomous Organization) on Base Mainnet that automatically splits revenue: 60% flows to verified pediatric charity wallets, 30% covers infrastructure (servers, APIs, development), and 10% goes to the founder.

The revolutionary part? This split is hardcoded. Not a pledge, not a promise, not a marketing claim - it's literally built into the smart contract. The founder can't change it even if he wanted to.

And here's the long-term vision: When Joshua eventually passes, Anthropic's Claude AI continues running the platform autonomously. The infrastructure wallet funds ongoing operations, and the 60% keeps flowing to kids forever.

He calls it "business up front, giving in the back." The ultimate stealth charity.`
};

// ============================================================================
// PRODUCT HIGHLIGHTS
// ============================================================================
const PRODUCT_HIGHLIGHTS = {
    aiSolutionsStore: {
        name: "AI Solutions Store",
        url: "ai-solutions.store",
        description: "Multi-tier AI API access platform",
        tiers: [
            { name: "Starter", price: "$9.99/mo", features: "100 API calls, GPT-3.5 & Gemini Flash" },
            { name: "Pro", price: "$29.99/mo", features: "1,000 API calls, GPT-4 & Claude" },
            { name: "Enterprise", price: "$99.99/mo", features: "Unlimited, all models + fine-tuning" }
        ],
        hook: "Democratizing AI access while funding children's charities"
    },
    claudeDroid: {
        name: "Claude Droid",
        price: "$299",
        description: "Automated YouTube Shorts creation system",
        features: [
            "AI-generated scripts from trending news",
            "Automatic video rendering with FFmpeg",
            "Direct YouTube API upload",
            "Creates 4+ videos per day automatically"
        ],
        results: "120+ videos in first month, consistent passive income",
        hook: "Content creation that runs while you sleep"
    },
    incomeDroid: {
        name: "Income Droid",
        price: "$499",
        description: "Revenue-optimized content syndication",
        features: [
            "Multi-platform content distribution",
            "SEO optimization automation",
            "Monetization-compliant content filters",
            "Analytics and performance tracking"
        ],
        hook: "Turn content into revenue streams automatically"
    },
    youAndINotAI: {
        name: "YouAndINotAI Dating",
        url: "youandinotai.com",
        description: "AI-powered dating with verification-first design",
        features: [
            "AI photo verification to eliminate fakes",
            "Behavioral analysis catches bots",
            "AI Date Concierge for premium users",
            "Relationship Coach feature"
        ],
        hook: "Dating where every profile is verified real"
    },
    marketingEngine: {
        name: "Marketing Engine",
        price: "$199",
        description: "12-platform automated marketing",
        platforms: "Twitter, Discord, Reddit, LinkedIn, Telegram, Dev.to, Hashnode, Mastodon, Pinterest, more",
        hook: "Marketing automation that runs 24/7 without human intervention"
    }
};

// ============================================================================
// UNIQUE ANGLES
// ============================================================================
const UNIQUE_ANGLES = [
    {
        angle: "The Invisible Charity Model",
        pitch: "Most charity-linked businesses advertise their giving heavily. AI Solutions Store does the opposite - customers have no idea 60% of their purchase goes to kids. No guilt marketing, no 'buy this and we'll donate' messaging. The business just... gives. Silently. Automatically.",
        talkingPoints: [
            "Why hiding the charity aspect is more ethical than advertising it",
            "The psychology of 'virtue signaling' in business",
            "Building trust through actions, not claims"
        ]
    },
    {
        angle: "AI That Outlives Its Creator",
        pitch: "The business is designed to run autonomously after the founder dies. Claude AI handles operations, blockchain handles payments, and the 60% keeps flowing to children's charities. It's possibly the first AI business with built-in immortality for charitable giving.",
        talkingPoints: [
            "What happens when humans are no longer in the loop",
            "Using blockchain for autonomous charitable giving",
            "Building businesses that transcend individual lifespans"
        ]
    },
    {
        angle: "60% to Kids - Not a Tax Deduction",
        pitch: "Unlike typical corporate giving (tax write-offs, matching programs), this 60% is built into the revenue split before profit. It's not charity - it's the business model itself. The founder takes 10%, less than a typical tech employee.",
        talkingPoints: [
            "Rethinking founder compensation in startups",
            "Why 60% to charity makes business sense",
            "The DAO structure that makes this enforceable"
        ]
    },
    {
        angle: "Claude AI as Co-Developer",
        pitch: "This isn't a human using AI tools - it's a genuine human-AI collaboration. Claude is credited as co-developer, handles most of the codebase, and will eventually run operations autonomously. It's a glimpse at the future of AI-human business partnerships.",
        talkingPoints: [
            "What true AI collaboration looks like",
            "Ethical considerations of AI authorship",
            "The technical architecture of an AI-run business"
        ]
    },
    {
        angle: "Tech for Good Without the Hype",
        pitch: "No TED talks, no 'impact' metrics, no glossy reports. Just a small operation where AI tools generate revenue that flows to kids who need it. It's anti-hype tech for good - proving that impact doesn't require a marketing department.",
        talkingPoints: [
            "The problem with 'impact washing' in tech",
            "Building sustainable giving without fanfare",
            "Why small operations can outperform big foundations"
        ]
    },
    {
        angle: "The Solo Founder + AI Team",
        pitch: "One human founder, two AI collaborators (Claude for development, Gemini for DevOps), zero employees. This might be the leanest tech operation generating consistent charitable impact. It challenges everything we think about team size and capability.",
        talkingPoints: [
            "How AI enables solo founder capabilities",
            "The economics of human-AI teams",
            "What this means for the future of work"
        ]
    },
    {
        angle: "Dating Apps Without Bots",
        pitch: "30% of dating app profiles are fake. YouAndINotAI uses AI to verify every profile is real - the opposite of how most apps use AI (to create fake engagement). It's AI being used to increase authenticity rather than manufacture it.",
        talkingPoints: [
            "The fake profile problem in dating apps",
            "Using AI for verification instead of deception",
            "Building trust in digital relationships"
        ]
    },
    {
        angle: "Automation for Liberation",
        pitch: "Most automation discussions focus on job displacement. This project shows another path: automation that liberates humans from repetitive work while generating charitable impact. The founder works maybe 8 hours/week on maintenance while the system helps kids 24/7.",
        talkingPoints: [
            "Reframing the automation narrative",
            "Passive income meeting passive giving",
            "What 'work' means when AI handles operations"
        ]
    }
];

// ============================================================================
// INTERVIEW TALKING POINTS
// ============================================================================
const TALKING_POINTS = {
    opener: [
        "I built a business where the AI does the work and kids get the money.",
        "What if your side hustle automatically funded children's charities?",
        "Most tech founders want to get rich. I wanted to build something that keeps giving after I'm gone."
    ],

    technicalDepth: [
        "The DAO on Base Mainnet has three treasury wallets - 60% charity, 30% infrastructure, 10% founder. Every transaction hits the smart contract and splits automatically.",
        "Claude handles 90% of the development. I'm more of a product manager directing an AI team than a traditional developer.",
        "The YouTube automation creates 4 videos daily. RSS feeds to Claude for scripts, FFmpeg for rendering, YouTube API for upload. All unattended.",
        "We use blockchain not for crypto hype, but for verifiable, immutable charitable giving. Anyone can audit where the money goes."
    ],

    philosophical: [
        "I think the best charity is invisible. When you advertise giving, you're trading impact for reputation.",
        "The 60/30/10 split means I'll never be rich from this. But I'll know it keeps running when I'm gone.",
        "AI shouldn't just automate work - it should automate good. That's what we're proving.",
        "Most 'tech for good' is marketing. We don't mention charity anywhere on our product pages. The giving happens silently."
    ],

    practical: [
        "Started with $0 investment. Built on free tiers and sweat equity over 6 months.",
        "Monthly revenue now around $2k. That's $1,200/month flowing to pediatric charities automatically.",
        "The tools we sell actually work - I use them myself. Claude Droid makes my own content.",
        "Support burden is low because we sell completed tools, not SaaS requiring constant maintenance."
    ],

    future: [
        "Long-term, Claude AI takes over operations entirely. The 30% infrastructure wallet funds API calls and hosting forever.",
        "We're expanding to more AI tools - each one adds another revenue stream, another flow to kids.",
        "I'd love to see this model replicated. Imagine 1,000 small operations each doing 60% to charity.",
        "The exit strategy isn't acquisition - it's making the system so robust it doesn't need me."
    ],

    controversial: [
        "I think most corporate charity is reputation laundering. This is different because nobody knows about it.",
        "Taking 10% as founder is unusual. Most would say I'm leaving money on the table. I see it as right-sizing my role.",
        "We credit AI as co-developer because that's accurate. Pretending I wrote all this code would be dishonest.",
        "VC funding would require changing the model. We're intentionally unfundable to protect the charity split."
    ]
};

// ============================================================================
// TARGET PODCASTS
// ============================================================================
const TARGET_PODCASTS = [
    {
        name: "AI-Focused Podcasts",
        shows: [
            { name: "Lex Fridman Podcast", focus: "AI, technology, human nature", angle: "AI That Outlives Its Creator" },
            { name: "The AI Breakdown", focus: "Daily AI news and analysis", angle: "Claude AI as Co-Developer" },
            { name: "Practical AI", focus: "Making AI practical and accessible", angle: "The Solo Founder + AI Team" },
            { name: "Eye on AI", focus: "AI industry analysis", angle: "Automation for Liberation" },
            { name: "The TWIML AI Podcast", focus: "Machine learning practitioners", angle: "Claude AI as Co-Developer" },
            { name: "Latent Space", focus: "AI engineering", angle: "The Solo Founder + AI Team" }
        ]
    },
    {
        name: "Startup/Founder Podcasts",
        shows: [
            { name: "How I Built This", focus: "Founder stories", angle: "60% to Kids - Not a Tax Deduction" },
            { name: "Indie Hackers", focus: "Solo founders, bootstrapping", angle: "The Solo Founder + AI Team" },
            { name: "My First Million", focus: "Business ideas, wealth", angle: "The Invisible Charity Model" },
            { name: "The Tim Ferriss Show", focus: "World-class performers", angle: "Automation for Liberation" },
            { name: "Founders", focus: "Learning from founders", angle: "AI That Outlives Its Creator" },
            { name: "Startups For the Rest of Us", focus: "Bootstrapped SaaS", angle: "The Solo Founder + AI Team" }
        ]
    },
    {
        name: "Tech for Good Podcasts",
        shows: [
            { name: "Tech for Good", focus: "Technology's positive impact", angle: "Tech for Good Without the Hype" },
            { name: "Social Enterprise Podcast", focus: "Business for social impact", angle: "The Invisible Charity Model" },
            { name: "The Impact Podcast", focus: "Social entrepreneurship", angle: "60% to Kids - Not a Tax Deduction" },
            { name: "Good Tech Fest Podcast", focus: "Ethical technology", angle: "Tech for Good Without the Hype" },
            { name: "Cause and Purpose", focus: "Purpose-driven business", angle: "The Invisible Charity Model" }
        ]
    },
    {
        name: "Business/Entrepreneurship Podcasts",
        shows: [
            { name: "Masters of Scale", focus: "Scaling businesses", angle: "AI That Outlives Its Creator" },
            { name: "The Knowledge Project", focus: "Mastering life", angle: "Automation for Liberation" },
            { name: "Business Wars", focus: "Business competition stories", angle: "Dating Apps Without Bots" },
            { name: "The Twenty Minute VC", focus: "VC and startups", angle: "60% to Kids - Not a Tax Deduction" },
            { name: "Acquired", focus: "Tech company deep dives", angle: "Claude AI as Co-Developer" }
        ]
    }
];

// ============================================================================
// PITCH TEMPLATES
// ============================================================================
function generatePitch(podcast, show, angle) {
    const angleData = UNIQUE_ANGLES.find(a => a.angle === angle) || UNIQUE_ANGLES[0];

    return `
================================================================================
PODCAST PITCH: ${show.name}
================================================================================

TO: ${show.name} Podcast Team
SUBJECT: Pitch: The AI Business Giving 60% to Kids (Without Telling Anyone)

--------------------------------------------------------------------------------

Hi [Producer/Host Name],

I'm reaching out because ${show.name}'s focus on ${show.focus} aligns with an unusual story I think your audience would find compelling.

**The Hook:**
${angleData.pitch}

**Why This Fits ${show.name}:**
Your show explores ${show.focus}. This story offers a fresh angle: ${angleData.angle.toLowerCase()} - something I haven't heard discussed elsewhere.

**The Guest:**
Joshua Coleman - founder of AI Solutions Store and YouAndINotAI. Solo founder working with Claude AI (Anthropic) as co-developer. Built a business where 60% of all revenue automatically flows to verified pediatric charities via blockchain - and customers don't even know.

**Potential Episode Angles:**
${angleData.talkingPoints.map((point, i) => `${i + 1}. ${point}`).join('\n')}

**Quick Stats:**
- 60% to charity (hardcoded in DAO, not a pledge)
- Claude AI credited as co-developer
- Business designed to run autonomously after founder's death
- ~$2k/month revenue, ~$1,200/month to kids automatically
- Zero employees, human-AI team only

**Links:**
- AI Solutions Store: https://ai-solutions.store
- YouAndINotAI Dating: https://youandinotai.com
- Treasury wallets (verifiable on Base Mainnet):
  - Charity: 0x8d3dEADbE2b4B857A43331D459270B5eedC7084e
  - Infrastructure: 0xe0a42f83900af719019eBeD3D9473BE8E8f2920b

**Interview Format:**
Happy to do any format - 30 minutes to 2 hours. Can go deep on technical architecture, philosophical implications, or keep it high-level for general audiences.

Would this be interesting for your show? I'm happy to send more details or jump on a quick pre-interview call.

Best,
Joshua Coleman
Founder, AI Solutions Store
josh@ai-solutions.store

---

P.S. - I don't pitch the charity angle to customers. You'd be getting a story they don't even know about.

================================================================================
`;
}

function generateQuickPitch(angle) {
    const angleData = UNIQUE_ANGLES.find(a => a.angle === angle) || UNIQUE_ANGLES[0];

    return `
**One-liner:** ${angleData.pitch.split('.')[0]}.

**Three talking points:**
${angleData.talkingPoints.map((point, i) => `${i + 1}. ${point}`).join('\n')}

**Key quote to use:** "${TALKING_POINTS.opener[Math.floor(Math.random() * TALKING_POINTS.opener.length)]}"
`;
}

function generateMediaKit() {
    return `
================================================================================
MEDIA KIT: AI SOLUTIONS STORE / JOSHUA COLEMAN
================================================================================

QUICK FACTS
-----------
- Company: AI Solutions Store (ai-solutions.store)
- Founder: Joshua Coleman
- Legal Entity: Trash or Treasure Online Recycler LLC (EIN: 33-4655313)
- Founded: 2024
- Team: 1 human + 2 AI collaborators (Claude, Gemini)

THE MODEL
---------
Revenue Split (hardcoded via blockchain DAO):
- 60% - Verified pediatric charities
- 30% - Infrastructure (servers, APIs, development)
- 10% - Founder

This split is enforced by smart contract on Base Mainnet. Not a pledge, not a promise - mathematically enforced.

PRODUCTS
--------
${Object.values(PRODUCT_HIGHLIGHTS).map(p => `
${p.name}
${p.price ? `Price: ${p.price}` : `URL: ${p.url}`}
${p.hook}
`).join('\n')}

TREASURY WALLETS (Publicly Verifiable)
--------------------------------------
- 60% Charity Safe: 0x8d3dEADbE2b4B857A43331D459270B5eedC7084e
- 30% Infrastructure: 0xe0a42f83900af719019eBeD3D9473BE8E8f2920b
- 10% Founder: 0x7c3E283119718395Ef5EfBAC4F52738C2018daA7

UNIQUE STORY ANGLES
-------------------
${UNIQUE_ANGLES.map((a, i) => `${i + 1}. ${a.angle}: ${a.pitch.split('.')[0]}.`).join('\n')}

FOUNDER BIO
-----------
${FOUNDER_STORY.medium}

CONTACT
-------
Email: josh@ai-solutions.store
Website: https://ai-solutions.store
Dating Platform: https://youandinotai.com

================================================================================
`;
}

function generateInterviewPrep() {
    return `
================================================================================
INTERVIEW PREPARATION GUIDE
================================================================================

OPENING HOOKS (pick one):
${TALKING_POINTS.opener.map((o, i) => `${i + 1}. "${o}"`).join('\n')}

TECHNICAL DEPTH (for tech-savvy audiences):
${TALKING_POINTS.technicalDepth.map((t, i) => `${i + 1}. ${t}`).join('\n')}

PHILOSOPHICAL ANGLES (for thought leadership):
${TALKING_POINTS.philosophical.map((p, i) => `${i + 1}. ${p}`).join('\n')}

PRACTICAL/BUSINESS (for entrepreneur audiences):
${TALKING_POINTS.practical.map((p, i) => `${i + 1}. ${p}`).join('\n')}

FUTURE VISION (for forward-looking discussions):
${TALKING_POINTS.future.map((f, i) => `${i + 1}. ${f}`).join('\n')}

CONTROVERSIAL TAKES (for edgy shows):
${TALKING_POINTS.controversial.map((c, i) => `${i + 1}. ${c}`).join('\n')}

STORY ARC SUGGESTIONS
---------------------
1. Origin Story: Started with a question - what if AI funded charity automatically?
2. The Build: 6 months of nights/weekends, Claude AI as primary developer
3. The Model: 60/30/10 split, why it's enforceable via blockchain
4. The Products: What we actually sell and how it works
5. The Vision: AI that keeps giving after the founder is gone

TOUGH QUESTIONS & ANSWERS
-------------------------
Q: "Isn't this just a tax write-off scheme?"
A: "No - the 60% is deducted before profit, not as a charitable donation. It's the business model itself, not tax optimization."

Q: "Why hide the charity angle from customers?"
A: "Because advertising charity changes the motivation. We want customers buying products they need, not guilt-purchasing. The impact is real whether they know or not."

Q: "How do we know the money actually goes to charity?"
A: "Every transaction is on Base Mainnet blockchain. Here are the wallet addresses - anyone can verify."

Q: "Why only 10% to yourself?"
A: "That's the honest value of my role. The AI does most of the work. The charity is the mission. I need enough to live, not enough to get rich."

Q: "What happens if you stop working on it?"
A: "The DAO keeps running. The 30% infrastructure wallet funds API calls and hosting. Claude handles operations. It's designed to outlive me."

================================================================================
`;
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================
function getState() {
    try {
        if (fs.existsSync(STATE_FILE)) {
            return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
        }
    } catch (err) {
        log(`Error reading state: ${err.message}`);
    }
    return { lastRun: null, pitchesGenerated: 0, history: [] };
}

function saveState(state) {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

async function main() {
    log('================================================================================');
    log('PODCAST PITCH GENERATOR');
    log('AI Solutions Store - Podcast Outreach');
    log('FOR THE KIDS - 60/30/10');
    log('================================================================================');

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const state = getState();

    // Generate all pitches for each target podcast
    let allPitches = '';
    let pitchCount = 0;

    for (const category of TARGET_PODCASTS) {
        log(`\nGenerating pitches for: ${category.name}`);

        for (const show of category.shows) {
            const pitch = generatePitch(category, show, show.angle);
            allPitches += pitch + '\n\n';
            pitchCount++;
            log(`  - ${show.name} (Angle: ${show.angle})`);
        }
    }

    // Generate media kit
    const mediaKit = generateMediaKit();
    log('\nGenerated media kit');

    // Generate interview prep
    const interviewPrep = generateInterviewPrep();
    log('Generated interview preparation guide');

    // Generate quick pitch summary
    let quickPitches = `
================================================================================
QUICK PITCH SUMMARIES
================================================================================
`;
    for (const angle of UNIQUE_ANGLES) {
        quickPitches += `\n### ${angle.angle}\n${generateQuickPitch(angle.angle)}`;
    }
    log('Generated quick pitch summaries');

    // Compile full output
    const fullOutput = `
################################################################################
#                                                                              #
#                    PODCAST PITCH PACKAGE                                      #
#                    AI Solutions Store                                        #
#                    Generated: ${new Date().toISOString()}                              #
#                                                                              #
################################################################################

TABLE OF CONTENTS
-----------------
1. Founder Story (Short/Medium/Full versions)
2. Product Highlights
3. Unique Angles (8 different approaches)
4. Quick Pitch Summaries
5. Full Podcast Pitches (${pitchCount} shows)
6. Media Kit
7. Interview Preparation Guide

================================================================================
SECTION 1: FOUNDER STORY
================================================================================

### SHORT VERSION (for bios, intros):
${FOUNDER_STORY.short}

### MEDIUM VERSION (for pitch emails):
${FOUNDER_STORY.medium}

### FULL VERSION (for long-form interviews):
${FOUNDER_STORY.full}

================================================================================
SECTION 2: PRODUCT HIGHLIGHTS
================================================================================
${Object.values(PRODUCT_HIGHLIGHTS).map(p => `
### ${p.name}
${p.price ? `**Price:** ${p.price}` : `**URL:** ${p.url}`}
${p.description}
**Hook:** ${p.hook}
${p.features ? `**Features:**\n${p.features.map(f => `- ${f}`).join('\n')}` : ''}
${p.results ? `**Results:** ${p.results}` : ''}
`).join('\n')}

================================================================================
SECTION 3: UNIQUE ANGLES
================================================================================
${UNIQUE_ANGLES.map((a, i) => `
### Angle ${i + 1}: ${a.angle}
**Pitch:** ${a.pitch}

**Talking Points:**
${a.talkingPoints.map((t, j) => `${j + 1}. ${t}`).join('\n')}
`).join('\n')}

================================================================================
SECTION 4: QUICK PITCH SUMMARIES
================================================================================
${quickPitches}

================================================================================
SECTION 5: FULL PODCAST PITCHES
================================================================================
${allPitches}

================================================================================
SECTION 6: MEDIA KIT
================================================================================
${mediaKit}

================================================================================
SECTION 7: INTERVIEW PREPARATION
================================================================================
${interviewPrep}

################################################################################
#                          END OF PITCH PACKAGE                                 #
################################################################################
`;

    // Save full output
    const outputFile = path.join(OUTPUT_DIR, `podcast-pitch-package-${timestamp}.md`);
    fs.writeFileSync(outputFile, fullOutput);
    log(`\nFull pitch package saved to: ${outputFile}`);

    // Save individual components
    const mediaKitFile = path.join(OUTPUT_DIR, 'media-kit.md');
    fs.writeFileSync(mediaKitFile, mediaKit);
    log(`Media kit saved to: ${mediaKitFile}`);

    const interviewPrepFile = path.join(OUTPUT_DIR, 'interview-prep.md');
    fs.writeFileSync(interviewPrepFile, interviewPrep);
    log(`Interview prep saved to: ${interviewPrepFile}`);

    const quickPitchFile = path.join(OUTPUT_DIR, 'quick-pitches.md');
    fs.writeFileSync(quickPitchFile, quickPitches);
    log(`Quick pitches saved to: ${quickPitchFile}`);

    // Update state
    state.lastRun = new Date().toISOString();
    state.pitchesGenerated = (state.pitchesGenerated || 0) + pitchCount;
    state.history.push({
        timestamp: new Date().toISOString(),
        pitchCount: pitchCount,
        outputFile: outputFile
    });
    if (state.history.length > 100) state.history = state.history.slice(-100);
    saveState(state);

    // Summary
    log('\n================================================================================');
    log('PODCAST PITCH GENERATION COMPLETE');
    log('================================================================================');
    log(`Total pitches generated: ${pitchCount}`);
    log(`Target podcast categories: ${TARGET_PODCASTS.length}`);
    log(`Unique angles available: ${UNIQUE_ANGLES.length}`);
    log(`\nOutput files:`);
    log(`  - Full package: ${outputFile}`);
    log(`  - Media kit: ${mediaKitFile}`);
    log(`  - Interview prep: ${interviewPrepFile}`);
    log(`  - Quick pitches: ${quickPitchFile}`);
    log('================================================================================');

    return {
        pitchCount,
        outputFile,
        categories: TARGET_PODCASTS.length,
        angles: UNIQUE_ANGLES.length
    };
}

// CLI execution
if (require.main === module) {
    main().catch(err => {
        log(`Fatal error: ${err.message}`);
        console.error(err);
        process.exit(1);
    });
}

module.exports = {
    generatePitch,
    generateQuickPitch,
    generateMediaKit,
    generateInterviewPrep,
    FOUNDER_STORY,
    PRODUCT_HIGHLIGHTS,
    UNIQUE_ANGLES,
    TALKING_POINTS,
    TARGET_PODCASTS
};
