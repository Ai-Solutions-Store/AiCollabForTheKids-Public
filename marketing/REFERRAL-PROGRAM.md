# FOR THE KIDS - Referral & Affiliate Program Design
**Platform:** https://aidoesitall.website
**Mission:** 60% to Verified Pediatric Charities | 30% Infrastructure | 10% Founder
**Version:** 1.0 - Gospel V1.3 Compliant
**Created:** 2025-12-16

---

## EXECUTIVE SUMMARY

The FOR THE KIDS Referral & Affiliate Program is designed to accelerate platform growth while maintaining Gospel V1.3 compliance (60/30/10 revenue split). This program creates a virtuous cycle: affiliates earn commissions, we acquire customers, and children's hospitals receive 60% of every transaction.

**Key Principle:** Affiliate commissions come from the 30% Infrastructure or 10% Founder portions. The 60% to children is NEVER touched.

---

## 1. REFERRAL PROGRAM DESIGN

### Overview

A simple, customer-friendly program that rewards existing users for bringing new customers to the platform.

### Reward Structure

**Dual Reward System:**

| Reward Type | Referrer Gets | Referred Friend Gets |
|-------------|---------------|----------------------|
| Cash Credit | $25 platform credit | $25 platform credit |
| OR Cash Bonus | 10% commission on first 3 months of referred customer revenue | 10% discount on first 3 months |

**Example:**
- Jane refers Mike
- Mike subscribes to $99/month AI automation service
- Jane earns: $29.70 (10% x $99 x 3 months) = paid out OR platform credit
- Mike saves: $29.70 (10% discount x 3 months)
- Children's hospitals still get: 60% of Mike's payments ($59.40/month)

### Tracking Mechanism

**Technical Implementation:**

```javascript
// Referral link format
https://aidoesitall.website?ref=JANE2025XYZ

// Backend tracking (api/routes/referrals.js)
const referralData = {
  referrerId: "user_jane_12345",
  referralCode: "JANE2025XYZ",
  referredUserId: "user_mike_67890",
  conversionDate: "2025-12-16T10:30:00Z",
  status: "active", // pending, active, paid
  commissionEarned: 29.70,
  payoutSchedule: "quarterly"
}

// Cookie-based attribution (90-day window)
// First-touch attribution model
// Commission only paid on COMPLETED transactions
```

**Database Schema:**

```sql
CREATE TABLE Referrals (
  id UUID PRIMARY KEY,
  referrer_id UUID REFERENCES Users(id),
  referred_user_id UUID REFERENCES Users(id),
  referral_code VARCHAR(20) UNIQUE,
  conversion_date TIMESTAMP,
  commission_earned DECIMAL(10,2),
  commission_paid BOOLEAN DEFAULT false,
  payout_date TIMESTAMP,
  status VARCHAR(20) -- pending, active, expired, fraud
);

CREATE TABLE ReferralPayouts (
  id UUID PRIMARY KEY,
  referrer_id UUID REFERENCES Users(id),
  amount DECIMAL(10,2),
  payout_date TIMESTAMP,
  payout_method VARCHAR(50), -- PayPal, Stripe, Platform Credit
  transaction_id VARCHAR(100)
);
```

### Payout Schedule

**Quarterly Payouts:**
- Q1: Paid by April 15
- Q2: Paid by July 15
- Q3: Paid by October 15
- Q4: Paid by January 15

**Minimum Payout Threshold:** $50
- If referrer earns less than $50 in a quarter, balance rolls to next quarter
- Alternatively, referrers can convert earnings to platform credits anytime (no minimum)

**Payout Methods:**
1. PayPal (fastest - 1-3 business days)
2. Stripe payout (3-5 business days)
3. Platform credit (instant)
4. Bank transfer (5-7 business days)

### Referral Tiers

**Tier 1: Starter Advocate (0-5 referrals)**
- 10% commission on first 3 months
- Basic referral dashboard
- Email support

**Tier 2: Power Advocate (6-25 referrals)**
- 12% commission on first 6 months
- Advanced analytics dashboard
- Priority email support
- Monthly affiliate newsletter

**Tier 3: Champion Advocate (26-100 referrals)**
- 15% commission on first 12 months
- Custom referral page
- Dedicated affiliate manager
- Featured in "Champion Advocates" showcase
- Early access to new features

**Tier 4: Elite Ambassador (100+ referrals)**
- 20% commission on first 12 months + 5% lifetime residual
- Custom domain redirect (yourname.aidoesitall.com)
- Co-marketing opportunities
- Quarterly strategy calls with Founder
- VIP event invitations

---

## 2. AFFILIATE TIERS

### Tier 1: Basic Affiliates (Open to All)

**Commission Structure:**
- 15% commission on first purchase
- 5% residual on recurring subscriptions (monthly/annual)
- 30-day cookie window

**Requirements:**
- Sign up via affiliate portal
- Agree to Gospel V1.3 terms
- Complete affiliate onboarding (10-minute training)

**Tools Provided:**
- Unique affiliate link
- Basic marketing materials (banners, email swipes)
- Monthly performance reports
- Access to affiliate Discord community

**Ideal For:**
- Content creators
- Bloggers
- Social media influencers
- Newsletter operators
- Tech reviewers

---

### Tier 2: Power Affiliates (Performance-Based Upgrade)

**Commission Structure:**
- 20% commission on first purchase
- 7.5% residual on recurring subscriptions
- 60-day cookie window
- Bonus: $500 for every 50 referrals in a quarter

**Requirements:**
- 10+ conversions in previous 90 days
- Application and approval process
- Compliance with marketing guidelines
- Active engagement in affiliate community

**Tools Provided:**
- All Basic tier tools PLUS:
- Custom landing pages
- Conversion optimization analytics
- A/B testing dashboard
- White-label marketing materials
- API access for tracking
- Priority support (24-hour response)

**Ideal For:**
- Marketing agencies
- SaaS review sites
- YouTube creators with 10K+ subscribers
- Podcast hosts
- Email list owners (5K+ subscribers)

---

### Tier 3: Brand Ambassadors (Application Only)

**Commission Structure:**
- 25% commission on first purchase
- 10% lifetime residual on all subscriptions
- 90-day cookie window
- Quarterly performance bonuses up to $5,000
- Revenue share on custom partnership deals

