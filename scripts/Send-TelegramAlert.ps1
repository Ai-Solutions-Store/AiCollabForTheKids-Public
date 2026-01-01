# Telegram Alert Script
# FOR THE KIDS - MAXIMUM EFFORT ACTIVATION

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$botToken = "8313006115:AAH5xv4ol7RoScmuM3SAUJgt_93IS6rpblQ"
$chatId = "6244456983"

$message = @"
MAXIMUM EFFORT DEPLOYED

All marketing automation engines are now LIVE across all nodes.

Kickstarter Campaign: ACTIVE
Discord Blast: SENT
Twitter Automation: DEPLOYING
Influencer Outreach: QUEUED

FOR THE KIDS - 60/30/10 IMMUTABLE

Target: Get Kickstarter FUNDED
Status: ALL SYSTEMS GO
"@

$encodedMessage = [Uri]::EscapeDataString($message)
$url = "https://api.telegram.org/bot$botToken/sendMessage?chat_id=$chatId&text=$encodedMessage"

try {
    $response = Invoke-RestMethod -Uri $url -Method Get
    if ($response.ok) {
        Write-Host "Telegram alert sent successfully!" -ForegroundColor Green
    } else {
        Write-Host "Telegram response not OK" -ForegroundColor Yellow
    }
} catch {
    Write-Host "Telegram alert failed: $($_.Exception.Message)" -ForegroundColor Red
}
