/**
 * Instagram Reels Content Generator
 * Generates short-form video scripts for Instagram Reels
 *
 * Content Categories:
 * 1. Product Demos - AI Solutions Store products
 * 2. Smartphone Zombies Merch - 60% to Kids DAO
 * 3. Tech Tips - Educational content
 * 4. Mission Storytelling - FOR THE KIDS narrative
 *
 * FOR THE KIDS - 60/30/10
 */

const fs = require('fs');
const path = require('path');

const LOGS_DIR = 'C:\\AiCollabForTheKids\\logs\\instagram-reels';
const LOG_FILE = path.join(LOGS_DIR, 'reels-generator.log');

// Ensure logs directory exists
if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
}

function log(message) {
    const entry = `[${new Date().toISOString()}] ${message}\n`;
    fs.appendFileSync(LOG_FILE, entry);
    console.log(entry.trim());
}

// ═══════════════════════════════════════════════════════════════
// TRENDING AUDIO SUGGESTIONS
// ═══════════════════════════════════════════════════════════════
const TRENDING_AUDIO = {
    hype: [
        "Original Sound - Trending Hype Beat",
        "Money Trees - Kendrick Lamar",
        "Started From The Bottom - Drake",
        "Rich Flex - Drake & 21 Savage",
        "Industry Baby - Lil Nas X"
    ],
    motivational: [
        "Eye of the Tiger - Survivor",
        "Lose Yourself - Eminem",
        "Till I Collapse - Eminem",
        "Run This Town - Jay-Z",
        "Unstoppable - Sia"
    ],
    chill: [
        "Blinding Lights - The Weeknd",
        "Levitating - Dua Lipa",
        "Good Days - SZA",
        "Heat Waves - Glass Animals",
        "Peaches - Justin Bieber"
    ],
    funny: [
        "Oh No - Kreepa",
        "Monkeys Spinning Monkeys",
        "It's Corn - Remix",
        "Quirky Dog - Trending Sound",
        "That's Suspicious - Original"
    ],
    emotional: [
        "A Thousand Years - Christina Perri",
        "Photograph - Ed Sheeran",
        "Someone You Loved - Lewis Capaldi",
        "Talking to the Moon - Bruno Mars",
        "River Flows in You - Yiruma"
    ],
    techy: [
        "Digital Love - Daft Punk",
        "Technologic - Daft Punk",
        "Around the World - Daft Punk",
        "Robot Rock - Daft Punk",
        "Harder Better Faster Stronger - Daft Punk"
    ]
};

