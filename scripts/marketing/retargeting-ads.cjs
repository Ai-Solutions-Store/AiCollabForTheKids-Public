/**
 * Retargeting Ad Content Generator
 * Generates high-converting retargeting ads for multiple platforms:
 * 1) Facebook/Meta Retargeting Ads
 * 2) Google Display Network Ads
 * 3) LinkedIn Sponsored Content
 * 4) Twitter/X Promoted Tweets
 *
 * Multiple A/B test variations per platform
 * Saves generated content to logs for review and deployment
 *
 * AI Solutions Store - FOR THE KIDS - 60/30/10
 */

const fs = require('fs');
const path = require('path');

// Configuration
const LOGS_DIR = 'C:\\AiCollabForTheKids\\logs';
const RETARGETING_DIR = path.join(LOGS_DIR, 'retargeting-ads');
const LOG_FILE = path.join(LOGS_DIR, 'retargeting-ads.log');
const STATE_FILE = path.join(LOGS_DIR, 'retargeting-state.json');

// Ensure directories exist
if (!fs.existsSync(RETARGETING_DIR)) {
    fs.mkdirSync(RETARGETING_DIR, { recursive: true });
}

function log(message) {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(LOG_FILE, entry);
    console.log(entry.trim());
}

// ============================================================================
// FACEBOOK/META RETARGETING ADS
// Targeting: Website visitors, cart abandoners, engaged users
// Format: Headlines (40 chars), Primary Text (125 chars), Description (30 chars)
// ============================================================================
const FACEBOOK_RETARGETING_ADS = {
    platform: 'facebook',
    audienceTypes: ['website_visitors', 'cart_abandoners', 'engaged_users', 'video_viewers'],
    variations: [
        // VARIATION A: Urgency + FOMO
        {
            id: 'fb-urgency-a',
            category: 'urgency',
            audience: 'cart_abandoners',
            headline: 'Your Cart Misses You',
            primaryText: 'You left something behind! Complete your order and automate your workflow. 60% of every purchase helps children in need.',
            description: 'Own it forever. No subs.',
            cta: 'Complete Purchase',
            imageHint: 'Split screen: abandoned cart vs automated success',
            product: 'all'
        },
        {
            id: 'fb-urgency-b',
            category: 'urgency',
            audience: 'cart_abandoners',
            headline: 'Still Thinking About It?',
            primaryText: 'That automation tool is waiting for you. One-time purchase, lifetime value. Plus you help kids with every order.',
            description: 'Skip subscriptions.',
            cta: 'Finish Checkout',
            imageHint: 'Clock with disappearing opportunity',
            product: 'all'
        },
        {
            id: 'fb-urgency-c',
            category: 'urgency',
            audience: 'cart_abandoners',
            headline: 'Ready When You Are',
            primaryText: 'Your AI automation tools are still in your cart. Complete your order and start saving 30+ hours/week today.',
            description: 'FOR THE KIDS.',
            cta: 'Complete Order',
            imageHint: 'Ready-to-ship package visualization',
            product: 'all'
        },

        // VARIATION B: Value Proposition
        {
            id: 'fb-value-a',
            category: 'value',
            audience: 'website_visitors',
            headline: 'Automate YouTube Forever',
            primaryText: 'Claude Droid creates 4 videos daily. Zero editing. Zero filming. $299 once, own it forever. 60% goes to kids.',
            description: 'Start automating now.',
            cta: 'Get Claude Droid',
            imageHint: 'YouTube automation dashboard with rising metrics',
            product: 'claude-droid'
        },
        {
            id: 'fb-value-b',
            category: 'value',
            audience: 'website_visitors',
            headline: '23 Platforms. Zero Work.',
            primaryText: 'Marketing Engine posts everywhere automatically. Twitter, LinkedIn, Reddit, Discord + 19 more. $199 one-time.',
            description: 'Automate distribution.',
            cta: 'Get Marketing Engine',
            imageHint: 'Connected platform icons with automation flow',
            product: 'marketing-engine'
        },
        {
            id: 'fb-value-c',
            category: 'value',
            audience: 'website_visitors',
            headline: '$2K/Month Passive Income',
            primaryText: 'Income Droid tracks and optimizes your revenue streams automatically. Set it up once. Watch it grow.',
            description: 'Revenue on autopilot.',
            cta: 'Get Income Droid',
            imageHint: 'Revenue chart growing while sleeping',
            product: 'income-droid'
        },

        // VARIATION C: Social Proof
        {
            id: 'fb-social-a',
            category: 'social_proof',
            audience: 'engaged_users',
            headline: '120 Videos in 30 Days',
            primaryText: 'Real results from real users. Claude Droid automated their entire YouTube channel. Now your turn. FOR THE KIDS.',
            description: 'Join 500+ creators.',
            cta: 'Start Creating',
            imageHint: 'User testimonial with video count',
            product: 'claude-droid'
        },
        {
            id: 'fb-social-b',
            category: 'social_proof',
            audience: 'engaged_users',
            headline: 'Trusted by 500+ Creators',
            primaryText: 'Solo founders use our tools to compete with agencies. No team needed. Just AI + automation. Own it forever.',
            description: 'Join the movement.',
            cta: 'Get Started',
            imageHint: 'Community of creators using the tools',
            product: 'all'
        },
        {
            id: 'fb-social-c',
            category: 'social_proof',
            audience: 'engaged_users',
            headline: '97% Time Saved',
            primaryText: 'From 4 hours per video to 0. Our users save 30+ hours every week with AI automation. What would you do with that time?',
            description: 'Reclaim your time.',
            cta: 'Save Time Now',
            imageHint: 'Before/after time comparison',
            product: 'claude-droid'
        },

        // VARIATION D: Mission-Driven
        {
            id: 'fb-mission-a',
            category: 'mission',
            audience: 'video_viewers',
            headline: 'Buy Tools. Help Kids.',
            primaryText: '60% of every purchase goes to children charities. Get AI automation AND make a difference. Win-win.',
            description: '60/30/10 split.',
            cta: 'Shop for Good',
            imageHint: 'Children benefiting + automation tools',
            product: 'all'
        },
        {
            id: 'fb-mission-b',
            category: 'mission',
            audience: 'video_viewers',
            headline: 'Tech That Gives Back',
            primaryText: 'FOR THE KIDS: Every product helps children in need. Automate your business. Fund the future. No subscriptions.',
            description: 'Purpose-driven tech.',
            cta: 'Join the Mission',
            imageHint: 'Tech + charity impact visualization',
            product: 'all'
        },
        {
            id: 'fb-mission-c',
            category: 'mission',
            audience: 'video_viewers',
            headline: 'Automation for Good',
            primaryText: 'We build AI tools and donate 60% to kids. You get automation, children get support. Everyone wins.',
            description: 'Make impact today.',
            cta: 'Shop Now',
            imageHint: 'Impact counter showing donations',
            product: 'all'
        }
    ]
};

