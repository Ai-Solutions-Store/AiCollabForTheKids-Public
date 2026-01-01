/**
 * ============================================================================
 * EMAIL DRIP CAMPAIGN AUTOMATION SYSTEM
 * AI Solutions Store - Production-Ready Email Sequences
 * ============================================================================
 *
 * Generates and manages automated email sequences for:
 * 1. New Subscriber Welcome Series
 * 2. Product Launch Announcements
 * 3. Abandoned Cart Recovery
 * 4. Weekly Newsletter Content
 *
 * Uses SendGrid API for delivery
 * Mission: FOR THE KIDS - Gospel V1.3 (60/30/10)
 *
 * Usage:
 *   node email-drip-campaign.cjs --campaign=welcome --test
 *   node email-drip-campaign.cjs --campaign=product-launch --product=claude-droid
 *   node email-drip-campaign.cjs --campaign=abandoned-cart --email=user@example.com
 *   node email-drip-campaign.cjs --campaign=newsletter --week=1
 *   node email-drip-campaign.cjs --list-campaigns
 *   node email-drip-campaign.cjs --generate-all
 *
 * ============================================================================
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
    // SendGrid API (loaded from environment or .env)
    sendgridApiKey: process.env.SENDGRID_API_KEY || '',
    fromEmail: process.env.SENDGRID_FROM_EMAIL || 'noreply@aidoesitall.website',
    fromName: 'AI Solutions Store',
    replyTo: process.env.EMAIL_SUPPORT || 'support@youandinotai.com',

    // Store URLs
    storeUrl: 'https://ai-solutions.store',
    websiteUrl: 'https://aidoesitall.website',
    consultationUrl: 'https://ai-solutions.store/consultation',

    // Logging
    logsDir: 'C:\\AiCollabForTheKids\\logs',
    outputDir: 'C:\\AiCollabForTheKids\\logs\\drip-campaigns',
    logFile: 'C:\\AiCollabForTheKids\\logs\\email-drip-campaign.log',

    // Branding
    brandColors: {
        primary: '#CC785C',     // Copper/rust
        secondary: '#078EFA',   // Blue
        accent: '#20808D',      // Teal
        dark: '#141413',        // Near black
        light: '#f9f9f9'        // Off white
    },

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
        benefits: [
            'Create 4+ videos daily on autopilot',
            'Grow your YouTube channel 24/7',
            'No editing skills required',
            'Start generating views immediately'
        ],
        useCases: ['Content creators', 'News channels', 'Affiliate marketers', 'Passive income seekers']
    },
    'income-droid': {
        name: 'Income Droid',
        price: 499,
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
        benefits: [
            'Scale content without hiring',
            'Built-in monetization strategies',
            'Track revenue in real-time',
            'Focus on business, not production'
        ],
        useCases: ['Entrepreneurs', 'Digital agencies', 'Side hustlers', 'Content farms']
    },
    'marketing-engine': {
        name: 'Marketing Engine',
        price: 199,
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
        benefits: [
            'Never miss a posting schedule',
            'Consistent brand presence',
            'Reach audiences everywhere',
            'Analytics across all platforms'
        ],
        useCases: ['Small businesses', 'Social media managers', 'Startups', 'Personal brands']
    },
    'jules-ai': {
        name: 'Jules AI',
        price: 399,
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
        benefits: [
            'One dashboard for everything',
            'Coordinate multiple AI agents',
            'Make data-driven decisions',
            'Scale operations efficiently'
        ],
        useCases: ['Agency owners', 'Power users', 'Enterprise teams', 'Multi-project managers']
    },
    'affiliate-system': {
        name: 'Affiliate System',
        price: 599,
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
        benefits: [
            'Launch affiliate program in 24hrs',
            'Recruit and manage partners',
            'Track conversions precisely',
            'Grow through word-of-mouth'
        ],
        useCases: ['SaaS companies', 'E-commerce stores', 'Course creators', 'Digital product sellers']
    },
    'dating-platform': {
        name: 'Dating Platform',
        price: 2499,
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
        benefits: [
            'Deploy in 24 hours',
            'Full ownership of code',
            'No monthly platform fees',
            'Customize for your niche'
        ],
        useCases: ['Dating startups', 'Niche communities', 'Faith-based platforms', 'Professional networking']
    }
};

// ============================================================================
// LOGGING UTILITY
// ============================================================================

function log(message, level = 'INFO') {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${level}] ${message}`;

    // Console output with colors
    const colors = {
        INFO: '\x1b[36m',    // Cyan
        SUCCESS: '\x1b[32m', // Green
        WARN: '\x1b[33m',    // Yellow
        ERROR: '\x1b[31m',   // Red
        RESET: '\x1b[0m'
    };

    console.log(`${colors[level] || colors.INFO}${logEntry}${colors.RESET}`);

    // File logging
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
// EMAIL TEMPLATE HELPERS
// ============================================================================

function getEmailHeader() {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Solutions Store</title>
</head>
<body style="margin: 0; padding: 0; background-color: ${CONFIG.brandColors.dark}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #0a0a0a;">
`;
}

function getEmailFooter(unsubscribeUrl = '#') {
    return `
        <tr>
            <td style="padding: 30px; background: #1a1a1a;">
                <h3 style="color: ${CONFIG.brandColors.primary}; margin: 0 0 15px 0; font-size: 18px; text-align: center;">FOR THE KIDS</h3>
                <p style="color: #999; font-size: 14px; line-height: 1.6; margin: 0; text-align: center;">
                    60% of every sale goes to Verified Pediatric Charities.<br>
                    30% to infrastructure. 10% to the founder.<br>
                    This is Gospel V1.3 - immutable.
                </p>
            </td>
        </tr>
        <tr>
            <td style="padding: 30px; text-align: center; border-top: 1px solid #333;">
                <p style="color: #666; font-size: 12px; margin: 0 0 10px 0;">
                    AI Solutions Store | Built with Claude Opus 4.5
                </p>
                <p style="color: #555; font-size: 11px; margin: 0;">
                    <a href="${CONFIG.storeUrl}" style="color: ${CONFIG.brandColors.secondary}; text-decoration: none;">Visit Store</a> |
                    <a href="mailto:${CONFIG.replyTo}" style="color: ${CONFIG.brandColors.secondary}; text-decoration: none;">Support</a> |
                    <a href="${unsubscribeUrl}" style="color: #666; text-decoration: none;">Unsubscribe</a>
                </p>
            </td>
        </tr>
    </table>
</body>
</html>
`;
}

function getProductCard(productKey) {
    const product = PRODUCTS[productKey];
    if (!product) return '';

    const featureList = product.features.map(f => `<li style="margin: 5px 0;">${f}</li>`).join('');

    return `
        <tr>
            <td style="padding: 20px 0;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background: #1a1a1a; border-radius: 8px; overflow: hidden;">
                    <tr>
                        <td style="padding: 30px;">
                            <h2 style="color: ${CONFIG.brandColors.primary}; margin: 0 0 10px 0; font-size: 24px;">
                                ${product.icon} ${product.name}
                            </h2>
                            <p style="color: ${CONFIG.brandColors.secondary}; font-size: 28px; font-weight: bold; margin: 10px 0;">
                                $${product.price} <span style="font-size: 14px; color: #888;">one-time</span>
                            </p>
                            <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 15px 0;">
                                ${product.description}
                            </p>
                            <ul style="color: #aaa; font-size: 14px; line-height: 1.8; margin: 15px 0; padding-left: 20px;">
                                ${featureList}
                            </ul>
                            <a href="${product.url}" style="display: inline-block; background: ${CONFIG.brandColors.primary}; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; margin-top: 10px;">
                                Get ${product.name} →
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    `;
}

// ============================================================================
// CAMPAIGN 1: WELCOME SERIES (7-day sequence)
// ============================================================================

const WELCOME_SEQUENCE = [
    {
        day: 0,
        delay: '0 hours',
        subject: 'Welcome to AI Solutions Store - Let\'s automate your success',
        preheader: 'Your journey to AI-powered productivity starts now',
        type: 'immediate',
        generateHtml: (subscriber) => {
            return `${getEmailHeader()}
                <tr>
                    <td style="padding: 40px 30px; text-align: center; background: linear-gradient(135deg, ${CONFIG.brandColors.dark} 0%, #1a1a1a 100%);">
                        <h1 style="color: ${CONFIG.brandColors.primary}; margin: 0; font-size: 32px;">Welcome to AI Solutions Store</h1>
                        <p style="color: ${CONFIG.brandColors.secondary}; margin: 15px 0 0 0; font-size: 18px;">Production-Ready AI Tools. For The Kids.</p>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 30px;">
                        <p style="color: #ddd; font-size: 18px; line-height: 1.6; margin: 0 0 20px 0;">
                            Hey ${subscriber.name || 'there'},
                        </p>
                        <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                            Welcome to AI Solutions Store - where AI automation meets real business results.
                        </p>
                        <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                            Over the next few days, I'll show you exactly how our AI tools can:
                        </p>
                        <ul style="color: #aaa; font-size: 16px; line-height: 2; margin: 0 0 20px 20px;">
                            <li>Save you 15+ hours per week on repetitive tasks</li>
                            <li>Generate content while you sleep</li>
                            <li>Scale your business without hiring</li>
                            <li>Turn automation into passive income</li>
                        </ul>
                        <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                            <strong style="color: ${CONFIG.brandColors.primary};">Here's what makes us different:</strong> Every product we sell is built with Claude Opus 4.5, tested in production, and generating revenue right now.
                        </p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${CONFIG.storeUrl}" style="display: inline-block; background: ${CONFIG.brandColors.primary}; color: #fff; padding: 16px 40px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 18px;">
                                Explore Our Products →
                            </a>
                        </div>
                        <p style="color: #888; font-size: 14px; line-height: 1.6; margin: 30px 0 0 0;">
                            Tomorrow, I'll share the #1 automation most businesses should start with.
                        </p>
                        <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 20px 0 0 0;">
                            - The AI Solutions Team
                        </p>
                    </td>
                </tr>
            ${getEmailFooter('{{unsubscribe_url}}')}`;
        }
    },
    {
        day: 1,
        delay: '24 hours',
        subject: 'The 15-hour mistake most business owners make',
        preheader: 'Are you spending time on tasks AI could handle?',
        type: 'education',
        generateHtml: (subscriber) => {
            return `${getEmailHeader()}
                <tr>
                    <td style="padding: 40px 30px; text-align: center; background: linear-gradient(135deg, ${CONFIG.brandColors.dark} 0%, #1a1a1a 100%);">
                        <h1 style="color: ${CONFIG.brandColors.primary}; margin: 0; font-size: 28px;">The 15-Hour Mistake</h1>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 30px;">
                        <p style="color: #ddd; font-size: 18px; line-height: 1.6; margin: 0 0 20px 0;">
                            Hey ${subscriber.name || 'there'},
                        </p>
                        <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                            Quick question: How many hours did you spend last week on tasks AI could do?
                        </p>
                        <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                            For most business owners, the answer is <strong style="color: ${CONFIG.brandColors.secondary};">15+ hours</strong>.
                        </p>
                        <table width="100%" cellpadding="0" cellspacing="0" style="background: #1a1a1a; border-radius: 8px; margin: 20px 0;">
                            <tr>
                                <td style="padding: 20px;">
                                    <p style="color: ${CONFIG.brandColors.primary}; font-weight: bold; margin: 0 0 15px 0;">The Common Time Sinks:</p>
                                    <ul style="color: #aaa; font-size: 15px; line-height: 2; margin: 0; padding-left: 20px;">
                                        <li>Social media posting (2-4 hours/week)</li>
                                        <li>Email responses (3-5 hours/week)</li>
                                        <li>Content creation (4-6 hours/week)</li>
                                        <li>Data entry & reports (2-3 hours/week)</li>
                                        <li>Research & curation (2-4 hours/week)</li>
                                    </ul>
                                </td>
                            </tr>
                        </table>
                        <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                            Here's what's wild: <strong style="color: ${CONFIG.brandColors.accent};">Each of these can be automated in under a day.</strong>
                        </p>
                        <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                            Not "eventually" automated. Actually running. This week.
                        </p>
                        <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                            Our <strong>Marketing Engine</strong> posts to 23 platforms automatically. <strong>Claude Droid</strong> creates 4 YouTube videos daily. Zero manual work after setup.
                        </p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${CONFIG.storeUrl}" style="display: inline-block; background: ${CONFIG.brandColors.primary}; color: #fff; padding: 16px 40px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 18px;">
                                See How It Works →
                            </a>
                        </div>
                        <p style="color: #888; font-size: 14px; line-height: 1.6; margin: 20px 0 0 0;">
                            Tomorrow: The #1 automation with the highest ROI.
                        </p>
                    </td>
                </tr>
            ${getEmailFooter('{{unsubscribe_url}}')}`;
        }
    },
    {
        day: 2,
        delay: '48 hours',
        subject: 'Start here (if you only automate one thing)',
        preheader: 'The highest-ROI automation for any business',
        type: 'recommendation',
        generateHtml: (subscriber) => {
            const product = PRODUCTS['claude-droid'];
            return `${getEmailHeader()}
                <tr>
                    <td style="padding: 40px 30px; text-align: center; background: linear-gradient(135deg, ${CONFIG.brandColors.dark} 0%, #1a1a1a 100%);">
                        <div style="font-size: 48px; margin-bottom: 15px;">${product.icon}</div>
                        <h1 style="color: ${CONFIG.brandColors.primary}; margin: 0; font-size: 28px;">Start Here</h1>
                        <p style="color: ${CONFIG.brandColors.secondary}; margin: 10px 0 0 0; font-size: 16px;">If You Only Automate One Thing</p>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 30px;">
                        <p style="color: #ddd; font-size: 18px; line-height: 1.6; margin: 0 0 20px 0;">
                            Hey ${subscriber.name || 'there'},
                        </p>
                        <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                            If you could only automate <strong>ONE thing</strong> in your business, make it <strong style="color: ${CONFIG.brandColors.primary};">content creation</strong>.
                        </p>
                        <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                            Why? Because content drives everything else:
                        </p>
                        <ul style="color: #aaa; font-size: 16px; line-height: 2; margin: 0 0 20px 20px;">
                            <li>More content = more traffic</li>
                            <li>More traffic = more leads</li>
                            <li>More leads = more revenue</li>
                        </ul>
                        <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                            But content is also the biggest time sink.
                        </p>
                        ${getProductCard('claude-droid')}
                        <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 20px 0 0 0;">
                            No editing. No manual work. Just content flowing to your channel, 24/7.
                        </p>
                    </td>
                </tr>
            ${getEmailFooter('{{unsubscribe_url}}')}`;
        }
    },
    {
        day: 3,
        delay: '72 hours',
        subject: 'What happens after you automate content',
        preheader: 'The compounding effect of AI automation',
        type: 'social-proof',
        generateHtml: (subscriber) => {
            return `${getEmailHeader()}
                <tr>
                    <td style="padding: 40px 30px; text-align: center; background: linear-gradient(135deg, ${CONFIG.brandColors.dark} 0%, #1a1a1a 100%);">
                        <h1 style="color: ${CONFIG.brandColors.primary}; margin: 0; font-size: 28px;">The Compounding Effect</h1>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 30px;">
                        <p style="color: #ddd; font-size: 18px; line-height: 1.6; margin: 0 0 20px 0;">
                            Hey ${subscriber.name || 'there'},
                        </p>
                        <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                            Here's what our customers typically see after 30 days of automated content:
                        </p>
                        <table width="100%" cellpadding="0" cellspacing="0" style="background: #1a1a1a; border-radius: 8px; margin: 20px 0;">
                            <tr>
                                <td style="padding: 20px;">
                                    <p style="color: ${CONFIG.brandColors.secondary}; font-weight: bold; margin: 0 0 5px 0;">Week 1</p>
                                    <p style="color: #aaa; margin: 0 0 15px 0;">Systems running, content publishing consistently</p>

                                    <p style="color: ${CONFIG.brandColors.secondary}; font-weight: bold; margin: 0 0 5px 0;">Week 2</p>
                                    <p style="color: #aaa; margin: 0 0 15px 0;">First organic traffic increases (10-20%)</p>

                                    <p style="color: ${CONFIG.brandColors.secondary}; font-weight: bold; margin: 0 0 5px 0;">Week 3</p>
                                    <p style="color: #aaa; margin: 0 0 15px 0;">Engagement metrics climbing steadily</p>

                                    <p style="color: ${CONFIG.brandColors.secondary}; font-weight: bold; margin: 0 0 5px 0;">Week 4</p>
                                    <p style="color: #aaa; margin: 0;">Lead flow noticeably up</p>
                                </td>
                            </tr>
                        </table>
                        <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                            By month 3? Some customers report <strong style="color: ${CONFIG.brandColors.accent};">3-5x their previous content output</strong> with zero additional time investment.
                        </p>
                        <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                            The compounding effect is real. Content you create today keeps working for years.
                        </p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${CONFIG.consultationUrl}" style="display: inline-block; background: ${CONFIG.brandColors.primary}; color: #fff; padding: 16px 40px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 18px;">
                                Book a Free Consultation →
                            </a>
                        </div>
                    </td>
                </tr>
            ${getEmailFooter('{{unsubscribe_url}}')}`;
        }
    },
    {
        day: 5,
        delay: '5 days',
        subject: 'The math on AI automation (does it pay off?)',
        preheader: 'Let\'s calculate your ROI',
        type: 'value-calculation',
        generateHtml: (subscriber) => {
            return `${getEmailHeader()}
                <tr>
                    <td style="padding: 40px 30px; text-align: center; background: linear-gradient(135deg, ${CONFIG.brandColors.dark} 0%, #1a1a1a 100%);">
                        <h1 style="color: ${CONFIG.brandColors.primary}; margin: 0; font-size: 28px;">The Math on AI Automation</h1>
                        <p style="color: ${CONFIG.brandColors.secondary}; margin: 10px 0 0 0; font-size: 16px;">Does It Actually Pay Off?</p>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 30px;">
                        <p style="color: #ddd; font-size: 18px; line-height: 1.6; margin: 0 0 20px 0;">
                            Hey ${subscriber.name || 'there'},
                        </p>
                        <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                            Let's do the math on whether AI automation makes sense for you.
                        </p>
                        <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
                            <tr>
                                <td style="background: #1a1a1a; border-radius: 8px 8px 0 0; padding: 20px;">
                                    <p style="color: ${CONFIG.brandColors.primary}; font-weight: bold; margin: 0;">Time Investment:</p>
                                    <ul style="color: #aaa; margin: 10px 0 0 20px; padding: 0;">
                                        <li>Setup: 2-4 hours (one-time)</li>
                                        <li>Maintenance: 30 min/week</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td style="background: #1a1a1a; padding: 20px; border-top: 1px solid #333;">
                                    <p style="color: ${CONFIG.brandColors.accent}; font-weight: bold; margin: 0;">Time Saved:</p>
                                    <ul style="color: #aaa; margin: 10px 0 0 20px; padding: 0;">
                                        <li>Content creation: 10-15 hours/week</li>
                                        <li>Social posting: 5-10 hours/week</li>
                                        <li>Email responses: 3-5 hours/week</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td style="background: ${CONFIG.brandColors.secondary}; border-radius: 0 0 8px 8px; padding: 20px; text-align: center;">
                                    <p style="color: #fff; font-weight: bold; margin: 0; font-size: 18px;">Net Result: 15-25 hours back per week</p>
                                </td>
                            </tr>
                        </table>
                        <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                            At $50/hour value, that's <strong style="color: ${CONFIG.brandColors.primary};">$750-1,250/week</strong> in time savings.<br>
                            At $100/hour? <strong style="color: ${CONFIG.brandColors.primary};">$1,500-2,500/week</strong>.
                        </p>
                        <table width="100%" cellpadding="0" cellspacing="0" style="background: #1a1a1a; border-radius: 8px; margin: 20px 0;">
                            <tr>
                                <td style="padding: 20px;">
                                    <p style="color: ${CONFIG.brandColors.primary}; font-weight: bold; margin: 0 0 15px 0;">Our Most Popular Tools:</p>
                                    <p style="color: #ccc; margin: 8px 0;"><strong>Claude Droid</strong> ($299) - YouTube automation</p>
                                    <p style="color: #ccc; margin: 8px 0;"><strong>Marketing Engine</strong> ($199) - 23-platform posting</p>
                                    <p style="color: #ccc; margin: 8px 0;"><strong>Income Droid</strong> ($499) - Multi-channel content</p>
                                    <p style="color: #888; margin: 15px 0 0 0; font-size: 14px;">All one-time purchases. No subscriptions.</p>
                                </td>
                            </tr>
                        </table>
                        <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 20px 0 0 0;">
                            The question isn't whether it pays off. It's how fast.
                        </p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${CONFIG.storeUrl}" style="display: inline-block; background: ${CONFIG.brandColors.primary}; color: #fff; padding: 16px 40px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 18px;">
                                Calculate Your ROI →
                            </a>
                        </div>
                    </td>
                </tr>
            ${getEmailFooter('{{unsubscribe_url}}')}`;
        }
    },
    {
        day: 7,
        delay: '7 days',
        subject: 'Last thing before I stop emailing you',
        preheader: 'An honest assessment (and final offer)',
        type: 'closing',
        generateHtml: (subscriber) => {
            return `${getEmailHeader()}
                <tr>
                    <td style="padding: 40px 30px; text-align: center; background: linear-gradient(135deg, ${CONFIG.brandColors.dark} 0%, #1a1a1a 100%);">
                        <h1 style="color: ${CONFIG.brandColors.primary}; margin: 0; font-size: 28px;">Honest Assessment</h1>
                        <p style="color: #888; margin: 10px 0 0 0; font-size: 16px;">This is my last email in this sequence</p>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 30px;">
                        <p style="color: #ddd; font-size: 18px; line-height: 1.6; margin: 0 0 20px 0;">
                            Hey ${subscriber.name || 'there'},
                        </p>
                        <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                            Here's my honest take:
                        </p>
                        <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                            <strong style="color: ${CONFIG.brandColors.primary};">AI automation isn't for everyone.</strong> If you:
                        </p>
                        <ul style="color: #aaa; font-size: 16px; line-height: 2; margin: 0 0 20px 20px;">
                            <li>Already have a VA handling everything</li>
                            <li>Don't create content regularly</li>
                            <li>Prefer manual control over efficiency</li>
                        </ul>
                        <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                            Then our tools probably aren't right for you.
                        </p>
                        <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                            <strong style="color: ${CONFIG.brandColors.accent};">But if you:</strong>
                        </p>
                        <ul style="color: #aaa; font-size: 16px; line-height: 2; margin: 0 0 20px 20px;">
                            <li>Spend hours on repetitive tasks</li>
                            <li>Know content is important but can't keep up</li>
                            <li>Want to scale without hiring</li>
                        </ul>
                        <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                            Then automation could change your business.
                        </p>
                        <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                            Either way, I appreciate you reading these emails.
                        </p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${CONFIG.consultationUrl}" style="display: inline-block; background: ${CONFIG.brandColors.primary}; color: #fff; padding: 16px 40px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 18px;">
                                Book a Free Chat →
                            </a>
                        </div>
                        <p style="color: #888; font-size: 14px; line-height: 1.6; margin: 20px 0 0 0; text-align: center;">
                            No pitch. Just a conversation about what might work for your specific situation.
                        </p>
                        <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 30px 0 0 0;">
                            Thanks for reading,<br>
                            <strong>The AI Solutions Team</strong>
                        </p>
                    </td>
                </tr>
            ${getEmailFooter('{{unsubscribe_url}}')}`;
        }
    }
];

// ============================================================================
// CAMPAIGN 2: PRODUCT LAUNCH ANNOUNCEMENTS
// ============================================================================

function generateProductLaunchSequence(productKey) {
    const product = PRODUCTS[productKey];
    if (!product) {
        log(`Product not found: ${productKey}`, 'ERROR');
        return [];
    }

    return [
        {
            day: 0,
            delay: '0 hours',
            subject: `NEW: ${product.name} is Here - ${product.shortDesc}`,
            preheader: product.description,
            type: 'announcement',
            generateHtml: (subscriber) => {
                const featureList = product.features.map(f => `<li style="margin: 8px 0; color: #aaa;">${f}</li>`).join('');
                const benefitList = product.benefits.map(b => `<li style="margin: 8px 0; color: #ccc;">${b}</li>`).join('');

                return `${getEmailHeader()}
                    <tr>
                        <td style="padding: 50px 30px; text-align: center; background: linear-gradient(135deg, ${CONFIG.brandColors.dark} 0%, #1a1a1a 100%);">
                            <div style="font-size: 64px; margin-bottom: 20px;">${product.icon}</div>
                            <p style="color: ${CONFIG.brandColors.secondary}; margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Just Launched</p>
                            <h1 style="color: ${CONFIG.brandColors.primary}; margin: 0; font-size: 36px;">${product.name}</h1>
                            <p style="color: #ccc; margin: 15px 0 0 0; font-size: 18px;">${product.description}</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px; text-align: center;">
                            <p style="color: ${CONFIG.brandColors.secondary}; font-size: 48px; font-weight: bold; margin: 0;">
                                $${product.price}
                            </p>
                            <p style="color: #888; font-size: 16px; margin: 10px 0 30px 0;">one-time purchase | lifetime access | free updates</p>
                            <a href="${product.url}" style="display: inline-block; background: ${CONFIG.brandColors.primary}; color: #fff; padding: 18px 50px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 20px;">
                                Get ${product.name} Now →
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px;">
                            <h3 style="color: ${CONFIG.brandColors.primary}; margin: 0 0 20px 0; font-size: 22px;">What's Included:</h3>
                            <ul style="font-size: 16px; line-height: 1.8; margin: 0; padding-left: 20px;">
                                ${featureList}
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px; background: #1a1a1a;">
                            <h3 style="color: ${CONFIG.brandColors.accent}; margin: 0 0 20px 0; font-size: 22px;">Why It Matters:</h3>
                            <ul style="font-size: 16px; line-height: 1.8; margin: 0; padding-left: 20px;">
                                ${benefitList}
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px; text-align: center;">
                            <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                <strong>Production-ready. Right now.</strong><br>
                                No setup fees. No monthly subscriptions. No hidden costs.
                            </p>
                            <a href="${product.url}" style="display: inline-block; background: ${CONFIG.brandColors.secondary}; color: #fff; padding: 16px 40px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 18px;">
                                Start Using ${product.name} →
                            </a>
                        </td>
                    </tr>
                ${getEmailFooter('{{unsubscribe_url}}')}`;
            }
        },
        {
            day: 2,
            delay: '48 hours',
            subject: `See ${product.name} in Action (real results inside)`,
            preheader: 'Watch how it works step-by-step',
            type: 'demo',
            generateHtml: (subscriber) => {
                return `${getEmailHeader()}
                    <tr>
                        <td style="padding: 40px 30px; text-align: center; background: linear-gradient(135deg, ${CONFIG.brandColors.dark} 0%, #1a1a1a 100%);">
                            <div style="font-size: 48px; margin-bottom: 15px;">${product.icon}</div>
                            <h1 style="color: ${CONFIG.brandColors.primary}; margin: 0; font-size: 28px;">${product.name} in Action</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px;">
                            <p style="color: #ddd; font-size: 18px; line-height: 1.6; margin: 0 0 20px 0;">
                                Hey ${subscriber.name || 'there'},
                            </p>
                            <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                A few days ago, we launched <strong style="color: ${CONFIG.brandColors.primary};">${product.name}</strong>.
                            </p>
                            <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                Today, I want to show you exactly what happens when you set it up.
                            </p>
                            <table width="100%" cellpadding="0" cellspacing="0" style="background: #1a1a1a; border-radius: 8px; margin: 20px 0;">
                                <tr>
                                    <td style="padding: 25px;">
                                        <p style="color: ${CONFIG.brandColors.secondary}; font-weight: bold; margin: 0 0 15px 0; font-size: 18px;">Quick Setup Timeline:</p>
                                        <p style="color: #aaa; margin: 10px 0;"><strong style="color: ${CONFIG.brandColors.primary};">Hour 1:</strong> Download, configure, connect APIs</p>
                                        <p style="color: #aaa; margin: 10px 0;"><strong style="color: ${CONFIG.brandColors.primary};">Hour 2:</strong> First automated output running</p>
                                        <p style="color: #aaa; margin: 10px 0;"><strong style="color: ${CONFIG.brandColors.primary};">Hour 3:</strong> Customize for your brand/niche</p>
                                        <p style="color: #aaa; margin: 10px 0;"><strong style="color: ${CONFIG.brandColors.primary};">Day 2+:</strong> Running on autopilot</p>
                                    </td>
                                </tr>
                            </table>
                            <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                                <strong>No coding required.</strong> No complicated setup. Just follow the docs and you're live.
                            </p>
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="${product.url}" style="display: inline-block; background: ${CONFIG.brandColors.primary}; color: #fff; padding: 16px 40px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 18px;">
                                    Get Started Now →
                                </a>
                                <p style="color: #888; font-size: 14px; margin: 15px 0 0 0;">One-time $${product.price} | Lifetime updates</p>
                            </div>
                        </td>
                    </tr>
                ${getEmailFooter('{{unsubscribe_url}}')}`;
            }
        },
        {
            day: 5,
            delay: '5 days',
            subject: `Final reminder: ${product.name} is waiting for you`,
            preheader: 'Don\'t miss out on automation that works',
            type: 'reminder',
            generateHtml: (subscriber) => {
                return `${getEmailHeader()}
                    <tr>
                        <td style="padding: 40px 30px; text-align: center; background: linear-gradient(135deg, ${CONFIG.brandColors.dark} 0%, #1a1a1a 100%);">
                            <h1 style="color: ${CONFIG.brandColors.primary}; margin: 0; font-size: 28px;">Quick Reminder</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px;">
                            <p style="color: #ddd; font-size: 18px; line-height: 1.6; margin: 0 0 20px 0;">
                                Hey ${subscriber.name || 'there'},
                            </p>
                            <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                Just a quick note - <strong style="color: ${CONFIG.brandColors.primary};">${product.name}</strong> is ready when you are.
                            </p>
                            <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                While you're reading this, other users are already:
                            </p>
                            <ul style="color: #aaa; font-size: 16px; line-height: 2; margin: 0 0 20px 20px;">
                                ${product.benefits.map(b => `<li>${b}</li>`).join('')}
                            </ul>
                            <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                The sooner you start, the sooner it compounds.
                            </p>
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="${product.url}" style="display: inline-block; background: ${CONFIG.brandColors.primary}; color: #fff; padding: 16px 40px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 18px;">
                                    Get ${product.name} ($${product.price}) →
                                </a>
                            </div>
                            <p style="color: #888; font-size: 14px; line-height: 1.6; margin: 20px 0 0 0; text-align: center;">
                                Questions? Reply to this email or book a <a href="${CONFIG.consultationUrl}" style="color: ${CONFIG.brandColors.secondary};">free consultation</a>.
                            </p>
                        </td>
                    </tr>
                ${getEmailFooter('{{unsubscribe_url}}')}`;
            }
        }
    ];
}

// ============================================================================
// CAMPAIGN 3: ABANDONED CART RECOVERY
// ============================================================================

function generateAbandonedCartSequence(cartData) {
    const product = PRODUCTS[cartData.productKey] || PRODUCTS['claude-droid'];

    return [
        {
            day: 0,
            delay: '1 hour',
            subject: `You left something behind: ${product.name}`,
            preheader: 'Complete your purchase',
            type: 'reminder-1hr',
            generateHtml: (subscriber) => {
                return `${getEmailHeader()}
                    <tr>
                        <td style="padding: 40px 30px; text-align: center; background: linear-gradient(135deg, ${CONFIG.brandColors.dark} 0%, #1a1a1a 100%);">
                            <div style="font-size: 48px; margin-bottom: 15px;">${product.icon}</div>
                            <h1 style="color: ${CONFIG.brandColors.primary}; margin: 0; font-size: 28px;">Still Thinking It Over?</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px;">
                            <p style="color: #ddd; font-size: 18px; line-height: 1.6; margin: 0 0 20px 0;">
                                Hey ${subscriber.name || 'there'},
                            </p>
                            <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                I noticed you were checking out <strong style="color: ${CONFIG.brandColors.primary};">${product.name}</strong> but didn't complete your purchase.
                            </p>
                            <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                No pressure - I just wanted to make sure nothing went wrong on our end.
                            </p>
                            ${getProductCard(cartData.productKey)}
                            <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                                If you have any questions, just reply to this email. I'm here to help.
                            </p>
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="${product.url}" style="display: inline-block; background: ${CONFIG.brandColors.primary}; color: #fff; padding: 16px 40px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 18px;">
                                    Complete Your Purchase →
                                </a>
                            </div>
                        </td>
                    </tr>
                ${getEmailFooter('{{unsubscribe_url}}')}`;
            }
        },
        {
            day: 1,
            delay: '24 hours',
            subject: `${product.name} - Here's what you're missing`,
            preheader: 'See what other customers are saying',
            type: 'reminder-24hr',
            generateHtml: (subscriber) => {
                return `${getEmailHeader()}
                    <tr>
                        <td style="padding: 40px 30px; text-align: center; background: linear-gradient(135deg, ${CONFIG.brandColors.dark} 0%, #1a1a1a 100%);">
                            <h1 style="color: ${CONFIG.brandColors.primary}; margin: 0; font-size: 28px;">What You're Missing</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px;">
                            <p style="color: #ddd; font-size: 18px; line-height: 1.6; margin: 0 0 20px 0;">
                                Hey ${subscriber.name || 'there'},
                            </p>
                            <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                You were about to get <strong style="color: ${CONFIG.brandColors.primary};">${product.name}</strong> yesterday.
                            </p>
                            <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                Here's what customers who did complete their purchase are experiencing right now:
                            </p>
                            <table width="100%" cellpadding="0" cellspacing="0" style="background: #1a1a1a; border-radius: 8px; margin: 20px 0;">
                                <tr>
                                    <td style="padding: 25px;">
                                        <p style="color: ${CONFIG.brandColors.accent}; font-weight: bold; margin: 0 0 15px 0;">After 24 Hours:</p>
                                        <ul style="color: #aaa; font-size: 15px; line-height: 1.8; margin: 0; padding-left: 20px;">
                                            <li>System fully configured and running</li>
                                            <li>First automated outputs complete</li>
                                            <li>Time already being saved</li>
                                            <li>ROI clock started</li>
                                        </ul>
                                    </td>
                                </tr>
                            </table>
                            <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                                The sooner you start, the sooner it pays for itself.
                            </p>
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="${product.url}" style="display: inline-block; background: ${CONFIG.brandColors.primary}; color: #fff; padding: 16px 40px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 18px;">
                                    Get ${product.name} Now →
                                </a>
                            </div>
                        </td>
                    </tr>
                ${getEmailFooter('{{unsubscribe_url}}')}`;
            }
        },
        {
            day: 3,
            delay: '72 hours',
            subject: `Final notice: Your ${product.name} cart expires soon`,
            preheader: 'Last chance to complete your order',
            type: 'reminder-72hr',
            generateHtml: (subscriber) => {
                return `${getEmailHeader()}
                    <tr>
                        <td style="padding: 40px 30px; text-align: center; background: linear-gradient(135deg, #8B0000 0%, ${CONFIG.brandColors.dark} 100%);">
                            <h1 style="color: #fff; margin: 0; font-size: 28px;">Final Reminder</h1>
                            <p style="color: #ccc; margin: 10px 0 0 0; font-size: 16px;">Your cart will expire soon</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px;">
                            <p style="color: #ddd; font-size: 18px; line-height: 1.6; margin: 0 0 20px 0;">
                                Hey ${subscriber.name || 'there'},
                            </p>
                            <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                This is my last email about your abandoned cart.
                            </p>
                            <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                <strong style="color: ${CONFIG.brandColors.primary};">${product.name}</strong> at <strong>$${product.price}</strong> is still waiting for you.
                            </p>
                            <table width="100%" cellpadding="0" cellspacing="0" style="background: #1a1a1a; border-radius: 8px; margin: 20px 0;">
                                <tr>
                                    <td style="padding: 25px;">
                                        <p style="color: ${CONFIG.brandColors.primary}; font-weight: bold; margin: 0 0 15px 0;">Quick Recap:</p>
                                        <ul style="color: #aaa; font-size: 15px; line-height: 1.8; margin: 0; padding-left: 20px;">
                                            ${product.features.slice(0, 3).map(f => `<li>${f}</li>`).join('')}
                                        </ul>
                                        <p style="color: #888; margin: 15px 0 0 0; font-size: 14px;">One-time purchase. Lifetime updates. No subscriptions.</p>
                                    </td>
                                </tr>
                            </table>
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="${product.url}" style="display: inline-block; background: ${CONFIG.brandColors.primary}; color: #fff; padding: 18px 50px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 20px;">
                                    Complete Purchase Now →
                                </a>
                            </div>
                            <p style="color: #888; font-size: 14px; line-height: 1.6; margin: 20px 0 0 0; text-align: center;">
                                Questions? Just reply to this email.
                            </p>
                        </td>
                    </tr>
                ${getEmailFooter('{{unsubscribe_url}}')}`;
            }
        }
    ];
}

// ============================================================================
// CAMPAIGN 4: WEEKLY NEWSLETTER
// ============================================================================

const NEWSLETTER_TOPICS = [
    {
        week: 1,
        theme: 'AI Automation Trends',
        subject: 'This Week in AI Automation: What\'s Working Now',
        preheader: 'Latest trends, tips, and tools for AI-powered productivity',
        sections: [
            {
                title: 'Trend of the Week',
                content: 'Video content automation is exploding. Short-form video (60 seconds or less) is now the highest-engagement format across all platforms. Our Claude Droid users are seeing 40% higher engagement rates compared to traditional content.'
            },
            {
                title: 'Quick Tip',
                content: 'Start your automation with your highest-volume task first. If you post to social media 4x/day, automate that before tackling video production. Small wins build momentum.'
            },
            {
                title: 'Tool Spotlight',
                product: 'marketing-engine'
            }
        ]
    },
    {
        week: 2,
        theme: 'Content Scaling',
        subject: 'How to 10x Your Content Without 10x the Work',
        preheader: 'Scale content production without burning out',
        sections: [
            {
                title: 'The 10x Framework',
                content: 'Most creators try to do everything manually, then burn out. The secret: automate the 80% that\'s repetitive, and spend your time on the 20% that requires human creativity. Our most successful users automate distribution and scheduling, but still write their core ideas.'
            },
            {
                title: 'Case Study',
                content: 'One creator went from 4 YouTube videos/month to 120 using Income Droid. Total time increase: 2 hours/week for review. Revenue: Up 340% in 6 months.'
            },
            {
                title: 'Tool Spotlight',
                product: 'income-droid'
            }
        ]
    },
    {
        week: 3,
        theme: 'Passive Income',
        subject: 'Building Passive Income Streams with AI',
        preheader: 'Turn automation into recurring revenue',
        sections: [
            {
                title: 'The Passive Income Stack',
                content: 'Layer 1: Content (automated). Layer 2: Traffic (SEO + social). Layer 3: Monetization (ads, affiliates, products). Each layer can be largely automated. The goal: revenue that flows while you sleep.'
            },
            {
                title: 'Reality Check',
                content: '"Passive" doesn\'t mean "no work." It means front-loading the work. Expect 20-40 hours to set up a solid passive income stream. After that: 2-5 hours/week maintenance. That\'s the trade-off.'
            },
            {
                title: 'Tool Spotlight',
                product: 'claude-droid'
            }
        ]
    },
    {
        week: 4,
        theme: 'Business Systems',
        subject: 'From Chaos to Systems: Automating Your Entire Business',
        preheader: 'Build systems that scale without you',
        sections: [
            {
                title: 'The Systems Mindset',
                content: 'Every task you do more than once should have a system. Every system that runs more than once should be automated. The goal: become the architect of your business, not just the worker.'
            },
            {
                title: 'Where to Start',
                content: 'Audit your week. List every task. Mark which are repeatable. Those are your automation candidates. Start with the most time-consuming repeatable task and work down.'
            },
            {
                title: 'Tool Spotlight',
                product: 'jules-ai'
            }
        ]
    }
];

function generateNewsletterEmail(weekNumber) {
    const newsletter = NEWSLETTER_TOPICS.find(n => n.week === weekNumber) || NEWSLETTER_TOPICS[0];

    return {
        day: 0,
        delay: '0 hours',
        subject: newsletter.subject,
        preheader: newsletter.preheader,
        type: 'newsletter',
        generateHtml: (subscriber) => {
            let sectionsHtml = '';

            newsletter.sections.forEach((section, index) => {
                if (section.product) {
                    sectionsHtml += getProductCard(section.product);
                } else {
                    sectionsHtml += `
                        <tr>
                            <td style="padding: ${index === 0 ? '30px 30px 20px' : '20px 30px'};">
                                <h3 style="color: ${CONFIG.brandColors.primary}; margin: 0 0 15px 0; font-size: 20px;">${section.title}</h3>
                                <p style="color: #ccc; font-size: 16px; line-height: 1.7; margin: 0;">
                                    ${section.content}
                                </p>
                            </td>
                        </tr>
                    `;
                }
            });

            return `${getEmailHeader()}
                <tr>
                    <td style="padding: 40px 30px; text-align: center; background: linear-gradient(135deg, ${CONFIG.brandColors.dark} 0%, #1a1a1a 100%);">
                        <p style="color: ${CONFIG.brandColors.secondary}; margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Week ${newsletter.week} Newsletter</p>
                        <h1 style="color: ${CONFIG.brandColors.primary}; margin: 0; font-size: 28px;">${newsletter.theme}</h1>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 30px 30px 10px;">
                        <p style="color: #ddd; font-size: 16px; line-height: 1.6; margin: 0;">
                            Hey ${subscriber.name || 'there'},
                        </p>
                        <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 15px 0 0 0;">
                            Welcome to this week's AI automation insights. Let's dive in.
                        </p>
                    </td>
                </tr>
                ${sectionsHtml}
                <tr>
                    <td style="padding: 30px; text-align: center; border-top: 1px solid #333;">
                        <p style="color: #888; font-size: 14px; margin: 0 0 15px 0;">
                            Got a question? Reply to this email - I read every response.
                        </p>
                        <a href="${CONFIG.storeUrl}" style="display: inline-block; background: ${CONFIG.brandColors.primary}; color: #fff; padding: 14px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">
                            Browse All Products →
                        </a>
                    </td>
                </tr>
            ${getEmailFooter('{{unsubscribe_url}}')}`;
        }
    };
}

// ============================================================================
// SENDGRID INTEGRATION
// ============================================================================

async function sendEmail(toEmail, toName, subject, htmlContent) {
    return new Promise((resolve, reject) => {
        if (!CONFIG.sendgridApiKey) {
            log('SendGrid API key not configured. Set SENDGRID_API_KEY environment variable.', 'ERROR');
            reject(new Error('SendGrid API key not configured'));
            return;
        }

        const data = JSON.stringify({
            personalizations: [{
                to: [{ email: toEmail, name: toName || '' }],
                subject: subject
            }],
            from: {
                email: CONFIG.fromEmail,
                name: CONFIG.fromName
            },
            reply_to: {
                email: CONFIG.replyTo
            },
            content: [{
                type: 'text/html',
                value: htmlContent
            }],
            tracking_settings: {
                click_tracking: { enable: true },
                open_tracking: { enable: true }
            }
        });

        const options = {
            hostname: 'api.sendgrid.com',
            path: '/v3/mail/send',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${CONFIG.sendgridApiKey}`,
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data)
            }
        };

        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    log(`Email sent successfully to ${toEmail}: "${subject}"`, 'SUCCESS');
                    resolve({ success: true, statusCode: res.statusCode });
                } else {
                    log(`SendGrid error (${res.statusCode}): ${body}`, 'ERROR');
                    reject(new Error(`SendGrid error: ${res.statusCode} - ${body}`));
                }
            });
        });

        req.on('error', (err) => {
            log(`Network error sending email: ${err.message}`, 'ERROR');
            reject(err);
        });

        req.write(data);
        req.end();
    });
}

// ============================================================================
// FILE GENERATION (for preview/testing)
// ============================================================================

function saveEmailToFile(campaign, emailData, subscriber, filename) {
    const outputDir = path.join(CONFIG.outputDir, campaign);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const html = emailData.generateHtml(subscriber);
    const filepath = path.join(outputDir, `${filename}.html`);
    fs.writeFileSync(filepath, html);
    log(`Generated: ${filepath}`);

    // Also save metadata
    const metadata = {
        subject: emailData.subject,
        preheader: emailData.preheader,
        delay: emailData.delay,
        type: emailData.type,
        generatedAt: new Date().toISOString()
    };
    const metapath = path.join(outputDir, `${filename}.json`);
    fs.writeFileSync(metapath, JSON.stringify(metadata, null, 2));

    return filepath;
}

function generateAllCampaigns() {
    ensureDirectories();

    const testSubscriber = { name: 'Friend', email: 'test@example.com' };
    let filesGenerated = 0;

    // Welcome sequence
    log('Generating Welcome Sequence...', 'INFO');
    WELCOME_SEQUENCE.forEach((email, index) => {
        saveEmailToFile('welcome', email, testSubscriber, `day-${email.day}-${email.type}`);
        filesGenerated++;
    });

    // Product launch for each product
    Object.keys(PRODUCTS).forEach(productKey => {
        log(`Generating Product Launch Sequence: ${productKey}...`, 'INFO');
        const sequence = generateProductLaunchSequence(productKey);
        sequence.forEach((email, index) => {
            saveEmailToFile(`product-launch-${productKey}`, email, testSubscriber, `day-${email.day}-${email.type}`);
            filesGenerated++;
        });
    });

    // Abandoned cart for each product
    Object.keys(PRODUCTS).forEach(productKey => {
        log(`Generating Abandoned Cart Sequence: ${productKey}...`, 'INFO');
        const sequence = generateAbandonedCartSequence({ productKey });
        sequence.forEach((email, index) => {
            saveEmailToFile(`abandoned-cart-${productKey}`, email, testSubscriber, `${email.delay.replace(' ', '-')}-${email.type}`);
            filesGenerated++;
        });
    });

    // Newsletter for each week
    NEWSLETTER_TOPICS.forEach(topic => {
        log(`Generating Newsletter Week ${topic.week}...`, 'INFO');
        const email = generateNewsletterEmail(topic.week);
        saveEmailToFile('newsletter', email, testSubscriber, `week-${topic.week}`);
        filesGenerated++;
    });

    return filesGenerated;
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
EMAIL DRIP CAMPAIGN AUTOMATION SYSTEM
AI Solutions Store | FOR THE KIDS - Gospel V1.3
============================================================================

Usage:
  node email-drip-campaign.cjs [options]

Options:
  --help                    Show this help message
  --list-campaigns          List all available campaigns
  --list-products           List all products in the catalog
  --generate-all            Generate all email templates to files

  --campaign=TYPE           Run a specific campaign
      welcome               7-day new subscriber welcome series
      product-launch        3-email product launch sequence
      abandoned-cart        3-email cart recovery sequence
      newsletter            Weekly newsletter

  --product=KEY             Specify product for product-launch/abandoned-cart
      claude-droid, income-droid, marketing-engine,
      jules-ai, affiliate-system, dating-platform

  --week=NUMBER             Specify week for newsletter (1-4)
  --email=ADDRESS           Target email address for sending
  --name=NAME               Recipient name (optional)
  --test                    Preview mode (generate files, don't send)

Examples:
  node email-drip-campaign.cjs --generate-all
  node email-drip-campaign.cjs --campaign=welcome --test
  node email-drip-campaign.cjs --campaign=product-launch --product=claude-droid --email=user@example.com
  node email-drip-campaign.cjs --campaign=abandoned-cart --product=income-droid --test
  node email-drip-campaign.cjs --campaign=newsletter --week=2 --test

Output:
  Generated emails are saved to: ${CONFIG.outputDir}
  Logs are written to: ${CONFIG.logFile}

============================================================================
FOR THE KIDS. ALWAYS.
============================================================================
`);
}

function listCampaigns() {
    console.log(`
Available Campaigns:
====================

1. WELCOME SERIES (7 emails over 7 days)
   --campaign=welcome
   - Day 0: Welcome & introduction
   - Day 1: The 15-hour mistake
   - Day 2: Content automation recommendation
   - Day 3: Compounding effect / social proof
   - Day 5: ROI calculation
   - Day 7: Honest assessment & closing

2. PRODUCT LAUNCH (3 emails over 5 days)
   --campaign=product-launch --product=<product-key>
   - Day 0: Launch announcement
   - Day 2: Demo / how it works
   - Day 5: Final reminder

3. ABANDONED CART (3 emails over 3 days)
   --campaign=abandoned-cart --product=<product-key>
   - 1 hour: Gentle reminder
   - 24 hours: What you're missing
   - 72 hours: Final notice

4. NEWSLETTER (Weekly content)
   --campaign=newsletter --week=<1-4>
   - Week 1: AI Automation Trends
   - Week 2: Content Scaling
   - Week 3: Passive Income
   - Week 4: Business Systems
`);
}

function listProducts() {
    console.log(`
Available Products:
===================
`);
    Object.entries(PRODUCTS).forEach(([key, product]) => {
        console.log(`${product.icon} ${key}`);
        console.log(`   Name: ${product.name}`);
        console.log(`   Price: $${product.price}`);
        console.log(`   Description: ${product.description}`);
        console.log('');
    });
}

async function main() {
    const args = parseArgs();

    console.log('');
    console.log('============================================================================');
    console.log('EMAIL DRIP CAMPAIGN AUTOMATION SYSTEM');
    console.log('AI Solutions Store | FOR THE KIDS - Gospel V1.3 (60/30/10)');
    console.log('============================================================================');
    console.log('');

    if (args.help) {
        showHelp();
        return;
    }

    if (args['list-campaigns']) {
        listCampaigns();
        return;
    }

    if (args['list-products']) {
        listProducts();
        return;
    }

    if (args['generate-all']) {
        log('Generating all email campaign templates...', 'INFO');
        const count = generateAllCampaigns();
        log(`Generated ${count} email templates to ${CONFIG.outputDir}`, 'SUCCESS');
        return;
    }

    // Load SendGrid API key from .env if not in environment
    if (!CONFIG.sendgridApiKey) {
        try {
            const envPath = 'C:\\AiCollabForTheKids\\.env';
            if (fs.existsSync(envPath)) {
                const envContent = fs.readFileSync(envPath, 'utf8');
                const match = envContent.match(/SENDGRID_API_KEY=(.+)/);
                if (match) {
                    CONFIG.sendgridApiKey = match[1].trim();
                    log('Loaded SendGrid API key from .env', 'INFO');
                }
            }
        } catch (err) {
            log('Could not load .env file', 'WARN');
        }
    }

    const campaign = args.campaign;
    const isTest = args.test;

    if (!campaign) {
        log('No campaign specified. Use --help for usage.', 'WARN');
        showHelp();
        return;
    }

    ensureDirectories();

    const subscriber = {
        email: args.email || 'test@example.com',
        name: args.name || 'Friend'
    };

    let sequence = [];
    let campaignName = campaign;

    switch (campaign) {
        case 'welcome':
            sequence = WELCOME_SEQUENCE;
            break;

        case 'product-launch':
            const launchProduct = args.product || 'claude-droid';
            if (!PRODUCTS[launchProduct]) {
                log(`Product not found: ${launchProduct}. Use --list-products to see available.`, 'ERROR');
                return;
            }
            sequence = generateProductLaunchSequence(launchProduct);
            campaignName = `product-launch-${launchProduct}`;
            break;

        case 'abandoned-cart':
            const cartProduct = args.product || 'claude-droid';
            if (!PRODUCTS[cartProduct]) {
                log(`Product not found: ${cartProduct}. Use --list-products to see available.`, 'ERROR');
                return;
            }
            sequence = generateAbandonedCartSequence({ productKey: cartProduct });
            campaignName = `abandoned-cart-${cartProduct}`;
            break;

        case 'newsletter':
            const week = parseInt(args.week) || 1;
            if (week < 1 || week > NEWSLETTER_TOPICS.length) {
                log(`Invalid week number. Choose 1-${NEWSLETTER_TOPICS.length}.`, 'ERROR');
                return;
            }
            sequence = [generateNewsletterEmail(week)];
            campaignName = `newsletter-week-${week}`;
            break;

        default:
            log(`Unknown campaign: ${campaign}. Use --list-campaigns to see available.`, 'ERROR');
            return;
    }

    log(`Campaign: ${campaignName}`, 'INFO');
    log(`Emails in sequence: ${sequence.length}`, 'INFO');
    log(`Mode: ${isTest ? 'TEST (generate files only)' : 'SEND'}`, 'INFO');
    log(`Subscriber: ${subscriber.name} <${subscriber.email}>`, 'INFO');
    console.log('');

    for (let i = 0; i < sequence.length; i++) {
        const email = sequence[i];
        log(`Processing email ${i + 1}/${sequence.length}: "${email.subject}"`, 'INFO');

        if (isTest) {
            // Generate file for preview
            const filename = email.delay.replace(/ /g, '-');
            saveEmailToFile(campaignName, email, subscriber, filename);
        } else {
            // Actually send email
            try {
                const html = email.generateHtml(subscriber);
                await sendEmail(subscriber.email, subscriber.name, email.subject, html);
            } catch (err) {
                log(`Failed to send email: ${err.message}`, 'ERROR');
            }
        }
    }

    console.log('');
    log('============================================================================', 'INFO');
    log('CAMPAIGN COMPLETE', 'SUCCESS');
    log(`Output directory: ${CONFIG.outputDir}`, 'INFO');
    log('FOR THE KIDS. ALWAYS.', 'SUCCESS');
    log('============================================================================', 'INFO');
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
    WELCOME_SEQUENCE,
    NEWSLETTER_TOPICS,
    generateProductLaunchSequence,
    generateAbandonedCartSequence,
    generateNewsletterEmail,
    sendEmail,
    generateAllCampaigns
};
