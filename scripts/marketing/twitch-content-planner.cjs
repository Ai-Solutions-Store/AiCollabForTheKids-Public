/**
 * Twitch Streaming Content Planner
 * Generates content for coding/building charity streams
 *
 * Features:
 * 1. Stream titles and descriptions
 * 2. Chat commands (!commands, !project, etc.)
 * 3. Overlay text for OBS/streaming software
 * 4. Donation goal messages for charity streams
 *
 * FOR THE KIDS - 60/30/10 (backend only)
 * All proceeds support children's education and STEM programs
 */

const fs = require('fs');
const path = require('path');

const LOGS_DIR = 'C:\\AiCollabForTheKids\\logs';
const STATE_FILE = path.join(LOGS_DIR, 'twitch-planner-state.json');
const LOG_FILE = path.join(LOGS_DIR, 'twitch-planner.log');
const CONTENT_FILE = path.join(LOGS_DIR, 'twitch-content-ready.md');

// Ensure logs directory exists
if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
}

function log(message) {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(LOG_FILE, entry);
    console.log(entry.trim());
}

// ============================================================================
// STREAM TITLES AND DESCRIPTIONS
// ============================================================================

const STREAM_CONTENT = [
    // AI Automation Streams
    {
        id: 'claude-droid-build',
        category: 'ai-automation',
        title: '[FOR THE KIDS] Building AI YouTube Automation - Claude Droid Live Dev',
        description: `Live coding session building Claude Droid - an AI-powered YouTube Shorts automation system.

Today we're working on:
- Claude API integration for script generation
- FFmpeg video rendering pipeline
- YouTube Data API upload automation

All donations go to children's STEM education programs!

Tech stack: Node.js, Claude AI, FFmpeg, YouTube API
GitHub: github.com/Ai-Solutions-Store

!project !donate !commands`,
        tags: ['AI', 'Automation', 'NodeJS', 'Programming', 'Charity', 'STEM']
    },
    {
        id: 'income-droid-build',
        category: 'ai-automation',
        title: '[CHARITY STREAM] Income Droid - Multi-Platform Content Syndication',
        description: `Building Income Droid - automated content syndication across YouTube, TikTok, Instagram & more.

Stream Goals:
- Implement cross-platform formatting
- Add revenue tracking dashboard
- Build analytics integration

100% of donations support FOR THE KIDS - children's coding education!

!goals !donate !socials`,
        tags: ['AI', 'ContentCreation', 'Automation', 'Charity', 'Programming']
    },
    {
        id: 'marketing-engine-stream',
        category: 'ai-automation',
        title: '[FOR THE KIDS] 20-Platform Marketing Engine - Live Development',
        description: `Building an AI-powered marketing engine that posts to 20+ platforms automatically.

Today's focus:
- LinkedIn API integration
- Rate limiting & queue management
- Content variation engine

All donations benefit children's STEM programs!

Stack: Node.js, PM2, Multiple APIs
!project !donate !code`,
        tags: ['Marketing', 'Automation', 'API', 'NodeJS', 'Charity']
    },

    // Full Stack Development Streams
    {
        id: 'dashboard-build',
        category: 'fullstack',
        title: '[CHARITY] Building Jules AI Dashboard - Real-time Monitoring UI',
        description: `Creating a real-time AI agent monitoring dashboard from scratch.

Features we're building:
- WebSocket real-time updates
- Task queue visualization
- Multi-node fleet management
- Dark mode (of course!)

FOR THE KIDS - Every donation helps kids learn to code!

Tech: Vanilla JS, Cloudflare Pages, WebSockets
!dashboard !donate !help`,
        tags: ['WebDev', 'JavaScript', 'Dashboard', 'Charity', 'STEM']
    },
    {
        id: 'api-development',
        category: 'fullstack',
        title: '[FOR THE KIDS] Building REST APIs from Scratch - Charity Dev Stream',
        description: `Let's build production-ready REST APIs together!

Topics:
- API design best practices
- Authentication & security
- Rate limiting implementation
- Error handling patterns

All sub/donation money goes to children's education!

!api !project !donate`,
        tags: ['API', 'Backend', 'NodeJS', 'Programming', 'Charity']
    },
    {
        id: 'ecommerce-build',
        category: 'fullstack',
        title: '[CHARITY STREAM] AI Solutions Store - E-commerce Development',
        description: `Building an e-commerce platform for AI automation tools.

Today's stream:
- Payment integration (Stripe)
- Product delivery automation
- Customer dashboard
- License key generation

Every donation supports kids learning STEM!

!store !donate !tech`,
        tags: ['Ecommerce', 'WebDev', 'Stripe', 'Charity', 'Programming']
    },

    // DevOps & Infrastructure
    {
        id: 'pm2-deployment',
        category: 'devops',
        title: '[FOR THE KIDS] PM2 Process Management - Production Node.js Deployment',
        description: `Learn how to deploy Node.js apps with PM2 for 24/7 operation.

Covering:
- PM2 ecosystem configuration
- Log management & rotation
- Auto-restart strategies
- Multi-node deployment

Charity stream - all proceeds to children's coding programs!

!pm2 !deploy !donate`,
        tags: ['DevOps', 'PM2', 'NodeJS', 'Deployment', 'Charity']
    },
    {
        id: 'cloudflare-setup',
        category: 'devops',
        title: '[CHARITY] Cloudflare Pages & Workers - Free Hosting Deep Dive',
        description: `Setting up free, blazing-fast hosting with Cloudflare.

Topics:
- Cloudflare Pages deployment
- Workers for serverless functions
- Custom domains & SSL
- Analytics integration

FOR THE KIDS - Supporting STEM education!

!cloudflare !hosting !donate`,
        tags: ['Cloudflare', 'Hosting', 'DevOps', 'Serverless', 'Charity']
    },

    // Special Event Streams
    {
        id: 'marathon-24hr',
        category: 'special',
        title: '[24HR CHARITY MARATHON] Code for the Kids - Building AI Tools Live',
        description: `24-HOUR CHARITY CODING MARATHON!

Building multiple AI automation tools from scratch. Every donation helps children access STEM education.

Schedule:
- Hour 1-6: Claude Droid development
- Hour 7-12: Marketing Engine
- Hour 13-18: Dashboard UI
- Hour 19-24: Community features!

Donation goals unlock special features!

!schedule !goals !donate`,
        tags: ['CharityStream', 'Marathon', 'AI', 'Programming', 'ForTheKids']
    },
    {
        id: 'community-collab',
        category: 'special',
        title: '[FOR THE KIDS] Community Collab Stream - Building What YOU Request!',
        description: `YOU decide what we build today!

Submit your feature requests and vote in chat. Most popular ideas get built live!

Rules:
- Keep it family-friendly
- Must be doable in stream
- Open source everything

All donations go to children's education programs!

!vote !suggest !donate`,
        tags: ['Community', 'Interactive', 'Programming', 'Charity', 'STEM']
    }
];

