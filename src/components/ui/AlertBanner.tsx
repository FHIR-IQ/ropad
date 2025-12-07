import type { ReactNode } from 'react';
import { AlertTriangle, AlertCircle, CheckCircle, Info, X } from 'lucide-react';

type AlertType = 'error' | 'warning' | 'success' | 'info';

interface AlertBannerProps {
  type: AlertType;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  onDismiss?: () => void;
  icon?: ReactNode;
  className?: string;
}

const alertIcons: Record<AlertType, ReactNode> = {
  error: <AlertTriangle size={18} />,
  warning: <AlertCircle size={18} />,
  success: <CheckCircle size={18} />,
  info: <Info size={18} />,
};

export const AlertBanner = ({
  type,
  title,
  description,
  actionLabel,
  onAction,
  onDismiss,
  icon,
  className = '',
}: AlertBannerProps) => {
  return (
    <div className={`alert-banner alert-${type} ${className}`}>
      <div className="flex-shrink-0">
        {icon || alertIcons[type]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium">{title}</p>
        {description && (
          <p className="text-sm opacity-80 mt-0.5">{description}</p>
        )}
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="btn btn-sm btn-secondary"
          >
            {actionLabel}
          </button>
        )}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="p-1 hover:bg-white/10 rounded transition-colors"
            aria-label="Dismiss"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};
