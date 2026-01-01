# Twitter OAuth 1.0a - Video Announcement Tweet
$ConsumerKey = "HNEdtJnPKYA8BVANqZVKDKKPA"
$ConsumerSecret = "Abht6DC5bYJegI46Cmi3i57CXGd20neWYjL89l3olOLib06vw2"
$AccessToken = "968810237116461056-e9rZo5CaFD3R5Lm8iJfvLs2qNi8J0hX"
$AccessTokenSecret = "Dx2ZF7YWVjVRVFkhAE4Edkt1516l6EggXcvgt6y7CHIS0"

$rand = Get-Random -Maximum 9999
$TweetText = @"
5 marketing videos ready to deploy.

60% of every dollar to sick kids.
Not a promise. Hardcoded.

https://jules-dashboard.pages.dev/kickstarter

#ForTheKids [$rand]
"@

function Get-UrlEncode { param([string]$str); $e = [System.Uri]::EscapeDataString($str); $e -replace '\+','%2B' -replace '!','%21' -replace '\*','%2A' -replace "'", '%27' -replace '\(','%28' -replace '\)','%29' }
function Get-OAuthSignature { param([string]$Method, [string]$Url, [hashtable]$OAuthParams); $s = $OAuthParams.GetEnumerator() | Sort-Object Name; $p = ($s | ForEach-Object { "$(Get-UrlEncode $_.Name)=$(Get-UrlEncode $_.Value)" }) -join "&"; $b = "$Method&$(Get-UrlEncode $Url)&$(Get-UrlEncode $p)"; $k = "$(Get-UrlEncode $ConsumerSecret)&$(Get-UrlEncode $AccessTokenSecret)"; $h = New-Object System.Security.Cryptography.HMACSHA1; $h.Key = [System.Text.Encoding]::UTF8.GetBytes($k); [Convert]::ToBase64String($h.ComputeHash([System.Text.Encoding]::UTF8.GetBytes($b))) }

$timestamp = [int][double]::Parse((Get-Date -UFormat %s)); $nonce = [guid]::NewGuid().ToString("N"); $url = "https://api.twitter.com/2/tweets"
$oauthParams = [ordered]@{ oauth_consumer_key = $ConsumerKey; oauth_nonce = $nonce; oauth_signature_method = "HMAC-SHA1"; oauth_timestamp = $timestamp.ToString(); oauth_token = $AccessToken; oauth_version = "1.0" }
$signature = Get-OAuthSignature -Method "POST" -Url $url -OAuthParams $oauthParams
$authParts = @(); foreach ($key in $oauthParams.Keys) { $authParts += "$key=`"$(Get-UrlEncode $oauthParams[$key])`"" }; $authParts += "oauth_signature=`"$(Get-UrlEncode $signature)`""
$body = @{ text = $TweetText } | ConvertTo-Json -Compress
try { $r = Invoke-RestMethod -Uri $url -Method Post -Headers @{ "Authorization" = "OAuth " + ($authParts -join ", "); "Content-Type" = "application/json" } -Body $body; Write-Host "Tweet posted! ID: $($r.data.id)" -ForegroundColor Green } catch { Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red }
