# FOR THE KIDS API - Quick Reference Card

**Base URL:** `https://api.aidoesitall.website`
**Mission:** 60% of revenue to Verified Pediatric Charities

---

## Authentication

```bash
# Header (Recommended)
curl -H "X-API-Key: your_key" https://api.aidoesitall.website/api/endpoint

# Query Parameter
curl https://api.aidoesitall.website/api/endpoint?apiKey=your_key
```

---

## Quick Start (No Auth Required)

```bash
# Health Check
curl https://api.aidoesitall.website/health

# Gospel Split (60/30/10)
curl https://api.aidoesitall.website/api/gospel

# Transparency Stats
curl https://api.aidoesitall.website/api/transparency/stats

# Current Month Revenue
curl https://api.aidoesitall.website/api/transparency/current-month

# Monthly Reports
curl https://api.aidoesitall.website/api/transparency/monthly-reports

# Kickstarter Info
curl https://api.aidoesitall.website/api/kickstarter/info
```

---

## Rate Limits

| Tier | Limit | Window |
|------|-------|--------|
| Public | 100 requests | 15 minutes |
| Authenticated | 1000 requests | 15 minutes |

---

## Response Format

```json
{
  "success": true,
  "data": {},
  "message": "Success",
  "mission": "FOR THE KIDS"
}
```

---

## Common Endpoints

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/health` | GET | No | API health status |
| `/api/gospel` | GET | No | Gospel 60/30/10 split |
| `/api/transparency/stats` | GET | No | Lifetime statistics |
| `/api/transparency/current-month` | GET | No | Current month revenue |
| `/api/transparency/monthly-reports` | GET | No | All monthly reports |
| `/api/kickstarter/info` | GET | No | Campaign status |
| `/api/kickstarter/stats` | GET | No | Campaign stats |
| `/api/consent/policy` | GET | No | Cookie policy |
| `/api/verify-human/info` | GET | No | Verification system info |
| `/api/age-verification/health` | GET | No | Age verification status |

---

## SDK Installation

**JavaScript:**
```bash
npm install axios
```

**Python:**
```bash
pip install requests
```

---

## JavaScript Example

```javascript
const axios = require('axios');

const api = axios.create({
  baseURL: 'https://api.aidoesitall.website',
  headers: { 'X-API-Key': 'your_key' }
});

// Get transparency stats
const stats = await api.get('/api/transparency/stats');
console.log(stats.data);
```

---

## Python Example

```python
import requests

headers = {'X-API-Key': 'your_key'}
response = requests.get(
  'https://api.aidoesitall.website/api/transparency/stats',
  headers=headers
)
print(response.json())
```

---

## Error Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad Request |
| 401 | Unauthorized (Invalid API Key) |
| 429 | Rate Limit Exceeded |
| 500 | Server Error |

---

## Support

- **Email:** support@aidoesitall.website
- **Privacy:** privacy@aidoesitall.website
- **Full Docs:** See API-DOCS-NOW.md

---

**FOR THE KIDS - ALWAYS**
Gospel V1.3 (60% Charity | 30% Infrastructure | 10% Founder)
