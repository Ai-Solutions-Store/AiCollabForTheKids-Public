/**
 * Landing Page A/B Test Variants Generator
 * Generates 3 variants per product: Feature-focused, Benefit-focused, Story-focused
 * FOR THE KIDS - 60/30/10
 */

const fs = require('fs');
const path = require('path');

const LOGS_DIR = 'C:\\AiCollabForTheKids\\logs';
const LOG_FILE = path.join(LOGS_DIR, 'landing-page-variants.log');
const OUTPUT_FILE = path.join(LOGS_DIR, 'landing-page-variants.json');
const MARKDOWN_FILE = path.join(LOGS_DIR, 'landing-page-variants.md');

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

// Product definitions with details for landing page generation
const PRODUCTS = {
    'claude-droid': {
        name: 'Claude Droid',
        tagline: 'YouTube Shorts Automation',
        price: '$297',
        category: 'content-automation',
        features: [
            'AI-powered script generation with GPT-4',
            'Automated text-to-speech with Google TTS',
            'FFmpeg video creation pipeline',
            'YouTube OAuth2 authenticated uploads',
            'NewsAPI trending topic integration',
            'Configurable posting schedule',
            'Multi-category content support',
            'Automatic metadata optimization'
        ],
        benefits: [
            'Generate passive income while you sleep',
            'Save 40+ hours weekly on content creation',
            'Never run out of viral content ideas',
            'Grow your YouTube channel on autopilot',
            'Transform trending news into engaging Shorts',
            'Build multiple income streams effortlessly',
            'Join the creator economy without being on camera',
            'Scale your content output infinitely'
        ],
        targetAudience: 'Content creators, side hustlers, passive income seekers',
        painPoints: [
            'Spending hours creating content manually',
            'Running out of video ideas',
            'Missing the YouTube Shorts goldmine',
            'No time for consistent posting'
        ]
    },
    'income-droid': {
        name: 'Income Droid',
        tagline: 'Automated YouTube Income Machine',
        price: '$497',
        category: 'income-automation',
        features: [
            '4x daily automated posting schedule',
            'AI content generation with GPT-4',
            'High-quality voice synthesis',
            'Discord webhook notifications',
            'PM2 production process management',
            'Real-time analytics tracking',
            'YouTube OAuth integration',
            'Winston logging system'
        ],
        benefits: [
            'Build a 6-figure passive income stream',
            'Post consistently without lifting a finger',
            'Monetize the YouTube algorithm 24/7',
            'Track your growth in real-time',
            'Never miss a viral posting window',
            'Join successful creators earning while sleeping',
            'Scale to multiple channels effortlessly',
            'Get notified of every successful upload'
        ],
        targetAudience: 'Entrepreneurs, passive income builders, YouTube monetizers',
        painPoints: [
            'Inconsistent posting killing channel growth',
            'Missing optimal posting times',
            'Manual uploads consuming your life',
            'Unable to scale beyond one channel'
        ]
    },
    'marketing-engine': {
        name: 'Marketing Engine',
        tagline: '20+ Platform Automation',
        price: '$799',
        category: 'marketing-automation',
        features: [
            '20+ platform integrations',
            'AI content generation (Claude/GPT)',
            'Cron-based scheduling system',
            'Cross-platform analytics',
            'Automatic format adaptation',
            'API and manual posting modes',
            'Platform-specific optimization',
            'Comprehensive logging'
        ],
        benefits: [
            'Dominate every social platform simultaneously',
            'Save 100+ hours monthly on marketing',
            'Reach millions without hiring a team',
            'Automate your entire marketing stack',
            'Generate platform-optimized content instantly',
            'Track performance across all channels',
            'Scale your reach exponentially',
            'Focus on product while marketing runs itself'
        ],
        targetAudience: 'SaaS founders, indie hackers, marketing teams',
        painPoints: [
            'Managing 20+ social accounts manually',
            'Inconsistent brand presence across platforms',
            'Missing valuable marketing channels',
            'Spending more time on marketing than building'
        ]
    },
    'jules-ai': {
        name: 'Jules AI',
        tagline: 'Multi-Model AI Orchestrator',
        price: '$999',
        category: 'ai-tools',
        features: [
            'Smart model routing (Gemini/GPT/Claude)',
            'Beautiful React dashboard',
            'Git automation via API',
            'Cloud deployment helpers (GCP/AWS)',
            'Voice integration (TTS/STT)',
            'Task-optimized AI selection',
            'RESTful API endpoints',
            'Real-time chat interface'
        ],
        benefits: [
            'Get the best AI for every task automatically',
            'Cut AI costs by using optimal models',
            'Manage all your AI tools in one dashboard',
            'Automate development workflows',
            'Deploy to cloud with one command',
            'Build faster with intelligent AI routing',
            'Never overpay for AI capabilities again',
            'Streamline your entire AI stack'
        ],
        targetAudience: 'Developers, tech leads, AI-powered startups',
        painPoints: [
            'Juggling multiple AI subscriptions',
            'Not knowing which AI is best for each task',
            'Wasting money on overqualified AI',
            'Manual context switching between AI tools'
        ]
    },
    'affiliate-system': {
        name: 'White-Label Affiliate System',
        tagline: 'Complete Affiliate Platform with Fraud Detection',
        price: '$599',
        category: 'business-tools',
        features: [
            '90-day cookie tracking',
            '4-tier commission structure (15-30%)',
            'Advanced fraud detection engine',
            'Square payment integration',
            'React affiliate dashboard',
            'Admin management panel',
            'Multi-currency support',
            'Automatic tier upgrades'
        ],
        benefits: [
            'Launch your affiliate program in hours',
            'Stop losing money to affiliate fraud',
            'Reward top performers automatically',
            'Process payouts without manual work',
            'Scale with trusted affiliate partners',
            'White-label for any brand',
            'Track every click and conversion',
            'Build a passive revenue channel'
        ],
        targetAudience: 'E-commerce owners, SaaS companies, digital product sellers',
        painPoints: [
            'Affiliate fraud eating into profits',
            'No system to manage affiliate partners',
            'Missing out on affiliate marketing revenue',
            'Complex payout and tracking management'
        ]
    },
    'dating-platform': {
        name: 'Complete Dating Platform',
        tagline: 'White-Label Dating App Solution',
        price: '$2,499',
        category: 'platform',
        features: [
            'Full frontend + backend + admin dashboard',
            'Advanced matching algorithm',
            'Real-time messaging with WebSockets',
            'Square payment processing (MCC 7273)',
            'Age verification integration',
            'GDPR/CCPA compliance tools',
            'Docker production deployment',
            'S3-compatible photo storage'
        ],
        benefits: [
            'Launch your dating app in days, not months',
            'Skip $500K+ in development costs',
            'Enter the $10B+ dating market instantly',
            'Customize for any niche or audience',
            'Handle compliance without lawyers',
            'Scale to millions of users',
            'Monetize with subscriptions and features',
            'Own your platform completely'
        ],
        targetAudience: 'Entrepreneurs, niche market creators, dating industry entrants',
        painPoints: [
            'Dating app development costs $500K+',
            'Years of development time required',
            'Complex compliance requirements',
            'Missing the dating market opportunity'
        ]
    }
};