// ═══════════════════════════════════════════════════════════════
// 1. PRODUCT DEMO REELS
// ═══════════════════════════════════════════════════════════════
const PRODUCT_DEMO_REELS = [
    {
        title: "Claude Droid - YouTube Automation",
        hook: "I make $X/month on YouTube without recording a single video",
        duration: "30-60 seconds",
        script: `[0-3s] HOOK: "I make money on YouTube without recording videos"
[3-8s] Problem: "Creating YouTube content takes HOURS every day"
[8-15s] Solution: "Claude Droid automates EVERYTHING"
[15-22s] Demo: Show news scraping to script generation
[22-28s] Demo: Show AI voiceover + video creation
[28-35s] Demo: Show auto-upload to YouTube
[35-45s] Results: "4 videos per day. Zero manual work."
[45-50s] CTA: "Link in bio - $299 one-time"`,
        caption: `YouTube automation is REAL.

Claude Droid handles:
- News scraping to scripts
- AI voiceover generation
- Video production
- Auto-uploading

I went from 0 to 4 videos/day without touching my camera.

$299 one-time. No subscriptions. No hidden fees.

Link in bio to see it in action.`,
        hashtags: "#YouTubeAutomation #PassiveIncome #AITools #ContentCreator #SideHustle #YouTuber #MakeMoneyOnline #Automation #TechTok #ClaudeDroid",
        audioStyle: "hype",
        category: "product_demo"
    },
    {
        title: "Marketing Engine - 20 Platform Automation",
        hook: "This tool posts to 20 platforms while I sleep",
        duration: "30-45 seconds",
        script: `[0-3s] HOOK: "This posts to 20 platforms while I sleep"
[3-8s] Show: Wake up, grab coffee
[8-15s] Reveal: Phone notifications from Twitter, Reddit, Discord, LinkedIn
[15-22s] Demo: Marketing Engine dashboard
[22-30s] Demo: Show scheduled posts going live
[30-38s] Stats: "1 piece of content = 20 platforms automatically"
[38-45s] CTA: "$199 - link in bio"`,
        caption: `I write ONE post. It goes to TWENTY platforms.

Marketing Engine automates:
- Twitter/X
- Reddit (15+ subreddits)
- Discord
- LinkedIn
- Telegram
- Dev.to
- Hacker News
- Product Hunt
- And 12 more...

Set it up once. Let it run forever.

$199 one-time. Link in bio.`,
        hashtags: "#MarketingAutomation #SocialMediaMarketing #Entrepreneur #StartupLife #GrowthHacking #DigitalMarketing #ContentDistribution #AutomationTools #TechStartup",
        audioStyle: "techy",
        category: "product_demo"
    },
    {
        title: "Income Droid - Passive Revenue System",
        hook: "My laptop made $X last month. I wasn't even home.",
        duration: "45-60 seconds",
        script: `[0-3s] HOOK: "My laptop made money while I was on vacation"
[3-10s] Show: Beach vacation clips
[10-15s] Phone notification: Payment received
[15-25s] Back home: Open Income Droid dashboard
[25-35s] Demo: Revenue streams running automatically
[35-45s] Breakdown: Content creation + monetization + optimization
[45-55s] CTA: "Full automation system - $499"
[55-60s] "Link in bio"`,
        caption: `Passive income that's actually passive.

Income Droid runs:
- Automated content creation
- Revenue tracking
- Performance optimization
- Multi-stream monetization

I was on vacation for 2 weeks. It kept making money.

$499 for the complete system. Link in bio.`,
        hashtags: "#PassiveIncome #IncomeStreams #FinancialFreedom #OnlineBusiness #MoneyMindset #Entrepreneurship #SideHustle #DigitalNomad #AutomatedIncome #IncomeDroid",
        audioStyle: "motivational",
        category: "product_demo"
    },
    {
        title: "YouAndINotAI - Verified Dating",
        hook: "Dating app that KICKED OUT 47% of users for being fake",
        duration: "30-45 seconds",
        script: `[0-3s] HOOK: "This dating app kicked out 47% of users"
[3-8s] Stat overlay: "47% of dating profiles are fake"
[8-15s] Show: AI verification scanning face
[15-22s] Animation: Fake profiles getting rejected
[22-30s] Reveal: Only verified, real people remain
[30-38s] Feature: "Every match is verified human"
[38-45s] CTA: "YouAndINotAI.com - link in bio"`,
        caption: `Tired of matching with bots and catfish?

YouAndINotAI verifies EVERY user:
- AI photo verification
- Behavioral analysis
- Bot detection
- Real humans only

No more wondering if they're real.

Join the waitlist. Link in bio.`,
        hashtags: "#DatingApp #OnlineDating #SingleLife #Relationships #TechStartup #AIVerification #NoMoreCatfish #DatingAdvice #LoveLife #YouAndINotAI",
        audioStyle: "chill",
        category: "product_demo"
    },
    {
        title: "AI Solutions Store - $1 Consultation",
        hook: "I'll analyze your business for $1",
        duration: "30-45 seconds",
        script: `[0-3s] HOOK: "I'll analyze your entire business for $1"
[3-10s] Show: Business owner overwhelmed with tasks
[10-18s] List what I identify: Automation opportunities
[18-25s] Show: Time saved calculation
[25-32s] Reveal: Custom AI implementation plan
[32-38s] Value: "Usually $99. Right now: $1"
[38-45s] CTA: "ai-solutions.store - link in bio"`,
        caption: `Your business has hidden automation opportunities.

$1 consultation includes:
- Full process analysis
- Automation recommendations
- ROI calculation
- Custom implementation plan

I usually charge $99 for this. Testing at $1.

Limited spots. Link in bio.`,
        hashtags: "#BusinessAutomation #AIConsulting #SmallBusiness #Entrepreneur #BusinessGrowth #Productivity #WorkSmarter #AITools #BusinessTips #Consulting",
        audioStyle: "motivational",
        category: "product_demo"
    }
];

