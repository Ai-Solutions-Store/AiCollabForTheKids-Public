/**
 * Smartphone Zombies Merch Promotion - Multi-Platform Marketing
 * 60% of profits go to Kids DAO (Verified Medical Pediatrics)
 * FOR THE KIDS - 60/30/10
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const LOGS_DIR = 'C:\\AiCollabForTheKids\\logs\\merch-promo';
if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
}

const IMAGE_URL = 'https://files.catbox.moe/g32nml.png';

// Rotating promotional messages
const PROMO_MESSAGES = [
    {
        platform: 'twitter',
        messages: [
            `We've all seen them... heads down, shuffling through life 🧟

"Beware of Smartphone Zombies" merch is HERE!

👕 Tees | 🧥 Hoodies | 📱 Cases | 🏷️ Stickers

💚 60% of profits → children's medical care

#UnplugForKids #SmartphoneZombies`,
            `POV: You almost walked into a pole because you were on your phone

Don't worry, we made merch for that 😅

"Beware of Smartphone Zombies" - T-shirts, Hoodies, Cases

60% goes to kids' medical care through Kids DAO

#SmartphoneZombies #ForTheKids`,
            `The irony: You're reading this on your phone right now 📱

Embrace it. Wear it. Help kids.

"Beware of Smartphone Zombies" merch
60% of profits fund children's healthcare

#UnplugForKids #CharityMerch`,
            `Your purchase = a kid's medical care 💚

Beware of Smartphone Zombies merch:
👕 T-Shirts $24.99
🧥 Hoodies $44.99
📱 Cases $29.99
🏷️ Stickers $4.99

60% to Kids DAO (Verified Medical Pediatrics)

DM to order! #SmartphoneZombies`,
            `Every time you look at your phone in public, somewhere a "Smartphone Zombie" sign is laughing at you 🧟‍♂️

Join the club. Get the merch. Help the kids.

60% of profits → children's medical care

#UnplugForKids #SmartphoneZombies`
        ]
    },
    {
        platform: 'discord',
        messages: [
            {
                title: '🧟 NEW MERCH DROP: Beware of Smartphone Zombies',
                description: `You've seen them. You've been one. Now wear it for a cause!

**60% of all profits go to children's medical care through Kids DAO**

**Available:**
• T-Shirts (S-3XL) - $24.99-$32.99
• Hoodies (S-3XL) - $44.99-$54.99
• iPhone Cases - $29.99
• Kiss-Cut Stickers - $4.99-$8.99

DM to order! Every purchase helps a kid.`,
                color: 0xFFCC00
            }
        ]
    },
    {
        platform: 'telegram',
        messages: [
            `🧟 *NEW: Beware of Smartphone Zombies Merch*

We've all been caught scrolling in public like zombies. Now you can wear it!

*60% of profits fund children's medical care*

👕 T-Shirts: $24.99
🧥 Hoodies: $44.99
📱 iPhone Cases: $29.99
🏷️ Stickers: $4.99

Reply to order! #UnplugForKids`
        ]
    }
];

let messageIndex = 0;

function log(message) {
    const timestamp = new Date().toISOString();
    const logPath = path.join(LOGS_DIR, 'promo.log');
    fs.appendFileSync(logPath, `[${timestamp}] ${message}\n`);
    console.log(`[${timestamp}] ${message}`);
}

function postToDiscord(webhookUrl, embed) {
    return new Promise((resolve, reject) => {
        const url = new URL(webhookUrl);
        const postData = JSON.stringify({
            embeds: [{
                ...embed,
                thumbnail: { url: IMAGE_URL },
                footer: { text: '60% to Kids DAO | #UnplugForKids' }
            }]
        });

        const options = {
            hostname: url.hostname,
            path: url.pathname,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve({ success: true });
                } else {
                    resolve({ success: false, error: data });
                }
            });
        });

        req.on('error', e => resolve({ success: false, error: e.message }));
        req.write(postData);
        req.end();
    });
}

function postToTelegram(botToken, channelId, message) {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify({
            chat_id: channelId,
            text: message,
            parse_mode: 'Markdown'
        });

        const options = {
            hostname: 'api.telegram.org',
            path: `/bot${botToken}/sendMessage`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                const result = JSON.parse(data);
                resolve({ success: result.ok, data: result });
            });
        });

        req.on('error', e => resolve({ success: false, error: e.message }));
        req.write(postData);
        req.end();
    });
}

async function main() {
    log('=== Smartphone Zombies Promo Started ===');

    const results = [];

    // Post to Discord
    const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK_URL || process.env.DISCORD_MARKETING_WEBHOOK;
    if (DISCORD_WEBHOOK) {
        const discordMsg = PROMO_MESSAGES.find(p => p.platform === 'discord');
        const msg = discordMsg.messages[messageIndex % discordMsg.messages.length];
        const result = await postToDiscord(DISCORD_WEBHOOK, msg);
        log(`Discord: ${result.success ? 'SUCCESS' : 'FAILED - ' + result.error}`);
        results.push({ platform: 'discord', ...result });
    } else {
        log('Discord: SKIPPED (no webhook configured)');
    }

    // Post to Telegram
    const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHANNEL = process.env.TELEGRAM_CHANNEL_ID;
    if (TELEGRAM_TOKEN && TELEGRAM_CHANNEL) {
        const telegramMsg = PROMO_MESSAGES.find(p => p.platform === 'telegram');
        const msg = telegramMsg.messages[messageIndex % telegramMsg.messages.length];
        const result = await postToTelegram(TELEGRAM_TOKEN, TELEGRAM_CHANNEL, msg);
        log(`Telegram: ${result.success ? 'SUCCESS' : 'FAILED - ' + JSON.stringify(result.data)}`);
        results.push({ platform: 'telegram', ...result });
    } else {
        log('Telegram: SKIPPED (missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHANNEL_ID)');
    }

    // Generate Twitter content (for manual posting or API)
    const twitterMsgs = PROMO_MESSAGES.find(p => p.platform === 'twitter');
    const tweetContent = twitterMsgs.messages[messageIndex % twitterMsgs.messages.length];

    // Save tweet for manual posting or API pickup
    const tweetFile = path.join(LOGS_DIR, 'next-tweet.txt');
    fs.writeFileSync(tweetFile, tweetContent);
    log(`Twitter content saved to: ${tweetFile}`);

    messageIndex++;

    // Save state
    fs.writeFileSync(
        path.join(LOGS_DIR, 'last-run.json'),
        JSON.stringify({
            timestamp: new Date().toISOString(),
            messageIndex,
            results
        }, null, 2)
    );

    log('=== Promo Complete ===');
}

main().catch(err => {
    log(`Error: ${err.message}`);
    process.exit(1);
});
