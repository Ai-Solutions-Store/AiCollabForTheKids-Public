# ═══════════════════════════════════════════════════════════════
# STARTUP-GOSPEL.ps1 - Runs on every Windows boot
# FOR THE KIDS - Gospel V1.3
# ═══════════════════════════════════════════════════════════════

$ErrorActionPreference = "Continue"
$logDir = "C:\AiCollabForTheKids\logs"
if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Path $logDir -Force | Out-Null }
$logFile = "$logDir\startup-$(Get-Date -Format 'yyyyMMdd').log"

function Import-DotEnvFile {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Path
  )

  if (-not (Test-Path $Path)) {
    return
  }

  foreach ($line in (Get-Content -Path $Path -ErrorAction SilentlyContinue)) {
    if (-not $line) { continue }
    $trimmed = $line.Trim()
    if ($trimmed.StartsWith('#')) { continue }
    if (-not ($trimmed -match '^[A-Za-z_][A-Za-z0-9_]*=')) { continue }

    $parts = $trimmed.Split('=', 2)
    $key = $parts[0]
    $value = $parts[1]

    if ($value.Length -ge 2) {
      if (($value.StartsWith('"') -and $value.EndsWith('"')) -or ($value.StartsWith("'") -and $value.EndsWith("'"))) {
        $value = $value.Substring(1, $value.Length - 2)
      }
    }

    [Environment]::SetEnvironmentVariable($key, $value, 'Process')
  }
}

function Test-HttpOk {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Url,
    [int]$TimeoutSec = 8
  )
  try {
    $r = Invoke-WebRequest -UseBasicParsing -Uri $Url -TimeoutSec $TimeoutSec -ErrorAction Stop
    return ($r.StatusCode -eq 200)
  }
  catch {
    return $false
  }
}

function Log($msg) {
  $timestamp = Get-Date -Format 'HH:mm:ss'
  "$timestamp $msg" | Tee-Object -Append $logFile
}

Log "═══════════════════════════════════════════════════════════════"
Log "           GOSPEL STARTUP INITIATED - FOR THE KIDS"
Log "═══════════════════════════════════════════════════════════════"

# Load credentials from api\.env (source of truth) into Process env
$apiEnvPath = "C:\AiCollabForTheKids\api\.env"
Import-DotEnvFile -Path $apiEnvPath

# Wait for network
Log "Waiting for network..."
Start-Sleep -Seconds 10

# Start Docker Desktop
Log "Starting Docker Desktop..."
$dockerPath = "C:\Program Files\Docker\Docker\Docker Desktop.exe"
if (Test-Path $dockerPath) {
  Start-Process $dockerPath -WindowStyle Minimized
  Log "Docker Desktop starting..."
  Start-Sleep -Seconds 45
}
else {
  Log "WARNING: Docker Desktop not found at $dockerPath"
}

# Start PM2 services
Log "Starting PM2 services..."
try {
  $pm2Cmd = Join-Path $env:APPDATA "npm\pm2.cmd"
  if (Test-Path $pm2Cmd) {
    & $pm2Cmd resurrect | Out-Null
    $pm2Status = & $pm2Cmd list --no-daemon 2>&1
    $onlineCount = ($pm2Status | Select-String "online").Count
    Log "PM2: $onlineCount services online"
  }
  else {
    Log "WARNING: PM2 not found at $pm2Cmd"
  }
}
catch {
  Log "ERROR starting PM2: $($_.Exception.Message)"
}

# Start Cloudflare Tunnel
Log "Starting Cloudflare tunnel..."
try {
  $externalApiOk = Test-HttpOk -Url "https://api.aidoesitall.website/health" -TimeoutSec 10
  if ($externalApiOk) {
    Log "Cloudflare: external API already OK"
  }
  else {
    $cfg = Join-Path $env:USERPROFILE ".cloudflared\config.yml"
    $cloudflaredExe = "C:\Program Files (x86)\cloudflared\cloudflared.exe"

    # If multiple user-mode cloudflared instances are running, keep only one.
    $expectedArgFragment = "--config $cfg"
    $userProcs = @()
    try {
      $procs = Get-CimInstance Win32_Process -Filter "Name='cloudflared.exe'" -ErrorAction Stop
      foreach ($p in $procs) {
        if ($p.CommandLine -and ($p.CommandLine -like "*$expectedArgFragment*")) {
          $userProcs += $p
        }
      }
    }
    catch {
      # ignore
    }

    if ($userProcs.Count -gt 1) {
      $toKill = $userProcs | Sort-Object ProcessId | Select-Object -Skip 1
      foreach ($p in $toKill) {
        try { Stop-Process -Id $p.ProcessId -Force -ErrorAction SilentlyContinue } catch {}
      }
      Log "Cloudflare: cleaned up duplicate user tunnel processes"
    }

    $stillOk = Test-HttpOk -Url "https://api.aidoesitall.website/health" -TimeoutSec 10
    if (-not $stillOk) {
      if ((Test-Path $cloudflaredExe) -and (Test-Path $cfg)) {
        # Start user-mode tunnel with known-good config (service may be misconfigured)
        Start-Process -FilePath $cloudflaredExe -ArgumentList @('tunnel', '--config', $cfg, 'run') -WindowStyle Hidden
        Log "Cloudflare: started user-mode tunnel with user config"
        Start-Sleep -Seconds 8
      }
      else {
        Log "WARNING: cloudflared exe or config missing (exeExists=$(Test-Path $cloudflaredExe) cfgExists=$(Test-Path $cfg))"
      }
    }
  }
}
catch {
  Log "ERROR starting Cloudflare: $($_.Exception.Message)"
}

# Start Oracle Watcher
Log "Starting Oracle Watcher..."
try {
  $oracleScript = "C:\AiCollabForTheKids\scripts\ORACLE-WATCHER.ps1"
  if (Test-Path $oracleScript) {
    Start-Process powershell -ArgumentList "-WindowStyle Hidden -ExecutionPolicy Bypass -File $oracleScript" -WindowStyle Hidden
    Log "Oracle Watcher started"
  }
  else {
    Log "WARNING: Oracle Watcher script not found"
  }
}
catch {
  Log "ERROR starting Oracle Watcher: $_"
}

# Verify services
Start-Sleep -Seconds 10
Log "Verifying services..."

# Check API health
try {
  $response = Invoke-WebRequest -Uri "http://localhost:3000/health" -TimeoutSec 5 -ErrorAction SilentlyContinue
  if ($response.StatusCode -eq 200) {
    Log "✅ API Health: OK"
  }
  else {
    Log "⚠️ API Health: Status $($response.StatusCode)"
  }
}
catch {
  Log "❌ API Health: Not responding"
}

# Check external endpoints (best-effort)
try {
  if (Test-HttpOk -Url "https://api.aidoesitall.website/health" -TimeoutSec 10) {
    Log "✅ External API Health: OK"
  }
  else {
    Log "❌ External API Health: FAIL"
  }
}
catch {}

Log "═══════════════════════════════════════════════════════════════"
Log "           GOSPEL STARTUP COMPLETE - FOR THE KIDS"
Log "═══════════════════════════════════════════════════════════════"
