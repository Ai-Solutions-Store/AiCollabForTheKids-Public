# AI Solutions Store - Square Webhook Setup Summary

## Status: Ready to Deploy

All scripts and webhook handlers have been created and are ready to use for the AI Solutions Store.

---

## Files Created

### 1. Webhook Registration Script
**File:** `C:\AiCollabForTheKids\scripts\setup-ai-store-webhook.ps1`

Creates a new Square webhook subscription for AI Solutions Store payments.

**Usage:**
```powershell
# Create webhook
.\setup-ai-store-webhook.ps1

# Delete webhook
.\setup-ai-store-webhook.ps1 -Delete -SubscriptionId "wbhk_xxxxx"

# Custom URL
.\setup-ai-store-webhook.ps1 -NotificationUrl "https://your-domain.com/webhook"
```

**Features:**
- Creates webhook subscription via Square API
- Outputs signature key for verification
- Saves credentials to webhook-env-update.txt
- Validates existing webhooks before creating duplicates

### 2. Webhook Handler (Updated Existing File)
**File:** `C:\AiCollabForTheKids\api\routes\webhooks.js`

Added new route: `POST /api/webhooks/ai-store`

**Features:**
- HMAC-SHA256 signature verification (mandatory)
- Handles payment.created, payment.updated events
- Handles order.created, order.updated events
- Handles refund.created events
- Executes Gospel V1.3 (60/30/10) profit allocation
- Creates immutable hash chain ledger
- Records transactions in PostgreSQL

### 3. Webhook Test Script
**File:** `C:\AiCollabForTheKids\scripts\test-ai-store-webhook.ps1`

Tests the webhook endpoint with simulated Square events.

**Usage:**
```powershell
# Test with default $199 payment
.\test-ai-store-webhook.ps1

# Test with custom amount
.\test-ai-store-webhook.ps1 -Amount 9900  # $99.00

# Test without signature (should fail)
.\test-ai-store-webhook.ps1 -NoSignature

# Test with invalid signature (should fail)
.\test-ai-store-webhook.ps1 -InvalidSignature
```

### 4. Webhook List Script
**File:** `C:\AiCollabForTheKids\scripts\list-square-webhooks.ps1`

Lists all Square webhook subscriptions for the account.

**Usage:**
```powershell
# List all webhooks
.\list-square-webhooks.ps1

# Show full details including signature keys
.\list-square-webhooks.ps1 -Detailed

# Output as JSON
.\list-square-webhooks.ps1 -Json
```

### 5. Documentation
**File:** `C:\AiCollabForTheKids\scripts\README-AI-STORE-WEBHOOK.md`

Comprehensive documentation covering:
- Setup instructions
- Payment processing flow
- Security features
- Testing procedures
- Troubleshooting guide
- API reference
- Gospel V1.3 compliance details

---

## Current Webhook Status

### Existing Webhook (DAO Dating)
- **ID:** wbhk_fbce2205cc5b418bac63a15bf9e1e5be
- **Name:** DAO Dating Stream
- **URL:** https://dao.youandinotai.com/webhook/square-dating
- **Status:** Active
- **Events:** payment.created, payment.updated, refund.created, refund.updated, subscription.created, subscription.updated, invoice.payment_made

### New Webhook (AI Store) - Not Yet Created
You need to run the setup script to create this webhook.

---

## Deployment Steps

### Step 1: Create Webhook Subscription

```powershell
cd C:\AiCollabForTheKids\scripts
.\setup-ai-store-webhook.ps1
```

This will:
1. Check for existing webhooks
2. Create new webhook subscription
3. Output the signature key
4. Save credentials to webhook-env-update.txt

### Step 2: Add Credentials to .env

Copy the output from webhook-env-update.txt to `C:\AiCollabForTheKids\api\.env`:

```bash
SQUARE_AI_STORE_WEBHOOK_SECRET=your_signature_key_here
SQUARE_AI_STORE_WEBHOOK_ID=wbhk_xxxxx
SQUARE_AI_STORE_WEBHOOK_URL=https://combination-pay-resulted-drill.trycloudflare.com/api/webhooks/ai-store
```

### Step 3: Verify Webhook Handler

The webhook handler is already implemented in `api/routes/webhooks.js`. Verify it's included in the server:

```bash
# The route is already registered in api/server.js
app.use('/api/webhooks', webhookRoutes);
```

### Step 4: Restart API Server

```powershell
# On T5500 (where API runs)
ssh t5500
cd C:\AiCollabForTheKids\api
npm restart
```

### Step 5: Test Webhook

```powershell
# Run test script
cd C:\AiCollabForTheKids\scripts
.\test-ai-store-webhook.ps1
```

Or test with a real payment using Square payment links.

---

## Configuration

