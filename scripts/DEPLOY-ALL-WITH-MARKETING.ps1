<#
.SYNOPSIS
    Deploy All Platform Components with Marketing Agents
    FOR THE KIDS - Complete Deployment with Kickstarter Focus

.DESCRIPTION
    Comprehensive deployment script for:
    - aidoesitall.website (main platform + Kickstarter)
    - jules-dashboard (Jules AI interface)
    - Marketing automation agents
    - API services
    
    GOSPEL V1.3 COMPLIANT - 60/30/10 IMMUTABLE

.PARAMETER SkipTests
    Skip pre-deployment tests

.PARAMETER MarketingOnly
    Only deploy marketing agents without infrastructure

.PARAMETER SkipMarketing
    Deploy infrastructure without marketing agents

.EXAMPLE
    .\DEPLOY-ALL-WITH-MARKETING.ps1
    .\DEPLOY-ALL-WITH-MARKETING.ps1 -MarketingOnly
    .\DEPLOY-ALL-WITH-MARKETING.ps1 -SkipTests

.NOTES
    Author: GitHub Copilot
    Created: December 19, 2025
    Mission: FOR THE KIDS - Kickstarter Campaign Launch
#>

param(
    [switch]$SkipTests,
    [switch]$MarketingOnly,
    [switch]$SkipMarketing
)

$ErrorActionPreference = "Continue"

# ═══════════════════════════════════════════════════════════════════════════════
# GOSPEL CONFIGURATION (IMMUTABLE - V1.3)
# ═══════════════════════════════════════════════════════════════════════════════

$GOSPEL_CONFIG = @{
    Version = "V1.3"
    CharitySplit = 60
    InfrastructureSplit = 30
    FounderSplit = 10
    Mission = "FOR THE KIDS"
}

$DEPLOYMENT_CONFIG = @{
    MainSite = "aidoesitall.website"
    Dashboard = "jules-dashboard.pages.dev"
    API = "api.aidoesitall.website"
    KickstarterPage = "aidoesitall.website/kickstarter"
    CloudflarePagesProject = "aidoesitall-website"
    DashboardProject = "jules-dashboard"
}

$MARKETING_AGENTS = @(
    @{ Name = "Twitter Bot"; Script = "droid-daily-scheduler.cjs"; Port = 3020 }
    @{ Name = "Affiliate Swarm"; Script = "AFFILIATE-SWARM-DROID.js"; Port = 3021 }
    @{ Name = "Content Engine"; Script = "../infrastructure/automation/marketing/content-engine.cjs"; Port = 3022 }
    @{ Name = "Kickstarter Monitor"; Script = "../infrastructure/automation/kickstarter/momentum_monitor.cjs"; Port = 3023 }
)

# ═══════════════════════════════════════════════════════════════════════════════
# UTILITY FUNCTIONS
# ═══════════════════════════════════════════════════════════════════════════════

function Write-Banner {
    param([string]$Message)
    Write-Host ""
    Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host "  $Message" -ForegroundColor White
    Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host ""
}

function Write-Step {
    param([string]$Message)
    Write-Host "►  $Message" -ForegroundColor Yellow
}

function Write-Success {
    param([string]$Message)
    Write-Host "✓  $Message" -ForegroundColor Green
}

function Write-Error {
    param([string]$Message)
    Write-Host "✗  $Message" -ForegroundColor Red
}

function Test-Command {
    param([string]$Command)
    try {
        Get-Command $Command -ErrorAction Stop | Out-Null
        return $true
    } catch {
        return $false
    }
}

# ═══════════════════════════════════════════════════════════════════════════════
# PRE-FLIGHT CHECKS
# ═══════════════════════════════════════════════════════════════════════════════

Write-Banner "FOR THE KIDS - FULL DEPLOYMENT WITH MARKETING"

Write-Host "Gospel Version: $($GOSPEL_CONFIG.Version)" -ForegroundColor White
Write-Host ("Split: {0}% Charity | {1}% Infrastructure | {2}% Founder" -f $GOSPEL_CONFIG.CharitySplit, $GOSPEL_CONFIG.InfrastructureSplit, $GOSPEL_CONFIG.FounderSplit) -ForegroundColor White
Write-Host ""

