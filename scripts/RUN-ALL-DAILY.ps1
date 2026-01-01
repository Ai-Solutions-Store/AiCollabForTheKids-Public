# ═══════════════════════════════════════════════════════════════
# RUN-ALL-DAILY.ps1 - Force Multiplier Launch Script
# Gospel V1.3 - 60/30/10 IMMUTABLE
# FOR THE KIDS
# ═══════════════════════════════════════════════════════════════

Write-Host @"
═══════════════════════════════════════════════════════════════
  FORCE MULTIPLIER - DAILY OPERATIONS LAUNCHER

  Starting all monitoring and automation agents...

  GOSPEL V1.3 - 60/30/10 IMMUTABLE
  FOR THE KIDS
═══════════════════════════════════════════════════════════════
"@ -ForegroundColor Cyan

# ─────────────────────────────────────────────────────────────────
# CONFIGURATION
# ─────────────────────────────────────────────────────────────────
$PROJECT_ROOT = "C:\AiCollabForTheKids"
$AGENTS_DIR = "$PROJECT_ROOT\agents"
$AUTOMATION_DIR = "$PROJECT_ROOT\infrastructure\automation"

# Load environment variables from api/.env
$envFile = "$PROJECT_ROOT\api\.env"
if (Test-Path $envFile) {
    Write-Host "[CONFIG] Loading environment from api/.env" -ForegroundColor Green
    Get-Content $envFile | ForEach-Object {
        if ($_ -match '^([^#][^=]+)=(.*)$') {
            $name = $matches[1].Trim()
            $value = $matches[2].Trim()
            [Environment]::SetEnvironmentVariable($name, $value, 'Process')
        }
    }
}

# ─────────────────────────────────────────────────────────────────
# FUNCTION: Start-Agent
# ─────────────────────────────────────────────────────────────────
function Start-Agent {
    param(
        [string]$Name,
        [string]$Path,
        [int]$Port = 0
    )

    Write-Host "`n[AGENT] Starting $Name..." -ForegroundColor Yellow

    if (-not (Test-Path $Path)) {
        Write-Host "[ERROR] Script not found: $Path" -ForegroundColor Red
        return $false
    }

    try {
        if ($Port -gt 0) {
            $env:PORT = $Port
        }

        # Start in background
        Start-Process -FilePath "node" -ArgumentList $Path -WindowStyle Hidden -PassThru | Out-Null
        Write-Host "[OK] $Name started successfully" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "[ERROR] Failed to start $Name : $_" -ForegroundColor Red
        return $false
    }
}

# ─────────────────────────────────────────────────────────────────
# AGENT STARTUP SEQUENCE
# ─────────────────────────────────────────────────────────────────
Write-Host "`n[PHASE 1] Starting Core Agents..." -ForegroundColor Magenta

# Agent Array: Name, Path, Port
$agents = @(
    @{ Name = "GPAA (Gospel Auditor)"; Path = "$AGENTS_DIR\gospel-auditor\index.js"; Port = 3015 },
    @{ Name = "Gospel Fixer"; Path = "$AGENTS_DIR\gospel-fixer\index.js"; Port = 3016 },
    @{ Name = "ICB (Internal Compliance)"; Path = "$AGENTS_DIR\icb\index.js"; Port = 3017 },
    @{ Name = "Fiduciary Search"; Path = "$AGENTS_DIR\fiduciary-search\index.js"; Port = 3014 }
)

$coreStarted = 0
foreach ($agent in $agents) {
    if (Test-Path $agent.Path) {
        if (Start-Agent -Name $agent.Name -Path $agent.Path -Port $agent.Port) {
            $coreStarted++
        }
    } else {
        Write-Host "[SKIP] $($agent.Name) - not found" -ForegroundColor DarkGray
    }
}

Write-Host "`n[PHASE 2] Starting Force Multiplier Scripts..." -ForegroundColor Magenta

# Force Multiplier Scripts
$multipliers = @(
    @{ Name = "Kickstarter Momentum Monitor"; Path = "$AUTOMATION_DIR\kickstarter\momentum_monitor.js" },
    @{ Name = "GitHub Code Scout"; Path = "$AUTOMATION_DIR\github\code_scout_agent.js" }
)

$multiplierStarted = 0
foreach ($script in $multipliers) {
    if (Test-Path $script.Path) {
        if (Start-Agent -Name $script.Name -Path $script.Path) {
            $multiplierStarted++
        }
    } else {
        Write-Host "[SKIP] $($script.Name) - not found" -ForegroundColor DarkGray
    }
}

# ─────────────────────────────────────────────────────────────────
# STATUS REPORT
# ─────────────────────────────────────────────────────────────────
Write-Host @"

═══════════════════════════════════════════════════════════════
  FORCE MULTIPLIER - STARTUP COMPLETE

  Core Agents Started: $coreStarted / $($agents.Count)
  Multipliers Started: $multiplierStarted / $($multipliers.Count)

  ACTIVE MONITORS:
  - GPAA: http://localhost:3015/health
  - Gospel Fixer: http://localhost:3016/health
  - ICB: http://localhost:3017/health
  - Fiduciary Search: http://localhost:3014/health

  FORCE MULTIPLIERS:
  - Kickstarter Monitor: Checking every 5 minutes
  - GitHub Code Scout: Checking every 2 minutes

  GOSPEL V1.3 - 60/30/10 IMMUTABLE
  FOR THE KIDS. ALWAYS.
═══════════════════════════════════════════════════════════════
"@ -ForegroundColor Green

# ─────────────────────────────────────────────────────────────────
# OPTIONAL: Keep window open
# ─────────────────────────────────────────────────────────────────
Write-Host "`nPress any key to exit (agents continue running in background)..." -ForegroundColor DarkGray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
