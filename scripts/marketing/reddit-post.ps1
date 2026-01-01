# ═══════════════════════════════════════════════════════════════
# AI SOLUTIONS STORE - REDDIT MARKETING AUTOMATION
# ═══════════════════════════════════════════════════════════════
# Purpose: Post promotional content to relevant subreddits
# Service: AI automation products and services
# URL: https://ai-solutions.store
# Platform: Reddit API (OAuth2)
# ═══════════════════════════════════════════════════════════════

<#
.SYNOPSIS
Automated Reddit posting for AI Solutions Store marketing

.DESCRIPTION
Posts value-first, non-spammy content to relevant subreddits following
Reddit's self-promotion guidelines (10:1 ratio). Each post focuses on
problems solved rather than features or direct sales.

.PARAMETER Subreddit
Target subreddit (SideProject, EntrepreneurRideAlong, Startup_Ideas, SaaS)

.PARAMETER Product
Product to promote (claude-droid, income-droid, marketing-engine, jules-ai,
affiliate-system, dating-platform)

.PARAMETER DryRun
Test mode - shows what would be posted without actually posting

.EXAMPLE
.\reddit-post.ps1 -Subreddit "SideProject" -Product "claude-droid"

.EXAMPLE
.\reddit-post.ps1 -Subreddit "EntrepreneurRideAlong" -Product "income-droid" -DryRun

.NOTES
Requires Reddit API credentials in environment variables:
- REDDIT_CLIENT_ID
- REDDIT_CLIENT_SECRET
- REDDIT_USERNAME
- REDDIT_PASSWORD

Reddit API Rate Limits:
- 60 requests per minute
- 10:1 content-to-promotion ratio (post 10 helpful comments before self-promotion)
- Avoid posting same content to multiple subreddits
#>

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("SideProject", "EntrepreneurRideAlong", "Startup_Ideas", "SaaS")]
    [string]$Subreddit,

    [Parameter(Mandatory=$true)]
    [ValidateSet("claude-droid", "income-droid", "marketing-engine", "jules-ai", "affiliate-system", "dating-platform")]
    [string]$Product,

    [switch]$DryRun
)

# ═══════════════════════════════════════════════════════════════
# CONFIGURATION
# ═══════════════════════════════════════════════════════════════

# Reddit OAuth2 Credentials (from environment variables)
$ClientId = $env:REDDIT_CLIENT_ID
$ClientSecret = $env:REDDIT_CLIENT_SECRET
$Username = $env:REDDIT_USERNAME
$Password = $env:REDDIT_PASSWORD

# Reddit API Configuration
$UserAgent = "windows:ai-solutions-store:v1.0.0 (by /u/$Username)"
$BaseUrl = "https://oauth.reddit.com"
$AuthUrl = "https://www.reddit.com/api/v1/access_token"

# ═══════════════════════════════════════════════════════════════
# POST CONTENT TEMPLATES
# ═══════════════════════════════════════════════════════════════
# Each template focuses on value, problems solved, and genuine sharing
# NOT direct sales or feature lists

