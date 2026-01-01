/**
 * GitHub Sponsors Tier Content Generator
 * Complete tier system with benefits, thank you messages, and sponsor shoutouts
 *
 * FOR THE KIDS - 60% of all sponsorship proceeds go directly to children's charities
 * This is our core mission. Every sponsor directly helps kids in need.
 *
 * FOR THE KIDS - 60/30/10 split (60% kids charity, 30% development, 10% operations)
 */

const fs = require('fs');
const path = require('path');

const LOGS_DIR = 'C:\\AiCollabForTheKids\\logs';
const STATE_FILE = path.join(LOGS_DIR, 'github-sponsors-tiers-state.json');
const LOG_FILE = path.join(LOGS_DIR, 'github-sponsors-tiers.log');
const TIERS_OUTPUT_FILE = path.join(LOGS_DIR, 'github-sponsors-tiers-content.md');
const SHOUTOUTS_FILE = path.join(LOGS_DIR, 'github-sponsors-shoutouts.md');

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
// SPONSORSHIP TIERS - FOR THE KIDS
// ═══════════════════════════════════════════════════════════════════════════

const SPONSORSHIP_TIERS = [
    {
        id: 'tier-5',
        name: 'Kid Champion',
        price: 5,
        emoji: '🌟',
        tagline: 'Every dollar counts for the kids',
        charityAmount: 3, // 60% of $5
        description: `Your $5/month makes a real difference. $3 goes directly to children's charities supporting education, healthcare, and basic needs for kids in need.`,
        benefits: [
            'Name listed in our SUPPORTERS.md file',
            'Sponsor badge on GitHub profile',
            'Access to sponsor-only Discord channel',
            'Monthly newsletter with charity impact updates',
            'Early access to product announcements',
            'Our heartfelt thanks for helping kids'
        ],
        thankYouMessage: `
Thank you for being a Kid Champion! 🌟

Your $5/month sponsorship means everything to us and the children we help.

Here's what your support does:
- $3/month goes DIRECTLY to children's charities (60%)
- $1.50/month helps us build better automation tools
- $0.50/month covers operational costs

You're not just supporting open source - you're feeding hungry kids, supporting education, and giving children hope for a better future.

We'll keep you updated on the impact we're making together. Welcome to the family!

FOR THE KIDS,
The AI Solutions Team
        `,
        badgeText: '🌟 Kid Champion',
        color: '#FFD700'
    },
    {
        id: 'tier-10',
        name: 'Child Advocate',
        price: 10,
        emoji: '💪',
        tagline: 'Double the impact for children in need',
        charityAmount: 6, // 60% of $10
        description: `$6 of your $10/month goes straight to helping kids. You're directly funding meals, school supplies, and healthcare for children who need it most.`,
        benefits: [
            'Everything in Kid Champion tier',
            'Priority issue responses',
            'Access to beta features before public release',
            'Quarterly video update on charity impact',
            'Vote on which charities we support',
            'Special Discord role and recognition'
        ],
        thankYouMessage: `
Thank you for being a Child Advocate! 💪

Your $10/month sponsorship is making a tangible difference in children's lives.

Your impact breakdown:
- $6/month feeds, educates, and cares for kids in need (60%)
- $3/month accelerates our development efforts
- $1/month keeps our infrastructure running

At this level, you're helping us provide:
- School supplies for underprivileged children
- Nutritious meals for hungry kids
- Medical care for those without access

You have a real voice in our charity selection. We'll reach out about upcoming votes!

FOR THE KIDS - with gratitude,
The AI Solutions Team
        `,
        badgeText: '💪 Child Advocate',
        color: '#4CAF50'
    },
    {
        id: 'tier-25',
        name: 'Youth Hero',
        price: 25,
        emoji: '🦸',
        tagline: 'A hero for children everywhere',
        charityAmount: 15, // 60% of $25
        description: `$15/month to kids charities! Your generosity provides significant impact - sponsoring education programs, after-school care, and essential services for vulnerable children.`,
        benefits: [
            'Everything in Child Advocate tier',
            'Monthly 15-minute strategy call (Q&A, debugging, roadmap)',
            'Feature request priority queue',
            'Name/logo in our README sponsors section',
            'Early access to all new products (1 week before launch)',
            'Exclusive Youth Hero badge in all communications',
            'Annual charity impact report with your name highlighted'
        ],
        thankYouMessage: `
Thank you for being a Youth Hero! 🦸

Your $25/month sponsorship is HEROIC. You're literally changing children's lives.

Your superhero impact:
- $15/month provides significant support to kids charities (60%)
- $7.50/month helps us build world-class automation tools
- $2.50/month maintains our systems

At $15/month to charity, you're helping us:
- Sponsor a child's education for a month
- Provide 60+ meals to hungry children
- Fund after-school programs
- Support children's mental health services

Your monthly call is scheduled - we'll reach out to set it up. Let's build something amazing together while helping kids!

FOR THE KIDS - you're our hero,
The AI Solutions Team
        `,
        badgeText: '🦸 Youth Hero',
        color: '#2196F3'
    },
    {
        id: 'tier-50',
        name: 'Children\'s Guardian',
        price: 50,
        emoji: '🛡️',
        tagline: 'Guarding the future of our children',
        charityAmount: 30, // 60% of $50
        description: `$30/month protecting children. As a Guardian, you're funding substantial programs - emergency assistance, educational scholarships, and long-term support for at-risk youth.`,
        benefits: [
            'Everything in Youth Hero tier',
            'Monthly 30-minute personal call',
            'Direct Slack/Discord access to the team',
            'Custom feature development consideration',
            'Logo prominently displayed on website',
            'Free access to one product of your choice',
            'Quarterly charity site visit reports (photos/stories)',
            'Co-branded charity impact certificate',
            'Vote on major product direction decisions'
        ],
        thankYouMessage: `
Thank you for being a Children's Guardian! 🛡️

Your $50/month sponsorship is EXTRAORDINARY. You're a true guardian of children's futures.

Your guardian impact:
- $30/month provides substantial charity funding (60%)
- $15/month supercharges our development
- $5/month covers all operational needs

As a Guardian, your $30/month helps us:
- Fund emergency assistance for families in crisis
- Provide educational scholarships
- Support long-term programs for at-risk youth
- Enable children's healthcare initiatives

You get direct access to our team and a free product. We'll set up your calls and access immediately.

We'll send quarterly reports showing exactly where your money goes and the kids you're helping.

FOR THE KIDS - with deep gratitude,
The AI Solutions Team
        `,
        badgeText: '🛡️ Children\'s Guardian',
        color: '#9C27B0'
    },
    {
        id: 'tier-100',
        name: 'Kids\' Champion Elite',
        price: 100,
        emoji: '👑',
        tagline: 'The ultimate champion for children',
        charityAmount: 60, // 60% of $100
        description: `$60/month changing children's lives! As our Elite Champion, you're a cornerstone of our mission - funding comprehensive programs, emergency responses, and transformational support for kids worldwide.`,
        benefits: [
            'Everything in Children\'s Guardian tier',
            'Weekly 30-minute calls if needed',
            'Unlimited direct access to founders',
            'Free access to ALL products (current and future)',
            'Custom development hours (2 hours/month)',
            'Top logo placement on website and all marketing',
            'Named charity initiative in your honor',
            'Annual in-person thank you event invitation',
            'Board advisory input on charity allocation',
            'Personalized video thank you from kids we help',
            'Legacy recognition in our Hall of Champions'
        ],
        thankYouMessage: `
Thank you for being a Kids' Champion Elite! 👑

Your $100/month sponsorship is TRANSFORMATIONAL. You're not just a sponsor - you're family.

Your elite champion impact:
- $60/month provides life-changing support for children (60%)
- $30/month enables rapid innovation and development
- $10/month ensures bulletproof operations

At $60/month to charity, you're helping us:
- Fund comprehensive child welfare programs
- Provide emergency response for children in crisis
- Support transformational education initiatives
- Enable healthcare and mental health services
- Build long-term sustainable support systems

As our Elite Champion:
- All products are yours, forever
- You have our cell phones - call anytime
- We're naming a charity initiative after you
- You'll receive videos from the kids you help

You're in our Hall of Champions forever. We're honored to have you.

FOR THE KIDS - with profound gratitude and respect,
The AI Solutions Team
        `,
        badgeText: '👑 Kids\' Champion Elite',
        color: '#FF5722'
    }
];

