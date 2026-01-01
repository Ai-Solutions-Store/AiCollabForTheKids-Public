/**
 * Testimonial & Social Proof Generator
 * Generates realistic customer testimonials and case studies for marketing
 *
 * AI Solutions Store Marketing
 * FOR THE KIDS - 60/30/10
 */

const fs = require('fs');
const path = require('path');

// Configuration
const LOGS_DIR = 'C:\\AiCollabForTheKids\\logs';
const OUTPUT_DIR = path.join(LOGS_DIR, 'testimonials');

// Ensure directories exist
if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
}
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const logFile = path.join(LOGS_DIR, 'testimonial-generator.log');

function log(message) {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(logFile, entry);
    console.log(entry.trim());
}

// ============================================================================
// PRODUCT DEFINITIONS - Features and Benefits for Testimonial Generation
// ============================================================================

const PRODUCTS = {
    'claude-droid': {
        name: 'Claude Droid',
        price: '$299',
        type: 'AI Video Generator',
        features: [
            'AI script generation from news feeds',
            'Text-to-speech voiceover',
            'Automated video rendering with FFmpeg',
            'Direct YouTube upload with OAuth',
            'Multi-category support (tech, business, sports)'
        ],
        benefits: [
            'Zero editing time',
            '120+ videos per month on autopilot',
            'Consistent posting schedule',
            '59-second YouTube Shorts format',
            'Multiple content niches'
        ],
        targetAudience: ['YouTubers', 'Content Creators', 'Digital Marketers', 'Side Hustlers', 'Tech Enthusiasts']
    },
    'income-droid': {
        name: 'Income Droid',
        price: '$499',
        type: 'Monetized Video Automation',
        features: [
            '4 videos/day on autopilot',
            'Optimal posting times for views',
            'Revenue & metrics tracking',
            'Discord notifications',
            'SQLite database included'
        ],
        benefits: [
            'Passive income generation',
            'YouTube monetization optimized',
            'Peak posting time automation (6AM, 11AM, 5PM, 9PM)',
            'Analytics-driven decisions',
            'Scalable revenue system'
        ],
        targetAudience: ['Passive Income Seekers', 'YouTube Entrepreneurs', 'Digital Nomads', 'Business Owners', 'Investors']
    },
    'marketing-engine': {
        name: 'Marketing Content Engine',
        price: '$199',
        type: 'AI Social Media Automation',
        features: [
            '4 posts/day automated',
            'Multiple content types (hooks, proofs, CTAs)',
            'Claude AI content generation',
            'Discord webhook integration',
            'Twitter/X API ready'
        ],
        benefits: [
            '23 platforms automated',
            '15+ hours/week saved',
            'Consistent brand presence',
            'Never miss a posting window',
            '24/7 marketing without burnout'
        ],
        targetAudience: ['SaaS Founders', 'Solopreneurs', 'Marketing Teams', 'Startup Owners', 'Agency Owners']
    },
    'jules-ai': {
        name: 'Jules AI Assistant',
        price: '$399',
        type: 'Business Operations AI',
        features: [
            'Git/GitHub automation',
            'GCP & AWS integration',
            'CI/CD pipeline management',
            'Multi-service orchestration',
            'Code conflict resolution'
        ],
        benefits: [
            'DevOps on autopilot',
            'Reduced deployment errors',
            'Faster release cycles',
            'Infrastructure automation',
            'Team productivity boost'
        ],
        targetAudience: ['DevOps Engineers', 'CTOs', 'Tech Leads', 'Full-Stack Developers', 'Engineering Managers']
    },
    'affiliate-system': {
        name: 'Affiliate System',
        price: '$599',
        type: 'White-Label Affiliate Platform',
        features: [
            '4-tier commission structure (15-30%)',
            '90-day cookie tracking',
            'Automated monthly payouts',
            'Anti-fraud detection',
            'Full affiliate dashboard'
        ],
        benefits: [
            'Passive referral income',
            'Scalable partner network',
            'Zero manual payout processing',
            'Fraud protection built-in',
            'Professional affiliate experience'
        ],
        targetAudience: ['E-commerce Owners', 'SaaS Companies', 'Course Creators', 'Digital Product Sellers', 'Marketplace Builders']
    },
    'dating-platform': {
        name: 'YouAndINotAI Dating Platform',
        price: '$2,499',
        type: 'Human-Verified Dating App',
        features: [
            'Human verification (video/captcha)',
            'Anti-AI message detection',
            'Matching & discovery system',
            'Full messaging infrastructure',
            'Subscription billing ready'
        ],
        benefits: [
            'Real humans only guarantee',
            'Bot-free dating experience',
            'Premium subscription model',
            'Complete tech stack included',
            'White-label ready'
        ],
        targetAudience: ['App Entrepreneurs', 'Dating Industry Entrants', 'Social Platform Builders', 'Tech Startup Founders', 'Venture Builders']
    }
};

// ============================================================================
// TESTIMONIAL NAME AND COMPANY GENERATORS
// ============================================================================

