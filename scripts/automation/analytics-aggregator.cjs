/**
 * Analytics Aggregator
 * FOR THE KIDS - 60% to Verified Pediatric Charities
 *
 * Collects and aggregates:
 * 1) Marketing post metrics
 * 2) Website traffic estimates
 * 3) Conversion tracking
 * 4) Platform-specific stats
 *
 * Generates daily reports and saves to logs.
 *
 * Run with PM2: pm2 start analytics-aggregator.cjs --name analytics-aggregator
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Configuration
const CONFIG = {
    logsDir: 'C:\\AiCollabForTheKids\\logs',
    reportsDir: 'C:\\AiCollabForTheKids\\logs\\analytics-reports',
    stateFile: 'C:\\AiCollabForTheKids\\logs\\analytics-state.json',
    apiBaseUrl: 'https://api.aidoesitall.website',
    storeUrl: 'https://ai-solutions.store',
    checkIntervalMinutes: 60, // Check every hour
    reportHour: 23, // Generate daily report at 11 PM EST
    timezone: 'America/New_York'
};

// Ensure directories exist
[CONFIG.logsDir, CONFIG.reportsDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

const logFile = path.join(CONFIG.logsDir, 'analytics-aggregator.log');

/**
 * Logging utility
 */
function log(message, level = 'INFO') {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] [${level}] ${message}\n`;
    fs.appendFileSync(logFile, entry);
    console.log(entry.trim());
}

/**
 * Get current time in EST
 */
function getESTDate() {
    return new Date(new Date().toLocaleString('en-US', { timeZone: CONFIG.timezone }));
}

/**
 * Format date for filenames
 */
function formatDate(date) {
    return date.toISOString().split('T')[0];
}

/**
 * Load state from file
 */
function loadState() {
    try {
        if (fs.existsSync(CONFIG.stateFile)) {
            return JSON.parse(fs.readFileSync(CONFIG.stateFile, 'utf8'));
        }
    } catch (e) {
        log(`Error loading state: ${e.message}`, 'WARN');
    }
    return {
        lastReportDate: null,
        dailyMetrics: {},
        weeklyTotals: {},
        platformStats: {}
    };
}

/**
 * Save state to file
 */
function saveState(state) {
    try {
        fs.writeFileSync(CONFIG.stateFile, JSON.stringify(state, null, 2));
    } catch (e) {
        log(`Error saving state: ${e.message}`, 'ERROR');
    }
}

/**
 * Parse marketing log files for metrics
 */
function parseMarketingLogs() {
    const metrics = {
        twitter: { success: 0, failed: 0, total: 0, tweetIds: [] },
        reddit: { success: 0, failed: 0, total: 0 },
        devto: { success: 0, failed: 0, total: 0 },
        telegram: { success: 0, failed: 0, total: 0 },
        pinterest: { success: 0, failed: 0, total: 0 },
        hackernews: { success: 0, failed: 0, total: 0 },
        producthunt: { success: 0, failed: 0, total: 0 },
        hashnode: { success: 0, failed: 0, total: 0 },
        mastodon: { success: 0, failed: 0, total: 0 },
        indiehackers: { success: 0, failed: 0, total: 0 },
        quora: { success: 0, failed: 0, total: 0 },
        github: { success: 0, failed: 0, total: 0 },
        discord: { success: 0, failed: 0, total: 0 },
        threads: { success: 0, failed: 0, total: 0 },
        substack: { success: 0, failed: 0, total: 0 },
        facebook: { success: 0, failed: 0, total: 0 },
        youtube: { success: 0, failed: 0, total: 0 },
        tiktok: { success: 0, failed: 0, total: 0 }
    };

    const today = formatDate(new Date());
    const logFiles = {
        twitter: 'twitter-marketing.log',
        reddit: 'reddit-marketing.log',
        devto: 'devto-marketing.log',
        telegram: 'telegram-marketing.log',
        pinterest: 'pinterest-marketing.log',
        hackernews: 'hackernews-marketing.log',
        producthunt: 'producthunt-marketing.log',
        hashnode: 'hashnode-marketing.log',
        indiehackers: 'indiehackers-marketing.log',
        quora: 'quora-marketing.log',
        github: 'github-content-marketing.log',
        threads: 'threads-marketing.log',
        substack: 'substack-marketing.log',
        facebook: 'facebook-groups.log',
        youtube: 'youtube-community.log',
        tiktok: 'youandinotai-tiktok.log'
    };

    for (const [platform, logFileName] of Object.entries(logFiles)) {
        const logPath = path.join(CONFIG.logsDir, logFileName);
        if (fs.existsSync(logPath)) {
            try {
                const content = fs.readFileSync(logPath, 'utf8');
                const lines = content.split('\n').filter(line => line.includes(today));

                for (const line of lines) {
                    const lowerLine = line.toLowerCase();
                    if (lowerLine.includes('success')) {
                        metrics[platform].success++;
                        metrics[platform].total++;

                        // Extract tweet IDs for Twitter
                        if (platform === 'twitter') {
                            const tweetIdMatch = line.match(/Tweet ID: (\d+)/);
                            if (tweetIdMatch) {
                                metrics[platform].tweetIds.push(tweetIdMatch[1]);
                            }
                        }
                    } else if (lowerLine.includes('failed') || lowerLine.includes('error')) {
                        metrics[platform].failed++;
                        metrics[platform].total++;
                    }
                }
            } catch (e) {
                log(`Error parsing ${logFileName}: ${e.message}`, 'WARN');
            }
        }
    }

    return metrics;
}

/**
 * Parse marketing runner log for overall stats
 */
function parseMarketingRunnerLog() {
    const runnerLog = path.join(CONFIG.logsDir, 'marketing-runner.log');
    const stats = {
        tasksRun: 0,
        tasksSuccess: 0,
        tasksFailed: 0,
        tasksSkipped: 0,
        platforms: new Set()
    };

    const today = formatDate(new Date());

    if (fs.existsSync(runnerLog)) {
        try {
            const content = fs.readFileSync(runnerLog, 'utf8');
            const lines = content.split('\n').filter(line => line.includes(today));

            for (const line of lines) {
                if (line.includes('Executing:')) {
                    stats.tasksRun++;
                    const platformMatch = line.match(/Executing: .+\\([^\\]+)\.(cjs|ps1)/);
                    if (platformMatch) {
                        stats.platforms.add(platformMatch[1]);
                    }
                }
                if (line.includes('SUCCESS:')) stats.tasksSuccess++;
                if (line.includes('FAILED:')) stats.tasksFailed++;
                if (line.includes('SKIP')) stats.tasksSkipped++;
            }
        } catch (e) {
            log(`Error parsing marketing-runner.log: ${e.message}`, 'WARN');
        }
    }

    stats.platforms = Array.from(stats.platforms);
    return stats;
}

/**
 * Estimate website traffic based on marketing activity
 */
function estimateWebsiteTraffic(marketingMetrics, runnerStats) {
    // Traffic estimation model based on typical conversion rates
    const conversionRates = {
        twitter: 0.02,      // 2% CTR
        reddit: 0.03,       // 3% CTR (more engaged)
        devto: 0.05,        // 5% CTR (developer audience)
        telegram: 0.10,     // 10% CTR (direct channel)
        pinterest: 0.02,    // 2% CTR
        hackernews: 0.08,   // 8% CTR (tech audience)
        producthunt: 0.15,  // 15% CTR (product discovery)
        hashnode: 0.05,     // 5% CTR
        mastodon: 0.04,     // 4% CTR
        indiehackers: 0.10, // 10% CTR (entrepreneur audience)
        quora: 0.03,        // 3% CTR
        github: 0.05,       // 5% CTR
        discord: 0.12,      // 12% CTR (community)
        threads: 0.02,      // 2% CTR
        substack: 0.08,     // 8% CTR (subscribers)
        facebook: 0.02,     // 2% CTR
        youtube: 0.03,      // 3% CTR
        tiktok: 0.01        // 1% CTR
    };

    // Estimated impressions per successful post
    const impressionEstimates = {
        twitter: 500,
        reddit: 1000,
        devto: 300,
        telegram: 200,
        pinterest: 400,
        hackernews: 2000,
        producthunt: 1500,
        hashnode: 200,
        mastodon: 150,
        indiehackers: 500,
        quora: 800,
        github: 300,
        discord: 100,
        threads: 300,
        substack: 150,
        facebook: 600,
        youtube: 400,
        tiktok: 1000
    };

    let totalImpressions = 0;
    let estimatedClicks = 0;
    const breakdown = {};

    for (const [platform, data] of Object.entries(marketingMetrics)) {
        const impressions = data.success * (impressionEstimates[platform] || 100);
        const clicks = Math.round(impressions * (conversionRates[platform] || 0.02));

        breakdown[platform] = {
            impressions,
            estimatedClicks: clicks,
            successfulPosts: data.success
        };

        totalImpressions += impressions;
        estimatedClicks += clicks;
    }

    return {
        totalImpressions,
        estimatedClicks,
        estimatedConversionRate: totalImpressions > 0 ?
            ((estimatedClicks / totalImpressions) * 100).toFixed(2) + '%' : '0%',
        breakdown
    };
}

/**
 * Track conversions (simulated - would integrate with actual analytics)
 */
function getConversionMetrics(state) {
    // In production, this would fetch from Square, Stripe, or analytics API
    // For now, we track based on marketing activity
    const today = formatDate(new Date());
    const dailyMetrics = state.dailyMetrics[today] || {};

    return {
        date: today,
        pageViews: dailyMetrics.estimatedPageViews || 0,
        signups: dailyMetrics.estimatedSignups || 0,
        purchases: dailyMetrics.purchases || 0,
        revenue: dailyMetrics.revenue || 0,
        conversionFunnel: {
            visitors: dailyMetrics.estimatedPageViews || 0,
            productViews: Math.round((dailyMetrics.estimatedPageViews || 0) * 0.6),
            cartAdds: Math.round((dailyMetrics.estimatedPageViews || 0) * 0.15),
            checkouts: Math.round((dailyMetrics.estimatedPageViews || 0) * 0.05),
            purchases: dailyMetrics.purchases || 0
        }
    };
}

/**
 * Get platform-specific statistics
 */
function getPlatformStats(marketingMetrics) {
    const stats = {};

    for (const [platform, data] of Object.entries(marketingMetrics)) {
        const successRate = data.total > 0 ?
            ((data.success / data.total) * 100).toFixed(1) : '0.0';

        stats[platform] = {
            totalPosts: data.total,
            successful: data.success,
            failed: data.failed,
            successRate: successRate + '%',
            status: data.success > 0 ? 'ACTIVE' :
                    data.failed > 0 ? 'ISSUES' : 'INACTIVE'
        };

        // Add tweet IDs for Twitter
        if (platform === 'twitter' && data.tweetIds.length > 0) {
            stats[platform].recentTweetIds = data.tweetIds.slice(-5);
        }
    }

    return stats;
}

/**
 * Generate daily analytics report
 */
function generateDailyReport(state) {
    const today = formatDate(new Date());
    const marketingMetrics = parseMarketingLogs();
    const runnerStats = parseMarketingRunnerLog();
    const trafficEstimates = estimateWebsiteTraffic(marketingMetrics, runnerStats);
    const conversionMetrics = getConversionMetrics(state);
    const platformStats = getPlatformStats(marketingMetrics);

    // Calculate totals
    let totalSuccess = 0;
    let totalFailed = 0;
    let totalPosts = 0;
    let activePlatforms = 0;

    for (const data of Object.values(marketingMetrics)) {
        totalSuccess += data.success;
        totalFailed += data.failed;
        totalPosts += data.total;
    }

    for (const stat of Object.values(platformStats)) {
        if (stat.status === 'ACTIVE') activePlatforms++;
    }

    const report = {
        reportDate: today,
        generatedAt: new Date().toISOString(),
        mission: 'FOR THE KIDS - 60% to Verified Pediatric Charities',

        summary: {
            totalMarketingPosts: totalPosts,
            successfulPosts: totalSuccess,
            failedPosts: totalFailed,
            overallSuccessRate: totalPosts > 0 ?
                ((totalSuccess / totalPosts) * 100).toFixed(1) + '%' : '0%',
            activePlatforms: activePlatforms,
            totalPlatforms: Object.keys(platformStats).length
        },

        marketingMetrics: {
            runner: runnerStats,
            byPlatform: marketingMetrics
        },

        trafficEstimates: {
            totalImpressions: trafficEstimates.totalImpressions,
            estimatedClicks: trafficEstimates.estimatedClicks,
            estimatedConversionRate: trafficEstimates.estimatedConversionRate,
            breakdown: trafficEstimates.breakdown
        },

        conversionTracking: conversionMetrics,

        platformStats: platformStats,

        recommendations: generateRecommendations(platformStats, marketingMetrics)
    };

    // Save report to file
    const reportFileName = `analytics-report-${today}.json`;
    const reportPath = path.join(CONFIG.reportsDir, reportFileName);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    // Also save a human-readable version
    const readableReport = generateReadableReport(report);
    const readableFileName = `analytics-report-${today}.md`;
    const readablePath = path.join(CONFIG.reportsDir, readableFileName);
    fs.writeFileSync(readablePath, readableReport);

    // Update state
    state.lastReportDate = today;
    state.dailyMetrics[today] = {
        ...report.summary,
        estimatedPageViews: trafficEstimates.estimatedClicks
    };
    saveState(state);

    log(`Daily report generated: ${reportPath}`);
    return report;
}

/**
 * Generate recommendations based on analytics
 */
function generateRecommendations(platformStats, marketingMetrics) {
    const recommendations = [];

    // Check for platforms with issues
    for (const [platform, stats] of Object.entries(platformStats)) {
        if (stats.status === 'ISSUES') {
            recommendations.push({
                priority: 'HIGH',
                platform: platform,
                issue: 'High failure rate detected',
                action: `Review ${platform} credentials and API limits. Success rate: ${stats.successRate}`
            });
        } else if (stats.status === 'INACTIVE') {
            recommendations.push({
                priority: 'MEDIUM',
                platform: platform,
                issue: 'No posts today',
                action: `Check if ${platform} script is running correctly`
            });
        }
    }

    // Check for top performers
    const sortedBySuccess = Object.entries(platformStats)
        .sort((a, b) => b[1].successful - a[1].successful)
        .slice(0, 3);

    if (sortedBySuccess.length > 0 && sortedBySuccess[0][1].successful > 0) {
        recommendations.push({
            priority: 'INFO',
            platform: 'general',
            issue: 'Top performing platforms',
            action: `Focus more on: ${sortedBySuccess.map(([p]) => p).join(', ')}`
        });
    }

    // Suggest increasing activity for high-performing platforms
    for (const [platform, stats] of Object.entries(platformStats)) {
        if (parseFloat(stats.successRate) > 80 && stats.successful >= 2) {
            recommendations.push({
                priority: 'LOW',
                platform: platform,
                issue: 'High success rate',
                action: `Consider increasing posting frequency on ${platform} (current success: ${stats.successRate})`
            });
        }
    }

    return recommendations;
}

/**
 * Generate human-readable markdown report
 */
function generateReadableReport(report) {
    let md = `# Analytics Report - ${report.reportDate}\n\n`;
    md += `**Generated:** ${report.generatedAt}\n`;
    md += `**Mission:** ${report.mission}\n\n`;

    md += `## Summary\n\n`;
    md += `| Metric | Value |\n`;
    md += `|--------|-------|\n`;
    md += `| Total Marketing Posts | ${report.summary.totalMarketingPosts} |\n`;
    md += `| Successful Posts | ${report.summary.successfulPosts} |\n`;
    md += `| Failed Posts | ${report.summary.failedPosts} |\n`;
    md += `| Overall Success Rate | ${report.summary.overallSuccessRate} |\n`;
    md += `| Active Platforms | ${report.summary.activePlatforms}/${report.summary.totalPlatforms} |\n\n`;

    md += `## Traffic Estimates\n\n`;
    md += `- **Total Impressions:** ${report.trafficEstimates.totalImpressions.toLocaleString()}\n`;
    md += `- **Estimated Clicks:** ${report.trafficEstimates.estimatedClicks.toLocaleString()}\n`;
    md += `- **Est. Conversion Rate:** ${report.trafficEstimates.estimatedConversionRate}\n\n`;

    md += `## Platform Performance\n\n`;
    md += `| Platform | Posts | Success | Failed | Rate | Status |\n`;
    md += `|----------|-------|---------|--------|------|--------|\n`;
    for (const [platform, stats] of Object.entries(report.platformStats)) {
        if (stats.totalPosts > 0 || stats.status !== 'INACTIVE') {
            md += `| ${platform} | ${stats.totalPosts} | ${stats.successful} | ${stats.failed} | ${stats.successRate} | ${stats.status} |\n`;
        }
    }
    md += `\n`;

    if (report.recommendations.length > 0) {
        md += `## Recommendations\n\n`;
        for (const rec of report.recommendations) {
            const icon = rec.priority === 'HIGH' ? '[!]' :
                         rec.priority === 'MEDIUM' ? '[*]' :
                         rec.priority === 'INFO' ? '[i]' : '[-]';
            md += `- ${icon} **${rec.platform}**: ${rec.action}\n`;
        }
        md += `\n`;
    }

    md += `## Conversion Funnel\n\n`;
    md += `\`\`\`\n`;
    md += `Visitors      : ${report.conversionTracking.conversionFunnel.visitors}\n`;
    md += `Product Views : ${report.conversionTracking.conversionFunnel.productViews}\n`;
    md += `Cart Adds     : ${report.conversionTracking.conversionFunnel.cartAdds}\n`;
    md += `Checkouts     : ${report.conversionTracking.conversionFunnel.checkouts}\n`;
    md += `Purchases     : ${report.conversionTracking.conversionFunnel.purchases}\n`;
    md += `\`\`\`\n\n`;

    md += `---\n`;
    md += `*FOR THE KIDS - Every sale helps children in need.*\n`;

    return md;
}

