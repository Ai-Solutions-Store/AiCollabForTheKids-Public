# Influencer Outreach Automation Script
# FOR THE KIDS - MAXIMUM EFFORT KICKSTARTER PUSH
# Uses MICRO-INFLUENCER-KIT.md database

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

Write-Host @"
╔═══════════════════════════════════════════════════════════════╗
║  FOR THE KIDS - INFLUENCER OUTREACH AUTOMATION                ║
║  100% of first `$60K → Shriners Children's Hospitals          ║
║  Gospel V1.3 - 60/30/10 IMMUTABLE                             ║
╚═══════════════════════════════════════════════════════════════╝
"@ -ForegroundColor Cyan

# Priority influencers from MICRO-INFLUENCER-KIT.md (highest engagement potential)
$priorityInfluencers = @(
    @{ Handle = "@givingforchange"; Platform = "Instagram"; Niche = "Philanthropy"; Email = "hello@givingforchange.org"; Priority = "CRITICAL" },
    @{ Handle = "@parentingforchange"; Platform = "Instagram"; Niche = "Parenting"; Email = "contact@parentingforchange.org"; Priority = "CRITICAL" },
    @{ Handle = "@parentingwithpurpose"; Platform = "YouTube"; Niche = "Parenting"; Email = "contact@parentingwithpurpose.org"; Priority = "HIGH" },
    @{ Handle = "@charitychat"; Platform = "YouTube"; Niche = "Philanthropy"; Email = "info@charitychat.org"; Priority = "HIGH" },
    @{ Handle = "@socialgoodpro"; Platform = "Twitter"; Niche = "Philanthropy"; Email = "contact@socialgoodpro.io"; Priority = "HIGH" },
    @{ Handle = "@momstruth"; Platform = "Instagram"; Niche = "Parenting"; Email = "hello@momstruth.com"; Priority = "HIGH" },
    @{ Handle = "@thedad"; Platform = "TikTok"; Niche = "Parenting"; Email = "team@thedad.io"; Priority = "HIGH" },
    @{ Handle = "@aiforeveryone"; Platform = "Twitter"; Niche = "Tech"; Email = "hello@aiforeveryone.io"; Priority = "HIGH" },
    @{ Handle = "@docsfamily"; Platform = "Instagram"; Niche = "Health"; Email = "team@docsfamily.com"; Priority = "MEDIUM" },
    @{ Handle = "@givingtuesday"; Platform = "Multiple"; Niche = "Philanthropy"; Email = "partnerships@givingtuesday.org"; Priority = "VIP" }
)

# Email template - THE MISSION-FIRST APPROACH (optimized for Kickstarter urgency)
$emailTemplate = @"
Subject: 100% of first `$60K to children's hospitals - can you help spread the word?

Hi {NAME},

I'm reaching out because your audience aligns perfectly with something we're doing for kids.

We just launched a Kickstarter for FOR THE KIDS - an AI platform where 60% of ALL revenue goes to verified pediatric charities. But here's the urgent part:

**100% of the first `$60,000 pledged goes DIRECTLY to Shriners Children's Hospitals.**

The founder waived his entire cut. Infrastructure waived too. EVERY DOLLAR helps sick kids.

We have 72 hours left. One post from someone like you could mean hundreds of kids helped.

TX proof: basescan.org/tx/0x6f78...dc07d
Campaign: kickstarter.com/projects/aidoesitall/for-the-kids-ai-powered-charity-platform

Would you consider sharing? I'd be happy to provide content, graphics, or affiliate commission (20%) if that helps.

For the kids,
[YOUR NAME]
FOR THE KIDS
hello@aidoesitall.website
"@

# DM template - THE QUICK ASK (for Twitter/Instagram DMs)
$dmTemplate = @"
{NAME} - quick ask:

100% of the first `$60K from our Kickstarter goes DIRECTLY to Shriners Children's Hospitals.

Not 60%. ONE HUNDRED PERCENT. Founder waived his cut entirely.

72 hours left. Would you consider sharing? One post from you = hundreds of kids helped.

Campaign: bit.ly/forthekids-ks
TX proof: basescan.org/tx/0x6f78...dc07d
"@

Write-Host ""
Write-Host "PRIORITY OUTREACH LIST (Top 10 Mission-Aligned Influencers):" -ForegroundColor Yellow
Write-Host "============================================================" -ForegroundColor Yellow

$priorityInfluencers | ForEach-Object {
    $priority = $_.Priority
    $color = switch ($priority) {
        "VIP" { "Magenta" }
        "CRITICAL" { "Red" }
        "HIGH" { "Yellow" }
        default { "White" }
    }
    Write-Host "[$priority] $($_.Handle) ($($_.Platform)) - $($_.Email)" -ForegroundColor $color
}

Write-Host ""
Write-Host "EMAIL TEMPLATE (Ready to Send):" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host $emailTemplate -ForegroundColor White

Write-Host ""
Write-Host "DM TEMPLATE (For Twitter/Instagram):" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host $dmTemplate -ForegroundColor White

# Save outreach list to CSV for tracking
$outreachData = $priorityInfluencers | ForEach-Object {
    [PSCustomObject]@{
        DateReached = (Get-Date -Format "MM/dd/yyyy")
        Handle = $_.Handle
        Platform = $_.Platform
        Niche = $_.Niche
        Email = $_.Email
        Priority = $_.Priority
        DMSent = "Pending"
        EmailSent = "Pending"
        Response = ""
        Notes = "Kickstarter 72hr push"
    }
}

$csvPath = "c:\AiCollabForTheKids\marketing\kickstarter\OUTREACH-TRACKER.csv"
$outreachData | Export-Csv -Path $csvPath -NoTypeInformation -Force

Write-Host ""
Write-Host "Outreach tracker saved to: $csvPath" -ForegroundColor Green
Write-Host ""
Write-Host "NEXT STEPS:" -ForegroundColor Yellow
Write-Host "1. Open each email address in email client" -ForegroundColor White
Write-Host "2. Copy/paste email template (personalize {NAME})" -ForegroundColor White
Write-Host "3. Send DMs on Twitter/Instagram using DM template" -ForegroundColor White
Write-Host "4. Log responses in OUTREACH-TRACKER.csv" -ForegroundColor White
Write-Host "5. Follow up in 3-5 days if no response" -ForegroundColor White
Write-Host ""
Write-Host "FOR THE KIDS - 100% OF FIRST `$60K TO SHRINERS!" -ForegroundColor Cyan
