/**
 * ============================================================================
 * INFLUENCER OUTREACH TEMPLATE SYSTEM
 * AI Solutions Store - Tech/AI Influencer Targeting
 * ============================================================================
 *
 * Comprehensive outreach templates for tech and AI influencers:
 * 1. Initial DM Templates
 * 2. Email Pitches
 * 3. Collaboration Proposals
 * 4. Affiliate Offers
 * 5. Product Gifting Offers
 *
 * Target Audience: Tech/AI Influencers, YouTubers, Podcasters, Newsletter Writers
 *
 * Mission: FOR THE KIDS - Gospel V1.3 (60/30/10)
 * 60% → Verified Pediatric Charities
 * 30% → Infrastructure
 * 10% → Founder
 *
 * Usage:
 *   node influencer-outreach.cjs --generate-all
 *   node influencer-outreach.cjs --template=dm --tier=micro
 *   node influencer-outreach.cjs --template=email --tier=macro
 *   node influencer-outreach.cjs --list-influencers
 *
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
    logsDir: 'C:\\AiCollabForTheKids\\logs',
    outputDir: 'C:\\AiCollabForTheKids\\logs\\influencer-outreach',
    logFile: 'C:\\AiCollabForTheKids\\logs\\influencer-outreach.log',
    contentFile: 'C:\\AiCollabForTheKids\\logs\\influencer-outreach-templates.md',
    stateFile: 'C:\\AiCollabForTheKids\\logs\\influencer-outreach-state.json',

    // Brand info
    storeUrl: 'https://ai-solutions.store',
    websiteUrl: 'https://aidoesitall.website',
    affiliateUrl: 'https://ai-solutions.store/affiliates',
    consultationUrl: 'https://ai-solutions.store/consultation',

    // Contact
    founderName: 'The FOR THE KIDS Team',
    supportEmail: 'hello@aidoesitall.website',

    // Gospel V1.3 - IMMUTABLE
    gospel: {
        charity: 60,
        infrastructure: 30,
        founder: 10
    }
};

// ============================================================================
// LOGGING UTILITY
// ============================================================================

function ensureDirectories() {
    const dirs = [CONFIG.logsDir, CONFIG.outputDir];
    dirs.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });
}

function log(message) {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] ${message}\n`;
    console.log(entry.trim());
    try {
        ensureDirectories();
        fs.appendFileSync(CONFIG.logFile, entry);
    } catch (err) {
        // Silent fail
    }
}

// ============================================================================
// INFLUENCER TIERS & TARGETING
// ============================================================================

const INFLUENCER_TIERS = {
    nano: {
        name: 'Nano Influencers',
        followers: '1K - 10K',
        engagement: 'Very High (5-10%)',
        commissionRate: '20%',
        giftingBudget: '$299',
        approach: 'Personal, direct, community-focused',
        platforms: ['Twitter/X', 'Discord', 'Substack', 'LinkedIn'],
        responseRate: '15-25%',
        notes: 'Highest authenticity, niche audiences, excellent for early traction'
    },
    micro: {
        name: 'Micro Influencers',
        followers: '10K - 50K',
        engagement: 'High (3-5%)',
        commissionRate: '25%',
        giftingBudget: '$499',
        approach: 'Value-first, collaboration-oriented',
        platforms: ['YouTube', 'Twitter/X', 'LinkedIn', 'Podcasts'],
        responseRate: '10-15%',
        notes: 'Best ROI for AI/tech products, highly engaged communities'
    },
    macro: {
        name: 'Macro Influencers',
        followers: '50K - 500K',
        engagement: 'Moderate (1-3%)',
        commissionRate: '30%',
        giftingBudget: '$999',
        approach: 'Professional, business-focused, clear value prop',
        platforms: ['YouTube', 'Twitter/X', 'Podcasts', 'Newsletters'],
        responseRate: '5-10%',
        notes: 'Requires compelling story, best for brand awareness'
    },
    mega: {
        name: 'Mega Influencers',
        followers: '500K+',
        engagement: 'Lower (0.5-1%)',
        commissionRate: '35%',
        giftingBudget: 'Custom',
        approach: 'Agency/management contact, formal proposals',
        platforms: ['YouTube', 'Twitter/X', 'Major Podcasts'],
        responseRate: '1-5%',
        notes: 'High reach, requires significant social proof first'
    }
};

// ============================================================================
// TARGET TECH/AI INFLUENCER CATEGORIES
// ============================================================================

const INFLUENCER_CATEGORIES = [
    {
        category: 'AI/ML Researchers & Educators',
        examples: ['AI Jason', 'Yannic Kilcher', 'Two Minute Papers', 'Sentdex'],
        messaging: 'Focus on technical accuracy, Claude Opus 4.5 architecture, real production metrics',
        hook: 'Production AI that actually runs 24/7 - built with Claude Opus 4.5'
    },
    {
        category: 'Developer/Coder Influencers',
        examples: ['Fireship', 'Theo', 'ThePrimeagen', 'Traversy Media'],
        messaging: 'Emphasize source code access, self-hosting, no vendor lock-in',
        hook: 'Own your AI automation. Full source. No subscriptions. One-time purchase.'
    },
    {
        category: 'Indie Hackers & Solo Founders',
        examples: ['Pieter Levels', 'Marc Lou', 'Dan Kulkov', 'Tony Dinh'],
        messaging: 'Revenue generation, time savings, indie founder story',
        hook: '60% of revenue goes to children\'s hospitals. Real AI tools that pay for themselves.'
    },
    {
        category: 'AI Tool Reviewers',
        examples: ['Matt Wolfe', 'All About AI', 'AI Advantage', 'Linus Tech Tips'],
        messaging: 'Unique value prop (charity model), production-ready tools, honest review opportunity',
        hook: 'The only AI tools where 60% of your purchase helps sick kids. Let me send you one to review.'
    },
    {
        category: 'Productivity/Automation Enthusiasts',
        examples: ['Ali Abdaal', 'Thomas Frank', 'Keep Productive', 'Francesco D\'Alessio'],
        messaging: 'Time savings, automation ROI, passive income potential',
        hook: 'Save 15+ hours/week. AI that runs 24/7. And it helps children.'
    },
    {
        category: 'Newsletter Writers',
        examples: ['The Rundown AI', 'Ben\'s Bites', 'TLDR', 'AI Tool Report'],
        messaging: 'Unique story angle, affiliate partnership, exclusive content',
        hook: 'Charity-first AI tools - 60% to children\'s hospitals. Story worth covering.'
    },
    {
        category: 'Podcast Hosts',
        examples: ['Lex Fridman', 'Dwarkesh Patel', 'Lenny\'s Podcast', 'My First Million'],
        messaging: 'Founder story, mission-driven tech, Gospel V1.3 revenue model',
        hook: 'Built AI tools with Claude Opus 4.5. Locked 60% of all revenue for sick kids. Permanently.'
    },
    {
        category: 'YouTube Automation Creators',
        examples: ['Cashcow YouTubers', 'Matt Par', 'Think Media', 'Film Booth'],
        messaging: 'YouTube Shorts automation, content scaling, revenue potential',
        hook: 'Claude Droid: 4 YouTube Shorts/day, fully automated. And it funds children\'s hospitals.'
    }
];

// ============================================================================
// PRODUCT CATALOG FOR INFLUENCER OUTREACH
// ============================================================================

const PRODUCTS = {
    'claude-droid': {
        name: 'Claude Droid',
        price: 299,
        giftable: true,
        description: 'YouTube Shorts automation with Claude Opus 4.5',
        hook: 'Creates 4+ videos daily while you sleep',
        commissionValue: '$44.85 - $104.65',
        bestFor: ['YouTubers', 'Content creators', 'Faceless channels']
    },
    'income-droid': {
        name: 'Income Droid',
        price: 499,
        giftable: true,
        description: 'Multi-platform revenue-optimized content engine',
        hook: 'Generate 4 monetized videos per day on autopilot',
        commissionValue: '$74.85 - $174.65',
        bestFor: ['Entrepreneurs', 'Agencies', 'Passive income seekers']
    },
    'marketing-engine': {
        name: 'Marketing Engine',
        price: 199,
        giftable: true,
        description: '23-platform social media automation',
        hook: 'Post everywhere, automatically, 24/7',
        commissionValue: '$29.85 - $69.65',
        bestFor: ['Small businesses', 'Solo founders', 'Marketing agencies']
    },
    'jules-ai': {
        name: 'Jules AI',
        price: 399,
        giftable: true,
        description: 'AI business dashboard and agent orchestration',
        hook: 'One dashboard to control all your AI agents',
        commissionValue: '$59.85 - $139.65',
        bestFor: ['Power users', 'Agency owners', 'Multi-project managers']
    },
    'affiliate-system': {
        name: 'Affiliate System',
        price: 599,
        giftable: false,
        description: 'White-label affiliate marketing platform',
        hook: 'Launch your own affiliate program in 24 hours',
        commissionValue: '$89.85 - $209.65',
        bestFor: ['SaaS founders', 'Course creators', 'E-commerce']
    },
    'dating-platform': {
        name: 'Dating Platform',
        price: 2499,
        giftable: false,
        description: 'Full dating app source code',
        hook: 'Deploy a complete dating platform in 24 hours',
        commissionValue: '$374.85 - $874.65',
        bestFor: ['Entrepreneurs', 'Niche community builders']
    }
};

// ============================================================================
// SECTION 1: INITIAL DM TEMPLATES
// ============================================================================

const DM_TEMPLATES = {
    // Twitter/X DMs (280 char limit mindful)
    twitter: {
        micro: [
            {
                name: 'Mission Hook',
                message: `Hey {NAME}! Quick note - we built AI automation tools where 60% of ALL revenue goes to children's hospitals. No joke.

Would love to send you one to try. Your audience would eat this up.

Think: Claude Droid creates 4 YouTube Shorts/day automatically.

Worth a look?`,
                purpose: 'Lead with mission, offer product trial',
                bestFor: 'AI/tech reviewers, productivity creators'
            },
            {
                name: 'Results Hook',
                message: `{NAME} - saw your content on {TOPIC}. Thought you'd dig this:

We built tools with Claude Opus 4.5 that actually run in production 24/7.

Claude Droid: 4 YouTube Shorts/day, automated.
Marketing Engine: 23 platforms, zero manual posting.

Want to try one? No strings.`,
                purpose: 'Show concrete results, offer trial',
                bestFor: 'Developer influencers, indie hackers'
            },
            {
                name: 'Collaboration Hook',
                message: `Hey {NAME}! Love your work on {TOPIC}.

Quick pitch: We're looking for tech voices to review AI automation tools. Catch: 60% of every sale goes to Shriners Children's Hospitals.

20-30% affiliate commission for partners.

Interest in collab?`,
                purpose: 'Partnership inquiry',
                bestFor: 'Larger accounts, newsletter writers'
            },
            {
                name: 'Charity Angle',
                message: `{NAME} - this might resonate:

Built AI tools (Claude Opus 4.5 powered). Locked 60% of ALL revenue for children's hospitals. Forever. Called it Gospel V1.3.

Looking for voices who get the mission. Would you review one of our products?

FOR THE KIDS isn't marketing. It's the business model.`,
                purpose: 'Mission-first approach',
                bestFor: 'Socially conscious creators, philanthropy voices'
            }
        ],
        macro: [
            {
                name: 'Value Prop',
                message: `{NAME} - quick ask:

We built production AI tools (Claude Opus 4.5). 60% of ALL revenue goes to verified children's hospitals.

Looking for respected voices to review them. Would love to send you Claude Droid (YouTube automation) or Marketing Engine (23-platform posting).

Worth a conversation?`,
                purpose: 'Professional inquiry with clear value',
                bestFor: 'Established YouTubers, podcast hosts'
            },
            {
                name: 'Story Angle',
                message: `{NAME} - unique story opportunity:

AI tools where the business model IS the charity. 60% to children's hospitals, locked forever.

Not a campaign. Not a pledge. The actual code enforces it.

Would you consider covering this? Happy to send products + all details.`,
                purpose: 'Story pitch for content creators',
                bestFor: 'Newsletter writers, journalists, podcasters'
            }
        ]
    },

    // Instagram DMs
    instagram: {
        micro: [
            {
                name: 'Visual Hook',
                message: `Hey {NAME}!

Saw your content on {TOPIC} - loved it.

Quick pitch: We built AI automation tools where 60% of revenue goes to children's hospitals. Real products, real impact.

Claude Droid creates 4 YouTube Shorts daily. Marketing Engine posts to 23 platforms automatically.

Would love to send you one to try. Your audience would appreciate the mission angle.

Let me know if you're interested!`,
                purpose: 'Friendly intro with trial offer',
                bestFor: 'Tech creators, lifestyle/productivity accounts'
            }
        ],
        macro: [
            {
                name: 'Professional Inquiry',
                message: `Hi {NAME},

I hope this message finds you well. I've been following your content on {TOPIC} and thought there might be an interesting collaboration opportunity.

We've built a suite of AI automation tools powered by Claude Opus 4.5, with a unique model: 60% of ALL revenue goes directly to verified pediatric charities like Shriners Children's Hospitals.

We're looking for respected voices in the tech/AI space to review our products and potentially partner on content.

Would you be open to a brief conversation about this?

Best regards,
{SENDER_NAME}
FOR THE KIDS Team`,
                purpose: 'Formal partnership inquiry',
                bestFor: 'Larger accounts, agency-managed influencers'
            }
        ]
    },

    // LinkedIn DMs
    linkedin: {
        micro: [
            {
                name: 'Professional Connection',
                message: `Hi {NAME},

Your insights on {TOPIC} have been valuable to follow.

I wanted to reach out about a potential collaboration. We've built AI automation tools (Claude Opus 4.5 powered) with a unique business model: 60% of all revenue goes to verified pediatric charities.

Products like Claude Droid (YouTube automation) and Marketing Engine (23-platform posting) are generating real results for users.

I'd love to send you a product to try and discuss potential partnership opportunities. We offer 20-30% commission for affiliates.

Worth a conversation?

Best,
{SENDER_NAME}`,
                purpose: 'Professional partnership inquiry',
                bestFor: 'B2B influencers, tech thought leaders'
            }
        ],
        macro: [
            {
                name: 'Formal Proposal',
                message: `Dear {NAME},

I've been impressed by your thought leadership on {TOPIC} and believe there may be a meaningful alignment between our work.

AI Solutions Store has developed a suite of production-ready AI automation tools built on Claude Opus 4.5. What makes us unique is our Gospel V1.3 revenue model:

- 60% of ALL revenue goes to verified pediatric charities
- 30% to infrastructure
- 10% to founder

This isn't a marketing campaign - it's our immutable business structure.

We're seeking respected voices in the AI/tech space to review our products and potentially become affiliate partners (20-30% commission).

Would you be open to scheduling a brief call to discuss?

Warm regards,
{SENDER_NAME}
FOR THE KIDS Team`,
                purpose: 'Executive-level outreach',
                bestFor: 'Industry leaders, C-level executives with audiences'
            }
        ]
    },

    // Discord DMs
    discord: {
        micro: [
            {
                name: 'Community Builder',
                message: `Hey {NAME}!

Saw you in {SERVER_NAME} and love what you're building.

Quick q: Would you be interested in checking out some AI automation tools? We built Claude Droid (YouTube Shorts automation) and Marketing Engine (23-platform posting) with Claude Opus 4.5.

Here's the hook: 60% of ALL our revenue goes to children's hospitals. Not a campaign - it's the actual business model.

Happy to give you free access to try. If you like it, we've got an affiliate program (20-30% commission).

LMK if interested!`,
                purpose: 'Casual community outreach',
                bestFor: 'Discord community leaders, server admins'
            }
        ]
    }
};

// ============================================================================
// SECTION 2: EMAIL PITCH TEMPLATES
// ============================================================================

const EMAIL_TEMPLATES = {
    coldOutreach: {
        micro: {
            subject: 'AI tools that fund children\'s hospitals - review opportunity',
            body: `Hi {NAME},

I've been following your content on {TOPIC} and thought you might find this interesting.

We built AI Solutions Store - a suite of production-ready automation tools powered by Claude Opus 4.5. But here's what makes us different:

**60% of ALL revenue goes directly to verified pediatric charities.**

Not "up to." Not "a portion." Sixty percent of every sale. It's called Gospel V1.3, and it's immutable.

**Our products:**
- Claude Droid ($299): Creates 4+ YouTube Shorts daily, automatically
- Marketing Engine ($199): Posts to 23 platforms, zero manual work
- Income Droid ($499): Revenue-optimized content generation
- Jules AI ($399): AI agent orchestration dashboard

**Why I'm reaching out:**
I'd love to send you one of our products to try - no strings attached. If you like it, maybe you'd consider reviewing it for your audience. If not, keep it anyway.

We also have an affiliate program with 20-30% commission if that interests you.

Would you be open to this?

For the kids,
{SENDER_NAME}
AI Solutions Store
{WEBSITE_URL}

P.S. Here's our blockchain-verified charity transaction: basescan.org/tx/0x6f78...dc07d`
        },
        macro: {
            subject: 'Partnership inquiry: AI automation + children\'s charity mission',
            body: `Hi {NAME},

I hope this email finds you well. I've followed your work on {TOPIC} for some time and have tremendous respect for what you've built.

I'm reaching out from AI Solutions Store with a partnership inquiry.

**What we do:**
We build production-ready AI automation tools powered by Claude Opus 4.5. YouTube automation, social media engines, content generation systems - all designed to save creators 15+ hours per week.

**What makes us unique:**
60% of ALL our revenue goes to verified pediatric charities like Shriners Children's Hospitals. This isn't a campaign or pledge - it's our Gospel V1.3 revenue structure, and it's immutable.

**The opportunity:**
We're looking for respected voices in the tech/AI space to:
1. Try our products (we'll send them free)
2. Share honest feedback with your audience (if you like them)
3. Potentially join our affiliate program (20-30% commission)

**Our products:**
| Product | Price | Commission Range |
|---------|-------|-----------------|
| Claude Droid | $299 | $44 - $105 |
| Marketing Engine | $199 | $30 - $70 |
| Income Droid | $499 | $75 - $175 |
| Jules AI | $399 | $60 - $140 |

Would you be open to a brief call to discuss this further? I'm happy to work around your schedule.

Best regards,
{SENDER_NAME}
AI Solutions Store
{WEBSITE_URL}

FOR THE KIDS - 60% of every sale helps sick children.`
        },
        mega: {
            subject: 'FOR THE KIDS partnership - AI tools with charity-first model',
            body: `Dear {NAME} / {MANAGEMENT_CONTACT},

I'm reaching out regarding a potential partnership opportunity between AI Solutions Store and {INFLUENCER_NAME}.

**About AI Solutions Store:**
We develop production-ready AI automation tools built on Claude Opus 4.5 (Anthropic's latest). Our product suite includes YouTube automation, social media engines, and content generation systems used by creators and businesses worldwide.

**Our Unique Model - Gospel V1.3:**
60% of ALL revenue goes directly to verified pediatric charities. This is not a promotional campaign - it's our permanent, immutable business structure. Every sale directly funds children's hospitals like Shriners.

**Partnership Proposal:**
We believe {INFLUENCER_NAME}'s audience and values align with our mission. We'd like to explore:

1. **Product Review**: Complimentary access to our full product suite for honest evaluation
2. **Affiliate Partnership**: Custom commission structure (up to 35% for mega partners)
3. **Co-branded Content**: Collaborative content opportunities highlighting the mission
4. **Exclusive Offers**: Custom discount codes for {INFLUENCER_NAME}'s audience

**Commission Potential:**
With products ranging from $199 to $2,499, commission per sale ranges from $30 to $875 depending on tier.

**Next Steps:**
Would {INFLUENCER_NAME} or your team be available for a 15-minute call to discuss? I'm happy to provide additional materials, product demos, or any information needed.

Best regards,
{SENDER_NAME}
Partnership Team
AI Solutions Store
{WEBSITE_URL}

Mission: FOR THE KIDS - 60/30/10 Gospel V1.3`
        }
    },

    followUp: {
        first: {
            subject: 'Re: Quick follow-up - AI automation + charity mission',
            body: `Hi {NAME},

Just circling back on my email from {DAYS_AGO} about the AI automation tools.

Quick recap: 60% of all revenue goes to children's hospitals. We'd love to send you a product to try.

No response needed if this isn't for you - I won't keep following up.

But if there's any interest, I'm here to answer questions.

Best,
{SENDER_NAME}

P.S. Our Claude Droid users are averaging 4 videos/day with zero manual work. If YouTube automation interests you, this might be worth a look.`
        },
        second: {
            subject: 'Last note: FOR THE KIDS tools',
            body: `Hi {NAME},

Final check-in on the AI Solutions Store partnership opportunity.

If the timing isn't right, totally understand. I'll drop off here.

If you'd like to explore this later, my door is always open: {SUPPORT_EMAIL}

Thanks for your time.

For the kids,
{SENDER_NAME}`
        }
    },

    referral: {
        subject: '{REFERRER_NAME} suggested I reach out - AI tools + charity mission',
        body: `Hi {NAME},

{REFERRER_NAME} mentioned you might be interested in our AI automation tools.

Quick pitch: We built production tools with Claude Opus 4.5 (YouTube automation, social media engines, etc.). The hook: 60% of ALL revenue goes to children's hospitals.

{REFERRER_NAME} has been using {PRODUCT} and thought you'd appreciate both the tools and the mission.

Would love to send you one to try. No strings.

Let me know if you're interested.

Best,
{SENDER_NAME}`
    }
};

// ============================================================================
// SECTION 3: COLLABORATION PROPOSAL TEMPLATES
// ============================================================================

const COLLABORATION_PROPOSALS = {
    videoReview: {
        title: 'Video Review Partnership',
        type: 'Content Collaboration',
        proposal: `
## VIDEO REVIEW PARTNERSHIP PROPOSAL
### AI Solutions Store x {INFLUENCER_NAME}

**Overview:**
We invite {INFLUENCER_NAME} to create an honest review of our AI automation products for their audience.

**What We Provide:**
- Complimentary product access (your choice from our catalog)
- Technical support during testing
- B-roll footage and assets if needed
- Affiliate link with 20-30% commission
- Exclusive discount code for your audience (10-15% off)

**Products Available for Review:**
- Claude Droid ($299) - YouTube Shorts automation
- Marketing Engine ($199) - 23-platform social posting
- Income Droid ($499) - Revenue-optimized content engine
- Jules AI ($399) - AI agent dashboard

**Content Guidelines:**
- Completely honest review - we want genuine feedback
- No script approval needed - your authentic voice
- Mention the 60% charity model (optional but appreciated)
- Affiliate link in description

**Commission Structure:**
- Base: 20% (Starter tier)
- After 10 sales: 25% (Partner tier)
- After 25 sales: 30% (Pro tier)

**Timeline:**
- Product access: Immediate upon agreement
- Review deadline: Flexible (suggested 30 days)
- Commission tracking: Real-time dashboard

**Contact:**
{SENDER_NAME}
{SUPPORT_EMAIL}
FOR THE KIDS - 60/30/10
`
    },

    podcastGuest: {
        title: 'Podcast Guest Appearance',
        type: 'Interview/Conversation',
        proposal: `
## PODCAST GUEST PROPOSAL
### FOR THE KIDS Founder x {PODCAST_NAME}

**Proposed Topic:**
"Building Mission-First AI: How 60% of Every Sale Funds Children's Hospitals"

**Story Angles:**
1. **The Origin**: Why lock 60% of revenue for charity permanently?
2. **The Technology**: Building production AI with Claude Opus 4.5
3. **The Model**: Gospel V1.3 - making charity immutable in code
4. **The Products**: AI tools that actually run 24/7 in production
5. **The Future**: Scaling impact through automation

**What Makes This Unique:**
- Not a pledge or campaign - it's the actual business structure
- Blockchain-verified charity transactions
- Real products generating revenue (proof available)
- Counter-narrative to "AI will destroy everything"

**Discussion Points:**
- How to build mission-driven tech companies
- The future of AI automation for individuals
- Making charity sustainable vs. one-time donations
- Indie hacker journey with a purpose

**Technical Topics (if relevant):**
- Claude Opus 4.5 architecture and capabilities
- Production AI deployment (PM2, Windows/Linux)
- YouTube automation technology
- Multi-platform content syndication

**Guest Bio:**
Building AI Solutions Store - production AI tools where 60% of ALL revenue goes to verified pediatric charities. Products include Claude Droid (YouTube automation), Marketing Engine (23-platform posting), and more. Powered by Claude Opus 4.5.

**Contact:**
{SENDER_NAME}
{SUPPORT_EMAIL}
`
    },

    newsletterFeature: {
        title: 'Newsletter Feature/Sponsor',
        type: 'Sponsored Content',
        proposal: `
## NEWSLETTER PARTNERSHIP PROPOSAL
### AI Solutions Store x {NEWSLETTER_NAME}

**Partnership Options:**

**Option A: Dedicated Feature**
- Full article/section about FOR THE KIDS mission
- Include product overview and affiliate link
- Your authentic take on our approach
- Compensation: $XXX + affiliate commission

**Option B: Sponsored Mention**
- Brief mention in tools/deals section
- Affiliate link with custom discount code
- Compensation: $XXX + affiliate commission

**Option C: Affiliate Only**
- Add to your resources/tools list
- Earn 20-30% on every referral
- No upfront cost or commitment

**Story Angle:**
"AI Tools Where 60% of Revenue Goes to Children's Hospitals"

The only AI automation suite where purchasing directly funds pediatric care. Not a pledge. Not a campaign. The actual business model.

**Key Points to Highlight:**
- 60% to verified pediatric charities (Gospel V1.3)
- Production-ready AI built with Claude Opus 4.5
- One-time purchases, no subscriptions
- Real tools: YouTube automation, social posting, content engines

**Products to Feature:**
- Claude Droid: YouTube Shorts automation ($299)
- Marketing Engine: 23-platform posting ($199)
- Income Droid: Revenue-optimized content ($499)

**Assets Provided:**
- Product images and logos
- Feature copy (customizable)
- Affiliate tracking link
- Exclusive discount code for your readers

**Contact:**
{SENDER_NAME}
{SUPPORT_EMAIL}
`
    },

    sponsoredContent: {
        title: 'Sponsored Content Package',
        type: 'Paid Partnership',
        proposal: `
## SPONSORED CONTENT PARTNERSHIP
### AI Solutions Store x {INFLUENCER_NAME}

**Campaign: FOR THE KIDS AI Tools**

**Objective:**
Introduce {INFLUENCER_NAME}'s audience to AI automation tools that fund children's hospitals.

**Deliverables:**

**Package A: Full Integration ($XXXX)**
- 1x dedicated video/post (5-10 min)
- 3x social posts across platforms
- Affiliate link + exclusive discount code
- 30-day commission tracking

**Package B: Standard Mention ($XXX)**
- 60-90 second integration in existing content
- 2x social posts
- Affiliate link + discount code
- 30-day commission tracking

**Package C: Story/Reel Only ($XXX)**
- Instagram Story series (4-6 slides) OR
- TikTok/Reel (30-60 seconds)
- Link in bio/swipe up
- Affiliate commission ongoing

**Key Messaging:**
- 60% of ALL revenue goes to children's hospitals
- Production AI tools (not demos or prototypes)
- Claude Droid: 4+ YouTube Shorts/day automated
- One-time purchase, lifetime access

**Creative Freedom:**
We trust your creative judgment. Share your authentic experience. The mission speaks for itself.

**Bonus:**
Ongoing affiliate commission (20-30%) on all sales through your link - forever.

**Contact:**
{SENDER_NAME}
{SUPPORT_EMAIL}
FOR THE KIDS - 60/30/10 Gospel V1.3
`
    },

    coCreation: {
        title: 'Co-Created Product/Content',
        type: 'Deep Partnership',
        proposal: `
## CO-CREATION PARTNERSHIP PROPOSAL
### AI Solutions Store x {INFLUENCER_NAME}

**Concept:**
Partner with {INFLUENCER_NAME} to create a co-branded AI automation product or content series.

**Option 1: Co-Branded Product**
- Custom configuration of existing product
- "{INFLUENCER_NAME} Edition" branding
- Unique features/templates for their niche
- Revenue split: 30% to {INFLUENCER_NAME}, 60% to charity, 10% operations

**Option 2: Course/Tutorial Series**
- Joint course teaching AI automation
- Combined expertise: your audience + our tools
- Revenue split negotiable
- Hosted on your platform or ours

**Option 3: Content Series**
- Multi-part video series on AI automation
- Behind-the-scenes of tool development
- Real results documentation
- Cross-promotion on both channels

**Why Partner With Us:**
1. Mission alignment (charity-first model)
2. Production-ready technology
3. Real revenue potential
4. Growing community

**Next Steps:**
1. Exploratory call to discuss vision
2. Scope definition and agreement
3. Development/production timeline
4. Launch and promotion

**Contact:**
{SENDER_NAME}
{SUPPORT_EMAIL}
`
    }
};

// ============================================================================
// SECTION 4: AFFILIATE OFFER TEMPLATES
// ============================================================================

const AFFILIATE_OFFERS = {
    standard: {
        title: 'Standard Affiliate Program',
        description: 'Our core affiliate offering for tech/AI influencers',
        offer: `
## AI SOLUTIONS STORE AFFILIATE PROGRAM
### FOR THE KIDS - Earn While Helping Children

**Why Join?**
Every sale through your link puts money in your pocket AND funds children's hospitals. Win-win.

**Commission Structure:**

| Tier | Sales Required | Commission Rate | Example Earnings |
|------|----------------|-----------------|------------------|
| Starter | 0+ | 20% | $40-500/sale |
| Partner | 10+ | 25% | $50-625/sale |
| Pro | 25+ | 30% | $60-750/sale |
| Elite | 50+ | 35% | $70-875/sale |

**Products You'll Promote:**

| Product | Price | Your Commission (Starter-Elite) |
|---------|-------|--------------------------------|
| Claude Droid | $299 | $59.80 - $104.65 |
| Marketing Engine | $199 | $39.80 - $69.65 |
| Income Droid | $499 | $99.80 - $174.65 |
| Jules AI | $399 | $79.80 - $139.65 |
| Affiliate System | $599 | $119.80 - $209.65 |
| Dating Platform | $2,499 | $499.80 - $874.65 |

**Program Details:**
- Cookie duration: 60 days
- Payout: Monthly (15th)
- Minimum payout: $50
- Methods: PayPal, Stripe, Bank Transfer

**What You Get:**
- Personal affiliate dashboard
- Real-time tracking
- Custom discount codes
- Marketing materials
- Priority support

**Apply:** {AFFILIATE_URL}

**Questions?** {SUPPORT_EMAIL}
`
    },

    vip: {
        title: 'VIP Affiliate Partnership',
        description: 'Enhanced program for high-performing influencers',
        offer: `
## VIP AFFILIATE PARTNERSHIP
### For Established Tech/AI Influencers

**Exclusive Benefits:**

**Commission:**
- Start at Partner tier (25%) immediately
- Fast-track to Pro (30%) and Elite (35%)
- Custom rates available for mega partners

**Perks:**
- Free product access (full suite)
- Exclusive discount codes (up to 20% off)
- Early access to new products
- Co-marketing opportunities
- Featured partner spotlight
- Dedicated affiliate manager

**Requirements:**
- 10K+ followers on primary platform
- Active content creation in tech/AI space
- Alignment with FOR THE KIDS mission

**VIP Commission Structure:**

| Tier | Commission | Threshold |
|------|------------|-----------|
| VIP Start | 25% | Immediate |
| VIP Pro | 30% | 15 sales |
| VIP Elite | 35% | 35 sales |
| VIP Legend | 40% | 100 sales (negotiable) |

**Onboarding:**
1. Apply: {AFFILIATE_URL}
2. Verification call (15 min)
3. Product access granted
4. Custom link + discount code created
5. Launch support provided

**Apply for VIP:** Reply with "VIP AFFILIATE" or email {SUPPORT_EMAIL}
`
    },

    contentCreator: {
        title: 'Content Creator Partnership',
        description: 'Tailored program for YouTubers and video creators',
        offer: `
## CONTENT CREATOR AFFILIATE PROGRAM
### For YouTubers, Streamers, and Video Creators

**Perfect Fit:**
Our products help you automate content. You help us spread the mission. 60% of every sale funds children's hospitals.

**Special Benefits:**

1. **Free Product Access**
   - Claude Droid (YouTube automation) - FREE
   - Marketing Engine (social posting) - FREE
   - Use them to create more content!

2. **Enhanced Commission**
   - Start at 22% (vs. standard 20%)
   - Faster tier progression
   - Bonus for video reviews

3. **Content Support**
   - B-roll footage provided
   - Product screenshots/demos
   - Technical support for accurate reviews

4. **Exclusive Codes**
   - Custom discount for your audience (15% off)
   - Tracked to your affiliate account
   - Stackable with commissions

**Earning Potential:**
- 1 video review → 10-50 sales typical
- At 22%: $650 - $3,250 from one video
- Plus ongoing passive income

**Ideal Content:**
- "I Automated My YouTube Channel with AI"
- "AI Tools That Actually Work (and fund charity)"
- "How I Create 4 Videos/Day Without Editing"
- "The AI Tool That Pays for Itself"

**Apply:** {AFFILIATE_URL}
**Questions:** {SUPPORT_EMAIL}
`
    },

    newsletter: {
        title: 'Newsletter Affiliate Program',
        description: 'Tailored for newsletter writers and curators',
        offer: `
## NEWSLETTER AFFILIATE PROGRAM
### For AI/Tech Newsletter Writers

**Why Partner:**
Your readers trust your recommendations. Our products deliver real results. 60% of every sale helps children.

**Newsletter-Specific Benefits:**

1. **Exclusive Story Access**
   - First access to new products
   - Behind-the-scenes content
   - Founder interviews available

2. **Custom Integration**
   - Tailored copy for your voice
   - Unique discount codes
   - Tracked affiliate links

3. **Commission Structure**
   - 22% starting rate
   - 30% after 15 sales
   - Bonus for dedicated features

4. **Content Assets**
   - Product one-liners ready
   - Feature paragraphs
   - Comparison charts
   - Images and logos

**Recommended Placements:**
- Tools of the week section
- Sponsor mention
- Deals/discounts section
- Dedicated feature article

**Sample Copy:**
"AI Solutions Store builds automation tools that fund children's hospitals - 60% of every sale. Their Claude Droid creates 4 YouTube Shorts/day automatically. One-time purchase, no subscription. [Your link]"

**Apply:** {AFFILIATE_URL}
**Questions:** {SUPPORT_EMAIL}
`
    }
};

// ============================================================================
// SECTION 5: PRODUCT GIFTING OFFER TEMPLATES
// ============================================================================

const PRODUCT_GIFTING_OFFERS = {
    reviewGift: {
        title: 'Review Copy Gift',
        description: 'Free product in exchange for honest review',
        offer: `
## PRODUCT GIFTING - REVIEW OPPORTUNITY
### AI Solutions Store x {INFLUENCER_NAME}

**The Offer:**
We'd like to gift you one of our AI automation products for your honest review.

**Available Products:**

| Product | Value | Best For |
|---------|-------|----------|
| Claude Droid | $299 | YouTubers, content creators |
| Marketing Engine | $199 | Social media managers, founders |
| Income Droid | $499 | Entrepreneurs, agencies |
| Jules AI | $399 | Power users, multi-project managers |

**What We Ask:**
- Honest review on your platform of choice
- Mention the 60% charity model (if genuine)
- Include your affiliate link (optional but you'll earn commission)

**What We DON'T Ask:**
- Scripted content
- Positive-only reviews
- Specific talking points

**Timeline:**
- Product access: Within 24 hours of agreement
- Review deadline: 30 days (flexible)
- Follow-up: We'd love your genuine feedback

**How to Claim:**
Reply with:
1. Your preferred product
2. Your platform for the review
3. Estimated review date

We'll set you up within 24 hours.

**Contact:**
{SENDER_NAME}
{SUPPORT_EMAIL}
FOR THE KIDS - 60/30/10
`
    },

    trialGift: {
        title: 'Trial Product Gift',
        description: 'No-strings product trial for potential partners',
        offer: `
## NO-STRINGS PRODUCT TRIAL
### AI Solutions Store

**The Offer:**
Try one of our AI automation products. No review required. No obligations.

**Why We're Doing This:**
We believe in our products. We believe in the mission. If you try it and love it, you'll naturally want to share it. If not, you still keep the product.

**Available for Trial:**

1. **Claude Droid** ($299 value)
   - Creates 4+ YouTube Shorts daily
   - Claude Opus 4.5 powered scripts
   - Automatic uploads to YouTube

2. **Marketing Engine** ($199 value)
   - Posts to 23 platforms automatically
   - Runs 24/7 via PM2
   - Zero manual work after setup

3. **Income Droid** ($499 value)
   - Revenue-optimized content
   - Multi-platform syndication
   - Monetization tracking

**Zero Pressure:**
- No review required
- No social posts expected
- No affiliate signup needed
- It's genuinely free

**The Mission:**
60% of all revenue (from people who DO buy) goes to children's hospitals. You trying the product costs us nothing and might help sick kids if you share it.

**Claim Your Trial:**
Reply with your preferred product and we'll set you up.

**Contact:**
{SENDER_NAME}
{SUPPORT_EMAIL}
`
    },

    ambassadorGift: {
        title: 'Ambassador Package',
        description: 'Full product suite for brand ambassadors',
        offer: `
## BRAND AMBASSADOR PACKAGE
### FOR THE KIDS x {INFLUENCER_NAME}

**The Offer:**
Full access to our complete AI automation suite in exchange for ongoing partnership.

**Package Contents:**

| Product | Retail Value |
|---------|-------------|
| Claude Droid | $299 |
| Marketing Engine | $199 |
| Income Droid | $499 |
| Jules AI | $399 |
| **Total Value** | **$1,396** |

**Ambassador Benefits:**
- All 4 core products (lifetime access)
- Early access to new releases
- Direct line to dev team for feedback
- Co-creation opportunities
- 30% base commission (Elite tier)
- Custom discount codes for audience
- Featured on our partners page

**Ambassador Expectations:**
- Monthly content (1x mention minimum)
- Honest, authentic representation
- Feedback on product improvements
- 6-month initial commitment

**Perfect For:**
- Established AI/tech creators
- Multiple-platform presence
- Aligned with charity mission
- Active, engaged community

**Application:**
To be considered for Ambassador status, please share:
1. Your primary platforms and audience size
2. Why the FOR THE KIDS mission resonates
3. Content ideas you'd create

**Contact:**
{SENDER_NAME}
{SUPPORT_EMAIL}
`
    },

    giveawayPartnership: {
        title: 'Giveaway Partnership',
        description: 'Product giveaway for audience engagement',
        offer: `
## GIVEAWAY PARTNERSHIP PROPOSAL
### AI Solutions Store x {INFLUENCER_NAME}

**Concept:**
Partner to give away AI automation products to {INFLUENCER_NAME}'s audience.

**Giveaway Options:**

**Option A: Single Product Giveaway**
- 1x Claude Droid ($299 value)
- Simple entry mechanism
- We provide: product + graphics
- Duration: 1 week

**Option B: Multi-Prize Giveaway**
- 1x Income Droid (Grand Prize)
- 2x Marketing Engine (Runners-up)
- Total value: $897
- Duration: 2 weeks
- More engagement

**Option C: Community Giveaway**
- 3x Claude Droid licenses
- For your Discord/community members
- Builds engagement
- Total value: $897

**Entry Mechanics (suggestions):**
- Follow + RT/Share
- Comment with answer to question
- Sign up for your newsletter
- Join your Discord
- Your choice!

**What We Provide:**
- Product licenses for winners
- Giveaway graphics/assets
- Winner fulfillment
- Optional: Custom discount code for non-winners

**What You Provide:**
- Announcement post(s)
- Winner selection
- Audience engagement

**Why This Works:**
- High engagement for you
- Product awareness for us
- Winners become organic ambassadors
- 60% of any resulting sales → children's hospitals

**Interested?**
Reply with your preferred giveaway format and platform.

**Contact:**
{SENDER_NAME}
{SUPPORT_EMAIL}
`
    },

    charityBundle: {
        title: 'Charity Impact Bundle',
        description: 'Gift products tied to verified charity impact',
        offer: `
## CHARITY IMPACT BUNDLE
### Make It About The Mission

**The Concept:**
For every product we gift you, we also make a direct donation to Shriners Children's Hospitals in your name.

**Bundle Options:**

**Impact Bundle A ($299 + $100 donation)**
- Claude Droid (for you)
- $100 donation in your name
- Donation receipt provided
- Shareable impact certificate

**Impact Bundle B ($499 + $200 donation)**
- Income Droid (for you)
- $200 donation in your name
- Donation receipt provided
- Shareable impact certificate

**Impact Bundle C ($699 + $300 donation)**
- Claude Droid + Marketing Engine (for you)
- $300 donation in your name
- Donation receipt provided
- Shareable impact certificate

**Why This Matters:**
- Direct, verified charity impact
- Content angle: "My review funded $X for kids"
- Transparent, blockchain-verifiable transactions
- Authentic mission alignment

**Content Opportunity:**
"AI Solutions Store gifted me their product to review. They also donated $XXX to children's hospitals in my name. This is what AI for good looks like."

**How to Claim:**
Tell us which bundle resonates. We'll:
1. Send the product(s)
2. Make the donation
3. Send you the receipt/certificate

**Contact:**
{SENDER_NAME}
{SUPPORT_EMAIL}
FOR THE KIDS - Every dollar helps.
`
    }
};

// ============================================================================
// PRIORITY TECH/AI INFLUENCER LIST
// ============================================================================

const PRIORITY_INFLUENCERS = [
    // Tier 1: AI/Tech YouTubers
    {
        name: 'Matt Wolfe',
        platform: 'YouTube',
        handle: '@maboroshi',
        niche: 'AI Tool Reviews',
        tier: 'macro',
        priority: 'HIGH',
        notes: 'Reviews AI tools weekly. Perfect product-market fit.'
    },
    {
        name: 'Fireship',
        platform: 'YouTube',
        handle: '@fireship',
        niche: 'Developer Education',
        tier: 'mega',
        priority: 'HIGH',
        notes: 'Massive developer audience. Would need strong tech angle.'
    },
    {
        name: 'All About AI',
        platform: 'YouTube',
        handle: '@AllAboutAI',
        niche: 'AI Tutorials',
        tier: 'macro',
        priority: 'HIGH',
        notes: 'Practical AI use cases. Great for Claude Droid demo.'
    },
    {
        name: 'AI Jason',
        platform: 'YouTube',
        handle: '@AIJason',
        niche: 'AI Education',
        tier: 'micro',
        priority: 'CRITICAL',
        notes: 'Growing channel, high engagement. Respond to DMs.'
    },

    // Tier 2: Indie Hackers & Solo Founders
    {
        name: 'Pieter Levels',
        platform: 'Twitter/X',
        handle: '@levelsio',
        niche: 'Indie Hacking',
        tier: 'mega',
        priority: 'HIGH',
        notes: 'Legend in indie space. Hard to reach but huge impact.'
    },
    {
        name: 'Marc Lou',
        platform: 'Twitter/X',
        handle: '@marc_louvion',
        niche: 'Indie Products',
        tier: 'macro',
        priority: 'HIGH',
        notes: 'Ships fast, loves automation. Potential user.'
    },
    {
        name: 'Tony Dinh',
        platform: 'Twitter/X',
        handle: '@tdinh_me',
        niche: 'Indie Maker',
        tier: 'micro',
        priority: 'CRITICAL',
        notes: 'Very active, engages with DMs. Great for authentic review.'
    },

    // Tier 3: Newsletter Writers
    {
        name: 'Ben\'s Bites',
        platform: 'Newsletter',
        handle: '@bensbites',
        niche: 'AI News',
        tier: 'macro',
        priority: 'HIGH',
        notes: 'Major AI newsletter. Sponsor or feature opportunity.'
    },
    {
        name: 'The Rundown AI',
        platform: 'Newsletter',
        handle: '@TheRundownAI',
        niche: 'AI News',
        tier: 'mega',
        priority: 'HIGH',
        notes: 'Massive reach. Would need unique story angle.'
    },
    {
        name: 'TLDR',
        platform: 'Newsletter',
        handle: '@tlaboratory',
        niche: 'Tech News',
        tier: 'mega',
        priority: 'MEDIUM',
        notes: 'Sponsor opportunity. Expensive but wide reach.'
    },

    // Tier 4: Podcasters
    {
        name: 'Lenny Rachitsky',
        platform: 'Podcast',
        handle: '@lennysan',
        niche: 'Product/Growth',
        tier: 'mega',
        priority: 'MEDIUM',
        notes: 'Guest opportunity for founder story.'
    },
    {
        name: 'My First Million',
        platform: 'Podcast',
        handle: '@ShaanVP',
        niche: 'Business/Ideas',
        tier: 'mega',
        priority: 'HIGH',
        notes: 'Love unique business models. Gospel V1.3 angle.'
    },

    // Tier 5: Productivity Creators
    {
        name: 'Ali Abdaal',
        platform: 'YouTube',
        handle: '@aliabdaal',
        niche: 'Productivity',
        tier: 'mega',
        priority: 'MEDIUM',
        notes: 'Massive reach. Agency contact needed.'
    },
    {
        name: 'Thomas Frank',
        platform: 'YouTube',
        handle: '@ThomasFrankExplains',
        niche: 'Productivity',
        tier: 'macro',
        priority: 'MEDIUM',
        notes: 'Loves tools and automation. Could demo products.'
    },

    // Tier 6: Developer Influencers
    {
        name: 'Theo',
        platform: 'YouTube',
        handle: '@t3dotgg',
        niche: 'Web Dev',
        tier: 'macro',
        priority: 'HIGH',
        notes: 'Opinionated, authentic. Would give honest review.'
    },
    {
        name: 'ThePrimeagen',
        platform: 'YouTube',
        handle: '@ThePrimeagen',
        niche: 'Developer',
        tier: 'macro',
        priority: 'MEDIUM',
        notes: 'Entertaining style. Hard to reach but great if possible.'
    }
];

// ============================================================================
// CONTENT GENERATION
// ============================================================================

function generateFullTemplateContent() {
    const timestamp = new Date().toISOString();

    let content = `# INFLUENCER OUTREACH TEMPLATE SYSTEM
## AI Solutions Store - Tech/AI Influencer Targeting
### FOR THE KIDS - Gospel V1.3 (60/30/10)

**Generated:** ${timestamp}

---

# TABLE OF CONTENTS

1. [Influencer Tiers & Targeting](#influencer-tiers)
2. [Target Categories](#target-categories)
3. [Initial DM Templates](#dm-templates)
4. [Email Pitch Templates](#email-templates)
5. [Collaboration Proposals](#collaboration-proposals)
6. [Affiliate Offers](#affiliate-offers)
7. [Product Gifting Offers](#product-gifting)
8. [Priority Influencer List](#priority-list)

---

# INFLUENCER TIERS & TARGETING {#influencer-tiers}

`;

    // Influencer Tiers
    Object.entries(INFLUENCER_TIERS).forEach(([key, tier]) => {
        content += `## ${tier.name} (${tier.followers})

- **Engagement Rate:** ${tier.engagement}
- **Commission Offered:** ${tier.commissionRate}
- **Gifting Budget:** ${tier.giftingBudget}
- **Approach:** ${tier.approach}
- **Best Platforms:** ${tier.platforms.join(', ')}
- **Expected Response Rate:** ${tier.responseRate}
- **Notes:** ${tier.notes}

`;
    });

    content += `---

# TARGET INFLUENCER CATEGORIES {#target-categories}

`;

    // Influencer Categories
    INFLUENCER_CATEGORIES.forEach(cat => {
        content += `## ${cat.category}

**Examples:** ${cat.examples.join(', ')}

**Messaging Focus:** ${cat.messaging}

**Hook:** "${cat.hook}"

`;
    });

    content += `---

# SECTION 1: INITIAL DM TEMPLATES {#dm-templates}

`;

    // DM Templates
    Object.entries(DM_TEMPLATES).forEach(([platform, tiers]) => {
        content += `## ${platform.charAt(0).toUpperCase() + platform.slice(1)} DMs

`;
        Object.entries(tiers).forEach(([tier, templates]) => {
            content += `### ${tier.charAt(0).toUpperCase() + tier.slice(1)} Tier

`;
            templates.forEach((template, index) => {
                content += `#### Template ${index + 1}: ${template.name}

**Purpose:** ${template.purpose}
**Best For:** ${template.bestFor}

\`\`\`
${template.message}
\`\`\`

`;
            });
        });
    });

    content += `---

# SECTION 2: EMAIL PITCH TEMPLATES {#email-templates}

`;

    // Email Templates - Cold Outreach
    content += `## Cold Outreach Emails

`;
    Object.entries(EMAIL_TEMPLATES.coldOutreach).forEach(([tier, template]) => {
        content += `### ${tier.charAt(0).toUpperCase() + tier.slice(1)} Tier

**Subject:** ${template.subject}

\`\`\`
${template.body}
\`\`\`

`;
    });

    // Follow-up Emails
    content += `## Follow-Up Emails

`;
    Object.entries(EMAIL_TEMPLATES.followUp).forEach(([name, template]) => {
        content += `### ${name.charAt(0).toUpperCase() + name.slice(1)} Follow-Up

**Subject:** ${template.subject}

\`\`\`
${template.body}
\`\`\`

`;
    });

    // Referral Email
    content += `## Referral Email

**Subject:** ${EMAIL_TEMPLATES.referral.subject}

\`\`\`
${EMAIL_TEMPLATES.referral.body}
\`\`\`

---

# SECTION 3: COLLABORATION PROPOSALS {#collaboration-proposals}

`;

    // Collaboration Proposals
    Object.entries(COLLABORATION_PROPOSALS).forEach(([key, proposal]) => {
        content += `## ${proposal.title}

**Type:** ${proposal.type}

${proposal.proposal}

---

`;
    });

    content += `
# SECTION 4: AFFILIATE OFFERS {#affiliate-offers}

`;

    // Affiliate Offers
    Object.entries(AFFILIATE_OFFERS).forEach(([key, offer]) => {
        content += `## ${offer.title}

**Description:** ${offer.description}

${offer.offer}

---

`;
    });

    content += `
# SECTION 5: PRODUCT GIFTING OFFERS {#product-gifting}

`;

    // Product Gifting Offers
    Object.entries(PRODUCT_GIFTING_OFFERS).forEach(([key, offer]) => {
        content += `## ${offer.title}

**Description:** ${offer.description}

${offer.offer}

---

`;
    });

    content += `
# PRIORITY INFLUENCER LIST {#priority-list}

`;

    // Priority Influencers by Tier
    const tierGroups = {};
    PRIORITY_INFLUENCERS.forEach(inf => {
        if (!tierGroups[inf.tier]) tierGroups[inf.tier] = [];
        tierGroups[inf.tier].push(inf);
    });

    Object.entries(tierGroups).forEach(([tier, influencers]) => {
        content += `## ${tier.charAt(0).toUpperCase() + tier.slice(1)} Tier Influencers

| Name | Platform | Handle | Niche | Priority | Notes |
|------|----------|--------|-------|----------|-------|
`;
        influencers.forEach(inf => {
            content += `| ${inf.name} | ${inf.platform} | ${inf.handle} | ${inf.niche} | ${inf.priority} | ${inf.notes} |
`;
        });
        content += `
`;
    });

    content += `---

# QUICK REFERENCE

## Key Messaging Points

1. **60% to charity** - Every sale funds children's hospitals
2. **Production-ready** - Real tools running 24/7, not demos
3. **Claude Opus 4.5** - Built on Anthropic's latest AI
4. **One-time purchase** - No subscriptions, lifetime access
5. **Gospel V1.3** - Immutable charity commitment

## Products Quick Reference

| Product | Price | Key Hook | Best For |
|---------|-------|----------|----------|
| Claude Droid | $299 | 4 YouTube Shorts/day | YouTubers, content creators |
| Marketing Engine | $199 | 23-platform automation | Social managers, founders |
| Income Droid | $499 | Revenue-optimized content | Entrepreneurs, agencies |
| Jules AI | $399 | AI agent dashboard | Power users, managers |
| Affiliate System | $599 | Launch affiliate program | SaaS, courses |
| Dating Platform | $2,499 | Full dating app | Startups, communities |

## Commission Structure

| Tier | Requirement | Rate |
|------|-------------|------|
| Starter | 0 sales | 20% |
| Partner | 10 sales | 25% |
| Pro | 25 sales | 30% |
| Elite | 50 sales | 35% |

---

*Generated by AI Solutions Store Influencer Outreach System*
*FOR THE KIDS - 60/30/10 Gospel V1.3*
`;

    return content;
}

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

function getState() {
    try {
        if (fs.existsSync(CONFIG.stateFile)) {
            return JSON.parse(fs.readFileSync(CONFIG.stateFile, 'utf8'));
        }
    } catch (err) {
        log(`Error reading state: ${err.message}`);
    }
    return { runs: [], lastRun: null };
}

function saveState(state) {
    fs.writeFileSync(CONFIG.stateFile, JSON.stringify(state, null, 2));
}

// ============================================================================
// CLI INTERFACE
// ============================================================================

function parseArgs() {
    const args = {};
    process.argv.slice(2).forEach(arg => {
        if (arg.startsWith('--')) {
            const [key, value] = arg.substring(2).split('=');
            args[key] = value || true;
        }
    });
    return args;
}

function showHelp() {
    console.log(`
============================================================================
INFLUENCER OUTREACH TEMPLATE SYSTEM
AI Solutions Store | FOR THE KIDS - Gospel V1.3
============================================================================

Usage:
  node influencer-outreach.cjs [options]

Options:
  --help                    Show this help message
  --generate-all            Generate all templates to log file
  --list-influencers        List priority influencer targets
  --list-tiers              List influencer tier definitions
  --list-categories         List target influencer categories

  --template=TYPE           Show specific template type
      dm                    Direct message templates
      email                 Email pitch templates
      collab                Collaboration proposals
      affiliate             Affiliate offer templates
      gifting               Product gifting offers

  --tier=TIER               Filter by influencer tier
      nano, micro, macro, mega

  --platform=PLATFORM       Filter by platform
      twitter, instagram, linkedin, discord

Output:
  Templates saved to: ${CONFIG.contentFile}
  Logs written to: ${CONFIG.logFile}

Examples:
  node influencer-outreach.cjs --generate-all
  node influencer-outreach.cjs --template=dm --tier=micro
  node influencer-outreach.cjs --list-influencers

============================================================================
FOR THE KIDS. ALWAYS.
============================================================================
`);
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main() {
    const args = parseArgs();

    console.log('');
    console.log('============================================================================');
    console.log('INFLUENCER OUTREACH TEMPLATE SYSTEM');
    console.log('AI Solutions Store | FOR THE KIDS - Gospel V1.3 (60/30/10)');
    console.log('============================================================================');
    console.log('');

    if (args.help) {
        showHelp();
        return;
    }

    ensureDirectories();

    if (args['list-influencers']) {
        console.log('PRIORITY INFLUENCER TARGETS:');
        console.log('============================\n');
        PRIORITY_INFLUENCERS.forEach(inf => {
            console.log(`[${inf.priority}] ${inf.name} (@${inf.handle})`);
            console.log(`    Platform: ${inf.platform} | Tier: ${inf.tier} | Niche: ${inf.niche}`);
            console.log(`    Notes: ${inf.notes}\n`);
        });
        return;
    }

    if (args['list-tiers']) {
        console.log('INFLUENCER TIERS:');
        console.log('=================\n');
        Object.entries(INFLUENCER_TIERS).forEach(([key, tier]) => {
            console.log(`${tier.name} (${tier.followers})`);
            console.log(`  Commission: ${tier.commissionRate}`);
            console.log(`  Gifting Budget: ${tier.giftingBudget}`);
            console.log(`  Response Rate: ${tier.responseRate}\n`);
        });
        return;
    }

    if (args['list-categories']) {
        console.log('TARGET INFLUENCER CATEGORIES:');
        console.log('=============================\n');
        INFLUENCER_CATEGORIES.forEach(cat => {
            console.log(`${cat.category}`);
            console.log(`  Examples: ${cat.examples.slice(0, 3).join(', ')}`);
            console.log(`  Hook: "${cat.hook}"\n`);
        });
        return;
    }

    // Generate all templates
    log('Generating influencer outreach templates...');

    const content = generateFullTemplateContent();

    // Save to content file
    fs.writeFileSync(CONFIG.contentFile, content);
    log(`Templates saved to: ${CONFIG.contentFile}`);

    // Update state
    const state = getState();
    state.lastRun = new Date().toISOString();
    state.runs.push({
        timestamp: state.lastRun,
        contentFile: CONFIG.contentFile,
        dmTemplatesCount: Object.values(DM_TEMPLATES).reduce((sum, platform) =>
            sum + Object.values(platform).reduce((s, t) => s + t.length, 0), 0),
        emailTemplatesCount: Object.keys(EMAIL_TEMPLATES.coldOutreach).length +
            Object.keys(EMAIL_TEMPLATES.followUp).length + 1,
        collaborationProposalsCount: Object.keys(COLLABORATION_PROPOSALS).length,
        affiliateOffersCount: Object.keys(AFFILIATE_OFFERS).length,
        giftingOffersCount: Object.keys(PRODUCT_GIFTING_OFFERS).length,
        priorityInfluencersCount: PRIORITY_INFLUENCERS.length
    });
    if (state.runs.length > 50) state.runs = state.runs.slice(-50);
    saveState(state);

    // Summary
    console.log('============================================================================');
    console.log('TEMPLATE GENERATION COMPLETE');
    console.log('============================================================================');
    console.log('');
    console.log('Generated Templates:');
    console.log(`  - DM Templates: ${Object.values(DM_TEMPLATES).reduce((sum, platform) =>
        sum + Object.values(platform).reduce((s, t) => s + t.length, 0), 0)}`);
    console.log(`  - Email Templates: ${Object.keys(EMAIL_TEMPLATES.coldOutreach).length +
        Object.keys(EMAIL_TEMPLATES.followUp).length + 1}`);
    console.log(`  - Collaboration Proposals: ${Object.keys(COLLABORATION_PROPOSALS).length}`);
    console.log(`  - Affiliate Offers: ${Object.keys(AFFILIATE_OFFERS).length}`);
    console.log(`  - Product Gifting Offers: ${Object.keys(PRODUCT_GIFTING_OFFERS).length}`);
    console.log(`  - Priority Influencers: ${PRIORITY_INFLUENCERS.length}`);
    console.log('');
    console.log(`Content File: ${CONFIG.contentFile}`);
    console.log(`Log File: ${CONFIG.logFile}`);
    console.log('');
    console.log('============================================================================');
    console.log('FOR THE KIDS - 60% of every sale helps sick children');
    console.log('============================================================================');

    process.exit(0);
}

// Run if called directly
if (require.main === module) {
    main();
}

// ============================================================================
// EXPORTS (for use as module)
// ============================================================================

module.exports = {
    CONFIG,
    INFLUENCER_TIERS,
    INFLUENCER_CATEGORIES,
    PRODUCTS,
    DM_TEMPLATES,
    EMAIL_TEMPLATES,
    COLLABORATION_PROPOSALS,
    AFFILIATE_OFFERS,
    PRODUCT_GIFTING_OFFERS,
    PRIORITY_INFLUENCERS,
    generateFullTemplateContent
};