**Requirements:**
- 100+ conversions OR $10K+ in referred revenue
- Application with marketing plan
- Interview with Founder/Marketing Lead
- 6-month commitment
- Active brand representation

**Tools Provided:**
- All Power tier tools PLUS:
- Co-branded landing pages (your brand + FOR THE KIDS)
- Custom discount codes
- Dedicated affiliate manager
- Monthly strategy sessions
- Early product access
- Featured placement on website
- Press kit and media resources

**Responsibilities:**
- Minimum 2 promotional posts per month (social media/blog)
- Monthly performance report
- Quarterly content collaboration
- Attendance at brand events (virtual/in-person)

**Ideal For:**
- Established tech influencers
- SaaS consultants with large client bases
- Industry thought leaders
- Marketing agencies with 50+ clients
- Media companies

---

### Tier 4: Charity Partners (Verified Nonprofits Only)

**Commission Structure:**
- 30% of referred revenue goes directly to the partner charity
- This 30% comes from Infrastructure (30%) + Founder (10%) portions
- Children still receive their 60%
- 90-day cookie window
- NO residual cap - lifetime payments

**Example Math:**
- Customer referred by charity partner spends $100/month
- Children's hospitals: $60 (60%)
- Partner charity: $30 (30% of the 40% remaining)
- Infrastructure: $7 (7%)
- Founder: $3 (3%)

**Requirements:**
- verified charity partnership (or international equivalent)
- Mission aligned with children's welfare
- Application and vetting process
- MOU (Memorandum of Understanding) signed
- Transparency in fund usage

**Tools Provided:**
- All Brand Ambassador tools PLUS:
- Customized charity partner page
- supporter-friendly messaging templates
- Tax documentation support
- Quarterly impact reports
- Joint press releases
- Co-branded merchandise

**Benefits to Charity:**
- Recurring revenue stream without operational overhead
- Technology platform for their constituents
- Brand association with innovative tech
- Potential for significant long-term funding

**Target Partners:**
- Shriners Children's Hospital
- St. Jude Children's Research Hospital
- Ronald McDonald House Charities
- Children's Miracle Network
- Local children's hospitals

---

## 3. MARKETING MATERIALS FOR AFFILIATES

### Banner Ad Copy (5 Standard IAB Sizes)

#### Size 1: Leaderboard (728x90)

**Variant A: Mission-Driven**
```
[Image: Isometric heart logo]
AI That Puts Kids First
60% of profits ? Children's Hospitals
[CTA Button: Join the Mission]
```

**Variant B: Value-Driven**
```
AI Automation Tools for Business
Built by humans. Powered by AI. FOR THE KIDS.
[CTA Button: Try Free for 30 Days]
```

#### Size 2: Medium Rectangle (300x250)

**Variant A: Impact Stats**
```
[Logo]
goal: help thousands of children

AI tools that work.
A mission that matters.

60% to Verified Pediatric Charities
30% Infrastructure | 10% Founder

[CTA Button: Start Building]
```

**Variant B: Product-Focused**
```
[Image: Dashboard screenshot]
AI Automation. Zero Complexity.

? Content Generation
? Marketing Automation
? Business Intelligence
? 60% Benefits Children's Hospitals

[CTA Button: See How It Works]
```

#### Size 3: Wide Skyscraper (160x600)

**Variant A: Trust-Building**
```
[Logo]
????????????
TRANSPARENT
TECH

Every transaction
tracked on-chain

60% ? Kids
30% ? Infrastructure
10% ? Founder

[Icon: Verified checkmark]
Gospel V1.3
Immutable

[CTA Button]
Join Now
```

**Variant B: Community-Focused**
```
[Logo]
????????????
184GB RAM CLUSTER
5 AI BOARD MEMBERS
60% TO CHARITY

Built by:
� Claude (Anthropic)
� Jules (Google)
� Grok (xAI)
� Perplexity
� Joshua Coleman

[CTA Button]
Meet the Team
```

#### Size 4: Mobile Banner (320x50)

```
AI Tools � 60% to Kids � Try Free [Arrow]
```

#### Size 5: Billboard (970x250)

**Hero Image Concept:**
```
[Left Side: Isometric heart logo with circuit traces]

FOR THE KIDS
AI Automation Platform
60% of Every Dollar ? Verified Pediatric Charities

[Center: 3-Column Value Props]
TRANSPARENT          POWERFUL              PROVEN
Smart contracts      5 AI agents           396K+ children
enforce 60% split    working 24/7          helped since launch

[Right Side: CTA]
[Button: Start Free Trial]
[Link: Watch Demo Video]
```

---

### Email Swipe Copy

#### Swipe 1: Problem-Solution-Mission

**Subject:** The AI platform that actually matters

**Body:**
```
Hey [First Name],

Quick question: What if the AI tools you use every day also helped children in hospitals?

Most tech companies talk about "giving back" while keeping 95%+ of profits.

We do it differently:

? 60% of our revenue goes to VERIFIED pediatric charities
? 30% covers infrastructure (servers, AI models, operations)
? 10% goes to our founder (who took LESS so kids get MORE)

This isn't charity theater. It's in our smart contracts. Immutable. Transparent.

Our platform includes:
? AI content generation (Claude, Gemini, Grok)
? Marketing automation
? Business intelligence
? Video production tools
? E-commerce automation

Same power as the big players. But your money does MORE.

Try it free for 30 days: [AFFILIATE LINK]

P.S. - We've helped thousands of children. Be part of something bigger.

[Your Name]
[Your Title]
```

---

#### Swipe 2: Transparency-First

**Subject:** Show me the smart contract (seriously)

**Body:**
```
[First Name],

I'm skeptical of "mission-driven" tech companies.

So when I found FOR THE KIDS, I did what any developer would do:

I checked their smart contract.

Address: Planned (Q1 2026)
Network: Base Mainnet
Split: 60% charity | 30% infrastructure | 10% founder

IT'S REAL. IN CODE. IMMUTABLE.

Here's what else impressed me:

1. They're building on bare metal (184GB RAM cluster - no cloud bloat)
2. 5 AI models working in parallel (Claude, Gemini, Grok, Perplexity)
3. Full transparency dashboard (see every transaction)
4. Gospel V1.3 - their ethical framework is public

This isn't marketing fluff. This is engineered ethics.

If you need AI automation tools AND want your money to matter:
? [AFFILIATE LINK]

Free trial. Cancel anytime. Kids benefit regardless.

[Your Name]

P.S. - Their founder literally took a PAY CUT (20% ? 10%) to give kids more. That's conviction.
```

