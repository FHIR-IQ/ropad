import type { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  iconBgColor?: string;
  trend?: {
    value: number;
    direction: 'up' | 'down';
    label?: string;
  };
  accentColor?: string;
  className?: string;
}

export const StatCard = ({
  label,
  value,
  subtitle,
  icon,
  iconBgColor = 'bg-primary/20',
  trend,
  accentColor,
  className = '',
}: StatCardProps) => {
  return (
    <div
      className={`stat-card ${className}`}
      style={accentColor ? { borderLeftColor: accentColor, borderLeftWidth: '4px' } : undefined}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="stat-card-label mb-1">{label}</p>
          <p className="stat-card-value text-white">{value}</p>
          {subtitle && (
            <p className="text-text-muted text-sm mt-1">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className={`stat-card-icon ${iconBgColor}`}>
            {icon}
          </div>
        )}
      </div>
      {trend && (
        <div className="mt-3">
          <span className={`stat-card-trend ${trend.direction === 'up' ? 'up' : 'down'}`}>
            {trend.direction === 'up' ? (
              <TrendingUp size={14} />
            ) : (
              <TrendingDown size={14} />
            )}
            <span>{trend.value > 0 ? '+' : ''}{trend.value}%</span>
            {trend.label && <span className="ml-1 opacity-80">{trend.label}</span>}
          </span>
        </div>
      )}
    </div>
  );
};
