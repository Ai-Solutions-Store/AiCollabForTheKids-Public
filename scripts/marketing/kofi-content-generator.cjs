/**
 * Ko-fi Page Content Generator
 * Generates comprehensive content for Ko-fi presence
 *
 * 60% TO CHARITY - FOR THE KIDS
 * 60/30/10 Split: 60% Children's Charities | 30% Operations | 10% Development
 */

const fs = require('fs');
const path = require('path');

const LOGS_DIR = 'C:\\AiCollabForTheKids\\logs';
const STATE_FILE = path.join(LOGS_DIR, 'kofi-content-state.json');
const LOG_FILE = path.join(LOGS_DIR, 'kofi-content-marketing.log');
const CONTENT_FILE = path.join(LOGS_DIR, 'kofi-ready-to-post.md');

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

// ═══════════════════════════════════════════════════════════════════════════
// PAGE DESCRIPTIONS
// ═══════════════════════════════════════════════════════════════════════════

const PAGE_DESCRIPTIONS = [
    {
        id: 'page-desc-main',
        title: 'Main Page Description',
        content: `Welcome to AI Solutions Store - where your support builds automation tools AND helps children in need.

**60% OF ALL SUPPORT GOES TO CHARITY** - St. Jude, Feeding America, Boys & Girls Clubs, and more.

We build AI-powered automation tools that work 24/7:
- Claude Droid - YouTube Shorts automation
- Income Droid - Content syndication across platforms
- Marketing Engine - 12-platform marketing automation
- Jules AI - Agent monitoring dashboard

Every coffee, membership, and commission directly impacts:
1. Children fighting illness at St. Jude
2. Hungry kids through Feeding America
3. At-risk youth through Boys & Girls Clubs
4. Local children's programs in your community

FOR THE KIDS. Every. Single. Dollar.

One-time purchases. No subscriptions. 60% to charity.
https://ai-solutions.store`
    },
    {
        id: 'page-desc-mission',
        title: 'Mission-Focused Description',
        content: `**FOR THE KIDS - 60% to Charity**

We're not just another tech project. We're builders with a mission.

Every dollar you contribute here:
- 60% goes directly to children's charities
- 30% keeps the servers running
- 10% funds new tools

**Charities We Support:**
- St. Jude Children's Research Hospital
- Feeding America (child hunger programs)
- Boys & Girls Clubs of America
- Direct Action Everywhere (youth programs)

**What We Build:**
AI automation tools that run while you sleep. YouTube content, social media marketing, content syndication - all automated, all one-time purchases.

Your support = More tools built = More charity raised = More kids helped

It's that simple. FOR THE KIDS.`
    },
    {
        id: 'page-desc-transparent',
        title: 'Transparency-Focused Description',
        content: `**Full Transparency: Where Your Money Goes**

60% CHARITY | 30% OPERATIONS | 10% DEVELOPMENT

We publish quarterly reports showing every dollar:
- Which charities received funds
- How much went to each cause
- Operational costs breakdown
- Development investments

**Current Charity Partners:**
- St. Jude Children's Research Hospital (medical research)
- Feeding America (1 in 6 US children face hunger)
- Boys & Girls Clubs (after-school programs)
- Local children's hospitals in supporter communities

**What We Do:**
Build AI automation tools - YouTube Shorts creators, marketing engines, content syndicators. All one-time purchases, no subscriptions.

**Why Ko-fi?**
Direct support with minimal platform fees = More goes to the kids.

Join 500+ supporters making automation work for children.`
    }
];

// ═══════════════════════════════════════════════════════════════════════════
// GOAL DESCRIPTIONS
// ═══════════════════════════════════════════════════════════════════════════

