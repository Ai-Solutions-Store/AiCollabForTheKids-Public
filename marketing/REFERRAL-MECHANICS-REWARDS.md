# FOR THE KIDS - Referral Mechanics & Rewards Structure
**Platform:** https://aidoesitall.website
**Mission:** 60% to Verified Pediatric Charities | 30% Infrastructure | 10% Founder
**Version:** 2.0 - Gospel V1.3 Compliant
**Created:** 2025-12-17
**Purpose:** Comprehensive guide to referral mechanics, reward tiers, and financial models

---

## EXECUTIVE SUMMARY

This document defines the complete mechanics of the FOR THE KIDS referral system: how referrals are tracked, how rewards are calculated, what tiers unlock what benefits, and how revenue flows while maintaining Gospel V1.3 compliance.

**Core Promise:** Every referral creates a win-win-win:
- Referrer earns commission + recognition
- New customer gets AI tools + 60% of revenue goes to kids
- Children's hospitals receive guaranteed funding

---

## 1. REFERRAL MECHANICS FOUNDATION

### How Referrals Work (Technical Flow)

**Step 1: Link Generation**
```
User Jane signs up for FOR THE KIDS
→ System generates unique referral code: JANE2025XYZ
→ Full referral URL: https://aidoesitall.website?ref=JANE2025XYZ
→ QR code generated (mobile-friendly)
```

**Step 2: Friend Clicks & Signs Up**
```
Friend Mike clicks Jane's referral link
→ System creates cookie with attribution data
→ Cookie duration: 30-90 days (depends on Jane's tier)
→ First-touch attribution model (first click wins)
→ Mike creates account
→ Referral status: "PENDING"
```

**Step 3: Conversion to Paying Customer**
```
Mike completes free trial and subscribes ($99/month)
→ System validates referral attribution (still within cookie window)
→ Referral status: "ACTIVE"
→ Commission calculation triggers
→ Jane earns: 10-20% of Mike's first 3-12 months (tier-dependent)
```

**Step 4: Ongoing Recurring Revenue**
```
Month 1: Mike pays $99
  → Jane earns: $9.90 (10% commission)
  → Pediatric charities: $59.40 (60%)
  → Infrastructure: $24.75 (25% of Mike's $99)
  → Founder: $4.95 (5% of Mike's $99)

Month 2-3: Same split continues
Month 4: Referral commission period ends
  → Jane stops earning commission
  → But charities continue receiving 60%
```

**Step 5: Quarterly Payout**
```
Jane's Q4 2025 earnings:
  - November commission: $89.50
  - December commission: $145.20
  - Total earned: $234.70

Payout schedule: January 15, 2026
Payout method: PayPal (fastest), Stripe, Bank Transfer, or Platform Credit
Minimum threshold: $50 (if less, rolls to next quarter)
```

### Tracking Database Schema

