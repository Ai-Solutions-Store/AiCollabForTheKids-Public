# LinkedIn Marketing Automation - AI Solutions Store

**Script:** `linkedin-post.ps1`
**Platform:** LinkedIn API v2 (UGC Posts)
**Store:** https://ai-solutions.store
**Created:** 2025-12-21

---

## Overview

Professional LinkedIn marketing automation for AI Solutions Store. Posts ROI-focused, value-driven content targeting business owners, operations leaders, and technical decision-makers.

### Products Featured

| Product | Price | Focus |
|---------|-------|-------|
| Claude Droid | $299 | AI video generation, content automation |
| Income Droid | $499 | Revenue automation, 4 videos daily |
| Marketing Engine | $199 | Social media automation |
| Jules AI | $399 | Gemini-powered business intelligence |
| Affiliate System | $599 | White-label affiliate platform |
| Dating Platform | $2,499 | Complete dating app source code |

---

## Setup Requirements

### 1. LinkedIn App Configuration

1. **Create LinkedIn Application**
   - Go to https://www.linkedin.com/developers/apps
   - Click "Create app"
   - Fill in required information:
     - App name: "AI Solutions Store Marketing"
     - LinkedIn Page: Your company page
     - Privacy policy URL
     - App logo (optional)

2. **Configure App Permissions**
   - Navigate to "Products" tab
   - Request access to "Share on LinkedIn" product
   - Required permission: `w_member_social` (for posting)
   - Additional recommended: `r_basicprofile` (for user info)

3. **Generate Access Token**
   - Go to "Auth" tab
   - Use OAuth 2.0 authorization flow
   - Scopes required: `w_member_social`, `r_basicprofile`
   - Save the generated access token securely

### 2. Environment Variable Setup

**Option A: Session-based (temporary)**
```powershell
$env:LINKEDIN_ACCESS_TOKEN = "YOUR_ACCESS_TOKEN_HERE"
```

**Option B: Persistent (recommended)**

Add to `api/.env`:
```env
LINKEDIN_ACCESS_TOKEN=YOUR_ACCESS_TOKEN_HERE
```

Then load in PowerShell profile (`$PROFILE`):
```powershell
# Load LinkedIn credentials
if (Test-Path "C:\AiCollabForTheKids\api\.env") {
    Get-Content "C:\AiCollabForTheKids\api\.env" | ForEach-Object {
        if ($_ -match '^LINKEDIN_ACCESS_TOKEN=(.+)$') {
            $env:LINKEDIN_ACCESS_TOKEN = $matches[1]
        }
    }
}
```

### 3. Verify Setup

```powershell
# Test with dry run
.\linkedin-post.ps1 -DryRun

# Should display:
# - Product selection
# - Content preview
# - Character count
# - "DRY RUN MODE" message
```

---

## Usage

### Basic Usage

**Auto-rotate by day:**
```powershell
.\linkedin-post.ps1
```

Product rotation schedule:
- Days 1, 7, 13, 19, 25, 31: Claude Droid
- Days 2, 8, 14, 20, 26: Income Droid
- Days 3, 9, 15, 21, 27: Marketing Engine
- Days 4, 10, 16, 22, 28: Jules AI
- Days 5, 11, 17, 23, 29: Affiliate System
- Days 6, 12, 18, 24, 30: Dating Platform

### Advanced Usage

**Post specific product:**
```powershell
# Post Claude Droid ($299)
.\linkedin-post.ps1 -ProductIndex 1

# Post Income Droid ($499)
.\linkedin-post.ps1 -ProductIndex 2

# Post Marketing Engine ($199)
.\linkedin-post.ps1 -ProductIndex 3

# Post Jules AI ($399)
.\linkedin-post.ps1 -ProductIndex 4

# Post Affiliate System ($599)
.\linkedin-post.ps1 -ProductIndex 5

# Post Dating Platform ($2,499)
.\linkedin-post.ps1 -ProductIndex 6
```