// ═══════════════════════════════════════════════════════════════
// 2. SMARTPHONE ZOMBIES MERCH REELS
// ═══════════════════════════════════════════════════════════════
const SMARTPHONE_ZOMBIES_REELS = [
    {
        title: "POV: Smartphone Zombie",
        hook: "POV: You almost walked into a pole because you were scrolling",
        duration: "15-30 seconds",
        script: `[0-3s] HOOK: POV walking, phone in hand
[3-8s] Almost bump into pole/person
[8-12s] Look up startled
[12-18s] See "Beware of Smartphone Zombies" sign
[18-22s] Laugh at self
[22-28s] Show merch: T-shirt with design
[28-30s] Text overlay: "Link in bio - 60% to kids' healthcare"`,
        caption: `We've ALL been that person.

"Beware of Smartphone Zombies" merch is here:
- T-Shirts: $24.99
- Hoodies: $44.99
- Phone Cases: $29.99
- Stickers: $4.99

60% of every purchase goes to children's medical care through Kids DAO.

Look good. Help kids. Link in bio.`,
        hashtags: "#SmartphoneZombies #PhoneAddict #Relatable #CharityMerch #ForTheKids #UnplugForKids #MerchDrop #HelpKids #FunnyMerch #SocialAwareness",
        audioStyle: "funny",
        category: "smartphone_zombies"
    },
    {
        title: "The Irony",
        hook: "The irony: You're reading this on your phone right now",
        duration: "20-30 seconds",
        script: `[0-3s] HOOK: Text overlay "The irony..."
[3-8s] "You're reading this on your phone"
[8-12s] "While walking/sitting/waiting"
[12-18s] "Just like a smartphone zombie"
[18-22s] "Embrace it. Wear it. Help kids."
[22-28s] Show merch collection
[28-30s] "60% to children's healthcare"`,
        caption: `The irony is not lost on us.

You're scrolling right now. Probably walking too.

"Beware of Smartphone Zombies"
- Wear the merch
- Acknowledge the addiction
- Help kids while you're at it

60% of profits fund children's medical care.

DM "ZOMBIE" to order.`,
        hashtags: "#SmartphoneZombies #PhoneAddiction #Irony #CharityFashion #KidsDAO #HelpingKids #MerchAlert #UnplugForKids #SocialMedia #DigitalAge",
        audioStyle: "chill",
        category: "smartphone_zombies"
    },
    {
        title: "Merch Unboxing",
        hook: "Unboxing the most self-aware merch ever",
        duration: "30-45 seconds",
        script: `[0-3s] HOOK: Package on table
[3-8s] "Merch that calls you out"
[8-15s] Open box, reveal t-shirt
[15-20s] Show design close-up
[20-28s] Put on shirt, pose
[28-35s] Show hoodie, cases, stickers
[35-42s] "60% goes to kids' healthcare"
[42-45s] "Link in bio to get yours"`,
        caption: `UNBOXING: Smartphone Zombies merch

This design is peak self-awareness.

Every time you look at your phone in public... you know.

What's in the box:
- Premium quality tees
- Cozy hoodies
- Phone cases (yes, the irony)
- Kiss-cut stickers

60% to Kids DAO (children's medical care)

Link in bio to order!`,
        hashtags: "#Unboxing #MerchDrop #SmartphoneZombies #CharityMerch #ForTheKids #NewMerch #UnboxingVideo #FashionForACause #HelpKids #KidsDAO",
        audioStyle: "hype",
        category: "smartphone_zombies"
    },
    {
        title: "Street Reaction",
        hook: "Wore this in public and people actually laughed",
        duration: "30-45 seconds",
        script: `[0-3s] HOOK: Walking in public
[3-10s] People notice shirt, smile/laugh
[10-18s] Show reactions: pointing, nodding
[18-25s] Guy walks by on phone, looks at shirt, laughs
[25-32s] "Everyone relates to this"
[32-38s] "Because we're all smartphone zombies"
[38-45s] CTA: "Get yours - 60% to kids"`,
        caption: `Wore "Beware of Smartphone Zombies" in public.

People kept laughing because they RELATED.

We're all guilty. Might as well wear it proudly.

And 60% of what you pay goes directly to children's medical care through Kids DAO.

Style + purpose. Link in bio.`,
        hashtags: "#StreetStyle #SmartphoneZombies #PublicReaction #CharityFashion #WearForACause #FunnyShirt #UnplugForKids #ViralMerch #HelpKids #ForTheKids",
        audioStyle: "funny",
        category: "smartphone_zombies"
    },
    {
        title: "Support Kids",
        hook: "This t-shirt funds a child's medical care",
        duration: "30-45 seconds",
        script: `[0-3s] HOOK: "This isn't just a t-shirt"
[3-10s] Show Smartphone Zombies design
[10-18s] "60% of every purchase..."
[18-25s] "Goes directly to Kids DAO"
[25-32s] "Verified children's medical care"
[32-38s] Show all products available
[38-45s] "Your purchase makes a difference"`,
        caption: `This merch hits different.

"Beware of Smartphone Zombies"
- Funny design everyone relates to
- Premium quality materials
- Sizes S-3XL

But here's what matters:
60% of EVERY purchase goes to Kids DAO

That's verified children's medical care.

Your hoodie could fund a kid's treatment.

Link in bio. Help a kid.`,
        hashtags: "#CharityMerch #ForTheKids #KidsDAO #SmartphoneZombies #GiveBack #HelpChildren #MerchWithPurpose #SupportKids #CharityFashion #MakeADifference",
        audioStyle: "emotional",
        category: "smartphone_zombies"
    }
];

