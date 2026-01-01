# AI SOLUTIONS STORE - DISCORD PROMOTION
$webhookUrl = "https://discord.com/api/webhooks/1447774513042558996/aZpXHHihB3p1HM0SMe8GxBU5xvu8HJK92S0-I9IKSZFLnfasQZEcoeFM7TuMj19D78G-"

$json = @"
{
  "embeds": [{
    "title": "AI Solutions Store is LIVE!",
    "description": "Professional AI automation services for businesses.",
    "color": 3447003,
    "url": "https://ai-solutions.store",
    "fields": [
      {
        "name": "Special Offer",
        "value": "**$1 Consultation** - Discover how AI can transform your business",
        "inline": false
      },
      {
        "name": "Services",
        "value": "- Custom AI Automation\n- Business Process Optimization\n- AI Integration Consulting",
        "inline": true
      },
      {
        "name": "Get Started",
        "value": "[Visit AI Solutions Store](https://ai-solutions.store)",
        "inline": true
      }
    ],
    "footer": {
      "text": "AI Solutions Store - Professional AI Services"
    }
  }]
}
"@

try {
    Invoke-RestMethod -Uri $webhookUrl -Method Post -Body $json -ContentType 'application/json; charset=utf-8'
    Write-Host "Discord message sent!" -ForegroundColor Green
} catch {
    Write-Host "Failed: $($_.Exception.Message)" -ForegroundColor Red
}
