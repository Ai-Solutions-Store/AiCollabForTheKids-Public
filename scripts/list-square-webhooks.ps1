# Square Webhook List Script
# Lists all webhooks for ebaytrashortreasure account

param(
    [switch]$Detailed,
    [switch]$Json
)

$ErrorActionPreference = "Stop"

$SQUARE_ACCESS_TOKEN = "EAAAl8Pw2wm_0UfULPe5YdBdWWSnOC2WifHYbAoxk7BQndbM2K-UDAD74Es1Nya8"
$SQUARE_API_VERSION = "2025-10-16"
$SQUARE_BASE_URL = "https://connect.squareup.com"

Write-Host ""
Write-Host "SQUARE WEBHOOK SUBSCRIPTIONS" -ForegroundColor Cyan
Write-Host "Account: ebaytrashortreasure@gmail.com" -ForegroundColor Gray
Write-Host ""

$headers = @{
    "Square-Version" = $SQUARE_API_VERSION
    "Authorization" = "Bearer $SQUARE_ACCESS_TOKEN"
    "Content-Type" = "application/json"
}

try {
    $response = Invoke-RestMethod -Uri "$SQUARE_BASE_URL/v2/webhooks/subscriptions" -Method GET -Headers $headers

    if ($Json) {
        Write-Host ($response | ConvertTo-Json -Depth 10)
        exit 0
    }

    if ($response.subscriptions -and $response.subscriptions.Count -gt 0) {
        Write-Host "Found $($response.subscriptions.Count) webhook(s)" -ForegroundColor Green
        Write-Host ""

        foreach ($sub in $response.subscriptions) {
            Write-Host "ID: $($sub.id)" -ForegroundColor Yellow
            Write-Host "Name: $($sub.name)" -ForegroundColor White
            Write-Host "URL: $($sub.notification_url)" -ForegroundColor Cyan
            Write-Host "Enabled: $($sub.enabled)" -ForegroundColor $(if ($sub.enabled) { "Green" } else { "Red" })
            Write-Host "Events: $($sub.event_types -join ', ')" -ForegroundColor Gray
            
            if ($Detailed) {
                Write-Host "Signature Key: $($sub.signature_key)" -ForegroundColor Magenta
                Write-Host "API Version: $($sub.api_version)" -ForegroundColor Gray
                Write-Host "Created: $($sub.created_at)" -ForegroundColor Gray
            }
            
            Write-Host ""
        }
    }
    else {
        Write-Host "No webhooks found" -ForegroundColor Yellow
    }
}
catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