// ═══════════════════════════════════════════════════════════════
// 3. TECH TIPS REELS
// ═══════════════════════════════════════════════════════════════
const TECH_TIPS_REELS = [
    {
        title: "AI Tools You're Sleeping On",
        hook: "5 AI tools that will change how you work in 2025",
        duration: "45-60 seconds",
        script: `[0-3s] HOOK: "AI tools you're NOT using"
[3-12s] Tool 1: Content automation
[12-21s] Tool 2: Email AI assistants
[21-30s] Tool 3: Social media scheduling
[30-39s] Tool 4: Data analysis AI
[39-48s] Tool 5: Customer service bots
[48-55s] "Master these = work smarter"
[55-60s] "Follow for more tech tips"`,
        caption: `AI tools that 10x your productivity:

1. Content automation - Write once, publish everywhere
2. Email AI - Auto-responses that sound human
3. Social schedulers - Post 24/7 without being online
4. Data analysis - Spreadsheets that think
5. Customer bots - Support that never sleeps

The future of work is automated.

Follow for more tech tips that actually matter.`,
        hashtags: "#AITools #TechTips #Productivity #WorkSmarter #AI2025 #Automation #TechTok #LearnOnTikTok #DigitalTools #FutureOfWork",
        audioStyle: "techy",
        category: "tech_tips"
    },
    {
        title: "Automate Your Side Hustle",
        hook: "How to automate 80% of your side hustle",
        duration: "45-60 seconds",
        script: `[0-3s] HOOK: "Automate 80% of your side hustle"
[3-12s] Step 1: Identify repetitive tasks
[12-21s] Step 2: Use AI for content creation
[21-30s] Step 3: Automate customer emails
[30-39s] Step 4: Schedule everything in advance
[39-48s] Step 5: Set up payment automation
[48-55s] "Time saved = money earned"
[55-60s] "Save this for later"`,
        caption: `Your side hustle shouldn't be a second job.

How to automate 80%:
1. List every task you do manually
2. AI generates your content
3. Email sequences handle customers
4. Everything scheduled weeks ahead
5. Payments process automatically

Result: 2 hours/week instead of 20.

Save this. Thank me later.`,
        hashtags: "#SideHustle #Automation #PassiveIncome #HustleSmart #BusinessTips #EntrepreneurMindset #WorkLifeBalance #OnlineIncome #AutomatedBusiness #SideGig",
        audioStyle: "motivational",
        category: "tech_tips"
    },
    {
        title: "Free AI Tools",
        hook: "Stop paying for these - free alternatives exist",
        duration: "45-60 seconds",
        script: `[0-3s] HOOK: "Stop paying for these"
[3-12s] Paid tool 1 vs Free alternative
[12-21s] Paid tool 2 vs Free alternative
[21-30s] Paid tool 3 vs Free alternative
[30-39s] Paid tool 4 vs Free alternative
[39-48s] "I saved $200/month with these swaps"
[48-55s] "Comment FREE for the full list"
[55-60s] "Follow for money-saving tech"`,
        caption: `You're overpaying for tools. Here's what I swapped:

- Grammarly Premium - Use free tier + GPT
- Canva Pro - Use Canva free + AI generators
- Zoom Pro - Use free + Google Meet
- Notion AI - Use Notion free + Claude
- Jasper AI - Use Claude or GPT directly

Saved $200/month with identical results.

Comment "FREE" and I'll DM the full list.`,
        hashtags: "#FreeTools #SaveMoney #TechHacks #AITools #BudgetTips #FreeSoftware #MoneyTips #TechTok #LifeHacks #FreeAlternatives",
        audioStyle: "hype",
        category: "tech_tips"
    },
    {
        title: "AI Content Workflow",
        hook: "My entire content workflow takes 30 minutes/week",
        duration: "45-60 seconds",
        script: `[0-3s] HOOK: "30 minutes/week for ALL my content"
[3-12s] Monday: AI generates week's scripts
[12-21s] Tuesday: Batch record everything
[21-30s] Wednesday: AI edits and formats
[30-39s] Thursday-Sunday: Auto-scheduled posts
[39-48s] Show results: Consistent posting
[48-55s] "Work smarter, not harder"
[55-60s] "Follow for workflow tips"`,
        caption: `30 minutes = 1 week of content.

My workflow:
- Monday: AI writes all scripts (10 min)
- Tuesday: Batch record (15 min)
- Wednesday: AI edits (5 min review)
- Rest of week: Auto-posts

Result: 7 days of content, 30 minutes of work.

The secret? Systems beat hustle every time.

Follow for more workflow tips.`,
        hashtags: "#ContentCreation #Workflow #Productivity #ContentCreator #BatchContent #WorkSmarter #ContentStrategy #AIContent #TimeManagement #CreatorTips",
        audioStyle: "techy",
        category: "tech_tips"
    },
    {
        title: "Beginner AI Mistakes",
        hook: "3 mistakes killing your AI results",
        duration: "30-45 seconds",
        script: `[0-3s] HOOK: "You're using AI wrong"
[3-12s] Mistake 1: Vague prompts
[12-21s] Mistake 2: Not iterating
[21-30s] Mistake 3: Copy-pasting without editing
[30-38s] "Fix these = 10x better results"
[38-45s] "Comment your biggest AI struggle"`,
        caption: `Your AI results are bad because:

1. VAGUE PROMPTS
"Write a blog post" vs "Write a 500-word blog post about X for Y audience in Z tone"

2. NOT ITERATING
First output is never the best. Ask for revisions.

3. COPY-PASTE WITHOUT EDITING
AI writes, you refine. Always.

Fix these = dramatically better results.

What's your biggest AI struggle? Comment below.`,
        hashtags: "#AITips #Prompting #AIHacks #LearnAI #TechEducation #AIForBeginners #PromptEngineering #BetterResults #AIContent #TechTips",
        audioStyle: "chill",
        category: "tech_tips"
    }
];