```sql
-- Core referral tracking table
CREATE TABLE Referrals (
  id UUID PRIMARY KEY,
  referrer_id UUID NOT NULL REFERENCES Users(id),
  referred_user_id UUID NOT NULL REFERENCES Users(id),
  referral_code VARCHAR(20) UNIQUE NOT NULL,
  referral_link TEXT NOT NULL,

  -- Attribution & timing
  created_at TIMESTAMP NOT NULL,
  conversion_date TIMESTAMP,
  status VARCHAR(20) NOT NULL, -- pending, active, expired, churned, fraud

  -- Commission tracking
  commission_earned DECIMAL(10,2) DEFAULT 0,
  commission_paid BOOLEAN DEFAULT false,
  payout_date TIMESTAMP,
  payout_method VARCHAR(50), -- PayPal, Stripe, BankTransfer, PlatformCredit
  payout_transaction_id VARCHAR(100),

  -- Cookie window (tier-dependent)
  cookie_window_days INT NOT NULL, -- 30, 60, or 90
  expires_at TIMESTAMP NOT NULL,

  -- Gospel V1.3 tracking
  revenue_generated DECIMAL(10,2) DEFAULT 0,
  charity_allocation DECIMAL(10,2) DEFAULT 0,

  -- Metadata
  referral_source VARCHAR(50), -- Twitter, LinkedIn, Email, Direct, etc
  utm_source VARCHAR(100),
  utm_campaign VARCHAR(100),
  notes TEXT,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Commission payment history
CREATE TABLE ReferralPayouts (
  id UUID PRIMARY KEY,
  referrer_id UUID NOT NULL REFERENCES Users(id),
  referral_id UUID REFERENCES Referrals(id),

  amount DECIMAL(10,2) NOT NULL,
  payout_date TIMESTAMP NOT NULL,
  payout_method VARCHAR(50) NOT NULL,

  -- Payment gateway tracking
  stripe_payout_id VARCHAR(100),
  paypal_transaction_id VARCHAR(100),
  bank_reference VARCHAR(100),
  platform_credit_awarded DECIMAL(10,2),

  -- Status
  status VARCHAR(20) -- pending, processed, failed, refunded

  created_at TIMESTAMP DEFAULT NOW()
);

-- Referral statistics (denormalized for fast querying)
CREATE TABLE ReferralStats (
  referrer_id UUID PRIMARY KEY REFERENCES Users(id),

  total_referrals INT DEFAULT 0,
  active_referrals INT DEFAULT 0,
  churned_referrals INT DEFAULT 0,

  total_revenue_generated DECIMAL(12,2) DEFAULT 0,
  total_commission_earned DECIMAL(10,2) DEFAULT 0,
  total_commission_paid DECIMAL(10,2) DEFAULT 0,
  pending_payout DECIMAL(10,2) DEFAULT 0,

  current_tier VARCHAR(20), -- Bronze, Silver, Gold, Platinum, Legend
  tier_xp_earned INT DEFAULT 0,

  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## 2. REWARD STRUCTURE BY TIER

### Tier Progression Requirements

```
TIER          XP NEEDED    REFERRALS    REVENUE REQ    UNLOCKS
─────────────────────────────────────────────────────────────
Bronze        0            0            $0             Base rewards
Silver        5,000        10           $500           +25% bonus
Gold          15,000       30           $1,500         +60% bonus
Platinum      40,000       75           $3,500         +100% bonus
Legend        100,000      200          $8,000         VIP everything
```

### Tier 1: Bronze (Entry Level)

**Commission Structure:**
- 10% commission on first 3 months of referred customer revenue
- No residual commission after month 3
- Cookie window: 30 days
- Minimum payout: $50

**Example:**
```
Jane refers Mike
Mike subscribes to $99/month plan

Month 1: Jane earns 10% × $99 = $9.90
Month 2: Jane earns 10% × $99 = $9.90
Month 3: Jane earns 10% × $99 = $9.90
Month 4+: Jane earns $0 (commission period ended)

Jane's total from this referral: $29.70
Mike's total cost: $297 (for 3 months)
Charities receive: $59.40 × 3 months = $178.20 (always 60%)
```

**Benefits:**
- Access to referral dashboard
- Share custom referral link
- Basic marketing materials (3 email templates, 2 social posts)
- Monthly email support
- Basic analytics (click count, conversion count)
- Achievement badges

**Monthly Earnings Potential:** $50-300/month (10-30 referrals)

### Tier 2: Silver (Committed)

**Unlock Criteria:**
- 10+ referrals OR $500 in referred revenue
- Automatic upgrade (no application needed)

**Commission Structure:**
- 12% commission on first 6 months of referred customer revenue
- No residual commission
- Cookie window: 60 days
- Minimum payout: $50

**Example:**
```
Tom reaches Silver tier
Tom refers 5 new customers at $99/month average

Total revenue generated: $99 × 5 customers × 6 months = $2,970
Tom's commission: 12% × $2,970 = $356.40 (total)
Or: $59.40/month × 6 months

To charities: $59.40 × $5 customers × 6 months = $1,782 (guaranteed)
```

**Additional Benefits Over Bronze:**
- +25% point bonus (earned from gamification system)
- +$30 per conversion (vs $25 in Bronze)
- Early access to new features (30 days before public launch)
- Dedicated affiliate support email (48-hour response)
- Monthly newsletter with top performer features
- Custom referral link branding
- Access to Silver-tier Discord community
- Tier badge on profile ("Trusted Affiliate")

**New Rewards:**
- 1 free month of subscription credits (auto-applied monthly = $99 value)
- Eligible for seasonal bonuses (2x point multiplier during holidays)

**Monthly Earnings Potential:** $150-1,000/month (15-50 referrals)

### Tier 3: Gold (Expert)

**Unlock Criteria:**
- 30+ referrals OR $1,500 in referred revenue
- Automatic upgrade
- OR: 10+ conversions from Silver tier

**Commission Structure:**
- 15% commission on first 12 months of referred customer revenue
- No residual commission
- Cookie window: 90 days
- Minimum payout: $50

**Example:**
```
Sarah reaches Gold tier
Sarah refers 3 customers at $150/month average (higher-value customers)