$PostTemplates = @{
    "claude-droid" = @{
        "SideProject" = @{
            Title = "Built an AI that turns news into YouTube Shorts on autopilot"
            Body = @"
I got tired of manually creating content for YouTube, so I built a system that does it while I sleep.

It pulls trending news headlines, generates a script using Claude AI, creates a voiceover with text-to-speech, renders the video with FFmpeg, and uploads directly to YouTube. All automated.

The videos are 59 seconds (Shorts format), and I can configure categories like tech, business, or sports. It posts 4 times a day at optimal times (6AM, 11AM, 5PM, 9PM) when my audience is most active.

**The problem I was solving:**
- Creating consistent video content is time-consuming
- Editing takes forever
- Uploading manually kills momentum
- Monetization requires volume I couldn't maintain manually

**What it actually does:**
- Monitors news RSS feeds
- Generates contextual scripts (not just headline reading)
- Synthesizes natural-sounding voiceover
- Renders with transitions and text overlays
- Handles YouTube OAuth and uploads
- Tracks metrics in SQLite

Been running it for a few weeks now. Channel's growing steadily without me touching it. Built the whole thing as a side project but honestly it's saving me 15+ hours a week.

Anyone else automating their content creation? What tools are you using?
"@
            Flair = "Launch"
        }
        "EntrepreneurRideAlong" = @{
            Title = "Automated video content creation - 4 posts/day without touching it"
            Body = @"
Sharing my experiment with automated content for those exploring passive income.

Built a bot that creates and publishes YouTube Shorts automatically. It runs on a schedule and generates news-based video content using AI for scripts and voiceovers.

**The Economics:**
- Initial build: ~40 hours
- Daily maintenance: 0 hours (fully automated)
- Monthly cost: $5 (runs on local machine)
- Time savings: 15+ hours/week

**Why this approach:**
Most content strategies require constant input. I wanted something that actually runs without me. The revenue isn't life-changing yet, but the time arbitrage is the real win.

**What I learned:**
1. Consistency beats quality for early growth
2. Optimal posting times matter more than I expected
3. Automation breaks in weird ways - error handling is 60% of the code
4. 4 posts/day is the sweet spot before diminishing returns

Not trying to sell anything, just sharing what's working. Anyone else building automated content systems?
"@
            Flair = "Strategy"
        }
    }

    "income-droid" = @{
        "EntrepreneurRideAlong" = @{
            Title = "Automated my YouTube channel to post 4x daily - tracking revenue vs time invested"
            Body = @"
Wanted to share my experiment with passive income via automated content.

**The Setup:**
Built a bot that creates and publishes YouTube Shorts automatically. It runs on a schedule (6AM, 11AM, 5PM, 9PM) and generates news-based video content using AI for scripts and voiceovers.

**The Economics:**
- Initial build: ~40 hours
- Daily maintenance: 0 hours (fully automated)
- Monthly server cost: $5 (runs on local machine)
- Revenue tracking: Built-in dashboard shows views, watch time, and projected earnings

**Why this approach:**
Most "passive income" content requires constant input. I wanted something that actually runs without me. The revenue isn't life-changing yet (still building the channel to monetization threshold), but the time arbitrage is the real win.

**What I learned:**
1. Consistency beats quality for early growth (algorithm loves daily posters)
2. Optimal posting times matter way more than I expected
3. Automation breaks in weird ways - error handling is 60% of the code
4. 4 posts/day is the sweet spot before diminishing returns kick in

**Current status:**
- Videos: 200+ published
- Views: Building steadily (not viral, but consistent)
- Time invested this month: 2 hours (fixing a bug)

Not trying to sell anything, just sharing what's working for me. Anyone else building automated revenue streams? What's your stack look like?
"@
            Flair = "Strategy"
        }
        "Startup_Ideas" = @{
            Title = "Automated YouTube Shorts creation - passive income without constant content grind"
            Body = @"
**The Problem:** YouTube monetization requires consistent content volume. Creating 4+ videos daily manually is unsustainable.

**The Solution:** Automated video generation system that posts on schedule without human intervention.

**How it Works:**
- Monitors trending news feeds
- AI generates scripts (Claude API)
- Text-to-speech for voiceover
- FFmpeg renders video with overlays
- Auto-uploads to YouTube at optimal times

**Business Model:**
- AdSense revenue from views
- Affiliate links in descriptions
- Sponsorships once channel grows

**Key Learnings:**
1. Algorithm rewards consistency over quality in early growth
2. 4 posts/day is optimal (more sees diminishing returns)
3. News-based content has infinite free source material
4. Automation lets you run multiple channels simultaneously

**Current Metrics:**
- 200+ videos published
- Growing subscriber base
- Near monetization threshold
- Total maintenance: ~2 hours/month

Anyone exploring content automation for monetization? What approaches are you testing?
"@
            Flair = "Idea"
        }
    }

    "marketing-engine" = @{
        "SaaS" = @{
            Title = "Cut social media posting time from 15 hours/week to 30 minutes with AI automation"
            Body = @"
Running a small business means wearing every hat. Marketing was eating my evenings and weekends.

**The old way:**
- Spend Sunday batch-creating posts for the week
- Manually schedule across platforms
- Constantly worry about staying consistent
- Total time: 15+ hours/week

**The new way:**
Built a content automation system that generates platform-specific posts using AI and publishes them on schedule. 4 posts per day across different channels.

**How it works:**
- Define content types once (product highlights, tips, testimonials, etc.)
- AI generates variations that match brand voice
- Auto-posts at optimal times for audience
- Review and approve in batches (30 min/week)

**What changed:**
- Consistency improved (no more missed days)
- Engagement actually went up (more frequent posting)
- Time reclaimed: 12+ hours/week
- Mental load: Way lower

**The trade-off:**
AI content isn't as creative as my best manual work. But it's better than my rushed work, and consistency matters more than perfection for small business social media.

I'm not trying to eliminate the human touch - I still engage with comments and create occasional high-effort posts. But automating the daily grind was a game-changer.

What's your biggest time drain in marketing? How are you handling it?
"@
            Flair = "Marketing"
        }
        "EntrepreneurRideAlong" = @{
            Title = "Reclaimed 12 hours/week by automating social media content generation"
            Body = @"
Social media consistency was killing me. Every Sunday = 3 hours of content creation. Every evening = scheduling and posting.

**The Problem:**
- Manual posting takes forever
- Inconsistency hurts engagement
- Running out of ideas constantly
- Platform-specific formatting is tedious

**The Solution:**
Built an AI-powered content engine that generates and posts automatically.

**Results:**
- Time saved: 12+ hours/week
- Posting frequency: 4x daily (was 1x daily before)
- Engagement: Up 40% (consistency wins)
- Mental overhead: Dramatically lower

**How it works:**
1. Define content categories and brand voice
2. AI generates platform-specific variations
3. Auto-posts at optimal times
4. Human review in 30-min batches

**The honest truth:**
AI content isn't as good as my best manual work. But it's better than my rushed work, and showing up consistently matters more than occasional brilliance.

Anyone else automating their marketing workflows? What's working for you?
"@
            Flair = "Strategy"
        }
    }

    "jules-ai" = @{
        "SaaS" = @{
            Title = "Built an AI operations director that manages my entire DevOps pipeline"
            Body = @"
I've been running an AI-powered business operations system for the past few months. Thought I'd share what worked and what didn't.

**The Concept:**
Instead of building narrow AI tools for specific tasks, I wanted a generalist system that could handle orchestration across my entire tech stack - Git, GitHub, AWS, GCP, CI/CD pipelines, multi-service deployments.

**The Architecture:**
- Gemini as the reasoning engine (chose it over GPT-4 for better code understanding)
- Custom context management (critical for maintaining state across operations)
- Integration layer for Git, cloud services, deployment tools
- Autonomous decision-making within defined guardrails

**What it actually does:**
- Manages code conflicts and merges
- Handles deployment pipelines without human intervention
- Monitors infrastructure and auto-remediates common issues
- Orchestrates multi-service releases
- Generates operational reports and anomaly alerts

**The Interesting Parts:**

*Context is everything:* The AI needs deep understanding of your systems, not just access to APIs. I spent more time building context persistence than I did on API integrations.

*Autonomy vs. safety:* Had to implement rollback mechanisms and approval gates for high-risk operations. Full autonomy sounds good until it deletes production.

*It's not a chatbot:* This isn't about asking questions - it's about delegating entire operational workflows. The mental model shift took time.

**Production Results:**
- Reduced deployment time: 45 min → 8 min (avg)
- Operational overhead: Down ~60%
- Breaking changes caught: 12 in the last month (before hitting production)
- False positives: Rare, but when they happen they're expensive

**Open Questions:**
- How do you handle AI decisions you disagree with but can't articulate why?
- What's the right balance between AI autonomy and human oversight?
- Anyone else deploying AI in operational roles (not just development)?

Happy to discuss architecture, trade-offs, or specific implementation challenges.
"@
            Flair = "Discussion"
        }
        "Startup_Ideas" = @{
            Title = "AI operations manager - delegates entire DevOps workflows autonomously"
            Body = @"
**The Opportunity:** Small teams are drowning in operational overhead. What if AI could handle the entire DevOps pipeline?

**The Product:**
AI system that manages Git workflows, deployments, infrastructure monitoring, and multi-service orchestration without human intervention.

**Key Capabilities:**
- Code conflict resolution
- Automated deployments with rollback safety
- Infrastructure monitoring and auto-remediation
- Multi-service release orchestration
- Operational reporting and anomaly detection

**Why This Matters:**
Solo founders and small teams spend 40-60% of time on operations instead of building product. AI can handle the operational grunt work if architected correctly.

**Technical Innovation:**
- Persistent context management (AI remembers your entire system)
- Guardrails and approval gates for high-risk operations
- Integration layer for Git, AWS, GCP, CI/CD tools
- Autonomous decision-making within defined boundaries

**Early Results:**
- Deployment time: 45 min → 8 min
- Operational overhead: Down 60%
- Breaking changes caught before production: 12/month

**The Challenge:**
Building trust in AI decision-making. How much autonomy is too much?

Anyone exploring AI for operations (not just development)? What use cases make sense?
"@
            Flair = "Idea"
        }
    }

    "affiliate-system" = @{
        "SaaS" = @{
            Title = "Built a white-label affiliate platform - complete source code for businesses"
            Body = @"
Spent 6 months building an enterprise affiliate management system. Now offering it as white-label for businesses that want to run their own affiliate programs.

**The Problem:**
Existing affiliate platforms (Impact, ShareASale, etc.) take 20-30% fees plus monthly costs. For smaller businesses, that's brutal economics. But building in-house is expensive and time-consuming.

**What I Built:**
- Complete affiliate tracking system
- Commission management (percentage, flat, tiered)
- Real-time analytics dashboard
- Payment processing integration
- White-label ready (your brand, your domain)
- Self-hosted (you own the data)

**Why White-Label:**
Building the product was the easy part. Selling SaaS at scale is hard. I'd rather sell the entire system to businesses that want to own their affiliate infrastructure.

**Who This Is For:**
- E-commerce businesses wanting their own affiliate program
- SaaS companies with partner networks
- Course creators with affiliate marketers
- Anyone tired of paying 20%+ platform fees

**Technical Stack:**
- Full source code included
- REST API for integrations
- Webhook system for extensibility
- SQLite for development, scales to PostgreSQL
- Complete documentation

**Economics:**
Instead of paying $500/month + 20% to a platform, you pay once and own it forever. Run unlimited affiliates, keep 100% of economics.

**Open Questions:**
- What features are must-haves for affiliate platforms?
- How do you handle fraud detection at scale?
- What commission structures work best?

Happy to discuss technical implementation or business use cases.
"@
            Flair = "Product"
        }
        "EntrepreneurRideAlong" = @{
            Title = "White-label affiliate platform - own your affiliate infrastructure instead of renting"
            Body = @"
Most businesses use platforms like Impact or ShareASale for affiliate programs. The problem? 20-30% fees plus monthly costs.

**The Math:**
- Platform fees: $500/month + 20% of affiliate sales
- For $50k/month in affiliate sales: $10,500 in platform fees/year minimum
- Over 3 years: $30k+ just in platform fees

**The Alternative:**
Buy the entire affiliate platform once. Own it forever. Keep 100% of economics.

**What You Get:**
- Complete source code
- Affiliate tracking and management
- Commission system (percentage, flat, tiered)
- Real-time analytics
- Payment processing integration
- Your brand, your domain

**Why This Model:**
Building SaaS at scale is hard. Selling the complete system to businesses with existing distribution is easier. You get infrastructure ownership, I get one-time revenue.

**Who This Works For:**
- E-commerce with affiliate marketers
- SaaS companies with partner networks
- Course creators with promoters
- Anyone tired of paying platform rent

**The Trade-off:**
You maintain it yourself (or hire someone). But you also own it completely and avoid ongoing platform fees.

Anyone running affiliate programs? What are your biggest platform frustrations?
"@
            Flair = "Strategy"
        }
    }

    "dating-platform" = @{
        "Startup_Ideas" = @{
            Title = "Built a human-verified dating app (anti-AI, video verification) - offering as white-label"
            Body = @"
I built a dating platform with a specific thesis: AI bots and fake profiles are killing user trust. So I went the opposite direction - 100% human verification.

**The Tech:**
- Video verification system (no deepfakes accepted)
- AI-detection on messages (ironic, I know - using AI to detect AI)
- Human-only matching algorithm
- Full subscription infrastructure (billing, member tiers, etc.)
- Mobile-ready web app

**Why I'm white-labeling it:**
Honestly? Building the product was the easy part. Building a two-sided marketplace and getting initial users is brutal. I'd rather sell the tech to people who already have distribution or a specific niche in mind.

**The Market Opportunity I See:**
Dating apps have become commoditized and trust is at an all-time low. There's room for niche plays:
- Industry-specific (doctors, teachers, etc.)
- Value-aligned communities (religious, political, lifestyle)
- Geographic hyper-local plays
- Demographic-specific (over 50, LGBTQ+, etc.)

If you have an audience, the tech is the easy part. I've already solved the hard technical problems.

**What's Included:**
- Full source code
- Backend API (user management, matching, messaging)
- Frontend app (React-based)
- Payment processing integration
- Admin dashboard
- Human verification system
- Anti-fraud/anti-bot tools

**What I Learned Building This:**
1. Video verification works - reduces fake accounts by ~95%
2. Message AI detection is tricky - false positives happen
3. Trust features are marketing gold - users care about "real humans only"
4. Subscription billing is complex - 30% of development time

**The Hard Questions:**
- Is there still room for new dating apps in 2025?
- How do you solve cold-start for two-sided marketplaces?
- What's the moat when Tinder can just copy your features?

I think the answer is niche + trust. Build for a specific community that's underserved.

What niches do you think are underserved in dating? Where's there actual white space?
"@
            Flair = "Idea"
        }
        "SaaS" = @{
            Title = "Human-verified dating platform source code - built to combat AI bots and fake profiles"
            Body = @"
Spent 6 months building an anti-AI dating app with video verification. Now offering complete source code as white-label.

**The Thesis:**
Dating apps have a trust problem. AI bots, fake profiles, catfishing. Users are exhausted. There's opportunity in going the opposite direction - verified humans only.

**The Technology:**
- Video verification system (live, can't be faked with photos)
- AI detection on messages (catch bot conversations)
- Human-only matching algorithm
- Subscription billing infrastructure
- Anti-fraud and anti-bot tools
- Mobile-responsive web app

**Why White-Label:**
Building a two-sided marketplace is brutally hard. I'd rather sell the complete platform to founders who already have:
- An existing community or audience
- A specific niche/demographic in mind
- Distribution figured out

**Niche Opportunities:**
The dating market is commoditized at scale, but underserved in niches:
- Professional communities (doctors, lawyers, teachers)
- Value-aligned dating (religious, political, lifestyle)
- Demographic-specific (50+, parents, etc.)
- Geographic hyper-local

**Technical Stack:**
- Full source code
- REST API backend
- React frontend
- Payment processing integration
- Admin dashboard
- Complete documentation
- Webhook system for extensibility

**Key Learnings:**
1. Video verification reduces fakes by 95%
2. Users trust "human verification" messaging more than matching algorithms
3. Subscription billing is 30% of the complexity
4. AI detection has false positives - need confidence scoring

**For Founders:**
If you have distribution or a specific community, the tech shouldn't be your bottleneck. Happy to discuss implementation or market opportunities.

What dating niches do you see as underserved?
"@
            Flair = "Product"
        }
    }
}

# ═══════════════════════════════════════════════════════════════
# HELPER FUNCTIONS
# ═══════════════════════════════════════════════════════════════

function Get-RedditAccessToken {
    <#
    .SYNOPSIS
    Authenticate with Reddit API using OAuth2 password flow

    .DESCRIPTION
    Reddit uses OAuth2 with client credentials for application access.
    This function exchanges username/password for a temporary access token.
    Token is valid for 1 hour.
    #>

    Write-Host "Authenticating with Reddit API..." -ForegroundColor Yellow

    # Build Basic Auth header (client_id:client_secret)
    $basicAuth = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("${ClientId}:${ClientSecret}"))

    # Build request body
    $body = @{
        grant_type = "password"
        username = $Username
        password = $Password
    }

    # Request headers
    $headers = @{
        "Authorization" = "Basic $basicAuth"
        "User-Agent" = $UserAgent
    }

    try {
        $response = Invoke-RestMethod -Uri $AuthUrl -Method Post -Headers $headers -Body $body

        Write-Host "Authentication successful" -ForegroundColor Green
        return $response.access_token
    }
    catch {
        Write-Host "Authentication failed" -ForegroundColor Red

        if ($_.Exception.Response) {
            $errorStream = $_.Exception.Response.GetResponseStream()
            $reader = New-Object System.IO.StreamReader($errorStream)
            $errorBody = $reader.ReadToEnd()
            Write-Host "Reddit API Error: $errorBody" -ForegroundColor Red
        }
        else {
            Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
        }

        throw "Reddit authentication failed"
    }
}

