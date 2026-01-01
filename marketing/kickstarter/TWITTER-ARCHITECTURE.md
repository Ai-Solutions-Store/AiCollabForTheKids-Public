# Twitter Campaign Architecture - System Overview
**FOR THE KIDS - Technical Flow Diagram**

---

## AUTHENTICATION FLOW

```
┌─────────────────────────────────────────────────────────────────┐
│                    TWITTER OAUTH 1.0A FLOW                       │
└─────────────────────────────────────────────────────────────────┘

    [api/.env]
        │
        ├── TWITTER_API_KEY ────────────┐
        ├── TWITTER_API_SECRET ─────────┤
        ├── TWITTER_ACCESS_TOKEN ───────┤──> OAuth 1.0a Credentials
        └── TWITTER_ACCESS_TOKEN_SECRET─┘
                    │
                    │ Loaded by script
                    ▼
    [Post-TwitterOAuth.ps1]
                    │
                    ├──> Get-OAuthNonce() ──────> Random string
                    ├──> Get-OAuthTimestamp() ──> Unix epoch
                    ├──> Get-OAuthSignature() ──> HMAC-SHA1 signing
                    └──> Get-OAuthHeader() ─────> Authorization header
                                │
                                ▼
                    Authorization: OAuth oauth_consumer_key="...",
                                        oauth_nonce="...",
                                        oauth_signature="...",
                                        oauth_signature_method="HMAC-SHA1",
                                        oauth_timestamp="...",
                                        oauth_token="...",
                                        oauth_version="1.0"
                                │
                                ▼
                    [Twitter API v2]
                    POST https://api.twitter.com/2/tweets
                                │
                                ▼
                    ✓ Tweet Posted Successfully
                    Response: { "data": { "id": "123...", "text": "..." } }
```

---

## DATA FLOW

```
┌─────────────────────────────────────────────────────────────────┐
│                      CAMPAIGN DATA FLOW                          │
└─────────────────────────────────────────────────────────────────┘

    [TWEET-QUEUE.txt]
        │
        ├── Tweet 1: Launch (Kickstarter CTA)
        ├── Tweet 2: Shriners (Trust builder)
        ├── Tweet 3: Movement (Social proof)
        ├── Tweet 4: Problem/Solution (Hook)
        └── Tweet 5: Product (Use cases)
                │
                │ Read by script
                ▼
    [Post-TwitterOAuth.ps1 -ProcessQueue]
                │
                ├──> Tweet 1 ──> Post ──> ✓ Success ──> Delay 180min
                │                   │
                │                   └──> ✗ Error ──> Log & Continue
                │
                ├──> Tweet 2 ──> Post ──> ✓ Success ──> Delay 180min
                ├──> Tweet 3 ──> Post ──> ✓ Success ──> Delay 180min
                ├──> Tweet 4 ──> Post ──> ✓ Success ──> Delay 180min
                └──> Tweet 5 ──> Post ──> ✓ Success ──> Summary
                                │
                                ▼
                    [Result Summary]
                    - Total: 5 tweets
                    - Posted: 5
                    - Failed: 0
                    - Tweet IDs: [list]
```

---

## SCRIPT ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────┐
│                    SCRIPT COMPONENTS                             │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────┐
│   Test-TwitterAuth.ps1               │
│   (Pre-flight Check)                 │
├─────────────────────────────────────┤
│ [1] Check Credentials Present        │
│ [2] Test Bearer Token (Read)         │
│ [3] Test OAuth Helpers               │
│ [4] Check Tweet Queue                │
│                                      │
│ Output: "READY TO POST" or errors    │
└─────────────────────────────────────┘
                │
                │ If ready
                ▼
┌─────────────────────────────────────┐
│   Post-TwitterOAuth.ps1              │
│   (Main Posting Script)              │
├─────────────────────────────────────┤
│ [Functions]                          │
│  ├─ Get-OAuthNonce                   │
│  ├─ Get-OAuthTimestamp               │
│  ├─ Get-OAuthSignature               │
│  ├─ Get-OAuthHeader                  │
│  └─ Post-TweetOAuth                  │
│                                      │
│ [Modes]                              │
│  ├─ Single Tweet                     │
│  └─ Queue Processing                 │
│                                      │
│ [Parameters]                         │
│  ├─ -TweetText "text"                │
│  ├─ -ProcessQueue                    │
│  └─ -DelayMinutes 180                │
│                                      │
│ [Output]                             │
│  ├─ Progress tracking                │
│  ├─ Error handling                   │
│  └─ Result summary                   │
└─────────────────────────────────────┘
```

---

## FILE DEPENDENCY MAP

```
┌─────────────────────────────────────────────────────────────────┐
│                    FILE DEPENDENCIES                             │
└─────────────────────────────────────────────────────────────────┘

    [USER STARTS HERE]
            │
            ▼
    TWITTER-QUICK-START.md ───┐
            │                  │ (Quick reference)
            │                  │
            ▼                  ▼
    TWITTER-DEPLOYMENT-GUIDE.md ←─→ TWITTER-OAUTH-RESEARCH.md
            │                              │
            │ (Operations)        (Technical details)
            │                              │
            └──────────┬───────────────────┘
                       │
                       ▼
            TWITTER-SOLUTION-SUMMARY.md
                       │
                       │ (Executive overview)
                       │
                       ▼
            TWITTER-CAMPAIGN-INDEX.md
                       │
                       │ (Navigation hub)
                       │
            ┌──────────┴──────────┐
            │                     │
            ▼                     ▼
    Test-TwitterAuth.ps1   Post-TwitterOAuth.ps1
            │                     │
            │                     │
            ├─────────────────────┤
            │                     │
            ▼                     ▼
        api/.env          TWEET-QUEUE.txt
     (Credentials)        (Tweet content)
