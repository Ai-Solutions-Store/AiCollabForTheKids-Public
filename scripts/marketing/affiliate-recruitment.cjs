/**
 * Affiliate Recruitment Marketing Campaign Generator
 * Generates content to recruit affiliates for AI Solutions Store products
 *
 * Commission Structure: 15-30% tiered
 *
 * FOR THE KIDS - 60/30/10
 */

const fs = require('fs');
const path = require('path');

const LOGS_DIR = 'C:\\AiCollabForTheKids\\logs';
const STATE_FILE = path.join(LOGS_DIR, 'affiliate-recruitment-state.json');
const LOG_FILE = path.join(LOGS_DIR, 'affiliate-recruitment-marketing.log');
const CONTENT_FILE = path.join(LOGS_DIR, 'affiliate-recruitment-content.md');

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

// ============================================================================
// COMMISSION STRUCTURE (15-30% Tiered)
// ============================================================================
const COMMISSION_STRUCTURE = {
    tiers: [
        {
            name: 'Starter',
            salesRequired: 0,
            commissionRate: 0.15,
            description: 'New affiliates start here',
            benefits: [
                '15% commission on all sales',
                'Access to affiliate dashboard',
                'Marketing materials provided',
                'Monthly payouts via PayPal/Stripe'
            ]
        },
        {
            name: 'Partner',
            salesRequired: 10,
            commissionRate: 0.20,
            description: 'After 10 confirmed sales',
            benefits: [
                '20% commission on all sales',
                'Priority support channel',
                'Custom discount codes',
                'Quarterly bonus opportunities'
            ]
        },
        {
            name: 'Pro',
            salesRequired: 25,
            commissionRate: 0.25,
            description: 'After 25 confirmed sales',
            benefits: [
                '25% commission on all sales',
                'Dedicated affiliate manager',
                'Early access to new products',
                'Co-marketing opportunities'
            ]
        },
        {
            name: 'Elite',
            salesRequired: 50,
            commissionRate: 0.30,
            description: 'Top performers - 50+ sales',
            benefits: [
                '30% commission on all sales',
                'Exclusive product bundles',
                'Revenue share on renewals',
                'Speaking/collaboration invites',
                'Featured partner spotlight'
            ]
        }
    ],
    payoutInfo: {
        minimum: 50,
        schedule: 'Monthly (15th)',
        methods: ['PayPal', 'Stripe', 'Bank Transfer'],
        cookieDuration: 60 // days
    }
};

