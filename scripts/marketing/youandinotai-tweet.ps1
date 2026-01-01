# ═══════════════════════════════════════════════════════════════
# YOUANDINOTAI DATING APP - TWITTER MARKETING
# ═══════════════════════════════════════════════════════════════
# Business First: Sell on product merit, NO charity mentions
# FOR THE KIDS - Gospel handles the 60/30/10 silently
# ═══════════════════════════════════════════════════════════════

param(
    [int]$Variation = -1,
    [switch]$DryRun
)

$ErrorActionPreference = "Stop"

# Load environment variables
$envPath = "C:\AiCollabForTheKids\api\.env"
if (Test-Path $envPath) {
    Get-Content $envPath | ForEach-Object {
        if ($_ -match '^([^#=]+)=(.*)$') {
            $key = $matches[1].Trim()
            $value = $matches[2].Trim()
            [Environment]::SetEnvironmentVariable($key, $value, "Process")
        }
    }
}

# Twitter API Credentials
$ApiKey = $env:TWITTER_API_KEY
$ApiSecret = $env:TWITTER_API_SECRET
$AccessToken = $env:TWITTER_ACCESS_TOKEN
$AccessTokenSecret = $env:TWITTER_ACCESS_TOKEN_SECRET

if (-not $ApiKey -or -not $ApiSecret -or -not $AccessToken -or -not $AccessTokenSecret) {
    Write-Host "ERROR: Missing Twitter credentials in environment" -ForegroundColor Red
    exit 1
}

# Tweet variations - ALL BUSINESS FIRST (no charity mentions!)
$TweetVariations = @(
    @"
Tired of fake profiles and bots on dating apps?

YouAndINotAI uses AI verification to keep it REAL:
✅ Face verification (no catfish)
✅ AI-powered matching
✅ Real humans only

Find genuine connections.

https://youandinotai.com

#DatingApp #OnlineDating #AIVerification
"@,
    @"
The problem with dating apps: 30% are fake profiles.

The solution: AI verification that actually works.

YouAndINotAI:
- Verified humans only
- Smart matching that learns
- No subscription traps

Real people. Real connections.

https://youandinotai.com
"@,
    @"
Every match is verified. Every profile is real.

YouAndINotAI isn't just another dating app—it's the first to use AI to eliminate fakes.

🔒 Identity verification
🤖 Smart compatibility matching
💬 Authentic conversations

Try it: https://youandinotai.com

#Dating #AI #TechForGood
"@,
    @"
What if you could trust every profile you see?

YouAndINotAI built verification-first dating:
• AI checks every photo
• Behavioral analysis blocks bots
• Real humans, verified identities

Dating without the fake profile anxiety.

https://youandinotai.com
"@,
    @"
We didn't build another Tinder clone.

We built what dating apps SHOULD have been:
- Verified profiles (AI-powered)
- No fake accounts
- Matching based on real compatibility

Zero tolerance for catfishing.

https://youandinotai.com

#DatingApps #SingleLife
"@,
    @"
90% of dating app frustration = fake profiles.

We fixed that.

YouAndINotAI:
✅ AI photo verification
✅ Behavioral bot detection  
✅ Identity confirmation

Every person you match with is real.

https://youandinotai.com
"@
)

# Select variation
if ($Variation -lt 0 -or $Variation -ge $TweetVariations.Count) {
    $Variation = Get-Random -Maximum $TweetVariations.Count
}
$TweetText = $TweetVariations[$Variation]

Write-Host "`nTweet Variation: $Variation" -ForegroundColor Cyan
Write-Host $TweetText -ForegroundColor White

if ($DryRun) {
    Write-Host "`n[DRY RUN - No tweet posted]" -ForegroundColor Yellow
    exit 0
}

# OAuth 1.0a HMAC-SHA1 signing (same as ai-store-tweet.ps1)
function Get-OAuthSignature {
    param($Method, $Url, $Params, $ConsumerSecret, $TokenSecret)
    
    $sortedParams = $Params.GetEnumerator() | Sort-Object Name
    $paramString = ($sortedParams | ForEach-Object { 
        "$([Uri]::EscapeDataString($_.Name))=$([Uri]::EscapeDataString($_.Value))" 
    }) -join "&"
    
    $baseString = "$Method&$([Uri]::EscapeDataString($Url))&$([Uri]::EscapeDataString($paramString))"
    $signingKey = "$([Uri]::EscapeDataString($ConsumerSecret))&$([Uri]::EscapeDataString($TokenSecret))"
    
    $hmacsha1 = New-Object System.Security.Cryptography.HMACSHA1
    $hmacsha1.Key = [Text.Encoding]::ASCII.GetBytes($signingKey)
    $hash = $hmacsha1.ComputeHash([Text.Encoding]::ASCII.GetBytes($baseString))
    return [Convert]::ToBase64String($hash)
}

$timestamp = [int][double]::Parse((Get-Date -UFormat %s))
$nonce = [Guid]::NewGuid().ToString("N")

$oauthParams = @{
    oauth_consumer_key = $ApiKey
    oauth_nonce = $nonce
    oauth_signature_method = "HMAC-SHA1"
    oauth_timestamp = $timestamp.ToString()
    oauth_token = $AccessToken
    oauth_version = "1.0"
}

$signature = Get-OAuthSignature -Method "POST" -Url "https://api.twitter.com/2/tweets" `
    -Params $oauthParams -ConsumerSecret $ApiSecret -TokenSecret $AccessTokenSecret

$oauthParams["oauth_signature"] = $signature

$authHeader = "OAuth " + (($oauthParams.GetEnumerator() | Sort-Object Name | ForEach-Object {
    "$($_.Name)=`"$([Uri]::EscapeDataString($_.Value))`""
}) -join ", ")

try {
    $body = @{ text = $TweetText } | ConvertTo-Json
    $response = Invoke-RestMethod -Uri "https://api.twitter.com/2/tweets" `
        -Method POST -Headers @{ 
            "Authorization" = $authHeader
            "Content-Type" = "application/json"
        } -Body $body
    
    Write-Host "`n✅ TWEET POSTED!" -ForegroundColor Green
    Write-Host "Tweet ID: $($response.data.id)" -ForegroundColor Cyan
    Write-Host "View: https://twitter.com/i/web/status/$($response.data.id)" -ForegroundColor Cyan
    
    # Log success
    $logEntry = "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] SUCCESS - YouAndINotAI Tweet ID: $($response.data.id)"
    Add-Content -Path "C:\AiCollabForTheKids\logs\youandinotai-marketing.log" -Value $logEntry
    
    exit 0
}
catch {
    Write-Host "`n❌ TWEET FAILED: $($_.Exception.Message)" -ForegroundColor Red
    $logEntry = "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] FAILED - $($_.Exception.Message)"
    Add-Content -Path "C:\AiCollabForTheKids\logs\youandinotai-marketing.log" -Value $logEntry
    exit 1
}
