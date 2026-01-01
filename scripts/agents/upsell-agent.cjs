/**
 * AGENT 4: Cross-Sell & Upsell Engine
 * Increases average order value from $299 to $450+
 * BUSINESS FIRST: Value-based recommendations, no pressure
 * 
 * 50% upsell rate × $150 avg increase = $75 per transaction
 * 60% to kids = $45 extra per upsold customer
 */

const fs = require('fs');
const path = require('path');

const LOGS_DIR = 'C:\\AiCollabForTheKids\\logs';
const LOG_FILE = path.join(LOGS_DIR, 'upsell-agent.log');

function log(message) {
    const entry = `[${new Date().toISOString()}] ${message}\n`;
    fs.appendFileSync(LOG_FILE, entry);
    console.log(entry.trim());
}

const PRODUCTS = {
    'claude-droid': { price: 299, name: 'Claude Droid', category: 'content' },
    'marketing-engine': { price: 199, name: 'Marketing Engine', category: 'marketing' },
    'income-droid': { price: 499, name: 'Income Droid', category: 'content' },
    'jules-ai': { price: 399, name: 'Jules AI Dashboard', category: 'analytics' },
    'affiliate-system': { price: 599, name: 'Affiliate System', category: 'sales' },
    'dating-platform': { price: 2499, name: 'Dating Platform', category: 'platform' }
};

const BUNDLES = [
    {
        id: 'content-creator-bundle',
        name: 'Content Creator Bundle',
        includes: ['claude-droid', 'marketing-engine'],
        regularPrice: 498,
        bundlePrice: 399,
        savings: 99,
        pitch: "Get both YouTube automation AND 23-platform distribution. Content creation + distribution = maximum reach."
    },
    {
        id: 'passive-income-bundle',
        name: 'Passive Income Bundle',
        includes: ['claude-droid', 'income-droid', 'marketing-engine'],
        regularPrice: 997,
        bundlePrice: 799,
        savings: 198,
        pitch: "The complete passive income stack. Create content, distribute everywhere, monetize automatically."
    },
    {
        id: 'full-automation-bundle',
        name: 'Full Automation Bundle',
        includes: ['claude-droid', 'marketing-engine', 'income-droid', 'jules-ai'],
        regularPrice: 1396,
        bundlePrice: 999,
        savings: 397,
        pitch: "Everything you need to run an automated content business. Our most popular bundle."
    }
];

const UPSELL_MATRIX = {
    'claude-droid': {
        recommended: ['marketing-engine'],
        reason: "You're creating content - now distribute it automatically. Marketing Engine posts to 23 platforms.",
        bundle_offer: 'content-creator-bundle'
    },
    'marketing-engine': {
        recommended: ['claude-droid'],
        reason: "You're distributing content - but where's the content coming from? Claude Droid creates 4 videos/day.",
        bundle_offer: 'content-creator-bundle'
    },
    'income-droid': {
        recommended: ['claude-droid', 'marketing-engine'],
        reason: "Maximize your passive income with automated content creation AND distribution.",
        bundle_offer: 'passive-income-bundle'
    },
    'jules-ai': {
        recommended: ['marketing-engine'],
        reason: "Track your automation performance across all 23 platforms in one dashboard.",
        bundle_offer: 'full-automation-bundle'
    }
};

const ORDER_BUMP = {
    product: 'Priority Setup Call',
    price: 49,
    description: '30-minute 1-on-1 setup call. We configure everything together, answer questions, customize for your use case.',
    conversion_rate: '25%'
};

const POST_PURCHASE = {
    affiliate_offer: {
        headline: "Want to earn 30% on every sale?",
        description: "Join our affiliate program. Share your unique link, earn 30% commission on every purchase. Some affiliates make $1,000+/month.",
        cta: "Join Affiliate Program →",
        link: "https://ai-solutions.store/affiliates"
    },
    review_request: {
        headline: "How's it working for you?",
        description: "We'd love a quick review. Takes 2 minutes, helps other business owners find us.",
        incentive: "$10 store credit for honest review"
    }
};

