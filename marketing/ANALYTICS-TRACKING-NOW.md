# FOR THE KIDS - Analytics Tracking Plan
## Complete GA4 Implementation & Gospel V1.3 Compliance Tracking

**Last Updated:** 2025-12-17
**Gospel Version:** V1.3 (60/30/10 Split)
**Status:** Ready for Implementation

---

## 1. Google Analytics 4 Setup Guide

### 1.1 Initial Account Setup

**Step 1: Create GA4 Property**
```
1. Go to https://analytics.google.com
2. Admin → Create Property
3. Property Name: "FOR THE KIDS Platform"
4. Timezone: America/New_York (or primary market)
5. Currency: USD
6. Industry: Non-Profit / Technology
7. Enable GA4 property (NOT Universal Analytics)
```

**Step 2: Data Stream Configuration**
```
Primary Data Streams:
- Web: forthekids.org (Main platform)
- Web: forthekids.store (E-commerce)
- App: iOS (when launched)
- App: Android (when launched)
```

**Step 3: Install Measurement Code**

**For React/Next.js Applications:**
```javascript
// lib/analytics.js
import ReactGA from 'react-ga4';

export const initGA = () => {
  ReactGA.initialize('G-XXXXXXXXXX', {
    gaOptions: {
      anonymizeIp: true,
      cookieFlags: 'SameSite=None;Secure'
    },
    gtagOptions: {
      send_page_view: false // Manual page view tracking
    }
  });
};

export const logPageView = (path) => {
  ReactGA.send({
    hitType: "pageview",
    page: path,
    title: document.title
  });
};

export const logEvent = (category, action, label = null, value = null) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
    value: value
  });
};
```

**For Static Pages (HTML):**
```html
<!-- Add to <head> section -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-XXXXXXXXXX', {
    'anonymize_ip': true,
    'cookie_flags': 'SameSite=None;Secure',
    'send_page_view': false
  });
</script>
```

**Step 4: Enhanced Measurement**
```
Enable in GA4 Admin → Data Streams → [Your Stream] → Enhanced Measurement:
✅ Page views
✅ Scrolls (90% depth trigger)
✅ Outbound clicks
✅ Site search
✅ Video engagement
✅ File downloads (PDF whitepapers, charity reports)
```

**Step 5: Google Tag Manager (Recommended)**
```
GTM Container Setup:
1. Create GTM container at tagmanager.google.com
2. Install GTM snippet on all pages
3. Configure GA4 tag in GTM
4. Use GTM for event tracking (easier updates)
5. Test with GTM Preview mode
```

---

## 2. Conversion Events to Track (10 Key Events)

### Event 1: Gospel Agreement Acceptance
**Event Name:** `gospel_accepted`
```javascript
gtag('event', 'gospel_accepted', {
  'gospel_version': 'V1.3',
  'split_ratio': '60/30/10',
  'user_type': 'new' // or 'returning'
});
```
**Why:** Core platform value - tracks mission alignment
**Value:** High (indicates serious engagement)

### Event 2: Charity Selection
**Event Name:** `charity_selected`
```javascript
gtag('event', 'charity_selected', {
  'charity_id': 'charity_12345',
  'charity_name': 'St. Jude Children\'s Research Hospital',
  'charity_category': 'pediatric_research',
  'verification_status': 'verified'
});
```
**Why:** Tracks which charities resonate with users
**Value:** High (conversion indicator)

### Event 3: Purchase/Subscription
**Event Name:** `purchase` (GA4 recommended event)
```javascript
gtag('event', 'purchase', {
  'transaction_id': 'TXN_123456789',
  'value': 100.00,
  'currency': 'USD',
  'tax': 0,
  'shipping': 0,
  'charity_allocation': 60.00, // 60% Gospel V1.3
  'infrastructure_allocation': 30.00,
  'founder_allocation': 10.00,
  'charity_name': 'St. Jude Children\'s Research Hospital',
  'subscription_type': 'monthly', // or 'annual', 'one-time'
  'items': [{
    'item_id': 'PREMIUM_MONTHLY',
    'item_name': 'Premium Monthly Subscription',
    'price': 100.00,
    'quantity': 1
  }]
});
```
**Why:** Revenue tracking + Gospel compliance verification
**Value:** Critical (primary conversion)

### Event 4: Charity Impact View
**Event Name:** `impact_dashboard_viewed`
```javascript
gtag('event', 'impact_dashboard_viewed', {
  'total_donated_lifetime': 5000.00,
  'charities_supported': 3,
  'impact_score': 850,
  'session_duration': 120 // seconds on dashboard
});
```
**Why:** Engagement with transparency/impact
**Value:** Medium (retention indicator)

### Event 5: Referral Link Generated
**Event Name:** `referral_generated`
```javascript
gtag('event', 'referral_generated', {
  'referral_code': 'REF_ABC123',
  'user_id': 'user_456',
  'incentive_type': 'charity_bonus', // 10% extra to charity
  'channel': 'email' // or 'social', 'direct'
});
```
**Why:** Viral growth tracking
**Value:** High (acquisition multiplier)

### Event 6: Video Engagement
**Event Name:** `video_complete`
```javascript
gtag('event', 'video_complete', {
  'video_title': 'How FOR THE KIDS Works',
  'video_duration': 90,
  'video_category': 'onboarding',
  'engagement_time': 85 // seconds watched
});
```
**Why:** Content effectiveness
**Value:** Medium (education/awareness)

### Event 7: Social Share
**Event Name:** `share`
```javascript
gtag('event', 'share', {
  'method': 'twitter', // or 'facebook', 'linkedin', 'email'
  'content_type': 'impact_story',
  'content_id': 'story_123',
  'charity_featured': 'St. Jude'
});
```
**Why:** Organic reach amplification
**Value:** High (free marketing)

### Event 8: Charity Verification Request
**Event Name:** `charity_verification_requested`
```javascript
gtag('event', 'charity_verification_requested', {
  'charity_name': 'Local Children\'s Hospital',
  'submitted_by': 'user_789',
  'charity_ein': '12-3456789'
});
```
**Why:** Community-driven charity expansion
**Value:** Medium (platform growth)