const GOAL_DESCRIPTIONS = [
    {
        id: 'goal-quarterly-charity',
        title: 'Quarterly Charity Goal',
        goal_amount: '$5,000',
        content: `**Q1 2025 Charity Goal: $5,000**

Goal: Raise $5,000 this quarter = $3,000 to children's charities

**Breakdown:**
- $1,000 to St. Jude Children's Research Hospital
- $1,000 to Feeding America (child hunger)
- $500 to Boys & Girls Clubs
- $500 to local children's programs (supporter nominated)

**Progress Rewards:**
- 25%: We'll open-source one automation tool
- 50%: Live stream building new product
- 75%: Community votes on next charity recipient
- 100%: Matching donation from product revenue

Every coffee = roughly $2.70 to charity. Every membership = consistent monthly impact.

FOR THE KIDS - let's hit this together.`
    },
    {
        id: 'goal-server-costs',
        title: 'Monthly Server Costs Goal',
        goal_amount: '$500',
        content: `**Monthly Operations Goal: $500**

Keeping the automation running 24/7 requires infrastructure.

**What This Covers:**
- API costs (Claude, GPT, social media APIs)
- Server hosting and PM2 process management
- Domain renewals and SSL certificates
- Development tools and testing

**Why This Matters:**
When operations are covered, 100% of product sales go to the 60/30/10 split. This goal keeps the engine running.

**Transparency:**
We publish monthly cost breakdowns. You'll see exactly where every dollar goes.

Hit this goal = Sustainable automation = More charity impact`
    },
    {
        id: 'goal-product-launch',
        title: 'New Product Launch Goal',
        goal_amount: '$2,500',
        content: `**New Product Launch: $2,500**

Help us build the next automation tool!

**Next Up: Tweet Storm Droid**
Automated Twitter thread generation and scheduling. Research topics, write threads, optimize posting times - all automated.

**Goal Breakdown:**
- $1,500 to charity (60%)
- $750 to development costs
- $250 to launch marketing

**Backer Benefits:**
- $25+: Early access (2 weeks before launch)
- $50+: Lifetime updates
- $100+: Input on features before dev starts
- $250+: Your name in the credits + free copy

Every new product = more revenue = more charity = FOR THE KIDS`
    },
    {
        id: 'goal-school-drive',
        title: 'Back to School Drive',
        goal_amount: '$3,000',
        content: `**Back to School Drive: $3,000**

100% of this goal goes to school supplies for kids in need.

**Partnership with:**
- Local school districts
- Boys & Girls Clubs supply programs
- Feeding America backpack programs

**What We'll Provide:**
- Backpacks stuffed with supplies
- Notebooks, pencils, folders
- Calculators for math classes
- Art supplies for creative kids

**Impact:**
$30 = 1 fully-loaded backpack
$3,000 goal = 100 kids start school prepared

No admin fees. No overhead. Supporters can nominate local schools.

FOR THE KIDS - literally putting tools in their hands.`
    }
];

// ═══════════════════════════════════════════════════════════════════════════
// THANK YOU MESSAGES
// ═══════════════════════════════════════════════════════════════════════════

