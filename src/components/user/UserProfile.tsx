'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { User } from 'next-auth';
import { format } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ReputationBadge } from './ReputationBadge';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Shield,
  Mail,
  Phone,
  User as UserIcon,
  Calendar,
  Star,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';

interface UserStats {
  totalTrades: number;
  successfulTrades: number;
  disputedTrades: number;
  totalVolume: number;
  reputation: number;
  successRate: number;
  verificationLevel: string;
  joinDate: string;
  lastActive: string;
}

interface ExtendedUser extends User {
  email: string;
  phoneNumber?: string;
  verificationLevel: string;
}

interface UserProfileProps {
  user: ExtendedUser;
}

export function UserProfile({ user }: UserProfileProps) {
  const { toast } = useToast();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showVerificationDialog, setShowVerificationDialog] = useState(false);

  useEffect(() => {
    fetchUserStats();
  }, [user.id]);

  const fetchUserStats = async () => {
    try {
      const res = await fetch(`/api/users/${user.id}/stats`);
      if (!res.ok) throw new Error('Failed to fetch user stats');
      const data = await res.json();
      setStats(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load user statistics',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getVerificationRequirements = () => {
    switch (user.verificationLevel) {
      case 'unverified':
        return [
          { label: 'Email Verification', completed: !!user.email },
          { label: 'Phone Verification', completed: !!user.phoneNumber },
          { label: 'ID Document', completed: false },
        ];
      case 'basic':
        return [
          { label: 'Proof of Address', completed: false },
          { label: 'Bank Statement', completed: false },
        ];
      case 'advanced':
        return [
          { label: 'Video Verification', completed: false },
          { label: 'Enhanced Due Diligence', completed: false },
        ];
      default:
        return [];
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!stats) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="relative h-12 w-12">
            <Image
              src={user.image || '/images/default-avatar.png'}
              alt={user.name || 'User'}
              className="rounded-full"
              fill
              sizes="48px"
            />
          </div>
          <div>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription>Member since {format(new Date(stats.joinDate), 'MMMM yyyy')}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Verification Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-blue-500" />
            <span>Verification Level</span>
          </div>
          <Dialog open={showVerificationDialog} onOpenChange={setShowVerificationDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                {user.verificationLevel === 'unverified'
                  ? 'Get Verified'
                  : 'Upgrade Level'}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Verification Requirements</DialogTitle>
                <DialogDescription>
                  Complete these steps to upgrade your verification level
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {getVerificationRequirements().map((req, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span>{req.label}</span>
                    {req.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <Button size="sm">Complete</Button>
                    )}
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Contact Info */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <Mail className="h-4 w-4" />
            <span>{user.email}</span>
          </div>
          {user.phoneNumber && (
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="h-4 w-4" />
              <span>{user.phoneNumber}</span>
            </div>
          )}
        </div>

        {/* Trading Stats */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Reputation Score</span>
            <ReputationBadge
              score={stats.reputation}
              totalTrades={stats.totalTrades}
              successRate={stats.successRate}
              verificationLevel={user.verificationLevel as any}
              showDetails
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-2xl font-bold">
                {stats.totalTrades}
              </div>
              <div className="text-sm text-gray-500">Total Trades</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold">
                {stats.successRate}%
              </div>
              <div className="text-sm text-gray-500">Success Rate</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold">
                ${stats.totalVolume.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">Total Volume</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-yellow-500">
                {stats.disputedTrades}
              </div>
              <div className="text-sm text-gray-500">Disputed Trades</div>
            </div>
          </div>
        </div>

        {/* Activity Indicators */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Last active {format(new Date(stats.lastActive), 'PP')}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="h-2 w-2 rounded-full bg-green-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Online Now</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
}