**Preview without posting:**
```powershell
# Preview today's auto-selected product
.\linkedin-post.ps1 -DryRun

# Preview specific product
.\linkedin-post.ps1 -ProductIndex 3 -DryRun
```

---

## Content Strategy

### Messaging Framework

**Tone:** Professional, evidence-based, ROI-focused
**Audience:** Business owners, CTOs, operations leaders, marketing directors
**Structure:**
1. Problem statement (pain point)
2. Solution introduction (product)
3. Key features/benefits (bulleted)
4. ROI/business case (numbers)
5. Real example/case study
6. Call to action
7. Relevant hashtags

### Post Template Elements

Each product post includes:
- **Headline:** Attention-grabbing question or statement
- **Problem:** Specific business pain point
- **Solution:** Product introduction with clear value prop
- **Features:** 4-5 bulleted key capabilities
- **ROI Comparison:** Price vs. traditional alternatives
- **Case Study:** Real-world implementation example
- **CTA:** Learn more link to ai-solutions.store
- **Hashtags:** 5-7 relevant professional tags

### Character Limits

- Maximum: 3,000 characters (LinkedIn limit)
- Target: 800-1,200 characters (optimal engagement)
- Current templates: 600-900 characters (well within limits)

---

## Automation & Scheduling

### Daily Automation

**Windows Task Scheduler:**
```powershell
# Create scheduled task
$action = New-ScheduledTaskAction -Execute "PowerShell.exe" `
    -Argument "-File C:\AiCollabForTheKids\scripts\marketing\linkedin-post.ps1"

$trigger = New-ScheduledTaskTrigger -Daily -At "9:00AM"

Register-ScheduledTask -TaskName "LinkedIn AI Store Marketing" `
    -Action $action -Trigger $trigger -Description "Daily LinkedIn post rotation"
```

**Recommended Schedule:**
- **Time:** 9:00 AM or 1:00 PM local time (best engagement)
- **Days:** Tuesday-Thursday (highest LinkedIn activity)
- **Frequency:** 3-4 times per week (not daily to avoid spam)

### PM2 / Node.js Integration

```javascript
// ecosystem-autonomous.config.cjs
{
  script: 'powershell.exe',
  args: '-File C:/AiCollabForTheKids/scripts/marketing/linkedin-post.ps1',
  name: 'linkedin-marketing',
  cron_restart: '0 9 * * 2,3,4', // Tuesday, Wednesday, Thursday at 9 AM
  autorestart: false
}
```

---

## API Reference

### LinkedIn UGC Posts API

**Endpoint:** `https://api.linkedin.com/v2/ugcPosts`
**Method:** POST
**Auth:** OAuth 2.0 Bearer Token
**Content-Type:** `application/json`

**Request Body:**
```json
{
  "author": "urn:li:person:USER_ID",
  "lifecycleState": "PUBLISHED",
  "specificContent": {
    "com.linkedin.ugc.ShareContent": {
      "shareCommentary": {
        "text": "Your post content here..."
      },
      "shareMediaCategory": "NONE"
    }
  },
  "visibility": {
    "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
  }
}
```

**Rate Limits:**
- Check LinkedIn API documentation for current limits
- Typical: ~100 posts per day per user
- Respect limits to avoid account restrictions

### User Profile API

**Endpoint:** `https://api.linkedin.com/v2/me`
**Method:** GET
**Purpose:** Get authenticated user's LinkedIn ID (required for posting)

---

## Monitoring & Analytics

### Built-in Logging

**Log Location:** `C:\AiCollabForTheKids\logs\linkedin-marketing.log`

**Log Format:**
```
[2025-12-21 09:00:15] [SUCCESS] Successfully posted LinkedIn update for Claude Droid - Post ID: urn:li:share:123456789
[2025-12-21 09:00:15] [INFO] Auto-selected product based on day rotation: Product 1
```

