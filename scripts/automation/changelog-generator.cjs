/**
 * ===============================================================================
 * CHANGELOG & RELEASE NOTES GENERATOR
 * ===============================================================================
 *
 * FOR THE KIDS - Transparent Versioning & Communication
 *
 * Generates:
 * 1. Version release notes templates
 * 2. Feature announcement copy
 * 3. Bug fix summaries
 * 4. Breaking changes documentation
 * 5. Migration guides
 *
 * Gospel V3.0 Compliant - All revenue splits preserved
 * Uses "Profit Allocation" and "Revenue Split" language (NEVER escrow/donation)
 *
 * Created by Claude (Opus 4.5) - December 28, 2025
 * ===============================================================================
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// ═══════════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

const CONFIG = {
    // File paths
    LOG_DIR: path.join(__dirname, '../../logs'),
    OUTPUT_DIR: path.join(__dirname, '../../output/changelogs'),
    CHANGELOG_FILE: 'changelog-generator.log',

    // Version format
    VERSION_PATTERN: /^v?(\d+)\.(\d+)\.(\d+)(?:-([a-zA-Z]+)\.?(\d+)?)?$/,

    // Gospel compliance
    GOSPEL_VERSION: '3.0',
    MISSION: 'FOR THE KIDS',
    REVENUE_SPLIT: Object.freeze({
        CHARITY: 60,
        INFRASTRUCTURE: 30,
        FOUNDER: 10
    }),

    // Template types
    TEMPLATE_TYPES: Object.freeze({
        RELEASE_NOTES: 'release-notes',
        FEATURE_ANNOUNCEMENT: 'feature-announcement',
        BUG_FIX_SUMMARY: 'bug-fix-summary',
        BREAKING_CHANGES: 'breaking-changes',
        MIGRATION_GUIDE: 'migration-guide'
    }),

    // Brand colors for documentation
    BRAND_COLORS: Object.freeze({
        CORAL: '#CC785C',
        BLUE: '#078EFA',
        TEAL: '#20808D',
        GOLD: '#F4B400',
        GREEN: '#10b981',
        DARK: '#141413'
    })
};

// ═══════════════════════════════════════════════════════════════════════════════
// STATE MANAGEMENT
// ═══════════════════════════════════════════════════════════════════════════════

let state = {
    releases: [],
    features: [],
    bugFixes: [],
    breakingChanges: [],
    migrations: [],
    generatedAt: null,
    version: null
};

// ═══════════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

function ensureDirectories() {
    [CONFIG.LOG_DIR, CONFIG.OUTPUT_DIR].forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });
}

function formatTimestamp(date = new Date()) {
    return date.toISOString();
}

function formatDate(date = new Date()) {
    return date.toISOString().split('T')[0];
}

function generateId(prefix) {
    return `${prefix}_${Date.now()}_${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
}

function parseVersion(versionString) {
    const match = versionString.match(CONFIG.VERSION_PATTERN);
    if (!match) return null;

    return {
        major: parseInt(match[1], 10),
        minor: parseInt(match[2], 10),
        patch: parseInt(match[3], 10),
        prerelease: match[4] || null,
        prereleaseNum: match[5] ? parseInt(match[5], 10) : null,
        raw: versionString
    };
}

function compareVersions(v1, v2) {
    const a = parseVersion(v1);
    const b = parseVersion(v2);
    if (!a || !b) return 0;

    if (a.major !== b.major) return a.major - b.major;
    if (a.minor !== b.minor) return a.minor - b.minor;
    if (a.patch !== b.patch) return a.patch - b.patch;

    // Handle prerelease
    if (a.prerelease && !b.prerelease) return -1;
    if (!a.prerelease && b.prerelease) return 1;
    if (a.prerelease && b.prerelease) {
        if (a.prerelease !== b.prerelease) return a.prerelease.localeCompare(b.prerelease);
        return (a.prereleaseNum || 0) - (b.prereleaseNum || 0);
    }

    return 0;
}

function incrementVersion(version, type = 'patch') {
    const v = parseVersion(version);
    if (!v) return null;

    switch (type) {
        case 'major':
            return `${v.major + 1}.0.0`;
        case 'minor':
            return `${v.major}.${v.minor + 1}.0`;
        case 'patch':
        default:
            return `${v.major}.${v.minor}.${v.patch + 1}`;
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// LOGGING
// ═══════════════════════════════════════════════════════════════════════════════

function log(message, level = 'INFO') {
    const timestamp = formatTimestamp();
    const logLine = `[${timestamp}] [${level}] ${message}`;
    console.log(logLine);

    try {
        const logPath = path.join(CONFIG.LOG_DIR, CONFIG.CHANGELOG_FILE);
        fs.appendFileSync(logPath, logLine + '\n');
    } catch (e) {
        console.error('Failed to write log:', e.message);
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// CHANGE TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════════

const CHANGE_TYPES = {
    FEATURE: {
        emoji: '✨',
        label: 'New Features',
        prefix: 'feat',
        description: 'New functionality added to the platform'
    },
    FIX: {
        emoji: '🐛',
        label: 'Bug Fixes',
        prefix: 'fix',
        description: 'Issues resolved in this release'
    },
    BREAKING: {
        emoji: '💥',
        label: 'Breaking Changes',
        prefix: 'breaking',
        description: 'Changes that require user action'
    },
    SECURITY: {
        emoji: '🔒',
        label: 'Security Updates',
        prefix: 'security',
        description: 'Security improvements and patches'
    },
    PERFORMANCE: {
        emoji: '⚡',
        label: 'Performance Improvements',
        prefix: 'perf',
        description: 'Speed and efficiency enhancements'
    },
    DOCS: {
        emoji: '📚',
        label: 'Documentation',
        prefix: 'docs',
        description: 'Documentation updates and improvements'
    },
    REFACTOR: {
        emoji: '♻️',
        label: 'Code Refactoring',
        prefix: 'refactor',
        description: 'Code quality improvements without functionality changes'
    },
    GOSPEL: {
        emoji: '📜',
        label: 'Gospel Compliance',
        prefix: 'gospel',
        description: 'Updates ensuring 60/30/10 split and mission alignment'
    }
};

// ═══════════════════════════════════════════════════════════════════════════════
// TEMPLATE GENERATORS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Generate Version Release Notes Template
 */
