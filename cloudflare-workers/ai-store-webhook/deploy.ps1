$env:CLOUDFLARE_API_TOKEN = "515e9994f55ba2b9c9d5a294393165f1156ad"
$env:CLOUDFLARE_ACCOUNT_ID = "516a3a855f44f5ad8453636d163ae25d"

Set-Location "C:\AiCollabForTheKids\cloudflare-workers\ai-store-webhook"
npx wrangler deploy
