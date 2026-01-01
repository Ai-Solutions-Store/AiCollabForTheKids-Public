/**
 * Amazon Associates Content Generator
 * Generates product recommendation posts for tech tools, books, and equipment
 * that complement AI Solutions Store products
 *
 * FOR THE KIDS - 60/30/10 (backend only)
 *
 * Revenue potential: 4-10% commission on Amazon purchases
 * Combined with AI product sales = diversified income stream
 */

const fs = require('fs');
const path = require('path');

const LOGS_DIR = 'C:\\AiCollabForTheKids\\logs';
const OUTPUT_DIR = path.join(LOGS_DIR, 'amazon-affiliate');
const STATE_FILE = path.join(OUTPUT_DIR, 'amazon-affiliate-state.json');
const LOG_FILE = path.join(LOGS_DIR, 'amazon-affiliate.log');
const CONTENT_FILE = path.join(OUTPUT_DIR, 'amazon-affiliate-ready.md');

// Ensure directories exist
if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
}
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function log(message) {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(LOG_FILE, entry);
    console.log(entry.trim());
}

// Amazon affiliate link placeholder format
// Replace AFFILIATE_TAG with your Amazon Associates tag
const AFFILIATE_TAG = '{{AMAZON_AFFILIATE_TAG}}';
const AMAZON_LINK = (asin) => `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`;

// AI Solutions Store products for cross-promotion
const AI_PRODUCTS = {
    claudeDroid: { name: 'Claude Droid', price: 299, use: 'YouTube Shorts automation' },
    incomeDroid: { name: 'Income Droid', price: 499, use: 'Multi-platform content syndication' },
    marketingEngine: { name: 'Marketing Engine', price: 199, use: '12-platform marketing automation' },
    julesAI: { name: 'Jules AI', price: 399, use: 'AI agent monitoring dashboard' }
};

