/**
 * ============================================================================
 * SMS MARKETING TEMPLATES
 * AI Solutions Store - Production-Ready SMS Message Library
 * ============================================================================
 *
 * Generates SMS templates for:
 * 1. Flash Sale Alerts
 * 2. Abandoned Cart Reminders
 * 3. Order Confirmations
 * 4. Delivery Updates
 * 5. Review Requests
 *
 * All messages under 160 characters for single-SMS delivery.
 * Mission: FOR THE KIDS - Gospel V1.3 (60/30/10)
 *
 * Usage:
 *   node sms-templates.cjs --list
 *   node sms-templates.cjs --category=flash-sale
 *   node sms-templates.cjs --generate-all
 *   node sms-templates.cjs --preview --id=flash-sale-1
 *
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
    maxLength: 160,
    logsDir: 'C:\\AiCollabForTheKids\\logs',
    outputDir: 'C:\\AiCollabForTheKids\\logs\\sms-templates',
    logFile: 'C:\\AiCollabForTheKids\\logs\\sms-templates.log',
    storeUrl: 'ai-solutions.store',
    shortUrl: 'aiss.io', // Short URL for SMS

    // Gospel V1.3 compliance
    gospel: {
        charity: 60,
        infrastructure: 30,
        founder: 10
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
// SMS TEMPLATE CATEGORIES
// ============================================================================

/**
 * 1. FLASH SALE ALERTS
 * Urgent, time-limited offers to drive immediate action
 */
const FLASH_SALE_TEMPLATES = [
    {
        id: 'flash-sale-1',
        name: 'Time-Limited Discount',
        template: '{{discount}}% OFF ends TONIGHT! Get {{product}} before midnight. Code: {{code}} Shop: {{url}}',
        variables: ['discount', 'product', 'code', 'url'],
        example: '40% OFF ends TONIGHT! Get Claude Droid before midnight. Code: FLASH40 Shop: aiss.io/sale',
        charCount: 89
    },
    {
        id: 'flash-sale-2',
        name: 'Hourly Flash Sale',
        template: 'FLASH SALE! {{hours}}hrs left: ${{price}} {{product}} (was ${{original}}). Grab it: {{url}}',
        variables: ['hours', 'price', 'product', 'original', 'url'],
        example: 'FLASH SALE! 3hrs left: $199 Claude Droid (was $299). Grab it: aiss.io/flash',
        charCount: 77
    },
    {
        id: 'flash-sale-3',
        name: 'VIP Early Access',
        template: 'VIP ACCESS: {{product}} sale starts NOW for you. {{discount}}% off, 24hrs only. Shop: {{url}}',
        variables: ['product', 'discount', 'url'],
        example: 'VIP ACCESS: Income Droid sale starts NOW for you. 35% off, 24hrs only. Shop: aiss.io/vip',
        charCount: 95
    },
    {
        id: 'flash-sale-4',
        name: 'Last Chance Alert',
        template: 'LAST CHANCE! {{product}} flash sale ends in {{time}}. Save ${{savings}} now: {{url}}',
        variables: ['product', 'time', 'savings', 'url'],
        example: 'LAST CHANCE! Marketing Engine flash sale ends in 2hrs. Save $80 now: aiss.io/last',
        charCount: 87
    },
    {
        id: 'flash-sale-5',
        name: 'Bundle Deal',
        template: 'BUNDLE DEAL: Get {{products}} for just ${{price}}! Save {{discount}}%. Today only: {{url}}',
        variables: ['products', 'price', 'discount', 'url'],
        example: 'BUNDLE DEAL: Get Claude+Income Droid for just $599! Save 25%. Today only: aiss.io/bundle',
        charCount: 93
    },
    {
        id: 'flash-sale-6',
        name: 'Inventory Alert',
        template: '{{quantity}} LEFT! {{product}} at ${{price}} selling fast. Dont miss out: {{url}}',
        variables: ['quantity', 'product', 'price', 'url'],
        example: '12 LEFT! Claude Droid at $249 selling fast. Dont miss out: aiss.io/grab',
        charCount: 73
    },
    {
        id: 'flash-sale-7',
        name: 'Weekend Special',
        template: 'WEEKEND ONLY: {{product}} {{discount}}% OFF. Use code {{code}} at checkout. {{url}}',
        variables: ['product', 'discount', 'code', 'url'],
        example: 'WEEKEND ONLY: Jules AI 30% OFF. Use code WEEKEND30 at checkout. aiss.io/w',
        charCount: 75
    },
    {
        id: 'flash-sale-8',
        name: 'Member Exclusive',
        template: 'MEMBERS ONLY: Unlock {{product}} at ${{price}} ({{discount}}% off). Expires {{time}}: {{url}}',
        variables: ['product', 'price', 'discount', 'time', 'url'],
        example: 'MEMBERS ONLY: Unlock Marketing Engine at $139 (30% off). Expires 6PM: aiss.io/m',
        charCount: 83
    }
];