### Event 9: Newsletter Signup
**Event Name:** `generate_lead`
```javascript
gtag('event', 'generate_lead', {
  'lead_type': 'newsletter',
  'source': 'blog_post',
  'charity_interest': 'pediatric_cancer'
});
```
**Why:** Lead generation funnel
**Value:** Medium (nurture opportunity)

### Event 10: Account Upgrade
**Event Name:** `upgrade_subscription`
```javascript
gtag('event', 'upgrade_subscription', {
  'from_tier': 'basic',
  'to_tier': 'premium',
  'value_increase': 50.00,
  'additional_charity_impact': 30.00, // 60% of increase
  'upgrade_reason': 'more_impact' // or 'features', 'referral'
});
```
**Why:** Revenue expansion tracking
**Value:** Critical (LTV growth)

---

## 3. Custom Dimensions for Gospel Tracking

### User-Scoped Custom Dimensions

**Dimension 1: Gospel Version Accepted**
```
Name: gospel_version
Scope: User
Values: V1.3, V1.2, none
Description: Which Gospel version user agreed to
```

**Dimension 2: Preferred Charity Category**
```
Name: charity_category_preference
Scope: User
Values: pediatric_research, hospital_care, mental_health, education, emergency_relief
Description: Primary charity focus area
```

**Dimension 3: Lifetime Charity Impact**
```
Name: lifetime_charity_contribution
Scope: User
Values: 0-100, 100-500, 500-1000, 1000-5000, 5000+
Description: Total dollars contributed to charities (tiered)
```

**Dimension 4: Referral Status**
```
Name: referral_status
Scope: User
Values: referrer, referred, organic
Description: How user joined platform
```

**Dimension 5: Subscription Tier**
```
Name: subscription_tier
Scope: User
Values: free, basic, premium, enterprise
Description: Current subscription level
```

### Event-Scoped Custom Dimensions

**Dimension 6: Charity Split Compliance**
```
Name: split_compliance
Scope: Event
Values: compliant_60_30_10, legacy_50_30_20, custom
Description: Revenue split for this transaction
```

**Dimension 7: Transaction Charity Name**
```
Name: transaction_charity
Scope: Event
Values: [Charity names]
Description: Charity receiving 60% of this transaction
```

**Dimension 8: Campaign Attribution**
```
Name: campaign_type
Scope: Event
Values: kickstarter, organic, influencer, partnership, affiliate
Description: Marketing campaign source
```

**Dimension 9: Gospel Compliance Status**
```
Name: gospel_compliance_flag
Scope: Event
Values: fully_compliant, partial_compliance, non_compliant
Description: Whether event meets Gospel V1.3 standards
```

**Dimension 10: Impact Milestone**
```
Name: impact_milestone
Scope: Event
Values: first_donation, 100_total, 1000_total, 10000_total
Description: User charity impact achievements
```

### Implementation in GA4

```
Admin → Data Display → Custom Definitions → Create Custom Dimension

For each dimension:
1. Click "Create custom dimension"
2. Enter dimension name (lowercase, underscores)
3. Select scope (User or Event)
4. Enter event parameter or user property name
5. Save and wait 24-48 hours for data collection
```

---

## 4. Dashboard Configuration (KPIs)

### Dashboard 1: Gospel Compliance Overview

**KPIs:**
1. **Total Revenue (30 days)**
   - Metric: Sum of purchase value
   - Target: $10,000/month (Kickstarter goal)

2. **Charity Allocation (60%)**
   - Metric: Total Revenue × 0.60
   - Target: $6,000/month
   - Alert if below 59%

3. **Infrastructure Allocation (30%)**
   - Metric: Total Revenue × 0.30
   - Target: $3,000/month

4. **Founder Allocation (10%)**
   - Metric: Total Revenue × 0.10
   - Target: $1,000/month
   - Alert if above 11%

5. **Gospel Compliance Rate**
   - Metric: (Compliant Transactions / Total Transactions) × 100
   - Target: 100%
   - Alert if below 98%

6. **Average Charity Impact Per User**
   - Metric: Total Charity Allocation / Active Users
   - Target: $60/user/month

**Visualization:**
- Pie chart: 60/30/10 split verification
- Line chart: Daily charity allocation trending
- Bar chart: Top 10 charities by allocation
- Gauge: Compliance rate (red <95%, yellow 95-98%, green >98%)

### Dashboard 2: Conversion Funnel

**KPIs:**
1. **Landing Page Views**
   - Metric: Page views on homepage
   - Benchmark: 10,000/month

2. **Gospel Acceptance Rate**
   - Metric: (gospel_accepted / landing page views) × 100
   - Target: 40%

3. **Charity Selection Rate**
   - Metric: (charity_selected / gospel_accepted) × 100
   - Target: 70%

4. **Purchase Conversion Rate**
   - Metric: (purchases / charity_selected) × 100
   - Target: 25%

5. **Overall Conversion Rate**
   - Metric: (purchases / landing page views) × 100
   - Target: 7%

6. **Average Order Value**
   - Metric: Total revenue / number of purchases
   - Target: $100

**Visualization:**
- Funnel chart: Landing → Gospel → Charity → Purchase
- Drop-off analysis at each stage
- Cohort analysis: Weekly signup → purchase conversion
- Heatmap: Conversion rate by traffic source

### Dashboard 3: Charity Impact Transparency

**KPIs:**
1. **Total Charities Supported**
   - Metric: Unique charities receiving funds
   - Target: 50 charities

2. **Top Charity Allocation**
   - Metric: Charity receiving most funds
   - Display: Name + amount

3. **Charity Category Distribution**
   - Metric: % split across pediatric research, hospital care, etc.
   - Target: Balanced distribution

4. **Impact Dashboard Views**
   - Metric: impact_dashboard_viewed events
   - Target: 60% of active users view monthly

5. **Average Impact Score**
   - Metric: Calculated based on donation frequency + amount
   - Target: 500+