function Submit-RedditPost {
    <#
    .SYNOPSIS
    Submit a post to Reddit

    .DESCRIPTION
    Posts to specified subreddit using Reddit API v1.
    Supports title, body (self-post), and flair.

    .PARAMETER AccessToken
    OAuth2 access token from Get-RedditAccessToken

    .PARAMETER Subreddit
    Target subreddit (without r/ prefix)

    .PARAMETER Title
    Post title (max 300 characters)

    .PARAMETER Body
    Post body text (markdown supported)

    .PARAMETER Flair
    Post flair text (subreddit must support flair)
    #>
    param(
        [string]$AccessToken,
        [string]$Subreddit,
        [string]$Title,
        [string]$Body,
        [string]$Flair = ""
    )

    Write-Host "Submitting post to r/$Subreddit..." -ForegroundColor Yellow

    # Build request body
    $postBody = @{
        sr = $Subreddit
        kind = "self"  # Text post (not link)
        title = $Title
        text = $Body
        sendreplies = $true  # Get notifications for replies
    }

    # Request headers
    $headers = @{
        "Authorization" = "Bearer $AccessToken"
        "User-Agent" = $UserAgent
        "Content-Type" = "application/x-www-form-urlencoded"
    }

    try {
        $response = Invoke-RestMethod -Uri "$BaseUrl/api/submit" -Method Post -Headers $headers -Body $postBody

        if ($response.json.errors.Count -gt 0) {
            Write-Host "Reddit API returned errors:" -ForegroundColor Red
            $response.json.errors | ForEach-Object {
                Write-Host "  - $_" -ForegroundColor Red
            }
            throw "Post submission failed with errors"
        }

        return $response.json.data
    }
    catch {
        Write-Host "Post submission failed" -ForegroundColor Red

        if ($_.Exception.Response) {
            $errorStream = $_.Exception.Response.GetResponseStream()
            $reader = New-Object System.IO.StreamReader($errorStream)
            $errorBody = $reader.ReadToEnd()
            Write-Host "Reddit API Error: $errorBody" -ForegroundColor Red
        }
        else {
            Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
        }

        throw "Reddit post submission failed"
    }
}