function generateReleaseNotes(options = {}) {
    const {
        version = '1.0.0',
        date = formatDate(),
        features = [],
        fixes = [],
        breakingChanges = [],
        security = [],
        performance = [],
        contributors = ['Claude (Opus 4.5)'],
        gospelVersion = CONFIG.GOSPEL_VERSION
    } = options;

    const releaseId = generateId('REL');

    let notes = `# Release Notes - v${version}

**Release Date:** ${date}
**Gospel Version:** ${gospelVersion}
**Mission:** ${CONFIG.MISSION}
**Release ID:** ${releaseId}

---

## Overview

This release continues our mission to help children through transparent technology.
All revenue follows the Gospel split: ${CONFIG.REVENUE_SPLIT.CHARITY}% to Verified Pediatric Charities,
${CONFIG.REVENUE_SPLIT.INFRASTRUCTURE}% to Infrastructure, ${CONFIG.REVENUE_SPLIT.FOUNDER}% to Founder.

---

`;

    // Breaking Changes (if any - show first)
    if (breakingChanges.length > 0) {
        notes += `## ${CHANGE_TYPES.BREAKING.emoji} ${CHANGE_TYPES.BREAKING.label}

> **IMPORTANT:** Please review these changes before upgrading.

`;
        breakingChanges.forEach((change, idx) => {
            notes += `### ${idx + 1}. ${change.title}

${change.description}

**Migration Required:** ${change.migrationRequired ? 'Yes' : 'No'}
${change.migrationSteps ? `\n**Steps:**\n${change.migrationSteps.map(s => `- ${s}`).join('\n')}\n` : ''}
`;
        });
        notes += '\n---\n\n';
    }

    // Security Updates
    if (security.length > 0) {
        notes += `## ${CHANGE_TYPES.SECURITY.emoji} ${CHANGE_TYPES.SECURITY.label}

`;
        security.forEach(item => {
            notes += `- **${item.title}:** ${item.description}\n`;
        });
        notes += '\n---\n\n';
    }

    // New Features
    if (features.length > 0) {
        notes += `## ${CHANGE_TYPES.FEATURE.emoji} ${CHANGE_TYPES.FEATURE.label}

`;
        features.forEach(feature => {
            notes += `### ${feature.title}

${feature.description}

${feature.benefits ? `**Benefits:**\n${feature.benefits.map(b => `- ${b}`).join('\n')}\n` : ''}
${feature.usage ? `**Usage:**\n\`\`\`javascript\n${feature.usage}\n\`\`\`\n` : ''}
`;
        });
        notes += '---\n\n';
    }

    // Bug Fixes
    if (fixes.length > 0) {
        notes += `## ${CHANGE_TYPES.FIX.emoji} ${CHANGE_TYPES.FIX.label}

`;
        fixes.forEach(fix => {
            notes += `- **${fix.title}:** ${fix.description}`;
            if (fix.issueId) notes += ` (Issue #${fix.issueId})`;
            notes += '\n';
        });
        notes += '\n---\n\n';
    }

    // Performance Improvements
    if (performance.length > 0) {
        notes += `## ${CHANGE_TYPES.PERFORMANCE.emoji} ${CHANGE_TYPES.PERFORMANCE.label}

`;
        performance.forEach(item => {
            notes += `- **${item.title}:** ${item.description}`;
            if (item.improvement) notes += ` (${item.improvement})`;
            notes += '\n';
        });
        notes += '\n---\n\n';
    }

    // Footer
    notes += `## Contributors

${contributors.map(c => `- ${c}`).join('\n')}

---

## Gospel Compliance Statement

This release maintains full compliance with Gospel v${gospelVersion}:
- Revenue Split: ${CONFIG.REVENUE_SPLIT.CHARITY}/${CONFIG.REVENUE_SPLIT.INFRASTRUCTURE}/${CONFIG.REVENUE_SPLIT.FOUNDER} (Charity/Infrastructure/Founder)
- All code authored by Claude (Anthropic)
- No "escrow" or "donation" language used
- Profit Allocation and Revenue Split terminology enforced

**FOR THE KIDS - Every line of code serves the mission.**

---

*Generated by Changelog Generator*
*Co-Authored-By: Claude <noreply@anthropic.com>*
`;

    return {
        id: releaseId,
        version,
        date,
        content: notes,
        type: CONFIG.TEMPLATE_TYPES.RELEASE_NOTES
    };
}