6. **Verification Rate**
   - Metric: (Verified charities / Total charities) × 100
   - Target: 100%

**Visualization:**
- Tree map: Charity allocation by category
- Table: Top 20 charities with total allocation
- Map: Geographic distribution of supported charities
- Timeline: Charity impact growth over time

### Dashboard 4: Acquisition & Growth

**KPIs:**
1. **New Users (30 days)**
   - Metric: New users
   - Target: 1,000/month

2. **Traffic Source Breakdown**
   - Metric: Sessions by source/medium
   - Target: <40% any single source (diversified)

3. **Referral Conversion Rate**
   - Metric: (Referred user purchases / Total referrals) × 100
   - Target: 15%

4. **Cost Per Acquisition (CPA)**
   - Metric: Marketing spend / new customers
   - Target: <$30

5. **Viral Coefficient**
   - Metric: Referrals per user
   - Target: >1.2 (viral growth)

6. **Social Share Rate**
   - Metric: (share events / purchases) × 100
   - Target: 50%

**Visualization:**
- Stacked area chart: User acquisition by channel
- Sankey diagram: Traffic source → conversion
- Bar chart: Referral performance by user segment
- Line chart: Daily new users with trend line

### Dashboard 5: Engagement & Retention

**KPIs:**
1. **Active Users (MAU)**
   - Metric: Monthly active users
   - Target: 5,000

2. **Engagement Rate**
   - Metric: (Engaged sessions / Total sessions) × 100
   - Target: 60%

3. **Average Session Duration**
   - Metric: Avg session duration
   - Target: 3 minutes

4. **Bounce Rate**
   - Metric: Single-page sessions / Total sessions
   - Target: <40%

5. **Retention Rate (30-day)**
   - Metric: (Users active in month 2 / Users acquired month 1) × 100
   - Target: 70%

6. **Churn Rate**
   - Metric: (Cancelled subscriptions / Total subscriptions) × 100
   - Target: <5%/month

**Visualization:**
- Cohort retention matrix
- Engagement heatmap by day/hour
- User journey flow (Sankey)
- Churn risk scoring distribution

---

## 5. UTM Parameter Strategy

### UTM Structure Standard

```
https://forthekids.org/?utm_source={source}&utm_medium={medium}&utm_campaign={campaign}&utm_content={content}&utm_term={term}
```

### Parameter Definitions

**utm_source:** Where the traffic originates
```
kickstarter     - Kickstarter campaign page
facebook        - Facebook posts/ads
twitter         - Twitter/X posts
instagram       - Instagram posts/stories
linkedin        - LinkedIn posts/ads
reddit          - Reddit posts/comments
email           - Email campaigns
newsletter      - Newsletter links
affiliate       - Affiliate partners
influencer      - Influencer partnerships
podcast         - Podcast mentions
youtube         - YouTube videos
```

**utm_medium:** Marketing medium
```
social          - Organic social media
paid_social     - Paid social ads
email           - Email marketing
cpc             - Cost-per-click ads
display         - Display advertising
video           - Video content
referral        - Referral links
organic         - Organic search
partnership     - Partner websites
```

**utm_campaign:** Specific campaign name
```
kickstarter_launch_dec2025
gospel_v13_awareness
charity_impact_stories
referral_program_q1
holiday_giving_2025
ambassador_program
```

**utm_content:** Differentiate similar content
```
hero_cta              - Main call-to-action
sidebar_banner        - Sidebar placement
footer_link           - Footer link
video_description     - Video description link
bio_link              - Social media bio link
story_embed           - Embedded story link
```

**utm_term:** Paid search keywords (optional)
```
charity_platform
donate_to_kids
pediatric_charities
```

### Campaign-Specific UTM Templates

**Kickstarter Campaign:**
```
Launch announcement:
?utm_source=kickstarter&utm_medium=campaign&utm_campaign=kickstarter_launch_dec2025&utm_content=project_description

Updates:
?utm_source=kickstarter&utm_medium=campaign&utm_campaign=kickstarter_launch_dec2025&utm_content=update_{number}

Creator bio:
?utm_source=kickstarter&utm_medium=campaign&utm_campaign=kickstarter_launch_dec2025&utm_content=creator_bio
```

**Email Campaigns:**
```
Welcome series:
?utm_source=email&utm_medium=email&utm_campaign=welcome_series&utm_content=email_{day}

Monthly newsletter:
?utm_source=newsletter&utm_medium=email&utm_campaign=monthly_impact_report&utm_content=charity_spotlight

Reactivation:
?utm_source=email&utm_medium=email&utm_campaign=reactivation_q1&utm_content=special_offer
```

**Social Media (Organic):**
```
Facebook:
?utm_source=facebook&utm_medium=social&utm_campaign=gospel_v13_awareness&utm_content=impact_story_1

Twitter/X:
?utm_source=twitter&utm_medium=social&utm_campaign=gospel_v13_awareness&utm_content=60_percent_graphic

LinkedIn:
?utm_source=linkedin&utm_medium=social&utm_campaign=gospel_v13_awareness&utm_content=founder_story
```

**Social Media (Paid):**
```
Facebook Ads:
?utm_source=facebook&utm_medium=paid_social&utm_campaign=conversion_campaign_q1&utm_content=ad_variant_a&utm_term=charity_platform

Instagram Ads:
?utm_source=instagram&utm_medium=paid_social&utm_campaign=conversion_campaign_q1&utm_content=story_ad_1
```

**Influencer Partnerships:**
```
?utm_source=influencer&utm_medium=referral&utm_campaign=influencer_program_q1&utm_content={influencer_name}

Example:
?utm_source=influencer&utm_medium=referral&utm_campaign=influencer_program_q1&utm_content=tech_reviewer_john
```

**Affiliate Program:**
```
?utm_source=affiliate&utm_medium=referral&utm_campaign=affiliate_program&utm_content={affiliate_id}

Example:
?utm_source=affiliate&utm_medium=referral&utm_campaign=affiliate_program&utm_content=partner_12345
```

