# ═══════════════════════════════════════════════════════════════
# AI SOLUTIONS STORE - BLUESKY MARKETING AUTOMATION
# ═══════════════════════════════════════════════════════════════
# Purpose: Post promotional content to Bluesky (AT Protocol)
# Service: AI automation products and services
# URL: https://ai-solutions.store
# Platform: Bluesky AT Protocol API
# ═══════════════════════════════════════════════════════════════

<#
.SYNOPSIS
Automated Bluesky posting for AI Solutions Store marketing

.DESCRIPTION
Posts value-focused, professional content to Bluesky using the AT Protocol API.
Features rotating product content with business value messaging and proper hashtags.

.PARAMETER Product
Product to promote (claude-droid, income-droid, marketing-engine, jules-ai,
affiliate-system, dating-platform). If not specified, rotates based on day of month.

.PARAMETER DryRun
Test mode - shows what would be posted without actually posting

.EXAMPLE
.\bluesky-post.ps1
Posts the product based on current day rotation

.EXAMPLE
.\bluesky-post.ps1 -Product "claude-droid" -DryRun
Shows what would be posted for Claude Droid without posting

.NOTES
Requires Bluesky credentials in environment variables:
- BLUESKY_HANDLE (your-handle.bsky.social)
- BLUESKY_APP_PASSWORD (generated in Bluesky Settings > App Passwords)

Bluesky Best Practices:
- Consistent posting frequency (1-3x daily)
- Engage with replies and mentions
- Use relevant hashtags (3-5 per post)
- Include links for call-to-action
- Professional, value-focused content
#>

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("claude-droid", "income-droid", "marketing-engine", "jules-ai", "affiliate-system", "dating-platform")]
    [string]$Product,

    [switch]$DryRun
)

# ═══════════════════════════════════════════════════════════════
# CONFIGURATION
# ═══════════════════════════════════════════════════════════════

# Bluesky Credentials (from environment variables)
$BlueskyHandle = $env:BLUESKY_HANDLE
$BlueskyPassword = $env:BLUESKY_APP_PASSWORD

# Bluesky API Configuration
$BaseUrl = "https://bsky.social"
$AuthEndpoint = "$BaseUrl/xrpc/com.atproto.server.createSession"
$PostEndpoint = "$BaseUrl/xrpc/com.atproto.repo.createRecord"

# Script configuration
$LogPath = "C:\AiCollabForTheKids\logs\bluesky-marketing.log"
$StoreUrl = "https://ai-solutions.store"

# ═══════════════════════════════════════════════════════════════
# POST CONTENT TEMPLATES
# ═══════════════════════════════════════════════════════════════

