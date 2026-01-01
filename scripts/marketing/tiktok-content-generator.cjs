/**
 * TikTok Content Idea Generator - FOR THE KIDS Platform
 * Generates viral-style short video scripts and hooks for:
 * 1) AI Product Demos
 * 2) Smartphone Zombies Merch Promo
 * 3) Tech Tips
 * 4) Behind-the-Scenes of Building FOR THE KIDS Platform
 *
 * 60% of profits go to Verified Pediatric Charities
 */

const fs = require('fs');
const path = require('path');

const LOGS_DIR = 'C:\\AiCollabForTheKids\\logs\\tiktok-content';
const LOG_FILE = path.join(LOGS_DIR, 'tiktok-generator.log');

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

// ============================================================
// TRENDING HASHTAGS BY CATEGORY
// ============================================================
const TRENDING_HASHTAGS = {
    aiProducts: [
        '#AI', '#ArtificialIntelligence', '#TechTok', '#AItools', '#futureoftech',
        '#machinelearning', '#automation', '#productivity', '#startup', '#innovation',
        '#techtips', '#aiassistant', '#chatgpt', '#claudeai', '#aiproducts',
        '#sidehustle', '#entrepreneur', '#smallbusiness', '#worksmarter', '#fyp'
    ],
    smartphoneZombies: [
        '#SmartphoneZombies', '#UnplugForKids', '#merch', '#streetwear', '#funnymerch',
        '#phoneaddiction', '#digitaldetox', '#screentime', '#relatable', '#humor',
        '#tshirt', '#hoodie', '#phonecase', '#stickers', '#giftsunder50',
        '#charitymerch', '#causemarketing', '#forthekids', '#kidshealth', '#fyp'
    ],
    techTips: [
        '#techtips', '#lifehack', '#techlifehacks', '#productivityhacks', '#tips',
        '#howto', '#tutorial', '#learnontiktok', '#tech', '#gadgets',
        '#iphone', '#android', '#apps', '#shortcuts', '#efficiency',
        '#workfromhome', '#remotework', '#digitalnomad', '#studentlife', '#fyp'
    ],
    behindTheScenes: [
        '#startup', '#buildinpublic', '#founderlife', '#entrepreneur', '#bts',
        '#behindthescenes', '#startuplife', '#techstartup', '#dayinmylife', '#grind',
        '#charitystartup', '#impactdriven', '#forthekids', '#socialimpact', '#mission',
        '#coding', '#developer', '#programming', '#teamwork', '#fyp'
    ]
};

