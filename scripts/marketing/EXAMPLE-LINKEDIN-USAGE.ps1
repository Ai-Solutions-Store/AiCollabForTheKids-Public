# ═══════════════════════════════════════════════════════════════
# LINKEDIN MARKETING SCRIPT - USAGE EXAMPLES
# ═══════════════════════════════════════════════════════════════
# Script: linkedin-post.ps1
# Purpose: Example commands for LinkedIn marketing automation
# ═══════════════════════════════════════════════════════════════

<#
.SYNOPSIS
Usage examples for linkedin-post.ps1 script

.DESCRIPTION
This file contains example commands and workflows for the LinkedIn
marketing automation script. Copy and paste these commands as needed.

.NOTES
Before running, ensure LINKEDIN_ACCESS_TOKEN is set.
See README-LINKEDIN-POST.md for full setup instructions.
#>

# ═══════════════════════════════════════════════════════════════
# STEP 1: SET UP CREDENTIALS (ONE-TIME)
# ═══════════════════════════════════════════════════════════════

# Option A: Session-based (temporary - lasts until you close PowerShell)
$env:LINKEDIN_ACCESS_TOKEN = "YOUR_ACCESS_TOKEN_HERE"

# Option B: Load from api/.env (recommended for production)
# First, add to api/.env:
#   LINKEDIN_ACCESS_TOKEN=YOUR_ACCESS_TOKEN_HERE
#
# Then run:
Get-Content "C:\AiCollabForTheKids\api\.env" | ForEach-Object {
    if ($_ -match '^LINKEDIN_ACCESS_TOKEN=(.+)$') {
        $env:LINKEDIN_ACCESS_TOKEN = $matches[1]
        Write-Host "✅ LinkedIn token loaded from .env" -ForegroundColor Green
    }
}

# Verify token is set
if ($env:LINKEDIN_ACCESS_TOKEN) {
    Write-Host "✅ LINKEDIN_ACCESS_TOKEN is configured" -ForegroundColor Green
} else {
    Write-Host "❌ LINKEDIN_ACCESS_TOKEN not set" -ForegroundColor Red
}

# ═══════════════════════════════════════════════════════════════
# STEP 2: TEST WITH DRY RUN (RECOMMENDED FIRST TIME)
# ═══════════════════════════════════════════════════════════════

# Preview today's auto-selected post (no actual posting)
.\linkedin-post.ps1 -DryRun

# Preview specific product
.\linkedin-post.ps1 -ProductIndex 1 -DryRun  # Claude Droid
.\linkedin-post.ps1 -ProductIndex 2 -DryRun  # Income Droid
.\linkedin-post.ps1 -ProductIndex 3 -DryRun  # Marketing Engine
.\linkedin-post.ps1 -ProductIndex 4 -DryRun  # Jules AI
.\linkedin-post.ps1 -ProductIndex 5 -DryRun  # Affiliate System
.\linkedin-post.ps1 -ProductIndex 6 -DryRun  # Dating Platform

# ═══════════════════════════════════════════════════════════════
# STEP 3: POST TO LINKEDIN (LIVE)
# ═══════════════════════════════════════════════════════════════

# Auto-rotate by day (recommended for daily automation)
.\linkedin-post.ps1

# Post specific product manually
.\linkedin-post.ps1 -ProductIndex 1  # Claude Droid ($299)
.\linkedin-post.ps1 -ProductIndex 2  # Income Droid ($499)
.\linkedin-post.ps1 -ProductIndex 3  # Marketing Engine ($199)
.\linkedin-post.ps1 -ProductIndex 4  # Jules AI ($399)
.\linkedin-post.ps1 -ProductIndex 5  # Affiliate System ($599)
.\linkedin-post.ps1 -ProductIndex 6  # Dating Platform ($2,499)

# ═══════════════════════════════════════════════════════════════
# STEP 4: CHECK LOGS
# ═══════════════════════════════════════════════════════════════

# View recent log entries (last 20 lines)
Get-Content C:\AiCollabForTheKids\logs\linkedin-marketing.log -Tail 20

# View full log
Get-Content C:\AiCollabForTheKids\logs\linkedin-marketing.log

