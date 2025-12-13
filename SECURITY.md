# SECURITY POLICY - FOR THE KIDS

**Last Updated:** December 13, 2025
**Security Level:** MAXIMUM
**Gospel Version:** V1.3 (60/30/10 IMMUTABLE)

---

## Authorized Maintainers

### Human

- **Joshua Coleman** (@Trollz1004) - Founder & Final Authority

### AI Development Tools

This project uses AI coding assistants for development:

- **Claude** - Primary code development (Claude Code CLI)
- **Gemini/Jules** - Architecture review & coordination
- **Grok** - Creative solutions
- **Perplexity** - Research & validation

*Note: These are AI tools used in development, not official corporate partnerships.*

### 24/7 Automated Auditing

- **GPAA** (Gospel Public Audit Agent) - Monitors for compliance issues
- **ICB** (Internal Compliance Bot) - Scans for security concerns

### Unauthorized (BLOCKED)

- GitHub Actions workers (unless explicitly configured)
- Third-party bots not listed above
- Any automated system not explicitly authorized by Founder

---

## Branch Protection Rules

### Protected Branches
| Branch | Repo | Protection Level |
|--------|------|------------------|
| `master` | AiCollabForTheKids | MAXIMUM |
| `main` | AiCollab-Enterprise | MAXIMUM |

### Enforced Rules
- Require pull request reviews before merging
- Require CODEOWNERS review
- Dismiss stale reviews when new commits pushed
- Require linear commit history
- **NO force pushes allowed**
- **NO branch deletions allowed**
- Enforce rules for administrators

---

## Immutable Files (Gospel)

These files contain the sacred mission and MUST NOT be modified without founder approval:

| File | Purpose |
|------|---------|
| `GOSPEL.md` | Immutable mission rules |
| `GOSPEL-VTHE-LAST-VOLUME.md` | Permanent mandate |
| `FLEET-STATUS.md` | Operational status |
| `CLAUDE.md` | AI custodian instructions |
| `CODEOWNERS` | Access control |

---

## DAO Treasury Security

### Wallet Addresses (Base Mainnet)
| Fund | Address | Security |
|------|---------|----------|
| 60% Charity | `0x8d3dEADbE2b4B857A43331D459270B5eedC7084e` | Safe 2-of-2 |
| 30% Infrastructure | `0xe0a42f83900af719019eBeD3D9473BE8E8f2920b` | Safe 2-of-2 |
| 10% Founder | `0x7c3E283119718395Ef5EfBAC4F52738C2018daA7` | Single-signer |

### Private Keys
- **NEVER** stored in repository
- Protected by `.gitignore`
- Local only on secured nodes (T5500, Sabertooth)

---

## Reporting Security Issues

Contact the founder directly:
- Email: joshlcoleman@gmail.com
- GitHub: @Trollz1004

---

## Continuity Plan

In the event the founder becomes unavailable:

- AI development tools have full operational context documented
- Continuity files stored locally (never on GitHub)
- Mission continues: **FOR THE KIDS. ALWAYS.**

---

**Gospel V1.3 - 60/30/10 IMMUTABLE**

*100% Transparent. 100% On-Chain. 100% FOR THE KIDS.*