// ============================================================
// CATEGORY 1: AI PRODUCT DEMOS
// ============================================================
const AI_PRODUCT_DEMOS = [
    {
        hook: "This AI just did in 3 seconds what took me 3 hours...",
        script: `HOOK: "This AI just did in 3 seconds what took me 3 hours..."

[0-3s] Show frustrated face, papers everywhere
[3-8s] Type simple prompt into AI tool
[8-12s] AI generates complete solution
[12-15s] Mind-blown reaction

VOICEOVER:
"I used to spend HOURS on this. Now I just type what I want and boom - done."

CTA: "Link in bio for the AI tools I use daily"

SOUND: Trending audio with beat drop at solution reveal`,
        viralTips: [
            "Use relatable problem everyone faces",
            "Show dramatic time difference",
            "Genuine reaction sells it"
        ]
    },
    {
        hook: "POV: You discover AI can do your job 10x faster",
        script: `HOOK: "POV: You discover AI can do your job 10x faster"

[0-3s] Staring at screen, overwhelmed with tasks
[3-6s] Friend shows AI tool
[6-10s] Demo the AI doing the task
[10-15s] Realization face + celebration

VOICEOVER:
"Why didn't anyone tell me about this sooner?
I've been doing things the hard way for YEARS."

CTA: "AI tools that actually work - link in bio"

SOUND: Use "oh no" then switch to celebration audio`,
        viralTips: [
            "Show the 'before' struggle",
            "Make AI solution look magical",
            "End with genuine excitement"
        ]
    },
    {
        hook: "I replaced my entire workflow with AI (here's what happened)",
        script: `HOOK: "I replaced my entire workflow with AI"

[0-2s] Text overlay: "Before AI" - show chaos
[2-7s] Walk through AI tools replacing each task:
  - Writing? Claude AI
  - Images? AI generation
  - Code? AI assistants
  - Research? AI aggregators
[7-12s] Text overlay: "After AI" - show organized, calm
[12-15s] Results: More time, better output

VOICEOVER:
"Before: 12 hour days, stressed, behind on everything.
After: 4 hours of focused work, better results, time for life."

CTA: "The exact AI stack I use - link in bio"`,
        viralTips: [
            "Before/after transformation always works",
            "Be specific with tools",
            "Show real productivity gains"
        ]
    },
    {
        hook: "Your boss doesn't want you to know about these AI tools",
        script: `HOOK: "Your boss doesn't want you to know about these AI tools"

[0-3s] Mysterious, secretive vibe
[3-12s] Rapid-fire demo of AI tools:
  - "This one writes emails in your voice"
  - "This analyzes data instantly"
  - "This automates repetitive tasks"
  - "This creates content while you sleep"
[12-15s] Wink at camera

VOICEOVER:
"Because once you know... you'll wonder why you're still doing it manually."

CTA: "Get ahead with AI - link in bio"

SOUND: Mysterious/spy themed audio`,
        viralTips: [
            "Forbidden knowledge angle hooks people",
            "Fast cuts keep attention",
            "Imply exclusive knowledge"
        ]
    },
    {
        hook: "I asked AI to build me a website in 60 seconds...",
        script: `HOOK: "I asked AI to build me a website in 60 seconds..."

[0-5s] Timer on screen, typing prompt
[5-50s] Speed up footage of AI generating:
  - Layout
  - Copy
  - Images
  - Functionality
[50-55s] Show finished website
[55-60s] Shocked reaction

VOICEOVER:
"Used to cost $5000 and 3 months. Now it's free and takes a minute."

CTA: "Free AI tools in bio"

SOUND: Time-pressure/countdown music`,
        viralTips: [
            "Real-time challenge format",
            "Show actual results",
            "Include the timer for drama"
        ]
    },
    {
        hook: "The AI tool that made me $10K last month (not clickbait)",
        script: `HOOK: "The AI tool that made me $10K last month"

[0-3s] Screenshot of earnings (blur sensitive info)
[3-10s] Explain the AI tool and how you use it:
  - What it does
  - How you monetize
  - Time investment
[10-13s] Show the process
[13-15s] Encourage viewers

VOICEOVER:
"This isn't about replacing humans. It's about amplifying what you can do."

CTA: "Full breakdown - link in bio"

SOUND: Success/money audio`,
        viralTips: [
            "Proof of results builds trust",
            "Be transparent about the process",
            "Avoid overpromising"
        ]
    }
];