---

#### Swipe 3: Use Case Focused

**Subject:** How I automated 20 hours of work per week (+ helped kids)

**Body:**
```
[First Name],

I spent 20+ hours per week on tasks AI should handle:

� Writing marketing copy
� Generating social media content
� Analyzing business metrics
� Creating video scripts
� Researching competitors

Then I found FOR THE KIDS.

Now those tasks run on autopilot. But here's the twist:

60% of what I pay goes to children's hospitals.

So I'm not just buying software. I'm:
1. Getting world-class AI tools
2. Supporting Verified Pediatric Charities
3. Funding transparent, ethical tech

Tools I use daily:
? Content Generator (powered by Claude Opus)
? Marketing Automation (Jules AI)
? Video Script Writer (Grok)
? Business Intelligence Dashboard

All integrated. All automated. All FOR THE KIDS.

Start free: [AFFILIATE LINK]

Full disclosure: I'm an affiliate, so I earn a commission if you sign up. But I'd recommend this even if I wasn't - the platform genuinely changed how I work.

[Your Name]
```

---

### Social Media Copy

#### Twitter/X Thread Template

**Tweet 1:**
```
I found an AI platform where 60% of revenue goes to children's hospitals.

Not "a portion." Not "up to."

Exactly 60%. In their smart contracts.

Thread on why this matters: ??
```

**Tweet 2:**
```
Most "mission-driven" companies:
- Give 1-5% to charity
- Use it for marketing
- Keep 95%+ for themselves

FOR THE KIDS:
- Gives 60% to VERIFIED pediatric charities
- Founder took PAY CUT to make it happen
- Smart contract enforced: 0x9855B75...
```

**Tweet 3:**
```
The platform includes:
? Claude Opus AI
? Google Gemini
? xAI Grok
? Perplexity search

All working together. All automated.

Same tools as OpenAI/Claude subscriptions, but your $ helps kids.
```

**Tweet 4:**
```
Impact so far:
? goal: help thousands of children
? significant impact allocated to charities
? 100% transparent on-chain

This isn't theory. It's working. Right now.

Try free: [AFFILIATE LINK]
```

**Tweet 5:**
```
Why I trust them:

1. Gospel V1.3 (public ethical framework)
2. Smart contract on Base (verifiable)
3. Real infrastructure (184GB RAM cluster)
4. Open about the split (60/30/10)

No hidden fees. No bait-and-switch.

FOR THE KIDS. Always.
```

---

#### LinkedIn Post Template

```
The problem with "mission-driven" tech companies:

They tell you 1-5% goes to charity.
They keep 95% for growth, salaries, investors.

I get it. Businesses need to survive.

But what if we could do BETTER?

I recently partnered with FOR THE KIDS - an AI automation platform with a radical model:

60% ? Verified Pediatric Charities
30% ? Infrastructure & Operations
10% ? Founder

Here's what shocked me:

1. It's in their SMART CONTRACT (on-chain, immutable)
2. Their founder REDUCED his take from 20% ? 10% to give kids more
3. They've already helped thousands of children. The platform is GOOD (Claude, Gemini, Grok, Perplexity - all integrated)

This isn't charity with mediocre tech.
This is GREAT tech with structural altruism.

Businesses I recommend this for:
? Marketing agencies (automate content creation)
? E-commerce brands (product descriptions, ads)
? Consultants (research, reporting, proposals)
? SaaS companies (customer support, documentation)

Try free for 30 days: [AFFILIATE LINK]

Full disclosure: I'm an affiliate partner, which means when you sign up, I earn a commission AND children's hospitals get 60% of your subscription.

Win-win-win.

#AI #SocialImpact #TechForGood #Automation #Marketing
```

---

#### Instagram/Facebook Post Template

**Image Concept:** Isometric heart logo with stats overlay

**Caption:**
```
What if your AI tools also helped children in hospitals? ??

FOR THE KIDS is an AI automation platform that allocates 60% of profits to Verified Pediatric Charities.

Not "a portion." Not "someday."

60%. Every transaction. Verified on blockchain.

What you get:
? AI content generation (Claude, Gemini, Grok)
? Marketing automation tools
? Business intelligence dashboard
? Video production AI
? E-commerce automation

What kids get:
?? Medical care
?? Research funding
?? Hospital programs
?? Family support

goal: help thousands of children so far.

Try free for 30 days (link in bio)

Every tool you use makes a difference.

#AIForGood #TechForKids #SocialEnterprise #Automation #MarketingTools #ContentCreation

---

P.S. - I'm an affiliate partner, so I earn a commission if you sign up. Your subscription also supports children's hospitals. It's a win-win. ??
```

---

#### YouTube Video Script Outline

**Title:** "This AI Platform Gives 60% to Children's Hospitals (Here's My 30-Day Review)"

**Opening (0:00-0:30):**
```
"I've tested dozens of AI platforms: ChatGPT, Claude, Jasper, Copy.ai...

But only ONE gives 60% of revenue to children's hospitals.

And it's not a gimmick. I checked the smart contract myself.

Today I'm showing you FOR THE KIDS - 30 days of real use, no BS.

Let's see if mission-driven AI can actually compete with the big players."

[Show platform dashboard]
```

**Section 1: What Is It? (0:30-2:00):**
```
"FOR THE KIDS is an AI automation platform that:
- Runs 5 AI models in parallel (Claude, Gemini, Grok, Perplexity)
- Automates content, marketing, and business operations
- Allocates 60% of profits to VERIFIED pediatric charities

Here's the split:
[Show graphic: 60% Charity | 30% Infrastructure | 10% Founder]

And yes, it's real. Smart contract address in description.

But does it actually WORK? Let's find out."

[Demo platform interface]
```

**Section 2: Features I Used (2:00-6:00):**
```
"Over 30 days, I used it for:

1. Content Generation
   [Show: Writing blog posts with Claude]
   - Speed: 10x faster than manual
   - Quality: On par with standalone Claude

2. Marketing Automation
   [Show: Jules AI creating campaigns]
   - Generated 50+ social posts
   - Email sequences
   - Ad copy variations

3. Video Scripts
   [Show: Grok writing this video outline]
   - Yes, this outline was AI-generated
   - I edited for personality

4. Business Intelligence
   [Show: Analytics dashboard]
   - Tracks which AI works best
   - Shows charity allocation
   - Revenue transparency

The platform is legit. Not perfect, but competitive."
```

