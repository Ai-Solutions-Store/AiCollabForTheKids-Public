/**
 * Push Notification Content Generator
 * Categories: New Products, Sales, Re-engagement, Milestones, Content Updates
 * Short, compelling mobile-first copy
 * FOR THE KIDS - 60/30/10
 */

const fs = require('fs');
const path = require('path');

const LOGS_DIR = 'C:\\AiCollabForTheKids\\logs';
const LOG_FILE = path.join(LOGS_DIR, 'push-notifications.log');
const OUTPUT_FILE = path.join(LOGS_DIR, 'push-notifications-ready.md');

function log(message) {
    const entry = `[${new Date().toISOString()}] ${message}\n`;
    fs.appendFileSync(LOG_FILE, entry);
    console.log(entry.trim());
}

// ============================================================================
// PUSH NOTIFICATION CONTENT LIBRARY
// ============================================================================

const PUSH_NOTIFICATIONS = {

    // -------------------------------------------------------------------------
    // 1. NEW PRODUCT ALERTS
    // -------------------------------------------------------------------------
    newProducts: [
        {
            title: "New Drop: Claude Droid",
            body: "Automate YouTube Shorts in seconds. Your content empire starts now.",
            category: "new_product"
        },
        {
            title: "Just Launched: Income Droid",
            body: "Passive revenue while you sleep. 47 income streams, zero effort.",
            category: "new_product"
        },
        {
            title: "Introducing Marketing Engine",
            body: "17 platforms. One click. Your brand everywhere.",
            category: "new_product"
        },
        {
            title: "NEW: AI Consultation - $1",
            body: "10 mins with our experts. Find your automation goldmine.",
            category: "new_product"
        },
        {
            title: "YouAndINotAI is LIVE",
            body: "Dating without the fakes. 100% verified humans only.",
            category: "new_product"
        },
        {
            title: "Fresh from the lab",
            body: "New AI tools just dropped. Built for builders like you.",
            category: "new_product"
        },
        {
            title: "Your next automation is here",
            body: "We just launched something big. Check it out.",
            category: "new_product"
        },
        {
            title: "Product Alert",
            body: "The tool you've been waiting for is finally ready.",
            category: "new_product"
        }
    ],

    // -------------------------------------------------------------------------
    // 2. SALE NOTIFICATIONS
    // -------------------------------------------------------------------------
    sales: [
        {
            title: "24 HOURS ONLY",
            body: "50% off everything. Ends at midnight. Go.",
            category: "flash_sale"
        },
        {
            title: "Flash Sale: $1 Consultation",
            body: "Was $99. Now $1. Seriously. Limited spots.",
            category: "flash_sale"
        },
        {
            title: "Weekend Deal",
            body: "Bundle all 3 droids. Save $200. This weekend only.",
            category: "sale"
        },
        {
            title: "Your cart misses you",
            body: "Complete checkout now - 20% off expires in 2 hours.",
            category: "cart_abandon"
        },
        {
            title: "Early Bird Special",
            body: "First 50 customers get 40% off. Clock's ticking.",
            category: "sale"
        },
        {
            title: "Price Drop Alert",
            body: "That tool you wanted? Just got cheaper.",
            category: "sale"
        },
        {
            title: "Holiday Pricing LIVE",
            body: "Our biggest discounts of the year. Don't sleep on this.",
            category: "seasonal_sale"
        },
        {
            title: "Midnight Madness",
            body: "Extra 30% off. Code: MIDNIGHT. Expires 6AM.",
            category: "flash_sale"
        },
        {
            title: "Last chance",
            body: "Sale ends in 1 hour. Your automation awaits.",
            category: "urgency"
        },
        {
            title: "Deal of the Day",
            body: "Claude Droid: $199 (normally $299). Today only.",
            category: "daily_deal"
        }
    ],

    // -------------------------------------------------------------------------
    // 3. ENGAGEMENT RE-TRIGGERS
    // -------------------------------------------------------------------------
    reEngagement: [
        {
            title: "We miss you",
            body: "Your automation tools are waiting. Come back and build.",
            category: "win_back"
        },
        {
            title: "Still stuck on manual tasks?",
            body: "Let AI handle the boring stuff. You've got better things to do.",
            category: "win_back"
        },
        {
            title: "Quick question",
            body: "What's stopping you from automating? Let's talk.",
            category: "engagement"
        },
        {
            title: "Your competitors are automating",
            body: "Don't fall behind. Start your AI journey today.",
            category: "fomo"
        },
        {
            title: "Remember us?",
            body: "You checked us out. Ready to take the leap?",
            category: "win_back"
        },
        {
            title: "30 seconds",
            body: "That's how long setup takes. What are you waiting for?",
            category: "engagement"
        },
        {
            title: "Been a while!",
            body: "New features dropped since you left. Come see.",
            category: "win_back"
        },
        {
            title: "Your profile is incomplete",
            body: "Finish setup and unlock full automation power.",
            category: "engagement"
        },
        {
            title: "Abandoned mission",
            body: "You started something great. Let's finish it.",
            category: "engagement"
        },
        {
            title: "Hey stranger",
            body: "Log in today and get a surprise waiting for you.",
            category: "win_back"
        }
    ],

    // -------------------------------------------------------------------------
    // 4. MILESTONE CELEBRATIONS
    // -------------------------------------------------------------------------
    milestones: [
        {
            title: "You did it!",
            body: "1,000 tasks automated. You're officially unstoppable.",
            category: "achievement"
        },
        {
            title: "Level Up",
            body: "You've reached Pro status. New perks unlocked.",
            category: "achievement"
        },
        {
            title: "100 days with us!",
            body: "Thank you for being part of the journey. Here's to 100 more.",
            category: "anniversary"
        },
        {
            title: "10 hours saved this week",
            body: "That's what automation looks like. Keep crushing it.",
            category: "stats"
        },
        {
            title: "First automation complete!",
            body: "Welcome to the future. Many more to come.",
            category: "first_action"
        },
        {
            title: "Community milestone",
            body: "10,000 users strong. Thank you for building with us.",
            category: "community"
        },
        {
            title: "Your best month yet",
            body: "Stats are in. You're on fire.",
            category: "stats"
        },
        {
            title: "1 year anniversary!",
            body: "You've been automating for a whole year. Legend status.",
            category: "anniversary"
        },
        {
            title: "Streak: 30 days",
            body: "You've used automation every day for a month. Incredible.",
            category: "streak"
        },
        {
            title: "Top 10% of users",
            body: "Your automation game is elite. Keep leading.",
            category: "achievement"
        }
    ],

    // -------------------------------------------------------------------------
    // 5. CONTENT UPDATES
    // -------------------------------------------------------------------------
    contentUpdates: [
        {
            title: "New Tutorial Dropped",
            body: "Learn to automate in 5 minutes. Watch now.",
            category: "tutorial"
        },
        {
            title: "Blog: AI Trends 2025",
            body: "What's next in automation? We break it down.",
            category: "blog"
        },
        {
            title: "Video: Success Stories",
            body: "See how others are crushing it with our tools.",
            category: "video"
        },
        {
            title: "Case Study Live",
            body: "How one user saved 40 hours/week. Real numbers.",
            category: "case_study"
        },
        {
            title: "New Feature: Batch Mode",
            body: "Automate 100 tasks at once. Just shipped.",
            category: "feature_update"
        },
        {
            title: "Guide: Getting Started",
            body: "Zero to automation hero in 10 minutes.",
            category: "guide"
        },
        {
            title: "Community Spotlight",
            body: "See what your fellow builders are creating.",
            category: "community"
        },
        {
            title: "Changelog Update",
            body: "12 new features this week. Check what's new.",
            category: "changelog"
        },
        {
            title: "Podcast Episode Live",
            body: "The future of AI automation. Listen now.",
            category: "podcast"
        },
        {
            title: "Free Template Pack",
            body: "10 automation templates. Yours to keep.",
            category: "resource"
        }
    ],

    // -------------------------------------------------------------------------
    // BONUS: KIDS DAO / FOR THE KIDS SPECIFIC
    // -------------------------------------------------------------------------
    forTheKids: [
        {
            title: "Your purchase helped a kid",
            body: "60% went to children's medical care. Thank you.",
            category: "impact"
        },
        {
            title: "Kids DAO Update",
            body: "See how your support is making a difference.",
            category: "impact"
        },
        {
            title: "Impact Report Ready",
            body: "Your automation dollars at work. View now.",
            category: "impact"
        },
        {
            title: "Thank you!",
            body: "Another child helped because of you. Read the story.",
            category: "impact"
        },
        {
            title: "Mission Update",
            body: "Together we've helped 1,000+ kids. You're part of this.",
            category: "milestone"
        }
    ]
};