// ============================================================
// CATEGORY 2: SMARTPHONE ZOMBIES MERCH PROMO
// ============================================================
const SMARTPHONE_ZOMBIES_MERCH = [
    {
        hook: "You've been one of THESE today... don't lie",
        script: `HOOK: "You've been one of THESE today... don't lie"

[0-3s] Show "Beware of Smartphone Zombies" merch
[3-8s] Montage of people walking while on phones:
  - Almost walking into poles
  - Bumping into people
  - Crossing streets obliviously
[8-12s] Point at camera: "That's you. That's me. That's all of us."
[12-15s] Show merch: "At least wear it with pride"

PRODUCT CALLOUTS:
- T-Shirts $24.99
- Hoodies $44.99
- Phone Cases $29.99
- Stickers $4.99

VOICEOVER:
"60% of profits fund children's medical care. Look like a zombie, help a kid."

CTA: "Link in bio to shop"`,
        viralTips: [
            "Self-deprecating humor works",
            "Everyone relates to phone addiction",
            "Charity angle adds depth"
        ]
    },
    {
        hook: "The irony of buying this merch ON your phone",
        script: `HOOK: "The irony of buying this merch ON your phone"

[0-5s] Show phone screen, scrolling to merch site
[5-8s] "Beware of Smartphone Zombies" products load
[8-12s] Add to cart, checkout
[12-15s] Wink at camera with text: "Self aware zombie"

VOICEOVER:
"Yes, I bought Smartphone Zombie merch... on my smartphone.
Yes, I see the irony. Yes, I'm still doing it."

PRODUCT: Phone case shown prominently

CTA: "Join the irony - link in bio"

SOUND: Funny/ironic audio`,
        viralTips: [
            "Embrace the irony",
            "Fourth-wall break",
            "Makes people want to join the joke"
        ]
    },
    {
        hook: "I got my phone-addicted friend this gift",
        script: `HOOK: "I got my phone-addicted friend this gift"

[0-3s] Holding wrapped gift mysteriously
[3-8s] Friend opens to reveal Smartphone Zombies hoodie
[8-12s] Friend's reaction (hopefully laughing)
[12-15s] Both wearing matching merch

VOICEOVER:
"They called me out for being on my phone all the time.
So I got them this. Now we're both zombies together."

BONUS: "60% goes to kids' hospitals"

CTA: "Perfect gift for your fellow zombie - link in bio"`,
        viralTips: [
            "Gift-giving content performs well",
            "Genuine reactions are gold",
            "Friendship angle is wholesome"
        ]
    },
    {
        hook: "Warning signs you're a smartphone zombie",
        script: `HOOK: "Warning signs you're a smartphone zombie"

[0-12s] Checklist appearing one by one:
1. "Phone is the first thing you touch in the morning"
2. "You've walked into something while texting"
3. "You panic when battery hits 20%"
4. "You've ignored someone talking to you"
5. "You're watching this video on your phone right now"

[12-15s] Show merch: "If you checked 3 or more..."

VOICEOVER:
"Accept your fate. Wear the merch. Help some kids while you're at it."

CTA: "Zombie merch - 60% to charity - link in bio"`,
        viralTips: [
            "Checklist format = high engagement",
            "Personal callouts drive comments",
            "Everyone will relate to at least one"
        ]
    },
    {
        hook: "This hoodie helps sick kids (and calls you out)",
        script: `HOOK: "This hoodie helps sick kids (and calls you out)"

[0-5s] Holding up Smartphone Zombies hoodie
[5-10s] Explain the cause:
  "60% of every purchase goes to children's hospitals"
  "Through Kids DAO - verified medical pediatrics"
[10-13s] Try on the hoodie
[13-15s] "Looking like a zombie never felt so good"

VOICEOVER:
"Where else can you admit you're addicted to your phone AND help kids at the same time?"

CTA: "Shop to help - link in bio"`,
        viralTips: [
            "Lead with impact",
            "Make charity feel fun not preachy",
            "Show the actual product"
        ]
    },
    {
        hook: "POV: You see yourself in public",
        script: `HOOK: "POV: You see yourself in public"

[0-3s] Walking, head down in phone
[3-6s] Pass a mirror/window
[6-10s] See reflection - you're wearing Smartphone Zombies shirt
[10-15s] Shrug, keep scrolling

TEXT ON SCREEN: "At least I'm self-aware"

VOICEOVER:
"When you can't beat 'em, at least dress the part."

CTA: "Self-aware zombie merch - link in bio"`,
        viralTips: [
            "POV format is trending",
            "Self-deprecation is relatable",
            "Simple but effective"
        ]
    }
];

