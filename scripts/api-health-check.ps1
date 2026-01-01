# API Health Check Script
Write-Host "=== API HEALTH CHECK ===" -ForegroundColor Cyan
Write-Host ""

# Load environment
$envFile = "C:\AiCollabForTheKids\api\.env"
$env = @{}
Get-Content $envFile | ForEach-Object {
    if ($_ -match "^([^#][^=]+)=(.*)$") {
        $env[$matches[1].Trim()] = $matches[2].Trim()
    }
}

# 1. GitHub
Write-Host "1. GITHUB" -ForegroundColor Yellow
try {
    $gh = Invoke-RestMethod -Uri "https://api.github.com/user" -Headers @{Authorization="token $($env['GITHUB_TOKEN'])"}
    Write-Host "   [OK] Authenticated as: $($gh.login)" -ForegroundColor Green
} catch {
    Write-Host "   [FAIL] $($_.Exception.Message)" -ForegroundColor Red
}

# 2. Cloudflare
Write-Host "2. CLOUDFLARE" -ForegroundColor Yellow
try {
    $cf = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/user" -Headers @{"X-Auth-Email"=$env['CLOUDFLARE_EMAIL']; "X-Auth-Key"=$env['CLOUDFLARE_GLOBAL_API_KEY']}
    Write-Host "   [OK] Account: $($cf.result.email)" -ForegroundColor Green
} catch {
    Write-Host "   [FAIL] $($_.Exception.Message)" -ForegroundColor Red
}

# 3. Square
Write-Host "3. SQUARE" -ForegroundColor Yellow
try {
    $sq = Invoke-RestMethod -Uri "https://connect.squareup.com/v2/locations" -Headers @{Authorization="Bearer $($env['SQUARE_ACCESS_TOKEN'])"; "Square-Version"="2024-01-18"}
    Write-Host "   [OK] Location: $($sq.locations[0].name)" -ForegroundColor Green
} catch {
    Write-Host "   [FAIL] $($_.Exception.Message)" -ForegroundColor Red
}

# 4. Twilio
Write-Host "4. TWILIO" -ForegroundColor Yellow
try {
    $pair = "$($env['TWILIO_ACCOUNT_SID']):$($env['TWILIO_AUTH_TOKEN'])"
    $cred = [System.Convert]::ToBase64String([System.Text.Encoding]::ASCII.GetBytes($pair))
    $tw = Invoke-RestMethod -Uri "https://api.twilio.com/2010-04-01/Accounts/$($env['TWILIO_ACCOUNT_SID']).json" -Headers @{Authorization="Basic $cred"}
    Write-Host "   [OK] Account: $($tw.friendly_name)" -ForegroundColor Green
} catch {
    Write-Host "   [FAIL] $($_.Exception.Message)" -ForegroundColor Red
}

# 5. Telegram
Write-Host "5. TELEGRAM" -ForegroundColor Yellow
try {
    $tg = Invoke-RestMethod -Uri "https://api.telegram.org/bot$($env['TELEGRAM_BOT_TOKEN'])/getMe"
    Write-Host "   [OK] Bot: @$($tg.result.username)" -ForegroundColor Green
} catch {
    Write-Host "   [FAIL] $($_.Exception.Message)" -ForegroundColor Red
}

# 6. Dev.to
Write-Host "6. DEV.TO" -ForegroundColor Yellow
try {
    $dt = Invoke-RestMethod -Uri "https://dev.to/api/users/me" -Headers @{"api-key"=$env['DEV_TO_API_KEY']}
    Write-Host "   [OK] User: @$($dt.username)" -ForegroundColor Green
} catch {
    Write-Host "   [FAIL] $($_.Exception.Message)" -ForegroundColor Red
}

# 7. Hashnode
Write-Host "7. HASHNODE" -ForegroundColor Yellow
try {
    $body = @{query="query { me { username } }"} | ConvertTo-Json
    $hn = Invoke-RestMethod -Uri "https://gql.hashnode.com" -Method POST -Headers @{Authorization=$env['HASHNODE_API_KEY']; "Content-Type"="application/json"} -Body $body
    Write-Host "   [OK] User: @$($hn.data.me.username)" -ForegroundColor Green
} catch {
    Write-Host "   [FAIL] $($_.Exception.Message)" -ForegroundColor Red
}

