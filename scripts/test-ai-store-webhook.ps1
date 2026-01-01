# ═══════════════════════════════════════════════════════════════════════════════
# TEST AI STORE WEBHOOK
# ═══════════════════════════════════════════════════════════════════════════════
#
# Purpose: Test the AI Solutions Store webhook endpoint
# Tests signature verification and payment processing
#
# Usage:
#   .\test-ai-store-webhook.ps1                    # Test with default values
#   .\test-ai-store-webhook.ps1 -Amount 19900      # Test with $199.00 payment
#   .\test-ai-store-webhook.ps1 -NoSignature       # Test without signature (should fail)
#
# FOR THE KIDS - Gospel V1.3
# ═══════════════════════════════════════════════════════════════════════════════

param(
    [int]$Amount = 19900,  # Amount in cents ($199.00)
    [string]$WebhookUrl = "https://combination-pay-resulted-drill.trycloudflare.com/api/webhooks/ai-store",
    [string]$WebhookSecret = "",  # Leave empty to read from .env
    [switch]$NoSignature,
    [switch]$InvalidSignature
)

$ErrorActionPreference = "Stop"

# ═══════════════════════════════════════════════════════════════════════════════
# FUNCTIONS
# ═══════════════════════════════════════════════════════════════════════════════

function Write-Header {
    param([string]$Message)
    Write-Host ""
    Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host " $Message" -ForegroundColor White
    Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host ""
}