// Amazon product recommendations organized by category
const PRODUCT_RECOMMENDATIONS = {
    // Tech Tools & Hardware
    techTools: [
        {
            id: 'tech-1',
            category: 'Tech Tools',
            name: 'Logitech StreamCam',
            asin: '{{ASIN_STREAMCAM}}',
            price_range: '$129-169',
            description: 'Professional webcam for content creators',
            why_recommend: 'Perfect for recording video content that Claude Droid can repurpose into Shorts',
            pairs_with: 'claudeDroid'
        },
        {
            id: 'tech-2',
            category: 'Tech Tools',
            name: 'Blue Yeti USB Microphone',
            asin: '{{ASIN_BLUE_YETI}}',
            price_range: '$99-129',
            description: 'Studio-quality USB microphone',
            why_recommend: 'Crystal clear audio for AI-generated video content and podcasts',
            pairs_with: 'incomeDroid'
        },
        {
            id: 'tech-3',
            category: 'Tech Tools',
            name: 'Elgato Stream Deck',
            asin: '{{ASIN_STREAM_DECK}}',
            price_range: '$149-249',
            description: 'Customizable control center for creators',
            why_recommend: 'One-click triggers for your automation scripts and marketing workflows',
            pairs_with: 'marketingEngine'
        },
        {
            id: 'tech-4',
            category: 'Tech Tools',
            name: 'Samsung T7 Portable SSD (1TB)',
            asin: '{{ASIN_SAMSUNG_SSD}}',
            price_range: '$89-119',
            description: 'Fast external storage for content',
            why_recommend: 'Store months of AI-generated video content with fast transfer speeds',
            pairs_with: 'claudeDroid'
        },
        {
            id: 'tech-5',
            category: 'Tech Tools',
            name: 'Anker USB-C Hub',
            asin: '{{ASIN_ANKER_HUB}}',
            price_range: '$35-55',
            description: 'Multi-port hub for productivity',
            why_recommend: 'Connect all your content creation gear to run automation setups',
            pairs_with: 'marketingEngine'
        },
        {
            id: 'tech-6',
            category: 'Tech Tools',
            name: 'Ring Light with Tripod Stand',
            asin: '{{ASIN_RING_LIGHT}}',
            price_range: '$29-59',
            description: 'Professional lighting for video',
            why_recommend: 'Better lighting = better source content for AI video generation',
            pairs_with: 'claudeDroid'
        },
        {
            id: 'tech-7',
            category: 'Tech Tools',
            name: 'Raspberry Pi 5 (8GB)',
            asin: '{{ASIN_RPI5}}',
            price_range: '$80-95',
            description: 'Mini computer for 24/7 automation',
            why_recommend: 'Run your marketing automation scripts 24/7 with minimal power draw',
            pairs_with: 'marketingEngine'
        },
        {
            id: 'tech-8',
            category: 'Tech Tools',
            name: 'Dell OptiPlex Micro (Refurbished)',
            asin: '{{ASIN_DELL_MICRO}}',
            price_range: '$150-250',
            description: 'Compact PC for automation server',
            why_recommend: 'Dedicated machine to run Income Droid and other automation 24/7',
            pairs_with: 'incomeDroid'
        }
    ],

    // Books for AI/Automation/Business
    books: [
        {
            id: 'book-1',
            category: 'Books',
            name: 'The 4-Hour Workweek by Tim Ferriss',
            asin: '{{ASIN_4HWW}}',
            price_range: '$12-18',
            description: 'The automation mindset bible',
            why_recommend: 'The philosophy behind why we build automation tools - work smarter, not harder',
            pairs_with: 'incomeDroid'
        },
        {
            id: 'book-2',
            category: 'Books',
            name: 'Automate the Boring Stuff with Python',
            asin: '{{ASIN_AUTOMATE_PYTHON}}',
            price_range: '$25-35',
            description: 'Learn to code automation scripts',
            why_recommend: 'Understand the fundamentals behind tools like Marketing Engine',
            pairs_with: 'marketingEngine'
        },
        {
            id: 'book-3',
            category: 'Books',
            name: 'Building a StoryBrand by Donald Miller',
            asin: '{{ASIN_STORYBRAND}}',
            price_range: '$15-22',
            description: 'Clarify your marketing message',
            why_recommend: 'Better messaging = better content for your AI tools to amplify',
            pairs_with: 'marketingEngine'
        },
        {
            id: 'book-4',
            category: 'Books',
            name: 'YouTube Secrets by Sean Cannell',
            asin: '{{ASIN_YT_SECRETS}}',
            price_range: '$14-20',
            description: 'YouTube growth strategies',
            why_recommend: 'Combine human strategy with Claude Droid automation for max growth',
            pairs_with: 'claudeDroid'
        },
        {
            id: 'book-5',
            category: 'Books',
            name: 'Crushing It! by Gary Vaynerchuk',
            asin: '{{ASIN_CRUSHING_IT}}',
            price_range: '$16-24',
            description: 'Social media business building',
            why_recommend: 'Learn the strategy, let Income Droid handle the execution',
            pairs_with: 'incomeDroid'
        },
        {
            id: 'book-6',
            category: 'Books',
            name: 'The Mom Test by Rob Fitzpatrick',
            asin: '{{ASIN_MOM_TEST}}',
            price_range: '$12-18',
            description: 'Customer research that works',
            why_recommend: 'Validate your content ideas before scaling with automation',
            pairs_with: 'marketingEngine'
        },
        {
            id: 'book-7',
            category: 'Books',
            name: 'Deep Work by Cal Newport',
            asin: '{{ASIN_DEEP_WORK}}',
            price_range: '$14-20',
            description: 'Focus in a distracted world',
            why_recommend: 'Automate the busywork, focus on what matters',
            pairs_with: 'julesAI'
        },
        {
            id: 'book-8',
            category: 'Books',
            name: 'Atomic Habits by James Clear',
            asin: '{{ASIN_ATOMIC_HABITS}}',
            price_range: '$14-20',
            description: 'Build better systems',
            why_recommend: 'Automation is the ultimate habit - it runs without willpower',
            pairs_with: 'incomeDroid'
        }
    ],

    // Equipment for Content Creation
    equipment: [
        {
            id: 'equip-1',
            category: 'Equipment',
            name: 'NVIDIA GeForce RTX 4060',
            asin: '{{ASIN_RTX4060}}',
            price_range: '$299-349',
            description: 'GPU for AI and video processing',
            why_recommend: 'Speed up FFmpeg rendering for Claude Droid video generation',
            pairs_with: 'claudeDroid'
        },
        {
            id: 'equip-2',
            category: 'Equipment',
            name: 'Crucial 32GB DDR4 RAM Kit',
            asin: '{{ASIN_RAM_32GB}}',
            price_range: '$59-89',
            description: 'Memory upgrade for productivity',
            why_recommend: 'Run multiple automation scripts simultaneously without slowdown',
            pairs_with: 'marketingEngine'
        },
        {
            id: 'equip-3',
            category: 'Equipment',
            name: 'UPS Battery Backup 1500VA',
            asin: '{{ASIN_UPS}}',
            price_range: '$129-179',
            description: 'Power protection for servers',
            why_recommend: 'Keep your 24/7 automation running through power outages',
            pairs_with: 'incomeDroid'
        },
        {
            id: 'equip-4',
            category: 'Equipment',
            name: 'ASUS 27" 4K Monitor',
            asin: '{{ASIN_4K_MONITOR}}',
            price_range: '$299-399',
            description: 'High-res display for content work',
            why_recommend: 'See your AI-generated content in full detail',
            pairs_with: 'claudeDroid'
        },
        {
            id: 'equip-5',
            category: 'Equipment',
            name: 'Logitech MX Keys Keyboard',
            asin: '{{ASIN_MX_KEYS}}',
            price_range: '$99-129',
            description: 'Premium wireless keyboard',
            why_recommend: 'Comfortable input for long content creation sessions',
            pairs_with: 'marketingEngine'
        },
        {
            id: 'equip-6',
            category: 'Equipment',
            name: 'Standing Desk Converter',
            asin: '{{ASIN_STANDING_DESK}}',
            price_range: '$149-249',
            description: 'Ergonomic workspace upgrade',
            why_recommend: 'Stay healthy while your bots work 24/7',
            pairs_with: 'julesAI'
        },
        {
            id: 'equip-7',
            category: 'Equipment',
            name: 'Green Screen Kit with Stand',
            asin: '{{ASIN_GREEN_SCREEN}}',
            price_range: '$39-79',
            description: 'Professional video backgrounds',
            why_recommend: 'Create pro-looking source content for AI video tools',
            pairs_with: 'claudeDroid'
        },
        {
            id: 'equip-8',
            category: 'Equipment',
            name: 'Teleprompter for Smartphones',
            asin: '{{ASIN_TELEPROMPTER}}',
            price_range: '$99-159',
            description: 'Read scripts naturally on camera',
            why_recommend: 'Record AI-written scripts like a pro',
            pairs_with: 'incomeDroid'
        }
    ]
};