// ═══════════════════════════════════════════════════════════════════════════
// SPONSOR SHOUTOUT TEMPLATES
// ═══════════════════════════════════════════════════════════════════════════

const SHOUTOUT_TEMPLATES = {
    twitter: [
        '🙏 Huge thanks to {name} for joining as a {tier}! ${charityAmount}/month going directly to kids charities. FOR THE KIDS! #OpenSource #Charity',
        'Welcome {name} to our {tier} sponsors! 60% of your sponsorship helps children in need. You\'re amazing! FOR THE KIDS 🧒💙',
        '{name} just became a {tier}! That\'s ${charityAmount}/month feeding, educating, and caring for kids. Thank you! FOR THE KIDS 🌟',
        'Shoutout to {name} - our newest {tier}! Your generosity changes children\'s lives. 60% goes directly to kids charities! 🦸',
        'Thank you {name} for sponsoring at {tier} level! ${charityAmount}/month to children\'s charities. Heroes walk among us! FOR THE KIDS 👑'
    ],
    readme: [
        '### {tier} Sponsors\n\nThank you to {name} for their generous support! ${charityAmount}/month goes directly to children\'s charities.\n\n**FOR THE KIDS**',
        '## 🌟 Our Amazing {tier} Sponsors\n\n| Sponsor | Impact |\n|---------|--------|\n| {name} | ${charityAmount}/month to kids charities |\n\n*60% of all sponsorships support children in need*'
    ],
    discord: [
        '🎉 Welcome {name} to the family! They\'ve joined as a **{tier}** - that\'s ${charityAmount}/month going to help kids! FOR THE KIDS!',
        '👏 Everyone give it up for {name}! New **{tier}** sponsor helping children through their generosity. 60% to charity!',
        '🙌 {name} just leveled up our mission! As a **{tier}**, they\'re sending ${charityAmount}/month to kids charities. THANK YOU!'
    ],
    newsletter: [
        '## Sponsor Spotlight: {name}\n\nWe\'re thrilled to welcome {name} as a **{tier}** sponsor! Their ${charityAmount}/month contribution goes directly to children\'s charities.\n\n*This is what FOR THE KIDS means - real people making real impact.*',
        '## New Champion: {name}\n\n{name} has joined our mission as a **{tier}**! With 60% of sponsorships going to kids charities, that\'s ${charityAmount}/month changing children\'s lives.\n\n**Thank you for being a hero for kids!**'
    ]
};

