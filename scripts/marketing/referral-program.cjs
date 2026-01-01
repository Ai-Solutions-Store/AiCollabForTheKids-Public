/**
 * Referral Program Marketing Content Generator
 * Generates comprehensive referral program materials including:
 * - Landing page content
 * - Email templates for referrers
 * - Social share templates
 * - Reward tier descriptions
 * - Terms and conditions
 *
 * Commission: 20% referral commission
 *
 * FOR THE KIDS - 60/30/10
 */

const fs = require('fs');
const path = require('path');

const LOGS_DIR = 'C:\\AiCollabForTheKids\\logs';
const STATE_FILE = path.join(LOGS_DIR, 'referral-program-state.json');
const LOG_FILE = path.join(LOGS_DIR, 'referral-program.log');
const CONTENT_FILE = path.join(LOGS_DIR, 'referral-program-content.md');

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
// REFERRAL COMMISSION STRUCTURE (20% Flat Rate)
// ============================================================================
const REFERRAL_COMMISSION = {
    rate: 0.20,
    rateDisplay: '20%',
    description: 'Earn 20% of every purchase made by people you refer',
    cookieDuration: 90, // days
    payoutInfo: {
        minimum: 25,
        schedule: 'Monthly (1st of each month)',
        methods: ['PayPal', 'Stripe', 'Bank Transfer', 'Crypto (USDC)'],
        processingTime: '3-5 business days'
    }
};

// ============================================================================
// REWARD TIERS - Milestone Bonuses
// ============================================================================
const REWARD_TIERS = [
    {
        name: 'Friend',
        referralsRequired: 1,
        bonus: 0,
        badge: 'Friend Badge',
        color: '#4CAF50',
        perks: [
            '20% commission on all referral sales',
            'Access to referral dashboard',
            'Unique referral link',
            'Basic share templates'
        ],
        description: 'Welcome to the family! Share the love and earn 20% on every sale.',
        celebration: 'Congratulations on your first referral!'
    },
    {
        name: 'Advocate',
        referralsRequired: 5,
        bonus: 50,
        badge: 'Advocate Badge',
        color: '#2196F3',
        perks: [
            'Everything in Friend tier',
            '$50 milestone bonus',
            'Exclusive discount code for referrals (10% off)',
            'Priority email support',
            'Early access to new products'
        ],
        description: 'You are making waves! Your referrals get 10% off, you get rewarded.',
        celebration: 'Amazing! You have brought 5 people to the family!'
    },
    {
        name: 'Champion',
        referralsRequired: 15,
        bonus: 150,
        badge: 'Champion Badge',
        color: '#9C27B0',
        perks: [
            'Everything in Advocate tier',
            '$150 milestone bonus',
            '25% commission (upgraded from 20%)',
            'Exclusive Discord channel access',
            'Custom discount codes',
            'Featured on referral leaderboard'
        ],
        description: 'Champion status unlocked! Your commission is now 25% and counting.',
        celebration: '15 referrals! You are officially a Champion of the community!'
    },
    {
        name: 'Ambassador',
        referralsRequired: 30,
        bonus: 300,
        badge: 'Ambassador Badge',
        color: '#FF9800',
        perks: [
            'Everything in Champion tier',
            '$300 milestone bonus',
            '30% commission (upgraded from 25%)',
            'Free product of choice (up to $500 value)',
            'Co-branded marketing materials',
            'Monthly check-in with founder',
            'Input on product roadmap'
        ],
        description: 'Ambassador tier! You are helping shape the future of AI automation.',
        celebration: '30 referrals! Welcome to the Ambassador program!'
    },
    {
        name: 'Legend',
        referralsRequired: 50,
        bonus: 500,
        badge: 'Legend Badge',
        color: '#F44336',
        perks: [
            'Everything in Ambassador tier',
            '$500 milestone bonus',
            '35% commission (highest tier)',
            'Lifetime access to all products',
            'Revenue share on referred customer renewals',
            'Speaking opportunities',
            'VIP retreat invitation',
            'Legend wall of fame feature'
        ],
        description: 'LEGEND STATUS! You are among the elite. Highest commissions, best perks.',
        celebration: '50+ referrals! You are a LEGEND. Thank you for everything!'
    }
];

// ============================================================================
// PRODUCT CATALOG FOR REFERRAL
// ============================================================================
const PRODUCTS = [
    { name: 'Claude Droid', price: 299, commission20: 59.80 },
    { name: 'Income Droid', price: 499, commission20: 99.80 },
    { name: 'Marketing Engine', price: 199, commission20: 39.80 },
    { name: 'Jules AI', price: 399, commission20: 79.80 },
    { name: 'Affiliate System', price: 599, commission20: 119.80 },
    { name: 'Dating Platform', price: 2499, commission20: 499.80 }
];