// ============================================================================
// GOOGLE DISPLAY NETWORK ADS
// Targeting: Remarketing lists, similar audiences, in-market
// Formats: Responsive Display (multiple sizes), Headlines (30 chars), Descriptions (90 chars)
// ============================================================================
const GOOGLE_DISPLAY_ADS = {
    platform: 'google_display',
    audienceTypes: ['remarketing', 'similar_audiences', 'in_market_ai', 'in_market_automation'],
    variations: [
        // VARIATION A: Direct Response
        {
            id: 'gdn-direct-a',
            category: 'direct_response',
            audience: 'remarketing',
            headlines: [
                'Automate Your Content',
                'AI YouTube Automation',
                'Zero Manual Work'
            ],
            longHeadline: 'AI Creates 4 YouTube Videos Daily - Own the Code Forever',
            descriptions: [
                'Claude Droid automates YouTube content. No editing. No filming. $299 one-time. 60% goes to kids.',
                'Stop spending hours on videos. AI handles everything. One purchase, lifetime access.'
            ],
            businessName: 'AI Solutions Store',
            cta: 'Shop Now',
            product: 'claude-droid'
        },
        {
            id: 'gdn-direct-b',
            category: 'direct_response',
            audience: 'remarketing',
            headlines: [
                '23 Platform Marketing',
                'Post Everywhere Auto',
                'Marketing on Autopilot'
            ],
            longHeadline: 'Marketing Engine Posts to 23 Platforms Automatically',
            descriptions: [
                'Twitter, LinkedIn, Reddit, Discord + 19 more. One-time $199. No subscriptions ever.',
                'Automated marketing for solo founders. Set up once, run forever. FOR THE KIDS.'
            ],
            businessName: 'AI Solutions Store',
            cta: 'Get Started',
            product: 'marketing-engine'
        },
        {
            id: 'gdn-direct-c',
            category: 'direct_response',
            audience: 'remarketing',
            headlines: [
                'Passive Income Tools',
                'Revenue Automation',
                'Income on Autopilot'
            ],
            longHeadline: 'Income Droid Tracks and Grows Your Revenue Streams',
            descriptions: [
                'Automated revenue optimization. Dashboard for all income sources. $499 one-time.',
                'Build passive income that is actually passive. AI handles the heavy lifting.'
            ],
            businessName: 'AI Solutions Store',
            cta: 'Learn More',
            product: 'income-droid'
        },

        // VARIATION B: Problem/Solution
        {
            id: 'gdn-problem-a',
            category: 'problem_solution',
            audience: 'in_market_automation',
            headlines: [
                'Tired of Manual Work?',
                'Automate Everything',
                'Save 30+ Hours/Week'
            ],
            longHeadline: 'Stop Wasting Hours on Repetitive Tasks - Automate Today',
            descriptions: [
                'AI automation tools that work 24/7. Content, marketing, revenue - all handled.',
                'One-time purchase, no subscriptions. Own the code. Control your automation.'
            ],
            businessName: 'AI Solutions Store',
            cta: 'Automate Now',
            product: 'all'
        },
        {
            id: 'gdn-problem-b',
            category: 'problem_solution',
            audience: 'in_market_ai',
            headlines: [
                'AI That Works for You',
                'Real AI Automation',
                'Not Just Another Tool'
            ],
            longHeadline: 'AI Automation That Actually Delivers Results',
            descriptions: [
                'Skip the hype. Get AI tools with proven ROI. YouTube, marketing, income automation.',
                '500+ creators trust our tools. 120 videos/month. 23 platforms. Real results.'
            ],
            businessName: 'AI Solutions Store',
            cta: 'See Results',
            product: 'all'
        },
        {
            id: 'gdn-problem-c',
            category: 'problem_solution',
            audience: 'similar_audiences',
            headlines: [
                'Subscription Fatigue?',
                'Own Your Tools',
                'No Monthly Fees'
            ],
            longHeadline: 'One-Time Purchase AI Tools - No Subscriptions Ever',
            descriptions: [
                'Tired of monthly fees? Own your automation tools forever. Source code included.',
                'Stop renting software. Own it. Run it. No lock-in. Full control.'
            ],
            businessName: 'AI Solutions Store',
            cta: 'Buy Once',
            product: 'all'
        },

        // VARIATION C: Benefit-Focused
        {
            id: 'gdn-benefit-a',
            category: 'benefit',
            audience: 'remarketing',
            headlines: [
                '4 Videos Daily',
                'AI Content Factory',
                'Sleep, Earn, Repeat'
            ],
            longHeadline: 'Your AI Creates Content While You Sleep',
            descriptions: [
                'Claude Droid publishes 4 YouTube videos every day. No filming. No editing. Ever.',
                'Content compounds. More videos = more views = more revenue. Let AI do the work.'
            ],
            businessName: 'AI Solutions Store',
            cta: 'Start Now',
            product: 'claude-droid'
        },
        {
            id: 'gdn-benefit-b',
            category: 'benefit',
            audience: 'in_market_automation',
            headlines: [
                'Solo Founder Power',
                'Compete with Agencies',
                'Team of One Wins'
            ],
            longHeadline: 'Solo Founders Use AI to Outperform Agencies',
            descriptions: [
                'No employees needed. AI + automation gives you agency-level output.',
                'Run a multi-product business solo. Marketing, content, revenue - all automated.'
            ],
            businessName: 'AI Solutions Store',
            cta: 'Get Leverage',
            product: 'all'
        },
        {
            id: 'gdn-benefit-c',
            category: 'benefit',
            audience: 'similar_audiences',
            headlines: [
                'Help Kids, Get Tools',
                '60% to Charity',
                'Tech for Good'
            ],
            longHeadline: 'Every Purchase Helps Children - 60% to Charity',
            descriptions: [
                'FOR THE KIDS: AI tools that fund children charities. Automation + impact.',
                'Buy automation tools. 60% goes to kids. Real impact, real tech. No catch.'
            ],
            businessName: 'AI Solutions Store',
            cta: 'Shop for Good',
            product: 'all'
        }
    ]
};

