# ADHD Guardian V2 - Design Specification

## Executive Summary

Building on the MVP foundation, V2 transforms ADHD Guardian from a beautiful prototype into a clinically-informed, thoroughly tested, production-ready parental monitoring platform. This document synthesizes perspectives from three key personas to create a holistic product vision.

---

## Persona Perspectives

### 1. UI Designer - Sarah Chen
*"The MVP has solid bones, but V2 needs to feel magical while remaining accessible and trustworthy."*

### 2. QA Engineer - Marcus Rodriguez
*"Every interaction must be predictable, every edge case handled, every data point verified."*

### 3. Behavioral Health Professional - Dr. Amara Thompson, Ph.D.
*"Technology should support evidence-based ADHD interventions, not replace clinical judgment."*

---

# PART 1: UI DESIGNER PERSPECTIVE

## 1.1 Design System Overhaul

### New Design Tokens

```css
/* V2 Extended Color Palette */
:root {
  /* Primary Family */
  --primary-50: #eef2ff;
  --primary-100: #e0e7ff;
  --primary-200: #c7d2fe;
  --primary-300: #a5b4fc;
  --primary-400: #818cf8;
  --primary-500: #6366f1;
  --primary-600: #4f46e5;
  --primary-700: #4338ca;

  /* Semantic Colors - ADHD Friendly */
  --calm-blue: #3b82f6;      /* Focus states */
  --success-green: #10b981;   /* Achievements */
  --gentle-amber: #f59e0b;    /* Gentle warnings */
  --alert-coral: #f87171;     /* Important alerts (softer than pure red) */

  /* Neurodivergent-Friendly Additions */
  --focus-ring: rgba(99, 102, 241, 0.5);
  --reduced-motion-duration: 0ms;
  --standard-motion-duration: 200ms;

  /* Spacing Scale (8pt grid) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
}
```

### Typography Refinements

```css
/* Improved readability for extended reading */
:root {
  --font-body: 'Inter', system-ui, sans-serif;
  --font-display: 'Outfit', 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Line heights optimized for ADHD reading */
  --line-height-tight: 1.3;
  --line-height-normal: 1.6;
  --line-height-relaxed: 1.8;

  /* Increased base size for accessibility */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 2rem;      /* 32px */
}
```

## 1.2 New Component Library

### Card Variants
```
┌─────────────────────────────────────┐
│  STAT CARD                          │
│  ┌─────┐                            │
│  │ 📊  │  Focus Streak              │
│  └─────┘  12 days                   │
│           ▲ +3 from last week       │
│  [████████████░░░░] 80%             │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  ACTION CARD (with urgency levels)  │
│  ⚠️ MEDICATION DUE                  │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  Ritalin 10mg                       │
│  Due in 15 minutes                  │
│                                     │
│  [ Snooze 10m ]  [ ✓ Mark Taken ]   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  INSIGHT CARD (AI-generated)        │
│  🤖 Guardian Insight                │
│  ─────────────────────────────────  │
│  "Leo's focus improved 23% on days  │
│   with morning exercise. Consider   │
│   scheduling PE before core         │
│   subjects."                        │
│                                     │
│  Based on: 14 days of data          │
│  Confidence: High (87%)             │
│  [ Learn More ] [ Dismiss ]         │
└─────────────────────────────────────┘
```

### Navigation Redesign

**Problem:** Current sidebar wastes space and lacks contextual awareness.

**Solution:** Adaptive navigation with contextual actions

```
┌──────────────────────────────────────────────────────┐
│ ADHD Guardian                    🔔 3  👤 Sarah ▼   │
├────────┬─────────────────────────────────────────────┤
│        │                                             │
│  🏠    │  Dashboard                                  │
│  ━━    │  ─────────────────────────────────────────  │
│        │                                             │
│  💊    │  Quick Actions for this view:              │
│        │  [ + Add Medication ] [ 📊 Export Report ] │
│  📱    │                                             │
│        │  ┌─────────────────────────────────────┐   │
│  🏃    │  │                                     │   │
│        │  │    Main Content Area                │   │
│  🤖    │  │                                     │   │
│        │  └─────────────────────────────────────┘   │
│        │                                             │
│ ────── │                                             │
│  ⚙️    │  Context Panel (collapsible)               │
│  ❓    │  ┌─────────────────────────────────────┐   │
│        │  │ Related: Recent alerts, Tips, Help  │   │
└────────┴──┴─────────────────────────────────────┴───┘
```

