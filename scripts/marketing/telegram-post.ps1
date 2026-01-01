# AI Solutions Store - Telegram Marketing
# Posts to Telegram channel via Bot API
# FOR THE KIDS - 60/30/10

param(
    [switch]$DryRun
)

$LogFile = "C:\AiCollabForTheKids\logs\telegram-marketing.log"
$StoreUrl = "https://ai-solutions.store"

# Ensure logs directory exists
$LogDir = Split-Path $LogFile -Parent
if (-not (Test-Path $LogDir)) {
    New-Item -ItemType Directory -Path $LogDir -Force | Out-Null
}

function Write-Log {
    param([string]$Message, [string]$Level = "INFO")
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logMessage = "[$timestamp] [$Level] $Message"
    Add-Content -Path $LogFile -Value $logMessage -ErrorAction SilentlyContinue
    Write-Host $Message
}

Write-Host ""
Write-Host "AI SOLUTIONS STORE - TELEGRAM MARKETING" -ForegroundColor Cyan
Write-Host ""

Write-Log "Script started"

# Check for required environment variables
$BotToken = $env:TELEGRAM_BOT_TOKEN
$ChannelId = $env:TELEGRAM_CHANNEL_ID

if (-not $BotToken) {
    Write-Log "TELEGRAM_BOT_TOKEN environment variable not set!" "ERROR"
    exit 1
}

if (-not $ChannelId) {
    Write-Log "TELEGRAM_CHANNEL_ID environment variable not set!" "ERROR"
    exit 1
}

Write-Log "Environment validated - Bot token and channel ID found"

# Products array
$Products = @(
    @{ Name = "Claude Droid"; Price = 299; Emoji = "robot"; Desc = "YouTube automation with Claude AI" },
    @{ Name = "Income Droid"; Price = 499; Emoji = "money"; Desc = "Passive income video generator" },
    @{ Name = "Marketing Engine"; Price = 199; Emoji = "rocket"; Desc = "Multi-platform social automation" },
    @{ Name = "Jules AI"; Price = 399; Emoji = "brain"; Desc = "Enterprise AI workflow assistant" },
    @{ Name = "Affiliate System"; Price = 599; Emoji = "link"; Desc = "White-label affiliate platform" },
    @{ Name = "Dating Platform"; Price = 2499; Emoji = "heart"; Desc = "AI-powered dating app" }
)

# Select product based on day of month
$dayOfMonth = (Get-Date).Day
$productIndex = ($dayOfMonth - 1) % $Products.Count
$product = $Products[$productIndex]

# Build message
$message = @"
NEW: $($product.Name)

$($product.Desc)

Price: `$$($product.Price) (one-time)

🚀 AI automation that pays for itself

Get Started: $StoreUrl
"@

Write-Log "Selected product: $($product.Name)"

if ($DryRun) {
    Write-Host ""
    Write-Host "=== DRY RUN - Would post: ===" -ForegroundColor Yellow
    Write-Host $message
    Write-Host "=== End of message ===" -ForegroundColor Yellow
    Write-Log "Dry run complete"
    exit 0
}

# Send to Telegram
$apiUrl = "https://api.telegram.org/bot$BotToken/sendMessage"

$body = @{
    chat_id = $ChannelId
    text = $message
    parse_mode = "Markdown"
} | ConvertTo-Json -Depth 10

try {
    $response = Invoke-RestMethod -Uri $apiUrl -Method Post -ContentType "application/json" -Body $body

    if ($response.ok) {
        Write-Log "Successfully posted to Telegram channel" "SUCCESS"
        Write-Host "Message posted successfully!" -ForegroundColor Green
    } else {
        Write-Log "Telegram API returned error: $($response | ConvertTo-Json)" "ERROR"
        exit 1
    }
} catch {
    Write-Log "Failed to post to Telegram: $($_.Exception.Message)" "ERROR"
    exit 1
}

Write-Log "Script completed"