// ============================================================================
// LANDING PAGE CONTENT
// ============================================================================
const LANDING_PAGE = {
    hero: {
        headline: 'Share AI Solutions. Earn 20% Forever.',
        subheadline: 'Refer friends to our AI automation tools and earn 20% of every purchase they make. No limits. No expiration.',
        primaryCTA: 'Get Your Referral Link',
        secondaryCTA: 'See How It Works',
        stats: [
            { value: '20%', label: 'Commission Rate' },
            { value: '90', label: 'Day Cookie' },
            { value: '$500+', label: 'Per Referral Potential' }
        ]
    },

    howItWorks: {
        title: 'How the Referral Program Works',
        subtitle: 'Three simple steps to start earning',
        steps: [
            {
                number: 1,
                icon: 'link',
                title: 'Get Your Link',
                description: 'Sign up and receive your unique referral link instantly. Share it anywhere - social media, email, your website, or directly with friends.'
            },
            {
                number: 2,
                icon: 'share',
                title: 'Share & Recommend',
                description: 'Tell people about the AI tools that changed your workflow. Your genuine recommendation is the most powerful marketing.'
            },
            {
                number: 3,
                icon: 'cash',
                title: 'Earn Rewards',
                description: 'When someone purchases through your link, you earn 20% commission. Payments are sent monthly, directly to you.'
            }
        ]
    },

    earningsCalculator: {
        title: 'See What You Could Earn',
        subtitle: 'With just a few referrals, your earnings add up fast',
        examples: [
            { referrals: 1, product: 'Claude Droid', earnings: '$59.80' },
            { referrals: 3, product: 'Marketing Engine', earnings: '$119.40' },
            { referrals: 5, product: 'Income Droid', earnings: '$499.00' },
            { referrals: 10, product: 'Mixed Products', earnings: '$1,000+' }
        ],
        cta: 'Calculate Your Potential Earnings'
    },

    whyRefer: {
        title: 'Why Refer AI Solutions Store?',
        reasons: [
            {
                icon: 'trophy',
                title: 'Products That Actually Work',
                description: 'Our tools deliver real results. Claude Droid created 360+ videos in 90 days. Happy customers mean easy referrals.'
            },
            {
                icon: 'percentage',
                title: 'Industry-Leading 20% Commission',
                description: 'Most referral programs offer 5-10%. We offer 20% because we value word-of-mouth marketing.'
            },
            {
                icon: 'clock',
                title: '90-Day Cookie Window',
                description: 'If someone clicks your link and buys within 90 days, you get credit. Plenty of time for them to decide.'
            },
            {
                icon: 'infinity',
                title: 'Lifetime Attribution',
                description: 'Once someone is your referral, future purchases from them still count. Earn on every product they buy.'
            },
            {
                icon: 'gift',
                title: 'Milestone Bonuses',
                description: 'Hit referral milestones and unlock cash bonuses, higher commission rates, and exclusive perks.'
            },
            {
                icon: 'heart',
                title: 'Help Others Succeed',
                description: 'You are not just earning money - you are helping people discover tools that save them hours every day.'
            }
        ]
    },

    socialProof: {
        title: 'What Referrers Are Saying',
        testimonials: [
            {
                quote: 'I shared my link in my newsletter once and earned $300 the first month. The products sell themselves.',
                author: 'Newsletter Creator',
                earned: '$2,400 lifetime earnings'
            },
            {
                quote: 'Hit Ambassador status in 3 months. The milestone bonuses alone covered my original purchase.',
                author: 'YouTube Reviewer',
                earned: '$4,100 lifetime earnings'
            },
            {
                quote: 'Best referral program I have joined. High commissions, products that work, and they actually pay on time.',
                author: 'Tech Blogger',
                earned: '$1,800 lifetime earnings'
            }
        ],
        stats: {
            totalPaid: '$50,000+',
            activeReferrers: '500+',
            averageEarning: '$340/referrer'
        }
    },

    tiers: {
        title: 'Unlock Rewards as You Grow',
        subtitle: 'The more you refer, the more you earn',
        tiers: REWARD_TIERS
    },

    faq: {
        title: 'Frequently Asked Questions',
        questions: [
            {
                q: 'How do I get my referral link?',
                a: 'Sign up for free and your unique referral link is generated instantly. You can find it in your dashboard.'
            },
            {
                q: 'When do I get paid?',
                a: 'Payments are processed on the 1st of each month for the previous month\'s earnings. Minimum payout is $25. We support PayPal, Stripe, bank transfer, and crypto (USDC).'
            },
            {
                q: 'What if someone uses my link but buys later?',
                a: 'Our cookie lasts 90 days. If they click your link and purchase within 90 days, you get credit for the sale.'
            },
            {
                q: 'Is there a limit to how much I can earn?',
                a: 'No limits! Refer as many people as you want and earn 20% (or more at higher tiers) on every sale.'
            },
            {
                q: 'Do I need to be a customer to refer?',
                a: 'Anyone can join our referral program. However, referrers who use our products tend to have better conversion rates because they can speak from experience.'
            },
            {
                q: 'What happens if someone requests a refund?',
                a: 'If a referred customer gets a refund, the commission is deducted from your balance. Our refund rate is under 5%.'
            },
            {
                q: 'Can I use paid advertising?',
                a: 'Yes, with some restrictions. No bidding on our brand terms and no misleading ads. Contact us for full guidelines.'
            },
            {
                q: 'How do milestone bonuses work?',
                a: 'When you hit referral milestones (5, 15, 30, 50), you receive cash bonuses and unlock permanent perks like higher commission rates.'
            }
        ]
    },

    cta: {
        title: 'Ready to Start Earning?',
        subtitle: 'Join hundreds of referrers already earning with AI Solutions Store',
        button: 'Get My Referral Link',
        note: 'Free to join. No purchase required. Start earning today.'
    },

    footer: {
        legal: 'By joining the referral program, you agree to our Terms and Conditions.',
        mission: 'FOR THE KIDS - 60/30/10',
        copyright: '2025 AI Solutions Store. All rights reserved.'
    }
};