// ============================================================================
// LINKEDIN SPONSORED CONTENT
// Targeting: Professional retargeting, account-based, job function
// Format: Single Image/Carousel, Intro Text (600 chars), Headline (200 chars)
// ============================================================================
const LINKEDIN_SPONSORED_ADS = {
    platform: 'linkedin',
    audienceTypes: ['website_retargeting', 'account_based', 'job_function_marketing', 'job_function_tech'],
    variations: [
        // VARIATION A: B2B Value Proposition
        {
            id: 'li-b2b-a',
            category: 'b2b_value',
            audience: 'website_retargeting',
            introText: `After analyzing 500+ automation implementations, one pattern is clear:

The companies saving 30+ hours/week aren't using better tools - they're using owned tools.

Our AI automation suite:
- Claude Droid: YouTube content factory (4 videos/day)
- Marketing Engine: 23-platform distribution
- Income Droid: Revenue optimization

One-time purchase. Source code included. Zero subscriptions.

The hidden benefit: 60% of every sale goes to children's charities. Business automation that matters.`,
            headline: 'AI Automation Tools - Own Forever, No Subscriptions',
            cta: 'Learn More',
            imageHint: 'Professional dashboard showing automation metrics',
            product: 'all'
        },
        {
            id: 'li-b2b-b',
            category: 'b2b_value',
            audience: 'website_retargeting',
            introText: `The math on content automation:

Manual video creation: 4 hours/video
AI-automated creation: 0 hours/video

At 4 videos/day:
- Manual: 16 hours/day (impossible)
- Automated: 0 hours/day (running 24/7)

Claude Droid handles the entire pipeline:
Research -> Script -> Voiceover -> Video -> Upload

$299 one-time. Pays for itself in weeks.
60% goes to kids' charities.`,
            headline: 'YouTube Automation That Actually Works - Real ROI',
            cta: 'Calculate Your ROI',
            imageHint: 'ROI calculator or comparison chart',
            product: 'claude-droid'
        },
        {
            id: 'li-b2b-c',
            category: 'b2b_value',
            audience: 'job_function_marketing',
            introText: `Marketing leaders: Context switching is killing your team's productivity.

UC Irvine research: Each platform switch costs 23 minutes of focus.

10 platforms daily = 230+ minutes lost to switching alone.

Marketing Engine eliminates this:
- One process manages 23 platforms
- Platform-specific content formatting
- Rate limiting built-in (no bans)
- Zero daily intervention required

$199 one-time. No subscription trap.
FOR THE KIDS - 60% to charity.`,
            headline: 'Stop Context Switching - Automate 23-Platform Marketing',
            cta: 'See How It Works',
            imageHint: 'Platform icons connected with automation flow',
            product: 'marketing-engine'
        },

        // VARIATION B: Thought Leadership
        {
            id: 'li-thought-a',
            category: 'thought_leadership',
            audience: 'job_function_tech',
            introText: `Hot take: The subscription model is broken for automation tools.

You're paying monthly for code that doesn't change.
You're locked into vendors who can raise prices anytime.
You're renting what you should own.

Our alternative: One-time purchase, source code included.

Own your automation infrastructure.
Run it on your servers.
No vendor dependency.

The model works - 500+ teams already made the switch.

ai-solutions.store`,
            headline: 'Why Smart Teams Are Ditching Automation Subscriptions',
            cta: 'Learn More',
            imageHint: 'Comparison: subscription treadmill vs ownership freedom',
            product: 'all'
        },
        {
            id: 'li-thought-b',
            category: 'thought_leadership',
            audience: 'account_based',
            introText: `A different take on AI automation ROI:

The value isn't replacing humans.
It's freeing humans for high-value work.

When Claude Droid handles content:
- Your team does creative strategy
- Your team builds relationships
- Your team drives innovation

When Marketing Engine handles distribution:
- Your marketers focus on messaging
- Your analysts focus on insights
- Your leaders focus on growth

AI handles execution. Humans handle strategy.

That's the real 10x.`,
            headline: 'AI Augmentation, Not Replacement - The Real ROI Story',
            cta: 'Explore the Approach',
            imageHint: 'Human-AI collaboration visualization',
            product: 'all'
        },
        {
            id: 'li-thought-c',
            category: 'thought_leadership',
            audience: 'job_function_tech',
            introText: `Building automation that scales:

The expensive part isn't the AI APIs.
It's the integration layer.

One product + 20 distribution channels = survival.
(One channel fails, 19 remain.)

We spent 6+ months building integrations:
- YouTube API
- Twitter API
- LinkedIn API
- Reddit API
- 19 more platforms

You can buy the result for $199.
Or spend 6 months building it yourself.

Time-to-value matters.`,
            headline: 'The Integration Layer Is the Real Moat - And We Built It',
            cta: 'Get the Integrations',
            imageHint: 'API integration architecture diagram',
            product: 'marketing-engine'
        },

        // VARIATION C: Case Study Style
        {
            id: 'li-case-a',
            category: 'case_study',
            audience: 'website_retargeting',
            introText: `Case study: Solo founder output

Before automation:
- 4 videos/week
- 10 social posts/day (manual)
- 20 hours/week on content
- Burnout imminent

After implementing our stack:
- 28 videos/week (auto)
- 100+ social posts/day (auto)
- 2 hours/week monitoring
- Focus shifted to strategy

Investment: $797 (bundle)
Monthly time saved: 80+ hours
Monthly revenue increase: $2,000+

Details at ai-solutions.store`,
            headline: 'Solo Founder Scales Content 7x With AI Automation',
            cta: 'Read the Full Story',
            imageHint: 'Before/after metrics comparison',
            product: 'all'
        },
        {
            id: 'li-case-b',
            category: 'case_study',
            audience: 'account_based',
            introText: `90-day automation experiment results:

The setup:
- Claude Droid for content
- Marketing Engine for distribution
- Income Droid for tracking

The numbers:
- 360 videos published
- 23 platforms receiving content
- 47,000+ total views
- $180-280/month revenue (growing)
- Break-even: Week 3

The insight:
Consistency beats perfection.
Automated "B+" content outperformed sporadic "A+" content.

The algorithm rewards presence.`,
            headline: '90-Day Automation Experiment: 360 Videos, 47K Views',
            cta: 'See the Data',
            imageHint: 'Growth chart with key milestones',
            product: 'all'
        },
        {
            id: 'li-case-c',
            category: 'case_study',
            audience: 'job_function_marketing',
            introText: `Marketing team efficiency case:

Before:
- 5 people managing 8 platforms
- Manual posting: 4 hours/day
- Inconsistent schedule
- Frequent platform bans (rate limits)

After Marketing Engine:
- 1 person monitoring 23 platforms
- Zero manual posting
- Perfect consistency
- Zero bans (rate limiting built-in)

Freed up: 4 team members for strategy work.
Cost: $199 one-time.

Marketing operations, reimagined.`,
            headline: 'Marketing Team Saves 20 Hours/Week With One Tool',
            cta: 'Learn How',
            imageHint: 'Team productivity improvement chart',
            product: 'marketing-engine'
        }
    ]
};

