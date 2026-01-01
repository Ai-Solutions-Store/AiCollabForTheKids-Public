/**
 * Customer Support Response Templates
 * FOR THE KIDS - AI Collaboration Platform
 *
 * Professional and warm support templates for customer interactions
 * Generated: 2025-12-28
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
    companyName: 'FOR THE KIDS',
    supportEmail: 'support@forthekids.ai',
    billingEmail: 'billing@forthekids.ai',
    websiteUrl: 'https://forthekids.ai',
    responseTimeHours: 24,
    refundPolicyDays: 30,
    logDir: path.join(__dirname, '..', '..', 'logs', 'support-templates')
};

// ============================================================================
// 1. FAQ RESPONSES
// ============================================================================

const FAQ_RESPONSES = {
    // Account & Getting Started
    accountCreation: {
        subject: 'Welcome to FOR THE KIDS - Account Setup Guide',
        template: `Hi {{customerName}},

Thank you for reaching out! We're thrilled to have you join the FOR THE KIDS family.

Creating your account is simple:
1. Visit {{websiteUrl}}/signup
2. Enter your email address and create a secure password
3. Verify your email through the confirmation link we'll send
4. Complete your profile to personalize your experience

Once you're set up, you'll have access to all our AI collaboration tools designed to make a positive impact.

If you run into any snags along the way, just reply to this email - we're here to help!

Warmly,
The FOR THE KIDS Support Team`
    },

    passwordReset: {
        subject: 'Password Reset Instructions',
        template: `Hi {{customerName}},

No worries - we've all been there! Here's how to reset your password:

1. Go to {{websiteUrl}}/reset-password
2. Enter the email address associated with your account
3. Check your inbox (and spam folder, just in case) for the reset link
4. Click the link and create your new password

For security, the reset link expires in 24 hours. If it expires before you use it, simply request a new one.

Pro tip: Consider using a password manager to keep your credentials safe and accessible!

Here to help,
The FOR THE KIDS Support Team`
    },

    pricingPlans: {
        subject: 'Our Pricing Plans Explained',
        template: `Hi {{customerName}},

Great question! Here's a quick overview of our plans:

**Starter Plan** - Perfect for individuals
- Access to core AI collaboration features
- Up to 100 monthly interactions
- Email support

**Team Plan** - Ideal for small teams
- Everything in Starter, plus:
- Unlimited team members
- Priority support
- Advanced analytics

**Enterprise Plan** - For larger organizations
- Custom solutions tailored to your needs
- Dedicated account manager
- SLA guarantees
- Custom integrations

You can view full details and compare plans at {{websiteUrl}}/pricing

Want a personalized recommendation? Just tell us a bit about your needs, and we'll point you in the right direction!

Best,
The FOR THE KIDS Support Team`
    },

    dataPrivacy: {
        subject: 'Your Data Privacy Questions Answered',
        template: `Hi {{customerName}},

We take your privacy seriously - it's fundamental to everything we do at FOR THE KIDS.

Here's what you should know:
- **Data Encryption**: All data is encrypted in transit and at rest
- **No Selling Data**: We never sell your personal information to third parties
- **GDPR Compliant**: We follow strict data protection regulations
- **Data Control**: You can export or delete your data at any time
- **Transparency**: Our full privacy policy is at {{websiteUrl}}/privacy

If you have specific questions about how we handle your data, please don't hesitate to ask. We believe you deserve complete clarity.

With care,
The FOR THE KIDS Support Team`
    },

    integrations: {
        subject: 'Available Integrations & Setup',
        template: `Hi {{customerName}},

Excellent question! FOR THE KIDS integrates seamlessly with many popular tools:

**Currently Supported:**
- Slack
- Microsoft Teams
- Google Workspace
- Notion
- Zapier (connecting to 5000+ apps)
- API access for custom integrations

**Setting Up Integrations:**
1. Navigate to Settings > Integrations in your dashboard
2. Select the integration you want to enable
3. Follow the authorization prompts
4. Configure your preferences

Need help with a specific integration? Let us know which one, and we'll provide step-by-step guidance!

Cheers,
The FOR THE KIDS Support Team`
    }
};

// ============================================================================
// 2. REFUND HANDLING
// ============================================================================

const REFUND_RESPONSES = {
    refundApproved: {
        subject: 'Your Refund Has Been Approved',
        template: `Hi {{customerName}},

Good news! We've approved your refund request.

**Refund Details:**
- Amount: {{refundAmount}}
- Original Transaction: {{transactionId}}
- Refund Method: {{paymentMethod}}
- Expected Processing Time: 5-10 business days

The funds will be returned to the original payment method. Please note that your bank may take additional time to reflect this credit.

We're sorry to see you go. If there's anything we could have done differently, we'd genuinely love to hear your feedback - it helps us improve for everyone.

Thank you for giving FOR THE KIDS a try. Our door is always open if you'd like to return!

Take care,
The FOR THE KIDS Support Team`
    },

    refundPending: {
        subject: 'Your Refund Request is Being Reviewed',
        template: `Hi {{customerName}},

Thank you for contacting us about your refund request. We've received your request and wanted to let you know it's being reviewed.

**Request Details:**
- Request Date: {{requestDate}}
- Order/Transaction: {{transactionId}}
- Reason Provided: {{refundReason}}

Our team typically processes refund requests within 2-3 business days. We'll email you as soon as we have an update.

If you have any additional information to share, just reply to this email.

Thank you for your patience,
The FOR THE KIDS Support Team`
    },

    refundDenied: {
        subject: 'Update on Your Refund Request',
        template: `Hi {{customerName}},

Thank you for your patience while we reviewed your refund request.

After careful consideration, we're unable to approve this refund for the following reason:
{{denialReason}}

**Our Refund Policy:**
- Refunds are available within {{refundPolicyDays}} days of purchase
- Subscriptions can be cancelled anytime to prevent future charges
- Partial refunds may be available for unused service periods

We understand this may not be the answer you were hoping for. If you believe there are circumstances we should reconsider, please reply with additional details, and we'll be happy to take another look.

Alternatively, if there's an issue with our service that prompted this request, we'd love the opportunity to make things right.

Sincerely,
The FOR THE KIDS Support Team`
    },

    refundPolicyInfo: {
        subject: 'Our Refund Policy',
        template: `Hi {{customerName}},

Thanks for asking about our refund policy! Here's everything you need to know:

**Standard Refund Policy:**
- Full refunds available within {{refundPolicyDays}} days of purchase
- No questions asked for first-time refund requests
- Refunds processed to the original payment method

**Subscription Cancellations:**
- Cancel anytime from your account settings
- Access continues until the end of your billing period
- Pro-rated refunds available for annual plans

**How to Request a Refund:**
1. Email {{billingEmail}} with your account email
2. Include your transaction ID if available
3. Let us know the reason (helps us improve!)

We process most refund requests within 2-3 business days.

Questions? We're here to help!

Best,
The FOR THE KIDS Support Team`
    }
};

// ============================================================================
// 3. TECHNICAL SUPPORT SCRIPTS
// ============================================================================

const TECHNICAL_SUPPORT = {
    generalTroubleshooting: {
        subject: 'Let\'s Get This Sorted Out',
        template: `Hi {{customerName}},

I'm sorry you're running into trouble! Let's work together to get this resolved.

**First, let's try some quick fixes:**

1. **Clear your browser cache and cookies**
   - Chrome: Settings > Privacy > Clear browsing data
   - Firefox: Options > Privacy > Clear Data
   - Safari: Preferences > Privacy > Manage Website Data

2. **Try a different browser**
   - We recommend Chrome, Firefox, Safari, or Edge (latest versions)

3. **Check your internet connection**
   - Try loading other websites to confirm connectivity

4. **Disable browser extensions temporarily**
   - Some extensions can interfere with web applications

**If the issue persists, please share:**
- Browser name and version
- Operating system (Windows, Mac, etc.)
- Screenshot or screen recording of the issue
- Steps to reproduce the problem

This information helps us pinpoint exactly what's happening. We're committed to getting you back up and running!

Here to help,
The FOR THE KIDS Support Team`
    },

    apiIssues: {
        subject: 'API Support - Troubleshooting Guide',
        template: `Hi {{customerName}},

Thanks for reaching out about the API issue. Let's dig into this together.

**Common API Issues & Solutions:**

1. **Authentication Errors (401/403)**
   - Verify your API key is correct and hasn't expired
   - Check that you're including the key in the Authorization header
   - Ensure your account has API access enabled

2. **Rate Limiting (429)**
   - Check your current rate limit status in response headers
   - Implement exponential backoff for retries
   - Consider upgrading for higher limits

3. **Server Errors (5xx)**
   - These are usually temporary - retry after a few minutes
   - Check our status page: {{websiteUrl}}/status

**Please share the following for faster diagnosis:**
- Endpoint you're calling
- Request method (GET, POST, etc.)
- Error response body (sanitize any sensitive data)
- Approximate time of the error

Our API documentation is available at {{websiteUrl}}/docs/api if you need a reference.

We'll get this working for you!

Best,
The FOR THE KIDS Technical Team`
    },

    performanceIssues: {
        subject: 'Performance Optimization Support',
        template: `Hi {{customerName}},

I understand you're experiencing slow performance - that's frustrating, and we want to fix it.

**Let's identify the cause:**

1. **What type of slowness are you seeing?**
   - Page load times
   - API response times
   - Specific features or actions

2. **When did this start?**
   - Recently (potential system issue)
   - Always been slow (optimization opportunity)

3. **Is it consistent or intermittent?**
   - All the time
   - Certain times of day
   - Specific actions only

**While we investigate, try these tips:**
- Use a wired connection instead of WiFi if possible
- Close unnecessary browser tabs
- Check if the issue occurs on a different device

We're monitoring our systems continuously, and current status is available at {{websiteUrl}}/status

Please reply with answers to the questions above, and we'll prioritize getting this resolved.

Thank you for your patience,
The FOR THE KIDS Technical Team`
    },

    accountAccess: {
        subject: 'Account Access Recovery',
        template: `Hi {{customerName}},

I'm here to help you regain access to your account. Let's work through this step by step.

**Account Recovery Options:**

1. **Password Reset** (Most Common)
   - Visit {{websiteUrl}}/reset-password
   - Enter your account email
   - Check your inbox (and spam folder)

2. **Email Not Receiving Reset?**
   - Verify you're using the correct email address
   - Check if emails are going to spam/promotions
   - Try adding {{supportEmail}} to your contacts

3. **Account May Be Using Different Email?**
   - Think back to which email you used to sign up
   - Check for welcome emails in other accounts

4. **Account Locked?**
   - Too many failed login attempts can trigger a temporary lock
   - Wait 30 minutes and try again

**If none of these work, please provide:**
- The email you believe is associated with the account
- Approximate date you created the account
- Any transaction receipts from us

We'll verify your identity and restore your access safely.

We've got you covered,
The FOR THE KIDS Support Team`
    },

    mobileAppIssues: {
        subject: 'Mobile App Troubleshooting',
        template: `Hi {{customerName}},

Sorry to hear you're having trouble with our mobile app! Let's get this sorted.

**Quick Fixes:**

1. **Force close and reopen the app**
   - iOS: Swipe up from bottom, swipe away the app
   - Android: Recent apps > swipe away

2. **Check for updates**
   - App Store (iOS) or Play Store (Android)
   - Always use the latest version

3. **Clear app cache**
   - iOS: Offload app in Settings > General > iPhone Storage
   - Android: Settings > Apps > FOR THE KIDS > Clear Cache

4. **Reinstall the app**
   - Delete and redownload from the store
   - Your data syncs from the cloud

**Still having issues? Please share:**
- Device model (e.g., iPhone 14, Samsung Galaxy S23)
- Operating system version
- App version (Settings > About within the app)
- Description of what happens

We're committed to a smooth mobile experience!

Best,
The FOR THE KIDS Support Team`
    }
};

// ============================================================================
// 4. BILLING INQUIRIES
// ============================================================================

const BILLING_RESPONSES = {
    chargeExplanation: {
        subject: 'Your Billing Question - Answered',
        template: `Hi {{customerName}},

Thanks for reaching out about your billing. Let me clarify that charge for you.

**Charge Details:**
- Amount: {{chargeAmount}}
- Date: {{chargeDate}}
- Description: {{chargeDescription}}

**This charge is for:**
{{chargeExplanation}}

Your billing history and all invoices are available in your account dashboard at {{websiteUrl}}/billing

If this doesn't match your expectations or you see something that looks incorrect, please let us know right away. We'll investigate and make it right.

Happy to help,
The FOR THE KIDS Billing Team`
    },

    subscriptionChange: {
        subject: 'Subscription Update Confirmation',
        template: `Hi {{customerName}},

Your subscription change has been processed! Here are the details:

**Previous Plan:** {{previousPlan}}
**New Plan:** {{newPlan}}
**Effective Date:** {{effectiveDate}}
**New Billing Amount:** {{newAmount}}/{{billingCycle}}

**What this means for you:**
{{changeDetails}}

If you upgraded: Your new features are available immediately!
If you downgraded: You'll keep your current features until the end of this billing period.

Your next invoice will reflect these changes. You can manage your subscription anytime at {{websiteUrl}}/settings/subscription

Questions? Just reply to this email!

Best,
The FOR THE KIDS Billing Team`
    },

    paymentFailed: {
        subject: 'Action Needed: Payment Issue',
        template: `Hi {{customerName}},

We tried to process your payment, but it didn't go through. Don't worry - this happens sometimes, and it's easy to fix!

**What happened:**
- Payment attempt: {{paymentDate}}
- Amount: {{paymentAmount}}
- Reason: {{failureReason}}

**How to fix it:**

1. **Update your payment method**
   Go to {{websiteUrl}}/settings/billing and add a new card

2. **Check with your bank**
   Sometimes banks block unfamiliar charges - a quick call can resolve this

3. **Retry payment**
   Once updated, we'll automatically retry, or you can manually retry in your billing settings

**Important:** To keep your account active, please update your payment within 7 days.

We're here if you need any assistance!

The FOR THE KIDS Billing Team`
    },

    invoiceRequest: {
        subject: 'Your Invoice is Ready',
        template: `Hi {{customerName}},

Here's the invoice you requested:

**Invoice Details:**
- Invoice Number: {{invoiceNumber}}
- Date: {{invoiceDate}}
- Amount: {{invoiceAmount}}
- Status: {{paymentStatus}}

You can download a PDF version from your billing dashboard at {{websiteUrl}}/billing/invoices

**Need something specific?**
- Company name on invoice: Update in Settings > Billing Info
- Tax ID/VAT: Add in Settings > Billing Info
- Different format: Just let us know!

All your historical invoices are available in your account for easy access.

Best,
The FOR THE KIDS Billing Team`
    },

    cancellationConfirmation: {
        subject: 'Subscription Cancellation Confirmed',
        template: `Hi {{customerName}},

We've processed your cancellation request. While we're sad to see you go, we respect your decision.

**Cancellation Details:**
- Plan: {{planName}}
- Access Until: {{accessEndDate}}
- Final Charge: Already processed (no additional charges)

**What happens next:**
- You'll keep full access until {{accessEndDate}}
- Your data will be retained for 30 days after cancellation
- You can reactivate anytime to pick up where you left off

**Before you go:**
If there's anything we could have done better, we'd genuinely appreciate your feedback. Reply to this email with your thoughts - it helps us improve for everyone.

The door is always open if you'd like to return. Thank you for being part of FOR THE KIDS!

Take care,
The FOR THE KIDS Team`
    }
};

// ============================================================================
// 5. FEATURE REQUESTS
// ============================================================================

const FEATURE_REQUEST_RESPONSES = {
    featureReceived: {
        subject: 'Thanks for Your Feature Suggestion!',
        template: `Hi {{customerName}},

Thank you for taking the time to share your idea with us! Feedback from users like you shapes the future of FOR THE KIDS.

**Your Suggestion:**
{{featureSummary}}

**What happens next:**
1. Your idea has been logged in our feature request system
2. Our product team reviews all suggestions weekly
3. Popular requests get prioritized for development
4. We'll update you if this feature makes it to our roadmap

While we can't implement every suggestion, every piece of feedback helps us understand what matters most to our community.

Keep the ideas coming - you're helping us build something great!

With gratitude,
The FOR THE KIDS Product Team`
    },

    featureOnRoadmap: {
        subject: 'Great News About Your Feature Request!',
        template: `Hi {{customerName}},

I have exciting news! Remember that feature you suggested?

**Your Request:** {{featureSummary}}

It's officially on our roadmap! Your feedback, along with others in our community, helped make this happen.

**Timeline:**
- Estimated Release: {{estimatedRelease}}
- Status: {{developmentStatus}}

We'll send you an update when it's ready to use. You'll be among the first to know!

Thank you for helping make FOR THE KIDS better for everyone.

Excited to share this with you,
The FOR THE KIDS Product Team`
    },

    featureAlreadyExists: {
        subject: 'Good News - This Feature Already Exists!',
        template: `Hi {{customerName}},

Great minds think alike! The feature you're looking for actually already exists in FOR THE KIDS.

**You asked about:** {{featureSummary}}

**Here's how to use it:**
{{featureInstructions}}

**Where to find it:**
{{featureLocation}}

If you need any help setting this up or have questions about how it works, just reply to this email. We're happy to walk you through it!

Best,
The FOR THE KIDS Support Team`
    },

    featureNotPlanned: {
        subject: 'Thank You for Your Feature Suggestion',
        template: `Hi {{customerName}},

Thank you for sharing your idea about {{featureSummary}}. We really appreciate you taking the time to help us improve.

After careful consideration, this particular feature isn't something we're able to prioritize right now. Here's why:
{{reasonExplanation}}

**However:**
- Your suggestion has been recorded for future consideration
- Priorities can change as our platform evolves
- We encourage you to keep sharing ideas!

**In the meantime, you might find these helpful:**
{{alternativeSuggestions}}

We value your input and hope you'll continue to share your thoughts with us.

Warmly,
The FOR THE KIDS Product Team`
    }
};

// ============================================================================
// 6. BUG REPORTS
// ============================================================================

const BUG_REPORT_RESPONSES = {
    bugReceived: {
        subject: 'Bug Report Received - We\'re On It',
        template: `Hi {{customerName}},

Thank you for reporting this issue! Your report helps us keep FOR THE KIDS running smoothly for everyone.

**Your Report:**
{{bugSummary}}

**Ticket Number:** {{ticketId}}

**What's happening now:**
1. Our engineering team has been notified
2. We're working to reproduce and diagnose the issue
3. You'll receive updates as we make progress

**While we investigate:**
{{workaroundSuggestion}}

If you discover any additional details about the issue, please reply to this email with your ticket number.

We appreciate your patience and your help in making FOR THE KIDS better!

The FOR THE KIDS Engineering Team`
    },

    bugInProgress: {
        subject: 'Update on Your Bug Report ({{ticketId}})',
        template: `Hi {{customerName}},

Just wanted to give you an update on the issue you reported.

**Issue:** {{bugSummary}}
**Status:** In Progress
**Priority:** {{bugPriority}}

**Current Progress:**
{{progressUpdate}}

**Estimated Resolution:** {{estimatedFix}}

We're actively working on this and will let you know as soon as it's fixed. Thank you for your patience!

Best,
The FOR THE KIDS Engineering Team`
    },

    bugResolved: {
        subject: 'Good News - Your Bug Has Been Fixed!',
        template: `Hi {{customerName}},

Great news! The issue you reported has been resolved.

**Original Issue:** {{bugSummary}}
**Ticket Number:** {{ticketId}}
**Resolution:** {{resolutionDetails}}

**The fix is now live!** You should no longer experience this issue. If you do, please don't hesitate to reach out.

Thank you for helping us improve FOR THE KIDS. Bug reports from attentive users like you make a real difference!

Cheers,
The FOR THE KIDS Engineering Team`
    },

    bugCannotReproduce: {
        subject: 'Help Us Understand the Issue Better',
        template: `Hi {{customerName}},

Thank you for your bug report. We've been investigating, but we're having trouble reproducing the issue on our end.

**Reported Issue:** {{bugSummary}}

**To help us dig deeper, could you please provide:**
1. Exact steps to trigger the issue
2. Browser and version (or app version)
3. Operating system
4. Time and date when it occurred
5. Screenshots or screen recording if possible
6. Any error messages you saw

**Questions:**
- Does this happen every time, or only sometimes?
- Did anything change before it started happening?
- Does it occur on different devices/browsers?

The more details you can share, the faster we can identify and fix the problem. Thank you for working with us on this!

Best,
The FOR THE KIDS Engineering Team`
    },

    knownIssue: {
        subject: 'We\'re Aware of This Issue',
        template: `Hi {{customerName}},

Thank you for reporting this. We're already aware of this issue and actively working on a fix.

**Issue:** {{bugSummary}}
**Status:** Known Issue - Fix in Progress
**Tracking ID:** {{issueId}}

**What we know:**
{{issueDetails}}

**Current Workaround:**
{{workaroundInstructions}}

**Expected Fix:** {{expectedFix}}

We apologize for any inconvenience this has caused. You can check our status page for real-time updates: {{websiteUrl}}/status

Thank you for your patience and understanding!

The FOR THE KIDS Engineering Team`
    }
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Fills a template with provided data
 * @param {string} template - The template string with {{placeholders}}
 * @param {Object} data - Key-value pairs for replacement
 * @returns {string} - Filled template
 */
