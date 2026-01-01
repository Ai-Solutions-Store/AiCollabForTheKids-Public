/**
 * AGENTS MASTER - Orchestrates all revenue generation agents
 * Runs on schedule to generate conversion content
 * 
 * Every piece of content created = potential sale = 60% to kids
 * 
 * FOR THE KIDS - The machine that feeds the mission
 */

const fs = require('fs');
const path = require('path');

// Import agents
const { generateEmailSequence } = require('./email-drip-agent.cjs');
const { generateRecoverySequences } = require('./recovery-agent.cjs');
const { generateLandingPages } = require('./seo-landing-agent.cjs');
const { generateLeadCapture } = require('./lead-capture-agent.cjs');
const { generateUpsellAssets } = require('./upsell-agent.cjs');

const LOGS_DIR = 'C:\\AiCollabForTheKids\\logs';
const LOG_FILE = path.join(LOGS_DIR, 'agents-master.log');

function log(message) {
    const entry = `[${new Date().toISOString()}] ${message}`;
    if (!fs.existsSync(LOGS_DIR)) fs.mkdirSync(LOGS_DIR, { recursive: true });
    fs.appendFileSync(LOG_FILE, entry + '\n');
    console.log(entry);
}

// State tracking
const STATE_FILE = path.join(LOGS_DIR, 'agents-state.json');

function loadState() {
    try {
        if (fs.existsSync(STATE_FILE)) {
            return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
        }
    } catch (e) {
        log(`Warning: Could not load state: ${e.message}`);
    }
    return {
        lastRun: null,
        runs: 0,
        results: {}
    };
}

function saveState(state) {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

// Main orchestration function
async function runAllAgents() {
    log('═══════════════════════════════════════════════════════════════');
    log('AGENTS MASTER - REVENUE GENERATION SYSTEM');
    log('FOR THE KIDS - Every conversion = 60% to children\'s hospitals');
    log('═══════════════════════════════════════════════════════════════');

    const state = loadState();
    const results = {};

    // Run each agent
    const agents = [
        { name: 'email-drip', fn: generateEmailSequence },
        { name: 'recovery', fn: generateRecoverySequences },
        { name: 'seo-landing', fn: generateLandingPages },
        { name: 'lead-capture', fn: generateLeadCapture },
        { name: 'upsell', fn: generateUpsellAssets }
    ];

    for (const agent of agents) {
        log(`\n🚀 Running ${agent.name} agent...`);
        try {
            const result = agent.fn();
            results[agent.name] = { success: true, ...result };
            log(`✅ ${agent.name} complete`);
        } catch (error) {
            results[agent.name] = { success: false, error: error.message };
            log(`❌ ${agent.name} failed: ${error.message}`);
        }
    }

    // Update state
    state.lastRun = new Date().toISOString();
    state.runs++;
    state.results = results;
    saveState(state);

    // Generate summary report
    const summary = generateSummary(results);
    log('\n' + summary);

    return results;
}

function generateSummary(results) {
    const successful = Object.values(results).filter(r => r.success).length;
    const total = Object.keys(results).length;

    return `
═══════════════════════════════════════════════════════════════
                    AGENTS RUN COMPLETE
═══════════════════════════════════════════════════════════════

📊 Results: ${successful}/${total} agents successful

${Object.entries(results).map(([name, result]) => 
    `${result.success ? '✅' : '❌'} ${name}: ${result.success ? 'Generated content' : result.error}`
).join('\n')}

📁 Output: C:\\AiCollabForTheKids\\logs\\agents-output\\

Next Steps:
1. Review generated content in agents-output/
2. Deploy email sequences to SendGrid
3. Upload SEO pages to ai-solutions.store
4. Set up lead capture forms
5. Connect recovery sequences to Square webhooks

FOR THE KIDS - The conversion engine is ready.
═══════════════════════════════════════════════════════════════
`;
}

// Schedule configuration
const SCHEDULE = {
    // Run agents daily at 6 AM to refresh content
    interval: 24 * 60 * 60 * 1000, // 24 hours
    immediate: true // Run immediately on start
};

// Main execution
if (require.main === module) {
    log('Agents Master starting...');
    
    // Run immediately
    if (SCHEDULE.immediate) {
        runAllAgents().then(() => {
            log('Initial run complete');
        }).catch(err => {
            log(`Initial run failed: ${err.message}`);
        });
    }
    
    // Schedule recurring runs
    setInterval(() => {
        log('Scheduled run starting...');
        runAllAgents().catch(err => {
            log(`Scheduled run failed: ${err.message}`);
        });
    }, SCHEDULE.interval);
    
    log(`Agents Master running. Schedule: every ${SCHEDULE.interval / 3600000} hours`);
}

module.exports = { runAllAgents };