// ============================================================================
// EMAIL TEMPLATES FOR REFERRERS
// ============================================================================
const EMAIL_TEMPLATES = {
    welcome: {
        subject: 'Welcome to the AI Solutions Referral Program!',
        body: `Hi {{name}},

Welcome to the AI Solutions Store Referral Program!

You are now part of a community of people who earn while helping others discover powerful AI automation tools.

HERE IS YOUR UNIQUE REFERRAL LINK:
{{referral_link}}

Every time someone purchases through this link, you earn 20% commission.

QUICK STATS:
- Commission Rate: 20% (up to 35% at Legend tier)
- Cookie Duration: 90 days
- Minimum Payout: $25
- Payment Schedule: Monthly (1st of each month)

HOW TO EARN:
1. Share your link on social media
2. Include it in your email signature
3. Mention it in content you create
4. Send it directly to friends who need automation tools

WHAT YOU COULD EARN:
- Claude Droid ($299) = $59.80 per sale
- Income Droid ($499) = $99.80 per sale
- Dating Platform ($2,499) = $499.80 per sale

YOUR DASHBOARD:
ai-solutions.store/referral/dashboard

Questions? Reply to this email anytime.

Let's grow together!

The AI Solutions Team
FOR THE KIDS - 60/30/10`
    },

    firstReferral: {
        subject: 'You did it! Your first referral just converted!',
        body: 'Hi {{name}},\n\nCONGRATULATIONS!\n\nYour first referral just made a purchase. You earned ${{commission}}!\n\nSale Details:\n- Product: {{product_name}}\n- Sale Amount: ${{sale_amount}}\n- Your Commission: ${{commission}}\n\nYou are now at FRIEND tier with these perks:\n- 20% commission on all sales\n- Access to your referral dashboard\n- Basic share templates\n\nNEXT MILESTONE: ADVOCATE (5 referrals)\n- $50 bonus\n- 10% discount code for your referrals\n- Priority support\n\nKeep sharing and watch your earnings grow!\n\nYour Dashboard: ai-solutions.store/referral/dashboard\n\nThe AI Solutions Team\nFOR THE KIDS'
    },

    tierUnlocked: {
        subject: 'TIER UNLOCKED: You are now a {{tier_name}}!',
        body: `Hi {{name}},

HUGE NEWS!

You just unlocked {{tier_name}} status in our referral program!

What you earned:
- Milestone Bonus: ${{bonus}}
- New Commission Rate: {{new_rate}}%
- {{tier_name}} Badge on your profile

YOUR NEW PERKS:
{{perks_list}}

Total Referrals: {{total_referrals}}
Lifetime Earnings: ${{lifetime_earnings}}

{{celebration_message}}

Keep up the incredible work!

Your Dashboard: ai-solutions.store/referral/dashboard

The AI Solutions Team
FOR THE KIDS - 60/30/10`
    },

    monthlyReport: {
        subject: 'Your Referral Earnings Report for {{month}}',
        body: `Hi {{name}},

Here is your referral performance for {{month}}:

EARNINGS SUMMARY:
- Total Clicks: {{clicks}}
- Conversions: {{conversions}}
- Revenue Generated: ${{revenue}}
- Your Earnings: ${{earnings}}

CURRENT STATUS:
- Tier: {{tier}}
- Commission Rate: {{rate}}%
- Total Referrals: {{total_referrals}}

{{#if pending_payout}}
PAYOUT SCHEDULED:
Your payout of ${{payout_amount}} will be processed on {{payout_date}}.
{{/if}}

{{#if tier_progress}}
NEXT MILESTONE:
You are {{referrals_to_next}} referrals away from {{next_tier}} tier!
Unlock: ${{next_bonus}} bonus + {{next_rate}}% commission
{{/if}}

TOP PERFORMING SHARES:
{{top_shares}}

MONTHLY TIP:
{{monthly_tip}}

Keep sharing and earning!

Your Dashboard: ai-solutions.store/referral/dashboard

The AI Solutions Team
FOR THE KIDS`
    },

    inactiveReminder: {
        subject: 'We miss you! Here is what you are missing out on...',
        body: `Hi {{name}},

It has been a while since your last referral, and we wanted to check in.

WHAT YOU ARE MISSING:
- Your referral link is still active
- Commission rates are still 20%+
- New products have been added

QUICK WIN OPPORTUNITY:
Share this with ONE person this week:

"Hey, I have been using these AI automation tools and they are incredible. This one creates YouTube videos automatically while you sleep. Check it out: {{referral_link}}"

That is literally it. One share could mean $50-500 in your pocket.

YOUR REFERRAL LINK:
{{referral_link}}

YOUR STATS:
- Total Referrals: {{total_referrals}}
- Lifetime Earnings: ${{lifetime_earnings}}
- Current Tier: {{tier}}

Come back and keep earning!

Your Dashboard: ai-solutions.store/referral/dashboard

The AI Solutions Team
FOR THE KIDS`
    },

    payoutNotification: {
        subject: 'Your referral payout of ${{amount}} has been sent!',
        body: `Hi {{name}},

Great news - your referral payout has been processed!

PAYOUT DETAILS:
- Amount: ${{amount}}
- Method: {{payment_method}}
- Transaction ID: {{transaction_id}}
- Expected Arrival: {{arrival_date}}

EARNINGS BREAKDOWN:
{{earnings_breakdown}}

CURRENT STATUS:
- Tier: {{tier}}
- Commission Rate: {{rate}}%
- Pending Earnings: ${{pending}}

Thank you for being part of the AI Solutions family!

Your Dashboard: ai-solutions.store/referral/dashboard

The AI Solutions Team
FOR THE KIDS - 60/30/10`
    }
};