# Watch log in real-time (while script runs)
Get-Content C:\AiCollabForTheKids\logs\linkedin-marketing.log -Wait -Tail 10

# ═══════════════════════════════════════════════════════════════
# DAILY WORKFLOW EXAMPLE
# ═══════════════════════════════════════════════════════════════

# Morning marketing routine (run this daily at 9 AM)
function Run-DailyLinkedInMarketing {
    Write-Host "`n═══════════════════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host "DAILY LINKEDIN MARKETING - $(Get-Date -Format 'yyyy-MM-dd')" -ForegroundColor Cyan
    Write-Host "═══════════════════════════════════════════════════════`n" -ForegroundColor Cyan

    # Load credentials
    Get-Content "C:\AiCollabForTheKids\api\.env" | ForEach-Object {
        if ($_ -match '^LINKEDIN_ACCESS_TOKEN=(.+)$') {
            $env:LINKEDIN_ACCESS_TOKEN = $matches[1]
        }
    }

    # Preview what will be posted
    Write-Host "📋 Preview (Dry Run):" -ForegroundColor Yellow
    .\linkedin-post.ps1 -DryRun

    # Confirm before posting
    $confirm = Read-Host "`nPost to LinkedIn? (y/n)"
    if ($confirm -eq 'y') {
        # Post to LinkedIn
        .\linkedin-post.ps1

        Write-Host "`n✅ Daily LinkedIn post complete!" -ForegroundColor Green
    } else {
        Write-Host "`n❌ Posting cancelled" -ForegroundColor Yellow
    }
}

# Run the daily workflow
# Run-DailyLinkedInMarketing

# ═══════════════════════════════════════════════════════════════
# WEEKLY WORKFLOW EXAMPLE (Tuesday, Wednesday, Thursday)
# ═══════════════════════════════════════════════════════════════

function Run-WeeklyLinkedInMarketing {
    $dayOfWeek = (Get-Date).DayOfWeek

    # Only run on Tuesday (2), Wednesday (3), Thursday (4)
    if ($dayOfWeek -in @('Tuesday', 'Wednesday', 'Thursday')) {
        Write-Host "✅ Running LinkedIn marketing (optimal day: $dayOfWeek)" -ForegroundColor Green

        # Load credentials
        Get-Content "C:\AiCollabForTheKids\api\.env" | ForEach-Object {
            if ($_ -match '^LINKEDIN_ACCESS_TOKEN=(.+)$') {
                $env:LINKEDIN_ACCESS_TOKEN = $matches[1]
            }
        }

        # Post automatically (no confirmation)
        .\linkedin-post.ps1

        Write-Host "`n📊 Check engagement later today on LinkedIn" -ForegroundColor Cyan
    } else {
        Write-Host "⏭️  Skipping LinkedIn post (not an optimal day: $dayOfWeek)" -ForegroundColor Yellow
        Write-Host "💡 Best posting days: Tuesday, Wednesday, Thursday" -ForegroundColor White
    }
}

# Run the weekly workflow
# Run-WeeklyLinkedInMarketing

# ═══════════════════════════════════════════════════════════════
# AUTOMATED SCHEDULING (WINDOWS TASK SCHEDULER)
# ═══════════════════════════════════════════════════════════════

<#
Create a scheduled task to run automatically:

1. Open Task Scheduler
2. Create Basic Task
3. Name: "LinkedIn AI Store Marketing"
4. Trigger: Daily at 9:00 AM (or your preferred time)
5. Action: Start a program
   - Program: PowerShell.exe
   - Arguments: -File "C:\AiCollabForTheKids\scripts\marketing\linkedin-post.ps1"
   - Start in: C:\AiCollabForTheKids\scripts\marketing

OR use this PowerShell command to create the task:
#>