## 1.3 New Page Designs

### Dashboard V2 - "Command Center"

```
┌─────────────────────────────────────────────────────────────────┐
│  Good morning, Sarah 👋                     Dec 7, 2024  9:42 AM │
│  Leo is having a great day so far.                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─── PRIORITY ALERTS ───────────────────────────────────────┐  │
│  │ 🔴 Medication due in 18 minutes          [ Take Action ]  │  │
│  │ 🟡 Screen time at 80% of daily limit     [ Adjust ]       │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌───────────┐  │
│  │ Focus Score │ │ Med Streak  │ │ Screen Time │ │ Activity  │  │
│  │     87%     │ │   12 days   │ │  2h 15m     │ │  45 min   │  │
│  │   ▲ +5%     │ │   ▲ +3      │ │  of 4h      │ │  today    │  │
│  └─────────────┘ └─────────────┘ └─────────────┘ └───────────┘  │
│                                                                 │
│  ┌─── TODAY'S TIMELINE ──────────────────────────────────────┐  │
│  │                                                           │  │
│  │  8:00 ━━●━━ Medication taken ✓                           │  │
│  │         │                                                 │  │
│  │  9:30 ━━●━━ School started                               │  │
│  │         │                                                 │  │
│  │ 12:00 ━━○━━ Medication due (upcoming)                    │  │
│  │         │                                                 │  │
│  │  3:30 ━━○━━ Soccer practice                              │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─── WEEKLY TRENDS ─────────┐  ┌─── AI INSIGHTS ───────────┐  │
│  │   📈 Screen Time          │  │  "Leo's best focus hours  │  │
│  │   [Chart visualization]   │  │   are 9-11 AM. Consider   │  │
│  │                           │  │   scheduling challenging  │  │
│  │   📊 Focus Distribution   │  │   homework during this    │  │
│  │   [Pie chart]             │  │   window."                │  │
│  └───────────────────────────┘  └───────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Medication Tracker V2 - "Health Hub"

```
┌─────────────────────────────────────────────────────────────────┐
│  Medication Tracker                        [ + Add Medication ] │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─── TODAY'S SCHEDULE ──────────────────────────────────────┐  │
│  │                                                           │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │ ⏰ 8:00 AM                              ✓ TAKEN     │  │  │
│  │  │ ┌──────┐                                            │  │  │
│  │  │ │ 💊   │  Ritalin 10mg                             │  │  │
│  │  │ └──────┘  Take with breakfast                      │  │  │
│  │  │           Taken at 8:03 AM                         │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │                                                           │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │ ⏰ 12:00 PM                           ⏳ IN 18 MIN  │  │  │
│  │  │ ┌──────┐                                            │  │  │
│  │  │ │ 💊   │  Ritalin 10mg                             │  │  │
│  │  │ └──────┘  Take with lunch                          │  │  │
│  │  │                                                     │  │  │
│  │  │  [ Snooze 15m ]  [ Skip (log reason) ]  [ ✓ Take ] │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─── ADHERENCE ANALYTICS ───┐  ┌─── SIDE EFFECT LOG ───────┐  │
│  │                           │  │                           │  │
│  │  This Week: 94%           │  │  Recent Reports:          │  │
│  │  [■■■■■■■■■□] 28/30       │  │                           │  │
│  │                           │  │  Dec 5 - Mild headache    │  │
│  │  ┌─────────────────────┐  │  │  Dec 3 - Appetite low     │  │
│  │  │ Monthly Calendar    │  │  │                           │  │
│  │  │ with dose markers   │  │  │  [ + Log Side Effect ]    │  │
│  │  └─────────────────────┘  │  │                           │  │
│  │                           │  │  [ Export for Doctor ]    │  │
│  └───────────────────────────┘  └───────────────────────────┘  │
│                                                                 │
│  ┌─── MEDICATION EFFECTIVENESS CORRELATION ──────────────────┐  │
│  │  Focus Score vs. Medication Timing                        │  │
│  │  [Line chart showing correlation]                         │  │
│  │                                                           │  │
│  │  💡 Insight: Focus scores are 15% higher when medication │  │
│  │     is taken within 30 minutes of scheduled time.         │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Device Monitor V2 - "Digital Wellness Center"