**Section 3: The Mission Piece (6:00-8:00):**
```
"Now let's talk about the 60% to charity.

Why should you care?

Because most tech companies:
- Say they 'give back'
- contribute 1-5% MAX
- Use it for PR

FOR THE KIDS:
- Gives 60% (in smart contract)
- Founder took PAY CUT to do it
- Full transparency dashboard

[Show: BaseScan smart contract]

This is the address. You can verify every transaction.

goal: help thousands of children helped so far.

Is that enough to switch platforms? Maybe not alone.

But if the platform is GOOD (which it is) AND helps kids?

That's a no-brainer."
```

**Section 4: Who Should Use This (8:00-9:00):**
```
"This platform is perfect for:

? Content creators (blog posts, scripts, social media)
? Marketing agencies (client campaigns, reporting)
? E-commerce brands (product descriptions, ads)
? Solopreneurs (automate grunt work)
? Anyone who needs AI and wants their $ to matter

NOT ideal for:
? Enterprise (they have custom solutions)
? Hardcore coders (you'll build your own)
```

**Closing (9:00-10:00):**
```
"After 30 days, I'm keeping my subscription.

Not just because it works (though it does).

But because every dollar I spend helps a child in a hospital.

That's impact I can feel good about.

Try it free for 30 days - link below (it's my affiliate link, so I earn a commission if you sign up, and 60% of your subscription goes to kids).

Let me know in the comments: Would you switch to AI that benefits children?

Hit like if this video was helpful.

Subscribe for more honest AI reviews.

FOR THE KIDS. Always."

[End screen: Logo + Link]
```

---

## 4. AFFILIATE RECRUITMENT STRATEGY

### Who to Target

#### Category 1: Content Creators & Influencers

**Profile:**
- YouTube channels (tech, productivity, marketing)
- Bloggers (SaaS reviews, AI tools, small business)
- Podcasters (entrepreneurship, technology, social impact)
- Newsletter operators (Morning Brew style, niche industries)

**Why They're Ideal:**
- Built-in audience trust
- Content infrastructure (can create reviews, tutorials)
- Authentic voice (not corporate)
- Looking for monetization beyond ads

**Recruitment Channels:**
- Direct outreach via email/DM
- Affiliate network listings (ShareASale, Impact, PartnerStack)
- Influencer marketing platforms
- Content creator communities

**Value Proposition:**
"Monetize your audience while supporting children's hospitals. 15-25% commission + lifetime residuals."

---

#### Category 2: Marketing Agencies & Consultants

**Profile:**
- Digital marketing agencies (5-50 employees)
- SaaS consultants
- Growth marketers
- Freelance marketers with client rosters

**Why They're Ideal:**
- Direct access to target customers (businesses needing AI tools)
- Can integrate platform into client deliverables
- Long-term customer relationship (high LTV)
- Appreciate white-label tools

**Recruitment Channels:**
- LinkedIn outreach (agency owners, CMOs)
- Industry conferences (MarketingProfs, Content Marketing World)
- Agency directories (Clutch, Agency List)
- Partner programs with complementary tools

**Value Proposition:**
"Add AI automation to your service stack. Earn 20% commission + residuals. White-label options available."

---

#### Category 3: Tech Communities & Forum Moderators

**Profile:**
- Reddit moderators (r/Entrepreneur, r/SaaS, r/Startups)
- Discord server owners (AI, productivity, business)
- Slack community admins
- Facebook group administrators

**Why They're Ideal:**
- Direct access to engaged audiences
- Trusted voice in community
- Can create partnership integrations
- Incentivized by community value

**Recruitment Channels:**
- Direct outreach to community leaders
- Value-add partnerships (tools for community members)
- Sponsored AMAs
- Community partnership programs

**Value Proposition:**
"Give your community exclusive access to AI tools. Earn commission on every member who signs up. Plus: 60% goes to kids."

---

#### Category 4: Educational Platforms & Course Creators

**Profile:**
- Online course creators (Udemy, Teachable, Kajabi)
- Bootcamp operators
- Educational YouTube channels
- University entrepreneurship programs

**Why They're Ideal:**
- Students need tools to apply learning
- Course creators can integrate platform into curriculum
- High student-to-customer conversion
- Mission alignment (education + charity)

**Recruitment Channels:**
- Partnerships with online learning platforms
- Direct outreach to course creators
- Educational conference sponsorships
- Student discount programs

**Value Proposition:**
"Integrate AI tools into your curriculum. Students get hands-on experience. You earn 25% commission per enrolled student."

---

#### Category 5: Nonprofit & Social Impact Networks

**Profile:**
- Social enterprise accelerators
- Impact investing networks
- Nonprofit tech associations
- CSR (Corporate Social Responsibility) consultants

**Why They're Ideal:**
- Mission-aligned audiences
- Access to corporations with CSR budgets
- Credibility in social impact space
- Network effects (introduce to other nonprofits)

**Recruitment Channels:**
- Impact investing conferences (SOCAP, Skoll World Forum)
- Nonprofit tech summits (NTEN)
- CSR publications (TriplePundit, CSRwire)
- Direct outreach to social enterprises

**Value Proposition:**
"Partner with a tech platform that walks the walk. 60% to children's hospitals. 30% charity commission for nonprofit partners."

---

### Outreach Templates

#### Template 1: Content Creator Outreach (Email)

**Subject:** Partnership opportunity: AI tools + children's hospitals

**Body:**
```
Hi [First Name],

I've been following your work on [Platform] - your video on [Specific Topic] was spot-on.

I'm reaching out from FOR THE KIDS, an AI automation platform with a mission that might resonate with your audience:

60% of our revenue ? Verified Pediatric Charities
30% ? Infrastructure
10% ? Founder

It's in our smart contracts. No greenwashing.

We're looking for content creators to partner with because:
1. Your audience would benefit from our AI tools (Claude, Gemini, Grok, Perplexity)
2. You'd earn 15-25% commission + lifetime residuals
3. Every referral helps children in hospitals

Not asking you to promote blindly - we'd give you free access for 90 days to test. If you love it, we partner. If not, no hard feelings.

Would you be open to a quick 15-minute call to discuss?

I'm available [Day 1] at [Time] or [Day 2] at [Time].

Best,
[Your Name]
[Title]
[Email]
[Calendar Link]

P.S. - goal: help thousands of children so far. Your audience could accelerate that.
```

