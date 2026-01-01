# ═══════════════════════════════════════════════════════════════════════════════
# SQUARE WEBHOOK SUBSCRIPTION SETUP - AI SOLUTIONS STORE
# ═══════════════════════════════════════════════════════════════════════════════
#
# Purpose: Registers a Square webhook subscription for AI Solutions Store
# Account: ebaytrashortreasure@gmail.com
# Location: LY5GN09F5AN83
#
# This webhook will trigger on:
# - payment.created - When a payment is created
# - payment.updated - When a payment status changes
# - order.created - When an order is created
# - order.updated - When an order is updated
# - refund.created - When a refund is created
#
# FOR THE KIDS - Gospel V1.3 (60/30/10 Split)
# ═══════════════════════════════════════════════════════════════════════════════

param(
    [string]$NotificationUrl = "https://combination-pay-resulted-drill.trycloudflare.com/api/webhooks/ai-store",
    [switch]$Test,
    [switch]$Delete,
    [string]$SubscriptionId
)

# ═══════════════════════════════════════════════════════════════════════════════
# CONFIGURATION
# ═══════════════════════════════════════════════════════════════════════════════

$ErrorActionPreference = "Stop"

# Square API Configuration (ebaytrashortreasure account)
$SQUARE_ACCESS_TOKEN = "EAAAl8Pw2wm_0UfULPe5YdBdWWSnOC2WifHYbAoxk7BQndbM2K-UDAD74Es1Nya8"
$SQUARE_LOCATION_ID = "LY5GN09F5AN83"
$SQUARE_API_VERSION = "2025-10-16"
$SQUARE_BASE_URL = "https://connect.squareup.com"

# Webhook Configuration
$WEBHOOK_NAME = "AI Solutions Store Delivery"
$EVENT_TYPES = @(
    "payment.created",
    "payment.updated",
    "order.created",
    "order.updated",
    "refund.created"
)

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

