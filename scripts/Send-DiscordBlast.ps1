# Discord Kickstarter Blast Script
# FOR THE KIDS - MAXIMUM EFFORT

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$webhookUrl = "https://discord.com/api/webhooks/1447774513042558996/aZpXHHihB3p1HM0SMe8GxBU5xvu8HJK92S0-I9IKSZFLnfasQZEcoeFM7TuMj19D78G-"

$payload = @{
    content = @"
@everyone

**FOR THE KIDS - KICKSTARTER IS LIVE!**

We're building the FIRST AI platform where 60% of ALL revenue goes directly to verified pediatric charities like Shriners Children's Hospitals.

**100% of the first $60,000 raised goes DIRECTLY to the kids.**

This isn't just another tech project - it's a movement to prove AI can be built FOR GOOD.

**Back us now:** https://www.kickstarter.com/projects/aidoesitall/for-the-kids-ai-powered-charity-platform

Every dollar counts. Every share matters.

#ForTheKids #AIForGood #Kickstarter
"@
    username = "FOR THE KIDS Bot"
} | ConvertTo-Json -Depth 10

try {
    $response = Invoke-RestMethod -Uri $webhookUrl -Method Post -Body $payload -ContentType "application/json"
    Write-Host "Discord blast sent successfully!" -ForegroundColor Green
} catch {
    Write-Host "Discord blast failed: $($_.Exception.Message)" -ForegroundColor Red
}