// Landing page variant generators
function generateFeatureFocusedVariant(productKey, product) {
    return {
        variantType: 'feature-focused',
        productKey,
        productName: product.name,

        hero: {
            headline: `${product.name}: The Most Powerful ${product.tagline} System`,
            subheadline: `Packed with ${product.features.length} enterprise-grade features that give you an unfair advantage`,
            cta: {
                primary: 'See All Features',
                secondary: 'Watch Demo'
            }
        },

        sections: {
            features: {
                headline: 'Everything You Need, Nothing You Don\'t',
                subheadline: 'Built by engineers who understand what actually matters',
                items: product.features.map((feature, i) => ({
                    title: feature.split(' ').slice(0, 3).join(' '),
                    description: feature,
                    icon: ['cpu', 'zap', 'shield', 'clock', 'chart', 'code', 'server', 'lock'][i % 8]
                }))
            },

            techSpecs: {
                headline: 'Technical Specifications',
                subheadline: 'Enterprise-grade architecture for serious users',
                specs: [
                    { label: 'Setup Time', value: '< 30 minutes' },
                    { label: 'Uptime SLA', value: '99.9%' },
                    { label: 'Support', value: '24/7 Discord' },
                    { label: 'Updates', value: 'Lifetime included' }
                ]
            },

            comparison: {
                headline: 'How We Stack Up',
                subheadline: 'Feature-by-feature comparison with alternatives',
                ourFeatures: product.features.slice(0, 4),
                competitorLacks: [
                    'Limited automation capabilities',
                    'Manual processes required',
                    'No real-time analytics',
                    'Expensive per-seat pricing'
                ]
            },

            integration: {
                headline: 'Seamless Integration',
                subheadline: 'Works with your existing stack out of the box',
                platforms: ['Node.js', 'Python', 'Docker', 'AWS', 'GCP', 'PM2']
            }
        },

        socialProof: {
            headline: 'Trusted by Technical Teams',
            metrics: [
                { value: '10,000+', label: 'Active Users' },
                { value: '99.9%', label: 'Uptime' },
                { value: '50+', label: 'Integrations' },
                { value: '4.9/5', label: 'User Rating' }
            ]
        },

        finalCta: {
            headline: `Get ${product.name} Today`,
            subheadline: `All ${product.features.length} features. One-time payment. Lifetime access.`,
            price: product.price,
            cta: 'Unlock All Features',
            guarantee: '30-day money-back guarantee'
        }
    };
}

