# AI Solutions Store Twitter Marketing Script

## Location
```
C:\AiCollabForTheKids\scripts\marketing\ai-store-tweet.ps1
```

## Purpose
Automated Twitter posting for AI Solutions Store promotional content using Twitter API v2 with OAuth 1.0a authentication.

## Features
- Professional AI consulting service promotion
- $1 consultation offer highlight
- Link to https://ai-solutions.store
- No charity messaging (business-focused only)
- OAuth 1.0a HMAC-SHA1 signing
- Detailed error handling and logging
- Colorized console output

## Tweet Content
```
Stuck with manual processes? Let AI do the heavy lifting.

AI Solutions Store:
- $1 consultation (yes, really)
- Custom AI automation
- Business process optimization
- No subscriptions, no BS

Start with $1. Scale when ready.

https://ai-solutions.store

#AIAutomation #BusinessAutomation #AIConsulting
```

## Usage

### Basic Execution
```powershell
cd C:\AiCollabForTheKids\scripts\marketing
.\ai-store-tweet.ps1
```

### Expected Output
```
═══════════════════════════════════════════════════════════════
AI SOLUTIONS STORE - TWITTER MARKETING
═══════════════════════════════════════════════════════════════

Generating OAuth 1.0a signature...
Posting tweet to Twitter API v2...

═══════════════════════════════════════════════════════════════
SUCCESS - TWEET POSTED!
═══════════════════════════════════════════════════════════════

Tweet ID: 1234567890123456789
View at: https://twitter.com/AiCollab4Kids/status/1234567890123456789
```

## Credentials
Credentials are hardcoded in the script (same as other marketing scripts):

```powershell
$ConsumerKey = "HNEdtJnPKYA8BVANqZVKDKKPA"
$ConsumerSecret = "Abht6DC5bYJegI46Cmi3i57CXGd20neWYjL89l3olOLib06vw2"
$AccessToken = "968810237116461056-e9rZo5CaFD3R5Lm8iJfvLs2qNi8J0hX"
$AccessTokenSecret = "Dx2ZF7YWVjVRVFkhAE4Edkt1516l6EggXcvgt6y7CHIS0"
```

These credentials are also available in `C:\AiCollabForTheKids\api\.env` as:
- `TWITTER_API_KEY`
- `TWITTER_API_SECRET`
- `TWITTER_ACCESS_TOKEN`
- `TWITTER_ACCESS_TOKEN_SECRET`

## Twitter Account
- **Account:** @AiCollab4Kids
- **Platform:** Twitter (X)
- **API Version:** v2
- **Auth Method:** OAuth 1.0a

## Rate Limits
- **Tweets per 24 hours:** 50
- **Recommended spacing:** 3+ hours between tweets
- **Best posting times:** Tuesday 9 AM EST for business content

## Logging
Logs are automatically written to:
```
C:\AiCollabForTheKids\logs\twitter-marketing.log
```

Format:
```
[2025-12-21 06:31:15] SUCCESS - Tweet ID: 2002703584324952235
[2025-12-21 08:45:22] FAILED - Rate limit exceeded
```

## Error Handling
If the tweet fails, the script will:
1. Display error details in red
2. Show Twitter API error response
3. Provide troubleshooting steps
4. Log the failure
5. Exit with code 1

Common errors:
- **Rate limit exceeded:** Wait 24 hours or reduce tweet frequency
- **Duplicate content:** Twitter blocks identical tweets within ~24 hours
- **Invalid credentials:** Verify OAuth keys in script or .env file
- **403 Forbidden:** Check API permissions at developer.twitter.com

## Troubleshooting

### Script doesn't run
```powershell
# Check execution policy
Get-ExecutionPolicy

# Set execution policy if needed (run as Administrator)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Tweet not posting
1. Verify credentials in `api/.env`
2. Check Twitter developer console for API access
3. Ensure OAuth 1.0a write permissions are enabled
4. Check rate limits (50 tweets per 24 hours)
5. Try different tweet text (Twitter blocks duplicates)

### OAuth signature errors
- Verify all 4 credentials are correct
- Check system time is synchronized
- Ensure no extra spaces in credentials

## Customization

### Change tweet content
Edit the `$TweetText` variable in the script:

```powershell
$TweetText = @"
Your custom tweet content here...
"@
```

### Change hashtags
Modify the hashtag line in `$TweetText`:
```powershell
#YourHashtag1 #YourHashtag2 #YourHashtag3
```

### Change target URL
Update the URL in `$TweetText`:
```powershell
https://your-custom-url.com
```

## Related Scripts
- `jules-ai-tweet.ps1` - Jules AI product promotion
- `claude-droid-tweet.ps1` - Claude Droid promotion
- `income-droid-tweet.ps1` - Income Droid promotion
- `marketing-engine-tweet.ps1` - Marketing Engine promotion
- `dating-platform-tweet.ps1` - Dating platform promotion

## Testing
The script has been tested and successfully posted tweet ID:
```
2002703584324952235
```

View at: https://twitter.com/AiCollab4Kids/status/2002703584324952235

## Technical Details

### OAuth 1.0a Flow
1. Generate timestamp and nonce
2. Build OAuth parameters
3. Create signature base string
4. Generate HMAC-SHA1 signature
5. Build Authorization header
6. POST to Twitter API v2

### API Endpoint
```
POST https://api.twitter.com/2/tweets
```

### Request Headers
```
Authorization: OAuth oauth_consumer_key="...", oauth_nonce="...", ...
Content-Type: application/json
```

### Request Body
```json
{
  "text": "Tweet content here..."
}
```

## Support
For issues or questions:
- Twitter Developer Docs: https://developer.twitter.com/en/docs/twitter-api
- OAuth 1.0a Spec: https://oauth.net/core/1.0a/
- Script location: `C:\AiCollabForTheKids\scripts\marketing\ai-store-tweet.ps1`

---

**Created:** 2025-12-21
**Purpose:** AI Solutions Store marketing automation
**Status:** Production ready and tested
**Last Tweet:** 2002703584324952235 (2025-12-21 06:31 UTC)