Customer 1: $150/month × 12 months = $1,800 revenue
Customer 2: $150/month × 12 months = $1,800 revenue
Customer 3: $150/month × 12 months = $1,800 revenue

Total revenue: $5,400
Sarah's commission (15%): $810 (total over 12 months)
Or: $67.50/month × 12 months

To charities: $3,240 (60% of $5,400)
Sarah's benefit: $810 (15% of $5,400)
Infrastructure/Founder: $1,350 (25% of $5,400)
```

**Additional Benefits Over Silver:**
- +60% point bonus (from gamification)
- +$35 per conversion (vs $30 in Silver)
- Priority email support (24-hour response)
- Dedicated affiliate manager (assigned at this tier)
- Custom landing page template (white-label options)
- A/B testing dashboard for referral messaging
- API access for advanced tracking
- Co-marketing opportunities (joint content, shared promotions)
- Monthly strategy consultation call (30 min)
- Featured in "Top Ambassadors" newsletter section

**New Rewards:**
- 2 free months of subscription credits (auto-applied = $198/month value)
- Quarterly bonus: +500 extra points
- Exclusive merchandise (t-shirt, hat, water bottle)
- Eligible for merchandise store (points-to-merch conversion)
- Access to Beta features (30-day early access)

**Monthly Earnings Potential:** $500-2,500/month (30-100 referrals)

### Tier 4: Platinum (Elite)

**Unlock Criteria:**
- 75+ referrals OR $3,500 in referred revenue
- Performance review (3 months minimum Gold tier)
- Application may be required

**Commission Structure:**
- 20% commission on first 12 months of referred customer revenue
- 5% lifetime residual on recurring subscriptions (after month 12)
- Cookie window: 90 days
- Minimum payout: $50

**Example:**
```
Michael reaches Platinum tier
Michael refers 10 customers at $99/month average

Year 1 commission (20%):
- Revenue generated: $99 × 10 customers × 12 months = $11,880
- Michael's commission: 20% × $11,880 = $2,376 (Year 1)

Year 2+ residual commission (5%):
- Michael's commission: 5% × $11,880 = $594/year (lifetime)
- This continues for as long as customers stay subscribed

Example over 3 years:
- Year 1: $2,376
- Year 2: $594
- Year 3: $594
- Total: $3,564 from one cohort of 10 referrals

Charities always receive: 60% × $99 × 10 × [years subscribed]
= Guaranteed $59.40/month per customer, forever
```

**Additional Benefits Over Gold:**
- +100% point bonus (double points for all actions)
- +$50 per conversion (vs $35 in Gold)
- VIP support (2-hour response, direct Slack channel)
- Brand partnership opportunities
- White-label referral program design
- Custom domain redirect: yourname.aidoesitall.com
- Speaking opportunities at FOR THE KIDS partner events
- Quarterly performance bonuses (up to $5,000)
- Exclusive "Elite Ambassador" title on profile

**New Rewards:**
- 3 free months of subscription credits (auto-applied = $297/month value)
- Quarterly bonus: +1,000 extra points
- Annual bonus: $500 cash or charity contribution match
- Custom branded merchandise
- VIP event invitations (quarterly)
- Annual recognition (name in impact report)

**Monthly Earnings Potential:** $2,000-8,000/month (50-200+ referrals)

### Tier 5: Legend (Legendary)

**Unlock Criteria:**
- 200+ referrals OR $8,000+ in referred revenue
- Application + interview with Founder/CMO
- 6-month minimum Platinum tier performance
- Demonstrated authentic brand advocacy

**Commission Structure:**
- 25% commission on first 12 months
- 10% lifetime residual on all recurring subscriptions
- Cookie window: Lifetime (never expires)
- Minimum payout: $25 (lower threshold)

**Example:**
```
Jessica reaches Legend tier after 250 referrals
Her network generates: $300,000+ annual revenue

Year 1 commission (25%):
- Commission: 25% × $300,000 = $75,000

Year 2+ residual commission (10%):
- Commission: 10% × $300,000 = $30,000/year
- This is passive income for life

