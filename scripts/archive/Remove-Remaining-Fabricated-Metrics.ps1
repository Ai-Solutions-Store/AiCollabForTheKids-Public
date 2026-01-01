# Remove-Remaining-Fabricated-Metrics.ps1
# Phase 2: Catch remaining fabricated metrics with more patterns

$ErrorActionPreference = "Stop"

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  PHASE 2: REMAINING FABRICATED METRICS CLEANUP" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Get all markdown files
$files = @()
$files += Get-ChildItem -Path "C:\AiCollabForTheKids\marketing\*.md" -Recurse -File
$files += Get-ChildItem -Path "C:\AiCollabForTheKids\*.md" -File
$files += Get-ChildItem -Path "C:\AiCollabForTheKids\docs\*.md" -Recurse -File

$totalFiles = $files.Count
$modifiedFiles = 0

Write-Host "Scanning $totalFiles files for remaining fabricated metrics..." -ForegroundColor Yellow
Write-Host ""

foreach ($file in $files) {
    try {
        $content = Get-Content $file.FullName -Raw -ErrorAction Stop
        $originalContent = $content
        $modified = $false

        # Pattern 1: Any mention of 396,248 or 396248 (with or without +)
        if ($content -match '396[,]?248\+?') {
            Write-Host "  [FOUND] $($file.Name): Contains 396,248 metric" -ForegroundColor Red
            $content = $content -replace '396[,]?248\+?\s+children[\s\w]*', 'thousands of children'
            $content = $content -replace '396[,]?248\+?', 'thousands'
            $content = $content -replace '\$396[,]?248', 'significant funds'
            $modified = $true
        }

        # Pattern 2: Any $792 references
        if ($content -match '\$?792[KMk]?') {
            Write-Host "  [FOUND] $($file.Name): Contains $792 metric" -ForegroundColor Red
            $content = $content -replace '\$792[KMk]\+?', 'significant impact'
            $content = $content -replace '\$0.*?\$792[KMk]', 'launch to impact'
            $content = $content -replace 'From \$0 to \$792[KMk]', 'From Launch to Impact'
            $content = $content -replace '"Building a \$792K Impact Business', '"Building an Impact Business'
            $modified = $true
        }

        # Pattern 3: "We've helped X children" patterns
        if ($content -match "We'?ve (helped|allocated|reached) \d") {
            Write-Host "  [FOUND] $($file.Name): Contains 'We've helped' claim" -ForegroundColor Red
            $content = $content -replace "We'?ve (helped|allocated to|reached) [\d,]+\+? children", 'Our goal is to help thousands of children'
            $content = $content -replace "helped us reach [\d,]+\+? children", 'helped us build towards our impact goals'
            $modified = $true
        }

        # Pattern 4: "X+ children helped" patterns
        if ($content -match '[\d,]+\+?\s+(children|kids)\s+(helped|have been helped)') {
            Write-Host "  [FOUND] $($file.Name): Contains 'X children helped' pattern" -ForegroundColor Red
            $content = $content -replace '[\d,]+\+?\s+(children|kids)\s+(helped|have been helped)', 'our mission to help children'
            $modified = $true
        }

        # Pattern 5: Impact metrics in email templates
        if ($content -match 'Total children helped.*?:\s*[\d,]+') {
            Write-Host "  [FOUND] $($file.Name): Contains total children metric" -ForegroundColor Red
            $content = $content -replace 'Total children helped.*?:\s*[\d,]+\+?', 'Launch Status: Building towards impact'
            $content = $content -replace 'Children helped \(cumulative\):\s*[\d,]+\+?', 'Mission: Building towards impact'
            $modified = $true
        }

        # Pattern 6: "Children helped now: X" patterns
        if ($content -match 'Children helped (now|total):\s*[\d,]+') {
            Write-Host "  [FOUND] $($file.Name): Contains 'Children helped now' metric" -ForegroundColor Red
            $content = $content -replace 'Children helped (now|total):\s*[\d,]+\s*\([^\)]+\)', 'Building impact (growing)'
            $content = $content -replace 'Children helped (now|total):\s*[\d,]+', 'Building towards impact'
            $modified = $true
        }

        # Pattern 7: Estimated children in parentheses
        if ($content -match '\(Estimated\):\s*[\d,]+\+?\s+annually') {
            Write-Host "  [FOUND] $($file.Name): Contains estimated children metric" -ForegroundColor Red
            $content = $content -replace 'Children Helped \(Estimated\):\s*[\d,]+\+?\s+annually', 'Impact Goal: Help thousands annually'
            $modified = $true
        }

        # Pattern 8: Problem statement patterns
        if ($content -match '[\d,]+\+?\s+children need treatment') {
            Write-Host "  [FOUND] $($file.Name): Contains 'X children need treatment'" -ForegroundColor Red
            $content = $content -replace '[\d,]+\+?\s+children need treatment support annually', 'Thousands of children need treatment support annually'
            $modified = $true
        }

        # Pattern 9: Social proof patterns
        if ($content -match 'platform that helps [\d,]+\+? (kids|children)') {
            Write-Host "  [FOUND] $($file.Name): Contains 'platform that helps X kids'" -ForegroundColor Red
            $content = $content -replace 'platform that helps [\d,]+\+? (kids|children)', 'platform building towards helping thousands of $1'
            $modified = $true
        }

        # Pattern 10: "$X allocated" patterns
        if ($content -match '\$[\d,]+\+?\s+allocated') {
            Write-Host "  [FOUND] $($file.Name): Contains allocated dollar amount" -ForegroundColor Red
            $content = $content -replace '\$[\d,]+\+?\s+allocated.*?date', 'Building towards our allocation goals'
            $modified = $true
        }

        # Pattern 11: Specific "helped X+ children" in meta descriptions
        if ($content -match 'helps [\d,]+\+? children') {
            Write-Host "  [FOUND] $($file.Name): Contains 'helps X children'" -ForegroundColor Red
            $content = $content -replace 'helps [\d,]+\+? children', 'aims to help thousands of children'
            $modified = $true
        }

        # Pattern 12: "X+ kids helped. Here's how" patterns
        if ($content -match '[\d,]+\+? (kids|children) helped\.\s+(Here''s|Want to|Join)') {
            Write-Host "  [FOUND] $($file.Name): Contains 'X kids helped. Here's...'" -ForegroundColor Red
            $content = $content -replace '[\d,]+\+? (kids|children) helped\.\s+', 'Our mission to help kids. '
            $modified = $true
        }

        # Pattern 13: Article titles with specific numbers
        if ($content -match '"[\d,]+\+? (Kids|Children) Helped') {
            Write-Host "  [FOUND] $($file.Name): Contains article title with child count" -ForegroundColor Red
            $content = $content -replace '"[\d,]+\+? (Kids|Children) Helped[^"]*"', '"Our Mission to Help Children"'
            $modified = $true
        }

        # Save if modified
        if ($modified) {
            Set-Content -Path $file.FullName -Value $content -NoNewline
            $modifiedFiles++
            Write-Host "  [FIXED] $($file.Name)" -ForegroundColor Green
        }

    } catch {
        Write-Host "  [ERROR] $($file.Name): $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  PHASE 2 COMPLETE" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Files modified: $modifiedFiles" -ForegroundColor Green
Write-Host ""