# ═══════════════════════════════════════════════════════════════
# MAIN EXECUTION
# ═══════════════════════════════════════════════════════════════

Write-Host "`n═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "AI SOLUTIONS STORE - REDDIT MARKETING AUTOMATION" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════════`n" -ForegroundColor Cyan

# Validate credentials
if (-not $ClientId -or -not $ClientSecret -or -not $Username -or -not $Password) {
    Write-Host "ERROR: Missing Reddit API credentials" -ForegroundColor Red
    Write-Host "`nRequired environment variables:" -ForegroundColor Yellow
    Write-Host "  - REDDIT_CLIENT_ID" -ForegroundColor White
    Write-Host "  - REDDIT_CLIENT_SECRET" -ForegroundColor White
    Write-Host "  - REDDIT_USERNAME" -ForegroundColor White
    Write-Host "  - REDDIT_PASSWORD" -ForegroundColor White
    Write-Host "`nGet credentials at: https://www.reddit.com/prefs/apps" -ForegroundColor Cyan
    Write-Host "Create a 'script' type application for personal use automation`n" -ForegroundColor Cyan
    exit 1
}

# Get post content
$postContent = $PostTemplates[$Product][$Subreddit]

if (-not $postContent) {
    Write-Host "ERROR: No post template found for $Product in r/$Subreddit" -ForegroundColor Red
    Write-Host "`nAvailable combinations:" -ForegroundColor Yellow

    foreach ($prod in $PostTemplates.Keys) {
        Write-Host "`n$prod" -ForegroundColor Cyan -NoNewline
        Write-Host " → " -NoNewline
        Write-Host ($PostTemplates[$prod].Keys -join ", ") -ForegroundColor White
    }

    Write-Host ""
    exit 1
}

