# Contributing to FOR THE KIDS

**Mission:** 60% of every penny goes to children's medical care. Your code serves this purpose.

## The Rules

### 1. Mission Alignment
All contributions must serve revenue generation or infrastructure stability. We don't accept "nice to have" features. Every line of code either:
- Generates revenue (which means 60% to kids)
- Keeps the machine running (infrastructure)
- Gets rejected

### 2. No Secrets. Ever.
PRs containing API keys, tokens, passwords, or `.env` files will be **instantly closed**.

```
❌ REJECTED: Any file containing real credentials
❌ REJECTED: Hardcoded API keys in code
❌ REJECTED: Screenshots showing tokens
✅ ACCEPTED: Environment variable references like process.env.API_KEY
```

Credential locations (never commit these):
- `api/.env` - All production secrets
- `C:\Keys\` - Local backup keys
- Any file matching `*.key`, `*.pem`, `*.secret`

### 3. AI-Readable Code
Our AI Auditors (Claude, Gemini, Grok) review every PR. Write for them:

```javascript
// GOOD: Clear intent
// Calculate net profit before Gospel split (COGS must be deducted first)
const netProfit = grossRevenue - costOfGoods - shippingCost - processingFee;

// BAD: Clever but unreadable
const n = g - c - s - p;
```

### 4. Gospel Compliance
The 60/30/10 split is **immutable**. Code that attempts to:
- Modify the split percentages
- Bypass the blockchain enforcement
- Redirect charitable funds

Will be rejected and the contributor banned.

## Contribution Process

```
1. FORK    → Create your own copy
2. BRANCH  → Work on a feature branch (never main)
3. CODE    → Write clean, commented, AI-readable code
4. TEST    → Verify locally before PR
5. PR      → Submit with filled-out template
6. AUDIT   → AI Sentinel reviews for security + mission alignment
7. MERGE   → Maintainer approves and merges
```

## What We Need

**High Priority:**
- Payment integration improvements (Square webhooks, error handling)
- Marketing automation (new platform integrations)
- Infrastructure stability (PM2, Cloudflare, monitoring)
- Documentation improvements

**Medium Priority:**
- UI/UX improvements for ai-solutions.store
- Performance optimizations
- Test coverage

**Not Accepting:**
- "Refactoring for fun"
- Alternative payment processors (Square only)
- Features that don't generate revenue

## Code Standards

- **Language:** JavaScript (Node.js), PowerShell for Windows automation
- **Style:** Consistent with existing codebase
- **Comments:** Required for all business logic
- **Tests:** Appreciated but not required (we're scrappy)

## Questions?

Open an issue. Tag it with `question`.

---

**Remember:** Every successful PR = more revenue = more kids get medical care.

**FOR THE KIDS. ALWAYS.**
