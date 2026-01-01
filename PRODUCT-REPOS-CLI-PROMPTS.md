# 🚀 PRODUCT REPOS - CLI AGENT PROMPTS
**Generated:** December 27, 2025
**Purpose:** Create all product delivery repos so checkout links work

---

## CURRENT STATUS

| Product | Price | Repo Exists? | Code Exists? |
|---------|-------|--------------|--------------|
| Claude Droid | $299 | ❌ NO | ✅ `claude-droid/youtube_upload.py` |
| Income Droid | $499 | ❌ NO | ✅ `scripts/agents/*.cjs` |
| Marketing Engine | $199 | ❌ NO | ✅ `scripts/marketing/*.cjs` |
| Jules AI | $399 | ❌ NO | ✅ `jules-dashboard/` |
| Affiliate System | $599 | ❌ NO | ✅ `scripts/agents/affiliate-agent.cjs` |
| Dating Platform | $2,499 | ❌ NO | ✅ `youandinotai-landing/` + `api/` |

---

## MASTER EXECUTION ORDER

Run these in Claude Code CLI (`claude` command) in this order:

```
1. Create all repos on GitHub
2. Package Claude Droid
3. Package Income Droid  
4. Package Marketing Engine
5. Package Jules AI
6. Package Affiliate System
7. Package Dating Platform
8. Update webhook handler with correct links
9. Test email delivery
```

---

## PROMPT 1: CREATE ALL GITHUB REPOS

Copy/paste this into Claude CLI:

```
Create 6 new private GitHub repos under the Ai-Solutions-Store organization:

1. claude-droid - "AI-powered YouTube Shorts generator that converts news to 59-second videos"
2. income-droid - "Monetized video automation system generating 4 revenue-optimized videos daily"
3. marketing-engine - "23-platform marketing automation posting 4x daily with AI content generation"
4. jules-ai - "Gemini-powered business operations AI with Git/GCP/AWS integration"
5. affiliate-system - "White-label affiliate platform with tiered commissions and automated payouts"
6. dating-platform - "Human-verified dating app with AI-detection and subscription billing"

Use GitHub token from C:\AiCollabForTheKids\api\.env (GITHUB_TOKEN)

Each repo needs:
- Private visibility
- Main branch
- Empty README.md placeholder
- MIT License
- .gitignore for Node.js

After creating, output the full URLs for each repo.
```

---

## PROMPT 2: PACKAGE CLAUDE DROID ($299)

```
Package the Claude Droid product into Ai-Solutions-Store/claude-droid repo.

Source files to include from C:\AiCollabForTheKids:
- claude-droid/youtube_upload.py
- claude-droid/client_secrets.json (as .example)

Create these new files:

1. README.md - Professional setup guide with:
   - What it does (news to YouTube Shorts)
   - Requirements (Python 3.9+, FFmpeg, YouTube API)
   - Installation steps
   - Configuration guide
   - Usage examples
   - Troubleshooting

2. .env.example with placeholders:
   - YOUTUBE_API_KEY
   - OPENAI_API_KEY (for script generation)
   - NEWS_API_KEY

3. requirements.txt:
   - google-api-python-client
   - google-auth-oauthlib
   - openai
   - python-dotenv
   - requests

4. config.py - Configuration template

5. main.py - Complete video generation pipeline:
   - Fetch trending news from NewsAPI
   - Generate 59-second script with GPT
   - Text-to-speech with ElevenLabs or gTTS
   - Render video with FFmpeg
   - Upload to YouTube with metadata

6. SETUP.md - Step-by-step YouTube API setup guide

Push to https://github.com/Ai-Solutions-Store/claude-droid

Include FOR THE KIDS mission statement in README footer.
```

---

## PROMPT 3: PACKAGE INCOME DROID ($499)

