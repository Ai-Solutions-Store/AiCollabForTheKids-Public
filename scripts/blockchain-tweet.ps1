# Twitter OAuth 1.0a - Blockchain Verification Tweet
$ConsumerKey = "HNEdtJnPKYA8BVANqZVKDKKPA"
$ConsumerSecret = "Abht6DC5bYJegI46Cmi3i57CXGd20neWYjL89l3olOLib06vw2"
$AccessToken = "968810237116461056-e9rZo5CaFD3R5Lm8iJfvLs2qNi8J0hX"
$AccessTokenSecret = "Dx2ZF7YWVjVRVFkhAE4Edkt1516l6EggXcvgt6y7CHIS0"

$TweetText = @"
Every purchase tracked on-chain.
Zero trust needed.

The blockchain proves where your money goes:
60% to verified pediatric charities
Immutably recorded forever.

Contract: 0x9855B75061D4c841791382998f0CE8B2BCC965A4

Transparency is coded in.
#ForTheKids #Web3ForGood
"@

function Get-UrlEncode {
    param([string]$str)
    $encoded = [System.Uri]::EscapeDataString($str)
    $encoded = $encoded -replace '\+', '%2B' -replace '!', '%21' -replace '\*', '%2A' -replace "'", '%27' -replace '\(', '%28' -replace '\)', '%29'
    return $encoded
}

function Get-OAuthSignature {
    param([string]$Method, [string]$Url, [hashtable]$OAuthParams)
    $sortedParams = $OAuthParams.GetEnumerator() | Sort-Object Name
    $paramString = ($sortedParams | ForEach-Object { "$(Get-UrlEncode $_.Name)=$(Get-UrlEncode $_.Value)" }) -join "&"
    $baseString = "$Method&$(Get-UrlEncode $Url)&$(Get-UrlEncode $paramString)"
    $signingKey = "$(Get-UrlEncode $ConsumerSecret)&$(Get-UrlEncode $AccessTokenSecret)"
    $hmac = New-Object System.Security.Cryptography.HMACSHA1
    $hmac.Key = [System.Text.Encoding]::UTF8.GetBytes($signingKey)
    [Convert]::ToBase64String($hmac.ComputeHash([System.Text.Encoding]::UTF8.GetBytes($baseString)))
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
foreach ($key in $oauthParams.Keys) { $authParts += "$key=`"$(Get-UrlEncode $oauthParams[$key])`"" }
$authParts += "oauth_signature=`"$(Get-UrlEncode $signature)`""
$authHeader = "OAuth " + ($authParts -join ", ")

$body = @{ text = $TweetText } | ConvertTo-Json -Compress
$headers = @{ "Authorization" = $authHeader; "Content-Type" = "application/json" }

try {
    $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body
    Write-Host "Tweet posted!" -ForegroundColor Green
    Write-Host "ID: $($response.data.id)"
    Write-Host "https://twitter.com/AiCollab4Kids/status/$($response.data.id)"
} catch {
    $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
    Write-Host "Error: $($reader.ReadToEnd())" -ForegroundColor Red
}
