// ===== V2 TYPE DEFINITIONS =====

// ===== MEDICATION TYPES =====
export type MedicationStatus = 'pending' | 'taken' | 'skipped' | 'late';
export type SeverityLevel = 0 | 1 | 2 | 3; // none, mild, moderate, severe

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  schedule: {
    times: string[]; // e.g., ["08:00", "12:00", "18:00"]
    frequency: 'daily' | 'weekly' | 'as_needed';
    daysOfWeek?: number[]; // 0-6 for weekly
  };
  notes?: string;
  color?: string;
  active: boolean;
  createdAt: Date;
}

export interface MedicationEntry {
  id: string;
  medicationId: string;
  scheduledTime: Date;
  actualTime?: Date;
  status: MedicationStatus;
  timingVariance?: number; // minutes early (negative) or late (positive)
  skipReason?: 'forgot' | 'side_effects' | 'not_needed' | 'ran_out' | 'other';
  skipNote?: string;
  contextTags?: ('school_day' | 'weekend' | 'vacation' | 'sick_day')[];
  effectivenessRating?: 1 | 2 | 3 | 4 | 5;
  effectivenessNotes?: string;
}

export interface SideEffectReport {
  id: string;
  medicationId: string;
  reportedAt: Date;
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
  shareWithProvider: boolean;
}

// ===== DEVICE & SCREEN TIME TYPES =====
export type DeviceStatus = 'online' | 'offline' | 'locked';
export type AppCategory = 'gaming' | 'education' | 'social' | 'video' | 'productivity' | 'other';

export interface Device {
  id: string;
  name: string;
  type: 'tablet' | 'phone' | 'computer';
  status: DeviceStatus;
  lastSeen: Date;
  currentApp?: string;
  sessionStart?: Date;
}

export interface ScreenTimeLimit {
  category: AppCategory;
  dailyLimitMinutes: number;
  weekdayLimitMinutes?: number;
  weekendLimitMinutes?: number;
}

export interface AppUsageEntry {
  id: string;
  deviceId: string;
  appName: string;
  category: AppCategory;
  startTime: Date;
  endTime?: Date;
  durationMinutes: number;
}

export interface ContentBlock {
  id: string;
  timestamp: Date;
  deviceId: string;
  reason: string;
  appName?: string;
  url?: string;
  severity: 'low' | 'medium' | 'high';
}

// ===== ACTIVITY TYPES =====
export type ActivityType = 'sport' | 'creative' | 'educational' | 'social' | 'outdoor' | 'therapy';

export interface Activity {
  id: string;
  title: string;
  type: ActivityType;
  scheduledDate: Date;
  scheduledTime: string;
  duration: number; // minutes
  location?: string;
  recurring?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    daysOfWeek?: number[];
  };
  notes?: string;
  completed: boolean;
  completedAt?: Date;
}

export interface ActivityRecommendation {
  id: string;
  title: string;
  description: string;
  type: ActivityType;
  imageUrl?: string;
  distance?: string;
  rating?: number;
  tags: string[];
  ageRange?: { min: number; max: number };
}

// ===== BEHAVIOR & INSIGHTS TYPES =====
export type BehaviorType = 'positive' | 'challenge' | 'neutral';
export type BehaviorCategory =
  | 'focus'
  | 'impulse_control'
  | 'emotional_regulation'
  | 'social'
  | 'task_completion'
  | 'transition'
  | 'sleep'
  | 'eating';

export interface BehaviorEvent {
  id: string;
  timestamp: Date;
  type: BehaviorType;
  category: BehaviorCategory;
  setting: 'home' | 'school' | 'public' | 'therapy' | 'other';
  description: string;
  intensity?: 1 | 2 | 3 | 4 | 5;
  duration?: number;
  triggers?: string[];
  parentResponse?: string;
  effectivenessOfResponse?: 1 | 2 | 3 | 4 | 5;
}

export interface BehavioralInsight {
  id: string;
  type: 'pattern' | 'suggestion' | 'alert' | 'achievement';
  category: 'medication' | 'screen_time' | 'focus' | 'behavior' | 'sleep';
  evidenceLevel: 'high' | 'moderate' | 'low' | 'anecdotal';
  title: string;
  description: string;
  actionableSteps?: string[];
  generatedAt: Date;
  expiresAt?: Date;
  dismissed: boolean;
  actedOn: boolean;
}

// ===== REWARD SYSTEM TYPES =====
export interface RewardEarningRule {
  id: string;
  behavior: string;
  tokensEarned: number;
  frequency: 'per_occurrence' | 'daily' | 'weekly';
  maxPerDay?: number;
  active: boolean;
}

export interface RewardItem {
  id: string;
  name: string;
  description: string;
  tokenCost: number;
  category: 'screen_time' | 'activity' | 'privilege' | 'item';
  available: boolean;
  imageUrl?: string;
}

export interface TokenTransaction {
  id: string;
  timestamp: Date;
  type: 'earned' | 'spent' | 'bonus' | 'adjustment';
  amount: number;
  reason: string;
  ruleId?: string;
  rewardId?: string;
}

export interface RewardSystem {
  childId: string;
  currentTokens: number;
  lifetimeTokensEarned: number;
  earningRules: RewardEarningRule[];
  rewardMenu: RewardItem[];
  transactions: TokenTransaction[];
}

// ===== USER & PROFILE TYPES =====
export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  avatarUrl?: string;
  focusAreas: string[];
  medications: Medication[];
  devices: Device[];
  createdAt: Date;
}

export interface ParentProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  children: ChildProfile[];
  preferences: {
    notifications: boolean;
    celebrationAnimations: boolean;
    reducedMotion: boolean;
  };
}

// ===== ALERT TYPES =====
export type AlertPriority = 'high' | 'medium' | 'low';
export type AlertCategory = 'medication' | 'screen_time' | 'content' | 'behavior' | 'system';

export interface Alert {
  id: string;
  timestamp: Date;
  priority: AlertPriority;
  category: AlertCategory;
  title: string;
  description: string;
  actionRequired: boolean;
  actionLabel?: string;
  actionPath?: string;
  dismissed: boolean;
  childId: string;
}

// ===== TIMELINE TYPES =====
export type TimelineEventType =
  | 'medication_taken'
  | 'medication_missed'
  | 'screen_time_start'
  | 'screen_time_end'
  | 'activity_completed'
  | 'alert'
  | 'achievement';

export interface TimelineEvent {
  id: string;
  timestamp: Date;
  type: TimelineEventType;
  title: string;
  description?: string;
  status: 'completed' | 'current' | 'upcoming' | 'missed';
  metadata?: Record<string, unknown>;
}

// ===== CHART DATA TYPES =====
export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface TrendData {
  current: number;
  previous: number;
  percentChange: number;
  direction: 'up' | 'down' | 'stable';
}

// ===== PROVIDER REPORT TYPES =====
export interface ProviderReport {
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
  };
  behavioralCorrelations: {
    focusScoresByMedicationTiming: Array<{ timing: string; avgScore: number }>;
    screenTimeByDay: Array<{ day: string; hours: number }>;
  };
  parentNotes: string[];
}
