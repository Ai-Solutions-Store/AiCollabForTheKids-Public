/**
 * AGENT 1: Email Drip Campaign Generator
 * High-conversion 7-day sequence for AI Solutions Store leads
 * BUSINESS FIRST: Value-focused, no charity mentions
 * 
 * Average email conversion: 2-5% → At $299 avg product, that's $6-15 per lead
 * 60% to kids = $3.60-$9 per converted lead
 */

const fs = require('fs');
const path = require('path');

const LOGS_DIR = 'C:\\AiCollabForTheKids\\logs';
const LOG_FILE = path.join(LOGS_DIR, 'email-drip-agent.log');

function log(message) {
    const entry = `[${new Date().toISOString()}] ${message}\n`;
    fs.appendFileSync(LOG_FILE, entry);
    console.log(entry.trim());
}

// 7-Day Email Drip Sequence
const EMAIL_SEQUENCE = [
    {
        day: 0,
        subject: "Your consultation is confirmed",
        preheader: "Here's what to expect",
        body: `Hi {{first_name}},

Thanks for booking your AI automation consultation.

Here's what we'll cover in our 15-minute call:

1. Your biggest time sinks (where automation has highest ROI)
2. Quick wins you can implement this week
3. Whether our tools are actually a good fit (sometimes they're not)

Before our call, think about:
- What tasks eat most of your time?
- What would you do with 15+ extra hours/week?

Talk soon,
The AI Solutions Team

P.S. No pressure, no upsells. Just honest assessment.`
    },
    {
        day: 1,
        subject: "The 15-hour mistake most business owners make",
        preheader: "Are you doing this too?",
        body: `Hi {{first_name}},

Quick question: How many hours did you spend last week on tasks AI could do?

For most business owners, the answer is 15+.

The common ones:
- Social media posting (2-4 hours)
- Email responses (3-5 hours)
- Content creation (4-6 hours)
- Data entry (2-3 hours)
- Report generation (1-2 hours)

Here's what's wild: Each of these can be automated in under a day.

Not "eventually" automated. Actually running. This week.

Our Marketing Engine posts to 23 platforms automatically. Claude Droid creates 4 YouTube videos daily. Zero manual work after setup.

Worth a look: https://ai-solutions.store

Tomorrow I'll share the #1 automation most businesses should start with.

- AI Solutions Team`
    },
    {
        day: 2,
        subject: "Start here (if you only automate one thing)",
        preheader: "The highest-ROI automation",
        body: `Hi {{first_name}},

If you could only automate ONE thing in your business, make it content creation.

Why? Because content drives everything else:
- More content = more traffic
- More traffic = more leads
- More leads = more revenue

But content is also the biggest time sink.

Our Claude Droid creates 4 YouTube Shorts daily from trending news. Fully automated:
- Finds trending topics
- Writes scripts
- Generates voiceover
- Creates video
- Uploads to YouTube

No editing. No manual work. Just content flowing to your channel.

One-time $299. No subscriptions. Lifetime updates.

See how it works: https://ai-solutions.store/claude-droid

- AI Solutions Team`
    },
    {
        day: 3,
        subject: "What happens after you automate content",
        preheader: "The compounding effect",
        body: `Hi {{first_name}},

Here's what our customers typically see after 30 days of automated content:

Week 1: Systems running, content publishing
Week 2: First organic traffic increases (10-20%)
Week 3: Engagement metrics climbing
Week 4: Lead flow noticeably up

By month 3? Some customers report 3-5x their previous content output with zero additional time investment.

The compounding effect is real. Content you create today keeps working for years.

But here's the thing - automation isn't magic. It requires:
1. Initial setup (2-4 hours)
2. Quality inputs (your expertise, your voice)
3. Occasional review (30 min/week)

If you're ready for that commitment, the ROI is significant.

If not, no worries. Some businesses aren't ready yet.

Questions? Just reply to this email.

- AI Solutions Team`
    },
    {
        day: 5,
        subject: "The math on AI automation",
        preheader: "Does it actually pay off?",
        body: `Hi {{first_name}},

Let's do the math on whether AI automation makes sense for you.

**Time Investment:**
- Setup: 2-4 hours (one-time)
- Maintenance: 30 min/week

**Time Saved:**
- Content creation: 10-15 hours/week
- Social posting: 5-10 hours/week
- Email responses: 3-5 hours/week

**Net Result:** 15-25 hours back per week

At $50/hour value, that's $750-1,250/week in time savings.
At $100/hour? $1,500-2,500/week.

Our most popular tools:
- Claude Droid ($299) - YouTube automation
- Marketing Engine ($199) - 23-platform posting
- Income Droid ($499) - Multi-channel content

All one-time purchases. No subscriptions.

The question isn't whether it pays off. It's how fast.

- AI Solutions Team

P.S. Calculator: If your time is worth $X/hour and you save Y hours/week, break-even is (tool cost)/(X × Y) weeks.`
    },
    {
        day: 7,
        subject: "Last thing before I stop emailing you",
        preheader: "Honest assessment",
        body: `Hi {{first_name}},

This is my last email in this sequence.

Here's my honest take:

AI automation isn't for everyone. If you:
- Have a VA handling everything already
- Don't create content regularly
- Prefer manual control over efficiency

Then our tools probably aren't right for you.

But if you:
- Spend hours on repetitive tasks
- Know content is important but can't keep up
- Want to scale without hiring

Then automation could change your business.

Either way, I appreciate you reading these emails.

If you ever want to chat, book a consultation: https://ai-solutions.store/consultation

No pitch. Just a conversation about what might work for your specific situation.

Thanks for reading,
The AI Solutions Team`
    }
];

