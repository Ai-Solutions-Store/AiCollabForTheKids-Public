// C:\AiCollabForTheKids\scripts\hive\queen-bee.js
// OPUS HIVE - QUEEN BEE v1.0.0
// The Cluster Manager for Operation Hydra
// FOR THE KIDS. ALWAYS.

const cluster = require('cluster');
const os = require('os');
const fs = require('fs');
const path = require('path');

// Configuration
const ESTIMATED_WORKER_RAM_MB = 512;  // Each worker uses ~512MB
const RAM_TARGET_PERCENT = 0.80;      // Fill 80% of RAM
const MIN_WORKERS = 2;
const MAX_WORKERS = 50;
const STATUS_INTERVAL_MS = 60000;     // Log status every 60 seconds
const JOBS_FILE = path.join(__dirname, 'jobs.json');
const LOG_FILE = path.join(__dirname, '../../logs/hive-queen.log');

// Ensure logs directory exists
const logsDir = path.dirname(LOG_FILE);
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

// State
let jobsCompleted = 0;
let startTime = Date.now();
let workerJobs = new Map(); // Track which worker has which job

function log(message) {
    const timestamp = new Date().toISOString();
    const logLine = `[${timestamp}] ${message}`;
    console.log(logLine);
    try {
        fs.appendFileSync(LOG_FILE, logLine + '\n');
    } catch (err) {
        // Ignore log write errors
    }
}

function calculateOptimalWorkers() {
    const totalRAM_MB = os.totalmem() / 1024 / 1024;
    const targetRAM_MB = totalRAM_MB * RAM_TARGET_PERCENT;
    const optimalWorkers = Math.floor(targetRAM_MB / ESTIMATED_WORKER_RAM_MB);
    return Math.max(MIN_WORKERS, Math.min(MAX_WORKERS, optimalWorkers));
}

function loadJobs() {
    try {
        if (fs.existsSync(JOBS_FILE)) {
            const data = fs.readFileSync(JOBS_FILE, 'utf8');
            return JSON.parse(data);
        }
    } catch (err) {
        log(`Error loading jobs: ${err.message}`);
    }
    return { queue: [], completed: [], failed: [] };
}

function saveJobs(jobs) {
    try {
        fs.writeFileSync(JOBS_FILE, JSON.stringify(jobs, null, 2));
    } catch (err) {
        log(`Error saving jobs: ${err.message}`);
    }
}

function getNextJob(jobs) {
    const pendingIndex = jobs.queue.findIndex(j => j.status === 'pending');
    if (pendingIndex !== -1) {
        jobs.queue[pendingIndex].status = 'processing';
        jobs.queue[pendingIndex].startedAt = new Date().toISOString();
        return jobs.queue[pendingIndex];
    }
    return null;
}

function formatUptime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
}

function printStatus() {
    const totalRAM = os.totalmem();
    const freeRAM = os.freemem();
    const usedRAM = totalRAM - freeRAM;
    const targetRAM = totalRAM * RAM_TARGET_PERCENT;

    const workers = Object.keys(cluster.workers || {}).length;
    const busyWorkers = workerJobs.size;
    const idleWorkers = workers - busyWorkers;

    const jobs = loadJobs();
    const pending = jobs.queue.filter(j => j.status === 'pending').length;
    const uptime = Date.now() - startTime;
    const jobsPerMinute = jobsCompleted / (uptime / 60000) || 0;

    const status = `
============================================================
                    HIVE STATUS REPORT
============================================================
  Timestamp:        ${new Date().toISOString()}
  Uptime:           ${formatUptime(uptime)}
------------------------------------------------------------
  Active Agents:    ${workers}/${calculateOptimalWorkers()}
  Busy Workers:     ${busyWorkers}
  Idle Workers:     ${idleWorkers}
------------------------------------------------------------
  RAM Usage:        ${(usedRAM / 1024 / 1024).toFixed(0)} MB / ${(totalRAM / 1024 / 1024).toFixed(0)} MB (${((usedRAM / totalRAM) * 100).toFixed(1)}%)
  RAM Target:       ${(targetRAM / 1024 / 1024).toFixed(0)} MB (${(RAM_TARGET_PERCENT * 100)}%)
------------------------------------------------------------
  Jobs Completed:   ${jobsCompleted}
  Jobs Pending:     ${pending}
  Jobs/Minute:      ${jobsPerMinute.toFixed(2)}
============================================================
`;
    log(status);
}