Jessica's 5-year projection:
- Year 1: $75,000
- Year 2: $30,000
- Year 3: $30,000
- Year 4: $30,000
- Year 5: $30,000
- Total: $195,000

Charities over same period:
- 60% × $300,000 × 5 years = $900,000 guaranteed
```

**Additional Benefits Over Platinum:**
- +160% point bonus (2.5x multiplier on actions)
- +$75 per conversion (highest tier)
- Concierge support (dedicated account manager)
- Voting rights on charity partnerships
- Speaking platform at FOR THE KIDS annual conference
- Co-founding opportunities on new initiatives
- Access to Founder strategy calls (monthly)
- Custom title on platform

**New Rewards:**
- 5 free months of subscription credits (auto-applied = $495/month value)
- Annual Legend summit (in-person or hybrid event)
- Featured in "Legend Hall of Fame" (permanent)
- Name in annual impact report (publicly credited)
- Founder's Edition branded merchandise
- Lifetime VIP status

**Monthly Earnings Potential:** $5,000-30,000+/month (100-500+ referrals)

---

## 3. COMMISSION CALCULATION FORMULAS

### Basic Commission Formula (Bronze)

```
Monthly Commission = Referred Revenue × Commission Rate × Duration

Example:
- Referred customer: $99/month
- Commission rate: 10% (Bronze tier)
- Duration: 3 months (Bronze limit)
- Monthly commission: $99 × 0.10 = $9.90
- Total commission: $9.90 × 3 months = $29.70
```

### Advanced Commission Formula (Platinum/Legend)

```
Year 1 Commission = Referred Revenue × 20% (Platinum) or 25% (Legend)
Year 2+ Commission = Referred Revenue × 5% (Platinum) or 10% (Legend)

Cohort-Based Example:
Cohort of 5 customers, each paying $99/month, Platinum tier:

Month 1:  $99 × 5 customers × 20% = $99
Month 2:  $99 × 5 customers × 20% = $99
Month 3:  $99 × 5 customers × 20% = $99
...
Month 12: $99 × 5 customers × 20% = $99
Total Year 1: $99 × 12 = $1,188

Month 13-24: $99 × 5 customers × 5% = $24.75/month
Total Year 2: $24.75 × 12 = $297
```

### Multi-Tier Referral Calculation

```
SCENARIO: Alice (Platinum) refers Bob
          Bob (within first 30 days) refers Charlie

Alice's earnings on Bob's subscription:
- Bob pays $99/month
- Alice (Platinum): 20% × $99 = $19.80/month (for 12 months)
- Alice also gets network bonus on Charlie's signups
  (5-10% bonus on Generation 2 referrals)

Example: Charlie later signs up for $99/month
Alice's network bonus: 5% × $99 = $4.95 (one-time bonus when Charlie converts)
Plus: Continued 20% on Bob's subscription

Total from this network:
- Bob's direct commission: $19.80 × 12 = $237.60
- Charlie network bonus: $4.95
- Total: $242.55
```

### Gospel V1.3 Compliance in Commission Math

```
Customer pays $100/month

TRADITIONAL SPLIT (Without Referral Commission):
- Charities: 60% = $60.00
- Infrastructure: 30% = $30.00
- Founder: 10% = $10.00

WITH REFERRAL COMMISSION (Platinum at 20% first month):
- Charities: 60% = $60.00 (NEVER reduced)
- Infrastructure: 18% = $18.00 (down from 30%)
- Founder: 2% = $2.00 (down from 10%)
- Referrer: 20% = $20.00 (comes from Infra + Founder portions)

VERIFICATION:
$60 + $18 + $2 + $20 = $100 ✓
Charities portion: $60 / $100 = 60% ✓
Gospel V1.3 maintained: YES ✓
```

---

## 4. PAYOUT MECHANICS

### Payout Schedule

**Quarterly Payout Calendar:**
```
Q1: January 15 (covers Oct-Dec referrals from previous year)
Q2: April 15 (covers Jan-Mar referrals)
Q3: July 15 (covers Apr-Jun referrals)
Q4: October 15 (covers Jul-Sep referrals)
```

**Pending Period:**
```
Referral conversion → 30-day pending period → Available for payout

Rationale: Time for customer to potentially request refund
If refund issued within 30 days: Commission is clawed back
If customer stays beyond 30 days: Commission is protected
```

### Minimum Threshold Logic

**Bronze/Silver/Gold/Platinum:**
```
Earned Commission: $187.40
Next Quarterly Payout: January 15, 2026