/**
 * 2. ABANDONED CART REMINDERS
 * Re-engage customers who left items in cart
 */
const ABANDONED_CART_TEMPLATES = [
    {
        id: 'cart-1',
        name: 'Gentle Reminder',
        template: 'Hi {{name}}! You left {{product}} in your cart. Complete your order: {{url}}',
        variables: ['name', 'product', 'url'],
        example: 'Hi Alex! You left Claude Droid in your cart. Complete your order: aiss.io/cart',
        charCount: 79
    },
    {
        id: 'cart-2',
        name: 'Still Available',
        template: 'Good news! {{product}} is still in your cart. Grab it before its gone: {{url}}',
        variables: ['product', 'url'],
        example: 'Good news! Income Droid is still in your cart. Grab it before its gone: aiss.io/c',
        charCount: 84
    },
    {
        id: 'cart-3',
        name: 'Discount Incentive',
        template: '{{name}}, use code {{code}} for {{discount}}% off your {{product}}! Complete now: {{url}}',
        variables: ['name', 'code', 'discount', 'product', 'url'],
        example: 'Alex, use code SAVE10 for 10% off your Claude Droid! Complete now: aiss.io/go',
        charCount: 81
    },
    {
        id: 'cart-4',
        name: 'Low Stock Warning',
        template: 'Heads up! {{product}} in your cart is almost sold out. Secure yours: {{url}}',
        variables: ['product', 'url'],
        example: 'Heads up! Jules AI in your cart is almost sold out. Secure yours: aiss.io/now',
        charCount: 79
    },
    {
        id: 'cart-5',
        name: 'Cart Expires Soon',
        template: 'Your cart expires in {{hours}} hours. {{product}} is waiting for you: {{url}}',
        variables: ['hours', 'product', 'url'],
        example: 'Your cart expires in 24 hours. Marketing Engine is waiting for you: aiss.io/r',
        charCount: 80
    },
    {
        id: 'cart-6',
        name: 'Need Help',
        template: 'Questions about {{product}}? Reply HELP or finish checkout here: {{url}}',
        variables: ['product', 'url'],
        example: 'Questions about Claude Droid? Reply HELP or finish checkout here: aiss.io/help',
        charCount: 81
    },
    {
        id: 'cart-7',
        name: 'Free Bonus Offer',
        template: 'Complete your {{product}} order today and get {{bonus}} FREE! Checkout: {{url}}',
        variables: ['product', 'bonus', 'url'],
        example: 'Complete your Claude Droid order today and get Setup Guide FREE! Checkout: aiss.io',
        charCount: 86
    },
    {
        id: 'cart-8',
        name: 'Final Notice',
        template: 'Final notice: Your {{product}} cart clears tonight. Last chance to save: {{url}}',
        variables: ['product', 'url'],
        example: 'Final notice: Your Income Droid cart clears tonight. Last chance to save: aiss.io/f',
        charCount: 85
    }
];

/**
 * 3. ORDER CONFIRMATIONS
 * Transactional messages confirming purchases
 */
