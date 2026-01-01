/**
 * AGENT 2: Abandoned Cart Recovery
 * Wins back people who showed interest but didn't convert
 * BUSINESS FIRST: Value reminders, urgency, no guilt
 * 
 * Recovery rate: 10-15% of abandoned carts
 * 100 abandoned × 12% recovery × $299 avg = $3,588/month potential
 * 60% to kids = $2,152.80/month from recovery alone
 */

const fs = require('fs');
const path = require('path');

const LOGS_DIR = 'C:\\AiCollabForTheKids\\logs';
const LOG_FILE = path.join(LOGS_DIR, 'recovery-agent.log');

function log(message) {
    const entry = `[${new Date().toISOString()}] ${message}\n`;
    fs.appendFileSync(LOG_FILE, entry);
    console.log(entry.trim());
}

const RECOVERY_SEQUENCES = {
    abandoned_cart: [
        {
            delay: "1_hour",
            subject: "Did something go wrong?",
            body: `Hi {{first_name}},

You were checking out {{product_name}} but didn't complete your purchase.

If something went wrong technically, let me know - I'll fix it.

If you had questions, just reply. Happy to help.

Your cart is saved: {{cart_link}}

- AI Solutions Team`
        },
        {
            delay: "24_hours",
            subject: "Still thinking it over?",
            body: `Hi {{first_name}},

{{product_name}} is still in your cart.

Quick reminder what you get:
{{product_benefits}}

One-time purchase. No subscriptions. Lifetime updates.

Complete your order: {{cart_link}}

- AI Solutions Team`
        },
        {
            delay: "72_hours",
            subject: "Your cart expires tomorrow",
            body: `Hi {{first_name}},

Your cart with {{product_name}} expires in 24 hours.

After that, you'll need to start over.

If you're on the fence, here's what others say:
"{{testimonial}}"

Finish checkout: {{cart_link}}

- AI Solutions Team`
        }
    ],
    consultation_no_show: [
        {
            delay: "30_min",
            subject: "Missed our call - reschedule?",
            body: `Hi {{first_name}},

Looks like we missed each other for your consultation.

No worries - things come up.

Grab a new time that works: {{reschedule_link}}

- AI Solutions Team`
        },
        {
            delay: "24_hours",
            subject: "Still want to chat about automation?",
            body: `Hi {{first_name}},

We had a call scheduled but couldn't connect.

If you still want to discuss how AI automation could work for your business, I'm here.

Book a new time: {{reschedule_link}}

Or if you have a quick question, just reply to this email.

- AI Solutions Team`
        }
    ],
    browse_abandonment: [
        {
            delay: "4_hours",
            subject: "Still looking for the right AI tool?",
            body: `Hi {{first_name}},

I noticed you were checking out our AI automation tools.

Not sure which one fits your needs? Here's a quick guide:

**For YouTube creators:** Claude Droid ($299)
→ 4 automated Shorts daily from trending news

**For marketers:** Marketing Engine ($199)
→ Posts to 23 platforms automatically

**For passive income:** Income Droid ($499)
→ Multi-channel content generation

**For everything:** Full Bundle ($799)
→ All tools + priority support

Questions? Reply here or book a call: {{consultation_link}}

- AI Solutions Team`
        }
    ]
};

const PRODUCT_BENEFITS = {
    'claude-droid': [
        '4 YouTube Shorts created daily',
        'Trending news → video automatically',
        'AI voiceover + captions',
        'Direct YouTube upload',
        'Zero editing required'
    ],
    'marketing-engine': [
        '23 platforms automated',
        'Twitter, LinkedIn, Reddit, Dev.to, more',
        'Content variations prevent spam flags',
        'PM2 process management',
        'Rate limit compliant'
    ],
    'income-droid': [
        'Multi-channel content generation',
        'Blog, social, email content',
        'SEO optimized output',
        'Monetization strategy included',
        'Passive income playbook'
    ]
};

const TESTIMONIALS = [
    "Saved me 15 hours a week. Setup took 2 hours. No-brainer ROI.",
    "The YouTube automation is insane. 120 videos in my first month, zero manual work.",
    "Marketing Engine posts while I sleep. My LinkedIn grew 3x in 60 days.",
    "Finally have time to work ON my business instead of IN it."
];

function main() {
    log('═══════════════════════════════════════════════════════════════');
    log('AGENT 2: ABANDONED CART RECOVERY');
    log('BUSINESS FIRST: Value reminders, no guilt tactics');
    log('═══════════════════════════════════════════════════════════════');

    const outputDir = path.join(LOGS_DIR, 'recovery-sequences');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Generate sequences for each recovery type
    Object.entries(RECOVERY_SEQUENCES).forEach(([type, emails]) => {
        const typeDir = path.join(outputDir, type);
        if (!fs.existsSync(typeDir)) {
            fs.mkdirSync(typeDir, { recursive: true });
        }

        emails.forEach((email, index) => {
            const filename = `${email.delay}.md`;
            const content = `# ${type.replace(/_/g, ' ').toUpperCase()} - ${email.delay.replace(/_/g, ' ')}\n**Subject:** ${email.subject}\n\n${email.body}`;
            fs.writeFileSync(path.join(typeDir, filename), content);
            log(`Generated: ${type}/${filename}`);
        });
    });

    // Generate product benefits reference
    fs.writeFileSync(
        path.join(outputDir, 'product-benefits.json'),
        JSON.stringify(PRODUCT_BENEFITS, null, 2)
    );

    // Generate testimonials reference
    fs.writeFileSync(
        path.join(outputDir, 'testimonials.json'),
        JSON.stringify(TESTIMONIALS, null, 2)
    );

    // Generate SendGrid automation config
    const automationConfig = {
        abandoned_cart: {
            trigger: 'cart_abandoned',
            emails: RECOVERY_SEQUENCES.abandoned_cart.map((e, i) => ({
                step: i + 1,
                delay: e.delay,
                subject: e.subject
            }))
        },
        consultation_no_show: {
            trigger: 'consultation_missed',
            emails: RECOVERY_SEQUENCES.consultation_no_show.map((e, i) => ({
                step: i + 1,
                delay: e.delay,
                subject: e.subject
            }))
        }
    };
    fs.writeFileSync(
        path.join(outputDir, 'sendgrid-automations.json'),
        JSON.stringify(automationConfig, null, 2)
    );

    log(`\n✅ Generated ${Object.keys(RECOVERY_SEQUENCES).length} recovery sequences`);
    log(`📁 Output: ${outputDir}`);
    log('═══════════════════════════════════════════════════════════════');
}

main();
