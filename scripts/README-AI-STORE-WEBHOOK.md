# AI Solutions Store - Square Webhook Setup

## Overview

This webhook integration enables automated payment processing and Gospel V1.3 (60/30/10) profit allocation for the AI Solutions Store.

**Account:** ebaytrashortreasure@gmail.com
**Location ID:** LY5GN09F5AN83
**Notification URL:** https://combination-pay-resulted-drill.trycloudflare.com/api/webhooks/ai-store

---

## Quick Start

### 1. Register the Webhook

```powershell
# Run the setup script
cd C:\AiCollabForTheKids\scripts
.\setup-ai-store-webhook.ps1

# To delete an existing webhook
.\setup-ai-store-webhook.ps1 -Delete -SubscriptionId "wbhk_xxxxx"

# To use a different notification URL
.\setup-ai-store-webhook.ps1 -NotificationUrl "https://your-domain.com/webhook"
```

### 2. Add Webhook Secret to .env

After running the script, it will output the webhook signature key. Add it to `C:\AiCollabForTheKids\api\.env`:

```bash
# AI Solutions Store Webhook Configuration
SQUARE_AI_STORE_WEBHOOK_SECRET=your_signature_key_here
SQUARE_AI_STORE_WEBHOOK_ID=wbhk_xxxxx
SQUARE_AI_STORE_WEBHOOK_URL=https://combination-pay-resulted-drill.trycloudflare.com/api/webhooks/ai-store
```

### 3. Restart API Server

The webhook handler is already implemented in `api/routes/webhooks.js`. Just restart the server:

```powershell
# On T5500 (where API runs)
ssh t5500
cd C:\AiCollabForTheKids\api
npm restart
```

---

## Webhook Events

The webhook is configured to listen for these Square events:

| Event Type | Description | Handler Action |
|------------|-------------|----------------|
| `payment.created` | New payment initiated | Log and wait for completion |
| `payment.updated` | Payment status changed | Execute 60/30/10 split when status = COMPLETED |
| `order.created` | New order placed | Log order details |
| `order.updated` | Order status changed | Log status update |
| `refund.created` | Refund initiated | Log refund (TODO: reverse allocation) |

---

## Payment Processing Flow

### Step 1: Customer Makes Purchase

Customer completes checkout on ai-solutions.store using Square:
- Payment is processed through Square (ebaytrashortreasure account)
- Square sends `payment.created` webhook to your server

### Step 2: Webhook Received

Server receives webhook at `/api/webhooks/ai-store`:

```javascript
POST /api/webhooks/ai-store
Headers:
  x-square-hmacsha256-signature: <signature>
  content-type: application/json

Body:
{
  "type": "payment.created",
  "data": {
    "object": {
      "payment": {
        "id": "xyz123",
        "status": "COMPLETED",
        "amount_money": { "amount": 19900, "currency": "USD" }
      }
    }
  }
}
```

### Step 3: Signature Verification

The webhook handler verifies the signature using HMAC-SHA256:

```javascript
const signature = req.headers['x-square-hmacsha256-signature'];
const webhookSecret = process.env.SQUARE_AI_STORE_WEBHOOK_SECRET;
const verified = verifyWebhookSignature(JSON.stringify(req.body), signature, webhookSecret);
```

**CRITICAL:** If signature verification fails, the webhook is REJECTED (403 Forbidden).

### Step 4: Gospel V1.3 Allocation

Once payment status = COMPLETED, the system:

1. **Creates Transaction Record** (Prisma)
   - Amount: $199.00
   - Source: AI_SOLUTIONS_STORE
   - Project: FOR_THE_KIDS
   - Charity (60%): $119.40
   - Infrastructure (30%): $59.70
   - Founder (10%): $19.90

2. **Creates Profit Allocation** with hash chain
   - Status: PENDING → PROCESSING → COMPLETED
   - Hash: SHA-256 cryptographic proof
   - Immutable ledger entry

3. **Executes Allocations** (logged, not yet automated)
   - 60% → ebaytrashortreasure@gmail.com (Charity)
   - 30% → ebaytrashortreasure@gmail.com (Infrastructure)
   - 10% → ebaytrashortreasure@gmail.com (Founder)

### Step 5: Response

Server responds with 200 OK and allocation details:

```json
{
  "received": true,
  "transactionId": "tx_abc123",
  "allocationId": "alloc_xyz789",
  "hash": "a1b2c3d4e5f6..."
}
```

---

## Security Features

### 1. HMAC-SHA256 Signature Verification

Every webhook request MUST include a valid signature in the `x-square-hmacsha256-signature` header.

**Algorithm:**
```javascript
const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
hmac.update(requestBody);
const hash = hmac.digest('base64');
// Compare hash with signature header
```

### 2. Webhook Secret Validation

The server will NOT start if `SQUARE_AI_STORE_WEBHOOK_SECRET` is missing in production.