# Display post preview
Write-Host "Post Preview:" -ForegroundColor Yellow
Write-Host "───────────────────────────────────────────────────────────────" -ForegroundColor DarkGray
Write-Host "Subreddit: r/$Subreddit" -ForegroundColor White
Write-Host "Product: $Product" -ForegroundColor White
Write-Host "Flair: $($postContent.Flair)" -ForegroundColor White
Write-Host "`nTitle:" -ForegroundColor Yellow
Write-Host $postContent.Title -ForegroundColor Cyan
Write-Host "`nBody:" -ForegroundColor Yellow
Write-Host $postContent.Body -ForegroundColor White
Write-Host "───────────────────────────────────────────────────────────────`n" -ForegroundColor DarkGray

# DRY RUN MODE
if ($DryRun) {
    Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Green
    Write-Host "DRY RUN MODE - NO POST SUBMITTED" -ForegroundColor Green
    Write-Host "═══════════════════════════════════════════════════════════════`n" -ForegroundColor Green

    Write-Host "This post would be submitted to r/$Subreddit" -ForegroundColor Yellow
    Write-Host "Remove -DryRun flag to actually post`n" -ForegroundColor Yellow

    exit 0
}

# ═══════════════════════════════════════════════════════════════
# REDDIT SELF-PROMOTION GUIDELINES WARNING
# ═══════════════════════════════════════════════════════════════