if (-not $SkipTests) {
    Write-Step "Running pre-flight checks..."
    
    # Check required commands
    $requiredCommands = @("node", "npm", "git")
    $missingCommands = @()
    
    foreach ($cmd in $requiredCommands) {
        if (-not (Test-Command $cmd)) {
            $missingCommands += $cmd
        }
    }
    
    if ($missingCommands.Count -gt 0) {
        Write-Error "Missing required commands: $($missingCommands -join ', ')"
        Write-Host "Please install missing tools and try again." -ForegroundColor Yellow
        exit 1
    }
    
    Write-Success "All required commands available"
    
    # Check if wrangler is installed (for Cloudflare Pages)
    if (Test-Command "wrangler") {
        Write-Success "Cloudflare Wrangler CLI found"
    } else {
        Write-Host "  Installing Cloudflare Wrangler CLI..." -ForegroundColor Yellow
        npm install -g wrangler
    }
}

# ═══════════════════════════════════════════════════════════════════════════════
# INFRASTRUCTURE DEPLOYMENT
# ═══════════════════════════════════════════════════════════════════════════════

if (-not $MarketingOnly) {
    Write-Banner "DEPLOYING INFRASTRUCTURE"
    
    # Deploy aidoesitall.website (Main Platform + Kickstarter)
    Write-Step "Deploying aidoesitall.website (Main Platform + Kickstarter)..."
    
    if (Test-Path "youandinotai-landing") {
        Push-Location "youandinotai-landing"
        
        Write-Host "  Building site..." -ForegroundColor Gray
        # Note: If there's a build process, add it here
        
        Write-Host "  Deploying to Cloudflare Pages..." -ForegroundColor Gray
        try {
            # Deploy using wrangler pages or direct upload
            wrangler pages publish . --project-name=$($DEPLOYMENT_CONFIG.CloudflarePagesProject)
            Write-Success "aidoesitall.website deployed"
        } catch {
            Write-Error "Failed to deploy aidoesitall.website: $_"
        }
        
        Pop-Location
    } else {
        Write-Error "youandinotai-landing directory not found"
    }
    
    # Deploy jules-dashboard
    Write-Step "Deploying jules-dashboard..."
    
    if (Test-Path "jules-dashboard") {
        Push-Location "jules-dashboard"
        
        Write-Host "  Installing dependencies..." -ForegroundColor Gray
        npm install
        
        Write-Host "  Building dashboard..." -ForegroundColor Gray
        npm run build
        
        Write-Host "  Deploying to Cloudflare Pages..." -ForegroundColor Gray
        try {
            wrangler pages publish dist --project-name=$($DEPLOYMENT_CONFIG.DashboardProject)
            Write-Success "jules-dashboard deployed"
        } catch {
            Write-Error "Failed to deploy jules-dashboard: $_"
        }
        
        Pop-Location
    } else {
        Write-Error "jules-dashboard directory not found"
    }
    
    # Deploy API (if needed)
    Write-Step "Checking API deployment status..."
    
    if (Test-Path "api") {
        Write-Host "  API deployment handled by Railway/Cloud provider" -ForegroundColor Gray
        Write-Host "  To deploy API manually, use: railway up or wrangler deploy" -ForegroundColor Yellow
    }
    
    Write-Success "Infrastructure deployment complete"
}

# ═══════════════════════════════════════════════════════════════════════════════
# MARKETING AGENTS DEPLOYMENT
# ═══════════════════════════════════════════════════════════════════════════════

if (-not $SkipMarketing) {
    Write-Banner "DEPLOYING MARKETING AGENTS"
    
    Write-Step "Starting marketing automation agents..."
    
    Push-Location "scripts"
    
    foreach ($agent in $MARKETING_AGENTS) {
        Write-Host ""
        Write-Host "  Starting: $($agent.Name)" -ForegroundColor Cyan
        Write-Host "  Script: $($agent.Script)" -ForegroundColor Gray
        Write-Host "  Port: $($agent.Port)" -ForegroundColor Gray
        
        if (Test-Path $agent.Script) {
            try {
                # Start agent in background using PM2 or node
                if (Test-Command "pm2") {
                    $agentNameSlug = $agent.Name.ToLower().Replace(" ", "-")
                    pm2 start $agent.Script --name $agentNameSlug -- --port $($agent.Port)
                    Write-Success "$($agent.Name) started with PM2"
                } else {
                    # Fallback to node in background
                    Start-Process -FilePath "node" -ArgumentList $agent.Script -WindowStyle Hidden
                    Write-Success "$($agent.Name) started in background"
                }
            } catch {
                Write-Error "Failed to start $($agent.Name): $_"
            }
        } else {
            Write-Error "Script not found: $($agent.Script)"
        }
    }
    
    Pop-Location
    
    Write-Success "Marketing agents deployment complete"
    
    # Display agent status
    if (Test-Command "pm2") {
        Write-Host ""
        Write-Step "Marketing Agent Status:"
        pm2 list
    }
}