```
Package the Income Droid product into Ai-Solutions-Store/income-droid repo.

This is the premium version of Claude Droid with scheduling and analytics.

Source files to reference from C:\AiCollabForTheKids:
- scripts/agents/agents-master.cjs (scheduling pattern)
- scripts/droid-daily-scheduler.cjs

Create complete package:

1. README.md with:
   - 4 videos/day at optimal times (6AM, 11AM, 5PM, 9PM)
   - Revenue tracking dashboard
   - Discord notifications
   - Multi-channel support

2. package.json with dependencies:
   - node-cron
   - discord.js
   - better-sqlite3
   - googleapis
   - openai

3. src/scheduler.js - PM2 ecosystem scheduling
4. src/video-generator.js - Video creation pipeline
5. src/youtube-uploader.js - OAuth upload with retry
6. src/analytics.js - View/revenue tracking
7. src/discord-notifier.js - Webhook notifications
8. src/database.js - SQLite for tracking

9. ecosystem.config.js - PM2 configuration
10. DEPLOYMENT.md - Server setup guide
11. MONETIZATION.md - YouTube Partner Program guide

Push to https://github.com/Ai-Solutions-Store/income-droid
```

---


## PROMPT 4: PACKAGE MARKETING ENGINE ($199)

```
Package the Marketing Engine product into Ai-Solutions-Store/marketing-engine repo.

Source files from C:\AiCollabForTheKids\scripts\marketing:
- marketing-runner.cjs
- ecosystem.config.cjs
- devto-post.cjs
- linkedin-post.ps1
- reddit-post.ps1
- twitter variants
- telegram-post.ps1
- All README-*.md files

Create complete multi-platform marketing automation:

1. README.md with:
   - 23 platforms supported
   - 4 posts/day automated
   - AI content generation with Claude/GPT
   - Analytics tracking
   - A/B testing capability

2. package.json with:
   - @anthropic-ai/sdk
   - openai
   - node-cron
   - axios
   - better-sqlite3

3. src/platforms/ directory with individual platform handlers:
   - twitter.js
   - linkedin.js
   - reddit.js
   - devto.js
   - hackernews.js
   - producthunt.js
   - telegram.js
   - discord.js
   - bluesky.js
   - mastodon.js
   - threads.js
   - pinterest.js
   - quora.js
   - indiehackers.js
   - hashnode.js
   - substack.js
   - facebook.js
   - tiktok.js
   - youtube-community.js
   - medium.js
   - github-discussions.js
   - slack.js
   - email.js

4. src/content-generator.js - AI content creation
5. src/scheduler.js - Cron-based posting
6. src/analytics.js - Engagement tracking
7. src/ab-testing.js - Variant testing

8. API-KEYS-SETUP.md - How to get all platform API keys
9. ecosystem.config.js - PM2 setup

Push to https://github.com/Ai-Solutions-Store/marketing-engine
```

---

## PROMPT 5: PACKAGE JULES AI ($399)

```
Package Jules AI into Ai-Solutions-Store/jules-ai repo.

Source files from C:\AiCollabForTheKids:
- jules-dashboard/ (entire directory)
- api/services/ (relevant services)

Create Gemini-powered business operations AI:

1. README.md with:
   - Multi-model orchestration (Gemini, GPT-4, Claude)
   - Git/GitHub automation
   - GCP & AWS integration
   - Voice synthesis
   - Web automation

2. dashboard/ - Copy jules-dashboard with:
   - React + TypeScript frontend
   - Real-time status display
   - Task management UI
   - Analytics dashboard

3. backend/ with:
   - server.js - Express API
   - src/orchestrator.js - Multi-model routing
   - src/git-automation.js - GitHub operations
   - src/cloud-gcp.js - Google Cloud integration
   - src/cloud-aws.js - AWS integration
   - src/voice.js - TTS synthesis
   - src/web-automation.js - Puppeteer tasks

4. package.json with:
   - @google/generative-ai
   - openai
   - @anthropic-ai/sdk
   - @octokit/rest
   - @aws-sdk/client-*
   - @google-cloud/compute
   - puppeteer
   - express

5. DEPLOYMENT-GCP.md - Google Cloud deployment
6. DEPLOYMENT-AWS.md - AWS deployment
7. docker-compose.yml - Local development

Push to https://github.com/Ai-Solutions-Store/jules-ai
```

---

## PROMPT 6: PACKAGE AFFILIATE SYSTEM ($599)