// ============================================================================
// SOCIAL SHARE TEMPLATES
// ============================================================================
const SOCIAL_TEMPLATES = {
    twitter: [
        {
            type: 'product-focus',
            template: `I have been using Claude Droid to auto-create YouTube Shorts while I sleep.

360+ videos in 90 days. Zero editing.

If you want to try it, here is my link (I get a small commission):
{{referral_link}}

Not an ad - just genuinely impressed.`
        },
        {
            type: 'value-proposition',
            template: `Stop spending hours on content creation.

These AI automation tools handle:
- YouTube video creation
- Social media posting
- Marketing campaigns

I use them daily. Check them out:
{{referral_link}}`
        },
        {
            type: 'personal-story',
            template: `How I saved 20+ hours/week:

1. Set up Claude Droid
2. Let it create videos automatically
3. Focus on actual business growth

Best investment I made this year.

Try it: {{referral_link}}`
        },
        {
            type: 'casual',
            template: `Friend asked what tools I use for content automation.

Sent them this: {{referral_link}}

Honestly the best AI automation suite I have found. YouTube, social, marketing - all handled.`
        },
        {
            type: 'results-focused',
            template: `Results from 90 days of AI automation:

- 360+ YouTube Shorts created
- 47,000+ views
- Zero hours spent editing

The tool: Claude Droid
My link: {{referral_link}}`
        }
    ],

    linkedin: [
        {
            type: 'professional',
            template: `I have been testing AI automation tools for the past 6 months.

Here is what I found actually works:

AI Solutions Store has a suite of tools that handle everything from YouTube content creation to multi-platform social media management.

Key results:
- Claude Droid: 360+ videos created automatically
- Marketing Engine: 12+ platforms, zero manual posting
- Income Droid: Revenue-optimized content generation

If you are looking to scale content without hiring a team, these are worth checking out.

Full disclosure: This is my referral link, so I earn a commission if you purchase. But I genuinely use these tools daily.

{{referral_link}}

#AIAutomation #ContentCreation #Productivity`
        },
        {
            type: 'story',
            template: `6 months ago, I was spending 4 hours a day on content creation.

Today, I spend 30 minutes.

The difference? AI automation.

I discovered AI Solutions Store and started using their tools:
- Automated YouTube Shorts creation
- Multi-platform social posting
- AI-powered marketing campaigns

The ROI has been incredible.

If you are drowning in content work, check them out:
{{referral_link}}

(Referral link - I get a small commission, but I would recommend these regardless)`
        }
    ],

    facebook: [
        {
            type: 'group-share',
            template: `Hey everyone! Quick recommendation for those asking about content automation.

I have been using AI Solutions Store tools for a few months and they have been game-changers:

- Claude Droid auto-creates YouTube Shorts (I have made 360+ without editing)
- Marketing Engine handles social media across 12+ platforms
- Everything runs 24/7 without my input

If anyone wants to try them, here is my referral link: {{referral_link}}

Full transparency: I get a commission if you buy, but I genuinely use and love these tools. Happy to answer questions!`
        }
    ],

    instagram: [
        {
            type: 'story',
            template: `Link in bio!

These AI tools changed how I do content:
- Auto-created 360+ YouTube videos
- Zero editing required
- Runs 24/7

Use my link to check them out (and I get a little thank you commission)

{{referral_link}}`
        },
        {
            type: 'carousel-caption',
            template: `How I create content while sleeping:

Slide 1: The Problem - Content creation takes forever
Slide 2: The Solution - AI automation tools
Slide 3: Claude Droid - Auto YouTube creation
Slide 4: Marketing Engine - 12+ platforms
Slide 5: Results - 360 videos, 47k views, 90 days

Link in bio to try them yourself!
{{referral_link}}

#AIAutomation #ContentCreator #PassiveIncome`
        }
    ],

    email: [
        {
            type: 'friend-recommendation',
            template: `Hey {{friend_name}},

Remember when you asked about automating your YouTube content?

I found something that actually works. It is called AI Solutions Store and they have this tool called Claude Droid that auto-creates YouTube Shorts.

I have been using it for 3 months:
- 360+ videos created
- 47,000+ views
- I spent maybe 2 hours total setting it up

Here is my referral link if you want to check it out: {{referral_link}}

Full disclosure - I get a small commission if you buy, but I would tell you about this either way. It is genuinely impressive.

Let me know if you have questions!

{{your_name}}`
        },
        {
            type: 'newsletter-mention',
            template: `TOOL RECOMMENDATION

One of the most common questions I get is how I create so much content.

The secret? AI Solutions Store.

Their suite of automation tools handles:
- YouTube Shorts creation (Claude Droid)
- Multi-platform social posting (Marketing Engine)
- Revenue-optimized content (Income Droid)

I have been using them for months and the ROI is incredible.

Check them out: {{referral_link}}
(Referral link - I earn a commission on purchases)

Results speak for themselves: 360+ videos, 47k views, minimal effort.`
        }
    ],

    discord: [
        {
            type: 'recommendation',
            template: `Just wanted to share some tools that have been helpful for me:

**AI Solutions Store** - {{referral_link}}

What I use:
- **Claude Droid** - Auto-creates YouTube Shorts while I sleep
- **Marketing Engine** - Handles social media across 12+ platforms

My results after 90 days:
- 360+ videos created
- 47,000+ views
- Maybe 2 hours of setup total

Heads up: That is a referral link so I get a commission if you buy. But genuinely recommending because they work.`
        }
    ],

    reddit: [
        {
            type: 'value-first',
            template: `Been getting questions about my content automation setup, so figured I would share:

I use AI Solutions Store for most of my automation. Main tools:

1. **Claude Droid** ($299) - Automatically creates YouTube Shorts. I have made 360+ videos in 90 days with zero manual editing.

2. **Marketing Engine** ($199) - Posts to 12+ social platforms automatically. Set it and forget it.

3. **Income Droid** ($499) - Revenue-optimized content engine if you want to monetize.

Full disclosure: I am including my referral link because I genuinely think it is worth it: {{referral_link}}

Happy to answer questions about my setup. Been using these for ~6 months.`
        }
    ],

    whatsapp: [
        {
            type: 'casual',
            template: `Hey! You asked about those AI tools I use.

Here is my referral link: {{referral_link}}

Main ones I use:
- Claude Droid (auto YouTube videos)
- Marketing Engine (auto social media)

Made 360+ videos without editing. Crazy.

Let me know if you have questions!`
        }
    ],

    tiktok: [
        {
            type: 'bio-link',
            template: `AI tools that changed my content game:

- 360+ YouTube videos
- Zero editing
- Runs while I sleep

Link in bio to try
{{referral_link}}`
        }
    ]
};