```

---

## EXECUTION WORKFLOW

```
┌─────────────────────────────────────────────────────────────────┐
│                    EXECUTION TIMELINE                            │
└─────────────────────────────────────────────────────────────────┘

PHASE 1: PREPARATION (5 minutes)
────────────────────────────────
│
├─ [00:00] Read TWITTER-QUICK-START.md
│           └─> Understand 3-command workflow
│
├─ [00:02] Run Test-TwitterAuth.ps1
│           └─> Verify credentials ✓
│
└─ [00:05] Ready to deploy


PHASE 2: TESTING (2 minutes)
────────────────────────────────
│
├─ [00:00] Post test tweet
│           └─> .\Post-TwitterOAuth.ps1 -TweetText "Test"
│
├─ [00:01] Verify on Twitter
│           └─> Check @AiCollab4Kids timeline
│
└─ [00:02] Authentication confirmed ✓


PHASE 3: DEPLOYMENT (12 hours automated)
────────────────────────────────────────
│
├─ [00:00] Start queue processing
│           └─> .\Post-TwitterOAuth.ps1 -ProcessQueue -DelayMinutes 180
│
├─ [00:00] Tweet 1 posted ✓ (9:00 AM)
├─ [03:00] Tweet 2 posted ✓ (12:00 PM)
├─ [06:00] Tweet 3 posted ✓ (3:00 PM)
├─ [09:00] Tweet 4 posted ✓ (6:00 PM)
├─ [12:00] Tweet 5 posted ✓ (9:00 PM)
│
└─ [12:00] Campaign complete - Summary displayed


PHASE 4: MONITORING (Ongoing)
────────────────────────────────
│
├─ [Real-time] Twitter Analytics
│               └─> Track impressions, engagement
│
├─ [Hourly] Kickstarter Dashboard
│            └─> Monitor referral traffic
│
└─ [Daily] Engagement responses
             └─> Reply to mentions, likes, retweets
```

---

## SYSTEM REQUIREMENTS

```
┌─────────────────────────────────────────────────────────────────┐
│                    REQUIREMENTS & DEPENDENCIES                   │
└─────────────────────────────────────────────────────────────────┘

SOFTWARE
────────────────────────────────
├─ PowerShell 5.1 or higher ✓
├─ .NET Framework 4.5+ ✓
├─ Internet connection ✓
└─ Windows (tested on 10/11) ✓

CREDENTIALS (api/.env)
────────────────────────────────
├─ TWITTER_API_KEY ✓
├─ TWITTER_API_SECRET ✓
├─ TWITTER_ACCESS_TOKEN ✓
└─ TWITTER_ACCESS_TOKEN_SECRET ✓

API ACCESS
────────────────────────────────
├─ Twitter Developer Account ✓
├─ App with Read+Write permissions ✓
├─ API v2 access ✓
└─ Rate limit: 50 tweets/24hrs ✓

CONTENT
────────────────────────────────
├─ TWEET-QUEUE.txt (5 tweets) ✓
├─ Gospel V1.3 compliance ✓
└─ Kickstarter link active ✓
```

---

## ERROR HANDLING FLOW

```
┌─────────────────────────────────────────────────────────────────┐
│                    ERROR HANDLING                                │
└─────────────────────────────────────────────────────────────────┘

    [Tweet Attempt]
            │
            ▼
    ┌───────────────┐
    │ POST Request  │
    └───────┬───────┘
            │
            ├──> SUCCESS (200) ──> Log tweet ID ──> Continue
            │
            ├──> 401 Unauthorized
            │       └──> Check credentials in .env
            │           └──> Verify token permissions
            │               └──> Regenerate if needed
            │
            ├──> 403 Forbidden
            │       └──> Check OAuth signature
            │           └──> Verify timestamp/nonce
            │               └──> Retry once
            │
            ├──> 429 Rate Limit
            │       └──> Wait for rate limit reset
            │           └──> Resume queue processing
            │
            └──> 400 Bad Request
                    └──> Check tweet content
                        └──> Verify not duplicate
                            └──> Modify if needed

    All errors logged to console with:
    - Status code
    - Error message
    - Timestamp
    - Tweet content (for debugging)