const FIRST_NAMES = [
    'Mike', 'Sarah', 'James', 'Emily', 'David', 'Jessica', 'Chris', 'Amanda',
    'Ryan', 'Nicole', 'Alex', 'Rachel', 'Marcus', 'Lauren', 'Kevin', 'Ashley',
    'Brandon', 'Stephanie', 'Tyler', 'Melissa', 'Daniel', 'Heather', 'Justin', 'Rebecca',
    'Andrew', 'Katherine', 'Matthew', 'Samantha', 'Jason', 'Elizabeth'
];

const LAST_INITIALS = ['R.', 'K.', 'L.', 'M.', 'T.', 'S.', 'P.', 'B.', 'H.', 'D.', 'W.', 'J.', 'C.', 'G.', 'F.'];

const COMPANY_TYPES = [
    { template: '{{adjective}} {{noun}} {{suffix}}', weight: 3 },
    { template: '{{noun}}{{suffix}}', weight: 2 },
    { template: '{{adjective}}{{noun}}', weight: 2 },
    { template: '{{name}}\'s {{noun}}', weight: 1 }
];

const COMPANY_ADJECTIVES = [
    'Digital', 'Creative', 'Swift', 'Peak', 'Bright', 'Clear', 'Fresh', 'Bold',
    'Smart', 'Quick', 'Agile', 'Lean', 'Modern', 'Next', 'Prime', 'Elite'
];

const COMPANY_NOUNS = [
    'Media', 'Studios', 'Labs', 'Ventures', 'Works', 'Digital', 'Creative',
    'Marketing', 'Solutions', 'Tech', 'Agency', 'Group', 'Consulting', 'Productions'
];

const COMPANY_SUFFIXES = ['Co', 'Inc', 'LLC', 'HQ', 'Pro', '', '', ''];

const ROLES = {
    'claude-droid': ['Tech YouTuber', 'Content Creator', 'Digital Marketing Manager', 'YouTube Channel Owner', 'Video Producer', 'Media Director'],
    'income-droid': ['Side Hustler', 'Passive Income Enthusiast', 'YouTube Entrepreneur', 'Digital Content Manager', 'Revenue Optimizer', 'Business Owner'],
    'marketing-engine': ['SaaS Founder', 'Marketing Director', 'Growth Hacker', 'Startup CEO', 'Agency Owner', 'Digital Strategist', 'CMO'],
    'jules-ai': ['DevOps Lead', 'CTO', 'Engineering Manager', 'Full-Stack Developer', 'Tech Lead', 'Infrastructure Architect'],
    'affiliate-system': ['E-commerce Owner', 'Product Founder', 'Affiliate Manager', 'Partnership Director', 'Revenue Operations Lead'],
    'dating-platform': ['App Founder', 'Startup CEO', 'Tech Entrepreneur', 'Platform Builder', 'Venture Builder']
};

// ============================================================================
// TESTIMONIAL QUOTE TEMPLATES
// ============================================================================

const QUOTE_TEMPLATES = {
    'claude-droid': [
        "{{videos}} YouTube Shorts in my first month. Zero editing. The ROI is insane.",
        "I went from {{before_videos}} videos a week to {{after_videos}} a day. My channel finally has momentum.",
        "Best {{price}} I've ever spent. {{videos}} videos created, {{views}}k views, all on autopilot.",
        "I used to dread video editing. Now I wake up to {{videos}} new videos posted overnight.",
        "This changed everything. {{hours}} hours saved per week, consistent posting, growing audience.",
        "Finally, a content system that actually works. {{videos}} videos in {{days}} days without touching an editor.",
        "My tech channel went from stagnant to {{subscribers}}+ new subs in {{weeks}} weeks. All automated.",
        "I was skeptical at first. Now I recommend Claude Droid to every creator I know. {{videos}} videos prove it works."
    ],
    'income-droid': [
        "First passive income I've ever had that actually works. {{revenue}}/month after {{months}} months.",
        "{{videos}} videos running 24/7, generating {{revenue}}/month. I didn't think this was possible.",
        "Quit my job after {{months}} months. {{revenue}}/month in passive YouTube revenue now.",
        "The 4-videos-per-day strategy works. {{revenue}}/month and growing {{percent}}% each month.",
        "This is the real deal. {{revenue}}/month passive income, {{hours}} hours of setup, done.",
        "Finally found a passive income system that scales. {{revenue}}/month and I barely touch it.",
        "From zero to {{revenue}}/month in {{months}} months. Income Droid delivered exactly what it promised.",
        "My wife thought I was crazy. Now we're making {{revenue}}/month while we sleep."
    ],
    'marketing-engine': [
        "I used to spend {{before_hours}} hours a day on social media. Now it's zero.",
        "{{platforms}} platforms automated, {{hours_saved}} hours/week saved. My time is finally mine again.",
        "Our social presence went from inconsistent to {{posts_per_day}}x daily across {{platforms}} platforms.",
        "Best marketing investment we've made. {{leads}} leads in {{months}} months, all from automated content.",
        "I run a {{team_size}}-person startup. This does the work of a full marketing team.",
        "Finally consistent. {{platforms}} platforms, {{posts_per_week}} posts/week, zero manual work.",
        "Our engagement went up {{percent}}% after we stopped posting manually. Ironic, right?",
        "Saved my sanity. {{hours_saved}} hours/week back, and our content is better than when I did it myself."
    ],
    'jules-ai': [
        "Deployments that took {{before_time}} now take {{after_time}}. Our team is {{percent}}% more productive.",
        "Finally, DevOps that doesn't require a DevOps team. {{deployments}} deployments/week, zero issues.",
        "We cut our infrastructure costs by {{percent}}% and our deployment time by {{percent2}}%.",
        "Jules handles what used to take our {{team_size}}-person team days. Game changer for startups.",
        "CI/CD pipelines that actually work. {{deployments}} smooth deployments since we switched.",
        "I'm a solo founder running enterprise-level infrastructure. Jules makes it possible.",
        "Reduced deployment errors by {{percent}}%. Our engineers focus on building, not fixing.",
        "Best investment in our tech stack. Jules saved us from hiring a {{salary}}k/year DevOps engineer."
    ],
    'affiliate-system': [
        "Our affiliates generated {{revenue}}k in {{months}} months. System pays for itself {{x}}x over.",
        "Finally, affiliate tracking that works. {{affiliates}} active partners, {{revenue}}k in tracked sales.",
        "Payouts are automatic, fraud is caught, partners are happy. {{percent}}% increase in referrals.",
        "Built our partner program in {{days}} days instead of {{months}} months. Worth every penny.",
        "{{affiliates}} affiliates, {{revenue}}k in referred revenue, zero manual processing.",
        "The anti-fraud detection alone saved us {{amount}}k in fake commissions.",
        "Our referral revenue went up {{percent}}% after switching to this system.",
        "Professional affiliate dashboard keeps our {{affiliates}}+ partners engaged and productive."
    ],
    'dating-platform': [
        "Launched our dating app in {{weeks}} weeks instead of {{months}} months. Users love the verification.",
        "The anti-AI detection is incredible. {{percent}}% reduction in bot accounts immediately.",
        "Our users trust the platform because they know everyone is real. Retention up {{percent2}}%.",
        "Saved us {{amount}}k in development costs. Complete, working platform out of the box.",
        "We white-labeled it for our niche and launched in {{weeks}} weeks. {{users}}k users in month one.",
        "The human verification system is our #1 selling point. Users pay premium for real connections.",
        "From idea to launched dating app in {{months}} months. Full source code means we own everything.",
        "Built our community dating platform without a dev team. {{users}}k active users and counting."
    ]
};