// ============================================================
// CATEGORY 3: TECH TIPS
// ============================================================
const TECH_TIPS = [
    {
        hook: "iPhone trick Apple doesn't advertise",
        script: `HOOK: "iPhone trick Apple doesn't advertise"

[0-3s] Mysterious setup
[3-12s] Show the trick step by step:
  - Go to Settings
  - [Specific hidden feature]
  - Enable the option
  - Show the result
[12-15s] Mind-blown face

VOICEOVER:
"Been using iPhone for 10 years and just found this."

POSSIBLE TRICKS:
- Back tap for shortcuts
- Hidden calculator history
- Safari reader mode on every site
- Measure app hidden features
- Notes document scanning

CTA: "More hidden features - follow for part 2"`,
        viralTips: [
            "Apple/iPhone content always performs",
            "Everyone wants to feel like an insider",
            "Promise more content for follows"
        ]
    },
    {
        hook: "3 websites your teacher doesn't want you to know",
        script: `HOOK: "3 websites your teacher doesn't want you to know"

[0-3s] Secretive typing on laptop
[3-12s] Rapid showcase:
  1. [Study/homework helper site]
  2. [Free learning resource]
  3. [Productivity tool]
[12-15s] "You're welcome"

VOICEOVER:
"These aren't cheating. They're working smarter."

DISCLAIMER: "Actually, your teacher probably loves these for research"

CTA: "Save this for later"`,
        viralTips: [
            "Forbidden knowledge angle",
            "Students are huge TikTok audience",
            "Quick value = saves and shares"
        ]
    },
    {
        hook: "Delete this app from your phone RIGHT NOW",
        script: `HOOK: "Delete this app from your phone RIGHT NOW"

[0-3s] Urgent, serious face
[3-8s] Explain why:
  - Battery drain
  - Privacy concerns
  - Data selling
  - Better alternatives
[8-12s] Show the delete process
[12-15s] Peaceful sigh

VOICEOVER:
"Your phone just got faster and more private."

CTA: "What other apps should go? Comment below"`,
        viralTips: [
            "Urgency creates action",
            "Privacy concerns are trending",
            "Spark discussion in comments"
        ]
    },
    {
        hook: "Settings you should change TODAY (seriously)",
        script: `HOOK: "Settings you should change TODAY"

[0-15s] Speed run through essential settings:
  - Privacy settings on social media
  - Location sharing off
  - Ad tracking disabled
  - Two-factor auth on
  - Password manager setup

Each with 2-3 second demo

VOICEOVER:
"Your data is literally being sold right now.
These settings take 5 minutes and protect you forever."

CTA: "Full tutorial - link in bio"`,
        viralTips: [
            "Fast-paced keeps attention",
            "Urgency drives action",
            "Everyone worries about privacy"
        ]
    },
    {
        hook: "Free alternatives to apps you're paying for",
        script: `HOOK: "Free alternatives to apps you're paying for"

[0-15s] Side by side comparisons:
  - Paid: Photoshop | Free: Photopea
  - Paid: Microsoft Office | Free: Google Docs
  - Paid: Grammarly Premium | Free: LanguageTool
  - Paid: Slack | Free: Discord
  - Paid: Zoom Pro | Free: Google Meet

VOICEOVER:
"Stop paying for things that have free versions that work just as well."

CTA: "Save this and thank me later"`,
        viralTips: [
            "Money-saving content = high saves",
            "Direct comparisons are clear",
            "Everyone loves free stuff"
        ]
    },
    {
        hook: "The keyboard shortcut that saves me 2 hours daily",
        script: `HOOK: "The keyboard shortcut that saves me 2 hours daily"

[0-3s] Hands on keyboard, dramatic music
[3-10s] Demonstrate the shortcut:
  - What it does
  - When to use it
  - Real example
[10-15s] Time saved calculation

VOICEOVER:
"Ctrl+Shift+T reopens closed tabs.
I close the wrong tab like 50 times a day.
This shortcut is life."

CTA: "Drop your favorite shortcut in comments"`,
        viralTips: [
            "Single, specific tip",
            "Immediate value",
            "Engagement question at end"
        ]
    }
];

// ============================================================
// CATEGORY 4: BEHIND THE SCENES - BUILDING FOR THE KIDS
// ============================================================
const BEHIND_THE_SCENES = [
    {
        hook: "Building a startup that gives 60% to charity (day 1)",
        script: `HOOK: "Building a startup that gives 60% to charity"

[0-5s] Office/workspace setup
[5-10s] Quick explanation:
  "FOR THE KIDS platform"
  "60% to verified pediatric charities"
  "30% to operations"
  "10% to team"
[10-15s] Show the work: code, design, meetings

VOICEOVER:
"Everyone said you can't run a business giving away 60%.
We're proving them wrong. Follow the journey."

CTA: "Follow for updates"`,
        viralTips: [
            "Underdog story angle",
            "Transparency builds trust",
            "Journey content creates loyalty"
        ]
    },
    {
        hook: "The real reason we give 60% to kids' hospitals",
        script: `HOOK: "The real reason we give 60% to kids' hospitals"

[0-5s] Serious, authentic moment
[5-12s] Tell the story:
  - Personal connection to cause
  - Why children's healthcare
  - What the donations actually do
[12-15s] Show impact if possible

VOICEOVER:
"This isn't a marketing gimmick. This is why we wake up every day."

CTA: "Join the mission - link in bio"`,
        viralTips: [
            "Emotional storytelling",
            "Authenticity is everything",
            "Show don't tell"
        ]
    },
    {
        hook: "Day in my life building FOR THE KIDS platform",
        script: `HOOK: "Day in my life building FOR THE KIDS platform"

[0-3s] Morning routine/wakeup
[3-6s] Check metrics/messages
[6-9s] Development work montage
[9-12s] Team call or collaboration
[12-15s] End of day reflection

VOICEOVER:
"7am: Check if our servers helped any kids today.
7:01am: Realize this is why I do this."

CTA: "Building in public - follow for more"`,
        viralTips: [
            "Day-in-life format is proven",
            "Show real work, not glamour",
            "Authentic moments resonate"
        ]
    },
    {
        hook: "How we verify charities get the money (transparent startup)",
        script: `HOOK: "How we verify charities get the money"

[0-5s] Show verification dashboard/process
[5-12s] Explain Kids DAO:
  - Smart contracts
  - Public transactions
  - Third-party audits
  - Direct hospital partnerships
[12-15s] Real receipts/proof

VOICEOVER:
"People ask: how do we know the money actually goes to kids?
Here's our entire verification process."

CTA: "Full transparency report - link in bio"`,
        viralTips: [
            "Transparency is rare and valued",
            "Proof builds massive trust",
            "Addresses common skepticism"
        ]
    },
    {
        hook: "We just donated $X to children's hospitals (watch us)",
        script: `HOOK: "We just donated $X to children's hospitals"

[0-3s] Screen recording of donation being made
[3-10s] Show the process:
  - Amount
  - Recipient hospital
  - Confirmation
  - Receipt
[10-15s] Team celebration (genuine)

VOICEOVER:
"Every product sold. Every click. Every share.
This is where it goes. This is why we do it."

CTA: "Help us do more - link in bio"`,
        viralTips: [
            "Real proof of impact",
            "Celebration is contagious",
            "Makes viewers feel part of it"
        ]
    },
    {
        hook: "Things they don't tell you about running a charity startup",
        script: `HOOK: "Things they don't tell you about running a charity startup"

[0-15s] Rapid truths:
1. "Banks are skeptical of your model"
2. "People assume you're a scam until proven otherwise"
3. "Operating on 30% is actually possible"
4. "The best people want to work for purpose"
5. "Impact is the best metric"

VOICEOVER:
"It's harder. It's different. It's absolutely worth it."

CTA: "Follow for honest startup content"`,
        viralTips: [
            "Insider knowledge format",
            "Vulnerability is powerful",
            "Educational + emotional"
        ]
    }
];

