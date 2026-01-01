# Test Devvit token decoding
$tokenFile = "C:\Users\t55o\.devvit\token"
$content = Get-Content $tokenFile -Raw
$json = $content | ConvertFrom-Json
$tokenB64 = $json.token
$decoded = [System.Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($tokenB64))
$payload = $decoded | ConvertFrom-Json

Write-Host "=== DEVVIT TOKEN INFO ===" -ForegroundColor Cyan
Write-Host "Access Token (first 100 chars): $($payload.accessToken.Substring(0,100))..."
Write-Host "Refresh Token: $($payload.refreshToken.Substring(0,30))..."
Write-Host "Expires At: $([DateTimeOffset]::FromUnixTimeMilliseconds($payload.expiresAt).DateTime)"
Write-Host "Scope: $($payload.scope)"
Write-Host "Token Type: $($payload.tokenType)"
