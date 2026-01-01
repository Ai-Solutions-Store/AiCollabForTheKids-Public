/**
 * Marketing Runner T5500 - Node.js wrapper for PM2
 * Executes DIFFERENT marketing scripts than Sabertooth to avoid overlap
 * T5500 focuses on: LinkedIn, Reddit, Email, AI Story tweets
 *
 * FOR THE KIDS - 60/30/10
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const SCRIPTS_DIR = 'C:\\AiCollabForTheKids\\scripts\\marketing';
const LOGS_DIR = 'C:\\AiCollabForTheKids\\logs';

// Ensure logs directory exists
if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
}

const logFile = path.join(LOGS_DIR, 'marketing-runner-t5500.log');

function log(message) {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] [T5500] ${message}\n`;
    fs.appendFileSync(logFile, entry);
    console.log(entry.trim());
}

function runPowerShellScript(scriptPath) {
    return new Promise((resolve, reject) => {
        log(`Executing: ${scriptPath}`);

        const ps = spawn('powershell.exe', [
            '-ExecutionPolicy', 'Bypass',
            '-File', scriptPath
        ], {
            cwd: SCRIPTS_DIR
        });

        let output = '';
        let errorOutput = '';

        ps.stdout.on('data', (data) => {
            output += data.toString();
        });

        ps.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });

        ps.on('close', (code) => {
            if (code === 0) {
                log(`SUCCESS: ${path.basename(scriptPath)}`);
                resolve(output);
            } else {
                log(`FAILED: ${path.basename(scriptPath)} - Code ${code}`);
                log(`Error: ${errorOutput}`);
                resolve(null);
            }
        });

        ps.on('error', (err) => {
            log(`ERROR: ${err.message}`);
            resolve(null);
        });
    });
}

// T5500 Marketing Tasks - DIFFERENT from Sabertooth
// Sabertooth: Twitter AI Store, Discord, Urgency, Founder Story
// T5500: LinkedIn, Reddit, Email, AI Story, Blockchain tweets
const MARKETING_TASKS = [
    {
        name: 'LinkedIn Post',
        script: path.join(SCRIPTS_DIR, 'linkedin-post.ps1'),
        intervalMinutes: 360 // 6 hours
    },
    {
        name: 'Reddit Post',
        script: path.join(SCRIPTS_DIR, 'reddit-post.ps1'),
        intervalMinutes: 480 // 8 hours
    },
    {
        name: 'Email Blast',
        script: path.join(SCRIPTS_DIR, 'email-blast.ps1'),
        intervalMinutes: 1440 // 24 hours
    },
    {
        name: 'Twitter AI Story',
        script: path.join(SCRIPTS_DIR, '..', 'ai-story-tweet.ps1'),
        intervalMinutes: 600 // 10 hours
    },
    {
        name: 'Twitter Blockchain',
        script: path.join(SCRIPTS_DIR, '..', 'blockchain-tweet.ps1'),
        intervalMinutes: 720 // 12 hours
    },
    {
        name: 'Twitter Gospel',
        script: path.join(SCRIPTS_DIR, '..', 'gospel-tweet.ps1'),
        intervalMinutes: 540 // 9 hours
    }
];

// Track last run times
const lastRuns = {};

async function runScheduledTasks() {
    const now = Date.now();

    for (const task of MARKETING_TASKS) {
        const lastRun = lastRuns[task.name] || 0;
        const intervalMs = task.intervalMinutes * 60 * 1000;

        if (now - lastRun >= intervalMs) {
            if (fs.existsSync(task.script)) {
                await runPowerShellScript(task.script);
                lastRuns[task.name] = now;
            } else {
                log(`Script not found: ${task.script}`);
            }
            // Small delay between tasks
            await new Promise(r => setTimeout(r, 30000));
        }
    }
}

async function main() {
    log('═══════════════════════════════════════════════════════════════');
    log('24/7 MARKETING ENGINE - T5500 NODE');
    log(`Computer: ${process.env.COMPUTERNAME || 'T5500'}`);
    log('Tasks: LinkedIn, Reddit, Email, AI Story, Blockchain, Gospel');
    log('FOR THE KIDS - 60/30/10');
    log('═══════════════════════════════════════════════════════════════');

    // Run immediately on startup
    await runScheduledTasks();

    // Then check every 5 minutes
    setInterval(async () => {
        log('Checking scheduled marketing tasks...');
        await runScheduledTasks();
    }, 5 * 60 * 1000);
}

main().catch(err => {
    log(`Fatal error: ${err.message}`);
    process.exit(1);
});
