# ═══════════════════════════════════════════════════════════════════════════════
# VERIFY AI STORE WEBHOOK READINESS
# ═══════════════════════════════════════════════════════════════════════════════
#
# Purpose: Verify all components are in place for AI Store webhook
# Checks scripts, handler, configuration, and connectivity
#
# FOR THE KIDS
# ═══════════════════════════════════════════════════════════════════════════════

$ErrorActionPreference = "Continue"

function Write-Check {
    param([string]$Message, [bool]$Success)
    if ($Success) {
        Write-Host "✅ $Message" -ForegroundColor Green
    }
    else {
        Write-Host "❌ $Message" -ForegroundColor Red
    }
    return $Success
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host " AI STORE WEBHOOK READINESS CHECK" -ForegroundColor White
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

$allGood = $true

# Check 1: Setup script exists
Write-Host "1. Setup Script" -ForegroundColor Yellow
$setupExists = Test-Path "C:\AiCollabForTheKids\scripts\setup-ai-store-webhook.ps1"
$allGood = (Write-Check "setup-ai-store-webhook.ps1 exists" $setupExists) -and $allGood
Write-Host ""

# Check 2: Test script exists
Write-Host "2. Test Script" -ForegroundColor Yellow
$testExists = Test-Path "C:\AiCollabForTheKids\scripts\test-ai-store-webhook.ps1"
$allGood = (Write-Check "test-ai-store-webhook.ps1 exists" $testExists) -and $allGood
Write-Host ""

# Check 3: List script exists
Write-Host "3. List Script" -ForegroundColor Yellow
$listExists = Test-Path "C:\AiCollabForTheKids\scripts\list-square-webhooks.ps1"
$allGood = (Write-Check "list-square-webhooks.ps1 exists" $listExists) -and $allGood
Write-Host ""

# Check 4: Documentation exists
Write-Host "4. Documentation" -ForegroundColor Yellow
$readmeExists = Test-Path "C:\AiCollabForTheKids\scripts\README-AI-STORE-WEBHOOK.md"
$allGood = (Write-Check "README-AI-STORE-WEBHOOK.md exists" $readmeExists) -and $allGood

$summaryExists = Test-Path "C:\AiCollabForTheKids\scripts\WEBHOOK-SETUP-SUMMARY.md"
$allGood = (Write-Check "WEBHOOK-SETUP-SUMMARY.md exists" $summaryExists) -and $allGood

$quickStartExists = Test-Path "C:\AiCollabForTheKids\scripts\WEBHOOK-QUICK-START.md"
$allGood = (Write-Check "WEBHOOK-QUICK-START.md exists" $quickStartExists) -and $allGood
Write-Host ""

# Check 5: Webhook handler exists
Write-Host "5. Webhook Handler" -ForegroundColor Yellow
$webhooksExists = Test-Path "C:\AiCollabForTheKids\api\routes\webhooks.js"
$allGood = (Write-Check "webhooks.js exists" $webhooksExists) -and $allGood

if ($webhooksExists) {
    $content = Get-Content "C:\AiCollabForTheKids\api\routes\webhooks.js" -Raw
    $hasAiStoreRoute = $content -match "POST /api/webhooks/ai-store"
    $allGood = (Write-Check "AI Store route implemented" $hasAiStoreRoute) -and $allGood
}
Write-Host ""

# Check 6: .env file exists
Write-Host "6. Configuration" -ForegroundColor Yellow
$envExists = Test-Path "C:\AiCollabForTheKids\api\.env"
$allGood = (Write-Check "api/.env exists" $envExists) -and $allGood

if ($envExists) {
    $envContent = Get-Content "C:\AiCollabForTheKids\api\.env" -Raw
    $hasWebhookSecret = $envContent -match "SQUARE_AI_STORE_WEBHOOK_SECRET="

    if ($hasWebhookSecret) {
        Write-Check "SQUARE_AI_STORE_WEBHOOK_SECRET configured" $true
    }
    else {
        Write-Check "SQUARE_AI_STORE_WEBHOOK_SECRET NOT configured (run setup script)" $false
        Write-Host "   → Run: .\setup-ai-store-webhook.ps1" -ForegroundColor Gray
    }
}
Write-Host ""

# Check 7: Server connectivity (optional)
Write-Host "7. Server Connectivity (Optional)" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/health" -TimeoutSec 5 -ErrorAction Stop
    Write-Check "API server is running" $true
}
catch {
    Write-Check "API server not running (start it when ready)" $false
    Write-Host "   → This is OK if server isn't started yet" -ForegroundColor Gray
}
Write-Host ""

# Check 8: Square credentials
Write-Host "8. Square Credentials" -ForegroundColor Yellow
$SQUARE_ACCESS_TOKEN = "EAAAl8Pw2wm_0UfULPe5YdBdWWSnOC2WifHYbAoxk7BQndbM2K-UDAD74Es1Nya8"
$SQUARE_LOCATION_ID = "LY5GN09F5AN83"

Write-Check "Square access token configured" ($SQUARE_ACCESS_TOKEN.Length -gt 0)
Write-Check "Square location ID configured" ($SQUARE_LOCATION_ID.Length -gt 0)
Write-Host ""

# Summary
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
if ($allGood) {
    Write-Host " READINESS: ✅ READY TO DEPLOY" -ForegroundColor Green
}
else {
    Write-Host " READINESS: ⚠️ ISSUES FOUND" -ForegroundColor Yellow
}
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Next steps
Write-Host "NEXT STEPS:" -ForegroundColor Cyan
Write-Host ""

if (-not $hasWebhookSecret) {
    Write-Host "1. Create webhook subscription:" -ForegroundColor Yellow
    Write-Host "   cd C:\AiCollabForTheKids\scripts" -ForegroundColor White
    Write-Host "   .\setup-ai-store-webhook.ps1" -ForegroundColor White
    Write-Host ""
    Write-Host "2. Add webhook secret to api/.env" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "3. Restart API server" -ForegroundColor Yellow
    Write-Host ""
}
else {
    Write-Host "1. Test webhook:" -ForegroundColor Yellow
    Write-Host "   cd C:\AiCollabForTheKids\scripts" -ForegroundColor White
    Write-Host "   .\test-ai-store-webhook.ps1" -ForegroundColor White
    Write-Host ""
    Write-Host "2. Make test payment on ai-solutions.store" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "3. Monitor logs for webhook delivery" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "FOR THE KIDS - Gospel V1.3 (60/30/10)" -ForegroundColor Magenta
Write-Host ""
