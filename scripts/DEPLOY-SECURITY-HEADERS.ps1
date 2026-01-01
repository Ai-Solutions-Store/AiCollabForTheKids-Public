# ═══════════════════════════════════════════════════════════════
# FOR THE KIDS - Security Headers Deployment Script
# Gospel Version: V1.3 (60/30/10)
# Purpose: Deploy security headers to all domains
# ═══════════════════════════════════════════════════════════════

param(
    [switch]$DryRun,
    [switch]$SkipVerification
)

$ErrorActionPreference = "Stop"

Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "FOR THE KIDS - Security Headers Deployment" -ForegroundColor Cyan
Write-Host "Gospel V1.3 (60/30/10)" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Load credentials from .env
$envPath = "C:\AiCollabForTheKids\api\.env"
if (!(Test-Path $envPath)) {
    Write-Host "ERROR: Cannot find .env file at $envPath" -ForegroundColor Red
    exit 1
}

# Parse .env for Cloudflare credentials
$cloudflareEmail = (Select-String -Path $envPath -Pattern "CLOUDFLARE_EMAIL=(.+)").Matches.Groups[1].Value
$cloudflareApiKey = (Select-String -Path $envPath -Pattern "CLOUDFLARE_GLOBAL_API_KEY=(.+)").Matches.Groups[1].Value
$cloudflareApiToken = (Select-String -Path $envPath -Pattern "CLOUDFLARE_API_TOKEN=(.+)").Matches.Groups[1].Value
$cloudflareAccountId = (Select-String -Path $envPath -Pattern "CLOUDFLARE_ACCOUNT_ID=(.+)").Matches.Groups[1].Value

$zoneYouandinotai = (Select-String -Path $envPath -Pattern "CLOUDFLARE_ZONE_YOUANDINOTAI=(.+)").Matches.Groups[1].Value
$zoneYouandinotaiOnline = (Select-String -Path $envPath -Pattern "CLOUDFLARE_ZONE_YOUANDINOTAI_ONLINE=(.+)").Matches.Groups[1].Value
$zoneAidoesitall = (Select-String -Path $envPath -Pattern "CLOUDFLARE_ZONE_AIDOESITALL=(.+)").Matches.Groups[1].Value

Write-Host "Credentials loaded from .env file" -ForegroundColor Green
Write-Host "Account ID: $cloudflareAccountId" -ForegroundColor Gray
Write-Host ""

if ($DryRun) {
    Write-Host "DRY RUN MODE - No changes will be made" -ForegroundColor Yellow
    Write-Host ""
}

# ═══════════════════════════════════════════════════════════════
# TASK 1: Deploy youandinotai.com (Already has _headers file)
# ═══════════════════════════════════════════════════════════════
Write-Host "[TASK 1/3] Deploying youandinotai.com..." -ForegroundColor Cyan

$youandinotaiPath = "C:\AiCollabForTheKids\youandinotai-landing"

if (!(Test-Path "$youandinotaiPath\_headers")) {
    Write-Host "ERROR: _headers file not found at $youandinotaiPath\_headers" -ForegroundColor Red
    exit 1
}

Write-Host "✓ _headers file found: $youandinotaiPath\_headers" -ForegroundColor Green

