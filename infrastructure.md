# Infrastructure Reference

## ⚡ FLEET STATUS: DECEMBER 2025 PRODUCTION SNAPSHOT

```
┌─────────────────────────────────────────────────────────────────┐
│  STATUS: ✅ PRODUCTION READY - ALL SYSTEMS OPERATIONAL          │
│  MODE: REVENUE GENERATION (Business First Doctrine Active)      │
│  PHASE: OPERATING (No longer building - machine is LIVE)        │
└─────────────────────────────────────────────────────────────────┘
```

### Live Systems

| System | Status | Endpoint/Notes |
|--------|--------|----------------|
| **API Server** | ✅ LIVE | https://api.aidoesitall.website |
| **Square Webhook** | ✅ CONNECTED | https://api.aidoesitall.website/api/ai-store-webhook |
| **Cloudflare Tunnel** | ✅ ACTIVE | for-the-kids (db46c9fd-4387-4ee3-86ad-ed0c80171bf6) |
| **Marketing Engine** | ✅ RUNNING | 17 platforms (PM2 on Sabertooth) |
| **Blockchain Split** | ✅ ENFORCED | Base Mainnet Contract Active |

### Node Status

| Node | Role | Status |
|------|------|--------|
| **Sabertooth** | Marketing Engine + Dev | ✅ OPERATIONAL |
| **T5500** | Production Server | ✅ OPERATIONAL |
| **EC2** | Cloud Backup | ✅ STANDBY |
| **9020** | Auxiliary/Sentry | ✅ MONITORING |

### Credential Status (Dec 2025)

| Credential | Status | Expiration |
|------------|--------|------------|
| GitHub PAT | ✅ ACTIVE | **No Expiration** |
| Cloudflare Token | ✅ ACTIVE | Jul 31, 2026 |
| Square Access Token | ✅ PRODUCTION | Active |
| SendGrid API | ✅ ACTIVE | Active |

### Marketing Platforms (17 Active)

Twitter, Reddit, LinkedIn, Dev.to, Hashnode, Telegram, Medium, HackerNews, ProductHunt, IndieHackers, Facebook, Instagram, Pinterest, YouTube, TikTok, Discord, Slack

### What This Means

**WE ARE NOT BUILDING. WE ARE OPERATING.**

- Payment webhook is LIVE and processing
- Marketing engine is LIVE and posting
- Charitable split is LIVE and enforced via blockchain
- All infrastructure is production-ready

**Every penny now = 60 cents to kids. The machine works.**

---

## Fleet Architecture

### Sabertooth (Primary Development)
- **IP:** 192.168.0.104
- **OS:** Windows
- **Specs:** 64GB RAM, 8GB GPU
- **Role:** Main workstation for development
- **PM2 Services:** Marketing engine (17 platforms automated)

### T5500 (Compute Node)
- **IP:** 192.168.0.101
- **OS:** Windows
- **Role:** Primary compute, Desktop Commander access
- **Critical:** Always read `C:\AiCollabForTheKids\FLEET-STATUS.md` first
- **Confirmation:** Say "Gospel Aligned" after reading

### 9020 (Auxiliary)
- **IP:** 192.168.0.103
- **OS:** Windows
- **Role:** Backup compute, sentry monitoring

### EC2 (Cloud Endpoint)
- **IP:** 3.84.226.108
- **OS:** Linux
- **Role:** Cloud endpoint for external access

## Domain Architecture

### aidoesitall.website
- **Zone ID:** 749ef5258b9719dd3827a6a842aff642
- **Purpose:** Main dashboard and API
- **Routes:**
  - Root (:8081) → Dashboard
  - api.aidoesitall.website (:3000) → API server

### youandinotai.com
- **Zone ID:** 155fc19cd87bc1ea8989f0deb210d612
- **Purpose:** Dating app
- **Route:** :9000
- **Note:** High-risk merchant account challenges for payment processing

### ai-solutions.store
- **Zone ID:** d8dc716622d6195ff851c800a1d92549
- **Purpose:** AI product sales

### youandinotai.online
- **Purpose:** Alternative dating app domain

## Cloudflare Configuration

