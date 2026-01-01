# ═══════════════════════════════════════════════════════════════
# AI SOLUTIONS STORE - TWITTER MARKETING AUTOMATION
# ═══════════════════════════════════════════════════════════════
# Purpose: Post promotional tweets for AI Solutions Store
# Service: $1 AI consultation + AI automation services
# URL: https://ai-solutions.store
# Platform: Twitter API v2 with OAuth 1.0a
# ═══════════════════════════════════════════════════════════════

# Twitter OAuth 1.0a Credentials (from api/.env)
$ConsumerKey = "HNEdtJnPKYA8BVANqZVKDKKPA"
$ConsumerSecret = "Abht6DC5bYJegI46Cmi3i57CXGd20neWYjL89l3olOLib06vw2"
$AccessToken = "968810237116461056-e9rZo5CaFD3R5Lm8iJfvLs2qNi8J0hX"
$AccessTokenSecret = "Dx2ZF7YWVjVRVFkhAE4Edkt1516l6EggXcvgt6y7CHIS0"

# Tweet Variations - Rotate through different messages to avoid repetition
$TweetVariations = @(
    "Stuck with manual processes? Let AI do the heavy lifting.`n`nAI Solutions Store:`n- `$1 consultation (yes, really)`n- Custom AI automation`n- Business process optimization`n`nStart with `$1. Scale when ready.`n`nhttps://ai-solutions.store`n#AIAutomation #BusinessAutomation",
    "Built a YouTube automation system that creates Shorts while I sleep.`n`nNow selling it at ai-solutions.store`n`nClaude Droid: `$299 one-time`n- Auto content from RSS feeds`n- AI script generation`n- Automatic uploads`n`nNo subscriptions. Own it forever.`n#AI #ContentCreation",
    "Stop paying monthly subscriptions for AI tools.`n`nOur products are one-time purchases:`n- Claude Droid `$299`n- Income Droid `$499`n- Marketing Engine `$199`n`nOwn the code. Run it yourself.`n`nhttps://ai-solutions.store`n#AITools #NoSubscription",
    "I automate 4 YouTube videos daily without touching my keyboard.`n`nThe system:`n- Pulls trending news`n- Generates scripts with Claude AI`n- Renders with FFmpeg`n- Uploads automatically`n`nAvailable at ai-solutions.store`n#Automation #PassiveIncome",
    "Marketing is necessary but repetitive.`n`nBuilt a 24/7 engine that posts to:`n- Twitter`n- Discord`n- Reddit`n- Telegram`n`nNow it runs while I build.`n`nhttps://ai-solutions.store/marketing-engine`n#MarketingAutomation",
    "`$1 gets you:`n- 30-min AI consultation`n- Custom automation advice`n- No upsells, no pressure`n`nJust honest guidance on AI tools.`n`nBook at ai-solutions.store`n#AIConsulting"
)

# Select tweet based on hour to rotate through variations
$hourOfDay = (Get-Date).Hour
$tweetIndex = $hourOfDay % $TweetVariations.Count
$TweetText = $TweetVariations[$tweetIndex]

Write-Host "Selected tweet variation: $($tweetIndex + 1) of $($TweetVariations.Count)" -ForegroundColor Gray

# ═══════════════════════════════════════════════════════════════
# OAUTH 1.0A HELPER FUNCTIONS
# ═══════════════════════════════════════════════════════════════

function Get-UrlEncode {
    <#
    .SYNOPSIS
    RFC 3986 compliant URL encoding for OAuth 1.0a

    .DESCRIPTION
    Twitter requires strict RFC 3986 encoding for OAuth signatures.
    Standard .NET encoding doesn't handle all special characters correctly.
    #>
    param([string]$str)

    $encoded = [System.Uri]::EscapeDataString($str)
    $encoded = $encoded -replace '\+', '%2B'
    $encoded = $encoded -replace '!', '%21'
    $encoded = $encoded -replace '\*', '%2A'
    $encoded = $encoded -replace "'", '%27'
    $encoded = $encoded -replace '\(', '%28'
    $encoded = $encoded -replace '\)', '%29'

    return $encoded
}

function Get-OAuthSignature {
    <#
    .SYNOPSIS
    Generate HMAC-SHA1 signature for OAuth 1.0a authentication

    .DESCRIPTION
    Creates the OAuth signature required by Twitter API v2:
    1. Sort OAuth parameters alphabetically
    2. Build parameter string (key=value&key=value...)
    3. Create signature base string (METHOD&URL&PARAMS)
    4. Generate HMAC-SHA1 hash using signing key
    5. Return base64-encoded signature

    .PARAMETER Method
    HTTP method (GET, POST, etc.)

    .PARAMETER Url
    Full API endpoint URL

    .PARAMETER OAuthParams
    Hashtable of OAuth parameters (consumer key, nonce, timestamp, etc.)
    #>
    param(
        [string]$Method,
        [string]$Url,
        [hashtable]$OAuthParams
    )

    # Sort parameters alphabetically (OAuth 1.0a requirement)
    $sortedParams = $OAuthParams.GetEnumerator() | Sort-Object Name

    # Build parameter string: key1=value1&key2=value2&...
    $paramString = ($sortedParams | ForEach-Object {
        "$(Get-UrlEncode $_.Name)=$(Get-UrlEncode $_.Value)"
    }) -join "&"

    # Build signature base string: METHOD&URL&PARAMS
    $baseString = "$Method&$(Get-UrlEncode $Url)&$(Get-UrlEncode $paramString)"

    # Build signing key: CONSUMER_SECRET&ACCESS_TOKEN_SECRET
    $signingKey = "$(Get-UrlEncode $ConsumerSecret)&$(Get-UrlEncode $AccessTokenSecret)"

    # Generate HMAC-SHA1 signature
    $hmac = New-Object System.Security.Cryptography.HMACSHA1
    $hmac.Key = [System.Text.Encoding]::UTF8.GetBytes($signingKey)
    $hash = $hmac.ComputeHash([System.Text.Encoding]::UTF8.GetBytes($baseString))

    # Return base64-encoded signature
    [Convert]::ToBase64String($hash)
}

