# AI Store Webhook - Quick Start

## 1. Create Webhook (One-Time Setup)

```powershell
cd C:\AiCollabForTheKids\scripts
.\setup-ai-store-webhook.ps1
```

## 2. Copy Output to .env

Add these lines to `C:\AiCollabForTheKids\api\.env`:

```bash
SQUARE_AI_STORE_WEBHOOK_SECRET=<signature_key_from_output>
SQUARE_AI_STORE_WEBHOOK_ID=<webhook_id_from_output>
SQUARE_AI_STORE_WEBHOOK_URL=https://combination-pay-resulted-drill.trycloudflare.com/api/webhooks/ai-store
```

## 3. Restart API Server

```powershell
ssh t5500
cd C:\AiCollabForTheKids\api
npm restart
```

## 4. Test

```powershell
cd C:\AiCollabForTheKids\scripts
.\test-ai-store-webhook.ps1
```

## Common Commands

### List All Webhooks
```powershell
.\list-square-webhooks.ps1
```

### Delete Webhook
```powershell
.\setup-ai-store-webhook.ps1 -Delete -SubscriptionId "wbhk_xxxxx"
```

### Test with Custom Amount
```powershell
.\test-ai-store-webhook.ps1 -Amount 9900  # $99.00
```

### View Logs
```powershell
ssh t5500
type C:\AiCollabForTheKids\api\combined.log | findstr "AI STORE"
```

## Webhook Details

- **URL:** https://combination-pay-resulted-drill.trycloudflare.com/api/webhooks/ai-store
- **Account:** ebaytrashortreasure@gmail.com
- **Location:** LY5GN09F5AN83
- **Events:** payment.created, payment.updated, order.created, order.updated, refund.created

## Gospel V1.3 Split (Automatic)

Every payment automatically splits:
- 60% → Charity
- 30% → Infrastructure
- 10% → Founder

## Support

See full documentation: `README-AI-STORE-WEBHOOK.md`

FOR THE KIDS