$PostTemplates = @{
    "claude-droid" = @(
        @"
Tired of spending hours creating video content?

Claude Droid generates professional YouTube Shorts automatically:
• Trending news → Video script (AI-powered)
• Text-to-speech voiceover
• Auto-upload to YouTube
• 4 posts/day on autopilot

Turn content creation into a "set it and forget it" system.

$StoreUrl

#AIAutomation #ContentCreation #YouTubeAutomation #AITools #VideoMarketing
"@,
        @"
What if your YouTube channel posted content while you sleep?

Claude Droid does exactly that:
✅ Pulls trending topics
✅ Generates scripts with AI
✅ Creates voiceover + video
✅ Uploads on schedule

No filming. No editing. Just consistent content.

$StoreUrl

#ContentAutomation #AIVideo #YouTubeShorts #PassiveIncome #MarketingTools
"@,
        @"
Video content drives engagement. Creating it manually kills productivity.

Claude Droid solves this:
• Automated news-to-video pipeline
• AI script generation (Claude API)
• Professional voiceovers (TTS)
• Scheduled uploads (4x daily)

Build your YouTube presence without the grind.

$StoreUrl

#AIContent #VideoAutomation #ContentMarketing #AIForBusiness #Productivity
"@
    )

    "income-droid" = @(
        @"
Most YouTube channels die because consistency is hard.

Income Droid automates the entire process:
📹 Creates videos daily (no manual work)
📊 Tracks revenue metrics
⏰ Posts at optimal times
💰 Designed for monetization

Build passive income while you focus on other projects.

$StoreUrl

#PassiveIncome #YouTubeAutomation #AIMonetization #SideHustle #ContentCreation
"@,
        @"
The math on automated content is compelling:

Manual: 15 hours/week creating videos
Automated: 0 hours/week (Income Droid runs 24/7)

Time reclaimed: 780 hours/year
Monetization: AdSense + affiliates + sponsors

This is time arbitrage at scale.

$StoreUrl

#YouTubeIncome #AutomatedRevenue #TimeArbitrage #AIBusiness #ContentMonetization
"@,
        @"
Revenue opportunities don't sleep. Your content strategy shouldn't either.

Income Droid:
✓ Creates and posts 4x daily
✓ Optimizes for monetization
✓ Tracks watch time and revenue
✓ Zero ongoing effort

Turn YouTube into a passive income stream.

$StoreUrl

#PassiveRevenue #YouTubeBot #ContentAutomation #AIIncome #SideProject
"@
    )

    "marketing-engine" = @(
        @"
Social media consistency is killing your evenings and weekends.

Marketing Engine reclaims your time:
• AI generates platform-specific posts
• Auto-posts at optimal times
• 4x daily across channels
• Review in 30-min batches

Trade 15 hours/week for 30 minutes.

$StoreUrl

#MarketingAutomation #SocialMediaTools #AIMarketing #SmallBusiness #Productivity
"@,
        @"
The hidden cost of manual social media: mental overhead.

Marketing Engine eliminates it:
✅ Consistent posting (no gaps)
✅ Platform optimization
✅ Brand voice alignment
✅ Minimal human review

Focus on strategy. Let AI handle execution.

$StoreUrl

#ContentAutomation #AIContent #SocialMediaAutomation #BusinessTools #MarketingAI
"@,
        @"
12+ hours/week spent on social media posting.

What if you reclaimed that time?

Marketing Engine:
• AI-powered content generation
• Multi-platform posting
• Optimal timing
• Human-in-the-loop approval

Consistency without burnout.

$StoreUrl

#DigitalMarketing #AIAutomation #SocialMedia #TimeManagement #BusinessEfficiency
"@
    )

    "jules-ai" = @(
        @"
DevOps operations eat 40-60% of small team time.

Jules AI handles it autonomously:
• Git workflow management
• Deployment orchestration
• Infrastructure monitoring
• Auto-remediation

Stop babysitting your pipeline. Let AI run it.

$StoreUrl

#DevOps #AIOperations #InfrastructureAutomation #CloudAutomation #DevTools
"@,
        @"
What if your entire DevOps pipeline required zero human oversight?

Jules AI does this:
✓ Code conflict resolution
✓ Automated deployments
✓ Multi-service orchestration
✓ Rollback safety built-in

Deployment time: 45 min → 8 min (avg)

$StoreUrl

#CloudOps #AIDevOps #AutomatedDeployment #TechTools #Infrastructure
"@,
        @"
Solo founders spend more time on operations than building product.

Jules AI fixes this:
• Manages entire CI/CD pipeline
• Orchestrates multi-service releases
• Monitors + auto-remediates issues
• Deep context understanding

Focus on product. AI handles infrastructure.

$StoreUrl

#DevAutomation #AIForDevelopers #CloudManagement #TechAutomation #SoloFounder
"@
    )

    "affiliate-system" = @(
        @"
Affiliate platforms charge 20-30% + monthly fees.

What if you owned the infrastructure instead?

Affiliate System (white-label):
✓ Complete source code
✓ Unlimited affiliates
✓ Zero platform fees
✓ Your brand, your domain

Pay once. Own forever.

$StoreUrl

#AffiliateMarketing #WhiteLabel #Ecommerce #SaaS #MarketingTools
"@,
        @"
The economics of platform fees are brutal:

Impact/ShareASale: $500/mo + 20% fees
Over 3 years: $30K+ minimum

Alternative: Buy the entire system once.

Affiliate System:
• Full source code
• Self-hosted
• 100% economics

$StoreUrl

#AffiliateSoftware #WhiteLabelSoftware #Bootstrapped #SaaS #BusinessTools
"@,
        @"
Building an affiliate program in-house: 6+ months.
Using a platform: Expensive ongoing fees.

Third option: White-label ready system.

Affiliate System includes:
📊 Real-time analytics
💰 Commission management
🔗 Tracking system
🎨 Fully brandable

$StoreUrl

#AffiliateProgram #MarketingTech #WhiteLabel #EcommerceTech #SaaSTool
"@
    )

    "dating-platform" = @(
        @"
Dating apps have a trust problem. AI bots everywhere.

Solution: Human-verified only platform.

Dating Platform (white-label):
✓ Video verification system
✓ AI detection on messages
✓ Complete source code
✓ Subscription billing ready

Build for your niche.

$StoreUrl

#DatingApp #WhiteLabel #TrustTech #NicheMarket #SaaS
"@,
        @"
The dating app market is commoditized at scale. But niches are underserved.

Dating Platform gives you:
• Video verification tech
• Anti-bot/anti-AI tools
• Full source code
• Payment infrastructure

Target your community. Own the platform.

$StoreUrl

#DatingTech #NicheDating #WhiteLabelApp #MarketplaceApp #TechFounder
"@,
        @"
Video verification reduces fake dating profiles by 95%.

Dating Platform includes:
✅ Live verification system
✅ AI message detection
✅ Subscription management
✅ Complete source code

Build a trusted dating app for your niche.

$StoreUrl

#DatingPlatform #VerifiedProfiles #WhiteLabel #SocialApp #TrustAndSafety
"@
    )
}