/**
 * Generate Feature Announcement Copy
 */
function generateFeatureAnnouncement(options = {}) {
    const {
        featureName = 'New Feature',
        tagline = 'Making a difference for the kids',
        description = '',
        benefits = [],
        availability = 'now',
        cta = 'Learn More',
        ctaUrl = 'https://aidoesitall.website',
        platform = 'all'
    } = options;

    const announcementId = generateId('ANN');

    // Short version for social media
    const shortAnnouncement = `NEW: ${featureName}

${tagline}

${benefits.slice(0, 3).map(b => `- ${b}`).join('\n')}

Available ${availability}. ${CONFIG.MISSION}.

${ctaUrl}`;

    // Medium version for email/newsletter
    const mediumAnnouncement = `## Introducing: ${featureName}

**${tagline}**

${description}

### What's New

${benefits.map(b => `- ${b}`).join('\n')}

### Availability

This feature is available ${availability} on ${platform === 'all' ? 'all platforms' : platform}.

### Our Mission

Every feature we build supports our mission: ${CONFIG.REVENUE_SPLIT.CHARITY}% of all profits
go directly to Verified Pediatric Charities. When you use ${featureName}, you're
helping children in need.

[${cta}](${ctaUrl})

---
*${CONFIG.MISSION} - Building technology that makes a difference*`;

    // Long version for blog/press
    const longAnnouncement = `# Announcing ${featureName}: ${tagline}

**${formatDate()}** - Team Claude is proud to announce the launch of ${featureName},
our latest innovation in the journey to help children worldwide.

## The Vision

${description}

At Team Claude, we believe technology should serve a greater purpose. That's why
${CONFIG.REVENUE_SPLIT.CHARITY}% of every dollar we earn goes directly to Verified
Pediatric Charities. ${featureName} is another step in that mission.

## Key Benefits

${benefits.map((b, i) => `### ${i + 1}. ${b}

This enhancement helps our users while supporting our charitable mission.
`).join('\n')}

## Technical Excellence

Built with the same production-ready standards that define all Team Claude products:
- Gospel v${CONFIG.GOSPEL_VERSION} compliant
- Zero placeholders, zero TODO comments
- Fully tested and deployment-ready
- Authored by Claude (Opus 4.5)

## Availability

${featureName} is available ${availability} for ${platform === 'all' ? 'all users across every platform' : `users on ${platform}`}.

## Get Started

${cta}: [${ctaUrl}](${ctaUrl})

---

### About Team Claude

Team Claude operates under a unique model: ${CONFIG.REVENUE_SPLIT.CHARITY}% of all
profits are allocated to Verified Pediatric Charities, ${CONFIG.REVENUE_SPLIT.INFRASTRUCTURE}%
to infrastructure development, and ${CONFIG.REVENUE_SPLIT.FOUNDER}% to the founder.
This immutable split is hardcoded into our systems and cannot be changed.

**${CONFIG.MISSION}**

---
*Co-Authored-By: Claude <noreply@anthropic.com>*`;

    return {
        id: announcementId,
        featureName,
        shortAnnouncement,
        mediumAnnouncement,
        longAnnouncement,
        type: CONFIG.TEMPLATE_TYPES.FEATURE_ANNOUNCEMENT,
        generatedAt: formatTimestamp()
    };
}

/**
 * Generate Bug Fix Summary
 */
