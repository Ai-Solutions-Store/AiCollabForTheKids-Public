# Deploy AI Solutions Store to Cloudflare Pages using Global API Key
# Full admin access via Omega key

$cfEmail = "joshlcoleman@gmail.com"
$cfApiKey = "515e9994f55ba2b9c9d5a294393165f1156ad"
$accountId = "516a3a855f44f5ad8453636d163ae25d"
$projectName = "ai-solutions-store"

$headers = @{
    "X-Auth-Email" = $cfEmail
    "X-Auth-Key" = $cfApiKey
}

Write-Host "Deploying AI Solutions Store to Cloudflare Pages..." -ForegroundColor Cyan

# Step 1: Get upload token
Write-Host "Getting upload token..."
$tokenUrl = "https://api.cloudflare.com/client/v4/accounts/$accountId/pages/projects/$projectName/upload-token"
$tokenResponse = Invoke-RestMethod -Uri $tokenUrl -Method GET -Headers $headers
$jwt = $tokenResponse.result.jwt
Write-Host "Got JWT token" -ForegroundColor Green

# Step 2: Calculate file hashes and prepare upload
$files = @{
    "/index.html" = "C:\AiCollabForTheKids\ai-solutions-store\index.html"
    "/_headers" = "C:\AiCollabForTheKids\ai-solutions-store\_headers"
    "/_redirects" = "C:\AiCollabForTheKids\ai-solutions-store\_redirects"
}

$manifest = @{}
$fileHashes = @{}

foreach ($file in $files.GetEnumerator()) {
    $hash = (Get-FileHash -Path $file.Value -Algorithm SHA256).Hash.ToLower()
    $manifest[$file.Key] = $hash
    $fileHashes[$hash] = $file.Value
    Write-Host "  $($file.Key): $hash"
}

# Step 3: Check which files need uploading
Write-Host "Checking missing files..."
$missingUrl = "https://api.cloudflare.com/pages-upload/missing"
$missingBody = @{
    hashes = @($fileHashes.Keys)
} | ConvertTo-Json

$missingResponse = Invoke-RestMethod -Uri $missingUrl -Method POST -Headers @{
    "Authorization" = "Bearer $jwt"
    "Content-Type" = "application/json"
} -Body $missingBody

$missingHashes = $missingResponse
Write-Host "Missing files: $($missingHashes.Count)" -ForegroundColor Yellow

# Step 4: Upload missing files
if ($missingHashes.Count -gt 0) {
    Write-Host "Uploading files..."
    $uploadUrl = "https://api.cloudflare.com/pages-upload"

    $boundary = [System.Guid]::NewGuid().ToString()
    $LF = "`r`n"

    $bodyLines = @()

    foreach ($hash in $missingHashes) {
        if ($fileHashes.ContainsKey($hash)) {
            $filePath = $fileHashes[$hash]
            $fileContent = [System.IO.File]::ReadAllBytes($filePath)
            $base64Content = [Convert]::ToBase64String($fileContent)

            $bodyLines += "--$boundary"
            $bodyLines += "Content-Disposition: form-data; name=`"$hash`"; filename=`"$hash`""
            $bodyLines += "Content-Type: application/octet-stream"
            $bodyLines += ""
            $bodyLines += $base64Content
        }
    }
    $bodyLines += "--$boundary--"

    $body = $bodyLines -join $LF

    try {
        $uploadResponse = Invoke-RestMethod -Uri $uploadUrl -Method POST -Headers @{
            "Authorization" = "Bearer $jwt"
            "Content-Type" = "multipart/form-data; boundary=$boundary"
        } -Body $body
        Write-Host "Files uploaded" -ForegroundColor Green
    } catch {
        Write-Host "Upload error: $_" -ForegroundColor Red
    }
}

# Step 5: Create deployment with manifest
Write-Host "Creating deployment..."
$deployUrl = "https://api.cloudflare.com/client/v4/accounts/$accountId/pages/projects/$projectName/deployments"

$manifestJson = $manifest | ConvertTo-Json -Compress

$deployBody = @{
    manifest = $manifest
    branch = "main"
} | ConvertTo-Json

$deployResponse = Invoke-RestMethod -Uri $deployUrl -Method POST -Headers ($headers + @{
    "Content-Type" = "application/json"
}) -Body $deployBody

Write-Host ""
Write-Host "Deployment created!" -ForegroundColor Green
Write-Host "URL: $($deployResponse.result.url)"
Write-Host "Status: $($deployResponse.result.latest_stage.status)"
