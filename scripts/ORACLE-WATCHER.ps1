# ═══════════════════════════════════════════════════════════════
# ORACLE-WATCHER.ps1 - 24/7 monitoring with SMS alerts
# FOR THE KIDS - Gospel V1.3
# ═══════════════════════════════════════════════════════════════

$ErrorActionPreference = "Continue"
$checkInterval = 300  # 5 minutes

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

    # Strip surrounding quotes if present
    if ($value.Length -ge 2) {
      if (($value.StartsWith('"') -and $value.EndsWith('"')) -or ($value.StartsWith("'") -and $value.EndsWith("'"))) {
        $value = $value.Substring(1, $value.Length - 2)
      }
    }

    [Environment]::SetEnvironmentVariable($key, $value, 'Process')
  }
}

# Load credentials from api\.env (source of truth) into Process env
$apiEnvPath = "C:\AiCollabForTheKids\api\.env"
Import-DotEnvFile -Path $apiEnvPath

# Twilio Configuration (read from env; do not hardcode secrets)
$twilioSid = $env:TWILIO_ACCOUNT_SID
$twilioToken = $env:TWILIO_AUTH_TOKEN
$twilioFrom = $env:TWILIO_PHONE_NUMBER
$twilioTo = $env:JOSHUA_PHONE

$logDir = "C:\AiCollabForTheKids\logs"
if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Path $logDir -Force | Out-Null }
$logFile = "$logDir\oracle-watcher-$(Get-Date -Format 'yyyyMMdd').log"

function Log($msg) {
  $timestamp = Get-Date -Format 'HH:mm:ss'
  "$timestamp $msg" | Tee-Object -Append $logFile
}

function SendSMS($msg) {
  if (-not $twilioSid -or -not $twilioToken -or -not $twilioFrom -or -not $twilioTo) {
    Log "SMS DISABLED: Missing TWILIO_* env vars"
    return
  }

  try {
    $auth = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("${twilioSid}:${twilioToken}"))
    $body = @{
      To   = $twilioTo
      From = $twilioFrom
      Body = "[GOSPEL ALERT] $msg"
    }
    $uri = "https://api.twilio.com/2010-04-01/Accounts/$twilioSid/Messages.json"
    Invoke-RestMethod -Uri $uri -Method Post -Headers @{Authorization = "Basic $auth" } -Body $body -ErrorAction Stop
    Log "SMS SENT: $msg"
  }
  catch {
    Log "SMS FAILED: $($_.Exception.Message)"
  }
}

# Health check endpoints
$healthChecks = @(
  @{Name = "jules-dashboard"; Url = "https://jules-dashboard.pages.dev/kickstarter"; Critical = $true },
  @{Name = "transparency-page"; Url = "https://jules-dashboard.pages.dev/transparency"; Critical = $true }
)

# Track consecutive failures
$failCounts = @{}
foreach ($check in $healthChecks) {
  $failCounts[$check.Name] = 0
}

Log "═══════════════════════════════════════════════════════════════"
Log "     ORACLE WATCHER STARTED - FOR THE KIDS"
Log "     Monitoring: $($healthChecks.Count) endpoints"
Log "     Interval: ${checkInterval}s | Alert threshold: 3 failures"
Log "     SMS: $([bool]($twilioSid -and $twilioToken -and $twilioFrom -and $twilioTo))"
Log "═══════════════════════════════════════════════════════════════"

$startupMsg = "Oracle Watcher started on T5500. Monitoring $($healthChecks.Count) endpoints."
# Uncomment to send SMS on startup: SendSMS $startupMsg

while ($true) {
  foreach ($check in $healthChecks) {
    try {
      $response = Invoke-WebRequest -Uri $check.Url -TimeoutSec 10 -ErrorAction Stop
      if ($response.StatusCode -eq 200) {
        if ($failCounts[$check.Name] -gt 0) {
          Log "✅ $($check.Name) RECOVERED"
          if ($failCounts[$check.Name] -ge 3) {
            SendSMS "$($check.Name) RECOVERED - Back online"
          }
        }
        $failCounts[$check.Name] = 0
      }
    }
    catch {
      $failCounts[$check.Name]++
      Log "❌ $($check.Name) FAILED (count: $($failCounts[$check.Name]))"
            
      if ($failCounts[$check.Name] -eq 3 -and $check.Critical) {
        SendSMS "$($check.Name) DOWN - 3 consecutive failures at $(Get-Date -Format 'HH:mm')"
      }
    }
  }
    
  Start-Sleep -Seconds $checkInterval
}