const THANK_YOU_MESSAGES = [
    {
        id: 'thank-you-coffee',
        type: 'one-time',
        title: 'Thank You - Coffee Supporter',
        content: `Thank you for the coffee!

Here's what just happened:
- 60% ($2.70) is on its way to children's charities
- A kid somewhere just got a little closer to a meal, medicine, or mentor

You're not just supporting automation tools - you're part of something bigger.

**What's Next:**
- Check your email for exclusive content links
- Follow @AiCollab4Kids on Twitter for updates
- See impact reports at ai-solutions.store/impact

FOR THE KIDS - you made it happen today.

With gratitude,
The AI Solutions Store Team`
    },
    {
        id: 'thank-you-membership',
        type: 'membership',
        title: 'Thank You - New Member',
        content: `Welcome to the family!

Your monthly membership means:
- Consistent, predictable charity impact
- Kids counting on support can rely on it
- You're now part of our inner circle

**Your Member Benefits:**
- Exclusive Discord access (link in your email)
- Early access to all new products
- Monthly impact reports
- Direct input on charity selection
- Behind-the-scenes development updates

**This Month's Charity Focus:**
St. Jude Children's Research Hospital - because no family should receive a bill for their child's treatment.

FOR THE KIDS - every month, together.

Welcome aboard,
The AI Solutions Store Team`
    },
    {
        id: 'thank-you-commission',
        type: 'commission',
        title: 'Thank You - Commission Request',
        content: `Commission request received!

Thank you for trusting us with your custom automation project.

**What Happens Next:**
1. We'll review your requirements (24-48 hours)
2. You'll receive a detailed quote and timeline
3. Upon approval, 60% of payment goes to charity
4. We build your solution
5. You get unlimited revisions until happy

**Your Impact:**
Custom commissions typically mean larger charity contributions. Your project could fund dozens of meals, hours of mentorship, or medical supplies.

We'll be in touch soon with next steps.

FOR THE KIDS - your custom work, their brighter future.

The AI Solutions Store Team`
    },
    {
        id: 'thank-you-gold',
        type: 'gold-membership',
        title: 'Thank You - Gold Member',
        content: `You absolute legend.

Gold membership? You're in the top 5% of supporters.

**What This Means:**
- $30+/month to children's charities from your support alone
- VIP everything - you're first in line, always
- Direct line to our team
- Your name on our supporters wall (with permission)

**Your Gold Benefits:**
- 1:1 monthly call (strategy, debugging, anything)
- Priority commission queue
- Beta access to everything
- Input on major decisions
- Free copy of every new product
- Custom automation request (1 per quarter)

**Immediate Access:**
Check your email for:
- Private Discord channel invite
- Calendar link for your first call
- Current beta products

You're not just supporting - you're building with us.

FOR THE KIDS - at scale.

With deep appreciation,
The AI Solutions Store Team`
    },
    {
        id: 'thank-you-goal-reached',
        type: 'goal-milestone',
        title: 'Goal Reached - Community Thank You',
        content: `WE DID IT!

The community just hit our goal. Here's what that means:

**Impact Unlocked:**
- $[AMOUNT] heading to children's charities
- [SPECIFIC_CHARITY] will receive their portion this week
- Kids in need are about to feel your generosity

**What's Next:**
- Funds transfer within 5 business days
- Impact photos/report within 30 days
- New goal launching tomorrow

**To Every Supporter:**
Whether you bought one coffee or became a Gold member - you're part of this. Every dollar counted. Every share helped.

This is what community looks like.

FOR THE KIDS - we did this together.

Onwards to the next goal,
The AI Solutions Store Team`
    }
];

// ═══════════════════════════════════════════════════════════════════════════
// COMMISSION OFFERINGS
// ═══════════════════════════════════════════════════════════════════════════

