'use client';

import { CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimelineEvent {
  status: string;
  timestamp: string;
  description: string;
}

interface TradeTimelineProps {
  events: TimelineEvent[];
  currentStatus: string;
}

export function TradeTimeline({ events, currentStatus }: TradeTimelineProps) {
  const statusOrder = [
    'created',
    'payment_pending',
    'payment_sent',
    'payment_confirmed',
    'completed',
    'disputed',
    'cancelled',
  ];

  const getStatusIndex = (status: string) => statusOrder.indexOf(status);
  const currentIndex = getStatusIndex(currentStatus);

  const getStatusIcon = (status: string, isCompleted: boolean) => {
    if (status === 'disputed') {
      return (
        <AlertTriangle
          className={cn(
            'h-6 w-6',
            isCompleted ? 'text-yellow-500' : 'text-gray-300'
          )}
        />
      );
    }
    
    return isCompleted ? (
      <CheckCircle2 className="h-6 w-6 text-green-500" />
    ) : (
      <Clock className="h-6 w-6 text-gray-300" />
    );
  };

  const getStatusColor = (status: string, isCompleted: boolean) => {
    if (status === 'disputed') return 'bg-yellow-500';
    if (status === 'cancelled') return 'bg-red-500';
    return isCompleted ? 'bg-green-500' : 'bg-gray-200';
  };

  return (
    <div className="space-y-8">
      {events.map((event, index) => {
        const eventIndex = getStatusIndex(event.status);
        const isCompleted = eventIndex <= currentIndex;
        const isLast = index === events.length - 1;

        return (
          <div key={index} className="relative">
            {!isLast && (
              <div
                className={cn(
                  'absolute left-6 top-6 h-full w-0.5 -ml-px',
                  getStatusColor(event.status, isCompleted)
                )}
              />
            )}
            <div className="relative flex items-start space-x-4">
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border">
                  {getStatusIcon(event.status, isCompleted)}
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-gray-900">
                  {event.status.replace('_', ' ').toUpperCase()}
                </div>
                <div className="mt-0.5 text-sm text-gray-500">
                  {event.description}
                </div>
                <div className="mt-2 text-xs text-gray-400">
                  {new Date(event.timestamp).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