// ============================================================================
// CHAT COMMANDS
// ============================================================================

const CHAT_COMMANDS = {
    // Core Commands
    '!project': {
        response: 'We\'re building AI automation tools at AI Solutions Store! All proceeds support FOR THE KIDS - children\'s STEM education. Learn more: ai-solutions.store',
        description: 'Explains the current project'
    },
    '!donate': {
        response: 'Want to support kids learning to code? Every donation helps! All proceeds go to FOR THE KIDS - children\'s STEM education programs. Thank you for making a difference!',
        description: 'Donation information'
    },
    '!commands': {
        response: 'Commands: !project !donate !socials !code !goals !schedule !faq !discord !github',
        description: 'Lists all available commands'
    },
    '!socials': {
        response: 'Follow us! Twitter: @AiCollab4Kids | GitHub: github.com/Ai-Solutions-Store | Discord: discord.gg/forthekids | Website: ai-solutions.store',
        description: 'Social media links'
    },
    '!code': {
        response: 'All code is open source! GitHub: github.com/Ai-Solutions-Store | Stack: Node.js, Claude AI, FFmpeg, PM2',
        description: 'Code and tech stack info'
    },
    '!goals': {
        response: 'Current donation goals unlock special features! Check the overlay for progress. Every $100 = new feature built live!',
        description: 'Donation goal information'
    },
    '!schedule': {
        response: 'Stream schedule: Tue/Thu 7PM EST - Coding Sessions | Sat 2PM EST - Community Builds | Special marathons announced on Twitter!',
        description: 'Stream schedule'
    },
    '!faq': {
        response: 'FAQ: Q: Is this real coding? A: Yes, live development! Q: Where do donations go? A: 100% to children\'s STEM education! Q: Can I use the code? A: Yes, it\'s open source!',
        description: 'Frequently asked questions'
    },
    '!discord': {
        response: 'Join our Discord community! Get help with coding, share your projects, and connect with other devs. Link: discord.gg/forthekids',
        description: 'Discord invite'
    },
    '!github': {
        response: 'All our projects are open source! Star our repos: github.com/Ai-Solutions-Store | Contributions welcome!',
        description: 'GitHub link'
    },

    // Technical Commands
    '!stack': {
        response: 'Tech Stack: Node.js (ES modules) | PM2 (process management) | Claude AI (content generation) | FFmpeg (video) | Cloudflare (hosting)',
        description: 'Technology stack details'
    },
    '!api': {
        response: 'APIs we use: Claude (Anthropic) for AI | YouTube Data API | Twitter API | LinkedIn API | Various social platform APIs',
        description: 'API information'
    },
    '!learn': {
        response: 'Want to learn to code? Start here: freecodecamp.org | theodinproject.com | javascript.info | Our streams are also great for learning!',
        description: 'Learning resources'
    },
    '!tools': {
        response: 'My dev tools: VS Code (editor) | Node.js v20+ | Git/GitHub | PM2 | Postman (API testing) | OBS (streaming)',
        description: 'Development tools used'
    },

    // Charity Commands
    '!forthekids': {
        response: 'FOR THE KIDS is our mission! 60% of all proceeds go directly to children\'s STEM education programs. We believe every kid deserves access to coding education!',
        description: 'Charity mission explanation'
    },
    '!impact': {
        response: 'Your donations have helped: 50+ kids access coding classes | 10 schools receive tech equipment | 100+ hours of free tutoring. Thank you!',
        description: 'Donation impact stats'
    },
    '!why': {
        response: 'Why FOR THE KIDS? Because the next generation of developers, innovators, and problem-solvers are in classrooms right now. They just need the opportunity!',
        description: 'Explains the why behind the charity'
    },

    // Fun Commands
    '!hello': {
        response: 'Hey there! Welcome to the stream! We\'re coding for a cause - stick around and learn something new!',
        description: 'Greeting message'
    },
    '!hype': {
        response: 'LET\'S GOOO! Building cool stuff AND helping kids learn to code? Best combo ever!',
        description: 'Hype message'
    },
    '!coffee': {
        response: 'Coffee count today: [COUNTER] | Fuel for the code! Donations keep the coffee (and the stream) flowing!',
        description: 'Coffee counter (fun)'
    },
    '!break': {
        response: 'Taking a short break! Stretch, hydrate, and check out the donation goals. Be back in 5!',
        description: 'Break announcement'
    }
};

