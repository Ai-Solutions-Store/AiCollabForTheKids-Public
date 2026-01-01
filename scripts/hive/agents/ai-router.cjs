/**
 * ═══════════════════════════════════════════════════════════════
 * OPUS HIVE - AI ROUTER v1.0.0
 * Intelligent AI Provider Selection with Zero OPEX Optimization
 * ═══════════════════════════════════════════════════════════════
 *
 * Purpose: Route AI tasks to the optimal provider based on:
 * - Task priority (LOW → T5500 free, HIGH → Cloud APIs)
 * - Task type (simple → local, complex → cloud)
 * - Performance requirements (speed-sensitive → cloud)
 * - Cost optimization (maximize T5500 usage)
 *
 * Routing Logic:
 * 1. Low-priority + simple tasks → T5500 (Zero cost)
 * 2. High-priority or complex → Cloud APIs (Speed/quality)
 * 3. T5500 failure → Automatic fallback to cloud
 *
 * FOR THE KIDS. ALWAYS.
 * ═══════════════════════════════════════════════════════════════
 */

const path = require('path');
const fs = require('fs');

// Import providers
const freeBrain = require('./free-brain.cjs');

const LOG_FILE = path.join(__dirname, '../../../logs/ai-router.log');

// Ensure logs directory exists
const logsDir = path.dirname(LOG_FILE);
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

/**
 * Configuration
 */
const CONFIG = {
    // Task types that are suitable for T5500 (local inference)
    T5500_SUITABLE_TASKS: [
        'EMAIL_DRAFT',
        'CATEGORIZATION',
        'INTERNAL_DOCS',
        'SIMPLE_QA',
        'TAGGING',
        'BASIC_SUMMARY',
        'CONTENT_CLASSIFICATION'
    ],

    // Max latency for T5500 before fallback (ms)
    T5500_TIMEOUT: 30000, // 30s to accommodate cold starts (~20s) and warm inference (~7s)

    // Enable/disable T5500 routing
    T5500_ENABLED: process.env.FLEET_ENABLED !== 'false',

    // Cost tracking
    CLOUD_API_COST_PER_REQUEST: 0.002, // Average $0.002 per request
    T5500_COST_PER_REQUEST: 0.000,     // Zero cost
};

/**
 * Statistics tracking
 */
const stats = {
    t5500Requests: 0,
    t5500Successes: 0,
    t5500Failures: 0,
    cloudRequests: 0,
    totalCostSaved: 0,
    startTime: Date.now(),
};

function log(message) {
    const timestamp = new Date().toISOString();
    const logLine = `[${timestamp}] [AI-ROUTER] ${message}`;
    console.log(logLine);
    try {
        fs.appendFileSync(LOG_FILE, logLine + '\n');
    } catch (err) {
        // Ignore log errors
    }
}

/**
 * Determine if a task should be routed to T5500
 *
 * @param {object} taskConfig - Task configuration
 * @param {string} taskConfig.type - Task type (e.g., 'EMAIL_DRAFT')
 * @param {string} taskConfig.priority - 'LOW', 'MEDIUM', 'HIGH'
 * @param {boolean} taskConfig.timesSensitive - If true, requires fast response
 * @returns {boolean} True if should use T5500
 */
function shouldUseT5500(taskConfig) {
    const { type, priority = 'MEDIUM', timeSensitive = false } = taskConfig;

    // Never use T5500 if disabled
    if (!CONFIG.T5500_ENABLED) {
        return false;
    }

    // Never use T5500 for time-sensitive tasks
    if (timeSensitive) {
        log(`Skipping T5500 for time-sensitive task: ${type}`);
        return false;
    }

    // Check if task type is suitable for T5500
    const isSuitableType = CONFIG.T5500_SUITABLE_TASKS.includes(type);

    // Use T5500 for low-priority suitable tasks
    if (priority === 'LOW' && isSuitableType) {
        return true;
    }

    // Use T5500 for medium-priority suitable tasks (cost optimization)
    if (priority === 'MEDIUM' && isSuitableType) {
        return true;
    }

    // High-priority tasks always go to cloud (speed/quality)
    return false;
}

/**
 * Call cloud AI provider (Gemini, Claude, etc.)
 *
 * @param {string} prompt - The prompt to send
 * @param {object} options - Provider options
 * @returns {Promise<string>} AI response
 */
async function callCloudAI(prompt, options = {}) {
    stats.cloudRequests++;

    // TODO: Implement actual cloud API calls
    // For now, this is a placeholder that would call Gemini/Claude
    log(`Cloud AI request (placeholder): ${prompt.substring(0, 50)}...`);

    throw new Error('Cloud AI provider not yet implemented. Use Gemini/Claude directly for now.');
}

/**
 * Main AI routing function
 *
 * @param {string} prompt - The prompt to send to AI
 * @param {object} taskConfig - Task configuration
 * @param {string} taskConfig.type - Task type
 * @param {string} taskConfig.priority - Priority level
 * @param {boolean} taskConfig.timeSensitive - Time sensitivity
 * @param {object} aiOptions - AI generation options (temperature, maxTokens, etc.)
 * @returns {Promise<object>} { response: string, provider: string, latency: number, cost: number }
 */