Status: PENDING (below $50? Roll to next quarter)
- If earned < $50: Rolls forward to next payout
- If earned ≥ $50: Eligible for payout

Alternative: Convert to Platform Credit anytime
- No minimum threshold for platform credit conversion
- 1:1 conversion rate ($100 commission = $100 platform credit)
```

**Legend Tier:**
```
Lower threshold: $25 minimum (vs $50 for other tiers)
More frequent payouts available: Monthly option
```

### Payout Methods (By Tier)

**Bronze:**
- Platform Credit (recommended)
- PayPal (with $50+ minimum)

**Silver/Gold:**
- Platform Credit (no minimum)
- PayPal ($50+ minimum)
- Stripe payout ($50+ minimum)

**Platinum:**
- Platform Credit (no minimum)
- PayPal ($50+ minimum)
- Stripe payout ($50+ minimum)
- Bank transfer ($100+ minimum)
- Monthly recurring (can opt in)

**Legend:**
- All above methods
- Monthly automatic payout (to preferred method)
- Crypto payout (to ETH/USDC wallet) - if requested

### Payout Processing Times

```
Method                Processing Time     Frequency
─────────────────────────────────────────────────
Platform Credit       Instant             Anytime
PayPal                1-3 business days   Quarterly
Stripe Payout         3-5 business days   Quarterly
Bank Transfer         5-7 business days   Quarterly
Crypto                1-2 hours           Monthly (Legend)
```

### Tax Reporting

**United States:**
```
Threshold: Earnings of $600+ annually
Form: 1099-NEC issued to all eligible affiliates
Requirements: W-9 form provided before first payment
Deadline: 1099s mailed by January 31
```

**International Affiliates:**
```
No 1099 issued (only for US-based)
Affiliates responsible for own tax reporting
Currency: Payouts in USD; international fees apply
```

---

## 5. FRAUD PREVENTION & CLAWBACK POLICY

### Clawback Triggers

**Automatic Commission Clawback:**

```
1. Customer Refund Within 30 Days
   - Customer requests refund: $99 (Month 1)
   - Referrer commission clawed back: $9.90 (10% × $99)
   - Status: Changes to "refunded"
   - Next payout excludes this amount

2. Customer Churn + Non-Payment
   - Subscription becomes inactive after 60 days non-payment
   - If within commission period: Commission revoked on that month
   - If outside commission period: No impact

3. Fraudulent Referral Detected
   - Fake account detected in referral pair
   - All associated commissions: $0
   - Account suspension may apply
```

**Scenario Examples:**

```
Example 1 - Normal refund:
Day 1: Jane refers Mike, Mike subscribes ($99)
Day 15: Mike requests refund (within 30-day window)
Day 16: Refund processed, Jane's $9.90 commission clawed back
Result: Jane's payout reduced by $9.90

Example 2 - Outside refund window:
Day 1: Jane refers Mike, Mike subscribes ($99)
Day 45: Mike requests refund (outside 30-day window)
Day 46: Refund processed, Jane KEEPS $9.90 commission
Rationale: Jane did her job; customer had adequate trial period

Example 3 - Fraud detection:
Day 1: Affiliate creates fake email account
Day 2: Fake account "referred" through their link
Day 3: Fake account completes payment
Day 4: System detects same credit card used for multiple fake accounts
Result: All fraudulent referral commissions: $0, affiliate flagged for review
```

### Fraud Monitoring Systems

```
System 1: IP & Device Fingerprinting
- Same IP generating multiple signups → Flag for review
- Same device across 5+ accounts → Suspicious
- Dormant IPs suddenly active → Investigation

System 2: Email Pattern Analysis
- Multiple accounts with similar email patterns
- Example: john.test1@, john.test2@, john.test3@ → Flagged
- Disposable email services (temp-mail.com, etc) → Blocked

System 3: Payment Method Matching
- Same credit card across multiple referral pairs
- Same billing address with different names
- Suspicious chargeback patterns

System 4: Behavioral Analysis
- Account created → Immediately referred → Immediate subscription
  (Normal timeline: 3-7 days between signup and subscription)
