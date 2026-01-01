# ═══════════════════════════════════════════════════════════════
# FOR THE KIDS - Twitter OAuth 1.0a Tweet Poster
# ═══════════════════════════════════════════════════════════════
# This script posts tweets using OAuth 1.0a authentication
# with proper HMAC-SHA1 signature generation.
#
# Gospel V1.3 Compliance: All tweets promote 60/30/10 split
# ═══════════════════════════════════════════════════════════════

[CmdletBinding()]
param(
    [Parameter(Mandatory=$false)]
    [string]$TweetText,

    [Parameter(Mandatory=$false)]
    [switch]$ProcessQueue,

    [Parameter(Mandatory=$false)]
    [int]$DelayMinutes = 120  # 2 hours between tweets (default)
)

# Force TLS 1.2
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# ═══════════════════════════════════════════════════════════════
# TWITTER OAUTH 1.0A CREDENTIALS (from api/.env)
# ═══════════════════════════════════════════════════════════════
$apiKey = "HNEdtJnPKYA8BVANqZVKDKKPA"
$apiSecret = "Abht6DC5bYJegI46Cmi3i57CXGd20neWYjL89l3olOLib06vw2"
$accessToken = "968810237116461056-e9rZo5CaFD3R5Lm8iJfvLs2qNi8J0hX"
$accessSecret = "Dx2ZF7YWVjVRVFkhAE4Edkt1516l6EggXcvgt6y7CHIS0"

# ═══════════════════════════════════════════════════════════════
# OAUTH 1.0A HELPER FUNCTIONS
# ═══════════════════════════════════════════════════════════════

function Get-OAuthNonce {
    # Generate cryptographically secure random nonce
    $guid = [Guid]::NewGuid().ToString("N")
    $bytes = [Text.Encoding]::ASCII.GetBytes($guid)
    return [Convert]::ToBase64String($bytes) -replace '[^a-zA-Z0-9]', ''
}

function Get-OAuthTimestamp {
    # Unix epoch timestamp
    return [int][double]::Parse((Get-Date -UFormat %s))
}

function Get-OAuthSignature {
    param(
        [string]$HttpMethod,
        [string]$BaseUrl,
        [hashtable]$Parameters,
        [string]$ConsumerSecret,
        [string]$TokenSecret
    )

    # 1. Sort parameters alphabetically
    $sortedParams = $Parameters.GetEnumerator() | Sort-Object Name

    # 2. Build parameter string
    $paramString = ($sortedParams | ForEach-Object {
        "$([Uri]::EscapeDataString($_.Key))=$([Uri]::EscapeDataString($_.Value))"
    }) -join "&"

    # 3. Build signature base string
    $signatureBase = @(
        $HttpMethod.ToUpper(),
        [Uri]::EscapeDataString($BaseUrl),
        [Uri]::EscapeDataString($paramString)
    ) -join "&"

    # 4. Build signing key
    $signingKey = [Uri]::EscapeDataString($ConsumerSecret) + "&" + [Uri]::EscapeDataString($TokenSecret)

    # 5. Generate HMAC-SHA1 signature
    $hmacsha1 = New-Object System.Security.Cryptography.HMACSHA1
    $hmacsha1.Key = [Text.Encoding]::ASCII.GetBytes($signingKey)
    $hashBytes = $hmacsha1.ComputeHash([Text.Encoding]::ASCII.GetBytes($signatureBase))
    $signature = [Convert]::ToBase64String($hashBytes)

    return $signature
}

