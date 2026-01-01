# Twitter Campaign - QUICK START GUIDE
**FOR THE KIDS - Kickstarter**

---

## 3 COMMANDS TO SUCCESS

### 1. TEST AUTHENTICATION (30 seconds)
```powershell
cd c:\AiCollabForTheKids\scripts
.\Test-TwitterAuth.ps1
```

✓ Expected: "STATUS: READY TO POST"

---

### 2. POST TEST TWEET (1 minute)
```powershell
.\Post-TwitterOAuth.ps1 -TweetText "Testing FOR THE KIDS platform! 60% to charity. #ForTheKids"
```

✓ Expected: "✓ TWEET POSTED SUCCESSFULLY! Tweet ID: ###"

---

### 3. DEPLOY FULL CAMPAIGN (12 hours automated)
```powershell
.\Post-TwitterOAuth.ps1 -ProcessQueue -DelayMinutes 180
```

✓ Expected: 5 tweets posted automatically with 3-hour spacing

---

## WHAT YOU GET

- **5 Gospel V1.3-compliant tweets** (60% charity references)
- **Automatic posting** with smart timing
- **Error handling** and progress tracking
- **Result summary** with tweet IDs

---

## TIMING OPTIONS

**Conservative (4 hours apart):**
```powershell
.\Post-TwitterOAuth.ps1 -ProcessQueue -DelayMinutes 240
```

**Recommended (3 hours apart):**
```powershell
.\Post-TwitterOAuth.ps1 -ProcessQueue -DelayMinutes 180
```

**Aggressive (2 hours apart):**
```powershell
.\Post-TwitterOAuth.ps1 -ProcessQueue -DelayMinutes 120
```

---

## BEST TIME TO START

**Tuesday @ 9:00 AM EST** (optimal engagement)

---

## WHAT'S IN THE QUEUE

1. Launch tweet with Kickstarter link
2. Shriners trust-builder
3. Movement building tweet
4. Problem/solution hook
5. Product clarity tweet

All reference "60% to children's hospitals" (Gospel V1.3)

---

## IF SOMETHING FAILS

1. Check credentials in `c:\AiCollabForTheKids\api\.env`
2. Read troubleshooting in `TWITTER-DEPLOYMENT-GUIDE.md`
3. Post manually at https://twitter.com/AiCollab4Kids

---

## CREDENTIALS VERIFIED

All OAuth 1.0a credentials present in `api\.env`:
- ✓ API Key
- ✓ API Secret
- ✓ Access Token
- ✓ Access Token Secret

**Write access confirmed.**

---

## MONITORING

After posting, check:
- **Twitter Analytics:** https://analytics.twitter.com
- **Kickstarter Dashboard:** Track twitter.com referrals

---

## THAT'S IT!

Three commands. Twelve hours. Five tweets. FOR THE KIDS.

---

**Full docs:**
- Technical: `TWITTER-OAUTH-RESEARCH.md`
- Operations: `TWITTER-DEPLOYMENT-GUIDE.md`
- Summary: `TWITTER-SOLUTION-SUMMARY.md`

**FOR THE KIDS. ALWAYS.**