# ═══════════════════════════════════════════════════════════════
# HELPER FUNCTIONS
# ═══════════════════════════════════════════════════════════════

function Get-BlueskyAccessToken {
    <#
    .SYNOPSIS
    Authenticate with Bluesky API and get access token

    .DESCRIPTION
    Creates a session using Bluesky handle and app password.
    Returns access token (JWT) for authenticated API requests.
    Token expires after a few minutes, so create fresh for each post.
    #>

    Write-Host "Authenticating with Bluesky..." -ForegroundColor Yellow

    # Build request body
    $authBody = @{
        identifier = $BlueskyHandle
        password = $BlueskyPassword
    } | ConvertTo-Json

    # Request headers
    $headers = @{
        "Content-Type" = "application/json"
    }

    try {
        $response = Invoke-RestMethod -Uri $AuthEndpoint -Method Post -Headers $headers -Body $authBody

        Write-Host "Authentication successful" -ForegroundColor Green
        Write-Host "DID: $($response.did)" -ForegroundColor Gray

        return @{
            AccessToken = $response.accessJwt
            Did = $response.did
        }
    }
    catch {
        Write-Host "Authentication failed" -ForegroundColor Red

        if ($_.Exception.Response) {
            $errorStream = $_.Exception.Response.GetResponseStream()
            $reader = New-Object System.IO.StreamReader($errorStream)
            $errorBody = $reader.ReadToEnd()
            Write-Host "Bluesky API Error: $errorBody" -ForegroundColor Red
        }
        else {
            Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
        }

        throw "Bluesky authentication failed"
    }
}

function Submit-BlueskyPost {
    <#
    .SYNOPSIS
    Submit a post to Bluesky

    .DESCRIPTION
    Creates a post record using com.atproto.repo.createRecord endpoint.
    Posts use the app.bsky.feed.post schema.

    .PARAMETER AccessToken
    JWT access token from Get-BlueskyAccessToken

    .PARAMETER Did
    Decentralized identifier for the user account

    .PARAMETER Text
    Post content (max 300 characters recommended)
    #>
    param(
        [string]$AccessToken,
        [string]$Did,
        [string]$Text
    )

    Write-Host "Submitting post to Bluesky..." -ForegroundColor Yellow

    # Get current timestamp in ISO 8601 format
    $timestamp = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ")

    # Build post record (follows app.bsky.feed.post schema)
    $record = @{
        text = $Text
        createdAt = $timestamp
        # Note: Links, mentions, and embeds can be added here
    }

    # Build request body
    $postBody = @{
        repo = $Did
        collection = "app.bsky.feed.post"
        record = $record
    } | ConvertTo-Json -Depth 10

    # Request headers
    $headers = @{
        "Authorization" = "Bearer $AccessToken"
        "Content-Type" = "application/json"
    }

    try {
        $response = Invoke-RestMethod -Uri $PostEndpoint -Method Post -Headers $headers -Body $postBody

        Write-Host "Post submitted successfully" -ForegroundColor Green

        return $response
    }
    catch {
        Write-Host "Post submission failed" -ForegroundColor Red

        if ($_.Exception.Response) {
            $errorStream = $_.Exception.Response.GetResponseStream()
            $reader = New-Object System.IO.StreamReader($errorStream)
            $errorBody = $reader.ReadToEnd()
            Write-Host "Bluesky API Error: $errorBody" -ForegroundColor Red
        }
        else {
            Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
        }

        throw "Bluesky post submission failed"
    }
}

