'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export function QuickTrade() {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('BTC');

  return (
    <Card className="w-full max-w-2xl p-6">
      <Tabs defaultValue="buy" className="w-full">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="buy" className="flex-1">Buy Crypto</TabsTrigger>
          <TabsTrigger value="sell" className="flex-1">Sell Crypto</TabsTrigger>
        </TabsList>
        <div className="flex gap-4">
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger>
              <SelectValue placeholder="Bitcoin (BTC)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
              <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
              <SelectItem value="USDT">Tether (USDT)</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="text"
            placeholder="Amount in IRR"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Button onClick={() => router.push('/trades')}>
            Find Offers →
          </Button>
        </div>
      </Tabs>
    </Card>
  );
}