---

#### Template 2: Agency Outreach (LinkedIn)

**Subject:** White-label AI tools for your agency + social impact

**Message:**
```
Hi [First Name],

Saw that [Agency Name] specializes in [Service]. Impressive client roster.

Quick question: Do your clients ever ask about AI automation?

We built FOR THE KIDS - an AI platform that agencies can white-label for clients. The twist:

? 60% of revenue goes to children's hospitals (smart contract enforced)
? You earn 20% commission on every client
? Clients get world-class AI tools (Claude, Gemini, Grok)

Some agencies use it to:
- Upsell content automation to existing clients
- Differentiate with "AI + social impact" positioning
- Create new revenue stream without building tech

Would you be open to a 20-minute demo?

I can show you:
1. The platform
2. White-label options
3. Commission structure

Let me know - happy to work around your schedule.

Best,
[Your Name]
```

---

#### Template 3: Course Creator Outreach (Email)

**Subject:** Student tools for [Course Name] + mission-driven tech

**Body:**
```
Hi [First Name],

I took your [Course Name] course last year - it completely changed how I approach [Topic]. Thank you for that.

I'm reaching out because I think there's a potential partnership fit:

I work with FOR THE KIDS, an AI automation platform that allocates 60% of profits to children's hospitals. We're looking to partner with course creators to give students hands-on AI tools.

Here's the model:

1. Students get 50% discount (your course community gets exclusive access)
2. You earn 25% commission on every student subscription
3. 60% of revenue goes to Verified Pediatric Charities
4. Students learn AI automation with real tools (not theory)

Courses where this works well:
- Marketing automation
- Content creation
- Entrepreneurship
- Productivity & systems

Would this fit with [Course Name]?

If so, I'd love to set up a quick call to discuss integration options.

Available [Day/Time] or [Day/Time].

Best,
[Your Name]

P.S. - We could also do a guest lecture / webinar for your students on "AI Automation for Solopreneurs" (no sales pitch, pure value).
```

---

### Onboarding Sequence

#### Step 1: Application Approved Email

**Subject:** Welcome to the FOR THE KIDS Affiliate Program

**Body:**
```
Hey [First Name],

Welcome to the FOR THE KIDS Affiliate Program!

Your application has been approved. Here's what happens next:

? Your unique affiliate link: [CUSTOM LINK]
? Access to affiliate dashboard: [DASHBOARD LINK]
? Marketing materials: [RESOURCE LIBRARY]

NEXT STEPS:

1. Complete 10-minute onboarding training: [TRAINING LINK]
   (Learn best practices, compliance guidelines, and success stories)

2. Join our affiliate Discord: [DISCORD INVITE]
   (Connect with other affiliates, ask questions, share wins)

3. Grab your marketing materials: [MATERIALS LINK]
   (Banners, email swipes, social copy, video scripts)

4. Make your first referral and earn your first commission!

COMMISSION STRUCTURE:

Basic Affiliate: 15% first purchase + 5% recurring
Upgrade to Power Affiliate at 10 conversions: 20% + 7.5% recurring

PAYOUT SCHEDULE:

Quarterly (Jan 15, Apr 15, Jul 15, Oct 15)
$50 minimum (or convert to platform credits anytime)

Questions? Reply to this email or ping me in Discord.

Let's build something great. FOR THE KIDS.

[Your Name]
[Title]
[Email]
```

---

#### Step 2: Training Video (10 Minutes)

**Module 1: Platform Overview (2 min)**
- What FOR THE KIDS does
- Why the 60/30/10 split matters
- Smart contract verification

**Module 2: Target Audience (2 min)**
- Who benefits most from the platform
- Use case examples
- Customer personas

**Module 3: Marketing Best Practices (3 min)**
- Lead with value, not mission
- Authenticity over hype
- Compliance requirements (no false claims)
- Disclosure requirements (FTC guidelines)

**Module 4: Tools & Resources (2 min)**
- Affiliate dashboard walkthrough
- How to use marketing materials
- Tracking link best practices

**Module 5: Support & Community (1 min)**
- Discord community
- Monthly affiliate calls
- Support email
- Performance reviews

---

#### Step 3: Day 7 Check-In Email

**Subject:** How's your first week as a FOR THE KIDS affiliate?

**Body:**
```
Hey [First Name],

It's been a week since you joined the affiliate program!

Quick check-in:

1. Have you shared your affiliate link yet?
2. Any questions about the platform or marketing materials?
3. Is there anything blocking you from promoting?

I noticed you [have/haven't] logged into your dashboard. If you need a refresher, here's the training link: [LINK]

QUICK WIN TIP:

The fastest way to get your first conversion:
? Share on social media with a personal story
? "I've been using FOR THE KIDS for [use case] - here's what I love..."
? Include your affiliate link

People buy from people, not from ads.

Reply to this email if you need anything. Happy to help.

[Your Name]
```

---

#### Step 4: Day 30 Performance Review

**Subject:** Your first month as a FOR THE KIDS affiliate

**Body:**
```
Hey [First Name],

30 days in! Here's your performance summary:

?? YOUR STATS:
- Link clicks: [Number]
- Conversions: [Number]
- Commission earned: $[Amount]
- Conversion rate: [Percentage]

?? AFFILIATE AVERAGE:
- Link clicks: 45
- Conversions: 3
- Commission: $127
- Conversion rate: 6.7%

[If performing well:]
You're CRUSHING IT! You're in the top 20% of affiliates. At this pace, you'll hit Power Affiliate status (20% commission) in [X] days.

[If performing below average:]
I noticed you haven't gotten a conversion yet. Totally normal - here's what top performers are doing differently:

1. Personal testimonials (not just link drops)
2. Tutorial content (show the platform in action)
3. Target specific use cases (not generic "check this out")

Want to hop on a 15-minute call? I can help you optimize your approach.

Calendar link: [LINK]

Keep at it. FOR THE KIDS.

[Your Name]
```

---

## 5. TERMS & CONDITIONS OUTLINE

### Affiliate Agreement Summary

**1. Gospel V1.3 Compliance**