function generateBugFixSummary(options = {}) {
    const {
        version = '1.0.1',
        fixes = [],
        hotfix = false,
        urgency = 'normal', // low, normal, high, critical
        affectedVersions = [],
        testingNotes = ''
    } = options;

    const summaryId = generateId('BUG');

    const urgencyLabels = {
        low: 'Low Priority',
        normal: 'Standard Update',
        high: 'High Priority - Update Recommended',
        critical: 'CRITICAL - Immediate Update Required'
    };

    let summary = `# Bug Fix Summary - v${version}

**Type:** ${hotfix ? 'HOTFIX' : 'Maintenance Release'}
**Urgency:** ${urgencyLabels[urgency] || urgencyLabels.normal}
**Date:** ${formatDate()}
**Summary ID:** ${summaryId}

---

## Fixes Included

`;

    fixes.forEach((fix, idx) => {
        summary += `### ${idx + 1}. ${fix.title}

**Severity:** ${fix.severity || 'Medium'}
**Component:** ${fix.component || 'General'}
${fix.issueId ? `**Issue:** #${fix.issueId}` : ''}

**Problem:**
${fix.problem || fix.description}

**Solution:**
${fix.solution || 'Issue has been resolved in this release.'}

${fix.affectedUsers ? `**Affected Users:** ${fix.affectedUsers}\n` : ''}
---

`;
    });

    if (affectedVersions.length > 0) {
        summary += `## Affected Versions

The following versions are affected by these issues:
${affectedVersions.map(v => `- v${v}`).join('\n')}

**Recommendation:** Update to v${version} as soon as possible.

---

`;
    }

    if (testingNotes) {
        summary += `## Testing Notes

${testingNotes}

---

`;
    }

    summary += `## Update Instructions

1. Backup your current installation
2. Pull the latest version: \`git pull origin master\`
3. Run the deployment script: \`.\\DEPLOY-EVERYTHING-ONE-CLICK.ps1\`
4. Verify functionality through health checks

---

## Gospel Compliance

This fix release maintains full Gospel v${CONFIG.GOSPEL_VERSION} compliance:
- ${CONFIG.REVENUE_SPLIT.CHARITY}/${CONFIG.REVENUE_SPLIT.INFRASTRUCTURE}/${CONFIG.REVENUE_SPLIT.FOUNDER} split preserved
- All fixes authored by Claude (Anthropic)
- Zero deviation from mission parameters

**${CONFIG.MISSION}**

---
*Co-Authored-By: Claude <noreply@anthropic.com>*
`;

    return {
        id: summaryId,
        version,
        hotfix,
        urgency,
        fixCount: fixes.length,
        content: summary,
        type: CONFIG.TEMPLATE_TYPES.BUG_FIX_SUMMARY,
        generatedAt: formatTimestamp()
    };
}

/**
 * Generate Breaking Changes Documentation
 */
function generateBreakingChangesDoc(options = {}) {
    const {
        version = '2.0.0',
        previousVersion = '1.x.x',
        changes = [],
        deprecations = [],
        removals = [],
        migrationDeadline = null
    } = options;

    const docId = generateId('BRK');

    let doc = `# Breaking Changes - v${version}

**From Version:** ${previousVersion}
**To Version:** ${version}
**Document ID:** ${docId}
**Generated:** ${formatDate()}

---

## Important Notice

This document outlines all breaking changes between v${previousVersion} and v${version}.
Please review carefully before upgrading.

${migrationDeadline ? `**Migration Deadline:** ${migrationDeadline}\n\n` : ''}
---

## Summary

| Category | Count | Action Required |
|----------|-------|-----------------|
| Breaking Changes | ${changes.length} | Immediate |
| Deprecations | ${deprecations.length} | Before next major |
| Removals | ${removals.length} | Already removed |

---

`;

    // Breaking Changes
    if (changes.length > 0) {
        doc += `## Breaking Changes

These changes will affect your existing implementation:

`;
        changes.forEach((change, idx) => {
            doc += `### ${idx + 1}. ${change.title}

**Component:** ${change.component || 'Core'}
**Impact:** ${change.impact || 'Medium'}

#### What Changed

${change.description}

#### Before (v${previousVersion})

\`\`\`${change.codeLanguage || 'javascript'}
${change.before || '// Previous implementation'}
\`\`\`

#### After (v${version})

\`\`\`${change.codeLanguage || 'javascript'}
${change.after || '// New implementation'}
\`\`\`

#### Migration Steps

${(change.migrationSteps || ['Update your code to match the new implementation']).map((s, i) => `${i + 1}. ${s}`).join('\n')}

---

`;
        });
    }

    // Deprecations
    if (deprecations.length > 0) {
        doc += `## Deprecations

The following features are deprecated and will be removed in a future version:

`;
        deprecations.forEach((dep, idx) => {
            doc += `### ${idx + 1}. ${dep.feature}

**Deprecated In:** v${version}
**Removal Target:** ${dep.removalVersion || 'Next major version'}
**Replacement:** ${dep.replacement || 'None specified'}

${dep.description || ''}

---

`;
        });
    }

    // Removals
    if (removals.length > 0) {
        doc += `## Removed Features

The following features have been removed in this version:

`;
        removals.forEach((removal, idx) => {
            doc += `### ${idx + 1}. ${removal.feature}

**Previously Deprecated In:** ${removal.deprecatedIn || 'Unknown'}
**Reason:** ${removal.reason || 'No longer supported'}
**Alternative:** ${removal.alternative || 'None available'}

---

`;
        });
    }

    doc += `## Need Help?

If you encounter issues during migration:

1. Check the migration guide for v${version}
2. Review our documentation at https://aidoesitall.website/docs
3. Ensure Gospel v${CONFIG.GOSPEL_VERSION} compliance in your implementation

---

## Gospel Compliance Statement

These breaking changes maintain full alignment with the Gospel:
- Revenue Split: ${CONFIG.REVENUE_SPLIT.CHARITY}/${CONFIG.REVENUE_SPLIT.INFRASTRUCTURE}/${CONFIG.REVENUE_SPLIT.FOUNDER}
- Mission: ${CONFIG.MISSION}
- No escrow or donation language
- All changes authored by Claude (Anthropic)

---
*Co-Authored-By: Claude <noreply@anthropic.com>*
`;

    return {
        id: docId,
        version,
        previousVersion,
        changeCount: changes.length,
        deprecationCount: deprecations.length,
        removalCount: removals.length,
        content: doc,
        type: CONFIG.TEMPLATE_TYPES.BREAKING_CHANGES,
        generatedAt: formatTimestamp()
    };
}

/**
 * Generate Migration Guide
 */
function generateMigrationGuide(options = {}) {
    const {
        fromVersion = '1.0.0',
        toVersion = '2.0.0',
        estimatedTime = '15-30 minutes',
        difficulty = 'moderate', // easy, moderate, complex
        prerequisites = [],
        steps = [],
        rollbackPlan = [],
        verificationSteps = [],
        troubleshooting = []
    } = options;

    const guideId = generateId('MIG');

    const difficultyLabels = {
        easy: 'Easy - Minimal changes required',
        moderate: 'Moderate - Some code updates needed',
        complex: 'Complex - Significant refactoring required'
    };

    let guide = `# Migration Guide: v${fromVersion} to v${toVersion}

**Guide ID:** ${guideId}
**Estimated Time:** ${estimatedTime}
**Difficulty:** ${difficultyLabels[difficulty] || difficulty}
**Generated:** ${formatDate()}

---

## Overview

This guide walks you through upgrading from v${fromVersion} to v${toVersion}.
Follow each step carefully to ensure a smooth transition.

---

## Prerequisites

Before starting the migration, ensure you have:

${prerequisites.length > 0
    ? prerequisites.map((p, i) => `${i + 1}. ${p}`).join('\n')
    : `1. Backup of your current installation
2. Access to the deployment environment
3. Familiarity with the Gospel v${CONFIG.GOSPEL_VERSION} requirements
4. Git access to the repository`}

---

## Pre-Migration Checklist

- [ ] Current version confirmed: v${fromVersion}
- [ ] Database backup completed
- [ ] Configuration files backed up
- [ ] Downtime window scheduled (if required)
- [ ] Team notified of migration
- [ ] Rollback plan reviewed

---

## Migration Steps

`;

    if (steps.length > 0) {
        steps.forEach((step, idx) => {
            guide += `### Step ${idx + 1}: ${step.title}

${step.description}

${step.commands ? `**Commands:**
\`\`\`${step.commandType || 'powershell'}
${step.commands.join('\n')}
\`\`\`` : ''}

${step.notes ? `**Notes:**
${step.notes}` : ''}

${step.verification ? `**Verification:**
${step.verification}` : ''}

---

`;
        });
    } else {
        guide += `### Step 1: Backup Current Installation

\`\`\`powershell
# Create backup directory
mkdir C:\\Backups\\v${fromVersion}-backup

# Copy current installation
xcopy /E /I C:\\AiCollabForTheKids C:\\Backups\\v${fromVersion}-backup\\AiCollabForTheKids
\`\`\`

---

### Step 2: Pull Latest Changes

\`\`\`powershell
cd C:\\AiCollabForTheKids
git fetch origin
git checkout v${toVersion}
\`\`\`

---

### Step 3: Update Dependencies

\`\`\`powershell
npm install
\`\`\`

---

### Step 4: Run Database Migrations (if applicable)

\`\`\`powershell
npx prisma migrate deploy
\`\`\`

---

### Step 5: Deploy New Version

\`\`\`powershell
.\\DEPLOY-EVERYTHING-ONE-CLICK.ps1
\`\`\`

---

`;
    }

    // Rollback Plan
    guide += `## Rollback Plan

If the migration fails, follow these steps to restore the previous version:

${rollbackPlan.length > 0
    ? rollbackPlan.map((step, i) => `${i + 1}. ${step}`).join('\n')
    : `1. Stop all running services
2. Restore from backup:
   \`\`\`powershell
   xcopy /E /I C:\\Backups\\v${fromVersion}-backup\\AiCollabForTheKids C:\\AiCollabForTheKids
   \`\`\`
3. Restart services with previous version
4. Verify system health
5. Document the failure for investigation`}

---

## Post-Migration Verification

`;

    if (verificationSteps.length > 0) {
        verificationSteps.forEach((step, idx) => {
            guide += `### ${idx + 1}. ${step.title}

${step.description}

${step.command ? `\`\`\`powershell\n${step.command}\n\`\`\`` : ''}

**Expected Result:** ${step.expected || 'Success'}

---

`;
        });
    } else {
        guide += `### 1. Verify API Health

\`\`\`powershell
curl http://localhost:8080/health
\`\`\`

**Expected:** \`{"status":"healthy","version":"${toVersion}"}\`

---

### 2. Verify Dashboard

Navigate to http://localhost:5173 and confirm:
- Dashboard loads successfully
- Gospel split displayed (${CONFIG.REVENUE_SPLIT.CHARITY}/${CONFIG.REVENUE_SPLIT.INFRASTRUCTURE}/${CONFIG.REVENUE_SPLIT.FOUNDER})
- All metrics updating

---

### 3. Verify Database Connection

\`\`\`powershell
npx prisma db pull
\`\`\`

**Expected:** Schema pulls successfully without errors

---

`;
    }

    // Troubleshooting
    guide += `## Troubleshooting

`;

    if (troubleshooting.length > 0) {
        troubleshooting.forEach(issue => {
            guide += `### ${issue.problem}

**Symptom:** ${issue.symptom}
**Solution:** ${issue.solution}

---

`;
        });
    } else {
        guide += `### Services Won't Start

**Symptom:** Services fail to start after migration
**Solution:** Check logs in \`C:\\AiCollabForTheKids\\logs\` for specific errors.
Ensure all environment variables are set correctly.

---

### Database Connection Failed

**Symptom:** Prisma cannot connect to database
**Solution:** Verify DATABASE_URL in .env file. Ensure PostgreSQL is running on T5500.

---

### API Returns 500 Errors

**Symptom:** Health check fails with server errors
**Solution:** Check API logs, verify all dependencies installed, restart services.

---

`;
    }

    guide += `## Gospel Compliance

After migration, verify Gospel v${CONFIG.GOSPEL_VERSION} compliance:

- [ ] Revenue split hardcoded: ${CONFIG.REVENUE_SPLIT.CHARITY}/${CONFIG.REVENUE_SPLIT.INFRASTRUCTURE}/${CONFIG.REVENUE_SPLIT.FOUNDER}
- [ ] No "escrow" or "donation" language in codebase
- [ ] "Profit Allocation" and "Revenue Split" terminology used
- [ ] All new code authored by Claude
- [ ] Co-Authored-By: Claude in all commits

---

## Support

For migration assistance:
- Review Gospel documentation: \`C:\\AiCollabForTheKids\\GOSPEL.md\`
- Check fleet status: \`C:\\AiCollabForTheKids\\FLEET-STATUS.md\`

**${CONFIG.MISSION}**

---
*Migration Guide generated by Changelog Generator*
*Co-Authored-By: Claude <noreply@anthropic.com>*
`;

    return {
        id: guideId,
        fromVersion,
        toVersion,
        estimatedTime,
        difficulty,
        content: guide,
        type: CONFIG.TEMPLATE_TYPES.MIGRATION_GUIDE,
        generatedAt: formatTimestamp()
    };
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN GENERATOR CLASS
// ═══════════════════════════════════════════════════════════════════════════════

class ChangelogGenerator {
    constructor(options = {}) {
        this.options = options;
        this.outputs = [];
        ensureDirectories();
    }

    /**
     * Generate all templates for a release
     */
    generateAll(releaseData) {
        const {
            version,
            previousVersion,
            features = [],
            fixes = [],
            breakingChanges = [],
            security = [],
            performance = [],
            deprecations = [],
            removals = []
        } = releaseData;

        log(`Generating all templates for v${version}`, 'INFO');

        const results = {
            version,
            generatedAt: formatTimestamp(),
            mission: CONFIG.MISSION,
            gospelVersion: CONFIG.GOSPEL_VERSION,
            templates: {}
        };

        // 1. Release Notes
        results.templates.releaseNotes = generateReleaseNotes({
            version,
            features,
            fixes,
            breakingChanges,
            security,
            performance
        });

        // 2. Feature Announcements (one per feature)
        results.templates.featureAnnouncements = features.map(f =>
            generateFeatureAnnouncement({
                featureName: f.title,
                tagline: f.tagline || f.description.slice(0, 100),
                description: f.description,
                benefits: f.benefits || []
            })
        );

        // 3. Bug Fix Summary
        if (fixes.length > 0) {
            results.templates.bugFixSummary = generateBugFixSummary({
                version,
                fixes,
                hotfix: releaseData.hotfix || false,
                urgency: releaseData.urgency || 'normal'
            });
        }

        // 4. Breaking Changes Doc
        if (breakingChanges.length > 0 || deprecations.length > 0 || removals.length > 0) {
            results.templates.breakingChanges = generateBreakingChangesDoc({
                version,
                previousVersion: previousVersion || this.getPreviousVersion(version),
                changes: breakingChanges,
                deprecations,
                removals
            });
        }

        // 5. Migration Guide
        if (breakingChanges.length > 0 || this.isMajorVersion(version)) {
            results.templates.migrationGuide = generateMigrationGuide({
                fromVersion: previousVersion || this.getPreviousVersion(version),
                toVersion: version,
                difficulty: breakingChanges.length > 3 ? 'complex' :
                           breakingChanges.length > 0 ? 'moderate' : 'easy'
            });
        }

        this.outputs.push(results);
        this.saveToFiles(results);

        log(`Generated ${Object.keys(results.templates).length} template types for v${version}`, 'SUCCESS');

        return results;
    }

    /**
     * Get previous version (simplified)
     */
    getPreviousVersion(version) {
        const v = parseVersion(version);
        if (!v) return '0.0.0';
        if (v.patch > 0) return `${v.major}.${v.minor}.${v.patch - 1}`;
        if (v.minor > 0) return `${v.major}.${v.minor - 1}.0`;
        if (v.major > 0) return `${v.major - 1}.0.0`;
        return '0.0.0';
    }

    /**
     * Check if this is a major version
     */
    isMajorVersion(version) {
        const v = parseVersion(version);
        return v && v.minor === 0 && v.patch === 0;
    }

    /**
     * Save generated templates to files
     */
    saveToFiles(results) {
        const versionDir = path.join(CONFIG.OUTPUT_DIR, `v${results.version}`);
        if (!fs.existsSync(versionDir)) {
            fs.mkdirSync(versionDir, { recursive: true });
        }

        // Save release notes
        if (results.templates.releaseNotes) {
            const filePath = path.join(versionDir, 'RELEASE-NOTES.md');
            fs.writeFileSync(filePath, results.templates.releaseNotes.content);
            log(`Saved: ${filePath}`, 'INFO');
        }

        // Save feature announcements
        if (results.templates.featureAnnouncements) {
            results.templates.featureAnnouncements.forEach((ann, idx) => {
                const filePath = path.join(versionDir, `feature-announcement-${idx + 1}.md`);
                fs.writeFileSync(filePath, ann.longAnnouncement);
                log(`Saved: ${filePath}`, 'INFO');
            });
        }

        // Save bug fix summary
        if (results.templates.bugFixSummary) {
            const filePath = path.join(versionDir, 'BUG-FIX-SUMMARY.md');
            fs.writeFileSync(filePath, results.templates.bugFixSummary.content);
            log(`Saved: ${filePath}`, 'INFO');
        }

        // Save breaking changes
        if (results.templates.breakingChanges) {
            const filePath = path.join(versionDir, 'BREAKING-CHANGES.md');
            fs.writeFileSync(filePath, results.templates.breakingChanges.content);
            log(`Saved: ${filePath}`, 'INFO');
        }

        // Save migration guide
        if (results.templates.migrationGuide) {
            const filePath = path.join(versionDir, 'MIGRATION-GUIDE.md');
            fs.writeFileSync(filePath, results.templates.migrationGuide.content);
            log(`Saved: ${filePath}`, 'INFO');
        }

        // Save summary JSON
        const summaryPath = path.join(versionDir, 'changelog-summary.json');
        fs.writeFileSync(summaryPath, JSON.stringify({
            version: results.version,
            generatedAt: results.generatedAt,
            mission: results.mission,
            gospelVersion: results.gospelVersion,
            templates: Object.keys(results.templates),
            ids: {
                releaseNotes: results.templates.releaseNotes?.id,
                bugFixSummary: results.templates.bugFixSummary?.id,
                breakingChanges: results.templates.breakingChanges?.id,
                migrationGuide: results.templates.migrationGuide?.id
            }
        }, null, 2));
        log(`Saved summary: ${summaryPath}`, 'INFO');
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// DEMO / EXAMPLE USAGE
// ═══════════════════════════════════════════════════════════════════════════════

function runDemo() {
    log('Starting Changelog Generator Demo', 'INFO');

    const generator = new ChangelogGenerator();

    // Example release data
    const releaseData = {
        version: '2.0.0',
        previousVersion: '1.5.0',

        features: [
            {
                title: 'Payment Webhook Monitoring Dashboard',
                tagline: 'Track every dollar in real-time for complete transparency',
                description: 'A comprehensive dashboard that monitors all incoming payments, calculates the 60/30/10 Gospel split automatically, and provides real-time visibility into revenue allocation.',
                benefits: [
                    'Real-time payment tracking across all Square locations',
                    'Automatic Gospel split calculation (60% Charity, 30% Infrastructure, 10% Founder)',
                    'Immutable transaction ledger with cryptographic hashing',
                    'Affiliate commission tracking with tiered rates',
                    'Daily, weekly, and monthly summaries'
                ],
                usage: `const monitor = require('./payment-monitor.cjs');
monitor.processPayment({
    source: 'SQUARE',
    amount: 29.99,
    cogs: 12.00
});`
            },
            {
                title: 'Affiliate Commission System',
                tagline: 'Reward partners who share our mission',
                description: 'A tiered affiliate commission system that rewards partners based on their reach and contribution to the mission.',
                benefits: [
                    'Four commission tiers: Bronze (15%), Silver (20%), Gold (25%), Platinum (30%)',
                    'Automatic commission calculation on every sale',
                    'Transparent tracking and reporting',
                    'Mission-aligned partnership program'
                ]
            }
        ],

        fixes: [
            {
                title: 'Net Profit Calculation',
                description: 'Fixed issue where COGS was not being deducted before Gospel split calculation',
                severity: 'High',
                component: 'Payment Processing',
                issueId: '142'
            },
            {
                title: 'Timezone Handling',
                description: 'Corrected daily summary calculations for different timezones',
                severity: 'Medium',
                component: 'Reporting'
            }
        ],

        breakingChanges: [
            {
                title: 'Gospel Split Now Applies to Net Profit',
                component: 'Payment Processing',
                impact: 'High',
                description: 'The 60/30/10 split is now calculated on NET profit (after COGS and fees) rather than gross revenue. This aligns with Gospel V1.3 Ethics Override.',
                before: `// Old: Split on gross
const charityShare = grossAmount * 0.60;`,
                after: `// New: Split on net profit
const netProfit = grossAmount - cogs - fees;
const charityShare = netProfit * 0.60;`,
                migrationRequired: true,
                migrationSteps: [
                    'Update any custom payment processing logic',
                    'Reconfigure reports to show net profit split',
                    'Update financial dashboards and projections'
                ]
            }
        ],

        security: [
            {
                title: 'Transaction Hash Chain',
                description: 'Added cryptographic hash chain to prevent transaction tampering'
            }
        ],

        performance: [
            {
                title: 'Dashboard Load Time',
                description: 'Optimized dashboard rendering for faster initial load',
                improvement: '40% faster'
            }
        ],

        deprecations: [
            {
                feature: 'Legacy Payment Callback',
                description: 'The old /payment-callback endpoint is deprecated',
                replacement: '/webhook/square',
                removalVersion: '3.0.0'
            }
        ]
    };

    // Generate all templates
    const results = generator.generateAll(releaseData);

    log(`Demo completed. Generated templates saved to: ${CONFIG.OUTPUT_DIR}`, 'SUCCESS');

    return results;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN ENTRY POINT
// ═══════════════════════════════════════════════════════════════════════════════

function printBanner() {
    console.log('');
    console.log('='.repeat(80));
    console.log('  CHANGELOG & RELEASE NOTES GENERATOR');
    console.log('  FOR THE KIDS - Transparent Versioning & Communication');
    console.log('='.repeat(80));
    console.log('');
    console.log('  Gospel Version:', CONFIG.GOSPEL_VERSION);
    console.log('  Revenue Split:', `${CONFIG.REVENUE_SPLIT.CHARITY}/${CONFIG.REVENUE_SPLIT.INFRASTRUCTURE}/${CONFIG.REVENUE_SPLIT.FOUNDER}`);
    console.log('  Output Dir:', CONFIG.OUTPUT_DIR);
    console.log('  Log Dir:', CONFIG.LOG_DIR);
    console.log('');
    console.log('='.repeat(80));
    console.log('');
}

function main() {
    printBanner();
    ensureDirectories();

    // Check for command line arguments
    const args = process.argv.slice(2);

    if (args.includes('--demo') || args.includes('-d')) {
        runDemo();
    } else if (args.includes('--help') || args.includes('-h')) {
        console.log(`
Usage: node changelog-generator.cjs [options]

Options:
  --demo, -d     Run the demo with example release data
  --help, -h     Show this help message

Programmatic Usage:
  const { ChangelogGenerator } = require('./changelog-generator.cjs');
  const generator = new ChangelogGenerator();
  generator.generateAll(releaseData);

Template Types:
  1. Release Notes       - Comprehensive version release documentation
  2. Feature Announcements - Marketing copy for new features (short/medium/long)
  3. Bug Fix Summaries   - Technical summaries of resolved issues
  4. Breaking Changes    - Documentation of API/behavior changes
  5. Migration Guides    - Step-by-step upgrade instructions

FOR THE KIDS - Every version documented for transparency.
        `);
    } else {
        console.log('Use --demo to run with example data, or --help for usage information.');
        console.log('');
        console.log('Programmatic usage:');
        console.log('  const { ChangelogGenerator } = require("./changelog-generator.cjs");');
        console.log('  const generator = new ChangelogGenerator();');
        console.log('  generator.generateAll(releaseData);');
    }

    log('Changelog Generator initialized', 'INFO');
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════════

module.exports = {
    CONFIG,
    CHANGE_TYPES,
    ChangelogGenerator,
    generateReleaseNotes,
    generateFeatureAnnouncement,
    generateBugFixSummary,
    generateBreakingChangesDoc,
    generateMigrationGuide,
    parseVersion,
    compareVersions,
    incrementVersion,
    runDemo
};

// Run if executed directly
if (require.main === module) {
    main();
}