### Square Account Details
- **Account:** ebaytrashortreasure@gmail.com
- **Access Token:** EAAAl8Pw2wm_0UfULPe5YdBdWWSnOC2WifHYbAoxk7BQndbM2K-UDAD74Es1Nya8
- **Location ID:** LY5GN09F5AN83
- **Application ID:** sq0idp-S-hDhQCZ4xPGWa5chaTZfQ

### Webhook Configuration
- **Notification URL:** https://combination-pay-resulted-drill.trycloudflare.com/api/webhooks/ai-store
- **Events Subscribed:**
  - payment.created
  - payment.updated
  - order.created
  - order.updated
  - refund.created
- **API Version:** 2025-10-16

---

## Security Features

### 1. HMAC-SHA256 Signature Verification
Every webhook request must include a valid signature in the `x-square-hmacsha256-signature` header.

### 2. Mandatory Secret Validation
The API server will not start if the webhook secret is missing in production.

### 3. Request Validation
- Missing signature → 403 Forbidden
- Invalid signature → 403 Forbidden
- Missing webhook secret → 500 Server Error

### 4. Idempotency
Uses `squarePaymentId` in transaction metadata to prevent duplicate processing.

---

## Payment Processing Flow

1. **Customer Purchases** → Square processes payment on ai-solutions.store
2. **Webhook Sent** → Square sends payment.created event to your server
3. **Signature Verified** → Server validates HMAC-SHA256 signature
4. **Payment Checked** → Only process if status = COMPLETED
5. **Gospel Split Calculated** → 60/30/10 allocation computed
6. **Transaction Created** → Record in PostgreSQL with metadata
7. **Profit Allocated** → Execute charity/infra/founder splits
8. **Hash Chain Updated** → Create cryptographic proof
9. **Response Sent** → Return transaction ID and hash to Square

---

## Gospel V1.3 Compliance

Every payment through AI Solutions Store automatically executes the immutable 60/30/10 split:

### Example: $199 Payment
- **Gross:** $199.00
- **Charity (60%):** $119.40 → ebaytrashortreasure@gmail.com
- **Infrastructure (30%):** $59.70 → ebaytrashortreasure@gmail.com
- **Founder (10%):** $19.90 → ebaytrashortreasure@gmail.com

All allocations are:
- Logged in server console
- Recorded in PostgreSQL
- Cryptographically hashed (SHA-256)
- Linked in immutable chain
- Transparent and auditable

---

## Monitoring

### View Webhook Logs
```powershell
ssh t5500
cd C:\AiCollabForTheKids\api
type combined.log | findstr "AI STORE"
```

### View Square Dashboard
1. Go to [Square Developer Dashboard](https://developer.squareup.com/)
2. Navigate to Webhooks → Event Log
3. View delivery status and responses

### Query Database
```sql
SELECT * FROM "Transaction"
WHERE source = 'AI_SOLUTIONS_STORE'
ORDER BY "createdAt" DESC
LIMIT 10;
```

---

## Troubleshooting

### Webhook Not Receiving Events
1. Check Cloudflare tunnel is running on T5500
2. Verify API server is listening on port 3000
3. Check webhook URL in Square Dashboard

### Signature Verification Failing
1. Verify SQUARE_AI_STORE_WEBHOOK_SECRET in .env
2. Ensure no extra spaces or newlines in secret
3. Check header name is exactly: `x-square-hmacsha256-signature`

### Payment Not Creating Transaction
1. Check payment status is COMPLETED
2. View server logs for errors
3. Verify database connection

---

## Next Steps

1. **Run Setup Script** → Create webhook subscription
2. **Add Credentials** → Update api/.env
3. **Restart Server** → Apply changes
4. **Test Webhook** → Verify it works
5. **Make Test Payment** → Verify end-to-end flow
6. **Monitor Logs** → Ensure Gospel split executes

---

## Resources

### Square API Documentation
- [Webhooks Overview](https://developer.squareup.com/docs/webhooks/overview)
- [Webhook Subscriptions API](https://developer.squareup.com/reference/square/webhook-subscriptions-api)
- [Event Types Reference](https://developer.squareup.com/docs/webhooks/v2webhook-events-tech-ref)

### Internal Files
- `scripts/setup-ai-store-webhook.ps1` - Registration script
- `scripts/test-ai-store-webhook.ps1` - Test script
- `scripts/list-square-webhooks.ps1` - List script
- `scripts/README-AI-STORE-WEBHOOK.md` - Full documentation
- `api/routes/webhooks.js` - Handler implementation

---

## FOR THE KIDS

Every payment processed through this webhook contributes to Gospel V1.3:
- **60%** → Verified Pediatric Charities
- **30%** → Infrastructure
- **10%** → Founder

**Immutable. Transparent. FOR THE KIDS.**