function Get-PostUrl {
    <#
    .SYNOPSIS
    Construct Bluesky post URL from handle and record key

    .DESCRIPTION
    Bluesky post URLs follow the format:
    https://bsky.app/profile/{handle}/post/{rkey}

    .PARAMETER Handle
    User's Bluesky handle (e.g., user.bsky.social)

    .PARAMETER RecordKey
    Post record key (rkey) from API response
    #>
    param(
        [string]$Handle,
        [string]$RecordKey
    )

    return "https://bsky.app/profile/$Handle/post/$RecordKey"
}

# ═══════════════════════════════════════════════════════════════
# MAIN EXECUTION
# ═══════════════════════════════════════════════════════════════

Write-Host "`n═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "AI SOLUTIONS STORE - BLUESKY MARKETING AUTOMATION" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════════`n" -ForegroundColor Cyan

# Validate credentials
if (-not $BlueskyHandle -or -not $BlueskyPassword) {
    Write-Host "ERROR: Missing Bluesky credentials" -ForegroundColor Red
    Write-Host "`nRequired environment variables:" -ForegroundColor Yellow
    Write-Host "  - BLUESKY_HANDLE (your-handle.bsky.social)" -ForegroundColor White
    Write-Host "  - BLUESKY_APP_PASSWORD (from Settings > App Passwords)" -ForegroundColor White
    Write-Host "`nHow to get credentials:" -ForegroundColor Yellow
    Write-Host "  1. Log into Bluesky app or web" -ForegroundColor White
    Write-Host "  2. Go to Settings > App Passwords" -ForegroundColor White
    Write-Host "  3. Click 'Add App Password'" -ForegroundColor White
    Write-Host "  4. Copy the generated password (shown once only)" -ForegroundColor White
    Write-Host "  5. Set environment variables in PowerShell or .env file`n" -ForegroundColor White
    exit 1
}

# Select product (rotate based on day of month if not specified)
$ProductList = @("claude-droid", "income-droid", "marketing-engine", "jules-ai", "affiliate-system", "dating-platform")

if (-not $Product) {
    $dayOfMonth = (Get-Date).Day
    $productIndex = ($dayOfMonth - 1) % $ProductList.Count
    $Product = $ProductList[$productIndex]
    Write-Host "Auto-selected product: $Product (day $dayOfMonth rotation)" -ForegroundColor Cyan
}

# Get post variations for selected product
$variations = $PostTemplates[$Product]
if (-not $variations) {
    Write-Host "ERROR: No post templates found for product: $Product" -ForegroundColor Red
    exit 1
}

# Select variation (rotate based on hour of day)
$hourOfDay = (Get-Date).Hour
$variationIndex = $hourOfDay % $variations.Count
$postText = $variations[$variationIndex]

# Display post preview
Write-Host "`nPost Preview:" -ForegroundColor Yellow
Write-Host "───────────────────────────────────────────────────────────────" -ForegroundColor DarkGray
Write-Host "Product: $Product" -ForegroundColor White
Write-Host "Variation: $($variationIndex + 1) of $($variations.Count)" -ForegroundColor White
Write-Host "Length: $($postText.Length) characters" -ForegroundColor White
Write-Host "`nContent:" -ForegroundColor Yellow
Write-Host $postText -ForegroundColor White
Write-Host "───────────────────────────────────────────────────────────────`n" -ForegroundColor DarkGray

# DRY RUN MODE
if ($DryRun) {
    Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Green
    Write-Host "DRY RUN MODE - NO POST SUBMITTED" -ForegroundColor Green
    Write-Host "═══════════════════════════════════════════════════════════════`n" -ForegroundColor Green

    Write-Host "This post would be submitted to Bluesky" -ForegroundColor Yellow
    Write-Host "Remove -DryRun flag to actually post`n" -ForegroundColor Yellow

    exit 0
}

# Authenticate with Bluesky
try {
    $authResult = Get-BlueskyAccessToken
    $accessToken = $authResult.AccessToken
    $did = $authResult.Did
}
catch {
    Write-Host "`nAuthentication failed. Cannot proceed with post submission.`n" -ForegroundColor Red
    exit 1
}

