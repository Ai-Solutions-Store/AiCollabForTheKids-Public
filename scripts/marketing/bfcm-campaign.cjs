/**
 * ============================================================================
 * BLACK FRIDAY / CYBER MONDAY CAMPAIGN AUTOMATION SYSTEM
 * AI Solutions Store - 40% OFF EVERYTHING
 * ============================================================================
 *
 * Generates comprehensive BFCM marketing content:
 * 1. Landing Page Copy
 * 2. Email Sequences (Teaser, Launch, Reminder, Last Chance)
 * 3. Social Media Posts (Twitter, LinkedIn, Discord, Instagram, TikTok)
 * 4. Ad Copy (Facebook, Google, Reddit)
 * 5. Bundle Deals
 *
 * Mission: FOR THE KIDS - Gospel V1.3 (60/30/10)
 * 40% OFF ALL PRODUCTS - Black Friday through Cyber Monday
 *
 * Usage:
 *   node bfcm-campaign.cjs --generate-all
 *   node bfcm-campaign.cjs --landing-page
 *   node bfcm-campaign.cjs --emails
 *   node bfcm-campaign.cjs --social
 *   node bfcm-campaign.cjs --ads
 *   node bfcm-campaign.cjs --bundles
 *
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
    // Promo Details
    discount: 40,
    promoCode: 'BFCM40',
    saleStart: 'Black Friday (November 29, 2024)',
    saleEnd: 'Cyber Monday (December 2, 2024)',

    // Store URLs
    storeUrl: 'https://ai-solutions.store',
    bfcmUrl: 'https://ai-solutions.store/bfcm',
    consultationUrl: 'https://ai-solutions.store/consultation',

    // Logging
    logsDir: 'C:\\AiCollabForTheKids\\logs',
    outputDir: 'C:\\AiCollabForTheKids\\logs\\bfcm-campaign',
    logFile: 'C:\\AiCollabForTheKids\\logs\\bfcm-campaign.log',

    // Branding
    brandColors: {
        primary: '#CC785C',     // Copper/rust
        secondary: '#078EFA',   // Blue
        accent: '#20808D',      // Teal
        dark: '#141413',        // Near black
        light: '#f9f9f9',       // Off white
        bfcm: '#FF0000'         // Red for urgency
    },

    // Gospel V1.3 compliance
    gospel: {
        charity: 60,
        infrastructure: 30,
        founder: 10
    }
};

// ============================================================================
// AI SOLUTIONS STORE PRODUCT CATALOG WITH BFCM PRICING
// ============================================================================

const PRODUCTS = {
    'claude-droid': {
        name: 'Claude Droid',
        originalPrice: 299,
        salePrice: Math.round(299 * 0.6),  // 40% off = $179
        description: 'Transform news into engaging YouTube Shorts automatically',
        shortDesc: 'YouTube Shorts Automation',
        icon: '🎬',
        url: 'https://ai-solutions.store/products/claude-droid',
        features: [
            'Automated news scraping from 10+ sources',
            'AI-powered video generation with Claude Opus 4.5',
            'TTS narration with ElevenLabs',
            'Auto-upload to YouTube',
            '60-second Shorts optimized for engagement'
        ],
        savings: 299 - Math.round(299 * 0.6)
    },
    'income-droid': {
        name: 'Income Droid',
        originalPrice: 499,
        salePrice: Math.round(499 * 0.6),  // 40% off = $299
        description: 'Generate 4 revenue-optimized videos daily on autopilot',
        shortDesc: 'Multi-Platform Revenue Engine',
        icon: '💰',
        url: 'https://ai-solutions.store/products/income-droid',
        features: [
            '4 videos per day, every day',
            'Niche-specific content generation',
            'Affiliate link integration',
            'Monetization tracking dashboard',
            'Hands-free passive income'
        ],
        savings: 499 - Math.round(499 * 0.6)
    },
    'marketing-engine': {
        name: 'Marketing Engine',
        originalPrice: 199,
        salePrice: Math.round(199 * 0.6),  // 40% off = $119
        description: '24/7 social media automation for maximum reach',
        shortDesc: '23-Platform Social Automation',
        icon: '📢',
        url: 'https://ai-solutions.store/products/marketing-engine',
        features: [
            'Auto-post to 23+ platforms',
            '4x daily content generation',
            'Engagement tracking',
            'Brand-safe AI content',
            'Scheduled posting calendar'
        ],
        savings: 199 - Math.round(199 * 0.6)
    },
    'jules-ai': {
        name: 'Jules AI',
        originalPrice: 399,
        salePrice: Math.round(399 * 0.6),  // 40% off = $239
        description: 'Your AI business director and command center',
        shortDesc: 'AI Business Dashboard',
        icon: '🤖',
        url: 'https://ai-solutions.store/products/jules-ai',
        features: [
            'Centralized business management',
            'Fleet orchestration for all droids',
            'Real-time analytics',
            'Gospel-compliant revenue tracking',
            'Web-based control panel'
        ],
        savings: 399 - Math.round(399 * 0.6)
    },
    'affiliate-system': {
        name: 'Affiliate System',
        originalPrice: 599,
        salePrice: Math.round(599 * 0.6),  // 40% off = $359
        description: 'Complete white-label affiliate platform',
        shortDesc: 'Affiliate Marketing Platform',
        icon: '🔗',
        url: 'https://ai-solutions.store/products/affiliate-system',
        features: [
            'Multi-tier commission structure',
            'Automated payouts',
            'Custom branding',
            'Analytics dashboard',
            'Built-in fraud protection'
        ],
        savings: 599 - Math.round(599 * 0.6)
    },
    'dating-platform': {
        name: 'Dating Platform',
        originalPrice: 2499,
        salePrice: Math.round(2499 * 0.6),  // 40% off = $1499
        description: 'Full anti-AI dating app source code',
        shortDesc: 'Dating App Source Code',
        icon: '💕',
        url: 'https://ai-solutions.store/products/dating-platform',
        features: [
            'Complete React + Node.js codebase',
            'Square payment integration',
            'FOSTA/SESTA compliant',
            'Age verification built-in',
            'Mobile-responsive design'
        ],
        savings: 2499 - Math.round(2499 * 0.6)
    }
};

// ============================================================================
// BFCM BUNDLE DEALS
// ============================================================================

const BUNDLES = {
    'automation-starter': {
        name: 'Automation Starter Bundle',
        icon: '🚀',
        products: ['marketing-engine', 'claude-droid'],
        originalTotal: 299 + 199,  // $498
        bundlePrice: Math.round((299 + 199) * 0.6) - 50,  // Extra $50 off bundle = $248
        savings: (299 + 199) - (Math.round((299 + 199) * 0.6) - 50),
        tagline: 'Perfect for content creators getting started with AI automation',
        description: 'Launch your automation journey with YouTube Shorts + 23-platform social media posting.',
        bestFor: ['Content Creators', 'Social Media Managers', 'Side Hustlers']
    },
    'revenue-machine': {
        name: 'Revenue Machine Bundle',
        icon: '💎',
        products: ['income-droid', 'jules-ai', 'marketing-engine'],
        originalTotal: 499 + 399 + 199,  // $1097
        bundlePrice: Math.round((499 + 399 + 199) * 0.6) - 100,  // Extra $100 off = $558
        savings: (499 + 399 + 199) - (Math.round((499 + 399 + 199) * 0.6) - 100),
        tagline: 'Build a complete passive income system',
        description: '4 videos daily + AI command center + cross-platform distribution. The ultimate revenue stack.',
        bestFor: ['Entrepreneurs', 'Digital Agencies', 'Passive Income Seekers']
    },
    'enterprise-complete': {
        name: 'Enterprise Complete Bundle',
        icon: '🏢',
        products: ['claude-droid', 'income-droid', 'marketing-engine', 'jules-ai', 'affiliate-system'],
        originalTotal: 299 + 499 + 199 + 399 + 599,  // $1995
        bundlePrice: Math.round((299 + 499 + 199 + 399 + 599) * 0.6) - 200,  // Extra $200 off = $997
        savings: (299 + 499 + 199 + 399 + 599) - (Math.round((299 + 499 + 199 + 399 + 599) * 0.6) - 200),
        tagline: 'Everything you need to run an AI-powered business',
        description: 'Complete automation suite: content, distribution, management, and affiliate program. The full stack.',
        bestFor: ['Agencies', 'Enterprise Teams', 'Serious Operators']
    }
};

// ============================================================================
// LOGGING UTILITY
// ============================================================================

function log(message, level = 'INFO') {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${level}] ${message}`;

    const colors = {
        INFO: '\x1b[36m',
        SUCCESS: '\x1b[32m',
        WARN: '\x1b[33m',
        ERROR: '\x1b[31m',
        RESET: '\x1b[0m'
    };

    console.log(`${colors[level] || colors.INFO}${logEntry}${colors.RESET}`);

    try {
        if (!fs.existsSync(CONFIG.logsDir)) {
            fs.mkdirSync(CONFIG.logsDir, { recursive: true });
        }
        fs.appendFileSync(CONFIG.logFile, logEntry + '\n');
    } catch (err) {
        // Silent fail for logging
    }
}

function ensureDirectories() {
    const dirs = [CONFIG.logsDir, CONFIG.outputDir];
    dirs.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            log(`Created directory: ${dir}`);
        }
    });
}

// ============================================================================
// 1. LANDING PAGE COPY
// ============================================================================

function generateLandingPageCopy() {
    const totalSavings = Object.values(PRODUCTS).reduce((sum, p) => sum + p.savings, 0);

    const landingPage = {
        meta: {
            title: 'Black Friday / Cyber Monday Sale - 40% OFF Everything | AI Solutions Store',
            description: 'Biggest sale of the year! 40% off all AI automation tools. Limited time only. FOR THE KIDS.',
            keywords: 'Black Friday, Cyber Monday, AI automation, sale, discount, Claude Droid, Income Droid'
        },

        hero: {
            headline: 'BLACK FRIDAY / CYBER MONDAY',
            subheadline: '40% OFF EVERYTHING',
            promoCode: CONFIG.promoCode,
            urgency: 'Sale ends Cyber Monday at Midnight!',
            cta: 'SHOP THE SALE',
            ctaUrl: CONFIG.bfcmUrl
        },

        valueProposition: {
            title: 'The Biggest AI Automation Sale of the Year',
            bullets: [
                '40% off every single product - no exceptions',
                'One-time purchases only - no subscriptions ever',
                'Lifetime updates included with every tool',
                'Same day access - start automating immediately',
                'FOR THE KIDS: 60% of every sale goes to verified pediatric charities'
            ]
        },

        countdown: {
            title: 'Time is Running Out',
            message: 'This sale ends when the clock hits zero. No extensions. No exceptions.',
            urgencyText: 'Once it\'s over, prices go back to normal.'
        },

        productsSection: {
            title: 'Every Product. 40% Off.',
            products: Object.entries(PRODUCTS).map(([key, product]) => ({
                key,
                name: product.name,
                icon: product.icon,
                description: product.shortDesc,
                originalPrice: product.originalPrice,
                salePrice: product.salePrice,
                savings: product.savings,
                url: product.url
            }))
        },

        bundlesSection: {
            title: 'EXCLUSIVE BUNDLE DEALS',
            subtitle: 'Stack the savings with our BFCM-only bundles',
            bundles: Object.entries(BUNDLES).map(([key, bundle]) => ({
                key,
                name: bundle.name,
                icon: bundle.icon,
                tagline: bundle.tagline,
                description: bundle.description,
                originalTotal: bundle.originalTotal,
                bundlePrice: bundle.bundlePrice,
                savings: bundle.savings,
                bestFor: bundle.bestFor,
                products: bundle.products.map(p => PRODUCTS[p].name)
            }))
        },

        socialProof: {
            title: 'Join Hundreds of Businesses Already Automating',
            stats: [
                { number: '1M+', label: 'Videos Generated' },
                { number: '50K+', label: 'Hours Saved' },
                { number: '500+', label: 'Active Users' },
                { number: '$2M+', label: 'Revenue Generated' }
            ]
        },

        guarantee: {
            title: '30-Day Money-Back Guarantee',
            message: 'Try any product risk-free. If it doesn\'t work for you, get a full refund. No questions asked.',
            subtext: 'We\'re that confident in our tools.'
        },

        faq: [
            {
                question: 'How long does the sale last?',
                answer: 'Black Friday through Cyber Monday only. Sale ends December 2, 2024 at 11:59 PM EST.'
            },
            {
                question: 'Can I combine discounts?',
                answer: 'The 40% discount applies to all products. Bundle deals include additional savings on top of that.'
            },
            {
                question: 'Are these really one-time purchases?',
                answer: 'Yes. No subscriptions, no monthly fees, no hidden costs. Pay once, own forever.'
            },
            {
                question: 'What does "FOR THE KIDS" mean?',
                answer: '60% of every sale goes directly to verified pediatric charities. This is Gospel V1.3 - immutable.'
            },
            {
                question: 'Do I get updates after purchase?',
                answer: 'Yes! Lifetime updates are included with every product. As we improve, you benefit.'
            }
        ],

        finalCta: {
            headline: 'Don\'t Miss This',
            message: 'This is our biggest sale of the year. 40% off everything. Limited time only.',
            buttonText: 'SHOP NOW - 40% OFF',
            buttonUrl: CONFIG.bfcmUrl,
            urgency: 'Sale ends Cyber Monday at Midnight!'
        },

        footer: {
            mission: 'FOR THE KIDS',
            gospel: 'Gospel V1.3: 60% Charity | 30% Infrastructure | 10% Founder',
            copyright: '2024 AI Solutions Store. Built with Claude Opus 4.5.'
        }
    };

    return landingPage;
}

// ============================================================================
// 2. EMAIL SEQUENCES
// ============================================================================

function generateEmailSequences() {
    const sequences = {
        teaser: [
            {
                name: 'teaser-1-week-before',
                subject: 'Something BIG is coming next Friday...',
                preheader: 'Mark your calendar. You don\'t want to miss this.',
                sendTime: '1 week before Black Friday',
                body: `Hey there,

I'm about to drop the biggest sale in AI Solutions Store history.

Next Friday. Black Friday.

I can't share the details yet, but here's what I CAN tell you:

- It's our lowest prices EVER
- Every single product is included
- There will be exclusive bundles you've never seen before
- It ends Cyber Monday. No extensions.

If you've been waiting for the right time to grab Claude Droid, Income Droid, Marketing Engine, or ANY of our tools...

This is it.

Mark your calendar: Friday, November 29th.

More details coming soon.

FOR THE KIDS,
AI Solutions Store Team

P.S. - Make sure you're on this list. You'll get early access.`
            },
            {
                name: 'teaser-3-days-before',
                subject: 'Reveal: Our Black Friday deal (40% OFF)',
                preheader: 'The biggest sale of the year. Here\'s what\'s coming.',
                sendTime: '3 days before Black Friday',
                body: `It's official.

BLACK FRIDAY / CYBER MONDAY 2024
40% OFF EVERYTHING

That's right. 40% off every single product in the store.

Here's what that means for you:

INDIVIDUAL PRODUCTS:
- Claude Droid: $299 -> $179 (Save $120)
- Income Droid: $499 -> $299 (Save $200)
- Marketing Engine: $199 -> $119 (Save $80)
- Jules AI: $399 -> $239 (Save $160)
- Affiliate System: $599 -> $359 (Save $240)
- Dating Platform: $2499 -> $1499 (Save $1000)

EXCLUSIVE BUNDLES (extra savings!):
- Automation Starter: $248 (Save $250)
- Revenue Machine: $558 (Save $539)
- Enterprise Complete: $997 (Save $998)

The sale starts Friday, November 29th at 12:00 AM EST.
It ends Cyber Monday, December 2nd at 11:59 PM EST.

No extensions. No exceptions.

I'll send you the link the moment it goes live.

FOR THE KIDS,
AI Solutions Store Team

P.S. - Set your alarm. Early birds get the best selection.`
            }
        ],

        launch: [
            {
                name: 'launch-live-now',
                subject: '🚨 IT\'S LIVE: 40% OFF EVERYTHING - Black Friday Sale',
                preheader: 'The sale is ON. 40% off every product. Go now.',
                sendTime: 'Black Friday 12:00 AM',
                body: `THE SALE IS LIVE.

BLACK FRIDAY 2024: 40% OFF EVERYTHING

Use code: BFCM40

Shop now: ${CONFIG.bfcmUrl}

Here's your quick reference:

💰 PRODUCTS ON SALE:
- Claude Droid: $179 (was $299)
- Income Droid: $299 (was $499)
- Marketing Engine: $119 (was $199)
- Jules AI: $239 (was $399)
- Affiliate System: $359 (was $599)
- Dating Platform: $1499 (was $2499)

🎁 EXCLUSIVE BUNDLES:
- Automation Starter: $248 (2 products, $250 saved)
- Revenue Machine: $558 (3 products, $539 saved)
- Enterprise Complete: $997 (5 products, $998 saved)

This is the lowest our prices will EVER be.

Sale ends Cyber Monday at midnight.

Go now: ${CONFIG.bfcmUrl}

FOR THE KIDS,
AI Solutions Store Team`
            },
            {
                name: 'launch-friday-afternoon',
                subject: 'Black Friday Update: What\'s selling fast',
                preheader: 'Popular picks are going quick. Here\'s what\'s hot.',
                sendTime: 'Black Friday 2:00 PM',
                body: `Quick update on the Black Friday sale:

WHAT'S SELLING FAST:

#1 - Income Droid ($299 - was $499)
Most popular product. 4 videos/day passive income machine.

#2 - Revenue Machine Bundle ($558)
Complete passive income stack. Best value.

#3 - Marketing Engine ($119 - was $199)
23-platform automation. Lowest price ever.

If any of these were on your list, don't wait.

We've never done 40% off before, and we won't do it again until next Black Friday.

Shop now: ${CONFIG.bfcmUrl}
Use code: BFCM40

Sale ends Cyber Monday at midnight.

FOR THE KIDS,
AI Solutions Store Team

P.S. - Remember: 60% of every sale goes to verified pediatric charities. Your purchase helps kids.`
            }
        ],

        reminder: [
            {
                name: 'reminder-saturday',
                subject: 'Weekend Reminder: 40% OFF ends Monday',
                preheader: 'Don\'t let this slip away. 48 hours left.',
                sendTime: 'Saturday 10:00 AM',
                body: `Quick weekend reminder:

Our 40% OFF Black Friday / Cyber Monday sale is still running.

But not for long.

SALE ENDS: Monday, December 2nd at 11:59 PM EST

That's 48 hours from now.

If you've been thinking about:
- Automating your YouTube content (Claude Droid - $179)
- Building passive income streams (Income Droid - $299)
- Scaling your social media (Marketing Engine - $119)
- Managing your AI fleet (Jules AI - $239)

Now is the time.

These prices won't exist again until next year.

Shop now: ${CONFIG.bfcmUrl}
Code: BFCM40

FOR THE KIDS,
AI Solutions Store Team`
            },
            {
                name: 'reminder-sunday',
                subject: 'Tomorrow it\'s over. 24 hours left on 40% OFF',
                preheader: 'Final day warning. Don\'t miss this.',
                sendTime: 'Sunday 6:00 PM',
                body: `Final warning.

24 HOURS LEFT on our Black Friday / Cyber Monday sale.

After tomorrow at midnight, prices go back to normal.

No extensions. No "one more day." No exceptions.

YOUR LAST CHANCE AT THESE PRICES:

Individual Products:
- Claude Droid: $179 (saves $120)
- Income Droid: $299 (saves $200)
- Marketing Engine: $119 (saves $80)
- Jules AI: $239 (saves $160)
- Affiliate System: $359 (saves $240)

Bundles (even more savings):
- Automation Starter: $248 (saves $250)
- Revenue Machine: $558 (saves $539)
- Enterprise Complete: $997 (saves $998)

This is it. Tomorrow, it's over.

Shop now: ${CONFIG.bfcmUrl}
Code: BFCM40

FOR THE KIDS,
AI Solutions Store Team`
            }
        ],

        lastChance: [
            {
                name: 'last-chance-morning',
                subject: '⏰ FINAL DAY: 40% OFF ends at midnight',
                preheader: 'Cyber Monday is HERE. Last chance for 40% off everything.',
                sendTime: 'Cyber Monday 9:00 AM',
                body: `CYBER MONDAY - FINAL DAY

The 40% OFF sale ends TODAY at midnight.

This is your last chance to grab:

BEST SELLERS:
1. Income Droid - $299 (was $499) - 4 videos/day autopilot
2. Claude Droid - $179 (was $299) - YouTube Shorts automation
3. Marketing Engine - $119 (was $199) - 23-platform posting

BEST VALUE:
Enterprise Complete Bundle - $997 (was $1995)
Get Claude Droid + Income Droid + Marketing Engine + Jules AI + Affiliate System
Save $998. That's 50% off.

After midnight tonight, these deals are GONE.

Shop now: ${CONFIG.bfcmUrl}
Code: BFCM40

FOR THE KIDS,
AI Solutions Store Team`
            },
            {
                name: 'last-chance-afternoon',
                subject: '6 hours left. This is really it.',
                preheader: 'The clock is ticking. 40% off ends tonight.',
                sendTime: 'Cyber Monday 6:00 PM',
                body: `6 HOURS LEFT.

At midnight tonight, the Black Friday / Cyber Monday sale ends.

40% off EVERYTHING goes away.

If you've been on the fence, this is your final call.

QUICK PICKS:
- Want content automation? Claude Droid - $179
- Want passive income? Income Droid - $299
- Want social media coverage? Marketing Engine - $119
- Want the full stack? Enterprise Bundle - $997

After tonight, you'll wait a full year for prices like these.

Don't wake up tomorrow with regret.

Shop now: ${CONFIG.bfcmUrl}
Code: BFCM40

FOR THE KIDS,
AI Solutions Store Team

P.S. - Every purchase helps kids. 60% goes to verified pediatric charities.`
            },
            {
                name: 'last-chance-final-hour',
                subject: '🚨 1 HOUR LEFT - 40% OFF ENDS NOW',
                preheader: 'FINAL HOUR. This is your absolute last chance.',
                sendTime: 'Cyber Monday 11:00 PM',
                body: `FINAL HOUR.

In 60 minutes, the 40% OFF sale is OVER.

This is not a drill.

At midnight, prices go back to normal. No extensions.

If you want:
- Claude Droid at $179 (instead of $299)
- Income Droid at $299 (instead of $499)
- Marketing Engine at $119 (instead of $199)
- The Enterprise Bundle at $997 (instead of $1995)

You need to act NOW.

${CONFIG.bfcmUrl}
Code: BFCM40

Last chance.

FOR THE KIDS,
AI Solutions Store Team`
            }
        ]
    };

    return sequences;
}

// ============================================================================
// 3. SOCIAL MEDIA POSTS
// ============================================================================

function generateSocialPosts() {
    const posts = {
        twitter: [
            {
                name: 'teaser-announcement',
                type: 'teaser',
                text: `Something big is coming Friday.

40% OFF everything at AI Solutions Store.

Every product. No exceptions.

Black Friday through Cyber Monday only.

Mark your calendar. You don't want to miss this.

${CONFIG.bfcmUrl}

#BlackFriday #CyberMonday #AIAutomation`
            },
            {
                name: 'launch-announcement',
                type: 'launch',
                text: `IT'S LIVE.

BLACK FRIDAY SALE: 40% OFF EVERYTHING

- Claude Droid: $179 (was $299)
- Income Droid: $299 (was $499)
- Marketing Engine: $119 (was $199)
- Jules AI: $239 (was $399)

Code: BFCM40

${CONFIG.bfcmUrl}

FOR THE KIDS.`
            },
            {
                name: 'bundle-highlight',
                type: 'promo',
                text: `BFCM BUNDLE DEAL:

Enterprise Complete Bundle
5 products. $997. Save $998.

Includes:
- Claude Droid
- Income Droid
- Marketing Engine
- Jules AI
- Affiliate System

Everything you need to run an AI-powered business.

${CONFIG.bfcmUrl}

#BlackFriday`
            },
            {
                name: 'countdown-24',
                type: 'urgency',
                text: `24 HOURS LEFT.

40% off everything at AI Solutions Store ends tomorrow at midnight.

This is our biggest sale of the year.

No extensions. No exceptions.

If you've been waiting, this is it.

${CONFIG.bfcmUrl}

Code: BFCM40`
            },
            {
                name: 'final-hour',
                type: 'urgency',
                text: `1 HOUR LEFT.

40% OFF sale ends at midnight.

Last chance:
- Claude Droid: $179
- Income Droid: $299
- Marketing Engine: $119

After tonight, prices go back to normal.

${CONFIG.bfcmUrl}

Don't miss it.`
            }
        ],

        linkedin: [
            {
                name: 'professional-announcement',
                type: 'launch',
                text: `Black Friday / Cyber Monday Sale at AI Solutions Store

40% OFF every AI automation tool.

For business owners who want to:
- Automate content creation
- Scale without hiring
- Build passive income streams
- Manage AI-powered workflows

Our tools are production-ready, battle-tested, and generating revenue right now.

Products on sale:
- Claude Droid (YouTube automation): $179 (was $299)
- Income Droid (multi-platform content): $299 (was $499)
- Marketing Engine (23-platform posting): $119 (was $199)
- Jules AI (business command center): $239 (was $399)
- Affiliate System (partner management): $359 (was $599)

One-time purchases. No subscriptions. Lifetime updates.

Sale ends Cyber Monday at midnight.

${CONFIG.bfcmUrl}

#BlackFriday #BusinessAutomation #AITools`
            },
            {
                name: 'roi-focused',
                type: 'promo',
                text: `The math on our Black Friday sale:

Marketing Engine at 40% off = $119

What it does: Posts to 23 platforms automatically, 4x daily.

Time saved: 15-20 hours/week on social media posting.

At $50/hour value = $750-1000/week in time savings.

ROI: Pays for itself in less than 1 day.

This is why our customers love automation.

And right now, every product is 40% off.

${CONFIG.bfcmUrl}

Code: BFCM40

#BusinessAutomation #ROI #BlackFriday`
            }
        ],

        discord: [
            {
                name: 'community-announcement',
                type: 'launch',
                text: `**BLACK FRIDAY / CYBER MONDAY SALE**

40% OFF EVERYTHING

**Individual Products:**
- Claude Droid: ~~$299~~ **$179**
- Income Droid: ~~$499~~ **$299**
- Marketing Engine: ~~$199~~ **$119**
- Jules AI: ~~$399~~ **$239**
- Affiliate System: ~~$599~~ **$359**
- Dating Platform: ~~$2499~~ **$1499**

**Exclusive Bundles:**
- Automation Starter (2 products): **$248** - Save $250
- Revenue Machine (3 products): **$558** - Save $539
- Enterprise Complete (5 products): **$997** - Save $998

**Code:** \`BFCM40\`
**Link:** ${CONFIG.bfcmUrl}

Sale ends Cyber Monday at midnight. No extensions.

*FOR THE KIDS - 60% of every sale goes to verified pediatric charities.*`
            }
        ],

        instagram: [
            {
                name: 'carousel-caption',
                type: 'launch',
                text: `BLACK FRIDAY SALE

40% OFF EVERYTHING at AI Solutions Store

Swipe to see every deal:

Slide 1: Claude Droid - $179 (was $299)
YouTube Shorts automation. 4 videos/day.

Slide 2: Income Droid - $299 (was $499)
Multi-platform passive income engine.

Slide 3: Marketing Engine - $119 (was $199)
Post to 23 platforms automatically.

Slide 4: Enterprise Bundle - $997 (was $1995)
Everything. Save $998.

Link in bio. Code: BFCM40

Sale ends Cyber Monday.

#BlackFriday #CyberMonday #AIAutomation #PassiveIncome #ContentCreator #ForTheKids`
            },
            {
                name: 'story-sequence',
                type: 'urgency',
                slides: [
                    'BLACK FRIDAY SALE - 40% OFF EVERYTHING',
                    'Claude Droid: $179 (was $299)',
                    'Income Droid: $299 (was $499)',
                    'Marketing Engine: $119 (was $199)',
                    'SWIPE UP - Code: BFCM40',
                    'Ends Cyber Monday!'
                ]
            }
        ],

        tiktok: [
            {
                name: 'hook-script',
                type: 'launch',
                text: `[HOOK]
"POV: You just discovered AI automation is 40% off"

[CONTENT]
Black Friday sale at AI Solutions Store.

Claude Droid - makes YouTube Shorts automatically. Was $299. Now $179.

Income Droid - 4 videos a day, passive income. Was $499. Now $299.

Marketing Engine - posts to 23 platforms for you. Was $199. Now $119.

[CTA]
Link in bio. Code BFCM40.

Sale ends Cyber Monday.

#BlackFriday #AIAutomation #PassiveIncome #ContentCreator #TechTok`
            }
        ],

        facebook: [
            {
                name: 'group-post',
                type: 'launch',
                text: `Hey everyone,

Quick announcement: We're running our biggest sale of the year.

BLACK FRIDAY / CYBER MONDAY
40% OFF EVERYTHING at AI Solutions Store

If you've been wanting to automate your content, social media, or build passive income streams, this is the time.

Products on sale:
- Claude Droid (YouTube Shorts automation): $179 (was $299)
- Income Droid (4 videos/day on autopilot): $299 (was $499)
- Marketing Engine (23-platform posting): $119 (was $199)
- Jules AI (AI business dashboard): $239 (was $399)
- Affiliate System: $359 (was $599)

We also have bundle deals with even more savings.

One-time purchases. No subscriptions. Lifetime updates.

Use code: BFCM40

${CONFIG.bfcmUrl}

Sale ends Cyber Monday at midnight.

FOR THE KIDS - 60% of every sale goes to verified pediatric charities.`
            }
        ]
    };

    return posts;
}

// ============================================================================
// 4. AD COPY
// ============================================================================

function generateAdCopy() {
    const ads = {
        facebook: [
            {
                name: 'conversion-main',
                type: 'conversion',
                headline: '40% OFF All AI Automation Tools',
                primaryText: `Black Friday / Cyber Monday Sale

Every product. 40% off. No exceptions.

- Claude Droid: Automate YouTube Shorts ($179, was $299)
- Income Droid: 4 videos/day passive income ($299, was $499)
                - Marketing Engine: Post to 23 platforms ($119, was $199)

One-time purchase. No subscriptions. Lifetime updates.

60% of every sale goes to verified pediatric charities.

Sale ends Cyber Monday.`,
                cta: 'Shop Now',
                linkDescription: 'AI Solutions Store - Black Friday Sale'
            },
            {
                name: 'retargeting-reminder',
                type: 'retargeting',
                headline: 'Still Thinking? 40% OFF Ends Soon',
                primaryText: `You checked out our AI automation tools.

Now they're 40% off.

The Black Friday sale ends Cyber Monday at midnight.

This is our lowest price of the year.

Don't miss it.`,
                cta: 'Shop Now',
                linkDescription: 'Complete your purchase - 40% OFF'
            },
            {
                name: 'bundle-focused',
                type: 'conversion',
                headline: 'Save $998 - Enterprise AI Bundle',
                primaryText: `The Enterprise Complete Bundle

5 AI automation tools for $997.

Includes:
- Claude Droid (YouTube automation)
- Income Droid (passive income engine)
- Marketing Engine (23-platform posting)
- Jules AI (command center)
- Affiliate System (partner management)

Original price: $1995
Black Friday price: $997

You save $998. That's 50% off.

One-time purchase. Lifetime access.`,
                cta: 'Get the Bundle',
                linkDescription: 'AI Solutions Store - Enterprise Bundle'
            }
        ],

        google: [
            {
                name: 'search-main',
                type: 'search',
                headlines: [
                    '40% OFF AI Automation Tools',
                    'Black Friday Sale - AI Solutions',
                    'Automate Content Creation',
                    'YouTube Shorts on Autopilot',
                    'No Subscriptions - One-Time Buy',
                    'Save $998 on Enterprise Bundle'
                ],
                descriptions: [
                    'Black Friday/Cyber Monday: 40% off every AI tool. Claude Droid, Income Droid, Marketing Engine. One-time purchase.',
                    'Automate YouTube Shorts, social media, passive income. Production-ready AI tools. 40% off through Cyber Monday.',
                    'AI automation sale ends Cyber Monday. Claude Droid $179. Income Droid $299. Marketing Engine $119. Shop now.'
                ],
                finalUrl: CONFIG.bfcmUrl
            },
            {
                name: 'display-banner',
                type: 'display',
                headlines: [
                    'BLACK FRIDAY: 40% OFF',
                    'AI Automation Sale',
                    'Ends Cyber Monday'
                ],
                descriptions: [
                    'Every AI tool 40% off. Claude Droid, Income Droid, Marketing Engine. One-time purchase. Shop now.',
                    'Automate content, social media, passive income. 40% off through Cyber Monday. No subscriptions.'
                ]
            }
        ],

        reddit: [
            {
                name: 'native-announcement',
                type: 'native',
                title: 'Launched a Black Friday sale - 40% off all AI automation tools',
                body: `Hey everyone,

Running a Black Friday/Cyber Monday sale at AI Solutions Store.

40% off everything:

**Products:**
- Claude Droid ($179, was $299) - Automates YouTube Shorts from news
- Income Droid ($299, was $499) - 4 revenue-optimized videos daily
- Marketing Engine ($119, was $199) - Posts to 23 platforms automatically
- Jules AI ($239, was $399) - AI business dashboard
- Affiliate System ($359, was $599) - White-label affiliate platform

**Bundles:**
- Automation Starter: $248 (save $250)
- Revenue Machine: $558 (save $539)
- Enterprise Complete: $997 (save $998)

One-time purchases. No subscriptions. Lifetime updates.

Also worth noting: 60% of every sale goes to verified pediatric charities (Gospel V1.3).

Sale ends Cyber Monday at midnight.

Link: ${CONFIG.bfcmUrl}
Code: BFCM40

Happy to answer questions.`
            }
        ]
    };

    return ads;
}

// ============================================================================
// 5. BUNDLE DEAL DESCRIPTIONS
// ============================================================================

function generateBundleDetails() {
    const bundleDetails = Object.entries(BUNDLES).map(([key, bundle]) => {
        const productsIncluded = bundle.products.map(pKey => ({
            name: PRODUCTS[pKey].name,
            originalPrice: PRODUCTS[pKey].originalPrice,
            salePrice: PRODUCTS[pKey].salePrice,
            description: PRODUCTS[pKey].shortDesc
        }));

        return {
            key,
            name: bundle.name,
            icon: bundle.icon,
            tagline: bundle.tagline,
            description: bundle.description,
            bestFor: bundle.bestFor,

            pricing: {
                originalTotal: bundle.originalTotal,
                bundlePrice: bundle.bundlePrice,
                savings: bundle.savings,
                discountPercent: Math.round((bundle.savings / bundle.originalTotal) * 100)
            },

            productsIncluded,

            salesCopy: {
                headline: `${bundle.name} - $${bundle.bundlePrice}`,
                subheadline: `Save $${bundle.savings} (${Math.round((bundle.savings / bundle.originalTotal) * 100)}% off)`,
                bulletPoints: [
                    `${bundle.products.length} production-ready AI tools`,
                    `Original value: $${bundle.originalTotal}`,
                    `Your price: $${bundle.bundlePrice}`,
                    `You save: $${bundle.savings}`,
                    'One-time purchase - no subscriptions',
                    'Lifetime updates included',
                    'FOR THE KIDS: 60% goes to charity'
                ],
                cta: `Get the ${bundle.name}`,
                urgency: 'Black Friday pricing ends Cyber Monday!'
            }
        };
    });

    return bundleDetails;
}

// ============================================================================
// SAVE TO FILES
// ============================================================================

function saveToFile(filename, content) {
    const filepath = path.join(CONFIG.outputDir, filename);
    fs.writeFileSync(filepath, content, 'utf8');
    log(`Saved: ${filepath}`);
    return filepath;
}

function generateAndSaveAll() {
    ensureDirectories();

    log('═══════════════════════════════════════════════════════════════');
    log('BLACK FRIDAY / CYBER MONDAY CAMPAIGN GENERATOR');
    log('40% OFF EVERYTHING - FOR THE KIDS');
    log('═══════════════════════════════════════════════════════════════');

    // 1. Landing Page Copy
    log('\n--- Generating Landing Page Copy ---');
    const landingPage = generateLandingPageCopy();
    saveToFile('01-landing-page-copy.json', JSON.stringify(landingPage, null, 2));

    // Generate markdown version
    let landingMd = `# BLACK FRIDAY / CYBER MONDAY LANDING PAGE COPY

## META
- Title: ${landingPage.meta.title}
- Description: ${landingPage.meta.description}
- Keywords: ${landingPage.meta.keywords}

## HERO SECTION
**Headline:** ${landingPage.hero.headline}
**Subheadline:** ${landingPage.hero.subheadline}
**Promo Code:** ${landingPage.hero.promoCode}
**Urgency:** ${landingPage.hero.urgency}
**CTA:** ${landingPage.hero.cta}

## VALUE PROPOSITION
**${landingPage.valueProposition.title}**
${landingPage.valueProposition.bullets.map(b => `- ${b}`).join('\n')}

## PRODUCTS (40% OFF)
${landingPage.productsSection.products.map(p => `
### ${p.icon} ${p.name}
- Original: $${p.originalPrice}
- Sale: **$${p.salePrice}**
- You Save: $${p.savings}
- ${p.description}
`).join('\n')}

## EXCLUSIVE BUNDLES
${landingPage.bundlesSection.bundles.map(b => `
### ${b.icon} ${b.name}
- Original: $${b.originalTotal}
- Bundle Price: **$${b.bundlePrice}**
- You Save: **$${b.savings}**
- ${b.tagline}
- Products: ${b.products.join(', ')}
- Best For: ${b.bestFor.join(', ')}
`).join('\n')}

## SOCIAL PROOF
${landingPage.socialProof.stats.map(s => `- **${s.number}** ${s.label}`).join('\n')}

## GUARANTEE
**${landingPage.guarantee.title}**
${landingPage.guarantee.message}

## FAQ
${landingPage.faq.map(f => `
**Q: ${f.question}**
A: ${f.answer}
`).join('\n')}

## FINAL CTA
**${landingPage.finalCta.headline}**
${landingPage.finalCta.message}
Button: ${landingPage.finalCta.buttonText}
${landingPage.finalCta.urgency}

---
*${landingPage.footer.mission} - ${landingPage.footer.gospel}*
`;
    saveToFile('01-landing-page-copy.md', landingMd);

    // 2. Email Sequences
    log('\n--- Generating Email Sequences ---');
    const emails = generateEmailSequences();
    saveToFile('02-email-sequences.json', JSON.stringify(emails, null, 2));

    let emailMd = `# BLACK FRIDAY / CYBER MONDAY EMAIL SEQUENCES

## TEASER EMAILS (Before Sale)
${emails.teaser.map(e => `
### ${e.name}
**Subject:** ${e.subject}
**Preheader:** ${e.preheader}
**Send Time:** ${e.sendTime}

\`\`\`
${e.body}
\`\`\`
`).join('\n---\n')}

## LAUNCH EMAILS (Black Friday)
${emails.launch.map(e => `
### ${e.name}
**Subject:** ${e.subject}
**Preheader:** ${e.preheader}
**Send Time:** ${e.sendTime}

\`\`\`
${e.body}
\`\`\`
`).join('\n---\n')}

## REMINDER EMAILS (Weekend)
${emails.reminder.map(e => `
### ${e.name}
**Subject:** ${e.subject}
**Preheader:** ${e.preheader}
**Send Time:** ${e.sendTime}

\`\`\`
${e.body}
\`\`\`
`).join('\n---\n')}

## LAST CHANCE EMAILS (Cyber Monday)
${emails.lastChance.map(e => `
### ${e.name}
**Subject:** ${e.subject}
**Preheader:** ${e.preheader}
**Send Time:** ${e.sendTime}

\`\`\`
${e.body}
\`\`\`
`).join('\n---\n')}

---
*FOR THE KIDS - Gospel V1.3 (60/30/10)*
`;
    saveToFile('02-email-sequences.md', emailMd);

    // 3. Social Media Posts
    log('\n--- Generating Social Media Posts ---');
    const social = generateSocialPosts();
    saveToFile('03-social-posts.json', JSON.stringify(social, null, 2));

    let socialMd = `# BLACK FRIDAY / CYBER MONDAY SOCIAL MEDIA POSTS

## TWITTER / X
${social.twitter.map(p => `
### ${p.name} (${p.type})
\`\`\`
${p.text}
\`\`\`
`).join('\n---\n')}

## LINKEDIN
${social.linkedin.map(p => `
### ${p.name} (${p.type})
\`\`\`
${p.text}
\`\`\`
`).join('\n---\n')}

## DISCORD
${social.discord.map(p => `
### ${p.name} (${p.type})
\`\`\`
${p.text}
\`\`\`
`).join('\n---\n')}

## INSTAGRAM
${social.instagram.map(p => {
    if (p.slides) {
        return `
### ${p.name} (${p.type})
**Story Slides:**
${p.slides.map((s, i) => `${i+1}. ${s}`).join('\n')}
`;
    }
    return `
### ${p.name} (${p.type})
\`\`\`
${p.text}
\`\`\`
`;
}).join('\n---\n')}

## TIKTOK
${social.tiktok.map(p => `
### ${p.name} (${p.type})
\`\`\`
${p.text}
\`\`\`
`).join('\n---\n')}

## FACEBOOK
${social.facebook.map(p => `
### ${p.name} (${p.type})
\`\`\`
${p.text}
\`\`\`
`).join('\n---\n')}

---
*FOR THE KIDS - Gospel V1.3 (60/30/10)*
`;
    saveToFile('03-social-posts.md', socialMd);

    // 4. Ad Copy
    log('\n--- Generating Ad Copy ---');
    const ads = generateAdCopy();
    saveToFile('04-ad-copy.json', JSON.stringify(ads, null, 2));

    let adMd = `# BLACK FRIDAY / CYBER MONDAY AD COPY

## FACEBOOK ADS
${ads.facebook.map(a => `
### ${a.name} (${a.type})
**Headline:** ${a.headline}
**Primary Text:**
\`\`\`
${a.primaryText}
\`\`\`
**CTA:** ${a.cta}
**Link Description:** ${a.linkDescription}
`).join('\n---\n')}

## GOOGLE ADS
${ads.google.map(a => {
    if (a.type === 'search') {
        return `
### ${a.name} (${a.type})
**Headlines:**
${a.headlines.map((h, i) => `${i+1}. ${h}`).join('\n')}

**Descriptions:**
${a.descriptions.map((d, i) => `${i+1}. ${d}`).join('\n')}

**Final URL:** ${a.finalUrl}
`;
    }
    return `
### ${a.name} (${a.type})
**Headlines:**
${a.headlines.map((h, i) => `${i+1}. ${h}`).join('\n')}

**Descriptions:**
${a.descriptions.map((d, i) => `${i+1}. ${d}`).join('\n')}
`;
}).join('\n---\n')}

## REDDIT ADS
${ads.reddit.map(a => `
### ${a.name} (${a.type})
**Title:** ${a.title}
**Body:**
\`\`\`
${a.body}
\`\`\`
`).join('\n---\n')}

---
*FOR THE KIDS - Gospel V1.3 (60/30/10)*
`;
    saveToFile('04-ad-copy.md', adMd);

    // 5. Bundle Deals
    log('\n--- Generating Bundle Deal Details ---');
    const bundles = generateBundleDetails();
    saveToFile('05-bundle-deals.json', JSON.stringify(bundles, null, 2));

    let bundleMd = `# BLACK FRIDAY / CYBER MONDAY BUNDLE DEALS

${bundles.map(b => `
## ${b.icon} ${b.name}

**${b.salesCopy.headline}**
*${b.salesCopy.subheadline}*

### Overview
${b.description}

**Best For:** ${b.bestFor.join(', ')}

### Pricing
- Original Total: $${b.pricing.originalTotal}
- Bundle Price: **$${b.pricing.bundlePrice}**
- You Save: **$${b.pricing.savings}** (${b.pricing.discountPercent}% off)

### Products Included
${b.productsIncluded.map(p => `
- **${p.name}** - ${p.description}
  - Original: $${p.originalPrice} | Sale: $${p.salePrice}
`).join('\n')}

### Sales Copy Bullets
${b.salesCopy.bulletPoints.map(bp => `- ${bp}`).join('\n')}

**CTA:** ${b.salesCopy.cta}
**Urgency:** ${b.salesCopy.urgency}

`).join('\n---\n')}

---
*FOR THE KIDS - Gospel V1.3 (60/30/10)*
`;
    saveToFile('05-bundle-deals.md', bundleMd);

    // Summary file
    log('\n--- Generating Campaign Summary ---');
    const summary = {
        campaign: 'Black Friday / Cyber Monday 2024',
        discount: '40% OFF Everything',
        promoCode: CONFIG.promoCode,
        dateRange: `${CONFIG.saleStart} - ${CONFIG.saleEnd}`,
        storeUrl: CONFIG.storeUrl,
        bfcmUrl: CONFIG.bfcmUrl,

        products: Object.entries(PRODUCTS).map(([key, p]) => ({
            name: p.name,
            original: p.originalPrice,
            sale: p.salePrice,
            savings: p.savings
        })),

        bundles: Object.entries(BUNDLES).map(([key, b]) => ({
            name: b.name,
            original: b.originalTotal,
            bundle: b.bundlePrice,
            savings: b.savings
        })),

        generatedFiles: [
            '01-landing-page-copy.json',
            '01-landing-page-copy.md',
            '02-email-sequences.json',
            '02-email-sequences.md',
            '03-social-posts.json',
            '03-social-posts.md',
            '04-ad-copy.json',
            '04-ad-copy.md',
            '05-bundle-deals.json',
            '05-bundle-deals.md'
        ],

        mission: 'FOR THE KIDS',
        gospel: 'V1.3 - 60% Charity | 30% Infrastructure | 10% Founder',
        generatedAt: new Date().toISOString()
    };
    saveToFile('00-campaign-summary.json', JSON.stringify(summary, null, 2));

    // Summary markdown
    let summaryMd = `# BLACK FRIDAY / CYBER MONDAY 2024 CAMPAIGN

## Campaign Details
- **Discount:** 40% OFF Everything
- **Promo Code:** ${CONFIG.promoCode}
- **Date Range:** ${CONFIG.saleStart} - ${CONFIG.saleEnd}
- **Store URL:** ${CONFIG.storeUrl}
- **BFCM URL:** ${CONFIG.bfcmUrl}

## Product Pricing

| Product | Original | Sale | Savings |
|---------|----------|------|---------|
${Object.entries(PRODUCTS).map(([k, p]) => `| ${p.name} | $${p.originalPrice} | $${p.salePrice} | $${p.savings} |`).join('\n')}

## Bundle Pricing

| Bundle | Original | Price | Savings |
|--------|----------|-------|---------|
${Object.entries(BUNDLES).map(([k, b]) => `| ${b.name} | $${b.originalTotal} | $${b.bundlePrice} | $${b.savings} |`).join('\n')}

## Generated Files
1. \`01-landing-page-copy.md\` - Landing page content and structure
2. \`02-email-sequences.md\` - Complete email campaign (10 emails)
3. \`03-social-posts.md\` - Social media posts for all platforms
4. \`04-ad-copy.md\` - Facebook, Google, and Reddit ad copy
5. \`05-bundle-deals.md\` - Detailed bundle descriptions and sales copy

## Email Schedule
1. **Teaser 1** - 1 week before (tease the sale)
2. **Teaser 2** - 3 days before (reveal 40% off)
3. **Launch 1** - Black Friday 12:00 AM (sale is live)
4. **Launch 2** - Black Friday 2:00 PM (what's selling)
5. **Reminder 1** - Saturday 10:00 AM (48 hours left)
6. **Reminder 2** - Sunday 6:00 PM (24 hours left)
7. **Last Chance 1** - Cyber Monday 9:00 AM (final day)
8. **Last Chance 2** - Cyber Monday 6:00 PM (6 hours left)
9. **Last Chance 3** - Cyber Monday 11:00 PM (1 hour left)

## Mission
**FOR THE KIDS**
Gospel V1.3: 60% Charity | 30% Infrastructure | 10% Founder

---
*Generated: ${new Date().toISOString()}*
`;
    saveToFile('00-campaign-summary.md', summaryMd);

    log('\n═══════════════════════════════════════════════════════════════');
    log('CAMPAIGN GENERATION COMPLETE', 'SUCCESS');
    log(`Output directory: ${CONFIG.outputDir}`);
    log('Files generated: 12');
    log('FOR THE KIDS. ALWAYS.', 'SUCCESS');
    log('═══════════════════════════════════════════════════════════════');

    return summary;
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
BLACK FRIDAY / CYBER MONDAY CAMPAIGN GENERATOR
AI Solutions Store | 40% OFF EVERYTHING | FOR THE KIDS
============================================================================

Usage:
  node bfcm-campaign.cjs [options]

Options:
  --help              Show this help message
  --generate-all      Generate all campaign content
  --landing-page      Generate landing page copy only
  --emails            Generate email sequences only
  --social            Generate social media posts only
  --ads               Generate ad copy only
  --bundles           Generate bundle deal details only

Output:
  All files saved to: ${CONFIG.outputDir}
  Log file: ${CONFIG.logFile}

Products on Sale (40% OFF):
  - Claude Droid: $299 -> $179 (Save $120)
  - Income Droid: $499 -> $299 (Save $200)
  - Marketing Engine: $199 -> $119 (Save $80)
  - Jules AI: $399 -> $239 (Save $160)
  - Affiliate System: $599 -> $359 (Save $240)
  - Dating Platform: $2499 -> $1499 (Save $1000)

Bundle Deals:
  - Automation Starter: $248 (Save $250)
  - Revenue Machine: $558 (Save $539)
  - Enterprise Complete: $997 (Save $998)

============================================================================
FOR THE KIDS. ALWAYS.
============================================================================
`);
}

async function main() {
    const args = parseArgs();

    console.log('');
    console.log('============================================================================');
    console.log('BLACK FRIDAY / CYBER MONDAY CAMPAIGN GENERATOR');
    console.log('AI Solutions Store | 40% OFF EVERYTHING | FOR THE KIDS');
    console.log('============================================================================');
    console.log('');

    if (args.help) {
        showHelp();
        return;
    }

    ensureDirectories();

    if (args['generate-all'] || Object.keys(args).length === 0) {
        generateAndSaveAll();
        return;
    }

    if (args['landing-page']) {
        log('Generating Landing Page Copy...');
        const landingPage = generateLandingPageCopy();
        saveToFile('01-landing-page-copy.json', JSON.stringify(landingPage, null, 2));
        log('Done!', 'SUCCESS');
    }

    if (args['emails']) {
        log('Generating Email Sequences...');
        const emails = generateEmailSequences();
        saveToFile('02-email-sequences.json', JSON.stringify(emails, null, 2));
        log('Done!', 'SUCCESS');
    }

    if (args['social']) {
        log('Generating Social Media Posts...');
        const social = generateSocialPosts();
        saveToFile('03-social-posts.json', JSON.stringify(social, null, 2));
        log('Done!', 'SUCCESS');
    }

    if (args['ads']) {
        log('Generating Ad Copy...');
        const ads = generateAdCopy();
        saveToFile('04-ad-copy.json', JSON.stringify(ads, null, 2));
        log('Done!', 'SUCCESS');
    }

    if (args['bundles']) {
        log('Generating Bundle Deal Details...');
        const bundles = generateBundleDetails();
        saveToFile('05-bundle-deals.json', JSON.stringify(bundles, null, 2));
        log('Done!', 'SUCCESS');
    }
}

// Run the script
main().catch(err => {
    log(`Fatal error: ${err.message}`, 'ERROR');
    process.exit(1);
});

// ============================================================================
// EXPORTS (for use as a module)
// ============================================================================

module.exports = {
    CONFIG,
    PRODUCTS,
    BUNDLES,
    generateLandingPageCopy,
    generateEmailSequences,
    generateSocialPosts,
    generateAdCopy,
    generateBundleDetails,
    generateAndSaveAll
};