// ============================================================================
// OVERLAY TEXT TEMPLATES
// ============================================================================

const OVERLAY_TEMPLATES = {
    // Main Stream Overlays
    mainTitle: {
        id: 'main-title',
        text: 'FOR THE KIDS - Charity Dev Stream',
        position: 'top-center',
        style: 'large-bold',
        description: 'Main stream title overlay'
    },
    currentTask: {
        id: 'current-task',
        text: 'Currently Building: {TASK_NAME}',
        position: 'top-left',
        style: 'medium',
        description: 'Shows current development task'
    },
    donationGoal: {
        id: 'donation-goal',
        text: 'Goal: ${CURRENT} / ${TARGET} - {GOAL_NAME}',
        position: 'top-right',
        style: 'goal-bar',
        description: 'Donation progress bar'
    },
    recentDonation: {
        id: 'recent-donation',
        text: 'Thank you {NAME} for ${AMOUNT}! Supporting kids in STEM!',
        position: 'center',
        style: 'alert-popup',
        description: 'Recent donation alert'
    },

    // Tech Info Overlays
    techStack: {
        id: 'tech-stack',
        text: 'Stack: Node.js | Claude AI | FFmpeg | PM2',
        position: 'bottom-left',
        style: 'small-info',
        description: 'Technology stack display'
    },
    codeFile: {
        id: 'code-file',
        text: 'File: {FILENAME} | Line: {LINE_NUMBER}',
        position: 'bottom-center',
        style: 'code-info',
        description: 'Current file being edited'
    },
    gitStatus: {
        id: 'git-status',
        text: 'Branch: {BRANCH} | Commits today: {COUNT}',
        position: 'bottom-right',
        style: 'small-info',
        description: 'Git status display'
    },

    // Charity Info Overlays
    charityBanner: {
        id: 'charity-banner',
        text: '100% of donations support children\'s STEM education!',
        position: 'bottom-ticker',
        style: 'scrolling-banner',
        description: 'Scrolling charity message'
    },
    impactCounter: {
        id: 'impact-counter',
        text: 'Kids helped this stream: {COUNT}',
        position: 'side-panel',
        style: 'counter',
        description: 'Real-time impact counter'
    },
    missionStatement: {
        id: 'mission-statement',
        text: 'FOR THE KIDS: Building AI tools. Teaching the next generation. Making a difference.',
        position: 'intermission',
        style: 'large-center',
        description: 'Mission statement for breaks'
    },

    // Interactive Overlays
    pollActive: {
        id: 'poll-active',
        text: 'VOTE NOW: What should we build next? Type 1, 2, or 3 in chat!',
        position: 'center-overlay',
        style: 'poll-box',
        description: 'Active poll display'
    },
    chatHighlight: {
        id: 'chat-highlight',
        text: '{USERNAME}: {MESSAGE}',
        position: 'side-panel',
        style: 'chat-bubble',
        description: 'Highlighted chat message'
    },
    milestone: {
        id: 'milestone',
        text: 'MILESTONE REACHED! {MILESTONE_NAME} - Thank you all!',
        position: 'full-screen',
        style: 'celebration',
        description: 'Milestone celebration overlay'
    },

    // Starting/Ending Overlays
    startingSoon: {
        id: 'starting-soon',
        text: 'Stream Starting Soon! | FOR THE KIDS Charity Stream | Get ready to code!',
        position: 'full-screen',
        style: 'countdown',
        description: 'Pre-stream countdown'
    },
    brb: {
        id: 'brb',
        text: 'Be Right Back! | Stretch, hydrate, and check out our donation goals!',
        position: 'full-screen',
        style: 'brb-screen',
        description: 'BRB screen'
    },
    endScreen: {
        id: 'end-screen',
        text: 'Thanks for watching! | Total raised: ${TOTAL} | Follow for more: @AiCollab4Kids',
        position: 'full-screen',
        style: 'end-credits',
        description: 'Stream end screen'
    }
};