```
┌─────────────────────────────────────────────────────────────────┐
│  Digital Wellness                              [ ⚙️ Settings ] │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─── REAL-TIME STATUS ──────────────────────────────────────┐  │
│  │                                                           │  │
│  │  📱 Leo's iPad                    🟢 Active Now           │  │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │  │
│  │  Currently using: Minecraft (Educational Mode)            │  │
│  │  Session: 23 minutes                                      │  │
│  │                                                           │  │
│  │  [ 🔒 Lock Now ]  [ 📩 Send Message ]  [ 👁️ View Screen ] │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─── TODAY'S BREAKDOWN ─────────────────────────────────────┐  │
│  │                                                           │  │
│  │  Total: 2h 15m of 4h limit                               │  │
│  │  [████████████████████░░░░░░░░░░░░░░░░] 56%              │  │
│  │                                                           │  │
│  │  By Category:                                             │  │
│  │  ┌──────────────┬───────┬─────────┬──────────────────┐   │  │
│  │  │ Category     │ Time  │ Limit   │ Status           │   │  │
│  │  ├──────────────┼───────┼─────────┼──────────────────┤   │  │
│  │  │ 🎮 Gaming    │ 45m   │ 2h      │ ✅ On track      │   │  │
│  │  │ 📚 Education │ 1h 10m│ 3h      │ ⭐ Exceeding!    │   │  │
│  │  │ 📱 Social    │ 15m   │ 1h      │ ✅ On track      │   │  │
│  │  │ 🎬 Video     │ 5m    │ 1h      │ ✅ On track      │   │  │
│  │  └──────────────┴───────┴─────────┴──────────────────┘   │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─── SMART LIMITS ──────────┐  ┌─── CONTENT SAFETY ────────┐  │
│  │                           │  │                           │  │
│  │  Bedtime Mode: 8:30 PM    │  │  Blocked Today: 3         │  │
│  │  [Toggle: ON]             │  │                           │  │
│  │                           │  │  • Inappropriate ad       │  │
│  │  School Hours Block       │  │  • Chat spam attempt      │  │
│  │  8 AM - 3 PM weekdays     │  │  • Age-restricted video   │  │
│  │  [Toggle: ON]             │  │                           │  │
│  │                           │  │  [ View Details ]         │  │
│  │  [ Edit Schedules ]       │  │  [ Adjust Filters ]       │  │
│  └───────────────────────────┘  └───────────────────────────┘  │
│                                                                 │
│  ┌─── WEEKLY SCREEN TIME TRENDS ─────────────────────────────┐  │
│  │  [Interactive chart with day-by-day breakdown]            │  │
│  │                                                           │  │
│  │  Avg this week: 3.2h/day (▼ 12% from last week)          │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 1.4 Interaction Patterns

### Micro-interactions

1. **Medication Completion**
   - Card scales down slightly on press
   - Checkmark animates in with satisfying "pop"
   - Confetti burst (can be disabled in settings)
   - Card slides to "completed" section with spring animation

2. **Alert Dismissal**
   - Swipe-to-dismiss on mobile
   - Fade out with optional "undo" toast
   - Haptic feedback (mobile)

3. **Real-time Updates**
   - Subtle pulse animation for live data
   - Smooth counter animations for time displays
   - Progressive loading states (skeleton → blur → sharp)

### Accessibility Enhancements

```css
/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  :root {
    --bg-primary: #000000;
    --text-primary: #ffffff;
    --primary: #6366f1;
    --border-color: #ffffff;
  }

  .glass-panel {
    background: #000000;
    border: 2px solid #ffffff;
  }
}

