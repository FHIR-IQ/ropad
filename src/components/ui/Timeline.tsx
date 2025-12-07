import type { ReactNode } from 'react';
import type { TimelineEvent } from '../../types';
import { Check, Clock, AlertCircle, Circle } from 'lucide-react';

interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

interface TimelineItemProps {
  event: TimelineEvent;
  icon?: ReactNode;
}

const statusIcons = {
  completed: <Check size={12} className="text-success" />,
  current: <Circle size={12} className="text-primary fill-primary" />,
  upcoming: <Clock size={12} className="text-text-muted" />,
  missed: <AlertCircle size={12} className="text-error" />,
};

export const TimelineItem = ({ event, icon }: TimelineItemProps) => {
  const time = new Date(event.timestamp).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className={`timeline-item ${event.status}`}>
      <div className="flex items-start gap-3">
        <span className="text-xs text-text-muted w-16 flex-shrink-0 pt-0.5">
          {time}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm text-white font-medium">{event.title}</span>
            {icon || statusIcons[event.status]}
          </div>
          {event.description && (
            <p className="text-xs text-text-muted mt-0.5">{event.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export const Timeline = ({ events, className = '' }: TimelineProps) => {
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  return (
    <div className={`timeline ${className}`}>
      {sortedEvents.map((event) => (
        <TimelineItem key={event.id} event={event} />
      ))}
    </div>
  );
};