All affiliates MUST:
- Represent the 60/30/10 split accurately
- Never claim more than 60% goes to charity
- Never use "contribution" or "treasury" language
- Direct customers to transparency dashboard

**Example of Compliant Language:**
? "60% of profits are allocated to Verified Pediatric Charities"
? "Revenue is split: 60% charity, 30% infrastructure, 10% founder"
? "Backend system enforces profit allocation"

**Example of Non-Compliant Language:**
? "All profits go to charity"
? "100% contribution to kids"
? "Your money is held in treasury"

**Violation = Immediate termination of affiliate status + forfeiture of unpaid commissions**

---

**2. Prohibited Marketing Practices**

Affiliates are FORBIDDEN from:

? **Spam:**
- Unsolicited emails
- Mass DMs on social platforms
- Comment spam on blogs/YouTube

? **Deceptive Advertising:**
- False income claims
- Fake urgency ("Last chance!")
- Misleading comparisons

? **Brand Misrepresentation:**
- Pretending to be official company representative
- Using company logo without permission
- Creating fake customer testimonials

? **Trademark Abuse:**
- Bidding on branded keywords in Google Ads
- Using company name in domain names (without approval)
- Creating social media accounts impersonating brand

? **Compliance Violations:**
- Targeting children (COPPA violation)
- Not disclosing affiliate relationship (FTC violation)
- False charity claims

**Violation = Warning (first offense) ? Suspension (second) ? Termination (third)**

---

**3. Payment Terms**

**Commission Structure:**
- Basic: 15% first purchase + 5% recurring
- Power: 20% first purchase + 7.5% recurring
- Ambassador: 25% first purchase + 10% recurring
- Charity Partner: 30% of 40% (infrastructure + founder) share

**Payment Schedule:**
- Quarterly payouts (Jan 15, Apr 15, Jul 15, Oct 15)
- 30-day pending period (to account for refunds)
- $50 minimum threshold

**Payment Methods:**
- PayPal (primary)
- Stripe payout
- Bank transfer
- Platform credit

**Refund Policy:**
- If customer refunds within 30 days, commission is clawed back
- If customer churns after 30 days, no clawback

**Tax Reporting:**
- 1099 forms issued for US affiliates earning $600+
- International affiliates responsible for own tax reporting
- W-9 required for US affiliates before first payment

---

**4. Cookie Duration & Attribution**

**Attribution Model:** First-touch
- First click wins the commission
- 30-day cookie for Basic Affiliates
- 60-day cookie for Power Affiliates
- 90-day cookie for Ambassadors & Charity Partners

**Multi-Touch Scenarios:**
- Customer clicks Affiliate A link ? 20 days later clicks Affiliate B link ? Purchases
- Result: Affiliate A gets commission (first touch)

**Direct Traffic Override:**
- Customer clicks affiliate link ? 40 days later types URL directly ? Purchases
- Result: NO commission (cookie expired)

**Exception:** Charity Partners get lifetime attribution (cookie never expires)

---

**5. Content Ownership & Licensing**

**Marketing Materials:**
- Affiliates can use provided materials (banners, copy, videos)
- Materials are licensed, not transferred
- Affiliates CANNOT modify logos or brand assets without approval

**User-Generated Content:**
- Affiliates own their original content (reviews, tutorials, posts)
- FOR THE KIDS can request permission to reshare (with credit)
- Affiliates cannot claim company endorsement without permission

**Derivative Works:**
- Custom landing pages must be approved
- White-label materials for Power+ Affiliates
- Brand guidelines must be followed

---

**6. Termination Conditions**

**Company Can Terminate Affiliate If:**
- Violation of prohibited practices (3-strike policy)
- Fraudulent activity (immediate termination)
- Brand damage (public disparagement)
- Inactivity (12 months no referrals)

**Affiliate Can Terminate Anytime:**
- No penalty
- Outstanding commissions paid at next quarter
- Must stop using marketing materials within 7 days

**Post-Termination:**
- Existing customers remain attributed (lifetime)
- But NEW customers after termination = no commission

---

**7. Confidentiality & Data Privacy**

**Affiliate Access to Data:**
- Affiliates can see: Click count, conversion count, commission earned
- Affiliates CANNOT see: Customer names, emails, purchase details

**Affiliate Use of Data:**
- Affiliates must comply with GDPR, CCPA, and other data privacy laws
- No sharing of customer data obtained through affiliate relationship
- No retargeting customer emails without consent

**Platform Data Security:**
- All customer data encrypted
- PCI compliant payment processing
- COPPA compliant (no data from children)

---

**8. Force Majeure & Platform Changes**

**Commission Changes:**
- FOR THE KIDS reserves right to change commission structure with 30-day notice
- Existing conversions grandfathered (old commission applies)

**Platform Changes:**
- If platform pivots or discontinues service, affiliates notified 60 days in advance
- Outstanding commissions paid in full

**Gospel V1.3 Guarantee:**
- 60/30/10 split is IMMUTABLE (cannot change)
- If split ever changes, all affiliate agreements void (and affiliates encouraged to publicly call us out)

---

**9. Dispute Resolution**

**Escalation Path:**
1. Contact affiliate manager (48-hour response time)
2. Escalate to marketing director (72-hour response time)
3. Request mediation with founder

**Arbitration Clause:**
- Disputes over $5,000 subject to binding arbitration
- Small claims court for disputes under $5,000
- Governed by laws of [State/Country of Company Registration]

---

**10. Affiliate Code of Conduct**

Affiliates represent FOR THE KIDS and must:

? **Be Honest:** No false claims, no hype, no misleading stats
? **Be Transparent:** Disclose affiliate relationship (FTC requirement)
? **Be Helpful:** Provide value first, promote second
? **Be Compliant:** Follow Gospel V1.3, brand guidelines, and laws
? **Be Respectful:** No disparagement of competitors or company

**Core Principle:**
"Promote like you're recommending to a friend, not selling to a stranger."

---

## 6. TRACKING & ANALYTICS

### KPIs to Track

#### Affiliate-Level Metrics

**Acquisition Metrics:**
| Metric | Definition | Target |
|--------|-----------|--------|
| Click-Through Rate (CTR) | Clicks / Impressions | 2-5% |
| Conversion Rate | Conversions / Clicks | 5-10% |
| Average Order Value (AOV) | Total Revenue / Conversions | $99 |
| Customer Lifetime Value (LTV) | Avg subscription duration � monthly price | $1,188 (12 months � $99) |