function fillTemplate(template, data = {}) {
    let filled = template;

    // Add default config values
    const allData = {
        ...CONFIG,
        ...data
    };

    for (const [key, value] of Object.entries(allData)) {
        const placeholder = new RegExp(`{{${key}}}`, 'g');
        filled = filled.replace(placeholder, value || '');
    }

    return filled;
}

/**
 * Gets a template by category and name
 * @param {string} category - Template category
 * @param {string} templateName - Template name
 * @returns {Object|null} - Template object or null
 */
function getTemplate(category, templateName) {
    const categories = {
        faq: FAQ_RESPONSES,
        refund: REFUND_RESPONSES,
        technical: TECHNICAL_SUPPORT,
        billing: BILLING_RESPONSES,
        feature: FEATURE_REQUEST_RESPONSES,
        bug: BUG_REPORT_RESPONSES
    };

    const categoryTemplates = categories[category.toLowerCase()];
    if (!categoryTemplates) {
        console.error(`Category '${category}' not found`);
        return null;
    }

    const template = categoryTemplates[templateName];
    if (!template) {
        console.error(`Template '${templateName}' not found in category '${category}'`);
        return null;
    }

    return template;
}

/**
 * Generates a response using a template
 * @param {string} category - Template category
 * @param {string} templateName - Template name
 * @param {Object} data - Data for placeholders
 * @returns {Object} - Object with subject and body
 */