/**
 * Aggregate weekly stats
 */
function aggregateWeeklyStats(state) {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - 7);

    const weeklyStats = {
        totalPosts: 0,
        successfulPosts: 0,
        failedPosts: 0,
        totalImpressions: 0,
        totalClicks: 0,
        platformActivity: {}
    };

    for (let d = new Date(weekStart); d <= today; d.setDate(d.getDate() + 1)) {
        const dateStr = formatDate(d);
        const dailyMetrics = state.dailyMetrics[dateStr];

        if (dailyMetrics) {
            weeklyStats.totalPosts += dailyMetrics.totalMarketingPosts || 0;
            weeklyStats.successfulPosts += dailyMetrics.successfulPosts || 0;
            weeklyStats.failedPosts += dailyMetrics.failedPosts || 0;
            weeklyStats.totalClicks += dailyMetrics.estimatedPageViews || 0;
        }
    }

    return weeklyStats;
}

/**
 * Check if it's time to generate daily report
 */
function shouldGenerateReport(state) {
    const now = getESTDate();
    const today = formatDate(now);
    const currentHour = now.getHours();

    // Generate report at configured hour if not already done today
    if (currentHour === CONFIG.reportHour && state.lastReportDate !== today) {
        return true;
    }

    return false;
}

/**
 * Real-time metrics collection
 */