**Startup Check:**
```javascript
if (isProduction && !SQUARE_AI_STORE_WEBHOOK_SECRET) {
  console.error('CRITICAL SECURITY ERROR: Missing webhook secret');
  process.exit(1); // Prevent server startup
}
```

### 3. IP Whitelisting (Recommended)

Square webhooks come from specific IP ranges. Consider adding IP validation:

```javascript
const SQUARE_IPS = [
  '35.184.239.130',
  '35.224.94.197',
  // Add other Square IPs
];

if (!SQUARE_IPS.includes(req.ip)) {
  return res.status(403).json({ error: 'Forbidden IP' });
}
```

### 4. Idempotency

Webhooks may be delivered multiple times. The system uses `squarePaymentId` in metadata to prevent duplicate processing.

---

## Testing

### Test with Script

```powershell
# Run setup with test flag (may not work in production API)
.\setup-ai-store-webhook.ps1 -Test
```

### Test with Square Dashboard

1. Go to [Square Developer Dashboard](https://developer.squareup.com/)
2. Navigate to Webhooks → Subscriptions
3. Find your webhook subscription
4. Click "Send Test Event"
5. Check server logs for webhook receipt

### Test with Real Payment

Create a test payment link:

```powershell
# Use existing Square payment link for AI Solutions Store
# Watch server logs for webhook delivery
```

### Manual Webhook Test

Use curl or PowerShell to simulate a webhook:

```powershell
$body = @{
  type = "payment.created"
  data = @{
    object = @{
      payment = @{
        id = "test_payment_123"
        status = "COMPLETED"
        amount_money = @{
          amount = 19900
          currency = "USD"
        }
        location_id = "LY5GN09F5AN83"
      }
    }
  }
} | ConvertTo-Json -Depth 10

$signature = # Generate HMAC signature with webhook secret

Invoke-RestMethod -Uri "https://combination-pay-resulted-drill.trycloudflare.com/api/webhooks/ai-store" `
  -Method POST `
  -Body $body `
  -Headers @{
    "x-square-hmacsha256-signature" = $signature
    "content-type" = "application/json"
  }
```

---

## Monitoring

### Check Webhook Logs

```powershell
# SSH to T5500 (API server)
ssh t5500

# Check API logs
cd C:\AiCollabForTheKids\api
type combined.log | findstr "AI STORE"
type error.log | findstr "WEBHOOK ERROR"
```

### View in Square Dashboard

1. Go to [Square Developer Dashboard](https://developer.squareup.com/)
2. Click on your application
3. Navigate to Webhooks → Event Log
4. View delivery status, attempts, and responses

### Database Verification

Check that transactions are being recorded:

```sql
-- Connect to PostgreSQL
psql -U postgres -d for_the_kids

-- View recent AI Store transactions
SELECT * FROM "Transaction"
WHERE source = 'AI_SOLUTIONS_STORE'
ORDER BY "createdAt" DESC
LIMIT 10;

-- View profit allocations
SELECT * FROM "ProfitAllocation"
ORDER BY "createdAt" DESC
LIMIT 10;
```

---

## Troubleshooting

### Webhook Not Receiving Events

1. **Check Cloudflare Tunnel**
   ```powershell
   # Verify tunnel is running on T5500
   ssh t5500
   cloudflared tunnel info
   ```

2. **Check API Server**
   ```powershell
   # Verify server is running
   ssh t5500
   netstat -an | findstr ":3000"
   ```

3. **Verify Webhook URL**
   ```powershell
   # List webhooks
   .\setup-ai-store-webhook.ps1
   ```

### Signature Verification Failing

1. **Check Webhook Secret**
   - Ensure `SQUARE_AI_STORE_WEBHOOK_SECRET` matches Square Dashboard
   - No extra spaces or newlines

2. **Check Request Body**
   - Signature is computed on RAW request body
   - Do NOT parse JSON before verification

3. **Check Header Name**
   - Must be: `x-square-hmacsha256-signature`
   - Case-sensitive!

### Payment Not Creating Transaction

1. **Check Payment Status**
   - Only COMPLETED payments trigger allocation
   - PENDING payments are logged but not processed

2. **Check Logs**
   ```powershell
   ssh t5500
   cd C:\AiCollabForTheKids\api
   type combined.log | findstr "payment.created"
   ```

3. **Check Database Connection**
   - Verify Prisma can connect to PostgreSQL
   - Check DATABASE_URL in .env

---

## Webhook Management

### List All Webhooks

```powershell
.\setup-ai-store-webhook.ps1
```

Output:
```
ID: wbhk_abc123
Name: AI Solutions Store Delivery
URL: https://combination-pay-resulted-drill.trycloudflare.com/api/webhooks/ai-store
Enabled: true
Events: payment.created, payment.updated, order.created, order.updated, refund.created
```

### Delete Webhook

```powershell
.\setup-ai-store-webhook.ps1 -Delete -SubscriptionId "wbhk_abc123"
```

### Update Webhook (Delete + Recreate)

Square doesn't support PATCH on webhooks. To update:

```powershell
# 1. Delete existing
.\setup-ai-store-webhook.ps1 -Delete -SubscriptionId "wbhk_abc123"

# 2. Create new with updated config
.\setup-ai-store-webhook.ps1 -NotificationUrl "https://new-url.com/webhook"
```

### Rotate Signature Key (Delete + Recreate)

To rotate the signature key:

```powershell
# 1. Delete webhook
.\setup-ai-store-webhook.ps1 -Delete -SubscriptionId "wbhk_abc123"

# 2. Create new (gets new signature key)
.\setup-ai-store-webhook.ps1

# 3. Update .env with new signature key
# 4. Restart API server
```

---

## Gospel V1.3 Compliance

### Immutable Split (60/30/10)

The webhook handler enforces Gospel V1.3 on ALL payments:

```javascript
const splits = {
  charityAmount: (grossAmount * 0.60).toFixed(2),      // 60%
  infrastructureAmount: (grossAmount * 0.30).toFixed(2), // 30%
  founderAmount: (grossAmount * 0.10).toFixed(2)        // 10%
};
```

### Cryptographic Proof

Every allocation creates a SHA-256 hash chain:

```javascript
const hash = SHA256({
  transactionId,
  grossAmount,
  charityAmount,
  infrastructureAmount,
  founderAmount,
  timestamp,
  previousHash
});
```

This creates an **immutable ledger** that cannot be altered without detection.

### Transparency

All allocations are logged and stored in PostgreSQL:

```sql
-- View full allocation history
SELECT
  t.id,
  t.amount,
  t.source,
  pa."charityAmount",
  pa."infrastructureAmount",
  pa."founderAmount",
  pa.hash,
  t."createdAt"
FROM "Transaction" t
JOIN "ProfitAllocation" pa ON pa."transactionId" = t.id
WHERE t.source = 'AI_SOLUTIONS_STORE'
ORDER BY t."createdAt" DESC;
```

---

## API Reference

### Webhook Endpoint

```
POST /api/webhooks/ai-store
```

**Headers:**
- `x-square-hmacsha256-signature` (required) - HMAC signature
- `content-type: application/json` (required)

**Request Body:**
```json
{
  "merchant_id": "MLMRKXWVVSNR9",
  "type": "payment.created",
  "event_id": "evt_xyz",
  "created_at": "2025-12-21T12:00:00Z",
  "data": {
    "type": "payment",
    "id": "pay_abc123",
    "object": {
      "payment": {
        "id": "pay_abc123",
        "status": "COMPLETED",
        "amount_money": {
          "amount": 19900,
          "currency": "USD"
        },
        "location_id": "LY5GN09F5AN83",
        "order_id": "order_xyz",
        "receipt_url": "https://squareup.com/receipt/..."
      }
    }
  }
}
```

**Response (Success):**
```json
{
  "received": true,
  "transactionId": "tx_12345",
  "allocationId": "alloc_67890",
  "hash": "a1b2c3d4e5f6..."
}
```

**Response (Pending):**
```json
{
  "received": true,
  "status": "pending"
}
```

**Response (Error):**
```json
{
  "error": "Forbidden",
  "message": "Invalid webhook signature"
}
```

---

## File Locations

| File | Purpose |
|------|---------|
| `C:\AiCollabForTheKids\scripts\setup-ai-store-webhook.ps1` | Webhook registration script |
| `C:\AiCollabForTheKids\api\routes\webhooks.js` | Webhook handler implementation |
| `C:\AiCollabForTheKids\api\.env` | Webhook secret configuration |
| `C:\AiCollabForTheKids\scripts\webhook-env-update.txt` | Generated .env variables |
| `C:\AiCollabForTheKids\scripts\webhook-response.json` | Full API response |

---

## Support

### Square Developer Dashboard
- https://developer.squareup.com/
- Webhooks → Subscriptions
- Webhooks → Event Log

### Square API Documentation
- [Webhooks Overview](https://developer.squareup.com/docs/webhooks/overview)
- [Webhook Subscriptions API](https://developer.squareup.com/reference/square/webhook-subscriptions-api)
- [Event Types Reference](https://developer.squareup.com/docs/webhooks/v2webhook-events-tech-ref)

### Internal Documentation
- `GOSPEL.md` - Revenue split rules (60/30/10)
- `FLEET-STATUS.md` - System status
- `api/routes/webhooks.js` - Handler source code

---

## FOR THE KIDS

Every payment through this webhook contributes to Gospel V1.3:
- **60%** → Verified Pediatric Charities
- **30%** → Infrastructure
- **10%** → Founder

**Immutable. Transparent. FOR THE KIDS.**