function generateBenefitFocusedVariant(productKey, product) {
    return {
        variantType: 'benefit-focused',
        productKey,
        productName: product.name,

        hero: {
            headline: product.benefits[0],
            subheadline: `${product.name} transforms ${product.painPoints[0].toLowerCase()} into ${product.benefits[1].toLowerCase()}`,
            cta: {
                primary: 'Start Transforming Today',
                secondary: 'See Success Stories'
            }
        },

        sections: {
            problemAgitate: {
                headline: 'Are You Tired Of...',
                subheadline: 'These problems are costing you money every single day',
                painPoints: product.painPoints.map(pain => ({
                    problem: pain,
                    cost: 'Hours wasted, revenue lost, opportunities missed'
                }))
            },

            transformation: {
                headline: 'Imagine Instead...',
                subheadline: 'What life looks like after you make the switch',
                benefits: product.benefits.map((benefit, i) => ({
                    before: product.painPoints[i % product.painPoints.length],
                    after: benefit,
                    timeframe: ['Day 1', 'Week 1', 'Month 1', 'Quarter 1'][i % 4]
                }))
            },

            outcomes: {
                headline: 'Real Results You Can Expect',
                subheadline: 'Based on actual user outcomes',
                results: [
                    { metric: 'Time Saved', value: '40+ hours/week', description: 'Reclaim your life' },
                    { metric: 'Revenue Impact', value: '10x ROI', description: 'In the first 90 days' },
                    { metric: 'Stress Reduction', value: '100%', description: 'Set it and forget it' },
                    { metric: 'Scale Factor', value: 'Unlimited', description: 'Grow without limits' }
                ]
            },

            lifestyle: {
                headline: 'Join the Movement',
                subheadline: `${product.targetAudience} are already living this reality`,
                benefits: [
                    'Wake up to automated results',
                    'Focus on what matters most',
                    'Scale without burning out',
                    'Build real passive income'
                ]
            }
        },

        socialProof: {
            headline: 'Success Stories',
            testimonials: [
                {
                    quote: `${product.benefits[0]} - this completely changed my business.`,
                    name: 'Successful User',
                    role: product.targetAudience.split(',')[0].trim(),
                    result: `Achieved ${product.benefits[1].toLowerCase()}`
                },
                {
                    quote: `I was ${product.painPoints[0].toLowerCase()}. Now I'm ${product.benefits[2].toLowerCase()}.`,
                    name: 'Happy Customer',
                    role: product.targetAudience.split(',')[1]?.trim() || 'Entrepreneur',
                    result: 'Complete transformation in 30 days'
                }
            ]
        },

        finalCta: {
            headline: 'Your Transformation Starts Now',
            subheadline: `Stop ${product.painPoints[0].toLowerCase()}. Start ${product.benefits[0].toLowerCase()}.`,
            price: product.price,
            cta: 'Transform My Business Today',
            guarantee: 'Love it or your money back. No questions asked.'
        }
    };
}

