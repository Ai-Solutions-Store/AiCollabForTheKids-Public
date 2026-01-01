// C:\AiCollabForTheKids\scripts\hive\agents\artist.js
// OPUS HIVE - ARTIST AGENT v1.0.0
// The Visual Factory - Creates video content from static images
// FOR THE KIDS. ALWAYS.

const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, '../../../logs/artist-agent.log');
const OUTPUT_DIR = path.join(__dirname, '../../../logs/generated-videos');
const ASSETS_DIR = path.join(__dirname, '../../../assets/products');

// Ensure directories exist
[OUTPUT_DIR, ASSETS_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

function log(message) {
    const timestamp = new Date().toISOString();
    const logLine = `[${timestamp}] [ARTIST] ${message}`;
    console.log(logLine);
    try {
        fs.appendFileSync(LOG_FILE, logLine + '\n');
    } catch (err) {
        // Ignore
    }
}

/**
 * Find product images in assets folder
 */
function findProductImages(product) {
    const extensions = ['.png', '.jpg', '.jpeg', '.webp'];

    for (const ext of extensions) {
        const filepath = path.join(ASSETS_DIR, `${product}${ext}`);
        if (fs.existsSync(filepath)) {
            return filepath;
        }
    }

    // Try to find any image file
    try {
        const files = fs.readdirSync(ASSETS_DIR);
        const imageFile = files.find(f =>
            extensions.some(ext => f.toLowerCase().endsWith(ext))
        );
        if (imageFile) {
            return path.join(ASSETS_DIR, imageFile);
        }
    } catch (err) {
        // Directory might not exist
    }

    return null;
}

/**
 * Generate FFmpeg command for zoom effect
 */
function getZoomCommand(inputPath, outputPath, duration = 10) {
    return [
        '-loop', '1',
        '-i', inputPath,
        '-vf', `scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2,zoompan=z='min(zoom+0.0015,1.5)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${duration * 25}:s=1080x1920`,
        '-c:v', 'libx264',
        '-t', duration.toString(),
        '-pix_fmt', 'yuv420p',
        '-y',
        outputPath
    ];
}

/**
 * Generate FFmpeg command for pan effect
 */
function getPanCommand(inputPath, outputPath, duration = 10) {
    return [
        '-loop', '1',
        '-i', inputPath,
        '-vf', `scale=1200:-1,crop=1080:1920:x='(iw-ow)*(t/${duration})':y=0`,
        '-c:v', 'libx264',
        '-t', duration.toString(),
        '-pix_fmt', 'yuv420p',
        '-y',
        outputPath
    ];
}

/**
 * Check for GPU acceleration
 */
function hasNvenc() {
    try {
        const { execSync } = require('child_process');
        execSync('nvidia-smi', { stdio: 'ignore' });
        return true;
    } catch (err) {
        return false;
    }
}

/**
 * Execute artist job
 * @param {Object} job - Job with product and effect
 * @returns {Object} Result with video path
 */
async function execute(job) {
    const product = job.product || 'hoodie';
    const effect = job.effect || 'zoom';
    const duration = job.duration || 10;

    log(`Creating ${effect} video for product: ${product}`);

    try {
        // Find input image
        const inputPath = findProductImages(product);

        if (!inputPath) {
            // Create a placeholder generation script instead
            const scriptPath = path.join(OUTPUT_DIR, `${product}-${effect}-${Date.now()}.txt`);
            const instructions = `
# Video Generation Instructions
# Product: ${product}
# Effect: ${effect}
# Duration: ${duration}s

## Manual Steps:
1. Add product image to: ${ASSETS_DIR}/${product}.png
2. Run FFmpeg command:

### For ${effect} effect:
ffmpeg -loop 1 -i "${ASSETS_DIR}/${product}.png" \\
  -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2,zoompan=z='min(zoom+0.0015,1.5)':d=${duration * 25}:s=1080x1920" \\
  -c:v libx264 -t ${duration} -pix_fmt yuv420p \\
  "${OUTPUT_DIR}/${product}-${effect}.mp4"

## GPU Acceleration (if available):
Add: -c:v h264_nvenc

Generated: ${new Date().toISOString()}
`;
            fs.writeFileSync(scriptPath, instructions);
            log(`No image found. Instructions saved to: ${scriptPath}`);

            return {
                success: true,
                product: product,
                effect: effect,
                status: 'instructions_generated',
                message: 'No source image found. Manual instructions created.',
                instructionsPath: scriptPath,
                generatedAt: new Date().toISOString()
            };
        }

        // We have an image - generate video
        const outputFilename = `${product}-${effect}-${Date.now()}.mp4`;
        const outputPath = path.join(OUTPUT_DIR, outputFilename);

        // Get FFmpeg command
        const ffmpegArgs = effect === 'pan'
            ? getPanCommand(inputPath, outputPath, duration)
            : getZoomCommand(inputPath, outputPath, duration);

        // Try to run FFmpeg
        let ffmpeg;
        try {
            ffmpeg = require('fluent-ffmpeg');
            const ffmpegStatic = require('ffmpeg-static');
            ffmpeg.setFfmpegPath(ffmpegStatic);
        } catch (err) {
            log(`FFmpeg module not available: ${err.message}`);

            // Save command for manual execution
            const cmdPath = path.join(OUTPUT_DIR, `${product}-${effect}-command.txt`);
            fs.writeFileSync(cmdPath, `ffmpeg ${ffmpegArgs.join(' ')}`);

            return {
                success: true,
                product: product,
                effect: effect,
                status: 'command_saved',
                message: 'FFmpeg not available. Command saved for manual execution.',
                commandPath: cmdPath,
                generatedAt: new Date().toISOString()
            };
        }

        // Run FFmpeg
        return new Promise((resolve, reject) => {
            let command = ffmpeg(inputPath)
                .loop(duration)
                .outputOptions([
                    '-vf', effect === 'zoom'
                        ? `scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2,zoompan=z='min(zoom+0.0015,1.5)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${duration * 25}:s=1080x1920`
                        : `scale=1200:-1,crop=1080:1920:x='(iw-ow)*(t/${duration})':y=0`,
                    '-c:v', hasNvenc() ? 'h264_nvenc' : 'libx264',
                    '-t', duration.toString(),
                    '-pix_fmt', 'yuv420p'
                ])
                .output(outputPath)
                .on('end', () => {
                    log(`Video created: ${outputFilename}`);
                    resolve({
                        success: true,
                        product: product,
                        effect: effect,
                        status: 'completed',
                        videoPath: outputPath,
                        duration: duration,
                        codec: hasNvenc() ? 'h264_nvenc (GPU)' : 'libx264 (CPU)',
                        generatedAt: new Date().toISOString()
                    });
                })
                .on('error', (err) => {
                    log(`FFmpeg error: ${err.message}`);
                    reject(err);
                });

            command.run();
        });

    } catch (err) {
        log(`Artist failed: ${err.message}`);
        throw err;
    }
}

module.exports = { execute, findProductImages, hasNvenc };
