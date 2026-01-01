/**
 * ═══════════════════════════════════════════════════════════════
 * OPUS FLEET - FREE BRAIN MODULE
 * T5500 Local Inference (Zero OPEX AI)
 * ═══════════════════════════════════════════════════════════════
 *
 * Purpose: Route low-priority AI tasks to T5500 GPU node
 * Cost: $0 per request (local inference)
 * Model: Llama 3.2 (8B parameters)
 * Latency: ~7s warm, ~10s cold
 *
 * Use Cases:
 * - Email drafts
 * - Basic categorization
 * - Simple content generation
 * - Internal documentation
 * - Low-priority research
 *
 * DO NOT USE FOR:
 * - Customer-facing responses (use cloud APIs for speed/quality)
 * - Time-sensitive operations
 * - Complex reasoning tasks
 *
 * Created: 2026-01-01
 * Last Updated: 2026-01-01
 * ═══════════════════════════════════════════════════════════════
 */

const https = require('http');

/**
 * Configuration from environment
 */
const FLEET_CONFIG = {
  url: process.env.FLEET_LLM_URL || 'http://192.168.0.101:11434',
  model: process.env.FLEET_MODEL || 'llama3.2',
  enabled: process.env.FLEET_ENABLED !== 'false',
  timeout: parseInt(process.env.FLEET_TIMEOUT || '30000', 10), // 30s default
};

/**
 * Ask the Fleet Brain (T5500 Llama 3.2)
 *
 * @param {string} prompt - The prompt to send to the model
 * @param {object} options - Optional configuration
 * @param {boolean} options.stream - Enable streaming (default: false)
 * @param {number} options.temperature - Sampling temperature 0-1 (default: 0.7)
 * @param {number} options.maxTokens - Max tokens to generate (default: 512)
 * @param {string} options.system - System prompt (optional)
 * @returns {Promise<string>} The model's response
 */
async function askFleet(prompt, options = {}) {
  if (!FLEET_CONFIG.enabled) {
    throw new Error('FLEET_LLM is disabled. Set FLEET_ENABLED=true in .env');
  }

  const {
    stream = false,
    temperature = 0.7,
    maxTokens = 512,
    system = null,
  } = options;

  const payload = {
    model: FLEET_CONFIG.model,
    prompt: prompt,
    stream: stream,
    options: {
      temperature: temperature,
      num_predict: maxTokens,
    },
  };

  if (system) {
    payload.system = system;
  }

  return new Promise((resolve, reject) => {
    const urlObj = new URL(`${FLEET_CONFIG.url}/api/generate`);
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || 80,
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: FLEET_CONFIG.timeout,
    };

    const req = https.request(requestOptions, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          if (res.statusCode !== 200) {
            reject(new Error(`T5500 returned status ${res.statusCode}: ${data}`));
            return;
          }

          const response = JSON.parse(data);

          if (response.error) {
            reject(new Error(`T5500 error: ${response.error}`));
            return;
          }

          resolve(response.response || '');
        } catch (error) {
          reject(new Error(`Failed to parse T5500 response: ${error.message}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(new Error(`T5500 connection failed: ${error.message}`));
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`T5500 request timeout (${FLEET_CONFIG.timeout}ms)`));
    });

    req.write(JSON.stringify(payload));
    req.end();
  });
}

/**
 * Quick health check for T5500
 * @returns {Promise<boolean>} True if T5500 is reachable
 */
async function isFleetOnline() {
  try {
    const urlObj = new URL(`${FLEET_CONFIG.url}/api/tags`);

    return new Promise((resolve) => {
      const req = https.request({
        hostname: urlObj.hostname,
        port: urlObj.port || 80,
        path: urlObj.pathname,
        method: 'GET',
        timeout: 5000,
      }, (res) => {
        resolve(res.statusCode === 200);
      });

      req.on('error', () => resolve(false));
      req.on('timeout', () => {
        req.destroy();
        resolve(false);
      });

      req.end();
    });
  } catch (error) {
    return false;
  }
}

/**
 * Get fleet status and metadata
 * @returns {Promise<object>} Fleet status information
 */
async function getFleetStatus() {
  const online = await isFleetOnline();

  return {
    online,
    url: FLEET_CONFIG.url,
    model: FLEET_CONFIG.model,
    enabled: FLEET_CONFIG.enabled,
    node: 'T5500',
    hardware: 'Dual Xeon GPU',
    costPerRequest: 0,
    averageLatency: '7-10s',
  };
}

/**
 * Example usage patterns
 */
const examples = {
  /**
   * Simple question
   */
  async simpleQuestion() {
    const answer = await askFleet('What is the capital of France?');
    console.log('Answer:', answer);
  },

  /**
   * Email draft generation
   */
  async emailDraft() {
    const draft = await askFleet(
      'Write a professional email thanking a customer for their purchase.',
      { maxTokens: 256, temperature: 0.8 }
    );
    console.log('Draft:', draft);
  },

  /**
   * Categorization task
   */
  async categorize() {
    const category = await askFleet(
      'Categorize this feedback as positive, negative, or neutral: "The product works fine but shipping was slow."',
      { maxTokens: 50, temperature: 0.3 }
    );
    console.log('Category:', category);
  },

  /**
   * Health check
   */
  async healthCheck() {
    const status = await getFleetStatus();
    console.log('Fleet Status:', JSON.stringify(status, null, 2));
  },
};

// Export main functions
module.exports = {
  askFleet,
  isFleetOnline,
  getFleetStatus,
  examples,
  config: FLEET_CONFIG,
};

// CLI usage (if run directly)
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('OPUS FLEET - Free Brain Module');
    console.log('Usage: node free-brain.cjs <prompt>');
    console.log('       node free-brain.cjs --status');
    console.log('       node free-brain.cjs --test');
    process.exit(0);
  }

  if (args[0] === '--status') {
    getFleetStatus().then(status => {
      console.log(JSON.stringify(status, null, 2));
    }).catch(err => {
      console.error('Error:', err.message);
      process.exit(1);
    });
  } else if (args[0] === '--test') {
    console.log('Testing T5500 connection...');
    askFleet('Say "T5500 Online" in one sentence.')
      .then(response => {
        console.log('✅ Response:', response);
      })
      .catch(err => {
        console.error('❌ Error:', err.message);
        process.exit(1);
      });
  } else {
    const prompt = args.join(' ');
    console.log(`Prompt: ${prompt}`);
    console.log('Waiting for T5500...\n');

    askFleet(prompt)
      .then(response => {
        console.log('Response:', response);
      })
      .catch(err => {
        console.error('Error:', err.message);
        process.exit(1);
      });
  }
}