### Success Metrics to Track

**Engagement Metrics:**
- Impressions (views)
- Engagement rate (target: 3%+ for business content)
- Click-through rate to ai-solutions.store
- Comments and shares
- New connections from post visibility

**Business Metrics:**
- Store visits from LinkedIn traffic
- Consultation bookings
- Product sales attributed to LinkedIn
- Lead quality from LinkedIn vs. other channels

### LinkedIn Analytics

Access native analytics:
1. Go to your LinkedIn post
2. Click "View post analytics"
3. Track: Impressions, Clicks, Engagement rate, Demographics

---

## Troubleshooting

### Common Issues

**1. Token Expired Error**
```
ERROR - Failed to get LinkedIn user ID: 401 Unauthorized
```

**Solution:**
- LinkedIn access tokens expire (typically 60 days)
- Regenerate token via OAuth 2.0 flow
- Update `LINKEDIN_ACCESS_TOKEN` environment variable

**2. Permission Denied**
```
ERROR - LinkedIn API Error: Insufficient permissions
```

**Solution:**
- Verify app has "Share on LinkedIn" product access
- Ensure `w_member_social` permission is granted
- Re-authorize app with correct scopes

**3. Content Too Long**
```
ERROR - Content exceeds LinkedIn's 3000 character limit
```

**Solution:**
- Edit product template in script
- Reduce case study details or feature bullets
- Shorten URLs or remove some hashtags

**4. Rate Limit Exceeded**
```
ERROR - 429 Too Many Requests
```

**Solution:**
- Wait 24 hours before posting again
- Reduce posting frequency
- Check LinkedIn API rate limit documentation

**5. Network/Connection Errors**
```
ERROR - Unable to connect to api.linkedin.com
```

**Solution:**
- Verify internet connection
- Check firewall/proxy settings
- Ensure PowerShell can make HTTPS requests
- Test with: `Invoke-WebRequest https://api.linkedin.com`

---

## Security Best Practices

### Access Token Storage

**❌ NEVER:**
- Commit tokens to Git repositories
- Share tokens in screenshots or documentation
- Use production tokens in public demos
- Store tokens in unencrypted files

**✅ ALWAYS:**
- Store in environment variables or secure vaults
- Use `.env` files (excluded from Git via `.gitignore`)
- Rotate tokens regularly (every 30-60 days)
- Use separate tokens for dev/staging/production

### Code Security

**Token Validation:**
```powershell
# Script validates token presence before execution
if (-not $AccessToken) {
    Write-Log "LINKEDIN_ACCESS_TOKEN environment variable not set" "ERROR"
    exit 1
}
```

**Error Handling:**
- Sensitive data not logged in error messages
- API errors sanitized before display
- No token exposure in console output

---

## Content Customization

### Editing Product Templates

**Location in Script:**
```powershell
$Products = @(
    @{
        Name = "Claude Droid"
        Price = 299
        Headline = "Your headline here"
        Body = @"
Your post content here...
"@
    },
    # ... more products
)
```

### Adding New Products

1. Add new product hashtable to `$Products` array
2. Increment rotation logic if needed
3. Test with `-DryRun` flag
4. Update this README with new product info

### Customizing Hashtags

