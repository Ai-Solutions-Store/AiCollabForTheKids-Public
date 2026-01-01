/**
 * ============================================================================
 * WEBINAR FUNNEL CONTENT GENERATOR
 * AI Solutions Store - "AI Automation for Business" Webinar
 * ============================================================================
 *
 * Generates complete webinar funnel content:
 * 1. Webinar Registration Pages (HTML landing pages)
 * 2. Reminder Email Sequences (pre-webinar)
 * 3. Webinar Slide Outlines (presentation structure)
 * 4. Post-Webinar Follow-up (conversion emails)
 * 5. Replay Sequences (for non-attendees)
 *
 * Topic: AI Automation for Business
 * Mission: FOR THE KIDS - Gospel V1.3 (60/30/10)
 *
 * Usage:
 *   node webinar-funnel.cjs --generate-all
 *   node webinar-funnel.cjs --component=registration
 *   node webinar-funnel.cjs --component=reminders
 *   node webinar-funnel.cjs --component=slides
 *   node webinar-funnel.cjs --component=follow-up
 *   node webinar-funnel.cjs --component=replay
 *   node webinar-funnel.cjs --help
 *
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
    // Webinar Details
    webinarTitle: 'AI Automation for Business: From Manual to Magical in 60 Minutes',
    webinarSubtitle: 'How to Save 15+ Hours Per Week Using AI Tools (Without Writing a Single Line of Code)',
    webinarHost: 'AI Solutions Store Team',
    webinarDuration: '60 minutes + Q&A',

    // URLs
    storeUrl: 'https://ai-solutions.store',
    websiteUrl: 'https://aidoesitall.website',
    consultationUrl: 'https://ai-solutions.store/consultation',
    webinarUrl: 'https://ai-solutions.store/webinar/ai-automation-business',
    replayUrl: 'https://ai-solutions.store/webinar/ai-automation-business/replay',

    // Logging
    logsDir: 'C:\\AiCollabForTheKids\\logs',
    outputDir: 'C:\\AiCollabForTheKids\\logs\\webinar-funnel',
    logFile: 'C:\\AiCollabForTheKids\\logs\\webinar-funnel.log',

    // Branding
    brandColors: {
        primary: '#CC785C',     // Copper/rust
        secondary: '#078EFA',   // Blue
        accent: '#20808D',      // Teal
        dark: '#141413',        // Near black
        light: '#f9f9f9'        // Off white
    },

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
// 1. WEBINAR REGISTRATION PAGES
// ============================================================================

const REGISTRATION_PAGES = {
    main: {
        filename: 'webinar-registration-main.html',
        title: 'Main Registration Page',
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${CONFIG.webinarTitle} | AI Solutions Store</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, ${CONFIG.brandColors.dark} 0%, #1a1a1a 50%, ${CONFIG.brandColors.dark} 100%);
            color: #fff;
            min-height: 100vh;
        }
        .hero {
            max-width: 900px;
            margin: 0 auto;
            padding: 60px 20px;
            text-align: center;
        }
        .badge {
            display: inline-block;
            background: ${CONFIG.brandColors.secondary};
            color: #fff;
            padding: 8px 20px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 30px;
        }
        h1 {
            font-size: 48px;
            color: ${CONFIG.brandColors.primary};
            margin-bottom: 20px;
            line-height: 1.2;
        }
        .subtitle {
            font-size: 24px;
            color: #ccc;
            margin-bottom: 40px;
            line-height: 1.4;
        }
        .benefits {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 25px;
            margin: 50px 0;
            text-align: left;
        }
        .benefit {
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 12px;
            padding: 25px;
        }
        .benefit h3 {
            color: ${CONFIG.brandColors.accent};
            font-size: 18px;
            margin-bottom: 10px;
        }
        .benefit p {
            color: #aaa;
            font-size: 15px;
            line-height: 1.6;
        }
        .registration-box {
            background: linear-gradient(135deg, rgba(204,120,92,0.1) 0%, rgba(7,142,250,0.1) 100%);
            border: 2px solid ${CONFIG.brandColors.primary};
            border-radius: 16px;
            padding: 40px;
            margin: 50px auto;
            max-width: 500px;
        }
        .registration-box h2 {
            color: #fff;
            font-size: 28px;
            margin-bottom: 10px;
        }
        .registration-box .date {
            color: ${CONFIG.brandColors.secondary};
            font-size: 18px;
            margin-bottom: 30px;
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-group label {
            display: block;
            color: #ccc;
            font-size: 14px;
            margin-bottom: 8px;
        }
        .form-group input {
            width: 100%;
            padding: 15px;
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 8px;
            background: rgba(0,0,0,0.3);
            color: #fff;
            font-size: 16px;
        }
        .form-group input:focus {
            outline: none;
            border-color: ${CONFIG.brandColors.primary};
        }
        .btn-register {
            width: 100%;
            background: ${CONFIG.brandColors.primary};
            color: #fff;
            border: none;
            padding: 18px 40px;
            font-size: 20px;
            font-weight: 700;
            border-radius: 8px;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-register:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(204,120,92,0.4);
        }
        .what-you-learn {
            max-width: 700px;
            margin: 60px auto;
            text-align: left;
        }
        .what-you-learn h2 {
            color: ${CONFIG.brandColors.primary};
            font-size: 32px;
            margin-bottom: 30px;
            text-align: center;
        }
        .learn-item {
            display: flex;
            align-items: flex-start;
            gap: 15px;
            margin-bottom: 20px;
            padding: 20px;
            background: rgba(255,255,255,0.03);
            border-radius: 10px;
        }
        .learn-item .number {
            background: ${CONFIG.brandColors.secondary};
            color: #fff;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            flex-shrink: 0;
        }
        .learn-item .content h4 {
            color: #fff;
            font-size: 18px;
            margin-bottom: 5px;
        }
        .learn-item .content p {
            color: #888;
            font-size: 15px;
            line-height: 1.5;
        }
        .host-section {
            background: rgba(255,255,255,0.03);
            padding: 50px;
            margin: 60px 0;
            border-radius: 16px;
            display: flex;
            align-items: center;
            gap: 30px;
            max-width: 700px;
            margin: 60px auto;
        }
        .host-avatar {
            width: 120px;
            height: 120px;
            background: linear-gradient(135deg, ${CONFIG.brandColors.primary}, ${CONFIG.brandColors.secondary});
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 48px;
            flex-shrink: 0;
        }
        .host-info h3 {
            color: #fff;
            font-size: 24px;
            margin-bottom: 10px;
        }
        .host-info p {
            color: #888;
            font-size: 15px;
            line-height: 1.6;
        }
        .footer {
            text-align: center;
            padding: 40px;
            border-top: 1px solid rgba(255,255,255,0.1);
        }
        .footer .gospel {
            color: ${CONFIG.brandColors.primary};
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 10px;
        }
        .footer p {
            color: #666;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="hero">
        <span class="badge">Free Live Webinar</span>
        <h1>${CONFIG.webinarTitle.split(':')[0]}</h1>
        <p class="subtitle">${CONFIG.webinarSubtitle}</p>

        <div class="benefits">
            <div class="benefit">
                <h3>15+ Hours Saved Weekly</h3>
                <p>Learn exactly which tasks to automate first for maximum time savings</p>
            </div>
            <div class="benefit">
                <h3>No Coding Required</h3>
                <p>Deploy AI automation using ready-made tools that work out of the box</p>
            </div>
            <div class="benefit">
                <h3>Real Business Results</h3>
                <p>See actual case studies from businesses already automating</p>
            </div>
        </div>

        <div class="registration-box">
            <h2>Reserve Your Seat</h2>
            <p class="date">${CONFIG.webinarDuration}</p>
            <form action="${CONFIG.webinarUrl}/register" method="POST">
                <div class="form-group">
                    <label for="name">Your Name</label>
                    <input type="text" id="name" name="name" placeholder="John Smith" required>
                </div>
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email" placeholder="john@company.com" required>
                </div>
                <div class="form-group">
                    <label for="business">Business Type (Optional)</label>
                    <input type="text" id="business" name="business" placeholder="E-commerce, Agency, SaaS, etc.">
                </div>
                <button type="submit" class="btn-register">Save My Spot Now</button>
            </form>
        </div>
    </div>

    <div class="what-you-learn">
        <h2>What You Will Learn</h2>

        <div class="learn-item">
            <div class="number">1</div>
            <div class="content">
                <h4>The 3 Tasks Every Business Should Automate First</h4>
                <p>Discover the highest-ROI automation opportunities that apply to any business</p>
            </div>
        </div>

        <div class="learn-item">
            <div class="number">2</div>
            <div class="content">
                <h4>Live Demo: Setting Up Content Automation</h4>
                <p>Watch us configure a complete content automation system in real-time</p>
            </div>
        </div>

        <div class="learn-item">
            <div class="number">3</div>
            <div class="content">
                <h4>The ROI Calculator: Will Automation Pay Off for You?</h4>
                <p>Walk through the math to determine your specific automation ROI</p>
            </div>
        </div>

        <div class="learn-item">
            <div class="number">4</div>
            <div class="content">
                <h4>Q&A: Get Your Automation Questions Answered</h4>
                <p>Live session where we answer your specific automation challenges</p>
            </div>
        </div>
    </div>

    <div class="host-section">
        <div class="host-avatar">AI</div>
        <div class="host-info">
            <h3>Your Host: ${CONFIG.webinarHost}</h3>
            <p>Building production-ready AI automation tools since 2023. Our products power content creation, marketing automation, and business systems for hundreds of entrepreneurs and businesses worldwide.</p>
        </div>
    </div>

    <div class="footer">
        <p class="gospel">FOR THE KIDS</p>
        <p>60% of every sale goes to verified pediatric charities. Gospel V1.3.</p>
        <p style="margin-top: 20px;">AI Solutions Store | Built with Claude Opus 4.5</p>
    </div>
</body>
</html>`
    },

    thankYou: {
        filename: 'webinar-registration-thankyou.html',
        title: 'Thank You / Confirmation Page',
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>You're Registered! | ${CONFIG.webinarTitle}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: ${CONFIG.brandColors.dark};
            color: #fff;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            max-width: 600px;
            padding: 60px 30px;
            text-align: center;
        }
        .checkmark {
            width: 100px;
            height: 100px;
            background: linear-gradient(135deg, ${CONFIG.brandColors.primary}, ${CONFIG.brandColors.accent});
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 30px;
            font-size: 50px;
        }
        h1 {
            color: ${CONFIG.brandColors.primary};
            font-size: 36px;
            margin-bottom: 20px;
        }
        .subtitle {
            color: #ccc;
            font-size: 18px;
            line-height: 1.6;
            margin-bottom: 40px;
        }
        .next-steps {
            background: rgba(255,255,255,0.05);
            border-radius: 12px;
            padding: 30px;
            text-align: left;
            margin-bottom: 40px;
        }
        .next-steps h2 {
            color: ${CONFIG.brandColors.secondary};
            font-size: 20px;
            margin-bottom: 20px;
        }
        .step {
            display: flex;
            align-items: flex-start;
            gap: 15px;
            margin-bottom: 15px;
        }
        .step-icon {
            width: 30px;
            height: 30px;
            background: ${CONFIG.brandColors.secondary};
            color: #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 14px;
            flex-shrink: 0;
        }
        .step p {
            color: #aaa;
            font-size: 15px;
            line-height: 1.5;
        }
        .calendar-btn {
            display: inline-block;
            background: ${CONFIG.brandColors.primary};
            color: #fff;
            text-decoration: none;
            padding: 16px 40px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 18px;
            margin-bottom: 20px;
        }
        .share-section {
            margin-top: 40px;
            padding-top: 40px;
            border-top: 1px solid rgba(255,255,255,0.1);
        }
        .share-section h3 {
            color: #888;
            font-size: 16px;
            margin-bottom: 20px;
        }
        .share-buttons {
            display: flex;
            gap: 15px;
            justify-content: center;
        }
        .share-btn {
            padding: 12px 25px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            font-size: 14px;
            color: #fff;
        }
        .share-btn.twitter { background: #1DA1F2; }
        .share-btn.linkedin { background: #0077B5; }
        .share-btn.email { background: ${CONFIG.brandColors.accent}; }
    </style>
</head>
<body>
    <div class="container">
        <div class="checkmark">&#10003;</div>
        <h1>You're In!</h1>
        <p class="subtitle">Your seat for "${CONFIG.webinarTitle.split(':')[0]}" is confirmed. Check your email for the webinar link and calendar invite.</p>

        <div class="next-steps">
            <h2>What Happens Next:</h2>
            <div class="step">
                <div class="step-icon">1</div>
                <p><strong>Check your inbox</strong> - Confirmation email with webinar link is on its way</p>
            </div>
            <div class="step">
                <div class="step-icon">2</div>
                <p><strong>Add to calendar</strong> - Click below to add the webinar to your calendar</p>
            </div>
            <div class="step">
                <div class="step-icon">3</div>
                <p><strong>Prepare your questions</strong> - Think about what automation challenges you want solved</p>
            </div>
            <div class="step">
                <div class="step-icon">4</div>
                <p><strong>Join 10 minutes early</strong> - We start on time and cover a lot of ground</p>
            </div>
        </div>

        <a href="#" class="calendar-btn">Add to Google Calendar</a>

        <div class="share-section">
            <h3>Know someone who could benefit? Share this webinar:</h3>
            <div class="share-buttons">
                <a href="https://twitter.com/intent/tweet?text=I%20just%20registered%20for%20this%20free%20AI%20automation%20webinar.%20Learn%20how%20to%20save%2015%2B%20hours%2Fweek%20with%20AI%20tools.&url=${encodeURIComponent(CONFIG.webinarUrl)}" class="share-btn twitter">Twitter</a>
                <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(CONFIG.webinarUrl)}" class="share-btn linkedin">LinkedIn</a>
                <a href="mailto:?subject=Check%20out%20this%20AI%20automation%20webinar&body=I%20just%20registered%20for%20this%20free%20webinar%20on%20AI%20automation%20for%20business.%20Thought%20you%20might%20be%20interested%3A%20${encodeURIComponent(CONFIG.webinarUrl)}" class="share-btn email">Email</a>
            </div>
        </div>
    </div>
</body>
</html>`
    }
};

// ============================================================================
// 2. REMINDER EMAIL SEQUENCES (Pre-Webinar)
// ============================================================================

const REMINDER_SEQUENCE = [
    {
        id: 'immediate',
        timing: 'Immediately after registration',
        subject: "You're in! Here's your webinar link for AI Automation for Business",
        preheader: "Save this email - you'll need it to join the webinar",
        body: `Hey {{name}},

Great news - you're officially registered for:

**${CONFIG.webinarTitle}**

Save this email! You'll need it to join the live session.

**Your Webinar Link:** [Click here to join when we go live](${CONFIG.webinarUrl}/live)

**What to Expect:**
- 60 minutes of actionable content
- Live demo of AI automation setup
- ROI calculator walkthrough
- Q&A session to answer YOUR questions

**Before the Webinar:**
Take 2 minutes to think about:
1. What tasks eat up most of your time each week?
2. Have you tried any automation tools before?
3. What would you do with 15 extra hours per week?

This will help you get the most out of the session.

See you there!

The AI Solutions Store Team

P.S. Can't make the live session? Reply to this email and we'll send you the replay.`
    },
    {
        id: '24-hours',
        timing: '24 hours before webinar',
        subject: "Tomorrow: AI Automation for Business starts at [TIME]",
        preheader: "Quick reminder + what to prepare",
        body: `Hey {{name}},

Quick reminder: The webinar is TOMORROW.

**${CONFIG.webinarTitle}**

**Date:** [WEBINAR_DATE]
**Time:** [WEBINAR_TIME]
**Duration:** ${CONFIG.webinarDuration}

**Your Link:** [Join the Webinar](${CONFIG.webinarUrl}/live)

**Quick Prep (2 minutes):**

Grab a notebook or open a doc. During the webinar, you'll want to jot down:
- Which of your current tasks are automation candidates
- Your specific ROI numbers
- Questions for the Q&A

Most attendees who take notes implement within the first week.

See you tomorrow!

The AI Solutions Store Team

P.S. Seats are filling up. If something comes up and you can't attend, please let us know so we can give your seat to someone on the waitlist.`
    },
    {
        id: '1-hour',
        timing: '1 hour before webinar',
        subject: "Starting in 60 minutes: AI Automation for Business",
        preheader: "Final reminder - get your link ready",
        body: `Hey {{name}},

We're going LIVE in 60 minutes!

**${CONFIG.webinarTitle}**

**Your Link:** [Click here to join](${CONFIG.webinarUrl}/live)

**Final Checklist:**
- [ ] Test your internet connection
- [ ] Have your questions ready for Q&A
- [ ] Grab coffee/water
- [ ] Close distracting tabs

**Pro Tip:** Join 5-10 minutes early. We start exactly on time and the first 10 minutes contain some of the most valuable content.

See you soon!

The AI Solutions Store Team`
    },
    {
        id: '5-minutes',
        timing: '5 minutes before webinar',
        subject: "We're LIVE in 5 minutes - join now!",
        preheader: "Click to join the webinar now",
        body: `{{name}},

We're starting in 5 minutes!

**[CLICK HERE TO JOIN NOW](${CONFIG.webinarUrl}/live)**

Don't miss the opening - we're covering the 3 highest-ROI automation opportunities right away.

See you inside!

The AI Solutions Store Team`
    }
];

// ============================================================================
// 3. WEBINAR SLIDE OUTLINES
// ============================================================================

const SLIDE_OUTLINE = {
    title: CONFIG.webinarTitle,
    duration: '60 minutes + 15 min Q&A',
    sections: [
        {
            section: 'Opening & Hook',
            duration: '5 minutes',
            slides: [
                {
                    number: 1,
                    title: 'Title Slide',
                    content: [
                        CONFIG.webinarTitle,
                        'Presented by ' + CONFIG.webinarHost,
                        CONFIG.webinarDuration
                    ],
                    speakerNotes: 'Welcome attendees. Mention replay will be available. Ask them to stay until the end for special offer.'
                },
                {
                    number: 2,
                    title: 'The 15-Hour Problem',
                    content: [
                        'The average business owner spends 15+ hours/week on tasks AI can do',
                        'Data entry: 3-5 hours',
                        'Social media: 3-4 hours',
                        'Email responses: 2-3 hours',
                        'Content creation: 4-6 hours',
                        'Research: 2-3 hours'
                    ],
                    speakerNotes: 'Get heads nodding. Ask: "How many of you feel this?" Use poll if available.'
                },
                {
                    number: 3,
                    title: 'What If...',
                    content: [
                        'What if you could get those 15 hours back?',
                        'Every. Single. Week.',
                        'Without hiring anyone.',
                        'Without learning to code.',
                        'Starting this week.'
                    ],
                    speakerNotes: 'Build anticipation. This is the promise of the webinar.'
                }
            ]
        },
        {
            section: 'The Framework',
            duration: '15 minutes',
            slides: [
                {
                    number: 4,
                    title: "Today's Roadmap",
                    content: [
                        '1. The 3 Tasks Every Business Should Automate First',
                        '2. Live Demo: Setting Up Content Automation',
                        '3. ROI Calculator: Will Automation Pay Off For You?',
                        '4. Your Questions Answered'
                    ],
                    speakerNotes: 'Set expectations. Tell them exactly what they will learn.'
                },
                {
                    number: 5,
                    title: 'Task #1: Content Creation',
                    content: [
                        'Why Content First?',
                        '- Content drives traffic',
                        '- Traffic drives leads',
                        '- Leads drive revenue',
                        'Content is the flywheel.',
                        'Automation: 4+ pieces of content daily, zero manual work'
                    ],
                    speakerNotes: 'Explain why content is the highest-leverage automation. Mention Claude Droid creates 4 YouTube videos daily.'
                },
                {
                    number: 6,
                    title: 'Task #2: Social Media Distribution',
                    content: [
                        'Create once, distribute everywhere',
                        '- 23 platforms automated',
                        '- 4x daily posting schedule',
                        '- Consistent brand presence',
                        '- Engagement tracking built-in',
                        'Time saved: 10-15 hours/week'
                    ],
                    speakerNotes: 'Reference Marketing Engine. Show the platform list if possible.'
                },
                {
                    number: 7,
                    title: 'Task #3: Customer Communication',
                    content: [
                        'AI-powered responses that sound human',
                        '- Email triage and response',
                        '- FAQ handling',
                        '- Appointment scheduling',
                        '- Follow-up sequences',
                        'Your customers get faster responses. You get your time back.'
                    ],
                    speakerNotes: 'Transition to showing how these work together.'
                },
                {
                    number: 8,
                    title: 'The Automation Stack',
                    content: [
                        'Layer 1: Content (Claude Droid / Income Droid)',
                        'Layer 2: Distribution (Marketing Engine)',
                        'Layer 3: Communication (Email Automation)',
                        'Layer 4: Analytics (Jules AI Dashboard)',
                        'Each layer compounds the others.'
                    ],
                    speakerNotes: 'Show how tools work together. This leads into the demo.'
                }
            ]
        },
        {
            section: 'Live Demo',
            duration: '20 minutes',
            slides: [
                {
                    number: 9,
                    title: 'Live Demo: Content Automation',
                    content: [
                        "Let's set up a content automation system",
                        'Step 1: Define your content niche',
                        'Step 2: Configure news sources',
                        'Step 3: Set generation schedule',
                        'Step 4: Connect to YouTube',
                        '(Switch to screen share)'
                    ],
                    speakerNotes: 'This is the main demo. Walk through Claude Droid or Income Droid setup. 15-20 minutes of screen share.'
                },
                {
                    number: 10,
                    title: 'Demo Recap',
                    content: [
                        'What we just did in 15 minutes:',
                        '- Configured complete content pipeline',
                        '- Set up automated video generation',
                        '- Connected publishing to YouTube',
                        '- Scheduled 4 daily posts',
                        'This runs 24/7 without you.'
                    ],
                    speakerNotes: 'Summarize what attendees just saw. Reinforce the value.'
                }
            ]
        },
        {
            section: 'ROI & Value',
            duration: '10 minutes',
            slides: [
                {
                    number: 11,
                    title: 'The ROI Calculator',
                    content: [
                        'Grab your calculator. Let us do the math together.',
                        'Step 1: Your hourly rate = $____',
                        'Step 2: Hours saved/week = 15 (conservative)',
                        'Step 3: Weekly value = $____ x 15',
                        'Step 4: Monthly value = Weekly x 4',
                        'Step 5: Compare to one-time tool cost'
                    ],
                    speakerNotes: 'Walk through calculation live. Use $50/hour as example = $3,000/month value.'
                },
                {
                    number: 12,
                    title: 'Real Numbers',
                    content: [
                        'At $50/hour:',
                        '15 hours x $50 = $750/week',
                        '$750 x 4 = $3,000/month',
                        '$3,000 x 12 = $36,000/year',
                        '',
                        'vs. One-time costs:',
                        'Claude Droid: $299',
                        'Marketing Engine: $199',
                        'Complete stack: Under $1,000'
                    ],
                    speakerNotes: 'Let the math speak for itself. Pause for impact.'
                },
                {
                    number: 13,
                    title: 'Payback Period',
                    content: [
                        'How fast does it pay off?',
                        '$750/week time savings',
                        'Full stack cost: ~$1,000',
                        'Payback period: 1-2 weeks',
                        '',
                        'After that? Pure ROI.',
                        'Every week. Every month. Forever.'
                    ],
                    speakerNotes: 'Emphasize that these are one-time purchases, not subscriptions.'
                }
            ]
        },
        {
            section: 'The Offer',
            duration: '5 minutes',
            slides: [
                {
                    number: 14,
                    title: 'Webinar Exclusive Offer',
                    content: [
                        'For webinar attendees only:',
                        '',
                        '$1 Consultation (normally $99)',
                        '- 30-minute 1-on-1 call',
                        '- Audit your current workflows',
                        '- Custom automation roadmap',
                        '- No pitch, just value',
                        '',
                        'Available for 48 hours only.'
                    ],
                    speakerNotes: 'Create urgency. This is the conversion point.'
                },
                {
                    number: 15,
                    title: 'Next Steps',
                    content: [
                        '1. Book your $1 consultation: ' + CONFIG.consultationUrl,
                        '2. We audit your current processes',
                        '3. You get a custom automation plan',
                        '4. Implement with our tools (or not - your choice)',
                        '',
                        'Link in chat. Link in follow-up email.'
                    ],
                    speakerNotes: 'Clear CTA. Drop link in chat multiple times.'
                }
            ]
        },
        {
            section: 'Q&A & Close',
            duration: '15+ minutes',
            slides: [
                {
                    number: 16,
                    title: 'Your Questions',
                    content: [
                        "Let's answer your questions.",
                        '',
                        'Drop your question in the chat.',
                        '',
                        'Common questions:',
                        '- "How long does setup take?"',
                        '- "Do I need technical skills?"',
                        '- "What if I get stuck?"',
                        '- "Is there a guarantee?"'
                    ],
                    speakerNotes: 'Spend 10-15 minutes on Q&A. Have pre-prepared answers for common questions.'
                },
                {
                    number: 17,
                    title: 'Thank You',
                    content: [
                        'Thank you for attending!',
                        '',
                        'Recap:',
                        '- Automate content, distribution, communication',
                        '- ROI within 1-2 weeks',
                        '- One-time purchase, no subscriptions',
                        '',
                        '$1 consultation: ' + CONFIG.consultationUrl,
                        '',
                        'FOR THE KIDS.'
                    ],
                    speakerNotes: 'Final reminder of offer. Thank everyone. Mention replay will be sent.'
                }
            ]
        }
    ],
    totalSlides: 17
};

// ============================================================================
// 4. POST-WEBINAR FOLLOW-UP SEQUENCE
// ============================================================================

const FOLLOWUP_SEQUENCE = [
    {
        id: 'immediate-attendee',
        timing: 'Immediately after webinar (for attendees)',
        subject: "Thanks for joining! Here's everything from today + your exclusive offer",
        preheader: "Replay link + $1 consultation (48 hours only)",
        body: `Hey {{name}},

Thank you for joining us for "${CONFIG.webinarTitle}"!

Here's everything you need:

**REPLAY LINK:** [Watch the full webinar again](${CONFIG.replayUrl})

**RESOURCES MENTIONED:**
- [AI Solutions Store](${CONFIG.storeUrl}) - All automation tools
- [Claude Droid](${CONFIG.storeUrl}/products/claude-droid) - YouTube automation ($299)
- [Marketing Engine](${CONFIG.storeUrl}/products/marketing-engine) - 23-platform posting ($199)
- [Income Droid](${CONFIG.storeUrl}/products/income-droid) - Multi-channel content ($499)

**YOUR EXCLUSIVE OFFER (48 Hours Only):**

$1 Consultation - Normally $99

[Book Your $1 Consultation Now](${CONFIG.consultationUrl})

Here's what you get:
- 30-minute 1-on-1 call
- Complete audit of your current workflows
- Custom automation roadmap for YOUR business
- Honest recommendations (even if our tools aren't the right fit)

This offer expires in 48 hours. After that, it goes back to $99.

Got questions? Reply to this email.

The AI Solutions Store Team

P.S. Remember the ROI math: If you value your time at $50/hour and automation saves you 15 hours/week, that's $3,000/month in value. The entire tool stack costs under $1,000 one-time. The math is in your favor.`
    },
    {
        id: '24-hours-attendee',
        timing: '24 hours after webinar (for attendees)',
        subject: "24 hours left: Your $1 consultation expires tomorrow",
        preheader: "Quick reminder before the offer expires",
        body: `Hey {{name}},

Just a heads up - your exclusive webinar offer expires in 24 hours.

**$1 Consultation (normally $99)**
[Book Now Before It Expires](${CONFIG.consultationUrl})

During the webinar, you learned:
- The 3 tasks every business should automate first
- How content automation can run 24/7
- The ROI math on automation

The $1 consultation is your chance to get personalized advice on implementing this in YOUR specific business.

We'll audit your workflows, identify automation opportunities, and give you a custom roadmap - whether you buy our tools or not.

After tomorrow, it's back to $99.

[Claim Your $1 Consultation](${CONFIG.consultationUrl})

The AI Solutions Store Team`
    },
    {
        id: '48-hours-attendee',
        timing: '48 hours after webinar (for attendees)',
        subject: "Final reminder: $1 consultation expires at midnight",
        preheader: "Last chance for your webinar exclusive offer",
        body: `Hey {{name}},

This is the final reminder.

Your $1 consultation offer expires at midnight tonight.

After that, the consultation goes back to $99.

**What You Get for $1:**
- 30-minute 1-on-1 strategy call
- Complete workflow audit
- Custom automation roadmap
- Honest, no-BS recommendations

[Book Your $1 Consultation Now](${CONFIG.consultationUrl})

After midnight, this page will show $99.

Your call,

The AI Solutions Store Team

P.S. If automation isn't right for you, I'll tell you that on the call. The $1 is just to filter out people who aren't serious. You'll get $1 worth of value in the first 60 seconds.`
    },
    {
        id: '7-days-attendee',
        timing: '7 days after webinar (for attendees)',
        subject: "Quick check-in: How's your automation journey going?",
        preheader: "Any questions since the webinar?",
        body: `Hey {{name}},

It's been a week since the AI Automation for Business webinar.

Quick check-in: Have you started implementing anything we covered?

**If YES:** Awesome! Reply and tell me what you've set up. I'd love to hear about your progress.

**If NOT YET:** No worries. Here are the quick wins to start with:

1. **Easiest Start:** Marketing Engine ($199)
   - Posts to 23 platforms automatically
   - Setup time: Under 1 hour
   - [Get Marketing Engine](${CONFIG.storeUrl}/products/marketing-engine)

2. **Highest Impact:** Claude Droid ($299)
   - Creates 4 YouTube videos daily
   - Hands-free content machine
   - [Get Claude Droid](${CONFIG.storeUrl}/products/claude-droid)

3. **Full Stack:** Income Droid ($499)
   - Multi-channel content system
   - Revenue optimization built-in
   - [Get Income Droid](${CONFIG.storeUrl}/products/income-droid)

**Need help deciding?** Reply to this email with your situation and I'll give you a personalized recommendation.

The AI Solutions Store Team`
    }
];

// ============================================================================
// 5. REPLAY SEQUENCES (For Non-Attendees)
// ============================================================================

const REPLAY_SEQUENCE = [
    {
        id: 'missed-immediate',
        timing: 'Immediately after webinar (for non-attendees)',
        subject: "You missed it - but the replay is ready",
        preheader: "Watch AI Automation for Business on your schedule",
        body: `Hey {{name}},

You registered for the AI Automation for Business webinar but couldn't make it.

No problem - the full replay is ready:

**[WATCH THE FULL REPLAY NOW](${CONFIG.replayUrl})**

Here's what you'll learn in 60 minutes:

- **The 3 Tasks Every Business Should Automate First**
  (These apply to any business, any size)

- **Live Demo: Content Automation Setup**
  (Watch us configure a complete system in real-time)

- **The ROI Calculator**
  (Know exactly how fast automation pays off for you)

The replay is available for 7 days.

**BONUS:** As a registrant, you still qualify for the $1 consultation offer (normally $99). This expires in 48 hours.

[Watch Replay](${CONFIG.replayUrl}) | [Book $1 Consultation](${CONFIG.consultationUrl})

The AI Solutions Store Team

P.S. The first 10 minutes cover the most important framework. Even if you're short on time, watch at least that.`
    },
    {
        id: 'missed-24-hours',
        timing: '24 hours after webinar (for non-attendees)',
        subject: "Did you watch the replay yet? ($1 offer expiring)",
        preheader: "Plus: Your consultation offer expires tomorrow",
        body: `Hey {{name}},

Quick follow-up - did you get a chance to watch the AI Automation for Business replay?

**[Watch the Replay Here](${CONFIG.replayUrl})**

If you're short on time, here are the key timestamps:

- **0:00-10:00** - The 3 highest-ROI tasks to automate (MUST WATCH)
- **10:00-30:00** - Live demo of content automation
- **30:00-40:00** - ROI calculator walkthrough
- **40:00-60:00** - Q&A with common questions answered

Also, your $1 consultation offer expires tomorrow at midnight.

[Book Your $1 Consultation](${CONFIG.consultationUrl})

After that, it goes back to $99.

The AI Solutions Store Team`
    },
    {
        id: 'missed-48-hours',
        timing: '48 hours after webinar (for non-attendees)',
        subject: "Last chance: $1 consultation expires tonight",
        preheader: "Watch the replay + book your call before midnight",
        body: `Hey {{name}},

Two things expiring tonight:

1. **Your $1 consultation offer** - Goes back to $99 at midnight
2. **The webinar replay** - Coming down in 5 days

If you haven't watched the replay yet, I'd recommend at least the first 10 minutes. It covers the framework that makes everything else make sense.

**[Watch the Replay](${CONFIG.replayUrl})**

And if you want personalized advice on implementing automation in your business:

**[Book Your $1 Consultation](${CONFIG.consultationUrl})** (Expires tonight)

The AI Solutions Store Team`
    },
    {
        id: 'missed-5-days',
        timing: '5 days after webinar (for non-attendees)',
        subject: "Replay coming down in 48 hours",
        preheader: "Last chance to watch AI Automation for Business",
        body: `Hey {{name}},

The AI Automation for Business replay comes down in 48 hours.

After that, you'd have to wait for the next live session (date TBD).

**[Watch the Replay Now](${CONFIG.replayUrl})**

If you're on the fence about watching:

The webinar covers how to save 15+ hours per week using AI automation tools - without coding, without hiring, and with ROI typically within 1-2 weeks.

That's a pretty good return on 60 minutes of your time.

[Watch Before It's Gone](${CONFIG.replayUrl})

The AI Solutions Store Team

P.S. Even if you just watch the first 10 minutes, you'll get the core framework.`
    },
    {
        id: 'missed-7-days',
        timing: '7 days after webinar (for non-attendees)',
        subject: "Replay removed - but here's a summary",
        preheader: "Quick summary of what was covered + next steps",
        body: `Hey {{name}},

The webinar replay has been removed, but I don't want you to miss out entirely.

Here's the TL;DR of what was covered:

**The 3 Tasks to Automate First:**
1. Content creation (drives everything else)
2. Social media distribution (amplifies content)
3. Customer communication (saves daily time)

**The Tools:**
- [Claude Droid](${CONFIG.storeUrl}/products/claude-droid) ($299) - YouTube automation
- [Marketing Engine](${CONFIG.storeUrl}/products/marketing-engine) ($199) - 23-platform posting
- [Income Droid](${CONFIG.storeUrl}/products/income-droid) ($499) - Full content system

**The ROI:**
At $50/hour, 15 hours saved = $750/week = $3,000/month
Full tool stack cost: Under $1,000 one-time
Payback period: 1-2 weeks

**Next Steps:**
Want personalized advice? Book a consultation:
[Book a Consultation](${CONFIG.consultationUrl})

Or just start with the tool that fits your needs and dive in.

The AI Solutions Store Team`
    }
];

// ============================================================================
// FILE GENERATION FUNCTIONS
// ============================================================================

function generateRegistrationPages() {
    const outputDir = path.join(CONFIG.outputDir, 'registration-pages');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    let count = 0;
    Object.entries(REGISTRATION_PAGES).forEach(([key, page]) => {
        const filepath = path.join(outputDir, page.filename);
        fs.writeFileSync(filepath, page.html);
        log(`Generated: ${filepath}`);
        count++;
    });

    return count;
}

function generateReminderEmails() {
    const outputDir = path.join(CONFIG.outputDir, 'reminder-emails');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    let count = 0;
    REMINDER_SEQUENCE.forEach((email, index) => {
        const content = `# ${email.subject}

**Preheader:** ${email.preheader}
**Timing:** ${email.timing}
**ID:** ${email.id}

---

${email.body}

---
*FOR THE KIDS - Gospel V1.3 (60/30/10)*
*AI Solutions Store | Built with Claude Opus 4.5*
`;

        const filename = `${String(index + 1).padStart(2, '0')}-${email.id}.md`;
        const filepath = path.join(outputDir, filename);
        fs.writeFileSync(filepath, content);
        log(`Generated: ${filepath}`);
        count++;
    });

    return count;
}

function generateSlideOutline() {
    const outputDir = path.join(CONFIG.outputDir, 'slide-outline');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Generate master outline
    let outlineContent = `# ${SLIDE_OUTLINE.title}

**Duration:** ${SLIDE_OUTLINE.duration}
**Total Slides:** ${SLIDE_OUTLINE.totalSlides}

---

`;

    SLIDE_OUTLINE.sections.forEach(section => {
        outlineContent += `## ${section.section} (${section.duration})\n\n`;

        section.slides.forEach(slide => {
            outlineContent += `### Slide ${slide.number}: ${slide.title}\n\n`;
            outlineContent += `**Content:**\n`;
            slide.content.forEach(line => {
                outlineContent += `- ${line}\n`;
            });
            outlineContent += `\n**Speaker Notes:** ${slide.speakerNotes}\n\n---\n\n`;
        });
    });

    outlineContent += `
## Webinar Resources

- Store URL: ${CONFIG.storeUrl}
- Consultation URL: ${CONFIG.consultationUrl}
- Webinar URL: ${CONFIG.webinarUrl}
- Replay URL: ${CONFIG.replayUrl}

---
*FOR THE KIDS - Gospel V1.3 (60/30/10)*
*AI Solutions Store | Built with Claude Opus 4.5*
`;

    const filepath = path.join(outputDir, 'webinar-slide-outline.md');
    fs.writeFileSync(filepath, outlineContent);
    log(`Generated: ${filepath}`);

    // Also generate JSON for programmatic use
    const jsonPath = path.join(outputDir, 'webinar-slide-outline.json');
    fs.writeFileSync(jsonPath, JSON.stringify(SLIDE_OUTLINE, null, 2));
    log(`Generated: ${jsonPath}`);

    return 2;
}

function generateFollowUpEmails() {
    const outputDir = path.join(CONFIG.outputDir, 'follow-up-emails');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    let count = 0;
    FOLLOWUP_SEQUENCE.forEach((email, index) => {
        const content = `# ${email.subject}

**Preheader:** ${email.preheader}
**Timing:** ${email.timing}
**ID:** ${email.id}
**Audience:** Attendees

---

${email.body}

---
*FOR THE KIDS - Gospel V1.3 (60/30/10)*
*AI Solutions Store | Built with Claude Opus 4.5*
`;

        const filename = `${String(index + 1).padStart(2, '0')}-${email.id}.md`;
        const filepath = path.join(outputDir, filename);
        fs.writeFileSync(filepath, content);
        log(`Generated: ${filepath}`);
        count++;
    });

    return count;
}

function generateReplayEmails() {
    const outputDir = path.join(CONFIG.outputDir, 'replay-emails');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    let count = 0;
    REPLAY_SEQUENCE.forEach((email, index) => {
        const content = `# ${email.subject}

**Preheader:** ${email.preheader}
**Timing:** ${email.timing}
**ID:** ${email.id}
**Audience:** Non-Attendees / Replay Viewers

---

${email.body}

---
*FOR THE KIDS - Gospel V1.3 (60/30/10)*
*AI Solutions Store | Built with Claude Opus 4.5*
`;

        const filename = `${String(index + 1).padStart(2, '0')}-${email.id}.md`;
        const filepath = path.join(outputDir, filename);
        fs.writeFileSync(filepath, content);
        log(`Generated: ${filepath}`);
        count++;
    });

    return count;
}

function generateSummaryReport() {
    const timestamp = new Date().toISOString();
    const summaryContent = `# Webinar Funnel Content Summary

**Generated:** ${timestamp}
**Topic:** AI Automation for Business

---

## Overview

This webinar funnel contains all content needed to run a complete webinar campaign:

### 1. Registration Pages (${Object.keys(REGISTRATION_PAGES).length} pages)
- Main registration landing page with benefits, form, and social proof
- Thank you / confirmation page with next steps and social sharing

### 2. Reminder Email Sequence (${REMINDER_SEQUENCE.length} emails)
${REMINDER_SEQUENCE.map((e, i) => `- **Email ${i+1}:** ${e.timing}`).join('\n')}

### 3. Webinar Slide Outline (${SLIDE_OUTLINE.totalSlides} slides)
${SLIDE_OUTLINE.sections.map(s => `- **${s.section}:** ${s.duration} (${s.slides.length} slides)`).join('\n')}

### 4. Post-Webinar Follow-up (${FOLLOWUP_SEQUENCE.length} emails)
${FOLLOWUP_SEQUENCE.map((e, i) => `- **Email ${i+1}:** ${e.timing}`).join('\n')}

### 5. Replay Sequence (${REPLAY_SEQUENCE.length} emails)
${REPLAY_SEQUENCE.map((e, i) => `- **Email ${i+1}:** ${e.timing}`).join('\n')}

---

## Key URLs

- **Store:** ${CONFIG.storeUrl}
- **Webinar Registration:** ${CONFIG.webinarUrl}
- **Webinar Replay:** ${CONFIG.replayUrl}
- **Consultation:** ${CONFIG.consultationUrl}

---

## Webinar Structure

**Title:** ${CONFIG.webinarTitle}
**Subtitle:** ${CONFIG.webinarSubtitle}
**Duration:** ${CONFIG.webinarDuration}
**Host:** ${CONFIG.webinarHost}

### Agenda:
1. Opening & Hook (5 min) - The 15-hour problem
2. The Framework (15 min) - 3 tasks to automate
3. Live Demo (20 min) - Content automation setup
4. ROI & Value (10 min) - Calculator walkthrough
5. The Offer (5 min) - $1 consultation CTA
6. Q&A & Close (15+ min) - Answer questions

---

## Conversion Path

1. Registration Page -> Confirmation Page
2. Reminder Emails (Immediate, 24hr, 1hr, 5min)
3. Live Webinar -> $1 Consultation Offer
4. Follow-up Emails (Immediate, 24hr, 48hr, 7 days)
5. Replay Sequence for non-attendees

---

## Output Directory Structure

\`\`\`
${CONFIG.outputDir}/
  registration-pages/
    webinar-registration-main.html
    webinar-registration-thankyou.html
  reminder-emails/
    01-immediate.md
    02-24-hours.md
    03-1-hour.md
    04-5-minutes.md
  slide-outline/
    webinar-slide-outline.md
    webinar-slide-outline.json
  follow-up-emails/
    01-immediate-attendee.md
    02-24-hours-attendee.md
    03-48-hours-attendee.md
    04-7-days-attendee.md
  replay-emails/
    01-missed-immediate.md
    02-missed-24-hours.md
    03-missed-48-hours.md
    04-missed-5-days.md
    05-missed-7-days.md
\`\`\`

---

*FOR THE KIDS - Gospel V1.3 (60/30/10)*
*AI Solutions Store | Built with Claude Opus 4.5*
`;

    const filepath = path.join(CONFIG.outputDir, 'WEBINAR-FUNNEL-SUMMARY.md');
    fs.writeFileSync(filepath, summaryContent);
    log(`Generated: ${filepath}`);

    return 1;
}

function generateAllContent() {
    ensureDirectories();

    let totalFiles = 0;

    log('');
    log('=== GENERATING REGISTRATION PAGES ===');
    totalFiles += generateRegistrationPages();

    log('');
    log('=== GENERATING REMINDER EMAILS ===');
    totalFiles += generateReminderEmails();

    log('');
    log('=== GENERATING SLIDE OUTLINE ===');
    totalFiles += generateSlideOutline();

    log('');
    log('=== GENERATING FOLLOW-UP EMAILS ===');
    totalFiles += generateFollowUpEmails();

    log('');
    log('=== GENERATING REPLAY EMAILS ===');
    totalFiles += generateReplayEmails();

    log('');
    log('=== GENERATING SUMMARY REPORT ===');
    totalFiles += generateSummaryReport();

    return totalFiles;
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
WEBINAR FUNNEL CONTENT GENERATOR
AI Solutions Store | FOR THE KIDS - Gospel V1.3
============================================================================

Topic: AI Automation for Business

Usage:
  node webinar-funnel.cjs [options]

Options:
  --help                    Show this help message
  --generate-all            Generate all webinar funnel content

  --component=TYPE          Generate specific component only:
      registration          Registration landing pages
      reminders             Pre-webinar reminder emails
      slides                Webinar slide outline
      follow-up             Post-webinar follow-up emails
      replay                Replay sequence emails

Output Directory: ${CONFIG.outputDir}
Log File: ${CONFIG.logFile}

Components Generated:
  1. Registration Pages     - HTML landing pages (main + thank you)
  2. Reminder Emails        - Pre-webinar sequence (4 emails)
  3. Slide Outline          - Full presentation structure (17 slides)
  4. Follow-up Emails       - Post-webinar attendee sequence (4 emails)
  5. Replay Emails          - Non-attendee sequence (5 emails)

Examples:
  node webinar-funnel.cjs --generate-all
  node webinar-funnel.cjs --component=registration
  node webinar-funnel.cjs --component=slides

============================================================================
FOR THE KIDS. ALWAYS.
============================================================================
`);
}

async function main() {
    const args = parseArgs();

    console.log('');
    console.log('============================================================================');
    console.log('WEBINAR FUNNEL CONTENT GENERATOR');
    console.log('AI Automation for Business | FOR THE KIDS - Gospel V1.3 (60/30/10)');
    console.log('============================================================================');
    console.log('');

    if (args.help) {
        showHelp();
        return;
    }

    ensureDirectories();

    if (args['generate-all']) {
        log('Generating complete webinar funnel content...', 'INFO');
        const count = generateAllContent();
        log('', 'INFO');
        log('============================================================================', 'INFO');
        log(`GENERATION COMPLETE: ${count} files created`, 'SUCCESS');
        log(`Output directory: ${CONFIG.outputDir}`, 'INFO');
        log('FOR THE KIDS. ALWAYS.', 'SUCCESS');
        log('============================================================================', 'INFO');
        return;
    }

    if (args.component) {
        const component = args.component;
        let count = 0;

        switch (component) {
            case 'registration':
                log('Generating registration pages...', 'INFO');
                count = generateRegistrationPages();
                break;
            case 'reminders':
                log('Generating reminder emails...', 'INFO');
                count = generateReminderEmails();
                break;
            case 'slides':
                log('Generating slide outline...', 'INFO');
                count = generateSlideOutline();
                break;
            case 'follow-up':
                log('Generating follow-up emails...', 'INFO');
                count = generateFollowUpEmails();
                break;
            case 'replay':
                log('Generating replay emails...', 'INFO');
                count = generateReplayEmails();
                break;
            default:
                log(`Unknown component: ${component}`, 'ERROR');
                log('Valid components: registration, reminders, slides, follow-up, replay', 'INFO');
                return;
        }

        log(`Generated ${count} files for component: ${component}`, 'SUCCESS');
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
    REGISTRATION_PAGES,
    REMINDER_SEQUENCE,
    SLIDE_OUTLINE,
    FOLLOWUP_SEQUENCE,
    REPLAY_SEQUENCE,
    generateAllContent,
    generateRegistrationPages,
    generateReminderEmails,
    generateSlideOutline,
    generateFollowUpEmails,
    generateReplayEmails
};