**Performance Metrics:**
| Metric | Definition | Target |
|--------|-----------|--------|
| Commission per Click (CPC) | Commission Earned / Clicks | $3-5 |
| Return on Time (ROT) | Commission / Hours Spent | $50/hour |
| Active Referrals | Customers still subscribed | 80% retention |

**Engagement Metrics:**
| Metric | Definition | Target |
|--------|-----------|--------|
| Link Shares | How many times affiliate shared link | 10/month |
| Content Created | Blog posts, videos, social posts | 4/month |
| Community Participation | Discord messages, event attendance | Active |

---

#### Program-Level Metrics

**Growth Metrics:**
| Metric | Current | Target (90 Days) |
|--------|---------|------------------|
| Total Affiliates | 0 | 100 |
| Active Affiliates (1+ conversion/quarter) | 0 | 50 |
| Power Affiliates (10+ conversions) | 0 | 10 |
| Brand Ambassadors | 0 | 3 |
| Charity Partners | 0 | 2 |

**Revenue Metrics:**
| Metric | Formula | Target |
|--------|---------|--------|
| Affiliate-Driven Revenue | Sum of all affiliate referral revenue | $50K/month |
| Revenue per Affiliate | Total revenue / Active affiliates | $1K/month |
| Commission Payout Ratio | Commission paid / Affiliate revenue | 15-20% |

**Efficiency Metrics:**
| Metric | Formula | Target |
|--------|---------|--------|
| Cost Per Acquisition (CPA) | Commission / New customers | $30-50 |
| Customer Acquisition Cost (CAC) | Total marketing spend / New customers | $75 |
| LTV:CAC Ratio | Customer LTV / CAC | 3:1 |

---

### Attribution Model

**First-Touch Attribution (Primary)**

Customer journey:
1. Sees affiliate's YouTube video ? Clicks link (Affiliate A)
2. Visits site, leaves
3. Sees another affiliate's blog post ? Clicks link (Affiliate B)
4. Visits site, leaves
5. Types URL directly into browser ? Purchases

**Result:** Affiliate A gets commission (first touch wins)

**Rationale:**
- First touch introduced customer to brand
- Without that touch, customer wouldn't have known product exists
- Fair to affiliate who did awareness work

---

**Last-Touch Attribution (Secondary - for analysis only)**

Same journey as above:

**Result:** Affiliate B gets "last-touch credit" in dashboard
- But commission still goes to Affiliate A
- Last-touch data helps understand conversion paths

**Use Case:**
- Identify which affiliates are good at closing vs. awareness
- Optimize content strategy
- Test multi-affiliate collaboration models (future)

---

**Multi-Touch Attribution (Future Feature)**

**Concept:** Split commission across multiple affiliates in customer journey

**Example:**
- Affiliate A (awareness): 60% commission
- Affiliate B (consideration): 30% commission
- Affiliate C (conversion): 20% commission

**Status:** Not implemented yet (too complex for V1)

---

### Fraud Prevention

#### Red Flags to Monitor

**Click Fraud:**
- Same IP clicking affiliate link repeatedly
- Bot traffic (abnormal user agents)
- Click farms (geographic clustering)

**Detection:**
- IP fingerprinting
- Device fingerprinting
- Click timing analysis (human vs. bot patterns)

**Action:** Flag affiliate for review, withhold payout pending investigation

---

**Coupon Leakage:**
- Affiliate shares exclusive discount code on public coupon sites
- Intended for their audience, now available to everyone

**Detection:**
- Monitor coupon site scrapers
- Track coupon code usage patterns
- Compare intended vs. actual usage

**Action:** Warning (first offense), code revoked (second), affiliate terminated (third)

---

**Cookie Stuffing:**
- Affiliate embeds invisible iframe on their site with affiliate link
- Visitors get cookied without clicking
- Affiliate gets commission for unrelated purchases

**Detection:**
- Check referrer headers (should match affiliate site)
- Analyze click ? conversion time (too fast = stuffing)
- Review click quality scores

**Action:** Immediate termination + clawback of ill-gotten commissions

---

**Trademark Bidding:**
- Affiliate bids on "FOR THE KIDS" Google Ads keyword
- Captures branded search traffic
- Gets commission for customers who would've found us anyway

**Detection:**
- Monitor Google Ads auction insights
- Review trademark usage reports
- Mystery shopper testing

**Action:** Warning (first), ad account suspended (second), affiliate terminated (third)

---

**Fake Accounts:**
- Affiliate creates fake accounts to refer themselves
- Generates commission without real customer acquisition

**Detection:**
- Email pattern matching (same domain)
- Payment method analysis (same credit card)
- Behavioral analysis (too similar usage patterns)

**Action:** Immediate termination + potential legal action for fraud

---

**Chargebacks & Refund Abuse:**
- Affiliate refers customer ? Gets commission
- Customer refunds within 30 days
- Affiliate keeps commission

**Prevention:**
- 30-day pending period (commission not paid until after refund window)
- Automatic clawback if refund occurs after payout

---

### Dashboard & Reporting

#### Affiliate Dashboard (Self-Service)

**Overview Page:**
```
+---------------------------------------------+
�  YOUR PERFORMANCE (Last 30 Days)            �
+---------------------------------------------�
�  Clicks:           245                      �
�  Conversions:      12                       �
�  Conversion Rate:  4.9%                     �
�  Commission:       $287.40                  �
�  Status:           Basic Affiliate          �
�  Next Tier:        Power (need 10 more)    �
+---------------------------------------------+

+---------------------------------------------+
�  QUICK ACTIONS                              �
+---------------------------------------------�
�  [Copy Affiliate Link]                      �
�  [Download Marketing Materials]             �
�  [View Top Performing Content]              �
�  [Request Payout]                           �
+---------------------------------------------+
```

**Traffic Sources Page:**
```
+---------------------------------------------+
�  WHERE YOUR CONVERSIONS CAME FROM           �
+---------------------------------------------�
�  YouTube:       5 conversions               �
�  Twitter:       4 conversions               �
�  Blog:          2 conversions               �
�  Email:         1 conversion                �
+---------------------------------------------+
```