# Submit post
try {
    $result = Submit-BlueskyPost -AccessToken $accessToken -Did $did -Text $postText

    Write-Host "`n═══════════════════════════════════════════════════════════════" -ForegroundColor Green
    Write-Host "SUCCESS - POST SUBMITTED!" -ForegroundColor Green
    Write-Host "═══════════════════════════════════════════════════════════════`n" -ForegroundColor Green

    # Extract record key (rkey) from URI
    # URI format: at://{did}/app.bsky.feed.post/{rkey}
    $rkey = $result.uri -replace '.*/', ''

    $postUrl = Get-PostUrl -Handle $BlueskyHandle -RecordKey $rkey

    Write-Host "Post URL: $postUrl" -ForegroundColor Cyan
    Write-Host "Post CID: $($result.cid)" -ForegroundColor White
    Write-Host "Product: $Product" -ForegroundColor White
    Write-Host "`nTip: Monitor and engage with replies for best results!`n" -ForegroundColor Yellow

    # Log success
    $logEntry = "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] SUCCESS - Product: $Product - URL: $postUrl"

    # Create logs directory if it doesn't exist
    $logDir = Split-Path $LogPath -Parent
    if (-not (Test-Path $logDir)) {
        New-Item -ItemType Directory -Path $logDir -Force | Out-Null
    }

    Add-Content -Path $LogPath -Value $logEntry -ErrorAction SilentlyContinue

    exit 0
}
catch {
    Write-Host "`n═══════════════════════════════════════════════════════════════" -ForegroundColor Red
    Write-Host "ERROR - POST SUBMISSION FAILED" -ForegroundColor Red
    Write-Host "═══════════════════════════════════════════════════════════════`n" -ForegroundColor Red

    Write-Host "Troubleshooting:" -ForegroundColor Yellow
    Write-Host "1. Verify BLUESKY_HANDLE is correct (include .bsky.social)" -ForegroundColor White
    Write-Host "2. Verify BLUESKY_APP_PASSWORD is valid (regenerate if needed)" -ForegroundColor White
    Write-Host "3. Check Bluesky service status at status.bsky.app" -ForegroundColor White
    Write-Host "4. Ensure post text is under 300 characters" -ForegroundColor White
    Write-Host "5. Check app password hasn't been revoked in settings`n" -ForegroundColor White

    # Log failure
    $logEntry = "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] FAILED - Product: $Product - Error: $($_.Exception.Message)"

    # Create logs directory if it doesn't exist
    $logDir = Split-Path $LogPath -Parent
    if (-not (Test-Path $logDir)) {
        New-Item -ItemType Directory -Path $logDir -Force | Out-Null
    }

    Add-Content -Path $LogPath -Value $logEntry -ErrorAction SilentlyContinue

    exit 1
}

# ═══════════════════════════════════════════════════════════════
# SCRIPT INFORMATION
# ═══════════════════════════════════════════════════════════════
# Created: 2025-12-21
# Purpose: AI Solutions Store Bluesky marketing automation
# Platform: Bluesky AT Protocol
# Service: https://ai-solutions.store
#
# Products:
# - Claude Droid ($299) - AI video generator
# - Income Droid ($499) - Video monetization automation
# - Marketing Engine ($199) - Social media automation
# - Jules AI ($399) - Business AI assistant
# - Affiliate System ($599) - White-label affiliate platform
# - Dating Platform ($2,499) - Full source code
#
# Authentication:
# - Uses Bluesky app passwords (not main account password)
# - App passwords are one-time generated tokens
# - Created in: Settings > App Passwords
# - More secure than using main password
#
# API Endpoints:
# - Auth: com.atproto.server.createSession
# - Post: com.atproto.repo.createRecord
# - Schema: app.bsky.feed.post
#
# Best Practices:
# - Post 1-3x daily for consistency
# - Engage with replies within first hour
# - Use 3-5 relevant hashtags
# - Include call-to-action links
# - Professional, value-focused content
# - Avoid spammy or sales-heavy messaging
#
# Rate Limits:
# - Bluesky has rate limits (not publicly documented)
# - Recommended: Max 10-15 posts per day
# - Space posts at least 1-2 hours apart
# - Monitor for API errors indicating rate limits
#
# Logging:
# - All posts logged to: logs/bluesky-marketing.log
# - Includes timestamp, product, and post URL
# - Failures logged with error details
#
# ═══════════════════════════════════════════════════════════════