# ═══════════════════════════════════════════════════════════════
# TWITTER API v2 POST REQUEST
# ═══════════════════════════════════════════════════════════════

Write-Host "`n═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "AI SOLUTIONS STORE - TWITTER MARKETING" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════════`n" -ForegroundColor Cyan

# Generate OAuth parameters
$timestamp = [int][double]::Parse((Get-Date -UFormat %s))
$nonce = [guid]::NewGuid().ToString("N")
$url = "https://api.twitter.com/2/tweets"

Write-Host "Generating OAuth 1.0a signature..." -ForegroundColor Yellow

$oauthParams = [ordered]@{
    oauth_consumer_key = $ConsumerKey
    oauth_nonce = $nonce
    oauth_signature_method = "HMAC-SHA1"
    oauth_timestamp = $timestamp.ToString()
    oauth_token = $AccessToken
    oauth_version = "1.0"
}

# Generate signature
$signature = Get-OAuthSignature -Method "POST" -Url $url -OAuthParams $oauthParams

# Build Authorization header
$authParts = @()
foreach ($key in $oauthParams.Keys) {
    $authParts += "$key=`"$(Get-UrlEncode $oauthParams[$key])`""
}
$authParts += "oauth_signature=`"$(Get-UrlEncode $signature)`""

$authHeader = "OAuth " + ($authParts -join ", ")

# Build request body
$bodyObj = @{ text = $TweetText }
$body = $bodyObj | ConvertTo-Json -Compress

# Build headers
$headers = @{
    "Authorization" = $authHeader
    "Content-Type" = "application/json"
}

# ═══════════════════════════════════════════════════════════════
# POST TWEET TO TWITTER
# ═══════════════════════════════════════════════════════════════

Write-Host "Posting tweet to Twitter API v2..." -ForegroundColor Yellow

try {
    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body

    Write-Host "`n═══════════════════════════════════════════════════════════════" -ForegroundColor Green
    Write-Host "SUCCESS - TWEET POSTED!" -ForegroundColor Green
    Write-Host "═══════════════════════════════════════════════════════════════`n" -ForegroundColor Green

    Write-Host "Tweet ID: $($response.data.id)" -ForegroundColor White
    Write-Host "View at: https://twitter.com/AiCollab4Kids/status/$($response.data.id)" -ForegroundColor Cyan

    Write-Host "`nTweet Content:" -ForegroundColor Yellow
    Write-Host "───────────────────────────────────────────────────────────────" -ForegroundColor DarkGray
    Write-Host $TweetText -ForegroundColor White
    Write-Host "───────────────────────────────────────────────────────────────`n" -ForegroundColor DarkGray

    # Log success
    $logEntry = "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] SUCCESS - Tweet ID: $($response.data.id)"
    Add-Content -Path "C:\AiCollabForTheKids\logs\twitter-marketing.log" -Value $logEntry -ErrorAction SilentlyContinue

    exit 0
}
catch {
    Write-Host "`n═══════════════════════════════════════════════════════════════" -ForegroundColor Red
    Write-Host "ERROR - TWEET FAILED" -ForegroundColor Red
    Write-Host "═══════════════════════════════════════════════════════════════`n" -ForegroundColor Red

    # Extract error details
    if ($_.Exception.Response) {
        $errorStream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($errorStream)
        $errorBody = $reader.ReadToEnd()
        Write-Host "Twitter API Error:" -ForegroundColor Yellow
        Write-Host $errorBody -ForegroundColor Red
    }
    else {
        Write-Host "PowerShell Error:" -ForegroundColor Yellow
        Write-Host $_.Exception.Message -ForegroundColor Red
    }

    Write-Host "`nTroubleshooting:" -ForegroundColor Yellow
    Write-Host "1. Verify credentials in api/.env" -ForegroundColor White
    Write-Host "2. Check Twitter API access at developer.twitter.com" -ForegroundColor White
    Write-Host "3. Ensure OAuth 1.0a write permissions are enabled" -ForegroundColor White
    Write-Host "4. Check rate limits (50 tweets per 24 hours)" -ForegroundColor White

    # Log failure
    $logEntry = "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] FAILED - $($_.Exception.Message)"
    Add-Content -Path "C:\AiCollabForTheKids\logs\twitter-marketing.log" -Value $logEntry -ErrorAction SilentlyContinue

    exit 1
}

# ═══════════════════════════════════════════════════════════════
# SCRIPT INFORMATION
# ═══════════════════════════════════════════════════════════════
# Created: 2025-12-21
# Purpose: AI Solutions Store marketing automation
# Account: @AiCollab4Kids
# Service: https://ai-solutions.store
# Auth: OAuth 1.0a (HMAC-SHA1)
# API: Twitter API v2 (/2/tweets endpoint)
# Rate Limit: 50 tweets per 24 hours
# ═══════════════════════════════════════════════════════════════