function Write-Error {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

function Get-SquareWebhookSubscriptions {
    Write-Info "Fetching existing webhook subscriptions..."

    $headers = @{
        "Square-Version" = $SQUARE_API_VERSION
        "Authorization" = "Bearer $SQUARE_ACCESS_TOKEN"
        "Content-Type" = "application/json"
    }

    try {
        $response = Invoke-RestMethod -Uri "$SQUARE_BASE_URL/v2/webhooks/subscriptions" `
            -Method GET `
            -Headers $headers

        return $response
    }
    catch {
        Write-Error "Failed to fetch webhook subscriptions: $($_.Exception.Message)"
        if ($_.Exception.Response) {
            $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
            $responseBody = $reader.ReadToEnd()
            Write-Host $responseBody
        }
        throw
    }
}

function New-SquareWebhookSubscription {
    param(
        [string]$NotificationUrl,
        [string[]]$EventTypes
    )

    Write-Info "Creating new webhook subscription..."
    Write-Info "Notification URL: $NotificationUrl"
    Write-Info "Events: $($EventTypes -join ', ')"

    $headers = @{
        "Square-Version" = $SQUARE_API_VERSION
        "Authorization" = "Bearer $SQUARE_ACCESS_TOKEN"
        "Content-Type" = "application/json"
    }

    # Generate idempotency key
    $idempotencyKey = [guid]::NewGuid().ToString()

    $body = @{
        idempotency_key = $idempotencyKey
        subscription = @{
            name = $WEBHOOK_NAME
            event_types = $EventTypes
            notification_url = $NotificationUrl
            api_version = $SQUARE_API_VERSION
        }
    } | ConvertTo-Json -Depth 10

    Write-Info "Request body:"
    Write-Host $body -ForegroundColor Gray

    try {
        $response = Invoke-RestMethod -Uri "$SQUARE_BASE_URL/v2/webhooks/subscriptions" `
            -Method POST `
            -Headers $headers `
            -Body $body

        return $response
    }
    catch {
        Write-Error "Failed to create webhook subscription: $($_.Exception.Message)"
        if ($_.Exception.Response) {
            $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
            $responseBody = $reader.ReadToEnd()
            Write-Host $responseBody
        }
        throw
    }
}

function Remove-SquareWebhookSubscription {
    param([string]$SubscriptionId)

    Write-Info "Deleting webhook subscription: $SubscriptionId"

    $headers = @{
        "Square-Version" = $SQUARE_API_VERSION
        "Authorization" = "Bearer $SQUARE_ACCESS_TOKEN"
        "Content-Type" = "application/json"
    }

    try {
        $response = Invoke-RestMethod -Uri "$SQUARE_BASE_URL/v2/webhooks/subscriptions/$SubscriptionId" `
            -Method DELETE `
            -Headers $headers

        return $response
    }
    catch {
        Write-Error "Failed to delete webhook subscription: $($_.Exception.Message)"
        if ($_.Exception.Response) {
            $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
            $responseBody = $reader.ReadToEnd()
            Write-Host $responseBody
        }
        throw
    }
}

function Test-SquareWebhookSubscription {
    param([string]$SubscriptionId)

    Write-Info "Testing webhook subscription: $SubscriptionId"

    $headers = @{
        "Square-Version" = $SQUARE_API_VERSION
        "Authorization" = "Bearer $SQUARE_ACCESS_TOKEN"
        "Content-Type" = "application/json"
    }

    try {
        $response = Invoke-RestMethod -Uri "$SQUARE_BASE_URL/v2/webhooks/subscriptions/$SubscriptionId/test" `
            -Method POST `
            -Headers $headers

        return $response
    }
    catch {
        Write-Warning "Test endpoint may not be available in production API"
        Write-Info "Manual testing recommended using Square Dashboard"
        return $null
    }
}

# ═══════════════════════════════════════════════════════════════════════════════
# MAIN EXECUTION
# ═══════════════════════════════════════════════════════════════════════════════

Write-Header "SQUARE WEBHOOK SETUP - AI SOLUTIONS STORE"

Write-Info "Account: ebaytrashortreasure@gmail.com"
Write-Info "Location: $SQUARE_LOCATION_ID"
Write-Info "API Version: $SQUARE_API_VERSION"
Write-Host ""

# DELETE MODE
if ($Delete) {
    if (-not $SubscriptionId) {
        Write-Error "SubscriptionId parameter required for delete operation"
        exit 1
    }

    Write-Header "DELETE WEBHOOK SUBSCRIPTION"
    $result = Remove-SquareWebhookSubscription -SubscriptionId $SubscriptionId
    Write-Success "Webhook subscription deleted successfully"
    Write-Host ($result | ConvertTo-Json -Depth 10)
    exit 0
}

# LIST EXISTING WEBHOOKS
Write-Header "EXISTING WEBHOOK SUBSCRIPTIONS"

try {
    $existing = Get-SquareWebhookSubscriptions

    if ($existing.subscriptions -and $existing.subscriptions.Count -gt 0) {
        Write-Info "Found $($existing.subscriptions.Count) existing webhook(s):"
        Write-Host ""

        foreach ($sub in $existing.subscriptions) {
            Write-Host "  ID: $($sub.id)" -ForegroundColor Yellow
            Write-Host "  Name: $($sub.name)" -ForegroundColor White
            Write-Host "  URL: $($sub.notification_url)" -ForegroundColor Gray
            Write-Host "  Enabled: $($sub.enabled)" -ForegroundColor $(if ($sub.enabled) { "Green" } else { "Red" })
            Write-Host "  Events: $($sub.event_types -join ', ')" -ForegroundColor Gray
            Write-Host "  Created: $($sub.created_at)" -ForegroundColor Gray
            Write-Host ""

            # Check if our webhook already exists
            if ($sub.notification_url -eq $NotificationUrl) {
                Write-Warning "Webhook for this URL already exists!"
                Write-Info "To update, delete the existing webhook and create a new one"
                Write-Info "Delete command: .\setup-ai-store-webhook.ps1 -Delete -SubscriptionId $($sub.id)"
                exit 0
            }
        }
    }
    else {
        Write-Info "No existing webhook subscriptions found"
    }
}
catch {
    Write-Warning "Could not fetch existing webhooks (continuing anyway)"
}

# CREATE NEW WEBHOOK
Write-Header "CREATE NEW WEBHOOK SUBSCRIPTION"

try {
    $result = New-SquareWebhookSubscription -NotificationUrl $NotificationUrl -EventTypes $EVENT_TYPES

    if ($result.subscription) {
        Write-Success "Webhook subscription created successfully!"
        Write-Host ""

        $sub = $result.subscription

        Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Green
        Write-Host " WEBHOOK SUBSCRIPTION DETAILS" -ForegroundColor White
        Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Green
        Write-Host ""
        Write-Host "  Subscription ID: " -NoNewline; Write-Host $sub.id -ForegroundColor Yellow
        Write-Host "  Name: " -NoNewline; Write-Host $sub.name -ForegroundColor White
        Write-Host "  Notification URL: " -NoNewline; Write-Host $sub.notification_url -ForegroundColor Cyan
        Write-Host "  API Version: " -NoNewline; Write-Host $sub.api_version -ForegroundColor White
        Write-Host "  Enabled: " -NoNewline; Write-Host $sub.enabled -ForegroundColor Green
        Write-Host "  Created: " -NoNewline; Write-Host $sub.created_at -ForegroundColor Gray
        Write-Host ""
        Write-Host "  SIGNATURE KEY: " -NoNewline; Write-Host $sub.signature_key -ForegroundColor Magenta -BackgroundColor Black
        Write-Host ""
        Write-Host "  Event Types:" -ForegroundColor White
        foreach ($event in $sub.event_types) {
            Write-Host "    - $event" -ForegroundColor Gray
        }
        Write-Host ""
        Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Green
        Write-Host ""

        # Save to .env update file
        $envUpdatePath = "C:\AiCollabForTheKids\scripts\webhook-env-update.txt"
        $envUpdate = @"
# ═══════════════════════════════════════════════════════════════
# AI SOLUTIONS STORE WEBHOOK CONFIGURATION
# Add these to your api/.env file
# Generated: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
# ═══════════════════════════════════════════════════════════════

SQUARE_AI_STORE_WEBHOOK_ID=$($sub.id)
SQUARE_AI_STORE_WEBHOOK_SECRET=$($sub.signature_key)
SQUARE_AI_STORE_WEBHOOK_URL=$($sub.notification_url)

# ═══════════════════════════════════════════════════════════════
# USAGE INSTRUCTIONS
# ═══════════════════════════════════════════════════════════════
#
# 1. Add these variables to C:\AiCollabForTheKids\api\.env
# 2. Update api/routes/webhooks.js to handle /api/webhooks/ai-store route
# 3. Verify signature using SQUARE_AI_STORE_WEBHOOK_SECRET
# 4. Test webhook using Square Dashboard or send test payment
#
# Webhook will trigger on:
# - payment.created
# - payment.updated
# - order.created
# - order.updated
# - refund.created
#
# FOR THE KIDS - Gospel V1.3 (60/30/10)
# ═══════════════════════════════════════════════════════════════
"@

        $envUpdate | Out-File -FilePath $envUpdatePath -Encoding UTF8
        Write-Success "Environment variables saved to: $envUpdatePath"
        Write-Info "Add these to your api/.env file"
        Write-Host ""

        # Save full response
        $responseJsonPath = "C:\AiCollabForTheKids\scripts\webhook-response.json"
        $result | ConvertTo-Json -Depth 10 | Out-File -FilePath $responseJsonPath -Encoding UTF8
        Write-Success "Full response saved to: $responseJsonPath"
        Write-Host ""

        # TEST MODE
        if ($Test) {
            Write-Header "TESTING WEBHOOK SUBSCRIPTION"
            $testResult = Test-SquareWebhookSubscription -SubscriptionId $sub.id
            if ($testResult) {
                Write-Success "Test webhook sent successfully"
                Write-Host ($testResult | ConvertTo-Json -Depth 10)
            }
        }

        Write-Header "NEXT STEPS"
        Write-Host "1. Add the SQUARE_AI_STORE_WEBHOOK_SECRET to api/.env" -ForegroundColor Yellow
        Write-Host "2. Implement webhook handler at /api/webhooks/ai-store" -ForegroundColor Yellow
        Write-Host "3. Verify signature in webhook handler" -ForegroundColor Yellow
        Write-Host "4. Test with a real payment or use Square Dashboard" -ForegroundColor Yellow
        Write-Host ""
        Write-Success "Webhook setup complete!"
        Write-Host ""
        Write-Host "FOR THE KIDS - Gospel V1.3 (60/30/10)" -ForegroundColor Magenta

    }
    else {
        Write-Error "No subscription returned in response"
        Write-Host ($result | ConvertTo-Json -Depth 10)
        exit 1
    }
}
catch {
    Write-Error "Failed to create webhook subscription"
    exit 1
}
