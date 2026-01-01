/**
 * Holiday Urgency Campaign - AI Solutions Store + YouAndINotAI
 * BUSINESS FIRST: Focus on value, deals, and limited time offers
 * NO charity mentions - Gospel handles the 60/30/10 silently
 */

const fs = require('fs');
const path = require('path');

const LOGS_DIR = 'C:\\AiCollabForTheKids\\logs';
const LOG_FILE = path.join(LOGS_DIR, 'holiday-campaign.log');

function log(message) {
    const entry = `[${new Date().toISOString()}] ${message}\n`;
    fs.appendFileSync(LOG_FILE, entry);
    console.log(entry.trim());
}

// Holiday campaign content
const CAMPAIGNS = {
    twitter: [
        {
            product: "AI Solutions Store",
            text: `🎄 Holiday Deal: $1 AI consultation

Start 2025 with automation that pays for itself.

AI Solutions Store:
• Business process automation
• Custom AI implementations
• Zero subscriptions

First 50 customers get priority support.

https://ai-solutions.store

#HolidayDeals #AI2025`
        },
        {
            product: "AI Solutions Store", 
            text: `New Year's Resolution: Stop doing tasks AI can do for you.

AI Solutions Store - Holiday pricing:
📦 Claude Droid: $299 (automates content)
📦 Marketing Engine: $199 (17-platform automation)
📦 Income Droid: $499 (passive revenue systems)

$1 consultation to start.

https://ai-solutions.store`
        },
        {
            product: "YouAndINotAI",
            text: `2025 Resolution: Only match with REAL people.

YouAndINotAI:
✅ AI-verified profiles
✅ Zero fake accounts
✅ Real humans only

New Year. New dating experience.

https://youandinotai.com

#NewYear2025 #DatingGoals`
        },
        {
            product: "YouAndINotAI",
            text: `Tired of dating apps filled with fakes?

Start 2025 with verified-only dating:

🔒 Every profile AI-verified
🤖 Bot detection that works
💯 100% real matches

Join the waitlist: https://youandinotai.com

#SingleIn2025 #DatingApp`
        }
    ],
    linkedin: [
        {
            product: "AI Solutions Store",
            text: `Q1 2025 is around the corner. Are you still doing these manually?

• Data entry and processing
• Email responses
• Report generation
• Social media posting

Our clients automated these in Week 1.

AI Solutions Store offers a $1 consultation to identify your biggest automation opportunities.

No pressure. No upsell tactics. Just honest assessment of where AI can save you 10+ hours/week.

https://ai-solutions.store

#BusinessAutomation #AI #2025Goals`
        }
    ],
    discord: [
        {
            product: "Bundle",
            text: `🎁 **HOLIDAY BUNDLE ALERT** 🎁

For the next 7 days only:

**The Automation Starter Pack**
• $1 Consultation (normally $99)
• Priority onboarding
• Direct founder access

**Products:**
• Claude Droid ($299) - YouTube Shorts automation
• Marketing Engine ($199) - 17-platform marketing
• Income Droid ($499) - Passive revenue streams

🔗 https://ai-solutions.store

*No charity talk. Just good products at good prices.*`
        }
    ]
};

// Run campaign
log('═══════════════════════════════════════════════════════════════');
log('HOLIDAY URGENCY CAMPAIGN - CONTENT GENERATOR');
log('FOR THE KIDS - Business First (deals & value only)');
log('═══════════════════════════════════════════════════════════════');

// Output all content
Object.entries(CAMPAIGNS).forEach(([platform, posts]) => {
    log(`\n=== ${platform.toUpperCase()} ===`);
    posts.forEach((post, i) => {
        log(`\n[${post.product}] Post ${i + 1}:`);
        console.log(post.text);
        console.log('---');
    });
});

// Save to ready file
const readyFile = path.join(LOGS_DIR, 'holiday-campaign-ready.md');
let content = `# Holiday Campaign Content - Generated ${new Date().toISOString()}\n\n`;

Object.entries(CAMPAIGNS).forEach(([platform, posts]) => {
    content += `## ${platform.charAt(0).toUpperCase() + platform.slice(1)}\n\n`;
    posts.forEach((post, i) => {
        content += `### ${post.product} - Post ${i + 1}\n\`\`\`\n${post.text}\n\`\`\`\n\n`;
    });
});

content += `---\n*BUSINESS FIRST: No charity mentions. Gospel handles 60/30/10 silently.*\n`;

fs.writeFileSync(readyFile, content);
log(`\nCampaign content saved to: ${readyFile}`);
log('Ready for posting!');
