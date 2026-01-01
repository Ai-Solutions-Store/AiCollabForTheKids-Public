# ═══════════════════════════════════════════════════════════════════════════════
# 24/7 MARKETING ENGINE - AI SOLUTIONS STORE
# ═══════════════════════════════════════════════════════════════════════════════
#
# Continuous marketing automation that NEVER stops generating funds for the kids.
# When one task completes, a new one spawns. 24/7/365.
#
# Run on: Sabertooth (192.168.0.104) or T5500 (192.168.0.101)
#
# FOR THE KIDS - Gospel V1.3 (60/30/10)
# ═══════════════════════════════════════════════════════════════════════════════

param(
    [switch]$Test,
    [int]$IntervalMinutes = 60
)

$ErrorActionPreference = "Continue"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$LogFile = "C:\AiCollabForTheKids\logs\marketing-engine.log"

# Ensure log directory exists
New-Item -ItemType Directory -Force -Path (Split-Path $LogFile) | Out-Null

function Write-Log {
    param([string]$Message, [string]$Level = "INFO")
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logEntry = "[$timestamp] [$Level] $Message"
    Add-Content -Path $LogFile -Value $logEntry

    switch ($Level) {
        "ERROR" { Write-Host $logEntry -ForegroundColor Red }
        "SUCCESS" { Write-Host $logEntry -ForegroundColor Green }
        "WARN" { Write-Host $logEntry -ForegroundColor Yellow }
        default { Write-Host $logEntry -ForegroundColor Cyan }
    }
}

# Marketing task definitions
$MarketingTasks = @(
    @{
        Name = "Twitter-AI-Store"
        Script = "$ScriptDir\ai-store-tweet.ps1"
        Description = "Tweet about AI Solutions Store products"
        Interval = 240  # 4 hours
        LastRun = $null
    },
    @{
        Name = "Discord-Announcement"
        Script = "$ScriptDir\ai-store-discord.ps1"
        Description = "Post to Discord channels"
        Interval = 360  # 6 hours
        LastRun = $null
    },
    @{
        Name = "Twitter-Urgency"
        Script = "$ScriptDir\..\urgency-tweet.ps1"
        Description = "Urgency-based tweet for conversions"
        Interval = 480  # 8 hours
        LastRun = $null
    },
    @{
        Name = "Twitter-Founder-Story"
        Script = "$ScriptDir\..\founder-tweet.ps1"
        Description = "Founder story engagement tweet"
        Interval = 720  # 12 hours
        LastRun = $null
    },
    @{
        Name = "Twitter-AI-Story"
        Script = "$ScriptDir\..\ai-story-tweet.ps1"
        Description = "AI journey storytelling"
        Interval = 600  # 10 hours
        LastRun = $null
    }
)

# Content variations for dynamic posts
$ProductHighlights = @(
    @{ Product = "Claude Droid"; Price = 299; Hook = "Turn news into YouTube Shorts automatically" },
    @{ Product = "Income Droid"; Price = 499; Hook = "4 revenue-optimized videos daily" },
    @{ Product = "Marketing Engine"; Price = 199; Hook = "Auto-post to social media 4x daily" },
    @{ Product = "Jules AI"; Price = 399; Hook = "Your AI business director" },
    @{ Product = "Affiliate System"; Price = 599; Hook = "White-label affiliate platform" },
    @{ Product = "Dating Platform"; Price = 2499; Hook = "Full anti-AI dating app source" }
)

$CallToActions = @(
    "Check it out: https://ai-solutions.store",
    "Get yours: https://ai-solutions.store",
    "Start building: https://ai-solutions.store",
    "Explore now: https://ai-solutions.store",
    "See what's possible: https://ai-solutions.store"
)

$Hashtags = @(
    "#AI #Automation #SaaS",
    "#AITools #BuildInPublic",
    "#NoCode #AI #Startup",
    "#PassiveIncome #AI",
    "#TechStartup #AI"
)

