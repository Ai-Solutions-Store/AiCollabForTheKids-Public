<#
.SYNOPSIS
    9020 PM2 Service Fix Script - Gospel V1.3
.DESCRIPTION
    Fixes PM2 services on 9020 node (Anthropic Tribute Node).
    Ensures directory structure exists and starts dao-governance service.
.NOTES
    Author: Claude Opus 4.5 (The Architect)
    Platform: FOR THE KIDS - 60/30/10 IMMUTABLE
    Target: 9020 (192.168.0.103 - Windows)
#>

$ErrorActionPreference = "Continue"

# Configuration
$NODE_IP = "192.168.0.103"
$NODE_USER = "joshl"
$SSH_KEY = "$env:USERPROFILE\.ssh\id_ed25519"
$SSH_EXE = "C:\Program Files\Git\usr\bin\ssh.exe"

# Fallback to Windows SSH
if (-not (Test-Path $SSH_EXE)) {
    $SSH_EXE = "C:\Windows\System32\OpenSSH\ssh.exe"
}

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

function Invoke-SSH {
    param([string]$Command)

    try {
        $result = & $SSH_EXE -i $SSH_KEY -o ConnectTimeout=30 -o StrictHostKeyChecking=no "$NODE_USER@$NODE_IP" $Command 2>&1
        return @{
            Success = $LASTEXITCODE -eq 0
            Output = $result
            ExitCode = $LASTEXITCODE
        }
    }
    catch {
        return @{
            Success = $false
            Output = $_.Exception.Message
            ExitCode = -1
        }
    }
}

Write-Host ""
Write-Host "=========================================================================" -ForegroundColor Cyan
Write-Host "  9020 PM2 SERVICE FIX - GOSPEL V1.3" -ForegroundColor Cyan
Write-Host "=========================================================================" -ForegroundColor Cyan
Write-Host "  Target: $NODE_IP ($NODE_USER)" -ForegroundColor Gray
Write-Host "  SSH Key: $SSH_KEY" -ForegroundColor Gray
Write-Host "=========================================================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Test SSH connectivity
Write-Status "Testing SSH connectivity to 9020..." "INFO"
$test = Invoke-SSH "echo SSH_OK"
if (-not $test.Success -or $test.Output -notmatch "SSH_OK") {
    Write-Status "SSH connection failed!" "ERROR"
    Write-Host $test.Output
    exit 1
}
Write-Status "SSH connection successful" "OK"

# Step 2: Check if repository exists
Write-Status "Checking repository..." "INFO"
$check = Invoke-SSH "dir C:\AiCollabForTheKids 2>nul && echo EXISTS || echo MISSING"
if ($check.Output -notmatch "EXISTS") {
    Write-Status "Repository missing on 9020! Clone it first." "ERROR"
    exit 1
}
Write-Status "Repository found" "OK"

# Step 3: Create required directories
Write-Status "Creating required directories..." "INFO"
$dirs = @(
    "C:\AiCollabForTheKids\fleet\dao\data",
    "C:\AiCollabForTheKids\logs\pm2"
)

foreach ($dir in $dirs) {
    $escaped = $dir.Replace('\', '/')
    $cmd = "New-Item -ItemType Directory -Force -Path `"$escaped`" | Out-Null; echo CREATED"
    $result = Invoke-SSH $cmd
    if ($result.Output -match "CREATED") {
        Write-Status "Created: $dir" "OK"
    }
}

# Step 4: Stop any existing PM2 services
Write-Status "Stopping existing PM2 services..." "INFO"
$stop = Invoke-SSH "pm2 delete all"
Write-Status "Cleared PM2 processes" "OK"

# Step 5: Start dao-governance service
Write-Status "Starting dao-governance service..." "INFO"
$start = Invoke-SSH "cd C:/AiCollabForTheKids/fleet && pm2 start dao/index.cjs --name dao-governance"
if ($start.Output -match "online" -or $start.Output -match "launched") {
    Write-Status "dao-governance started successfully" "OK"
} else {
    Write-Status "Failed to start dao-governance" "ERROR"
    Write-Host $start.Output
}

# Step 6: Save PM2 configuration
Write-Status "Saving PM2 configuration..." "INFO"
$save = Invoke-SSH "pm2 save"
if ($save.Output -match "Successfully saved") {
    Write-Status "PM2 configuration saved" "OK"
} else {
    Write-Status "Warning: PM2 save may have failed" "WARN"
}

# Step 7: Verify services are running
Write-Status "Verifying services..." "INFO"
Start-Sleep -Seconds 2
$verify = Invoke-SSH "pm2 list"
Write-Host ""
Write-Host "PM2 Status on 9020:" -ForegroundColor Yellow
Write-Host $verify.Output
Write-Host ""

# Step 8: Test dao-governance health endpoint
Write-Status "Testing dao-governance health endpoint..." "INFO"
Start-Sleep -Seconds 3
$health = Invoke-SSH "curl http://localhost:4002/health"
if ($health.Output -match "OPERATIONAL" -or $health.Output -match "DAO Governance") {
    Write-Status "Health check PASSED" "OK"
    Write-Host $health.Output
} else {
    Write-Status "Health check FAILED - Service may not be listening" "WARN"
    Write-Host "Response: $($health.Output)"
}

Write-Host ""
Write-Host "=========================================================================" -ForegroundColor Cyan
Write-Host "  9020 PM2 FIX COMPLETE" -ForegroundColor Cyan
Write-Host "=========================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Status "9020 Anthropic Tribute Node is configured" "OK"
Write-Status "dao-governance should be running on port 4002" "OK"
Write-Host ""
Write-Host "  FOR THE KIDS - 60/30/10 IMMUTABLE" -ForegroundColor Green
Write-Host "=========================================================================" -ForegroundColor Cyan
Write-Host ""
