import { Coins } from 'lucide-react';

interface TokenBadgeProps {
  amount: number;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const TokenBadge = ({
  amount,
  showIcon = true,
  size = 'md',
  className = '',
}: TokenBadgeProps) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  return (
    <span className={`token-badge ${sizeClasses[size]} ${className}`}>
      {showIcon && <Coins size={iconSizes[size]} />}
      <span>{amount.toLocaleString()}</span>
    </span>
  );
};
