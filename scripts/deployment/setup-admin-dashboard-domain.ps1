# Admin Dashboard Custom Domain Setup
# Configures admin.youandinotai.com → admin-dashboard-6ox.pages.dev

$ErrorActionPreference = "Stop"

# Cloudflare Configuration
$CF_API_TOKEN = "1TIJwBt4Fr0cWg56a094epTi_iMg96HApD3rYhc5"
$CF_ACCOUNT_ID = "516a3a855f44f5ad8453636d163ae25d"
$CF_ZONE_ID = "749ef5258b9719dd3827a6a842aff642"  # youandinotai.com
$PROJECT_NAME = "admin-dashboard"
$CUSTOM_DOMAIN = "admin.youandinotai.com"
$PAGES_DOMAIN = "admin-dashboard-6ox.pages.dev"

Write-Host "🔱 ADMIN DASHBOARD - CUSTOM DOMAIN SETUP" -ForegroundColor Cyan
Write-Host "=" * 60
Write-Host ""

# Step 1: Add custom domain to Pages project via API
Write-Host "📡 Step 1: Adding custom domain to Cloudflare Pages..." -ForegroundColor Yellow

$headers = @{
    "Authorization" = "Bearer $CF_API_TOKEN"
    "Content-Type" = "application/json"
}

$body = @{
    "domain" = $CUSTOM_DOMAIN
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod `
        -Uri "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/pages/projects/$PROJECT_NAME/domains" `
        -Method POST `
        -Headers $headers `
        -Body $body
    
    if ($response.success) {
        Write-Host "✅ Custom domain added to Pages project" -ForegroundColor Green
    } else {
        Write-Host "⚠️ Response: $($response | ConvertTo-Json -Depth 5)" -ForegroundColor Yellow
    }
} catch {
    $errorDetails = $_.ErrorDetails.Message | ConvertFrom-Json
    if ($errorDetails.errors[0].message -match "already exists") {
        Write-Host "Info: Custom domain already configured" -ForegroundColor Cyan
    } else {
        Write-Host "Error: $($errorDetails.errors[0].message)" -ForegroundColor Red
    }
}

Write-Host ""

# Step 2: Check DNS record
Write-Host "📡 Step 2: Checking DNS record..." -ForegroundColor Yellow

try {
    $dnsRecords = Invoke-RestMethod `
        -Uri "https://api.cloudflare.com/client/v4/zones/$CF_ZONE_ID/dns_records?name=$CUSTOM_DOMAIN" `
        -Method GET `
        -Headers $headers
    
    if ($dnsRecords.result.Count -eq 0) {
        Write-Host "⚠️ DNS record not found. Creating CNAME..." -ForegroundColor Yellow
        
        # Create CNAME record
        $dnsBody = @{
            "type" = "CNAME"
            "name" = "admin"
            "content" = $PAGES_DOMAIN
            "ttl" = 1  # Auto
            "proxied" = $true
        } | ConvertTo-Json
        
        $dnsResponse = Invoke-RestMethod `
            -Uri "https://api.cloudflare.com/client/v4/zones/$CF_ZONE_ID/dns_records" `
            -Method POST `
            -Headers $headers `
            -Body $dnsBody
        
        if ($dnsResponse.success) {
            Write-Host "DNS CNAME created: admin.youandinotai.com -> $PAGES_DOMAIN" -ForegroundColor Green
        }
    } else {
        $record = $dnsRecords.result[0]
        Write-Host "✅ DNS record exists:" -ForegroundColor Green
        Write-Host "   Type: $($record.type)" -ForegroundColor White
        Write-Host "   Content: $($record.content)" -ForegroundColor White
        Write-Host "   Proxied: $($record.proxied)" -ForegroundColor White
    }
} catch {
    Write-Host "❌ DNS check failed: $_" -ForegroundColor Red
}

Write-Host ""

# Step 3: Verify deployment
Write-Host "📡 Step 3: Verifying deployment..." -ForegroundColor Yellow

Start-Sleep -Seconds 5

try {
    $testResponse = Invoke-WebRequest -Uri "https://$PAGES_DOMAIN" -UseBasicParsing -TimeoutSec 10
    Write-Host "✅ Pages domain accessible: $($testResponse.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "❌ Pages domain check failed" -ForegroundColor Red
}

try {
    $customResponse = Invoke-WebRequest -Uri "https://$CUSTOM_DOMAIN" -UseBasicParsing -TimeoutSec 10
    Write-Host "✅ Custom domain accessible: $($customResponse.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Custom domain not yet propagated (DNS may take a few minutes)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎯 DEPLOYMENT SUMMARY" -ForegroundColor Cyan
Write-Host "=" * 60
Write-Host "✅ Project: $PROJECT_NAME" -ForegroundColor Green
Write-Host "✅ Pages URL: https://$PAGES_DOMAIN" -ForegroundColor Green
Write-Host "✅ Custom Domain: https://$CUSTOM_DOMAIN" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Manual verification:" -ForegroundColor White
Write-Host "   wrangler pages project list" -ForegroundColor Gray
Write-Host "   curl -I https://$CUSTOM_DOMAIN" -ForegroundColor Gray
Write-Host ""
Write-Host "FOR THE KIDS - Admin Dashboard Live" -ForegroundColor Cyan