/* Focus indicators */
:focus-visible {
  outline: 3px solid var(--focus-ring);
  outline-offset: 2px;
}
```

---

# PART 2: QA ENGINEER PERSPECTIVE

## 2.1 Test Coverage Requirements

### Unit Test Coverage Targets

| Component Category | Target Coverage | Priority |
|-------------------|-----------------|----------|
| State Management  | 95%             | Critical |
| Form Validation   | 100%            | Critical |
| Data Transformations | 90%          | High     |
| UI Components     | 80%             | Medium   |
| Utility Functions | 100%            | High     |

### Test Categories

#### A. Component Tests
```typescript
// Example: MedicationCard.test.tsx
describe('MedicationCard', () => {
  it('renders medication details correctly', () => {});
  it('shows correct time until due', () => {});
  it('handles mark as taken interaction', () => {});
  it('persists state to localStorage', () => {});
  it('shows loading state during async operations', () => {});
  it('handles error states gracefully', () => {});
  it('is keyboard accessible', () => {});
  it('meets WCAG 2.1 AA standards', () => {});
});
```

#### B. Integration Tests
```typescript
// Example: MedicationFlow.integration.test.tsx
describe('Medication Management Flow', () => {
  it('complete flow: view → take → confirm → update dashboard', () => {});
  it('handles offline mode gracefully', () => {});
  it('syncs correctly when coming back online', () => {});
  it('handles concurrent updates from multiple devices', () => {});
});
```

#### C. E2E Tests (Playwright)
```typescript
// Example: critical-paths.spec.ts
test.describe('Critical User Journeys', () => {
  test('Parent can mark medication as taken', async ({ page }) => {});
  test('Parent can adjust screen time limits', async ({ page }) => {});
  test('Parent receives and responds to alerts', async ({ page }) => {});
  test('Parent can export medication history', async ({ page }) => {});
});
```

## 2.2 Edge Cases & Error Handling

### Data Validation Matrix

| Field | Validation Rules | Error Message |
|-------|-----------------|---------------|
| Child Name | 1-50 chars, letters/spaces only | "Name must be 1-50 characters" |
| Medication Name | 1-100 chars | "Medication name required" |
| Dosage | Format: `Xmg` or `X mg` | "Enter valid dosage (e.g., 10mg)" |
| Time | HH:MM format | "Enter valid time" |
| Screen Limit | 0-24 hours | "Limit must be between 0-24 hours" |

### Error States to Handle

```typescript
enum ErrorType {
  NETWORK_ERROR = 'network_error',
  SYNC_CONFLICT = 'sync_conflict',
  VALIDATION_ERROR = 'validation_error',
  AUTH_ERROR = 'auth_error',
  PERMISSION_DENIED = 'permission_denied',
  DEVICE_OFFLINE = 'device_offline',
  DATA_CORRUPTED = 'data_corrupted',
  RATE_LIMITED = 'rate_limited',
}

interface ErrorState {
  type: ErrorType;
  message: string;
  recoveryAction?: () => void;
  retryable: boolean;
  userFriendlyMessage: string;
}
```

### Edge Cases Checklist

**Time-Based**
- [ ] Medication scheduled across midnight
- [ ] Daylight saving time transitions
- [ ] Different timezones (parent traveling)
- [ ] Device clock is incorrect
- [ ] Multiple medications at same time

**Data Integrity**
- [ ] localStorage quota exceeded
- [ ] Corrupted localStorage data
- [ ] Missing required fields in saved data
- [ ] Duplicate medication entries
- [ ] Future-dated entries

**Device States**
- [ ] Child device offline for extended period
- [ ] App force-closed during sync
- [ ] Multiple parents editing simultaneously
- [ ] Device runs out of battery mid-session
- [ ] App update while in use

**User Interactions**
- [ ] Rapid repeated button clicks
- [ ] Browser back/forward navigation
- [ ] Form submission while offline
- [ ] Tab/browser closed during action
- [ ] Session timeout during form entry

## 2.3 Performance Benchmarks

### Load Time Targets

| Metric | Target | Max Acceptable |
|--------|--------|----------------|
| First Contentful Paint | < 1.0s | 1.5s |
| Largest Contentful Paint | < 2.0s | 3.0s |
| Time to Interactive | < 2.5s | 4.0s |
| Cumulative Layout Shift | < 0.1 | 0.25 |
| First Input Delay | < 50ms | 100ms |

### Bundle Size Targets

| Chunk | Max Size (gzipped) |
|-------|-------------------|
| Initial JS | 150KB |
| Initial CSS | 30KB |
| Per-route chunk | 50KB |
| Total application | 500KB |

### Runtime Performance

| Operation | Target | Test Method |
|-----------|--------|-------------|
| Dashboard render | < 100ms | Performance.measure |
| Chart update | < 50ms | Frame timing |
| Navigation | < 200ms | Route change timing |
| Form validation | < 16ms | Synchronous check |
| List scroll (60fps) | 16.67ms/frame | Frame budget |

## 2.4 Security Testing

### OWASP Top 10 Checklist

- [ ] A01: Broken Access Control
- [ ] A02: Cryptographic Failures
- [ ] A03: Injection (XSS focus for SPA)
- [ ] A04: Insecure Design
- [ ] A05: Security Misconfiguration
- [ ] A06: Vulnerable Components
- [ ] A07: Auth Failures
- [ ] A08: Data Integrity Failures
- [ ] A09: Logging Failures
- [ ] A10: SSRF (if applicable)

### Data Privacy Tests

```typescript
describe('Privacy Compliance', () => {
  it('does not log sensitive data to console', () => {});
  it('sanitizes all user inputs before storage', () => {});
  it('encrypts sensitive data at rest', () => {});
  it('clears data completely on account deletion', () => {});
  it('respects Do Not Track header', () => {});
  it('COPPA compliant for child data', () => {});
});
```

## 2.5 Automated Testing Pipeline

```yaml
# .github/workflows/test.yml
name: Test Suite

