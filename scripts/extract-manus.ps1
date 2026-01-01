Add-Type -AssemblyName System.IO.Compression.FileSystem
$zipPath = "C:\AiCollabForTheKids\manus.zip"
$extractPath = "C:\AiCollabForTheKids\manus-extracted"

if (Test-Path $extractPath) { Remove-Item $extractPath -Recurse -Force }
New-Item -ItemType Directory -Path $extractPath -Force | Out-Null

$zip = [IO.Compression.ZipFile]::OpenRead($zipPath)
Write-Host "Zip contains $($zip.Entries.Count) entries:"
foreach ($entry in $zip.Entries) {
    Write-Host "  $($entry.FullName) - $($entry.Length) bytes"

    $destPath = Join-Path $extractPath $entry.FullName
    $destDir = Split-Path $destPath -Parent

    if (-not (Test-Path $destDir)) {
        New-Item -ItemType Directory -Path $destDir -Force | Out-Null
    }

    if (-not $entry.FullName.EndsWith('/')) {
        [IO.Compression.ZipFileExtensions]::ExtractToFile($entry, $destPath, $true)
    }
}
$zip.Dispose()

Write-Host ""
Write-Host "Extracted to: $extractPath"
Get-ChildItem $extractPath -Recurse | Select-Object FullName
