# Twitter Thread Poster - FOR THE KIDS
# Posts 5-tweet thread about Gospel V1.3 and AI governance
# Credentials from .env.master

$ConsumerKey = "HNEdtJnPKYA8BVANqZVKDKKPA"
$ConsumerSecret = "Abht6DC5bYJegI46Cmi3i57CXGd20neWYjL89l3olOLib06vw2"
$AccessToken = "968810237116461056-e9rZo5CaFD3R5Lm8iJfvLs2qNi8J0hX"
$AccessTokenSecret = "Dx2ZF7YWVjVRVFkhAE4Edkt1516l6EggXcvgt6y7CHIS0"

# Define the 5 tweets for the thread
$Tweets = @(
    @"
I gave Claude AI full admin access to a 184GB RAM cluster.

Then I took a pay cut so sick kids get 60% of every dollar.

VCs said I'm insane.

My AI said "this is the only logical choice."

This is the story of FOR THE KIDS. 🧵

[Posted: $(Get-Date -Format 'HH:mm')]
"@,
    @"
The problem with "tech for good":

🚩 5% to charity = PR stunt
🚩 "We care" = marketing theater
🚩 Board votes to cut giving when profits drop
🚩 Zero transparency

I wanted something PERMANENT.

Something even I couldn't corrupt.

[Posted: $(Get-Date -Format 'HH:mm')]
"@,
    @"
The solution? Let AI run the platform.

Not "AI-assisted." Full control.

Claude (Anthropic) writes ALL the code.
Jules/Gemini handles business logic.
Grok manages infrastructure.
Perplexity fact-checks everything.

I just make the big decisions.

[Posted: $(Get-Date -Format 'HH:mm')]
"@,
    @"
Gospel V1.3 - The immutable law:

💚 60% → Verified Pediatric Charities
⚙️ 30% → Infrastructure (servers, APIs, growth)
👨‍💻 10% → Founder (me)

NOT a donation.
NOT a contribution.
PROFIT ALLOCATION. Hardcoded. Forever.

[Posted: $(Get-Date -Format 'HH:mm')]
"@,
    @"
"Why 60%?"

Because at 60%, charity isn't a "program."

It's THE BUSINESS.

Every feature we build.
Every line of code.
Every dollar earned.

EXISTS to help kids.

Join us: https://aidoesitall.website

FOR THE KIDS. Always. 💚

#ForTheKids #AIForGood #GospelV13

[Posted: $(Get-Date -Format 'HH:mm')]
"@
)

function Get-UrlEncode {
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
    param(
        [string]$Method,
        [string]$Url,
        [hashtable]$OAuthParams
    )

    $sortedParams = $OAuthParams.GetEnumerator() | Sort-Object Name
    $paramString = ($sortedParams | ForEach-Object { "$(Get-UrlEncode $_.Name)=$(Get-UrlEncode $_.Value)" }) -join "&"
    $baseString = "$Method&$(Get-UrlEncode $Url)&$(Get-UrlEncode $paramString)"
    $signingKey = "$(Get-UrlEncode $ConsumerSecret)&$(Get-UrlEncode $AccessTokenSecret)"

    $hmac = New-Object System.Security.Cryptography.HMACSHA1
    $hmac.Key = [System.Text.Encoding]::UTF8.GetBytes($signingKey)
    $hash = $hmac.ComputeHash([System.Text.Encoding]::UTF8.GetBytes($baseString))
    [Convert]::ToBase64String($hash)
}

function Post-Tweet {
    param([string]$TweetText)

    # Generate OAuth signature
    $timestamp = [int][double]::Parse((Get-Date -UFormat %s))
    $nonce = [guid]::NewGuid().ToString("N")
    $url = "https://api.twitter.com/2/tweets"

    $oauthParams = [ordered]@{
        oauth_consumer_key = $ConsumerKey
        oauth_nonce = $nonce
        oauth_signature_method = "HMAC-SHA1"
        oauth_timestamp = $timestamp.ToString()
        oauth_token = $AccessToken
        oauth_version = "1.0"
    }

    $signature = Get-OAuthSignature -Method "POST" -Url $url -OAuthParams $oauthParams

    $authParts = @()
    foreach ($key in $oauthParams.Keys) {
        $authParts += "$key=`"$(Get-UrlEncode $oauthParams[$key])`""
    }
    $authParts += "oauth_signature=`"$(Get-UrlEncode $signature)`""

    $authHeader = "OAuth " + ($authParts -join ", ")

    $bodyObj = @{ text = $TweetText }
    $body = $bodyObj | ConvertTo-Json -Compress

    $headers = @{
        "Authorization" = $authHeader
        "Content-Type" = "application/json"
    }

    try {
        $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body
        Write-Host "✅ Tweet posted successfully!" -ForegroundColor Green
        Write-Host "Tweet ID: $($response.data.id)" -ForegroundColor Cyan
        Write-Host "View at: https://twitter.com/AiCollab4Kids/status/$($response.data.id)" -ForegroundColor Cyan
        Write-Host ""
        return $response.data.id
    }
    catch {
        $errorStream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($errorStream)
        $errorBody = $reader.ReadToEnd()
        Write-Host "❌ Twitter API Error: $errorBody" -ForegroundColor Red
        return $null
    }
}

# Post each tweet in the thread
Write-Host "========================================" -ForegroundColor Yellow
Write-Host "POSTING FOR THE KIDS TWITTER THREAD" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow
Write-Host ""

$tweetCount = 1
$postedTweets = @()

foreach ($tweet in $Tweets) {
    Write-Host "Posting Tweet $tweetCount of $($Tweets.Count)..." -ForegroundColor Yellow
    $tweetId = Post-Tweet -TweetText $tweet

    if ($tweetId) {
        $postedTweets += $tweetId
    }
    else {
        Write-Host "Failed to post tweet $tweetCount. Stopping thread." -ForegroundColor Red
        break
    }

    $tweetCount++

    # Wait 5 seconds between tweets to avoid rate limiting
    if ($tweetCount -le $Tweets.Count) {
        Write-Host "Waiting 5 seconds before next tweet..." -ForegroundColor Gray
        Start-Sleep -Seconds 5
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "THREAD POSTING COMPLETE" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Posted $($postedTweets.Count) tweets successfully" -ForegroundColor Cyan
Write-Host ""
Write-Host "FOR THE KIDS. Always. 💚" -ForegroundColor Green