// ============================================================================
// TERMS AND CONDITIONS
// ============================================================================
const TERMS_AND_CONDITIONS = `
# AI SOLUTIONS STORE REFERRAL PROGRAM
# TERMS AND CONDITIONS

**Effective Date:** January 1, 2025
**Last Updated:** ${new Date().toISOString().split('T')[0]}

---

## 1. PROGRAM OVERVIEW

### 1.1 Introduction
The AI Solutions Store Referral Program ("Program") allows participants ("Referrers") to earn commissions by referring new customers to AI Solutions Store ("Company," "we," "us," or "our"). By participating in the Program, you agree to these Terms and Conditions.

### 1.2 Mission
FOR THE KIDS - 60/30/10. A portion of all revenue supports children's charitable initiatives.

---

## 2. ELIGIBILITY

### 2.1 Who Can Participate
- Must be 18 years of age or older
- Must have a valid email address
- Must be able to receive payments via our supported methods
- Must agree to these Terms and Conditions
- Must comply with all applicable laws and regulations

### 2.2 Who Cannot Participate
- Current employees of AI Solutions Store
- Immediate family members of employees
- Entities or individuals previously banned from the Program
- Residents of countries where referral programs are prohibited

---

## 3. COMMISSION STRUCTURE

### 3.1 Base Commission Rate
Referrers earn a base commission rate of **20%** on all qualifying purchases made by referred customers.

### 3.2 Tier Progression
Commission rates increase based on referral milestones:

| Tier | Referrals | Commission Rate | Bonus |
|------|-----------|-----------------|-------|
| Friend | 1+ | 20% | $0 |
| Advocate | 5+ | 20% | $50 |
| Champion | 15+ | 25% | $150 |
| Ambassador | 30+ | 30% | $300 |
| Legend | 50+ | 35% | $500 |

### 3.3 Commission Calculation
- Commission is calculated on the net sale amount (excluding taxes and fees)
- Commission is earned when a referred customer completes a purchase
- Commission is subject to the refund policy (Section 6)

---

## 4. REFERRAL TRACKING

### 4.1 Cookie Duration
- Referral tracking uses a **90-day cookie window**
- If a referred customer clicks your link and purchases within 90 days, you receive credit
- The most recent referral link clicked takes priority (last-click attribution)

### 4.2 Attribution Rules
- First purchase from a new customer is attributed to the referring link
- Subsequent purchases from the same customer are attributed to the original referrer (lifetime attribution)
- Self-referrals are prohibited and will result in commission reversal

### 4.3 Tracking Methods
- Unique referral links (e.g., ai-solutions.store/?ref=YOUR_CODE)
- Custom discount codes (for qualified tiers)
- Manual attribution upon request (with verification)

---

## 5. PAYMENT TERMS

### 5.1 Minimum Payout
- Minimum payout threshold: **$25**
- Earnings below the minimum roll over to the next payment period

### 5.2 Payment Schedule
- Payments are processed on the **1st of each month** for the previous month's earnings
- Processing time: 3-5 business days after processing date

### 5.3 Payment Methods
- PayPal
- Stripe (direct deposit)
- Bank Transfer (wire)
- Cryptocurrency (USDC)

### 5.4 Payment Responsibility
- Referrers are responsible for providing accurate payment information
- Referrers are responsible for any taxes owed on earnings
- Failed payments due to incorrect information may incur reprocessing delays

---

## 6. REFUNDS AND CHARGEBACKS

### 6.1 Refund Policy Impact
- If a referred customer receives a refund, the associated commission is deducted from your balance
- Refund deductions apply to the payment period in which the refund occurs
- If your balance is insufficient, future earnings will be reduced to cover the deduction

### 6.2 Chargeback Policy
- Chargebacks are treated as refunds
- Repeated chargebacks from referrals may result in Program review or termination

### 6.3 Refund Window
- Our standard refund window is 14 days
- Commissions are considered "pending" during the refund window
- Commissions become "confirmed" after the refund window closes

---

## 7. PROMOTIONAL GUIDELINES

### 7.1 Permitted Activities
- Sharing referral links on personal social media
- Including referral links in email signatures
- Writing honest reviews and recommendations
- Creating content about AI Solutions Store products
- Sharing links in relevant online communities (following community rules)

### 7.2 Prohibited Activities
- **Spam**: Unsolicited bulk messaging or emails
- **Misleading Claims**: False or exaggerated product claims
- **Brand Bidding**: Paid advertising on our brand terms
- **Cookie Stuffing**: Automated or hidden cookie placement
- **Incentivized Clicks**: Paying or rewarding users to click referral links
- **Self-Referrals**: Purchasing through your own referral link
- **Trademark Infringement**: Using our trademarks improperly
- **Deceptive Practices**: Hiding or obscuring the referral nature of links

### 7.3 Advertising Guidelines
- Paid advertising is permitted with restrictions
- Do not bid on brand terms ("AI Solutions Store," product names)
- Do not use misleading ad copy
- Contact us for approval of specific advertising campaigns

### 7.4 Disclosure Requirements
- FTC disclosure is required when promoting referral links
- Clearly state that you may earn a commission
- Example: "This is a referral link - I earn a commission if you purchase"

---

## 8. INTELLECTUAL PROPERTY

### 8.1 License Grant
- We grant Referrers a limited, non-exclusive license to use our marketing materials
- This license is revocable and conditional on Program compliance
- Materials may only be used for Program promotion

### 8.2 Restrictions
- Do not modify our logos or trademarks without permission
- Do not create misleading associations with our brand
- Do not register domain names containing our trademarks

---

## 9. PROGRAM MODIFICATIONS

### 9.1 Right to Modify
- We reserve the right to modify these Terms at any time
- Changes will be communicated via email and/or dashboard notification
- Continued participation after changes constitutes acceptance

### 9.2 Commission Rate Changes
- Commission rate changes apply to future sales only
- Existing tier status and benefits are maintained unless otherwise stated

---

## 10. TERMINATION

### 10.1 Termination by Referrer
- Referrers may terminate participation at any time
- Outstanding commissions above the minimum threshold will be paid
- Termination requests should be sent to affiliates@ai-solutions.store

### 10.2 Termination by Company
- We may terminate participation for violation of these Terms
- We may terminate participation for inactivity (12+ months)
- We may terminate the Program entirely with 30 days notice

### 10.3 Effect of Termination
- Referral links will be deactivated
- Pending commissions above threshold will be paid out
- Commission below threshold will be forfeited upon termination

---

## 11. LIMITATION OF LIABILITY

### 11.1 Disclaimer
- The Program is provided "as is" without warranties
- We do not guarantee any level of earnings
- Past performance does not guarantee future results

### 11.2 Liability Cap
- Our liability is limited to the amount of commissions earned
- We are not liable for indirect, incidental, or consequential damages

---

## 12. DISPUTE RESOLUTION

### 12.1 Good Faith Resolution
- Disputes should first be addressed through our support team
- Email: affiliates@ai-solutions.store
- We will attempt to resolve disputes within 30 days

### 12.2 Governing Law
- These Terms are governed by applicable law
- Disputes shall be resolved through binding arbitration

---

## 13. PRIVACY

### 13.1 Data Collection
- We collect information necessary to operate the Program
- This includes name, email, payment information, and referral data
- See our Privacy Policy for full details

### 13.2 Data Sharing
- Referrers do not have access to referred customer personal data
- We share only aggregate statistics and commission information

---

## 14. CONTACT INFORMATION

For questions about the Referral Program:
- Email: affiliates@ai-solutions.store
- Dashboard: ai-solutions.store/referral/dashboard
- FAQ: ai-solutions.store/referral/faq

---

## 15. ACCEPTANCE

By participating in the AI Solutions Store Referral Program, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.

---

**AI Solutions Store**
FOR THE KIDS - 60/30/10

*Last Updated: ${new Date().toISOString().split('T')[0]}*
`;

