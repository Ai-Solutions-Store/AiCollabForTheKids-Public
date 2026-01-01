# Breaking Changes - v2.0.0

**From Version:** 1.5.0
**To Version:** 2.0.0
**Document ID:** BRK_1766969173139_DC2C681F
**Generated:** 2025-12-29

---

## Important Notice

This document outlines all breaking changes between v1.5.0 and v2.0.0.
Please review carefully before upgrading.


---

## Summary

| Category | Count | Action Required |
|----------|-------|-----------------|
| Breaking Changes | 1 | Immediate |
| Deprecations | 1 | Before next major |
| Removals | 0 | Already removed |

---

## Breaking Changes

These changes will affect your existing implementation:

### 1. Gospel Split Now Applies to Net Profit

**Component:** Payment Processing
**Impact:** High

#### What Changed

The 60/30/10 split is now calculated on NET profit (after COGS and fees) rather than gross revenue. This aligns with Gospel V1.3 Ethics Override.

#### Before (v1.5.0)

```javascript
// Old: Split on gross
const charityShare = grossAmount * 0.60;
```

#### After (v2.0.0)

```javascript
// New: Split on net profit
const netProfit = grossAmount - cogs - fees;
const charityShare = netProfit * 0.60;
```

#### Migration Steps

1. Update any custom payment processing logic
2. Reconfigure reports to show net profit split
3. Update financial dashboards and projections

---

## Deprecations

The following features are deprecated and will be removed in a future version:

### 1. Legacy Payment Callback

**Deprecated In:** v2.0.0
**Removal Target:** 3.0.0
**Replacement:** /webhook/square

The old /payment-callback endpoint is deprecated

---

## Need Help?

If you encounter issues during migration:

1. Check the migration guide for v2.0.0
2. Review our documentation at https://aidoesitall.website/docs
3. Ensure Gospel v3.0 compliance in your implementation

---

## Gospel Compliance Statement

These breaking changes maintain full alignment with the Gospel:
- Revenue Split: 60/30/10
- Mission: FOR THE KIDS
- No escrow or donation language
- All changes authored by Claude (Anthropic)

---
*Co-Authored-By: Claude <noreply@anthropic.com>*
