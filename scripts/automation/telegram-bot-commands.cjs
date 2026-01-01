/**
 * Telegram Bot Command Handlers
 * FOR THE KIDS - 60% to Verified Pediatric Charities
 *
 * Commands:
 *   /products - Browse AI products and solutions
 *   /donate   - Donate to support children's charities
 *   /stats    - View platform statistics and impact
 *   /merch    - Browse FOR THE KIDS merchandise
 *   /help     - Get help and learn about the mission
 *
 * Gospel V1.3: 60/30/10 Split (Immutable)
 */

const https = require('https');
const path = require('path');
const fs = require('fs');

// Load environment variables from api/.env
function loadEnv() {
    const envPath = path.join(__dirname, '../../api/.env');
    try {
        const envContent = fs.readFileSync(envPath, 'utf8');
        const lines = envContent.split('\n');
        for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('#')) {
                const eqIndex = trimmed.indexOf('=');
                if (eqIndex > 0) {
                    const key = trimmed.substring(0, eqIndex);
                    const value = trimmed.substring(eqIndex + 1);
                    if (!process.env[key]) {
                        process.env[key] = value;
                    }
                }
            }
        }
    } catch (e) {
        console.error('Failed to load .env file:', e.message);
    }
}

loadEnv();

// Configuration
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID;
const API_BASE = `https://api.telegram.org/bot${BOT_TOKEN}`;

// Platform URLs
const URLS = {
    store: 'https://aidoesitall.website',
    donate: 'https://dao.youandinotai.com/donate',
    merch: 'https://youandinotai.com/merch',
    dashboard: 'https://jules-dashboard.pages.dev',
    github: 'https://github.com/Ai-Solutions-Store'
};

// Gospel V1.3 - Immutable Split
const GOSPEL = {
    version: 'V1.3',
    charity: 60,
    infrastructure: 30,
    founder: 10,
    charityName: 'Verified Pediatric Charities'
};

/**
 * Make a Telegram API request
 */
function telegramRequest(method, params = {}) {
    return new Promise((resolve, reject) => {
        const url = new URL(`${API_BASE}/${method}`);
        Object.keys(params).forEach(key => {
            if (params[key] !== undefined && params[key] !== null) {
                url.searchParams.append(key, params[key]);
            }
        });

        https.get(url.toString(), (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    if (parsed.ok) {
                        resolve(parsed.result);
                    } else {
                        reject(new Error(parsed.description || 'Telegram API error'));
                    }
                } catch (e) {
                    reject(new Error('Failed to parse Telegram response'));
                }
            });
        }).on('error', reject);
    });
}

/**
 * Send a message with optional inline keyboard
 */
async function sendMessage(chatId, text, options = {}) {
    const params = {
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML',
        disable_web_page_preview: options.disablePreview || false
    };

    if (options.replyMarkup) {
        params.reply_markup = JSON.stringify(options.replyMarkup);
    }

    return telegramRequest('sendMessage', params);
}

/**
 * /products - Browse AI products and solutions
 */
async function handleProducts(chatId, userId) {
    const text = `
<b>AI Solutions Store</b>
FOR THE KIDS - ${GOSPEL.charity}% to ${GOSPEL.charityName}

<b>Featured Products:</b>

1. <b>AI Content Generator</b>
   Create blog posts, social media, and marketing content

2. <b>AI Code Assistant</b>
   Get help with coding, debugging, and code review

3. <b>AI Image Generator</b>
   Generate unique images for any purpose

4. <b>AI Video Creator</b>
   Create engaging video content with AI

5. <b>Custom AI Solutions</b>
   Enterprise solutions tailored to your needs

Every purchase supports children's charities!
    `.trim();

    const replyMarkup = {
        inline_keyboard: [
            [{ text: 'Browse Store', url: URLS.store }],
            [{ text: 'View Dashboard', url: URLS.dashboard }],
            [{ text: 'Donate Now', callback_data: 'donate' }]
        ]
    };

    return sendMessage(chatId, text, { replyMarkup });
}

/**
 * /donate - Donate to support children's charities
 */