function Create-LinkedInScheduledTask {
    $action = New-ScheduledTaskAction `
        -Execute "PowerShell.exe" `
        -Argument "-ExecutionPolicy Bypass -File C:\AiCollabForTheKids\scripts\marketing\linkedin-post.ps1" `
        -WorkingDirectory "C:\AiCollabForTheKids\scripts\marketing"

    # Daily at 9 AM
    $trigger = New-ScheduledTaskTrigger -Daily -At "9:00AM"

    # Register the task
    Register-ScheduledTask `
        -TaskName "LinkedIn AI Store Marketing" `
        -Action $action `
        -Trigger $trigger `
        -Description "Automated LinkedIn posts for AI Solutions Store" `
        -User $env:USERNAME

    Write-Host "✅ Scheduled task created: LinkedIn AI Store Marketing" -ForegroundColor Green
    Write-Host "📅 Runs daily at 9:00 AM" -ForegroundColor White
}

# Create the scheduled task (uncomment to run)
# Create-LinkedInScheduledTask

# ═══════════════════════════════════════════════════════════════
# TROUBLESHOOTING COMMANDS
# ═══════════════════════════════════════════════════════════════

# Check if token is set
if ($env:LINKEDIN_ACCESS_TOKEN) {
    Write-Host "✅ Token is set (length: $($env:LINKEDIN_ACCESS_TOKEN.Length) characters)" -ForegroundColor Green
} else {
    Write-Host "❌ Token not set - run setup commands above" -ForegroundColor Red
}

# Test internet connectivity
Test-NetConnection api.linkedin.com -Port 443

# View script help
Get-Help .\linkedin-post.ps1 -Detailed

# Check script exists
if (Test-Path ".\linkedin-post.ps1") {
    Write-Host "✅ Script found at $(Resolve-Path '.\linkedin-post.ps1')" -ForegroundColor Green
} else {
    Write-Host "❌ Script not found - check current directory" -ForegroundColor Red
}

# ═══════════════════════════════════════════════════════════════
# PRODUCT ROTATION REFERENCE
# ═══════════════════════════════════════════════════════════════

<#
AUTOMATIC ROTATION BY DAY OF MONTH:

Day 1, 7, 13, 19, 25, 31  → Claude Droid ($299)
Day 2, 8, 14, 20, 26      → Income Droid ($499)
Day 3, 9, 15, 21, 27      → Marketing Engine ($199)
Day 4, 10, 16, 22, 28     → Jules AI ($399)
Day 5, 11, 17, 23, 29     → Affiliate System ($599)
Day 6, 12, 18, 24, 30     → Dating Platform ($2,499)

To check what will post today:
#>

$today = (Get-Date).Day
$productIndex = (($today - 1) % 6) + 1
$productNames = @(
    "Claude Droid ($299)",
    "Income Droid ($499)",
    "Marketing Engine ($199)",
    "Jules AI ($399)",
    "Affiliate System ($599)",
    "Dating Platform ($2,499)"
)

Write-Host "`n📅 Today is day $today of the month" -ForegroundColor Cyan
Write-Host "🎯 Product to post: $($productNames[$productIndex - 1])" -ForegroundColor Green
Write-Host "📝 Preview with: .\linkedin-post.ps1 -DryRun`n" -ForegroundColor Yellow

# ═══════════════════════════════════════════════════════════════
# QUICK REFERENCE
# ═══════════════════════════════════════════════════════════════

<#
MOST COMMON COMMANDS:

1. First time setup:
   $env:LINKEDIN_ACCESS_TOKEN = "your_token_here"

2. Preview before posting:
   .\linkedin-post.ps1 -DryRun

3. Post to LinkedIn:
   .\linkedin-post.ps1

4. Check logs:
   Get-Content C:\AiCollabForTheKids\logs\linkedin-marketing.log -Tail 20

5. Post specific product:
   .\linkedin-post.ps1 -ProductIndex 3

DOCUMENTATION:
- Setup Guide: README-LINKEDIN-POST.md
- Product Templates: linkedin-post-variations.md
- Marketing Content: C:\AiCollabForTheKids\marketing\linkedin-store-posts.md

SUPPORT:
- LinkedIn API Docs: https://docs.microsoft.com/linkedin/
- Store: https://ai-solutions.store
- Logs: C:\AiCollabForTheKids\logs\linkedin-marketing.log
#>

# ═══════════════════════════════════════════════════════════════
# FOR THE KIDS. ALWAYS.
# ═══════════════════════════════════════════════════════════════