**Current Strategy:**
- 5-7 hashtags per post
- Mix of broad (#AIAutomation) and specific (#SocialMediaMarketing)
- Avoid over-tagging (LinkedIn penalizes 10+ hashtags)
- Use industry-relevant tags for audience targeting

**Recommended Tags by Category:**
- AI/Tech: #AIAutomation #BusinessAutomation #AIForBusiness
- Marketing: #MarketingAutomation #ContentStrategy #DigitalMarketing
- Business: #BusinessGrowth #ROI #Entrepreneurship #StartupLife
- Operations: #BusinessOperations #OperationalExcellence #ProductivityTools

---

## Performance Optimization

### Best Posting Times (LinkedIn)

**Optimal Times (EST):**
- Tuesday-Thursday: 9-10 AM, 12-1 PM
- Avoid: Weekends, early mornings (before 8 AM), late evenings (after 6 PM)

**Day Performance:**
1. Wednesday (highest engagement)
2. Tuesday (second highest)
3. Thursday (third highest)
4. Monday/Friday (lower engagement)
5. Weekends (lowest engagement)

### Content Performance Tips

**High-Performing Elements:**
- Numbers and data (ROI metrics, percentages, case studies)
- Questions in headlines (engagement triggers)
- Real-world examples (credibility builders)
- Specific price comparisons (value demonstration)
- Professional tone (builds trust)

**Low-Performing Elements:**
- Generic claims without data
- Overly promotional language
- Excessive emojis (unprofessional on LinkedIn)
- All caps or clickbait headlines
- Irrelevant hashtags

---

## Integration with Other Marketing

### Cross-Platform Strategy

**Content Repurposing:**
1. LinkedIn post (professional, detailed) - This script
2. Twitter thread (concise, casual) - `ai-store-tweet.ps1`
3. Reddit posts (community-focused) - Manual posting
4. Discord announcements (technical community) - `ai-store-discord.ps1`

**Consistent Messaging:**
- Same core value propositions across platforms
- Adapt tone/length for platform norms
- Use platform-specific hashtags
- Track which platforms drive best conversions

### Marketing Automation Suite

**AI Solutions Store Marketing Scripts:**
- `linkedin-post.ps1` - Professional business audience
- `ai-store-tweet.ps1` - Broader tech/startup audience
- `ai-store-discord.ps1` - Developer/technical community
- `24-7-marketing-engine.ps1` - Autonomous multi-platform

---

## Compliance & Legal

### Content Accuracy

**ROI Claims:**
- All metrics based on documented client results
- "Results may vary" disclaimer implied
- Specific revenue numbers from verified implementations
- No guarantees of specific outcomes

**Product Representations:**
- Accurate feature descriptions
- Honest pricing (one-time vs. recurring clearly stated)
- No misleading automation capabilities
- Transparent about what's included

### LinkedIn Terms of Service

**Acceptable Use:**
- Authentic content representing real products
- No spam or repetitive content
- Respect rate limits and posting guidelines
- No fake engagement or manipulation

**Prohibited:**
- Automated liking/commenting
- Fake accounts or impersonation
- Misleading content or scams
- Copyright infringement

---

## Changelog

### Version 1.0 (2025-12-21)
- Initial release
- 6 product rotation templates
- OAuth 2.0 authentication
- UGC Posts API integration
- Automatic day-based rotation
- Dry run mode for testing
- Comprehensive error handling
- Logging to file + console
- Character limit validation
- Professional formatting

---

## Support & Resources

### LinkedIn API Documentation
- **Main Docs:** https://docs.microsoft.com/linkedin/
- **UGC Posts API:** https://docs.microsoft.com/linkedin/marketing/integrations/community-management/shares/ugc-post-api
- **OAuth 2.0:** https://docs.microsoft.com/linkedin/shared/authentication/authentication
- **Rate Limits:** https://docs.microsoft.com/linkedin/shared/api-guide/concepts/rate-limits

### Internal Resources
- **Marketing Content:** `C:\AiCollabForTheKids\marketing\linkedin-store-posts.md`
- **AI Store:** https://ai-solutions.store
- **Twitter Script:** `C:\AiCollabForTheKids\scripts\marketing\ai-store-tweet.ps1`
- **Fleet Status:** `C:\AiCollabForTheKids\FLEET-STATUS.md`

### Questions or Issues?
- Review this README thoroughly
- Check log file: `C:\AiCollabForTheKids\logs\linkedin-marketing.log`
- Test with `-DryRun` flag before posting
- Verify API credentials and permissions

---

**FOR THE KIDS. ALWAYS.**