on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install dependencies
        run: npm ci
      - name: Run unit tests
        run: npm run test:unit -- --coverage
      - name: Upload coverage
        uses: codecov/codecov-action@v3

  integration-tests:
    runs-on: ubuntu-latest
    steps:
      - name: Run integration tests
        run: npm run test:integration

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - name: Install Playwright
        run: npx playwright install
      - name: Run E2E tests
        run: npm run test:e2e
      - name: Upload test artifacts
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/

  accessibility-audit:
    runs-on: ubuntu-latest
    steps:
      - name: Run axe accessibility tests
        run: npm run test:a11y

  performance-audit:
    runs-on: ubuntu-latest
    steps:
      - name: Run Lighthouse CI
        run: npm run lighthouse
```

---

# PART 3: BEHAVIORAL HEALTH PROFESSIONAL PERSPECTIVE

## 3.1 Clinical Framework Integration

### Evidence-Based ADHD Interventions

The V2 design incorporates strategies from established ADHD treatment frameworks:

| Framework | Application in App |
|-----------|-------------------|
| **Behavioral Parent Training (BPT)** | Guided behavior tracking, reward systems, consistency prompts |
| **Cognitive Behavioral Therapy (CBT)** | Thought logging, pattern recognition, coping strategy suggestions |
| **Executive Function Coaching** | Task breakdown, time estimation helpers, working memory aids |
| **Positive Behavioral Interventions (PBIS)** | Token economy system, positive reinforcement emphasis |

### New "Insights Engine" Module

```typescript
interface BehavioralInsight {
  id: string;
  type: 'pattern' | 'suggestion' | 'alert' | 'achievement';
  category: 'medication' | 'screen_time' | 'focus' | 'behavior' | 'sleep';

  // Clinical backing
  evidenceLevel: 'high' | 'moderate' | 'low' | 'anecdotal';
  sourceStudies?: string[];  // Links to research

  // Content
  title: string;
  description: string;
  actionableSteps?: string[];

  // Tracking
  generatedAt: Date;
  expiresAt?: Date;
  userDismissed: boolean;
  userActedOn: boolean;
}

// Example insight
const sampleInsight: BehavioralInsight = {
  id: 'insight-001',
  type: 'pattern',
  category: 'medication',
  evidenceLevel: 'high',
  sourceStudies: ['doi:10.1000/adhd-timing-study'],
  title: 'Medication Timing Correlation Found',
  description: 'Leo\'s focus scores are 23% higher when medication is taken within 15 minutes of the scheduled time. Consistent timing helps maintain stable medication levels.',
  actionableSteps: [
    'Set a phone alarm 5 minutes before medication time',
    'Prepare medication the night before',
    'Create a consistent morning routine'
  ],
  generatedAt: new Date(),
  expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  userDismissed: false,
  userActedOn: false
};
```

## 3.2 Medication Management Enhancements

### Clinical Data Tracking

```typescript
interface MedicationEntry {
  id: string;
  medicationId: string;

  // Timing
  scheduledTime: Date;
  actualTime?: Date;
  timingVariance?: number; // minutes early/late

  // Status
  status: 'pending' | 'taken' | 'skipped' | 'late';
  skipReason?: 'forgot' | 'side_effects' | 'not_needed' | 'ran_out' | 'other';
  skipNote?: string;

  // Context (for clinical correlation)
  contextTags?: ('school_day' | 'weekend' | 'vacation' | 'sick_day')[];