// Content templates for different platforms
const CONTENT_TEMPLATES = {
    // Twitter/X thread format
    twitterThread: (product) => {
        const aiProduct = AI_PRODUCTS[product.pairs_with];
        return {
            type: 'twitter_thread',
            title: `Amazon Recommendation: ${product.name}`,
            content: `THREAD: Essential gear for AI content automation

1/ If you're using AI tools to automate content creation, you need the right equipment.

Here's what I recommend for ${product.category.toLowerCase()}:

2/ ${product.name} (${product.price_range})

${product.description}

Why? ${product.why_recommend}

${AMAZON_LINK(product.asin)}

3/ This pairs perfectly with ${aiProduct.name} (${aiProduct.use})

Automation + quality gear = professional results without the grind.

4/ More recommendations at ai-solutions.store/recommended-gear

FOR THE KIDS.`
        };
    },

    // Blog post format
    blogPost: (products, category) => {
        const categoryProducts = products.filter(p => p.category === category);
        return {
            type: 'blog_post',
            title: `Best ${category} for AI Content Automation in 2025`,
            content: `# Best ${category} for AI Content Automation in 2025

Running AI automation tools like Claude Droid, Income Droid, or Marketing Engine? You need the right ${category.toLowerCase()} to get professional results.

Here are my top recommendations:

${categoryProducts.map((p, i) => {
    const aiProduct = AI_PRODUCTS[p.pairs_with];
    return `## ${i + 1}. ${p.name}

**Price Range:** ${p.price_range}

${p.description}

**Why I Recommend It:** ${p.why_recommend}

**Best Paired With:** ${aiProduct.name} ($${aiProduct.price}) - ${aiProduct.use}

[Check Price on Amazon](${AMAZON_LINK(p.asin)})

---`;
}).join('\n\n')}

## The Automation Philosophy

These tools help you create better source content that AI can amplify.

The goal isn't to work harder - it's to set up systems that work 24/7.

Check out our automation tools at [ai-solutions.store](https://ai-solutions.store):
- Claude Droid ($299) - YouTube Shorts automation
- Income Droid ($499) - Multi-platform content syndication
- Marketing Engine ($199) - 12-platform marketing automation
- Jules AI ($399) - AI agent monitoring dashboard

**FOR THE KIDS.**

---

*This post contains affiliate links. We may earn a commission at no extra cost to you.*
*Generated by AI Solutions Marketing Engine*`
        };
    },

    // Newsletter blurb format
    newsletterBlurb: (product) => {
        const aiProduct = AI_PRODUCTS[product.pairs_with];
        return {
            type: 'newsletter',
            title: `Tool of the Week: ${product.name}`,
            content: `**TOOL OF THE WEEK**

${product.name} (${product.price_range})

${product.description}

I use this with ${aiProduct.name} for ${aiProduct.use.toLowerCase()}.

${product.why_recommend}

[Get it on Amazon](${AMAZON_LINK(product.asin)})

*Affiliate link - helps support the newsletter*`
        };
    },

    // YouTube description format
    youtubeDescription: (products) => {
        return {
            type: 'youtube_description',
            title: 'Recommended Gear - YouTube Description',
            content: `GEAR I USE FOR AI CONTENT AUTOMATION:

${products.slice(0, 6).map(p => `${p.name} (${p.price_range}): ${AMAZON_LINK(p.asin)}`).join('\n')}

AUTOMATION TOOLS I USE:
- Claude Droid (YouTube automation): https://ai-solutions.store/claude-droid
- Income Droid (Multi-platform): https://ai-solutions.store/income-droid
- Marketing Engine (Social media): https://ai-solutions.store/marketing-engine

*Above links are affiliate links. I may earn a commission at no extra cost to you.*

---
FOR THE KIDS.`
        };
    },

    // Social media carousel post
    carouselPost: (category) => {
        const products = PRODUCT_RECOMMENDATIONS[
            category === 'Tech Tools' ? 'techTools' :
            category === 'Books' ? 'books' : 'equipment'
        ].slice(0, 5);

        return {
            type: 'carousel',
            title: `Top 5 ${category} for Content Automation`,
            slides: [
                {
                    slide: 1,
                    content: `TOP 5 ${category.toUpperCase()} FOR AI CONTENT AUTOMATION

Swipe to see my recommendations

(Pairs with Claude Droid, Income Droid & Marketing Engine)`
                },
                ...products.map((p, i) => ({
                    slide: i + 2,
                    content: `#${i + 1}: ${p.name}

${p.price_range}

${p.description}

${p.why_recommend}

Link in bio`
                })),
                {
                    slide: products.length + 2,
                    content: `GET ALL LINKS:

ai-solutions.store/recommended-gear

Plus check out our AI automation tools:
- Claude Droid $299
- Income Droid $499
- Marketing Engine $199

FOR THE KIDS.`
                }
            ]
        };
    },

    // Email marketing format
    emailMarketing: (category) => {
        const products = PRODUCT_RECOMMENDATIONS[
            category === 'Tech Tools' ? 'techTools' :
            category === 'Books' ? 'books' : 'equipment'
        ].slice(0, 3);

        return {
            type: 'email',
            title: `Recommended ${category} for Your AI Setup`,
            subject: `The ${category.toLowerCase()} I use for AI automation`,
            content: `Hey,

You've got the AI tools. Now let's talk about the ${category.toLowerCase()} that makes them even better.

Here are my top 3 picks:

${products.map((p, i) => {
    const aiProduct = AI_PRODUCTS[p.pairs_with];
    return `**${i + 1}. ${p.name}** (${p.price_range})

${p.description}

Why I recommend it: ${p.why_recommend}

Pairs with: ${aiProduct.name}

[Check it out](${AMAZON_LINK(p.asin)})`;
}).join('\n\n---\n\n')}

---

These are affiliate links - helps keep the lights on.

The real magic happens when you combine quality gear with automation tools that work 24/7.

Speaking of which, if you haven't checked out our tools yet:
- Claude Droid ($299) - YouTube Shorts on autopilot
- Income Droid ($499) - Multi-platform content machine
- Marketing Engine ($199) - 12 platforms, zero manual posting

[Browse all tools](https://ai-solutions.store)

FOR THE KIDS.

- The AI Solutions Team`
        };
    }
};

