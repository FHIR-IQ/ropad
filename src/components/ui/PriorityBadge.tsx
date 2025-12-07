type Priority = 'high' | 'medium' | 'low';

interface PriorityBadgeProps {
  priority: Priority;
  label?: string;
  className?: string;
}

const defaultLabels: Record<Priority, string> = {
  high: 'Urgent',
  medium: 'Important',
  low: 'Low',
};

export const PriorityBadge = ({
  priority,
  label,
  className = '',
}: PriorityBadgeProps) => {
  return (
    <span className={`priority-badge priority-${priority} ${className}`}>
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          priority === 'high'
            ? 'bg-error-light'
            : priority === 'medium'
            ? 'bg-warning-light'
            : 'bg-info-light'
        }`}
      />
      {label || defaultLabels[priority]}
    </span>
  );
};