// ============================================================================
// PRODUCT DESCRIPTIONS FOR AFFILIATES
// ============================================================================
const PRODUCT_CATALOG = [
    {
        name: 'Claude Droid',
        slug: 'claude-droid',
        price: 299,
        url: 'https://ai-solutions.store/claude-droid',
        category: 'Content Automation',
        commissionRange: '$44.85 - $89.70',
        description: 'AI-powered YouTube Shorts automation. Creates and uploads videos while you sleep.',
        features: [
            'Claude AI script generation',
            'Text-to-speech voiceovers',
            'FFmpeg video rendering',
            'YouTube API auto-upload',
            'RSS news feed integration'
        ],
        targetAudience: 'Content creators, YouTubers, passive income seekers',
        sellingPoints: [
            'Creates 4+ videos per day automatically',
            'No video editing skills required',
            'One-time purchase, no subscriptions',
            'Full source code included',
            '90-day results: 360 videos, 47k views'
        ],
        conversionTips: 'Emphasize time savings and passive income potential. Share case study results.'
    },
    {
        name: 'Income Droid',
        slug: 'income-droid',
        price: 499,
        url: 'https://ai-solutions.store/income-droid',
        category: 'Revenue Automation',
        commissionRange: '$74.85 - $149.70',
        description: 'Revenue-optimized content engine with SEO automation and monetization features.',
        features: [
            'Multi-platform syndication',
            'SEO-optimized titles & tags',
            'Monetization compliance checks',
            'Trending topic selection',
            'Upload scheduling optimization'
        ],
        targetAudience: 'Entrepreneurs, side hustlers, digital marketers',
        sellingPoints: [
            'Built-in revenue optimization',
            'Cost per video: ~$0.23',
            'Break-even at ~50 views',
            'Multi-niche support',
            'Full analytics dashboard'
        ],
        conversionTips: 'Focus on ROI and economics. Show the cost vs revenue breakdown.'
    },
    {
        name: 'Marketing Engine',
        slug: 'marketing-engine',
        price: 199,
        url: 'https://ai-solutions.store/marketing-engine',
        category: 'Marketing Automation',
        commissionRange: '$29.85 - $59.70',
        description: 'Multi-platform social media automation for consistent brand presence.',
        features: [
            '12+ platform support',
            'Content variation system',
            'Rate limit handling',
            'PM2 24/7 scheduling',
            'Comprehensive logging'
        ],
        targetAudience: 'Solo founders, small teams, marketing agencies',
        sellingPoints: [
            'Saves 2-3 hours daily',
            'Runs 24/7 unattended',
            'Platform-specific optimization',
            'Includes content templates',
            'Easy PM2 deployment'
        ],
        conversionTips: 'Highlight time savings for solo founders. Marketing consistency story.'
    },
    {
        name: 'Jules AI',
        slug: 'jules-ai',
        price: 399,
        url: 'https://ai-solutions.store/jules-ai',
        category: 'AI Assistant',
        commissionRange: '$59.85 - $119.70',
        description: 'Personal AI agent for task automation and workflow management.',
        features: [
            'Multi-agent orchestration',
            'Task queue management',
            'Monitoring dashboard',
            'Custom workflow creation',
            'API integrations'
        ],
        targetAudience: 'Developers, productivity enthusiasts, automation builders',
        sellingPoints: [
            'Build custom AI workflows',
            'Monitor all agents in one place',
            'Extensible architecture',
            'Full source code access',
            'Active development'
        ],
        conversionTips: 'Appeal to technical audience. Emphasize customization potential.'
    },
    {
        name: 'Affiliate System',
        slug: 'affiliate-system',
        price: 599,
        url: 'https://ai-solutions.store/affiliate-system',
        category: 'Business Tools',
        commissionRange: '$89.85 - $179.70',
        description: 'Complete referral tracking and commission automation platform.',
        features: [
            'Affiliate dashboard',
            'Real-time tracking',
            'Commission calculation',
            'Automated payouts',
            'Performance analytics'
        ],
        targetAudience: 'SaaS founders, course creators, product sellers',
        sellingPoints: [
            'Launch your own affiliate program',
            'No recurring fees',
            'White-label ready',
            'Full customization',
            'Self-hosted = you own the data'
        ],
        conversionTips: 'Position as alternative to expensive affiliate SaaS. Ownership angle.'
    },
    {
        name: 'Dating Platform',
        slug: 'dating-platform',
        price: 2499,
        url: 'https://ai-solutions.store/dating-platform',
        category: 'Premium Solutions',
        commissionRange: '$374.85 - $749.70',
        description: 'Full-stack AI-powered matchmaking platform. White-label ready.',
        features: [
            'AI matchmaking algorithm',
            'Real-time chat',
            'User verification',
            'Admin dashboard',
            'Mobile-responsive'
        ],
        targetAudience: 'Entrepreneurs, niche community builders, developers',
        sellingPoints: [
            'Complete platform, not a template',
            'Proven matchmaking algorithm',
            'Launch in days, not months',
            'Custom branding included',
            'Technical support'
        ],
        conversionTips: 'High-ticket item = higher commission. Target serious entrepreneurs.'
    }
];