function generateStoryFocusedVariant(productKey, product) {
    return {
        variantType: 'story-focused',
        productKey,
        productName: product.name,

        hero: {
            headline: `The Story Behind ${product.name}`,
            subheadline: 'We built this because we faced the same struggles you do',
            cta: {
                primary: 'Read Our Story',
                secondary: 'Join Our Mission'
            }
        },

        sections: {
            origin: {
                headline: 'It Started With a Problem',
                story: `Like many ${product.targetAudience.split(',')[0]}s, we were drowning in ${product.painPoints[0].toLowerCase()}. Every day felt like a losing battle. We tried everything - expensive tools, hiring help, working longer hours. Nothing worked.

Then one night, frustrated and exhausted, we had an idea. What if we could automate the ${product.tagline.toLowerCase()} completely? What if ${product.benefits[0].toLowerCase()} wasn't just a dream?

That's when ${product.name} was born.`,
                milestone: 'December 2024: The first version goes live'
            },

            mission: {
                headline: 'Our Mission: FOR THE KIDS',
                subheadline: '60/30/10 - Building Generational Wealth',
                story: `This isn't just about ${product.tagline.toLowerCase()}. It's about creating something bigger.

We believe technology should create opportunities, not just profits. That's why we're committed to:
- 60% to long-term investment for our kids' futures
- 30% to growing and improving
- 10% to immediate needs

When you buy ${product.name}, you're not just getting a tool. You're joining a movement to build generational wealth.`,
                values: [
                    'Automation for freedom, not laziness',
                    'Profits with purpose',
                    'Building for the next generation',
                    'Community over competition'
                ]
            },

            journey: {
                headline: 'The Journey to Today',
                milestones: [
                    { date: 'Month 1', event: 'First user succeeds', impact: 'Proved the concept works' },
                    { date: 'Month 3', event: '100 users strong', impact: 'Community forms' },
                    { date: 'Month 6', event: 'Platform matures', impact: `${product.features.length} features shipping` },
                    { date: 'Today', event: 'Your turn', impact: 'Join the movement' }
                ]
            },

            community: {
                headline: 'More Than Software',
                subheadline: 'A community of builders, dreamers, and doers',
                benefits: [
                    'Active Discord community',
                    'Weekly founder updates',
                    'Peer accountability groups',
                    'Shared wins and lessons'
                ]
            },

            founder: {
                headline: 'From the Founder',
                letter: `Dear future ${product.name} user,

I built this because I was tired of seeing people like us struggle. ${product.targetAudience} deserve better tools, better opportunities, and a real path to financial freedom.

${product.name} is my answer to the question: "What would I have wanted when I was starting out?"

The answer: Something that actually works. Something that saves time. Something that helps me ${product.benefits[0].toLowerCase()}.

I hope you'll give it a try. And if it doesn't work for you, I'll give you your money back personally.

FOR THE KIDS,
The Founder`,
                signature: 'Building the future, one automation at a time'
            }
        },

        socialProof: {
            headline: 'Our Community Stories',
            stories: [
                {
                    title: 'From Burnout to Breakthrough',
                    summary: `A ${product.targetAudience.split(',')[0]} shares their journey from ${product.painPoints[0].toLowerCase()} to ${product.benefits[0].toLowerCase()}.`,
                    outcome: 'Now enjoys true passive income'
                },
                {
                    title: 'The 4-Hour Work Week, For Real',
                    summary: 'How automation freed up time for what matters most.',
                    outcome: 'Spends more time with family'
                }
            ]
        },

        finalCta: {
            headline: 'Write Your Own Story',
            subheadline: 'Join the builders who chose a different path',
            price: product.price,
            cta: 'Start My Story Today',
            guarantee: 'Your story matters. 30-day guarantee if it doesn\'t fit.'
        }
    };
}

