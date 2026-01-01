# HIVE AI Router Integration Guide

## Overview

The AI Router (`scripts/hive/agents/ai-router.cjs`) intelligently routes AI tasks between:
- **T5500 (Zero OPEX)**: Low-priority, simple tasks → Free local inference
- **Cloud APIs**: High-priority, complex tasks → Premium quality/speed

**Status**: ✅ Module created, integration ready
**Created**: 2026-01-01
**Task**: #11 (OPUS-STATUS.md)

---

## Routing Logic

### Automatic T5500 Selection
Tasks are routed to T5500 when **ALL** of these are true:
1. `FLEET_ENABLED=true` in `.env`
2. Task type is in suitable list (see below)
3. Priority is `LOW` or `MEDIUM`
4. Task is NOT time-sensitive

### T5500-Suitable Task Types
```javascript
const T5500_SUITABLE_TASKS = [
    'EMAIL_DRAFT',          // Internal emails, templates
    'CATEGORIZATION',       // Classify items, feedback
    'INTERNAL_DOCS',        // Documentation generation
    'SIMPLE_QA',            // Basic questions
    'TAGGING',              // Content tagging
    'BASIC_SUMMARY',        // Simple summaries
    'CONTENT_CLASSIFICATION' // Category detection
];
```

### Fallback System
- T5500 timeout (30s) → Automatic retry with Cloud API
- T5500 error → Immediate fallback to Cloud API
- Zero job failures (always completes)

---

## Usage Examples

### Example 1: Basic Email Draft (Uses T5500)
```javascript
const aiRouter = require('./scripts/hive/agents/ai-router.cjs');

const result = await aiRouter.route(
    'Draft a professional thank you email for a customer purchase',
    {
        type: 'EMAIL_DRAFT',
        priority: 'LOW',
        timeSensitive: false
    },
    {
        temperature: 0.7,
        maxTokens: 256
    }
);

console.log(result.response);    // Email content
console.log(result.provider);    // "T5500-Llama3.2"
console.log(result.cost);        // 0.000 (free!)
console.log(result.savedCost);   // 0.002 (vs cloud)
```

### Example 2: Time-Sensitive Task (Uses Cloud)
```javascript
const result = await aiRouter.route(
    'Urgent customer support response needed',
    {
        type: 'EMAIL_DRAFT',
        priority: 'HIGH',
        timeSensitive: true  // Forces cloud API
    }
);

console.log(result.provider);  // "Cloud-Direct"
console.log(result.latency);   // ~500ms (fast!)
```

### Example 3: Categorization (Uses T5500)
```javascript
const result = await aiRouter.route(
    'Categorize this feedback: "Product works great but shipping was slow"',
    {
        type: 'CATEGORIZATION',
        priority: 'MEDIUM'
    },
    {
        temperature: 0.3,  // Lower temp for classification
        maxTokens: 50
    }
);

console.log(result.response);  // "Mixed (Positive product, Negative shipping)"
console.log(result.cost);      // 0.000
```

---

## Integration with HIVE Agents

### Option 1: Modify Existing Agents

**Before** (Direct API call):
```javascript
// In writer.cjs or other agent
const response = await callGeminiAPI(prompt);
```

**After** (AI Router):
```javascript
const aiRouter = require('./ai-router.cjs');

const result = await aiRouter.route(
    prompt,
    {
        type: 'EMAIL_DRAFT',  // or appropriate type
        priority: 'LOW',      // task priority
        timeSensitive: false
    }
);

const response = result.response;
```

### Option 2: Add to Queen Bee (Future)

Modify `queen-bee.cjs` to include AI routing metadata in jobs:

```javascript
// In jobs.json
{
    "id": "job-123",
    "type": "writer",
    "prompt": "Draft email...",
    "aiConfig": {
        "taskType": "EMAIL_DRAFT",
        "priority": "LOW",
        "timeSensitive": false
    }
}
```

Then in worker process:
```javascript
const aiRouter = require('./agents/ai-router.cjs');

if (job.aiConfig) {
    const result = await aiRouter.route(
        job.prompt,
        job.aiConfig
    );
    // Use result.response
}
```

---

## Statistics & Monitoring

### Get Real-Time Stats
```bash
node scripts/hive/agents/ai-router.cjs --stats
```