function generateResponse(category, templateName, data = {}) {
    const template = getTemplate(category, templateName);
    if (!template) {
        return null;
    }

    return {
        subject: fillTemplate(template.subject, data),
        body: fillTemplate(template.template, data)
    };
}

/**
 * Lists all available templates
 * @returns {Object} - Organized list of templates
 */
function listTemplates() {
    return {
        faq: Object.keys(FAQ_RESPONSES),
        refund: Object.keys(REFUND_RESPONSES),
        technical: Object.keys(TECHNICAL_SUPPORT),
        billing: Object.keys(BILLING_RESPONSES),
        feature: Object.keys(FEATURE_REQUEST_RESPONSES),
        bug: Object.keys(BUG_REPORT_RESPONSES)
    };
}

/**
 * Ensures log directory exists
 */
function ensureLogDirectory() {
    if (!fs.existsSync(CONFIG.logDir)) {
        fs.mkdirSync(CONFIG.logDir, { recursive: true });
    }
}

/**
 * Logs template usage
 * @param {string} category - Template category
 * @param {string} templateName - Template name
 * @param {Object} data - Data used
 */
function logTemplateUsage(category, templateName, data = {}) {
    ensureLogDirectory();

    const logEntry = {
        timestamp: new Date().toISOString(),
        category,
        templateName,
        customerName: data.customerName || 'Unknown',
        ticketId: data.ticketId || null
    };

    const logFile = path.join(CONFIG.logDir, `template-usage-${new Date().toISOString().split('T')[0]}.json`);

    let logs = [];
    if (fs.existsSync(logFile)) {
        try {
            logs = JSON.parse(fs.readFileSync(logFile, 'utf8'));
        } catch (e) {
            logs = [];
        }
    }

    logs.push(logEntry);
    fs.writeFileSync(logFile, JSON.stringify(logs, null, 2));

    console.log(`[LOG] Template used: ${category}/${templateName} at ${logEntry.timestamp}`);
}