**Podcast Sponsorships:**
```
?utm_source=podcast&utm_medium=sponsorship&utm_campaign=podcast_outreach_q1&utm_content={podcast_name}

Example:
?utm_source=podcast&utm_medium=sponsorship&utm_campaign=podcast_outreach_q1&utm_content=tech_talk_daily
```

### UTM Builder Tool

**Spreadsheet Template:**
```
URL Builder Columns:
A: Base URL (forthekids.org)
B: utm_source
C: utm_medium
D: utm_campaign
E: utm_content
F: utm_term
G: Final URL (formula: =A1&"?utm_source="&B1&"&utm_medium="&C1&"&utm_campaign="&D1&"&utm_content="&E1&IF(F1<>"","&utm_term="&F1,""))
H: Short URL (bit.ly or custom shortener)
I: Campaign Start Date
J: Campaign End Date
K: Notes
```

**Naming Conventions:**
- Use lowercase only
- Use underscores for spaces
- Be consistent across campaigns
- Max 50 characters per parameter
- Avoid special characters (!@#$%^&*)

### URL Shortening Strategy

**Use short URLs for:**
- Social media posts (character limits)
- Print materials (QR codes)
- Verbal mentions (podcasts, videos)

**Recommended Tools:**
- Bitly: Campaign tracking + custom domains
- TinyURL: Simple, free
- Custom Domain: ftk.link/{campaign} (branded)

**Implementation:**
1. Create full UTM URL
2. Shorten with Bitly (tag with campaign name)
3. Use shortened URL in content
4. Track both in GA4 and Bitly analytics

---

## 6. Attribution Models for Charity Impact

### Multi-Touch Attribution Framework

**Challenge:** Users interact with multiple touchpoints before converting. Which gets credit for the charity impact?

**Solution:** Implement multiple attribution models and compare.

### Model 1: Last Click Attribution (GA4 Default)

**How it works:**
- 100% credit to the last touchpoint before conversion
- Simple, easy to implement
- Already enabled in GA4

**Example:**
```
User journey: Google Search → Blog Post → Email → Purchase
Credit: Email gets 100% credit
```

**Pros:**
- Simple to understand
- Tracks immediate conversion trigger
- Good for bottom-funnel optimization

**Cons:**
- Ignores awareness/consideration touchpoints
- Undervalues content marketing
- Not ideal for long sales cycles

**Use for:**
- Quick performance snapshots
- Campaign ROI for direct-response ads
- Short-term optimization

### Model 2: First Click Attribution

**How it works:**
- 100% credit to the first touchpoint
- Values awareness and discovery

**Example:**
```
User journey: Facebook Ad → Website → Email → Purchase
Credit: Facebook Ad gets 100% credit
```

**Implementation in GA4:**
```
Explorations → Attribution → Change attribution model → First click
```

**Pros:**
- Values top-of-funnel marketing
- Good for brand awareness campaigns
- Shows what drives initial interest

**Cons:**
- Ignores nurturing efforts
- May overvalue low-quality traffic
- Not ideal for conversion optimization

**Use for:**
- Measuring awareness campaign effectiveness
- Understanding discovery channels
- Budget allocation for top-of-funnel

### Model 3: Linear Attribution

**How it works:**
- Equal credit to all touchpoints in the journey
- Fair distribution across the funnel

**Example:**
```
User journey: Google → Blog → Twitter → Email → Purchase
Credit: Each gets 25% credit
```

**Implementation in GA4:**
```
Explorations → Attribution → Change attribution model → Linear
```

**Pros:**
- Values all marketing efforts
- Good for complex journeys
- Fair representation of funnel

**Cons:**
- May dilute important touchpoints
- Harder to optimize
- All channels treated equally (not realistic)

**Use for:**
- Holistic campaign analysis
- Long-term strategy planning
- Multi-channel budget allocation

### Model 4: Time Decay Attribution

**How it works:**
- More credit to touchpoints closer to conversion
- Exponential decay for earlier interactions

**Example:**
```
User journey (7 days): Google (Day 1) → Blog (Day 3) → Email (Day 7) → Purchase
Credit: Google 10%, Blog 20%, Email 70%
```

**Implementation in GA4:**
```
Explorations → Attribution → Change attribution model → Time decay
Half-life: 7 days (customizable)
```

**Pros:**
- Balances awareness and conversion
- Realistic for sales cycles
- Good for subscription models

**Cons:**
- Complex to explain to stakeholders
- May undervalue early touchpoints
- Requires sufficient data

**Use for:**
- Subscription-based revenue (FOR THE KIDS model)
- 30-90 day sales cycles
- Balanced marketing mix optimization

### Model 5: Position-Based (U-Shaped) Attribution

**How it works:**
- 40% credit to first interaction
- 40% credit to last interaction
- 20% distributed among middle touchpoints

**Example:**
```
User journey: Twitter → Blog → Video → Email → Purchase
Credit: Twitter 40%, Email 40%, Blog 10%, Video 10%
```

**Implementation in GA4:**
```
Explorations → Attribution → Change attribution model → Position-based
First/Last: 40% each
Middle: 20% distributed
```

**Pros:**
- Values discovery AND conversion
- Good for complex funnels
- Balances top and bottom funnel

**Cons:**
- Middle touches undervalued
- Arbitrary percentage split
- Complex to optimize

**Use for:**
- FOR THE KIDS platform (awareness + conversion critical)
- Multi-stage funnels
- Combined branding + performance marketing

### Model 6: Data-Driven Attribution (GA4 Premium)

**How it works:**
- Machine learning analyzes conversion paths
- Assigns credit based on actual impact
- Requires 400+ conversions in 30 days

**Example:**
```
GA4 analyzes thousands of conversion paths and determines:
- Blog posts: 35% conversion lift
- Email: 28% conversion lift
- Social: 15% conversion lift
- Paid ads: 22% conversion lift
```

**Implementation in GA4:**
```
Requires GA4 360 (paid version) OR
Admin → Attribution Settings → Enable data-driven attribution (free if thresholds met)
```

**Pros:**
- Most accurate attribution
- Learns from actual data
- Optimizes over time

**Cons:**
- Requires significant traffic (400+ conversions/30 days)
- Black box (hard to explain)
- May not work for new campaigns

**Use for:**
- High-volume campaigns (post-Kickstarter)
- Long-term optimization
- Once platform reaches scale

### Recommended Attribution Strategy for FOR THE KIDS

**Phase 1: Pre-Launch / Kickstarter (Low Volume)**
- **Primary Model:** Last Click Attribution
- **Reason:** Simple tracking, immediate optimization
- **Use:** Daily campaign performance

**Phase 2: Post-Launch (Months 1-6)**
- **Primary Model:** Position-Based (U-Shaped)
- **Reason:** Values both awareness (Kickstarter) and conversion (platform)
- **Use:** Monthly reporting and budget allocation

**Phase 3: Scale (6+ Months)**
- **Primary Model:** Data-Driven Attribution
- **Reason:** Sufficient data for ML, most accurate
- **Use:** Quarterly strategy and annual planning

**Always Compare:**
- Run monthly reports showing all models side-by-side
- Identify discrepancies (which channels are under/over-valued)
- Adjust strategy based on insights

### Charity Impact Attribution (Custom Model)

**Unique Challenge:** Track which marketing efforts drive the most charity impact (not just revenue)

**Custom Metric: Charity Impact Score**
```
Charity Impact Score = (Revenue × 0.60) × Engagement Weight

Engagement Weight:
- One-time purchase: 1.0x
- Monthly subscription: 2.0x (recurring impact)
- Annual subscription: 3.0x (commitment)
- Plus referral: +0.5x per referral
- Plus social share: +0.2x per share
```

**Implementation:**
```javascript
// Custom event on purchase
gtag('event', 'charity_impact_attributed', {
  'transaction_id': 'TXN_123',
  'revenue': 100.00,
  'charity_impact': 60.00,
  'impact_score': 120, // 60 × 2.0 (monthly sub)
  'attribution_source': 'email',
  'attribution_campaign': 'welcome_series'
});
```

**Attribution Report:**
```
GA4 Exploration → Funnel Analysis
Dimension: Campaign source/medium
Metric: Sum of charity_impact (custom metric)

Shows which campaigns drive most charity dollars, not just revenue.
```

**Monthly Attribution Analysis:**
```sql
-- Example BigQuery SQL for deep analysis
SELECT
  traffic_source.source,
  traffic_source.medium,
  SUM(ecommerce.purchase_revenue) as total_revenue,
  SUM(ecommerce.purchase_revenue * 0.60) as charity_impact,
  COUNT(DISTINCT user_pseudo_id) as converters,
  (SUM(ecommerce.purchase_revenue * 0.60) / COUNT(DISTINCT user_pseudo_id)) as impact_per_user
FROM
  `analytics_XXXXXX.events_*`
WHERE
  event_name = 'purchase'
  AND _TABLE_SUFFIX BETWEEN '20250101' AND '20250131'
GROUP BY
  traffic_source.source,
  traffic_source.medium
ORDER BY
  charity_impact DESC;
```

---

## 7. Monthly Reporting Template

### Executive Summary Report

**Report Name:** FOR THE KIDS Monthly Impact Report
**Reporting Period:** [Month Year]
**Report Date:** [Date]
**Prepared By:** Analytics Team

---

### Section 1: Gospel V1.3 Compliance

**Revenue Split Verification**

| Allocation | Target % | Actual % | Dollar Amount | Status |
|------------|----------|----------|---------------|--------|
| Charity (60%) | 60.0% | [XX.X%] | $[X,XXX] | ✅ / ⚠️ / ❌ |
| Infrastructure (30%) | 30.0% | [XX.X%] | $[X,XXX] | ✅ / ⚠️ / ❌ |
| Founder (10%) | 10.0% | [XX.X%] | $[X,XXX] | ✅ / ⚠️ / ❌ |
| **TOTAL** | **100%** | **100%** | **$[X,XXX]** | - |

**Compliance Status:**
- ✅ Green: Within 1% of target (59-61%, 29-31%, 9-11%)
- ⚠️ Yellow: Within 2% of target
- ❌ Red: >2% deviation - requires immediate investigation

**Non-Compliant Transactions:** [Count]
- List any transactions that didn't follow 60/30/10 split
- Reason for deviation
- Corrective action taken

**Gospel Compliance Score:** [XX%]
- Target: 100%
- Formula: (Compliant transactions / Total transactions) × 100

---

### Section 2: Key Performance Indicators

**Revenue Metrics**

| Metric | This Month | Last Month | % Change | YTD |
|--------|------------|------------|----------|-----|
| Total Revenue | $[X,XXX] | $[X,XXX] | [+/-X%] | $[XX,XXX] |
| Charity Impact (60%) | $[X,XXX] | $[X,XXX] | [+/-X%] | $[XX,XXX] |
| New Customers | [XXX] | [XXX] | [+/-X%] | [X,XXX] |
| Average Order Value | $[XX] | $[XX] | [+/-X%] | $[XX] |
| Monthly Recurring Revenue | $[X,XXX] | $[X,XXX] | [+/-X%] | - |
| Customer Lifetime Value | $[XXX] | $[XXX] | [+/-X%] | - |

**Conversion Funnel Performance**

| Stage | Users | Conversion Rate | Change vs Last Month |
|-------|-------|----------------|---------------------|
| Landing Page Views | [XX,XXX] | - | [+/-X%] |
| Gospel Accepted | [X,XXX] | [XX%] | [+/-X%] |
| Charity Selected | [X,XXX] | [XX%] | [+/-X%] |
| Completed Purchase | [XXX] | [XX%] | [+/-X%] |
| **Overall Conversion** | - | **[X.X%]** | **[+/-X%]** |

**Target:** 7% overall conversion rate

---

### Section 3: Charity Impact Analysis

**Charities Supported This Month**

| Charity Name | Allocation | % of Total | Donor Count | Avg per Donor |
|--------------|------------|------------|-------------|---------------|
| St. Jude Children's Research Hospital | $[X,XXX] | [XX%] | [XXX] | $[XX] |
| Children's Hospital of Philadelphia | $[X,XXX] | [XX%] | [XXX] | $[XX] |
| Make-A-Wish Foundation | $[X,XXX] | [XX%] | [XXX] | $[XX] |
| [Other Top Charities] | ... | ... | ... | ... |
| **TOTAL** | **$[X,XXX]** | **100%** | **[X,XXX]** | **$[XX]** |

**Charity Category Distribution**

| Category | Allocation | % of Total |
|----------|------------|------------|
| Pediatric Research | $[X,XXX] | [XX%] |
| Hospital Care | $[X,XXX] | [XX%] |
| Mental Health | $[X,XXX] | [XX%] |
| Education | $[X,XXX] | [XX%] |
| Emergency Relief | $[X,XXX] | [XX%] |

**Impact Highlights:**
- [Number] new charities added to platform
- [Number] charities verified this month
- [Number] user-submitted charity requests

---

### Section 4: Traffic & Acquisition

**Traffic Sources**

| Source/Medium | Sessions | New Users | Revenue | Charity Impact | CPA |
|---------------|----------|-----------|---------|----------------|-----|
| google / organic | [X,XXX] | [XXX] | $[X,XXX] | $[X,XXX] | $[XX] |
| kickstarter / campaign | [X,XXX] | [XXX] | $[X,XXX] | $[X,XXX] | $[XX] |
| email / email | [X,XXX] | [XXX] | $[X,XXX] | $[X,XXX] | $[XX] |
| facebook / paid_social | [X,XXX] | [XXX] | $[X,XXX] | $[X,XXX] | $[XX] |
| influencer / referral | [X,XXX] | [XXX] | $[X,XXX] | $[X,XXX] | $[XX] |
| **TOTAL** | **[XX,XXX]** | **[X,XXX]** | **$[XX,XXX]** | **$[XX,XXX]** | **$[XX]** |

**Top Performing Campaigns**

| Campaign | Clicks | Conversions | Revenue | ROI | Charity Impact |
|----------|--------|-------------|---------|-----|----------------|
| kickstarter_launch_dec2025 | [X,XXX] | [XXX] | $[X,XXX] | [XXX%] | $[X,XXX] |
| gospel_v13_awareness | [X,XXX] | [XXX] | $[X,XXX] | [XXX%] | $[X,XXX] |
| charity_impact_stories | [X,XXX] | [XXX] | $[X,XXX] | [XXX%] | $[X,XXX] |

**UTM Performance Analysis:**
- Best performing utm_source: [source]
- Best performing utm_medium: [medium]
- Best performing utm_campaign: [campaign]
- Worst performing (to pause): [campaign]

---

### Section 5: User Engagement & Retention

**Engagement Metrics**

| Metric | This Month | Last Month | Change |
|--------|------------|------------|--------|
| Monthly Active Users (MAU) | [X,XXX] | [X,XXX] | [+/-X%] |
| Daily Active Users (DAU) | [XXX] | [XXX] | [+/-X%] |
| DAU/MAU Ratio | [XX%] | [XX%] | [+/-X%] |
| Avg Session Duration | [X:XX] | [X:XX] | [+/-X%] |
| Pages per Session | [X.X] | [X.X] | [+/-X%] |
| Bounce Rate | [XX%] | [XX%] | [+/-X%] |

**Target:** DAU/MAU > 30%, Bounce Rate < 40%

**Retention Cohorts**

| Signup Month | Month 1 | Month 2 | Month 3 | Month 4 | Month 5 | Month 6 |
|--------------|---------|---------|---------|---------|---------|---------|
| January 2025 | 100% | [XX%] | [XX%] | [XX%] | [XX%] | [XX%] |
| February 2025 | 100% | [XX%] | [XX%] | [XX%] | [XX%] | - |
| March 2025 | 100% | [XX%] | [XX%] | - | - | - |

**Target:** 70% retention at Month 2

**Churn Analysis**
- Subscription Cancellations: [XX]
- Churn Rate: [X.X%]
- Primary Churn Reasons:
  1. [Reason] - [XX%]
  2. [Reason] - [XX%]
  3. [Reason] - [XX%]

---

### Section 6: Conversion Events Analysis

**Top 10 Event Performance**

| Event Name | Count | Unique Users | Conversion Rate | Trend |
|------------|-------|--------------|----------------|-------|
| gospel_accepted | [X,XXX] | [X,XXX] | [XX%] | ↑/↓/→ |
| charity_selected | [X,XXX] | [X,XXX] | [XX%] | ↑/↓/→ |
| purchase | [XXX] | [XXX] | [X.X%] | ↑/↓/→ |
| impact_dashboard_viewed | [X,XXX] | [X,XXX] | [XX%] | ↑/↓/→ |
| referral_generated | [XXX] | [XXX] | [XX%] | ↑/↓/→ |
| video_complete | [XXX] | [XXX] | [XX%] | ↑/↓/→ |
| share | [XXX] | [XXX] | [XX%] | ↑/↓/→ |
| charity_verification_requested | [XX] | [XX] | [X%] | ↑/↓/→ |
| generate_lead | [X,XXX] | [X,XXX] | [XX%] | ↑/↓/→ |
| upgrade_subscription | [XX] | [XX] | [X%] | ↑/↓/→ |

**Event Insights:**
- Highest growth event: [event_name] (+[XX%])
- Lowest performing event: [event_name] (-[XX%])
- Recommended optimization: [Action item]

---

### Section 7: Attribution Analysis

**Multi-Touch Attribution Comparison**

| Channel | Last Click | First Click | Linear | Time Decay | Position-Based |
|---------|------------|-------------|--------|------------|----------------|
| Organic Search | $[X,XXX] | $[X,XXX] | $[X,XXX] | $[X,XXX] | $[X,XXX] |
| Paid Social | $[X,XXX] | $[X,XXX] | $[X,XXX] | $[X,XXX] | $[X,XXX] |
| Email | $[X,XXX] | $[X,XXX] | $[X,XXX] | $[X,XXX] | $[X,XXX] |
| Referral | $[X,XXX] | $[X,XXX] | $[X,XXX] | $[X,XXX] | $[X,XXX] |
| Kickstarter | $[X,XXX] | $[X,XXX] | $[X,XXX] | $[X,XXX] | $[X,XXX] |

**Recommended Model for This Month:** [Model Name]
**Reason:** [Explanation based on campaign goals]

**Charity Impact Attribution (60% of Revenue)**

| Channel | Revenue | Charity Impact | Cost | Impact ROI |
|---------|---------|----------------|------|------------|
| Organic Search | $[X,XXX] | $[X,XXX] | $0 | ∞ |
| Paid Social | $[X,XXX] | $[X,XXX] | $[XXX] | [X.X]x |
| Email | $[X,XXX] | $[X,XXX] | $[XX] | [XX]x |
| Referral | $[X,XXX] | $[X,XXX] | $0 | ∞ |
| Kickstarter | $[X,XXX] | $[X,XXX] | $[XXX] | [X.X]x |

**Impact ROI Formula:** (Charity Impact - Channel Cost) / Channel Cost

**Insight:** Channels with highest charity impact per dollar spent:
1. [Channel] - $[X.XX] impact per $1 spent
2. [Channel] - $[X.XX] impact per $1 spent
3. [Channel] - $[X.XX] impact per $1 spent

---

### Section 8: Goal Tracking

**Monthly Goals Progress**

| Goal | Target | Actual | % Complete | Status |
|------|--------|--------|------------|--------|
| Monthly Revenue | $10,000 | $[X,XXX] | [XX%] | ✅/⚠️/❌ |
| New Customers | 100 | [XX] | [XX%] | ✅/⚠️/❌ |
| Charity Impact | $6,000 | $[X,XXX] | [XX%] | ✅/⚠️/❌ |
| Gospel Compliance | 100% | [XX%] | [XX%] | ✅/⚠️/❌ |
| Email Subscribers | 500 | [XXX] | [XX%] | ✅/⚠️/❌ |
| Referral Conversions | 50 | [XX] | [XX%] | ✅/⚠️/❌ |

**Kickstarter Campaign Goals (if active)**

| Metric | Goal | Current | Days Remaining |
|--------|------|---------|----------------|
| Funding Amount | $100,000 | $[XX,XXX] | [XX] |
| Backers | 1,000 | [XXX] | [XX] |
| Average Pledge | $100 | $[XX] | - |
| Funding % | 100% | [XX%] | [XX] |

---

### Section 9: Top Insights & Recommendations

**Key Wins This Month:**
1. [Accomplishment] - [Impact]
2. [Accomplishment] - [Impact]
3. [Accomplishment] - [Impact]

**Challenges Identified:**
1. [Challenge] - [Potential impact]
2. [Challenge] - [Potential impact]
3. [Challenge] - [Potential impact]

**Recommended Actions for Next Month:**

**Priority 1 (High Impact, Quick Win):**
- [ ] [Action item]
- [ ] [Action item]

**Priority 2 (High Impact, Longer Term):**
- [ ] [Action item]
- [ ] [Action item]

**Priority 3 (Optimization):**
- [ ] [Action item]
- [ ] [Action item]

**Budget Reallocation Recommendations:**
- Increase spend on: [Channel] (+$[XXX]) - Reason: [High ROAS/Impact]
- Decrease spend on: [Channel] (-$[XXX]) - Reason: [Low performance]
- Test: [New channel/campaign] ($[XXX]) - Reason: [Opportunity]

---

### Section 10: Gospel Compliance Audit

**Manual Transaction Review**
- Total Transactions Reviewed: [XXX]
- Compliant Transactions: [XXX]
- Non-Compliant Transactions: [XX]
- Compliance Rate: [XX.X%]

**Non-Compliance Details:**

| Transaction ID | Date | Amount | Actual Split | Expected Split | Variance | Resolution |
|----------------|------|--------|--------------|----------------|----------|------------|
| TXN_123456 | [Date] | $100 | 55/30/15 | 60/30/10 | -5% charity | [Action taken] |

**Corrective Actions Taken:**
1. [Action] - [Date completed]
2. [Action] - [Date completed]

**Process Improvements:**
- [Improvement implemented to prevent future non-compliance]
- [Improvement implemented to prevent future non-compliance]

**Audit Sign-Off:**
- Auditor: [Name]
- Date: [Date]
- Status: ✅ COMPLIANT / ⚠️ ATTENTION NEEDED / ❌ NON-COMPLIANT

---

### Appendix A: Custom Dimension Performance

| Dimension Name | Top Value | % of Total |
|----------------|-----------|------------|
| gospel_version | V1.3 | [XX%] |
| charity_category_preference | pediatric_research | [XX%] |
| lifetime_charity_contribution | 100-500 | [XX%] |
| referral_status | organic | [XX%] |
| subscription_tier | premium | [XX%] |

---

### Appendix B: Technical Analytics Health

**Data Quality Checks:**
- ✅ GA4 tracking code verified on all pages
- ✅ All 10 conversion events firing correctly
- ✅ Custom dimensions populating
- ✅ E-commerce tracking enabled
- ✅ Cross-domain tracking configured (if applicable)
- ✅ IP anonymization enabled (privacy compliance)

**Data Anomalies Detected:**
- [Any unusual spikes/drops in data]
- [Bot traffic filtered: XX sessions]
- [Data gaps: Dates/times with missing data]

**Action Items:**
- [ ] [Fix tracking issue on X page]
- [ ] [Investigate Y metric discrepancy]

---

### Report Distribution

**Primary Recipients:**
- Joshua Coleman (Founder) - Full report
- Marketing Team - Sections 2, 4, 7
- Finance Team - Sections 1, 2
- Charity Partners - Section 3

**Report Schedule:**
- Monthly: Full report (by 5th of each month)
- Weekly: KPI dashboard (Sections 1-2 only)
- Daily: Gospel compliance check (Section 1 only)

**Access:**
- Full Report: `C:\AiCollabForTheKids\analytics\monthly-reports\[YYYY-MM]-impact-report.pdf`
- Live Dashboard: [GA4 Dashboard URL]
- Stakeholder Dashboard: [Public dashboard for charity partners]

---

## Implementation Checklist

### Week 1: Setup
- [ ] Create GA4 property and data streams
- [ ] Install GA4 tracking code on all pages
- [ ] Configure enhanced measurement
- [ ] Set up Google Tag Manager (optional but recommended)
- [ ] Enable IP anonymization for privacy compliance

### Week 2: Event Configuration
- [ ] Implement all 10 conversion events
- [ ] Test event firing with GA4 DebugView
- [ ] Configure e-commerce tracking for purchases
- [ ] Set up custom event parameters
- [ ] Document event tracking in developer guide

### Week 3: Custom Dimensions & Metrics
- [ ] Create all 10 custom dimensions in GA4
- [ ] Configure user properties for Gospel tracking
- [ ] Test custom dimension population
- [ ] Set up calculated metrics (charity impact, etc.)
- [ ] Verify data accuracy in GA4 reports

### Week 4: Dashboards & Reporting
- [ ] Build 5 custom dashboards in GA4
- [ ] Configure automated reports (weekly, monthly)
- [ ] Set up alerts for compliance issues (<98% Gospel compliance)
- [ ] Create Looker Studio dashboard for stakeholders
- [ ] Train team on dashboard usage

### Week 5: Attribution & UTM
- [ ] Configure attribution models
- [ ] Create UTM parameter spreadsheet
- [ ] Set up URL shortener (Bitly/custom)
- [ ] Tag all active campaigns with UTMs
- [ ] Document UTM naming conventions

### Week 6: Testing & Validation
- [ ] Run test transactions through entire funnel
- [ ] Verify 60/30/10 split tracking accuracy
- [ ] Cross-check GA4 data with Stripe/payment processor
- [ ] Validate attribution models with sample data
- [ ] Fix any discrepancies

### Week 7: Launch & Monitor
- [ ] Enable all tracking in production
- [ ] Monitor GA4 real-time reports for issues
- [ ] Check data flow for 48 hours
- [ ] Generate first weekly KPI report
- [ ] Address any tracking gaps

### Week 8: Optimize & Iterate
- [ ] Review first month of data
- [ ] Identify underperforming events or dimensions
- [ ] Add/modify tracking based on insights
- [ ] Refine dashboards based on team feedback
- [ ] Document lessons learned

---

## Gospel V1.3 Compliance Verification

**Critical Checkpoints:**

1. **Every Purchase Event Must Include:**
   ```javascript
   'charity_allocation': revenue * 0.60,
   'infrastructure_allocation': revenue * 0.30,
   'founder_allocation': revenue * 0.10,
   'gospel_version': 'V1.3'
   ```

2. **Automated Compliance Alert:**
   ```
   GA4 Admin → Alerts → Create Alert
   Name: Gospel Compliance Warning
   Condition: If charity_allocation < (revenue * 0.59) OR > (revenue * 0.61)
   Frequency: Immediately
   Recipients: joshua@forthekids.org, tech@forthekids.org
   ```

3. **Monthly Audit Query (BigQuery):**
   ```sql
   SELECT
     DATE_TRUNC(DATE(TIMESTAMP_MICROS(event_timestamp)), MONTH) as month,
     SUM(ecommerce.purchase_revenue) as total_revenue,
     SUM(event_params.value.double_value WHERE event_params.key = 'charity_allocation') as total_charity,
     SAFE_DIVIDE(
       SUM(event_params.value.double_value WHERE event_params.key = 'charity_allocation'),
       SUM(ecommerce.purchase_revenue)
     ) as charity_percentage,
     CASE
       WHEN SAFE_DIVIDE(SUM(event_params.value.double_value WHERE event_params.key = 'charity_allocation'), SUM(ecommerce.purchase_revenue)) BETWEEN 0.59 AND 0.61 THEN 'COMPLIANT'
       ELSE 'NON_COMPLIANT'
     END as compliance_status
   FROM
     `analytics_XXXXXX.events_*`
   WHERE
     event_name = 'purchase'
     AND _TABLE_SUFFIX BETWEEN FORMAT_DATE('%Y%m%d', DATE_SUB(CURRENT_DATE(), INTERVAL 90 DAY)) AND FORMAT_DATE('%Y%m%d', CURRENT_DATE())
   GROUP BY
     month
   ORDER BY
     month DESC;
   ```

4. **Real-Time Compliance Dashboard Widget:**
   - Gauge chart: Charity allocation % (target: 60%)
   - Red zone: <59% or >61%
   - Yellow zone: 59-59.5% or 60.5-61%
   - Green zone: 59.5-60.5%

---

## Support & Maintenance

**Analytics Owner:** Marketing/Analytics Team
**Technical Owner:** Development Team
**Compliance Auditor:** Finance Team

**Monthly Review Meeting:**
- **When:** First Wednesday of each month
- **Duration:** 60 minutes
- **Attendees:** Founder, Marketing, Finance, Tech
- **Agenda:**
  1. Review monthly report (30 min)
  2. Gospel compliance audit (10 min)
  3. Optimization recommendations (15 min)
  4. Action items for next month (5 min)

**Emergency Contact:**
- Analytics Issues: [Email/Slack channel]
- Compliance Alerts: joshua@forthekids.org
- Technical Errors: tech@forthekids.org

---

## Changelog

**Version 1.0 - 2025-12-17**
- Initial analytics tracking plan created
- GA4 setup guide documented
- 10 conversion events defined
- 10 custom dimensions configured
- 5 dashboards specified
- UTM strategy established
- Attribution models documented
- Monthly reporting template created
- Gospel V1.3 compliance tracking integrated

---

**FOR THE KIDS - 60% to Verified Pediatric Charities**
**Gospel V1.3 Compliant**
**Generated: 2025-12-17**
