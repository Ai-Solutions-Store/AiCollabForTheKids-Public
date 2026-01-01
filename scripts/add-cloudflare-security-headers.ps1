# ═══════════════════════════════════════════════════════════════
# FOR THE KIDS - Add Security Headers to Cloudflare Domains
# Gospel Version: V1.3 (60/30/10)
# Created: 2025-12-17
# Purpose: Add HSTS, CSP, and security headers via Cloudflare API
# ═══════════════════════════════════════════════════════════════

param(
    [switch]$DryRun = $false,
    [switch]$UseUI = $false
)

Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  FOR THE KIDS - Cloudflare Security Headers Setup" -ForegroundColor Green
Write-Host "  Gospel V1.3: 60% to Pediatric Charities" -ForegroundColor Yellow
Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Load environment variables
$envPath = "C:\AiCollabForTheKids\api\.env"
if (!(Test-Path $envPath)) {
    Write-Host "ERROR: .env file not found at $envPath" -ForegroundColor Red
    exit 1
}

# Parse .env file
$env:CLOUDFLARE_EMAIL = (Get-Content $envPath | Select-String "CLOUDFLARE_EMAIL=(.+)").Matches.Groups[1].Value
$env:CLOUDFLARE_API_KEY = (Get-Content $envPath | Select-String "CLOUDFLARE_GLOBAL_API_KEY=(.+)").Matches.Groups[1].Value
$env:CLOUDFLARE_API_TOKEN = (Get-Content $envPath | Select-String "CLOUDFLARE_API_TOKEN=(.+)").Matches.Groups[1].Value

# Domain configurations
$domains = @(
    @{
        Name = "youandinotai.com"
        ZoneId = "155fc19cd87bc1ea8989f0deb210d612"
        Hosts = @("youandinotai.com", "www.youandinotai.com")
        ConnectSrc = "https://dao.youandinotai.com"
    },
    @{
        Name = "youandinotai.online"
        ZoneId = "7f4ea849ea7f19054546127a03a6db54"
        Hosts = @("youandinotai.online", "www.youandinotai.online")
        ConnectSrc = "https://dao.youandinotai.com"
    },
    @{
        Name = "aidoesitall.website"
        ZoneId = "749ef5258b9719dd3827a6a842aff642"
        Hosts = @("aidoesitall.website", "www.aidoesitall.website")
        ConnectSrc = "https://api.aidoesitall.website"
    }
)

Write-Host "Loaded Cloudflare Credentials:" -ForegroundColor Cyan
Write-Host "  Email: $($env:CLOUDFLARE_EMAIL)" -ForegroundColor Gray
Write-Host "  API Key: $($env:CLOUDFLARE_API_KEY.Substring(0,10))..." -ForegroundColor Gray
Write-Host ""

if ($UseUI) {
    Write-Host "═══ MANUAL UI INSTRUCTIONS ═══" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To add security headers via Cloudflare Dashboard:" -ForegroundColor White
    Write-Host ""
    Write-Host "1. Go to: https://dash.cloudflare.com" -ForegroundColor Cyan
    Write-Host "2. Log in with: $($env:CLOUDFLARE_EMAIL)" -ForegroundColor Gray
    Write-Host ""

    foreach ($domain in $domains) {
        Write-Host "FOR DOMAIN: $($domain.Name)" -ForegroundColor Green
        Write-Host "  a. Select domain → Rules → Transform Rules → Modify Response Header" -ForegroundColor Gray
        Write-Host "  b. Create rule: 'Security Headers - FOR THE KIDS'" -ForegroundColor Gray
        Write-Host "  c. Expression: (http.host eq `"$($domain.Hosts[0])`" or http.host eq `"$($domain.Hosts[1])`")" -ForegroundColor Gray
        Write-Host "  d. Add these headers (Set static):" -ForegroundColor Gray
        Write-Host "     - Strict-Transport-Security: max-age=31536000; includeSubDomains; preload" -ForegroundColor DarkGray
        Write-Host "     - X-Frame-Options: SAMEORIGIN" -ForegroundColor DarkGray
        Write-Host "     - X-Content-Type-Options: nosniff" -ForegroundColor DarkGray
        Write-Host "     - Referrer-Policy: strict-origin-when-cross-origin" -ForegroundColor DarkGray
        Write-Host "     - Permissions-Policy: geolocation=(), microphone=(), camera=()" -ForegroundColor DarkGray
        Write-Host "     - Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://sandbox.web.squarecdn.com https://web.squarecdn.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' $($domain.ConnectSrc);" -ForegroundColor DarkGray
        Write-Host ""
    }

    Write-Host "Press any key to exit..." -ForegroundColor Yellow
    $null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
    exit 0
}

