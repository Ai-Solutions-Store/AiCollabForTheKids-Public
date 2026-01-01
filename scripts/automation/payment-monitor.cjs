/**
 * ===============================================================================
 * PAYMENT WEBHOOK MONITORING DASHBOARD
 * ===============================================================================
 *
 * FOR THE KIDS - Track Every Dollar for Transparency
 *
 * Monitors:
 * 1. Incoming Square payments (all locations)
 * 2. Affiliate commissions (tiered: Bronze 15%, Silver 20%, Gold 25%, Platinum 30%)
 * 3. Revenue split (60/30/10 - Charity/Infrastructure/Founder)
 * 4. Daily/Weekly/Monthly totals
 *
 * Gospel V1.3 Ethics Override - NET PROFIT SPLIT (COGS deducted first)
 *
 * Created by Claude (Opus 4.5) - December 28, 2025
 * ===============================================================================
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const crypto = require('crypto');

// ═══════════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

const CONFIG = {
    // File paths
    LOG_DIR: path.join(__dirname, '../../output/payment-monitor'),
    TRANSACTION_LOG: 'transactions.json',
    DAILY_SUMMARY: 'daily-summary.json',
    WEEKLY_SUMMARY: 'weekly-summary.json',
    MONTHLY_SUMMARY: 'monthly-summary.json',
    HUMAN_LOG: 'payment-monitor.log',

    // API endpoints (for future dashboard integration)
    API_BASE: process.env.API_BASE_URL || 'https://api.aidoesitall.website',

    // Gospel split percentages - IMMUTABLE
    GOSPEL_SPLIT: Object.freeze({
        CHARITY_PERCENTAGE: 60,
        INFRASTRUCTURE_PERCENTAGE: 30,
        FOUNDER_PERCENTAGE: 10,
        CHARITY_NAME: "Verified Pediatric Charities",
        VERSION: "1.3.1",
        NET_PROFIT_MODE: true
    }),

    // Affiliate commission tiers
    AFFILIATE_TIERS: Object.freeze({
        BRONZE: { rate: 0.15, name: 'Bronze', minFollowers: 1000 },
        SILVER: { rate: 0.20, name: 'Silver', minFollowers: 10000 },
        GOLD: { rate: 0.25, name: 'Gold', minFollowers: 50000 },
        PLATINUM: { rate: 0.30, name: 'Platinum', minFollowers: 100000 }
    }),

    // Payment processor fees
    PAYMENT_FEES: Object.freeze({
        SQUARE_PERCENTAGE: 2.6,
        SQUARE_FIXED: 0.10
    }),

    // Monitor settings
    CHECK_INTERVAL_MS: 60 * 1000,  // Check every minute
    DASHBOARD_PORT: process.env.MONITOR_PORT || 3847
};

// ═══════════════════════════════════════════════════════════════════════════════
// STATE MANAGEMENT
// ═══════════════════════════════════════════════════════════════════════════════

let state = {
    transactions: [],
    affiliateCommissions: [],
    dailyTotals: {},
    weeklyTotals: {},
    monthlyTotals: {},
    lastUpdate: null,
    startTime: new Date().toISOString()
};

// ═══════════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

function ensureDirectories() {
    if (!fs.existsSync(CONFIG.LOG_DIR)) {
        fs.mkdirSync(CONFIG.LOG_DIR, { recursive: true });
    }
}

function formatTimestamp(date = new Date()) {
    return date.toISOString();
}

function formatCurrency(amount) {
    return `$${parseFloat(amount).toFixed(2)}`;
}

function getDateKey(date = new Date()) {
    return date.toISOString().split('T')[0];
}

function getWeekKey(date = new Date()) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - d.getDay()); // Start of week (Sunday)
    return d.toISOString().split('T')[0];
}

function getMonthKey(date = new Date()) {
    return date.toISOString().slice(0, 7); // YYYY-MM
}

function generateTransactionId() {
    return `TXN_${Date.now()}_${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
}

function calculateHash(data) {
    return crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
}

// ═══════════════════════════════════════════════════════════════════════════════
// LOGGING
// ═══════════════════════════════════════════════════════════════════════════════

function log(message, level = 'INFO') {
    const timestamp = formatTimestamp();
    const logLine = `[${timestamp}] [${level}] ${message}`;
    console.log(logLine);

    try {
        const logPath = path.join(CONFIG.LOG_DIR, CONFIG.HUMAN_LOG);
        fs.appendFileSync(logPath, logLine + '\n');
    } catch (e) {
        console.error('Failed to write log:', e.message);
    }
}

function logTransaction(txn) {
    const line = [
        `[${txn.timestamp}]`,
        `ID:${txn.id}`,
        `SOURCE:${txn.source}`,
        `GROSS:${formatCurrency(txn.grossAmount)}`,
        `NET:${formatCurrency(txn.netProfit)}`,
        `CHARITY:${formatCurrency(txn.split.charity)}`,
        `INFRA:${formatCurrency(txn.split.infrastructure)}`,
        `FOUNDER:${formatCurrency(txn.split.founder)}`,
        txn.affiliateCode ? `AFFILIATE:${txn.affiliateCode}` : ''
    ].filter(Boolean).join(' | ');

    log(line, 'TRANSACTION');
}

// ═══════════════════════════════════════════════════════════════════════════════
// NET PROFIT CALCULATION (Gospel V1.3)
// ═══════════════════════════════════════════════════════════════════════════════

function calculateNetProfit(grossSale, cogs = 0, shipping = 0) {
    const gross = parseFloat(grossSale);
    const productionCost = parseFloat(cogs) || 0;
    const shippingCost = parseFloat(shipping) || 0;

    // Square processing fee
    const processingFee = (gross * CONFIG.PAYMENT_FEES.SQUARE_PERCENTAGE / 100) +
        CONFIG.PAYMENT_FEES.SQUARE_FIXED;

    // Total costs
    const totalCosts = productionCost + shippingCost + processingFee;

    // Net profit (what's left to split)
    const netProfit = Math.max(0, gross - totalCosts);

    return {
        grossSale: Math.round(gross * 100) / 100,
        costs: {
            production: Math.round(productionCost * 100) / 100,
            shipping: Math.round(shippingCost * 100) / 100,
            processing: Math.round(processingFee * 100) / 100,
            total: Math.round(totalCosts * 100) / 100
        },
        netProfit: Math.round(netProfit * 100) / 100,
        margin: gross > 0 ? Math.round((netProfit / gross) * 100) : 0
    };
}

function calculateGospelSplit(netProfit) {
    const charity = Math.round(netProfit * (CONFIG.GOSPEL_SPLIT.CHARITY_PERCENTAGE / 100) * 100) / 100;
    const infrastructure = Math.round(netProfit * (CONFIG.GOSPEL_SPLIT.INFRASTRUCTURE_PERCENTAGE / 100) * 100) / 100;
    const founder = Math.round(netProfit * (CONFIG.GOSPEL_SPLIT.FOUNDER_PERCENTAGE / 100) * 100) / 100;

    // Remainder goes to charity
    const allocated = charity + infrastructure + founder;
    const remainder = Math.round((netProfit - allocated) * 100) / 100;

    return {
        charity: charity + remainder,
        infrastructure: infrastructure,
        founder: founder,
        total: netProfit
    };
}

// ═══════════════════════════════════════════════════════════════════════════════
// AFFILIATE COMMISSION CALCULATION
// ═══════════════════════════════════════════════════════════════════════════════

function getAffiliateTier(affiliateData) {
    if (!affiliateData) return null;
    const tier = affiliateData.tier || 'BRONZE';
    return CONFIG.AFFILIATE_TIERS[tier] || CONFIG.AFFILIATE_TIERS.BRONZE;
}

function calculateAffiliateCommission(saleAmount, affiliateData) {
    const tier = getAffiliateTier(affiliateData);
    if (!tier) return null;

    const commission = Math.round(saleAmount * tier.rate * 100) / 100;

    return {
        affiliateId: affiliateData.id,
        affiliateCode: affiliateData.code,
        tier: tier.name,
        rate: tier.rate,
        saleAmount: saleAmount,
        commission: commission
    };
}

// ═══════════════════════════════════════════════════════════════════════════════
// TRANSACTION PROCESSING
// ═══════════════════════════════════════════════════════════════════════════════

function processPayment(paymentData) {
    const id = generateTransactionId();
    const timestamp = formatTimestamp();

    // Extract data from payment
    const grossAmount = parseFloat(paymentData.amount || paymentData.grossAmount || 0);
    const cogs = parseFloat(paymentData.cogs || paymentData.productionCost || 0);
    const shipping = parseFloat(paymentData.shipping || paymentData.shippingCost || 0);
    const source = paymentData.source || 'UNKNOWN';

    // Calculate net profit
    const profitBreakdown = calculateNetProfit(grossAmount, cogs, shipping);

    // Calculate Gospel split on NET profit
    const split = calculateGospelSplit(profitBreakdown.netProfit);

    // Calculate affiliate commission if applicable
    let affiliateData = null;
    if (paymentData.affiliate) {
        affiliateData = calculateAffiliateCommission(grossAmount, paymentData.affiliate);
    }

    // Get previous transaction hash for chain
    const previousHash = state.transactions.length > 0 ?
        state.transactions[state.transactions.length - 1].hash : 'GENESIS';

    // Create transaction record
    const transaction = {
        id: id,
        timestamp: timestamp,
        source: source,
        sourceDetails: {
            paymentId: paymentData.paymentId || paymentData.squarePaymentId,
            orderId: paymentData.orderId,
            locationId: paymentData.locationId,
            receiptUrl: paymentData.receiptUrl
        },
        grossAmount: profitBreakdown.grossSale,
        costs: profitBreakdown.costs,
        netProfit: profitBreakdown.netProfit,
        margin: profitBreakdown.margin,
        split: split,
        affiliate: affiliateData,
        mission: 'FOR THE KIDS',
        gospelVersion: CONFIG.GOSPEL_SPLIT.VERSION,
        previousHash: previousHash
    };

    // Calculate transaction hash for immutable ledger
    transaction.hash = calculateHash({
        id: transaction.id,
        timestamp: transaction.timestamp,
        grossAmount: transaction.grossAmount,
        netProfit: transaction.netProfit,
        split: transaction.split,
        previousHash: transaction.previousHash
    });

    // Add to state
    state.transactions.push(transaction);
    state.lastUpdate = timestamp;

    // Update summaries
    updateSummaries(transaction);

    // Log transaction
    logTransaction(transaction);

    // Persist state
    saveState();

    return transaction;
}

function processAffiliateCommission(commissionData) {
    const id = `COMM_${Date.now()}_${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
    const timestamp = formatTimestamp();

    const commission = {
        id: id,
        timestamp: timestamp,
        affiliateId: commissionData.affiliateId,
        affiliateCode: commissionData.affiliateCode,
        referralId: commissionData.referralId,
        tier: commissionData.tier,
        rate: commissionData.rate,
        saleAmount: commissionData.saleAmount,
        commissionAmount: commissionData.commissionAmount,
        status: commissionData.status || 'PENDING',
        paidAt: commissionData.paidAt || null
    };

    state.affiliateCommissions.push(commission);
    state.lastUpdate = timestamp;

    log(`AFFILIATE COMMISSION: ${commission.affiliateCode} earned ${formatCurrency(commission.commissionAmount)} (${commission.tier} tier)`, 'COMMISSION');

    saveState();

    return commission;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SUMMARY UPDATES
// ═══════════════════════════════════════════════════════════════════════════════

function updateSummaries(transaction) {
    const dateKey = getDateKey(new Date(transaction.timestamp));
    const weekKey = getWeekKey(new Date(transaction.timestamp));
    const monthKey = getMonthKey(new Date(transaction.timestamp));

    // Initialize if needed
    if (!state.dailyTotals[dateKey]) {
        state.dailyTotals[dateKey] = createEmptySummary(dateKey, 'daily');
    }
    if (!state.weeklyTotals[weekKey]) {
        state.weeklyTotals[weekKey] = createEmptySummary(weekKey, 'weekly');
    }
    if (!state.monthlyTotals[monthKey]) {
        state.monthlyTotals[monthKey] = createEmptySummary(monthKey, 'monthly');
    }

    // Update all summaries
    [
        state.dailyTotals[dateKey],
        state.weeklyTotals[weekKey],
        state.monthlyTotals[monthKey]
    ].forEach(summary => {
        summary.transactionCount++;
        summary.grossRevenue = Math.round((summary.grossRevenue + transaction.grossAmount) * 100) / 100;
        summary.totalCosts = Math.round((summary.totalCosts + transaction.costs.total) * 100) / 100;
        summary.netProfit = Math.round((summary.netProfit + transaction.netProfit) * 100) / 100;
        summary.charityTotal = Math.round((summary.charityTotal + transaction.split.charity) * 100) / 100;
        summary.infrastructureTotal = Math.round((summary.infrastructureTotal + transaction.split.infrastructure) * 100) / 100;
        summary.founderTotal = Math.round((summary.founderTotal + transaction.split.founder) * 100) / 100;
        summary.lastUpdate = transaction.timestamp;

        // Track by source
        if (!summary.bySource[transaction.source]) {
            summary.bySource[transaction.source] = {
                count: 0,
                gross: 0,
                net: 0
            };
        }
        summary.bySource[transaction.source].count++;
        summary.bySource[transaction.source].gross =
            Math.round((summary.bySource[transaction.source].gross + transaction.grossAmount) * 100) / 100;
        summary.bySource[transaction.source].net =
            Math.round((summary.bySource[transaction.source].net + transaction.netProfit) * 100) / 100;

        // Track affiliate commissions if present
        if (transaction.affiliate) {
            summary.affiliateCommissions = Math.round(
                (summary.affiliateCommissions + transaction.affiliate.commission) * 100
            ) / 100;
        }
    });
}

function createEmptySummary(key, period) {
    return {
        period: period,
        key: key,
        transactionCount: 0,
        grossRevenue: 0,
        totalCosts: 0,
        netProfit: 0,
        charityTotal: 0,
        infrastructureTotal: 0,
        founderTotal: 0,
        affiliateCommissions: 0,
        bySource: {},
        lastUpdate: null,
        mission: 'FOR THE KIDS'
    };
}

// ═══════════════════════════════════════════════════════════════════════════════
// STATE PERSISTENCE
// ═══════════════════════════════════════════════════════════════════════════════

function saveState() {
    try {
        // Save transactions
        const txnPath = path.join(CONFIG.LOG_DIR, CONFIG.TRANSACTION_LOG);
        fs.writeFileSync(txnPath, JSON.stringify(state.transactions, null, 2));

        // Save daily summary
        const dailyPath = path.join(CONFIG.LOG_DIR, CONFIG.DAILY_SUMMARY);
        fs.writeFileSync(dailyPath, JSON.stringify(state.dailyTotals, null, 2));

        // Save weekly summary
        const weeklyPath = path.join(CONFIG.LOG_DIR, CONFIG.WEEKLY_SUMMARY);
        fs.writeFileSync(weeklyPath, JSON.stringify(state.weeklyTotals, null, 2));

        // Save monthly summary
        const monthlyPath = path.join(CONFIG.LOG_DIR, CONFIG.MONTHLY_SUMMARY);
        fs.writeFileSync(monthlyPath, JSON.stringify(state.monthlyTotals, null, 2));

    } catch (e) {
        log(`Failed to save state: ${e.message}`, 'ERROR');
    }
}

function loadState() {
    try {
        const txnPath = path.join(CONFIG.LOG_DIR, CONFIG.TRANSACTION_LOG);
        if (fs.existsSync(txnPath)) {
            state.transactions = JSON.parse(fs.readFileSync(txnPath, 'utf8'));
        }

        const dailyPath = path.join(CONFIG.LOG_DIR, CONFIG.DAILY_SUMMARY);
        if (fs.existsSync(dailyPath)) {
            state.dailyTotals = JSON.parse(fs.readFileSync(dailyPath, 'utf8'));
        }

        const weeklyPath = path.join(CONFIG.LOG_DIR, CONFIG.WEEKLY_SUMMARY);
        if (fs.existsSync(weeklyPath)) {
            state.weeklyTotals = JSON.parse(fs.readFileSync(weeklyPath, 'utf8'));
        }

        const monthlyPath = path.join(CONFIG.LOG_DIR, CONFIG.MONTHLY_SUMMARY);
        if (fs.existsSync(monthlyPath)) {
            state.monthlyTotals = JSON.parse(fs.readFileSync(monthlyPath, 'utf8'));
        }

        log(`State loaded: ${state.transactions.length} transactions`, 'INFO');

    } catch (e) {
        log(`Failed to load state: ${e.message}`, 'WARN');
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD SERVER
// ═══════════════════════════════════════════════════════════════════════════════

function generateDashboardHTML() {
    const today = getDateKey();
    const thisWeek = getWeekKey();
    const thisMonth = getMonthKey();

    const dailySummary = state.dailyTotals[today] || createEmptySummary(today, 'daily');
    const weeklySummary = state.weeklyTotals[thisWeek] || createEmptySummary(thisWeek, 'weekly');
    const monthlySummary = state.monthlyTotals[thisMonth] || createEmptySummary(thisMonth, 'monthly');

    const recentTransactions = state.transactions.slice(-10).reverse();

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="refresh" content="30">
    <title>Payment Monitor - FOR THE KIDS</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            color: #e4e4e7;
            min-height: 100vh;
            padding: 20px;
        }
        .container { max-width: 1400px; margin: 0 auto; }
        header {
            text-align: center;
            padding: 20px 0;
            border-bottom: 2px solid #4f46e5;
            margin-bottom: 30px;
        }
        h1 { color: #818cf8; font-size: 2.5rem; margin-bottom: 10px; }
        .mission {
            color: #34d399;
            font-size: 1.2rem;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        .gospel-badge {
            display: inline-block;
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.85rem;
            margin-top: 10px;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .card {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 20px;
        }
        .card h2 {
            color: #a5b4fc;
            font-size: 1rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .metric {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .metric:last-child { border-bottom: none; }
        .metric-label { color: #9ca3af; }
        .metric-value { font-weight: bold; color: #e4e4e7; }
        .metric-value.charity { color: #34d399; }
        .metric-value.infra { color: #60a5fa; }
        .metric-value.founder { color: #fbbf24; }
        .metric-value.gross { color: #818cf8; }
        .metric-value.net { color: #22d3ee; }
        .split-bar {
            display: flex;
            height: 30px;
            border-radius: 6px;
            overflow: hidden;
            margin: 15px 0;
        }
        .split-bar .charity { background: #10b981; flex: 60; }
        .split-bar .infra { background: #3b82f6; flex: 30; }
        .split-bar .founder { background: #f59e0b; flex: 10; }
        .split-legend {
            display: flex;
            justify-content: space-around;
            margin-top: 10px;
            font-size: 0.85rem;
        }
        .split-legend span {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        .split-legend .dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
        }
        .transactions-table {
            width: 100%;
            border-collapse: collapse;
        }
        .transactions-table th,
        .transactions-table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .transactions-table th {
            background: rgba(79, 70, 229, 0.2);
            color: #a5b4fc;
            font-weight: 600;
            text-transform: uppercase;
            font-size: 0.8rem;
            letter-spacing: 1px;
        }
        .transactions-table tr:hover {
            background: rgba(255, 255, 255, 0.02);
        }
        .status-badge {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: bold;
        }
        .status-completed { background: #10b981; color: white; }
        .status-pending { background: #f59e0b; color: black; }
        footer {
            text-align: center;
            padding: 20px;
            color: #6b7280;
            font-size: 0.9rem;
        }
        .refresh-note {
            color: #9ca3af;
            font-size: 0.85rem;
            text-align: center;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Payment Webhook Monitor</h1>
            <div class="mission">FOR THE KIDS</div>
            <div class="gospel-badge">Gospel V${CONFIG.GOSPEL_SPLIT.VERSION} - 60/30/10 Split</div>
        </header>

        <p class="refresh-note">Auto-refreshes every 30 seconds | Last update: ${state.lastUpdate || 'Never'}</p>

        <div class="grid">
            <!-- Daily Summary -->
            <div class="card">
                <h2>Today (${today})</h2>
                <div class="metric">
                    <span class="metric-label">Transactions</span>
                    <span class="metric-value">${dailySummary.transactionCount}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Gross Revenue</span>
                    <span class="metric-value gross">${formatCurrency(dailySummary.grossRevenue)}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Total Costs</span>
                    <span class="metric-value">${formatCurrency(dailySummary.totalCosts)}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Net Profit</span>
                    <span class="metric-value net">${formatCurrency(dailySummary.netProfit)}</span>
                </div>
                <hr style="border-color: rgba(255,255,255,0.1); margin: 10px 0;">
                <div class="metric">
                    <span class="metric-label">Charity (60%)</span>
                    <span class="metric-value charity">${formatCurrency(dailySummary.charityTotal)}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Infrastructure (30%)</span>
                    <span class="metric-value infra">${formatCurrency(dailySummary.infrastructureTotal)}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Founder (10%)</span>
                    <span class="metric-value founder">${formatCurrency(dailySummary.founderTotal)}</span>
                </div>
            </div>

            <!-- Weekly Summary -->
            <div class="card">
                <h2>This Week (${thisWeek})</h2>
                <div class="metric">
                    <span class="metric-label">Transactions</span>
                    <span class="metric-value">${weeklySummary.transactionCount}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Gross Revenue</span>
                    <span class="metric-value gross">${formatCurrency(weeklySummary.grossRevenue)}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Total Costs</span>
                    <span class="metric-value">${formatCurrency(weeklySummary.totalCosts)}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Net Profit</span>
                    <span class="metric-value net">${formatCurrency(weeklySummary.netProfit)}</span>
                </div>
                <hr style="border-color: rgba(255,255,255,0.1); margin: 10px 0;">
                <div class="metric">
                    <span class="metric-label">Charity (60%)</span>
                    <span class="metric-value charity">${formatCurrency(weeklySummary.charityTotal)}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Infrastructure (30%)</span>
                    <span class="metric-value infra">${formatCurrency(weeklySummary.infrastructureTotal)}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Founder (10%)</span>
                    <span class="metric-value founder">${formatCurrency(weeklySummary.founderTotal)}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Affiliate Commissions</span>
                    <span class="metric-value">${formatCurrency(weeklySummary.affiliateCommissions)}</span>
                </div>
            </div>

            <!-- Monthly Summary -->
            <div class="card">
                <h2>This Month (${thisMonth})</h2>
                <div class="metric">
                    <span class="metric-label">Transactions</span>
                    <span class="metric-value">${monthlySummary.transactionCount}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Gross Revenue</span>
                    <span class="metric-value gross">${formatCurrency(monthlySummary.grossRevenue)}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Total Costs</span>
                    <span class="metric-value">${formatCurrency(monthlySummary.totalCosts)}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Net Profit</span>
                    <span class="metric-value net">${formatCurrency(monthlySummary.netProfit)}</span>
                </div>
                <hr style="border-color: rgba(255,255,255,0.1); margin: 10px 0;">
                <div class="metric">
                    <span class="metric-label">Charity (60%)</span>
                    <span class="metric-value charity">${formatCurrency(monthlySummary.charityTotal)}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Infrastructure (30%)</span>
                    <span class="metric-value infra">${formatCurrency(monthlySummary.infrastructureTotal)}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Founder (10%)</span>
                    <span class="metric-value founder">${formatCurrency(monthlySummary.founderTotal)}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Affiliate Commissions</span>
                    <span class="metric-value">${formatCurrency(monthlySummary.affiliateCommissions)}</span>
                </div>
            </div>
        </div>

        <!-- Gospel Split Visualization -->
        <div class="card" style="margin-bottom: 30px;">
            <h2>Gospel Revenue Split - FOR THE KIDS</h2>
            <div class="split-bar">
                <div class="charity"></div>
                <div class="infra"></div>
                <div class="founder"></div>
            </div>
            <div class="split-legend">
                <span><div class="dot" style="background: #10b981;"></div> 60% Verified Pediatric Charities</span>
                <span><div class="dot" style="background: #3b82f6;"></div> 30% Infrastructure</span>
                <span><div class="dot" style="background: #f59e0b;"></div> 10% Founder</span>
            </div>
        </div>

        <!-- Recent Transactions -->
        <div class="card">
            <h2>Recent Transactions (Last 10)</h2>
            <table class="transactions-table">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>ID</th>
                        <th>Source</th>
                        <th>Gross</th>
                        <th>Net</th>
                        <th>Charity</th>
                        <th>Infra</th>
                        <th>Founder</th>
                    </tr>
                </thead>
                <tbody>
                    ${recentTransactions.map(txn => `
                    <tr>
                        <td>${new Date(txn.timestamp).toLocaleString()}</td>
                        <td style="font-family: monospace; font-size: 0.85rem;">${txn.id.slice(0, 15)}...</td>
                        <td>${txn.source}</td>
                        <td class="gross">${formatCurrency(txn.grossAmount)}</td>
                        <td class="net">${formatCurrency(txn.netProfit)}</td>
                        <td style="color: #34d399;">${formatCurrency(txn.split.charity)}</td>
                        <td style="color: #60a5fa;">${formatCurrency(txn.split.infrastructure)}</td>
                        <td style="color: #fbbf24;">${formatCurrency(txn.split.founder)}</td>
                    </tr>
                    `).join('')}
                    ${recentTransactions.length === 0 ? '<tr><td colspan="8" style="text-align: center; color: #6b7280;">No transactions yet</td></tr>' : ''}
                </tbody>
            </table>
        </div>

        <footer>
            <p>Payment Monitor v1.0 | Gospel V${CONFIG.GOSPEL_SPLIT.VERSION} | Started: ${state.startTime}</p>
            <p style="margin-top: 5px;">FOR THE KIDS - Every Dollar Tracked for Transparency</p>
        </footer>
    </div>
</body>
</html>`;
}

function startDashboardServer() {
    const server = http.createServer((req, res) => {
        const url = new URL(req.url, `http://${req.headers.host}`);

        // Health check endpoint
        if (url.pathname === '/health') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                status: 'healthy',
                uptime: process.uptime(),
                transactions: state.transactions.length,
                lastUpdate: state.lastUpdate
            }));
            return;
        }

        // API endpoint - get current state
        if (url.pathname === '/api/state') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                transactions: state.transactions.slice(-100),
                dailyTotals: state.dailyTotals,
                weeklyTotals: state.weeklyTotals,
                monthlyTotals: state.monthlyTotals,
                lastUpdate: state.lastUpdate
            }));
            return;
        }

        // API endpoint - get today's summary
        if (url.pathname === '/api/today') {
            const today = getDateKey();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(state.dailyTotals[today] || createEmptySummary(today, 'daily')));
            return;
        }

        // Webhook receiver endpoint
        if (url.pathname === '/webhook/square' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', () => {
                try {
                    const data = JSON.parse(body);
                    log(`Webhook received: ${data.type || 'unknown'}`, 'WEBHOOK');

                    // Process payment.created or payment.updated events
                    if (data.type === 'payment.created' || data.type === 'payment.updated') {
                        const payment = data.data?.object?.payment;
                        if (payment && payment.status === 'COMPLETED') {
                            const transaction = processPayment({
                                source: 'SQUARE_WEBHOOK',
                                paymentId: payment.id,
                                orderId: payment.order_id,
                                locationId: payment.location_id,
                                amount: (payment.amount_money?.amount || 0) / 100,
                                receiptUrl: payment.receipt_url
                            });

                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({
                                received: true,
                                transactionId: transaction.id,
                                hash: transaction.hash
                            }));
                            return;
                        }
                    }

                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ received: true }));
                } catch (e) {
                    log(`Webhook error: ${e.message}`, 'ERROR');
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: e.message }));
                }
            });
            return;
        }

        // Simulate payment endpoint (for testing)
        if (url.pathname === '/api/simulate' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', () => {
                try {
                    const data = JSON.parse(body);
                    const transaction = processPayment({
                        source: data.source || 'SIMULATION',
                        amount: data.amount || 29.99,
                        cogs: data.cogs || 12.00,
                        shipping: data.shipping || 5.00,
                        affiliate: data.affiliate
                    });

                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                        success: true,
                        transaction: transaction
                    }));
                } catch (e) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: e.message }));
                }
            });
            return;
        }

        // Default - serve dashboard
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(generateDashboardHTML());
    });

    server.listen(CONFIG.DASHBOARD_PORT, () => {
        log(`Dashboard server started on http://localhost:${CONFIG.DASHBOARD_PORT}`, 'INFO');
    });

    return server;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN ENTRY POINT
// ═══════════════════════════════════════════════════════════════════════════════

function printBanner() {
    console.log('');
    console.log('='.repeat(80));
    console.log('  PAYMENT WEBHOOK MONITORING DASHBOARD');
    console.log('  FOR THE KIDS - Track Every Dollar for Transparency');
    console.log('='.repeat(80));
    console.log('');
    console.log('  Gospel Split: 60% Charity | 30% Infrastructure | 10% Founder');
    console.log('  Version:', CONFIG.GOSPEL_SPLIT.VERSION);
    console.log('  Net Profit Mode: ENABLED (COGS deducted first)');
    console.log('');
    console.log('  Dashboard:', `http://localhost:${CONFIG.DASHBOARD_PORT}`);
    console.log('  Log Dir:', CONFIG.LOG_DIR);
    console.log('');
    console.log('='.repeat(80));
    console.log('');
}

function main() {
    printBanner();

    // Ensure directories exist
    ensureDirectories();

    // Load previous state
    loadState();

    // Start dashboard server
    startDashboardServer();

    log('Payment Monitor started', 'INFO');
    log(`Loaded ${state.transactions.length} historical transactions`, 'INFO');

    // Handle graceful shutdown
    process.on('SIGINT', () => {
        log('Shutting down...', 'INFO');
        saveState();
        process.exit(0);
    });

    process.on('SIGTERM', () => {
        log('Received SIGTERM, shutting down...', 'INFO');
        saveState();
        process.exit(0);
    });
}

// Export for testing and external use
module.exports = {
    CONFIG,
    processPayment,
    processAffiliateCommission,
    calculateNetProfit,
    calculateGospelSplit,
    calculateAffiliateCommission,
    getState: () => state,
    startDashboardServer
};

// Run if executed directly
if (require.main === module) {
    main();
}