async function route(prompt, taskConfig = {}, aiOptions = {}) {
    const startTime = Date.now();

    // Determine provider
    const useT5500 = shouldUseT5500(taskConfig);

    if (useT5500) {
        log(`Routing to T5500: ${taskConfig.type} (priority: ${taskConfig.priority})`);
        stats.t5500Requests++;

        try {
            // Call T5500 with timeout
            const response = await Promise.race([
                freeBrain.askFleet(prompt, aiOptions),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('T5500 timeout')), CONFIG.T5500_TIMEOUT)
                )
            ]);

            const latency = Date.now() - startTime;
            stats.t5500Successes++;
            stats.totalCostSaved += CONFIG.CLOUD_API_COST_PER_REQUEST;

            log(`T5500 SUCCESS: ${latency}ms, saved $${CONFIG.CLOUD_API_COST_PER_REQUEST.toFixed(4)}`);

            return {
                response,
                provider: 'T5500-Llama3.2',
                latency,
                cost: CONFIG.T5500_COST_PER_REQUEST,
                savedCost: CONFIG.CLOUD_API_COST_PER_REQUEST
            };

        } catch (error) {
            stats.t5500Failures++;
            log(`T5500 FAILED: ${error.message}. Falling back to Cloud API...`);

            // Fallback to cloud
            try {
                const response = await callCloudAI(prompt, aiOptions);
                const latency = Date.now() - startTime;

                return {
                    response,
                    provider: 'Cloud-Fallback',
                    latency,
                    cost: CONFIG.CLOUD_API_COST_PER_REQUEST,
                    savedCost: 0
                };
            } catch (cloudError) {
                throw new Error(`All AI providers failed. T5500: ${error.message}, Cloud: ${cloudError.message}`);
            }
        }

    } else {
        // Route directly to cloud
        log(`Routing to Cloud AI: ${taskConfig.type} (priority: ${taskConfig.priority})`);

        try {
            const response = await callCloudAI(prompt, aiOptions);
            const latency = Date.now() - startTime;

            return {
                response,
                provider: 'Cloud-Direct',
                latency,
                cost: CONFIG.CLOUD_API_COST_PER_REQUEST,
                savedCost: 0
            };
        } catch (error) {
            throw new Error(`Cloud AI failed: ${error.message}`);
        }
    }
}

/**
 * Get router statistics
 *
 * @returns {object} Statistics object
 */
function getStats() {
    const uptime = Date.now() - stats.startTime;
    const totalRequests = stats.t5500Requests + stats.cloudRequests;
    const t5500SuccessRate = stats.t5500Requests > 0
        ? (stats.t5500Successes / stats.t5500Requests * 100).toFixed(1)
        : 0;

    return {
        uptime: Math.floor(uptime / 1000), // seconds
        totalRequests,
        t5500: {
            requests: stats.t5500Requests,
            successes: stats.t5500Successes,
            failures: stats.t5500Failures,
            successRate: `${t5500SuccessRate}%`,
        },
        cloud: {
            requests: stats.cloudRequests,
        },
        costSavings: {
            total: `$${stats.totalCostSaved.toFixed(4)}`,
            perHour: totalRequests > 0
                ? `$${(stats.totalCostSaved / (uptime / 3600000)).toFixed(4)}`
                : '$0.0000',
        },
        t5500Percentage: totalRequests > 0
            ? `${(stats.t5500Requests / totalRequests * 100).toFixed(1)}%`
            : '0%',
    };
}

/**
 * Reset statistics
 */
function resetStats() {
    stats.t5500Requests = 0;
    stats.t5500Successes = 0;
    stats.t5500Failures = 0;
    stats.cloudRequests = 0;
    stats.totalCostSaved = 0;
    stats.startTime = Date.now();
    log('Statistics reset');
}

// Export main functions
module.exports = {
    route,
    shouldUseT5500,
    getStats,
    resetStats,
    CONFIG,
};

// CLI usage
if (require.main === module) {
    const args = process.argv.slice(2);

    if (args[0] === '--stats') {
        console.log('AI Router Statistics:');
        console.log(JSON.stringify(getStats(), null, 2));
        process.exit(0);
    }

    if (args[0] === '--test') {
        console.log('Testing AI Router...\n');

        // Test 1: Low-priority email draft (should use T5500)
        route('Draft a professional thank you email', {
            type: 'EMAIL_DRAFT',
            priority: 'LOW'
        })
        .then(result => {
            console.log('✅ Test 1 (Low-priority email):');
            console.log(`   Provider: ${result.provider}`);
            console.log(`   Latency: ${result.latency}ms`);
            console.log(`   Cost: $${result.cost.toFixed(4)}`);
            console.log(`   Response: ${result.response.substring(0, 100)}...\n`);
        })
        .catch(err => {
            console.error('❌ Test 1 failed:', err.message);
        });

        return;
    }

    console.log('AI Router Module');
    console.log('Usage:');
    console.log('  node ai-router.cjs --test   # Run tests');
    console.log('  node ai-router.cjs --stats  # Show statistics');
}
