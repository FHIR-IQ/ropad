import type { ReactNode } from 'react';

type Urgency = 'normal' | 'warning' | 'urgent';

interface ActionCardProps {
  title: string;
  subtitle?: string;
  urgency?: Urgency;
  icon?: ReactNode;
  children?: ReactNode;
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'ghost';
  }>;
  className?: string;
}

export const ActionCard = ({
  title,
  subtitle,
  urgency = 'normal',
  icon,
  children,
  actions,
  className = '',
}: ActionCardProps) => {
  const urgencyClass = urgency === 'urgent' ? 'urgent' : urgency === 'warning' ? 'warning' : '';

  return (
    <div className={`action-card ${urgencyClass} ${className}`}>
      <div className="flex items-start gap-3">
        {icon && (
          <div className="flex-shrink-0 mt-0.5">
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-white">{title}</h4>
            {urgency !== 'normal' && (
              <span className={`priority-badge priority-${urgency === 'urgent' ? 'high' : 'medium'}`}>
                {urgency}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-sm text-text-secondary mt-1">{subtitle}</p>
          )}
          {children && (
            <div className="mt-3">
              {children}
            </div>
          )}
        </div>
      </div>
      {actions && actions.length > 0 && (
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/5">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={`btn btn-sm btn-${action.variant || 'secondary'}`}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