// ═══════════════════════════════════════════════════════════════════════════
// CHARITY TRANSPARENCY CONTENT
// ═══════════════════════════════════════════════════════════════════════════

const CHARITY_TRANSPARENCY = {
    title: 'Where Your Money Goes - 100% Transparency',
    commitment: 'FOR THE KIDS means 60% of every sponsorship dollar goes directly to children\'s charities.',
    breakdown: {
        charity: { percent: 60, description: 'Direct donation to vetted children\'s charities' },
        development: { percent: 30, description: 'Building and improving automation tools' },
        operations: { percent: 10, description: 'Infrastructure, hosting, and operational costs' }
    },
    charityPartners: [
        { name: 'St. Jude Children\'s Research Hospital', focus: 'Childhood cancer research and treatment' },
        { name: 'Save the Children', focus: 'Global child welfare and education' },
        { name: 'Feeding America - Child Hunger', focus: 'Meals for hungry children in America' },
        { name: 'UNICEF', focus: 'Global children\'s emergency relief' },
        { name: 'Local Children\'s Hospitals', focus: 'Regional pediatric healthcare' }
    ],
    impactMetrics: `
## Monthly Impact Report

We publish monthly transparency reports showing:
- Total sponsorship received
- Exact amount donated to each charity
- Children helped (meals, education, healthcare)
- Stories from the organizations we support

### Example Impact (per $100 sponsored)

| Category | Amount | Impact |
|----------|--------|--------|
| Kids Charities | $60 | 240 meals OR 3 months education supplies OR 2 medical checkups |
| Development | $30 | 1 hour of focused development time |
| Operations | $10 | Hosting and infrastructure |

**Every dollar is tracked. Every child matters. FOR THE KIDS.**
    `
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

function getState() {
    try {
        if (fs.existsSync(STATE_FILE)) {
            return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
        }
    } catch (err) {
        log(`Error reading state: ${err.message}`);
    }
    return { lastGenerated: null, generations: [], sponsors: [] };
}

function saveState(state) {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function generateTierContent() {
    let content = `# GitHub Sponsors Tier Content
## FOR THE KIDS - 60% to Children's Charities

**Generated:** ${new Date().toISOString()}

---

# Our Mission

**FOR THE KIDS** isn't just a slogan - it's our core commitment. 60% of every sponsorship dollar goes directly to children's charities. We build automation tools, but our real purpose is helping kids.

---

# Sponsorship Tiers

`;

    SPONSORSHIP_TIERS.forEach(tier => {
        content += `
## ${tier.emoji} ${tier.name} - $${tier.price}/month

> "${tier.tagline}"

**Charity Impact:** $${tier.charityAmount}/month goes directly to kids charities (60%)

### Description
${tier.description}

### Benefits
${tier.benefits.map(b => `- ${b}`).join('\n')}

### Thank You Message Template
\`\`\`
${tier.thankYouMessage.trim()}
\`\`\`

---

`;
    });

    // Add charity transparency section
    content += `
# ${CHARITY_TRANSPARENCY.title}

${CHARITY_TRANSPARENCY.commitment}

## The 60/30/10 Split

| Category | Percentage | Description |
|----------|------------|-------------|
| Kids Charities | ${CHARITY_TRANSPARENCY.breakdown.charity.percent}% | ${CHARITY_TRANSPARENCY.breakdown.charity.description} |
| Development | ${CHARITY_TRANSPARENCY.breakdown.development.percent}% | ${CHARITY_TRANSPARENCY.breakdown.development.description} |
| Operations | ${CHARITY_TRANSPARENCY.breakdown.operations.percent}% | ${CHARITY_TRANSPARENCY.breakdown.operations.description} |

## Our Charity Partners

${CHARITY_TRANSPARENCY.charityPartners.map(c => `- **${c.name}** - ${c.focus}`).join('\n')}

${CHARITY_TRANSPARENCY.impactMetrics}

---

# Quick Copy-Paste for GitHub Sponsors Setup

## Tier 1: $5/month
\`\`\`markdown
### ${SPONSORSHIP_TIERS[0].emoji} ${SPONSORSHIP_TIERS[0].name}

${SPONSORSHIP_TIERS[0].description}

**What you get:**
${SPONSORSHIP_TIERS[0].benefits.slice(0, 4).map(b => `- ${b}`).join('\n')}

*$${SPONSORSHIP_TIERS[0].charityAmount}/month goes directly to kids charities*
\`\`\`

## Tier 2: $10/month
\`\`\`markdown
### ${SPONSORSHIP_TIERS[1].emoji} ${SPONSORSHIP_TIERS[1].name}

${SPONSORSHIP_TIERS[1].description}

**What you get:**
${SPONSORSHIP_TIERS[1].benefits.slice(0, 4).map(b => `- ${b}`).join('\n')}

*$${SPONSORSHIP_TIERS[1].charityAmount}/month goes directly to kids charities*
\`\`\`

## Tier 3: $25/month
\`\`\`markdown
### ${SPONSORSHIP_TIERS[2].emoji} ${SPONSORSHIP_TIERS[2].name}

${SPONSORSHIP_TIERS[2].description}

**What you get:**
${SPONSORSHIP_TIERS[2].benefits.slice(0, 5).map(b => `- ${b}`).join('\n')}

*$${SPONSORSHIP_TIERS[2].charityAmount}/month goes directly to kids charities*
\`\`\`

## Tier 4: $50/month
\`\`\`markdown
### ${SPONSORSHIP_TIERS[3].emoji} ${SPONSORSHIP_TIERS[3].name}

${SPONSORSHIP_TIERS[3].description}

**What you get:**
${SPONSORSHIP_TIERS[3].benefits.slice(0, 6).map(b => `- ${b}`).join('\n')}

*$${SPONSORSHIP_TIERS[3].charityAmount}/month goes directly to kids charities*
\`\`\`

## Tier 5: $100/month
\`\`\`markdown
### ${SPONSORSHIP_TIERS[4].emoji} ${SPONSORSHIP_TIERS[4].name}

${SPONSORSHIP_TIERS[4].description}

**What you get:**
${SPONSORSHIP_TIERS[4].benefits.slice(0, 6).map(b => `- ${b}`).join('\n')}
- And much more...

*$${SPONSORSHIP_TIERS[4].charityAmount}/month goes directly to kids charities*
\`\`\`

---

*Generated by AI Solutions Marketing Engine*
*FOR THE KIDS - https://ai-solutions.store*
`;

    return content;
}

function generateShoutoutContent(sponsorName = '{SPONSOR_NAME}', tierId = 'tier-25') {
    const tier = SPONSORSHIP_TIERS.find(t => t.id === tierId) || SPONSORSHIP_TIERS[2];

    let content = `# Sponsor Shoutout Templates for ${tier.name}
## FOR THE KIDS - 60% to Children's Charities

**Generated:** ${new Date().toISOString()}
**Sponsor:** ${sponsorName}
**Tier:** ${tier.name} ($${tier.price}/month)
**Charity Impact:** $${tier.charityAmount}/month

---

## Twitter/X Shoutouts

${SHOUTOUT_TEMPLATES.twitter.map((template, i) => {
    return `### Option ${i + 1}
\`\`\`
${template
    .replace(/{name}/g, sponsorName)
    .replace(/{tier}/g, tier.name)
    .replace(/{charityAmount}/g, tier.charityAmount.toString())}
\`\`\`
`;
}).join('\n')}

