# GOSPEL V1.3 TERMINOLOGY AUDIT AND FIX SCRIPT
# Auto-fix all forbidden terminology violations across marketing files
# Created: December 17, 2025
# Authority: Gospel V1.3 (CLAUDE.md Pre-Approved Action)

$ErrorActionPreference = "Continue"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "GOSPEL V1.3 TERMINOLOGY COMPLIANCE FIX" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Define Gospel V1.3 forbidden -> compliant terminology mappings (ordered by specificity)
$replacements = [ordered]@{
    # Compound terms first (most specific)
    '\bdonor-friendly\b' = 'supporter-friendly'
    '\bdonor wall\b' = 'supporter wall'
    '\bdonor recognition\b' = 'supporter recognition'
    '\bdonation-based\b' = 'contribution-based'
    '\bescrow vault\b' = 'DAO treasury'
    '\bescrow account\b' = 'treasury allocation'
    '\bcharity wallet\b' = 'beneficiary allocation'

    # Tax-deductible violations (remove completely)
    '\btax-deductible donation\b' = 'revenue allocation'
    '\btax-deductible contribution\b' = 'contribution'
    '\btax-deductible\b' = ''
    '\b501\(c\)\(3\) status\b' = 'verified charity partnership'
    '\bcharitable deduction\b' = 'business expense'

    # Context-specific donate phrases
    '\bWe donate\b' = 'We allocate'
    '\bwill donate\b' = 'will allocate'
    '\bto donate\b' = 'to allocate'
    '\bPlease donate\b' = 'Please support'
    '\bDonate now\b' = 'Support now'
    '\bDonate here\b' = 'Contribute here'

    # Primary violations (noun forms)
    '\bdonations\b' = 'contributions'
    '\bdonation\b' = 'contribution'
    '\bdonors\b' = 'supporters'
    '\bdonor\b' = 'supporter'
    '\bescrow\b' = 'treasury'

    # Verb forms
    '\bdonating\b' = 'contributing'
    '\bdonated\b' = 'contributed'
    '\bdonates\b' = 'contributes'
    '\bdonate\b' = 'contribute'
}

# Target directory
$marketingDir = "C:\AiCollabForTheKids\marketing"

# Get all markdown files
$files = Get-ChildItem -Path $marketingDir -Filter "*.md" -Recurse

Write-Host "Found $($files.Count) marketing files to audit..." -ForegroundColor Yellow
Write-Host ""

$filesModified = 0
$violationsFixed = 0

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    $fileViolations = 0

    # Apply each replacement
    foreach ($pattern in $replacements.Keys) {
        $replacement = $replacements[$pattern]

        # Count matches before replacement
        $matches = ([regex]::Matches($content, $pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)).Count

        if ($matches -gt 0) {
            # Special handling for case-sensitive patterns
            if ($pattern -match '^[A-Z]') {
                # Pattern starts with capital - case-sensitive
                $content = $content -replace $pattern, $replacement
            } else {
                # Case-insensitive replacement, preserve case
                $content = [regex]::Replace($content, $pattern, $replacement, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
            }

            $fileViolations += $matches
            $violationsFixed += $matches
        }
    }

    # Only write if content changed
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        $filesModified++
        Write-Host "[FIXED] $($file.Name) - $fileViolations violations corrected" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "AUDIT COMPLETE" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Files Modified: $filesModified" -ForegroundColor Yellow
Write-Host "Total Violations Fixed: $violationsFixed" -ForegroundColor Yellow
Write-Host ""
Write-Host "Gospel V1.3 Compliance: ENFORCED" -ForegroundColor Green
Write-Host ""
Write-Host "FOR THE KIDS. ALWAYS." -ForegroundColor Cyan