const COMMISSION_OFFERINGS = [
    {
        id: 'commission-basic',
        title: 'Basic Automation - $199',
        price: '$199',
        content: `**Basic Automation Commission - $199**
*60% ($119.40) goes to charity*

**What You Get:**
- Custom automation script for ONE platform
- Full documentation
- 30 days of support
- One revision round

**Best For:**
- Single-platform posting
- Simple content generation
- Basic scheduling tasks

**Platforms Available:**
Twitter, LinkedIn, Facebook, Instagram, TikTok, YouTube, Discord, Telegram, Reddit, Pinterest, Mastodon, Bluesky

**Process:**
1. Fill out requirements form
2. Receive quote within 48 hours
3. 50% upfront, 50% on delivery
4. Delivery in 7-14 days

**Charity Impact:**
$119.40 could provide:
- 12 meals through Feeding America
- Art supplies for 4 kids
- 1 hour of research at St. Jude

Request a quote: support@ai-solutions.store`
    },
    {
        id: 'commission-standard',
        title: 'Standard Automation - $499',
        price: '$499',
        content: `**Standard Automation Commission - $499**
*60% ($299.40) goes to charity*

**What You Get:**
- Custom automation for UP TO 3 platforms
- Content generation + scheduling
- PM2 configuration for 24/7 running
- Full documentation
- 60 days of support
- Three revision rounds

**Best For:**
- Multi-platform content strategy
- Integrated marketing workflows
- Small business automation

**Includes:**
- Platform API setup assistance
- Error handling and logging
- Basic analytics tracking
- Deployment guide

**Process:**
1. Discovery call (30 minutes)
2. Detailed proposal within 72 hours
3. 50% upfront, 50% on delivery
4. Delivery in 14-21 days

**Charity Impact:**
$299.40 could provide:
- 30 meals through Feeding America
- 10 backpacks with school supplies
- Mentorship hours for at-risk youth

Request a quote: support@ai-solutions.store`
    },
    {
        id: 'commission-premium',
        title: 'Premium Automation - $999',
        price: '$999',
        content: `**Premium Automation Commission - $999**
*60% ($599.40) goes to charity*

**What You Get:**
- Custom automation for UNLIMITED platforms
- Full content pipeline (research → creation → posting)
- Advanced scheduling with optimization
- Analytics dashboard
- PM2 configuration for 24/7 running
- Full documentation + video walkthrough
- 90 days of support
- Unlimited revisions

**Best For:**
- Complete marketing automation
- Content agencies
- Serious solo creators

**Premium Features:**
- AI content generation (Claude/GPT integration)
- Performance analytics
- A/B testing capability
- Custom reporting
- Priority support queue

**Process:**
1. Strategy call (60 minutes)
2. Detailed roadmap within 1 week
3. Milestone-based payments
4. Delivery in 21-30 days

**Charity Impact:**
$599.40 could provide:
- 60 meals through Feeding America
- 20 fully-stocked backpacks
- A week of after-school programs

Request a quote: support@ai-solutions.store`
    },
    {
        id: 'commission-enterprise',
        title: 'Enterprise Custom Build - $2,499+',
        price: '$2,499+',
        content: `**Enterprise Custom Build - $2,499+**
*60% ($1,499.40+) goes to charity*

**What You Get:**
- Fully custom automation system
- Tailored to your exact workflow
- White-label capability
- Team training included
- 6 months of support
- Quarterly updates included

**Built For:**
- Marketing agencies
- Content studios
- Enterprise teams
- Unique use cases

**Enterprise Features:**
- Multi-user support
- Role-based access
- Custom integrations
- SLA guarantee
- Dedicated support contact
- Source code ownership

**Process:**
1. Discovery workshop (2-3 hours)
2. Technical specification document
3. Phased development with milestones
4. Training and handoff
5. Ongoing support relationship

**Charity Impact:**
$1,499.40+ could provide:
- 150+ meals for hungry children
- Complete school supply drives
- Significant medical research funding

Enterprise inquiries: enterprise@ai-solutions.store`
    },
    {
        id: 'commission-rush',
        title: 'Rush Delivery Add-On',
        price: '+50%',
        content: `**Rush Delivery Add-On (+50%)**
*60% of the additional cost goes to charity*

**Need It Fast?**
Add rush delivery to any commission tier.

**Rush Timelines:**
- Basic: 7-14 days → 3-5 days
- Standard: 14-21 days → 7-10 days
- Premium: 21-30 days → 10-14 days
- Enterprise: Custom → Negotiated

**How It Works:**
- Add 50% to commission price
- We prioritize your project
- Same quality, faster delivery
- Extra charity impact

**Example:**
Standard Commission: $499
+ Rush Delivery: $249.50
Total: $748.50
Charity Impact: $449.10 (60%)

More urgency = More impact = FOR THE KIDS

Request rush delivery: support@ai-solutions.store`
    }
];

// ═══════════════════════════════════════════════════════════════════════════
// MEMBERSHIP TIERS
// ═══════════════════════════════════════════════════════════════════════════