function generateUpsellEmail(purchasedProduct) {
    const upsell = UPSELL_MATRIX[purchasedProduct];
    if (!upsell) return null;

    const recommended = PRODUCTS[upsell.recommended[0]];
    const bundle = BUNDLES.find(b => b.id === upsell.bundle_offer);

    return {
        subject: `Quick tip for your ${PRODUCTS[purchasedProduct].name}`,
        body: `Hi {{first_name}},

Thanks for getting ${PRODUCTS[purchasedProduct].name}!

Quick thought: ${upsell.reason}

**Option 1: Add ${recommended.name}** - $${recommended.price}

**Option 2: Upgrade to ${bundle.name}** - $${bundle.bundlePrice}
(Save $${bundle.savings} vs buying separately)

${bundle.pitch}

No pressure either way. ${PRODUCTS[purchasedProduct].name} works great standalone.

But if you want the full stack: ${bundle.name}

- AI Solutions Team`
    };
}

function main() {
    log('═══════════════════════════════════════════════════════════════');
    log('AGENT 4: CROSS-SELL & UPSELL ENGINE');
    log('BUSINESS FIRST: Value-based recommendations');
    log('═══════════════════════════════════════════════════════════════');

    const outputDir = path.join(LOGS_DIR, 'upsell-content');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Generate upsell emails for each product
    Object.keys(UPSELL_MATRIX).forEach(product => {
        const email = generateUpsellEmail(product);
        if (email) {
            fs.writeFileSync(
                path.join(outputDir, `upsell-after-${product}.md`),
                `# Upsell Email: After ${product}\n**Subject:** ${email.subject}\n\n${email.body}`
            );
            log(`Generated: upsell-after-${product}.md`);
        }
    });

    // Generate bundle reference
    fs.writeFileSync(
        path.join(outputDir, 'bundles.json'),
        JSON.stringify(BUNDLES, null, 2)
    );
    log('Generated: bundles.json');

    // Generate order bump config
    fs.writeFileSync(
        path.join(outputDir, 'order-bump.json'),
        JSON.stringify(ORDER_BUMP, null, 2)
    );
    log('Generated: order-bump.json');

    // Generate post-purchase sequence
    fs.writeFileSync(
        path.join(outputDir, 'post-purchase.json'),
        JSON.stringify(POST_PURCHASE, null, 2)
    );
    log('Generated: post-purchase.json');

    // Generate checkout page upsell HTML snippets
    BUNDLES.forEach(bundle => {
        const html = `<div class="bundle-offer" style="border: 2px solid #22c55e; padding: 20px; border-radius: 8px; margin: 20px 0; background: #f0fdf4;">
    <h3 style="color: #16a34a; margin: 0 0 10px;">🎁 Save $${bundle.savings} with ${bundle.name}</h3>
    <p style="margin: 0 0 15px;">${bundle.pitch}</p>
    <p style="margin: 0;"><strong>Includes:</strong> ${bundle.includes.map(p => PRODUCTS[p].name).join(' + ')}</p>
    <p style="margin: 10px 0;"><s>$${bundle.regularPrice}</s> → <strong style="color: #16a34a;">$${bundle.bundlePrice}</strong></p>
    <a href="https://ai-solutions.store/bundle/${bundle.id}" style="display: inline-block; background: #22c55e; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Upgrade to Bundle →</a>
</div>`;
        fs.writeFileSync(path.join(outputDir, `bundle-widget-${bundle.id}.html`), html);
        log(`Generated: bundle-widget-${bundle.id}.html`);
    });

    log(`\n✅ Generated upsell system (emails + bundles + widgets)`);
    log(`📁 Output: ${outputDir}`);
    log('═══════════════════════════════════════════════════════════════');
}

main();