```
Package the Affiliate System into Ai-Solutions-Store/affiliate-system repo.

Source files from C:\AiCollabForTheKids:
- scripts/agents/affiliate-agent.cjs
- api/routes/ (affiliate-related routes)
- marketing/AFFILIATE-*.md (documentation)

Create white-label affiliate platform:

1. README.md with:
   - 4-tier commission structure (15-30%)
   - 90-day cookie tracking
   - Automated monthly payouts
   - Anti-fraud detection
   - White-label customization

2. backend/ with:
   - server.js - Express API
   - src/affiliate-tracking.js - Link/cookie tracking
   - src/commission-calculator.js - Tiered commissions
   - src/payout-processor.js - Automated payouts (Square/Stripe)
   - src/fraud-detection.js - Anti-gaming measures
   - src/reporting.js - Analytics and reports
   - prisma/schema.prisma - Database schema

3. dashboard/ - Affiliate portal frontend:
   - React dashboard
   - Earnings display
   - Link generator
   - Payout history
   - Referral tree visualization

4. admin/ - Admin panel:
   - Manage affiliates
   - Approve payouts
   - Configure commissions
   - View reports

5. config/branding.json - White-label customization
6. config/commissions.json - Commission tiers
7. SETUP.md - Integration guide
8. WHITE-LABEL.md - Customization guide

Push to https://github.com/Ai-Solutions-Store/affiliate-system
```

---

## PROMPT 7: PACKAGE DATING PLATFORM ($2,499)

```
Package the Dating Platform into Ai-Solutions-Store/dating-platform repo.

This is the premium full-source package.

Source files from C:\AiCollabForTheKids:
- youandinotai-landing/ (frontend)
- api/ (backend - sanitized)
- api/prisma/schema.prisma

Create complete dating platform:

1. README.md with:
   - Human verification system
   - AI-detection for fake profiles
   - Matching algorithm
   - Real-time messaging
   - Subscription billing
   - Admin dashboard
   - Mobile-responsive

2. frontend/ - React application:
   - Authentication/registration
   - Profile creation/editing
   - Discovery/matching
   - Messaging system
   - Settings/preferences
   - Subscription management

3. backend/ - Node.js API:
   - Express server
   - Prisma ORM
   - JWT authentication
   - WebSocket messaging
   - Square/Stripe payments
   - File upload (photos)
   - Email notifications

4. admin/ - Admin dashboard:
   - User management
   - Content moderation
   - Reports/analytics
   - Subscription management

5. database/
   - schema.prisma
   - migrations/
   - seed.js

6. Documentation:
   - DEPLOYMENT.md - AWS/GCP deployment
   - DATABASE-SETUP.md - PostgreSQL config
   - PAYMENT-SETUP.md - Square integration
   - SECURITY.md - Security best practices
   - COMPLIANCE.md - MCC 7273 requirements
   - CUSTOMIZATION.md - Branding guide

7. docker-compose.yml - Full stack local dev
8. .env.example - All required variables

Push to https://github.com/Ai-Solutions-Store/dating-platform
```

---

## PROMPT 8: UPDATE WEBHOOK HANDLER