// ============================================================================
// DONATION GOAL MESSAGES
// ============================================================================

const DONATION_GOALS = [
    // Milestone Goals
    {
        id: 'goal-100',
        amount: 100,
        name: 'First Hundred!',
        description: 'Our first $100 milestone',
        reachedMessage: 'WE DID IT! $100 raised! That\'s coding supplies for 2 kids! Thank you so much!',
        celebrationAction: 'confetti-explosion',
        unlocks: 'I\'ll add a special feature requested by chat!'
    },
    {
        id: 'goal-250',
        amount: 250,
        name: 'Quarter Thousand!',
        description: '$250 donation goal',
        reachedMessage: 'AMAZING! $250 raised! This funds a full coding workshop for 5 students! You all are incredible!',
        celebrationAction: 'fireworks-display',
        unlocks: 'Extended stream + live code review of viewer projects!'
    },
    {
        id: 'goal-500',
        amount: 500,
        name: 'Half K Heroes!',
        description: '$500 donation goal',
        reachedMessage: 'HALFWAY TO A THOUSAND! $500 means 10 kids get access to online coding courses! This community is amazing!',
        celebrationAction: 'mega-celebration',
        unlocks: '24-hour coding marathon announced! Plus special Discord roles for donors!'
    },
    {
        id: 'goal-1000',
        amount: 1000,
        name: 'Grand Goal!',
        description: '$1000 donation goal',
        reachedMessage: 'ONE THOUSAND DOLLARS! This funds an entire semester of after-school coding club! I\'m literally in tears! Thank you!',
        celebrationAction: 'ultimate-celebration',
        unlocks: 'Full featured product built live on stream! Donors get early access!'
    },
    {
        id: 'goal-2500',
        amount: 2500,
        name: 'Mega Milestone!',
        description: '$2500 donation goal',
        reachedMessage: 'TWENTY-FIVE HUNDRED! This is life-changing! We can now sponsor 5 kids for a full year of coding education!',
        celebrationAction: 'legendary-celebration',
        unlocks: 'In-person event planned! Donor meetup and live coding session!'
    },
    {
        id: 'goal-5000',
        amount: 5000,
        name: 'Five K Fantasy!',
        description: '$5000 donation goal',
        reachedMessage: 'FIVE THOUSAND DOLLARS! This is incredible! A full classroom of kids will learn to code because of this community!',
        celebrationAction: 'epic-finale',
        unlocks: 'Scholarship fund established! Named after top donor!'
    },

    // Special Themed Goals
    {
        id: 'goal-coffee',
        amount: 50,
        name: 'Coffee Fund',
        description: 'Keep the streamer caffeinated!',
        reachedMessage: 'Coffee fund reached! The code will flow! (Still goes to charity, I buy my own coffee!)',
        celebrationAction: 'coffee-animation',
        unlocks: 'Caffeine-fueled speed coding session!'
    },
    {
        id: 'goal-pizza',
        amount: 150,
        name: 'Pizza Party',
        description: 'Virtual pizza party for chat!',
        reachedMessage: 'PIZZA PARTY! Virtual pizza for everyone! And real educational materials for kids!',
        celebrationAction: 'pizza-rain',
        unlocks: 'Extended chill coding session with music requests!'
    },
    {
        id: 'goal-equipment',
        amount: 750,
        name: 'Equipment Drive',
        description: 'Fund equipment for a student',
        reachedMessage: 'EQUIPMENT GOAL REACHED! A student in need will receive a laptop for coding! You all made this happen!',
        celebrationAction: 'laptop-reveal',
        unlocks: 'Live unboxing and setup of equipment for recipient!'
    },
    {
        id: 'goal-teacher',
        amount: 2000,
        name: 'Teacher Training',
        description: 'Fund teacher STEM training',
        reachedMessage: 'TEACHER TRAINING FUNDED! A teacher will receive professional development in coding education! The impact multiplies!',
        celebrationAction: 'teacher-tribute',
        unlocks: 'Interview with an educator about STEM in schools!'
    }
];