// ═══════════════════════════════════════════════════════════════
// 4. MISSION STORYTELLING REELS
// ═══════════════════════════════════════════════════════════════
const MISSION_STORYTELLING_REELS = [
    {
        title: "Why We Do This",
        hook: "60% of everything we make goes to one place",
        duration: "45-60 seconds",
        script: `[0-3s] HOOK: "60% of everything goes here"
[3-12s] Show: Kids DAO logo
[12-20s] Explain: "Verified children's medical care"
[20-30s] Story: Why this mission matters
[30-40s] Show: Products that fund this
[40-50s] "Every purchase = a kid helped"
[50-60s] "This is why we build"`,
        caption: `Why do we build?

60% of every dollar we make goes to Kids DAO.

That's not marketing. That's the mission.

Kids DAO funds:
- Verified medical pediatrics
- Children's healthcare
- Real impact, tracked on chain

When you buy from us:
- You get a product that works
- A child gets medical care

FOR THE KIDS. Always.

Link in bio to see our products.`,
        hashtags: "#ForTheKids #KidsDAO #CharityBusiness #MissionDriven #HelpChildren #SocialEnterprise #GivingBack #BusinessWithPurpose #ChildrensHealth #MakeADifference",
        audioStyle: "emotional",
        category: "mission_storytelling"
    },
    {
        title: "The 60/30/10 Model",
        hook: "Most companies keep 90% of profits. We keep 10%.",
        duration: "45-60 seconds",
        script: `[0-3s] HOOK: "We keep only 10%"
[3-12s] Breakdown: 60% to Kids DAO
[12-20s] 30% to product development
[20-28s] 10% to operations
[28-38s] "This is how we run everything"
[38-48s] Show products available
[48-55s] "Buy a product, fund a kid"
[55-60s] "Link in bio"`,
        caption: `The 60/30/10 Model:

60% - Kids DAO (children's medical care)
30% - Building better products
10% - Our operations

Why only 10% for us?
Because this was never about getting rich.

It's about building things that work AND helping kids who need it.

Every product. Every sale. Same split.

FOR THE KIDS.`,
        hashtags: "#SocialEnterprise #BusinessModel #ForTheKids #GivingBack #TransparentBusiness #CharityWork #KidsDAO #EthicalBusiness #MissionFirst #PurposeDriven",
        audioStyle: "motivational",
        category: "mission_storytelling"
    },
    {
        title: "From Builder to Giver",
        hook: "I used to build for profit. Now I build for kids.",
        duration: "45-60 seconds",
        script: `[0-3s] HOOK: "I build for kids now"
[3-12s] Past: Building products for profit
[12-22s] Realization: Impact matters more
[22-32s] Decision: 60% to children's healthcare
[32-42s] Now: Every product helps a kid
[42-52s] Show current product lineup
[52-60s] "Join the mission - link in bio"`,
        caption: `The shift that changed everything:

BEFORE: Build products. Keep profits. Repeat.

NOW: Build products. 60% to kids. Impact.

Every AI tool we sell funds children's medical care.

Claude Droid - $299 = multiple kids helped
Marketing Engine - $199 = real impact
Income Droid - $499 = significant contribution

The products work. The mission matters more.

FOR THE KIDS. Link in bio.`,
        hashtags: "#BuilderStory #TechForGood #ForTheKids #Entrepreneurship #GivingBack #TechFounder #PurposeDriven #SocialImpact #MissionFirst #KidsDAO",
        audioStyle: "emotional",
        category: "mission_storytelling"
    },
    {
        title: "Real Impact",
        hook: "Here's exactly where your money goes",
        duration: "45-60 seconds",
        script: `[0-3s] HOOK: "Where your money actually goes"
[3-10s] You buy a product
[10-18s] 60% immediately to Kids DAO
[18-26s] Kids DAO = Verified Medical Pediatrics
[26-34s] On-chain tracking (show blockchain)
[34-42s] Real kids. Real healthcare.
[42-50s] "This is transparency"
[50-60s] "Every purchase is tracked"`,
        caption: `Your money. Tracked.

1. You buy a product from AI Solutions Store
2. 60% goes directly to Kids DAO
3. Kids DAO = Verified Medical Pediatrics
4. Every transaction recorded on chain
5. Real children receive real healthcare

No black boxes. No "admin fees."

Just kids getting help they need.

This is what business should be.`,
        hashtags: "#Transparency #KidsDAO #BlockchainCharity #ForTheKids #VerifiedImpact #RealCharity #TrackableGiving #ChildrensHealth #TechForGood #OnChain",
        audioStyle: "techy",
        category: "mission_storytelling"
    },
    {
        title: "Why Merch Matters",
        hook: "A t-shirt that actually helps kids",
        duration: "30-45 seconds",
        script: `[0-3s] HOOK: "T-shirt that helps kids"
[3-10s] Show Smartphone Zombies merch
[10-18s] "60% of this goes to Kids DAO"
[18-26s] "That's children's medical care"
[26-34s] "Wear something. Help someone."
[34-42s] Show full collection
[42-45s] "Link in bio"`,
        caption: `Not all merch is equal.

Smartphone Zombies collection:
- Funny design everyone relates to
- Premium quality that lasts
- 60% funds children's healthcare

Wear something. Help someone.

Every t-shirt, hoodie, case, and sticker
= real kids getting real medical care.

Link in bio to shop.

FOR THE KIDS.`,
        hashtags: "#MerchWithMeaning #SmartphoneZombies #CharityMerch #ForTheKids #KidsDAO #WearForACause #FashionWithPurpose #HelpChildren #ShopForGood #MakeADifference",
        audioStyle: "chill",
        category: "mission_storytelling"
    }
];