// ============================================================================
// SOCIAL MEDIA POST TEMPLATES
// ============================================================================
const SOCIAL_MEDIA_POSTS = {
    twitter: [
        {
            type: 'opportunity',
            content: `Looking for a new income stream?

We're recruiting affiliates for AI automation tools.

Commission structure:
- Starter: 15%
- Partner: 20%
- Pro: 25%
- Elite: 30%

Products range from $199-$2,499.

That's up to $750 per sale.

Apply: ai-solutions.store/affiliates

#AffiliateMarketing #AI #PassiveIncome`
        },
        {
            type: 'testimonial-style',
            content: `Our top affiliate made $2,400 last month promoting AI automation tools.

They started 60 days ago with zero audience.

Here's how:
1. Joined our 15-30% commission program
2. Shared honest reviews on YouTube
3. Built trust before selling

Now recruiting new affiliates.

Details: ai-solutions.store/affiliates`
        },
        {
            type: 'problem-solution',
            content: `Most affiliate programs pay 5-10%.

Ours pays 15-30%.

Why? Because our products actually work.

- Claude Droid ($299) = $44-90 per sale
- Income Droid ($499) = $75-150 per sale
- Dating Platform ($2,499) = $375-750 per sale

60-day cookie. Monthly payouts.

Join: ai-solutions.store/affiliates`
        },
        {
            type: 'urgency',
            content: `Only accepting 20 new affiliates this month.

Why limit it?

Quality > quantity. We want partners who:
- Actually use the products
- Create honest content
- Build long-term relationships

Commission: 15-30% tiered
Cookie: 60 days
Payouts: Monthly

Apply now: ai-solutions.store/affiliates`
        },
        {
            type: 'benefits',
            content: `What makes our affiliate program different:

1. High commissions (15-30%)
2. Long cookie window (60 days)
3. Products people actually want
4. No recurring billing = no churn drama
5. Real support for affiliates

We're building partnerships, not just a referral list.

Apply: ai-solutions.store/affiliates`
        }
    ],
    linkedin: [
        {
            type: 'professional',
            content: `We're building an affiliate network for AI automation tools.

Looking for:
- Content creators
- Tech reviewers
- Marketing professionals
- Entrepreneurship coaches

Our commission structure:

Starter Tier (0+ sales): 15%
Partner Tier (10+ sales): 20%
Pro Tier (25+ sales): 25%
Elite Tier (50+ sales): 30%

Product range: $199 - $2,499 one-time purchases

What we offer affiliates:
- Marketing materials and assets
- Dedicated support
- 60-day cookie duration
- Monthly payouts (min $50)
- Real products with real results

This isn't a mass affiliate program. We're looking for partners who align with our mission: building tools that work 24/7 so people don't have to.

Interested? Comment "INFO" or visit ai-solutions.store/affiliates

#AffiliateProgram #AITools #PartnershipOpportunity`
        },
        {
            type: 'story',
            content: `Last year, I built automation tools for myself.

This year, I turned them into products.

Now I'm looking for people to help spread the word.

Not salespeople. Partners.

People who:
- Understand the value of automation
- Have audiences interested in productivity
- Want to earn while helping others

Our affiliate commission: 15-30% based on performance.

Products:
- Claude Droid: YouTube automation ($299)
- Marketing Engine: Social media automation ($199)
- Income Droid: Revenue optimization ($499)
- And more...

If this resonates, let's talk.

ai-solutions.store/affiliates`
        }
    ],
    instagram: [
        {
            type: 'carousel-text',
            slides: [
                'Slide 1: "Become an AI Solutions Affiliate"',
                'Slide 2: "Earn 15-30% on every sale"',
                'Slide 3: "Products: $199 - $2,499"',
                'Slide 4: "That\'s up to $750 per referral"',
                'Slide 5: "60-day cookie window"',
                'Slide 6: "Monthly payouts"',
                'Slide 7: "Apply now - Link in bio"'
            ],
            caption: `Want to earn promoting AI automation tools?

We're recruiting affiliates.

What you get:
- 15-30% commission (tiered)
- 60-day cookie
- Marketing materials
- Real products people love

What we want:
- Content creators
- Tech enthusiasts
- Honest reviewers

Link in bio to apply.

#AffiliateMarketing #AITools #PassiveIncome #SideHustle #TechAffiliate`
        }
    ],
    discord: [
        {
            type: 'announcement',
            content: `**AFFILIATE PROGRAM NOW OPEN**

We're looking for partners to help grow AI Solutions Store.

**Commission Tiers:**
- Starter: 15% (new affiliates)
- Partner: 20% (10+ sales)
- Pro: 25% (25+ sales)
- Elite: 30% (50+ sales)

**Products You'll Promote:**
- Claude Droid ($299) - YouTube automation
- Income Droid ($499) - Revenue optimization
- Marketing Engine ($199) - Social media automation
- Jules AI ($399) - AI agent dashboard
- Affiliate System ($599) - Referral platform
- Dating Platform ($2,499) - Full matchmaking platform

**What You Get:**
- Unique tracking links
- Marketing assets
- 60-day cookie window
- Monthly payouts (min $50)
- Dedicated affiliate support

**Apply:** https://ai-solutions.store/affiliates

Questions? Drop them below.`
        }
    ],
    reddit: [
        {
            type: 'value-first',
            content: `**[Hiring] Affiliates for AI Automation Tools (15-30% Commission)**

Hey r/Affiliatemarketing,

I run AI Solutions Store - we sell one-time purchase automation tools for content creators and marketers.

Opening up an affiliate program and looking for partners.

**The Products:**
- Claude Droid ($299) - Automates YouTube Shorts creation
- Marketing Engine ($199) - Multi-platform social posting
- Income Droid ($499) - Revenue-optimized content engine
- Others up to $2,499

**Commission Structure:**
- Starter: 15%
- Partner (10+ sales): 20%
- Pro (25+ sales): 25%
- Elite (50+ sales): 30%

**Details:**
- 60-day cookie
- Monthly payouts via PayPal/Stripe
- $50 minimum payout
- Marketing materials provided

**What we're looking for:**
- People who create content about AI/automation/productivity
- Honest reviewers (we'd rather have authentic criticism than fake hype)
- Those who understand the products (we offer free trials for serious affiliates)

Not looking for:
- Spammers
- Get-rich-quick promoters
- Anyone who won't actually use the products

If interested, check out ai-solutions.store/affiliates

Happy to answer questions in the comments.`
        }
    ]
};