async function handleDonate(chatId, userId) {
    const text = `
<b>Donate FOR THE KIDS</b>

Your donation makes a real difference in children's lives.

<b>Gospel ${GOSPEL.version} - Revenue Split:</b>
  ${GOSPEL.charity}% - ${GOSPEL.charityName}
  ${GOSPEL.infrastructure}% - Platform Infrastructure
  ${GOSPEL.founder}% - Founder

<b>Donation Options:</b>

<b>Crypto Donations (Base Network):</b>
Contract: <code>0x9855B75061D4c841791382998f0CE8B2BCC965A4</code>

<b>Supported Tokens:</b>
- ETH (Ethereum)
- USDC (USD Coin)
- Any ERC-20 token on Base

<b>Traditional Donations:</b>
Credit/Debit cards accepted via Square

Every dollar helps children in need!
    `.trim();

    const replyMarkup = {
        inline_keyboard: [
            [{ text: 'Donate Now', url: URLS.donate }],
            [{ text: 'View Impact', callback_data: 'stats' }],
            [{ text: 'Learn More', callback_data: 'help' }]
        ]
    };

    return sendMessage(chatId, text, { replyMarkup });
}

/**
 * /stats - View platform statistics and impact
 */
async function handleStats(chatId, userId) {
    const text = `
<b>Platform Statistics</b>
FOR THE KIDS Impact Report

<b>Gospel ${GOSPEL.version} - Revenue Distribution:</b>
  ${GOSPEL.charity}% to ${GOSPEL.charityName}
  ${GOSPEL.infrastructure}% to Infrastructure
  ${GOSPEL.founder}% to Founder

<b>Platform Nodes:</b>
  Sabertooth (192.168.0.104) - Command Center
  T5500 (192.168.0.101) - Compute Node
  EC2 (3.84.226.108) - Cloud Services
  9020 (192.168.0.103) - Backup Node

<b>Active Services:</b>
  AI Solutions Store
  DAO Governance Platform
  Merch Store (Printful)
  Marketing Automation
  Fleet Health Monitoring

<b>Charity Partners:</b>
  Verified Pediatric Charities
  Children's Hospitals

Together, we're making a difference!
    `.trim();

    const replyMarkup = {
        inline_keyboard: [
            [{ text: 'View Dashboard', url: URLS.dashboard }],
            [{ text: 'GitHub', url: URLS.github }],
            [{ text: 'Donate', callback_data: 'donate' }]
        ]
    };

    return sendMessage(chatId, text, { replyMarkup });
}

/**
 * /merch - Browse FOR THE KIDS merchandise
 */
async function handleMerch(chatId, userId) {
    const text = `
<b>FOR THE KIDS Merchandise</b>

Show your support with official merch!

<b>Available Items:</b>

<b>Apparel:</b>
  T-Shirts - "FOR THE KIDS" Collection
  Hoodies - Premium Comfort
  Hats - Classic Caps

<b>Accessories:</b>
  Mugs - Morning Motivation
  Stickers - Spread the Word
  Phone Cases - Tech Style

<b>Why Buy Merch?</b>
  ${GOSPEL.charity}% of every purchase goes to ${GOSPEL.charityName}!

Fulfilled by Printful - Quality Guaranteed
    `.trim();

    const replyMarkup = {
        inline_keyboard: [
            [{ text: 'Shop Merch', url: URLS.merch }],
            [{ text: 'View Products', callback_data: 'products' }],
            [{ text: 'Donate', callback_data: 'donate' }]
        ]
    };

    return sendMessage(chatId, text, { replyMarkup });
}

/**
 * /help - Get help and learn about the mission
 */
async function handleHelp(chatId, userId) {
    const text = `
<b>FOR THE KIDS - Help</b>

Welcome to the AI Solutions FOR THE KIDS platform!

<b>Our Mission:</b>
We build AI products and donate ${GOSPEL.charity}% of all revenue to verified pediatric charities and children's hospitals.

<b>Available Commands:</b>

/products - Browse AI products and solutions
/donate - Donate to support children's charities
/stats - View platform statistics and impact
/merch - Browse FOR THE KIDS merchandise
/help - Show this help message

<b>Gospel ${GOSPEL.version} - Immutable Split:</b>
  ${GOSPEL.charity}% - ${GOSPEL.charityName}
  ${GOSPEL.infrastructure}% - Platform Infrastructure
  ${GOSPEL.founder}% - Founder

<b>Connect With Us:</b>
  Website: aidoesitall.website
  DAO: dao.youandinotai.com
  GitHub: github.com/Ai-Solutions-Store

<b>Support:</b>
  Email: support@youandinotai.com

FOR THE KIDS. ALWAYS.
    `.trim();

    const replyMarkup = {
        inline_keyboard: [
            [
                { text: 'Products', callback_data: 'products' },
                { text: 'Donate', callback_data: 'donate' }
            ],
            [
                { text: 'Stats', callback_data: 'stats' },
                { text: 'Merch', callback_data: 'merch' }
            ],
            [{ text: 'Visit Store', url: URLS.store }]
        ]
    };

    return sendMessage(chatId, text, { replyMarkup });
}