// ═══════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════

function getRandomAudio(style) {
    const audios = TRENDING_AUDIO[style] || TRENDING_AUDIO.hype;
    return audios[Math.floor(Math.random() * audios.length)];
}

function generateReelContent(reel) {
    const audio = getRandomAudio(reel.audioStyle);
    return {
        ...reel,
        suggestedAudio: audio,
        generatedAt: new Date().toISOString()
    };
}

function getAllReels() {
    return [
        ...PRODUCT_DEMO_REELS.map(r => ({ ...r, type: 'Product Demo' })),
        ...SMARTPHONE_ZOMBIES_REELS.map(r => ({ ...r, type: 'Smartphone Zombies Merch' })),
        ...TECH_TIPS_REELS.map(r => ({ ...r, type: 'Tech Tips' })),
        ...MISSION_STORYTELLING_REELS.map(r => ({ ...r, type: 'Mission Storytelling' }))
    ];
}

function generateWeeklySchedule() {
    const schedule = [];
    const allReels = getAllReels();
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // 2 reels per day, rotating through categories
    const categoryRotation = ['product_demo', 'tech_tips', 'smartphone_zombies', 'mission_storytelling'];

    days.forEach((day, dayIndex) => {
        const cat1 = categoryRotation[dayIndex % 4];
        const cat2 = categoryRotation[(dayIndex + 2) % 4];

        const reels1 = allReels.filter(r => r.category === cat1);
        const reels2 = allReels.filter(r => r.category === cat2);

        schedule.push({
            day,
            slot1: {
                time: '9:00 AM',
                reel: generateReelContent(reels1[Math.floor(Math.random() * reels1.length)])
            },
            slot2: {
                time: '6:00 PM',
                reel: generateReelContent(reels2[Math.floor(Math.random() * reels2.length)])
            }
        });
    });

    return schedule;
}