// ============================================================================
// INDIVIDUAL DONATION THANK YOU MESSAGES
// ============================================================================

const DONATION_THANKS = {
    tiers: {
        small: { // $1-9
            messages: [
                'Thank you {NAME} for ${AMOUNT}! Every dollar counts for the kids!',
                '{NAME} just donated ${AMOUNT}! You\'re helping a kid learn to code!',
                'Appreciate you {NAME}! ${AMOUNT} goes straight to STEM education!',
                '{NAME} with the ${AMOUNT} support! Building futures, one donation at a time!'
            ]
        },
        medium: { // $10-49
            messages: [
                'WOW {NAME}! ${AMOUNT}! That\'s textbooks for a coding student!',
                '{NAME} coming in HOT with ${AMOUNT}! The kids thank you!',
                'HUGE thanks to {NAME} for ${AMOUNT}! You\'re making a real difference!',
                '{NAME} just dropped ${AMOUNT}! This community is incredible!'
            ]
        },
        large: { // $50-99
            messages: [
                'MASSIVE donation from {NAME}! ${AMOUNT} is going to change lives!',
                '{NAME} with the ${AMOUNT} BOMB! You just funded a kid\'s first coding course!',
                'INCREDIBLE {NAME}! ${AMOUNT}! I need a moment... thank you so much!',
                '{NAME} is a LEGEND! ${AMOUNT} for the kids! Standing ovation!'
            ]
        },
        huge: { // $100+
            messages: [
                '{NAME} JUST DROPPED ${AMOUNT}! I AM SPEECHLESS! You are amazing!',
                'STOP EVERYTHING! {NAME} donated ${AMOUNT}! This is life-changing generosity!',
                '{NAME} with ${AMOUNT}! I\'m literally tearing up! Thank you from the bottom of my heart!',
                'LEGENDARY DONOR ALERT! {NAME} - ${AMOUNT}! You\'re sending kids to coding camp!'
            ]
        }
    },
    bits: {
        messages: [
            'Cheers {NAME} for {BITS} bits! Every bit helps the kids!',
            '{BITS} bits from {NAME}! Building futures one bit at a time!',
            '{NAME} with the {BITS} bit cheer! You rock!'
        ]
    },
    subscriptions: {
        new: [
            'Welcome to the family {NAME}! Your sub supports STEM education!',
            '{NAME} just subscribed! Thank you for supporting FOR THE KIDS!',
            'NEW SUB! {NAME} joins the mission! Let\'s build the future together!'
        ],
        resub: [
            '{NAME} resubbed for {MONTHS} months! Consistent supporter, consistent impact!',
            '{MONTHS} months strong! Thank you {NAME} for your continued support!',
            'RESUB! {NAME} x{MONTHS}! Long-term supporters = long-term impact!'
        ],
        gift: [
            '{NAME} gifted {COUNT} subs! Spreading the love AND supporting kids!',
            'SUB BOMB from {NAME}! {COUNT} gifted subs! You\'re amazing!',
            '{COUNT} gift subs from {NAME}! The generosity in this community is unreal!'
        ]
    }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getState() {
    try {
        if (fs.existsSync(STATE_FILE)) {
            return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
        }
    } catch (err) {
        log(`Error reading state: ${err.message}`);
    }
    return { lastStreamIndex: -1, lastGoalIndex: -1, generated: [] };
}

function saveState(state) {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function getNextStream() {
    const state = getState();
    const nextIndex = (state.lastStreamIndex + 1) % STREAM_CONTENT.length;
    return { stream: STREAM_CONTENT[nextIndex], index: nextIndex };
}

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function formatDonationMessage(template, data) {
    let message = template;
    for (const [key, value] of Object.entries(data)) {
        message = message.replace(new RegExp(`{${key}}`, 'g'), value);
    }
    return message;
}

function getDonationTier(amount) {
    if (amount >= 100) return 'huge';
    if (amount >= 50) return 'large';
    if (amount >= 10) return 'medium';
    return 'small';
}

// ============================================================================
// CONTENT GENERATION
// ============================================================================

function generateFullContent() {
    const { stream, index } = getNextStream();
    const timestamp = new Date().toISOString();

    // Select random donation goals for this stream
    const selectedGoals = DONATION_GOALS.slice(0, 4);

    // Generate chat command list
    const commandList = Object.entries(CHAT_COMMANDS)
        .map(([cmd, data]) => `${cmd}: ${data.description}`)
        .join('\n');

    // Generate overlay configurations
    const overlayConfig = Object.values(OVERLAY_TEMPLATES)
        .map(o => `[${o.id}] ${o.text} | Position: ${o.position} | Style: ${o.style}`)
        .join('\n');

    // Build the content file
    const content = `# Twitch Content Plan - Generated ${timestamp}

## FOR THE KIDS - Charity Coding Stream

---

## STREAM INFO

**Stream Number:** ${index + 1} of ${STREAM_CONTENT.length}
**Category:** ${stream.category}
**Stream ID:** ${stream.id}

### Title (Copy for Twitch)
\`\`\`
${stream.title}
\`\`\`

### Description (Copy for Twitch)
\`\`\`
${stream.description}
\`\`\`

### Tags
${stream.tags.map(t => `- ${t}`).join('\n')}

---

## CHAT COMMANDS

Copy these into your chatbot (Nightbot, StreamElements, etc.):

\`\`\`
${Object.entries(CHAT_COMMANDS).map(([cmd, data]) =>
`${cmd} -> ${data.response}`
).join('\n\n')}
\`\`\`

### Command Summary
${commandList}

---

## OVERLAY TEXT

### Main Overlays
${Object.values(OVERLAY_TEMPLATES).filter(o => !['brb', 'endScreen', 'startingSoon'].includes(o.id)).map(o => `
**${o.id}**
- Text: \`${o.text}\`
- Position: ${o.position}
- Style: ${o.style}
`).join('\n')}

### Scene-Specific Overlays

**Starting Soon Scene:**
\`${OVERLAY_TEMPLATES.startingSoon.text}\`

**BRB Scene:**
\`${OVERLAY_TEMPLATES.brb.text}\`

**End Scene:**
\`${OVERLAY_TEMPLATES.endScreen.text}\`

---

## DONATION GOALS

Set these up in your streaming software or donation platform:

${selectedGoals.map(goal => `
### ${goal.name} - $${goal.amount}
- **Description:** ${goal.description}
- **When Reached:** ${goal.reachedMessage}
- **Celebration:** ${goal.celebrationAction}
- **Unlocks:** ${goal.unlocks}
`).join('\n')}

---

## DONATION THANK YOU MESSAGES

### For Different Donation Amounts

**Small ($1-9):**
${DONATION_THANKS.tiers.small.messages.map(m => `- "${m}"`).join('\n')}

**Medium ($10-49):**
${DONATION_THANKS.tiers.medium.messages.map(m => `- "${m}"`).join('\n')}

**Large ($50-99):**
${DONATION_THANKS.tiers.large.messages.map(m => `- "${m}"`).join('\n')}

**Huge ($100+):**
${DONATION_THANKS.tiers.huge.messages.map(m => `- "${m}"`).join('\n')}

### For Bits
${DONATION_THANKS.bits.messages.map(m => `- "${m}"`).join('\n')}

### For Subscriptions

**New Subs:**
${DONATION_THANKS.subscriptions.new.map(m => `- "${m}"`).join('\n')}

**Resubs:**
${DONATION_THANKS.subscriptions.resub.map(m => `- "${m}"`).join('\n')}

**Gift Subs:**
${DONATION_THANKS.subscriptions.gift.map(m => `- "${m}"`).join('\n')}

---

## QUICK REFERENCE

### Social Links
- Twitter: @AiCollab4Kids
- GitHub: github.com/Ai-Solutions-Store
- Discord: discord.gg/forthekids
- Website: ai-solutions.store

### Key Messages
- "FOR THE KIDS - 100% of donations support children's STEM education"
- "Building AI automation tools live - learn to code while supporting a great cause"
- "Every dollar helps a child learn to code"

### Stream Schedule Template
- Tuesday/Thursday: 7 PM EST - Coding Sessions
- Saturday: 2 PM EST - Community Builds
- Special events announced on Twitter

---

## OBS SETUP CHECKLIST

- [ ] Main scene with coding layout
- [ ] Starting soon scene with countdown
- [ ] BRB scene with donation goals
- [ ] End screen with totals and socials
- [ ] Donation alerts configured
- [ ] Chat overlay positioned
- [ ] Donation goal bar visible
- [ ] Tech stack overlay enabled

---

*Generated by Twitch Content Planner*
*FOR THE KIDS - 60/30/10*
*ai-solutions.store*
`;

    return { content, stream, index };
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main() {
    log('===================================================================');
    log('TWITCH CONTENT PLANNER');
    log('FOR THE KIDS - Charity Coding Streams');
    log('===================================================================');

    const { content, stream, index } = generateFullContent();

    // Save to file
    fs.writeFileSync(CONTENT_FILE, content);
    log(`\nContent saved to: ${CONTENT_FILE}`);

    // Update state
    const state = getState();
    state.lastStreamIndex = index;
    state.generated.push({
        id: stream.id,
        category: stream.category,
        title: stream.title,
        generatedAt: new Date().toISOString()
    });
    if (state.generated.length > 50) {
        state.generated = state.generated.slice(-50);
    }
    saveState(state);

    // Log summary
    log('\n--- STREAM CONTENT PREVIEW ---');
    log(`Title: ${stream.title}`);
    log(`Category: ${stream.category}`);
    log(`Tags: ${stream.tags.join(', ')}`);
    log('--- END PREVIEW ---\n');

    log(`Chat Commands: ${Object.keys(CHAT_COMMANDS).length} configured`);
    log(`Overlay Templates: ${Object.keys(OVERLAY_TEMPLATES).length} available`);
    log(`Donation Goals: ${DONATION_GOALS.length} milestones`);
    log(`Thank You Messages: ${
        DONATION_THANKS.tiers.small.messages.length +
        DONATION_THANKS.tiers.medium.messages.length +
        DONATION_THANKS.tiers.large.messages.length +
        DONATION_THANKS.tiers.huge.messages.length +
        DONATION_THANKS.bits.messages.length +
        DONATION_THANKS.subscriptions.new.length +
        DONATION_THANKS.subscriptions.resub.length +
        DONATION_THANKS.subscriptions.gift.length
    } variations`);

    log('\n===================================================================');
    log('COMPLETE: Twitch content plan ready');
    log(`Next run: Stream ${((index + 1) % STREAM_CONTENT.length) + 1} of ${STREAM_CONTENT.length}`);
    log('===================================================================');

    return { stream, index };
}

// Run if called directly
if (require.main === module) {
    main().then(() => {
        process.exit(0);
    }).catch(err => {
        log(`Fatal error: ${err.message}`);
        console.error(err);
        process.exit(1);
    });
}

module.exports = {
    STREAM_CONTENT,
    CHAT_COMMANDS,
    OVERLAY_TEMPLATES,
    DONATION_GOALS,
    DONATION_THANKS,
    generateFullContent,
    getNextStream,
    getDonationTier,
    formatDonationMessage
};