// ============================================================================
// CONTENT GENERATION
// ============================================================================
function generateFullContent() {
    const timestamp = new Date().toISOString();

    let content = `# AI SOLUTIONS STORE REFERRAL PROGRAM
## Complete Marketing Content Package

**Generated:** ${timestamp}
**Commission Rate:** 20% (base) up to 35% (Legend tier)
**Mission:** FOR THE KIDS - 60/30/10

---

# SECTION 1: REFERRAL PROGRAM LANDING PAGE

## Hero Section

**Headline:** ${LANDING_PAGE.hero.headline}

**Subheadline:** ${LANDING_PAGE.hero.subheadline}

**Primary CTA:** ${LANDING_PAGE.hero.primaryCTA}
**Secondary CTA:** ${LANDING_PAGE.hero.secondaryCTA}

**Hero Stats:**
${LANDING_PAGE.hero.stats.map(s => `- ${s.value} ${s.label}`).join('\n')}

---

## How It Works

**Title:** ${LANDING_PAGE.howItWorks.title}
**Subtitle:** ${LANDING_PAGE.howItWorks.subtitle}

${LANDING_PAGE.howItWorks.steps.map(s => `**Step ${s.number}: ${s.title}**
Icon: ${s.icon}
${s.description}
`).join('\n')}

---

## Earnings Calculator

**Title:** ${LANDING_PAGE.earningsCalculator.title}
**Subtitle:** ${LANDING_PAGE.earningsCalculator.subtitle}

| Referrals | Product | Your Earnings |
|-----------|---------|---------------|
${LANDING_PAGE.earningsCalculator.examples.map(e => `| ${e.referrals} | ${e.product} | ${e.earnings} |`).join('\n')}

**CTA:** ${LANDING_PAGE.earningsCalculator.cta}

---

## Why Refer AI Solutions Store?

${LANDING_PAGE.whyRefer.reasons.map(r => `### ${r.title}
**Icon:** ${r.icon}
${r.description}
`).join('\n')}

---

## Social Proof

**Title:** ${LANDING_PAGE.socialProof.title}

### Testimonials

${LANDING_PAGE.socialProof.testimonials.map(t => `> "${t.quote}"
> - ${t.author} (${t.earned})
`).join('\n')}

### Program Stats
- Total Paid to Referrers: ${LANDING_PAGE.socialProof.stats.totalPaid}
- Active Referrers: ${LANDING_PAGE.socialProof.stats.activeReferrers}
- Average Earnings: ${LANDING_PAGE.socialProof.stats.averageEarning}

---

## FAQ Section

${LANDING_PAGE.faq.questions.map(q => `**Q: ${q.q}**
A: ${q.a}
`).join('\n')}

---

## Final CTA

**Title:** ${LANDING_PAGE.cta.title}
**Subtitle:** ${LANDING_PAGE.cta.subtitle}
**Button:** ${LANDING_PAGE.cta.button}
**Note:** ${LANDING_PAGE.cta.note}

---

# SECTION 2: EMAIL TEMPLATES FOR REFERRERS

`;

    // Email Templates
    Object.entries(EMAIL_TEMPLATES).forEach(([key, template]) => {
        content += `## ${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} Email

**Subject:** ${template.subject}

\`\`\`
${template.body}
\`\`\`

---

`;
    });

    content += `# SECTION 3: SOCIAL SHARE TEMPLATES

`;

    // Social Templates
    Object.entries(SOCIAL_TEMPLATES).forEach(([platform, templates]) => {
        content += `## ${platform.charAt(0).toUpperCase() + platform.slice(1)} Templates

`;
        templates.forEach((t, i) => {
            content += `### Template ${i + 1} (${t.type})

\`\`\`
${t.template}
\`\`\`

`;
        });
    });

    content += `---

# SECTION 4: REWARD TIER DESCRIPTIONS

## Overview
The AI Solutions Store Referral Program features 5 reward tiers with increasing benefits and commission rates.

## Tier Progression Chart

| Tier | Referrals | Commission | Bonus |
|------|-----------|------------|-------|
${REWARD_TIERS.map(t => `| ${t.name} | ${t.referralsRequired}+ | ${t.name === 'Friend' || t.name === 'Advocate' ? '20%' : t.name === 'Champion' ? '25%' : t.name === 'Ambassador' ? '30%' : '35%'} | $${t.bonus} |`).join('\n')}

`;

    REWARD_TIERS.forEach(tier => {
        content += `## ${tier.name} Tier

**Badge:** ${tier.badge}
**Color:** ${tier.color}
**Referrals Required:** ${tier.referralsRequired}+
**Milestone Bonus:** $${tier.bonus}

**Description:**
${tier.description}

**Perks:**
${tier.perks.map(p => `- ${p}`).join('\n')}

**Celebration Message:**
"${tier.celebration}"

---

`;
    });

    content += `# SECTION 5: TERMS AND CONDITIONS

${TERMS_AND_CONDITIONS}

---

# SECTION 6: QUICK REFERENCE

## Commission per Product (20% Base Rate)

| Product | Price | 20% Commission | Champion (25%) | Ambassador (30%) | Legend (35%) |
|---------|-------|----------------|----------------|------------------|--------------|
${PRODUCTS.map(p => `| ${p.name} | $${p.price} | $${p.commission20.toFixed(2)} | $${(p.price * 0.25).toFixed(2)} | $${(p.price * 0.30).toFixed(2)} | $${(p.price * 0.35).toFixed(2)} |`).join('\n')}

## Total Potential Earnings (1 of each product)

- At 20% (Friend/Advocate): $${PRODUCTS.reduce((sum, p) => sum + p.commission20, 0).toFixed(2)}
- At 25% (Champion): $${PRODUCTS.reduce((sum, p) => sum + (p.price * 0.25), 0).toFixed(2)}
- At 30% (Ambassador): $${PRODUCTS.reduce((sum, p) => sum + (p.price * 0.30), 0).toFixed(2)}
- At 35% (Legend): $${PRODUCTS.reduce((sum, p) => sum + (p.price * 0.35), 0).toFixed(2)}

## Key Program Details

- **Base Commission:** 20%
- **Maximum Commission:** 35% (Legend tier)
- **Cookie Duration:** 90 days
- **Minimum Payout:** $25
- **Payment Schedule:** Monthly (1st of month)
- **Payment Methods:** PayPal, Stripe, Bank Transfer, USDC

## Tier Milestone Bonuses Total

Reaching Legend tier earns total bonuses of: $${REWARD_TIERS.reduce((sum, t) => sum + t.bonus, 0)}

---

*Generated by AI Solutions Store Referral Program Generator*
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
    log('='.repeat(70));
    log('AI SOLUTIONS STORE REFERRAL PROGRAM CONTENT GENERATOR');
    log('Commission: 20% base rate (up to 35% at Legend tier)');
    log('FOR THE KIDS - 60/30/10');
    log('='.repeat(70));

    // Generate full content
    const fullContent = generateFullContent();

    // Save to content file
    fs.writeFileSync(CONTENT_FILE, fullContent);
    log(`Content saved to: ${CONTENT_FILE}`);

    // Update state
    const state = getState();
    state.lastRun = new Date().toISOString();
    state.runs.push({
        timestamp: state.lastRun,
        contentFile: CONTENT_FILE,
        sections: {
            landingPage: Object.keys(LANDING_PAGE).length,
            emailTemplates: Object.keys(EMAIL_TEMPLATES).length,
            socialTemplates: Object.keys(SOCIAL_TEMPLATES).reduce((sum, k) => sum + SOCIAL_TEMPLATES[k].length, 0),
            rewardTiers: REWARD_TIERS.length,
            termsAndConditions: 1
        }
    });
    if (state.runs.length > 50) state.runs = state.runs.slice(-50);
    saveState(state);

    // Output summary
    log('');
    log('='.repeat(70));
    log('CONTENT GENERATION COMPLETE');
    log('='.repeat(70));
    log('');
    log('SECTIONS GENERATED:');
    log(`  - Landing Page Sections: ${Object.keys(LANDING_PAGE).length}`);
    log(`  - Email Templates: ${Object.keys(EMAIL_TEMPLATES).length}`);
    log(`  - Social Share Templates: ${Object.keys(SOCIAL_TEMPLATES).reduce((sum, k) => sum + SOCIAL_TEMPLATES[k].length, 0)}`);
    log(`  - Reward Tiers: ${REWARD_TIERS.length}`);
    log(`  - Terms & Conditions: Complete`);
    log('');
    log('COMMISSION STRUCTURE:');
    log(`  - Base Rate: 20%`);
    log(`  - Cookie Duration: 90 days`);
    log(`  - Minimum Payout: $25`);
    log('');
    log('TIER PROGRESSION:');
    REWARD_TIERS.forEach(t => {
        log(`  - ${t.name}: ${t.referralsRequired}+ referrals, $${t.bonus} bonus`);
    });
    log('');
    log(`Content File: ${CONTENT_FILE}`);
    log(`Log File: ${LOG_FILE}`);
    log(`State File: ${STATE_FILE}`);
    log('');
    log('='.repeat(70));
    log('FOR THE KIDS - 60/30/10');
    log('='.repeat(70));

    process.exit(0);
}

// Run if called directly
if (require.main === module) {
    main();
}

// Export for use as module
module.exports = {
    REFERRAL_COMMISSION,
    REWARD_TIERS,
    PRODUCTS,
    LANDING_PAGE,
    EMAIL_TEMPLATES,
    SOCIAL_TEMPLATES,
    TERMS_AND_CONDITIONS,
    generateFullContent
};