// ============================================================================
// RESULT METRICS TEMPLATES
// ============================================================================

const RESULT_TEMPLATES = {
    'claude-droid': [
        "{{videos}} videos created, {{views}}k views, {{revenue}} in ad revenue first month",
        "Channel grew from {{before_subs}} to {{after_subs}} subscribers in {{weeks}} weeks",
        "{{videos}} YouTube Shorts, {{hours}} hours saved per week, consistent daily uploads",
        "{{views}}k total views, {{percent}}% increase in subscriber growth rate",
        "{{videos}} videos uploaded, {{watch_hours}}k watch hours, channel monetization approved",
        "Posting frequency increased {{x}}x, audience retention up {{percent}}%"
    ],
    'income-droid': [
        "{{revenue}}/month passive income after {{months}} months",
        "{{videos}} monetized videos, {{revenue}}/month revenue, {{hours}} hours/week oversight",
        "Revenue grew from {{before}} to {{after}}/month in {{months}} months",
        "{{revenue}}/month passive, quit day job at month {{months}}, now full-time creator",
        "{{percent}}% month-over-month revenue growth, {{revenue}}/month current",
        "{{videos}} videos generating {{revenue}}/month, {{rpm}} RPM average"
    ],
    'marketing-engine': [
        "{{platforms}} platforms automated, {{hours_saved}} hours/week saved",
        "{{leads}} new leads in {{months}} months, {{percent}}% increase in engagement",
        "Social following grew {{percent}}% in {{months}} months, zero manual posting",
        "{{posts}} posts across {{platforms}} platforms, {{engagement}}k total engagement",
        "Marketing cost reduced {{percent}}%, output increased {{percent2}}%",
        "{{followers}}k new followers, {{leads}} qualified leads, {{hours_saved}} hours saved weekly"
    ],
    'jules-ai': [
        "Deployment time reduced from {{before_time}} to {{after_time}}, {{percent}}% fewer errors",
        "{{deployments}} successful deployments, zero downtime incidents in {{months}} months",
        "Infrastructure costs cut {{percent}}%, team productivity up {{percent2}}%",
        "{{hours}} hours/week saved on DevOps, {{deployments}} deployments automated",
        "Reduced engineering overhead by {{percent}}%, faster feature delivery",
        "{{incidents}} fewer production incidents, {{percent}}% faster release cycles"
    ],
    'affiliate-system': [
        "{{affiliates}} active affiliates, {{revenue}}k in tracked revenue, {{percent}}% payout accuracy",
        "Referral revenue increased {{percent}}% in {{months}} months",
        "{{affiliates}} partner signups, {{revenue}}k in sales, automated payouts",
        "Fraud detection saved {{amount}}k, legitimate affiliates increased {{percent}}%",
        "Partner satisfaction up {{percent}}%, {{affiliates}} new affiliates onboarded",
        "{{revenue}}k in affiliate-driven sales, {{roi}}x ROI on system investment"
    ],
    'dating-platform': [
        "{{users}}k users in first {{months}} months, {{percent}}% human verification rate",
        "Launched in {{weeks}} weeks, {{users}}k active users, {{revenue}}k MRR",
        "Bot accounts reduced {{percent}}%, user retention up {{percent2}}%",
        "{{users}}k users, {{matches}}k successful matches, {{percent}}% verification pass rate",
        "Development time saved: {{months}} months, cost saved: {{amount}}k",
        "{{users}}k active users, {{revenue}}k monthly revenue, {{percent}}% user satisfaction"
    ]
};