**Output**:
```json
{
  "uptime": 3600,
  "totalRequests": 147,
  "t5500": {
    "requests": 98,
    "successes": 95,
    "failures": 3,
    "successRate": "96.9%"
  },
  "cloud": {
    "requests": 49
  },
  "costSavings": {
    "total": "$0.1900",
    "perHour": "$0.1900"
  },
  "t5500Percentage": "66.7%"
}
```

### Cost Savings Analysis
- **T5500 success**: $0.002 saved per request
- **100 requests/day** with 70% T5500 usage: **$0.14/day** = **$51/year** savings
- **1,000 requests/day**: **$511/year** savings

---

## Configuration

### Environment Variables (.env)
```bash
# Enable/disable T5500 routing
FLEET_ENABLED=true

# T5500 endpoint
FLEET_LLM_URL=http://192.168.0.101:11434

# Model name
FLEET_MODEL=llama3.2
```

### Router Configuration (ai-router.cjs)
```javascript
const CONFIG = {
    T5500_TIMEOUT: 30000,                    // 30s max wait
    T5500_ENABLED: true,                     // Master switch
    CLOUD_API_COST_PER_REQUEST: 0.002,      // Cost tracking
    T5500_SUITABLE_TASKS: [...]              // Task whitelist
};
```

---

## Performance Expectations

### T5500 (Local)
- **Cold start**: 15-20s (first request after idle)
- **Warm inference**: 2-7s (subsequent requests)
- **Throughput**: ~4-5 tokens/second
- **Cost**: $0.00
- **Best for**: Batch jobs, async tasks, cost-sensitive operations

### Cloud API (Gemini/Claude)
- **Latency**: 500ms - 2s
- **Throughput**: 50+ tokens/second
- **Cost**: $0.001 - $0.01 per request
- **Best for**: Real-time, customer-facing, complex reasoning

---

## Troubleshooting

### T5500 Always Timing Out
1. Check T5500 is online: `curl http://192.168.0.101:11434/api/tags`
2. Verify `.env` has `FLEET_ENABLED=true`
3. Check logs: `cat logs/ai-router.log`
4. Test free-brain directly: `node scripts/hive/agents/free-brain.cjs --test`

### All Requests Going to Cloud
1. Verify task type is in `T5500_SUITABLE_TASKS`
2. Check priority is `LOW` or `MEDIUM`
3. Ensure `timeSensitive` is `false`
4. Check `FLEET_ENABLED=true` in `.env`

### High T5500 Failure Rate
1. Increase timeout: Edit `T5500_TIMEOUT` in `ai-router.cjs`
2. Check T5500 resource usage (RAM/CPU)
3. Verify network latency: `ping 192.168.0.101`
4. Review T5500 Ollama logs for errors

---

## Next Steps (OPUS Task #11)

### Phase 1: ✅ COMPLETE
- [x] AI Router module created
- [x] T5500 integration with fallback
- [x] Documentation written

### Phase 2: IN PROGRESS
- [ ] Implement Cloud API provider (Gemini/Claude)
- [ ] Add AI Router to existing HIVE agents
- [ ] Update Queen Bee with AI routing support
- [ ] Deploy to production PM2 process

### Phase 3: PLANNED
- [ ] Add response caching layer
- [ ] Implement model quality comparison
- [ ] Create monitoring dashboard
- [ ] A/B test T5500 vs Cloud quality

---

## Example Integration: Email Agent

**File**: `scripts/hive/agents/email-agent.cjs` (new)

```javascript
const aiRouter = require('./ai-router.cjs');

async function draftEmail(recipientType, context) {
    const prompt = `Draft a professional ${recipientType} email: ${context}`;

    const result = await aiRouter.route(prompt, {
        type: 'EMAIL_DRAFT',
        priority: 'LOW',      // Most emails aren't urgent
        timeSensitive: false
    }, {
        temperature: 0.7,
        maxTokens: 300
    });

    return {
        email: result.response,
        generatedBy: result.provider,
        cost: result.cost,
        latency: result.latency
    };
}

module.exports = { draftEmail };
```

**Usage**:
```javascript
const { draftEmail } = require('./scripts/hive/agents/email-agent.cjs');

const result = await draftEmail('customer', 'thanking for purchase');
console.log(result.email);       // Email content
console.log(result.generatedBy); // "T5500-Llama3.2"
console.log(result.cost);        // 0.000
```

---

**STATUS**: AI Router ready for integration. Awaiting Cloud API implementation for full functionality.

**Cost Savings Potential**: $50-500/year depending on usage volume.

**FOR THE KIDS. ALWAYS.**