function Get-RandomMarketingContent {
    $product = $ProductHighlights | Get-Random
    $cta = $CallToActions | Get-Random
    $tags = $Hashtags | Get-Random

    $templates = @(
        "$($product.Hook). $($product.Product) - `$$($product.Price) one-time. $cta $tags",
        "Stop doing it manually. $($product.Product) automates $($product.Hook.ToLower()). $cta $tags",
        "Built with Claude Opus 4.5: $($product.Product). $($product.Hook). $cta $tags",
        "What if you could $($product.Hook.ToLower())? Now you can. $cta $tags",
        "$($product.Product) does what you've been trying to do manually. `$$($product.Price). $cta $tags"
    )

    return $templates | Get-Random
}

function Invoke-MarketingTask {
    param([hashtable]$Task)

    Write-Log "Starting task: $($Task.Name)" "INFO"

    if (Test-Path $Task.Script) {
        try {
            $result = & powershell.exe -ExecutionPolicy Bypass -File $Task.Script 2>&1
            Write-Log "Task completed: $($Task.Name)" "SUCCESS"
            Write-Log "Output: $result" "INFO"
            return $true
        } catch {
            Write-Log "Task failed: $($Task.Name) - $($_.Exception.Message)" "ERROR"
            return $false
        }
    } else {
        Write-Log "Script not found: $($Task.Script)" "WARN"
        return $false
    }
}

function Start-MarketingLoop {
    Write-Log "═══════════════════════════════════════════════════════════════" "INFO"
    Write-Log "24/7 MARKETING ENGINE STARTED" "SUCCESS"
    Write-Log "Node: $env:COMPUTERNAME" "INFO"
    Write-Log "Interval: $IntervalMinutes minutes between cycles" "INFO"
    Write-Log "Tasks: $($MarketingTasks.Count) configured" "INFO"
    Write-Log "═══════════════════════════════════════════════════════════════" "INFO"

    $cycleCount = 0

    while ($true) {
        $cycleCount++
        Write-Log "═══ MARKETING CYCLE $cycleCount ═══" "INFO"

        foreach ($task in $MarketingTasks) {
            $now = Get-Date
            $shouldRun = $false

            if ($null -eq $task.LastRun) {
                # First run - stagger tasks
                $shouldRun = $true
            } else {
                $minutesSinceLastRun = ($now - $task.LastRun).TotalMinutes
                if ($minutesSinceLastRun -ge $task.Interval) {
                    $shouldRun = $true
                }
            }

            if ($shouldRun) {
                $success = Invoke-MarketingTask -Task $task
                if ($success) {
                    $task.LastRun = $now
                }
                # Small delay between tasks to avoid rate limits
                Start-Sleep -Seconds 30
            } else {
                $nextRun = $task.LastRun.AddMinutes($task.Interval)
                Write-Log "Skipping $($task.Name) - next run at $($nextRun.ToString('HH:mm'))" "INFO"
            }
        }

        # Generate dynamic content idea for next cycle
        $nextContent = Get-RandomMarketingContent
        Write-Log "Next content idea: $nextContent" "INFO"

        Write-Log "Cycle $cycleCount complete. Sleeping $IntervalMinutes minutes..." "INFO"
        Write-Log "FOR THE KIDS. ALWAYS." "SUCCESS"

        if ($Test) {
            Write-Log "Test mode - exiting after one cycle" "INFO"
            break
        }

        Start-Sleep -Seconds ($IntervalMinutes * 60)
    }
}

# Main execution
Write-Log "═══════════════════════════════════════════════════════════════" "INFO"
Write-Log "AI SOLUTIONS STORE - 24/7 MARKETING ENGINE" "INFO"
Write-Log "FOR THE KIDS - Gospel V1.3 (60/30/10)" "INFO"
Write-Log "═══════════════════════════════════════════════════════════════" "INFO"

if ($Test) {
    Write-Log "Running in TEST mode - single cycle only" "WARN"
}

Start-MarketingLoop