const MEMBERSHIP_TIERS = [
    {
        id: 'tier-coffee',
        title: 'Coffee Tier - $5/month',
        price: '$5/month',
        charity_amount: '$3/month',
        content: `**Coffee Tier - $5/month**
*$3/month (60%) goes directly to children's charities*

**Perfect For:**
Supporters who want consistent, affordable impact

**What You Get:**
- Monthly charity impact report
- Supporter-only Discord channel
- Name in our supporters list
- Early announcements
- Good karma (scientifically proven*)

**Monthly Impact:**
$3/month = $36/year to charity
That's 36 meals, or a week of after-school programs, or hours of medical research.

**Why Monthly?**
Charities love predictable support. Your $3/month lets them plan ahead, budget effectively, and serve more kids.

*Karma claims not scientifically verified but spiritually guaranteed.

FOR THE KIDS - one coffee at a time.`
    },
    {
        id: 'tier-supporter',
        title: 'Supporter Tier - $15/month',
        price: '$15/month',
        charity_amount: '$9/month',
        content: `**Supporter Tier - $15/month**
*$9/month (60%) goes directly to children's charities*

**Perfect For:**
Creators and indie hackers who use our tools

**What You Get:**
- Everything in Coffee Tier
- 15% discount on all products
- Beta access to new tools
- Priority support (24-hour response)
- Monthly behind-the-scenes update
- Vote on quarterly charity selection

**Monthly Impact:**
$9/month = $108/year to charity
That's 100+ meals, multiple backpacks, or significant program support.

**Supporter Perks:**
- Early access to Claude Droid updates
- Beta testing of new automation tools
- Direct feedback channel to dev team
- Exclusive tutorials and guides

FOR THE KIDS - with exclusive perks for you.`
    },
    {
        id: 'tier-builder',
        title: 'Builder Tier - $35/month',
        price: '$35/month',
        charity_amount: '$21/month',
        content: `**Builder Tier - $35/month**
*$21/month (60%) goes directly to children's charities*

**Perfect For:**
Serious creators and small agencies

**What You Get:**
- Everything in Supporter Tier
- 25% discount on all products
- Monthly 15-min strategy call
- Priority commission queue
- Early access (2 weeks before public)
- Input on product roadmap
- Logo in README (optional)

**Monthly Impact:**
$21/month = $252/year to charity
That's 250+ meals, 8 fully-stocked backpacks, or meaningful program funding.

**Builder Benefits:**
- Use your call for debugging, strategy, or just chatting
- Your feature requests get prioritized
- Direct Slack/Discord DM access
- Exclusive Builder-only webinars

FOR THE KIDS - while building your empire.`
    },
    {
        id: 'tier-gold',
        title: 'Gold Tier - $75/month',
        price: '$75/month',
        charity_amount: '$45/month',
        content: `**Gold Tier - $75/month**
*$45/month (60%) goes directly to children's charities*

**Perfect For:**
Agencies, power users, and automation enthusiasts

**What You Get:**
- Everything in Builder Tier
- 40% discount on all products
- Monthly 30-min call (strategy, debugging, anything)
- Free copy of every new product
- One custom automation request per quarter
- VIP support (same-day response)
- Name on supporters wall
- Quarterly charity selection input

**Monthly Impact:**
$45/month = $540/year to charity
That's 500+ meals, 18 backpacks, or major program support.

**Gold Exclusives:**
- Private Gold-only Discord channel
- First look at everything we build
- Your automation ideas influence development
- White-glove onboarding for any product

FOR THE KIDS - at serious scale.`
    },
    {
        id: 'tier-platinum',
        title: 'Platinum Tier - $150/month',
        price: '$150/month',
        charity_amount: '$90/month',
        content: `**Platinum Tier - $150/month**
*$90/month (60%) goes directly to children's charities*

**Perfect For:**
Businesses, sponsors, and major supporters

**What You Get:**
- Everything in Gold Tier
- 50% discount on all products and commissions
- Weekly check-in calls available
- Two custom automation requests per quarter
- Logo on our website and all products
- Quarterly impact report with your name
- Direct phone/text access to founder
- Invite to annual supporters dinner

**Monthly Impact:**
$90/month = $1,080/year to charity
That's 1,000+ meals, 36 backpacks, or transformative program support.

**Platinum Exclusives:**
- You're basically a co-founder at this point
- Input on major business decisions
- First refusal on partnership opportunities
- Custom charity selection (nominate your local cause)

FOR THE KIDS - maximum impact, maximum partnership.

Limited to 10 Platinum members to maintain quality.`
    }
];