// Run agent
function main() {
    log('═══════════════════════════════════════════════════════════════');
    log('AGENT 1: EMAIL DRIP CAMPAIGN GENERATOR');
    log('BUSINESS FIRST: Value-focused, conversion-optimized');
    log('═══════════════════════════════════════════════════════════════');

    const outputDir = path.join(LOGS_DIR, 'email-sequences');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Generate individual email files
    EMAIL_SEQUENCE.forEach((email) => {
        const filename = `day-${email.day}-email.md`;
        const filepath = path.join(outputDir, filename);
        const content = `# Day ${email.day}: ${email.subject}\n**Preheader:** ${email.preheader}\n\n${email.body}`;
        fs.writeFileSync(filepath, content);
        log(`Generated: ${filename}`);
    });

    // Generate SendGrid-compatible JSON
    const sendgridSequence = EMAIL_SEQUENCE.map(email => ({
        day: email.day,
        subject: email.subject,
        preheader: email.preheader,
        body_text: email.body
    }));
    fs.writeFileSync(path.join(outputDir, 'sendgrid-sequence.json'), JSON.stringify(sendgridSequence, null, 2));
    
    // Generate HTML versions
    EMAIL_SEQUENCE.forEach((email) => {
        const htmlContent = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${email.subject}</title></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; line-height: 1.6;">
<div style="background: #f9f9f9; padding: 20px; border-radius: 8px;">
${email.body.split('\n').map(line => {
    if (line.startsWith('**') && line.endsWith('**')) {
        return `<p><strong>${line.replace(/\*\*/g, '')}</strong></p>`;
    } else if (line.startsWith('- ')) {
        return `<li>${line.substring(2)}</li>`;
    } else if (line.trim() === '') {
        return '<br>';
    } else {
        return `<p>${line}</p>`;
    }
}).join('\n')}
</div>
<div style="margin-top: 20px; font-size: 12px; color: #666;">
<p>AI Solutions Store | <a href="https://ai-solutions.store">ai-solutions.store</a></p>
<p><a href="{{unsubscribe_url}}">Unsubscribe</a></p>
</div>
</body>
</html>`;
        fs.writeFileSync(path.join(outputDir, `day-${email.day}-email.html`), htmlContent);
    });
    
    log(`\n✅ Generated ${EMAIL_SEQUENCE.length} emails (MD + HTML + JSON)`);
    log(`📁 Output: ${outputDir}`);
    log('═══════════════════════════════════════════════════════════════');
}

main();