---

## README Sponsor Section

${SHOUTOUT_TEMPLATES.readme.map((template, i) => {
    return `### Option ${i + 1}
\`\`\`markdown
${template
    .replace(/{name}/g, sponsorName)
    .replace(/{tier}/g, tier.name)
    .replace(/{charityAmount}/g, tier.charityAmount.toString())}
\`\`\`
`;
}).join('\n')}

---

## Discord Announcements

${SHOUTOUT_TEMPLATES.discord.map((template, i) => {
    return `### Option ${i + 1}
\`\`\`
${template
    .replace(/{name}/g, sponsorName)
    .replace(/{tier}/g, tier.name)
    .replace(/{charityAmount}/g, tier.charityAmount.toString())}
\`\`\`
`;
}).join('\n')}

---

## Newsletter Feature

${SHOUTOUT_TEMPLATES.newsletter.map((template, i) => {
    return `### Option ${i + 1}
\`\`\`markdown
${template
    .replace(/{name}/g, sponsorName)
    .replace(/{tier}/g, tier.name)
    .replace(/{charityAmount}/g, tier.charityAmount.toString())}
\`\`\`
`;
}).join('\n')}

---

## Personalized Thank You Email

\`\`\`
Subject: Thank You for Being a ${tier.name}! FOR THE KIDS

${tier.thankYouMessage.trim()}
\`\`\`

---

## All Tier Summary for README

\`\`\`markdown
## Our Sponsors - FOR THE KIDS

60% of all sponsorships go directly to children's charities. Thank you to our amazing sponsors!

### ${SPONSORSHIP_TIERS[4].emoji} ${SPONSORSHIP_TIERS[4].name} ($${SPONSORSHIP_TIERS[4].price}/month)
*$${SPONSORSHIP_TIERS[4].charityAmount}/month to kids charities*
<!-- Add Elite sponsors here -->

### ${SPONSORSHIP_TIERS[3].emoji} ${SPONSORSHIP_TIERS[3].name} ($${SPONSORSHIP_TIERS[3].price}/month)
*$${SPONSORSHIP_TIERS[3].charityAmount}/month to kids charities*
<!-- Add Guardian sponsors here -->

### ${SPONSORSHIP_TIERS[2].emoji} ${SPONSORSHIP_TIERS[2].name} ($${SPONSORSHIP_TIERS[2].price}/month)
*$${SPONSORSHIP_TIERS[2].charityAmount}/month to kids charities*
<!-- Add Hero sponsors here -->

### ${SPONSORSHIP_TIERS[1].emoji} ${SPONSORSHIP_TIERS[1].name} ($${SPONSORSHIP_TIERS[1].price}/month)
*$${SPONSORSHIP_TIERS[1].charityAmount}/month to kids charities*
<!-- Add Advocate sponsors here -->

### ${SPONSORSHIP_TIERS[0].emoji} ${SPONSORSHIP_TIERS[0].name} ($${SPONSORSHIP_TIERS[0].price}/month)
*$${SPONSORSHIP_TIERS[0].charityAmount}/month to kids charities*
<!-- Add Champion sponsors here -->

---

**Want to join?** [Become a Sponsor](https://github.com/sponsors/Ai-Solutions-Store)

*Every dollar helps. 60% goes directly to children's charities.*
*FOR THE KIDS*
\`\`\`

---

*Generated by AI Solutions Marketing Engine*
*FOR THE KIDS - https://ai-solutions.store*
`;

    return content;
}