- Suspicious timing = investigation trigger
- Machine learning model: predicts fraud probability
```

---

## 6. REFERRER PROTECTION & DISPUTE RESOLUTION

### Referral Guarantee

**Commission Guarantee:**
```
"Once a referral is marked ACTIVE (after 30-day pending period),
the commission is guaranteed and protected from future clawback."
```

**Exceptions:**
```
Fraud proven: Direct proof of fabricated referral
Compliance violation: Referrer used prohibited marketing practices
Platform shutdown: In case of force majeure (platform discontinuation)
```

### Dispute Process

**Escalation Path:**

```
Step 1: Affiliate Manager Review (48-hour response)
- Affiliate reports missing commission
- Manager pulls referral logs, payment records
- Manager explains discrepancy or resolves it
- Decision: Confirmed correct OR Commission adjustment issued

Step 2: Marketing Director Escalation (72-hour response)
- If unsatisfied with manager's decision
- Director does independent audit
- Decision is binding (unless fraud involved)

Step 3: Founder Mediation (if dispute > $1,000)
- Founder personally reviews case
- Can request independent audit
- Final decision made
```

**Example Dispute:**

```
Affiliate claims: "I referred 5 customers in November,
but only see 4 in my dashboard"

Manager investigation:
- Pulls database: Confirms 5 referrals, all marked "active"
- One referral: Status is "pending" (within 30-day window)
- Explanation sent to affiliate with proof
- Manager: "Once this pending referral completes 30 days,
  it will show as active and commission will be available at Q1 payout"
- Affiliate satisfied, case closed
```

---

## 7. SPECIAL COMMISSION STRUCTURES

### Charity Partner Tier (Verified Nonprofits Only)

**Unique Commission Model:**
```
30% of referred revenue goes directly to partner charity
(This 30% comes from Infrastructure + Founder portions)

Example:
Customer referred by Charity Partner spends $100/month

Distribution:
- Children's hospitals: $60 (60%) ← ALWAYS untouched
- Partner charity: $30 (30% of remaining 40%)
- Infrastructure: $7 (7%)
- Founder: $3 (3%)

Total: $60 + $30 + $7 + $3 = $100 ✓
```

**Requirements:**
```
- verified charity partnership (verified)
- Mission aligned with children's welfare
- MOU (Memorandum of Understanding) signed
- Quarterly transparency reports
- Active promotion to their constituents
```

**Benefits Over Standard Tiers:**
```
- Lifetime cookie window (never expires)
- Dedicated charity liaison
- Co-branded landing pages
- Quarterly impact reports showing exact $ to charities
- Joint press releases
- Co-branded merchandise
- Tax documentation support
- Annual strategy meetings with Founder
```

### Agency & Reseller Commission

**Multi-Tier Commission for Agencies:**

```
Agency refers 1 customer: 20% commission (Gold tier equivalent)
Agency refers 10+ customers: 25% commission
Agency refers 50+ customers: 30% commission
Agency refers 100+ customers: Custom deal negotiation

Example: Marketing Agency refers 25 clients in Year 1

Average client: $199/month
Total referred revenue: $199 × 25 clients × 12 months = $59,700

Commission calculation:
- First 10 clients: 20% = $47,880
- Clients 11-25: 25% = $44,775
Total commission: $92,655 (for year 1)

Plus 5% lifetime residual on all 25 clients (Year 2+)
```

---

## 8. EARNING SCENARIOS & PROJECTIONS

### Conservative Scenario (Casual Referrer)

```
Profile: Part-time affiliate, Silver tier, moderate effort

Month 1-2: Building audience
- 3 referrals in Month 1 (from email list)
- 2 referrals in Month 2 (from social media)
- Average customer LTV: $99/month × 6 months (Silver period)

Commission: 12% × $99 × 6 months × 5 referrals = $356.40

Quarterly Payout (Q1): $178.20 (rolls from Dec, covers 2 referrals)
Earnings: ~$150/month

Year 1 Projection: ~$1,800-2,000
```

### Moderate Scenario (Active Affiliate)

```
Profile: Dedicated affiliate, Gold tier, consistent effort

Month 1-3: Ramp-up
- 10 referrals Month 1
- 15 referrals Month 2
- 20 referrals Month 3
- Average customer LTV: $99/month × 12 months (Gold period)

Cohort 1 (10 referrals × $99 × 12 months): $11,880 revenue
Gold commission (15%): $1,782

Cohort 2 (15 referrals × $99 × 12 months): $17,820 revenue
Gold commission (15%): $2,673

Cohort 3 (20 referrals × $99 × 12 months): $23,760 revenue
Gold commission (15%): $3,564