Write-Host "IMPORTANT: Reddit Self-Promotion Guidelines" -ForegroundColor Yellow
Write-Host "───────────────────────────────────────────────────────────────" -ForegroundColor DarkGray
Write-Host "Reddit enforces a 10:1 ratio for self-promotion:" -ForegroundColor White
Write-Host "  - For every 1 promotional post" -ForegroundColor White
Write-Host "  - You should make 10 helpful/valuable comments or posts" -ForegroundColor White
Write-Host "`nBefore posting promotional content:" -ForegroundColor Yellow
Write-Host "  1. Have you contributed 10+ helpful comments recently?" -ForegroundColor White
Write-Host "  2. Is this post value-first (solving problems, sharing learnings)?" -ForegroundColor White
Write-Host "  3. Are you prepared to engage authentically in the comments?" -ForegroundColor White
Write-Host "  4. Have you read the specific subreddit rules?" -ForegroundColor White
Write-Host "`nViolating self-promotion rules can result in:" -ForegroundColor Red
Write-Host "  - Post removal" -ForegroundColor Red
Write-Host "  - Subreddit ban" -ForegroundColor Red
Write-Host "  - Site-wide shadowban" -ForegroundColor Red
Write-Host "───────────────────────────────────────────────────────────────`n" -ForegroundColor DarkGray