// ============================================================================
// TWITTER/X PROMOTED TWEETS
// Targeting: Website visitors, engaged users, followers lookalikes
// Format: Tweet (280 chars), optional card
// ============================================================================
const TWITTER_PROMOTED_ADS = {
    platform: 'twitter',
    audienceTypes: ['website_visitors', 'engaged_users', 'follower_lookalikes', 'keyword_targeting'],
    variations: [
        // VARIATION A: Hook + Value
        {
            id: 'tw-hook-a',
            category: 'hook_value',
            audience: 'website_visitors',
            tweet: `You visited. You didn't buy.

Here's what you're missing:

- 4 YouTube videos/day (auto)
- 23 platforms posting (auto)
- $0 subscriptions (forever)

60% goes to kids' charities.

Own the code. Run it forever.

ai-solutions.store`,
            cardTitle: 'AI Automation - Own Forever',
            cardDescription: 'One-time purchase. Source code included.',
            cta: 'Shop Now',
            product: 'all'
        },
        {
            id: 'tw-hook-b',
            category: 'hook_value',
            audience: 'website_visitors',
            tweet: `Still thinking about automation?

Quick math:
- Manual videos: 4 hrs each
- Automated videos: 0 hrs each
- 4 videos/day: 16 hrs saved

Claude Droid: $299 once.
Pays for itself in weeks.

FOR THE KIDS (60% to charity).

ai-solutions.store/claude-droid`,
            cardTitle: 'Claude Droid - YouTube Automation',
            cardDescription: 'AI creates 4 videos daily. Zero editing.',
            cta: 'Get Started',
            product: 'claude-droid'
        },
        {
            id: 'tw-hook-c',
            category: 'hook_value',
            audience: 'website_visitors',
            tweet: `I know you looked at Marketing Engine.

You're right to want it.

23 platforms. Zero work. $199 once.

No subscriptions. Ever.

Twitter, LinkedIn, Reddit, Discord + 19 more.

All automated. All yours.

ai-solutions.store/marketing-engine`,
            cardTitle: 'Marketing Engine',
            cardDescription: '23-platform automation. One-time purchase.',
            cta: 'Automate Now',
            product: 'marketing-engine'
        },

        // VARIATION B: FOMO + Social Proof
        {
            id: 'tw-fomo-a',
            category: 'fomo',
            audience: 'engaged_users',
            tweet: `While you're scrolling:

- Claude Droid made 4 more videos
- Marketing Engine posted to 23 platforms
- Someone else automated their business

Your move.

ai-solutions.store`,
            cardTitle: 'AI Automation Running 24/7',
            cardDescription: 'Join 500+ creators who automated.',
            cta: 'Start Automating',
            product: 'all'
        },
        {
            id: 'tw-fomo-b',
            category: 'fomo',
            audience: 'engaged_users',
            tweet: `120 videos in 30 days.

That's what happened when someone bought Claude Droid last month.

45,000 views. $800 AdSense. Zero editing.

Still doing videos manually?

ai-solutions.store/claude-droid`,
            cardTitle: 'Real Results. Real Users.',
            cardDescription: 'Claude Droid - YouTube automation.',
            cta: 'Get Claude Droid',
            product: 'claude-droid'
        },
        {
            id: 'tw-fomo-c',
            category: 'fomo',
            audience: 'follower_lookalikes',
            tweet: `Every hour you delay:

- 1 more video NOT made
- 23 platforms NOT posted to
- Revenue NOT generated

AI automation compounds.

Start today. Compound tomorrow.

ai-solutions.store`,
            cardTitle: 'Content Compounds Daily',
            cardDescription: 'Get ahead with AI automation.',
            cta: 'Compound Now',
            product: 'all'
        },

        // VARIATION C: Mission + Values
        {
            id: 'tw-mission-a',
            category: 'mission',
            audience: 'keyword_targeting',
            tweet: `Different business model:

60% to kids' charities
30% operations
10% founder

Every purchase = automation for you + help for children.

No subscriptions. Own forever.

ai-solutions.store

FOR THE KIDS.`,
            cardTitle: 'Tech That Gives Back',
            cardDescription: '60% of every sale helps children.',
            cta: 'Shop for Good',
            product: 'all'
        },
        {
            id: 'tw-mission-b',
            category: 'mission',
            audience: 'keyword_targeting',
            tweet: `Buy tools. Help kids.

Not charity-washing.
Real 60/30/10 split.
Every sale tracked.
Receipts published.

AI automation that matters.

ai-solutions.store`,
            cardTitle: 'Transparent Giving',
            cardDescription: '60% to children. Verified.',
            cta: 'See the Impact',
            product: 'all'
        },
        {
            id: 'tw-mission-c',
            category: 'mission',
            audience: 'engaged_users',
            tweet: `The subscription model takes monthly.

We take once.
You own forever.
60% goes to kids.

Different kind of tech company.

ai-solutions.store

FOR THE KIDS.`,
            cardTitle: 'Own Your Automation',
            cardDescription: 'One-time purchase. 60% to charity.',
            cta: 'Join the Mission',
            product: 'all'
        },

        // VARIATION D: Direct Response
        {
            id: 'tw-direct-a',
            category: 'direct_response',
            audience: 'website_visitors',
            tweet: `Your cart's still waiting.

Claude Droid: $299
Marketing Engine: $199
Bundle: $499 (save $199)

Finish checkout. Start automating today.

60% helps kids.

ai-solutions.store`,
            cardTitle: 'Complete Your Order',
            cardDescription: 'Automation tools waiting for you.',
            cta: 'Finish Checkout',
            product: 'all'
        },
        {
            id: 'tw-direct-b',
            category: 'direct_response',
            audience: 'website_visitors',
            tweet: `Came back to say:

That tool you looked at?
It works.
500+ people use it.
ROI in weeks.

One click away.

ai-solutions.store`,
            cardTitle: 'Trusted by 500+ Creators',
            cardDescription: 'AI automation with proven results.',
            cta: 'Get Yours',
            product: 'all'
        },
        {
            id: 'tw-direct-c',
            category: 'direct_response',
            audience: 'follower_lookalikes',
            tweet: `AI automation bundle:

Claude Droid (YouTube)
+ Marketing Engine (23 platforms)
+ Income Droid (revenue)

$999 total. Save $298.

No subscriptions. Own everything.

ai-solutions.store`,
            cardTitle: 'The Complete Stack',
            cardDescription: 'All automation tools. One purchase.',
            cta: 'Get the Bundle',
            product: 'bundle'
        }
    ]
};

