# Twitter/X Kickstarter Campaign Deployment
# FOR THE KIDS - MAXIMUM EFFORT

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# Twitter API credentials from .env
$apiKey = "HNEdtJnPKYA8BVANqZVKDKKPA"
$apiSecret = "Abht6DC5bYJegI46Cmi3i57CXGd20neWYjL89l3olOLib06vw2"
$accessToken = "968810237116461056-e9rZo5CaFD3R5Lm8iJfvLs2qNi8J0hX"
$accessSecret = "Dx2ZF7YWVjVRVFkhAE4Edkt1516l6EggXcvgt6y7CHIS0"
$bearerToken = "AAAAAAAAAAAAAAAAAAAAANKf5wEAAAAAaB37zLNLQKzw7kBdj6NDOsWDLIc%3DIetXZplkpaLwW6XJ6HjOXqVaHtv2mocGK5ToIQwVKp3SJHYNBn"

# Kickstarter campaign tweets
$tweets = @(
    "What if AI could help sick kids instead of just making billionaires richer? We built it. 60% of ALL revenue goes to children's hospitals. #ForTheKids #AIForGood https://kickstarter.com/projects/aidoesitall/for-the-kids-ai-powered-charity-platform",

    "100% of the first `$60K we raise goes DIRECTLY to Shriners Children's Hospitals. Not 'some proceeds' - ALL OF IT. This is what ethical AI looks like. #ForTheKids",

    "We're proving AI can be built for GOOD. Our platform donates 60% of revenue to verified pediatric charities - hardcoded, immutable, forever. Join the movement: #ForTheKids #Kickstarter",

    "Tired of tech companies that only care about profit? Same. That's why we built an AI platform where kids come first. 60% to charity. Always. #ForTheKids #AIForGood",

    "Every AI tool you use on our platform helps fund children's medical care. Dating verification, content creation, business tools - all FOR THE KIDS. #Kickstarter"
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "TWITTER KICKSTARTER CAMPAIGN" -ForegroundColor Cyan
Write-Host "FOR THE KIDS - MAXIMUM EFFORT" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Function to post tweet using Twitter API v2
function Post-Tweet {
    param([string]$TweetText)

    $url = "https://api.twitter.com/2/tweets"
    $body = @{ text = $TweetText } | ConvertTo-Json

    $headers = @{
        "Authorization" = "Bearer $bearerToken"
        "Content-Type" = "application/json"
    }

    try {
        $response = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $body
        return @{ success = $true; id = $response.data.id }
    } catch {
        return @{ success = $false; error = $_.Exception.Message }
    }
}

# Post first tweet as test
Write-Host ""
Write-Host "Posting launch tweet..." -ForegroundColor Yellow
$result = Post-Tweet -TweetText $tweets[0]

if ($result.success) {
    Write-Host "Tweet posted successfully! ID: $($result.id)" -ForegroundColor Green

    # Save tweet queue for scheduled posting
    $tweets | Out-File -FilePath "c:\AiCollabForTheKids\marketing\kickstarter\TWEET-QUEUE.txt" -Encoding UTF8
    Write-Host "Remaining tweets queued for scheduled posting" -ForegroundColor Green
} else {
    Write-Host "Tweet failed: $($result.error)" -ForegroundColor Red

    # Check if it's an auth issue - try OAuth 1.0a
    if ($result.error -match "401|403|Unauthorized") {
        Write-Host ""
        Write-Host "Bearer token may need refresh. Tweets saved for manual posting." -ForegroundColor Yellow
        $tweets | Out-File -FilePath "c:\AiCollabForTheKids\marketing\kickstarter\TWEET-QUEUE.txt" -Encoding UTF8
        Write-Host "Saved to: c:\AiCollabForTheKids\marketing\kickstarter\TWEET-QUEUE.txt" -ForegroundColor Cyan
    }
}

Write-Host ""
Write-Host "Campaign tweets ready:" -ForegroundColor Cyan
for ($i = 0; $i -lt $tweets.Count; $i++) {
    Write-Host ""
    Write-Host "[$($i+1)] $($tweets[$i].Substring(0, [Math]::Min(80, $tweets[$i].Length)))..." -ForegroundColor White
}
