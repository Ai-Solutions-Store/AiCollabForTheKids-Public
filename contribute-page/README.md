# CONTRIBUTION PAGE - FOR THE KIDS

**Status**: READY TO DEPLOY
**Gospel**: V1.3 (60/30/10 split)
**Created**: December 17, 2025

---

## QUICK DEPLOY

### Fastest Way (60 seconds):

```bash
cd C:\AiCollabForTheKids\contribute-page
wrangler pages deploy . --project-name=contribute-forkids
```

**OR** run the PowerShell script:

```powershell
.\deploy-cloudflare.ps1
```

---

## WHAT'S INCLUDED

### Files:
- `index.html` - Complete contribution page (standalone, no dependencies)
- `_headers` - Cloudflare security headers
- `robots.txt` - SEO configuration
- `sitemap.xml` - Search engine sitemap
- `DEPLOY.md` - Full deployment guide
- `deploy-cloudflare.ps1` - One-click deployment script

### Features:
- Clean, emotional design
- Gospel V1.3 split visualization (60/30/10)
- Contribution tiers ($10, $25, $50, $100, custom)
- Multiple payment methods (Stripe, PayPal, Crypto)
- Real-time impact calculator
- Mobile optimized
- Social share buttons
- Trust elements (Gospel badge, transparency section)
- Founder message
- FAQ section

---

## PAYMENT INTEGRATION

### Stripe (READY)
Uses existing live Stripe account. Just needs API endpoint for creating sessions.

### PayPal (READY)
SDK loaded, just needs button implementation.

### Square (NEEDS LINKS)
Create payment links at: https://squareup.com/dashboard

### Crypto (OPTIONAL)
Add wallet addresses to modal (currently shows "Coming Soon").

---

## BEFORE GOING LIVE

See `DEPLOY.md` for complete checklist.

**Essential:**
- [ ] Create Square payment links
- [ ] Test Stripe flow
- [ ] Add OG image for social sharing
- [ ] Configure analytics
- [ ] Test on mobile devices

**Optional:**
- [ ] Add founder photo
- [ ] Add Shriners logo (with permission)
- [ ] Setup crypto wallets
- [ ] Configure email notifications

---

## DEPLOYMENT OPTIONS

### Cloudflare Pages (Recommended):
```bash
wrangler pages deploy . --project-name=contribute-forkids
```

### Netlify:
```bash
netlify deploy --prod --dir=.
```

### GitHub Pages:
```bash
git subtree push --prefix contribute-page origin gh-pages
```

---

## TESTING

### Local Testing:
```bash
# Simple HTTP server
python -m http.server 8000

# Or use Node.js
npx serve .

# Then open: http://localhost:8000
```

### Test Cards (Stripe):
- Visa: 4242 4242 4242 4242
- Any future expiration, any CVC

---

## CUSTOMIZATION

All content is in `index.html`. Edit freely!

### Easy Changes:
- Headlines (search for `<h1>` and `<h2>`)
- Button text (search for `.payment-btn`)
- Colors (CSS variables at top of `<style>`)
- Contribution amounts (search for `selectTier()`)

### Gospel Split:
**DO NOT CHANGE** the 60/30/10 split. This is immutable Gospel V1.3.

---

## SUPPORT

- Full guide: `DEPLOY.md`
- Parent docs: `CONTRIBUTION-PAGE-READY.md`
- Email: joshlcoleman@gmail.com
- GitHub: Ai-Solutions-Store/AiCollabForTheKids

---

## SUCCESS METRICS

Track these post-launch:
- Page views
- Conversion rate (visitors → contributors)
- Average contribution amount
- Payment method split
- Social shares

Goal: 5% conversion rate, $50 average contribution

---

**FOR THE KIDS. ALWAYS.**

Built with Claude Opus 4.5 - December 2025