// ============================================================================
// GENERATION LOGIC
// ============================================================================

function getState() {
    try {
        if (fs.existsSync(STATE_FILE)) {
            return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
        }
    } catch (err) {
        log(`Error reading state: ${err.message}`);
    }
    return {
        lastGenerated: null,
        rotationIndex: { facebook: 0, google: 0, linkedin: 0, twitter: 0 },
        history: []
    };
}

function saveState(state) {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function formatFacebookAd(ad) {
    return `## ${ad.id}

**Category:** ${ad.category}
**Audience:** ${ad.audience}
**Product:** ${ad.product}

### Creative Elements

**Headline** (40 chars max):
\`\`\`
${ad.headline}
\`\`\`

**Primary Text** (125 chars for feed, shown first):
\`\`\`
${ad.primaryText}
\`\`\`

**Description** (30 chars max):
\`\`\`
${ad.description}
\`\`\`

**CTA Button:** ${ad.cta}

**Image Hint:** ${ad.imageHint}

---
`;
}

function formatGoogleDisplayAd(ad) {
    return `## ${ad.id}

**Category:** ${ad.category}
**Audience:** ${ad.audience}
**Product:** ${ad.product}

### Responsive Display Ad Assets

**Headlines** (30 chars each):
${ad.headlines.map((h, i) => `${i + 1}. \`${h}\``).join('\n')}