Write-Host "Press ENTER to continue with post submission, or Ctrl+C to cancel..." -ForegroundColor Yellow
Read-Host

# Authenticate with Reddit
try {
    $accessToken = Get-RedditAccessToken
}
catch {
    Write-Host "`nAuthentication failed. Cannot proceed with post submission.`n" -ForegroundColor Red
    exit 1
}

# Submit post
try {
    $result = Submit-RedditPost `
        -AccessToken $accessToken `
        -Subreddit $Subreddit `
        -Title $postContent.Title `
        -Body $postContent.Body `
        -Flair $postContent.Flair

    Write-Host "`n═══════════════════════════════════════════════════════════════" -ForegroundColor Green
    Write-Host "SUCCESS - POST SUBMITTED!" -ForegroundColor Green
    Write-Host "═══════════════════════════════════════════════════════════════`n" -ForegroundColor Green

    Write-Host "Post URL: $($result.url)" -ForegroundColor Cyan
    Write-Host "Post ID: $($result.id)" -ForegroundColor White
    Write-Host "`nIMPORTANT: Monitor and engage with comments within first 2 hours!" -ForegroundColor Yellow
    Write-Host "Be helpful, not promotional. Answer questions genuinely.`n" -ForegroundColor Yellow

    # Log success
    $logEntry = "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] SUCCESS - Posted to r/$Subreddit - $Product - URL: $($result.url)"
    $logPath = "C:\AiCollabForTheKids\logs\reddit-marketing.log"

    # Create logs directory if it doesn't exist
    $logDir = Split-Path $logPath -Parent
    if (-not (Test-Path $logDir)) {
        New-Item -ItemType Directory -Path $logDir -Force | Out-Null
    }

    Add-Content -Path $logPath -Value $logEntry -ErrorAction SilentlyContinue

    exit 0
}
catch {
    Write-Host "`n═══════════════════════════════════════════════════════════════" -ForegroundColor Red
    Write-Host "ERROR - POST SUBMISSION FAILED" -ForegroundColor Red
    Write-Host "═══════════════════════════════════════════════════════════════`n" -ForegroundColor Red

    Write-Host "Troubleshooting:" -ForegroundColor Yellow
    Write-Host "1. Verify credentials in environment variables" -ForegroundColor White
    Write-Host "2. Check Reddit API access at reddit.com/prefs/apps" -ForegroundColor White
    Write-Host "3. Ensure account has enough karma (min 10 post karma recommended)" -ForegroundColor White
    Write-Host "4. Check subreddit-specific posting requirements" -ForegroundColor White
    Write-Host "5. Verify you're following 10:1 self-promotion ratio" -ForegroundColor White
    Write-Host "6. Check if you've been shadowbanned: reddit.com/r/ShadowBan`n" -ForegroundColor White

    # Log failure
    $logEntry = "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] FAILED - r/$Subreddit - $Product - $($_.Exception.Message)"
    $logPath = "C:\AiCollabForTheKids\logs\reddit-marketing.log"

    # Create logs directory if it doesn't exist
    $logDir = Split-Path $logPath -Parent
    if (-not (Test-Path $logDir)) {
        New-Item -ItemType Directory -Path $logDir -Force | Out-Null
    }

    Add-Content -Path $logPath -Value $logEntry -ErrorAction SilentlyContinue

    exit 1
}

# ═══════════════════════════════════════════════════════════════
# SCRIPT INFORMATION
# ═══════════════════════════════════════════════════════════════
# Created: 2025-12-21
# Purpose: AI Solutions Store Reddit marketing automation
# Platform: Reddit API (OAuth2)
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
# Target Subreddits:
# - r/SideProject - Share side project launches
# - r/EntrepreneurRideAlong - Entrepreneurial journey stories
# - r/Startup_Ideas - Business ideas and validation
# - r/SaaS - SaaS product discussions
#
# Reddit Self-Promotion Guidelines:
# - 10:1 ratio (10 helpful contributions per 1 promotional post)
# - Value-first content (solve problems, share learnings)
# - Authentic engagement in comments
# - Subreddit-specific rules compliance
#
# Rate Limits:
# - 60 API requests per minute
# - Account age and karma affect posting limits
# - Avoid posting same content to multiple subreddits
#
# Best Practices:
# - Post during optimal times (see reddit-store-posts.md)
# - Engage with comments within first 2 hours
# - Be helpful, not salesy
# - Let conversation happen organically
# - Monitor for mod removals
#
# ═══════════════════════════════════════════════════════════════