  // Effectiveness tracking (parent-reported)
  effectivenessRating?: 1 | 2 | 3 | 4 | 5;
  effectivenessNotes?: string;
}

interface SideEffectReport {
  id: string;
  medicationId: string;
  reportedAt: Date;

  // Structured symptoms (ADHD medication common side effects)
  symptoms: {
    appetiteLoss: SeverityLevel;
    sleepDifficulty: SeverityLevel;
    headache: SeverityLevel;
    stomachache: SeverityLevel;
    moodChanges: SeverityLevel;
    irritability: SeverityLevel;
    tics: SeverityLevel;
    other?: string;
  };

  severity: 'mild' | 'moderate' | 'severe';
  duration: 'brief' | 'few_hours' | 'all_day' | 'multiple_days';
  impactOnFunction: 'none' | 'minor' | 'significant';

  notes?: string;

  // For sharing with healthcare provider
  shareWithProvider: boolean;
}

type SeverityLevel = 0 | 1 | 2 | 3; // none, mild, moderate, severe
```

### Provider Report Generation

```typescript
interface ProviderReport {
  generatedAt: Date;
  reportPeriod: { start: Date; end: Date };
  childInfo: { name: string; age: number };

  medicationSummary: {
    medications: Array<{
      name: string;
      dosage: string;
      schedule: string;
      adherenceRate: number;
      averageTimingVariance: number;
    }>;
    overallAdherence: number;
    missedDoses: number;
    lateDoses: number;
  };

  sideEffects: {
    totalReports: number;
    mostCommon: string[];
    severityDistribution: Record<string, number>;
    timeline: Array<{ date: Date; symptoms: string[] }>;
  };

  behavioralCorrelations: {
    focusScoresByMedicationTiming: Array<{ timing: string; avgScore: number }>;
    screenTimeByDay: Array<{ day: string; hours: number }>;
    sleepPatterns?: Array<{ date: Date; quality: number }>;
  };

  parentNotes: string[];

  // Export formats
  exportAsPDF(): Promise<Blob>;
  exportAsCSV(): Promise<Blob>;
}
```

## 3.3 Behavioral Tracking System

### Comprehensive Behavior Log

```typescript
interface BehaviorEvent {
  id: string;
  timestamp: Date;

  // Classification
  type: 'positive' | 'challenge' | 'neutral';
  category:
    | 'focus'
    | 'impulse_control'
    | 'emotional_regulation'
    | 'social'
    | 'task_completion'
    | 'transition'
    | 'sleep'
    | 'eating';

  // Context
  setting: 'home' | 'school' | 'public' | 'therapy' | 'other';
  activityDuring?: string;
  triggersIdentified?: string[];

  // Description
  description: string;
  intensity?: 1 | 2 | 3 | 4 | 5;
  duration?: number; // minutes

  // Response
  parentResponse?: string;
  effectivenessOfResponse?: 1 | 2 | 3 | 4 | 5;

  // For pattern analysis
  precedingEvents?: string[];
  consequentEvents?: string[];
}

// ABC (Antecedent-Behavior-Consequence) Logging
interface ABCEntry {
  id: string;
  timestamp: Date;

  antecedent: {
    description: string;
    setting: string;
    peoplePresent?: string[];
    timeOfDay: string;
    activityBefore?: string;
  };

  behavior: {
    description: string;
    category: string;
    intensity: 1 | 2 | 3 | 4 | 5;
    duration?: number;
  };

  consequence: {
    parentResponse: string;
    childReaction: string;
    environmentChange?: string;
    resolutionTime?: number;
  };

  // Analysis helpers
  patterns?: string[];
  suggestedStrategies?: string[];
}
```

## 3.4 Reward & Motivation System

### Token Economy Implementation

```typescript
interface RewardSystem {
  childId: string;

  // Token balance
  currentTokens: number;
  lifetimeTokensEarned: number;

  // Earning rules (customizable by parent)
  earningOpportunities: Array<{
    id: string;
    behavior: string;
    tokensEarned: number;
    frequency: 'per_occurrence' | 'daily' | 'weekly';
    maxPerDay?: number;
    active: boolean;
  }>;

  // Reward menu (customizable by parent)
  rewardMenu: Array<{
    id: string;
    name: string;
    description: string;
    tokenCost: number;
    category: 'screen_time' | 'activity' | 'privilege' | 'item';
    available: boolean;
  }>;