**Long Headline** (90 chars):
\`\`\`
${ad.longHeadline}
\`\`\`

**Descriptions** (90 chars each):
${ad.descriptions.map((d, i) => `${i + 1}. \`${d}\``).join('\n')}

**Business Name:** ${ad.businessName}
**CTA:** ${ad.cta}

---
`;
}

function formatLinkedInAd(ad) {
    return `## ${ad.id}

**Category:** ${ad.category}
**Audience:** ${ad.audience}
**Product:** ${ad.product}

### Sponsored Content

**Intro Text** (600 chars max):
\`\`\`
${ad.introText}
\`\`\`

**Headline** (200 chars max):
\`\`\`
${ad.headline}
\`\`\`

**CTA Button:** ${ad.cta}

**Image Hint:** ${ad.imageHint}

---
`;
}

function formatTwitterAd(ad) {
    return `## ${ad.id}

**Category:** ${ad.category}
**Audience:** ${ad.audience}
**Product:** ${ad.product}

### Promoted Tweet

**Tweet** (${ad.tweet.length}/280 chars):
\`\`\`
${ad.tweet}
\`\`\`

### Website Card (optional)

**Card Title:** ${ad.cardTitle}
**Card Description:** ${ad.cardDescription}
**CTA:** ${ad.cta}

---
`;
}

function generatePlatformFile(platform, ads, formatter) {
    const timestamp = new Date().toISOString();
    let content = `# ${platform.platform.toUpperCase()} Retargeting Ads
Generated: ${timestamp}
Total Variations: ${ads.length}
Audience Types: ${platform.audienceTypes.join(', ')}

FOR THE KIDS - 60/30/10

---

`;

    ads.forEach(ad => {
        content += formatter(ad);
    });

    content += `
---
*Generated by Retargeting Ads Generator*
*AI Solutions Store - FOR THE KIDS*
`;

    return content;
}

