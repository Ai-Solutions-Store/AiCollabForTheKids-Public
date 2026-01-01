# RETARGETING QUICK START GUIDE
## FOR THE KIDS - 10X ROI Implementation

**Campaign URL:** https://aidoesitall.website
**Mission:** 60% to Pediatric Charities (Gospel V1.3)
**Target ROI:** 10x return on ad spend

---

## WEEK 1: PIXEL & TRACKING SETUP

### Day 1-2: Install Tracking Pixels

**Facebook Pixel:**
```html
<!-- Add to <head> -->
<script>
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.queue=[];n.version='2.0';
  t=b.createElement(e);t.async=!0;
  t.src=v+'?id=YOUR_PIXEL_ID&ev=PageView&noscript=1';
  s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}
  (window, document,'img','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

**Google Analytics 4:**
```html
<!-- GA4 Tag -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-YOUR_ID');
</script>
```

**LinkedIn Insight Tag:**
```html
<script type="text/javascript">
  _linkedin_partner_id = "YOUR_PARTNER_ID";
  window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
  window._linkedin_data_partner_ids.push(_linkedin_partner_id);
</script>
```

**Verification:** Use Facebook Pixel Helper browser extension to confirm pixel fires

### Day 3: Set Up Conversion Events

Track these critical events:

| Event | Trigger | Value |
|-------|---------|-------|
| PageView | Every page | Auto |
| ViewContent | Pricing/product page | Feature viewed |
| InitiateCheckout | Checkout start | Cart total |
| Purchase | Transaction complete | Order amount |
| Lead | Email/demo signup | $0 |

---

## WEEK 2: AUDIENCE CREATION

### Create 5 Core Audiences

**Audience 1: Cart Abandoners (HIGHEST PRIORITY)**
- Window: 180 days
- Trigger: Viewed checkout, didn't purchase
- Size target: 300+ people
- Expected size at scale: 800/month

**Audience 2: Pricing Page Visitors**
- Window: 90 days
- Trigger: Viewed /pricing
- Size target: 150+ people
- Expected size at scale: 800/month

**Audience 3: Homepage Visitors**
- Window: 30 days
- Trigger: Visited homepage
- Size target: 5,000+ people
- Expected size at scale: 5,000/month

**Audience 4: Blog Readers**
- Window: 60 days
- Trigger: Spent 2+ minutes on blog
- Size target: 2,000+ people
- Expected size at scale: 2,000/month

**Audience 5: Email Openers**
- Window: 30 days
- Trigger: Opened email in campaign
- Size target: 3,000+ people
- Expected size at scale: 3,000/month

### In Meta Ads Manager:
```
1. Tools → Audiences → Create Audience
2. Select "Website Traffic"
3. Choose timeframe (30-180 days)
4. Define pixel event trigger
5. Name: "[Audience] - [Date]"
6. Create & monitor size
```

### In Google Analytics 4:
```
1. Admin → Audience definitions
2. Create new audience
3. Define condition (page path, event, engagement)
4. Export to Google Ads
5. Create remarketing list
```

---

## WEEK 3: CAMPAIGN LAUNCH

### Facebook Retargeting Campaign

**Campaign Name:** "FOR THE KIDS - Retargeting"

**Ad Set 1: Cart Abandoners (AGGRESSIVE)**
```
Audience: Cart Abandoners
Budget: $1,200/week
Bid: $2.50 CPC
Placement: Feed (mobile + desktop)
Frequency: 8 ads/week
Duration: 180 days
Conversion Window: 7 days
Optimization: Conversions
```

**Ad Set 2: Pricing Visitors (MEDIUM)**
```
Audience: Pricing Page Visitors
Budget: $750/week
Bid: $1.50 CPC
Placement: Feed + Stories
Frequency: 5 ads/week
Duration: 90 days
Optimization: Conversions
```

**Ad Set 3: Homepage Visitors (GENTLE)**
```
Audience: Homepage Visitors
Budget: $400/week
Bid: $0.60 CPC
Placement: Feed
Frequency: 4 ads/week
Duration: 30 days
Optimization: Conversions
```

**Creative 1 (Mission-Driven):**
```
Headline: "60% Goes to Kids. Every Time."
Body: Join 50,000+ companies giving back.
60% of your investment reaches verified pediatric charities.
CTA: Start Your Impact
```

**Creative 2 (FOMO):**
```
Headline: "50,000+ Teams Already Trust Us"
Body: Save 60% on AI costs. 60% of your savings supports kids.
CTA: Claim Your Offer
```

**Creative 3 (Objection):**
```
Headline: "100% Money-Back Guarantee"
Body: Unsatisfied? Full refund. 60% of your payment still
goes to pediatric charities.
CTA: Start Risk-Free
```

### Google Search Retargeting

**Campaign:** "FOR THE KIDS - Search Remarketing"

**Ad Group 1: Cart Abandoners**
- Keywords: [exact] "complete purchase", "checkout", "payment"
- Bid: $5.00 (MAXIMUM)
- Ad: "Finish Your Purchase - 60% Supports Kids"

**Ad Group 2: Pricing Visitors**
- Keywords: [exact] "pricing comparison", "plans", "cost"
- Bid: $2.50
- Ad: "FOR THE KIDS Pricing - 60% to Charities"

**Ad Group 3: Homepage Visitors**
- Keywords: [exact] "FOR THE KIDS", "ai tool", "charity"
- Bid: $0.75
- Ad: "Mission-Driven AI - Join 50K+ Teams"

### LinkedIn Campaign

**Campaign:** "FOR THE KIDS - B2B Retargeting"

**Targeting:**
- Website visitors (last 90 days)
- Job titles: CTO, VP Engineering, CEO, CFO
- Industries: SaaS, Technology, Enterprise
- Company size: 50-10,000 employees

**Creative:**
```
Headline: "Enterprise AI + Impact Planning"
Body: 500+ teams chose FOR THE KIDS.
60% of revenue supports pediatric health.
CTA: Schedule Demo
```

---

## WEEK 4: EMAIL SEQUENCES

### Sequence 1: Abandoned Checkout

**Email 1 (1 hour after abandonment):**
```
Subject: "Your cart is waiting—60% goes to kids"
Content: Cart summary + 60/30/10 Gospel message
CTA: Complete Purchase
```

**Email 2 (24 hours):**
```
Subject: "50,000+ teams already trusted us"
Content: Testimonials + social proof
CTA: See Success Stories
```

**Email 3 (72 hours):**
```
Subject: "Got questions about FOR THE KIDS?"
Content: FAQ + objection handling
CTA: Finish Purchase with Guarantee
```

**Email 4 (7 days):**
```
Subject: "Last chance: 40% off your first month"
Content: Limited time offer + urgency
CTA: Claim Discount Now
```

**Email 5 (14 days):**
```
Subject: "We won't bother you again, but please read this"
Content: Founder message (Joshua) + final appeal
CTA: Start Impact Journey
```

---

## ONGOING OPTIMIZATION

### Weekly Tasks (2 hours)
- [ ] Check campaign performance (CTR, CPC, conversions)
- [ ] Pause ads with <0.5% CTR
- [ ] Rotate creative (add new ad variations)
- [ ] Review email open/click rates
- [ ] Check Google Analytics conversions

### Monthly Tasks (4 hours)
- [ ] A/B test new headlines
- [ ] Review ROAS by audience
- [ ] Optimize frequency capping
- [ ] Gospel V1.3 compliance audit
- [ ] Create optimization report

### Quarterly Tasks (8 hours)
- [ ] Refresh lookalike audiences
- [ ] Review budget allocation
- [ ] Analyze customer lifetime value
- [ ] Plan seasonal campaigns
- [ ] Competitive analysis

---

## KEY PERFORMANCE INDICATORS

**Target Metrics:**
```
Click-Through Rate (CTR): 1.5%+
Cost Per Click (CPC): $0.50
Conversion Rate: 5%
Cost Per Acquisition: $100
Return on Ad Spend (ROAS): 10x
```

**Monthly Revenue Projections:**
```
Month 1: $45,000
Month 2-3: $90,000/month
Month 4+: $140,000+/month