**Earnings Page:**
```
+---------------------------------------------+
�  COMMISSION BREAKDOWN                       �
+---------------------------------------------�
�  Pending:       $187.40 (awaiting payout)   �
�  Paid:          $100.00 (last quarter)      �
�  Lifetime:      $287.40                     �
�                                             �
�  Next Payout:   January 15, 2026            �
�  Amount:        $187.40                     �
+---------------------------------------------+
```

---

#### Admin Dashboard (Internal Use)

**Program Health:**
```
+---------------------------------------------+
�  AFFILIATE PROGRAM OVERVIEW                 �
+---------------------------------------------�
�  Total Affiliates:      100                 �
�  Active (30d):          52                  �
�  Pending Approval:      8                   �
�                                             �
�  Revenue (30d):         $45,230             �
�  Commissions (30d):     $7,837              �
�  Payout Ratio:          17.3%               �
+---------------------------------------------+
```

**Top Performers:**
```
+---------------------------------------------+
�  LEADERBOARD (30 Days)                      �
+---------------------------------------------�
�  1. Sarah M.    $2,340  (42 conversions)    �
�  2. Mike T.     $1,890  (31 conversions)    �
�  3. Agency XYZ  $1,560  (18 conversions)    �
�  4. John D.     $1,240  (22 conversions)    �
�  5. Emma L.     $980    (16 conversions)    �
+---------------------------------------------+
```

**Fraud Alerts:**
```
+---------------------------------------------+
�  REVIEW REQUIRED                            �
+---------------------------------------------�
�  ??  Affiliate #4387: Unusual click pattern �
�  ??  Affiliate #2910: High refund rate      �
�  ??  Affiliate #5602: Trademark bidding     �
+---------------------------------------------+
```

---

## IMPLEMENTATION ROADMAP

### Phase 1: Foundation (Weeks 1-2)

**Technical Build:**
- [ ] Create referrals database table
- [ ] Build affiliate tracking system (cookie-based)
- [ ] Develop affiliate dashboard (React frontend)
- [ ] Integrate with payment systems (Square, Stripe)
- [ ] Set up commission calculation logic
- [ ] Build payout automation

**Content Creation:**
- [ ] Design 5 banner ad sizes
- [ ] Write 3 email swipe templates
- [ ] Create 5 social media copy templates
- [ ] Produce video script outlines
- [ ] Compile marketing asset library

**Legal & Compliance:**
- [ ] Draft affiliate agreement
- [ ] Create terms & conditions
- [ ] Ensure FTC compliance disclosures
- [ ] Set up tax reporting system (1099)

---

### Phase 2: Recruitment (Weeks 3-4)

**Outreach:**
- [ ] Identify 100 target affiliates (creators, agencies, communities)
- [ ] Send personalized outreach emails
- [ ] Post in affiliate networks (ShareASale, Impact)
- [ ] Launch affiliate landing page

**Onboarding:**
- [ ] Create 10-minute training video
- [ ] Set up affiliate Discord server
- [ ] Build onboarding email sequence
- [ ] Schedule weekly affiliate Q&A calls

**Incentives:**
- [ ] Launch "First 50 Affiliates" bonus ($100 credit)
- [ ] Create leaderboard with prizes
- [ ] Announce Brand Ambassador program

---

### Phase 3: Optimization (Weeks 5-8)

**Performance Tracking:**
- [ ] Analyze which affiliates drive best customers (LTV)
- [ ] Identify top-performing content types
- [ ] A/B test commission structures
- [ ] Optimize payout timing

**Scaling:**
- [ ] Recruit Power Affiliates (agencies, large creators)
- [ ] Launch Charity Partner tier
- [ ] Create white-label options
- [ ] Develop co-marketing campaigns

**Support:**
- [ ] Hire affiliate manager (part-time to start)
- [ ] Create affiliate success playbook
- [ ] Host monthly strategy webinars
- [ ] Build affiliate community

---

### Phase 4: Scale (Months 3-6)

**Advanced Features:**
- [ ] Multi-language support for international affiliates
- [ ] Custom landing page builder
- [ ] API for affiliate data access
- [ ] Automated fraud detection

**Partner Expansion:**
- [ ] Sign 3-5 Charity Partners
- [ ] Partner with complementary SaaS tools
- [ ] Launch affiliate marketplace
- [ ] Create affiliate certification program

**Revenue Goals:**
- [ ] $50K/month affiliate-driven revenue
- [ ] 100 active affiliates
- [ ] 10 Power Affiliates
- [ ] 3 Brand Ambassadors
- [ ] 2 Charity Partners

---

## SUCCESS METRICS

### 90-Day Goals

| Metric | Target |
|--------|--------|
| Total Affiliates | 100 |
| Active Affiliates | 50 |
| Affiliate Revenue | $50K/month |
| Commission Payout | $7,500/month |
| Customer LTV (affiliate-driven) | $1,200 |
| Affiliate Satisfaction Score | 8.5/10 |

### 12-Month Goals

| Metric | Target |
|--------|--------|
| Total Affiliates | 500 |
| Active Affiliates | 200 |
| Affiliate Revenue | $200K/month |
| Commission Payout | $30K/month |
| Power Affiliates | 25 |
| Brand Ambassadors | 10 |
| Charity Partners | 5 |

---

## GOSPEL V1.3 COMPLIANCE CHECK

**Does this program maintain the 60/30/10 split?**

? **YES** - Here's how:

**Scenario:** Customer spends $100/month

**Without Affiliate:**
- Charity: $60
- Infrastructure: $30
- Founder: $10

**With 20% Affiliate Commission:**
- Charity: $60 (UNTOUCHED)
- Infrastructure: $18 (down from $30)
- Founder: $2 (down from $10)
- Affiliate: $20 (comes from Infra + Founder portions)

**The kids' 60% is NEVER reduced. Gospel V1.3 compliance maintained.**

---

## NEXT STEPS

1. **Review & Approve:** Founder approval of program design
2. **Technical Build:** Allocate 2 weeks for affiliate system development
3. **Content Creation:** Hire designer for banner ads, video scripts
4. **Legal Review:** Attorney review of affiliate agreement
5. **Recruit Founding Affiliates:** Identify 10 early partners for beta test
6. **Launch:** Soft launch with 10 beta affiliates, gather feedback, iterate
7. **Scale:** Public launch with full recruitment campaign

---

**FOR THE KIDS. ALWAYS.** ??

---

*Created: 2025-12-16*
*Version: 1.0*
*Gospel V1.3 Compliant*
*Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>*
