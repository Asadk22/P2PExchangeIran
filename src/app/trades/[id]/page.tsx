'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { StarFilledIcon } from '@radix-ui/react-icons';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle, CreditCard } from 'lucide-react';
import Link from 'next/link';

interface Trade {
  _id: string;
  type: 'buy' | 'sell';
  assetType: string;
  amount: string;
  price: string;
  status: string;
  paymentMethod: string;
  location: string;
  terms?: string;
  seller: {
    _id: string;
    username: string;
    totalTrades: number;
    successRate: number;
    createdAt: string;
  };
  buyer?: {
    _id: string;
    username: string;
    totalTrades?: number;
    successRate?: number;
    createdAt?: string;
  };
}

export default function TradePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/');
    },
  });
  const [trade, setTrade] = useState<Trade | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrade = async () => {
      if (!session?.user?.id) {
        console.log('No session user ID found');
        return;
      }

      try {
        setLoading(true);
        setError(null);
        console.log('Fetching trade:', params.id);
        const res = await fetch(`/api/trades/${params.id}`, {
          credentials: 'include'
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Failed to fetch trade');
        }

        const data = await res.json();
        console.log('Trade data:', data);
        setTrade(data);
      } catch (error) {
        console.error('Error fetching trade:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch trade');
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.id && params.id) {
      fetchTrade();
    }
  }, [params.id, session?.user?.id]);

  const handleJoinTrade = async () => {
    if (!session?.user?.id) {
      setError('You must be logged in to join a trade');
      return;
    }

    try {
      setError(null);
      const res = await fetch(`/api/trades/${params.id}/join`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to join trade');
      }

      const data = await res.json();
      setTrade(data);
    } catch (error) {
      console.error('Error joining trade:', error);
      setError(error instanceof Error ? error.message : 'Failed to join trade');
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading trade details...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!trade) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Trade not found</AlertDescription>
        </Alert>
      </div>
    );
  }

  const isUserSeller = trade.seller._id === session.user.id;
  const isUserBuyer = trade.buyer?._id === session.user.id;
  const canJoinTrade = !isUserSeller && !isUserBuyer && (trade.status === 'open' || trade.status === 'active');
  const canChat = (isUserSeller || isUserBuyer) && (trade.status === 'in_progress' || trade.status === 'active');

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {isUserBuyer ? 'Buy' : 'Sell'}
          </h1>
          <p className="text-sm text-muted-foreground">
            Trade ID: {trade._id}
          </p>
        </div>
        <Badge variant={
          trade.status === 'completed' ? 'success' :
          trade.status === 'cancelled' ? 'destructive' :
          'default'
        }>
          {trade.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Trade Details</h2>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm text-muted-foreground">Amount</dt>
              <dd className="text-2xl font-bold">{trade.amount} {trade.assetType}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Price</dt>
              <dd>{trade.price}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Payment Method</dt>
              <dd>{trade.paymentMethod}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Location</dt>
              <dd>{trade.location}</dd>
            </div>
            {trade.terms && (
              <div>
                <dt className="text-sm text-muted-foreground">Terms</dt>
                <dd>{trade.terms}</dd>
              </div>
            )}
          </dl>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">
            {isUserBuyer ? 'Seller' : 'Buyer'} Information
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${isUserBuyer ? trade.seller.username : trade.buyer?.username}`} />
                <AvatarFallback>{isUserBuyer ? trade.seller.username[0] : trade.buyer?.username[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">
                  {isUserBuyer ? trade.seller.username : trade.buyer?.username}
                </div>
                <div className="text-sm text-muted-foreground">
                  Member since {new Date(isUserBuyer ? trade.seller.createdAt : trade.buyer?.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Total Trades</div>
              <div>{isUserBuyer ? trade.seller.totalTrades : trade.buyer?.totalTrades}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
              <div className="font-medium flex items-center">
                {isUserBuyer ? trade.seller.successRate : trade.buyer?.successRate}% 
                <StarFilledIcon className="h-4 w-4 text-yellow-400 ml-1" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 md:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Actions</h2>
          <div className="flex gap-4">
            {canChat && (
              <Button
                asChild
                className="flex-1"
                variant="default"
              >
                <Link href={`/dashboard/messages?trade=${trade._id}`}>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Open Chat
                </Link>
              </Button>
            )}
            {canJoinTrade && (
              <Button
                onClick={handleJoinTrade}
                className="flex-1"
                variant="default"
              >
                Join Trade
              </Button>
            )}
            {(isUserSeller || isUserBuyer) && (
              <Button
                asChild
                className="flex-1"
                variant="default"
              >
                <Link href={`/dashboard/payment/${trade._id}`}>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Go to Payment
                </Link>
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