// ============================================================================
// GENERATE AND LOG
// ============================================================================

function generatePushContent() {
    log('================================================================');
    log('PUSH NOTIFICATION CONTENT GENERATOR');
    log('FOR THE KIDS - Short, compelling mobile-first copy');
    log('================================================================');

    let totalCount = 0;
    let markdownContent = `# Push Notification Content Library\n`;
    markdownContent += `Generated: ${new Date().toISOString()}\n\n`;
    markdownContent += `---\n\n`;

    const categoryLabels = {
        newProducts: 'New Product Alerts',
        sales: 'Sale Notifications',
        reEngagement: 'Engagement Re-triggers',
        milestones: 'Milestone Celebrations',
        contentUpdates: 'Content Updates',
        forTheKids: 'For The Kids (Impact)'
    };

    Object.entries(PUSH_NOTIFICATIONS).forEach(([key, notifications]) => {
        const categoryName = categoryLabels[key] || key;
        log(`\n=== ${categoryName.toUpperCase()} ===`);
        markdownContent += `## ${categoryName}\n\n`;

        notifications.forEach((notif, index) => {
            totalCount++;
            log(`[${index + 1}] "${notif.title}" - ${notif.body}`);

            markdownContent += `### ${index + 1}. ${notif.title}\n`;
            markdownContent += `**Body:** ${notif.body}\n\n`;
            markdownContent += `**Category:** \`${notif.category}\`\n\n`;
            markdownContent += `---\n\n`;
        });
    });

    markdownContent += `\n## Summary\n\n`;
    markdownContent += `- **Total Notifications:** ${totalCount}\n`;
    markdownContent += `- **Categories:** ${Object.keys(PUSH_NOTIFICATIONS).length}\n`;
    markdownContent += `- **Ready for:** iOS, Android, Web Push\n\n`;
    markdownContent += `---\n`;
    markdownContent += `*FOR THE KIDS - 60/30/10*\n`;

    // Save to markdown file
    fs.writeFileSync(OUTPUT_FILE, markdownContent);
    log(`\n================================================================`);
    log(`Total notifications generated: ${totalCount}`);
    log(`Content saved to: ${OUTPUT_FILE}`);
    log(`Log saved to: ${LOG_FILE}`);
    log(`================================================================`);

    return {
        totalCount,
        categories: Object.keys(PUSH_NOTIFICATIONS).length,
        outputFile: OUTPUT_FILE,
        logFile: LOG_FILE
    };
}

// ============================================================================
// UTILITY: Get Random Notification by Category
// ============================================================================

function getRandomNotification(category) {
    const notifications = PUSH_NOTIFICATIONS[category];
    if (!notifications) {
        return null;
    }
    return notifications[Math.floor(Math.random() * notifications.length)];
}

// ============================================================================
// UTILITY: Get All Notifications (for API/export)
// ============================================================================

function getAllNotifications() {
    return PUSH_NOTIFICATIONS;
}

// ============================================================================
// RUN
// ============================================================================

if (require.main === module) {
    generatePushContent();
}

module.exports = {
    PUSH_NOTIFICATIONS,
    generatePushContent,
    getRandomNotification,
    getAllNotifications
};
