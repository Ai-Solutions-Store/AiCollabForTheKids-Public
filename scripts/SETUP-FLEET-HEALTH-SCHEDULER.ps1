<#
.SYNOPSIS
    Setup Windows Task Scheduler for Fleet Health Monitoring
.DESCRIPTION
    Creates a scheduled task to run fleet health checks every 15 minutes.
    Alerts are sent to Telegram/Discord for critical issues.
.NOTES
    Platform: FOR THE KIDS - 60/30/10 IMMUTABLE
    Author: Claude Opus 4.5 (The Architect)

    Run this script as Administrator to create the scheduled task.
#>

param(
    [int]$IntervalMinutes = 15,
    [switch]$Remove,
    [switch]$Disable,
    [switch]$Enable
)

$ErrorActionPreference = "Stop"

$TASK_NAME = "Gospel-Fleet-Health-Monitor"
$SCRIPT_PATH = "C:\AiCollabForTheKids\scripts\RUN-FLEET-HEALTH-CHECK.ps1"
$LOG_PATH = "C:\AiCollabForTheKids\logs\fleet-health\scheduled-task.log"

function Write-Status {
    param([string]$Message, [string]$Type = "INFO")
    $color = switch ($Type) {
        "OK"    { "Green" }
        "WARN"  { "Yellow" }
        "ERROR" { "Red" }
        "INFO"  { "Cyan" }
        default { "White" }
    }
    Write-Host "[$Type] $Message" -ForegroundColor $color
}

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Status "This script must be run as Administrator" "ERROR"
    Write-Host ""
    Write-Host "Right-click PowerShell and select 'Run as Administrator', then run:" -ForegroundColor Yellow
    Write-Host "  cd C:\AiCollabForTheKids" -ForegroundColor White
    Write-Host "  .\scripts\SETUP-FLEET-HEALTH-SCHEDULER.ps1" -ForegroundColor White
    exit 1
}

Write-Host ""
Write-Host "=========================================================================" -ForegroundColor Cyan
Write-Host "  FLEET HEALTH SCHEDULER SETUP - Gospel V1.3" -ForegroundColor Cyan
Write-Host "=========================================================================" -ForegroundColor Cyan
Write-Host ""

# Remove existing task
if ($Remove) {
    try {
        Unregister-ScheduledTask -TaskName $TASK_NAME -Confirm:$false -ErrorAction SilentlyContinue
        Write-Status "Scheduled task removed: $TASK_NAME" "OK"
    }
    catch {
        Write-Status "No task found to remove" "WARN"
    }
    exit 0
}

# Disable task
if ($Disable) {
    try {
        Disable-ScheduledTask -TaskName $TASK_NAME | Out-Null
        Write-Status "Scheduled task disabled: $TASK_NAME" "OK"
    }
    catch {
        Write-Status "Failed to disable task: $_" "ERROR"
    }
    exit 0
}

# Enable task
if ($Enable) {
    try {
        Enable-ScheduledTask -TaskName $TASK_NAME | Out-Null
        Write-Status "Scheduled task enabled: $TASK_NAME" "OK"
    }
    catch {
        Write-Status "Failed to enable task: $_" "ERROR"
    }
    exit 0
}

# ═══════════════════════════════════════════════════════════════
# CREATE SCHEDULED TASK
# ═══════════════════════════════════════════════════════════════

Write-Status "Creating scheduled task: $TASK_NAME" "INFO"
Write-Status "Interval: Every $IntervalMinutes minutes" "INFO"
Write-Status "Script: $SCRIPT_PATH" "INFO"
Write-Host ""

# Remove existing task if it exists
Unregister-ScheduledTask -TaskName $TASK_NAME -Confirm:$false -ErrorAction SilentlyContinue | Out-Null

# Create action
$action = New-ScheduledTaskAction `
    -Execute "PowerShell.exe" `
    -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$SCRIPT_PATH`" -SaveResults -Silent" `
    -WorkingDirectory "C:\AiCollabForTheKids"

# Create trigger (repeating every X minutes)
$trigger = New-ScheduledTaskTrigger `
    -Once `
    -At (Get-Date) `
    -RepetitionInterval (New-TimeSpan -Minutes $IntervalMinutes)

# Create settings
$settings = New-ScheduledTaskSettingsSet `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -StartWhenAvailable `
    -RunOnlyIfNetworkAvailable `
    -MultipleInstances IgnoreNew

# Create principal (run as current user)
$principal = New-ScheduledTaskPrincipal `
    -UserId $env:USERNAME `
    -LogonType S4U `
    -RunLevel Highest

# Register task
try {
    Register-ScheduledTask `
        -TaskName $TASK_NAME `
        -Action $action `
        -Trigger $trigger `
        -Settings $settings `
        -Principal $principal `
        -Description "FOR THE KIDS Fleet Health Monitor - Checks all nodes every $IntervalMinutes minutes and alerts on critical issues" `
        | Out-Null

    Write-Status "Scheduled task created successfully!" "OK"
    Write-Host ""
    Write-Host "Task Details:" -ForegroundColor Cyan
    Write-Host "  Name: $TASK_NAME" -ForegroundColor White
    Write-Host "  Interval: Every $IntervalMinutes minutes" -ForegroundColor White
    Write-Host "  User: $env:USERNAME" -ForegroundColor White
    Write-Host ""

    # Show next run time
    $task = Get-ScheduledTask -TaskName $TASK_NAME
    $taskInfo = Get-ScheduledTaskInfo -TaskName $TASK_NAME
    Write-Host "  Status: $($task.State)" -ForegroundColor Green
    Write-Host "  Next Run: $($taskInfo.NextRunTime)" -ForegroundColor Green
    Write-Host ""

    # Test run the task
    Write-Host "Running initial health check..." -ForegroundColor Cyan
    Start-ScheduledTask -TaskName $TASK_NAME
    Start-Sleep -Seconds 2

    Write-Host ""
    Write-Host "Setup complete! The fleet health monitor is now running every $IntervalMinutes minutes." -ForegroundColor Green
    Write-Host ""
    Write-Host "Management Commands:" -ForegroundColor Cyan
    Write-Host "  Disable: .\scripts\SETUP-FLEET-HEALTH-SCHEDULER.ps1 -Disable" -ForegroundColor White
    Write-Host "  Enable:  .\scripts\SETUP-FLEET-HEALTH-SCHEDULER.ps1 -Enable" -ForegroundColor White
    Write-Host "  Remove:  .\scripts\SETUP-FLEET-HEALTH-SCHEDULER.ps1 -Remove" -ForegroundColor White
    Write-Host ""
    Write-Host "View Logs:" -ForegroundColor Cyan
    Write-Host "  dir C:\AiCollabForTheKids\logs\fleet-health\" -ForegroundColor White
    Write-Host ""
}
catch {
    Write-Status "Failed to create scheduled task: $_" "ERROR"
    Write-Host $_.Exception.Message -ForegroundColor Red
    exit 1
}

Write-Host "=========================================================================" -ForegroundColor Cyan
Write-Host "  FOR THE KIDS - 60/30/10 IMMUTABLE" -ForegroundColor Green
Write-Host "=========================================================================" -ForegroundColor Cyan
Write-Host ""
