'use client';

import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Award,
  Star,
  BadgeCheck,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface ReputationBadgeProps {
  score: number;
  totalTrades: number;
  successRate: number;
  verificationLevel: 'unverified' | 'basic' | 'advanced' | 'pro';
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

export function ReputationBadge({
  score,
  totalTrades,
  successRate,
  verificationLevel,
  size = 'md',
  showDetails = false,
}: ReputationBadgeProps) {
  const getBadgeDetails = () => {
    if (score >= 90) {
      return {
        icon: Award,
        label: 'Elite Trader',
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
      };
    }
    if (score >= 80) {
      return {
        icon: ShieldCheck,
        label: 'Trusted Trader',
        color: 'text-green-500',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
      };
    }
    if (score >= 60) {
      return {
        icon: Shield,
        label: 'Verified Trader',
        color: 'text-blue-500',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
      };
    }
    return {
      icon: ShieldAlert,
      label: 'New Trader',
      color: 'text-gray-500',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
    };
  };

  const getVerificationIcon = () => {
    switch (verificationLevel) {
      case 'pro':
        return <BadgeCheck className="h-4 w-4 text-purple-500" />;
      case 'advanced':
        return <BadgeCheck className="h-4 w-4 text-blue-500" />;
      case 'basic':
        return <BadgeCheck className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  const badge = getBadgeDetails();
  const Icon = badge.icon;
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            className={cn(
              'inline-flex items-center space-x-1 rounded-full border',
              sizeClasses[size],
              badge.bgColor,
              badge.borderColor
            )}
          >
            <Icon className={cn('h-4 w-4', badge.color)} />
            <span className={badge.color}>{badge.label}</span>
            {getVerificationIcon()}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-2">
            <div className="font-medium">Reputation Score: {score}</div>
            {showDetails && (
              <>
                <div className="text-sm">
                  <Star className="inline h-4 w-4 mr-1" />
                  Success Rate: {successRate.toFixed(1)}%
                </div>
                <div className="text-sm">
                  Total Trades: {totalTrades}
                </div>
                <div className="text-sm">
                  Verification: {verificationLevel.replace('_', ' ')}
                </div>
              </>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
