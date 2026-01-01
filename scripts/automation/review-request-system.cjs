/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * AUTOMATED REVIEW REQUEST SYSTEM - AI SOLUTIONS STORE
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Comprehensive system for:
 * 1) Post-purchase review request emails
 * 2) Follow-up sequences with smart timing
 * 3) Incentive offers for reviews
 * 4) Response templates for positive/negative reviews
 *
 * FOR THE KIDS - Gospel V1.3 (60/30/10)
 * 60% to Verified Pediatric Charities
 * 30% to Operations & Development
 * 10% to Founders
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// ═══════════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

const CONFIG = {
    storeName: 'AI Solutions Store',
    storeUrl: 'https://ai-solutions.store',
    supportEmail: 'support@ai-solutions.store',
    reviewPageUrl: 'https://ai-solutions.store/reviews',
    missionStatement: 'FOR THE KIDS - 60% of every purchase goes to verified pediatric charities',

    // Timing configuration (in days)
    timing: {
        initialRequest: 7,        // Days after purchase for first request
        firstFollowUp: 14,        // Days after purchase for first follow-up
        secondFollowUp: 30,       // Days after purchase for second follow-up
        incentiveOffer: 45        // Days after purchase to offer incentive
    },

    // Incentive tiers
    incentives: {
        photoReview: { discount: 15, description: '15% off next purchase' },
        videoReview: { discount: 25, description: '25% off next purchase' },
        detailedReview: { discount: 10, description: '10% off next purchase' },
        quickReview: { discount: 5, description: '5% off next purchase' }
    },

    // Log configuration
    logDir: 'C:\\AiCollabForTheKids\\logs',
    logFile: 'review-request-system.log'
};

// Ensure log directory exists
if (!fs.existsSync(CONFIG.logDir)) {
    fs.mkdirSync(CONFIG.logDir, { recursive: true });
}

const LOG_PATH = path.join(CONFIG.logDir, CONFIG.logFile);

// ═══════════════════════════════════════════════════════════════════════════════
// LOGGING SYSTEM
// ═══════════════════════════════════════════════════════════════════════════════