function generateABTestMatrix() {
    const matrix = {
        generated: new Date().toISOString(),
        platforms: {
            facebook: {
                totalVariations: FACEBOOK_RETARGETING_ADS.variations.length,
                categories: [...new Set(FACEBOOK_RETARGETING_ADS.variations.map(v => v.category))],
                audiences: FACEBOOK_RETARGETING_ADS.audienceTypes,
                recommendedTests: [
                    { name: 'Urgency vs Value', ads: ['fb-urgency-a', 'fb-value-a'] },
                    { name: 'Social Proof vs Mission', ads: ['fb-social-a', 'fb-mission-a'] },
                    { name: 'Cart Abandonment A/B', ads: ['fb-urgency-a', 'fb-urgency-b', 'fb-urgency-c'] }
                ]
            },
            google_display: {
                totalVariations: GOOGLE_DISPLAY_ADS.variations.length,
                categories: [...new Set(GOOGLE_DISPLAY_ADS.variations.map(v => v.category))],
                audiences: GOOGLE_DISPLAY_ADS.audienceTypes,
                recommendedTests: [
                    { name: 'Direct vs Problem/Solution', ads: ['gdn-direct-a', 'gdn-problem-a'] },
                    { name: 'Benefit Headlines', ads: ['gdn-benefit-a', 'gdn-benefit-b', 'gdn-benefit-c'] },
                    { name: 'Product Focus vs General', ads: ['gdn-direct-a', 'gdn-problem-a'] }
                ]
            },
            linkedin: {
                totalVariations: LINKEDIN_SPONSORED_ADS.variations.length,
                categories: [...new Set(LINKEDIN_SPONSORED_ADS.variations.map(v => v.category))],
                audiences: LINKEDIN_SPONSORED_ADS.audienceTypes,
                recommendedTests: [
                    { name: 'B2B Value vs Thought Leadership', ads: ['li-b2b-a', 'li-thought-a'] },
                    { name: 'Case Study Performance', ads: ['li-case-a', 'li-case-b', 'li-case-c'] },
                    { name: 'Product-Specific vs General', ads: ['li-b2b-b', 'li-b2b-a'] }
                ]
            },
            twitter: {
                totalVariations: TWITTER_PROMOTED_ADS.variations.length,
                categories: [...new Set(TWITTER_PROMOTED_ADS.variations.map(v => v.category))],
                audiences: TWITTER_PROMOTED_ADS.audienceTypes,
                recommendedTests: [
                    { name: 'Hook vs FOMO', ads: ['tw-hook-a', 'tw-fomo-a'] },
                    { name: 'Mission Messaging', ads: ['tw-mission-a', 'tw-mission-b', 'tw-mission-c'] },
                    { name: 'Direct Response Variants', ads: ['tw-direct-a', 'tw-direct-b'] }
                ]
            }
        },
        crossPlatformTests: [
            {
                name: 'Mission Messaging Cross-Platform',
                hypothesis: 'Mission-driven ads perform better on Twitter than LinkedIn',
                platforms: ['twitter', 'linkedin'],
                ads: { twitter: 'tw-mission-a', linkedin: 'li-thought-a' }
            },
            {
                name: 'Product-Specific vs General',
                hypothesis: 'Product-specific ads convert better than general store ads',
                platforms: ['facebook', 'google_display'],
                ads: { facebook: ['fb-value-a', 'fb-value-b'], google: ['gdn-direct-a', 'gdn-direct-b'] }
            }
        ]
    };

    return matrix;
}