const ORDER_CONFIRMATION_TEMPLATES = [
    {
        id: 'order-1',
        name: 'Order Received',
        template: 'Order #{{order_id}} confirmed! Thanks for {{product}}. Track status: {{url}}',
        variables: ['order_id', 'product', 'url'],
        example: 'Order #AI2024-1234 confirmed! Thanks for Claude Droid. Track status: aiss.io/o/1234',
        charCount: 87
    },
    {
        id: 'order-2',
        name: 'Payment Success',
        template: 'Payment received! ${{amount}} for {{product}}. Order #{{order_id}}. Details: {{url}}',
        variables: ['amount', 'product', 'order_id', 'url'],
        example: 'Payment received! $299 for Claude Droid. Order #1234. Details: aiss.io/order/1234',
        charCount: 83
    },
    {
        id: 'order-3',
        name: 'Download Ready',
        template: 'Your {{product}} is ready! Access your download and setup guide here: {{url}}',
        variables: ['product', 'url'],
        example: 'Your Claude Droid is ready! Access your download and setup guide here: aiss.io/dl',
        charCount: 83
    },
    {
        id: 'order-4',
        name: 'License Activated',
        template: '{{product}} license activated! Key: {{license}}. Get started: {{url}}',
        variables: ['product', 'license', 'url'],
        example: 'Claude Droid license activated! Key: CD-XXXX-XXXX. Get started: aiss.io/start',
        charCount: 79
    },
    {
        id: 'order-5',
        name: 'Thank You Message',
        template: 'Thanks {{name}}! Order #{{order_id}} complete. 60% goes to kids charities. {{url}}',
        variables: ['name', 'order_id', 'url'],
        example: 'Thanks Alex! Order #1234 complete. 60% goes to kids charities. aiss.io/thanks',
        charCount: 79
    },
    {
        id: 'order-6',
        name: 'Setup Instructions',
        template: '{{product}} purchased! Start setup in 3 easy steps. Tutorial: {{url}}',
        variables: ['product', 'url'],
        example: 'Income Droid purchased! Start setup in 3 easy steps. Tutorial: aiss.io/setup',
        charCount: 78
    },
    {
        id: 'order-7',
        name: 'Support Info',
        template: 'Order confirmed! Need help with {{product}}? Email support@youandinotai.com or {{url}}',
        variables: ['product', 'url'],
        example: 'Order confirmed! Need help with Claude Droid? Email support@youandinotai.com or aiss.io',
        charCount: 93
    },
    {
        id: 'order-8',
        name: 'Gospel Reminder',
        template: 'Order complete! Your purchase helps kids: 60% to charity. View impact: {{url}}',
        variables: ['url'],
        example: 'Order complete! Your purchase helps kids: 60% to charity. View impact: aiss.io/impact',
        charCount: 88
    }
];

/**
 * 4. DELIVERY UPDATES
 * Status updates for digital product delivery
 */
const DELIVERY_UPDATE_TEMPLATES = [
    {
        id: 'delivery-1',
        name: 'Processing Order',
        template: 'Order #{{order_id}} is processing. {{product}} access in ~{{time}}. Status: {{url}}',
        variables: ['order_id', 'product', 'time', 'url'],
        example: 'Order #1234 is processing. Claude Droid access in ~5min. Status: aiss.io/s/1234',
        charCount: 84
    },
    {
        id: 'delivery-2',
        name: 'Access Granted',
        template: 'ACCESS GRANTED! Your {{product}} is live. Login now: {{url}}',
        variables: ['product', 'url'],
        example: 'ACCESS GRANTED! Your Claude Droid is live. Login now: aiss.io/login',
        charCount: 68
    },
    {
        id: 'delivery-3',
        name: 'Download Link',
        template: '{{product}} download ready. Link expires in {{hours}}hrs. Get it: {{url}}',
        variables: ['product', 'hours', 'url'],
        example: 'Claude Droid download ready. Link expires in 48hrs. Get it: aiss.io/dl/abc123',
        charCount: 82
    },
    {
        id: 'delivery-4',
        name: 'API Keys Ready',
        template: 'Your {{product}} API keys are ready. Access dashboard: {{url}}',
        variables: ['product', 'url'],
        example: 'Your Marketing Engine API keys are ready. Access dashboard: aiss.io/keys',
        charCount: 73
    },
    {
        id: 'delivery-5',
        name: 'Setup Complete',
        template: '{{product}} setup is complete! Your automation is now running 24/7. View: {{url}}',
        variables: ['product', 'url'],
        example: 'Income Droid setup is complete! Your automation is now running 24/7. View: aiss.io/d',
        charCount: 87
    },
    {
        id: 'delivery-6',
        name: 'Update Available',
        template: 'NEW UPDATE for {{product}}! Version {{version}} adds {{feature}}. Update: {{url}}',
        variables: ['product', 'version', 'feature', 'url'],
        example: 'NEW UPDATE for Claude Droid! Version 2.1 adds TikTok. Update: aiss.io/update',
        charCount: 78
    },
    {
        id: 'delivery-7',
        name: 'First Run Success',
        template: 'First run complete! {{product}} generated {{count}} {{items}}. Dashboard: {{url}}',
        variables: ['product', 'count', 'items', 'url'],
        example: 'First run complete! Claude Droid generated 4 videos. Dashboard: aiss.io/dash',
        charCount: 80
    },
    {
        id: 'delivery-8',
        name: 'Migration Complete',
        template: 'Migration done! Your {{product}} data is now on v{{version}}. Details: {{url}}',
        variables: ['product', 'version', 'url'],
        example: 'Migration done! Your Jules AI data is now on v3.0. Details: aiss.io/migrate',
        charCount: 78
    }
];

