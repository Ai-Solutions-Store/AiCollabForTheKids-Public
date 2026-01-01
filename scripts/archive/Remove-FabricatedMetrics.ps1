# Remove-FabricatedMetrics.ps1
# CRITICAL FTC COMPLIANCE FIX - Remove all fabricated metrics

$ErrorActionPreference = "Stop"

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  FABRICATED METRICS REMOVAL SCRIPT" -ForegroundColor Cyan
Write-Host "  FTC Compliance - Remove False Claims" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Define search patterns and replacements
$replacements = @(
    @{
        Pattern = '\$792M|\$792 million|792M allocated|792,496'
        Replacement = 'building towards impact'
        Description = 'Remove $792M fabricated revenue claims'
    },
    @{
        Pattern = '396,248\+ children helped|396,248 children|396248 children'
        Replacement = 'goal: help thousands of children'
        Description = 'Remove 396,248 children fabricated claims'
    },
    @{
        Pattern = '8,247 monthly supporters|8247 supporters|8,247 / 10,000'
        Replacement = 'growing community'
        Description = 'Remove 8,247 supporters fabricated claims'
    },
    @{
        Pattern = '396,248\+ Children Helped'
        Replacement = 'Building Towards Impact'
        Description = 'Remove title-case fabricated claims'
    },
    @{
        Pattern = 'We''ve allocated \$[0-9,]+\.? to verified'
        Replacement = 'We are building infrastructure to support verified'
        Description = 'Remove allocation claims'
    },
    @{
        Pattern = 'Over 396,248 children helped'
        Replacement = 'Goal: Help thousands of children'
        Description = 'Remove "over X children" claims'
    },
    @{
        Pattern = 'This year alone, we''ve helped 396,248 children'
        Replacement = 'Our goal is to help thousands of children annually'
        Description = 'Remove annual impact claims'
    },
    @{
        Pattern = 'Children Helped: 396,248\+'
        Replacement = 'Launch Status: Building towards impact'
        Description = 'Remove impact metrics'
    }
)

# Get all markdown files in marketing directory and root
$files = @()
$files += Get-ChildItem -Path "C:\AiCollabForTheKids\marketing\*.md" -Recurse -File
$files += Get-ChildItem -Path "C:\AiCollabForTheKids\*.md" -File

$totalFiles = $files.Count
$processedFiles = 0
$modifiedFiles = 0

Write-Host "Found $totalFiles files to scan..." -ForegroundColor Yellow
Write-Host ""

foreach ($file in $files) {
    $processedFiles++
    $modified = $false

    try {
        $content = Get-Content $file.FullName -Raw -ErrorAction Stop
        $originalContent = $content

        foreach ($replacement in $replacements) {
            if ($content -match $replacement.Pattern) {
                Write-Host "  [FOUND] $($file.Name): $($replacement.Description)" -ForegroundColor Red
                $content = $content -replace $replacement.Pattern, $replacement.Replacement
                $modified = $true
            }
        }

        if ($modified) {
            Set-Content -Path $file.FullName -Value $content -NoNewline
            $modifiedFiles++
            Write-Host "  [FIXED] $($file.Name)" -ForegroundColor Green
        }

        if ($processedFiles % 20 -eq 0) {
            Write-Host "Progress: $processedFiles / $totalFiles files processed..." -ForegroundColor Cyan
        }

    } catch {
        Write-Host "  [ERROR] $($file.Name): $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  CLEANUP COMPLETE" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Total files scanned: $totalFiles" -ForegroundColor Yellow
Write-Host "Files modified: $modifiedFiles" -ForegroundColor Green
Write-Host ""

if ($modifiedFiles -gt 0) {
    Write-Host "NEXT STEPS:" -ForegroundColor Cyan
    Write-Host "1. Review changes: git diff" -ForegroundColor White
    Write-Host "2. Run verification script to confirm all metrics removed" -ForegroundColor White
    Write-Host "3. Commit changes: git add . && git commit -m 'FTC Compliance: Remove fabricated metrics'" -ForegroundColor White
}