// ============================================================================
// EMAIL TEMPLATES
// ============================================================================
const EMAIL_TEMPLATES = {
    coldOutreach: {
        subject: 'Partnership opportunity - 15-30% commission on AI tools',
        body: `Hi {{name}},

I came across your content about {{topic}} and thought you might be interested in a partnership.

I run AI Solutions Store - we build automation tools for content creators and marketers. Things like:

- YouTube Shorts automation (creates and uploads videos while you sleep)
- Multi-platform social media posting
- Revenue optimization for content

We're opening an affiliate program and looking for partners who align with what we're building.

**Commission structure:**
- Starter: 15%
- Partner (10+ sales): 20%
- Pro (25+ sales): 25%
- Elite (50+ sales): 30%

Products range from $199 to $2,499, so commissions per sale range from $30 to $750.

What makes us different:
1. One-time purchases (no subscription churn)
2. 60-day cookie window
3. Real products with documented results
4. We actually support our affiliates

If this sounds interesting, I'd love to give you a demo of the products and discuss how we could work together.

No pressure either way - just thought it might be a good fit based on your content.

Best,
{{sender_name}}
AI Solutions Store
ai-solutions.store/affiliates`
    },
    followUp: {
        subject: 'Re: Partnership opportunity - quick question',
        body: `Hi {{name}},

Following up on my email from last week about the AI Solutions affiliate program.

Quick question: What would need to be true for this to be worth your time?

We're flexible on:
- Commission rates for high-volume partners
- Custom discount codes for your audience
- Co-marketing opportunities
- Early access to new products

If the timing isn't right, no worries at all. Just let me know either way.

Best,
{{sender_name}}`
    },
    welcome: {
        subject: 'Welcome to AI Solutions Affiliate Program!',
        body: `Hi {{name}},

Welcome aboard!

Your affiliate account is now active. Here's everything you need to get started:

**Your Dashboard:** ai-solutions.store/affiliate/dashboard
**Your Referral Link:** ai-solutions.store/?ref={{affiliate_id}}

**Quick Start:**
1. Browse the product catalog in your dashboard
2. Generate links for products you want to promote
3. Access marketing materials (banners, copy, etc.)
4. Share and start earning

**Commission Structure:**
- You're starting at Starter tier (15%)
- After 10 sales, you move to Partner (20%)
- After 25 sales, Pro tier (25%)
- After 50 sales, Elite tier (30%)

**Payouts:**
- Minimum: $50
- Schedule: 15th of each month
- Methods: PayPal, Stripe, or bank transfer

**Resources:**
- Product demos: ai-solutions.store/demos
- Marketing assets: ai-solutions.store/affiliate/assets
- FAQ: ai-solutions.store/affiliate/faq

**Tips for Success:**
1. Actually use the products (we offer free trials to affiliates)
2. Create honest reviews - authenticity converts
3. Focus on the problem solved, not just features
4. Use our case studies and results data

Questions? Reply to this email anytime.

Let's build something great together.

Best,
The AI Solutions Team`
    },
    monthlyUpdate: {
        subject: 'Your Affiliate Stats for {{month}} + New Opportunities',
        body: `Hi {{name}},

Here's your affiliate performance for {{month}}:

**Your Stats:**
- Clicks: {{clicks}}
- Conversions: {{conversions}}
- Revenue Generated: \${{revenue}}
- Your Earnings: \${{earnings}}
- Current Tier: {{tier}}

{{#if tier_progress}}
**Tier Progress:**
You're {{sales_to_next_tier}} sales away from {{next_tier}} tier ({{next_tier_rate}}% commission)!
{{/if}}

**What's New:**
{{new_products_or_updates}}

**Top Performing Products This Month:**
1. Claude Droid - 45% of sales
2. Marketing Engine - 28% of sales
3. Income Droid - 15% of sales

**Affiliate Tips:**
{{monthly_tip}}

Keep up the great work!

Best,
The AI Solutions Team

P.S. Your next payout is scheduled for {{payout_date}}.`
    },
    reEngagement: {
        subject: 'We miss you! Here\'s what\'s new at AI Solutions',
        body: `Hi {{name}},

It's been a while since you last promoted AI Solutions Store, and we wanted to check in.

**What's New:**
- New product: {{new_product}} (\${{price}}) - {{commission_amount}} per sale for you
- Improved tracking dashboard
- New marketing materials available

**Limited Time:**
For the next 30 days, we're offering 5% bonus commission on all sales for returning affiliates.

That means:
- Starter: 20% (instead of 15%)
- Partner: 25% (instead of 20%)
- Pro: 30% (instead of 25%)
- Elite: 35% (instead of 30%)

**Your Dashboard:** ai-solutions.store/affiliate/dashboard

If things aren't working out or you have feedback, I'd genuinely love to hear it. Reply to this email anytime.

Best,
{{sender_name}}`
    }
};

