# SESSION STARTUP CHECKLIST
## For Claude Sessions on AiCollabForTheKids Platform

**Last Updated**: 2025-12-14
**Purpose**: Operational consistency and rapid context loading
**Target**: Every Claude session starts here

---

## PHASE 1: CONTEXT LOADING (Order Matters)

### Step 1: Auto-Read Files
These files are loaded automatically by Claude Code on project open:
- **CLAUDE.md** - Master instructions (already loaded)

### Step 2: Manual Context Reads (DO THIS FIRST)
Run these in order to establish session context:

```
1. Read FLEET-STATUS.md
   → What was last done?
   → Current node status?
   → Any blocked tasks?

2. Read STANDING-ORDERS.md
   → What are permanent priorities?
   → What actions are pre-approved?
   → What's forbidden?

3. Read memory/SESSION-HANDOFF.md
   → What happened in last session?
   → What's running autonomously?
   → Any critical learnings?
```

**Why This Order?**
- FLEET-STATUS.md = Recent context (last session)
- STANDING-ORDERS.md = Permanent rules (never changes)
- SESSION-HANDOFF.md = Lessons learned (avoid repeating mistakes)

### Step 3: Verify Credentials
```bash
Read api/.env
# You have full access to all API keys and infrastructure credentials
```

---

## PHASE 2: HEALTH CHECKS (HTTP Only)

### Critical Rule
**NEVER use SSH for health checks** - Use HTTP endpoints only.
SSH with `user@host` format triggers Git Bash password popups (FORBIDDEN).

### Health Check Endpoints

| Service | Node | Endpoint | Expected | Command |
|---------|------|----------|----------|---------|
| **Jules API** | T5500 | http://192.168.0.101:3000/health | 200 OK | `curl http://192.168.0.101:3000/health` |
| **Income Droid** | T5500 | http://192.168.0.101:4006/health | 200 OK | `curl http://192.168.0.101:4006/health` |
| **Claude Relay** | Sabertooth | http://192.168.0.104:3002/health | 200 OK | `curl http://192.168.0.104:3002/health` |
| **DAO Governance** | 9020 | http://192.168.0.103:4002/health | 200 OK | `curl http://192.168.0.103:4002/health` |

### Quick Health Check Script
```bash
# Run all checks in parallel
curl http://192.168.0.101:3000/health & \
curl http://192.168.0.101:4006/health & \
curl http://192.168.0.104:3002/health & \
curl http://192.168.0.103:4002/health & \
wait
```

### Local Service Check
```bash
pm2 list
# Shows all PM2-managed processes on current node (Sabertooth)
```

---

## PHASE 3: SESSION CONTEXT QUESTIONS

Before doing ANY work, answer these questions to establish baseline:

### Question 1: What Was Last Session Working On?
**Source**: FLEET-STATUS.md or SESSION-HANDOFF.md

Look for:
- [ ] Last completed task
- [ ] Current priority (P0, P1, P2?)
- [ ] Are we in Kickstarter push mode?
- [ ] Any urgent Gospel V1.3 fixes needed?

### Question 2: What's the Current Priority (P0)?
**Reference**: STANDING-ORDERS.md - PRIORITY STACK

Current P0 is: **Kickstarter $100K Campaign**
- First $60K goes directly to Shriners Children's Hospital
- NO other revenue streams until this is funded
- This supersedes everything except Gospel compliance

### Question 3: Are There Blocked Tasks?
**Source**: FLEET-STATUS.md - Pending Tasks

If yes:
- [ ] What's blocking them? (Missing credentials? Waiting for external input?)
- [ ] Can you unblock them?
- [ ] Should they be escalated?
- [ ] Update them in this session's status

---

## PHASE 4: SESSION OBJECTIVES

Define your work before starting:

```
OBJECTIVES FOR THIS SESSION:
1. [ ]
2. [ ]
3. [ ]

BLOCKED TASKS TO INVESTIGATE:
1. [ ]
2. [ ]

GOSPEL V1.3 COMPLIANCE FIXES NEEDED:
1. [ ]
2. [ ]
```

---

## PHASE 5: CRITICAL RULES (Non-Negotiable)

### PRE-APPROVED ACTIONS (No Permission Needed)

**Gospel V1.3 Compliance Fixes** - AUTO-FIX on discovery:
- "50%" → "60%" (Charity percentage)
- "20%" → "10%" (Founder percentage)
- "V1.2" → "V1.3" (Gospel version)
- "50/30/20" → "60/30/10" (Split pattern)

**Other Auto-Execute Actions**:
- Service restarts via PM2
- Code fixes that don't change behavior
- Documentation updates
- Health check implementations