  // History
  transactions: Array<{
    id: string;
    timestamp: Date;
    type: 'earned' | 'spent' | 'bonus' | 'adjustment';
    amount: number;
    reason: string;
  }>;
}

// Default earning opportunities (evidence-based)
const defaultEarningOpportunities = [
  { behavior: 'Medication taken on time', tokensEarned: 5, frequency: 'per_occurrence' },
  { behavior: 'Completed homework without prompting', tokensEarned: 10, frequency: 'daily' },
  { behavior: 'Followed screen time limits', tokensEarned: 5, frequency: 'daily' },
  { behavior: 'Used coping strategy when frustrated', tokensEarned: 10, frequency: 'per_occurrence' },
  { behavior: 'Smooth transition between activities', tokensEarned: 3, frequency: 'per_occurrence' },
  { behavior: 'Completed morning routine independently', tokensEarned: 10, frequency: 'daily' },
];
```

## 3.5 Clinical Boundaries & Disclaimers

### Important Guardrails

```typescript
// Displayed prominently in app
const clinicalDisclaimers = {
  general: `
    ADHD Guardian is a support tool for parents and caregivers. It is NOT a
    substitute for professional medical advice, diagnosis, or treatment.
    Always consult with qualified healthcare providers for medical decisions.
  `,

  medication: `
    Medication tracking features are for organizational purposes only.
    Never adjust medication dosages or schedules without consulting your
    child's prescribing physician. If you observe concerning side effects,
    contact your healthcare provider immediately.
  `,

  insights: `
    AI-generated insights are based on patterns in your data and general
    ADHD research. They are suggestions for discussion with your healthcare
    team, not clinical recommendations. Individual responses to interventions
    vary significantly.
  `,

  emergency: `
    If your child is experiencing a mental health crisis, thoughts of
    self-harm, or severe medication reactions, contact emergency services
    (911) or the 988 Suicide & Crisis Lifeline immediately.
  `,

  privacyNote: `
    Health data entered in this app is stored locally on your device by
    default. If you choose to enable cloud sync, data is encrypted in
    transit and at rest. You can export or delete all data at any time.
  `
};
```

## 3.6 Therapeutic Feature Additions

### Calm-Down Toolkit

```typescript
interface CalmDownTool {
  id: string;
  name: string;
  description: string;
  ageRange: { min: number; max: number };
  duration: number; // seconds
  category: 'breathing' | 'grounding' | 'movement' | 'sensory' | 'cognitive';

  // Content
  instructions: string[];
  audioGuide?: string; // URL to audio file
  visualGuide?: string; // URL to animation/video

  // Tracking
  timesUsed: number;
  averageEffectivenessRating: number;
}

const builtInTools: CalmDownTool[] = [
  {
    id: 'breathing-4-7-8',
    name: '4-7-8 Breathing',
    description: 'A calming breathing technique to reduce anxiety',
    ageRange: { min: 6, max: 18 },
    duration: 60,
    category: 'breathing',
    instructions: [
      'Breathe in through your nose for 4 seconds',
      'Hold your breath for 7 seconds',
      'Exhale slowly through your mouth for 8 seconds',
      'Repeat 3-4 times'
    ]
  },
  {
    id: 'grounding-5-4-3-2-1',
    name: '5-4-3-2-1 Grounding',
    description: 'Use your senses to return to the present moment',
    ageRange: { min: 5, max: 18 },
    duration: 120,
    category: 'grounding',
    instructions: [
      'Name 5 things you can SEE',
      'Name 4 things you can TOUCH',
      'Name 3 things you can HEAR',
      'Name 2 things you can SMELL',
      'Name 1 thing you can TASTE'
    ]
  }
];
```

### Parent Psychoeducation Module

```typescript
interface EducationalContent {
  id: string;
  title: string;
  category:
    | 'understanding_adhd'
    | 'medication'
    | 'behavior_strategies'
    | 'school_support'
    | 'emotional_support'
    | 'self_care';

  format: 'article' | 'video' | 'infographic' | 'checklist' | 'quiz';
  readTime: number; // minutes

  content: string; // Rich text or markdown
  keyTakeaways: string[];
  actionItems?: string[];