Total Q1: $8,019 in commission
Projected annual (scaling): $30,000-40,000

Earnings: ~$2,500-3,300/month
```

### Aggressive Scenario (Professional Affiliate)

```
Profile: Full-time affiliate, Platinum tier, heavy promotion

Channels: YouTube (50k subs) + Newsletter (10k subscribers) + Twitter (15k followers)

Month 1: 50 referrals (YouTube reviews + newsletter mentions)
Month 2: 75 referrals (seasonal momentum)
Month 3: 100+ referrals (organic growth + paid ads)

Average customer: $150/month (higher-value segment - agencies)
Commission rate: 20% (Platinum tier)
Duration: 12 months + 5% lifetime residual

Calculation:
- Year 1: 225 referrals × $150/month × 12 months × 20% = $81,000
- Year 2+: 225 referrals × $150/month × 12 months × 5% = $20,250/year (passive)

Earnings: ~$6,750/month (Year 1), ~$1,680/month (Year 2+, passive)
```

---

## 9. COMPARISON: DIFFERENT TIERS AT SCALE

### Side-by-Side: 50 Referrals Generated

```
SCENARIO: 50 customers at $99/month average each

BRONZE TIER:
- Commission: 10% × $99 × 50 × 3 months = $1,485
- Earning period: 3 months
- Monthly average: $495/month
- Tier unlock path: Need 10+ referrals for Silver upgrade

SILVER TIER:
- Commission: 12% × $99 × 50 × 6 months = $2,970
- Earning period: 6 months
- Monthly average: $495/month (but for longer)
- Free monthly credits: $99 × 6 months = $594 additional value

GOLD TIER:
- Commission: 15% × $99 × 50 × 12 months = $8,910
- Earning period: 12 months
- Monthly average: $742.50/month
- Free monthly credits: $198 × 12 months = $2,376 additional value

PLATINUM TIER:
- Year 1 commission: 20% × $99 × 50 × 12 months = $11,880
- Year 2+ residual: 5% × $99 × 50 × 12 months = $2,970/year
- Monthly average Y1: $990/month
- Monthly average Y2+: $247.50/month (passive)
- Free monthly credits: $297 × 12 months = $3,564 additional value
```

**Key Insight:** Tier progression compounds earning potential significantly. An affiliate who reaches Platinum makes 8x more than Bronze for the same 50 referrals.

---

## 10. GOSPEL V1.3 COMPLIANCE VERIFICATION

### Revenue Allocation Model

**Scenario: 100 customers × $99/month × 12 months = $118,800 annual revenue**

**Without Affiliate Commissions (Baseline):**
```
Charities: 60% = $71,280
Infrastructure: 30% = $35,640
Founder: 10% = $11,880
Total: $118,800 ✓
```

**With Affiliate Commissions (Mixed tiers):**
```
Assuming average 15% affiliate commission (mix of all tiers)
Affiliate payout: 15% = $17,820

Distribution:
- Charities: $71,280 (60% - UNCHANGED)
- Affiliates: $17,820 (15% from Infra portion)
- Infrastructure: $20,700 (17.4% - reduced from 30%)
- Founder: $9,000 (7.6% - reduced from 10%)
Total: $118,800 ✓

Gospel Verification:
$71,280 / $118,800 = 60.00% to charities ✓
Affiliate commission funded from Infra/Founder portions only ✓
Children's allocation NEVER reduced ✓
```

### Immutable Promise

**Gospel V1.3 Guarantee:**
```
"The 60/30/10 split is immutable. If this ratio ever changes
due to affiliate commissions or any other reason, this document
becomes void and all affiliates are encouraged to publicly
call us out. The mission of FOR THE KIDS is sacred and non-negotiable."

Signed: Joshua Coleman, Founder
Co-Authored: Claude Opus 4.5 (AI Custodian)
Date: 2025-12-17
```

---

## NEXT STEPS

1. **Legal Review** - Affiliate agreement finalized
2. **Technical Implementation** - Payout automation system built
3. **Commission Testing** - Staging environment validation
4. **Pilot Launch** - Beta test with 10 founding affiliates
5. **Public Launch** - Recruitment at scale

---

**Document Version:** 2.0 - Gospel V1.3 Compliant
**Last Updated:** 2025-12-17
**Next Review:** 2026-01-15

FOR THE KIDS. ALWAYS.
