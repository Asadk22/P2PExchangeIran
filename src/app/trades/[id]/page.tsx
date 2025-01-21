'use client';

import { useEffect, useState, Suspense } from 'react';
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
  buyer?: Partial<{
    _id: string;
    username: string;
    totalTrades: number;
    successRate: number;
    createdAt: string;
  }>;
}

type Props = {
  params: { id: string };
};

function TradeContent({ params }: any) {
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
          credentials: 'include',
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
          'Content-Type': 'application/json',
        },
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
      <Card>
        <CardHeader>
          <CardTitle>Trade Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">{trade.type === 'buy' ? 'Buy' : 'Sell'} {trade.assetType}</h3>
              <Badge variant="outline" className="capitalize">{trade.status}</Badge>
            </div>
            <p className="text-gray-600">{trade.amount} at {trade.price} per unit</p>
            <p className="text-gray-600">Payment Method: {trade.paymentMethod}</p>
            <p className="text-gray-600">Location: {trade.location}</p>
            {trade.terms && <p className="text-gray-600">Terms: {trade.terms}</p>}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Seller</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={`/avatars/${trade.seller._id}.jpg`} alt={trade.seller.username} />
                <AvatarFallback>{trade.seller.username.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="text-lg">{trade.seller.username}</h4>
                <p className="text-sm text-gray-600">Total Trades: {trade.seller.totalTrades}</p>
                <p className="text-sm text-gray-600">Success Rate: {trade.seller.successRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {canJoinTrade && (
          <Button onClick={handleJoinTrade}>Join Trade</Button>
        )}

        {canChat && (
          <Link href={`/messages/${trade._id}`} passHref>
            <Button variant="outline" 
            // leftIcon={<MessageCircle />}
            >Start Chat</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export function TradePage({ params }: any) {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading...</div>}>
      <TradeContent params={params} />
    </Suspense>
  );
}