# API Implementation
Write-Host "═══ CLOUDFLARE API METHOD ═══" -ForegroundColor Yellow
Write-Host ""

foreach ($domain in $domains) {
    Write-Host "Processing: $($domain.Name)" -ForegroundColor Green

    # Build CSP header value
    $cspValue = "default-src 'self'; script-src 'self' 'unsafe-inline' https://sandbox.web.squarecdn.com https://web.squarecdn.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' $($domain.ConnectSrc);"

    # Build host expression
    $hostExpression = "(" + (($domain.Hosts | ForEach-Object { "http.host eq `"$_`"" }) -join " or ") + ")"

    # Build API request body
    $requestBody = @{
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
                            value = $cspValue
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
                expression = $hostExpression
                description = "FOR THE KIDS - Security headers for $($domain.Name) (Gospel V1.3)"
                enabled = $true
            }
        )
    } | ConvertTo-Json -Depth 10

    $apiUrl = "https://api.cloudflare.com/client/v4/zones/$($domain.ZoneId)/rulesets/phases/http_response_headers_transform/entrypoint"

    if ($DryRun) {
        Write-Host "  [DRY RUN] Would POST to: $apiUrl" -ForegroundColor Yellow
        Write-Host "  [DRY RUN] Request body:" -ForegroundColor Yellow
        Write-Host $requestBody -ForegroundColor DarkGray
        Write-Host ""
        continue
    }

    try {
        $headers = @{
            "X-Auth-Email" = $env:CLOUDFLARE_EMAIL
            "X-Auth-Key" = $env:CLOUDFLARE_API_KEY
            "Content-Type" = "application/json"
        }

        Write-Host "  Sending API request..." -ForegroundColor Cyan
        $response = Invoke-RestMethod -Uri $apiUrl -Method POST -Headers $headers -Body $requestBody -ErrorAction Stop

        if ($response.success) {
            Write-Host "  ✓ SUCCESS: Security headers added to $($domain.Name)" -ForegroundColor Green
            Write-Host "    Rule ID: $($response.result.id)" -ForegroundColor Gray
        } else {
            Write-Host "  ✗ FAILED: $($response.errors | ConvertTo-Json)" -ForegroundColor Red
        }
    } catch {
        Write-Host "  ✗ ERROR: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host "    Response: $($_.ErrorDetails.Message)" -ForegroundColor DarkRed
    }

    Write-Host ""
}

Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  VERIFICATION STEPS" -ForegroundColor Yellow
Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "Test headers with curl:" -ForegroundColor White
foreach ($domain in $domains) {
    Write-Host "  curl -I https://$($domain.Hosts[0]) | grep -E `"Strict-Transport|Content-Security|X-Frame`"" -ForegroundColor Gray
}
Write-Host ""
Write-Host "Online checker:" -ForegroundColor White
foreach ($domain in $domains) {
    Write-Host "  https://securityheaders.com/?q=https://$($domain.Hosts[0])" -ForegroundColor Cyan
}
Write-Host ""
Write-Host "Target: A grade or higher" -ForegroundColor Green
Write-Host ""
Write-Host "FOR THE KIDS - Gospel V1.3 (60/30/10)" -ForegroundColor Yellow