// Generate all variants for all products
function generateAllVariants() {
    log('Starting landing page variant generation...');
    log('FOR THE KIDS - 60/30/10');

    const allVariants = {};
    const markdownContent = [];

    markdownContent.push('# Landing Page A/B Test Variants');
    markdownContent.push('## FOR THE KIDS - 60/30/10');
    markdownContent.push('');
    markdownContent.push(`Generated: ${new Date().toISOString()}`);
    markdownContent.push('');
    markdownContent.push('---');
    markdownContent.push('');

    for (const [productKey, product] of Object.entries(PRODUCTS)) {
        log(`Generating variants for: ${product.name}`);

        allVariants[productKey] = {
            product: {
                name: product.name,
                tagline: product.tagline,
                price: product.price,
                category: product.category,
                targetAudience: product.targetAudience
            },
            variants: {
                featureFocused: generateFeatureFocusedVariant(productKey, product),
                benefitFocused: generateBenefitFocusedVariant(productKey, product),
                storyFocused: generateStoryFocusedVariant(productKey, product)
            }
        };

        // Generate markdown documentation
        markdownContent.push(`# ${product.name}`);
        markdownContent.push(`**${product.tagline}** | ${product.price}`);
        markdownContent.push('');

        // Variant A: Feature-Focused
        const featureVariant = allVariants[productKey].variants.featureFocused;
        markdownContent.push('## Variant A: Feature-Focused');
        markdownContent.push('');
        markdownContent.push('### Hero Section');
        markdownContent.push(`**Headline:** ${featureVariant.hero.headline}`);
        markdownContent.push('');
        markdownContent.push(`**Subheadline:** ${featureVariant.hero.subheadline}`);
        markdownContent.push('');
        markdownContent.push(`**Primary CTA:** ${featureVariant.hero.cta.primary}`);
        markdownContent.push(`**Secondary CTA:** ${featureVariant.hero.cta.secondary}`);
        markdownContent.push('');
        markdownContent.push('### Features Section');
        markdownContent.push(`**Headline:** ${featureVariant.sections.features.headline}`);
        markdownContent.push(`**Subheadline:** ${featureVariant.sections.features.subheadline}`);
        markdownContent.push('');
        markdownContent.push('**Feature List:**');
        featureVariant.sections.features.items.forEach((item, i) => {
            markdownContent.push(`${i + 1}. **${item.title}** - ${item.description}`);
        });
        markdownContent.push('');
        markdownContent.push('### Tech Specs Section');
        markdownContent.push(`**Headline:** ${featureVariant.sections.techSpecs.headline}`);
        featureVariant.sections.techSpecs.specs.forEach(spec => {
            markdownContent.push(`- ${spec.label}: ${spec.value}`);
        });
        markdownContent.push('');
        markdownContent.push('### Final CTA');
        markdownContent.push(`**Headline:** ${featureVariant.finalCta.headline}`);
        markdownContent.push(`**Subheadline:** ${featureVariant.finalCta.subheadline}`);
        markdownContent.push(`**CTA Button:** ${featureVariant.finalCta.cta}`);
        markdownContent.push(`**Guarantee:** ${featureVariant.finalCta.guarantee}`);
        markdownContent.push('');
        markdownContent.push('---');
        markdownContent.push('');

        // Variant B: Benefit-Focused
        const benefitVariant = allVariants[productKey].variants.benefitFocused;
        markdownContent.push('## Variant B: Benefit-Focused');
        markdownContent.push('');
        markdownContent.push('### Hero Section');
        markdownContent.push(`**Headline:** ${benefitVariant.hero.headline}`);
        markdownContent.push('');
        markdownContent.push(`**Subheadline:** ${benefitVariant.hero.subheadline}`);
        markdownContent.push('');
        markdownContent.push(`**Primary CTA:** ${benefitVariant.hero.cta.primary}`);
        markdownContent.push(`**Secondary CTA:** ${benefitVariant.hero.cta.secondary}`);
        markdownContent.push('');
        markdownContent.push('### Pain Points Section');
        markdownContent.push(`**Headline:** ${benefitVariant.sections.problemAgitate.headline}`);
        markdownContent.push(`**Subheadline:** ${benefitVariant.sections.problemAgitate.subheadline}`);
        markdownContent.push('');
        benefitVariant.sections.problemAgitate.painPoints.forEach(pain => {
            markdownContent.push(`- **${pain.problem}** - ${pain.cost}`);
        });
        markdownContent.push('');
        markdownContent.push('### Transformation Section');
        markdownContent.push(`**Headline:** ${benefitVariant.sections.transformation.headline}`);
        benefitVariant.sections.transformation.benefits.slice(0, 4).forEach(benefit => {
            markdownContent.push(`- Before: ${benefit.before}`);
            markdownContent.push(`  After: ${benefit.after}`);
            markdownContent.push(`  Timeline: ${benefit.timeframe}`);
            markdownContent.push('');
        });
        markdownContent.push('### Results Section');
        markdownContent.push(`**Headline:** ${benefitVariant.sections.outcomes.headline}`);
        benefitVariant.sections.outcomes.results.forEach(result => {
            markdownContent.push(`- **${result.metric}:** ${result.value} - ${result.description}`);
        });
        markdownContent.push('');
        markdownContent.push('### Final CTA');
        markdownContent.push(`**Headline:** ${benefitVariant.finalCta.headline}`);
        markdownContent.push(`**Subheadline:** ${benefitVariant.finalCta.subheadline}`);
        markdownContent.push(`**CTA Button:** ${benefitVariant.finalCta.cta}`);
        markdownContent.push(`**Guarantee:** ${benefitVariant.finalCta.guarantee}`);
        markdownContent.push('');
        markdownContent.push('---');
        markdownContent.push('');

        // Variant C: Story-Focused
        const storyVariant = allVariants[productKey].variants.storyFocused;
        markdownContent.push('## Variant C: Story-Focused');
        markdownContent.push('');
        markdownContent.push('### Hero Section');
        markdownContent.push(`**Headline:** ${storyVariant.hero.headline}`);
        markdownContent.push('');
        markdownContent.push(`**Subheadline:** ${storyVariant.hero.subheadline}`);
        markdownContent.push('');
        markdownContent.push(`**Primary CTA:** ${storyVariant.hero.cta.primary}`);
        markdownContent.push(`**Secondary CTA:** ${storyVariant.hero.cta.secondary}`);
        markdownContent.push('');
        markdownContent.push('### Origin Story Section');
        markdownContent.push(`**Headline:** ${storyVariant.sections.origin.headline}`);
        markdownContent.push('');
        markdownContent.push(storyVariant.sections.origin.story);
        markdownContent.push('');
        markdownContent.push(`*${storyVariant.sections.origin.milestone}*`);
        markdownContent.push('');
        markdownContent.push('### Mission Section');
        markdownContent.push(`**Headline:** ${storyVariant.sections.mission.headline}`);
        markdownContent.push(`**Subheadline:** ${storyVariant.sections.mission.subheadline}`);
        markdownContent.push('');
        markdownContent.push(storyVariant.sections.mission.story);
        markdownContent.push('');
        markdownContent.push('**Our Values:**');
        storyVariant.sections.mission.values.forEach(value => {
            markdownContent.push(`- ${value}`);
        });
        markdownContent.push('');
        markdownContent.push('### Journey Timeline');
        markdownContent.push(`**Headline:** ${storyVariant.sections.journey.headline}`);
        storyVariant.sections.journey.milestones.forEach(milestone => {
            markdownContent.push(`- **${milestone.date}:** ${milestone.event} - ${milestone.impact}`);
        });
        markdownContent.push('');
        markdownContent.push('### Founder Letter');
        markdownContent.push(`**Headline:** ${storyVariant.sections.founder.headline}`);
        markdownContent.push('');
        markdownContent.push('```');
        markdownContent.push(storyVariant.sections.founder.letter);
        markdownContent.push('```');
        markdownContent.push('');
        markdownContent.push(`*${storyVariant.sections.founder.signature}*`);
        markdownContent.push('');
        markdownContent.push('### Final CTA');
        markdownContent.push(`**Headline:** ${storyVariant.finalCta.headline}`);
        markdownContent.push(`**Subheadline:** ${storyVariant.finalCta.subheadline}`);
        markdownContent.push(`**CTA Button:** ${storyVariant.finalCta.cta}`);
        markdownContent.push(`**Guarantee:** ${storyVariant.finalCta.guarantee}`);
        markdownContent.push('');
        markdownContent.push('---');
        markdownContent.push('');
        markdownContent.push('');

        log(`Generated 3 variants for ${product.name}`);
    }

    // Add summary section
    markdownContent.push('# Summary');
    markdownContent.push('');
    markdownContent.push('## Products Covered');
    markdownContent.push('');
    for (const [productKey, product] of Object.entries(PRODUCTS)) {
        markdownContent.push(`- **${product.name}** (${product.price}) - ${product.tagline}`);
    }
    markdownContent.push('');
    markdownContent.push('## Variant Types');
    markdownContent.push('');
    markdownContent.push('1. **Feature-Focused (Variant A)**');
    markdownContent.push('   - Best for: Technical buyers, early adopters');
    markdownContent.push('   - Focus: Capabilities, specifications, integrations');
    markdownContent.push('   - Tone: Professional, detailed, comprehensive');
    markdownContent.push('');
    markdownContent.push('2. **Benefit-Focused (Variant B)**');
    markdownContent.push('   - Best for: Result-oriented buyers, business owners');
    markdownContent.push('   - Focus: Outcomes, transformations, ROI');
    markdownContent.push('   - Tone: Aspirational, problem-solving, results-driven');
    markdownContent.push('');
    markdownContent.push('3. **Story-Focused (Variant C)**');
    markdownContent.push('   - Best for: Values-driven buyers, community seekers');
    markdownContent.push('   - Focus: Origin, mission, community, founder story');
    markdownContent.push('   - Tone: Personal, authentic, inspiring');
    markdownContent.push('');
    markdownContent.push('## A/B Testing Recommendations');
    markdownContent.push('');
    markdownContent.push('1. **Traffic Split:** Start with 33/33/33 even split');
    markdownContent.push('2. **Minimum Sample:** 1,000 visitors per variant');
    markdownContent.push('3. **Primary Metric:** Conversion rate (purchases)');
    markdownContent.push('4. **Secondary Metrics:** Time on page, scroll depth, CTA clicks');
    markdownContent.push('5. **Duration:** Run for at least 2 weeks or until statistical significance');
    markdownContent.push('');
    markdownContent.push('---');
    markdownContent.push('');
    markdownContent.push('**FOR THE KIDS - 60/30/10**');
    markdownContent.push('');
    markdownContent.push('*Building generational wealth through automation*');

    return { allVariants, markdown: markdownContent.join('\n') };
}

