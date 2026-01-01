# Check Devvit token expiry
$tokenFile = "C:\Users\t55o\.devvit\token"
$rawJson = Get-Content $tokenFile -Raw
$tokenData = $rawJson | ConvertFrom-Json
$innerBase64 = $tokenData.token

# The inner token is base64 encoded JSON
$innerJson = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($innerBase64))
$innerToken = $innerJson | ConvertFrom-Json
$expiresAt = $innerToken.expiresAt

$expiry = [DateTimeOffset]::FromUnixTimeMilliseconds($expiresAt)
$now = [DateTimeOffset]::UtcNow
$diff = $expiry - $now

Write-Host "=== DEVVIT TOKEN STATUS ===" -ForegroundColor Cyan
Write-Host "Expires: $($expiry.ToString('yyyy-MM-dd HH:mm:ss')) UTC"
Write-Host "Now:     $($now.ToString('yyyy-MM-dd HH:mm:ss')) UTC"
if ($diff.TotalHours -gt 0) {
    Write-Host "Status: VALID ($([math]::Round($diff.TotalHours, 1)) hours remaining)" -ForegroundColor Green
} else {
    Write-Host "Status: EXPIRED" -ForegroundColor Red
}