if ($DryRun) {
    Write-Host "WOULD RUN: npx wrangler pages deploy $youandinotaiPath --project-name=youandinotai --branch=main" -ForegroundColor Yellow
} else {
    Write-Host "Deploying youandinotai.com to Cloudflare Pages..." -ForegroundColor White
    $env:CLOUDFLARE_API_TOKEN = $cloudflareApiToken
    $env:CLOUDFLARE_ACCOUNT_ID = $cloudflareAccountId

    Set-Location $youandinotaiPath
    npx wrangler pages deploy . --project-name=youandinotai --branch=main

    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ youandinotai.com deployed successfully" -ForegroundColor Green
    } else {
        Write-Host "ERROR: youandinotai.com deployment failed" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""

# ═══════════════════════════════════════════════════════════════
# TASK 2: Configure youandinotai.online via Transform Rules API
# ═══════════════════════════════════════════════════════════════
Write-Host "[TASK 2/3] Configuring youandinotai.online via Transform Rules..." -ForegroundColor Cyan

$apiUrl = "https://api.cloudflare.com/client/v4/zones/$zoneYouandinotaiOnline/rulesets/phases/http_response_headers_transform/entrypoint"

$headers = @{
    "X-Auth-Email" = $cloudflareEmail
    "X-Auth-Key" = $cloudflareApiKey
    "Content-Type" = "application/json"
}

$body = @{
    rules = @(
        @{
            action = "rewrite"
            action_parameters = @{
                headers = @{
                    "Strict-Transport-Security" = @{
                        operation = "set"
                        value = "max-age=31536000; includeSubDomains; preload"
                    }
                    "Content-Security-Policy" = @{
                        operation = "set"
                        value = "default-src 'self'; script-src 'self' 'unsafe-inline' https://sandbox.web.squarecdn.com https://web.squarecdn.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://dao.youandinotai.com;"
                    }
                    "X-Frame-Options" = @{
                        operation = "set"
                        value = "SAMEORIGIN"
                    }
                    "X-Content-Type-Options" = @{
                        operation = "set"
                        value = "nosniff"
                    }
                    "Referrer-Policy" = @{
                        operation = "set"
                        value = "strict-origin-when-cross-origin"
                    }
                    "Permissions-Policy" = @{
                        operation = "set"
                        value = "geolocation=(), microphone=(), camera=()"
                    }
                }
            }
            expression = '(http.host eq "youandinotai.online" or http.host eq "www.youandinotai.online")'
            description = "FOR THE KIDS - Security headers for youandinotai.online (Gospel V1.3)"
            enabled = $true
        }
    )
} | ConvertTo-Json -Depth 10

if ($DryRun) {
    Write-Host "WOULD POST TO: $apiUrl" -ForegroundColor Yellow
    Write-Host "BODY: $body" -ForegroundColor Yellow
} else {
    Write-Host "Creating Transform Rule for youandinotai.online..." -ForegroundColor White

    try {
        $response = Invoke-RestMethod -Uri $apiUrl -Method Post -Headers $headers -Body $body

        if ($response.success) {
            Write-Host "✓ youandinotai.online Transform Rule created successfully" -ForegroundColor Green
        } else {
            Write-Host "ERROR: API returned success=false" -ForegroundColor Red
            Write-Host "Errors: $($response.errors | ConvertTo-Json)" -ForegroundColor Red
            exit 1
        }
    } catch {
        Write-Host "ERROR: API request failed: $_" -ForegroundColor Red
        Write-Host "You can configure this manually via Cloudflare Dashboard" -ForegroundColor Yellow
        Write-Host "See CLOUDFLARE-SECURITY-HEADERS-ACTION-PLAN.md for instructions" -ForegroundColor Yellow
    }
}

Write-Host ""

# ═══════════════════════════════════════════════════════════════
# TASK 3: Deploy aidoesitall.website (Create _headers if needed)
# ═══════════════════════════════════════════════════════════════
Write-Host "[TASK 3/3] Deploying aidoesitall.website..." -ForegroundColor Cyan

$aidoesitallPath = "C:\AiCollabForTheKids\aidoesitall-landing"

# Check if directory exists
if (!(Test-Path $aidoesitallPath)) {
    Write-Host "Directory not found, creating: $aidoesitallPath" -ForegroundColor Yellow
    if (!$DryRun) {
        New-Item -ItemType Directory -Path $aidoesitallPath -Force | Out-Null
    }
}

# Check if _headers file exists
if (!(Test-Path "$aidoesitallPath\_headers")) {
    Write-Host "_headers file not found, creating..." -ForegroundColor Yellow

    $headersContent = @"
# ═══════════════════════════════════════════════════════════════
# FOR THE KIDS - Security Headers for aidoesitall.website
# Gospel Version: V1.3 (60/30/10)
# Cloudflare Pages _headers file
# ═══════════════════════════════════════════════════════════════

/*
  # HSTS - Force HTTPS (1 year, include subdomains, preload ready)
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

  # CSP - Content Security Policy (XSS prevention)
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://sandbox.web.squarecdn.com https://web.squarecdn.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.aidoesitall.website;

  # X-Frame-Options - Prevent clickjacking
  X-Frame-Options: SAMEORIGIN

  # X-Content-Type-Options - Prevent MIME sniffing
  X-Content-Type-Options: nosniff

  # Referrer-Policy - Control referrer information
  Referrer-Policy: strict-origin-when-cross-origin

  # Permissions-Policy - Disable unnecessary browser features
  Permissions-Policy: geolocation=(), microphone=(), camera=()

  # X-XSS-Protection - Enable browser XSS filter (legacy, but doesn't hurt)
  X-XSS-Protection: 1; mode=block
"@

    if (!$DryRun) {
        Set-Content -Path "$aidoesitallPath\_headers" -Value $headersContent
        Write-Host "✓ _headers file created" -ForegroundColor Green
    } else {
        Write-Host "WOULD CREATE: $aidoesitallPath\_headers" -ForegroundColor Yellow
    }
}

# Check if index.html exists, copy from root if needed
if (!(Test-Path "$aidoesitallPath\index.html")) {
    Write-Host "index.html not found in landing directory" -ForegroundColor Yellow

    if (Test-Path "C:\AiCollabForTheKids\index.html") {
        Write-Host "Copying index.html from root..." -ForegroundColor White
        if (!$DryRun) {
            Copy-Item "C:\AiCollabForTheKids\index.html" "$aidoesitallPath\index.html"
            Write-Host "✓ index.html copied" -ForegroundColor Green
        } else {
            Write-Host "WOULD COPY: C:\AiCollabForTheKids\index.html -> $aidoesitallPath\index.html" -ForegroundColor Yellow
        }
    } else {
        Write-Host "WARNING: Could not find index.html to copy" -ForegroundColor Red
        Write-Host "Please ensure aidoesitall.website has content to deploy" -ForegroundColor Yellow
    }
}

if ($DryRun) {
    Write-Host "WOULD RUN: npx wrangler pages deploy $aidoesitallPath --project-name=aidoesitall --branch=main" -ForegroundColor Yellow
} else {
    Write-Host "Deploying aidoesitall.website to Cloudflare Pages..." -ForegroundColor White
    $env:CLOUDFLARE_API_TOKEN = $cloudflareApiToken
    $env:CLOUDFLARE_ACCOUNT_ID = $cloudflareAccountId

    Set-Location $aidoesitallPath
    npx wrangler pages deploy . --project-name=aidoesitall --branch=main

    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ aidoesitall.website deployed successfully" -ForegroundColor Green
    } else {
        Write-Host "ERROR: aidoesitall.website deployment failed" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""

# ═══════════════════════════════════════════════════════════════
# VERIFICATION
# ═══════════════════════════════════════════════════════════════
if (!$SkipVerification -and !$DryRun) {
    Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host "VERIFICATION" -ForegroundColor Cyan
    Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host ""

    Write-Host "Waiting 10 seconds for Cloudflare propagation..." -ForegroundColor Yellow
    Start-Sleep -Seconds 10

    $domains = @(
        "https://youandinotai.com",
        "https://youandinotai.online",
        "https://aidoesitall.website"
    )

    foreach ($domain in $domains) {
        Write-Host "Checking headers for $domain..." -ForegroundColor White

        try {
            $response = Invoke-WebRequest -Uri $domain -Method Head -UseBasicParsing

            $headersToCheck = @(
                "Strict-Transport-Security",
                "Content-Security-Policy",
                "X-Frame-Options",
                "X-Content-Type-Options",
                "Referrer-Policy",
                "Permissions-Policy"
            )

            $foundHeaders = 0
            foreach ($header in $headersToCheck) {
                if ($response.Headers[$header]) {
                    Write-Host "  ✓ $header" -ForegroundColor Green
                    $foundHeaders++
                } else {
                    Write-Host "  ✗ $header (NOT FOUND)" -ForegroundColor Red
                }
            }

            if ($foundHeaders -eq $headersToCheck.Count) {
                Write-Host "  ✓ All security headers present ($foundHeaders/$($headersToCheck.Count))" -ForegroundColor Green
            } else {
                Write-Host "  ⚠ Some headers missing ($foundHeaders/$($headersToCheck.Count))" -ForegroundColor Yellow
            }
        } catch {
            Write-Host "  ERROR: Could not check headers: $_" -ForegroundColor Red
        }

        Write-Host ""
    }

    Write-Host "For detailed security analysis, visit:" -ForegroundColor White
    foreach ($domain in $domains) {
        Write-Host "  https://securityheaders.com/?q=$domain" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "DEPLOYMENT COMPLETE" -ForegroundColor Green
Write-Host "FOR THE KIDS - Gospel V1.3 (60/30/10)" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

if ($DryRun) {
    Write-Host "DRY RUN COMPLETE - No changes were made" -ForegroundColor Yellow
    Write-Host "Run without -DryRun to execute" -ForegroundColor Yellow
} else {
    Write-Host "Next steps:" -ForegroundColor White
    Write-Host "1. Update FLEET-STATUS.md with deployment details" -ForegroundColor Gray
    Write-Host "2. Mark security headers task as complete" -ForegroundColor Gray
    Write-Host "3. Monitor sites for 24-48 hours for CSP violations" -ForegroundColor Gray
}

Write-Host ""