/**
 * Saves generated response to logs
 * @param {string} category - Template category
 * @param {string} templateName - Template name
 * @param {Object} response - Generated response
 * @param {Object} data - Original data
 */
function saveResponseToLog(category, templateName, response, data = {}) {
    ensureLogDirectory();

    const logEntry = {
        timestamp: new Date().toISOString(),
        category,
        templateName,
        subject: response.subject,
        body: response.body,
        data: data
    };

    const logFile = path.join(CONFIG.logDir, `responses-${new Date().toISOString().split('T')[0]}.json`);

    let logs = [];
    if (fs.existsSync(logFile)) {
        try {
            logs = JSON.parse(fs.readFileSync(logFile, 'utf8'));
        } catch (e) {
            logs = [];
        }
    }

    logs.push(logEntry);
    fs.writeFileSync(logFile, JSON.stringify(logs, null, 2));

    console.log(`[LOG] Response saved: ${category}/${templateName}`);

    return logFile;
}

// ============================================================================
// MAIN EXECUTION & DEMO
// ============================================================================

function main() {
    console.log('='.repeat(70));
    console.log('FOR THE KIDS - Customer Support Response Templates');
    console.log('='.repeat(70));
    console.log('');

    // Ensure log directory exists
    ensureLogDirectory();
    console.log(`[INFO] Log directory: ${CONFIG.logDir}`);
    console.log('');

    // List all available templates
    console.log('Available Templates:');
    console.log('-'.repeat(40));
    const templates = listTemplates();
    for (const [category, templateList] of Object.entries(templates)) {
        console.log(`\n${category.toUpperCase()}:`);
        templateList.forEach(t => console.log(`  - ${t}`));
    }
    console.log('\n');

    // Demo: Generate sample responses
    console.log('='.repeat(70));
    console.log('DEMO: Generating Sample Responses');
    console.log('='.repeat(70));

    const demoData = {
        customerName: 'Alex Johnson',
        ticketId: 'TKT-2024-001',
        refundAmount: '$49.99',
        transactionId: 'TXN-789012',
        bugSummary: 'Dashboard not loading properly on Firefox',
        featureSummary: 'Dark mode for the interface'
    };

    // Demo responses
    const demoResponses = [
        { category: 'faq', template: 'accountCreation' },
        { category: 'refund', template: 'refundApproved' },
        { category: 'technical', template: 'generalTroubleshooting' },
        { category: 'billing', template: 'paymentFailed' },
        { category: 'feature', template: 'featureReceived' },
        { category: 'bug', template: 'bugReceived' }
    ];

    demoResponses.forEach(({ category, template }) => {
        console.log(`\n--- ${category.toUpperCase()}: ${template} ---`);
        const response = generateResponse(category, template, demoData);
        if (response) {
            console.log(`Subject: ${response.subject}`);
            console.log('Body (first 200 chars):');
            console.log(response.body.substring(0, 200) + '...');

            // Save to log
            const logFile = saveResponseToLog(category, template, response, demoData);
            logTemplateUsage(category, template, demoData);
        }
    });

    console.log('\n');
    console.log('='.repeat(70));
    console.log('Template generation complete! All responses logged.');
    console.log(`Log directory: ${CONFIG.logDir}`);
    console.log('='.repeat(70));
}

// Run if executed directly
if (require.main === module) {
    main();
}

// ============================================================================
// EXPORTS
// ============================================================================

module.exports = {
    // Configuration
    CONFIG,

    // Template Collections
    FAQ_RESPONSES,
    REFUND_RESPONSES,
    TECHNICAL_SUPPORT,
    BILLING_RESPONSES,
    FEATURE_REQUEST_RESPONSES,
    BUG_REPORT_RESPONSES,

    // Utility Functions
    fillTemplate,
    getTemplate,
    generateResponse,
    listTemplates,
    logTemplateUsage,
    saveResponseToLog,

    // Main
    main
};