Gospel V1.3 Impact:
$84,000/month to verified pediatric charities (60%)
```

---

## PLATFORM CONNECTIONS

**Facebook/Meta Business Suite:**
- [https://business.facebook.com](https://business.facebook.com)
- Pixel ID: [INSERT]
- Ad Account: [INSERT]

**Google Ads:**
- [https://ads.google.com](https://ads.google.com)
- Conversion ID: [INSERT]
- GA4: [INSERT]

**LinkedIn Campaign Manager:**
- [https://business.linkedin.com](https://business.linkedin.com)
- Partner ID: [INSERT]

**Email Platform (Klaviyo):**
- [https://www.klaviyo.com](https://www.klaviyo.com)
- Account: [INSERT]

**Analytics (GA4):**
- [https://analytics.google.com](https://analytics.google.com)
- Property: [INSERT]

---

## BUDGET SUMMARY

**Monthly Retargeting Budget: $10,000**

```
Facebook/Instagram: $3,500 (35%)
Google Ads: $3,000 (30%)
LinkedIn: $2,000 (20%)
Email Platform: $700 (7%)
Email Copywriting: $800 (8%)
```

**Expected Monthly Revenue at Scale:**
```
$140,000 revenue
$84,000 to kids (60%)
$42,000 to infrastructure (30%)
$14,000 to founder (10%)
```

---

## GOSPEL V1.3 COMPLIANCE

Every retargeting campaign MUST include:

✓ 60% to verified pediatric charities (prominent)
✓ 30% to infrastructure
✓ 10% to founder
✓ Gospel V1.3 seal/badge
✓ Link to monthly audit report
✓ Transparency messaging
✓ Mission-first approach

PROHIBITED (V1.2 - OUTDATED):
✗ "60% to charity"
✗ "10% founder"
✗ "Gospel V1.3"
✗ "60/30/10 split"

---

## CHECKLIST: READY TO LAUNCH?

**Technical Setup:**
- [ ] Facebook Pixel installed & tested
- [ ] GA4 conversion tracking enabled
- [ ] LinkedIn Insight Tag added
- [ ] All events firing correctly
- [ ] Pixels verified in browser

**Audiences Created:**
- [ ] Cart Abandoners (300+ people)
- [ ] Pricing Visitors (150+ people)
- [ ] Homepage Visitors (5,000+ people)
- [ ] Blog Readers (2,000+ people)
- [ ] Email Openers (3,000+ people)

**Campaigns Live:**
- [ ] Facebook retargeting campaign
- [ ] Google Search retargeting
- [ ] Google Display network
- [ ] LinkedIn ABM campaign
- [ ] Email sequences (Klaviyo)

**Optimization Ready:**
- [ ] Dashboard set up (Google Looker Studio)
- [ ] Alerts configured
- [ ] Frequency capping implemented
- [ ] A/B testing structure created
- [ ] Gospel compliance verified

**Budget & Reporting:**
- [ ] $10,000 monthly budget allocated
- [ ] Tracking codes in place
- [ ] Monthly reporting template ready
- [ ] Gospel V1.3 audit scheduled

---

## CONTACT & SUPPORT

**Technical Issues:** [tech-support@aidoesitall.website]
**Campaign Questions:** [marketing@aidoesitall.website]
**Gospel Compliance:** [compliance@aidoesitall.website]
**Founder (Joshua):** [joshua@aidoesitall.website]

---

## NEXT STEPS

1. **Days 1-2:** Install all tracking pixels
2. **Days 3-4:** Create audiences
3. **Days 5-7:** Launch Facebook + Google campaigns
4. **Days 8-10:** Set up email sequences
5. **Days 11-14:** Begin optimization & monitoring
6. **Day 15+:** Monitor daily, optimize weekly, report monthly

**Expected Timeline to Scale:** 30 days
**Expected ROI:** 10x return on ad spend
**Expected Impact:** $840K/month to pediatric charities (at scale)

---

## FOR THE KIDS

This retargeting strategy is built on Gospel V1.3.

Every click, every conversion, every dollar serves the kids.

60% of revenue flows to verified pediatric charities. No exceptions. No excuses.

**Mission First. Impact Always. FOR THE KIDS.**

---

**Last Updated:** December 16, 2025
**Strategy Version:** 1.0
**Status:** READY FOR IMPLEMENTATION