function getState() {
    try {
        if (fs.existsSync(STATE_FILE)) {
            return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
        }
    } catch (err) {
        log(`Error reading state: ${err.message}`);
    }
    return {
        lastIndex: -1,
        lastCategory: null,
        generated: [],
        stats: {
            techToolsGenerated: 0,
            booksGenerated: 0,
            equipmentGenerated: 0,
            totalGenerated: 0
        }
    };
}

function saveState(state) {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function getAllProducts() {
    return [
        ...PRODUCT_RECOMMENDATIONS.techTools,
        ...PRODUCT_RECOMMENDATIONS.books,
        ...PRODUCT_RECOMMENDATIONS.equipment
    ];
}

function getNextProduct() {
    const state = getState();
    const allProducts = getAllProducts();
    const nextIndex = (state.lastIndex + 1) % allProducts.length;
    return { product: allProducts[nextIndex], index: nextIndex };
}

function generateAllContentTypes(product) {
    const contents = [];

    // Twitter thread
    contents.push(CONTENT_TEMPLATES.twitterThread(product));

    // Newsletter blurb
    contents.push(CONTENT_TEMPLATES.newsletterBlurb(product));

    return contents;
}

async function main() {
    log('===============================================================');
    log('AMAZON ASSOCIATES CONTENT GENERATOR');
    log('FOR THE KIDS - 60/30/10');
    log('===============================================================');

    const state = getState();
    const { product, index } = getNextProduct();
    const allProducts = getAllProducts();

    log(`\nGenerating content for product ${index + 1} of ${allProducts.length}`);
    log(`Product: ${product.name}`);
    log(`Category: ${product.category}`);
    log(`Price Range: ${product.price_range}`);

    // Generate individual product content
    const productContents = generateAllContentTypes(product);

    // Generate category blog post
    const blogPost = CONTENT_TEMPLATES.blogPost(allProducts, product.category);

    // Generate YouTube description with top products
    const youtubeDesc = CONTENT_TEMPLATES.youtubeDescription(allProducts);

    // Generate carousel post
    const carousel = CONTENT_TEMPLATES.carouselPost(product.category);

    // Generate email marketing
    const email = CONTENT_TEMPLATES.emailMarketing(product.category);

    // Compile all content into output file
    const outputContent = `# Amazon Associates Content - Ready to Post

**Generated:** ${new Date().toISOString()}
**Product Focus:** ${product.name}
**Category:** ${product.category}

---

## IMPORTANT: Before Posting

1. Replace \`{{AMAZON_AFFILIATE_TAG}}\` with your Amazon Associates tag
2. Replace \`{{ASIN_*}}\` placeholders with actual Amazon ASINs
3. Verify product availability and prices
4. Ensure FTC compliance by disclosing affiliate relationships

---

## Twitter Thread

**For:** Twitter/X
**Format:** Thread

\`\`\`
${productContents[0].content}
\`\`\`

---

## Newsletter Blurb

**For:** Email newsletters, Substack, etc.
**Format:** Short blurb

\`\`\`
${productContents[1].content}
\`\`\`

---

## Blog Post

**For:** Blog, Medium, Dev.to, etc.
**Format:** Full article

${blogPost.content}

---

## YouTube Description

**For:** YouTube video descriptions
**Format:** Links section

\`\`\`
${youtubeDesc.content}
\`\`\`

---

## Carousel Post

**For:** Instagram, LinkedIn
**Format:** Multi-slide

${carousel.slides.map(s => `**Slide ${s.slide}:**
\`\`\`
${s.content}
\`\`\``).join('\n\n')}

