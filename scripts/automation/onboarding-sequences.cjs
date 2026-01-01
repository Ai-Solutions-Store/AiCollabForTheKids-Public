/**
 * ============================================================================
 * CUSTOMER ONBOARDING EMAIL SEQUENCES
 * AI Solutions Store - Product-Specific Welcome & Success Journeys
 * ============================================================================
 *
 * FOR THE KIDS - Gospel V1.3 (60/30/10)
 *
 * Generates comprehensive onboarding email sequences for each product:
 * 1. Welcome Email (Day 0) - Immediate post-purchase
 * 2. Getting Started Guide (Day 1) - Setup instructions
 * 3. Day 3 Tips - Power user tips and tricks
 * 4. Day 7 Check-In - Progress check and support offer
 * 5. Day 14 Advanced Features - Unlock full potential
 * 6. Day 30 Success Story Request - Testimonial collection
 *
 * Usage:
 *   node onboarding-sequences.cjs --generate-all
 *   node onboarding-sequences.cjs --product=claude-droid
 *   node onboarding-sequences.cjs --product=income-droid --day=3
 *   node onboarding-sequences.cjs --list-products
 *   node onboarding-sequences.cjs --send --product=claude-droid --email=user@example.com --day=0
 *
 * Created by Claude (Opus 4.5) - December 28, 2025
 * ============================================================================
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
    // SendGrid API
    sendgridApiKey: process.env.SENDGRID_API_KEY || '',
    fromEmail: process.env.SENDGRID_FROM_EMAIL || 'noreply@aidoesitall.website',
    fromName: 'AI Solutions Store',
    replyTo: process.env.EMAIL_SUPPORT || 'support@youandinotai.com',

    // Store URLs
    storeUrl: 'https://ai-solutions.store',
    websiteUrl: 'https://aidoesitall.website',
    consultationUrl: 'https://ai-solutions.store/consultation',
    supportUrl: 'https://ai-solutions.store/support',
    docsUrl: 'https://docs.aidoesitall.website',
    communityUrl: 'https://community.aidoesitall.website',

    // Logging
    logsDir: 'C:\\AiCollabForTheKids\\logs',
    outputDir: 'C:\\AiCollabForTheKids\\logs\\onboarding-sequences',
    logFile: 'C:\\AiCollabForTheKids\\logs\\onboarding-sequences.log',

    // Branding
    brandColors: {
        primary: '#CC785C',     // Copper/rust
        secondary: '#078EFA',   // Blue
        accent: '#20808D',      // Teal
        dark: '#141413',        // Near black
        light: '#f9f9f9',       // Off white
        success: '#10b981',     // Green
        warning: '#f59e0b'      // Amber
    },

    // Gospel V1.3 compliance
    gospel: {
        charity: 60,
        infrastructure: 30,
        founder: 10,
        version: '1.3'
    }
};

// ============================================================================
// PRODUCT CATALOG
// ============================================================================

const PRODUCTS = {
    'claude-droid': {
        name: 'Claude Droid',
        price: 299,
        description: 'Transform news into engaging YouTube Shorts automatically',
        shortDesc: 'YouTube Shorts Automation',
        icon: '🎬',
        url: 'https://ai-solutions.store/products/claude-droid',
        docsUrl: 'https://docs.aidoesitall.website/claude-droid',
        supportEmail: 'claude-droid-support@youandinotai.com',
        features: [
            'Automated news scraping from 10+ sources',
            'AI-powered video generation with Claude Opus 4.5',
            'TTS narration with ElevenLabs',
            'Auto-upload to YouTube',
            '60-second Shorts optimized for engagement'
        ],
        quickStart: [
            'Set up API keys (YouTube, ElevenLabs, Claude)',
            'Configure news sources in config.json',
            'Run the first video generation test',
            'Enable scheduled automation'
        ],
        advancedFeatures: [
            'Custom voice cloning for unique brand voice',
            'A/B testing different video styles',
            'Analytics integration for performance tracking',
            'Multi-channel publishing',
            'Thumbnail customization with AI'
        ],
        tips: [
            'Schedule videos to post during peak hours (2-5 PM local time)',
            'Use trending topics from Google Trends for viral potential',
            'Keep titles under 50 characters for mobile visibility',
            'Add hashtags strategically - 3-5 relevant tags work best'
        ],
        successMetrics: [
            'Videos per day',
            'Average view count',
            'Subscriber growth rate',
            'Watch time percentage'
        ]
    },
    'income-droid': {
        name: 'Income Droid',
        price: 499,
        description: 'Generate 4 revenue-optimized videos daily on autopilot',
        shortDesc: 'Multi-Platform Revenue Engine',
        icon: '💰',
        url: 'https://ai-solutions.store/products/income-droid',
        docsUrl: 'https://docs.aidoesitall.website/income-droid',
        supportEmail: 'income-droid-support@youandinotai.com',
        features: [
            '4 videos per day, every day',
            'Niche-specific content generation',
            'Affiliate link integration',
            'Monetization tracking dashboard',
            'Hands-free passive income'
        ],
        quickStart: [
            'Choose your profitable niche',
            'Set up affiliate partnerships',
            'Configure monetization settings',
            'Launch your first 4-video day'
        ],
        advancedFeatures: [
            'Revenue optimization algorithms',
            'Multi-niche diversification',
            'Automatic affiliate link rotation',
            'CPM optimization by time zone',
            'Competitor analysis integration'
        ],
        tips: [
            'Diversify across 3+ niches to reduce risk',
            'Track which affiliate products convert best',
            'Use revenue data to double down on winners',
            'Reinvest 20% into paid promotion initially'
        ],
        successMetrics: [
            'Daily revenue',
            'Conversion rate',
            'Cost per acquisition',
            'Monthly recurring revenue'
        ]
    },
    'marketing-engine': {
        name: 'Marketing Engine',
        price: 199,
        description: '24/7 social media automation for maximum reach',
        shortDesc: '23-Platform Social Automation',
        icon: '📢',
        url: 'https://ai-solutions.store/products/marketing-engine',
        docsUrl: 'https://docs.aidoesitall.website/marketing-engine',
        supportEmail: 'marketing-engine-support@youandinotai.com',
        features: [
            'Auto-post to 23+ platforms',
            '4x daily content generation',
            'Engagement tracking',
            'Brand-safe AI content',
            'Scheduled posting calendar'
        ],
        quickStart: [
            'Connect your social media accounts',
            'Set up brand voice and guidelines',
            'Create your first content calendar',
            'Enable automated posting'
        ],
        advancedFeatures: [
            'Sentiment analysis for engagement prediction',
            'Hashtag optimization per platform',
            'Cross-platform content adaptation',
            'Influencer collaboration scheduler',
            'Crisis management protocols'
        ],
        tips: [
            'Post during platform-specific peak hours',
            'Customize content for each platform - not one-size-fits-all',
            'Engage with comments within the first hour',
            'Use analytics to identify your best-performing content types'
        ],
        successMetrics: [
            'Follower growth across platforms',
            'Engagement rate',
            'Content reach',
            'Click-through rate'
        ]
    },
    'jules-ai': {
        name: 'Jules AI',
        price: 399,
        description: 'Your AI business director and command center',
        shortDesc: 'AI Business Dashboard',
        icon: '🤖',
        url: 'https://ai-solutions.store/products/jules-ai',
        docsUrl: 'https://docs.aidoesitall.website/jules-ai',
        supportEmail: 'jules-ai-support@youandinotai.com',
        features: [
            'Centralized business management',
            'Fleet orchestration for all droids',
            'Real-time analytics',
            'Gospel-compliant revenue tracking',
            'Web-based control panel'
        ],
        quickStart: [
            'Set up your business profile',
            'Connect your existing droids',
            'Configure dashboard widgets',
            'Enable real-time notifications'
        ],
        advancedFeatures: [
            'AI-powered business recommendations',
            'Predictive analytics for growth',
            'Automated report generation',
            'Team collaboration tools',
            'API integrations with 50+ services'
        ],
        tips: [
            'Check the dashboard daily for 5 minutes - consistency matters',
            'Set up alerts for key metrics to catch issues early',
            'Use the AI recommendations to optimize workflows',
            'Export reports weekly for trend analysis'
        ],
        successMetrics: [
            'Overall system uptime',
            'Tasks automated',
            'Time saved per week',
            'Business decisions informed by data'
        ]
    },
    'affiliate-system': {
        name: 'Affiliate System',
        price: 599,
        description: 'Complete white-label affiliate platform',
        shortDesc: 'Affiliate Marketing Platform',
        icon: '🔗',
        url: 'https://ai-solutions.store/products/affiliate-system',
        docsUrl: 'https://docs.aidoesitall.website/affiliate-system',
        supportEmail: 'affiliate-system-support@youandinotai.com',
        features: [
            'Multi-tier commission structure',
            'Automated payouts',
            'Custom branding',
            'Analytics dashboard',
            'Built-in fraud protection'
        ],
        quickStart: [
            'Configure your commission tiers',
            'Set up payment processing',
            'Customize your affiliate portal',
            'Create recruitment materials'
        ],
        advancedFeatures: [
            'Multi-level marketing structures',
            'Performance-based tier upgrades',
            'Geo-targeting for affiliates',
            'Custom landing page builder',
            'Affiliate communication automation'
        ],
        tips: [
            'Start with competitive commissions (20%+) to attract top affiliates',
            'Create ready-made marketing materials for your affiliates',
            'Communicate promotions 1 week before launch',
            'Reward top performers with bonus commissions'
        ],
        successMetrics: [
            'Active affiliates',
            'Affiliate-driven revenue',
            'Average commission per affiliate',
            'Affiliate retention rate'
        ]
    },
    'dating-platform': {
        name: 'Dating Platform',
        price: 2499,
        description: 'Full anti-AI dating app source code',
        shortDesc: 'Dating App Source Code',
        icon: '💕',
        url: 'https://ai-solutions.store/products/dating-platform',
        docsUrl: 'https://docs.aidoesitall.website/dating-platform',
        supportEmail: 'dating-platform-support@youandinotai.com',
        features: [
            'Complete React + Node.js codebase',
            'Square payment integration',
            'FOSTA/SESTA compliant',
            'Age verification built-in',
            'Mobile-responsive design'
        ],
        quickStart: [
            'Set up your development environment',
            'Configure database and hosting',
            'Customize branding and theme',
            'Set up payment processing'
        ],
        advancedFeatures: [
            'AI-free matching algorithms',
            'Video chat integration',
            'Event planning features',
            'Premium subscription tiers',
            'Admin moderation tools'
        ],
        tips: [
            'Focus on a specific niche for faster market penetration',
            'Invest in quality moderation from day one',
            'Create events to drive engagement',
            'Use referral programs to grow organically'
        ],
        successMetrics: [
            'Daily active users',
            'Match rate',
            'Subscription conversion rate',
            'User retention (30-day)'
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

function getEmailHeader(product) {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${product.name} - AI Solutions Store</title>
</head>
<body style="margin: 0; padding: 0; background-color: ${CONFIG.brandColors.dark}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #0a0a0a;">
`;
}

function getEmailFooter(product) {
    return `
        <tr>
            <td style="padding: 30px; background: #1a1a1a;">
                <h3 style="color: ${CONFIG.brandColors.primary}; margin: 0 0 15px 0; font-size: 18px; text-align: center;">FOR THE KIDS</h3>
                <p style="color: #999; font-size: 14px; line-height: 1.6; margin: 0; text-align: center;">
                    60% of every sale goes to Verified Pediatric Charities.<br>
                    30% to infrastructure. 10% to the founder.<br>
                    Thank you for making a difference. - Gospel V${CONFIG.gospel.version}
                </p>
            </td>
        </tr>
        <tr>
            <td style="padding: 30px; text-align: center; border-top: 1px solid #333;">
                <p style="color: #666; font-size: 12px; margin: 0 0 10px 0;">
                    AI Solutions Store | ${product.name} Support
                </p>
                <p style="color: #555; font-size: 11px; margin: 0;">
                    <a href="${product.docsUrl}" style="color: ${CONFIG.brandColors.secondary}; text-decoration: none;">Documentation</a> |
                    <a href="${CONFIG.supportUrl}" style="color: ${CONFIG.brandColors.secondary}; text-decoration: none;">Support</a> |
                    <a href="mailto:${product.supportEmail}" style="color: ${CONFIG.brandColors.secondary}; text-decoration: none;">Email Us</a> |
                    <a href="{{unsubscribe_url}}" style="color: #666; text-decoration: none;">Unsubscribe</a>
                </p>
            </td>
        </tr>
    </table>
</body>
</html>
`;
}

function getFeatureList(items, color = '#aaa') {
    return items.map(item => `<li style="margin: 8px 0; color: ${color};">${item}</li>`).join('');
}

function getNumberedList(items, color = '#ccc') {
    return items.map((item, i) => `
        <div style="display: flex; margin: 15px 0;">
            <div style="background: ${CONFIG.brandColors.primary}; color: #fff; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">${i + 1}</div>
            <div style="margin-left: 15px; color: ${color}; font-size: 15px; line-height: 1.6;">${item}</div>
        </div>
    `).join('');
}

function getCtaButton(text, url, primary = true) {
    const bgColor = primary ? CONFIG.brandColors.primary : CONFIG.brandColors.secondary;
    return `
        <div style="text-align: center; margin: 30px 0;">
            <a href="${url}" style="display: inline-block; background: ${bgColor}; color: #fff; padding: 16px 40px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 18px;">
                ${text}
            </a>
        </div>
    `;
}

// ============================================================================
// ONBOARDING EMAIL SEQUENCES BY PRODUCT
// ============================================================================

function generateOnboardingSequence(productKey) {
    const product = PRODUCTS[productKey];
    if (!product) {
        log(`Product not found: ${productKey}`, 'ERROR');
        return [];
    }

    return [
        // ========== DAY 0: WELCOME EMAIL ==========
        {
            day: 0,
            delay: '0 hours',
            subject: `Welcome to ${product.name}! ${product.icon} Your journey begins now`,
            preheader: `Thank you for your purchase. Let's get you started.`,
            type: 'welcome',
            generateHtml: (customer) => {
                return `${getEmailHeader(product)}
                    <tr>
                        <td style="padding: 50px 30px; text-align: center; background: linear-gradient(135deg, ${CONFIG.brandColors.dark} 0%, #1a1a1a 100%);">
                            <div style="font-size: 72px; margin-bottom: 20px;">${product.icon}</div>
                            <h1 style="color: ${CONFIG.brandColors.primary}; margin: 0; font-size: 32px;">Welcome to ${product.name}!</h1>
                            <p style="color: ${CONFIG.brandColors.secondary}; margin: 15px 0 0 0; font-size: 18px;">Your purchase is complete. Let's automate your success.</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px;">
                            <p style="color: #ddd; font-size: 18px; line-height: 1.6; margin: 0 0 20px 0;">
                                Hey ${customer.name || 'there'},
                            </p>
                            <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                <strong style="color: ${CONFIG.brandColors.success};">Congratulations!</strong> You've just made one of the smartest investments in your business.
                            </p>
                            <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                ${product.name} is now yours - and over the next 30 days, I'm going to help you get the absolute most out of it.
                            </p>

                            <table width="100%" cellpadding="0" cellspacing="0" style="background: #1a1a1a; border-radius: 8px; margin: 25px 0;">
                                <tr>
                                    <td style="padding: 25px;">
                                        <h3 style="color: ${CONFIG.brandColors.primary}; margin: 0 0 15px 0;">What You Got:</h3>
                                        <ul style="list-style: none; padding: 0; margin: 0;">
                                            ${product.features.map(f => `
                                                <li style="padding: 10px 0; border-bottom: 1px solid #333; color: #ccc;">
                                                    <span style="color: ${CONFIG.brandColors.success}; margin-right: 10px;">✓</span>${f}
                                                </li>
                                            `).join('')}
                                        </ul>
                                    </td>
                                </tr>
                            </table>

                            <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, ${CONFIG.brandColors.secondary}22 0%, ${CONFIG.brandColors.accent}22 100%); border-radius: 8px; border: 1px solid ${CONFIG.brandColors.secondary}44; margin: 25px 0;">
                                <tr>
                                    <td style="padding: 25px;">
                                        <h3 style="color: ${CONFIG.brandColors.secondary}; margin: 0 0 15px 0;">Your Next Step:</h3>
                                        <p style="color: #ccc; margin: 0 0 20px 0; line-height: 1.6;">
                                            Access your product and documentation now. Tomorrow, I'll send you a detailed getting started guide.
                                        </p>
                                        <a href="${product.docsUrl}" style="display: inline-block; background: ${CONFIG.brandColors.secondary}; color: #fff; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: bold;">
                                            Access Documentation →
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="color: #888; font-size: 14px; line-height: 1.6; margin: 25px 0 0 0;">
                                <strong>Need help?</strong> Reply to this email or reach out to <a href="mailto:${product.supportEmail}" style="color: ${CONFIG.brandColors.secondary};">${product.supportEmail}</a>. We're here for you.
                            </p>

                            <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 25px 0 0 0;">
                                Excited to have you on board,<br>
                                <strong style="color: ${CONFIG.brandColors.primary};">The AI Solutions Team</strong>
                            </p>
                        </td>
                    </tr>
                ${getEmailFooter(product)}`;
            }
        },

        // ========== DAY 1: GETTING STARTED GUIDE ==========
        {
            day: 1,
            delay: '24 hours',
            subject: `${product.icon} Getting Started with ${product.name} - Step by Step`,
            preheader: `Your complete setup guide is here. Let's get you running!`,
            type: 'getting-started',
            generateHtml: (customer) => {
                return `${getEmailHeader(product)}
                    <tr>
                        <td style="padding: 40px 30px; text-align: center; background: linear-gradient(135deg, ${CONFIG.brandColors.dark} 0%, #1a1a1a 100%);">
                            <p style="color: ${CONFIG.brandColors.secondary}; margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Day 1 of Your Journey</p>
                            <h1 style="color: ${CONFIG.brandColors.primary}; margin: 0; font-size: 28px;">Let's Get You Set Up</h1>
                            <p style="color: #999; margin: 10px 0 0 0; font-size: 16px;">${product.name} Quick Start Guide</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px;">
                            <p style="color: #ddd; font-size: 18px; line-height: 1.6; margin: 0 0 20px 0;">
                                Hey ${customer.name || 'there'},
                            </p>
                            <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                Ready to get ${product.name} running? Here's your step-by-step setup guide.
                            </p>
                            <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
                                <strong style="color: ${CONFIG.brandColors.accent};">Most users complete setup in under 2 hours.</strong> Let's get you there.
                            </p>

                            <table width="100%" cellpadding="0" cellspacing="0" style="background: #1a1a1a; border-radius: 8px; margin: 20px 0;">
                                <tr>
                                    <td style="padding: 25px;">
                                        <h3 style="color: ${CONFIG.brandColors.primary}; margin: 0 0 20px 0; font-size: 20px;">Quick Start Checklist:</h3>
                                        ${getNumberedList(product.quickStart)}
                                    </td>
                                </tr>
                            </table>

                            <table width="100%" cellpadding="0" cellspacing="0" style="background: ${CONFIG.brandColors.warning}22; border-radius: 8px; border-left: 4px solid ${CONFIG.brandColors.warning}; margin: 25px 0;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <h4 style="color: ${CONFIG.brandColors.warning}; margin: 0 0 10px 0;">Pro Tip:</h4>
                                        <p style="color: #ccc; margin: 0; line-height: 1.6;">
                                            Before diving in, <strong>bookmark the documentation</strong> at <a href="${product.docsUrl}" style="color: ${CONFIG.brandColors.secondary};">${product.docsUrl}</a>. It's your best friend during setup.
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 25px 0;">
                                <tr>
                                    <td style="background: #1a1a1a; padding: 20px; border-radius: 8px 8px 0 0; border-bottom: 1px solid #333;">
                                        <h4 style="color: ${CONFIG.brandColors.secondary}; margin: 0;">Common Setup Questions:</h4>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="background: #1a1a1a; padding: 20px; border-radius: 0 0 8px 8px;">
                                        <p style="color: #aaa; margin: 0 0 15px 0;"><strong style="color: #ccc;">Q: How long does setup take?</strong><br>A: Most users are up and running in 1-2 hours.</p>
                                        <p style="color: #aaa; margin: 0 0 15px 0;"><strong style="color: #ccc;">Q: What if I get stuck?</strong><br>A: Reply to this email or check our <a href="${CONFIG.communityUrl}" style="color: ${CONFIG.brandColors.secondary};">community forum</a>.</p>
                                        <p style="color: #aaa; margin: 0;"><strong style="color: #ccc;">Q: Do I need technical skills?</strong><br>A: Basic computer skills are enough. Our docs walk you through everything.</p>
                                    </td>
                                </tr>
                            </table>

                            ${getCtaButton('Start Setup Now →', product.docsUrl)}

                            <p style="color: #888; font-size: 14px; line-height: 1.6; margin: 25px 0 0 0; text-align: center;">
                                In 2 days, I'll send you power user tips to 10x your results.
                            </p>
                        </td>
                    </tr>
                ${getEmailFooter(product)}`;
            }
        },

        // ========== DAY 3: TIPS & TRICKS ==========
        {
            day: 3,
            delay: '72 hours',
            subject: `${product.icon} Day 3: Power User Tips for ${product.name}`,
            preheader: `The tricks that separate beginners from pros. Inside...`,
            type: 'day3-tips',
            generateHtml: (customer) => {
                return `${getEmailHeader(product)}
                    <tr>
                        <td style="padding: 40px 30px; text-align: center; background: linear-gradient(135deg, ${CONFIG.brandColors.dark} 0%, #1a1a1a 100%);">
                            <p style="color: ${CONFIG.brandColors.secondary}; margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Day 3 of Your Journey</p>
                            <h1 style="color: ${CONFIG.brandColors.primary}; margin: 0; font-size: 28px;">Power User Tips</h1>
                            <p style="color: #999; margin: 10px 0 0 0; font-size: 16px;">The secrets that make the difference</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px;">
                            <p style="color: #ddd; font-size: 18px; line-height: 1.6; margin: 0 0 20px 0;">
                                Hey ${customer.name || 'there'},
                            </p>
                            <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                You've had ${product.name} for 3 days now. How's it going?
                            </p>
                            <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
                                Whether you're already seeing results or still getting set up, here are the <strong style="color: ${CONFIG.brandColors.accent};">tips that separate beginners from power users</strong>:
                            </p>

                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
                                ${product.tips.map((tip, i) => `
                                    <tr>
                                        <td style="padding: 0 0 15px 0;">
                                            <table width="100%" cellpadding="0" cellspacing="0" style="background: #1a1a1a; border-radius: 8px;">
                                                <tr>
                                                    <td style="padding: 20px;">
                                                        <div style="display: flex; align-items: flex-start;">
                                                            <div style="background: ${CONFIG.brandColors.primary}; color: #fff; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0; font-size: 14px;">💡</div>
                                                            <div style="margin-left: 15px;">
                                                                <p style="color: #ccc; margin: 0; font-size: 15px; line-height: 1.6;">${tip}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                `).join('')}
                            </table>

                            <table width="100%" cellpadding="0" cellspacing="0" style="background: ${CONFIG.brandColors.success}22; border-radius: 8px; border-left: 4px solid ${CONFIG.brandColors.success}; margin: 25px 0;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <h4 style="color: ${CONFIG.brandColors.success}; margin: 0 0 10px 0;">Quick Win Challenge:</h4>
                                        <p style="color: #ccc; margin: 0; line-height: 1.6;">
                                            Pick <strong>one tip</strong> from above and implement it today. Just one. You'll see the difference immediately.
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <table width="100%" cellpadding="0" cellspacing="0" style="background: #1a1a1a; border-radius: 8px; margin: 25px 0;">
                                <tr>
                                    <td style="padding: 25px;">
                                        <h4 style="color: ${CONFIG.brandColors.secondary}; margin: 0 0 15px 0;">Track Your Progress:</h4>
                                        <p style="color: #aaa; margin: 0 0 15px 0;">The metrics that matter for ${product.name}:</p>
                                        <ul style="padding-left: 20px; margin: 0;">
                                            ${getFeatureList(product.successMetrics)}
                                        </ul>
                                    </td>
                                </tr>
                            </table>

                            ${getCtaButton('Get More Tips in Docs →', product.docsUrl)}

                            <p style="color: #888; font-size: 14px; line-height: 1.6; margin: 25px 0 0 0; text-align: center;">
                                Day 7 check-in coming up. I'll make sure you're on track.
                            </p>
                        </td>
                    </tr>
                ${getEmailFooter(product)}`;
            }
        },

        // ========== DAY 7: CHECK-IN ==========
        {
            day: 7,
            delay: '7 days',
            subject: `${product.icon} Week 1 with ${product.name} - How's it going?`,
            preheader: `Your first week check-in. Let's make sure you're on track.`,
            type: 'day7-checkin',
            generateHtml: (customer) => {
                return `${getEmailHeader(product)}
                    <tr>
                        <td style="padding: 40px 30px; text-align: center; background: linear-gradient(135deg, ${CONFIG.brandColors.dark} 0%, #1a1a1a 100%);">
                            <p style="color: ${CONFIG.brandColors.secondary}; margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Day 7 Check-In</p>
                            <h1 style="color: ${CONFIG.brandColors.primary}; margin: 0; font-size: 28px;">How's Your First Week?</h1>
                            <p style="color: #999; margin: 10px 0 0 0; font-size: 16px;">Let's make sure you're getting results</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px;">
                            <p style="color: #ddd; font-size: 18px; line-height: 1.6; margin: 0 0 20px 0;">
                                Hey ${customer.name || 'there'},
                            </p>
                            <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                It's been one week since you got ${product.name}. Quick check-in time.
                            </p>

                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 25px 0;">
                                <tr>
                                    <td width="50%" style="padding-right: 10px;">
                                        <table width="100%" cellpadding="0" cellspacing="0" style="background: ${CONFIG.brandColors.success}22; border-radius: 8px; height: 100%;">
                                            <tr>
                                                <td style="padding: 20px;">
                                                    <h4 style="color: ${CONFIG.brandColors.success}; margin: 0 0 10px 0;">Everything Working?</h4>
                                                    <p style="color: #ccc; margin: 0; font-size: 14px; line-height: 1.6;">
                                                        That's great! Keep pushing. Next week I'll show you advanced features.
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width="50%" style="padding-left: 10px;">
                                        <table width="100%" cellpadding="0" cellspacing="0" style="background: ${CONFIG.brandColors.warning}22; border-radius: 8px; height: 100%;">
                                            <tr>
                                                <td style="padding: 20px;">
                                                    <h4 style="color: ${CONFIG.brandColors.warning}; margin: 0 0 10px 0;">Hitting Roadblocks?</h4>
                                                    <p style="color: #ccc; margin: 0; font-size: 14px; line-height: 1.6;">
                                                        Reply to this email. I'll personally help you get unstuck.
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <table width="100%" cellpadding="0" cellspacing="0" style="background: #1a1a1a; border-radius: 8px; margin: 25px 0;">
                                <tr>
                                    <td style="padding: 25px;">
                                        <h3 style="color: ${CONFIG.brandColors.primary}; margin: 0 0 15px 0;">Week 1 Checklist:</h3>
                                        <p style="color: #aaa; margin: 0 0 15px 0;">Where are you on this list?</p>
                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="padding: 8px 0; color: #ccc; border-bottom: 1px solid #333;">
                                                    <span style="color: ${CONFIG.brandColors.success}; margin-right: 10px;">☐</span> Product installed and configured
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #ccc; border-bottom: 1px solid #333;">
                                                    <span style="color: ${CONFIG.brandColors.success}; margin-right: 10px;">☐</span> First successful run completed
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #ccc; border-bottom: 1px solid #333;">
                                                    <span style="color: ${CONFIG.brandColors.success}; margin-right: 10px;">☐</span> Automation running on schedule
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #ccc;">
                                                    <span style="color: ${CONFIG.brandColors.success}; margin-right: 10px;">☐</span> Seeing first results
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <table width="100%" cellpadding="0" cellspacing="0" style="background: ${CONFIG.brandColors.secondary}22; border-radius: 8px; border: 1px solid ${CONFIG.brandColors.secondary}44; margin: 25px 0;">
                                <tr>
                                    <td style="padding: 25px; text-align: center;">
                                        <h4 style="color: ${CONFIG.brandColors.secondary}; margin: 0 0 15px 0;">Need 1-on-1 Help?</h4>
                                        <p style="color: #ccc; margin: 0 0 20px 0; line-height: 1.6;">
                                            Book a free 15-minute call. We'll get you sorted.
                                        </p>
                                        <a href="${CONFIG.consultationUrl}" style="display: inline-block; background: ${CONFIG.brandColors.secondary}; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold;">
                                            Book Free Call →
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="color: #888; font-size: 14px; line-height: 1.6; margin: 25px 0 0 0; text-align: center;">
                                Next week: Advanced features that unlock the full potential of ${product.name}.
                            </p>
                        </td>
                    </tr>
                ${getEmailFooter(product)}`;
            }
        },

        // ========== DAY 14: ADVANCED FEATURES ==========
        {
            day: 14,
            delay: '14 days',
            subject: `${product.icon} Advanced ${product.name} Features - Level Up Time`,
            preheader: `You've mastered the basics. Now unlock the full potential.`,
            type: 'day14-advanced',
            generateHtml: (customer) => {
                return `${getEmailHeader(product)}
                    <tr>
                        <td style="padding: 40px 30px; text-align: center; background: linear-gradient(135deg, ${CONFIG.brandColors.dark} 0%, #1a1a1a 100%);">
                            <p style="color: ${CONFIG.brandColors.secondary}; margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Day 14 - Level Up</p>
                            <h1 style="color: ${CONFIG.brandColors.primary}; margin: 0; font-size: 28px;">Unlock Advanced Features</h1>
                            <p style="color: #999; margin: 10px 0 0 0; font-size: 16px;">The pro-level capabilities waiting for you</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px;">
                            <p style="color: #ddd; font-size: 18px; line-height: 1.6; margin: 0 0 20px 0;">
                                Hey ${customer.name || 'there'},
                            </p>
                            <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                Two weeks in. You've got the basics down. Now it's time to <strong style="color: ${CONFIG.brandColors.accent};">unlock the advanced features</strong> that take ${product.name} to the next level.
                            </p>

                            <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #1a1a1a 0%, #222 100%); border-radius: 8px; margin: 25px 0; border: 1px solid ${CONFIG.brandColors.primary}44;">
                                <tr>
                                    <td style="padding: 30px;">
                                        <h3 style="color: ${CONFIG.brandColors.primary}; margin: 0 0 20px 0; font-size: 22px;">🚀 Advanced Features:</h3>
                                        <ul style="list-style: none; padding: 0; margin: 0;">
                                            ${product.advancedFeatures.map(f => `
                                                <li style="padding: 15px 0; border-bottom: 1px solid #333; color: #ccc; display: flex; align-items: flex-start;">
                                                    <span style="color: ${CONFIG.brandColors.accent}; margin-right: 15px; font-size: 20px;">⚡</span>
                                                    <span style="line-height: 1.5;">${f}</span>
                                                </li>
                                            `).join('')}
                                        </ul>
                                    </td>
                                </tr>
                            </table>

                            <table width="100%" cellpadding="0" cellspacing="0" style="background: #1a1a1a; border-radius: 8px; margin: 25px 0;">
                                <tr>
                                    <td style="padding: 25px;">
                                        <h4 style="color: ${CONFIG.brandColors.secondary}; margin: 0 0 15px 0;">Why Use Advanced Features?</h4>
                                        <p style="color: #aaa; margin: 0 0 15px 0; line-height: 1.6;">
                                            Users who leverage advanced features typically see:
                                        </p>
                                        <ul style="padding-left: 20px; margin: 0;">
                                            <li style="color: #ccc; margin: 10px 0;"><strong style="color: ${CONFIG.brandColors.success};">2-3x better results</strong> than basic usage</li>
                                            <li style="color: #ccc; margin: 10px 0;"><strong style="color: ${CONFIG.brandColors.success};">50% less maintenance time</strong> with optimizations</li>
                                            <li style="color: #ccc; margin: 10px 0;"><strong style="color: ${CONFIG.brandColors.success};">Higher ROI</strong> through strategic automation</li>
                                        </ul>
                                    </td>
                                </tr>
                            </table>

                            <table width="100%" cellpadding="0" cellspacing="0" style="background: ${CONFIG.brandColors.success}22; border-radius: 8px; border-left: 4px solid ${CONFIG.brandColors.success}; margin: 25px 0;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <h4 style="color: ${CONFIG.brandColors.success}; margin: 0 0 10px 0;">Your Challenge This Week:</h4>
                                        <p style="color: #ccc; margin: 0; line-height: 1.6;">
                                            Pick <strong>one advanced feature</strong> from the list above. Implement it. See the difference. Then move to the next one.
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            ${getCtaButton('Explore Advanced Docs →', product.docsUrl + '/advanced')}

                            <p style="color: #888; font-size: 14px; line-height: 1.6; margin: 25px 0 0 0; text-align: center;">
                                In 2 weeks, I'll ask about your success story. Start thinking about your wins!
                            </p>
                        </td>
                    </tr>
                ${getEmailFooter(product)}`;
            }
        },

        // ========== DAY 30: SUCCESS STORY REQUEST ==========
        {
            day: 30,
            delay: '30 days',
            subject: `${product.icon} Your ${product.name} Story - 30 Days Later`,
            preheader: `We'd love to hear about your results and feature you!`,
            type: 'day30-success-story',
            generateHtml: (customer) => {
                return `${getEmailHeader(product)}
                    <tr>
                        <td style="padding: 40px 30px; text-align: center; background: linear-gradient(135deg, ${CONFIG.brandColors.dark} 0%, #1a1a1a 100%);">
                            <div style="font-size: 64px; margin-bottom: 15px;">🎉</div>
                            <p style="color: ${CONFIG.brandColors.secondary}; margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">30 Day Milestone</p>
                            <h1 style="color: ${CONFIG.brandColors.primary}; margin: 0; font-size: 28px;">Congratulations!</h1>
                            <p style="color: #999; margin: 10px 0 0 0; font-size: 16px;">You've been using ${product.name} for a full month</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px;">
                            <p style="color: #ddd; font-size: 18px; line-height: 1.6; margin: 0 0 20px 0;">
                                Hey ${customer.name || 'there'},
                            </p>
                            <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                Can you believe it's been 30 days? Time flies when automation is working.
                            </p>
                            <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
                                I'd love to hear about your experience with ${product.name}. <strong style="color: ${CONFIG.brandColors.accent};">Your story could help others make the same leap you did.</strong>
                            </p>

                            <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, ${CONFIG.brandColors.primary}22 0%, ${CONFIG.brandColors.accent}22 100%); border-radius: 8px; border: 1px solid ${CONFIG.brandColors.primary}44; margin: 25px 0;">
                                <tr>
                                    <td style="padding: 30px; text-align: center;">
                                        <h3 style="color: ${CONFIG.brandColors.primary}; margin: 0 0 20px 0;">Share Your Success Story</h3>
                                        <p style="color: #ccc; margin: 0 0 20px 0; line-height: 1.6;">
                                            Reply to this email with a few sentences about:
                                        </p>
                                        <table width="100%" cellpadding="0" cellspacing="0" style="text-align: left;">
                                            <tr>
                                                <td style="padding: 8px 0; color: #ccc;">
                                                    <span style="color: ${CONFIG.brandColors.success}; margin-right: 10px;">1.</span> What problem ${product.name} solved for you
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #ccc;">
                                                    <span style="color: ${CONFIG.brandColors.success}; margin-right: 10px;">2.</span> The results you've seen (numbers if you have them!)
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #ccc;">
                                                    <span style="color: ${CONFIG.brandColors.success}; margin-right: 10px;">3.</span> What surprised you most
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <table width="100%" cellpadding="0" cellspacing="0" style="background: #1a1a1a; border-radius: 8px; margin: 25px 0;">
                                <tr>
                                    <td style="padding: 25px;">
                                        <h4 style="color: ${CONFIG.brandColors.secondary}; margin: 0 0 15px 0;">What's In It For You?</h4>
                                        <ul style="padding-left: 20px; margin: 0;">
                                            <li style="color: #ccc; margin: 10px 0;">Featured on our website & socials</li>
                                            <li style="color: #ccc; margin: 10px 0;">Backlink to your business (SEO boost)</li>
                                            <li style="color: #ccc; margin: 10px 0;">Early access to our next product launch</li>
                                            <li style="color: #ccc; margin: 10px 0;">Our eternal gratitude 🙏</li>
                                        </ul>
                                    </td>
                                </tr>
                            </table>

                            <table width="100%" cellpadding="0" cellspacing="0" style="background: ${CONFIG.brandColors.success}22; border-radius: 8px; border-left: 4px solid ${CONFIG.brandColors.success}; margin: 25px 0;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <h4 style="color: ${CONFIG.brandColors.success}; margin: 0 0 10px 0;">Remember: FOR THE KIDS</h4>
                                        <p style="color: #ccc; margin: 0; line-height: 1.6;">
                                            Your purchase helped children. 60% of your $${product.price} went directly to verified pediatric charities. That's <strong>$${Math.round(product.price * 0.6)}</strong> making a real difference.
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <div style="text-align: center; margin: 30px 0;">
                                <a href="mailto:${product.supportEmail}?subject=My ${product.name} Success Story" style="display: inline-block; background: ${CONFIG.brandColors.primary}; color: #fff; padding: 16px 40px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 18px;">
                                    Share My Story →
                                </a>
                            </div>

                            <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 30px 0 0 0;">
                                Thank you for being part of the AI Solutions family.<br><br>
                                Here's to the next 30 days of success,<br>
                                <strong style="color: ${CONFIG.brandColors.primary};">The AI Solutions Team</strong>
                            </p>
                        </td>
                    </tr>
                ${getEmailFooter(product)}`;
            }
        }
    ];
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
// FILE GENERATION
// ============================================================================

function saveEmailToFile(productKey, emailData, customer, filename) {
    const outputDir = path.join(CONFIG.outputDir, productKey);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const html = emailData.generateHtml(customer);
    const filepath = path.join(outputDir, `${filename}.html`);
    fs.writeFileSync(filepath, html);
    log(`Generated: ${filepath}`);

    // Also save metadata
    const metadata = {
        product: productKey,
        day: emailData.day,
        subject: emailData.subject,
        preheader: emailData.preheader,
        delay: emailData.delay,
        type: emailData.type,
        generatedAt: new Date().toISOString(),
        mission: 'FOR THE KIDS'
    };
    const metapath = path.join(outputDir, `${filename}.json`);
    fs.writeFileSync(metapath, JSON.stringify(metadata, null, 2));

    return filepath;
}

function generateAllOnboardingSequences() {
    ensureDirectories();

    const testCustomer = { name: 'Valued Customer', email: 'test@example.com' };
    let filesGenerated = 0;

    Object.keys(PRODUCTS).forEach(productKey => {
        log(`Generating onboarding sequence for: ${productKey}...`, 'INFO');
        const sequence = generateOnboardingSequence(productKey);

        sequence.forEach((email) => {
            const filename = `day-${String(email.day).padStart(2, '0')}-${email.type}`;
            saveEmailToFile(productKey, email, testCustomer, filename);
            filesGenerated++;
        });
    });

    // Generate summary log
    const summaryPath = path.join(CONFIG.outputDir, 'generation-summary.json');
    const summary = {
        generatedAt: new Date().toISOString(),
        totalProducts: Object.keys(PRODUCTS).length,
        emailsPerProduct: 6,
        totalEmails: filesGenerated,
        products: Object.keys(PRODUCTS).map(key => ({
            key: key,
            name: PRODUCTS[key].name,
            price: PRODUCTS[key].price
        })),
        emailSequence: [
            { day: 0, type: 'welcome', description: 'Welcome email - immediate post-purchase' },
            { day: 1, type: 'getting-started', description: 'Getting started guide - setup instructions' },
            { day: 3, type: 'day3-tips', description: 'Day 3 tips - power user tips and tricks' },
            { day: 7, type: 'day7-checkin', description: 'Day 7 check-in - progress check and support offer' },
            { day: 14, type: 'day14-advanced', description: 'Day 14 advanced features - unlock full potential' },
            { day: 30, type: 'day30-success-story', description: 'Day 30 success story - testimonial request' }
        ],
        mission: 'FOR THE KIDS',
        gospel: CONFIG.gospel
    };
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
    log(`Summary saved: ${summaryPath}`, 'SUCCESS');

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
CUSTOMER ONBOARDING EMAIL SEQUENCES
AI Solutions Store | FOR THE KIDS - Gospel V${CONFIG.gospel.version}
============================================================================

Usage:
  node onboarding-sequences.cjs [options]

Options:
  --help                    Show this help message
  --list-products           List all products in the catalog
  --generate-all            Generate all onboarding sequences for all products

  --product=KEY             Specify product (see --list-products)
  --day=NUMBER              Specific day to generate (0, 1, 3, 7, 14, 30)
  --email=ADDRESS           Target email for sending
  --name=NAME               Customer name (optional)
  --send                    Actually send email (vs generate files)
  --test                    Preview mode (generate files only)

Email Sequence:
  Day 0  - Welcome Email (immediate)
  Day 1  - Getting Started Guide
  Day 3  - Power User Tips
  Day 7  - Check-In
  Day 14 - Advanced Features
  Day 30 - Success Story Request

Examples:
  node onboarding-sequences.cjs --generate-all
  node onboarding-sequences.cjs --product=claude-droid --test
  node onboarding-sequences.cjs --product=income-droid --day=0 --email=user@example.com --send
  node onboarding-sequences.cjs --product=marketing-engine --day=7 --test

Output:
  Generated emails saved to: ${CONFIG.outputDir}
  Logs written to: ${CONFIG.logFile}

============================================================================
FOR THE KIDS. ALWAYS.
============================================================================
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
    console.log('CUSTOMER ONBOARDING EMAIL SEQUENCES');
    console.log('AI Solutions Store | FOR THE KIDS - Gospel V' + CONFIG.gospel.version + ' (60/30/10)');
    console.log('============================================================================');
    console.log('');

    if (args.help) {
        showHelp();
        return;
    }

    if (args['list-products']) {
        listProducts();
        return;
    }

    if (args['generate-all']) {
        log('Generating all onboarding sequences for all products...', 'INFO');
        const count = generateAllOnboardingSequences();
        log(`Generated ${count} email templates to ${CONFIG.outputDir}`, 'SUCCESS');
        console.log('');
        log('============================================================================', 'INFO');
        log('GENERATION COMPLETE', 'SUCCESS');
        log(`Total products: ${Object.keys(PRODUCTS).length}`, 'INFO');
        log(`Emails per product: 6`, 'INFO');
        log(`Total emails generated: ${count}`, 'INFO');
        log('FOR THE KIDS. ALWAYS.', 'SUCCESS');
        log('============================================================================', 'INFO');
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

    const productKey = args.product;
    const dayFilter = args.day !== undefined ? parseInt(args.day) : null;
    const isSend = args.send;
    const isTest = args.test || !isSend;

    if (!productKey) {
        log('No product specified. Use --product=<key> or --generate-all', 'WARN');
        showHelp();
        return;
    }

    if (!PRODUCTS[productKey]) {
        log(`Product not found: ${productKey}. Use --list-products to see available.`, 'ERROR');
        return;
    }

    ensureDirectories();

    const customer = {
        email: args.email || 'test@example.com',
        name: args.name || 'Valued Customer'
    };

    const sequence = generateOnboardingSequence(productKey);
    const emailsToProcess = dayFilter !== null
        ? sequence.filter(e => e.day === dayFilter)
        : sequence;

    if (emailsToProcess.length === 0) {
        log(`No emails found for day ${dayFilter}. Valid days: 0, 1, 3, 7, 14, 30`, 'ERROR');
        return;
    }

    log(`Product: ${PRODUCTS[productKey].name}`, 'INFO');
    log(`Emails to process: ${emailsToProcess.length}`, 'INFO');
    log(`Mode: ${isTest ? 'TEST (generate files only)' : 'SEND'}`, 'INFO');
    log(`Customer: ${customer.name} <${customer.email}>`, 'INFO');
    console.log('');

    for (let i = 0; i < emailsToProcess.length; i++) {
        const email = emailsToProcess[i];
        log(`Processing Day ${email.day}: "${email.subject}"`, 'INFO');

        if (isTest) {
            const filename = `day-${String(email.day).padStart(2, '0')}-${email.type}`;
            saveEmailToFile(productKey, email, customer, filename);
        } else {
            try {
                const html = email.generateHtml(customer);
                await sendEmail(customer.email, customer.name, email.subject, html);
            } catch (err) {
                log(`Failed to send email: ${err.message}`, 'ERROR');
            }
        }
    }

    console.log('');
    log('============================================================================', 'INFO');
    log('PROCESSING COMPLETE', 'SUCCESS');
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
    generateOnboardingSequence,
    generateAllOnboardingSequences,
    sendEmail
};