function collectRealTimeMetrics() {
    const metrics = parseMarketingLogs();
    const runnerStats = parseMarketingRunnerLog();
    const trafficEstimates = estimateWebsiteTraffic(metrics, runnerStats);

    // Log current status
    log(`Real-time check - Posts: ${runnerStats.tasksRun}, Success: ${runnerStats.tasksSuccess}, Est. Clicks: ${trafficEstimates.estimatedClicks}`);

    return {
        timestamp: new Date().toISOString(),
        metrics,
        runnerStats,
        trafficEstimates
    };
}

/**
 * Main execution loop
 */
async function main() {
    log('');
    log('===============================================================');
    log('ANALYTICS AGGREGATOR STARTED');
    log('FOR THE KIDS - 60% to Verified Pediatric Charities');
    log('===============================================================');
    log(`Check Interval: Every ${CONFIG.checkIntervalMinutes} minutes`);
    log(`Daily Report Hour: ${CONFIG.reportHour}:00 EST`);
    log(`Reports Directory: ${CONFIG.reportsDir}`);
    log('');

    let state = loadState();

    // Initial collection
    collectRealTimeMetrics();

    // Check if we need to generate a report immediately
    if (shouldGenerateReport(state)) {
        log('Generating daily report...');
        generateDailyReport(state);
    }

    // Schedule regular checks
    setInterval(() => {
        try {
            state = loadState();
            collectRealTimeMetrics();

            if (shouldGenerateReport(state)) {
                log('Generating daily report...');
                generateDailyReport(state);
            }
        } catch (e) {
            log(`Error in check cycle: ${e.message}`, 'ERROR');
        }
    }, CONFIG.checkIntervalMinutes * 60 * 1000);

    log(`Aggregator running. Next check in ${CONFIG.checkIntervalMinutes} minutes.`);
}

// Handle graceful shutdown
process.on('SIGINT', () => {
    log('Analytics aggregator shutting down...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    log('Analytics aggregator received SIGTERM, shutting down...');
    process.exit(0);
});

// Export functions for testing/external use
module.exports = {
    parseMarketingLogs,
    parseMarketingRunnerLog,
    estimateWebsiteTraffic,
    getConversionMetrics,
    getPlatformStats,
    generateDailyReport,
    collectRealTimeMetrics
};

// Run if called directly
if (require.main === module) {
    main().catch(err => {
        log(`Fatal error: ${err.message}`, 'ERROR');
        process.exit(1);
    });
}