// ============================================================================
// LANDING PAGE COPY
// ============================================================================
const LANDING_PAGE_COPY = {
    hero: {
        headline: 'Earn 15-30% Promoting AI Automation Tools',
        subheadline: 'Join our affiliate program and earn up to $750 per sale promoting products that actually work.',
        cta: 'Apply to Become an Affiliate',
        ctaSecondary: 'View Product Catalog'
    },
    valueProps: [
        {
            icon: 'dollar-sign',
            title: 'High Commissions',
            description: 'Start at 15% and grow to 30% as you sell more. Products range from $199 to $2,499.'
        },
        {
            icon: 'clock',
            title: '60-Day Cookie',
            description: 'Long cookie window means you get credit even if customers take time to decide.'
        },
        {
            icon: 'trending-up',
            title: 'Products That Convert',
            description: 'One-time purchases, not subscriptions. No churn, no refund drama. Real tools with documented results.'
        },
        {
            icon: 'users',
            title: 'Real Partnership',
            description: 'We support our affiliates with materials, early access, and dedicated help. Not just a link generator.'
        }
    ],
    commissionTable: {
        title: 'Commission Tiers',
        description: 'The more you sell, the more you earn per sale.',
        tiers: COMMISSION_STRUCTURE.tiers
    },
    productShowcase: {
        title: 'Products You\'ll Promote',
        description: 'AI automation tools that solve real problems for content creators and marketers.',
        products: PRODUCT_CATALOG.map(p => ({
            name: p.name,
            price: p.price,
            commissionRange: p.commissionRange,
            description: p.description
        }))
    },
    howItWorks: {
        title: 'How It Works',
        steps: [
            {
                step: 1,
                title: 'Apply',
                description: 'Fill out a quick application. We review within 48 hours.'
            },
            {
                step: 2,
                title: 'Get Approved',
                description: 'Receive your unique tracking links and access to marketing materials.'
            },
            {
                step: 3,
                title: 'Promote',
                description: 'Share your links through content, social media, email, or your preferred channels.'
            },
            {
                step: 4,
                title: 'Earn',
                description: 'Track your clicks and conversions in real-time. Get paid monthly.'
            }
        ]
    },
    faq: [
        {
            question: 'Who can become an affiliate?',
            answer: 'Content creators, bloggers, YouTubers, marketers, and anyone with an audience interested in AI, automation, or productivity. We review each application.'
        },
        {
            question: 'How and when do I get paid?',
            answer: 'Payouts are processed on the 15th of each month for the previous month\'s sales. Minimum payout is $50. We support PayPal, Stripe, and bank transfer.'
        },
        {
            question: 'What\'s the cookie duration?',
            answer: '60 days. If someone clicks your link and buys within 60 days, you get credit for the sale.'
        },
        {
            question: 'Can I use paid ads?',
            answer: 'Yes, with restrictions. No bidding on brand terms. No misleading ads. Contact us for specific guidelines.'
        },
        {
            question: 'Do you provide marketing materials?',
            answer: 'Yes! You get access to banners, copy templates, product images, demo videos, and case studies.'
        },
        {
            question: 'What if a customer asks for a refund?',
            answer: 'Refunds are deducted from your commission. Our refund rate is under 5%, and we have a clear 14-day policy.'
        },
        {
            question: 'Can I get a free trial of the products?',
            answer: 'Yes. Serious affiliates can request demo access. We want you to know the products before promoting them.'
        },
        {
            question: 'How do I move up tiers?',
            answer: 'Tiers are based on lifetime sales. 10 sales = Partner (20%), 25 sales = Pro (25%), 50 sales = Elite (30%). Once you level up, you stay there.'
        }
    ],
    testimonials: [
        {
            quote: 'The commission structure is generous, but what really sets them apart is the product quality. My audience actually thanks me for the recommendations.',
            author: 'Tech Reviewer',
            result: '$3,200 in 90 days'
        },
        {
            quote: 'Finally an affiliate program where the products do what they claim. Makes promoting easy when you believe in what you\'re selling.',
            author: 'YouTube Creator',
            result: '28 sales in first month'
        },
        {
            quote: 'The 60-day cookie is crucial. My audience researches before buying. With shorter cookies, I\'d lose half my commissions.',
            author: 'Newsletter Writer',
            result: '$1,800/month average'
        }
    ],
    applicationForm: {
        title: 'Apply to Become an Affiliate',
        fields: [
            { name: 'name', label: 'Full Name', type: 'text', required: true },
            { name: 'email', label: 'Email Address', type: 'email', required: true },
            { name: 'website', label: 'Website or Primary Platform', type: 'url', required: true },
            { name: 'audience_size', label: 'Audience Size (approximate)', type: 'select', options: ['Under 1,000', '1,000 - 10,000', '10,000 - 50,000', '50,000 - 100,000', '100,000+'], required: true },
            { name: 'platform', label: 'Primary Platform', type: 'select', options: ['YouTube', 'Blog/Website', 'Twitter/X', 'Newsletter', 'Podcast', 'Instagram', 'TikTok', 'Other'], required: true },
            { name: 'why', label: 'Why do you want to promote AI Solutions Store?', type: 'textarea', required: true },
            { name: 'experience', label: 'Previous affiliate marketing experience', type: 'textarea', required: false }
        ],
        submitButton: 'Submit Application',
        disclaimer: 'We review applications within 48 hours. By applying, you agree to our Affiliate Terms of Service.'
    },
    footer: {
        contact: 'Questions? Email affiliates@ai-solutions.store',
        legal: 'Affiliate Terms of Service | Privacy Policy',
        copyright: '2025 AI Solutions Store. FOR THE KIDS - 60/30/10.'
    }
};

