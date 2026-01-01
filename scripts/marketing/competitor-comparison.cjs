/**
 * ============================================================================
 * COMPETITOR COMPARISON CONTENT GENERATOR
 * AI Solutions Store - Comprehensive Market Positioning
 * ============================================================================
 *
 * Generates:
 * 1. Feature comparison tables (vs market alternatives)
 * 2. "Why Choose Us" sections
 * 3. Alternative-to pages content (SEO-optimized)
 * 4. Switching guides from competitors
 *
 * FOR THE KIDS - Gospel V1.3 (60/30/10)
 *
 * Usage:
 *   node competitor-comparison.cjs --generate-all
 *   node competitor-comparison.cjs --product=claude-droid
 *   node competitor-comparison.cjs --type=comparison
 *   node competitor-comparison.cjs --type=why-choose-us
 *   node competitor-comparison.cjs --type=alternative-to
 *   node competitor-comparison.cjs --type=switching-guide
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
    outputDir: 'C:\\AiCollabForTheKids\\logs\\competitor-comparisons',
    logFile: 'C:\\AiCollabForTheKids\\logs\\competitor-comparison.log',
    storeUrl: 'https://ai-solutions.store',
    websiteUrl: 'https://aidoesitall.website',

    // Gospel V1.3 compliance
    gospel: {
        charity: 60,
        infrastructure: 30,
        founder: 10
    }
};

// ============================================================================
// AI SOLUTIONS STORE PRODUCT CATALOG
// ============================================================================

const PRODUCTS = {
    'claude-droid': {
        name: 'Claude Droid',
        price: 299,
        pricingModel: 'one-time',
        description: 'Transform news into engaging YouTube Shorts automatically',
        shortDesc: 'YouTube Shorts Automation',
        category: 'Video Content Automation',
        url: 'https://ai-solutions.store/products/claude-droid',
        keyFeatures: [
            'Automated news scraping from 10+ sources',
            'AI-powered video generation with Claude Opus 4.5',
            'TTS narration with ElevenLabs integration',
            'Auto-upload to YouTube',
            '60-second Shorts optimized for engagement',
            'Custom branding and watermarks',
            'Scheduling and queue management',
            'Analytics dashboard'
        ],
        uniqueSellingPoints: [
            'Powered by Claude Opus 4.5 - most advanced AI',
            'One-time payment, no subscriptions',
            '60% goes to verified pediatric charities',
            'Production-ready, not a beta',
            'Full source code included',
            'Unlimited video generation'
        ],
        targetAudience: ['Content creators', 'News channels', 'Affiliate marketers', 'Passive income seekers'],
        competitors: [
            {
                name: 'Pictory',
                pricing: '$19-$99/month',
                pricingModel: 'subscription',
                weaknesses: ['Monthly fees add up', 'Limited AI customization', 'No source code access', 'Generic templates'],
                strengths: ['Established brand', 'Browser-based', 'Team features']
            },
            {
                name: 'InVideo',
                pricing: '$15-$60/month',
                pricingModel: 'subscription',
                weaknesses: ['Watermarks on free tier', 'Limited automation', 'No YouTube integration', 'Template-dependent'],
                strengths: ['Large template library', 'Easy to use', 'Stock footage included']
            },
            {
                name: 'Lumen5',
                pricing: '$29-$199/month',
                pricingModel: 'subscription',
                weaknesses: ['Expensive at scale', 'Limited video length', 'No auto-posting', 'Corporate focus'],
                strengths: ['Blog-to-video conversion', 'AI script writing', 'Professional output']
            },
            {
                name: 'Synthesia',
                pricing: '$22-$67/month',
                pricingModel: 'subscription',
                weaknesses: ['No Shorts optimization', 'Limited customization', 'Avatar-focused only', 'No news scraping'],
                strengths: ['AI avatars', 'Multi-language', 'Enterprise features']
            },
            {
                name: 'Manual Video Editing',
                pricing: '$0 + hours of time',
                pricingModel: 'time-cost',
                weaknesses: ['10-15 hours per week', 'Skill ceiling', 'Burnout risk', 'Inconsistent output'],
                strengths: ['Full creative control', 'No software costs', 'Unique content']
            }
        ]
    },
    'income-droid': {
        name: 'Income Droid',
        price: 499,
        pricingModel: 'one-time',
        description: 'Generate 4 revenue-optimized videos daily on autopilot',
        shortDesc: 'Multi-Platform Revenue Engine',
        category: 'Passive Income Automation',
        url: 'https://ai-solutions.store/products/income-droid',
        keyFeatures: [
            '4 videos per day, every day',
            'Niche-specific content generation',
            'Affiliate link integration',
            'Monetization tracking dashboard',
            'Multi-platform distribution',
            'Revenue analytics',
            'A/B testing for thumbnails',
            'Trending topic detection'
        ],
        uniqueSellingPoints: [
            'Built specifically for monetization',
            'Affiliate link automation',
            'Revenue tracking included',
            'No monthly costs eating profits',
            'Scale without hiring',
            'Proven revenue strategies'
        ],
        targetAudience: ['Entrepreneurs', 'Digital agencies', 'Side hustlers', 'Content farms'],
        competitors: [
            {
                name: 'VidIQ + Pictory Stack',
                pricing: '$50-$150/month combined',
                pricingModel: 'subscription',
                weaknesses: ['Multiple tools needed', 'No unified dashboard', 'Manual integration work', 'High monthly cost'],
                strengths: ['Established tools', 'SEO optimization', 'Large community']
            },
            {
                name: 'Jasper + Video Tool',
                pricing: '$49-$125/month combined',
                pricingModel: 'subscription',
                weaknesses: ['Separate subscriptions', 'No video automation', 'Text-focused', 'Complex workflow'],
                strengths: ['Strong AI writing', 'Brand voice', 'Team collaboration']
            },
            {
                name: 'Faceless YouTube Agencies',
                pricing: '$500-$2000/month',
                pricingModel: 'service',
                weaknesses: ['Extremely expensive', 'Quality inconsistent', 'No ownership', 'Dependency risk'],
                strengths: ['Fully managed', 'Human creativity', 'Custom content']
            },
            {
                name: 'Hiring Freelancers',
                pricing: '$500-$3000/month',
                pricingModel: 'service',
                weaknesses: ['Management overhead', 'Quality varies', 'Scaling difficult', 'Training required'],
                strengths: ['Human touch', 'Flexible', 'Custom work']
            },
            {
                name: 'DIY Content Creation',
                pricing: '$0 + 20-40 hours/week',
                pricingModel: 'time-cost',
                weaknesses: ['Massive time investment', 'Burnout inevitable', 'Income ceiling', 'Skill requirements'],
                strengths: ['Full control', 'Authentic voice', 'No software costs']
            }
        ]
    },
    'marketing-engine': {
        name: 'Marketing Engine',
        price: 199,
        pricingModel: 'one-time',
        description: '24/7 social media automation for maximum reach',
        shortDesc: '23-Platform Social Automation',
        category: 'Social Media Marketing',
        url: 'https://ai-solutions.store/products/marketing-engine',
        keyFeatures: [
            'Auto-post to 23+ platforms',
            '4x daily content generation',
            'Engagement tracking',
            'Brand-safe AI content',
            'Scheduled posting calendar',
            'Hashtag optimization',
            'Analytics across all platforms',
            'Content recycling'
        ],
        uniqueSellingPoints: [
            '23 platforms in one tool',
            'No per-platform fees',
            'AI writes all content',
            'Runs 24/7 automatically',
            'No social media manager needed',
            'Gospel-compliant (60% to charity)'
        ],
        targetAudience: ['Small businesses', 'Social media managers', 'Startups', 'Personal brands'],
        competitors: [
            {
                name: 'Hootsuite',
                pricing: '$99-$739/month',
                pricingModel: 'subscription',
                weaknesses: ['Expensive', 'No AI content creation', 'Limited platforms', 'Complex interface'],
                strengths: ['Enterprise features', 'Team management', 'Analytics', 'Established']
            },
            {
                name: 'Buffer',
                pricing: '$6-$120/month',
                pricingModel: 'subscription',
                weaknesses: ['Limited platforms', 'No content generation', 'Basic analytics', 'Per-channel pricing'],
                strengths: ['Easy to use', 'Clean interface', 'Affordable starter', 'Instagram focus']
            },
            {
                name: 'Later',
                pricing: '$18-$80/month',
                pricingModel: 'subscription',
                weaknesses: ['Visual content focus only', 'Limited platforms', 'No AI writing', 'Post limits'],
                strengths: ['Visual calendar', 'Linkin.bio', 'Instagram-first', 'UGC tools']
            },
            {
                name: 'Sprout Social',
                pricing: '$249-$499/month',
                pricingModel: 'subscription',
                weaknesses: ['Very expensive', 'Enterprise-focused', 'Overkill for small biz', 'No content creation'],
                strengths: ['Best analytics', 'CRM features', 'Social listening', 'Team tools']
            },
            {
                name: 'Manual Posting',
                pricing: '$0 + 2-4 hours/day',
                pricingModel: 'time-cost',
                weaknesses: ['Time consuming', 'Inconsistent schedule', 'Burnout', 'No scaling'],
                strengths: ['Free', 'Authentic engagement', 'Full control', 'Real-time']
            }
        ]
    },
    'jules-ai': {
        name: 'Jules AI',
        price: 399,
        pricingModel: 'one-time',
        description: 'Your AI business director and command center',
        shortDesc: 'AI Business Dashboard',
        category: 'Business Intelligence',
        url: 'https://ai-solutions.store/products/jules-ai',
        keyFeatures: [
            'Centralized business management',
            'Fleet orchestration for all droids',
            'Real-time analytics',
            'Gospel-compliant revenue tracking',
            'Web-based control panel',
            'Multi-project management',
            'Automated reporting',
            'API integrations'
        ],
        uniqueSellingPoints: [
            'Unified dashboard for all AI tools',
            'Coordinates multiple automation systems',
            'Built for AI-first businesses',
            'Gospel revenue tracking built-in',
            'No monthly dashboard fees',
            'Scales with your operation'
        ],
        targetAudience: ['Agency owners', 'Power users', 'Enterprise teams', 'Multi-project managers'],
        competitors: [
            {
                name: 'Monday.com',
                pricing: '$8-$16/user/month',
                pricingModel: 'subscription',
                weaknesses: ['No AI orchestration', 'Per-user pricing scales badly', 'Generic tool', 'No automation control'],
                strengths: ['Flexible', 'Team collaboration', 'Templates', 'Integrations']
            },
            {
                name: 'Notion',
                pricing: '$8-$15/user/month',
                pricingModel: 'subscription',
                weaknesses: ['Documentation focus', 'No system control', 'No analytics', 'Manual processes'],
                strengths: ['Flexible workspace', 'Databases', 'Team wiki', 'Free tier']
            },
            {
                name: 'ClickUp',
                pricing: '$7-$12/user/month',
                pricingModel: 'subscription',
                weaknesses: ['Overwhelming features', 'No AI control', 'Complex setup', 'Performance issues'],
                strengths: ['Feature-rich', 'Good free tier', 'Customizable', 'Docs included']
            },
            {
                name: 'Zapier + Dashboards',
                pricing: '$20-$100/month combined',
                pricingModel: 'subscription',
                weaknesses: ['Separate tools', 'Task limits', 'No unified view', 'Complex maintenance'],
                strengths: ['Automation hub', 'Many integrations', 'Flexible', 'Established']
            },
            {
                name: 'Custom Development',
                pricing: '$5,000-$50,000+',
                pricingModel: 'one-time',
                weaknesses: ['Extremely expensive', 'Long timeline', 'Maintenance burden', 'Developer dependency'],
                strengths: ['Fully custom', 'Exact requirements', 'Ownership', 'No limits']
            }
        ]
    },
    'affiliate-system': {
        name: 'Affiliate System',
        price: 599,
        pricingModel: 'one-time',
        description: 'Complete white-label affiliate platform',
        shortDesc: 'Affiliate Marketing Platform',
        category: 'Affiliate Marketing',
        url: 'https://ai-solutions.store/products/affiliate-system',
        keyFeatures: [
            'Multi-tier commission structure',
            'Automated payouts',
            'Custom branding (white-label)',
            'Analytics dashboard',
            'Built-in fraud protection',
            'Partner management portal',
            'Real-time tracking',
            'Customizable commission rules'
        ],
        uniqueSellingPoints: [
            'Launch affiliate program in 24 hours',
            'White-label - your branding',
            'No transaction fees',
            'Full source code access',
            'Multi-tier MLM support',
            'No monthly platform costs'
        ],
        targetAudience: ['SaaS companies', 'E-commerce stores', 'Course creators', 'Digital product sellers'],
        competitors: [
            {
                name: 'Rewardful',
                pricing: '$29-$299/month',
                pricingModel: 'subscription',
                weaknesses: ['Monthly fees', 'Transaction fees', 'Stripe-only', 'Limited customization'],
                strengths: ['Stripe integration', 'Easy setup', 'Good support', 'SaaS focus']
            },
            {
                name: 'FirstPromoter',
                pricing: '$49-$149/month',
                pricingModel: 'subscription',
                weaknesses: ['Expensive', 'Lead limits', 'No white-label', 'Limited payment options'],
                strengths: ['SaaS-focused', 'Good tracking', 'Fraud detection', 'Support']
            },
            {
                name: 'Refersion',
                pricing: '$99-$499/month',
                pricingModel: 'subscription',
                weaknesses: ['Very expensive', 'E-commerce focus', 'Complex pricing', 'Setup complexity'],
                strengths: ['Shopify integration', 'Influencer tools', 'Enterprise features', 'Multi-store']
            },
            {
                name: 'PartnerStack',
                pricing: 'Custom ($$$$)',
                pricingModel: 'enterprise',
                weaknesses: ['Enterprise pricing', 'Long sales cycle', 'Overkill for most', 'Revenue share'],
                strengths: ['Full ecosystem', 'Marketplace', 'Enterprise support', 'Advanced features']
            },
            {
                name: 'WordPress Plugins (AffiliateWP)',
                pricing: '$149-$499/year',
                pricingModel: 'subscription',
                weaknesses: ['WordPress only', 'Limited features', 'No white-label', 'Extension costs'],
                strengths: ['WP integration', 'One-time(ish)', 'Extensions available', 'Self-hosted']
            }
        ]
    },
    'dating-platform': {
        name: 'Dating Platform',
        price: 2499,
        pricingModel: 'one-time',
        description: 'Full anti-AI dating app source code',
        shortDesc: 'Dating App Source Code',
        category: 'Dating App Development',
        url: 'https://ai-solutions.store/products/dating-platform',
        keyFeatures: [
            'Complete React + Node.js codebase',
            'Square payment integration',
            'FOSTA/SESTA compliant',
            'Age verification built-in',
            'Mobile-responsive design',
            'Real-time messaging',
            'Matching algorithm',
            'Admin dashboard'
        ],
        uniqueSellingPoints: [
            'Anti-AI verified - real humans only',
            'Full source code ownership',
            'Legal compliance built-in',
            'No monthly licensing fees',
            'Customize for any niche',
            'Deploy in 24 hours'
        ],
        targetAudience: ['Dating startups', 'Niche communities', 'Faith-based platforms', 'Professional networking'],
        competitors: [
            {
                name: 'WPDating (WordPress)',
                pricing: '$199-$799/year',
                pricingModel: 'subscription',
                weaknesses: ['WordPress dependent', 'Plugin conflicts', 'Performance issues', 'Limited customization'],
                strengths: ['Affordable', 'Quick setup', 'Themes available', 'Extensions']
            },
            {
                name: 'SkaDate',
                pricing: '$2,999+ one-time',
                pricingModel: 'one-time',
                weaknesses: ['Expensive', 'Dated design', 'PHP legacy code', 'Mobile extra cost'],
                strengths: ['Full features', 'Established', 'Support included', 'Customizable']
            },
            {
                name: 'AdvanDate',
                pricing: '$1,499-$2,499',
                pricingModel: 'one-time',
                weaknesses: ['Older technology', 'Less modern UI', 'Limited mobile', 'Smaller community'],
                strengths: ['Affordable', 'Good features', 'Self-hosted', 'One-time payment']
            },
            {
                name: 'Custom Development',
                pricing: '$50,000-$200,000+',
                pricingModel: 'one-time',
                weaknesses: ['Extremely expensive', '6-12 month timeline', 'Ongoing costs', 'Risk of failure'],
                strengths: ['Fully custom', 'Unique features', 'Competitive advantage', 'Exact vision']
            },
            {
                name: 'White-Label Apps (BuildFire, etc)',
                pricing: '$500-$2000/month',
                pricingModel: 'subscription',
                weaknesses: ['Ongoing costs', 'Limited customization', 'No code ownership', 'Platform lock-in'],
                strengths: ['Quick launch', 'Mobile apps', 'Managed hosting', 'Updates included']
            }
        ]
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
        // Silent fail
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
// 1. FEATURE COMPARISON TABLES
// ============================================================================

function generateFeatureComparisonTable(productKey) {
    const product = PRODUCTS[productKey];
    if (!product) return null;

    const output = {
        productName: product.name,
        category: product.category,
        generatedAt: new Date().toISOString(),
        tables: []
    };

    // Main comparison table
    const mainTable = {
        title: `${product.name} vs Competitors - Feature Comparison`,
        description: `Compare ${product.name} ($${product.price} one-time) against ${product.competitors.length} market alternatives`,
        headers: ['Feature', product.name, ...product.competitors.map(c => c.name)],
        rows: []
    };

    // Pricing row
    mainTable.rows.push({
        feature: 'Pricing',
        values: [
            `$${product.price} one-time`,
            ...product.competitors.map(c => c.pricing)
        ],
        ourAdvantage: true
    });

    // Pricing model row
    mainTable.rows.push({
        feature: 'Pricing Model',
        values: [
            'One-time (lifetime)',
            ...product.competitors.map(c => c.pricingModel === 'subscription' ? 'Subscription (recurring)' :
                                           c.pricingModel === 'service' ? 'Ongoing service' :
                                           c.pricingModel === 'time-cost' ? 'Time investment' :
                                           c.pricingModel === 'enterprise' ? 'Enterprise contract' : c.pricingModel)
        ],
        ourAdvantage: true
    });

    // Feature availability rows
    const featureChecks = {
        'claude-droid': [
            { feature: 'AI Video Generation', us: true, competitors: [true, true, true, true, false] },
            { feature: 'YouTube Auto-Upload', us: true, competitors: [false, false, false, false, false] },
            { feature: 'News Scraping', us: true, competitors: [false, false, false, false, false] },
            { feature: 'Shorts Optimization', us: true, competitors: [true, true, false, false, false] },
            { feature: 'Source Code Access', us: true, competitors: [false, false, false, false, true] },
            { feature: 'Unlimited Videos', us: true, competitors: [false, false, false, false, true] },
            { feature: 'Claude Opus 4.5 AI', us: true, competitors: [false, false, false, false, false] },
            { feature: 'Charity Contribution', us: '60%', competitors: ['0%', '0%', '0%', '0%', '0%'] }
        ],
        'income-droid': [
            { feature: 'Daily Video Generation', us: '4/day', competitors: ['Manual', 'Manual', 'Varies', 'Varies', 'Manual'] },
            { feature: 'Revenue Tracking', us: true, competitors: [false, false, false, false, false] },
            { feature: 'Affiliate Integration', us: true, competitors: [false, false, false, false, false] },
            { feature: 'Multi-Platform', us: true, competitors: [true, false, true, true, false] },
            { feature: 'Monetization Focus', us: true, competitors: [false, false, false, false, false] },
            { feature: 'One-Time Cost', us: true, competitors: [false, false, false, false, true] },
            { feature: 'Full Automation', us: true, competitors: [false, false, false, false, false] },
            { feature: 'Charity Contribution', us: '60%', competitors: ['0%', '0%', '0%', '0%', '0%'] }
        ],
        'marketing-engine': [
            { feature: 'Platforms Supported', us: '23+', competitors: ['10-20', '8', '7', '10+', '1-3'] },
            { feature: 'AI Content Creation', us: true, competitors: [false, false, false, false, false] },
            { feature: 'Auto-Posting', us: true, competitors: [true, true, true, true, false] },
            { feature: 'Scheduling', us: true, competitors: [true, true, true, true, false] },
            { feature: 'Analytics', us: true, competitors: [true, true, true, true, false] },
            { feature: 'Per-Platform Fees', us: false, competitors: [true, true, true, true, false] },
            { feature: 'One-Time Cost', us: true, competitors: [false, false, false, false, true] },
            { feature: 'Charity Contribution', us: '60%', competitors: ['0%', '0%', '0%', '0%', '0%'] }
        ],
        'jules-ai': [
            { feature: 'AI System Control', us: true, competitors: [false, false, false, false, true] },
            { feature: 'Unified Dashboard', us: true, competitors: [true, true, true, false, true] },
            { feature: 'Fleet Orchestration', us: true, competitors: [false, false, false, false, true] },
            { feature: 'Revenue Tracking', us: true, competitors: [false, false, false, false, true] },
            { feature: 'Gospel Compliance', us: true, competitors: [false, false, false, false, false] },
            { feature: 'Real-time Analytics', us: true, competitors: [true, false, true, true, true] },
            { feature: 'One-Time Cost', us: true, competitors: [false, false, false, false, true] },
            { feature: 'Charity Contribution', us: '60%', competitors: ['0%', '0%', '0%', '0%', '0%'] }
        ],
        'affiliate-system': [
            { feature: 'White-Label', us: true, competitors: [false, false, false, true, false] },
            { feature: 'Multi-Tier Commissions', us: true, competitors: [false, true, true, true, true] },
            { feature: 'Fraud Protection', us: true, competitors: [true, true, true, true, false] },
            { feature: 'Source Code Access', us: true, competitors: [false, false, false, false, false] },
            { feature: 'Transaction Fees', us: false, competitors: [true, true, true, true, false] },
            { feature: 'Custom Commission Rules', us: true, competitors: [true, true, true, true, true] },
            { feature: 'One-Time Cost', us: true, competitors: [false, false, false, false, false] },
            { feature: 'Charity Contribution', us: '60%', competitors: ['0%', '0%', '0%', '0%', '0%'] }
        ],
        'dating-platform': [
            { feature: 'Full Source Code', us: true, competitors: [false, true, true, true, false] },
            { feature: 'Anti-AI Verification', us: true, competitors: [false, false, false, false, false] },
            { feature: 'FOSTA/SESTA Compliant', us: true, competitors: [false, true, true, true, false] },
            { feature: 'Modern Tech Stack', us: 'React/Node', competitors: ['PHP/WP', 'PHP', 'PHP', 'Custom', 'Varies'] },
            { feature: 'Mobile Responsive', us: true, competitors: [true, true, true, true, true] },
            { feature: 'No Monthly Fees', us: true, competitors: [false, true, true, false, false] },
            { feature: 'Quick Deploy (24hr)', us: true, competitors: [true, false, false, false, true] },
            { feature: 'Charity Contribution', us: '60%', competitors: ['0%', '0%', '0%', '0%', '0%'] }
        ]
    };

    const checks = featureChecks[productKey] || [];
    checks.forEach(check => {
        mainTable.rows.push({
            feature: check.feature,
            values: [
                typeof check.us === 'boolean' ? (check.us ? 'Yes' : 'No') : check.us,
                ...check.competitors.map(c => typeof c === 'boolean' ? (c ? 'Yes' : 'No') : c)
            ],
            ourAdvantage: check.us === true || (typeof check.us === 'string' && check.us !== '0%')
        });
    });

    output.tables.push(mainTable);

    // Cost comparison over time
    const costTable = {
        title: 'Total Cost of Ownership (TCO) Comparison',
        description: 'See how costs compare over 1, 2, and 3 years',
        headers: ['Time Period', product.name, ...product.competitors.slice(0, 3).map(c => c.name)],
        rows: []
    };

    const ourCost = product.price;
    const competitorMonthlyCosts = product.competitors.slice(0, 3).map(c => {
        const match = c.pricing.match(/\$(\d+)/);
        return match ? parseInt(match[1]) : 50;
    });

    [12, 24, 36].forEach(months => {
        costTable.rows.push({
            period: `${months} Months`,
            values: [
                `$${ourCost}`,
                ...competitorMonthlyCosts.map(cost => `$${cost * months}`)
            ],
            savings: competitorMonthlyCosts.map(cost => `Save $${(cost * months) - ourCost}`)
        });
    });

    output.tables.push(costTable);

    // Markdown version
    let markdown = `# ${product.name} vs Competitors\n\n`;
    markdown += `> **Category:** ${product.category}\n`;
    markdown += `> **Generated:** ${new Date().toISOString()}\n\n`;

    output.tables.forEach(table => {
        markdown += `## ${table.title}\n\n`;
        markdown += `${table.description}\n\n`;

        // Create markdown table
        markdown += '| ' + table.headers.join(' | ') + ' |\n';
        markdown += '| ' + table.headers.map(() => '---').join(' | ') + ' |\n';
        table.rows.forEach(row => {
            const values = row.values || [row.period, ...Object.values(row).slice(1)];
            markdown += '| ' + [row.feature || row.period, ...values.slice(1)].join(' | ') + ' |\n';
        });
        markdown += '\n';
    });

    // Add Gospel notice
    markdown += `---\n\n`;
    markdown += `## FOR THE KIDS\n\n`;
    markdown += `**60% of every ${product.name} purchase goes directly to verified pediatric charities.**\n\n`;
    markdown += `This is Gospel V1.3 - immutable. When you choose ${product.name}, you're not just getting a better product at a better price - you're helping kids.\n\n`;
    markdown += `[Get ${product.name} Now](${product.url}) - $${product.price} one-time\n`;

    output.markdown = markdown;

    return output;
}

function generateAllFeatureComparisons() {
    const results = {};
    Object.keys(PRODUCTS).forEach(productKey => {
        results[productKey] = generateFeatureComparisonTable(productKey);
    });
    return results;
}

// ============================================================================
// 2. "WHY CHOOSE US" SECTIONS
// ============================================================================

function generateWhyChooseUs(productKey) {
    const product = PRODUCTS[productKey];
    if (!product) return null;

    const sections = {
        productName: product.name,
        generatedAt: new Date().toISOString(),
        headline: `Why Choose ${product.name}?`,
        subheadline: `The smarter choice for ${product.category.toLowerCase()}`,

        mainReasons: [
            {
                title: 'One-Time Payment, Lifetime Value',
                description: `Pay $${product.price} once and own ${product.name} forever. No monthly fees, no per-transaction costs, no surprise charges. While competitors drain $${Math.round(product.price / 12)}-$${Math.round(product.price / 3)} from your account every month, you're building equity in your business.`,
                icon: 'money',
                highlight: `Save $${product.competitors[0] ? Math.round(parseInt(product.competitors[0].pricing.match(/\d+/)?.[0] || 50) * 24 - product.price) : 1000}+ over 2 years`
            },
            {
                title: 'Powered by Claude Opus 4.5',
                description: `${product.name} is built on Anthropic's most advanced AI model. This isn't yesterday's GPT-3 or a basic chatbot - it's cutting-edge AI that understands context, maintains brand voice, and produces genuinely useful output.`,
                icon: 'ai',
                highlight: 'Most advanced AI available'
            },
            {
                title: 'Production-Ready, Not Beta',
                description: `Every feature has been tested in production. This isn't a prototype or a "coming soon" promise. ${product.name} is generating real results for real businesses right now.`,
                icon: 'check',
                highlight: 'Battle-tested in production'
            },
            {
                title: '60% Goes to Kids',
                description: `Here's what makes us fundamentally different: 60% of every sale goes directly to verified pediatric charities. This is Gospel V1.3 - immutable and on-chain. Your purchase helps children in need.`,
                icon: 'heart',
                highlight: 'Gospel V1.3 Certified'
            }
        ],

        comparisonPoints: product.competitors.slice(0, 3).map(competitor => ({
            competitor: competitor.name,
            theirProblems: competitor.weaknesses,
            ourSolution: product.uniqueSellingPoints.slice(0, 2)
        })),

        testimonialPlaceholders: [
            {
                quote: `Switched from ${product.competitors[0]?.name || 'a competitor'} to ${product.name}. Saved $${Math.round(parseInt(product.competitors[0]?.pricing.match(/\d+/)?.[0] || 50) * 12)} in the first year alone.`,
                attribution: 'Early Adopter',
                result: '10x ROI in 3 months'
            },
            {
                quote: `The fact that 60% goes to charity made the decision easy. Plus, it actually works better than the $99/month tool I was using.`,
                attribution: 'Business Owner',
                result: 'Helped 100+ kids'
            }
        ],

        callToAction: {
            primary: {
                text: `Get ${product.name} Now`,
                url: product.url,
                subtext: `$${product.price} one-time - 60% to charity`
            },
            secondary: {
                text: 'See It In Action',
                url: `${CONFIG.storeUrl}/demo/${productKey}`,
                subtext: 'Free demo, no credit card'
            }
        },

        faq: [
            {
                question: `Why is ${product.name} a one-time payment when competitors charge monthly?`,
                answer: `We believe in ownership, not rental. Monthly subscriptions benefit software companies, not users. With ${product.name}, you pay once and own it forever. Updates are free. The math is simple: after ${Math.ceil(product.price / (parseInt(product.competitors[0]?.pricing.match(/\d+/)?.[0] || 50)))} months, everything else is profit for you.`
            },
            {
                question: 'What does "60% to charity" actually mean?',
                answer: `It means exactly that. 60% of your $${product.price} purchase ($${Math.round(product.price * 0.6)}) goes directly to verified pediatric charities. This is Gospel V1.3 - our founding principle that can never be changed. 30% covers infrastructure and development, 10% to the founder. Transparent. Immutable. FOR THE KIDS.`
            },
            {
                question: `How does ${product.name} compare to ${product.competitors[0]?.name || 'competitors'}?`,
                answer: `${product.competitors[0]?.name || 'Competitors'} charges ${product.competitors[0]?.pricing || '$50-100/month'} in recurring fees. Their weaknesses include: ${product.competitors[0]?.weaknesses.slice(0, 2).join(', ')}. ${product.name} solves these with: ${product.uniqueSellingPoints.slice(0, 2).join(', ')}. And 60% of your payment helps kids instead of shareholders.`
            },
            {
                question: 'What if I need help setting up?',
                answer: `${product.name} comes with comprehensive documentation and setup guides. Our community Discord is active with fellow users. For complex deployments, we offer consultation sessions. Most users are up and running within 2-4 hours.`
            }
        ]
    };

    // Generate markdown version
    let markdown = `# Why Choose ${product.name}?\n\n`;
    markdown += `> ${sections.subheadline}\n\n`;

    sections.mainReasons.forEach((reason, i) => {
        markdown += `## ${i + 1}. ${reason.title}\n\n`;
        markdown += `${reason.description}\n\n`;
        markdown += `**${reason.highlight}**\n\n`;
    });

    markdown += `---\n\n`;
    markdown += `## How We Stack Up\n\n`;

    sections.comparisonPoints.forEach(point => {
        markdown += `### vs ${point.competitor}\n\n`;
        markdown += `**Their Problems:**\n`;
        point.theirProblems.forEach(p => markdown += `- ${p}\n`);
        markdown += `\n**Our Solution:**\n`;
        point.ourSolution.forEach(s => markdown += `- ${s}\n`);
        markdown += '\n';
    });

    markdown += `---\n\n`;
    markdown += `## Frequently Asked Questions\n\n`;

    sections.faq.forEach(qa => {
        markdown += `### ${qa.question}\n\n`;
        markdown += `${qa.answer}\n\n`;
    });

    markdown += `---\n\n`;
    markdown += `## Ready to Get Started?\n\n`;
    markdown += `[${sections.callToAction.primary.text}](${sections.callToAction.primary.url})\n\n`;
    markdown += `${sections.callToAction.primary.subtext}\n\n`;
    markdown += `**FOR THE KIDS. ALWAYS.**\n`;

    sections.markdown = markdown;

    return sections;
}

function generateAllWhyChooseUs() {
    const results = {};
    Object.keys(PRODUCTS).forEach(productKey => {
        results[productKey] = generateWhyChooseUs(productKey);
    });
    return results;
}

// ============================================================================
// 3. ALTERNATIVE-TO PAGES CONTENT (SEO-optimized)
// ============================================================================

function generateAlternativeToPage(productKey, competitorIndex = 0) {
    const product = PRODUCTS[productKey];
    if (!product) return null;

    const competitor = product.competitors[competitorIndex];
    if (!competitor) return null;

    const page = {
        productName: product.name,
        competitorName: competitor.name,
        generatedAt: new Date().toISOString(),

        // SEO metadata
        seo: {
            title: `${competitor.name} Alternative - ${product.name} | Save ${Math.round((parseInt(competitor.pricing.match(/\d+/)?.[0] || 50) * 12) - product.price)}+ Per Year`,
            metaDescription: `Looking for a ${competitor.name} alternative? ${product.name} offers the same features at $${product.price} one-time (not ${competitor.pricing}/month). Plus 60% goes to charity.`,
            h1: `${product.name}: The Best ${competitor.name} Alternative`,
            keywords: [
                `${competitor.name} alternative`,
                `${competitor.name} alternatives`,
                `better than ${competitor.name}`,
                `${competitor.name} vs ${product.name}`,
                `${competitor.name} replacement`,
                `cheaper than ${competitor.name}`,
                `${product.category.toLowerCase()} tools`,
                `${product.shortDesc.toLowerCase()}`
            ]
        },

        heroSection: {
            headline: `Tired of ${competitor.name}'s ${competitor.pricingModel === 'subscription' ? 'Monthly Fees' : 'Limitations'}?`,
            subheadline: `Switch to ${product.name} and save $${Math.round((parseInt(competitor.pricing.match(/\d+/)?.[0] || 50) * 24) - product.price)} over 2 years`,
            ctaText: `Try ${product.name} - $${product.price} One-Time`,
            ctaUrl: product.url
        },

        problemSection: {
            headline: `The Problem with ${competitor.name}`,
            problems: competitor.weaknesses.map(w => ({
                problem: w,
                impact: `This means ${w.toLowerCase().includes('expensive') || w.toLowerCase().includes('cost') ?
                    'money leaving your account every month forever' :
                    w.toLowerCase().includes('limit') ?
                    'you\'re constantly hitting walls and paying for upgrades' :
                    'you\'re not getting the full value you deserve'}`
            }))
        },

        solutionSection: {
            headline: `How ${product.name} Solves These Problems`,
            solutions: product.uniqueSellingPoints.map((usp, i) => ({
                solution: usp,
                contrast: competitor.weaknesses[i] ?
                    `Unlike ${competitor.name}'s ${competitor.weaknesses[i].toLowerCase()}` :
                    `Something ${competitor.name} simply can't offer`
            }))
        },

        comparisonTable: {
            headline: `${product.name} vs ${competitor.name}: Feature Comparison`,
            rows: [
                { feature: 'Pricing', ours: `$${product.price} one-time`, theirs: competitor.pricing },
                { feature: 'Pricing Model', ours: 'Pay once, own forever', theirs: competitor.pricingModel === 'subscription' ? 'Monthly subscription' : competitor.pricingModel },
                { feature: '2-Year Total Cost', ours: `$${product.price}`, theirs: `$${parseInt(competitor.pricing.match(/\d+/)?.[0] || 50) * 24}` },
                { feature: 'Source Code', ours: 'Full access included', theirs: 'No access' },
                { feature: 'AI Technology', ours: 'Claude Opus 4.5', theirs: 'Various/Unknown' },
                { feature: 'Charity Contribution', ours: '60% to kids', theirs: '0%' },
                { feature: 'Updates', ours: 'Free forever', theirs: 'Included in subscription' }
            ]
        },

        switchingGuide: {
            headline: `How to Switch from ${competitor.name} to ${product.name}`,
            steps: [
                {
                    step: 1,
                    title: 'Export Your Data',
                    description: `Download any content, templates, or settings from your ${competitor.name} account before canceling.`,
                    timeEstimate: '15-30 minutes'
                },
                {
                    step: 2,
                    title: `Get ${product.name}`,
                    description: `Purchase ${product.name} for $${product.price} (one-time). Download and install following our quick-start guide.`,
                    timeEstimate: '5 minutes'
                },
                {
                    step: 3,
                    title: 'Configure Your Settings',
                    description: `Set up ${product.name} with your brand settings, API keys, and preferences. Our setup wizard makes this easy.`,
                    timeEstimate: '30-60 minutes'
                },
                {
                    step: 4,
                    title: `Cancel ${competitor.name}`,
                    description: `Once ${product.name} is running smoothly, cancel your ${competitor.name} subscription and stop the bleeding.`,
                    timeEstimate: '5 minutes'
                },
                {
                    step: 5,
                    title: 'Enjoy the Savings',
                    description: `Watch your savings grow month after month. After ${Math.ceil(product.price / parseInt(competitor.pricing.match(/\d+/)?.[0] || 50))} months, you've broken even. Everything after is pure savings.`,
                    timeEstimate: 'Ongoing'
                }
            ]
        },

        faq: [
            {
                question: `Is ${product.name} really a good alternative to ${competitor.name}?`,
                answer: `Yes. ${product.name} offers comparable or better functionality at a fraction of the long-term cost. While ${competitor.name} charges ${competitor.pricing}, ${product.name} is a one-time $${product.price} investment. Plus, 60% goes to charity.`
            },
            {
                question: `What features does ${product.name} have that ${competitor.name} doesn't?`,
                answer: `${product.name} offers: ${product.uniqueSellingPoints.slice(0, 3).join(', ')}. ${competitor.name} lacks these capabilities.`
            },
            {
                question: `How long does it take to switch from ${competitor.name}?`,
                answer: `Most users complete the switch in 1-2 hours. Our documentation provides step-by-step guidance for the transition.`
            },
            {
                question: `Can I use ${product.name} for the same use cases as ${competitor.name}?`,
                answer: `Absolutely. ${product.name} is designed for ${product.targetAudience.join(', ')} - the same audiences ${competitor.name} serves, but with better value.`
            }
        ],

        finalCta: {
            headline: `Ready to Leave ${competitor.name} Behind?`,
            subheadline: `Join thousands who've made the switch and saved $${Math.round((parseInt(competitor.pricing.match(/\d+/)?.[0] || 50) * 12) - product.price)}+ in their first year`,
            buttonText: `Get ${product.name} Now`,
            buttonUrl: product.url,
            guarantee: `$${product.price} one-time. No subscriptions. 60% to charity.`
        }
    };

    // Generate markdown version
    let markdown = `# ${page.seo.h1}\n\n`;
    markdown += `> **${page.heroSection.subheadline}**\n\n`;

    markdown += `## ${page.problemSection.headline}\n\n`;
    page.problemSection.problems.forEach(p => {
        markdown += `- **${p.problem}** - ${p.impact}\n`;
    });
    markdown += '\n';

    markdown += `## ${page.solutionSection.headline}\n\n`;
    page.solutionSection.solutions.forEach(s => {
        markdown += `- **${s.solution}** - ${s.contrast}\n`;
    });
    markdown += '\n';

    markdown += `## ${page.comparisonTable.headline}\n\n`;
    markdown += `| Feature | ${product.name} | ${competitor.name} |\n`;
    markdown += `|---------|----------------|--------------------|\n`;
    page.comparisonTable.rows.forEach(row => {
        markdown += `| ${row.feature} | ${row.ours} | ${row.theirs} |\n`;
    });
    markdown += '\n';

    markdown += `## ${page.switchingGuide.headline}\n\n`;
    page.switchingGuide.steps.forEach(step => {
        markdown += `### Step ${step.step}: ${step.title}\n\n`;
        markdown += `${step.description}\n\n`;
        markdown += `*Time: ${step.timeEstimate}*\n\n`;
    });

    markdown += `## FAQ\n\n`;
    page.faq.forEach(qa => {
        markdown += `### ${qa.question}\n\n${qa.answer}\n\n`;
    });

    markdown += `---\n\n`;
    markdown += `## ${page.finalCta.headline}\n\n`;
    markdown += `${page.finalCta.subheadline}\n\n`;
    markdown += `[${page.finalCta.buttonText}](${page.finalCta.buttonUrl})\n\n`;
    markdown += `**${page.finalCta.guarantee}**\n\n`;
    markdown += `**FOR THE KIDS. ALWAYS.**\n`;

    page.markdown = markdown;

    return page;
}

function generateAllAlternativeToPages(productKey) {
    const product = PRODUCTS[productKey];
    if (!product) return null;

    const pages = {};
    product.competitors.forEach((competitor, index) => {
        const key = competitor.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
        pages[key] = generateAlternativeToPage(productKey, index);
    });
    return pages;
}

// ============================================================================
// 4. SWITCHING GUIDES
// ============================================================================

function generateSwitchingGuide(productKey, competitorIndex = 0) {
    const product = PRODUCTS[productKey];
    if (!product) return null;

    const competitor = product.competitors[competitorIndex];
    if (!competitor) return null;

    const guide = {
        productName: product.name,
        competitorName: competitor.name,
        generatedAt: new Date().toISOString(),

        title: `Complete Guide: Switching from ${competitor.name} to ${product.name}`,
        subtitle: `Save $${Math.round((parseInt(competitor.pricing.match(/\d+/)?.[0] || 50) * 12) - product.price)} in your first year`,

        overview: {
            headline: 'Why Make the Switch?',
            reasons: [
                `Stop paying ${competitor.pricing} every month`,
                `One-time $${product.price} investment - own it forever`,
                `Better features: ${product.keyFeatures.slice(0, 3).join(', ')}`,
                `60% goes to verified pediatric charities`,
                `Full source code access (unlike ${competitor.name})`
            ],
            timeToSwitch: '1-2 hours',
            difficultyLevel: 'Easy',
            savingsFirstYear: `$${Math.round((parseInt(competitor.pricing.match(/\d+/)?.[0] || 50) * 12) - product.price)}`
        },

        preSwitch: {
            headline: 'Before You Start',
            checklist: [
                {
                    task: `Review your current ${competitor.name} subscription`,
                    details: 'Check your billing cycle to avoid paying for another month',
                    priority: 'high'
                },
                {
                    task: 'Export your existing data',
                    details: `Download any content, settings, or templates from ${competitor.name}`,
                    priority: 'high'
                },
                {
                    task: 'Note your current settings',
                    details: 'Screenshot or document your current configuration for reference',
                    priority: 'medium'
                },
                {
                    task: 'Prepare your API keys',
                    details: `Gather any third-party API keys you'll need (same ones used with ${competitor.name})`,
                    priority: 'medium'
                },
                {
                    task: 'Set aside 1-2 hours',
                    details: 'Uninterrupted time for a smooth transition',
                    priority: 'low'
                }
            ]
        },

        steps: [
            {
                phase: 'Phase 1: Purchase & Download',
                duration: '5-10 minutes',
                steps: [
                    {
                        step: 1,
                        action: `Go to ${product.url}`,
                        details: `Visit the ${product.name} product page`,
                        tip: 'Bookmark this for quick access later'
                    },
                    {
                        step: 2,
                        action: `Complete your $${product.price} purchase`,
                        details: 'One-time payment - no recurring charges ever',
                        tip: 'Remember: 60% goes to pediatric charities'
                    },
                    {
                        step: 3,
                        action: 'Download the package',
                        details: 'You\'ll receive immediate access to download',
                        tip: 'Save to a dedicated folder for easy access'
                    }
                ]
            },
            {
                phase: 'Phase 2: Installation & Setup',
                duration: '20-40 minutes',
                steps: [
                    {
                        step: 4,
                        action: 'Extract the files',
                        details: 'Unzip to your preferred location',
                        tip: 'We recommend a dedicated project folder'
                    },
                    {
                        step: 5,
                        action: 'Install dependencies',
                        details: 'Run `npm install` in the project directory',
                        tip: 'Node.js 18+ required'
                    },
                    {
                        step: 6,
                        action: 'Configure environment variables',
                        details: 'Copy .env.example to .env and fill in your values',
                        tip: 'Use the same API keys from your previous setup'
                    },
                    {
                        step: 7,
                        action: 'Run the setup wizard',
                        details: 'Follow the interactive configuration prompts',
                        tip: 'The wizard will validate your settings'
                    }
                ]
            },
            {
                phase: 'Phase 3: Migration',
                duration: '15-30 minutes',
                steps: [
                    {
                        step: 8,
                        action: 'Import your existing content',
                        details: `Migrate any content exported from ${competitor.name}`,
                        tip: 'Check our migration docs for specific formats'
                    },
                    {
                        step: 9,
                        action: 'Configure your brand settings',
                        details: 'Set up logos, colors, and brand voice',
                        tip: 'Match your previous branding for consistency'
                    },
                    {
                        step: 10,
                        action: 'Test the system',
                        details: 'Run a test to ensure everything works',
                        tip: 'Start with a small test before full production'
                    }
                ]
            },
            {
                phase: 'Phase 4: Go Live',
                duration: '5-10 minutes',
                steps: [
                    {
                        step: 11,
                        action: `Verify ${product.name} is working`,
                        details: 'Confirm all features are functioning as expected',
                        tip: 'Run for 24 hours before canceling old service'
                    },
                    {
                        step: 12,
                        action: `Cancel ${competitor.name} subscription`,
                        details: 'Once confirmed, stop the recurring charges',
                        tip: 'Check for any cancellation fees or lock-in periods'
                    },
                    {
                        step: 13,
                        action: 'Celebrate your savings!',
                        details: `You've just saved $${Math.round((parseInt(competitor.pricing.match(/\d+/)?.[0] || 50) * 12) - product.price)} this year`,
                        tip: 'Plus 60% of your purchase helped kids in need'
                    }
                ]
            }
        ],

        featureMapping: {
            headline: `Feature Mapping: ${competitor.name} to ${product.name}`,
            description: 'Here\'s how your familiar features translate to the new platform:',
            mappings: product.keyFeatures.map((feature, i) => ({
                newFeature: feature,
                equivalent: `Similar to ${competitor.name}'s ${competitor.strengths[i] || 'standard feature'}`,
                improvement: product.uniqueSellingPoints[i % product.uniqueSellingPoints.length] || 'Enhanced in our version'
            }))
        },

        troubleshooting: {
            headline: 'Common Issues & Solutions',
            issues: [
                {
                    problem: 'API connection errors',
                    solution: 'Double-check your API keys in the .env file. Ensure no trailing spaces.',
                    prevention: 'Copy keys directly without manual typing'
                },
                {
                    problem: 'Missing dependencies',
                    solution: 'Run `npm install` again. Check Node.js version (18+ required).',
                    prevention: 'Use nvm to manage Node versions'
                },
                {
                    problem: 'Permission errors',
                    solution: 'Run terminal as administrator (Windows) or use sudo (Mac/Linux).',
                    prevention: 'Install to user-writable directory'
                },
                {
                    problem: 'Content not importing',
                    solution: 'Check export format. Refer to migration documentation.',
                    prevention: 'Use supported export formats listed in docs'
                }
            ]
        },

        support: {
            headline: 'Need Help?',
            options: [
                {
                    method: 'Documentation',
                    description: 'Comprehensive guides for every feature',
                    url: `${CONFIG.storeUrl}/docs/${productKey}`
                },
                {
                    method: 'Discord Community',
                    description: 'Get help from fellow users and our team',
                    url: `${CONFIG.storeUrl}/discord`
                },
                {
                    method: 'Email Support',
                    description: 'Direct support for complex issues',
                    url: 'mailto:support@ai-solutions.store'
                }
            ]
        },

        successMetrics: {
            headline: 'How to Know the Switch Was Successful',
            metrics: [
                `${product.name} is generating output automatically`,
                `No more ${competitor.name} charges on your card`,
                `You've saved your first month's subscription ($${parseInt(competitor.pricing.match(/\d+/)?.[0] || 50)})`,
                `System running 24/7 without intervention`,
                `You helped kids through the 60% charity contribution`
            ]
        }
    };

    // Generate markdown version
    let markdown = `# ${guide.title}\n\n`;
    markdown += `> ${guide.subtitle}\n\n`;
    markdown += `**Time Required:** ${guide.overview.timeToSwitch} | **Difficulty:** ${guide.overview.difficultyLevel} | **First Year Savings:** ${guide.overview.savingsFirstYear}\n\n`;

    markdown += `## ${guide.overview.headline}\n\n`;
    guide.overview.reasons.forEach(r => markdown += `- ${r}\n`);
    markdown += '\n';

    markdown += `## ${guide.preSwitch.headline}\n\n`;
    guide.preSwitch.checklist.forEach(item => {
        const priority = item.priority === 'high' ? '[!]' : item.priority === 'medium' ? '[-]' : '[ ]';
        markdown += `${priority} **${item.task}** - ${item.details}\n`;
    });
    markdown += '\n';

    guide.steps.forEach(phase => {
        markdown += `## ${phase.phase}\n`;
        markdown += `*Duration: ${phase.duration}*\n\n`;
        phase.steps.forEach(step => {
            markdown += `### Step ${step.step}: ${step.action}\n\n`;
            markdown += `${step.details}\n\n`;
            markdown += `> Tip: ${step.tip}\n\n`;
        });
    });

    markdown += `## ${guide.troubleshooting.headline}\n\n`;
    guide.troubleshooting.issues.forEach(issue => {
        markdown += `### ${issue.problem}\n\n`;
        markdown += `**Solution:** ${issue.solution}\n\n`;
        markdown += `**Prevention:** ${issue.prevention}\n\n`;
    });

    markdown += `## ${guide.successMetrics.headline}\n\n`;
    guide.successMetrics.metrics.forEach(m => markdown += `- ${m}\n`);
    markdown += '\n';

    markdown += `---\n\n`;
    markdown += `## ${guide.support.headline}\n\n`;
    guide.support.options.forEach(opt => {
        markdown += `- **${opt.method}:** ${opt.description}\n`;
    });
    markdown += '\n';

    markdown += `---\n\n`;
    markdown += `**Congratulations on making the switch!**\n\n`;
    markdown += `You've not only saved money and got a better product - you've helped kids through Gospel V1.3.\n\n`;
    markdown += `**FOR THE KIDS. ALWAYS.**\n`;

    guide.markdown = markdown;

    return guide;
}

function generateAllSwitchingGuides(productKey) {
    const product = PRODUCTS[productKey];
    if (!product) return null;

    const guides = {};
    product.competitors.forEach((competitor, index) => {
        const key = competitor.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
        guides[key] = generateSwitchingGuide(productKey, index);
    });
    return guides;
}

// ============================================================================
// FILE OUTPUT
// ============================================================================

function saveContent(content, filename, subdir = '') {
    const outputDir = subdir ? path.join(CONFIG.outputDir, subdir) : CONFIG.outputDir;

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Save JSON
    const jsonPath = path.join(outputDir, `${filename}.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(content, null, 2));
    log(`Saved: ${jsonPath}`);

    // Save Markdown if available
    if (content.markdown) {
        const mdPath = path.join(outputDir, `${filename}.md`);
        fs.writeFileSync(mdPath, content.markdown);
        log(`Saved: ${mdPath}`);
    }

    return jsonPath;
}

function generateAllContent() {
    ensureDirectories();

    const timestamp = new Date().toISOString().split('T')[0];
    const summary = {
        generatedAt: new Date().toISOString(),
        gospel: CONFIG.gospel,
        products: Object.keys(PRODUCTS).length,
        contentGenerated: {
            featureComparisons: 0,
            whyChooseUs: 0,
            alternativeToPages: 0,
            switchingGuides: 0
        },
        files: []
    };

    Object.keys(PRODUCTS).forEach(productKey => {
        const product = PRODUCTS[productKey];
        log(`\nGenerating content for: ${product.name}`, 'INFO');

        // 1. Feature Comparison Tables
        log('  - Feature comparison table...', 'INFO');
        const comparison = generateFeatureComparisonTable(productKey);
        if (comparison) {
            const file = saveContent(comparison, `feature-comparison`, productKey);
            summary.files.push(file);
            summary.contentGenerated.featureComparisons++;
        }

        // 2. Why Choose Us
        log('  - Why Choose Us section...', 'INFO');
        const whyChoose = generateWhyChooseUs(productKey);
        if (whyChoose) {
            const file = saveContent(whyChoose, `why-choose-us`, productKey);
            summary.files.push(file);
            summary.contentGenerated.whyChooseUs++;
        }

        // 3. Alternative-To Pages (for each competitor)
        log('  - Alternative-to pages...', 'INFO');
        const alternatives = generateAllAlternativeToPages(productKey);
        if (alternatives) {
            Object.keys(alternatives).forEach(competitorKey => {
                const file = saveContent(
                    alternatives[competitorKey],
                    `alternative-to-${competitorKey}`,
                    productKey
                );
                summary.files.push(file);
                summary.contentGenerated.alternativeToPages++;
            });
        }

        // 4. Switching Guides (for each competitor)
        log('  - Switching guides...', 'INFO');
        const guides = generateAllSwitchingGuides(productKey);
        if (guides) {
            Object.keys(guides).forEach(competitorKey => {
                const file = saveContent(
                    guides[competitorKey],
                    `switching-guide-from-${competitorKey}`,
                    productKey
                );
                summary.files.push(file);
                summary.contentGenerated.switchingGuides++;
            });
        }
    });

    // Save summary
    const summaryPath = path.join(CONFIG.outputDir, `generation-summary-${timestamp}.json`);
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
    log(`\nSummary saved: ${summaryPath}`, 'SUCCESS');

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
COMPETITOR COMPARISON CONTENT GENERATOR
AI Solutions Store | FOR THE KIDS - Gospel V1.3
============================================================================

Usage:
  node competitor-comparison.cjs [options]

Options:
  --help                    Show this help message
  --generate-all            Generate all content for all products
  --product=KEY             Generate content for specific product
  --type=TYPE               Generate specific content type only

Content Types:
  comparison                Feature comparison tables
  why-choose-us             "Why Choose Us" sections
  alternative-to            Alternative-to pages (SEO)
  switching-guide           Migration/switching guides

Products:
  claude-droid              YouTube Shorts Automation ($299)
  income-droid              Multi-Platform Revenue Engine ($499)
  marketing-engine          23-Platform Social Automation ($199)
  jules-ai                  AI Business Dashboard ($399)
  affiliate-system          White-Label Affiliate Platform ($599)
  dating-platform           Dating App Source Code ($2,499)

Examples:
  node competitor-comparison.cjs --generate-all
  node competitor-comparison.cjs --product=claude-droid
  node competitor-comparison.cjs --product=marketing-engine --type=comparison
  node competitor-comparison.cjs --type=switching-guide

Output:
  All content saved to: ${CONFIG.outputDir}
  Logs written to: ${CONFIG.logFile}

============================================================================
FOR THE KIDS. ALWAYS.
============================================================================
`);
}

async function main() {
    const args = parseArgs();

    console.log('');
    console.log('============================================================================');
    console.log('COMPETITOR COMPARISON CONTENT GENERATOR');
    console.log('AI Solutions Store | FOR THE KIDS - Gospel V1.3 (60/30/10)');
    console.log('============================================================================');
    console.log('');

    if (args.help) {
        showHelp();
        return;
    }

    ensureDirectories();

    if (args['generate-all']) {
        log('Generating all competitor comparison content...', 'INFO');
        const summary = generateAllContent();

        console.log('\n============================================================================');
        console.log('GENERATION COMPLETE');
        console.log('============================================================================');
        console.log(`Feature Comparisons: ${summary.contentGenerated.featureComparisons}`);
        console.log(`Why Choose Us:       ${summary.contentGenerated.whyChooseUs}`);
        console.log(`Alternative-To:      ${summary.contentGenerated.alternativeToPages}`);
        console.log(`Switching Guides:    ${summary.contentGenerated.switchingGuides}`);
        console.log(`Total Files:         ${summary.files.length}`);
        console.log(`Output Directory:    ${CONFIG.outputDir}`);
        console.log('============================================================================');
        console.log('FOR THE KIDS. ALWAYS.');
        console.log('============================================================================\n');
        return;
    }

    const productKey = args.product;
    const contentType = args.type;

    if (productKey && !PRODUCTS[productKey]) {
        log(`Unknown product: ${productKey}. Use --help for available products.`, 'ERROR');
        return;
    }

    const products = productKey ? [productKey] : Object.keys(PRODUCTS);
    let filesGenerated = 0;

    products.forEach(pKey => {
        const product = PRODUCTS[pKey];
        log(`\nProcessing: ${product.name}`, 'INFO');

        if (!contentType || contentType === 'comparison') {
            const comparison = generateFeatureComparisonTable(pKey);
            if (comparison) {
                saveContent(comparison, 'feature-comparison', pKey);
                filesGenerated++;
            }
        }

        if (!contentType || contentType === 'why-choose-us') {
            const whyChoose = generateWhyChooseUs(pKey);
            if (whyChoose) {
                saveContent(whyChoose, 'why-choose-us', pKey);
                filesGenerated++;
            }
        }

        if (!contentType || contentType === 'alternative-to') {
            const alternatives = generateAllAlternativeToPages(pKey);
            if (alternatives) {
                Object.keys(alternatives).forEach(competitorKey => {
                    saveContent(alternatives[competitorKey], `alternative-to-${competitorKey}`, pKey);
                    filesGenerated++;
                });
            }
        }

        if (!contentType || contentType === 'switching-guide') {
            const guides = generateAllSwitchingGuides(pKey);
            if (guides) {
                Object.keys(guides).forEach(competitorKey => {
                    saveContent(guides[competitorKey], `switching-guide-from-${competitorKey}`, pKey);
                    filesGenerated++;
                });
            }
        }
    });

    console.log('\n============================================================================');
    log(`Generated ${filesGenerated} files`, 'SUCCESS');
    log(`Output: ${CONFIG.outputDir}`, 'INFO');
    console.log('============================================================================');
    console.log('FOR THE KIDS. ALWAYS.');
    console.log('============================================================================\n');
}

// Run the script
main().catch(err => {
    log(`Fatal error: ${err.message}`, 'ERROR');
    console.error(err);
    process.exit(1);
});

// ============================================================================
// EXPORTS
// ============================================================================

module.exports = {
    CONFIG,
    PRODUCTS,
    generateFeatureComparisonTable,
    generateAllFeatureComparisons,
    generateWhyChooseUs,
    generateAllWhyChooseUs,
    generateAlternativeToPage,
    generateAllAlternativeToPages,
    generateSwitchingGuide,
    generateAllSwitchingGuides,
    generateAllContent
};
