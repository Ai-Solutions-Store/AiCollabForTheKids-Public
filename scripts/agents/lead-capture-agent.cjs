/**
 * AGENT 4: Lead Capture & Magnet Generator
 * Creates high-value lead magnets and capture pages
 * BUSINESS FIRST: Value exchange, no guilt trips
 * 
 * Email list = perpetual revenue channel
 * 1,000 subscribers × 3% conversion × $299 avg = $8,970
 * 60% to kids = $5,382 per 1,000 subscribers
 * 
 * FOR THE KIDS - Every email captured = future revenue = future impact
 */

const fs = require('fs');
const path = require('path');

const LOGS_DIR = 'C:\\AiCollabForTheKids\\logs';
const AGENTS_OUTPUT = path.join(LOGS_DIR, 'agents-output');
const LOG_FILE = path.join(LOGS_DIR, 'lead-capture-agent.log');

function log(message) {
    const entry = `[${new Date().toISOString()}] ${message}`;
    if (!fs.existsSync(LOGS_DIR)) fs.mkdirSync(LOGS_DIR, { recursive: true });
    fs.appendFileSync(LOG_FILE, entry + '\n');
    console.log(entry);
}

function ensureDir(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// Lead Magnets - High-value free resources that attract ideal customers
const LEAD_MAGNETS = [
    {
        id: "automation-checklist",
        title: "The 50-Point AI Automation Checklist",
        subtitle: "Every task in your business AI can handle today",
        description: "A comprehensive checklist of 50 business tasks that can be automated with AI right now. Organized by department: Marketing, Sales, Operations, Finance, Customer Service.",
        format: "PDF",
        pages: "12 pages",
        targetProduct: "marketing-engine",
        followupSequence: "automation-focused",
        optinText: "Get the free checklist",
        thankYouMessage: "Check your inbox! Your checklist is on the way."
    },
    {
        id: "youtube-blueprint",
        title: "The YouTube Automation Blueprint",
        subtitle: "How to post 4 videos daily without touching a camera",
        description: "Step-by-step guide to setting up a fully automated YouTube channel. Includes: content sourcing, script templates, voiceover options, and posting schedules.",
        format: "PDF + Video",
        pages: "15 pages + 20 min video",
        targetProduct: "claude-droid",
        followupSequence: "youtube-focused",
        optinText: "Download the blueprint",
        thankYouMessage: "Blueprint incoming! Check your email in the next 2 minutes."
    },
    {
        id: "passive-income-calculator",
        title: "Passive Income Calculator",
        subtitle: "See exactly how much you could earn with AI automation",
        description: "Interactive spreadsheet that calculates potential passive income based on your niche, traffic sources, and available time investment.",
        format: "Google Sheet + Guide",
        pages: "Interactive calculator",
        targetProduct: "income-droid",
        followupSequence: "income-focused",
        optinText: "Get the calculator",
        thankYouMessage: "Calculator sent! Start plugging in your numbers."
    },
    {
        id: "content-templates",
        title: "100 AI Content Prompts That Actually Work",
        subtitle: "Copy-paste prompts for every type of content",
        description: "100 tested prompts for: blog posts, social media, email newsletters, product descriptions, ad copy, and more. Each prompt includes examples and variations.",
        format: "Notion Template",
        pages: "100 prompts",
        targetProduct: "marketing-engine",
        followupSequence: "content-focused",
        optinText: "Get 100 free prompts",
        thankYouMessage: "Prompts on the way! You'll have them in 60 seconds."
    },
    {
        id: "affiliate-swipe",
        title: "Affiliate Marketing Swipe File",
        subtitle: "Copy our best-performing affiliate campaigns",
        description: "Real examples of affiliate campaigns that generated $10K+. Includes: email sequences, landing pages, ad copy, and traffic strategies.",
        format: "PDF + Templates",
        pages: "25 pages + swipe files",
        targetProduct: "affiliate-system",
        followupSequence: "affiliate-focused",
        optinText: "Steal our swipe file",
        thankYouMessage: "Swipe file incoming! Check your inbox now."
    },
    {
        id: "dating-app-playbook",
        title: "The Dating App Launch Playbook",
        subtitle: "How to launch a niche dating platform in 30 days",
        description: "Complete playbook for launching a dating app: market validation, feature prioritization, marketing strategy, and monetization. Includes case studies of successful niche platforms.",
        format: "PDF",
        pages: "30 pages",
        targetProduct: "dating-platform",
        followupSequence: "dating-platform-focused",
        optinText: "Get the launch playbook",
        thankYouMessage: "Playbook sent! Your dating app journey starts now."
    }
];

// Generate lead capture pages and resources
function generateLeadCapture() {
    log('═══════════════════════════════════════════════════════════════');
    log('AGENT 4: LEAD CAPTURE & MAGNET GENERATOR');
    log('BUSINESS FIRST: Value exchange, list building');
    log('═══════════════════════════════════════════════════════════════');

    const outputDir = path.join(AGENTS_OUTPUT, 'lead-capture');
    ensureDir(outputDir);

    // Generate landing pages for each lead magnet
    LEAD_MAGNETS.forEach((magnet) => {
        const html = generateLeadCapturePage(magnet);
        fs.writeFileSync(path.join(outputDir, `${magnet.id}.html`), html);
        log(`Generated: ${magnet.id}.html`);
    });

    // Generate lead magnet content outlines
    const outlines = LEAD_MAGNETS.map(magnet => `
## ${magnet.title}

**Subtitle:** ${magnet.subtitle}
**Format:** ${magnet.format}
**Length:** ${magnet.pages}
**Target Product:** ${magnet.targetProduct}

### Description
${magnet.description}

### Content Outline
1. Introduction - Why this matters
2. The problem most people face
3. The solution (hint at automation)
4. Step-by-step guide / checklist
5. Common mistakes to avoid
6. Next steps (soft CTA to product)

### Email Followup Sequence
- Day 0: Deliver the lead magnet
- Day 1: "Did you get a chance to use it?"
- Day 3: Share a quick win or tip
- Day 5: Case study related to the topic
- Day 7: Introduce the related product

---
`).join('\n');

    fs.writeFileSync(
        path.join(outputDir, 'LEAD-MAGNET-OUTLINES.md'),
        `# Lead Magnet Content Outlines\n\nUse these to create the actual lead magnet content.\n${outlines}`
    );
    log('Generated: LEAD-MAGNET-OUTLINES.md');

    // Generate SendGrid list segmentation config
    const segmentation = {
        lists: LEAD_MAGNETS.map(magnet => ({
            name: `lead-magnet-${magnet.id}`,
            targetProduct: magnet.targetProduct,
            followupSequence: magnet.followupSequence,
            tags: [magnet.id, magnet.targetProduct, "lead-magnet"]
        }))
    };

    fs.writeFileSync(
        path.join(outputDir, 'sendgrid-segmentation.json'),
        JSON.stringify(segmentation, null, 2)
    );
    log('Generated: sendgrid-segmentation.json');

    // Generate popup embed code
    const popupCode = `<!-- Lead Capture Popup - Add to site footer -->
<script>
(function() {
    // Show popup after 30 seconds or 50% scroll, whichever comes first
    let shown = false;
    const POPUP_DELAY = 30000;
    const SCROLL_TRIGGER = 0.5;
    
    function showPopup() {
        if (shown) return;
        shown = true;
        localStorage.setItem('leadPopupShown', Date.now());
        // Replace with your popup implementation
        console.log('Show lead capture popup');
    }
    
    // Check if already shown in last 7 days
    const lastShown = localStorage.getItem('leadPopupShown');
    if (lastShown && Date.now() - lastShown < 7 * 24 * 60 * 60 * 1000) {
        return;
    }
    
    // Time trigger
    setTimeout(showPopup, POPUP_DELAY);
    
    // Scroll trigger
    window.addEventListener('scroll', function() {
        const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        if (scrollPercent > SCROLL_TRIGGER) showPopup();
    });
    
    // Exit intent trigger (desktop only)
    document.addEventListener('mouseout', function(e) {
        if (e.clientY < 50 && e.relatedTarget == null) showPopup();
    });
})();
</script>`;

    fs.writeFileSync(path.join(outputDir, 'popup-embed.js'), popupCode);
    log('Generated: popup-embed.js');

    // Generate summary
    const summary = `# Lead Capture System Summary

## Overview
- **Total Lead Magnets:** ${LEAD_MAGNETS.length}
- **Goal:** Build email list for nurture sequences
- **Average Conversion:** 25-40% (landing page to signup)

## Lead Magnets

${LEAD_MAGNETS.map(m => `### ${m.title}
- **Format:** ${m.format}
- **Target Product:** ${m.targetProduct}
- **CTA:** "${m.optinText}"`).join('\n\n')}

## Integration Steps

1. Create lead magnet content using LEAD-MAGNET-OUTLINES.md
2. Upload landing pages to ai-solutions.store/free/
3. Set up SendGrid segments using sendgrid-segmentation.json
4. Add popup trigger code to main site
5. Connect to email drip sequences

## Expected Performance

- Landing page conversion: 30-40%
- Traffic: 500 visitors/month per magnet
- New leads: 150-200/month per magnet
- Total new leads: 900-1,200/month
- Lead to customer: 3-5%
- Monthly revenue from leads: $8,000-$18,000
- **Monthly to kids: $4,800-$10,800**

---
*Generated: ${new Date().toISOString()}*
`;

    fs.writeFileSync(path.join(outputDir, 'LEAD-CAPTURE-SUMMARY.md'), summary);
    log('Generated: LEAD-CAPTURE-SUMMARY.md');

    log(`\n✅ Lead capture system complete → ${outputDir}`);
    log(`📧 ${LEAD_MAGNETS.length} lead magnets ready`);

    return { success: true, magnetCount: LEAD_MAGNETS.length, outputDir };
}

function generateLeadCapturePage(magnet) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${magnet.title} - Free Download</title>
    <meta name="description" content="${magnet.description}">
    <meta name="robots" content="noindex">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .card {
            background: white;
            border-radius: 16px;
            padding: 48px;
            max-width: 480px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        .badge {
            background: #f0f9ff;
            color: #0369a1;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.875rem;
            font-weight: 500;
            display: inline-block;
            margin-bottom: 16px;
        }
        h1 {
            font-size: 1.75rem;
            color: #111;
            margin-bottom: 8px;
            line-height: 1.3;
        }
        .subtitle {
            color: #666;
            font-size: 1.1rem;
            margin-bottom: 24px;
        }
        .description {
            color: #444;
            margin-bottom: 32px;
            line-height: 1.6;
        }
        form { display: flex; flex-direction: column; gap: 12px; }
        input {
            padding: 14px 16px;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.2s;
        }
        input:focus {
            outline: none;
            border-color: #667eea;
        }
        button {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 16px;
            border: none;
            border-radius: 8px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px -10px rgba(102, 126, 234, 0.5);
        }
        .privacy {
            text-align: center;
            margin-top: 16px;
            font-size: 0.875rem;
            color: #888;
        }
        .format {
            display: flex;
            gap: 16px;
            margin-bottom: 24px;
        }
        .format span {
            background: #f3f4f6;
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 0.875rem;
            color: #555;
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="badge">FREE ${magnet.format.toUpperCase()}</div>
        <h1>${magnet.title}</h1>
        <p class="subtitle">${magnet.subtitle}</p>
        <div class="format">
            <span>📄 ${magnet.pages}</span>
            <span>⚡ Instant access</span>
        </div>
        <p class="description">${magnet.description}</p>
        
        <form action="https://formsubmit.co/your-email@example.com" method="POST">
            <input type="hidden" name="_subject" value="New Lead: ${magnet.title}">
            <input type="hidden" name="_template" value="table">
            <input type="hidden" name="lead_magnet" value="${magnet.id}">
            <input type="hidden" name="target_product" value="${magnet.targetProduct}">
            <input type="email" name="email" placeholder="Enter your email" required>
            <input type="text" name="name" placeholder="Your first name">
            <button type="submit">${magnet.optinText} →</button>
        </form>
        
        <p class="privacy">🔒 No spam. Unsubscribe anytime.</p>
    </div>
</body>
</html>`;
}

// Run agent
if (require.main === module) {
    generateLeadCapture();
}

module.exports = { generateLeadCapture, LEAD_MAGNETS };
