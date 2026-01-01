/**
 * ===============================================================================
 * CHATBOT CONVERSATION FLOWS - FOR THE KIDS
 * ===============================================================================
 *
 * Comprehensive chatbot automation system including:
 * 1. Website Chat Widget Responses
 * 2. FAQ Automation
 * 3. Lead Qualification Questions
 * 4. Sales Handoff Triggers
 * 5. Support Ticket Creation
 *
 * Mission: Helping families while maintaining transparency in every interaction.
 * Gospel V1.3 Ethics Override - 60/30/10 Split on All Revenue
 *
 * Created by Claude (Opus 4.5) - December 28, 2025
 * ===============================================================================
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// ═══════════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

const CONFIG = {
    // Log directories
    LOG_DIR: path.join(__dirname, '../../output/chatbot-flows'),
    CONVERSATION_LOG: 'conversations.json',
    TICKET_LOG: 'tickets.json',
    LEAD_LOG: 'leads.json',
    HANDOFF_LOG: 'sales-handoffs.json',
    HUMAN_LOG: 'chatbot-flows.log',

    // Business hours (EST)
    BUSINESS_HOURS: {
        start: 9,  // 9 AM
        end: 18,   // 6 PM
        timezone: 'America/New_York',
        days: [1, 2, 3, 4, 5]  // Monday-Friday
    },

    // Response timing
    TYPING_DELAY_MS: 1000,
    RESPONSE_DELAY_MS: 500,

    // Lead scoring thresholds
    LEAD_SCORING: {
        HOT: 80,      // Score >= 80: Immediate sales handoff
        WARM: 50,     // Score >= 50: Nurture sequence
        COLD: 0       // Score < 50: FAQ/Support mode
    },

    // Mission statement
    MISSION: 'FOR THE KIDS',
    GOSPEL_VERSION: '1.3.1'
};

// ═══════════════════════════════════════════════════════════════════════════════
// STATE MANAGEMENT
// ═══════════════════════════════════════════════════════════════════════════════

let state = {
    conversations: [],
    leads: [],
    tickets: [],
    handoffs: [],
    stats: {
        totalConversations: 0,
        totalLeads: 0,
        totalTickets: 0,
        totalHandoffs: 0,
        avgResponseTime: 0
    },
    startTime: new Date().toISOString()
};

// ═══════════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

function ensureDirectories() {
    if (!fs.existsSync(CONFIG.LOG_DIR)) {
        fs.mkdirSync(CONFIG.LOG_DIR, { recursive: true });
    }
}

function formatTimestamp(date = new Date()) {
    return date.toISOString();
}

function generateId(prefix = 'ID') {
    return `${prefix}_${Date.now()}_${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
}

function log(message, level = 'INFO') {
    const timestamp = formatTimestamp();
    const logLine = `[${timestamp}] [${level}] ${message}`;
    console.log(logLine);

    try {
        ensureDirectories();
        const logPath = path.join(CONFIG.LOG_DIR, CONFIG.HUMAN_LOG);
        fs.appendFileSync(logPath, logLine + '\n');
    } catch (e) {
        console.error('Failed to write log:', e.message);
    }
}

function isBusinessHours() {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();

    return CONFIG.BUSINESS_HOURS.days.includes(day) &&
           hour >= CONFIG.BUSINESS_HOURS.start &&
           hour < CONFIG.BUSINESS_HOURS.end;
}

function saveState() {
    try {
        ensureDirectories();

        fs.writeFileSync(
            path.join(CONFIG.LOG_DIR, CONFIG.CONVERSATION_LOG),
            JSON.stringify(state.conversations, null, 2)
        );
        fs.writeFileSync(
            path.join(CONFIG.LOG_DIR, CONFIG.LEAD_LOG),
            JSON.stringify(state.leads, null, 2)
        );
        fs.writeFileSync(
            path.join(CONFIG.LOG_DIR, CONFIG.TICKET_LOG),
            JSON.stringify(state.tickets, null, 2)
        );
        fs.writeFileSync(
            path.join(CONFIG.LOG_DIR, CONFIG.HANDOFF_LOG),
            JSON.stringify(state.handoffs, null, 2)
        );

        log('State saved successfully', 'INFO');
    } catch (e) {
        log(`Failed to save state: ${e.message}`, 'ERROR');
    }
}

function loadState() {
    try {
        const convPath = path.join(CONFIG.LOG_DIR, CONFIG.CONVERSATION_LOG);
        if (fs.existsSync(convPath)) {
            state.conversations = JSON.parse(fs.readFileSync(convPath, 'utf8'));
        }

        const leadPath = path.join(CONFIG.LOG_DIR, CONFIG.LEAD_LOG);
        if (fs.existsSync(leadPath)) {
            state.leads = JSON.parse(fs.readFileSync(leadPath, 'utf8'));
        }

        const ticketPath = path.join(CONFIG.LOG_DIR, CONFIG.TICKET_LOG);
        if (fs.existsSync(ticketPath)) {
            state.tickets = JSON.parse(fs.readFileSync(ticketPath, 'utf8'));
        }

        const handoffPath = path.join(CONFIG.LOG_DIR, CONFIG.HANDOFF_LOG);
        if (fs.existsSync(handoffPath)) {
            state.handoffs = JSON.parse(fs.readFileSync(handoffPath, 'utf8'));
        }

        log(`State loaded: ${state.conversations.length} conversations, ${state.leads.length} leads`, 'INFO');
    } catch (e) {
        log(`Failed to load state: ${e.message}`, 'WARN');
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. WEBSITE CHAT WIDGET RESPONSES
// ═══════════════════════════════════════════════════════════════════════════════

const WIDGET_RESPONSES = {
    // Welcome messages based on page context
    welcome: {
        home: {
            message: "Hi there! Welcome to AI Does It All - where technology helps kids in need. How can I help you today?",
            quickReplies: [
                "Tell me about your mission",
                "View AI solutions",
                "How does it work?",
                "Contact support"
            ]
        },
        products: {
            message: "Looking for the perfect AI solution? I can help you find exactly what you need. What are you interested in?",
            quickReplies: [
                "AI Content Writing",
                "AI Video Creation",
                "AI Business Assistant",
                "Custom AI Solutions"
            ]
        },
        pricing: {
            message: "Great! You're checking out our pricing. Every purchase helps children in need - 60% of net profits go directly to verified pediatric charities.",
            quickReplies: [
                "How does pricing work?",
                "What's included?",
                "Do you offer discounts?",
                "Talk to sales"
            ]
        },
        checkout: {
            message: "Almost there! Need help completing your order? I'm here to assist.",
            quickReplies: [
                "Payment options",
                "Shipping info",
                "Apply coupon code",
                "Speak to a human"
            ]
        },
        about: {
            message: "Welcome! Want to learn more about our mission to help kids through AI innovation?",
            quickReplies: [
                "Our story",
                "Meet the team",
                "Charity partners",
                "Impact report"
            ]
        }
    },

    // Proactive engagement triggers
    proactive: {
        timeOnPage: {
            threshold: 60000, // 60 seconds
            message: "I noticed you've been browsing for a bit. Can I help you find something specific?"
        },
        scrollDepth: {
            threshold: 75, // 75% scroll
            message: "Looks like you're really interested! Any questions I can answer?"
        },
        exitIntent: {
            message: "Wait! Before you go - do you have any questions? We're always here to help."
        },
        returningVisitor: {
            message: "Welcome back! Great to see you again. Anything I can help with today?"
        },
        cartAbandonment: {
            message: "I noticed you have items in your cart. Need any help completing your order? Remember - your purchase helps kids!"
        }
    },

    // Contextual responses
    contextual: {
        afterHours: {
            message: "Thanks for reaching out! Our team is currently offline, but I can help with common questions or create a support ticket for you.",
            quickReplies: [
                "Browse FAQs",
                "Leave a message",
                "Email support",
                "Schedule callback"
            ]
        },
        highTraffic: {
            message: "We're experiencing high volume right now. I'll do my best to help, but wait times for live support may be longer than usual.",
            quickReplies: [
                "I can wait",
                "Help me now (bot)",
                "Email me instead",
                "Schedule for later"
            ]
        },
        technicalIssue: {
            message: "I'm having some technical difficulties. Please try again in a moment, or email support@aidoesitall.website directly.",
            quickReplies: [
                "Try again",
                "Email support",
                "Call us"
            ]
        }
    },

    // Emotion-aware responses
    sentiment: {
        frustrated: {
            message: "I can sense this might be frustrating. Let me connect you with our best support agent right away.",
            action: 'escalate_immediately'
        },
        happy: {
            message: "I'm so glad to hear that! Is there anything else I can help you with today?",
            action: 'continue_conversation'
        },
        confused: {
            message: "No worries - let me break this down more simply. What specific part would you like me to explain?",
            action: 'simplify_response'
        },
        urgent: {
            message: "I understand this is urgent. Let me prioritize your request right away.",
            action: 'priority_escalation'
        }
    }
};

class ChatWidget {
    constructor(visitorId, pageContext = 'home') {
        this.conversationId = generateId('CONV');
        this.visitorId = visitorId;
        this.pageContext = pageContext;
        this.messages = [];
        this.startTime = formatTimestamp();
        this.leadScore = 0;
        this.metadata = {};
    }

    getWelcomeMessage() {
        const context = WIDGET_RESPONSES.welcome[this.pageContext] || WIDGET_RESPONSES.welcome.home;
        this.addBotMessage(context.message, context.quickReplies);
        return context;
    }

    addBotMessage(message, quickReplies = null) {
        const msg = {
            id: generateId('MSG'),
            type: 'bot',
            content: message,
            quickReplies: quickReplies,
            timestamp: formatTimestamp()
        };
        this.messages.push(msg);
        return msg;
    }

    addUserMessage(message) {
        const msg = {
            id: generateId('MSG'),
            type: 'user',
            content: message,
            timestamp: formatTimestamp()
        };
        this.messages.push(msg);
        return msg;
    }

    getProactiveMessage(trigger) {
        const proactive = WIDGET_RESPONSES.proactive[trigger];
        if (proactive) {
            this.addBotMessage(proactive.message);
            return proactive;
        }
        return null;
    }

    getSentimentResponse(sentiment) {
        const response = WIDGET_RESPONSES.sentiment[sentiment];
        if (response) {
            this.addBotMessage(response.message);
            return response;
        }
        return null;
    }

    toJSON() {
        return {
            conversationId: this.conversationId,
            visitorId: this.visitorId,
            pageContext: this.pageContext,
            messages: this.messages,
            startTime: this.startTime,
            leadScore: this.leadScore,
            metadata: this.metadata,
            mission: CONFIG.MISSION
        };
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 2. FAQ AUTOMATION
// ═══════════════════════════════════════════════════════════════════════════════

const FAQ_DATABASE = {
    // Mission & Company FAQs
    mission: [
        {
            id: 'faq_mission_001',
            keywords: ['mission', 'purpose', 'why', 'goal', 'about'],
            question: "What is AI Does It All's mission?",
            answer: "FOR THE KIDS! Our mission is to leverage AI technology to help families while dedicating 60% of all net profits to verified pediatric charities. Every purchase you make directly helps children in need.",
            category: 'mission',
            relatedFaqs: ['faq_mission_002', 'faq_mission_003']
        },
        {
            id: 'faq_mission_002',
            keywords: ['charity', 'donate', 'donation', 'give', 'nonprofit', 'non-profit', '60%'],
            question: "How much goes to charity?",
            answer: "60% of our net profits (after costs like production, shipping, and payment processing) go directly to verified pediatric charities. This is our Gospel commitment - it's immutable and transparent. You can track donations on our public dashboard.",
            category: 'mission',
            relatedFaqs: ['faq_mission_001', 'faq_mission_004']
        },
        {
            id: 'faq_mission_003',
            keywords: ['split', 'revenue', 'profit', '30%', '10%', 'gospel'],
            question: "How is revenue split?",
            answer: "We follow the Gospel V1.3 split: 60% to verified pediatric charities, 30% to infrastructure (keeping everything running), and 10% to the founder. This applies to NET profits after all costs are deducted.",
            category: 'mission',
            relatedFaqs: ['faq_mission_002']
        },
        {
            id: 'faq_mission_004',
            keywords: ['verify', 'verified', 'charities', 'which', 'partners'],
            question: "Which charities do you support?",
            answer: "We partner exclusively with verified 501(c)(3) pediatric charities. Current partners include children's hospitals, pediatric research foundations, and youth development organizations. Full list and verification documents available on our transparency page.",
            category: 'mission',
            relatedFaqs: ['faq_mission_002']
        }
    ],

    // Product FAQs
    products: [
        {
            id: 'faq_product_001',
            keywords: ['products', 'services', 'offer', 'sell', 'what do you'],
            question: "What products do you offer?",
            answer: "We offer a range of AI-powered solutions including: 1) AI Content Writing Tools, 2) AI Video Creation Suite, 3) AI Business Assistants, 4) Custom AI Solutions, and 5) AI Training & Consultation. All designed to make your life easier while helping kids!",
            category: 'products',
            relatedFaqs: ['faq_product_002', 'faq_product_003']
        },
        {
            id: 'faq_product_002',
            keywords: ['content', 'writing', 'blog', 'article', 'copy'],
            question: "Tell me about AI Content Writing",
            answer: "Our AI Content Writing tool helps you create blog posts, articles, social media content, and marketing copy in seconds. It learns your brand voice and produces high-quality content that engages your audience. Perfect for businesses of all sizes!",
            category: 'products',
            relatedFaqs: ['faq_product_001', 'faq_pricing_001']
        },
        {
            id: 'faq_product_003',
            keywords: ['video', 'creation', 'editing', 'youtube', 'tiktok'],
            question: "What about AI Video Creation?",
            answer: "Our AI Video Suite lets you create professional videos without any editing experience. Generate scripts, add AI voiceovers, create animations, and produce engaging content for YouTube, TikTok, Instagram, and more. It's video production made simple!",
            category: 'products',
            relatedFaqs: ['faq_product_001', 'faq_pricing_001']
        },
        {
            id: 'faq_product_004',
            keywords: ['custom', 'enterprise', 'business', 'solution', 'tailored'],
            question: "Do you offer custom AI solutions?",
            answer: "Absolutely! We create custom AI solutions tailored to your specific business needs. From chatbots to automation workflows, our team builds exactly what you need. Contact our sales team for a free consultation.",
            category: 'products',
            relatedFaqs: ['faq_product_001']
        }
    ],

    // Pricing FAQs
    pricing: [
        {
            id: 'faq_pricing_001',
            keywords: ['price', 'pricing', 'cost', 'how much', 'expensive', 'cheap', 'affordable'],
            question: "How much do your solutions cost?",
            answer: "Our pricing varies by product and plan. We offer: Starter plans from $29/month, Professional from $79/month, and Enterprise (custom pricing). Remember - every dollar you spend helps kids! Check our pricing page for current offers.",
            category: 'pricing',
            relatedFaqs: ['faq_pricing_002', 'faq_pricing_003']
        },
        {
            id: 'faq_pricing_002',
            keywords: ['discount', 'coupon', 'promo', 'code', 'sale', 'deal'],
            question: "Do you offer any discounts?",
            answer: "Yes! We offer: 1) Annual billing saves 20%, 2) Non-profit organizations get 25% off, 3) Students and educators get 30% off, 4) Affiliate discounts vary. Sign up for our newsletter for exclusive promo codes!",
            category: 'pricing',
            relatedFaqs: ['faq_pricing_001', 'faq_pricing_004']
        },
        {
            id: 'faq_pricing_003',
            keywords: ['free', 'trial', 'demo', 'test', 'try'],
            question: "Is there a free trial?",
            answer: "Yes! All our products come with a 14-day free trial. No credit card required to start. You can explore all features and see how AI can transform your workflow. Start your trial at aidoesitall.website!",
            category: 'pricing',
            relatedFaqs: ['faq_pricing_001']
        },
        {
            id: 'faq_pricing_004',
            keywords: ['refund', 'money back', 'cancel', 'guarantee', 'return'],
            question: "What's your refund policy?",
            answer: "We offer a 30-day money-back guarantee on all subscriptions. If you're not satisfied, we'll refund your payment - no questions asked. Annual plans are prorated. Contact support@aidoesitall.website to process refunds.",
            category: 'pricing',
            relatedFaqs: ['faq_pricing_001', 'faq_support_001']
        }
    ],

    // Technical/Support FAQs
    support: [
        {
            id: 'faq_support_001',
            keywords: ['help', 'support', 'contact', 'reach', 'talk'],
            question: "How do I contact support?",
            answer: "You can reach us via: 1) This chat (fastest!), 2) Email: support@aidoesitall.website, 3) Phone: Available during business hours, 4) Discord community for peer support. We typically respond within 2-4 hours during business hours.",
            category: 'support',
            relatedFaqs: ['faq_support_002']
        },
        {
            id: 'faq_support_002',
            keywords: ['hours', 'available', 'when', 'open', 'business'],
            question: "What are your support hours?",
            answer: "Our live support team is available Monday-Friday, 9 AM - 6 PM EST. Our chatbot is available 24/7 for common questions. Urgent issues outside business hours? Leave a message and we'll prioritize it first thing!",
            category: 'support',
            relatedFaqs: ['faq_support_001']
        },
        {
            id: 'faq_support_003',
            keywords: ['account', 'login', 'password', 'access', 'locked', 'reset'],
            question: "I can't access my account",
            answer: "No worries! Here's how to fix it: 1) Click 'Forgot Password' on the login page, 2) Check your email (and spam folder) for the reset link, 3) Create a new password. Still stuck? I can create a support ticket to have a human help you.",
            category: 'support',
            relatedFaqs: ['faq_support_001']
        },
        {
            id: 'faq_support_004',
            keywords: ['bug', 'error', 'broken', 'not working', 'issue', 'problem'],
            question: "Something's not working right",
            answer: "I'm sorry to hear that! Let me help: 1) Try refreshing the page, 2) Clear your browser cache, 3) Try a different browser. If the issue persists, I can create a priority support ticket with all the details for our tech team.",
            category: 'support',
            relatedFaqs: ['faq_support_001']
        }
    ],

    // Affiliate/Partner FAQs
    affiliate: [
        {
            id: 'faq_affiliate_001',
            keywords: ['affiliate', 'partner', 'commission', 'earn', 'refer', 'referral'],
            question: "Do you have an affiliate program?",
            answer: "Yes! Our affiliate program offers tiered commissions: Bronze (15%), Silver (20%), Gold (25%), and Platinum (30%). Share your unique link, earn on every sale, AND help kids at the same time. It's a win-win-win!",
            category: 'affiliate',
            relatedFaqs: ['faq_affiliate_002', 'faq_affiliate_003']
        },
        {
            id: 'faq_affiliate_002',
            keywords: ['join', 'sign up', 'register', 'become', 'start'],
            question: "How do I become an affiliate?",
            answer: "Easy! 1) Visit aidoesitall.website/affiliates, 2) Fill out the application (takes 2 minutes), 3) Get approved within 24-48 hours, 4) Start sharing and earning! You'll get your unique tracking link and marketing materials immediately.",
            category: 'affiliate',
            relatedFaqs: ['faq_affiliate_001']
        },
        {
            id: 'faq_affiliate_003',
            keywords: ['payout', 'pay', 'payment', 'when', 'receive'],
            question: "When do affiliates get paid?",
            answer: "Affiliate payouts are processed on the 1st and 15th of each month. Minimum payout is $50. We pay via PayPal, bank transfer, or crypto. You can track all your earnings in real-time through the affiliate dashboard.",
            category: 'affiliate',
            relatedFaqs: ['faq_affiliate_001']
        }
    ]
};

class FAQEngine {
    constructor() {
        this.allFaqs = [
            ...FAQ_DATABASE.mission,
            ...FAQ_DATABASE.products,
            ...FAQ_DATABASE.pricing,
            ...FAQ_DATABASE.support,
            ...FAQ_DATABASE.affiliate
        ];
        this.searchHistory = [];
    }

    findMatchingFAQs(query, maxResults = 3) {
        const queryLower = query.toLowerCase();
        const words = queryLower.split(/\s+/).filter(w => w.length > 2);

        const scored = this.allFaqs.map(faq => {
            let score = 0;

            // Keyword matching
            faq.keywords.forEach(keyword => {
                if (queryLower.includes(keyword)) {
                    score += 10;
                }
                words.forEach(word => {
                    if (keyword.includes(word) || word.includes(keyword)) {
                        score += 5;
                    }
                });
            });

            // Question similarity
            const questionLower = faq.question.toLowerCase();
            words.forEach(word => {
                if (questionLower.includes(word)) {
                    score += 3;
                }
            });

            return { faq, score };
        });

        const matches = scored
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, maxResults)
            .map(item => item.faq);

        // Log the search
        this.searchHistory.push({
            query: query,
            results: matches.length,
            timestamp: formatTimestamp()
        });

        return matches;
    }

    getFAQById(id) {
        return this.allFaqs.find(faq => faq.id === id);
    }

    getRelatedFAQs(faqId) {
        const faq = this.getFAQById(faqId);
        if (!faq || !faq.relatedFaqs) return [];

        return faq.relatedFaqs
            .map(id => this.getFAQById(id))
            .filter(Boolean);
    }

    getFAQsByCategory(category) {
        return FAQ_DATABASE[category] || [];
    }

    formatResponse(faq, includeRelated = true) {
        let response = faq.answer;

        if (includeRelated && faq.relatedFaqs && faq.relatedFaqs.length > 0) {
            const related = this.getRelatedFAQs(faq.id);
            if (related.length > 0) {
                response += "\n\nRelated questions you might find helpful:";
                related.forEach(r => {
                    response += `\n- ${r.question}`;
                });
            }
        }

        return response;
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 3. LEAD QUALIFICATION QUESTIONS
// ═══════════════════════════════════════════════════════════════════════════════

const LEAD_QUALIFICATION = {
    // Initial qualification flow
    initialQuestions: [
        {
            id: 'qual_intro',
            question: "Great! I'd love to learn more about you so I can point you in the right direction. Mind if I ask a few quick questions?",
            type: 'confirmation',
            options: ['Sure, let\'s go!', 'Maybe later'],
            scoreImpact: { yes: 5, no: -5 },
            nextOnYes: 'qual_role',
            nextOnNo: 'qual_declined'
        },
        {
            id: 'qual_role',
            question: "What best describes your role?",
            type: 'single_choice',
            options: [
                { label: 'Business Owner / Founder', value: 'owner', score: 15 },
                { label: 'Marketing / Sales', value: 'marketing', score: 12 },
                { label: 'Developer / Technical', value: 'developer', score: 10 },
                { label: 'Freelancer / Creator', value: 'freelancer', score: 8 },
                { label: 'Student / Learning', value: 'student', score: 3 },
                { label: 'Just Browsing', value: 'browsing', score: 0 }
            ],
            next: 'qual_company_size'
        },
        {
            id: 'qual_company_size',
            question: "How large is your organization?",
            type: 'single_choice',
            options: [
                { label: 'Enterprise (500+ employees)', value: 'enterprise', score: 20 },
                { label: 'Mid-Market (50-500 employees)', value: 'midmarket', score: 15 },
                { label: 'Small Business (10-50 employees)', value: 'small', score: 10 },
                { label: 'Startup (1-10 employees)', value: 'startup', score: 8 },
                { label: 'Solo / Individual', value: 'solo', score: 5 }
            ],
            next: 'qual_timeline'
        },
        {
            id: 'qual_timeline',
            question: "When are you looking to implement an AI solution?",
            type: 'single_choice',
            options: [
                { label: 'Immediately', value: 'immediate', score: 25 },
                { label: 'Within 1 month', value: '1month', score: 20 },
                { label: 'Within 3 months', value: '3months', score: 15 },
                { label: 'Within 6 months', value: '6months', score: 10 },
                { label: 'Just researching', value: 'research', score: 5 }
            ],
            next: 'qual_budget'
        },
        {
            id: 'qual_budget',
            question: "What's your monthly budget for AI tools?",
            type: 'single_choice',
            options: [
                { label: '$500+/month', value: 'high', score: 25 },
                { label: '$200-500/month', value: 'medium_high', score: 20 },
                { label: '$100-200/month', value: 'medium', score: 15 },
                { label: '$50-100/month', value: 'low_medium', score: 10 },
                { label: 'Under $50/month', value: 'low', score: 5 },
                { label: 'Not sure yet', value: 'unknown', score: 3 }
            ],
            next: 'qual_needs'
        },
        {
            id: 'qual_needs',
            question: "Which AI capabilities interest you most? (Select all that apply)",
            type: 'multi_choice',
            options: [
                { label: 'Content Writing', value: 'content', score: 5 },
                { label: 'Video Creation', value: 'video', score: 5 },
                { label: 'Customer Service Automation', value: 'support', score: 8 },
                { label: 'Sales Automation', value: 'sales', score: 10 },
                { label: 'Data Analysis', value: 'analytics', score: 8 },
                { label: 'Custom AI Development', value: 'custom', score: 15 }
            ],
            next: 'qual_contact'
        },
        {
            id: 'qual_contact',
            question: "Last question! What's the best email to reach you at?",
            type: 'email_input',
            validation: 'email',
            next: 'qual_complete'
        }
    ],

    // Qualification declined flow
    declinedFlow: {
        id: 'qual_declined',
        message: "No problem at all! Feel free to browse around. I'm here whenever you need help. And remember - every purchase helps kids in need!",
        action: 'continue_browsing'
    },

    // Completion messages based on score
    completionMessages: {
        hot: {
            threshold: CONFIG.LEAD_SCORING.HOT,
            message: "Excellent! Based on your needs, I think you'd be a great fit for our solutions. Let me connect you with one of our AI specialists who can give you a personalized demo and answer any questions. They'll reach out within the hour!",
            action: 'sales_handoff'
        },
        warm: {
            threshold: CONFIG.LEAD_SCORING.WARM,
            message: "Thanks for sharing! You'd be a great fit for our platform. I'm sending you some tailored resources and a special offer to your email. A member of our team will follow up to make sure you have everything you need.",
            action: 'nurture_sequence'
        },
        cold: {
            threshold: 0,
            message: "Thanks for the info! I've noted your interests. In the meantime, feel free to explore our solutions and check out our free resources. When you're ready to take the next step, we're here to help!",
            action: 'educational_nurture'
        }
    }
};

class LeadQualifier {
    constructor(conversationId, visitorId) {
        this.leadId = generateId('LEAD');
        this.conversationId = conversationId;
        this.visitorId = visitorId;
        this.currentQuestionIndex = 0;
        this.responses = [];
        this.score = 0;
        this.status = 'in_progress';
        this.startTime = formatTimestamp();
        this.completedTime = null;
        this.email = null;
        this.metadata = {};
    }

    getCurrentQuestion() {
        if (this.currentQuestionIndex >= LEAD_QUALIFICATION.initialQuestions.length) {
            return null;
        }
        return LEAD_QUALIFICATION.initialQuestions[this.currentQuestionIndex];
    }

    processResponse(response) {
        const question = this.getCurrentQuestion();
        if (!question) return null;

        let scoreAdded = 0;

        // Calculate score based on question type
        if (question.type === 'confirmation') {
            const isYes = response.toLowerCase().includes('sure') ||
                         response.toLowerCase().includes('yes') ||
                         response.toLowerCase().includes('let\'s');
            scoreAdded = isYes ? question.scoreImpact.yes : question.scoreImpact.no;

            if (!isYes) {
                this.status = 'declined';
                return LEAD_QUALIFICATION.declinedFlow;
            }
        } else if (question.type === 'single_choice') {
            const option = question.options.find(o =>
                o.label.toLowerCase() === response.toLowerCase() ||
                o.value === response
            );
            if (option) {
                scoreAdded = option.score;
                this.responses.push({
                    questionId: question.id,
                    response: option.value,
                    label: option.label,
                    score: option.score
                });
            }
        } else if (question.type === 'multi_choice') {
            // Handle multiple selections
            const selections = response.split(',').map(s => s.trim());
            selections.forEach(sel => {
                const option = question.options.find(o =>
                    o.label.toLowerCase() === sel.toLowerCase() ||
                    o.value === sel
                );
                if (option) {
                    scoreAdded += option.score;
                    this.responses.push({
                        questionId: question.id,
                        response: option.value,
                        label: option.label,
                        score: option.score
                    });
                }
            });
        } else if (question.type === 'email_input') {
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(response)) {
                this.email = response;
                this.responses.push({
                    questionId: question.id,
                    response: response,
                    score: 0
                });
            }
        }

        this.score += scoreAdded;
        this.currentQuestionIndex++;

        // Check if qualification is complete
        if (this.currentQuestionIndex >= LEAD_QUALIFICATION.initialQuestions.length) {
            return this.complete();
        }

        return this.getCurrentQuestion();
    }

    complete() {
        this.status = 'completed';
        this.completedTime = formatTimestamp();

        // Determine lead tier based on score
        let tier, completionMessage;
        if (this.score >= LEAD_QUALIFICATION.completionMessages.hot.threshold) {
            tier = 'hot';
            completionMessage = LEAD_QUALIFICATION.completionMessages.hot;
        } else if (this.score >= LEAD_QUALIFICATION.completionMessages.warm.threshold) {
            tier = 'warm';
            completionMessage = LEAD_QUALIFICATION.completionMessages.warm;
        } else {
            tier = 'cold';
            completionMessage = LEAD_QUALIFICATION.completionMessages.cold;
        }

        const result = {
            leadId: this.leadId,
            tier: tier,
            score: this.score,
            message: completionMessage.message,
            action: completionMessage.action,
            email: this.email,
            responses: this.responses
        };

        // Add to state
        state.leads.push(this.toJSON());
        log(`Lead qualified: ${this.leadId} - Tier: ${tier}, Score: ${this.score}`, 'LEAD');

        return result;
    }

    toJSON() {
        return {
            leadId: this.leadId,
            conversationId: this.conversationId,
            visitorId: this.visitorId,
            score: this.score,
            status: this.status,
            responses: this.responses,
            email: this.email,
            startTime: this.startTime,
            completedTime: this.completedTime,
            metadata: this.metadata,
            mission: CONFIG.MISSION
        };
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 4. SALES HANDOFF TRIGGERS
// ═══════════════════════════════════════════════════════════════════════════════

const SALES_HANDOFF = {
    // Trigger conditions for sales handoff
    triggers: {
        // Lead score threshold
        highLeadScore: {
            condition: (context) => context.leadScore >= CONFIG.LEAD_SCORING.HOT,
            priority: 'high',
            message: "Based on our conversation, I think you'd really benefit from speaking with one of our AI specialists. They can give you a personalized walkthrough and answer any specific questions. Can I connect you now?"
        },

        // Pricing page + specific keywords
        pricingIntent: {
            condition: (context) =>
                context.pageContext === 'pricing' &&
                context.keywords.some(k => ['enterprise', 'custom', 'quote', 'pricing'].includes(k)),
            priority: 'high',
            message: "I see you're looking at our pricing. For enterprise solutions, our sales team can put together a custom package that fits your exact needs. Would you like me to schedule a quick call?"
        },

        // Demo/trial request
        demoRequest: {
            condition: (context) =>
                context.keywords.some(k => ['demo', 'demonstration', 'show me', 'walkthrough'].includes(k)),
            priority: 'high',
            message: "A live demo is a great idea! Our product specialists love showing off what our AI can do. Let me set that up for you. What time works best?"
        },

        // Multiple product interest
        multiProductInterest: {
            condition: (context) => context.productsViewed && context.productsViewed.length >= 3,
            priority: 'medium',
            message: "I notice you're interested in several of our solutions! Our team can help you find the perfect combination and even offer bundle pricing. Want me to connect you?"
        },

        // Budget mentioned
        budgetMentioned: {
            condition: (context) =>
                context.keywords.some(k => ['budget', 'invest', 'spend', 'afford'].includes(k)) &&
                context.budget && context.budget.amount >= 200,
            priority: 'medium',
            message: "With that budget, you have some great options! Let me connect you with someone who can maximize the value you get. They'll also make sure you know about any volume discounts."
        },

        // Competitive comparison
        competitorMention: {
            condition: (context) =>
                context.keywords.some(k => ['compare', 'vs', 'versus', 'alternative', 'competitor'].includes(k)),
            priority: 'medium',
            message: "Great question about comparisons! Our sales team has detailed competitive analysis and can show you exactly how we stack up. Would you like to chat with them?"
        },

        // Urgency signals
        urgencySignal: {
            condition: (context) =>
                context.keywords.some(k => ['urgent', 'asap', 'immediately', 'right now', 'today'].includes(k)),
            priority: 'urgent',
            message: "I can see this is urgent! Let me get a sales specialist on the line right away. They can help you get started immediately."
        },

        // Enterprise keywords
        enterpriseSignal: {
            condition: (context) =>
                context.keywords.some(k => ['enterprise', 'team', 'company-wide', 'organization', 'department'].includes(k)),
            priority: 'high',
            message: "It sounds like you're looking for an enterprise solution! Our enterprise team specializes in company-wide deployments and can discuss volume licensing. Should I connect you?"
        },

        // Returning visitor with high engagement
        returningHighIntent: {
            condition: (context) =>
                context.isReturningVisitor &&
                context.previousVisits >= 3 &&
                context.timeOnSite > 300000, // 5 minutes
            priority: 'medium',
            message: "I've noticed you've been doing your research! Ready to take the next step? Our team can answer any remaining questions and help you get started."
        }
    },

    // Handoff process
    process: {
        gatherInfo: [
            {
                id: 'handoff_name',
                question: "Great! What's your name so I can introduce you properly?",
                type: 'text',
                required: true
            },
            {
                id: 'handoff_company',
                question: "And what company are you with?",
                type: 'text',
                required: false
            },
            {
                id: 'handoff_phone',
                question: "What's the best phone number to reach you?",
                type: 'phone',
                required: false,
                alternative: "Or if you prefer email, that works too!"
            },
            {
                id: 'handoff_time',
                question: "When's the best time to chat? Our team is available Monday-Friday, 9am-6pm EST.",
                type: 'datetime',
                required: true
            }
        ],

        // Handoff confirmation messages
        confirmations: {
            immediate: "Perfect! I'm connecting you with {agentName} right now. They'll be with you in just a moment. While you wait, they're reviewing your conversation so they're up to speed.",
            scheduled: "All set! {agentName} will call you on {date} at {time}. You'll also receive a calendar invite and reminder email. Is there anything else I can help with in the meantime?",
            noAvailability: "Unfortunately, our team is at capacity right now. I've added you to the priority queue and someone will reach out within {timeframe}. In the meantime, here are some resources that might help..."
        }
    },

    // Sales team data (would be dynamic in production)
    salesTeam: [
        { id: 'agent_001', name: 'Sarah', specialty: 'Enterprise', available: true },
        { id: 'agent_002', name: 'Michael', specialty: 'SMB', available: true },
        { id: 'agent_003', name: 'Emma', specialty: 'Technical', available: false },
        { id: 'agent_004', name: 'David', specialty: 'Partnerships', available: true }
    ]
};

class SalesHandoffManager {
    constructor() {
        this.activeHandoffs = [];
        this.queue = [];
    }

    checkTriggers(context) {
        const triggeredHandoffs = [];

        for (const [name, trigger] of Object.entries(SALES_HANDOFF.triggers)) {
            try {
                if (trigger.condition(context)) {
                    triggeredHandoffs.push({
                        trigger: name,
                        priority: trigger.priority,
                        message: trigger.message
                    });
                }
            } catch (e) {
                // Condition check failed, skip
            }
        }

        // Sort by priority
        const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
        triggeredHandoffs.sort((a, b) =>
            priorityOrder[a.priority] - priorityOrder[b.priority]
        );

        return triggeredHandoffs;
    }

    findAvailableAgent(specialty = null) {
        const available = SALES_HANDOFF.salesTeam.filter(agent => agent.available);

        if (specialty) {
            const specialist = available.find(a => a.specialty === specialty);
            if (specialist) return specialist;
        }

        return available[0] || null;
    }

    createHandoff(leadData, trigger, context) {
        const handoffId = generateId('HANDOFF');
        const agent = this.findAvailableAgent(leadData.specialty);

        const handoff = {
            id: handoffId,
            leadId: leadData.leadId,
            trigger: trigger,
            agent: agent,
            status: agent ? 'pending' : 'queued',
            priority: trigger.priority,
            context: {
                conversationId: context.conversationId,
                leadScore: context.leadScore,
                pageContext: context.pageContext,
                productsViewed: context.productsViewed
            },
            contactInfo: {
                name: leadData.name,
                email: leadData.email,
                phone: leadData.phone,
                company: leadData.company,
                preferredTime: leadData.preferredTime
            },
            createdAt: formatTimestamp(),
            notes: []
        };

        if (agent) {
            this.activeHandoffs.push(handoff);
        } else {
            this.queue.push(handoff);
        }

        state.handoffs.push(handoff);
        log(`Sales handoff created: ${handoffId} - Trigger: ${trigger.trigger}, Agent: ${agent?.name || 'Queued'}`, 'HANDOFF');

        return handoff;
    }

    getConfirmationMessage(handoff, type = 'immediate') {
        const template = SALES_HANDOFF.process.confirmations[type];

        return template
            .replace('{agentName}', handoff.agent?.name || 'a specialist')
            .replace('{date}', handoff.contactInfo.preferredTime?.date || 'soon')
            .replace('{time}', handoff.contactInfo.preferredTime?.time || '')
            .replace('{timeframe}', '1-2 business hours');
    }

    toJSON() {
        return {
            activeHandoffs: this.activeHandoffs,
            queue: this.queue,
            stats: {
                totalHandoffs: state.handoffs.length,
                activeCount: this.activeHandoffs.length,
                queuedCount: this.queue.length
            }
        };
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 5. SUPPORT TICKET CREATION
// ═══════════════════════════════════════════════════════════════════════════════

const SUPPORT_TICKET = {
    // Ticket categories
    categories: {
        technical: {
            id: 'technical',
            name: 'Technical Issue',
            description: 'Bugs, errors, or technical problems',
            priority: 'high',
            sla: { response: '2 hours', resolution: '24 hours' }
        },
        billing: {
            id: 'billing',
            name: 'Billing & Payments',
            description: 'Payment issues, invoices, refunds',
            priority: 'high',
            sla: { response: '4 hours', resolution: '48 hours' }
        },
        account: {
            id: 'account',
            name: 'Account Access',
            description: 'Login problems, password resets, account changes',
            priority: 'medium',
            sla: { response: '4 hours', resolution: '24 hours' }
        },
        feature: {
            id: 'feature',
            name: 'Feature Request',
            description: 'Suggestions for new features or improvements',
            priority: 'low',
            sla: { response: '24 hours', resolution: 'reviewed monthly' }
        },
        howto: {
            id: 'howto',
            name: 'How-To / Training',
            description: 'Help using features, tutorials, best practices',
            priority: 'low',
            sla: { response: '8 hours', resolution: '48 hours' }
        },
        other: {
            id: 'other',
            name: 'Other',
            description: 'General inquiries and other issues',
            priority: 'low',
            sla: { response: '8 hours', resolution: '72 hours' }
        }
    },

    // Ticket collection flow
    collectionFlow: [
        {
            id: 'ticket_category',
            question: "What type of issue are you experiencing?",
            type: 'single_choice',
            options: [
                { label: 'Technical Issue (bugs/errors)', value: 'technical' },
                { label: 'Billing & Payments', value: 'billing' },
                { label: 'Account Access', value: 'account' },
                { label: 'Feature Request', value: 'feature' },
                { label: 'How-To / Training', value: 'howto' },
                { label: 'Other', value: 'other' }
            ]
        },
        {
            id: 'ticket_subject',
            question: "Please give a brief title for your issue:",
            type: 'text',
            placeholder: "e.g., 'Can't export videos' or 'Invoice question'"
        },
        {
            id: 'ticket_description',
            question: "Now, please describe the issue in detail. The more info you provide, the faster we can help!",
            type: 'textarea',
            placeholder: "What happened? What did you expect? Any error messages?"
        },
        {
            id: 'ticket_reproduce',
            question: "Can you tell me the steps to reproduce this issue?",
            type: 'textarea',
            optional: true,
            skipMessage: "Skip if not applicable"
        },
        {
            id: 'ticket_urgency',
            question: "How urgent is this for you?",
            type: 'single_choice',
            options: [
                { label: 'Critical - Blocking my work', value: 'critical', priority_boost: 2 },
                { label: 'High - Need resolution soon', value: 'high', priority_boost: 1 },
                { label: 'Medium - Can work around it', value: 'medium', priority_boost: 0 },
                { label: 'Low - Just reporting', value: 'low', priority_boost: -1 }
            ]
        },
        {
            id: 'ticket_email',
            question: "What email should we use to update you on this ticket?",
            type: 'email'
        },
        {
            id: 'ticket_attachments',
            question: "Would you like to attach any screenshots or files?",
            type: 'file_upload',
            optional: true,
            skipMessage: "No attachments"
        }
    ],

    // Auto-responses for common issues
    autoResponses: {
        password_reset: {
            keywords: ['password', 'reset', 'forgot', 'login', 'locked out'],
            response: "I can help you reset your password right now! Click here to receive a reset link: [Reset Password]. If you don't receive the email within 5 minutes, check your spam folder.",
            resolves: true
        },
        payment_failed: {
            keywords: ['payment', 'failed', 'declined', 'card', 'rejected'],
            response: "Payment issues can usually be resolved by: 1) Checking your card details, 2) Ensuring sufficient funds, 3) Contacting your bank. Would you like me to try the payment again or create a ticket for our billing team?",
            resolves: false
        },
        slow_performance: {
            keywords: ['slow', 'loading', 'performance', 'laggy', 'freeze'],
            response: "Let's try some quick fixes: 1) Clear your browser cache, 2) Try a different browser, 3) Check your internet connection. If it's still slow, I'll create a priority ticket for our tech team.",
            resolves: false
        },
        feature_missing: {
            keywords: ['missing', 'feature', 'where is', 'can\'t find', 'how do i'],
            response: "Let me help you find that! Which feature are you looking for? I can guide you through the interface or check if it's available on your plan.",
            resolves: false
        }
    },

    // Priority levels
    priorityLevels: {
        critical: { value: 4, label: 'Critical', color: '#EF4444', slaMultiplier: 0.5 },
        high: { value: 3, label: 'High', color: '#F59E0B', slaMultiplier: 0.75 },
        medium: { value: 2, label: 'Medium', color: '#3B82F6', slaMultiplier: 1 },
        low: { value: 1, label: 'Low', color: '#6B7280', slaMultiplier: 1.5 }
    },

    // Status values
    statuses: {
        new: { label: 'New', description: 'Just created, awaiting triage' },
        open: { label: 'Open', description: 'Being reviewed by support' },
        pending: { label: 'Pending', description: 'Waiting for customer response' },
        in_progress: { label: 'In Progress', description: 'Actively being worked on' },
        resolved: { label: 'Resolved', description: 'Issue has been resolved' },
        closed: { label: 'Closed', description: 'Ticket closed' }
    }
};

class TicketManager {
    constructor() {
        this.tickets = [];
        this.currentTicketFlow = null;
    }

    checkAutoResponse(message) {
        const messageLower = message.toLowerCase();

        for (const [key, autoResp] of Object.entries(SUPPORT_TICKET.autoResponses)) {
            const matchCount = autoResp.keywords.filter(kw =>
                messageLower.includes(kw)
            ).length;

            if (matchCount >= 2) {
                return {
                    type: key,
                    response: autoResp.response,
                    resolves: autoResp.resolves
                };
            }
        }

        return null;
    }

    startTicketCreation(conversationId, visitorId) {
        this.currentTicketFlow = {
            ticketId: generateId('TICKET'),
            conversationId: conversationId,
            visitorId: visitorId,
            currentStep: 0,
            data: {},
            startTime: formatTimestamp()
        };

        return this.getCurrentQuestion();
    }

    getCurrentQuestion() {
        if (!this.currentTicketFlow) return null;
        if (this.currentTicketFlow.currentStep >= SUPPORT_TICKET.collectionFlow.length) {
            return null;
        }
        return SUPPORT_TICKET.collectionFlow[this.currentTicketFlow.currentStep];
    }

    processResponse(response) {
        if (!this.currentTicketFlow) return null;

        const question = this.getCurrentQuestion();
        if (!question) return this.completeTicket();

        // Store response
        this.currentTicketFlow.data[question.id] = response;
        this.currentTicketFlow.currentStep++;

        // Check if complete
        if (this.currentTicketFlow.currentStep >= SUPPORT_TICKET.collectionFlow.length) {
            return this.completeTicket();
        }

        return this.getCurrentQuestion();
    }

    skipCurrentQuestion() {
        if (!this.currentTicketFlow) return null;

        const question = this.getCurrentQuestion();
        if (question && question.optional) {
            this.currentTicketFlow.data[question.id] = null;
            this.currentTicketFlow.currentStep++;
        }

        return this.getCurrentQuestion();
    }

    completeTicket() {
        const flow = this.currentTicketFlow;
        if (!flow) return null;

        // Get category details
        const categoryId = flow.data.ticket_category || 'other';
        const category = SUPPORT_TICKET.categories[categoryId];

        // Calculate priority
        let basePriority = category.priority;
        const urgency = flow.data.ticket_urgency || 'medium';
        const priorityBoost = SUPPORT_TICKET.collectionFlow
            .find(q => q.id === 'ticket_urgency')
            ?.options.find(o => o.value === urgency)?.priority_boost || 0;

        const priorityMap = { 'critical': 4, 'high': 3, 'medium': 2, 'low': 1 };
        let priorityValue = (priorityMap[basePriority] || 2) + priorityBoost;
        priorityValue = Math.max(1, Math.min(4, priorityValue));
        const finalPriority = Object.entries(priorityMap).find(([k, v]) => v === priorityValue)?.[0] || 'medium';

        // Create ticket
        const ticket = {
            id: flow.ticketId,
            conversationId: flow.conversationId,
            visitorId: flow.visitorId,
            category: category,
            subject: flow.data.ticket_subject || 'Support Request',
            description: flow.data.ticket_description || '',
            stepsToReproduce: flow.data.ticket_reproduce || null,
            urgency: urgency,
            priority: finalPriority,
            priorityDetails: SUPPORT_TICKET.priorityLevels[finalPriority],
            status: 'new',
            email: flow.data.ticket_email,
            attachments: flow.data.ticket_attachments || [],
            sla: {
                response: category.sla.response,
                resolution: category.sla.resolution
            },
            createdAt: flow.startTime,
            updatedAt: formatTimestamp(),
            assignedTo: null,
            resolution: null,
            mission: CONFIG.MISSION
        };

        this.tickets.push(ticket);
        state.tickets.push(ticket);
        this.currentTicketFlow = null;

        log(`Ticket created: ${ticket.id} - Category: ${categoryId}, Priority: ${finalPriority}`, 'TICKET');

        return {
            ticket: ticket,
            message: this.getConfirmationMessage(ticket)
        };
    }

    getConfirmationMessage(ticket) {
        return `I've created support ticket #${ticket.id.slice(-8)} for you.

Here's what happens next:
- Our support team will respond within ${ticket.sla.response}
- You'll receive updates at ${ticket.email}
- Expected resolution: ${ticket.sla.resolution}

Ticket Summary:
- Subject: ${ticket.subject}
- Category: ${ticket.category.name}
- Priority: ${ticket.priorityDetails.label}

Is there anything else I can help you with while you wait? And remember - FOR THE KIDS - we appreciate your patience!`;
    }

    getTicketById(ticketId) {
        return this.tickets.find(t => t.id === ticketId) ||
               state.tickets.find(t => t.id === ticketId);
    }

    updateTicketStatus(ticketId, newStatus, notes = '') {
        const ticket = this.getTicketById(ticketId);
        if (!ticket) return null;

        ticket.status = newStatus;
        ticket.updatedAt = formatTimestamp();
        if (notes) {
            ticket.notes = ticket.notes || [];
            ticket.notes.push({
                timestamp: formatTimestamp(),
                content: notes
            });
        }

        saveState();
        log(`Ticket updated: ${ticketId} - Status: ${newStatus}`, 'TICKET');

        return ticket;
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN CHATBOT FLOW CONTROLLER
// ═══════════════════════════════════════════════════════════════════════════════

class ChatbotFlowController {
    constructor() {
        this.faqEngine = new FAQEngine();
        this.salesHandoffManager = new SalesHandoffManager();
        this.ticketManager = new TicketManager();
        this.activeConversations = new Map();
    }

    startConversation(visitorId, pageContext = 'home') {
        const widget = new ChatWidget(visitorId, pageContext);
        this.activeConversations.set(widget.conversationId, {
            widget: widget,
            leadQualifier: null,
            mode: 'chat' // chat, qualification, ticket_creation
        });

        state.conversations.push(widget.toJSON());
        log(`Conversation started: ${widget.conversationId} - Page: ${pageContext}`, 'CONVERSATION');

        return {
            conversationId: widget.conversationId,
            welcome: widget.getWelcomeMessage()
        };
    }

    processMessage(conversationId, message) {
        const conversation = this.activeConversations.get(conversationId);
        if (!conversation) {
            return { error: 'Conversation not found' };
        }

        const { widget, leadQualifier, mode } = conversation;
        widget.addUserMessage(message);

        let response;

        // Route based on current mode
        switch (mode) {
            case 'qualification':
                response = this.handleQualificationMode(conversation, message);
                break;
            case 'ticket_creation':
                response = this.handleTicketMode(conversation, message);
                break;
            default:
                response = this.handleChatMode(conversation, message);
        }

        // Update conversation in state
        this.updateConversationState(conversationId, widget);

        return response;
    }

    handleChatMode(conversation, message) {
        const { widget } = conversation;
        const messageLower = message.toLowerCase();

        // Check for ticket creation intent
        if (this.detectTicketIntent(messageLower)) {
            return this.startTicketFlow(conversation);
        }

        // Check for qualification trigger
        if (this.detectQualificationTrigger(messageLower)) {
            return this.startQualificationFlow(conversation);
        }

        // Check for sales handoff triggers
        const handoffTriggers = this.salesHandoffManager.checkTriggers({
            leadScore: widget.leadScore,
            pageContext: widget.pageContext,
            keywords: messageLower.split(/\s+/),
            productsViewed: widget.metadata.productsViewed || []
        });

        if (handoffTriggers.length > 0 && handoffTriggers[0].priority === 'urgent') {
            const trigger = handoffTriggers[0];
            widget.addBotMessage(trigger.message);
            return {
                type: 'handoff_trigger',
                trigger: trigger,
                message: trigger.message
            };
        }

        // Check FAQ
        const faqMatches = this.faqEngine.findMatchingFAQs(message);
        if (faqMatches.length > 0) {
            const bestMatch = faqMatches[0];
            const response = this.faqEngine.formatResponse(bestMatch);
            widget.addBotMessage(response);

            // Update lead score based on FAQ category
            if (bestMatch.category === 'pricing' || bestMatch.category === 'products') {
                widget.leadScore += 5;
            }

            return {
                type: 'faq_response',
                faq: bestMatch,
                message: response,
                relatedFaqs: faqMatches.slice(1)
            };
        }

        // Check for auto-response patterns
        const autoResponse = this.ticketManager.checkAutoResponse(message);
        if (autoResponse) {
            widget.addBotMessage(autoResponse.response);
            return {
                type: 'auto_response',
                responseType: autoResponse.type,
                message: autoResponse.response,
                resolves: autoResponse.resolves
            };
        }

        // Default response
        const defaultResponse = this.getDefaultResponse(message);
        widget.addBotMessage(defaultResponse.message, defaultResponse.quickReplies);

        return {
            type: 'default',
            message: defaultResponse.message,
            quickReplies: defaultResponse.quickReplies
        };
    }

    handleQualificationMode(conversation, message) {
        const { leadQualifier, widget } = conversation;

        const result = leadQualifier.processResponse(message);

        if (result.leadId) {
            // Qualification complete
            conversation.mode = 'chat';
            widget.leadScore = result.score;
            widget.addBotMessage(result.message);

            // Check for sales handoff
            if (result.action === 'sales_handoff') {
                const handoff = this.salesHandoffManager.createHandoff(
                    { leadId: result.leadId, email: result.email },
                    { trigger: 'lead_qualification', priority: 'high' },
                    { conversationId: widget.conversationId, leadScore: result.score }
                );

                return {
                    type: 'qualification_complete_handoff',
                    lead: result,
                    handoff: handoff,
                    message: result.message
                };
            }

            return {
                type: 'qualification_complete',
                lead: result,
                message: result.message
            };
        } else if (result.action === 'continue_browsing') {
            // Qualification declined
            conversation.mode = 'chat';
            widget.addBotMessage(result.message);
            return {
                type: 'qualification_declined',
                message: result.message
            };
        } else {
            // Next question
            widget.addBotMessage(result.question, result.options?.map(o => o.label));
            return {
                type: 'qualification_question',
                question: result,
                message: result.question
            };
        }
    }

    handleTicketMode(conversation, message) {
        const { widget } = conversation;

        // Check for skip
        if (message.toLowerCase() === 'skip') {
            const nextQuestion = this.ticketManager.skipCurrentQuestion();
            if (!nextQuestion) {
                const result = this.ticketManager.completeTicket();
                conversation.mode = 'chat';
                widget.addBotMessage(result.message);
                return {
                    type: 'ticket_created',
                    ticket: result.ticket,
                    message: result.message
                };
            }
            widget.addBotMessage(nextQuestion.question, nextQuestion.options?.map(o => o.label));
            return {
                type: 'ticket_question',
                question: nextQuestion,
                message: nextQuestion.question
            };
        }

        const result = this.ticketManager.processResponse(message);

        if (result.ticket) {
            // Ticket creation complete
            conversation.mode = 'chat';
            widget.addBotMessage(result.message);
            return {
                type: 'ticket_created',
                ticket: result.ticket,
                message: result.message
            };
        } else {
            // Next question
            widget.addBotMessage(result.question, result.options?.map(o => o.label));
            return {
                type: 'ticket_question',
                question: result,
                message: result.question
            };
        }
    }

    startQualificationFlow(conversation) {
        const { widget } = conversation;

        const leadQualifier = new LeadQualifier(widget.conversationId, widget.visitorId);
        conversation.leadQualifier = leadQualifier;
        conversation.mode = 'qualification';

        const firstQuestion = leadQualifier.getCurrentQuestion();
        widget.addBotMessage(firstQuestion.question, firstQuestion.options);

        return {
            type: 'qualification_started',
            question: firstQuestion,
            message: firstQuestion.question
        };
    }

    startTicketFlow(conversation) {
        const { widget } = conversation;

        this.ticketManager.startTicketCreation(widget.conversationId, widget.visitorId);
        conversation.mode = 'ticket_creation';

        const introMessage = "I'm sorry you're having an issue. Let me create a support ticket so our team can help. I just need a few details.";
        const firstQuestion = this.ticketManager.getCurrentQuestion();

        widget.addBotMessage(introMessage);
        widget.addBotMessage(firstQuestion.question, firstQuestion.options?.map(o => o.label));

        return {
            type: 'ticket_started',
            question: firstQuestion,
            messages: [introMessage, firstQuestion.question]
        };
    }

    detectTicketIntent(message) {
        const ticketKeywords = ['ticket', 'support', 'help me', 'problem', 'issue', 'not working', 'bug', 'error', 'broken'];
        return ticketKeywords.some(kw => message.includes(kw));
    }

    detectQualificationTrigger(message) {
        const qualifyKeywords = ['interested', 'pricing', 'demo', 'quote', 'learn more', 'get started', 'sign up', 'trial'];
        return qualifyKeywords.some(kw => message.includes(kw));
    }

    getDefaultResponse(message) {
        const responses = [
            {
                message: "I'm not quite sure I understood that. Could you rephrase, or would you like to explore one of these options?",
                quickReplies: ['View FAQ', 'Talk to support', 'Browse products', 'Learn about our mission']
            },
            {
                message: "Hmm, I want to make sure I help you properly. What specifically can I help you with today?",
                quickReplies: ['Product questions', 'Pricing info', 'Technical support', 'Our charity mission']
            }
        ];

        return responses[Math.floor(Math.random() * responses.length)];
    }

    updateConversationState(conversationId, widget) {
        const index = state.conversations.findIndex(c => c.conversationId === conversationId);
        if (index >= 0) {
            state.conversations[index] = widget.toJSON();
        }
        saveState();
    }

    endConversation(conversationId) {
        const conversation = this.activeConversations.get(conversationId);
        if (!conversation) return null;

        conversation.widget.metadata.endTime = formatTimestamp();
        this.updateConversationState(conversationId, conversation.widget);
        this.activeConversations.delete(conversationId);

        log(`Conversation ended: ${conversationId}`, 'CONVERSATION');

        return { success: true, conversationId };
    }

    getStats() {
        return {
            activeConversations: this.activeConversations.size,
            totalConversations: state.conversations.length,
            totalLeads: state.leads.length,
            totalTickets: state.tickets.length,
            totalHandoffs: state.handoffs.length,
            faqSearches: this.faqEngine.searchHistory.length,
            uptime: new Date() - new Date(state.startTime)
        };
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// INITIALIZATION & EXPORTS
// ═══════════════════════════════════════════════════════════════════════════════

function initialize() {
    ensureDirectories();
    loadState();
    log('Chatbot flows initialized', 'INFO');
    log(`Mission: ${CONFIG.MISSION} | Gospel Version: ${CONFIG.GOSPEL_VERSION}`, 'INFO');
}

function printBanner() {
    console.log('');
    console.log('='.repeat(80));
    console.log('  CHATBOT CONVERSATION FLOWS');
    console.log('  FOR THE KIDS - Automated Customer Engagement');
    console.log('='.repeat(80));
    console.log('');
    console.log('  Modules:');
    console.log('  1. Website Chat Widget Responses');
    console.log('  2. FAQ Automation');
    console.log('  3. Lead Qualification Questions');
    console.log('  4. Sales Handoff Triggers');
    console.log('  5. Support Ticket Creation');
    console.log('');
    console.log('  Log Directory:', CONFIG.LOG_DIR);
    console.log('');
    console.log('='.repeat(80));
    console.log('');
}

// Main entry point
if (require.main === module) {
    printBanner();
    initialize();

    // Demo run
    console.log('\n--- Running Demo Conversation ---\n');

    const controller = new ChatbotFlowController();

    // Start conversation
    const conv = controller.startConversation('visitor_demo', 'home');
    console.log('Welcome:', conv.welcome.message);
    console.log('Quick Replies:', conv.welcome.quickReplies);

    // Test FAQ
    console.log('\n--- Testing FAQ ---');
    const faqResponse = controller.processMessage(conv.conversationId, 'How much goes to charity?');
    console.log('Response:', faqResponse.message);

    // Test ticket creation
    console.log('\n--- Testing Ticket Flow ---');
    const ticketStart = controller.processMessage(conv.conversationId, 'I have a problem that needs help');
    console.log('Ticket Start:', ticketStart.messages || ticketStart.message);

    // Print stats
    console.log('\n--- Stats ---');
    console.log(controller.getStats());

    saveState();
    console.log('\n--- Demo Complete ---\n');
}

// Exports
module.exports = {
    // Configuration
    CONFIG,
    WIDGET_RESPONSES,
    FAQ_DATABASE,
    LEAD_QUALIFICATION,
    SALES_HANDOFF,
    SUPPORT_TICKET,

    // Classes
    ChatWidget,
    FAQEngine,
    LeadQualifier,
    SalesHandoffManager,
    TicketManager,
    ChatbotFlowController,

    // Functions
    initialize,
    saveState,
    loadState,
    ensureDirectories,
    log,
    generateId,
    isBusinessHours,

    // State
    getState: () => state
};