function dispatchJob(worker) {
    const jobs = loadJobs();
    const job = getNextJob(jobs);

    if (job) {
        workerJobs.set(worker.id, job);
        worker.send({ type: 'job', job: job });
        saveJobs(jobs);
        log(`Dispatched job ${job.id} (${job.type}) to worker ${worker.id}`);
    }
}

if (cluster.isMaster || cluster.isPrimary) {
    // MASTER PROCESS
    const targetWorkers = calculateOptimalWorkers();

    log(`============================================================`);
    log(`       OPUS HIVE - QUEEN BEE ONLINE`);
    log(`       Gospel Aligned v1.0.0`);
    log(`============================================================`);
    log(`System RAM: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(1)} GB`);
    log(`CPU Cores: ${os.cpus().length}`);
    log(`Target Workers: ${targetWorkers}`);
    log(`============================================================`);

    // Spawn initial workers
    for (let i = 0; i < targetWorkers; i++) {
        cluster.fork();
    }

    // Handle worker messages
    cluster.on('message', (worker, message) => {
        if (message.type === 'job_complete') {
            const jobs = loadJobs();
            const jobIndex = jobs.queue.findIndex(j => j.id === message.jobId);
            if (jobIndex !== -1) {
                const completedJob = jobs.queue.splice(jobIndex, 1)[0];
                completedJob.status = 'completed';
                completedJob.completedAt = new Date().toISOString();
                completedJob.result = message.result;
                jobs.completed.push(completedJob);
                saveJobs(jobs);
            }
            workerJobs.delete(worker.id);
            jobsCompleted++;
            log(`Worker ${worker.id} completed job ${message.jobId}`);

            // Dispatch next job
            dispatchJob(worker);
        } else if (message.type === 'job_failed') {
            const jobs = loadJobs();
            const jobIndex = jobs.queue.findIndex(j => j.id === message.jobId);
            if (jobIndex !== -1) {
                const failedJob = jobs.queue.splice(jobIndex, 1)[0];
                failedJob.status = 'failed';
                failedJob.error = message.error;
                failedJob.failedAt = new Date().toISOString();
                jobs.failed.push(failedJob);
                saveJobs(jobs);
            }
            workerJobs.delete(worker.id);
            log(`Worker ${worker.id} FAILED job ${message.jobId}: ${message.error}`);

            // Dispatch next job
            dispatchJob(worker);
        } else if (message.type === 'ready') {
            log(`Worker ${worker.id} is ready`);
            dispatchJob(worker);
        }
    });

    // Self-healing: respawn dead workers
    cluster.on('exit', (worker, code, signal) => {
        log(`Worker ${worker.id} died (code: ${code}, signal: ${signal}). Respawning...`);

        // Re-queue any job the worker was processing
        const job = workerJobs.get(worker.id);
        if (job) {
            const jobs = loadJobs();
            const jobIndex = jobs.queue.findIndex(j => j.id === job.id);
            if (jobIndex !== -1) {
                jobs.queue[jobIndex].status = 'pending';
                delete jobs.queue[jobIndex].startedAt;
                saveJobs(jobs);
                log(`Re-queued job ${job.id}`);
            }
            workerJobs.delete(worker.id);
        }

        // Respawn after short delay
        setTimeout(() => {
            cluster.fork();
        }, 100);
    });

    // Status reporting
    setInterval(printStatus, STATUS_INTERVAL_MS);

    // Initial status
    setTimeout(printStatus, 5000);

} else {
    // WORKER PROCESS
    const workerId = cluster.worker.id;

    // Load agent modules dynamically based on job type
    const agentPaths = {
        scout: path.join(__dirname, 'agents', 'scout.cjs'),
        writer: path.join(__dirname, 'agents', 'writer.cjs'),
        artist: path.join(__dirname, 'agents', 'artist.cjs'),
        'image-gen': path.join(__dirname, 'agents', 'image-gen.cjs')
    };

    process.on('message', async (message) => {
        if (message.type === 'job') {
            const job = message.job;

            try {
                const agentPath = agentPaths[job.type];
                if (!agentPath || !fs.existsSync(agentPath)) {
                    throw new Error(`Unknown job type or missing agent: ${job.type}`);
                }

                const agent = require(agentPath);
                const result = await agent.execute(job);

                process.send({
                    type: 'job_complete',
                    jobId: job.id,
                    result: result
                });
            } catch (err) {
                process.send({
                    type: 'job_failed',
                    jobId: job.id,
                    error: err.message
                });
            }
        }
    });

    // Signal ready
    process.send({ type: 'ready' });
}
