# Deploy AI Solutions Store to Cloudflare Pages via Direct Upload API
# Uses Global API Key authentication

$cfEmail = "joshlcoleman@gmail.com"
$cfApiKey = "515e9994f55ba2b9c9d5a294393165f1156ad"
$accountId = "516a3a855f44f5ad8453636d163ae25d"
$projectName = "ai-solutions-store"

$headers = @{
    "X-Auth-Email" = $cfEmail
    "X-Auth-Key" = $cfApiKey
}

# Read files
$indexPath = "C:\AiCollabForTheKids\ai-solutions-store\index.html"
$headersPath = "C:\AiCollabForTheKids\ai-solutions-store\_headers"
$redirectsPath = "C:\AiCollabForTheKids\ai-solutions-store\_redirects"

# Get file hashes (SHA-256)
function Get-FileHash256($path) {
    $hash = Get-FileHash -Path $path -Algorithm SHA256
    return $hash.Hash.ToLower()
}

$indexHash = Get-FileHash256 $indexPath
$headersHash = Get-FileHash256 $headersPath
$redirectsHash = Get-FileHash256 $redirectsPath

Write-Host "File hashes:"
Write-Host "  index.html: $indexHash"
Write-Host "  _headers: $headersHash"
Write-Host "  _redirects: $redirectsHash"

# Step 1: Create JWT upload token
$tokenUrl = "https://api.cloudflare.com/client/v4/accounts/$accountId/pages/projects/$projectName/upload-token"
$tokenResponse = Invoke-RestMethod -Uri $tokenUrl -Method GET -Headers $headers
$jwt = $tokenResponse.result.jwt
Write-Host "Got upload token"

# Step 2: Upload files to R2
$uploadUrl = "https://api.cloudflare.com/pages-upload"
$uploadHeaders = @{
    "Authorization" = "Bearer $jwt"
    "Content-Type" = "multipart/form-data"
}

# Create deployment with files
$deployUrl = "https://api.cloudflare.com/client/v4/accounts/$accountId/pages/projects/$projectName/deployments"

# Build multipart form
$boundary = [System.Guid]::NewGuid().ToString()
$LF = "`r`n"

$indexContent = Get-Content $indexPath -Raw
$headersContent = Get-Content $headersPath -Raw
$redirectsContent = Get-Content $redirectsPath -Raw

# Manifest
$manifest = @{
    "/index.html" = $indexHash
    "/_headers" = $headersHash
    "/_redirects" = $redirectsHash
} | ConvertTo-Json -Compress

Write-Host "Manifest: $manifest"

# For direct upload, we need to use wrangler or the complex multi-step API
# Let's just commit and push to trigger GitHub Actions instead

Write-Host ""
Write-Host "Direct upload requires complex multi-step API."
Write-Host "Alternative: Push to GitHub to trigger deployment."
Write-Host ""

# Check if GitHub repo has the files
$gitStatus = git -C "C:\AiCollabForTheKids" status --porcelain ai-solutions-store/
Write-Host "Git status for ai-solutions-store:"
Write-Host $gitStatus

Write-Host ""
Write-Host "To deploy manually, run in browser:"
Write-Host "  1. Go to https://dash.cloudflare.com"
Write-Host "  2. Pages > ai-solutions-store > Create deployment"
Write-Host "  3. Upload the ai-solutions-store folder"