function Write-Success {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Write-Info {
    param([string]$Message)
    Write-Host "ℹ️  $Message" -ForegroundColor Cyan
}

function Write-Warning {
    param([string]$Message)
    Write-Host "⚠️  $Message" -ForegroundColor Yellow
}

function Write-Error-Custom {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

function Get-WebhookSecret {
    # Try to read from .env file
    $envPath = "C:\AiCollabForTheKids\api\.env"

    if (Test-Path $envPath) {
        $content = Get-Content $envPath -Raw
        if ($content -match 'SQUARE_AI_STORE_WEBHOOK_SECRET=(.+)') {
            return $matches[1].Trim()
        }
    }

    # Try to read from generated file
    $generatedPath = "C:\AiCollabForTheKids\scripts\webhook-env-update.txt"
    if (Test-Path $generatedPath) {
        $content = Get-Content $generatedPath -Raw
        if ($content -match 'SQUARE_AI_STORE_WEBHOOK_SECRET=(.+)') {
            return $matches[1].Trim()
        }
    }

    return ""
}

function New-WebhookSignature {
    param(
        [string]$Body,
        [string]$Secret
    )

    $hmac = New-Object System.Security.Cryptography.HMACSHA256
    $hmac.Key = [System.Text.Encoding]::UTF8.GetBytes($Secret)
    $hash = $hmac.ComputeHash([System.Text.Encoding]::UTF8.GetBytes($Body))
    $base64 = [Convert]::ToBase64String($hash)

    return $base64
}

# ═══════════════════════════════════════════════════════════════════════════════
# MAIN EXECUTION
# ═══════════════════════════════════════════════════════════════════════════════

Write-Header "AI STORE WEBHOOK TEST"

# Get webhook secret
if ([string]::IsNullOrEmpty($WebhookSecret)) {
    $WebhookSecret = Get-WebhookSecret

    if ([string]::IsNullOrEmpty($WebhookSecret)) {
        Write-Warning "Could not find SQUARE_AI_STORE_WEBHOOK_SECRET"
        Write-Info "Please provide it via -WebhookSecret parameter or add to api/.env"
        exit 1
    }
}

Write-Info "Webhook URL: $WebhookUrl"
Write-Info "Test Amount: $Amount cents ($($Amount / 100) USD)"
Write-Info "Webhook Secret: $($WebhookSecret.Substring(0, 4))..." -ForegroundColor Gray

# Create test payment webhook payload
$payload = @{
    merchant_id = "MLMRKXWVVSNR9"
    type = "payment.created"
    event_id = "evt_test_$(Get-Random)"
    created_at = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
    data = @{
        type = "payment"
        id = "pay_test_$(Get-Random)"
        object = @{
            payment = @{
                id = "pay_test_$(Get-Random)"
                created_at = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
                updated_at = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
                status = "COMPLETED"
                amount_money = @{
                    amount = $Amount
                    currency = "USD"
                }
                location_id = "LY5GN09F5AN83"
                order_id = "order_test_$(Get-Random)"
                receipt_url = "https://squareup.com/receipt/preview/test"
                source_type = "CARD"
            }
        }
    }
} | ConvertTo-Json -Depth 10

Write-Info "Payload:"
Write-Host $payload -ForegroundColor Gray
Write-Host ""

# Calculate signature
$headers = @{
    "Content-Type" = "application/json"
}

if (-not $NoSignature) {
    if ($InvalidSignature) {
        $signature = "invalid_signature_for_testing"
        Write-Warning "Using INVALID signature (should fail)"
    }
    else {
        $signature = New-WebhookSignature -Body $payload -Secret $WebhookSecret
        Write-Info "Signature: $signature"
    }

    $headers["x-square-hmacsha256-signature"] = $signature
}
else {
    Write-Warning "Sending WITHOUT signature (should fail)"
}

Write-Host ""

# Send webhook request
Write-Header "SENDING WEBHOOK REQUEST"

try {
    $response = Invoke-RestMethod -Uri $WebhookUrl `
        -Method POST `
        -Headers $headers `
        -Body $payload `
        -ErrorAction Stop

    Write-Success "Webhook request successful!"
    Write-Host ""
    Write-Host "Response:" -ForegroundColor Green
    Write-Host ($response | ConvertTo-Json -Depth 10) -ForegroundColor White
    Write-Host ""

    if ($response.transactionId) {
        Write-Success "Transaction ID: $($response.transactionId)"
    }

    if ($response.allocationId) {
        Write-Success "Allocation ID: $($response.allocationId)"
        Write-Info "Gospel V1.3 Split:"
        $charityAmount = ($Amount * 0.60) / 100
        $infraAmount = ($Amount * 0.30) / 100
        $founderAmount = ($Amount * 0.10) / 100

        Write-Host "  Charity (60%): $$charityAmount" -ForegroundColor Green
        Write-Host "  Infrastructure (30%): $$infraAmount" -ForegroundColor Cyan
        Write-Host "  Founder (10%): $$founderAmount" -ForegroundColor Yellow
    }

    if ($response.hash) {
        Write-Success "Hash: $($response.hash)"
    }

    Write-Host ""
    Write-Header "TEST PASSED ✅"

}
catch {
    Write-Error-Custom "Webhook request failed"
    Write-Host ""

    if ($_.Exception.Response) {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "Status Code: $statusCode" -ForegroundColor Red

        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()

        Write-Host "Response:" -ForegroundColor Red
        Write-Host $responseBody -ForegroundColor White

        # Check if this was an expected failure
        if ($NoSignature -and $statusCode -eq 403) {
            Write-Host ""
            Write-Success "Expected failure: No signature provided, got 403 Forbidden"
            Write-Header "TEST PASSED ✅"
            exit 0
        }

        if ($InvalidSignature -and $statusCode -eq 403) {
            Write-Host ""
            Write-Success "Expected failure: Invalid signature, got 403 Forbidden"
            Write-Header "TEST PASSED ✅"
            exit 0
        }
    }
    else {
        Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    }

    Write-Host ""
    Write-Header "TEST FAILED ❌"
    exit 1
}

# ═══════════════════════════════════════════════════════════════════════════════
# TEST SUMMARY
# ═══════════════════════════════════════════════════════════════════════════════

Write-Host ""
Write-Host "FOR THE KIDS - Gospel V1.3 (60/30/10)" -ForegroundColor Magenta
Write-Host ""
