import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StarIcon } from 'lucide-react';

interface TradeOfferProps {
  trade: {
    seller: {
      username: string;
      reputation: number;
      lastSeen?: string;
      isOnline?: boolean;
    };
    paymentMethod: string;
    paymentDetails: string;
    tradeSpeed?: string;
    price: {
      amount: number;
      currency: string;
    };
    limits: {
      min: number;
      max: number;
      currency: string;
    };
    exchangeRate: {
      rate: number;
      trend: 'up' | 'down';
      percentage: number;
    };
    isNew?: boolean;
    requiredTrades?: number;
  };
}

export function TradeOffer({ trade }: TradeOfferProps) {
  return (
    <Card className="p-4 mb-4 hover:bg-accent/5 transition-colors">
      <div className="grid grid-cols-12 gap-4 items-center">
        {/* Seller Info */}
        <div className="col-span-3">
          <div className="flex items-start space-x-2">
            <div>
              <div className="font-medium">{trade.seller.username}</div>
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="mr-1">👍</span>
                {trade.seller.reputation}
              </div>
              <div className="text-sm text-muted-foreground">
                {trade.seller.isOnline ? (
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                    Online
                  </span>
                ) : (
                  `Seen ${trade.seller.lastSeen}`
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="col-span-2">
          <div className="font-medium">{trade.paymentMethod}</div>
          <div className="text-sm text-muted-foreground">{trade.paymentDetails}</div>
        </div>

        {/* Trade Speed */}
        <div className="col-span-2 text-center">
          {trade.tradeSpeed && (
            <div className="text-sm text-muted-foreground">{trade.tradeSpeed}</div>
          )}
          {trade.isNew && <Badge variant="secondary">New offer</Badge>}
        </div>

        {/* Price Info */}
        <div className="col-span-3 text-right">
          <div className="font-medium">
            {trade.price.amount.toLocaleString()} {trade.price.currency}
          </div>
          <div className="text-sm text-muted-foreground flex items-center justify-end">
            1 USD = {trade.exchangeRate.rate} USD of BTC
            <span className={`ml-1 ${trade.exchangeRate.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {trade.exchangeRate.trend === 'up' ? '↑' : '↓'}
              {trade.exchangeRate.percentage}%
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            Min purchase: {trade.limits.min} {trade.limits.currency}
            <br />
            Max purchase: {trade.limits.max} {trade.limits.currency}
          </div>
        </div>

        {/* Actions */}
        <div className="col-span-2 flex items-center justify-end space-x-2">
          <Button variant="ghost" size="icon">
            <StarIcon className="h-4 w-4" />
          </Button>
          <Button variant="default">
            {trade.requiredTrades ? 'View' : 'Buy'}
          </Button>
        </div>
      </div>
    </Card>
  );
}