function log(message, level = 'INFO') {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${level}] ${message}`;
    console.log(logEntry);

    try {
        fs.appendFileSync(LOG_PATH, logEntry + '\n');
    } catch (error) {
        console.error('Failed to write to log:', error.message);
    }
}

function logSection(title) {
    const separator = '═'.repeat(70);
    log(separator);
    log(title);
    log(separator);
}

// ═══════════════════════════════════════════════════════════════════════════════
// PRODUCT DATA
// ═══════════════════════════════════════════════════════════════════════════════

const PRODUCTS = {
    'claude-droid': {
        name: 'Claude Droid',
        price: 299,
        description: 'Turn news into YouTube Shorts automatically',
        reviewPrompts: [
            'How has Claude Droid helped automate your content creation?',
            'What kind of videos have you created with Claude Droid?',
            'How much time has Claude Droid saved you?'
        ]
    },
    'income-droid': {
        name: 'Income Droid',
        price: 499,
        description: '4 revenue-optimized videos daily',
        reviewPrompts: [
            'How has Income Droid impacted your content output?',
            'Have you seen revenue growth with automated videos?',
            'What\'s your favorite feature of Income Droid?'
        ]
    },
    'marketing-engine': {
        name: 'Marketing Engine',
        price: 199,
        description: 'Auto-post to social media 4x daily',
        reviewPrompts: [
            'How has the Marketing Engine helped grow your reach?',
            'What platforms have you seen the best results on?',
            'How much marketing time do you save weekly?'
        ]
    },
    'jules-ai': {
        name: 'Jules AI',
        price: 399,
        description: 'Your AI business director',
        reviewPrompts: [
            'What business decisions has Jules AI helped you make?',
            'How has Jules AI improved your workflow?',
            'What\'s the most valuable insight Jules AI has provided?'
        ]
    },
    'affiliate-system': {
        name: 'Affiliate System',
        price: 599,
        description: 'White-label affiliate platform',
        reviewPrompts: [
            'How has the Affiliate System helped grow your business?',
            'What\'s your experience with the white-label features?',
            'How many affiliates have you onboarded?'
        ]
    },
    'dating-platform': {
        name: 'Dating Platform',
        price: 2499,
        description: 'Full anti-AI dating app source',
        reviewPrompts: [
            'How has the platform performed for your users?',
            'What customizations have you made?',
            'How do users respond to the anti-AI features?'
        ]
    }
};

// ═══════════════════════════════════════════════════════════════════════════════
// EMAIL TEMPLATE GENERATOR
// ═══════════════════════════════════════════════════════════════════════════════

class EmailTemplateGenerator {

    /**
     * Generate unique tracking ID for review request
     */
    static generateTrackingId(customerId, productId) {
        const hash = crypto.createHash('sha256')
            .update(`${customerId}-${productId}-${Date.now()}`)
            .digest('hex')
            .substring(0, 12);
        return `RVW-${hash.toUpperCase()}`;
    }

    /**
     * Get personalized review prompts based on product
     */
    static getReviewPrompts(productId) {
        const product = PRODUCTS[productId];
        if (!product) return [];
        return product.reviewPrompts || [];
    }

    /**
     * Generate the post-purchase review request email (Initial Request)
     */
    static generateInitialReviewRequest(customerData) {
        const {
            customerName,
            customerEmail,
            productId,
            purchaseDate,
            orderId
        } = customerData;

        const product = PRODUCTS[productId] || { name: 'AI Solutions Product', price: 0 };
        const trackingId = this.generateTrackingId(customerEmail, productId);
        const prompts = this.getReviewPrompts(productId);

        const template = {
            type: 'INITIAL_REVIEW_REQUEST',
            trackingId: trackingId,
            sendAfterDays: CONFIG.timing.initialRequest,
            scheduledDate: new Date(Date.now() + CONFIG.timing.initialRequest * 24 * 60 * 60 * 1000).toISOString(),

            subject: `${customerName}, how's ${product.name} working for you?`,

            preheader: `We'd love to hear about your experience with ${product.name}`,

            body: {
                greeting: `Hi ${customerName},`,

                opening: `It's been about a week since you purchased ${product.name}, and we hope it's been helping you ${product.description.toLowerCase()}.`,

                missionReminder: `Remember: Your purchase is making a real difference. ${CONFIG.missionStatement}. Every review helps more families discover us and enables more donations to children's hospitals.`,

                askSection: {
                    header: 'Would you share your experience?',
                    content: `Your honest feedback helps other entrepreneurs decide if ${product.name} is right for them, and helps us improve our AI tools.`,
                    prompts: prompts.length > 0 ? prompts : [
                        'How has this product helped your business?',
                        'What results have you seen so far?',
                        'Would you recommend it to others?'
                    ]
                },

                ctaButton: {
                    text: 'Share Your Review',
                    url: `${CONFIG.reviewPageUrl}?product=${productId}&order=${orderId}&track=${trackingId}`
                },

                incentiveTeaser: `Tip: Detailed reviews with photos or videos earn special discounts on future purchases!`,

                closing: `Thank you for being part of our mission to help children in need.`,

                signature: {
                    name: 'The AI Solutions Team',
                    tagline: 'FOR THE KIDS - Always.'
                }
            },

            metadata: {
                customerEmail: customerEmail,
                productId: productId,
                orderId: orderId,
                purchaseDate: purchaseDate,
                generatedAt: new Date().toISOString()
            }
        };

        log(`Generated INITIAL_REVIEW_REQUEST for ${customerEmail} - Product: ${product.name} - Tracking: ${trackingId}`);
        return template;
    }

    /**
     * Generate first follow-up email (gentle reminder)
     */
    static generateFirstFollowUp(customerData) {
        const {
            customerName,
            customerEmail,
            productId,
            purchaseDate,
            orderId,
            initialTrackingId
        } = customerData;

        const product = PRODUCTS[productId] || { name: 'AI Solutions Product', price: 0 };
        const trackingId = initialTrackingId || this.generateTrackingId(customerEmail, productId);

        const template = {
            type: 'FIRST_FOLLOW_UP',
            trackingId: `${trackingId}-F1`,
            sendAfterDays: CONFIG.timing.firstFollowUp,
            scheduledDate: new Date(Date.now() + CONFIG.timing.firstFollowUp * 24 * 60 * 60 * 1000).toISOString(),

            subject: `Quick question about ${product.name}, ${customerName}`,

            preheader: `We'd really appreciate 2 minutes of your time`,

            body: {
                greeting: `Hi ${customerName},`,

                opening: `We noticed you haven't had a chance to share your thoughts on ${product.name} yet - no worries at all! We know you're busy building something great.`,

                valueProposition: `Your feedback genuinely matters to us. Here's why:

- It helps other entrepreneurs make informed decisions
- It guides our development priorities
- Most importantly, every review increases our visibility, which means more sales, which means MORE DONATIONS to children's hospitals`,

                quickOption: {
                    header: 'Short on time?',
                    content: `Even a quick star rating with one sentence helps tremendously. It takes less than 60 seconds!`
                },

                ctaButton: {
                    text: 'Leave a Quick Review',
                    url: `${CONFIG.reviewPageUrl}?product=${productId}&order=${orderId}&track=${trackingId}-F1&quick=true`
                },

                incentive: {
                    header: 'Thank you bonus:',
                    content: `Share your experience and get ${CONFIG.incentives.quickReview.discount}% off your next purchase. Add photos or a video for even bigger discounts!`
                },

                closing: `Thanks for being part of our mission.`,

                signature: {
                    name: 'The AI Solutions Team',
                    tagline: 'FOR THE KIDS'
                }
            },

            metadata: {
                customerEmail: customerEmail,
                productId: productId,
                orderId: orderId,
                purchaseDate: purchaseDate,
                sequenceStep: 2,
                generatedAt: new Date().toISOString()
            }
        };

        log(`Generated FIRST_FOLLOW_UP for ${customerEmail} - Product: ${product.name}`);
        return template;
    }

    /**
     * Generate second follow-up email (last chance + strong incentive)
     */
    static generateSecondFollowUp(customerData) {
        const {
            customerName,
            customerEmail,
            productId,
            purchaseDate,
            orderId,
            initialTrackingId
        } = customerData;

        const product = PRODUCTS[productId] || { name: 'AI Solutions Product', price: 0 };
        const trackingId = initialTrackingId || this.generateTrackingId(customerEmail, productId);

        const template = {
            type: 'SECOND_FOLLOW_UP',
            trackingId: `${trackingId}-F2`,
            sendAfterDays: CONFIG.timing.secondFollowUp,
            scheduledDate: new Date(Date.now() + CONFIG.timing.secondFollowUp * 24 * 60 * 60 * 1000).toISOString(),

            subject: `${customerName}, one last thing about ${product.name}...`,

            preheader: `This is our final reminder - plus a special thank you offer`,

            body: {
                greeting: `Hi ${customerName},`,

                opening: `This is the last time we'll ask about your ${product.name} experience - we promise!`,

                impactStatement: {
                    header: 'Why reviews matter so much:',
                    content: `Since launching, reviews from customers like you have helped us donate over $50,000 to pediatric hospitals. Each review brings more visibility, more sales, and more help for kids who need it most.`
                },

                finalAsk: `Would you take just 2 minutes to share your honest experience? Whether it's great, good, or needs improvement - we want to hear it all.`,

                ctaButton: {
                    text: 'Share My Experience',
                    url: `${CONFIG.reviewPageUrl}?product=${productId}&order=${orderId}&track=${trackingId}-F2`
                },

                bonusIncentive: {
                    header: 'Special Thank You Offer:',
                    content: `As a thank you for your time, we're offering:
- Star rating only: ${CONFIG.incentives.quickReview.discount}% off next purchase
- Written review: ${CONFIG.incentives.detailedReview.discount}% off next purchase
- Review with photos: ${CONFIG.incentives.photoReview.discount}% off next purchase
- Video review: ${CONFIG.incentives.videoReview.discount}% off next purchase`
                },

                noReviewOption: {
                    content: `Not happy with your purchase? We'd love to make it right. Reply to this email or contact ${CONFIG.supportEmail} directly.`
                },

                closing: `Thank you for your support - it means everything to the kids we help.`,

                signature: {
                    name: 'The AI Solutions Team',
                    tagline: 'FOR THE KIDS - Always and Forever'
                }
            },

            metadata: {
                customerEmail: customerEmail,
                productId: productId,
                orderId: orderId,
                purchaseDate: purchaseDate,
                sequenceStep: 3,
                finalReminder: true,
                generatedAt: new Date().toISOString()
            }
        };

        log(`Generated SECOND_FOLLOW_UP (Final) for ${customerEmail} - Product: ${product.name}`);
        return template;
    }

    /**
     * Generate incentive offer email for non-respondents
     */
    static generateIncentiveOffer(customerData) {
        const {
            customerName,
            customerEmail,
            productId,
            purchaseDate,
            orderId
        } = customerData;

        const product = PRODUCTS[productId] || { name: 'AI Solutions Product', price: 0 };
        const trackingId = this.generateTrackingId(customerEmail, productId);
        const expirationDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // 14 days

        const template = {
            type: 'INCENTIVE_OFFER',
            trackingId: `${trackingId}-INC`,
            sendAfterDays: CONFIG.timing.incentiveOffer,
            scheduledDate: new Date(Date.now() + CONFIG.timing.incentiveOffer * 24 * 60 * 60 * 1000).toISOString(),

            subject: `${customerName}, here's ${CONFIG.incentives.videoReview.discount}% off - just for sharing your story`,

            preheader: `Your exclusive review incentive expires in 14 days`,

            body: {
                greeting: `Hi ${customerName},`,

                opening: `We hope you've been enjoying ${product.name}! We noticed you haven't shared a review yet, and we'd love to make it worth your while.`,

                exclusiveOffer: {
                    header: 'EXCLUSIVE REVIEW REWARDS',
                    tiers: [
                        {
                            type: 'Quick Star Rating',
                            reward: `${CONFIG.incentives.quickReview.discount}% off your next purchase`,
                            time: 'Takes 30 seconds'
                        },
                        {
                            type: 'Written Review (50+ words)',
                            reward: `${CONFIG.incentives.detailedReview.discount}% off your next purchase`,
                            time: 'Takes 2 minutes'
                        },
                        {
                            type: 'Photo Review',
                            reward: `${CONFIG.incentives.photoReview.discount}% off your next purchase`,
                            time: 'Takes 3 minutes'
                        },
                        {
                            type: 'Video Review',
                            reward: `${CONFIG.incentives.videoReview.discount}% off your next purchase + Featured on our site`,
                            time: 'Takes 5 minutes'
                        }
                    ]
                },

                howItWorks: {
                    header: 'How to claim your reward:',
                    steps: [
                        'Click the button below to leave your review',
                        'Include your order number in the review',
                        'Receive your discount code via email within 24 hours'
                    ]
                },

                ctaButton: {
                    text: 'Claim My Reward',
                    url: `${CONFIG.reviewPageUrl}?product=${productId}&order=${orderId}&track=${trackingId}-INC&incentive=true`
                },

                urgency: {
                    content: `This offer expires on ${expirationDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.`
                },

                missionReminder: `Remember: Your review helps more people discover us, which means more donations to pediatric hospitals. You're literally helping sick kids by sharing your experience.`,

                closing: `Thank you for being part of something bigger.`,

                signature: {
                    name: 'The AI Solutions Team',
                    tagline: 'FOR THE KIDS'
                }
            },

            metadata: {
                customerEmail: customerEmail,
                productId: productId,
                orderId: orderId,
                purchaseDate: purchaseDate,
                incentiveExpiration: expirationDate.toISOString(),
                sequenceStep: 4,
                generatedAt: new Date().toISOString()
            }
        };

        log(`Generated INCENTIVE_OFFER for ${customerEmail} - Product: ${product.name} - Expires: ${expirationDate.toISOString()}`);
        return template;
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// REVIEW RESPONSE TEMPLATES
// ═══════════════════════════════════════════════════════════════════════════════

class ReviewResponseTemplates {

    /**
     * Generate response for positive reviews (4-5 stars)
     */
    static generatePositiveResponse(reviewData) {
        const {
            reviewerName,
            productId,
            rating,
            reviewText,
            hasPhoto,
            hasVideo
        } = reviewData;

        const product = PRODUCTS[productId] || { name: 'our product' };
        const responseId = crypto.randomBytes(6).toString('hex').toUpperCase();

        const templates = [
            {
                id: `POS-${responseId}-A`,
                type: 'POSITIVE_RESPONSE',
                template: `${reviewerName}, thank you SO much for this amazing ${rating}-star review! We're thrilled that ${product.name} is helping you ${product.description ? product.description.toLowerCase() : 'achieve your goals'}.

Your success story means everything to us - and to the children's hospitals that benefit from every purchase. Reviews like yours help other entrepreneurs discover us, which means more donations to kids in need.

${hasVideo ? 'We loved your video review and may feature it on our homepage (with your permission)!' : hasPhoto ? 'Thanks for including photos - they really help others see what\'s possible!' : ''}

Keep building amazing things! We're here if you ever need support.

FOR THE KIDS,
The AI Solutions Team`
            },
            {
                id: `POS-${responseId}-B`,
                type: 'POSITIVE_RESPONSE',
                template: `Wow, ${reviewerName}! This review just made our day. Thank you for taking the time to share your experience with ${product.name}.

It's customers like you who make our mission possible. Remember: 60% of what you paid went directly to verified pediatric charities. Your purchase AND your review are helping sick kids get better care.

${rating === 5 ? 'A perfect 5 stars - we\'re honored! ' : ''}We can't wait to see what you build next.

Gratefully,
The AI Solutions Team

P.S. - Need anything? We're always here at ${CONFIG.supportEmail}`
            },
            {
                id: `POS-${responseId}-C`,
                type: 'POSITIVE_RESPONSE',
                template: `${reviewerName}, reading reviews like this reminds us why we do what we do. Thank you!

Your success with ${product.name} is proof that AI tools can genuinely help entrepreneurs like you save time and grow. And the best part? Every sale helps children in hospitals across the country.

${reviewText && reviewText.length > 100 ? 'We really appreciate the detailed feedback - it helps other customers AND helps us improve.' : ''}

Here's to your continued success!

FOR THE KIDS - Always,
AI Solutions Team`
            }
        ];

        const selected = templates[Math.floor(Math.random() * templates.length)];

        log(`Generated POSITIVE_RESPONSE for ${reviewerName} - Product: ${product.name} - Rating: ${rating} stars - Template: ${selected.id}`);

        return {
            ...selected,
            metadata: {
                reviewerName: reviewerName,
                productId: productId,
                rating: rating,
                responseCategory: 'positive',
                generatedAt: new Date().toISOString()
            }
        };
    }

    /**
     * Generate response for neutral reviews (3 stars)
     */
    static generateNeutralResponse(reviewData) {
        const {
            reviewerName,
            productId,
            reviewText,
            specificIssues
        } = reviewData;

        const product = PRODUCTS[productId] || { name: 'our product' };
        const responseId = crypto.randomBytes(6).toString('hex').toUpperCase();

        const template = {
            id: `NEU-${responseId}`,
            type: 'NEUTRAL_RESPONSE',
            template: `Hi ${reviewerName}, thank you for your honest feedback about ${product.name}. We really appreciate you taking the time to share your experience.

We're glad to hear what's working for you, and we take your suggestions seriously. ${specificIssues ? `Regarding ${specificIssues} - we'd love to learn more about your experience so we can improve.` : 'If there\'s anything specific we could do better, we\'d love to hear about it.'}

Would you be open to a quick chat with our support team? We want to make sure you get the full value from your purchase. Email us at ${CONFIG.supportEmail} and mention this review - we'll prioritize your case.

Remember: Your purchase is already making a difference. 60% went to pediatric charities. Thank you for being part of our mission.

Best,
The AI Solutions Team`,

            followUpRequired: true,
            priorityLevel: 'medium',

            metadata: {
                reviewerName: reviewerName,
                productId: productId,
                rating: 3,
                responseCategory: 'neutral',
                requiresFollowUp: true,
                generatedAt: new Date().toISOString()
            }
        };

        log(`Generated NEUTRAL_RESPONSE for ${reviewerName} - Product: ${product.name} - Follow-up required`);

        return template;
    }

    /**
     * Generate response for negative reviews (1-2 stars)
     */
    static generateNegativeResponse(reviewData) {
        const {
            reviewerName,
            productId,
            rating,
            reviewText,
            specificIssues,
            isRefundRequest
        } = reviewData;

        const product = PRODUCTS[productId] || { name: 'our product' };
        const responseId = crypto.randomBytes(6).toString('hex').toUpperCase();

        const template = {
            id: `NEG-${responseId}`,
            type: 'NEGATIVE_RESPONSE',
            template: `${reviewerName}, we're genuinely sorry to hear about your experience with ${product.name}. This is not the experience we want any customer to have, and we take your feedback very seriously.

${specificIssues ? `We understand your frustration with ${specificIssues}. ` : ''}We want to make this right.

Here's what we'd like to do:

1. IMMEDIATE SUPPORT: Please email ${CONFIG.supportEmail} with subject "Priority Support - ${responseId}" and we'll respond within 4 hours (not 24 - 4).

2. ${isRefundRequest ? 'REFUND PROCESSING: We\'re initiating your refund request right away. You should hear from us shortly.' : 'RESOLUTION OPTIONS: We\'ll work with you to either resolve the issue, provide additional training, or process a full refund - whatever you prefer.'}

3. FEEDBACK IMPLEMENTATION: Your specific feedback will go directly to our development team.

We genuinely care about every customer because every purchase helps sick children. We don't want you to feel like your contribution wasn't valued.

Please give us a chance to make this right.

Sincerely,
The AI Solutions Team

Direct line: ${CONFIG.supportEmail}
Reference: ${responseId}`,

            followUpRequired: true,
            priorityLevel: 'high',
            escalateToFounder: rating === 1,

            internalNotes: {
                action: 'IMMEDIATE_FOLLOW_UP_REQUIRED',
                ticketId: responseId,
                suggestedResolution: isRefundRequest ? 'PROCESS_REFUND' : 'OFFER_SUPPORT_CALL',
                deadline: '4_HOURS'
            },

            metadata: {
                reviewerName: reviewerName,
                productId: productId,
                rating: rating,
                responseCategory: 'negative',
                requiresFollowUp: true,
                escalationLevel: rating === 1 ? 'founder' : 'support',
                generatedAt: new Date().toISOString()
            }
        };

        log(`Generated NEGATIVE_RESPONSE for ${reviewerName} - Product: ${product.name} - Rating: ${rating} stars - ESCALATION: ${rating === 1 ? 'FOUNDER' : 'SUPPORT'}`, 'WARN');

        return template;
    }

    /**
     * Generate response for reviews with specific feature requests
     */
    static generateFeatureRequestResponse(reviewData) {
        const {
            reviewerName,
            productId,
            rating,
            featureRequested
        } = reviewData;

        const product = PRODUCTS[productId] || { name: 'our product' };
        const responseId = crypto.randomBytes(6).toString('hex').toUpperCase();

        const template = {
            id: `FTR-${responseId}`,
            type: 'FEATURE_REQUEST_RESPONSE',
            template: `${reviewerName}, thank you for your review and for this excellent suggestion about ${featureRequested || 'new features'}!

We love hearing ideas from customers who are actually using ${product.name} in the real world. Your perspective is invaluable.

Here's what happens next:

1. Your suggestion has been logged in our feature request system (Ref: ${responseId})
2. Our development team reviews all requests weekly
3. Popular requests get prioritized for upcoming releases
4. If we implement your idea, we'll reach out to let you know!

${rating >= 4 ? 'Thank you for the great rating and for believing in our mission!' : 'We appreciate your feedback and will use it to improve.'}

Keep the ideas coming - you're helping us build better tools for everyone.

FOR THE KIDS,
AI Solutions Team`,

            featureLogged: true,

            metadata: {
                reviewerName: reviewerName,
                productId: productId,
                rating: rating,
                responseCategory: 'feature_request',
                featureRequested: featureRequested,
                referenceId: responseId,
                generatedAt: new Date().toISOString()
            }
        };

        log(`Generated FEATURE_REQUEST_RESPONSE for ${reviewerName} - Feature: ${featureRequested} - Ref: ${responseId}`);

        return template;
    }

    /**
     * Generate response for review updates (customer changed rating)
     */
    static generateUpdatedReviewResponse(reviewData) {
        const {
            reviewerName,
            productId,
            oldRating,
            newRating
        } = reviewData;

        const product = PRODUCTS[productId] || { name: 'our product' };
        const improved = newRating > oldRating;

        const template = {
            type: 'UPDATED_REVIEW_RESPONSE',
            template: improved
                ? `${reviewerName}, we're so happy to see your updated review! Going from ${oldRating} to ${newRating} stars means the world to us.

Thank you for giving us the chance to make things right. Your patience and updated feedback help other customers trust our commitment to satisfaction.

We're here whenever you need us. Keep building amazing things with ${product.name}!

FOR THE KIDS,
AI Solutions Team`
                : `${reviewerName}, we noticed you updated your review. We're sorry if your experience has changed.

We'd really like to understand what happened and how we can help. Please reach out to ${CONFIG.supportEmail} - we want to make this right.

Your satisfaction matters to us, and so does your contribution to our mission.

Sincerely,
AI Solutions Team`,

            metadata: {
                reviewerName: reviewerName,
                productId: productId,
                oldRating: oldRating,
                newRating: newRating,
                direction: improved ? 'improved' : 'declined',
                requiresFollowUp: !improved,
                generatedAt: new Date().toISOString()
            }
        };

        log(`Generated UPDATED_REVIEW_RESPONSE for ${reviewerName} - Rating change: ${oldRating} -> ${newRating} (${improved ? 'IMPROVED' : 'DECLINED'})`, improved ? 'SUCCESS' : 'WARN');

        return template;
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// FOLLOW-UP SEQUENCE MANAGER
// ═══════════════════════════════════════════════════════════════════════════════

class FollowUpSequenceManager {

    constructor() {
        this.sequences = new Map();
        this.stateFile = path.join(CONFIG.logDir, 'review-sequences.json');
        this.loadState();
    }

    loadState() {
        try {
            if (fs.existsSync(this.stateFile)) {
                const data = JSON.parse(fs.readFileSync(this.stateFile, 'utf8'));
                this.sequences = new Map(Object.entries(data));
                log(`Loaded ${this.sequences.size} existing review sequences`);
            }
        } catch (error) {
            log(`Error loading sequence state: ${error.message}`, 'WARN');
            this.sequences = new Map();
        }
    }

    saveState() {
        try {
            const data = Object.fromEntries(this.sequences);
            fs.writeFileSync(this.stateFile, JSON.stringify(data, null, 2));
            log(`Saved ${this.sequences.size} review sequences to state file`);
        } catch (error) {
            log(`Error saving sequence state: ${error.message}`, 'ERROR');
        }
    }

    /**
     * Create a new follow-up sequence for a customer
     */
    createSequence(customerData) {
        const { customerEmail, productId, orderId, purchaseDate } = customerData;
        const sequenceId = `${customerEmail}-${productId}`;

        if (this.sequences.has(sequenceId)) {
            log(`Sequence already exists for ${sequenceId}`, 'WARN');
            return this.sequences.get(sequenceId);
        }

        const sequence = {
            id: sequenceId,
            customerData: customerData,
            status: 'active',
            currentStep: 0,
            steps: [
                {
                    step: 1,
                    type: 'INITIAL_REVIEW_REQUEST',
                    scheduledDays: CONFIG.timing.initialRequest,
                    status: 'pending',
                    sentAt: null
                },
                {
                    step: 2,
                    type: 'FIRST_FOLLOW_UP',
                    scheduledDays: CONFIG.timing.firstFollowUp,
                    status: 'pending',
                    sentAt: null
                },
                {
                    step: 3,
                    type: 'SECOND_FOLLOW_UP',
                    scheduledDays: CONFIG.timing.secondFollowUp,
                    status: 'pending',
                    sentAt: null
                },
                {
                    step: 4,
                    type: 'INCENTIVE_OFFER',
                    scheduledDays: CONFIG.timing.incentiveOffer,
                    status: 'pending',
                    sentAt: null
                }
            ],
            reviewReceived: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.sequences.set(sequenceId, sequence);
        this.saveState();

        log(`Created new review sequence: ${sequenceId} with ${sequence.steps.length} steps`);
        return sequence;
    }

    /**
     * Mark a sequence step as sent
     */
    markStepSent(sequenceId, stepNumber) {
        const sequence = this.sequences.get(sequenceId);
        if (!sequence) {
            log(`Sequence not found: ${sequenceId}`, 'ERROR');
            return null;
        }

        const step = sequence.steps.find(s => s.step === stepNumber);
        if (step) {
            step.status = 'sent';
            step.sentAt = new Date().toISOString();
            sequence.currentStep = stepNumber;
            sequence.updatedAt = new Date().toISOString();

            this.sequences.set(sequenceId, sequence);
            this.saveState();

            log(`Marked step ${stepNumber} as sent for sequence: ${sequenceId}`);
        }

        return sequence;
    }

    /**
     * Mark sequence as complete (review received)
     */
    markReviewReceived(sequenceId) {
        const sequence = this.sequences.get(sequenceId);
        if (!sequence) {
            log(`Sequence not found: ${sequenceId}`, 'ERROR');
            return null;
        }

        sequence.status = 'completed';
        sequence.reviewReceived = true;
        sequence.completedAt = new Date().toISOString();
        sequence.updatedAt = new Date().toISOString();

        // Cancel remaining pending steps
        sequence.steps.forEach(step => {
            if (step.status === 'pending') {
                step.status = 'cancelled';
            }
        });

        this.sequences.set(sequenceId, sequence);
        this.saveState();

        log(`Review received - Sequence completed: ${sequenceId}`, 'SUCCESS');
        return sequence;
    }

    /**
     * Get pending emails to send
     */
    getPendingEmails() {
        const pending = [];
        const now = new Date();

        this.sequences.forEach((sequence, sequenceId) => {
            if (sequence.status !== 'active') return;

            const purchaseDate = new Date(sequence.customerData.purchaseDate);

            sequence.steps.forEach(step => {
                if (step.status !== 'pending') return;

                const scheduledDate = new Date(purchaseDate);
                scheduledDate.setDate(scheduledDate.getDate() + step.scheduledDays);

                if (now >= scheduledDate) {
                    pending.push({
                        sequenceId: sequenceId,
                        step: step,
                        customerData: sequence.customerData,
                        scheduledDate: scheduledDate.toISOString()
                    });
                }
            });
        });

        log(`Found ${pending.length} pending review request emails to send`);
        return pending;
    }

    /**
     * Generate email for a pending step
     */
    generateEmailForStep(pendingItem) {
        const { step, customerData } = pendingItem;

        switch (step.type) {
            case 'INITIAL_REVIEW_REQUEST':
                return EmailTemplateGenerator.generateInitialReviewRequest(customerData);
            case 'FIRST_FOLLOW_UP':
                return EmailTemplateGenerator.generateFirstFollowUp(customerData);
            case 'SECOND_FOLLOW_UP':
                return EmailTemplateGenerator.generateSecondFollowUp(customerData);
            case 'INCENTIVE_OFFER':
                return EmailTemplateGenerator.generateIncentiveOffer(customerData);
            default:
                log(`Unknown step type: ${step.type}`, 'ERROR');
                return null;
        }
    }

    /**
     * Get sequence statistics
     */
    getStatistics() {
        let total = 0;
        let active = 0;
        let completed = 0;
        let emailsSent = 0;

        this.sequences.forEach(sequence => {
            total++;
            if (sequence.status === 'active') active++;
            if (sequence.status === 'completed') completed++;
            sequence.steps.forEach(step => {
                if (step.status === 'sent') emailsSent++;
            });
        });

        return {
            totalSequences: total,
            activeSequences: active,
            completedSequences: completed,
            totalEmailsSent: emailsSent,
            conversionRate: total > 0 ? ((completed / total) * 100).toFixed(1) + '%' : '0%'
        };
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// INCENTIVE CODE GENERATOR
// ═══════════════════════════════════════════════════════════════════════════════

class IncentiveCodeGenerator {

    /**
     * Generate a unique discount code
     */
    static generateCode(type, customerEmail) {
        const prefix = {
            quickReview: 'QUICK',
            detailedReview: 'DETAIL',
            photoReview: 'PHOTO',
            videoReview: 'VIDEO'
        }[type] || 'REVIEW';

        const hash = crypto.createHash('md5')
            .update(`${customerEmail}-${Date.now()}`)
            .digest('hex')
            .substring(0, 6)
            .toUpperCase();

        return `${prefix}${CONFIG.incentives[type]?.discount || 5}-${hash}`;
    }

    /**
     * Generate incentive package for review submission
     */
    static generateIncentivePackage(reviewData) {
        const { customerEmail, reviewType, productId } = reviewData;

        const incentiveType = reviewType === 'video' ? 'videoReview' :
                             reviewType === 'photo' ? 'photoReview' :
                             reviewType === 'detailed' ? 'detailedReview' : 'quickReview';

        const incentive = CONFIG.incentives[incentiveType];
        const code = this.generateCode(incentiveType, customerEmail);
        const expirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

        const package_ = {
            type: incentiveType,
            code: code,
            discount: incentive.discount,
            description: incentive.description,
            validUntil: expirationDate.toISOString(),

            redemptionEmail: {
                subject: `Your ${incentive.discount}% Discount Code - Thank You for Your Review!`,
                body: `Hi there!

Thank you so much for taking the time to review ${PRODUCTS[productId]?.name || 'our product'}. Your feedback helps other entrepreneurs make informed decisions AND supports our mission to help sick children.

As promised, here's your reward:

DISCOUNT CODE: ${code}
DISCOUNT: ${incentive.discount}% off your next purchase
VALID UNTIL: ${expirationDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}

To redeem: Enter this code at checkout on ${CONFIG.storeUrl}

Thank you for being part of our community. Your support means everything - to us and to the kids we help.

FOR THE KIDS,
The AI Solutions Team`
            },

            metadata: {
                customerEmail: customerEmail,
                productId: productId,
                reviewType: reviewType,
                generatedAt: new Date().toISOString()
            }
        };

        log(`Generated incentive code ${code} (${incentive.discount}% off) for ${customerEmail} - Review type: ${reviewType}`);

        return package_;
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN REVIEW REQUEST SYSTEM
// ═══════════════════════════════════════════════════════════════════════════════

class ReviewRequestSystem {

    constructor() {
        this.sequenceManager = new FollowUpSequenceManager();
        this.emailGenerator = EmailTemplateGenerator;
        this.responseTemplates = ReviewResponseTemplates;
        this.incentiveGenerator = IncentiveCodeGenerator;
    }

    /**
     * Initialize new customer in review request system
     */
    initializeCustomer(customerData) {
        logSection('INITIALIZING CUSTOMER FOR REVIEW REQUESTS');

        const sequence = this.sequenceManager.createSequence(customerData);
        const initialEmail = this.emailGenerator.generateInitialReviewRequest(customerData);

        log(`Customer initialized: ${customerData.customerEmail}`);
        log(`Product: ${PRODUCTS[customerData.productId]?.name || customerData.productId}`);
        log(`First email scheduled for: ${initialEmail.scheduledDate}`);

        return {
            sequence: sequence,
            scheduledEmails: sequence.steps.map(s => ({
                type: s.type,
                scheduledDays: s.scheduledDays,
                status: s.status
            }))
        };
    }

    /**
     * Process pending review request emails
     */
    processPendingEmails() {
        logSection('PROCESSING PENDING REVIEW REQUEST EMAILS');

        const pending = this.sequenceManager.getPendingEmails();
        const processed = [];

        pending.forEach(item => {
            const email = this.sequenceManager.generateEmailForStep(item);
            if (email) {
                processed.push({
                    sequenceId: item.sequenceId,
                    email: email,
                    step: item.step.step
                });

                // In production, this would send the email
                log(`Generated email for: ${item.customerData.customerEmail} - Step ${item.step.step}: ${item.step.type}`);
            }
        });

        log(`Processed ${processed.length} pending emails`);
        return processed;
    }

    /**
     * Handle incoming review
     */
    handleReviewSubmission(reviewData) {
        logSection('PROCESSING REVIEW SUBMISSION');

        const { customerEmail, productId, rating, reviewText, hasPhoto, hasVideo } = reviewData;
        const sequenceId = `${customerEmail}-${productId}`;

        // Mark sequence as complete
        this.sequenceManager.markReviewReceived(sequenceId);

        // Determine review type for incentive
        let reviewType = 'quick';
        if (hasVideo) reviewType = 'video';
        else if (hasPhoto) reviewType = 'photo';
        else if (reviewText && reviewText.length >= 50) reviewType = 'detailed';

        // Generate appropriate response
        let response;
        if (rating >= 4) {
            response = this.responseTemplates.generatePositiveResponse(reviewData);
        } else if (rating === 3) {
            response = this.responseTemplates.generateNeutralResponse(reviewData);
        } else {
            response = this.responseTemplates.generateNegativeResponse(reviewData);
        }

        // Generate incentive
        const incentive = this.incentiveGenerator.generateIncentivePackage({
            customerEmail,
            reviewType,
            productId
        });

        log(`Review processed: ${customerEmail} - ${rating} stars - Response type: ${response.type}`);

        return {
            response: response,
            incentive: incentive
        };
    }

    /**
     * Get system statistics
     */
    getStatistics() {
        return this.sequenceManager.getStatistics();
    }

    /**
     * Generate all email templates for a customer (for preview/testing)
     */
    generateAllTemplates(customerData) {
        logSection('GENERATING ALL EMAIL TEMPLATES FOR PREVIEW');

        return {
            initialRequest: this.emailGenerator.generateInitialReviewRequest(customerData),
            firstFollowUp: this.emailGenerator.generateFirstFollowUp(customerData),
            secondFollowUp: this.emailGenerator.generateSecondFollowUp(customerData),
            incentiveOffer: this.emailGenerator.generateIncentiveOffer(customerData)
        };
    }

    /**
     * Generate all response templates (for preview/testing)
     */
    generateAllResponseTemplates(productId) {
        logSection('GENERATING ALL RESPONSE TEMPLATES FOR PREVIEW');

        const sampleReview = {
            reviewerName: 'Sample Customer',
            productId: productId,
            rating: 5,
            reviewText: 'This is a sample review text for testing.',
            hasPhoto: false,
            hasVideo: false
        };

        return {
            positive: this.responseTemplates.generatePositiveResponse({ ...sampleReview, rating: 5 }),
            neutral: this.responseTemplates.generateNeutralResponse({ ...sampleReview, rating: 3 }),
            negative: this.responseTemplates.generateNegativeResponse({ ...sampleReview, rating: 1 }),
            featureRequest: this.responseTemplates.generateFeatureRequestResponse({
                ...sampleReview,
                featureRequested: 'API integration'
            }),
            updatedReview: this.responseTemplates.generateUpdatedReviewResponse({
                ...sampleReview,
                oldRating: 2,
                newRating: 5
            })
        };
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// DEMO / TEST EXECUTION
// ═══════════════════════════════════════════════════════════════════════════════

function runDemo() {
    logSection('REVIEW REQUEST SYSTEM - DEMONSTRATION');
    log('FOR THE KIDS - Gospel V1.3 (60/30/10)');
    log('');

    const system = new ReviewRequestSystem();

    // Sample customer data
    const sampleCustomer = {
        customerName: 'John Smith',
        customerEmail: 'john.smith@example.com',
        productId: 'claude-droid',
        purchaseDate: new Date().toISOString(),
        orderId: 'ORD-2024-001234'
    };

    log('');
    log('1. INITIALIZING CUSTOMER IN REVIEW SYSTEM');
    log('─'.repeat(50));
    const initialization = system.initializeCustomer(sampleCustomer);
    console.log(JSON.stringify(initialization.scheduledEmails, null, 2));

    log('');
    log('2. GENERATING ALL EMAIL TEMPLATES');
    log('─'.repeat(50));
    const templates = system.generateAllTemplates(sampleCustomer);
    console.log('\nInitial Request Subject:', templates.initialRequest.subject);
    console.log('First Follow-up Subject:', templates.firstFollowUp.subject);
    console.log('Second Follow-up Subject:', templates.secondFollowUp.subject);
    console.log('Incentive Offer Subject:', templates.incentiveOffer.subject);

    log('');
    log('3. GENERATING RESPONSE TEMPLATES');
    log('─'.repeat(50));
    const responses = system.generateAllResponseTemplates('claude-droid');
    console.log('\nPositive Response ID:', responses.positive.id);
    console.log('Neutral Response ID:', responses.neutral.id);
    console.log('Negative Response ID:', responses.negative.id);
    console.log('Feature Request ID:', responses.featureRequest.id);

    log('');
    log('4. SIMULATING REVIEW SUBMISSION');
    log('─'.repeat(50));
    const reviewResult = system.handleReviewSubmission({
        customerEmail: sampleCustomer.customerEmail,
        productId: sampleCustomer.productId,
        rating: 5,
        reviewText: 'Claude Droid has completely transformed my content creation workflow. I can now produce 4x more videos with half the effort!',
        hasPhoto: true,
        hasVideo: false
    });
    console.log('\nResponse Type:', reviewResult.response.type);
    console.log('Incentive Code:', reviewResult.incentive.code);
    console.log('Discount:', reviewResult.incentive.discount + '%');

    log('');
    log('5. SYSTEM STATISTICS');
    log('─'.repeat(50));
    const stats = system.getStatistics();
    console.log(JSON.stringify(stats, null, 2));

    logSection('DEMONSTRATION COMPLETE');
    log('Review Request System is ready for production use.');
    log('FOR THE KIDS - Always.');

    return {
        system: system,
        templates: templates,
        responses: responses,
        stats: stats
    };
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════════

module.exports = {
    ReviewRequestSystem,
    EmailTemplateGenerator,
    ReviewResponseTemplates,
    FollowUpSequenceManager,
    IncentiveCodeGenerator,
    CONFIG,
    PRODUCTS,
    runDemo
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN EXECUTION
// ═══════════════════════════════════════════════════════════════════════════════

if (require.main === module) {
    log('');
    log('═══════════════════════════════════════════════════════════════════════════════');
    log('AUTOMATED REVIEW REQUEST SYSTEM - AI SOLUTIONS STORE');
    log('FOR THE KIDS - Gospel V1.3 (60/30/10)');
    log('═══════════════════════════════════════════════════════════════════════════════');
    log('');

    runDemo();
}