/**
 * Handle callback queries from inline buttons
 */
async function handleCallbackQuery(callbackQuery) {
    const chatId = callbackQuery.message.chat.id;
    const userId = callbackQuery.from.id;
    const data = callbackQuery.data;

    // Answer the callback to remove loading state
    await telegramRequest('answerCallbackQuery', {
        callback_query_id: callbackQuery.id
    });

    // Route to appropriate handler
    switch (data) {
        case 'products':
            return handleProducts(chatId, userId);
        case 'donate':
            return handleDonate(chatId, userId);
        case 'stats':
            return handleStats(chatId, userId);
        case 'merch':
            return handleMerch(chatId, userId);
        case 'help':
            return handleHelp(chatId, userId);
        default:
            return sendMessage(chatId, 'Unknown action. Use /help for available commands.');
    }
}

/**
 * Process incoming update from Telegram
 */
async function processUpdate(update) {
    try {
        // Handle callback queries (button presses)
        if (update.callback_query) {
            return handleCallbackQuery(update.callback_query);
        }

        // Handle messages
        if (update.message && update.message.text) {
            const message = update.message;
            const chatId = message.chat.id;
            const userId = message.from.id;
            const text = message.text.trim();

            // Route commands
            if (text.startsWith('/')) {
                const command = text.split(' ')[0].toLowerCase().split('@')[0];

                switch (command) {
                    case '/start':
                    case '/help':
                        return handleHelp(chatId, userId);
                    case '/products':
                        return handleProducts(chatId, userId);
                    case '/donate':
                        return handleDonate(chatId, userId);
                    case '/stats':
                        return handleStats(chatId, userId);
                    case '/merch':
                        return handleMerch(chatId, userId);
                    default:
                        return sendMessage(chatId,
                            `Unknown command: ${command}\n\nUse /help to see available commands.`
                        );
                }
            }

            // Non-command message - provide helpful response
            return sendMessage(chatId,
                'Hi! I\'m the FOR THE KIDS bot.\n\nUse /help to see available commands.\n\n' +
                `${GOSPEL.charity}% of all revenue goes to ${GOSPEL.charityName}!`
            );
        }
    } catch (error) {
        console.error('Error processing update:', error);
    }
}

/**
 * Start long polling for updates
 */
async function startPolling() {
    console.log('');
    console.log('=========================================================');
    console.log('  TELEGRAM BOT - FOR THE KIDS');
    console.log('  Gospel V1.3: 60/30/10 Split (Immutable)');
    console.log('=========================================================');
    console.log('');
    console.log('Commands: /products, /donate, /stats, /merch, /help');
    console.log('');

    let offset = 0;

    while (true) {
        try {
            const updates = await telegramRequest('getUpdates', {
                offset: offset,
                timeout: 30,
                allowed_updates: JSON.stringify(['message', 'callback_query'])
            });

            for (const update of updates) {
                offset = update.update_id + 1;
                await processUpdate(update);
            }
        } catch (error) {
            console.error('Polling error:', error.message);
            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
}

/**
 * Send a broadcast message to the channel
 */
async function broadcastToChannel(text) {
    if (!CHANNEL_ID) {
        throw new Error('TELEGRAM_CHANNEL_ID not configured');
    }
    return sendMessage(CHANNEL_ID, text);
}

/**
 * Get bot info
 */
async function getBotInfo() {
    return telegramRequest('getMe');
}

// Export handlers for use in other modules
module.exports = {
    handleProducts,
    handleDonate,
    handleStats,
    handleMerch,
    handleHelp,
    handleCallbackQuery,
    processUpdate,
    sendMessage,
    broadcastToChannel,
    getBotInfo,
    startPolling,
    GOSPEL,
    URLS
};

// Run polling if executed directly
if (require.main === module) {
    if (!BOT_TOKEN) {
        console.error('ERROR: TELEGRAM_BOT_TOKEN not found in environment');
        console.error('Please ensure api/.env contains TELEGRAM_BOT_TOKEN');
        process.exit(1);
    }

    // Test bot connection and start polling
    getBotInfo()
        .then(info => {
            console.log(`Bot connected: @${info.username}`);
            console.log(`Bot ID: ${info.id}`);
            console.log('');
            return startPolling();
        })
        .catch(error => {
            console.error('Failed to connect to Telegram:', error.message);
            process.exit(1);
        });
}