// ═══════════════════════════════════════════════════════════════
// MAIN EXECUTION
// ═══════════════════════════════════════════════════════════════

function main() {
    log('═══════════════════════════════════════════════════════════════');
    log('INSTAGRAM REELS CONTENT GENERATOR');
    log('FOR THE KIDS - 60/30/10');
    log('═══════════════════════════════════════════════════════════════');

    // Generate content for each category
    const categories = [
        { name: 'Product Demos', reels: PRODUCT_DEMO_REELS },
        { name: 'Smartphone Zombies Merch', reels: SMARTPHONE_ZOMBIES_REELS },
        { name: 'Tech Tips', reels: TECH_TIPS_REELS },
        { name: 'Mission Storytelling', reels: MISSION_STORYTELLING_REELS }
    ];

    let allContent = `# Instagram Reels Content Library
## Generated: ${new Date().toISOString()}
## FOR THE KIDS - 60/30/10

---

`;

    categories.forEach(category => {
        log(`\n=== ${category.name.toUpperCase()} ===`);
        allContent += `# ${category.name}\n\n`;

        category.reels.forEach((reel, index) => {
            const content = generateReelContent(reel);
            log(`Generated: ${content.title}`);

            allContent += `## ${index + 1}. ${content.title}
### Hook
**"${content.hook}"**

### Duration
${content.duration}

### Script
\`\`\`
${content.script}
\`\`\`

### Caption
\`\`\`
${content.caption}
\`\`\`

### Hashtags
${content.hashtags}

### Suggested Audio
${content.suggestedAudio}

---

`;
        });
    });

    // Generate weekly schedule
    log('\n=== GENERATING WEEKLY SCHEDULE ===');
    const schedule = generateWeeklySchedule();

    allContent += `# Weekly Posting Schedule

`;

    schedule.forEach(day => {
        allContent += `## ${day.day}

### Morning Post (${day.slot1.time})
- **Type:** ${day.slot1.reel.type}
- **Title:** ${day.slot1.reel.title}
- **Hook:** "${day.slot1.reel.hook}"
- **Audio:** ${day.slot1.reel.suggestedAudio}

### Evening Post (${day.slot2.time})
- **Type:** ${day.slot2.reel.type}
- **Title:** ${day.slot2.reel.title}
- **Hook:** "${day.slot2.reel.hook}"
- **Audio:** ${day.slot2.reel.suggestedAudio}

---

`;
        log(`${day.day}: ${day.slot1.reel.title} + ${day.slot2.reel.title}`);
    });

    // Save content library
    const contentFile = path.join(LOGS_DIR, 'reels-content-library.md');
    fs.writeFileSync(contentFile, allContent);
    log(`\nContent library saved to: ${contentFile}`);

    // Save individual category files
    categories.forEach(category => {
        const categoryFile = path.join(LOGS_DIR, `${category.name.toLowerCase().replace(/\s+/g, '-')}.json`);
        const categoryContent = category.reels.map(r => generateReelContent(r));
        fs.writeFileSync(categoryFile, JSON.stringify(categoryContent, null, 2));
        log(`Category saved to: ${categoryFile}`);
    });

    // Save schedule
    const scheduleFile = path.join(LOGS_DIR, 'weekly-schedule.json');
    fs.writeFileSync(scheduleFile, JSON.stringify(schedule, null, 2));
    log(`Schedule saved to: ${scheduleFile}`);

    // Save quick reference
    const quickRef = `# Instagram Reels Quick Reference
## Generated: ${new Date().toISOString()}

## Content Categories
1. **Product Demos** - AI Solutions Store products (${PRODUCT_DEMO_REELS.length} reels)
2. **Smartphone Zombies** - Merch promotion, 60% to Kids DAO (${SMARTPHONE_ZOMBIES_REELS.length} reels)
3. **Tech Tips** - Educational automation content (${TECH_TIPS_REELS.length} reels)
4. **Mission Storytelling** - FOR THE KIDS narrative (${MISSION_STORYTELLING_REELS.length} reels)

## Posting Schedule
- **2 reels per day** (9 AM + 6 PM)
- **Rotate categories** for variety
- **Mix educational + promotional** content

## Trending Audio Styles
- Hype: For exciting reveals and results
- Motivational: For success stories and CTAs
- Chill: For lifestyle and product showcases
- Funny: For relatable Smartphone Zombies content
- Emotional: For mission/charity storytelling
- Techy: For automation and AI content

## Key Hashtags by Category
### Product Demos
#AITools #Automation #PassiveIncome #SideHustle #TechTok

### Smartphone Zombies
#SmartphoneZombies #UnplugForKids #CharityMerch #ForTheKids #MerchDrop

### Tech Tips
#TechTips #Productivity #WorkSmarter #AIHacks #ContentCreator

### Mission Storytelling
#ForTheKids #KidsDAO #SocialEnterprise #GivingBack #PurposeDriven

## Files Generated
- reels-content-library.md (full library)
- product-demos.json
- smartphone-zombies-merch.json
- tech-tips.json
- mission-storytelling.json
- weekly-schedule.json

---
*FOR THE KIDS - 60/30/10*
`;

    const quickRefFile = path.join(LOGS_DIR, 'quick-reference.md');
    fs.writeFileSync(quickRefFile, quickRef);
    log(`Quick reference saved to: ${quickRefFile}`);

    log('\n═══════════════════════════════════════════════════════════════');
    log('GENERATION COMPLETE');
    log(`Total Reels Generated: ${getAllReels().length}`);
    log(`Files saved to: ${LOGS_DIR}`);
    log('═══════════════════════════════════════════════════════════════');

    // Return summary
    return {
        totalReels: getAllReels().length,
        categories: {
            productDemos: PRODUCT_DEMO_REELS.length,
            smartphoneZombies: SMARTPHONE_ZOMBIES_REELS.length,
            techTips: TECH_TIPS_REELS.length,
            missionStorytelling: MISSION_STORYTELLING_REELS.length
        },
        filesGenerated: [
            contentFile,
            scheduleFile,
            quickRefFile
        ],
        logsDir: LOGS_DIR
    };
}

// Run the generator
const result = main();
console.log('\n--- SUMMARY ---');
console.log(JSON.stringify(result, null, 2));