**Account:** joshlcoleman@gmail.com
**Account ID:** 516a3a855f44f5ad8453636d163ae25d
**Primary Tunnel:** for-the-kids (db46c9fd-4387-4ee3-86ad-ed0c80171bf6)

### Tunnel Routes
| Hostname | Port | Service |
|----------|------|---------|
| aidoesitall.website | 8081 | Dashboard |
| api.aidoesitall.website | 3000 | API |
| youandinotai.com | 9000 | Dating App |

## Repository Structure

**Primary Repository:** github.com/Ai-Solutions-Store/AiCollabForTheKids (private)
**Public Mirror:** github.com/Ai-Solutions-Store/AiCollabForTheKids-Public
**Organization:** Ai-Solutions-Store
**User:** Trollz1004

### Key Files
```
AiCollabForTheKids/
├── FLEET-STATUS.md     # Current state - READ FIRST
├── CLAUDE.md           # Master instructions
├── GOSPEL.md           # Immutable rules
├── api/
│   └── .env            # All credentials (source of truth)
└── scripts/
    └── marketing/
        └── marketing-runner.cjs  # 17-platform automation
```

## Blockchain Infrastructure (Base Mainnet)

**Chain ID:** 8453
**Contract:** 0x9855B75061D4c841791382998f0CE8B2BCC965A4

### Wallets (Immutable Split Enforcement)
| Purpose | Address |
|---------|---------|
| Charity (60%) | 0x8d3dEADbE2b4B857A43331D459270B5eedC7084e |
| Infrastructure (30%) | 0xe0a42f83900af719019eBeD3D9473BE8E8f2920b |
| Founder (10%) | 0x7c3E283119718395Ef5EfBAC4F52738C2018daA7 |

## Payment Infrastructure

### Square (PRIMARY - Production)
- **Account:** joshlcoleman@gmail.com (primary), ebaytrashortreasure@gmail.com (dev)
- **App ID:** sq0idp-S-hDhQCZ4xPGWa5chaTZfQ
- **Location IDs:**
  - Primary: LTDX6ZANTVEEN
  - Dev: LY5GN09F5AN83
- **Webhook:** https://api.aidoesitall.website/api/ai-store-webhook
- **Banking:** Account 3237076026702, Routing 041215663

### Active Payment Links
| Product | Price | Link |
|---------|-------|------|
| Consultation | $1 | https://square.link/u/kckKn8JE |
| AI Starter | $9.99 | https://square.link/u/Rz39ejjf |
| AI Pro | $29.99 | https://square.link/u/RZlWfydp |

### PayPal
- Status: Integrated
- Used alongside Square for customer choice

### Stripe
- Status: **REMOVED** - No longer used

## Communication Infrastructure

### Telegram Bot
- **Token:** 8313006115:AAH5xv4ol7RoScmuM3SAUJgt_93IS6rpblQ
- **Username:** @AiSolutionsForTheKids_bot
- **Channel ID:** 6244456983

### Email (SendGrid)
- **From:** noreply@aidoesitall.website
- **Note:** Also using Gmail/nodemailer as backup (resolved SendGrid deliverability issues)

### SMS (Twilio)
- **Status:** Disabled
- **Phone:** +18889584883
- **Joshua's Phone:** +13529735909

## API Services

### Google Gemini
- Integrated for AI capabilities

### Dev.to
- Username: @trollz1004
- Used for marketing/content

### Hashnode
- Publication ID: 694931f23882e5360f57295a
- Used for marketing/content

### Printful
- Merchandise integration for platform merch sales

## GitHub Secrets (Repository Level)
These are set at the repository level for CI/CD:
- CLOUDFLARE_API_TOKEN
- CLOUDFLARE_ACCOUNT_ID
- GH_PAT
- SENDGRID_API_KEY
- SQUARE_ACCESS_TOKEN

## Network Notes

- All machines on 192.168.0.x network
- Cloudflare tunnels handle external routing
- No direct port forwarding required
- SSH aliases configured for fleet access

## Maintenance Windows

- LLC annual report due January-May (starting 2026)
- $400 late fee if missed
- 50% Shriners escrow must be maintained
- Letter# 250411085236-200447938812