---

## Email Marketing

**Subject:** ${email.subject}
**For:** Email campaigns

\`\`\`
${email.content}
\`\`\`

---

## Quick Reference: All Amazon Links

### Tech Tools
${PRODUCT_RECOMMENDATIONS.techTools.map(p => `- ${p.name}: ${AMAZON_LINK(p.asin)}`).join('\n')}

### Books
${PRODUCT_RECOMMENDATIONS.books.map(p => `- ${p.name}: ${AMAZON_LINK(p.asin)}`).join('\n')}

### Equipment
${PRODUCT_RECOMMENDATIONS.equipment.map(p => `- ${p.name}: ${AMAZON_LINK(p.asin)}`).join('\n')}

---

## Cross-Promotion: AI Solutions Products

Always pair Amazon recommendations with our products:

| AI Product | Price | Use Case |
|------------|-------|----------|
| Claude Droid | $299 | YouTube Shorts automation |
| Income Droid | $499 | Multi-platform content syndication |
| Marketing Engine | $199 | 12-platform marketing automation |
| Jules AI | $399 | AI agent monitoring dashboard |

**Store URL:** https://ai-solutions.store

---

## Affiliate Disclosure Template

Use this at the end of any content:

> *This content contains affiliate links. If you make a purchase through these links, we may earn a commission at no additional cost to you. We only recommend products we use and trust.*

---

## Stats

- Products in database: ${allProducts.length}
- Tech Tools: ${PRODUCT_RECOMMENDATIONS.techTools.length}
- Books: ${PRODUCT_RECOMMENDATIONS.books.length}
- Equipment: ${PRODUCT_RECOMMENDATIONS.equipment.length}

---

*Generated by AI Solutions Marketing Engine*
*https://ai-solutions.store*
*FOR THE KIDS.*
`;

    // Write content file
    fs.writeFileSync(CONTENT_FILE, outputContent);
    log(`\nContent saved to: ${CONTENT_FILE}`);

    // Generate individual category files
    const categories = ['techTools', 'books', 'equipment'];
    categories.forEach(cat => {
        const catName = cat === 'techTools' ? 'Tech Tools' :
                       cat === 'books' ? 'Books' : 'Equipment';
        const catProducts = PRODUCT_RECOMMENDATIONS[cat];
        const catFile = path.join(OUTPUT_DIR, `amazon-${cat.toLowerCase()}.json`);
        fs.writeFileSync(catFile, JSON.stringify({
            category: catName,
            products: catProducts,
            affiliateTag: AFFILIATE_TAG,
            generatedAt: new Date().toISOString()
        }, null, 2));
        log(`Generated category file: amazon-${cat.toLowerCase()}.json`);
    });

    // Update state
    state.lastIndex = index;
    state.lastCategory = product.category;
    state.stats.totalGenerated++;
    if (product.category === 'Tech Tools') state.stats.techToolsGenerated++;
    if (product.category === 'Books') state.stats.booksGenerated++;
    if (product.category === 'Equipment') state.stats.equipmentGenerated++;
    state.generated.push({
        id: product.id,
        name: product.name,
        category: product.category,
        generatedAt: new Date().toISOString()
    });
    if (state.generated.length > 100) state.generated = state.generated.slice(-100);
    saveState(state);

    log('\n===============================================================');
    log('CONTENT GENERATION COMPLETE');
    log('===============================================================');
    log(`\nProduct: ${product.name}`);
    log(`Category: ${product.category}`);
    log(`Pairs with: ${AI_PRODUCTS[product.pairs_with].name}`);
    log(`\nFiles generated:`);
    log(`  - ${CONTENT_FILE}`);
    log(`  - ${path.join(OUTPUT_DIR, 'amazon-techtools.json')}`);
    log(`  - ${path.join(OUTPUT_DIR, 'amazon-books.json')}`);
    log(`  - ${path.join(OUTPUT_DIR, 'amazon-equipment.json')}`);
    log(`\nTotal products in database: ${allProducts.length}`);
    log(`Total content pieces generated: ${state.stats.totalGenerated}`);
    log('\n===============================================================');
    log('FOR THE KIDS - 60/30/10');
    log('===============================================================');

    process.exit(0);
}

// Export for use in other scripts
module.exports = {
    PRODUCT_RECOMMENDATIONS,
    CONTENT_TEMPLATES,
    AI_PRODUCTS,
    AFFILIATE_TAG,
    AMAZON_LINK
};

if (require.main === module) {
    main();
}