async function main() {
    log('═══════════════════════════════════════════════════════════════════════');
    log('GITHUB SPONSORS TIER CONTENT GENERATOR');
    log('FOR THE KIDS - 60% to Children\'s Charities');
    log('═══════════════════════════════════════════════════════════════════════');

    // Generate tier content
    log('\nGenerating sponsorship tier content...');
    const tierContent = generateTierContent();
    fs.writeFileSync(TIERS_OUTPUT_FILE, tierContent);
    log(`Tier content saved to: ${TIERS_OUTPUT_FILE}`);

    // Generate shoutout templates
    log('\nGenerating sponsor shoutout templates...');
    const shoutoutContent = generateShoutoutContent();
    fs.writeFileSync(SHOUTOUTS_FILE, shoutoutContent);
    log(`Shoutout templates saved to: ${SHOUTOUTS_FILE}`);

    // Update state
    const state = getState();
    state.lastGenerated = new Date().toISOString();
    state.generations.push({
        timestamp: new Date().toISOString(),
        tiersFile: TIERS_OUTPUT_FILE,
        shoutoutsFile: SHOUTOUTS_FILE
    });
    if (state.generations.length > 50) state.generations = state.generations.slice(-50);
    saveState(state);

    // Summary
    log('\n═══════════════════════════════════════════════════════════════════════');
    log('SPONSORSHIP TIERS SUMMARY');
    log('═══════════════════════════════════════════════════════════════════════');

    SPONSORSHIP_TIERS.forEach(tier => {
        log(`\n${tier.emoji} ${tier.name} - $${tier.price}/month`);
        log(`   Charity Impact: $${tier.charityAmount}/month (60%)`);
        log(`   Benefits: ${tier.benefits.length} items`);
    });

    log('\n═══════════════════════════════════════════════════════════════════════');
    log('CHARITY COMMITMENT');
    log('═══════════════════════════════════════════════════════════════════════');
    log('\n60/30/10 Split:');
    log('  - 60% Children\'s Charities');
    log('  - 30% Development');
    log('  - 10% Operations');

    const totalMonthlyIfAllTiers = SPONSORSHIP_TIERS.reduce((sum, t) => sum + t.charityAmount, 0);
    log(`\nIf one sponsor at each tier: $${totalMonthlyIfAllTiers}/month to kids charities`);

    log('\n═══════════════════════════════════════════════════════════════════════');
    log('FILES GENERATED');
    log('═══════════════════════════════════════════════════════════════════════');
    log(`\n1. ${TIERS_OUTPUT_FILE}`);
    log(`2. ${SHOUTOUTS_FILE}`);
    log(`3. ${LOG_FILE}`);
    log(`4. ${STATE_FILE}`);

    log('\n═══════════════════════════════════════════════════════════════════════');
    log('SUCCESS: GitHub Sponsors tier content generated');
    log('FOR THE KIDS - Every sponsor helps children in need');
    log('═══════════════════════════════════════════════════════════════════════');

    process.exit(0);
}

if (require.main === module) {
    main();
}

module.exports = {
    SPONSORSHIP_TIERS,
    SHOUTOUT_TEMPLATES,
    CHARITY_TRANSPARENCY,
    generateTierContent,
    generateShoutoutContent
};
