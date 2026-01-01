# CONTRIBUTION PAGE - CLOUDFLARE PAGES DEPLOYMENT
# FOR THE KIDS - Gospel V1.3
# Created: December 17, 2025

Write-Host "================================" -ForegroundColor Cyan
Write-Host "  FOR THE KIDS - DEPLOY SCRIPT  " -ForegroundColor Cyan
Write-Host "  Gospel V1.3 (60/30/10)        " -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if wrangler is installed
Write-Host "Checking for Wrangler CLI..." -ForegroundColor Yellow
$wranglerInstalled = Get-Command wrangler -ErrorAction SilentlyContinue

if (-not $wranglerInstalled) {
    Write-Host "Wrangler not found. Installing..." -ForegroundColor Red
    npm install -g wrangler
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to install Wrangler. Please install manually:" -ForegroundColor Red
        Write-Host "npm install -g wrangler" -ForegroundColor White
        exit 1
    }
    Write-Host "Wrangler installed successfully!" -ForegroundColor Green
} else {
    Write-Host "Wrangler found: $($wranglerInstalled.Source)" -ForegroundColor Green
}

Write-Host ""

# Check if logged in
Write-Host "Checking Cloudflare authentication..." -ForegroundColor Yellow
$authCheck = wrangler whoami 2>&1

if ($authCheck -match "not authenticated" -or $authCheck -match "error") {
    Write-Host "Not logged in to Cloudflare. Starting login..." -ForegroundColor Yellow
    wrangler login
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Login failed. Please try manually: wrangler login" -ForegroundColor Red
        exit 1
    }
    Write-Host "Login successful!" -ForegroundColor Green
} else {
    Write-Host "Already authenticated with Cloudflare!" -ForegroundColor Green
}

Write-Host ""

# Navigate to contribute-page directory
$contributePath = "C:\AiCollabForTheKids\contribute-page"
if (-not (Test-Path $contributePath)) {
    Write-Host "ERROR: contribute-page directory not found!" -ForegroundColor Red
    Write-Host "Expected: $contributePath" -ForegroundColor Red
    exit 1
}

Set-Location $contributePath
Write-Host "Working directory: $contributePath" -ForegroundColor Green
Write-Host ""

# Show files to be deployed
Write-Host "Files to deploy:" -ForegroundColor Yellow
Get-ChildItem | Select-Object Name, Length | Format-Table
Write-Host ""

# Confirm deployment
Write-Host "Ready to deploy to Cloudflare Pages!" -ForegroundColor Cyan
Write-Host "Project: contribute-forkids" -ForegroundColor White
Write-Host "Gospel: V1.3 (60% to kids)" -ForegroundColor White
Write-Host ""

$confirm = Read-Host "Deploy now? (y/n)"
if ($confirm -ne 'y' -and $confirm -ne 'Y') {
    Write-Host "Deployment cancelled." -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "Deploying to Cloudflare Pages..." -ForegroundColor Cyan

# Deploy
wrangler pages deploy . --project-name=contribute-forkids --branch=main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "================================" -ForegroundColor Green
    Write-Host "  DEPLOYMENT SUCCESSFUL!        " -ForegroundColor Green
    Write-Host "================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your contribution page is now live!" -ForegroundColor Green
    Write-Host ""
    Write-Host "URLs:" -ForegroundColor Cyan
    Write-Host "  Production: https://contribute-forkids.pages.dev" -ForegroundColor White
    Write-Host ""
    Write-Host "Next Steps:" -ForegroundColor Yellow
    Write-Host "  1. Test the page thoroughly" -ForegroundColor White
    Write-Host "  2. Create Square payment links" -ForegroundColor White
    Write-Host "  3. Configure custom domain (contribute.aidoesitall.website)" -ForegroundColor White
    Write-Host "  4. Setup analytics" -ForegroundColor White
    Write-Host "  5. Launch marketing campaign" -ForegroundColor White
    Write-Host ""
    Write-Host "FOR THE KIDS. ALWAYS." -ForegroundColor Cyan
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "Deployment failed!" -ForegroundColor Red
    Write-Host "Check the error messages above." -ForegroundColor Red
    Write-Host ""
    Write-Host "Manual deployment command:" -ForegroundColor Yellow
    Write-Host "wrangler pages deploy . --project-name=contribute-forkids" -ForegroundColor White
    exit 1
}
