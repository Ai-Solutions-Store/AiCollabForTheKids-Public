# FOR THE KIDS - AFFILIATE PROGRAM
## Gospel V1.3 Compliant (60/30/10 Split)

**Last Updated:** December 19, 2025
**Program Status:** Active
**Platform:** FOR THE KIDS (Trash or Treasure Online Recycler LLC)
**EIN:** 33-4655313

---

## TABLE OF CONTENTS

1. [Program Overview](#program-overview)
2. [Commission Structure](#commission-structure)
3. [Gospel Split Compliance](#gospel-split-compliance)
4. [How It Works](#how-it-works)
5. [Affiliate Registration Process](#affiliate-registration-process)
6. [Promotional Materials](#promotional-materials)
7. [Tracking Links Setup](#tracking-links-setup)
8. [Payment Terms](#payment-terms)
9. [Commission Calculation](#commission-calculation)
10. [Affiliate Dashboard](#affiliate-dashboard)
11. [Terms and Conditions](#terms-and-conditions)
12. [Brand Guidelines](#brand-guidelines)
13. [Prohibited Activities](#prohibited-activities)
14. [Technical Integration](#technical-integration)
15. [Contact Information](#contact-information)

---

## PROGRAM OVERVIEW

The FOR THE KIDS Affiliate Program enables partners to earn commissions while contributing to our mission: **60% of all revenue goes to Verified Pediatric Charities**.

### Mission Statement

**FOR THE KIDS** - We allocate 60% of profits to Verified Pediatric Charities through a transparent, automated revenue allocation system.

### What Makes Us Different

- **Transparent Revenue Split:** 60/30/10 (Charity/Infrastructure/Founder) - Immutable Gospel V1.3
- **Real Impact:** Every sale helps children at verified pediatric charities
- **Ethical AI Platform:** Benevolent Technocracy model - serious tech with social impact
- **Multiple Revenue Streams:** Dating platform, AI services, merchandise, subscriptions
- **Automated Tracking:** Real-time commission tracking via API-driven system

### Products You Can Promote

1. **You and I, Not A.I.** - Anti-AI dating platform subscriptions
   - Starter Plan: $4.99/month
   - Premium Plan: $9.99/month
   - VIP Plan: $19.99/month

2. **AI Services** - Professional AI integration and consulting
   - Custom pricing based on scope

3. **Merchandise** - FOR THE KIDS branded apparel and goods
   - Printful-fulfilled items
   - Variable pricing

4. **Founding Member Access** - Lifetime platform benefits
   - One-time payment: $99-$499 (tiered)

---

## COMMISSION STRUCTURE

### Standard Commission Rate

**10% of gross revenue** from all referred sales

### Commission Source (Gospel V1.3 Compliance)

**CRITICAL:** Affiliate commissions are paid from the **30% Infrastructure allocation**, NOT from the charity allocation.

```
Revenue Flow (Gospel V1.3):
─────────────────────────────
Customer Payment: $100.00
├── 60% → Verified Pediatric Charities ($60.00) ✅ NEVER TOUCHED
├── 30% → Infrastructure ($30.00)
│   └── Affiliate Commission: 10% of total revenue ($10.00) ← Paid from here
└── 10% → Founder ($10.00)

Net Infrastructure after affiliate commission: $20.00
```

### Commission Tiers (Available for High-Performers)

| Tier | Monthly Revenue | Commission Rate | Requirements |
|------|----------------|-----------------|--------------|
| **Standard** | $0 - $5,000 | 10% | Default tier |
| **Silver** | $5,000 - $15,000 | 12% | Consistent performance for 3 months |
| **Gold** | $15,000 - $50,000 | 15% | Approved by admin, strategic partnership |
| **Platinum** | $50,000+ | 18% | Exclusive partnerships, bulk referrals |

**Note:** Tier upgrades are approved manually based on performance and partnership value.

### Recurring Commissions

For subscription-based products (dating platform):
- **Earn commission on initial sale**
- **Earn commission on renewals for 6 months** (first 6 billing cycles)
- After 6 months, customer becomes direct (no further affiliate commission)

### Lifetime Value Example

```
Customer subscribes to Premium Plan ($9.99/month) via your link:

Month 1: $9.99 × 10% = $1.00 commission
Month 2: $9.99 × 10% = $1.00 commission
Month 3: $9.99 × 10% = $1.00 commission
Month 4: $9.99 × 10% = $1.00 commission
Month 5: $9.99 × 10% = $1.00 commission
Month 6: $9.99 × 10% = $1.00 commission
─────────────────────────────────────────
Total 6-Month Commission: $5.99

Customer continues subscription (becomes direct):
Month 7+: $0.00 commission (no longer tracked to affiliate)
```

---

## GOSPEL SPLIT COMPLIANCE

### The Immutable Law (Gospel V1.3)

**60% to Verified Pediatric Charities | 30% Infrastructure | 10% Founder**

This split is **IMMUTABLE** and hardcoded into our system. It cannot be changed by anyone.

### What This Means for Affiliates

1. **The Charity Always Gets 60%**
   - Your commissions do NOT reduce the charity allocation
   - Every sale you refer still sends 60% to children's charities
   - You are helping amplify charitable impact, not reducing it

2. **Commissions Come From Infrastructure**
   - The 30% infrastructure allocation covers:
     - Server costs
     - API fees
     - Marketing (including affiliate commissions)
     - Development costs
   - Your 10% commission is part of our marketing budget

3. **Transparent Impact Tracking**
   - Every commission record includes `charityImpact` field
   - You can see exactly how much charity funding your referrals generated
   - Example: $100 sale → Your commission: $10 | Charity impact: $60

### Gospel Compliance Verification

All affiliate transactions are logged with Gospel compliance metadata:

```javascript
{
  "affiliateCommission": 10.00,
  "charityImpact": 60.00,         // Always 60% of revenue
  "infrastructureShare": 30.00,   // Your commission comes from here
  "founderShare": 10.00,
  "gospelVersion": "V1.3",
  "splitVerified": true
}
```

---

## HOW IT WORKS

### 5-Step Process

```
1. APPLY → 2. APPROVED → 3. PROMOTE → 4. EARN → 5. GET PAID
```

### Detailed Flow

**STEP 1: Apply to Program**
- Fill out affiliate registration form
- Provide payment details (email for Square payouts)
- Wait for approval (typically 1-3 business days)

**STEP 2: Get Approved**
- Our team reviews your application
- You receive approval email with unique affiliate code
- Access to affiliate dashboard and promotional materials

**STEP 3: Promote Products**
- Use your unique tracking links
- Share on social media, blog, email, website
- Leverage provided promotional materials

**STEP 4: Earn Commissions**
- Customer clicks your link (tracked via cookie, 30-day window)
- Customer makes purchase
- Commission automatically calculated and credited

**STEP 5: Get Paid**
- Commissions accumulate in your affiliate account
- Monthly payouts (1st of each month) via Square
- Minimum payout threshold: $50.00
- Detailed payout reports provided

---

## AFFILIATE REGISTRATION PROCESS

### Eligibility Requirements

To become a FOR THE KIDS affiliate, you must:

- ✅ Be 18+ years old
- ✅ Have a valid email address
- ✅ Have a platform to promote (website, social media, email list, etc.)
- ✅ Agree to program terms and conditions
- ✅ Commit to ethical promotion practices
- ✅ Not engage in prohibited activities (see section below)

### Application Process

**API Endpoint:** `POST https://dao.youandinotai.com/api/affiliates/register`

**Required Information:**
```json
{
  "email": "your-email@example.com",
  "name": "Your Full Name",
  "companyName": "Your Company (optional)",
  "paymentEmail": "payment-email@example.com (optional, defaults to email)",
  "source": "How you heard about us (optional)"
}
```

**Or Apply Via Web Form:**
- Visit: `https://jules-dashboard.pages.dev/affiliates/apply`
- Fill out registration form
- Submit application

### Approval Timeline

- **Automatic Review:** Applications reviewed within 24-48 hours
- **Approval Notification:** Email sent with affiliate code and dashboard access
- **Rejection Notification:** If declined, explanation provided

### What Happens After Approval

1. **Welcome Email** with:
   - Your unique affiliate code (e.g., `JOHNDOE123`)
   - Dashboard login link
   - Getting started guide
   - Promotional material access

2. **Dashboard Access:**
   - Real-time commission tracking
   - Referral analytics
   - Custom tracking link generator
   - Payout history

3. **Promotional Materials:**
   - Banner images (multiple sizes)
   - Social media templates
   - Email copy templates
   - Brand guidelines PDF

---

## PROMOTIONAL MATERIALS

### Available Assets

All promotional materials follow **Gospel V1.3 Brand Guidelines** (Benevolent Technocracy aesthetic).

#### 1. Banner Images

**Download Location:** `https://jules-dashboard.pages.dev/affiliates/assets/banners`

Available sizes:
- Leaderboard: 728x90px
- Medium Rectangle: 300x250px
- Large Rectangle: 336x280px
- Skyscraper: 160x600px
- Wide Skyscraper: 300x600px
- Mobile Banner: 320x50px
- Hero Banner: 1920x600px

**Design Specs:**
- Background: Dark void (`#141413`)
- Primary Color: Coral (`#CC785C`)
- Accent: Blue (`#078EFA`), Teal (`#20808D`)
- Typography: Space Grotesk, Inter
- Logo: "Core Node" isometric heart

#### 2. Social Media Templates

**Platform-Specific Sizes:**

**Instagram:**
- Square Post: 1080x1080px
- Story: 1080x1920px
- Reels Cover: 1080x1920px

**Twitter/X:**
- Post Image: 1200x675px
- Header: 1500x500px

**Facebook:**
- Post Image: 1200x630px
- Cover Photo: 820x312px

**LinkedIn:**
- Post Image: 1200x627px
- Company Cover: 1128x191px

**TikTok:**
- Video Thumbnail: 1080x1920px

#### 3. Text Copy Templates

**Short Copy (Social Media):**

```
🎯 Earn 10% commissions while helping kids!
Join the FOR THE KIDS affiliate program.
60% of every sale → Verified Pediatric Charities
[Your Affiliate Link]
#ForTheKids #EthicalTech
```

**Medium Copy (Email):**

```
Subject: Earn While Making a Difference - FOR THE KIDS Affiliate Program

Hi [Name],

I've partnered with FOR THE KIDS - a unique platform that allocates 60%
of all revenue to Verified Pediatric Charities.

Their affiliate program offers:
✅ 10% commission on all sales
✅ Recurring revenue from subscriptions
✅ Real-time tracking dashboard
✅ $50 minimum payout

Products to promote:
- Anti-AI dating platform ($4.99-$19.99/month)
- AI services & consulting
- FOR THE KIDS merchandise

Every sale you refer helps children. Ready to join?

[Your Affiliate Link]

For the Kids,
[Your Name]
```

**Long Copy (Blog Post):**

```
Title: How I Earn Passive Income While Supporting Children's Charities

[Personalize introduction]

I recently discovered FOR THE KIDS - a platform that's redefining
how technology companies give back. Here's what makes them unique:

THE GOSPEL SPLIT (Immutable Law):
- 60% → Verified Pediatric Charities
- 30% → Infrastructure & Growth
- 10% → Founder

This isn't marketing fluff - it's hardcoded into their system and
verified on every transaction.

Their affiliate program lets me earn 10% commissions while amplifying
charitable impact. Here's how it works:

[Continue with your experience...]

Ready to join? Apply here: [Your Affiliate Link]
```

#### 4. Video Scripts

**30-Second Explainer:**

```
[Scene 1 - Problem]
"Tired of companies that claim to 'give back' but hide the numbers?"

[Scene 2 - Solution]
"FOR THE KIDS is different. 60% of every dollar goes to Verified
Pediatric Charities. Not 'up to' - exactly 60%, every time."

[Scene 3 - Opportunity]
"Their affiliate program lets you earn 10% commissions while helping
kids. Real impact. Real income."

[Scene 4 - CTA]
"Join today: [Your Affiliate Link]"
```

#### 5. Email Signature

```
──────────────────────────────────
[Your Name] | FOR THE KIDS Partner
Earn 10% while helping children 🎯
60% of revenue → Pediatric Charities
[Your Affiliate Link]
──────────────────────────────────
```

---

## TRACKING LINKS SETUP

### Your Unique Affiliate Code

After approval, you receive a unique code (e.g., `JOHNDOE123`).

### Link Structure

**Base Format:**
```
https://youandinotai.com/ref/[YOUR-CODE]
https://aidoesitall.website/ref/[YOUR-CODE]
```

**Examples:**
- Dating Platform: `https://youandinotai.com/ref/JOHNDOE123`
- AI Services: `https://aidoesitall.website/ref/JOHNDOE123`
- Merchandise: `https://merch.youandinotai.com/ref/JOHNDOE123`
- Dashboard: `https://jules-dashboard.pages.dev/ref/JOHNDOE123`

### Deep Linking (Product-Specific)

Link directly to specific products or pages:

**Dating Plans:**
```
https://youandinotai.com/pricing?ref=JOHNDOE123
https://youandinotai.com/register?ref=JOHNDOE123&plan=premium
```

**Merchandise:**
```
https://merch.youandinotai.com/product/tshirt?ref=JOHNDOE123
```

**Founding Members:**
```
https://jules-dashboard.pages.dev/founding-members?ref=JOHNDOE123
```

### URL Shortening (Optional)

Use branded short links via our API:

**Endpoint:** `POST https://dao.youandinotai.com/api/affiliates/shorten`

**Request:**
```json
{
  "code": "JOHNDOE123",
  "destination": "https://youandinotai.com/pricing",
  "campaign": "social-media-dec-2025"
}
```

**Response:**
```json
{
  "shortUrl": "https://ftk.link/abc123",
  "trackingId": "ref-12345",
  "expiresAt": null
}
```

### Tracking Cookie Mechanism

**How It Works:**

1. **User Clicks Your Link**
   - Request sent to: `GET /api/affiliates/track/[YOUR-CODE]`
   - Server creates referral record
   - Tracking cookie set: `ftk_ref=[SESSION-ID]` (30-day expiration)

2. **User Browses Site**
   - Cookie persists across sessions
   - Valid for 30 days from initial click

3. **User Makes Purchase**
   - System checks for `ftk_ref` cookie
   - Commission attributed to your account
   - Referral marked as converted

**Cookie Details:**
```javascript
{
  name: "ftk_ref",
  value: "session-uuid-12345",
  expires: 30 days,
  domain: ".youandinotai.com",
  secure: true,
  sameSite: "Lax"
}
```

### Multi-Channel Tracking

**Use UTM Parameters for Analytics:**

```
https://youandinotai.com/ref/JOHNDOE123
  ?utm_source=facebook
  &utm_medium=social
  &utm_campaign=holiday2025
  &utm_content=banner-ad
```

These parameters are tracked in your dashboard for performance analysis.

### API Integration (Advanced)

**Direct Tracking via API:**

```bash
# Track affiliate visit programmatically
curl -X GET "https://dao.youandinotai.com/api/affiliates/track/JOHNDOE123?source=email&metadata={\"campaign\":\"newsletter\"}"

# Response includes tracking session ID
{
  "success": true,
  "sessionId": "abc-123-def-456",
  "trackingId": "ref-12345",
  "expiresIn": 2592000000
}
```

---

## PAYMENT TERMS

### Payment Method

**Primary:** Square Payouts (direct deposit or instant transfer)

**Requirements:**
- Valid email address linked to Square account
- Or: Bank account information (ACH transfer)

### Payment Schedule

**Monthly Payouts:**
- Payment Date: **1st of each month**
- Cutoff: Last day of previous month (11:59 PM EST)
- Processing Time: 2-5 business days

**Example Timeline:**
```
December 1-31: Earn $125.50 in commissions
January 1: Payout initiated
January 3-6: Funds arrive in your account
```

### Minimum Payout Threshold

**$50.00** - Minimum balance required to trigger payout

**If Below Minimum:**
- Commissions roll over to next month
- No expiration on accumulated commissions
- Payout triggered once threshold reached

**Example:**
```
January: Earned $35.00 (below $50, rolls over)
February: Earned $40.00 (total now $75.00, exceeds $50)
March 1: Payout of $75.00 processed
```

### Payout Reports

**Included in Each Payout:**

1. **Summary Statement:**
   - Period covered (start/end dates)
   - Total referrals converted
   - Total revenue generated
   - Total commission earned
   - Fees (if any)
   - Net payout amount

2. **Detailed Transaction Log:**
   - Itemized list of each commission
   - Order IDs
   - Customer identifiers (anonymized)
   - Product purchased
   - Revenue and commission amounts
   - Charity impact (60% allocation)

3. **Gospel Compliance Report:**
   - Verification that 60% went to charity
   - Total charity impact from your referrals
   - Infrastructure allocation breakdown

**Sample Payout Report:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FOR THE KIDS - AFFILIATE PAYOUT REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Affiliate: JOHNDOE123 (John Doe)
Period: December 1-31, 2025
Payout ID: PAY-2025-12-001

SUMMARY
───────────────────────────────────────────────────
Total Referrals:              42
Converted Referrals:          28 (66.7%)
Total Revenue Generated:      $1,485.00

Commission Rate:              10%
Total Commission Earned:      $148.50
Fees:                         $0.00
Net Payout:                   $148.50

GOSPEL SPLIT BREAKDOWN (Gospel V1.3)
───────────────────────────────────────────────────
Charity (60%):                $891.00 ✅
Infrastructure (30%):         $445.50
  ├─ Your Commission (10%):   $148.50 ← Paid to you
  └─ Net Infrastructure:      $297.00
Founder (10%):                $148.50

CHARITY IMPACT
───────────────────────────────────────────────────
Your referrals helped allocate $891.00 to Verified
Pediatric Charities this month. Thank you for being
part of FOR THE KIDS mission.

PAYMENT DETAILS
───────────────────────────────────────────────────
Method:          Square Payout
Email:           john.doe@example.com
Initiated:       January 1, 2026
Status:          PROCESSING
Expected:        January 3-6, 2026

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Questions? support@youandinotai.com
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Tax Information

**1099-NEC Forms:**
- Issued if you earn $600+ in a calendar year
- Sent by January 31st of following year
- Affiliates are independent contractors

**International Affiliates:**
- W-8BEN form required for non-US residents
- Tax withholding may apply based on tax treaty
- Consult local tax advisor for compliance

### Payout Status Tracking

**Via Dashboard:** `https://jules-dashboard.pages.dev/affiliates/dashboard/[YOUR-CODE]`

**Via API:** `GET /api/affiliates/payouts/[PAYOUT-ID]`

**Status Types:**
- `PENDING` - Payout scheduled, not yet processed
- `PROCESSING` - Payment initiated, in transit
- `COMPLETED` - Funds delivered successfully
- `FAILED` - Payment failed (retry scheduled)

---

## COMMISSION CALCULATION

### Standard Formula

```
Commission = (Gross Revenue × Commission Rate) from Infrastructure Allocation

Example:
Customer purchases Premium Plan: $9.99/month
Commission Rate: 10%
Commission Earned: $9.99 × 10% = $1.00

Gospel Split Verification:
├─ Charity (60%): $5.99
├─ Infrastructure (30%): $3.00
│  └─ Affiliate Commission: $1.00 (comes from this pool)
└─ Founder (10%): $1.00
```

### Subscription Commissions

**Recurring Revenue Model:**

```javascript
// First 6 months of subscription
for (let month = 1; month <= 6; month++) {
  commission = subscriptionPrice × commissionRate;
  // You earn commission each month
}

// After 6 months
// Customer becomes direct, no further affiliate commission
```

**Example: Premium Plan ($9.99/month)**

| Month | Subscription | Commission | Cumulative |
|-------|--------------|------------|------------|
| 1 | $9.99 | $1.00 | $1.00 |
| 2 | $9.99 | $1.00 | $2.00 |
| 3 | $9.99 | $1.00 | $3.00 |
| 4 | $9.99 | $1.00 | $4.00 |
| 5 | $9.99 | $1.00 | $5.00 |
| 6 | $9.99 | $1.00 | $6.00 |
| 7+ | $9.99 | $0.00 | $6.00 |

**Total Lifetime Commission per Customer: $6.00**

### One-Time Purchase Commissions

**Merchandise, Founding Members, etc.:**

```
Customer purchases FOR THE KIDS T-Shirt: $29.99
Commission: $29.99 × 10% = $3.00
One-time payment (no recurring commission)
```

### Refunds and Chargebacks

**If Customer Requests Refund:**
- Commission is reversed/deducted from your account
- Adjustment shown in next payout report
- Negative balance carried forward if necessary

**Chargeback Policy:**
- Commission reversed immediately
- You are not responsible for chargeback fees
- Notification sent via email

### Commission Attribution Window

**30-Day Cookie Tracking:**

```
Day 1: Customer clicks your link → Cookie set
Day 5: Customer returns (cookie still active) → Browses
Day 20: Customer purchases → Commission attributed to you ✅

Day 35: New customer visits (no cookie) → Not attributed ❌
```

**Last-Click Attribution:**
- If customer clicks multiple affiliate links, last click wins
- Your cookie overrides previous affiliate cookies
- Exception: Customer with active paid account (no re-attribution)

---

## AFFILIATE DASHBOARD

### Accessing Your Dashboard

**URL:** `https://jules-dashboard.pages.dev/affiliates/dashboard/[YOUR-CODE]`

**Or via API:** `GET /api/affiliates/dashboard/[YOUR-CODE]`

### Dashboard Features

#### 1. Overview Metrics

**Real-Time Stats:**
- Total Referrals (all-time)
- Converted Referrals (conversion rate)
- Total Revenue Generated
- Total Commission Earned
- Total Paid Out
- Pending Commission

**This Month Stats:**
- Monthly Revenue
- Monthly Commission
- Monthly Referrals
- Conversion Rate

**Visual Display:**
```
┌─────────────────────────────────────────────────┐
│  ALL-TIME PERFORMANCE                            │
├─────────────────────────────────────────────────┤
│  Total Referrals:          842                   │
│  Conversion Rate:          38.5%                 │
│  Revenue Generated:        $12,458.00            │
│  Commission Earned:        $1,245.80             │
│  Total Paid:               $1,100.00             │
│  Pending Payout:           $145.80               │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  THIS MONTH (December 2025)                      │
├─────────────────────────────────────────────────┤
│  Revenue:                  $1,485.00             │
│  Commission:               $148.50               │
│  Referrals:                42                    │
│  Conversion Rate:          66.7%                 │
│                                                   │
│  Charity Impact:           $891.00 ✅            │
│  (60% of your referrals → kids)                  │
└─────────────────────────────────────────────────┘
```

#### 2. Referral Analytics

**Track Each Referral:**
- Session ID
- Timestamp (when clicked)
- Conversion Status (pending/converted)
- Revenue (if converted)
- Product Purchased
- Commission Earned

**Example Table:**

| Date | Session | Status | Product | Revenue | Commission |
|------|---------|--------|---------|---------|------------|
| 12/15 | abc123 | Converted | Premium Plan | $9.99 | $1.00 |
| 12/14 | def456 | Pending | - | - | - |
| 12/13 | ghi789 | Converted | VIP Plan | $19.99 | $2.00 |

#### 3. Payout History

**View Past Payouts:**
- Payout ID
- Period (date range)
- Amount
- Status
- Payment Date
- Receipt/Invoice Link

**Example:**

```
┌────────────────────────────────────────────────────────────┐
│  PAYOUT HISTORY                                             │
├────────────────────────────────────────────────────────────┤
│  PAY-2025-11-001                                            │
│  Period: Nov 1-30, 2025                                     │
│  Amount: $95.50                                             │
│  Status: COMPLETED ✅                                       │
│  Paid: Dec 1, 2025                                          │
│  [View Receipt]                                             │
├────────────────────────────────────────────────────────────┤
│  PAY-2025-10-001                                            │
│  Period: Oct 1-31, 2025                                     │
│  Amount: $142.00                                            │
│  Status: COMPLETED ✅                                       │
│  Paid: Nov 1, 2025                                          │
│  [View Receipt]                                             │
└────────────────────────────────────────────────────────────┘
```

#### 4. Link Generator

**Create Custom Tracking Links:**

- Select product/page to link to
- Add UTM parameters for campaign tracking
- Generate short link
- Copy to clipboard

**Interface:**

```
┌─────────────────────────────────────────────────┐
│  LINK GENERATOR                                  │
├─────────────────────────────────────────────────┤
│  Destination URL:                                │
│  [ https://youandinotai.com/pricing ▼ ]         │
│                                                   │
│  Campaign Name (optional):                       │
│  [ holiday-promo-2025 ]                          │
│                                                   │
│  UTM Source:                                     │
│  [ instagram ]                                   │
│                                                   │
│  [Generate Link]                                 │
│                                                   │
│  Your Tracking Link:                             │
│  https://youandinotai.com/pricing?ref=JOHNDOE123│
│  &utm_source=instagram&utm_campaign=holiday     │
│                                                   │
│  [Copy Link] [Shorten URL]                       │
└─────────────────────────────────────────────────┘
```

#### 5. Promotional Materials

**Download Center:**
- Banner images (all sizes)
- Social media templates
- Email copy
- Brand guidelines PDF
- Video scripts
- Press kit

#### 6. Gospel Impact Report

**See Your Charitable Contribution:**

```
┌─────────────────────────────────────────────────┐
│  YOUR GOSPEL IMPACT (All-Time)                   │
├─────────────────────────────────────────────────┤
│  Total Revenue Generated:    $12,458.00          │
│                                                   │
│  Gospel V1.3 Split:                              │
│  ├─ Charity (60%):           $7,474.80 ✅        │
│  ├─ Infrastructure (30%):    $3,737.40           │
│  │  └─ Your Commission:      $1,245.80           │
│  └─ Founder (10%):           $1,245.80           │
│                                                   │
│  CHILDREN HELPED (estimated):                    │
│  $7,474.80 ÷ $2,000 = 3.7 children               │
│                                                   │
│  Your referrals have contributed to pediatric    │
│  charity funding equivalent to helping ~4        │
│  children. Thank you for being part of FOR       │
│  THE KIDS mission.                               │
└─────────────────────────────────────────────────┘
```

---

## TERMS AND CONDITIONS

### 1. Agreement to Terms

By participating in the FOR THE KIDS Affiliate Program, you agree to:

- Comply with all program rules and guidelines
- Accurately represent the FOR THE KIDS platform and mission
- Follow brand guidelines in all promotional materials
- Not engage in prohibited activities (see section below)
- Accept payment terms and commission structure
- Allow termination of account for violations

### 2. Affiliate Relationship

**Independent Contractor Status:**
- You are NOT an employee of Trash or Treasure Online Recycler LLC
- You are an independent contractor
- You are responsible for your own taxes
- No benefits, insurance, or employment protections provided
- You may not represent yourself as an employee or official representative

**No Exclusive Agreement:**
- You may promote other products/services
- We may work with other affiliates in your market
- Neither party has exclusivity unless separately contracted

### 3. Commission Payment Terms

**Earned Commission:**
- Commissions earned when customer completes purchase
- Payment subject to refund/chargeback policy
- Minimum $50 payout threshold
- Monthly payment schedule (1st of month)
- Payment method: Square Payout (direct deposit)

**Reversed Commission:**
- Refunded purchases result in commission reversal
- Fraudulent transactions result in commission reversal
- Chargebacks result in commission reversal
- Negative balance may be carried forward

**Payment Delays:**
- We reserve the right to hold payment if fraud suspected
- Payment may be delayed for verification purposes
- Notification provided for any payment holds

### 4. Cookie and Attribution

**Tracking Window:**
- 30-day cookie from initial click
- Last-click attribution model
- Cookies may be blocked by user privacy settings
- No guarantee of attribution if cookies disabled

**Limitations:**
- Self-referrals not permitted (no purchasing via your own link)
- Family/household purchases may be excluded at our discretion
- Existing customers may not be re-attributed to affiliates

### 5. Intellectual Property

**Our Trademarks:**
- "FOR THE KIDS" is a trademark of Trash or Treasure Online Recycler LLC
- "You and I, Not A.I." is a trademark
- Logo and brand assets remain our property
- You receive limited license to use for promotional purposes only

**Your Usage Rights:**
- Use provided promotional materials as-is
- Do not modify logos or brand assets
- Do not create derivative works without permission
- License terminates upon program termination

**Restrictions:**
- No purchase of trademarked keywords for paid ads (without approval)
- No domain names confusingly similar to our brands
- No use of trademarks in social media handles (without approval)

### 6. Prohibited Activities

**Absolutely Prohibited:**

❌ **Fraudulent Activity:**
- Self-referrals or purchases via own link
- Cookie stuffing
- False or misleading advertising
- Fake testimonials or reviews
- Click fraud or bot traffic

❌ **Spam:**
- Unsolicited email (spam)
- Excessive social media posting
- Forum spam
- Comment spam on blogs/articles

❌ **Trademark Violations:**
- Bidding on our branded keywords (without approval)
- Creating confusingly similar domains
- Impersonating FOR THE KIDS official accounts

❌ **Prohibited Content:**
- Adult/NSFW content
- Illegal activity promotion
- Hate speech or discriminatory content
- Violence or graphic content
- Misleading health claims

❌ **Unethical Practices:**
- False scarcity ("only 2 left!")
- Fake urgency ("offer expires in 10 minutes")
- Misrepresenting the 60/30/10 split
- Claiming donations are tax-deductible (they are NOT)
- Using "charity," "donate," or "escrow" language (Gospel violation)

**Penalty for Violations:**
- First offense: Warning + compliance requirements
- Second offense: Account suspension (30 days)
- Third offense: Permanent termination + forfeiture of unpaid commissions

### 7. Accurate Representation

**Required Disclosures:**

✅ **FTC Compliance:**
- Disclose affiliate relationship clearly
- Use #ad, #affiliate, or "I earn commission" language
- Disclosure must be clear and conspicuous
- Applies to ALL promotional content (social, blog, email, video)

**Example Disclosures:**

```
"I'm a FOR THE KIDS affiliate and earn commission on sales
through my link. 60% of revenue goes to pediatric charities."

"Affiliate link - I earn 10% commission, but this doesn't
affect pricing. 60% still goes to children's charities."

"#ad #affiliate - FOR THE KIDS partner"
```

✅ **Gospel Accuracy:**
- Always state "60% to Verified Pediatric Charities"
- Never say "50%" or any other percentage
- Never use forbidden language: "escrow," "donation," "donor"
- Use correct terminology: "revenue allocation," "profit split"

✅ **Product Accuracy:**
- Do not make false claims about products/services
- Do not promise results we don't guarantee
- Do not misrepresent pricing or features
- Link to official product pages for full details

### 8. Content Approval (High-Risk Channels)

**Pre-Approval Required For:**
- Paid advertising campaigns (Google Ads, Facebook Ads, etc.)
- TV/radio commercials
- Podcast sponsorships (30+ second mentions)
- Print advertising (magazines, newspapers)
- Large-scale email campaigns (10,000+ recipients)

**Why?**
- Ensure Gospel compliance
- Verify brand guidelines followed
- Prevent legal/regulatory issues
- Protect charitable mission integrity

**How to Submit:**
- Email: affiliates@youandinotai.com
- Include: Full content/script, placement details, audience size
- Allow 3-5 business days for review

### 9. Modification of Terms

**We Reserve the Right To:**
- Modify commission rates (with 30-day notice)
- Update program terms (with notice)
- Change payment methods or schedules (with notice)
- Discontinue program (with 60-day notice)

**Your Acceptance:**
- Continued participation = acceptance of new terms
- If you disagree, you may terminate participation
- Earned commissions still owed upon termination

### 10. Termination

**You May Terminate:**
- At any time, for any reason
- Email notice to: affiliates@youandinotai.com
- Unpaid commissions paid on next payout cycle (if above minimum)

**We May Terminate:**
- For violations of terms
- For inactivity (no referrals for 12 months)
- For fraud or abuse
- At our discretion with 30-day notice (no cause)

**Upon Termination:**
- Remove all tracking links from your properties
- Cease use of our trademarks and promotional materials
- Unpaid commissions forfeited if terminated for cause
- Unpaid commissions paid if terminated without cause

### 11. Limitation of Liability

**Disclaimer:**
- We are not liable for lost commissions due to technical issues
- We are not liable for tracking errors or cookie failures
- We are not liable for customer refunds or chargebacks
- We are not responsible for your promotional expenses

**Maximum Liability:**
- Limited to unpaid commissions owed at time of dispute
- No consequential damages
- No lost profit claims

### 12. Governing Law

**Jurisdiction:**
- Governed by laws of Florida, USA
- Entity: Trash or Treasure Online Recycler LLC (EIN: 33-4655313)
- Disputes resolved via arbitration (American Arbitration Association)

**Contact for Legal/Terms Questions:**
- Email: legal@youandinotai.com
- Entity Address: (see contact section)

---

## BRAND GUIDELINES

### The Benevolent Technocracy Aesthetic

FOR THE KIDS operates under a **"Benevolent Technocracy"** brand identity - serious, professional tech company that happens to allocate 60% to charity (not a charity that dabbles in tech).

### Core Principles

1. **Dark Void Background** - Always use `#141413` (never light mode)
2. **Tech-First Visual Language** - Looks like Vercel, Datadog, or Linear
3. **Coral/Blue/Teal Accent System** - Official AI Board colors
4. **Monospace Typography for Data** - Server uptime aesthetic
5. **No Clipart or Generic Stock** - Custom isometric illustrations only

### Visual Identity

**Logo:**
- **The Core Node** - Isometric heart composed of geometric nodes
- File: `logo-core-node.svg`
- Never stretch, rotate, or modify
- Minimum size: 120px width

**Color Palette:**

```css
/* Primary Colors */
--dark-void: #141413;        /* Background */
--coral-primary: #CC785C;    /* Claude (The Architect) */
--blue-accent: #078EFA;      /* Jules/Gemini (The Integrator) */
--teal-accent: #20808D;      /* Perplexity (The Researcher) */
--gold-accent: #F4B400;      /* Joshua (The Executive) */
--green-accent: #10B981;     /* Success/Charity */

/* Neutrals */
--text-primary: #F5F5F4;     /* Primary text */
--text-secondary: #A8A8A6;   /* Secondary text */
--border: #2A2A28;           /* Borders/dividers */
```

**Typography:**

```css
/* Headings */
font-family: 'Space Grotesk', sans-serif;
font-weight: 700;

/* Body Text */
font-family: 'Inter', sans-serif;
font-weight: 400-600;

/* Data/Numbers */
font-family: 'JetBrains Mono', monospace;
font-weight: 400;
```

### Messaging Guidelines

**✅ CORRECT Language:**

| Approved Term | Context |
|---------------|---------|
| Revenue allocation | How we distribute money |
| Profit split | 60/30/10 breakdown |
| Beneficiary allocation | Where charity portion goes |
| Verified Pediatric Charities | Who receives the 60% |
| Purchase / Subscribe | Customer action |
| Customer / User | People who buy |
| Platform / Service | What we offer |

**❌ FORBIDDEN Language (Gospel Violation):**

| Forbidden Term | Why It's Wrong |
|----------------|----------------|
| Donation / Donate | Implies tax-deduction (FALSE) |
| Escrow / Escrow Vault | Incorrect legal structure |
| Charity wallet | Wrong terminology (use "beneficiary allocation") |
| Donor | Wrong (customers are not donors) |
| Tax-deductible | FALSE - purchases are NOT tax-deductible |
| Give / Giving | Wrong frame (customers purchase, don't donate) |

**Gospel V1.3 Compliance:**

Always state:
```
"60% of all revenue is allocated to Verified Pediatric Charities"
"Gospel V1.3: 60/30/10 split (Charity/Infrastructure/Founder)"
"This split is immutable and hardcoded into our system"
```

Never state:
```
"50% to charity" ❌ (Old split, Gospel violation)
"Up to 60%" ❌ (Implies variability, wrong)
"A portion" ❌ (Vague, unacceptable)
```

### Content Style

**Tone:**
- Professional but accessible
- Data-driven (use numbers and metrics)
- Mission-focused (FOR THE KIDS always)
- Confident (not apologetic about structure)
- Transparent (share the Gospel split openly)

**Voice:**
- Active voice preferred ("We allocate 60%" not "60% is allocated")
- Present tense ("We help children" not "We will help")
- Direct ("Join our affiliate program" not "You might want to consider")

**Example Good Copy:**

```
FOR THE KIDS allocates 60% of all revenue to Verified Pediatric
Charities. This isn't marketing - it's hardcoded into our system
and verified on every transaction. Our affiliate program lets you
earn 10% commissions while amplifying this charitable impact.
Every sale you refer helps children.
```

**Example Bad Copy:**

```
We donate a portion of profits to kids' charities! Join our program
and help us give back. Your donations are tax-deductible and go to
our escrow vault for quarterly distribution. ❌
```

---

## PROHIBITED ACTIVITIES

### Detailed Prohibition List

#### 1. Fraudulent Referrals

**Prohibited:**
- Creating fake accounts to click your own links
- Purchasing products via your own affiliate link
- Using VPNs to simulate different users
- Bot traffic or automated clicking
- Cookie stuffing (injecting cookies without user action)

**Why:**
- Defrauds the program
- Violates Gospel V1.3 (integrity principle)
- Wastes infrastructure resources (30% allocation)

**Penalty:**
- Immediate termination
- Forfeiture of all unpaid commissions
- Potential legal action for fraud

#### 2. Spam and Unsolicited Promotion

**Prohibited:**
- Sending unsolicited emails (spam)
- Mass DMs on social media
- Comment spam on blogs/YouTube
- Forum spam (posting links without contribution)
- SMS spam

**Why:**
- Damages brand reputation
- Violates CAN-SPAM Act (US law)
- Violates platform ToS (social media, forums)
- Reflects poorly on FOR THE KIDS mission

**Penalty:**
- First offense: Warning + removal of spam content required
- Second offense: 30-day suspension
- Third offense: Termination

#### 3. Misleading Advertising

**Prohibited:**
- False claims about product features
- Fake scarcity ("only 2 spots left!")
- False urgency ("expires in 10 minutes!")
- Misrepresenting the 60/30/10 split
- Claiming tax-deductibility (purchases are NOT tax-deductible)
- Using "before/after" results we don't guarantee
- Fake testimonials or reviews

**Why:**
- Violates FTC guidelines
- Damages customer trust
- Gospel violation (transparency principle)
- Legal liability for false advertising

**Penalty:**
- Remove misleading content immediately
- If not corrected within 48 hours: termination
- Potential legal action for damages

#### 4. Trademark and Brand Violations

**Prohibited:**
- Bidding on "FOR THE KIDS" or "You and I Not AI" keywords in paid ads (without written approval)
- Registering domains like "forthekids[anything].com"
- Creating social media handles like "@ForTheKidsOfficial"
- Modifying our logos or brand assets
- Using our trademarks in a way that implies official endorsement

**Why:**
- Trademark infringement
- Customer confusion (they may think you're official)
- Dilutes brand value
- Legal liability

**Penalty:**
- Cease and desist notice
- If not corrected: legal action + termination
- Domains may be seized via UDRP

#### 5. Prohibited Content Associations

**Never promote FOR THE KIDS on websites/channels featuring:**

❌ Adult/NSFW content
❌ Illegal activities (drugs, piracy, hacking, etc.)
❌ Hate speech or discriminatory content
❌ Violence or graphic content
❌ Deceptive practices (get-rich-quick schemes)
❌ Competing dating platforms (conflict of interest)
❌ Competing AI service marketplaces

**Why:**
- Protects FOR THE KIDS reputation
- Gospel Rule #13: Child Safety (COPPA compliance)
- Brand safety for our charity partners
- Protects the 60% allocation integrity

**Penalty:**
- Immediate termination
- Forfeiture of unpaid commissions
- No appeals process

#### 6. Gospel Language Violations

**Prohibited Terminology:**

You may NOT use these words in promotional content:
- "Donation" or "Donate"
- "Escrow" or "Escrow Vault"
- "Tax-deductible"
- "Donor"
- "Charity wallet"
- "Give" or "Giving" (in charity context)
- Stating "50%" or any percentage other than "60%"

**Why:**
- Gospel V1.3 enforcement (immutable rule)
- Legal implications (not a charity, not tax-deductible)
- Misleads customers about structure
- Violates the sacred covenant

**Penalty:**
- First offense: Warning + mandatory correction
- Second offense: 30-day suspension + re-training
- Third offense: Termination

**Correct Replacement Terms:**
- "Revenue allocation" (not donation)
- "Profit split" (not escrow)
- "60% to Verified Pediatric Charities" (exact wording)
- "Purchase" or "Subscribe" (not donate)

---

## TECHNICAL INTEGRATION

### API Documentation

**Base URL:** `https://dao.youandinotai.com/api/affiliates`

**Authentication:** None required for public endpoints (tracking), affiliate code serves as identifier

### Endpoints

#### 1. Register Affiliate

**POST** `/register`

**Request Body:**
```json
{
  "email": "affiliate@example.com",
  "name": "John Doe",
  "companyName": "Acme Marketing (optional)",
  "paymentEmail": "payments@example.com (optional)",
  "source": "facebook-ad (optional)"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Affiliate application submitted! You will receive approval notification via email.",
  "affiliate": {
    "id": "aff_abc123",
    "code": "JOHNDOE456",
    "email": "affiliate@example.com",
    "status": "PENDING"
  }
}
```

**Response (Error):**
```json
{
  "error": "An affiliate account with this email already exists"
}
```

#### 2. Track Referral

**GET** `/track/:code`

**Parameters:**
- `:code` - Your unique affiliate code
- `?source=` - Optional source identifier (e.g., "instagram", "email")
- `?metadata=` - Optional JSON metadata

**Example:**
```
GET /api/affiliates/track/JOHNDOE456?source=instagram&metadata={"post":"holiday-promo"}
```

**Response:**
```json
{
  "success": true,
  "trackingId": "ref_xyz789",
  "sessionId": "uuid-1234-5678-90ab",
  "affiliateCode": "JOHNDOE456",
  "expiresIn": 2592000000,
  "message": "Referral tracked successfully"
}
```

**Frontend Implementation:**

```javascript
// When user clicks affiliate link
fetch(`https://dao.youandinotai.com/api/affiliates/track/JOHNDOE456?source=facebook`)
  .then(res => res.json())
  .then(data => {
    // Set tracking cookie
    document.cookie = `ftk_ref=${data.sessionId}; max-age=2592000; path=/; secure; samesite=lax`;

    // Redirect to destination
    window.location.href = 'https://youandinotai.com/pricing';
  });
```

#### 3. Convert Referral (Internal Use)

**POST** `/convert`

**Note:** This endpoint is called automatically by payment webhooks. Affiliates don't need to call this directly.

**Request Body:**
```json
{
  "sessionId": "uuid-1234-5678-90ab",
  "customerEmail": "customer@example.com",
  "orderId": "order_abc123",
  "transactionId": "txn_xyz789",
  "subscriptionId": "sub_def456 (optional)",
  "amount": 9.99
}
```

**Response:**
```json
{
  "success": true,
  "message": "Referral converted successfully",
  "commission": {
    "id": "com_123abc",
    "amount": 1.00,
    "charityImpact": 5.99
  }
}
```

#### 4. Get Dashboard Data

**GET** `/dashboard/:code`

**Parameters:**
- `:code` - Your unique affiliate code

**Example:**
```
GET /api/affiliates/dashboard/JOHNDOE456
```

**Response:**
```json
{
  "success": true,
  "affiliate": {
    "code": "JOHNDOE456",
    "name": "John Doe",
    "email": "affiliate@example.com",
    "status": "ACTIVE",
    "commissionRate": 10,
    "totalReferrals": 842,
    "totalRevenue": 12458.00,
    "totalCommission": 1245.80,
    "totalPaid": 1100.00,
    "pendingCommission": 145.80,
    "thisMonth": {
      "revenue": 1485.00,
      "commission": 148.50,
      "referrals": 42
    },
    "recentReferrals": [
      {
        "id": "ref_abc123",
        "createdAt": "2025-12-15T10:30:00Z",
        "isConverted": true,
        "revenue": 9.99,
        "orders": 1
      }
    ],
    "recentPayouts": [
      {
        "id": "pay_xyz789",
        "amount": 95.50,
        "status": "COMPLETED",
        "createdAt": "2025-11-30T23:59:59Z",
        "completedAt": "2025-12-01T12:00:00Z"
      }
    ]
  }
}
```

#### 5. Get Payout Details

**GET** `/payouts/:id`

**Parameters:**
- `:id` - Payout ID (from dashboard)

**Example:**
```
GET /api/affiliates/payouts/pay_xyz789
```

**Response:**
```json
{
  "success": true,
  "payout": {
    "id": "pay_xyz789",
    "affiliate": {
      "name": "John Doe",
      "email": "affiliate@example.com",
      "code": "JOHNDOE456"
    },
    "period": {
      "start": "2025-11-01T00:00:00Z",
      "end": "2025-11-30T23:59:59Z"
    },
    "amount": 95.50,
    "fees": 0,
    "status": "COMPLETED",
    "paymentMethod": "square",
    "paymentEmail": "affiliate@example.com",
    "paymentId": "sqpay_abc123",
    "receiptUrl": "https://squareup.com/receipt/...",
    "commissions": [
      {
        "id": "com_1",
        "amount": 1.00,
        "revenue": 9.99,
        "charityImpact": 5.99,
        "createdAt": "2025-11-15T14:20:00Z"
      }
    ],
    "createdAt": "2025-11-30T23:59:59Z",
    "processedAt": "2025-12-01T00:05:00Z",
    "completedAt": "2025-12-01T12:00:00Z"
  }
}
```

### Webhook Integration (Advanced)

**For custom affiliate dashboards:**

You can receive real-time notifications when commissions are earned.

**Contact:** affiliates@youandinotai.com to request webhook access

**Webhook Payload:**
```json
{
  "event": "commission.created",
  "timestamp": "2025-12-15T10:30:00Z",
  "data": {
    "affiliateCode": "JOHNDOE456",
    "commissionId": "com_abc123",
    "referralId": "ref_xyz789",
    "orderId": "order_def456",
    "revenueAmount": 9.99,
    "commissionAmount": 1.00,
    "charityImpact": 5.99,
    "gospelSplit": {
      "charity": 5.99,
      "infrastructure": 3.00,
      "founder": 1.00
    }
  }
}
```

### Rate Limits

**Public Endpoints:**
- `/track/:code` - 1000 requests/hour per IP
- `/dashboard/:code` - 60 requests/hour per code

**No authentication required** - affiliate code serves as identifier

### CORS Policy

All affiliate API endpoints support CORS for frontend integration:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST
Access-Control-Allow-Headers: Content-Type
```

### Error Handling

**Standard Error Response:**
```json
{
  "error": "Error message here",
  "message": "Detailed explanation (optional)"
}
```

**HTTP Status Codes:**
- `200` - Success
- `400` - Bad Request (validation error)
- `404` - Not Found (invalid code/ID)
- `500` - Server Error

---

## CONTACT INFORMATION

### Affiliate Support

**Email:** affiliates@youandinotai.com
**Response Time:** 24-48 hours (business days)

**For:**
- Application questions
- Commission inquiries
- Payout issues
- Technical support
- Promotional material requests

### General Support

**Email:** support@youandinotai.com
**Response Time:** 24-72 hours

**For:**
- Product questions
- Customer service (for your referrals)
- Account issues

### Legal / Compliance

**Email:** legal@youandinotai.com
**Response Time:** 3-5 business days

**For:**
- Terms and conditions questions
- Trademark usage approval
- Contract negotiations
- Dispute resolution

### Business Entity

**Trash or Treasure Online Recycler LLC**
**EIN:** 33-4655313
**State:** Florida
**Document Number:** L25000158401

**Founder:** Joshua Coleman
**Email:** joshlcoleman@gmail.com

### Social Media

**Official Accounts:**
- Twitter/X: @ForTheKidsAI (coming soon)
- LinkedIn: linkedin.com/company/for-the-kids-ai
- Instagram: @forthekids.ai (coming soon)

**Dashboard:** https://jules-dashboard.pages.dev
**Dating Platform:** https://youandinotai.com
**AI Services:** https://aidoesitall.website

---

## APPENDIX: QUICK START CHECKLIST

### Week 1: Setup

- [ ] Submit affiliate application
- [ ] Wait for approval email (24-48 hours)
- [ ] Access affiliate dashboard
- [ ] Download promotional materials
- [ ] Read brand guidelines thoroughly
- [ ] Create your first tracking link
- [ ] Update payment details (Square)

### Week 2: First Promotions

- [ ] Write introductory blog post or social media thread
- [ ] Add FTC disclosure to all promotional content
- [ ] Share your affiliate link with audience
- [ ] Monitor dashboard for first referrals
- [ ] Test tracking (ask a friend to click your link)
- [ ] Join affiliate community (if available)

### Week 3: Optimize

- [ ] Review analytics (which channels work best)
- [ ] Create UTM-tagged links for different campaigns
- [ ] A/B test different messaging
- [ ] Engage with your audience's questions
- [ ] Request promotional material customization (if needed)

### Week 4: Scale

- [ ] Identify top-performing content
- [ ] Double down on what works
- [ ] Explore new promotional channels
- [ ] Consider paid advertising (get pre-approval)
- [ ] Review first commission payout timing
- [ ] Plan next month's strategy

---

## GOSPEL REMINDER

**FOR THE KIDS - ALWAYS**

Every sale you refer:
- 60% → Verified Pediatric Charities ✅
- 30% → Infrastructure (your commission comes from here)
- 10% → Founder

**This split is immutable. This split is transparent. This split is FOR THE KIDS.**

Thank you for being part of our mission to help children while building a sustainable, ethical tech platform.

---

**Document Version:** 1.0
**Last Updated:** December 19, 2025
**Gospel Compliance:** V1.3 (60/30/10)
**Status:** ACTIVE

**Co-Authored-By:** Claude Opus 4.5 <noreply@anthropic.com>