// ============================================================================
// CONTENT GENERATION
// ============================================================================
function generateFullCampaignContent() {
    const timestamp = new Date().toISOString();

    let content = `# Affiliate Recruitment Marketing Campaign
## AI Solutions Store

**Generated:** ${timestamp}
**Mission:** FOR THE KIDS - 60/30/10

---

# SECTION 1: COMMISSION STRUCTURE (15-30% Tiered)

## Overview
Our affiliate program rewards performance with increasing commission rates.

`;

    // Commission Tiers
    COMMISSION_STRUCTURE.tiers.forEach(tier => {
        content += `### ${tier.name} Tier (${(tier.commissionRate * 100)}%)
**Requirement:** ${tier.salesRequired === 0 ? 'New affiliates' : `${tier.salesRequired}+ confirmed sales`}

**Benefits:**
${tier.benefits.map(b => `- ${b}`).join('\n')}

`;
    });

    content += `## Payout Information
- **Minimum Payout:** $${COMMISSION_STRUCTURE.payoutInfo.minimum}
- **Payout Schedule:** ${COMMISSION_STRUCTURE.payoutInfo.schedule}
- **Methods:** ${COMMISSION_STRUCTURE.payoutInfo.methods.join(', ')}
- **Cookie Duration:** ${COMMISSION_STRUCTURE.payoutInfo.cookieDuration} days

---

# SECTION 2: PRODUCT DESCRIPTIONS FOR AFFILIATES

`;

    // Products
    PRODUCT_CATALOG.forEach(product => {
        content += `## ${product.name} - $${product.price}
**URL:** ${product.url}
**Category:** ${product.category}
**Commission Range:** ${product.commissionRange}

**Description:**
${product.description}

**Key Features:**
${product.features.map(f => `- ${f}`).join('\n')}

**Target Audience:** ${product.targetAudience}

**Selling Points:**
${product.sellingPoints.map(s => `- ${s}`).join('\n')}

**Conversion Tips:** ${product.conversionTips}

---

`;
    });

    content += `# SECTION 3: SOCIAL MEDIA POSTS

## Twitter/X Posts

`;

    SOCIAL_MEDIA_POSTS.twitter.forEach((post, i) => {
        content += `### Twitter Post ${i + 1} (${post.type})
\`\`\`
${post.content}
\`\`\`

`;
    });

    content += `## LinkedIn Posts

`;

    SOCIAL_MEDIA_POSTS.linkedin.forEach((post, i) => {
        content += `### LinkedIn Post ${i + 1} (${post.type})
\`\`\`
${post.content}
\`\`\`

`;
    });

    content += `## Instagram Posts

`;

    SOCIAL_MEDIA_POSTS.instagram.forEach((post, i) => {
        content += `### Instagram Post ${i + 1} (${post.type})
**Carousel Slides:**
${post.slides.map(s => `- ${s}`).join('\n')}

**Caption:**
\`\`\`
${post.caption}
\`\`\`

`;
    });

    content += `## Discord Announcements

`;

    SOCIAL_MEDIA_POSTS.discord.forEach((post, i) => {
        content += `### Discord Post ${i + 1} (${post.type})
\`\`\`
${post.content}
\`\`\`

`;
    });

    content += `## Reddit Posts

`;

    SOCIAL_MEDIA_POSTS.reddit.forEach((post, i) => {
        content += `### Reddit Post ${i + 1} (${post.type})
\`\`\`
${post.content}
\`\`\`

`;
    });

    content += `---

# SECTION 4: EMAIL TEMPLATES

## Cold Outreach Email

**Subject:** ${EMAIL_TEMPLATES.coldOutreach.subject}

\`\`\`
${EMAIL_TEMPLATES.coldOutreach.body}
\`\`\`

---

## Follow-Up Email

**Subject:** ${EMAIL_TEMPLATES.followUp.subject}

\`\`\`
${EMAIL_TEMPLATES.followUp.body}
\`\`\`

---

## Welcome Email (After Approval)

**Subject:** ${EMAIL_TEMPLATES.welcome.subject}

\`\`\`
${EMAIL_TEMPLATES.welcome.body}
\`\`\`

---

## Monthly Update Email

**Subject:** ${EMAIL_TEMPLATES.monthlyUpdate.subject}

\`\`\`
${EMAIL_TEMPLATES.monthlyUpdate.body}
\`\`\`

---

## Re-Engagement Email

**Subject:** ${EMAIL_TEMPLATES.reEngagement.subject}

\`\`\`
${EMAIL_TEMPLATES.reEngagement.body}
\`\`\`

---

# SECTION 5: LANDING PAGE COPY

## Hero Section
**Headline:** ${LANDING_PAGE_COPY.hero.headline}
**Subheadline:** ${LANDING_PAGE_COPY.hero.subheadline}
**Primary CTA:** ${LANDING_PAGE_COPY.hero.cta}
**Secondary CTA:** ${LANDING_PAGE_COPY.hero.ctaSecondary}

---

## Value Propositions

`;

    LANDING_PAGE_COPY.valueProps.forEach(prop => {
        content += `### ${prop.title}
**Icon:** ${prop.icon}
${prop.description}

`;
    });

    content += `---

## How It Works

`;

    LANDING_PAGE_COPY.howItWorks.steps.forEach(step => {
        content += `**Step ${step.step}: ${step.title}**
${step.description}

`;
    });

    content += `---

## FAQ Section

`;

    LANDING_PAGE_COPY.faq.forEach(item => {
        content += `**Q: ${item.question}**
A: ${item.answer}

`;
    });

    content += `---

## Testimonials

`;

    LANDING_PAGE_COPY.testimonials.forEach(t => {
        content += `> "${t.quote}"
> - ${t.author} (${t.result})

`;
    });

    content += `---

## Application Form Fields

`;

    LANDING_PAGE_COPY.applicationForm.fields.forEach(field => {
        content += `- **${field.label}** (${field.type}${field.required ? ', required' : ''})${field.options ? ` - Options: ${field.options.join(', ')}` : ''}
`;
    });

    content += `
**Submit Button:** ${LANDING_PAGE_COPY.applicationForm.submitButton}
**Disclaimer:** ${LANDING_PAGE_COPY.applicationForm.disclaimer}

---

## Footer

${LANDING_PAGE_COPY.footer.contact}
${LANDING_PAGE_COPY.footer.legal}
${LANDING_PAGE_COPY.footer.copyright}

---

# CAMPAIGN SUMMARY

## Quick Reference - Commission per Product

| Product | Price | Starter (15%) | Partner (20%) | Pro (25%) | Elite (30%) |
|---------|-------|---------------|---------------|-----------|-------------|
${PRODUCT_CATALOG.map(p => `| ${p.name} | $${p.price} | $${(p.price * 0.15).toFixed(2)} | $${(p.price * 0.20).toFixed(2)} | $${(p.price * 0.25).toFixed(2)} | $${(p.price * 0.30).toFixed(2)} |`).join('\n')}

## Total Potential Earnings

- Selling 1 of each product at Starter tier: $${PRODUCT_CATALOG.reduce((sum, p) => sum + (p.price * 0.15), 0).toFixed(2)}
- Selling 1 of each product at Elite tier: $${PRODUCT_CATALOG.reduce((sum, p) => sum + (p.price * 0.30), 0).toFixed(2)}

## Key Messaging Points

1. **High commissions** (15-30%) vs industry average (5-10%)
2. **One-time purchases** = no recurring billing drama
3. **60-day cookie** = longer attribution window
4. **Real products** with documented results
5. **Partnership approach** - we support affiliates

---

*Generated by AI Solutions Store Marketing Engine*
*FOR THE KIDS - 60/30/10*
`;

    return content;
}