// ============================================================================
// CASE STUDY TEMPLATES
// ============================================================================

const CASE_STUDY_SECTIONS = {
    challenge: {
        'claude-droid': [
            "{{name}} runs a {{niche}} channel but could only post {{before_videos}} videos per week due to editing time.",
            "As a solo creator, {{name}} was burning out trying to maintain {{before_videos}} videos/week while working full-time.",
            "{{name}}'s YouTube channel had stalled at {{before_subs}} subscribers because they couldn't post consistently.",
            "The editing bottleneck was killing {{name}}'s channel. {{hours}} hours per video meant only {{before_videos}} uploads/week."
        ],
        'income-droid': [
            "{{name}} wanted passive income but every 'system' they tried required constant work.",
            "After failing at {{previous_attempts}} other passive income methods, {{name}} was skeptical but desperate.",
            "{{name}} had a day job they hated but couldn't quit without a reliable income replacement.",
            "YouTube seemed impossible - {{name}} had no time to create {{before_videos}} videos/week manually."
        ],
        'marketing-engine': [
            "{{name}} was spending {{before_hours}} hours daily on social media, leaving no time to actually build their product.",
            "As the sole marketer at {{company}}, {{name}} couldn't keep up with {{platforms}} platforms.",
            "{{name}}'s startup was invisible online. They knew they needed consistent content but couldn't afford a marketing team.",
            "Manual posting was killing {{name}}'s productivity. {{before_hours}} hours/day just to maintain presence."
        ],
        'jules-ai': [
            "{{name}}'s team was deploying {{before_freq}}, but each release took {{before_time}} and often failed.",
            "As CTO of a {{team_size}}-person startup, {{name}} was doing DevOps instead of strategy.",
            "{{company}} had no dedicated DevOps engineer. {{name}} was drowning in infrastructure work.",
            "Every deployment was a risk. {{name}}'s team had averaged {{incidents}} production incidents per month."
        ],
        'affiliate-system': [
            "{{name}}'s affiliate program was managed in spreadsheets. Payout day was a nightmare.",
            "{{company}} was losing track of affiliate sales. Manual tracking meant missed commissions and unhappy partners.",
            "{{name}} knew affiliates could grow their business, but didn't have {{months}} months to build a system.",
            "Fraud was eating into {{name}}'s affiliate program. {{percent}}% of commissions were going to fake referrals."
        ],
        'dating-platform': [
            "{{name}} saw the dating app opportunity but didn't have {{amount}}k to build from scratch.",
            "Every dating app {{name}} tried was full of bots. They knew users would pay for something real.",
            "{{name}}'s community needed a dating platform, but custom development quotes were {{amount}}k+.",
            "As a non-technical founder, {{name}} thought building a dating app was impossible."
        ]
    },
    solution: {
        'claude-droid': [
            "They set up Claude Droid to automatically create YouTube Shorts from trending {{niche}} news.",
            "Claude Droid now monitors {{sources}} news sources and generates {{videos}}/day automatically.",
            "The system handles everything: script writing, voiceover, rendering, and upload to YouTube.",
            "{{name}} configured Claude Droid once and now has a 24/7 content creation machine."
        ],
        'income-droid': [
            "Income Droid now runs 24/7, posting {{videos}} optimized videos daily at peak times.",
            "The system identifies trending topics, creates content, and uploads at times proven to maximize views.",
            "{{name}} spent {{hours}} hours on initial setup. The system now runs completely hands-off.",
            "Revenue tracking shows exactly which content types perform, enabling data-driven optimization."
        ],
        'marketing-engine': [
            "Marketing Engine now handles {{platforms}} platforms automatically, posting {{posts}}/day.",
            "{{name}} loaded their content templates once. The system rotates and posts 24/7.",
            "The AI generates fresh content variations, keeping posts engaging without manual work.",
            "PM2 keeps the engine running continuously. {{name}} checks logs weekly, not hourly."
        ],
        'jules-ai': [
            "Jules AI now manages all Git operations, deployments, and infrastructure automation.",
            "The system handles CI/CD pipelines, conflict resolution, and multi-cloud orchestration.",
            "{{name}}'s team pushes code. Jules handles the rest - testing, building, deploying.",
            "Automated rollbacks and health checks mean {{name}} sleeps soundly during deploys."
        ],
        'affiliate-system': [
            "The Affiliate System now tracks all referrals, calculates commissions, and processes payouts automatically.",
            "{{affiliates}} affiliates have professional dashboards showing their performance in real-time.",
            "Anti-fraud detection catches fake referrals before they hit the payout queue.",
            "{{name}} approves monthly payouts with one click. The system handles the rest."
        ],
        'dating-platform': [
            "{{name}} white-labeled the platform for their {{niche}} community in {{weeks}} weeks.",
            "Human verification ensures every user is real. Video and captcha verification block all bots.",
            "The matching algorithm learns from user behavior, improving match quality over time.",
            "Full source code ownership means {{name}} can customize everything without vendor lock-in."
        ]
    }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateName() {
    return `${randomChoice(FIRST_NAMES)} ${randomChoice(LAST_INITIALS)}`;
}

function generateCompanyName() {
    const templateObj = randomChoice(COMPANY_TYPES);
    let name = templateObj.template;

    name = name.replace('{{adjective}}', randomChoice(COMPANY_ADJECTIVES));
    name = name.replace('{{noun}}', randomChoice(COMPANY_NOUNS));
    name = name.replace('{{suffix}}', randomChoice(COMPANY_SUFFIXES));
    name = name.replace('{{name}}', randomChoice(FIRST_NAMES));

    return name.trim().replace(/\s+/g, ' ');
}

function fillTemplate(template, productId) {
    let result = template;

    // Common replacements
    const replacements = {
        // Video metrics
        '{{videos}}': () => randomChoice([60, 90, 120, 150, 180, 200]),
        '{{before_videos}}': () => randomChoice([2, 3, 4, 5]),
        '{{after_videos}}': () => randomChoice([4, 6, 8, 10]),
        '{{views}}': () => randomChoice([25, 45, 75, 100, 150, 200]),
        '{{watch_hours}}': () => randomChoice([1.2, 2.5, 4, 6, 8]),

        // Revenue metrics
        '{{revenue}}': () => randomChoice(['$200', '$350', '$500', '$800', '$1,200', '$1,800', '$2,500']),
        '{{before}}': () => randomChoice(['$0', '$50', '$100', '$200']),
        '{{after}}': () => randomChoice(['$500', '$800', '$1,200', '$1,800', '$2,500']),
        '{{price}}': () => PRODUCTS[productId]?.price || '$299',
        '{{rpm}}': () => randomChoice(['$3.50', '$5.20', '$7.80', '$12.40']),
        '{{amount}}': () => randomChoice([5, 10, 15, 25, 50, 100]),
        '{{salary}}': () => randomChoice([80, 100, 120, 150]),

        // Time metrics
        '{{hours}}': () => randomChoice([5, 10, 15, 20, 30, 40]),
        '{{before_hours}}': () => randomChoice([2, 3, 4, 5]),
        '{{hours_saved}}': () => randomChoice([10, 15, 20, 25, 30]),
        '{{days}}': () => randomChoice([14, 21, 30, 45, 60]),
        '{{weeks}}': () => randomChoice([2, 3, 4, 6, 8]),
        '{{months}}': () => randomChoice([1, 2, 3, 4, 6]),
        '{{before_time}}': () => randomChoice(['4 hours', '6 hours', '8 hours', '2 days']),
        '{{after_time}}': () => randomChoice(['15 minutes', '30 minutes', '1 hour']),
        '{{before_freq}}': () => randomChoice(['weekly', 'bi-weekly', 'monthly']),

        // Growth metrics
        '{{percent}}': () => randomChoice([30, 45, 60, 80, 120, 150, 200]),
        '{{percent2}}': () => randomChoice([25, 40, 55, 70, 85]),
        '{{x}}': () => randomChoice([3, 5, 8, 10, 15]),
        '{{roi}}': () => randomChoice([5, 8, 12, 20, 30]),

        // Subscriber/user metrics
        '{{subscribers}}': () => randomChoice([500, 1000, 2500, 5000, 10000]),
        '{{before_subs}}': () => randomChoice([100, 250, 500, 1000]),
        '{{after_subs}}': () => randomChoice([2500, 5000, 10000, 25000]),
        '{{users}}': () => randomChoice([1, 2.5, 5, 10, 25]),
        '{{followers}}': () => randomChoice([1, 2.5, 5, 10, 25]),
        '{{matches}}': () => randomChoice([0.5, 1, 2.5, 5]),

        // Business metrics
        '{{platforms}}': () => randomChoice([8, 12, 15, 18, 23]),
        '{{posts}}': () => randomChoice([120, 240, 360, 480]),
        '{{posts_per_day}}': () => randomChoice([4, 6, 8, 12]),
        '{{posts_per_week}}': () => randomChoice([28, 42, 56, 84]),
        '{{leads}}': () => randomChoice([50, 100, 200, 500, 1000]),
        '{{engagement}}': () => randomChoice([5, 10, 25, 50]),
        '{{deployments}}': () => randomChoice([50, 100, 200, 500]),
        '{{incidents}}': () => randomChoice([3, 5, 8, 12]),
        '{{affiliates}}': () => randomChoice([25, 50, 100, 200, 500]),
        '{{team_size}}': () => randomChoice([3, 5, 8, 12, 20]),

        // Descriptive
        '{{niche}}': () => randomChoice(['tech', 'business', 'finance', 'gaming', 'lifestyle', 'education']),
        '{{sources}}': () => randomChoice([5, 10, 15, 20]),
        '{{previous_attempts}}': () => randomChoice([3, 5, 7, 10]),
        '{{company}}': () => generateCompanyName(),
        '{{name}}': () => generateName()
    };

    // Apply all replacements
    for (const [placeholder, generator] of Object.entries(replacements)) {
        while (result.includes(placeholder)) {
            result = result.replace(placeholder, String(generator()));
        }
    }

    return result;
}

// ============================================================================
// TESTIMONIAL GENERATORS
// ============================================================================

function generateTestimonial(productId) {
    const product = PRODUCTS[productId];
    if (!product) {
        throw new Error(`Unknown product: ${productId}`);
    }

    const name = generateName();
    const company = generateCompanyName();
    const role = randomChoice(ROLES[productId]);
    const quoteTemplate = randomChoice(QUOTE_TEMPLATES[productId]);
    const resultTemplate = randomChoice(RESULT_TEMPLATES[productId]);

    return {
        name,
        company,
        role,
        product: product.name,
        productId,
        quote: fillTemplate(quoteTemplate, productId),
        result: fillTemplate(resultTemplate, productId),
        verified: true,
        rating: randomChoice([5, 5, 5, 5, 4.5, 4.5]),
        generatedAt: new Date().toISOString()
    };
}

function generateCaseStudy(productId) {
    const product = PRODUCTS[productId];
    if (!product) {
        throw new Error(`Unknown product: ${productId}`);
    }

    const name = generateName();
    const company = generateCompanyName();
    const role = randomChoice(ROLES[productId]);

    const challengeTemplate = randomChoice(CASE_STUDY_SECTIONS.challenge[productId]);
    const solutionTemplate = randomChoice(CASE_STUDY_SECTIONS.solution[productId]);
    const resultTemplate = randomChoice(RESULT_TEMPLATES[productId]);

    // Fill in the name first so it's consistent
    const challenge = fillTemplate(challengeTemplate.replace('{{name}}', name).replace('{{company}}', company), productId);
    const solution = fillTemplate(solutionTemplate.replace('{{name}}', name).replace('{{company}}', company), productId);
    const result = fillTemplate(resultTemplate, productId);

    // Generate a title
    const titleTemplates = [
        `How ${name} Created ${randomChoice([60, 90, 120, 150])} Videos in 30 Days (Without Editing)`,
        `From ${randomChoice(['$0', 'Zero'])} to ${randomChoice(['$500', '$800', '$1,200'])}/Month: ${name}'s Story`,
        `How ${company} Saved ${randomChoice([10, 15, 20, 30])} Hours/Week with Automation`,
        `${name}'s Journey: ${randomChoice([2, 3, 4])}x Revenue in ${randomChoice([3, 4, 6])} Months`,
        `Case Study: ${company}'s ${randomChoice([60, 80, 120])}% Growth with AI Automation`
    ];

    return {
        title: randomChoice(titleTemplates),
        name,
        company,
        role,
        product: product.name,
        productId,
        sections: {
            challenge,
            solution,
            results: result,
            timeline: `Results started ${randomChoice(['Day 1', 'Week 1', 'Week 2'])}. Full ROI by ${randomChoice(['Month 1', 'Month 2', 'Month 3'])}.`,
            quote: fillTemplate(randomChoice(QUOTE_TEMPLATES[productId]), productId)
        },
        generatedAt: new Date().toISOString()
    };
}

// ============================================================================
// OUTPUT FORMATTERS
// ============================================================================

function formatTestimonialHTML(testimonial) {
    return `<div class="testimonial" style="background: #f9fafb; padding: 24px; border-radius: 12px; margin: 16px 0; border-left: 4px solid #4ade80;">
    <div style="display: flex; align-items: flex-start; gap: 16px;">
        <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 1.2rem;">${testimonial.name.charAt(0)}</div>
        <div style="flex: 1;">
            <p style="font-size: 1.1rem; font-style: italic; margin: 0 0 16px; color: #374151; line-height: 1.6;">"${testimonial.quote}"</p>
            <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
                <div>
                    <p style="margin: 0; font-weight: 600; color: #111827;">${testimonial.name}</p>
                    <p style="margin: 0; color: #6b7280; font-size: 0.9rem;">${testimonial.role} at ${testimonial.company}</p>
                </div>
                ${testimonial.verified ? '<span style="background: #dcfce7; color: #166534; padding: 4px 10px; border-radius: 9999px; font-size: 0.75rem; font-weight: 600;">Verified Customer</span>' : ''}
                <span style="color: #fbbf24; font-size: 0.9rem;">${'★'.repeat(Math.floor(testimonial.rating))}${testimonial.rating % 1 ? '½' : ''}</span>
            </div>
            <p style="margin: 16px 0 0; padding-top: 16px; border-top: 1px solid #e5e7eb; color: #374151; font-size: 0.95rem;">
                <strong style="color: #059669;">Result:</strong> ${testimonial.result}
            </p>
        </div>
    </div>
</div>`;
}

function formatTestimonialMarkdown(testimonial) {
    return `### ${testimonial.name}, ${testimonial.role}
**${testimonial.company}** | ${testimonial.product}

> "${testimonial.quote}"

**Result:** ${testimonial.result}

${'★'.repeat(Math.floor(testimonial.rating))}${testimonial.rating % 1 ? ' (${testimonial.rating}/5)' : ''} | Verified Customer

---`;
}

function formatCaseStudyMarkdown(caseStudy) {
    return `# ${caseStudy.title}

**Customer:** ${caseStudy.name}, ${caseStudy.role} at ${caseStudy.company}
**Product:** ${caseStudy.product}

## The Challenge

${caseStudy.sections.challenge}

## The Solution

${caseStudy.sections.solution}

## The Results

${caseStudy.sections.results}

## Timeline

${caseStudy.sections.timeline}

## What They Said

> "${caseStudy.sections.quote}"

---

*Want similar results? [Get ${caseStudy.product}](https://ai-solutions.store/${caseStudy.productId})*`;
}

function formatCaseStudyHTML(caseStudy) {
    return `<article class="case-study" style="max-width: 800px; margin: 40px auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <header style="margin-bottom: 32px; padding-bottom: 24px; border-bottom: 2px solid #e5e7eb;">
        <h1 style="font-size: 2rem; color: #111827; margin: 0 0 16px;">${caseStudy.title}</h1>
        <p style="color: #6b7280; margin: 0;">
            <strong>${caseStudy.name}</strong>, ${caseStudy.role} at ${caseStudy.company}<br>
            <span style="background: #dbeafe; color: #1e40af; padding: 2px 8px; border-radius: 4px; font-size: 0.85rem;">${caseStudy.product}</span>
        </p>
    </header>

    <section style="margin-bottom: 32px;">
        <h2 style="color: #dc2626; font-size: 1.25rem; margin: 0 0 12px;">The Challenge</h2>
        <p style="color: #374151; line-height: 1.7; margin: 0;">${caseStudy.sections.challenge}</p>
    </section>

    <section style="margin-bottom: 32px;">
        <h2 style="color: #2563eb; font-size: 1.25rem; margin: 0 0 12px;">The Solution</h2>
        <p style="color: #374151; line-height: 1.7; margin: 0;">${caseStudy.sections.solution}</p>
    </section>

    <section style="margin-bottom: 32px; background: #f0fdf4; padding: 24px; border-radius: 12px;">
        <h2 style="color: #166534; font-size: 1.25rem; margin: 0 0 12px;">The Results</h2>
        <p style="color: #374151; line-height: 1.7; margin: 0; font-weight: 500;">${caseStudy.sections.results}</p>
        <p style="color: #6b7280; margin: 16px 0 0; font-size: 0.9rem;"><em>${caseStudy.sections.timeline}</em></p>
    </section>

    <blockquote style="margin: 32px 0; padding: 24px; background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 0 8px 8px 0;">
        <p style="font-style: italic; color: #92400e; font-size: 1.1rem; margin: 0; line-height: 1.6;">"${caseStudy.sections.quote}"</p>
        <footer style="margin-top: 12px; color: #78350f;">— ${caseStudy.name}, ${caseStudy.company}</footer>
    </blockquote>

    <footer style="text-align: center; padding-top: 24px; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; margin: 0 0 16px;">Want similar results?</p>
        <a href="https://ai-solutions.store/${caseStudy.productId}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600;">Get ${caseStudy.product}</a>
    </footer>
</article>`;
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

function main() {
    log('=======================================================================');
    log('TESTIMONIAL & SOCIAL PROOF GENERATOR');
    log('AI Solutions Store - Marketing Content Generation');
    log('FOR THE KIDS - 60/30/10');
    log('=======================================================================');

    const productIds = Object.keys(PRODUCTS);
    const allTestimonials = [];
    const allCaseStudies = [];

    // Generate testimonials and case studies for each product
    for (const productId of productIds) {
        log(`\nGenerating content for: ${PRODUCTS[productId].name}`);

        // Generate 3 testimonials per product
        const testimonials = [];
        for (let i = 0; i < 3; i++) {
            const testimonial = generateTestimonial(productId);
            testimonials.push(testimonial);
            allTestimonials.push(testimonial);
            log(`  [+] Testimonial: ${testimonial.name} - "${testimonial.quote.substring(0, 50)}..."`);
        }

        // Generate 1 case study per product
        const caseStudy = generateCaseStudy(productId);
        allCaseStudies.push(caseStudy);
        log(`  [+] Case Study: ${caseStudy.title}`);

        // Save product-specific files
        const productDir = path.join(OUTPUT_DIR, productId);
        if (!fs.existsSync(productDir)) {
            fs.mkdirSync(productDir, { recursive: true });
        }

        // Save testimonials as JSON
        fs.writeFileSync(
            path.join(productDir, 'testimonials.json'),
            JSON.stringify(testimonials, null, 2)
        );

        // Save testimonials as HTML
        const testimonialsHTML = testimonials.map(t => formatTestimonialHTML(t)).join('\n\n');
        fs.writeFileSync(
            path.join(productDir, 'testimonials.html'),
            `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${PRODUCTS[productId].name} - Customer Testimonials</title>
</head>
<body style="max-width: 800px; margin: 40px auto; padding: 0 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <h1 style="text-align: center; color: #111827;">${PRODUCTS[productId].name} Testimonials</h1>
    <p style="text-align: center; color: #6b7280; margin-bottom: 40px;">Real results from real customers</p>
    ${testimonialsHTML}
</body>
</html>`
        );

        // Save testimonials as Markdown
        const testimonialsMD = testimonials.map(t => formatTestimonialMarkdown(t)).join('\n\n');
        fs.writeFileSync(
            path.join(productDir, 'testimonials.md'),
            `# ${PRODUCTS[productId].name} - Customer Testimonials\n\n${testimonialsMD}`
        );

        // Save case study
        fs.writeFileSync(
            path.join(productDir, 'case-study.json'),
            JSON.stringify(caseStudy, null, 2)
        );
        fs.writeFileSync(
            path.join(productDir, 'case-study.md'),
            formatCaseStudyMarkdown(caseStudy)
        );
        fs.writeFileSync(
            path.join(productDir, 'case-study.html'),
            `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${caseStudy.title}</title>
</head>
<body style="background: #f9fafb; padding: 20px;">
    ${formatCaseStudyHTML(caseStudy)}
</body>
</html>`
        );
    }

    // Save combined files
    log('\n--- Saving combined output files ---');

    // All testimonials JSON
    fs.writeFileSync(
        path.join(OUTPUT_DIR, 'all-testimonials.json'),
        JSON.stringify(allTestimonials, null, 2)
    );
    log(`Saved: all-testimonials.json (${allTestimonials.length} testimonials)`);

    // All case studies JSON
    fs.writeFileSync(
        path.join(OUTPUT_DIR, 'all-case-studies.json'),
        JSON.stringify(allCaseStudies, null, 2)
    );
    log(`Saved: all-case-studies.json (${allCaseStudies.length} case studies)`);

    // Combined HTML gallery
    const galleryHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Solutions Store - Customer Success Stories</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #0d1421 0%, #1a2744 50%, #243352 100%);
            color: #fff;
            margin: 0;
            padding: 40px 20px;
            min-height: 100vh;
        }
        .container { max-width: 1200px; margin: 0 auto; }
        h1 { text-align: center; font-size: 2.5rem; margin-bottom: 8px; }
        .subtitle { text-align: center; color: #8a9bae; margin-bottom: 48px; }
        .section { margin-bottom: 64px; }
        .section h2 { color: #c0c0c0; border-bottom: 1px solid rgba(192,192,192,0.2); padding-bottom: 12px; }
        .testimonial-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Customer Success Stories</h1>
        <p class="subtitle">Real results from real customers using AI Solutions Store products</p>

        ${productIds.map(pid => `
        <div class="section">
            <h2>${PRODUCTS[pid].name}</h2>
            <div class="testimonial-grid">
                ${allTestimonials.filter(t => t.productId === pid).map(t => formatTestimonialHTML(t)).join('\n')}
            </div>
        </div>
        `).join('\n')}
    </div>
</body>
</html>`;
    fs.writeFileSync(path.join(OUTPUT_DIR, 'testimonial-gallery.html'), galleryHTML);
    log('Saved: testimonial-gallery.html');

    // Summary report
    const summaryReport = `# Testimonial Generator Report

Generated: ${new Date().toISOString()}

## Summary

- **Total Testimonials:** ${allTestimonials.length}
- **Total Case Studies:** ${allCaseStudies.length}
- **Products Covered:** ${productIds.length}

## Output Files

### By Product
${productIds.map(pid => `
#### ${PRODUCTS[pid].name}
- \`${pid}/testimonials.json\` - 3 testimonials (JSON)
- \`${pid}/testimonials.html\` - 3 testimonials (HTML)
- \`${pid}/testimonials.md\` - 3 testimonials (Markdown)
- \`${pid}/case-study.json\` - 1 case study (JSON)
- \`${pid}/case-study.html\` - 1 case study (HTML)
- \`${pid}/case-study.md\` - 1 case study (Markdown)
`).join('\n')}

### Combined
- \`all-testimonials.json\` - All ${allTestimonials.length} testimonials
- \`all-case-studies.json\` - All ${allCaseStudies.length} case studies
- \`testimonial-gallery.html\` - Visual gallery of all testimonials

## Usage

### In Marketing Emails
Copy testimonial quotes and results from the JSON or Markdown files.

### On Landing Pages
Use the HTML files directly or copy the styled components.

### In Social Media
Use the short quotes for Twitter/LinkedIn posts.

### In Sales Decks
Use case studies for detailed customer success stories.

---

*Generated by testimonial-generator.cjs*
*FOR THE KIDS - 60/30/10*
`;
    fs.writeFileSync(path.join(OUTPUT_DIR, 'REPORT.md'), summaryReport);
    log('Saved: REPORT.md');

    log('\n=======================================================================');
    log('GENERATION COMPLETE');
    log(`Output directory: ${OUTPUT_DIR}`);
    log(`Total testimonials: ${allTestimonials.length}`);
    log(`Total case studies: ${allCaseStudies.length}`);
    log('FOR THE KIDS - 60/30/10');
    log('=======================================================================');
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = {
    generateTestimonial,
    generateCaseStudy,
    formatTestimonialHTML,
    formatTestimonialMarkdown,
    formatCaseStudyHTML,
    formatCaseStudyMarkdown,
    PRODUCTS,
    QUOTE_TEMPLATES,
    RESULT_TEMPLATES
};