```

---

## SECURITY ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────┐
│                    SECURITY LAYERS                               │
└─────────────────────────────────────────────────────────────────┘

CREDENTIAL STORAGE
────────────────────────────────
├─ api/.env (local only)
├─ Never committed to git (.gitignore)
├─ Masked in logs (first 10 chars only)
└─ No hardcoded credentials in scripts ✓

TRANSMISSION SECURITY
────────────────────────────────
├─ TLS 1.2 enforced
├─ HTTPS only (no HTTP fallback)
├─ Certificate validation
└─ Encrypted OAuth signatures ✓

SIGNATURE SECURITY
────────────────────────────────
├─ HMAC-SHA1 hashing
├─ Cryptographic nonce (unique per request)
├─ Timestamp validation (prevents replay attacks)
└─ Signature verification by Twitter API ✓

ACCESS CONTROL
────────────────────────────────
├─ Token permissions: Read+Write only (not delete)
├─ Account-level access (@AiCollab4Kids only)
├─ App-level restrictions (Twitter Developer Portal)
└─ No admin or DM permissions ✓
```

---

## MONITORING DASHBOARD

```
┌─────────────────────────────────────────────────────────────────┐
│                    METRICS TO TRACK                              │
└─────────────────────────────────────────────────────────────────┘

TWITTER ANALYTICS
────────────────────────────────
├─ Impressions per tweet
├─ Engagement rate (%)
├─ Retweets + Likes + Replies
├─ Profile visits
├─ Follower growth
└─ Link clicks

KICKSTARTER DASHBOARD
────────────────────────────────
├─ Referral traffic from twitter.com
├─ Conversion rate (clicks → pledges)
├─ Pledge amounts
├─ Backer demographics
└─ Time to conversion

CAMPAIGN METRICS
────────────────────────────────
├─ Tweets posted: 5/5 ✓
├─ Success rate: 100% target
├─ Average engagement: 1-3% target
├─ Total Kickstarter clicks: 50+ target
└─ Pledges attributed: 1+ target

ACCESS METRICS AT:
├─ Twitter: https://analytics.twitter.com
└─ Kickstarter: https://kickstarter.com/projects/aidoesitall/dashboard
```

---

## GOSPEL V1.3 COMPLIANCE MAP

```
┌─────────────────────────────────────────────────────────────────┐
│                    GOSPEL V1.3 INTEGRITY                         │
└─────────────────────────────────────────────────────────────────┘

TWEET 1: "60% of ALL revenue goes to children's hospitals"
            └─> ✓ 60% reference (not 60%)

TWEET 2: "100% of the first $60K we raise goes DIRECTLY to Shriners"
            └─> ✓ Named charity (Shriners Children's)
            └─> ✓ Transparent, no hedging

TWEET 3: "60% of revenue to verified pediatric charities - hardcoded, immutable"
            └─> ✓ 60% reference
            └─> ✓ Immutability emphasized

TWEET 4: "60% to charity. Always."
            └─> ✓ 60% reference
            └─> ✓ Permanent commitment

TWEET 5: "Every AI tool you use helps fund children's medical care"
            └─> ✓ Mission integration
            └─> ✓ Pediatric focus

COMPLIANCE: 5/5 tweets ✓
GOSPEL VERSION: V1.3 (Ethics Override - 60/30/10)
DEVIATIONS: ZERO
```

---

## BACKUP & RECOVERY

```
┌─────────────────────────────────────────────────────────────────┐
│                    CONTINGENCY PLANS                             │
└─────────────────────────────────────────────────────────────────┘

IF OAUTH FAILS
────────────────────────────────
├─ [Plan A] Verify credentials in api/.env
├─ [Plan B] Regenerate tokens in Twitter Developer Portal
├─ [Plan C] Manual posting via https://twitter.com
└─ [Plan D] Use TweetDeck for scheduling

IF RATE LIMITED
────────────────────────────────
├─ [Plan A] Wait for rate limit reset (15 minutes)
├─ [Plan B] Spread tweets across 2 days
├─ [Plan C] Reduce tweet count (prioritize top 3)
└─ [Plan D] Use Twitter web interface

IF POOR ENGAGEMENT
────────────────────────────────
├─ [Plan A] Adjust posting times (evening focus)
├─ [Plan B] Boost with paid promotion
├─ [Plan C] Cross-promote on Reddit/Discord
└─ [Plan D] Engage influencers manually

IF ACCOUNT SUSPENDED
────────────────────────────────
├─ [Plan A] Appeal with charity mission proof
├─ [Plan B] Use backup account (if available)
├─ [Plan C] Focus on other platforms
└─ [Plan D] Contact Twitter support directly
```

---

**ARCHITECTURE STATUS: DOCUMENTED**

**FOR THE KIDS. ALWAYS.**
