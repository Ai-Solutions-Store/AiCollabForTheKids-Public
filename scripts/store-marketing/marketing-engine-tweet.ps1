# Twitter OAuth 1.0a - Marketing Engine Marketing Tweet
# AI Solutions Store Product: Marketing Engine - $199
# Social Media Automation System

$ConsumerKey = "HNEdtJnPKYA8BVANqZVKDKKPA"
$ConsumerSecret = "Abht6DC5bYJegI46Cmi3i57CXGd20neWYjL89l3olOLib06vw2"
$AccessToken = "968810237116461056-e9rZo5CaFD3R5Lm8iJfvLs2qNi8J0hX"
$AccessTokenSecret = "Dx2ZF7YWVjVRVFkhAE4Edkt1516l6EggXcvgt6y7CHIS0"

$TweetText = @"
Posting 5x/day across Twitter, LinkedIn, Instagram is a full-time job.

Marketing Engine does it in 20 minutes/week.

- Auto-generates platform-specific content
- Optimal timing based on your audience
- A/B tests headlines automatically
- Learns what converts

$199. Less than 1 coffee/day.

https://aidoesitall.website

#SocialMedia #MarketingAutomation #GrowthHacking
"@

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

$ts = [int][double]::Parse((Get-Date -UFormat %s))
$nonce = [guid]::NewGuid().ToString("N")
$url = "https://api.twitter.com/2/tweets"

$oauthParams = [ordered]@{
    oauth_consumer_key = $ConsumerKey
    oauth_nonce = $nonce
    oauth_signature_method = "HMAC-SHA1"
    oauth_timestamp = $ts.ToString()
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
    Write-Host "Marketing Engine tweet posted!" -ForegroundColor Green
    Write-Host "Tweet ID: $($response.data.id)"
    Write-Host "View: https://twitter.com/AiCollab4Kids/status/$($response.data.id)"
}
catch {
    $errorStream = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($errorStream)
    $errorBody = $reader.ReadToEnd()
    Write-Host "Error: $errorBody" -ForegroundColor Red
}
