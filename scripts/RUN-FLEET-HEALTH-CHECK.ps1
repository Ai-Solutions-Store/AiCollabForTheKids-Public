<#
.SYNOPSIS
    Fleet Health Monitor - PowerShell Wrapper
.DESCRIPTION
    Runs the Node.js fleet health monitor and handles errors gracefully.
    Designed for Windows Task Scheduler execution.
.NOTES
    Platform: FOR THE KIDS - 60/30/10 IMMUTABLE
    Author: Claude Opus 4.5 (The Architect)
#>

param(
    [switch]$CriticalOnly,
    [switch]$SaveResults,
    [string]$Node = "",
    [switch]$Json,
    [switch]$Silent
)

$ErrorActionPreference = "Continue"

# Paths
$REPO_ROOT = "C:\AiCollabForTheKids"
$SCRIPT_PATH = "$REPO_ROOT\scripts\fleet-health-monitor.js"
$LOG_DIR = "$REPO_ROOT\logs\fleet-health"

# Ensure log directory exists
if (-not (Test-Path $LOG_DIR)) {
    New-Item -ItemType Directory -Force -Path $LOG_DIR | Out-Null
}

# Build node command
$nodeArgs = @($SCRIPT_PATH)

if ($CriticalOnly) { $nodeArgs += "--critical-only" }
if ($SaveResults) { $nodeArgs += "--save" }
if ($Json) { $nodeArgs += "--json" }
if ($Node) { $nodeArgs += "--node=$Node" }

if (-not $Silent) {
    Write-Host "=========================================================================" -ForegroundColor Cyan
    Write-Host "  FLEET HEALTH CHECK - Gospel V1.3" -ForegroundColor Cyan
    Write-Host "=========================================================================" -ForegroundColor Cyan
    Write-Host "  Time: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Gray
    Write-Host "  Script: $SCRIPT_PATH" -ForegroundColor Gray
    Write-Host "=========================================================================" -ForegroundColor Cyan
    Write-Host ""
}

try {
    # Run the Node.js monitor
    $result = & node $nodeArgs 2>&1

    if (-not $Silent) {
        $result | ForEach-Object { Write-Host $_ }
    }

    if ($LASTEXITCODE -eq 0) {
        if (-not $Silent) {
            Write-Host ""
            Write-Host "[SUCCESS] Fleet health check completed" -ForegroundColor Green
        }
        exit 0
    } else {
        if (-not $Silent) {
            Write-Host ""
            Write-Host "[WARNING] Fleet health check found issues (exit code: $LASTEXITCODE)" -ForegroundColor Yellow
        }
        exit $LASTEXITCODE
    }
}
catch {
    Write-Host ""
    Write-Host "[ERROR] Fleet health check failed: $_" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red

    # Log error to file
    $errorLog = "$LOG_DIR\error-$(Get-Date -Format 'yyyy-MM-dd-HH-mm-ss').log"
    $_ | Out-File $errorLog
    Write-Host "Error logged to: $errorLog" -ForegroundColor Yellow

    exit 1
}
