import { Bot, Lightbulb, TrendingUp, Award } from 'lucide-react';
import type { BehavioralInsight } from '../../types';

interface InsightCardProps {
  insight: BehavioralInsight;
  onDismiss?: () => void;
  onLearnMore?: () => void;
  compact?: boolean;
  className?: string;
}

const insightIcons = {
  pattern: <TrendingUp size={16} />,
  suggestion: <Lightbulb size={16} />,
  alert: <Bot size={16} />,
  achievement: <Award size={16} />,
};

const evidenceBadges = {
  high: { label: 'Strong Evidence', color: 'text-success-light bg-success-bg' },
  moderate: { label: 'Moderate Evidence', color: 'text-info-light bg-info-bg' },
  low: { label: 'Limited Evidence', color: 'text-warning-light bg-warning-bg' },
  anecdotal: { label: 'Observational', color: 'text-text-secondary bg-white/5' },
};

export const InsightCard = ({
  insight,
  onDismiss,
  onLearnMore,
  compact = false,
  className = '',
}: InsightCardProps) => {
  const badge = evidenceBadges[insight.evidenceLevel];

  return (
    <div className={`insight-card ${className}`}>
      <div className="insight-card-header">
        {insightIcons[insight.type]}
        <span>Guardian Insight</span>
        <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${badge.color}`}>
          {badge.label}
        </span>
      </div>

      <h4 className="text-white font-medium mb-2">{insight.title}</h4>

      <p className="insight-card-content">{insight.description}</p>

      {!compact && insight.actionableSteps && insight.actionableSteps.length > 0 && (
        <div className="mt-4">
          <p className="text-xs text-text-muted uppercase tracking-wider mb-2">
            Suggested Actions
          </p>
          <ul className="space-y-1.5">
            {insight.actionableSteps.map((step, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-text-secondary"
              >
                <span className="text-primary mt-0.5">•</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="insight-card-meta flex items-center justify-between">
        <span>
          Based on {insight.category} data •{' '}
          {new Date(insight.generatedAt).toLocaleDateString()}
        </span>
        <div className="flex items-center gap-2">
          {onLearnMore && (
            <button
              onClick={onLearnMore}
              className="text-primary hover:text-primary-400 text-xs font-medium"
            >
              Learn More
            </button>
          )}
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-text-muted hover:text-text-secondary text-xs"
            >
              Dismiss
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