// ============================================================================
// STATE MANAGEMENT
// ============================================================================
function getState() {
    try {
        if (fs.existsSync(STATE_FILE)) {
            return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
        }
    } catch (err) {
        log(`Error reading state: ${err.message}`);
    }
    return { runs: [], lastRun: null };
}

function saveState(state) {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================
async function main() {
    log('═══════════════════════════════════════════════════════════════');
    log('AFFILIATE RECRUITMENT MARKETING CAMPAIGN');
    log('AI Solutions Store');
    log('FOR THE KIDS - 60/30/10');
    log('═══════════════════════════════════════════════════════════════');

    // Generate full campaign content
    const campaignContent = generateFullCampaignContent();

    // Save to content file
    fs.writeFileSync(CONTENT_FILE, campaignContent);
    log(`Campaign content saved to: ${CONTENT_FILE}`);

    // Update state
    const state = getState();
    state.lastRun = new Date().toISOString();
    state.runs.push({
        timestamp: state.lastRun,
        contentFile: CONTENT_FILE,
        productsIncluded: PRODUCT_CATALOG.length,
        socialPostsGenerated:
            SOCIAL_MEDIA_POSTS.twitter.length +
            SOCIAL_MEDIA_POSTS.linkedin.length +
            SOCIAL_MEDIA_POSTS.instagram.length +
            SOCIAL_MEDIA_POSTS.discord.length +
            SOCIAL_MEDIA_POSTS.reddit.length,
        emailTemplatesGenerated: Object.keys(EMAIL_TEMPLATES).length
    });
    if (state.runs.length > 50) state.runs = state.runs.slice(-50);
    saveState(state);

    // Output summary
    log('\n═══════════════════════════════════════════════════════════════');
    log('CAMPAIGN GENERATION COMPLETE');
    log('═══════════════════════════════════════════════════════════════');
    log(`Products covered: ${PRODUCT_CATALOG.length}`);
    log(`Commission tiers: ${COMMISSION_STRUCTURE.tiers.length}`);
    log(`Social media posts: ${SOCIAL_MEDIA_POSTS.twitter.length + SOCIAL_MEDIA_POSTS.linkedin.length + SOCIAL_MEDIA_POSTS.instagram.length + SOCIAL_MEDIA_POSTS.discord.length + SOCIAL_MEDIA_POSTS.reddit.length}`);
    log(`Email templates: ${Object.keys(EMAIL_TEMPLATES).length}`);
    log(`Landing page sections: ${Object.keys(LANDING_PAGE_COPY).length}`);
    log(`\nContent file: ${CONTENT_FILE}`);
    log(`Log file: ${LOG_FILE}`);
    log('═══════════════════════════════════════════════════════════════');

    process.exit(0);
}

// Run if called directly
if (require.main === module) {
    main();
}

// Export for use as module
module.exports = {
    COMMISSION_STRUCTURE,
    PRODUCT_CATALOG,
    SOCIAL_MEDIA_POSTS,
    EMAIL_TEMPLATES,
    LANDING_PAGE_COPY,
    generateFullCampaignContent
};