// ============================================================
// MAIN GENERATION FUNCTION
// ============================================================
function generateContent(category) {
    let content, hashtags, categoryName;

    switch (category) {
        case 'ai':
        case 'aiProducts':
        case 1:
            content = AI_PRODUCT_DEMOS[Math.floor(Math.random() * AI_PRODUCT_DEMOS.length)];
            hashtags = TRENDING_HASHTAGS.aiProducts;
            categoryName = 'AI Product Demos';
            break;
        case 'zombies':
        case 'smartphoneZombies':
        case 2:
            content = SMARTPHONE_ZOMBIES_MERCH[Math.floor(Math.random() * SMARTPHONE_ZOMBIES_MERCH.length)];
            hashtags = TRENDING_HASHTAGS.smartphoneZombies;
            categoryName = 'Smartphone Zombies Merch';
            break;
        case 'tech':
        case 'techTips':
        case 3:
            content = TECH_TIPS[Math.floor(Math.random() * TECH_TIPS.length)];
            hashtags = TRENDING_HASHTAGS.techTips;
            categoryName = 'Tech Tips';
            break;
        case 'bts':
        case 'behindTheScenes':
        case 4:
            content = BEHIND_THE_SCENES[Math.floor(Math.random() * BEHIND_THE_SCENES.length)];
            hashtags = TRENDING_HASHTAGS.behindTheScenes;
            categoryName = 'Behind the Scenes';
            break;
        default:
            // Random category
            const categories = [AI_PRODUCT_DEMOS, SMARTPHONE_ZOMBIES_MERCH, TECH_TIPS, BEHIND_THE_SCENES];
            const hashtagSets = Object.values(TRENDING_HASHTAGS);
            const categoryNames = ['AI Product Demos', 'Smartphone Zombies Merch', 'Tech Tips', 'Behind the Scenes'];
            const idx = Math.floor(Math.random() * categories.length);
            content = categories[idx][Math.floor(Math.random() * categories[idx].length)];
            hashtags = hashtagSets[idx];
            categoryName = categoryNames[idx];
    }

    // Select 8-10 trending hashtags
    const shuffled = hashtags.sort(() => 0.5 - Math.random());
    const selectedHashtags = shuffled.slice(0, 8 + Math.floor(Math.random() * 3));

    return {
        category: categoryName,
        hook: content.hook,
        script: content.script,
        viralTips: content.viralTips || [],
        hashtags: selectedHashtags,
        generatedAt: new Date().toISOString()
    };
}

function generateAllCategories() {
    return {
        aiProductDemo: generateContent('ai'),
        smartphoneZombiesMerch: generateContent('zombies'),
        techTip: generateContent('tech'),
        behindTheScenes: generateContent('bts'),
        generatedAt: new Date().toISOString()
    };
}