/**
 * 5. REVIEW REQUESTS
 * Post-purchase review solicitation
 */
const REVIEW_REQUEST_TEMPLATES = [
    {
        id: 'review-1',
        name: 'Simple Ask',
        template: 'Enjoying {{product}}? Wed love your review! Takes 30 sec: {{url}}',
        variables: ['product', 'url'],
        example: 'Enjoying Claude Droid? Wed love your review! Takes 30 sec: aiss.io/review',
        charCount: 75
    },
    {
        id: 'review-2',
        name: 'Feedback Request',
        template: 'How is {{product}} working for you, {{name}}? Share feedback: {{url}}',
        variables: ['product', 'name', 'url'],
        example: 'How is Claude Droid working for you, Alex? Share feedback: aiss.io/feedback',
        charCount: 76
    },
    {
        id: 'review-3',
        name: 'Star Rating',
        template: 'Quick question: How many stars for {{product}}? Rate 1-5: {{url}}',
        variables: ['product', 'url'],
        example: 'Quick question: How many stars for Income Droid? Rate 1-5: aiss.io/rate',
        charCount: 73
    },
    {
        id: 'review-4',
        name: 'Help Others',
        template: 'Your {{product}} review helps others decide. Share your experience: {{url}}',
        variables: ['product', 'url'],
        example: 'Your Claude Droid review helps others decide. Share your experience: aiss.io/r',
        charCount: 81
    },
    {
        id: 'review-5',
        name: 'Incentive Review',
        template: 'Leave a {{product}} review and get {{reward}}! Share now: {{url}}',
        variables: ['product', 'reward', 'url'],
        example: 'Leave a Claude Droid review and get 10% off next order! Share now: aiss.io/rv',
        charCount: 81
    },
    {
        id: 'review-6',
        name: 'Results Check',
        template: 'Hows {{product}} going? Seeing results? Tell us: {{url}}',
        variables: ['product', 'url'],
        example: 'Hows Marketing Engine going? Seeing results? Tell us: aiss.io/tell',
        charCount: 68
    },
    {
        id: 'review-7',
        name: 'Testimonial Request',
        template: 'Love {{product}}? Share your success story and inspire others: {{url}}',
        variables: ['product', 'url'],
        example: 'Love Income Droid? Share your success story and inspire others: aiss.io/story',
        charCount: 80
    },
    {
        id: 'review-8',
        name: 'Quick Poll',
        template: '1-click poll: Would you recommend {{product}}? Yes/No: {{url}}',
        variables: ['product', 'url'],
        example: '1-click poll: Would you recommend Claude Droid? Yes/No: aiss.io/poll',
        charCount: 71
    }
];

// ============================================================================
// ALL TEMPLATES AGGREGATED
// ============================================================================

const ALL_TEMPLATES = {
    'flash-sale': {
        name: 'Flash Sale Alerts',
        description: 'Urgent time-limited offers to drive immediate purchases',
        templates: FLASH_SALE_TEMPLATES
    },
    'abandoned-cart': {
        name: 'Abandoned Cart Reminders',
        description: 'Re-engage customers who left items in their cart',
        templates: ABANDONED_CART_TEMPLATES
    },
    'order-confirmation': {
        name: 'Order Confirmations',
        description: 'Transactional messages confirming purchases',
        templates: ORDER_CONFIRMATION_TEMPLATES
    },
    'delivery-update': {
        name: 'Delivery Updates',
        description: 'Status updates for digital product delivery',
        templates: DELIVERY_UPDATE_TEMPLATES
    },
    'review-request': {
        name: 'Review Requests',
        description: 'Post-purchase review solicitation',
        templates: REVIEW_REQUEST_TEMPLATES
    }
};

// ============================================================================
// TEMPLATE UTILITIES
// ============================================================================

/**
 * Validate template length
 */
function validateTemplateLength(template, example) {
    const length = example.length;
    const isValid = length <= CONFIG.maxLength;
    return {
        isValid,
        length,
        maxLength: CONFIG.maxLength,
        remaining: CONFIG.maxLength - length
    };
}