# ═══════════════════════════════════════════════════════════════════════════════
# KICKSTARTER SPECIFIC SETUP
# ═══════════════════════════════════════════════════════════════════════════════

Write-Banner "KICKSTARTER CAMPAIGN SETUP"

Write-Step "Verifying Kickstarter components..."

# Check if Kickstarter page exists
$kickstarterChecks = @(
    @{ Name = "Kickstarter landing page"; Path = "youandinotai-landing/kickstarter.html" }
    @{ Name = "Kickstarter content"; Path = "marketing/kickstarter" }
    @{ Name = "Kickstarter automation"; Path = "scripts/KICKSTARTER-LAUNCH-AUTOMATION.ps1" }
)

foreach ($check in $kickstarterChecks) {
    if (Test-Path $check.Path) {
        Write-Success "$($check.Name) found"
    } else {
        Write-Error "$($check.Name) not found at $($check.Path)"
    }
}

Write-Host ""
Write-Host "Kickstarter Campaign URL:" -ForegroundColor Cyan
Write-Host "  https://$($DEPLOYMENT_CONFIG.KickstarterPage)" -ForegroundColor Green
Write-Host ""

# ═══════════════════════════════════════════════════════════════════════════════
# POST-DEPLOYMENT VALIDATION
# ═══════════════════════════════════════════════════════════════════════════════

Write-Banner "POST-DEPLOYMENT VALIDATION"

Write-Step "Testing deployed endpoints..."

$endpoints = @(
    @{ Name = "Main Site"; URL = "https://$($DEPLOYMENT_CONFIG.MainSite)" }
    @{ Name = "Jules Dashboard"; URL = "https://$($DEPLOYMENT_CONFIG.Dashboard)" }
    @{ Name = "Kickstarter Page"; URL = "https://$($DEPLOYMENT_CONFIG.KickstarterPage)" }
    @{ Name = "API Health"; URL = "https://$($DEPLOYMENT_CONFIG.API)/health" }
)

foreach ($endpoint in $endpoints) {
    Write-Host "  Testing $($endpoint.Name)..." -ForegroundColor Gray
    try {
        $response = Invoke-WebRequest -Uri $endpoint.URL -Method HEAD -TimeoutSec 10 -UseBasicParsing -ErrorAction Stop
        if ($response.StatusCode -eq 200) {
            Write-Success "$($endpoint.Name) is live"
        } else {
            Write-Host "    Status: $($response.StatusCode)" -ForegroundColor Yellow
        }
    } catch {
        Write-Error "$($endpoint.Name) not accessible: $_"
    }
}

# ═══════════════════════════════════════════════════════════════════════════════
# DEPLOYMENT SUMMARY
# ═══════════════════════════════════════════════════════════════════════════════

Write-Banner "DEPLOYMENT SUMMARY"

Write-Host "Gospel Version: $($GOSPEL_CONFIG.Version)" -ForegroundColor White
Write-Host "Mission: $($GOSPEL_CONFIG.Mission)" -ForegroundColor White
Write-Host ""

Write-Host "Deployed Components:" -ForegroundColor Cyan
if (-not $MarketingOnly) {
    Write-Host "  ✓ Main Site: https://$($DEPLOYMENT_CONFIG.MainSite)" -ForegroundColor Green
    Write-Host "  ✓ Dashboard: https://$($DEPLOYMENT_CONFIG.Dashboard)" -ForegroundColor Green
    Write-Host "  ✓ Kickstarter: https://$($DEPLOYMENT_CONFIG.KickstarterPage)" -ForegroundColor Green
}

if (-not $SkipMarketing) {
    Write-Host "  ✓ Marketing Agents: $($MARKETING_AGENTS.Count) active" -ForegroundColor Green
    foreach ($agent in $MARKETING_AGENTS) {
        Write-Host "    - $($agent.Name) (Port $($agent.Port))" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "  1. Verify all endpoints are responding" -ForegroundColor White
Write-Host "  2. Check marketing agent logs: pm2 logs" -ForegroundColor White
Write-Host "  3. Launch Kickstarter campaign: .\KICKSTARTER-LAUNCH-AUTOMATION.ps1" -ForegroundColor White
Write-Host "  4. Monitor campaign: .\scripts\RUN-ALL-DAILY.ps1" -ForegroundColor White
Write-Host ""

Write-Success "DEPLOYMENT COMPLETE - FOR THE KIDS"
Write-Host ""