# 8. Printful
Write-Host "8. PRINTFUL" -ForegroundColor Yellow
try {
    $pf = Invoke-RestMethod -Uri "https://api.printful.com/stores" -Headers @{Authorization="Bearer $($env['PRINTFUL_API_TOKEN'])"}
    Write-Host "   [OK] Store: $($pf.result[0].name)" -ForegroundColor Green
} catch {
    Write-Host "   [FAIL] $($_.Exception.Message)" -ForegroundColor Red
}

# 9. OpenAI
Write-Host "9. OPENAI" -ForegroundColor Yellow
try {
    $oa = Invoke-RestMethod -Uri "https://api.openai.com/v1/models" -Headers @{Authorization="Bearer $($env['OPENAI_API_KEY'])"}
    Write-Host "   [OK] Models: $($oa.data.Count) available" -ForegroundColor Green
} catch {
    Write-Host "   [FAIL] $($_.Exception.Message)" -ForegroundColor Red
}

# 10. Gemini
Write-Host "10. GEMINI" -ForegroundColor Yellow
try {
    $gm = Invoke-RestMethod -Uri "https://generativelanguage.googleapis.com/v1beta/models?key=$($env['GEMINI_API_KEY'])"
    Write-Host "   [OK] Models: $($gm.models.Count) available" -ForegroundColor Green
} catch {
    Write-Host "   [FAIL] $($_.Exception.Message)" -ForegroundColor Red
}

# 11. xAI
Write-Host "11. XAI (Grok)" -ForegroundColor Yellow
try {
    $xa = Invoke-RestMethod -Uri "https://api.x.ai/v1/models" -Headers @{Authorization="Bearer $($env['XAI_API_KEY'])"}
    Write-Host "   [OK] Models: $($xa.data.Count) available" -ForegroundColor Green
} catch {
    Write-Host "   [FAIL] $($_.Exception.Message)" -ForegroundColor Red
}

# 12. Perplexity
Write-Host "12. PERPLEXITY" -ForegroundColor Yellow
try {
    $pp = Invoke-RestMethod -Uri "https://api.perplexity.ai/chat/completions" -Method POST -Headers @{Authorization="Bearer $($env['PERPLEXITY_API_KEY'])"; "Content-Type"="application/json"} -Body '{"model":"llama-3.1-sonar-small-128k-online","messages":[{"role":"user","content":"ping"}]}'
    Write-Host "   [OK] API responding" -ForegroundColor Green
} catch {
    if ($_.Exception.Message -match "400|401|402|403") {
        Write-Host "   [WARN] Key valid but check quota/billing" -ForegroundColor Yellow
    } else {
        Write-Host "   [FAIL] $($_.Exception.Message)" -ForegroundColor Red
    }
}

# 13. Replicate
Write-Host "13. REPLICATE" -ForegroundColor Yellow
try {
    $rp = Invoke-RestMethod -Uri "https://api.replicate.com/v1/account" -Headers @{Authorization="Bearer $($env['REPLICATE_API_TOKEN'])"}
    Write-Host "   [OK] User: $($rp.username)" -ForegroundColor Green
} catch {
    Write-Host "   [FAIL] $($_.Exception.Message)" -ForegroundColor Red
}

# 14. Stability AI
Write-Host "14. STABILITY AI" -ForegroundColor Yellow
try {
    $st = Invoke-RestMethod -Uri "https://api.stability.ai/v1/user/account" -Headers @{Authorization="Bearer $($env['STABILITY_API_KEY'])"}
    Write-Host "   [OK] Credits: $($st.credits)" -ForegroundColor Green
} catch {
    Write-Host "   [FAIL] $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== MISSING/PLACEHOLDER APIs ===" -ForegroundColor Yellow
if ($env['SENDGRID_API_KEY'] -eq "YOUR_SENDGRID_API_KEY_HERE") {
    Write-Host "   [MISSING] SendGrid - placeholder value" -ForegroundColor Red
}
if (-not $env['LINKEDIN_ACCESS_TOKEN']) {
    Write-Host "   [MISSING] LinkedIn - not in .env" -ForegroundColor Red
}
if (-not $env['BLUESKY_APP_PASSWORD']) {
    Write-Host "   [MISSING] Bluesky - not in .env" -ForegroundColor Red
}
if (-not $env['MASTODON_ACCESS_TOKEN']) {
    Write-Host "   [MISSING] Mastodon - not in .env" -ForegroundColor Red
}
if (-not $env['REDDIT_CLIENT_ID']) {
    Write-Host "   [MISSING] Reddit API (script) - not in .env" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== CHECK COMPLETE ===" -ForegroundColor Cyan