// ═══════════════════════════════════════════════════════════════════════════
// CONTENT GENERATION
// ═══════════════════════════════════════════════════════════════════════════

const ALL_CONTENT = [
    ...PAGE_DESCRIPTIONS.map(c => ({ ...c, category: 'page_description' })),
    ...GOAL_DESCRIPTIONS.map(c => ({ ...c, category: 'goal_description' })),
    ...THANK_YOU_MESSAGES.map(c => ({ ...c, category: 'thank_you_message' })),
    ...COMMISSION_OFFERINGS.map(c => ({ ...c, category: 'commission_offering' })),
    ...MEMBERSHIP_TIERS.map(c => ({ ...c, category: 'membership_tier' }))
];

function getState() {
    try {
        if (fs.existsSync(STATE_FILE)) {
            return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
        }
    } catch (err) {
        log(`Error reading state: ${err.message}`);
    }
    return { lastIndex: -1, generated: [] };
}

function saveState(state) {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function getNextContent() {
    const state = getState();
    const nextIndex = (state.lastIndex + 1) % ALL_CONTENT.length;
    return { content: ALL_CONTENT[nextIndex], index: nextIndex };
}

function generateFullReport() {
    log('Generating full Ko-fi content report...');

    let report = `# Ko-fi Page Content - Complete Guide
**Generated:** ${new Date().toISOString()}
**FOR THE KIDS - 60% to Charity**

═══════════════════════════════════════════════════════════════════════════════

## Revenue Split
- **60%** - Children's Charities (St. Jude, Feeding America, Boys & Girls Clubs)
- **30%** - Operations (servers, APIs, infrastructure)
- **10%** - Development (new tools, improvements)

═══════════════════════════════════════════════════════════════════════════════

`;

    // Page Descriptions
    report += `## PAGE DESCRIPTIONS
*Choose one for your main Ko-fi page*

`;
    PAGE_DESCRIPTIONS.forEach((desc, i) => {
        report += `### ${i + 1}. ${desc.title}
\`\`\`
${desc.content}
\`\`\`

---

`;
    });

    // Goal Descriptions
    report += `## GOAL DESCRIPTIONS
*Use these for Ko-fi fundraising goals*

`;
    GOAL_DESCRIPTIONS.forEach((goal, i) => {
        report += `### ${i + 1}. ${goal.title} (${goal.goal_amount})
\`\`\`
${goal.content}
\`\`\`

---

`;
    });

    // Thank You Messages
    report += `## THANK YOU MESSAGES
*Customize these for automatic thank-you emails*

`;
    THANK_YOU_MESSAGES.forEach((msg, i) => {
        report += `### ${i + 1}. ${msg.title} (${msg.type})
\`\`\`
${msg.content}
\`\`\`

---

`;
    });

    // Commission Offerings
    report += `## COMMISSION OFFERINGS
*Use these for your Ko-fi commissions page*

`;
    COMMISSION_OFFERINGS.forEach((comm, i) => {
        report += `### ${i + 1}. ${comm.title}
\`\`\`
${comm.content}
\`\`\`

---

`;
    });

    // Membership Tiers
    report += `## MEMBERSHIP TIERS
*Configure these in Ko-fi membership settings*

`;
    MEMBERSHIP_TIERS.forEach((tier, i) => {
        report += `### ${i + 1}. ${tier.title} (${tier.charity_amount} to charity)
\`\`\`
${tier.content}
\`\`\`

---

`;
    });

    // Quick Reference
    report += `## QUICK REFERENCE

### Charity Impact Calculator
| Tier | Monthly | Annual | Charity (60%) |
|------|---------|--------|---------------|
| Coffee | $5 | $60 | $36/year |
| Supporter | $15 | $180 | $108/year |
| Builder | $35 | $420 | $252/year |
| Gold | $75 | $900 | $540/year |
| Platinum | $150 | $1,800 | $1,080/year |

### Commission Impact
| Level | Price | Charity (60%) |
|-------|-------|---------------|
| Basic | $199 | $119.40 |
| Standard | $499 | $299.40 |
| Premium | $999 | $599.40 |
| Enterprise | $2,499+ | $1,499.40+ |

### Links
- Store: https://ai-solutions.store
- Twitter: @AiCollab4Kids
- Support: support@ai-solutions.store

═══════════════════════════════════════════════════════════════════════════════

*Generated by Ko-fi Content Generator*
*FOR THE KIDS - Every Dollar Counts*
`;

    return report;
}

async function main() {
    log('═══════════════════════════════════════════════════════════════');
    log('KO-FI CONTENT GENERATOR');
    log('FOR THE KIDS - 60% to Charity');
    log('═══════════════════════════════════════════════════════════════');

    // Generate full report
    const fullReport = generateFullReport();
    fs.writeFileSync(CONTENT_FILE, fullReport);
    log(`\nFull content report saved to: ${CONTENT_FILE}`);

    // Also get next rotating content
    const { content, index } = getNextContent();

    log(`\n───────────────────────────────────────────────────────────────`);
    log(`ROTATING CONTENT: ${index + 1} of ${ALL_CONTENT.length}`);
    log(`Category: ${content.category}`);
    log(`Title: ${content.title}`);
    log(`───────────────────────────────────────────────────────────────`);

    // Update state
    const state = getState();
    state.lastIndex = index;
    state.generated.push({
        id: content.id,
        category: content.category,
        title: content.title,
        generatedAt: new Date().toISOString()
    });
    if (state.generated.length > 100) state.generated = state.generated.slice(-100);
    saveState(state);

    // Log summary
    log('\n═══════════════════════════════════════════════════════════════');
    log('CONTENT SUMMARY');
    log('═══════════════════════════════════════════════════════════════');
    log(`Page Descriptions: ${PAGE_DESCRIPTIONS.length}`);
    log(`Goal Descriptions: ${GOAL_DESCRIPTIONS.length}`);
    log(`Thank You Messages: ${THANK_YOU_MESSAGES.length}`);
    log(`Commission Offerings: ${COMMISSION_OFFERINGS.length}`);
    log(`Membership Tiers: ${MEMBERSHIP_TIERS.length}`);
    log(`Total Content Pieces: ${ALL_CONTENT.length}`);
    log('═══════════════════════════════════════════════════════════════');

    log('\n═══════════════════════════════════════════════════════════════');
    log('PREVIEW - Current Rotating Content');
    log('═══════════════════════════════════════════════════════════════');
    log(`\nCategory: ${content.category}`);
    log(`Title: ${content.title}`);
    log(`\n${content.content.substring(0, 500)}...`);
    log('\n═══════════════════════════════════════════════════════════════');
    log('SUCCESS: Ko-fi content generated');
    log(`Full report: ${CONTENT_FILE}`);
    log(`State file: ${STATE_FILE}`);
    log(`Log file: ${LOG_FILE}`);
    log('═══════════════════════════════════════════════════════════════');
    log('FOR THE KIDS - 60% of all support goes to charity');
    log('═══════════════════════════════════════════════════════════════');

    process.exit(0);
}

if (require.main === module) {
    main();
}

module.exports = {
    PAGE_DESCRIPTIONS,
    GOAL_DESCRIPTIONS,
    THANK_YOU_MESSAGES,
    COMMISSION_OFFERINGS,
    MEMBERSHIP_TIERS,
    ALL_CONTENT
};
