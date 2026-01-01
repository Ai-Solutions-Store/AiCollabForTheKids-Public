# ═══════════════════════════════════════════════════════════════════════════════
# T5500 MARKETING NODE DEPLOYMENT
# ═══════════════════════════════════════════════════════════════════════════════
#
# Run this script ON T5500 (192.168.0.101) to set up marketing automation
#
# Prerequisites on T5500:
#   - Node.js installed
#   - PM2 installed globally: npm install -g pm2
#   - AiCollabForTheKids repo synced to C:\AiCollabForTheKids
#
# FOR THE KIDS - Gospel V1.3 (60/30/10)
# ═══════════════════════════════════════════════════════════════════════════════

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  T5500 MARKETING NODE DEPLOYMENT" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Check prerequisites
Write-Host "[1/5] Checking prerequisites..." -ForegroundColor Yellow

$nodeVersion = & node --version 2>$null
if (-not $nodeVersion) {
    Write-Host "[FAIL] Node.js not installed!" -ForegroundColor Red
    Write-Host "Install from: https://nodejs.org/" -ForegroundColor White
    exit 1
}
Write-Host "  Node.js: $nodeVersion" -ForegroundColor Green

$pm2Version = & pm2 --version 2>$null
if (-not $pm2Version) {
    Write-Host "[WARN] PM2 not installed, installing..." -ForegroundColor Yellow
    npm install -g pm2
}
Write-Host "  PM2: OK" -ForegroundColor Green

# Check paths
Write-Host ""
Write-Host "[2/5] Checking paths..." -ForegroundColor Yellow

$repoPath = "C:\AiCollabForTheKids"
$marketingPath = "$repoPath\scripts\marketing"
$runnerPath = "$marketingPath\marketing-runner-t5500.cjs"

if (-not (Test-Path $repoPath)) {
    Write-Host "[FAIL] AiCollabForTheKids not found at $repoPath" -ForegroundColor Red
    Write-Host "Clone from GitHub first:" -ForegroundColor White
    Write-Host "  git clone https://github.com/Ai-Solutions-Store/AiCollabForTheKids.git C:\AiCollabForTheKids" -ForegroundColor Gray
    exit 1
}

if (-not (Test-Path $runnerPath)) {
    Write-Host "[FAIL] T5500 runner not found at $runnerPath" -ForegroundColor Red
    Write-Host "Pull latest from GitHub:" -ForegroundColor White
    Write-Host "  cd C:\AiCollabForTheKids && git pull" -ForegroundColor Gray
    exit 1
}

Write-Host "  Repo: OK" -ForegroundColor Green
Write-Host "  Runner: OK" -ForegroundColor Green

# Create logs directory
Write-Host ""
Write-Host "[3/5] Creating directories..." -ForegroundColor Yellow

$logsPath = "$repoPath\logs"
if (-not (Test-Path $logsPath)) {
    New-Item -ItemType Directory -Path $logsPath -Force | Out-Null
}
Write-Host "  Logs: $logsPath" -ForegroundColor Green

# Stop any existing marketing process
Write-Host ""
Write-Host "[4/5] Configuring PM2..." -ForegroundColor Yellow

pm2 delete marketing-24-7-t5500 2>$null
pm2 delete marketing-t5500 2>$null

# Start the T5500 marketing runner
Write-Host ""
Write-Host "[5/5] Starting marketing engine..." -ForegroundColor Yellow

pm2 start $runnerPath --name "marketing-24-7-t5500" --cwd $marketingPath

# Save PM2 config
pm2 save

# Setup PM2 startup (optional - requires admin)
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "  T5500 MARKETING NODE DEPLOYED!" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""
Write-Host "Marketing Engine Status:" -ForegroundColor White
pm2 list

Write-Host ""
Write-Host "View logs with: pm2 logs marketing-24-7-t5500" -ForegroundColor Cyan
Write-Host ""
Write-Host "T5500 Tasks (different from Sabertooth):" -ForegroundColor Yellow
Write-Host "  - LinkedIn Posts (every 6 hours)" -ForegroundColor White
Write-Host "  - Reddit Posts (every 8 hours)" -ForegroundColor White
Write-Host "  - Email Blasts (every 24 hours)" -ForegroundColor White
Write-Host "  - Twitter AI Story (every 10 hours)" -ForegroundColor White
Write-Host "  - Twitter Blockchain (every 12 hours)" -ForegroundColor White
Write-Host "  - Twitter Gospel (every 9 hours)" -ForegroundColor White
Write-Host ""
Write-Host "Sabertooth Tasks (running separately):" -ForegroundColor Yellow
Write-Host "  - Twitter AI Store (every 4 hours)" -ForegroundColor White
Write-Host "  - Discord (every 6 hours)" -ForegroundColor White
Write-Host "  - Twitter Urgency (every 8 hours)" -ForegroundColor White
Write-Host "  - Twitter Founder Story (every 12 hours)" -ForegroundColor White
Write-Host ""
Write-Host "FOR THE KIDS. ALWAYS." -ForegroundColor Green
Write-Host ""