/**
 * Fill template with variables
 */
function fillTemplate(template, variables) {
    let filled = template;
    Object.entries(variables).forEach(([key, value]) => {
        filled = filled.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });
    return filled;
}

/**
 * Get template by ID
 */
function getTemplateById(id) {
    for (const [category, data] of Object.entries(ALL_TEMPLATES)) {
        const template = data.templates.find(t => t.id === id);
        if (template) {
            return { category, ...template };
        }
    }
    return null;
}

/**
 * Get all templates for a category
 */
function getTemplatesByCategory(category) {
    return ALL_TEMPLATES[category] || null;
}

/**
 * Validate all templates
 */
function validateAllTemplates() {
    const results = {
        valid: [],
        invalid: []
    };

    Object.entries(ALL_TEMPLATES).forEach(([category, data]) => {
        data.templates.forEach(template => {
            const validation = validateTemplateLength(template.template, template.example);
            const entry = {
                id: template.id,
                category,
                name: template.name,
                ...validation
            };
            if (validation.isValid) {
                results.valid.push(entry);
            } else {
                results.invalid.push(entry);
            }
        });
    });

    return results;
}

// ============================================================================
// FILE GENERATION
// ============================================================================

function generateTemplateFile(category) {
    const data = ALL_TEMPLATES[category];
    if (!data) {
        log(`Category not found: ${category}`, 'ERROR');
        return null;
    }

    const content = {
        category,
        name: data.name,
        description: data.description,
        generatedAt: new Date().toISOString(),
        templateCount: data.templates.length,
        maxLength: CONFIG.maxLength,
        templates: data.templates.map(t => ({
            id: t.id,
            name: t.name,
            template: t.template,
            example: t.example,
            charCount: t.example.length,
            variables: t.variables
        }))
    };

    const filepath = path.join(CONFIG.outputDir, `${category}-templates.json`);
    fs.writeFileSync(filepath, JSON.stringify(content, null, 2));
    log(`Generated: ${filepath}`);
    return filepath;
}