  // Sources
  references: Array<{
    title: string;
    authors: string;
    publication: string;
    year: number;
    doi?: string;
  }>;

  // Engagement
  bookmarked: boolean;
  completed: boolean;
  helpfulRating?: 1 | 2 | 3 | 4 | 5;
}

// Content categories for parent education
const educationalCategories = [
  {
    id: 'understanding_adhd',
    name: 'Understanding ADHD',
    topics: [
      'What is ADHD? (Neuroscience basics)',
      'Types of ADHD: Inattentive, Hyperactive, Combined',
      'ADHD across the lifespan',
      'ADHD and co-occurring conditions',
      'Strengths associated with ADHD'
    ]
  },
  {
    id: 'behavior_strategies',
    name: 'Behavior Strategies',
    topics: [
      'Positive reinforcement techniques',
      'Setting effective boundaries',
      'Handling meltdowns and emotional dysregulation',
      'Building executive function skills',
      'Creating ADHD-friendly home environments'
    ]
  }
];
```

---

# PART 4: V2 FEATURE ROADMAP

## Phase 1: Foundation (Weeks 1-4)

### Infrastructure
- [ ] Backend API setup (Node.js/Express or Python/FastAPI)
- [ ] Database schema design (PostgreSQL)
- [ ] Authentication system (OAuth 2.0, parent accounts)
- [ ] Real-time sync infrastructure (WebSockets/SSE)

### Core Features
- [ ] User account management
- [ ] Multi-child profile support
- [ ] Basic medication tracking with persistence
- [ ] Screen time limits (manual entry)

### Testing
- [ ] Unit test framework setup
- [ ] CI/CD pipeline
- [ ] Basic E2E tests for critical paths

## Phase 2: Device Integration (Weeks 5-8)

### Device Monitoring
- [ ] iOS Screen Time API integration
- [ ] Android Digital Wellbeing integration
- [ ] Real-time device status
- [ ] App usage tracking
- [ ] Content filtering configuration

### Enhanced UI
- [ ] Dashboard V2 redesign
- [ ] Improved responsive layout
- [ ] Accessibility audit and fixes
- [ ] Animation refinements

## Phase 3: Intelligence Layer (Weeks 9-12)

### AI Features
- [ ] Pattern detection engine
- [ ] Behavioral insight generation
- [ ] Natural language chat interface
- [ ] Smart notification timing

### Clinical Features
- [ ] Medication effectiveness correlation
- [ ] Side effect tracking with structured data
- [ ] Provider report generation
- [ ] ABC behavior logging

## Phase 4: Engagement & Growth (Weeks 13-16)

### Reward System
- [ ] Token economy implementation
- [ ] Custom reward menu
- [ ] Achievement badges
- [ ] Progress celebrations

### Education & Support
- [ ] Parent psychoeducation content
- [ ] Calm-down toolkit
- [ ] Resource library
- [ ] Community features (optional)

---

# APPENDICES

## A. Accessibility Compliance Checklist

- [ ] WCAG 2.1 AA compliance
- [ ] Screen reader compatibility (VoiceOver, NVDA)
- [ ] Keyboard navigation throughout
- [ ] Color contrast ratios ≥ 4.5:1
- [ ] Focus indicators on all interactive elements
- [ ] Alternative text for all images
- [ ] Captions for video content
- [ ] Reduced motion support
- [ ] Text resizing up to 200%
- [ ] Touch targets ≥ 44x44px

## B. Privacy & Compliance

- [ ] COPPA compliance (children's data)
- [ ] HIPAA considerations (health data)
- [ ] GDPR compliance (EU users)
- [ ] Data encryption at rest and in transit
- [ ] Data retention policies
- [ ] Right to deletion implementation
- [ ] Privacy policy documentation
- [ ] Terms of service

## C. Performance Optimization Strategies

1. **Code Splitting**: Route-based lazy loading
2. **Image Optimization**: WebP format, responsive images
3. **Caching**: Service worker, HTTP caching headers
4. **Bundle Analysis**: Regular bundle size audits
5. **Virtualization**: For long lists (activities, logs)
6. **Memoization**: React.memo, useMemo for expensive computations

---

*Document Version: 2.0.0*
*Last Updated: December 7, 2024*
*Contributors: UI Designer (Sarah Chen), QA Engineer (Marcus Rodriguez), Behavioral Health Professional (Dr. Amara Thompson)*
