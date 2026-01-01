$env:CLOUDFLARE_ACCOUNT_ID = "516a3a855f44f5ad8453636d163ae25d"
$env:CLOUDFLARE_API_TOKEN = "UCqAiInsLNci3t-sbPn_ior0zU3u7beSVVvG1ZT8"

Set-Location "C:\AiCollabForTheKids"
npx wrangler pages deploy ai-solutions-store --project-name=ai-solutions-store --branch=main --commit-dirty=true