```
Update C:\AiCollabForTheKids\api\routes\ai-store-webhook.js

Change the PRODUCT_CATALOG object to use correct repo URLs:

const PRODUCT_CATALOG = {
  'claude-droid': {
    name: 'Claude Droid',
    price: 299,
    type: 'github-repo',
    repo: 'https://github.com/Ai-Solutions-Store/claude-droid',
    deliveryType: 'github-access'
  },
  'income-droid': {
    name: 'Income Droid',
    price: 499,
    type: 'github-repo',
    repo: 'https://github.com/Ai-Solutions-Store/income-droid',
    videoUrl: 'https://youtube.com/playlist?list=PLxxxxx', // Update with real playlist
    deliveryType: 'github-access-video'
  },
  'marketing-engine': {
    name: 'Marketing Engine',
    price: 199,
    type: 'github-repo',
    repo: 'https://github.com/Ai-Solutions-Store/marketing-engine',
    deliveryType: 'github-access-api'
  },
  'jules-ai': {
    name: 'Jules AI',
    price: 399,
    type: 'github-repo',
    repo: 'https://github.com/Ai-Solutions-Store/jules-ai',
    deliveryType: 'github-access-cloud'
  },
  'affiliate-system': {
    name: 'Affiliate System',
    price: 599,
    type: 'github-repo',
    repo: 'https://github.com/Ai-Solutions-Store/affiliate-system',
    deliveryType: 'github-access-whitelabel'
  },
  'dating-platform': {
    name: 'Anti-AI Dating Platform',
    price: 2499,
    type: 'full-source',
    repo: 'https://github.com/Ai-Solutions-Store/dating-platform',
    deliveryType: 'full-source-zip'
  }
};

Also add GitHub collaborator automation:

After sending delivery email, automatically add customer's GitHub username as collaborator:

import { Octokit } from '@octokit/rest';

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

async function addCollaborator(repoName, customerEmail) {
  // Try to find GitHub username from email
  // Or ask in delivery email for GitHub username
  // Then add as collaborator
  await octokit.repos.addCollaborator({
    owner: 'Ai-Solutions-Store',
    repo: repoName,
    username: githubUsername,
    permission: 'pull'
  });
}

Restart API after changes.
```

---

## PROMPT 9: TEST EMAIL DELIVERY

```
Test the complete delivery flow:

1. Trigger a test webhook:
   curl -X POST https://api.aidoesitall.website/api/ai-store-webhook \
     -H "Content-Type: application/json" \
     -H "x-square-hmacsha256-signature: TEST" \
     -d '{
       "type": "payment.completed",
       "data": {
         "object": {
           "payment": {
             "id": "TEST-001",
             "status": "COMPLETED",
             "amount_money": { "amount": 29900, "currency": "USD" },
             "buyer_email_address": "joshlcoleman@gmail.com"
           }
         }
       }
     }'

2. Check if email was sent to joshlcoleman@gmail.com
3. Verify repo link in email works
4. Verify all instructions are accurate

Report results.
```

---

## QUICK EXECUTION SCRIPT

Save this as `setup-all-products.ps1`:

```powershell
# Setup all product repos
# Run: .\setup-all-products.ps1

Write-Host "🚀 FOR THE KIDS - Product Repo Setup" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

$repos = @(
    "claude-droid",
    "income-droid", 
    "marketing-engine",
    "jules-ai",
    "affiliate-system",
    "dating-platform"
)

$token = (Get-Content C:\AiCollabForTheKids\api\.env | Select-String "GITHUB_TOKEN=").ToString().Split("=")[1]

foreach ($repo in $repos) {
    Write-Host "`n📦 Creating $repo..." -ForegroundColor Yellow
    
    $body = @{
        name = $repo
        private = $true
        auto_init = $true
        description = "AI Solutions Store - FOR THE KIDS"
    } | ConvertTo-Json
    
    try {
        Invoke-RestMethod `
            -Uri "https://api.github.com/orgs/Ai-Solutions-Store/repos" `
            -Method Post `
            -Headers @{
                "Authorization" = "Bearer $token"
                "Accept" = "application/vnd.github.v3+json"
            } `
            -Body $body `
            -ContentType "application/json"
        
        Write-Host "✅ Created: https://github.com/Ai-Solutions-Store/$repo" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Failed to create $repo : $_" -ForegroundColor Red
    }
}

Write-Host "`n🎉 All repos created! Now run Claude CLI to package each one." -ForegroundColor Cyan
```

---

## PRIORITY ORDER

1. **IMMEDIATE** - Run PowerShell script to create empty repos (prevents 404s)
2. **TODAY** - Package Claude Droid (smallest, simplest)
3. **TODAY** - Package Marketing Engine (most code exists)
4. **THIS WEEK** - Package remaining products

---

## AFTER ALL REPOS ARE READY

Update FLEET-STATUS.md with:
- [ ] All 6 product repos created
- [ ] All repos have working code
- [ ] Webhook handler updated
- [ ] Test purchase completed
- [ ] Email delivery verified

Gospel Aligned. 🔒
