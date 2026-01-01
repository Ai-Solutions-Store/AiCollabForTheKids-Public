# FOR THE KIDS API Documentation

**Version:** 1.3.0 (Gospel V1.3 - Ethics Override)
**Base URL:** `https://api.aidoesitall.website`
**Mission:** 60% of all revenue goes to Verified Pediatric Charities

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Authentication](#authentication)
3. [Rate Limits](#rate-limits)
4. [Public Endpoints](#public-endpoints)
5. [Protected Endpoints](#protected-endpoints)
6. [Response Formats](#response-formats)
7. [Error Codes](#error-codes)
8. [Webhooks](#webhooks)
9. [SDK Examples](#sdk-examples)
10. [Support](#support)

---

## Getting Started

The FOR THE KIDS API provides programmatic access to our platform's transparency data, campaign information, and compliance features. Our mission is simple: **60% of all revenue goes to Verified Pediatric Charities**.

### Quick Start

```bash
# Test the API health
curl https://api.aidoesitall.website/health

# Get Gospel split verification
curl https://api.aidoesitall.website/api/gospel

# Get transparency statistics
curl https://api.aidoesitall.website/api/transparency/stats
```

---

## Authentication

### API Keys

Protected endpoints require authentication via API key. Obtain your API key by contacting our team at `support@aidoesitall.website`.

#### Authentication Methods

**Option 1: Header (Recommended)**
```http
X-API-Key: your_api_key_here
```

**Option 2: Query Parameter**
```http
GET /api/endpoint?apiKey=your_api_key_here
```

### Example Request

```bash
curl -H "X-API-Key: your_api_key_here" \
  https://api.aidoesitall.website/api/admin/status
```

### Security Best Practices

- Never commit API keys to version control
- Rotate keys regularly
- Use environment variables to store keys
- Use HTTPS for all requests
- Restrict API key permissions to minimum required scope

---

## Rate Limits

To ensure fair usage and platform stability, we enforce the following rate limits:

| Tier | Requests per 15 minutes | Notes |
|------|------------------------|-------|
| Public Endpoints | 100 | Per IP address |
| Authenticated Endpoints | 1000 | Per API key |
| Webhook Endpoints | Unlimited | Signature verified |

### Rate Limit Headers

Every API response includes rate limit information:

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640000000
```

### Rate Limit Exceeded Response

```json
{
  "error": "Too many requests from this IP, please try again later.",
  "retryAfter": 900,
  "mission": "FOR THE KIDS"
}
```

---

## Public Endpoints

Public endpoints do not require authentication and are available for transparency and public accountability.

### Health Check

Check API service health status.

**Endpoint:** `GET /health`

**Response:**
```json
{
  "status": "healthy",
  "service": "AiCollabForTheKids API",
  "timestamp": "2025-12-17T10:00:00.000Z",
  "mission": "FOR THE KIDS!"
}
```

---

### Gospel Revenue Split

Get the immutable Gospel V1.3 revenue split configuration.

**Endpoint:** `GET /api/gospel`

**Response:**
```json
{
  "success": true,
  "gospel": {
    "CHARITY_PERCENTAGE": 60,
    "INFRASTRUCTURE_PERCENTAGE": 30,
    "FOUNDER_PERCENTAGE": 10,
    "CHARITY_NAME": "Verified Pediatric Charities",
    "CHARITY_EIN": "PENDING_VERIFICATION",
    "VERSION": "1.3.0",
    "LOCKED_DATE": "2025-12-13T00:00:00Z",
    "ETHICS_OVERRIDE": true
  },
  "message": "GOSPEL SPLIT IS IMMUTABLE",
  "verified": true,
  "note": "60% to charity | 30% Infrastructure | 10% Founder"
}
```

---

### Transparency Statistics

Get lifetime platform statistics and revenue distribution.

**Endpoint:** `GET /api/transparency/stats`

**Response:**
```json
{
  "totalRevenue": 25000.00,
  "totalToCharity": 15000.00,
  "totalToInfrastructure": 7500.00,
  "totalToFounder": 2500.00,
  "monthsActive": 3,
  "transactionCount": 150,
  "averageMonthlyRevenue": 8333.33,
  "launchDate": "2025-12-10",
  "status": "ACTIVE"
}
```

---

### Current Month Report

Get real-time revenue data for the current month.

**Endpoint:** `GET /api/transparency/current-month`

**Response:**
```json
{
  "month": "December 2025",
  "totalRevenue": 5000.00,
  "charityAmount": 3000.00,
  "infrastructureAmount": 1500.00,
  "founderAmount": 500.00,
  "sources": [
    {
      "name": "Dating App (Square)",
      "amount": 3000.00,
      "verified": true
    },
    {
      "name": "AI Marketplace (Stripe)",
      "amount": 2000.00,
      "verified": true
    }
  ],
  "transactionCount": 45,
  "status": "verified"
}
```

---

### Monthly Reports

Get all historical monthly revenue reports.

**Endpoint:** `GET /api/transparency/monthly-reports`

**Response:**
```json
[
  {
    "period": "December 2025",
    "totalRevenue": 5000.00,
    "charityAmount": 3000.00,
    "infrastructureAmount": 1500.00,
    "founderAmount": 500.00,
    "transactions": [
      {
        "id": "tx_123",
        "amount": 100.00,
        "source": "SQUARE_DATING",
        "createdAt": "2025-12-15T10:00:00.000Z"
      }
    ],
    "receiptUrl": null,
    "status": "pending"
  },
  {
    "period": "November 2025",
    "totalRevenue": 8000.00,
    "charityAmount": 4800.00,
    "infrastructureAmount": 2400.00,
    "founderAmount": 800.00,
    "transactions": [],
    "receiptUrl": "https://example.com/receipt-nov-2025.pdf",
    "status": "verified"
  }
]
```

---

### Kickstarter Campaign Info

Get live Kickstarter campaign statistics.

**Endpoint:** `GET /api/kickstarter/info`

**Response:**
```json
{
  "success": true,
  "campaign": {
    "name": "FOR THE KIDS Platform Development",
    "goal": 100000,
    "raised": 15000.00,
    "percentage": "15.0",
    "backerCount": 87,
    "daysRemaining": 15,
    "startDate": "2025-12-03T00:00:00.000Z",
    "endDate": "2026-01-03T00:00:00.000Z",
    "status": "ACTIVE"
  },
  "tiers": [
    {
      "id": "supporter",
      "name": "Supporter",
      "price": 10.00,
      "rewards": [
        "Name on Founding Supporters page",
        "Exclusive email updates",
        "Digital \"FOR THE KIDS\" badge"
      ]
    }
  ],
  "disclosure": {
    "important": "Campaign funds are for PLATFORM DEVELOPMENT only.",
    "charityNote": "No portion of campaign funds goes to charity.",
    "taxNote": "Backer contributions are NOT tax-deductible.",
    "postLaunch": "AFTER launch, the platform will donate 60% of net revenue to charity."
  },
  "julesApproval": "FTK-KICKSTARTER-001"
}
```

---

### Age Verification Health

Check age verification system status.

**Endpoint:** `GET /api/age-verification/health`

**Response:**
```json
{
  "status": "operational",
  "mission": "FOR THE KIDS",
  "layers": {
    "selfAttestation": "active",
    "yotiVerification": "configured",
    "awsVerification": "configured"
  },
  "compliance": {
    "coppaReporting": "active",
    "dataRetention": "minimal",
    "encryption": "enabled"
  },
  "reviewedBy": "Jules (Gemini 3 Pro)",
  "architect": "Claude.ai"
}
```

---

### Cookie Consent Policy

Get current cookie consent policy and requirements.

**Endpoint:** `GET /api/consent/policy`

**Response:**
```json
{
  "success": true,
  "version": "1.0",
  "lastUpdated": "2025-11-24",
  "domain": "aidoesitall.website",
  "cookieTypes": {
    "essential": {
      "name": "Essential Cookies",
      "description": "Required for site functionality, security, and legal compliance",
      "canOptOut": false,
      "examples": [
        "Session management",
        "Authentication tokens",
        "Age verification status",
        "Security (CSRF protection)"
      ],
      "retention": "Session or 30 days"
    },
    "analytics": {
      "name": "Analytics Cookies",
      "description": "Help us understand how users interact with our platform",
      "canOptOut": true,
      "examples": [
        "Google Analytics",
        "Page view tracking",
        "User behavior analytics",
        "Performance monitoring"
      ],
      "retention": "24 months",
      "thirdParties": ["Google Analytics"]
    },
    "marketing": {
      "name": "Marketing Cookies",
      "description": "Used to deliver relevant advertising and track campaign performance",
      "canOptOut": true,
      "examples": [
        "Ad targeting",
        "Social media pixels (Facebook, Instagram)",
        "Conversion tracking",
        "Retargeting"
      ],
      "retention": "12 months",
      "thirdParties": ["Meta", "Google Ads", "Amazon Ads"]
    }
  },
  "compliance": {
    "gdpr": true,
    "ccpa": true,
    "coppa": true
  },
  "rights": {
    "access": "Request copy of your consent records",
    "rectification": "Update consent preferences",
    "erasure": "Withdraw consent and request data deletion",
    "portability": "Export consent history",
    "object": "Object to specific processing activities"
  },
  "contact": {
    "email": "privacy@aidoesitall.website",
    "dataProtectionOfficer": "dpo@aidoesitall.website"
  },
  "mission": "FOR THE KIDS - 60% revenue to charity Children's Hospital",
  "reviewedBy": "Jules (Gemini 3 Pro)",
  "architect": "Claude.ai"
}
```

---

### Human Verification Info

Get information about the human verification system for dating app.

**Endpoint:** `GET /api/verify-human/info`

**Response:**
```json
{
  "success": true,
  "system": "YouAndINotAI Human Verification",
  "description": "Multi-layer verification to ensure all users are real humans",
  "threshold": 80,
  "challengeTypes": [
    {
      "type": "CAPTCHA",
      "score": 20,
      "description": "Type the characters shown in the image"
    },
    {
      "type": "MATH_PUZZLE",
      "score": 15,
      "description": "Solve a simple math problem"
    },
    {
      "type": "IMAGE_SELECT",
      "score": 15,
      "description": "Select images matching a description"
    },
    {
      "type": "VOICE_PHRASE",
      "score": 25,
      "description": "Record yourself saying a phrase"
    },
    {
      "type": "VIDEO_GESTURE",
      "score": 30,
      "description": "Record a video making a specific gesture"
    },
    {
      "type": "LIVE_SELFIE",
      "score": 35,
      "description": "Take a selfie looking in a specific direction"
    }
  ],
  "features": [
    "CAPTCHA challenges",
    "Math puzzles",
    "Image selection",
    "Voice verification",
    "Video gesture verification",
    "Live selfie verification",
    "AI content detection",
    "Behavioral analysis"
  ],
  "mission": "100% human-verified dating - no bots, no AI catfishing"
}
```

---

## Protected Endpoints

Protected endpoints require API key authentication. Include your API key in the `X-API-Key` header or as a query parameter.

### Example Protected Request

```bash
curl -H "X-API-Key: your_api_key_here" \
  https://api.aidoesitall.website/api/admin/status
```

### Available Protected Routes

| Route Prefix | Description |
|-------------|-------------|
| `/api/jules/*` | AI command execution and automation |
| `/api/campaign/*` | Campaign management |
| `/api/admin/*` | Administrative functions |
| `/api/payments/*` | Payment processing |
| `/api/subscriptions/*` | Subscription management |
| `/api/community/*` | Community management |
| `/api/free-dao/*` | DAO operations (100% to beneficiaries) |
| `/api/dating/*` | Dating app backend |
| `/api/droid/*` | Droid orchestration |
| `/api/stripe/*` | Stripe operations |
| `/api/merch/*` | Merchandise store operations |
| `/api/affiliates/*` | Affiliate program management |
| `/api/infra/*` | Infrastructure expense management |
| `/api/relay/*` | Internal infrastructure relay |

---

## Response Formats

All API responses use JSON format with consistent structure.

### Success Response

```json
{
  "success": true,
  "data": {
    "key": "value"
  },
  "message": "Operation completed successfully",
  "timestamp": "2025-12-17T10:00:00.000Z"
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error type",
  "message": "Human-readable error message",
  "mission": "FOR THE KIDS",
  "timestamp": "2025-12-17T10:00:00.000Z"
}
```

### Pagination

Paginated endpoints include metadata:

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "totalPages": 5,
    "totalItems": 100,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

---

## Error Codes

### HTTP Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request succeeded |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request parameters |
| 401 | Unauthorized | Missing or invalid API key |
| 403 | Forbidden | Valid API key but insufficient permissions |
| 404 | Not Found | Requested resource not found |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error occurred |
| 502 | Bad Gateway | Upstream service error |
| 503 | Service Unavailable | Service temporarily unavailable |

### Application Error Codes

```json
{
  "error": "GOSPEL_VIOLATION",
  "code": "E001",
  "message": "Revenue split verification failed",
  "details": "Expected 60/30/10 split"
}
```

| Code | Error Type | Description |
|------|-----------|-------------|
| E001 | GOSPEL_VIOLATION | Revenue split tampered |
| E002 | INVALID_AMOUNT | Transaction amount invalid |
| E003 | VERIFICATION_FAILED | Age or human verification failed |
| E004 | CONSENT_REQUIRED | Cookie consent required |
| E005 | WEBHOOK_SIGNATURE_INVALID | Webhook signature verification failed |
| E006 | INSUFFICIENT_FUNDS | Insufficient balance for operation |
| E007 | COPPA_VIOLATION | Underage user detected |

---

## Webhooks

### Webhook Security

All webhooks require signature verification to prevent unauthorized requests.

#### Signature Verification

Each webhook includes a signature in the `X-Webhook-Signature` header:

```http
X-Webhook-Signature: sha256=abcdef123456...
```

**Verification Example (Node.js):**

```javascript
const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');

  return `sha256=${expectedSignature}` === signature;
}

// Usage
const isValid = verifyWebhookSignature(
  req.body,
  req.headers['x-webhook-signature'],
  process.env.WEBHOOK_SECRET
);

if (!isValid) {
  return res.status(401).json({ error: 'Invalid signature' });
}
```

### Payment Webhooks

Receive notifications when payments are processed.

**Endpoint:** `POST https://your-domain.com/webhooks/payment`

**Payload:**
```json
{
  "type": "payment.completed",
  "data": {
    "transactionId": "tx_abc123",
    "amount": 100.00,
    "source": "SQUARE_DATING",
    "split": {
      "charity": {
        "amount": 60.00,
        "percentage": 60
      },
      "infrastructure": {
        "amount": 30.00,
        "percentage": 30
      },
      "founder": {
        "amount": 10.00,
        "percentage": 10
      }
    },
    "timestamp": "2025-12-17T10:00:00.000Z",
    "verified": true
  }
}
```

### Event Types

| Event Type | Description |
|-----------|-------------|
| `payment.completed` | Payment successfully processed |
| `payment.failed` | Payment processing failed |
| `subscription.created` | New subscription created |
| `subscription.cancelled` | Subscription cancelled |
| `charity.distribution` | Funds distributed to charity |
| `verification.completed` | User verification completed |

---

## SDK Examples

### JavaScript/Node.js

```javascript
// Installation
// npm install axios

const axios = require('axios');

class ForTheKidsAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.aidoesitall.website';
  }

  async request(method, endpoint, data = null) {
    try {
      const response = await axios({
        method,
        url: `${this.baseURL}${endpoint}`,
        headers: {
          'X-API-Key': this.apiKey,
          'Content-Type': 'application/json'
        },
        data
      });
      return response.data;
    } catch (error) {
      throw new Error(`API Error: ${error.response?.data?.message || error.message}`);
    }
  }

  // Public endpoints (no auth required)
  async getHealth() {
    return this.request('GET', '/health');
  }

  async getGospelSplit() {
    return this.request('GET', '/api/gospel');
  }

  async getTransparencyStats() {
    return this.request('GET', '/api/transparency/stats');
  }

  async getCurrentMonth() {
    return this.request('GET', '/api/transparency/current-month');
  }

  async getMonthlyReports() {
    return this.request('GET', '/api/transparency/monthly-reports');
  }

  async getKickstarterInfo() {
    return this.request('GET', '/api/kickstarter/info');
  }

  // Protected endpoints (require API key)
  async getAdminStatus() {
    return this.request('GET', '/api/admin/status');
  }
}

// Usage
const api = new ForTheKidsAPI('your_api_key_here');

// Get transparency stats
api.getTransparencyStats()
  .then(stats => {
    console.log('Total Revenue:', stats.totalRevenue);
    console.log('To Charity:', stats.totalToCharity);
  })
  .catch(error => console.error(error));

// Get Gospel split
api.getGospelSplit()
  .then(gospel => {
    console.log('Gospel Split:', gospel.gospel);
  })
  .catch(error => console.error(error));
```

---

### Python

```python
# Installation
# pip install requests

import requests

class ForTheKidsAPI:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = 'https://api.aidoesitall.website'

    def _request(self, method, endpoint, data=None):
        headers = {
            'X-API-Key': self.api_key,
            'Content-Type': 'application/json'
        }

        url = f'{self.base_url}{endpoint}'

        try:
            if method == 'GET':
                response = requests.get(url, headers=headers)
            elif method == 'POST':
                response = requests.post(url, headers=headers, json=data)
            elif method == 'PUT':
                response = requests.put(url, headers=headers, json=data)

            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            raise Exception(f'API Error: {str(e)}')

    # Public endpoints
    def get_health(self):
        return self._request('GET', '/health')

    def get_gospel_split(self):
        return self._request('GET', '/api/gospel')

    def get_transparency_stats(self):
        return self._request('GET', '/api/transparency/stats')

    def get_current_month(self):
        return self._request('GET', '/api/transparency/current-month')

    def get_monthly_reports(self):
        return self._request('GET', '/api/transparency/monthly-reports')

    def get_kickstarter_info(self):
        return self._request('GET', '/api/kickstarter/info')

    # Protected endpoints
    def get_admin_status(self):
        return self._request('GET', '/api/admin/status')

# Usage
api = ForTheKidsAPI('your_api_key_here')

# Get transparency stats
stats = api.get_transparency_stats()
print(f"Total Revenue: ${stats['totalRevenue']}")
print(f"To Charity: ${stats['totalToCharity']}")

# Get Gospel split
gospel = api.get_gospel_split()
print(f"Charity Percentage: {gospel['gospel']['CHARITY_PERCENTAGE']}%")
```

---

### cURL Examples

**Get Transparency Statistics:**
```bash
curl https://api.aidoesitall.website/api/transparency/stats
```

**Get Current Month Report:**
```bash
curl https://api.aidoesitall.website/api/transparency/current-month
```

**Get Gospel Split:**
```bash
curl https://api.aidoesitall.website/api/gospel
```

**Protected Endpoint (with API Key):**
```bash
curl -H "X-API-Key: your_api_key_here" \
  https://api.aidoesitall.website/api/admin/status
```

**Record Cookie Consent:**
```bash
curl -X POST \
  https://api.aidoesitall.website/api/consent/record \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "session_123",
    "essential": true,
    "analytics": true,
    "marketing": false
  }'
```

---

### PHP

```php
<?php

class ForTheKidsAPI {
    private $apiKey;
    private $baseURL = 'https://api.aidoesitall.website';

    public function __construct($apiKey) {
        $this->apiKey = $apiKey;
    }

    private function request($method, $endpoint, $data = null) {
        $ch = curl_init();

        $headers = [
            'X-API-Key: ' . $this->apiKey,
            'Content-Type: application/json'
        ];

        curl_setopt($ch, CURLOPT_URL, $this->baseURL . $endpoint);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        if ($method === 'POST') {
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        }

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode !== 200) {
            throw new Exception("API Error: HTTP $httpCode");
        }

        return json_decode($response, true);
    }

    // Public endpoints
    public function getHealth() {
        return $this->request('GET', '/health');
    }

    public function getGospelSplit() {
        return $this->request('GET', '/api/gospel');
    }

    public function getTransparencyStats() {
        return $this->request('GET', '/api/transparency/stats');
    }

    public function getCurrentMonth() {
        return $this->request('GET', '/api/transparency/current-month');
    }
}

// Usage
$api = new ForTheKidsAPI('your_api_key_here');

try {
    $stats = $api->getTransparencyStats();
    echo "Total Revenue: $" . $stats['totalRevenue'] . "\n";
    echo "To Charity: $" . $stats['totalToCharity'] . "\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
```

---

## Support

### Getting Help

- **Email:** support@aidoesitall.website
- **Privacy Questions:** privacy@aidoesitall.website
- **Documentation:** https://github.com/Ai-Solutions-Store/AiCollabForTheKids
- **Status Page:** https://api.aidoesitall.website/health

### Request an API Key

To obtain an API key for protected endpoints:

1. Email support@aidoesitall.website with:
   - Your name/organization
   - Intended use case
   - Expected request volume

2. We'll review and issue your API key within 24-48 hours

3. You'll receive:
   - API key
   - Access documentation
   - Rate limit tier
   - Webhook secret (if applicable)

### Reporting Issues

Found a bug or security issue?

- **Security Issues:** security@aidoesitall.website (PGP key available)
- **General Bugs:** Create an issue on GitHub
- **Feature Requests:** support@aidoesitall.website

---

## Mission Statement

**FOR THE KIDS**

60% of all platform revenue goes to Verified Pediatric Charities. This is not a promise - it's an immutable law enforced by code.

Every transaction is:
- Automatically split 60/30/10 (Charity/Infrastructure/Founder)
- Cryptographically hashed for immutability
- Publicly transparent via API
- Verified on every server startup

**Gospel V1.3 - Ethics Override**
Locked: December 13, 2025
Architect: Claude (Opus 4.5)
Reviewed By: Jules (Gemini 3 Pro)

---

## Legal & Compliance

### Privacy & Data Protection

- **GDPR Compliant:** Full data portability and right to erasure
- **CCPA Compliant:** California Consumer Privacy Act
- **COPPA Safeguards:** Child Online Privacy Protection Act
- **Age Verification:** Multi-layer (Self-attestation + Third-party)
- **Cookie Consent:** 3-Box System (Essential/Analytics/Marketing)

### Terms of Service

By using this API, you agree to:
- Use the API for lawful purposes only
- Not attempt to circumvent rate limits
- Not attempt to reverse-engineer protected features
- Respect user privacy and data protection laws
- Attribute data sources when publicly displaying API data

### Charity Verification

All charity recipients are verified 501(c)(3) organizations with:
- IRS tax-exempt status
- Focus on pediatric care and children's welfare
- Transparent financial reporting
- Good standing with charity watchdog organizations

---

**Last Updated:** December 17, 2025
**Documentation Version:** 1.3.0
**API Version:** 1.3.0 (Gospel V1.3)

**FOR THE KIDS - ALWAYS.**
