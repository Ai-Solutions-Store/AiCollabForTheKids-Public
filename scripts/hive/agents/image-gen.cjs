// C:\AiCollabForTheKids\scripts\hive\agents\image-gen.cjs
// OPUS HIVE - IMAGE GENERATOR v1.1.0
// AI Image Generation using Google Gemini 2.0 Flash
// FOR THE KIDS. ALWAYS.

const fs = require('fs');
const path = require('path');
const https = require('https');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../../../api/.env') });

const LOG_FILE = path.join(__dirname, '../../../logs/image-gen-agent.log');
const OUTPUT_DIR = path.join(__dirname, '../../../assets/generated');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function log(message) {
    const timestamp = new Date().toISOString();
    const logLine = `[${timestamp}] [IMAGE-GEN] ${message}`;
    console.log(logLine);
    try {
        fs.appendFileSync(LOG_FILE, logLine + '\n');
    } catch (err) {
        // Ignore
    }
}

/**
 * Get Gemini API Key from environment or key file
 */
function getApiKey() {
    // Try environment variable first
    if (process.env.GEMINI_API_KEY) {
        return process.env.GEMINI_API_KEY;
    }

    // Fallback: try reading from C:\Keys\gemini.txt or google.txt
    const keyFiles = ['C:\\Keys\\gemini.txt', 'C:\\Keys\\google.txt'];
    for (const keyFile of keyFiles) {
        if (fs.existsSync(keyFile)) {
            return fs.readFileSync(keyFile, 'utf8').trim();
        }
    }

    throw new Error('Gemini API key not found. Set GEMINI_API_KEY or create C:\\Keys\\gemini.txt');
}

/**
 * Make HTTPS request (Promise wrapper)
 */
function httpsRequest(options, body) {
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => { data += chunk; });
            res.on('end', () => {
                try {
                    resolve({ statusCode: res.statusCode, data: JSON.parse(data) });
                } catch (err) {
                    resolve({ statusCode: res.statusCode, data: data });
                }
            });
        });

        req.on('error', reject);
        if (body) req.write(body);
        req.end();
    });
}

/**
 * Generate image using Gemini 2.0 Flash
 * @param {string} prompt - Text description of the image
 * @param {Object} options - Generation options
 * @returns {Promise<Object>} Result with image path
 */
async function generateImage(prompt, options = {}) {
    const apiKey = getApiKey();

    log(`Generating image with Gemini 2.0 Flash: "${prompt.substring(0, 50)}..."`);

    // Gemini 2.0 Flash with image generation
    const requestBody = JSON.stringify({
        contents: [{
            parts: [{ text: 'Generate an image of: ' + prompt }]
        }],
        generationConfig: {
            responseModalities: ['TEXT', 'IMAGE']
        }
    });

    const response = await httpsRequest({
        hostname: 'generativelanguage.googleapis.com',
        path: `/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody)
        }
    }, requestBody);

    // Check for errors
    if (response.data.error) {
        throw new Error(response.data.error.message || JSON.stringify(response.data.error));
    }

    if (!response.data.candidates || !response.data.candidates[0]) {
        throw new Error('No response generated. Response: ' + JSON.stringify(response.data));
    }

    const parts = response.data.candidates[0].content?.parts || [];

    // Find image in response
    let imageData = null;
    let textResponse = null;

    for (const part of parts) {
        if (part.inlineData && part.inlineData.mimeType?.startsWith('image/')) {
            imageData = part.inlineData;
        }
        if (part.text) {
            textResponse = part.text;
        }
    }

    if (!imageData) {
        throw new Error('No image in response. Text response: ' + (textResponse || 'none'));
    }

    // Generate filename from prompt
    const safePrompt = prompt
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .substring(0, 50);
    const ext = imageData.mimeType.split('/')[1] || 'png';
    const filename = `${safePrompt}-${Date.now()}.${ext}`;
    const filepath = path.join(OUTPUT_DIR, filename);

    // Decode and save the image
    const imageBuffer = Buffer.from(imageData.data, 'base64');
    fs.writeFileSync(filepath, imageBuffer);

    log(`Image saved: ${filename}`);
    console.log(`\n🎨 Image Generated: ${filepath}\n`);

    return {
        success: true,
        prompt: prompt,
        imagePath: filepath,
        filename: filename,
        mimeType: imageData.mimeType,
        size: imageBuffer.length,
        model: 'gemini-2.0-flash-exp',
        provider: 'Google Gemini',
        textResponse: textResponse,
        generatedAt: new Date().toISOString()
    };
}

/**
 * Execute image generation job (for queen-bee integration)
 * @param {Object} job - Job with prompt and options
 * @returns {Promise<Object>} Result
 */
async function execute(job) {
    const prompt = job.prompt || job.trend || 'A beautiful abstract digital art';
    return generateImage(prompt, {});
}

// CLI Support: Run directly with prompt argument
if (require.main === module) {
    const args = process.argv.slice(2);
    const prompt = args.join(' ') || 'A futuristic robot holding a heart, digital art style';

    generateImage(prompt)
        .then(result => {
            console.log('Result:', JSON.stringify(result, null, 2));
            process.exit(0);
        })
        .catch(err => {
            console.error('Error:', err.message);
            process.exit(1);
        });
}

module.exports = { execute, generateImage, getApiKey };