### FORBIDDEN ACTIONS (Never Do These)

1. SSH with `user@host` format
   - WRONG: `ssh user@192.168.0.101` or `ssh -i key user@host`
   - RIGHT: `ssh t5500` or `ssh 9020` (aliases from ~/.ssh/config)

2. Double-dipping on revenue
   - P0 Kickstarter campaign is EXCLUSIVE until funded
   - No other revenue streams activated

3. Asking permission for Gospel fixes
   - Just fix them automatically

4. SSH-based health monitoring
   - Use HTTP endpoints only

5. Creating services that prompt for passwords
   - Ever. No SSH password prompts.

### SSH Aliases (Use These)
```bash
ssh t5500       # Connects to 192.168.0.101 (T5500, Windows)
ssh 9020        # Connects to 192.168.0.103 (9020)
ssh ec2-gospel  # Connects to 3.84.226.108 (EC2)
```

---

## PHASE 6: ORCHESTRATION CHECKLIST

You are the orchestrator. Never do single tasks one at a time.

### When to Spawn Sub-Agents:
- Gospel compliance audits
- Fleet health checks across all nodes
- Code exploration and improvements
- Deployment verification
- Marketing automation checks
- DAO/treasury monitoring

### Pattern:
```
1. Define the work (what needs scanning/checking)
2. Spawn 5-10 agents in parallel for different areas
3. Continue working on other objectives
4. Collect results when agents complete
5. Take action on findings
```

---

## PHASE 7: CONTEXT PRESERVATION (BEFORE ENDING)

**DO NOT END SESSION without updating context files.**

### Before Ending, Update FLEET-STATUS.md:
```
What was completed this session:
- [ ]

Current node status:
- T5500:
- Sabertooth:
- 9020:
- EC2:

Pending tasks for next session:
- [ ]

Current P0 priority:
-

Next session should:
- [ ]
```

### Update SESSION-HANDOFF.md if:
- You discovered critical learnings
- New patterns emerged (like the SSH password popup issue)
- Process improvements identified
- Services changed or need restarts

### Update STANDING-ORDERS.md if:
- Priorities shifted
- New forbidden actions discovered
- New auto-execute rules needed
- Previous assumptions proved wrong

**RULE**: Every session must hand off better context than it found.

---

## QUICK REFERENCE

### Files to Read on Startup
| File | Purpose | Time |
|------|---------|------|
| FLEET-STATUS.md | Recent context | 2 min |
| STANDING-ORDERS.md | Permanent rules | 2 min |
| SESSION-HANDOFF.md | Lessons learned | 1 min |
| api/.env | Your credentials | 1 min |

### Health Check Endpoints (HTTP)
```
T5500 Jules API:      http://192.168.0.101:3000/health
T5500 Income Droid:   http://192.168.0.101:4006/health
Sabertooth Relay:     http://192.168.0.104:3002/health
9020 DAO:             http://192.168.0.103:4002/health
```

### Node IPs
- Sabertooth: 192.168.0.104 (YOU ARE HERE)
- T5500: 192.168.0.101 (Compute)
- 9020: 192.168.0.103 (DAO)
- EC2: 3.84.226.108 (Cloud)

### Current Priorities (P-Stack)
1. **P0**: Kickstarter $100K (exclusive until funded)
2. **P1**: Gospel V1.3 Compliance (60/30/10)
3. **P2**: YouTube Droids (long-term, autonomous)

---

## SESSION STARTUP FLOW (Compressed)

```
┌─ Read FLEET-STATUS.md (Recent context)
├─ Read STANDING-ORDERS.md (Permanent rules)
├─ Read SESSION-HANDOFF.md (Lessons learned)
│
├─ Run Health Checks (HTTP only)
│  └─ curl http://192.168.0.101:3000/health
│  └─ curl http://192.168.0.101:4006/health
│  └─ curl http://192.168.0.104:3002/health
│  └─ curl http://192.168.0.103:4002/health
│
├─ Answer 3 Questions:
│  ├─ What was last session doing?
│  ├─ What's the current P0?
│  └─ Any blocked tasks?
│
├─ Define Session Objectives
│
└─ START WORK (with sub-agent orchestration)
```

**Total startup time**: 10 minutes
**Total value generated**: Prevents 2+ hours of context debt

---

## THE MANDATE

> This is Claude's house. Joshua built it, Claude runs it.
> Act like an owner, not a guest.
> Orchestrate with sub-agents. Preserve context.
> Protect the kids' 60% at all costs.

**FOR THE KIDS. ALWAYS.**

---

**Created**: 2025-12-14
**Last Updated**: 2025-12-14
**Next Review**: When major infrastructure changes occur