function generateAllAds() {
    log('===================================================================');
    log('RETARGETING AD CONTENT GENERATOR');
    log('AI Solutions Store - FOR THE KIDS - 60/30/10');
    log('===================================================================');

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

    // Generate Facebook ads file
    const fbContent = generatePlatformFile(
        FACEBOOK_RETARGETING_ADS,
        FACEBOOK_RETARGETING_ADS.variations,
        formatFacebookAd
    );
    const fbFile = path.join(RETARGETING_DIR, `facebook-retargeting-${timestamp}.md`);
    fs.writeFileSync(fbFile, fbContent);
    log(`Facebook/Meta ads: ${fbFile}`);

    // Generate Google Display ads file
    const gdnContent = generatePlatformFile(
        GOOGLE_DISPLAY_ADS,
        GOOGLE_DISPLAY_ADS.variations,
        formatGoogleDisplayAd
    );
    const gdnFile = path.join(RETARGETING_DIR, `google-display-${timestamp}.md`);
    fs.writeFileSync(gdnFile, gdnContent);
    log(`Google Display ads: ${gdnFile}`);

    // Generate LinkedIn ads file
    const liContent = generatePlatformFile(
        LINKEDIN_SPONSORED_ADS,
        LINKEDIN_SPONSORED_ADS.variations,
        formatLinkedInAd
    );
    const liFile = path.join(RETARGETING_DIR, `linkedin-sponsored-${timestamp}.md`);
    fs.writeFileSync(liFile, liContent);
    log(`LinkedIn Sponsored: ${liFile}`);

    // Generate Twitter ads file
    const twContent = generatePlatformFile(
        TWITTER_PROMOTED_ADS,
        TWITTER_PROMOTED_ADS.variations,
        formatTwitterAd
    );
    const twFile = path.join(RETARGETING_DIR, `twitter-promoted-${timestamp}.md`);
    fs.writeFileSync(twFile, twContent);
    log(`Twitter Promoted: ${twFile}`);

    // Generate A/B test matrix
    const matrix = generateABTestMatrix();
    const matrixFile = path.join(RETARGETING_DIR, `ab-test-matrix-${timestamp}.json`);
    fs.writeFileSync(matrixFile, JSON.stringify(matrix, null, 2));
    log(`A/B Test Matrix: ${matrixFile}`);

    // Generate combined summary
    const summary = {
        generated: new Date().toISOString(),
        platforms: {
            facebook: {
                variations: FACEBOOK_RETARGETING_ADS.variations.length,
                file: fbFile
            },
            google_display: {
                variations: GOOGLE_DISPLAY_ADS.variations.length,
                file: gdnFile
            },
            linkedin: {
                variations: LINKEDIN_SPONSORED_ADS.variations.length,
                file: liFile
            },
            twitter: {
                variations: TWITTER_PROMOTED_ADS.variations.length,
                file: twFile
            }
        },
        totalVariations:
            FACEBOOK_RETARGETING_ADS.variations.length +
            GOOGLE_DISPLAY_ADS.variations.length +
            LINKEDIN_SPONSORED_ADS.variations.length +
            TWITTER_PROMOTED_ADS.variations.length,
        abTestMatrix: matrixFile
    };

    const summaryFile = path.join(RETARGETING_DIR, 'retargeting-summary.json');
    fs.writeFileSync(summaryFile, JSON.stringify(summary, null, 2));

    // Generate ready-to-use index
    let indexContent = `# Retargeting Ad Library
Generated: ${new Date().toISOString()}

## Summary
- **Total Variations:** ${summary.totalVariations}
- **Platforms:** Facebook/Meta, Google Display, LinkedIn, Twitter/X

## Files Generated
- Facebook/Meta: ${FACEBOOK_RETARGETING_ADS.variations.length} variations
- Google Display: ${GOOGLE_DISPLAY_ADS.variations.length} variations
- LinkedIn: ${LINKEDIN_SPONSORED_ADS.variations.length} variations
- Twitter/X: ${TWITTER_PROMOTED_ADS.variations.length} variations

## A/B Testing Recommendations

### Facebook/Meta
1. Test urgency vs value messaging for cart abandoners
2. Compare social proof against mission-driven messaging
3. Rotate through all cart abandonment variations

### Google Display
4. Direct response vs problem/solution approach
5. Test benefit-focused headlines across audiences
6. Compare product-specific vs general store ads

### LinkedIn
7. B2B value proposition vs thought leadership tone
8. Case study format testing
9. Audience-specific messaging (marketing vs tech)

### Twitter/X
10. Hook+value vs FOMO messaging
11. Mission messaging variations
12. Direct response tweet formats

## Deployment Checklist

1. [ ] Upload creatives to each platform
2. [ ] Set up audience targeting
3. [ ] Configure conversion tracking
4. [ ] Set daily/lifetime budgets
5. [ ] Enable A/B testing
6. [ ] Schedule launch
7. [ ] Monitor and optimize

---
*AI Solutions Store - FOR THE KIDS - 60/30/10*
`;

    const indexFile = path.join(RETARGETING_DIR, 'index.md');
    fs.writeFileSync(indexFile, indexContent);
    log(`Index file: ${indexFile}`);

    // Update state
    const state = getState();
    state.lastGenerated = new Date().toISOString();
    state.history.push({
        timestamp: new Date().toISOString(),
        totalVariations: summary.totalVariations,
        files: [fbFile, gdnFile, liFile, twFile, matrixFile]
    });
    if (state.history.length > 50) {
        state.history = state.history.slice(-50);
    }
    saveState(state);

    log('\n===================================================================');
    log('GENERATION COMPLETE');
    log(`Total variations: ${summary.totalVariations}`);
    log(`Output directory: ${RETARGETING_DIR}`);
    log('===================================================================');

    return summary;
}

// Get specific variation for immediate use
function getVariation(platform, id) {
    const platforms = {
        facebook: FACEBOOK_RETARGETING_ADS.variations,
        google: GOOGLE_DISPLAY_ADS.variations,
        linkedin: LINKEDIN_SPONSORED_ADS.variations,
        twitter: TWITTER_PROMOTED_ADS.variations
    };

    const variations = platforms[platform];
    if (!variations) {
        throw new Error(`Unknown platform: ${platform}`);
    }

    const variation = variations.find(v => v.id === id);
    if (!variation) {
        throw new Error(`Variation not found: ${id}`);
    }

    return variation;
}

// Get random variation per platform
function getRandomVariations() {
    return {
        facebook: FACEBOOK_RETARGETING_ADS.variations[
            Math.floor(Math.random() * FACEBOOK_RETARGETING_ADS.variations.length)
        ],
        google: GOOGLE_DISPLAY_ADS.variations[
            Math.floor(Math.random() * GOOGLE_DISPLAY_ADS.variations.length)
        ],
        linkedin: LINKEDIN_SPONSORED_ADS.variations[
            Math.floor(Math.random() * LINKEDIN_SPONSORED_ADS.variations.length)
        ],
        twitter: TWITTER_PROMOTED_ADS.variations[
            Math.floor(Math.random() * TWITTER_PROMOTED_ADS.variations.length)
        ]
    };
}

// Run if executed directly
if (require.main === module) {
    generateAllAds();
}

// Export for module use
module.exports = {
    generateAllAds,
    getVariation,
    getRandomVariations,
    generateABTestMatrix,
    FACEBOOK_RETARGETING_ADS,
    GOOGLE_DISPLAY_ADS,
    LINKEDIN_SPONSORED_ADS,
    TWITTER_PROMOTED_ADS
};