function Get-OAuthHeader {
    param(
        [string]$HttpMethod,
        [string]$BaseUrl,
        [hashtable]$OAuthParams,
        [string]$ConsumerSecret,
        [string]$TokenSecret
    )

    # Generate signature
    $signature = Get-OAuthSignature -HttpMethod $HttpMethod -BaseUrl $BaseUrl `
                                     -Parameters $OAuthParams -ConsumerSecret $ConsumerSecret `
                                     -TokenSecret $TokenSecret

    # Add signature to OAuth params
    $OAuthParams["oauth_signature"] = $signature

    # Build Authorization header
    $headerParts = $OAuthParams.GetEnumerator() | Sort-Object Name | ForEach-Object {
        "$($_.Key)=`"$([Uri]::EscapeDataString($_.Value))`""
    }

    $authHeader = "OAuth " + ($headerParts -join ", ")

    return $authHeader
}

function Post-TweetOAuth {
    param([string]$Tweet)

    Write-Host ""
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host "POSTING TWEET" -ForegroundColor Cyan
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan

    # Truncate for display
    $displayTweet = if ($Tweet.Length -gt 100) { $Tweet.Substring(0, 100) + "..." } else { $Tweet }
    Write-Host "Content: $displayTweet" -ForegroundColor White
    Write-Host ""

    # Twitter API endpoint
    $url = "https://api.twitter.com/2/tweets"
    $method = "POST"

    # Generate OAuth parameters
    $oauthParams = @{
        "oauth_consumer_key" = $apiKey
        "oauth_nonce" = Get-OAuthNonce
        "oauth_signature_method" = "HMAC-SHA1"
        "oauth_timestamp" = Get-OAuthTimestamp
        "oauth_token" = $accessToken
        "oauth_version" = "1.0"
    }

    # Generate OAuth Authorization header
    $authHeader = Get-OAuthHeader -HttpMethod $method -BaseUrl $url `
                                   -OAuthParams $oauthParams -ConsumerSecret $apiSecret `
                                   -TokenSecret $accessSecret

    # Build request body
    $body = @{ text = $Tweet } | ConvertTo-Json -Compress

    # Build headers
    $headers = @{
        "Authorization" = $authHeader
        "Content-Type" = "application/json"
    }

    try {
        Write-Host "Authenticating with OAuth 1.0a..." -ForegroundColor Yellow
        Write-Host "Signing request with HMAC-SHA1..." -ForegroundColor Yellow

        # Send request
        $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body -ErrorAction Stop

        Write-Host ""
        Write-Host "✓ TWEET POSTED SUCCESSFULLY!" -ForegroundColor Green
        Write-Host "  Tweet ID: $($response.data.id)" -ForegroundColor Cyan
        Write-Host "  Text: $($response.data.text)" -ForegroundColor White
        Write-Host ""

        return @{
            success = $true
            id = $response.data.id
            text = $response.data.text
        }

    } catch {
        $errorDetails = $_.Exception.Message
        $statusCode = $_.Exception.Response.StatusCode.value__

        Write-Host ""
        Write-Host "✗ TWEET FAILED!" -ForegroundColor Red
        Write-Host "  Status Code: $statusCode" -ForegroundColor Red
        Write-Host "  Error: $errorDetails" -ForegroundColor Red

        # Parse error response if available
        try {
            $errorStream = $_.Exception.Response.GetResponseStream()
            $reader = New-Object System.IO.StreamReader($errorStream)
            $errorBody = $reader.ReadToEnd()
            Write-Host "  Details: $errorBody" -ForegroundColor Red
        } catch {}

        Write-Host ""

        return @{
            success = $false
            error = $errorDetails
            statusCode = $statusCode
        }
    }
}

# ═══════════════════════════════════════════════════════════════
# MAIN EXECUTION
# ═══════════════════════════════════════════════════════════════

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  FOR THE KIDS - TWITTER CAMPAIGN POSTER" -ForegroundColor Cyan
Write-Host "  OAuth 1.0a | Twitter API v2 | HMAC-SHA1 Signing" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

if ($TweetText) {
    # Post single tweet
    Write-Host "MODE: Single Tweet" -ForegroundColor Yellow
    $result = Post-TweetOAuth -Tweet $TweetText

    if ($result.success) {
        Write-Host "✓ Mission accomplished. FOR THE KIDS." -ForegroundColor Green
        exit 0
    } else {
        Write-Host "✗ Tweet failed. Check credentials and try again." -ForegroundColor Red
        exit 1
    }

} elseif ($ProcessQueue) {
    # Process tweet queue
    Write-Host "MODE: Queue Processing" -ForegroundColor Yellow

    $queueFile = "c:\AiCollabForTheKids\marketing\kickstarter\TWEET-QUEUE.txt"

    if (-not (Test-Path $queueFile)) {
        Write-Host "✗ Tweet queue not found: $queueFile" -ForegroundColor Red
        exit 1
    }

    $tweets = Get-Content $queueFile | Where-Object { $_.Trim() -ne "" }

    Write-Host "Found $($tweets.Count) tweets in queue" -ForegroundColor Cyan
    Write-Host "Delay between tweets: $DelayMinutes minutes" -ForegroundColor Cyan
    Write-Host ""

    $successCount = 0
    $failCount = 0
    $results = @()

    for ($i = 0; $i -lt $tweets.Count; $i++) {
        $tweet = $tweets[$i]

        Write-Host "[$($i+1)/$($tweets.Count)]" -ForegroundColor Cyan

        $result = Post-TweetOAuth -Tweet $tweet
        $results += $result

        if ($result.success) {
            $successCount++
        } else {
            $failCount++
        }

        # Delay before next tweet (except after last one)
        if ($i -lt ($tweets.Count - 1)) {
            Write-Host "Waiting $DelayMinutes minutes before next tweet..." -ForegroundColor Yellow
            Write-Host "(Press Ctrl+C to cancel)" -ForegroundColor Gray
            Start-Sleep -Seconds ($DelayMinutes * 60)
        }
    }

    # Summary
    Write-Host ""
    Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host "  CAMPAIGN SUMMARY" -ForegroundColor Cyan
    Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Total Tweets: $($tweets.Count)" -ForegroundColor White
    Write-Host "✓ Posted: $successCount" -ForegroundColor Green
    Write-Host "✗ Failed: $failCount" -ForegroundColor Red
    Write-Host ""

    if ($successCount -gt 0) {
        Write-Host "Posted Tweet IDs:" -ForegroundColor Cyan
        $results | Where-Object { $_.success } | ForEach-Object {
            Write-Host "  - $($_.id)" -ForegroundColor White
        }
        Write-Host ""
    }

    Write-Host "FOR THE KIDS. ALWAYS." -ForegroundColor Green
    Write-Host ""

    exit 0

} else {
    # No parameters - show usage
    Write-Host "USAGE:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Post single tweet:" -ForegroundColor Cyan
    Write-Host '  .\Post-TwitterOAuth.ps1 -TweetText "Your tweet text here"' -ForegroundColor White
    Write-Host ""
    Write-Host "Process tweet queue:" -ForegroundColor Cyan
    Write-Host "  .\Post-TwitterOAuth.ps1 -ProcessQueue" -ForegroundColor White
    Write-Host "  .\Post-TwitterOAuth.ps1 -ProcessQueue -DelayMinutes 240  # 4 hours between tweets" -ForegroundColor White
    Write-Host ""
    Write-Host "EXAMPLES:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Test with simple tweet:" -ForegroundColor Cyan
    Write-Host '  .\Post-TwitterOAuth.ps1 -TweetText "Test from FOR THE KIDS platform! 60% to charity. #ForTheKids"' -ForegroundColor White
    Write-Host ""
    Write-Host "Post all Kickstarter tweets (recommended):" -ForegroundColor Cyan
    Write-Host "  .\Post-TwitterOAuth.ps1 -ProcessQueue -DelayMinutes 180  # 3 hours apart" -ForegroundColor White
    Write-Host ""

    exit 0
}