function generateAllTemplateFiles() {
    ensureDirectories();
    let count = 0;

    Object.keys(ALL_TEMPLATES).forEach(category => {
        generateTemplateFile(category);
        count++;
    });

    // Generate master index
    const masterIndex = {
        name: 'SMS Marketing Templates',
        description: 'AI Solutions Store - Production-Ready SMS Message Library',
        mission: 'FOR THE KIDS - Gospel V1.3 (60/30/10)',
        generatedAt: new Date().toISOString(),
        maxLength: CONFIG.maxLength,
        categories: Object.entries(ALL_TEMPLATES).map(([key, data]) => ({
            id: key,
            name: data.name,
            description: data.description,
            templateCount: data.templates.length
        })),
        totalTemplates: Object.values(ALL_TEMPLATES).reduce((sum, d) => sum + d.templates.length, 0)
    };

    const indexPath = path.join(CONFIG.outputDir, 'index.json');
    fs.writeFileSync(indexPath, JSON.stringify(masterIndex, null, 2));
    log(`Generated master index: ${indexPath}`);

    return count;
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
SMS MARKETING TEMPLATES
AI Solutions Store | FOR THE KIDS - Gospel V1.3
============================================================================

Usage:
  node sms-templates.cjs [options]

Options:
  --help                    Show this help message
  --list                    List all template categories
  --category=TYPE           Show templates for a category
  --preview --id=ID         Preview a specific template
  --validate                Validate all template lengths
  --generate-all            Generate all templates to files

Categories:
  flash-sale               Flash Sale Alerts (${FLASH_SALE_TEMPLATES.length} templates)
  abandoned-cart           Abandoned Cart Reminders (${ABANDONED_CART_TEMPLATES.length} templates)
  order-confirmation       Order Confirmations (${ORDER_CONFIRMATION_TEMPLATES.length} templates)
  delivery-update          Delivery Updates (${DELIVERY_UPDATE_TEMPLATES.length} templates)
  review-request           Review Requests (${REVIEW_REQUEST_TEMPLATES.length} templates)

Examples:
  node sms-templates.cjs --list
  node sms-templates.cjs --category=flash-sale
  node sms-templates.cjs --preview --id=cart-3
  node sms-templates.cjs --validate
  node sms-templates.cjs --generate-all

Output:
  Generated files saved to: ${CONFIG.outputDir}
  Logs written to: ${CONFIG.logFile}

============================================================================
FOR THE KIDS. ALWAYS. All messages under 160 characters.
============================================================================
`);
}

function listCategories() {
    console.log(`
SMS Template Categories:
========================
`);
    Object.entries(ALL_TEMPLATES).forEach(([key, data]) => {
        console.log(`${key}`);
        console.log(`   Name: ${data.name}`);
        console.log(`   Description: ${data.description}`);
        console.log(`   Templates: ${data.templates.length}`);
        console.log('');
    });

    const total = Object.values(ALL_TEMPLATES).reduce((sum, d) => sum + d.templates.length, 0);
    console.log(`Total Templates: ${total}`);
    console.log(`Max SMS Length: ${CONFIG.maxLength} characters`);
}

function showCategory(category) {
    const data = ALL_TEMPLATES[category];
    if (!data) {
        log(`Category not found: ${category}`, 'ERROR');
        return;
    }

    console.log(`
${data.name}
${'='.repeat(data.name.length)}
${data.description}

Templates (${data.templates.length}):
`);
    data.templates.forEach((t, i) => {
        console.log(`${i + 1}. [${t.id}] ${t.name}`);
        console.log(`   Template: ${t.template}`);
        console.log(`   Example: ${t.example}`);
        console.log(`   Characters: ${t.example.length}/${CONFIG.maxLength}`);
        console.log('');
    });
}

function previewTemplate(id) {
    const template = getTemplateById(id);
    if (!template) {
        log(`Template not found: ${id}`, 'ERROR');
        return;
    }

    const validation = validateTemplateLength(template.template, template.example);

    console.log(`
Template Preview
================
ID: ${template.id}
Category: ${template.category}
Name: ${template.name}

Template:
${template.template}

Example:
${template.example}

Variables: ${template.variables.join(', ')}
Characters: ${validation.length}/${validation.maxLength}
Valid: ${validation.isValid ? 'YES' : 'NO - EXCEEDS LIMIT'}
Remaining: ${validation.remaining} characters
`);
}

function runValidation() {
    console.log(`
Template Validation
===================
Max Length: ${CONFIG.maxLength} characters
`);

    const results = validateAllTemplates();

    console.log(`Valid Templates: ${results.valid.length}`);
    console.log(`Invalid Templates: ${results.invalid.length}`);

    if (results.invalid.length > 0) {
        console.log('\nInvalid Templates (exceeds 160 chars):');
        results.invalid.forEach(t => {
            console.log(`  - [${t.id}] ${t.name}: ${t.length} chars (${t.length - CONFIG.maxLength} over)`);
        });
    }

    console.log('\nAll Templates by Category:');
    Object.entries(ALL_TEMPLATES).forEach(([category, data]) => {
        const catTemplates = data.templates;
        const avgLength = Math.round(catTemplates.reduce((sum, t) => sum + t.example.length, 0) / catTemplates.length);
        console.log(`  ${category}: ${catTemplates.length} templates, avg ${avgLength} chars`);
    });
}

async function main() {
    const args = parseArgs();

    console.log('');
    console.log('============================================================================');
    console.log('SMS MARKETING TEMPLATES');
    console.log('AI Solutions Store | FOR THE KIDS - Gospel V1.3 (60/30/10)');
    console.log('============================================================================');
    console.log('');

    if (args.help) {
        showHelp();
        return;
    }

    if (args.list) {
        listCategories();
        return;
    }

    if (args.category) {
        showCategory(args.category);
        return;
    }

    if (args.preview && args.id) {
        previewTemplate(args.id);
        return;
    }

    if (args.validate) {
        runValidation();
        return;
    }

    if (args['generate-all']) {
        log('Generating all SMS template files...', 'INFO');
        const count = generateAllTemplateFiles();
        log(`Generated ${count} category files to ${CONFIG.outputDir}`, 'SUCCESS');
        return;
    }

    // Default: show help
    showHelp();
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
    ALL_TEMPLATES,
    FLASH_SALE_TEMPLATES,
    ABANDONED_CART_TEMPLATES,
    ORDER_CONFIRMATION_TEMPLATES,
    DELIVERY_UPDATE_TEMPLATES,
    REVIEW_REQUEST_TEMPLATES,
    validateTemplateLength,
    fillTemplate,
    getTemplateById,
    getTemplatesByCategory,
    validateAllTemplates,
    generateAllTemplateFiles
};