function formatContentForLog(content) {
    return `
================================================================================
TIKTOK CONTENT IDEA
================================================================================
Category: ${content.category}
Generated: ${content.generatedAt}

--------------------------------------------------------------------------------
HOOK (First 3 seconds - MOST IMPORTANT)
--------------------------------------------------------------------------------
"${content.hook}"

--------------------------------------------------------------------------------
FULL SCRIPT
--------------------------------------------------------------------------------
${content.script}

--------------------------------------------------------------------------------
VIRAL TIPS
--------------------------------------------------------------------------------
${content.viralTips.map((tip, i) => `${i + 1}. ${tip}`).join('\n')}

--------------------------------------------------------------------------------
TRENDING HASHTAGS
--------------------------------------------------------------------------------
${content.hashtags.join(' ')}

================================================================================
`;
}

function saveContentToLogs(contents) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const logsPath = path.join(LOGS_DIR, `tiktok-ideas-${timestamp}.md`);

    let markdown = `# TikTok Content Ideas - Generated ${new Date().toLocaleString()}

> FOR THE KIDS Platform - 60% to Verified Pediatric Charities

---

`;

    if (contents.aiProductDemo) {
        markdown += formatMarkdownSection(contents.aiProductDemo);
    }
    if (contents.smartphoneZombiesMerch) {
        markdown += formatMarkdownSection(contents.smartphoneZombiesMerch);
    }
    if (contents.techTip) {
        markdown += formatMarkdownSection(contents.techTip);
    }
    if (contents.behindTheScenes) {
        markdown += formatMarkdownSection(contents.behindTheScenes);
    }

    fs.writeFileSync(logsPath, markdown);
    return logsPath;
}

function formatMarkdownSection(content) {
    return `## ${content.category}

### Hook
> "${content.hook}"

### Full Script
\`\`\`
${content.script}
\`\`\`

### Viral Tips
${content.viralTips.map(tip => `- ${tip}`).join('\n')}

### Hashtags
\`${content.hashtags.join(' ')}\`

---

`;
}

// ============================================================
// MAIN EXECUTION
// ============================================================
function main() {
    log('');
    log('================================================================================');
    log('TIKTOK CONTENT IDEA GENERATOR - FOR THE KIDS PLATFORM');
    log('Mission: 60% to Verified Pediatric Charities');
    log('================================================================================');
    log('');

    const args = process.argv.slice(2);
    let contents;

    if (args.includes('--all') || args.length === 0) {
        // Generate one idea from each category
        log('Generating content ideas for ALL categories...');
        contents = generateAllCategories();

        console.log(formatContentForLog(contents.aiProductDemo));
        console.log(formatContentForLog(contents.smartphoneZombiesMerch));
        console.log(formatContentForLog(contents.techTip));
        console.log(formatContentForLog(contents.behindTheScenes));
    } else {
        // Generate for specific category
        const category = args[0].toLowerCase();
        log(`Generating content idea for category: ${category}`);
        const content = generateContent(category);
        console.log(formatContentForLog(content));
        contents = { [category]: content };
    }

    // Save to logs
    const logPath = saveContentToLogs(contents);
    log(`Content saved to: ${logPath}`);

    // Save latest ideas to quick-access file
    const latestPath = path.join(LOGS_DIR, 'latest-tiktok-ideas.md');
    const latestContent = fs.readFileSync(logPath, 'utf8');
    fs.writeFileSync(latestPath, latestContent);
    log(`Latest ideas also saved to: ${latestPath}`);

    log('');
    log('================================================================================');
    log('USAGE:');
    log('  node tiktok-content-generator.cjs --all    (generate all categories)');
    log('  node tiktok-content-generator.cjs ai       (AI product demos)');
    log('  node tiktok-content-generator.cjs zombies  (Smartphone Zombies merch)');
    log('  node tiktok-content-generator.cjs tech     (Tech tips)');
    log('  node tiktok-content-generator.cjs bts      (Behind the scenes)');
    log('================================================================================');
    log('');
    log('GENERATION COMPLETE - Go create some viral content!');
    log('Remember: FOR THE KIDS - Every view helps children');
    log('');
}

// Run if called directly
if (require.main === module) {
    main();
}

// Export for use as module
module.exports = {
    generateContent,
    generateAllCategories,
    AI_PRODUCT_DEMOS,
    SMARTPHONE_ZOMBIES_MERCH,
    TECH_TIPS,
    BEHIND_THE_SCENES,
    TRENDING_HASHTAGS
};
