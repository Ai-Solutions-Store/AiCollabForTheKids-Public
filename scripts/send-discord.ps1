$webhookUrl = "https://discord.com/api/webhooks/1447774513042558996/aZpXHHihB3p1HM0SMe8GxBU5xvu8HJK92S0-I9IKSZFLnfasQZEcoeFM7TuMj19D78G-"

$payload = @{
    content = @"
🚀 **Payment Links LIVE**

• $1 Consultation: https://square.link/u/kckKn8JE
• $9.99 AI Starter: https://square.link/u/Rz39ejjf
• $29.99 AI Pro: https://square.link/u/RZlWfydp

60% to pediatric charities. FOR THE KIDS.
"@
} | ConvertTo-Json

Invoke-RestMethod -Uri $webhookUrl -Method Post -ContentType "application/json; charset=utf-8" -Body $payload
Write-Host "Discord message sent successfully"