// Main execution
function main() {
    log('===============================================');
    log('LANDING PAGE A/B TEST VARIANTS GENERATOR');
    log('FOR THE KIDS - 60/30/10');
    log('===============================================');

    const { allVariants, markdown } = generateAllVariants();

    // Save JSON output
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allVariants, null, 2));
    log(`Saved JSON variants to: ${OUTPUT_FILE}`);

    // Save Markdown output
    fs.writeFileSync(MARKDOWN_FILE, markdown);
    log(`Saved Markdown documentation to: ${MARKDOWN_FILE}`);

    // Log summary
    const productCount = Object.keys(PRODUCTS).length;
    const variantCount = productCount * 3;

    log('===============================================');
    log('GENERATION COMPLETE');
    log(`Products: ${productCount}`);
    log(`Total Variants: ${variantCount}`);
    log('Variant Types: Feature-focused, Benefit-focused, Story-focused');
    log('===============================================');
    log('');
    log('Output files:');
    log(`  JSON: ${OUTPUT_FILE}`);
    log(`  Markdown: ${MARKDOWN_FILE}`);
    log(`  Log: ${LOG_FILE}`);
    log('');
    log('FOR THE KIDS!');

    return allVariants;
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = {
    PRODUCTS,
    generateFeatureFocusedVariant,
    generateBenefitFocusedVariant,
    generateStoryFocusedVariant,
    generateAllVariants,
    main
};
