'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { PaymentMethodSelector } from './PaymentMethodSelector';
import { useToast } from '@/components/ui/use-toast';

export function QuickActions() {
  const { toast } = useToast();
  const [isQuickTradeOpen, setIsQuickTradeOpen] = useState(false);
  const [quickTradeData, setQuickTradeData] = useState({
    type: '',
    asset: '',
    amount: '',
    paymentMethods: [] as string[],
  });

  const handleQuickTrade = async () => {
    try {
      if (!quickTradeData.type || !quickTradeData.asset || !quickTradeData.amount) {
        toast({
          title: 'Error',
          description: 'Please fill in all required fields',
          variant: 'destructive',
        });
        return;
      }

      const response = await fetch('/api/trades', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quickTradeData),
      });

      if (!response.ok) throw new Error('Failed to create trade');

      toast({
        title: 'Success',
        description: 'Trade created successfully',
      });
      setIsQuickTradeOpen(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create trade',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Dialog open={isQuickTradeOpen} onOpenChange={setIsQuickTradeOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Quick Trade
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Quick Trade</DialogTitle>
            <DialogDescription>
              Quickly create a new trade with basic settings. You can add more
              details later.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Select
              value={quickTradeData.type}
              onValueChange={(value) =>
                setQuickTradeData({ ...quickTradeData, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select trade type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buy">Buy</SelectItem>
                <SelectItem value="sell">Sell</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={quickTradeData.asset}
              onValueChange={(value) =>
                setQuickTradeData({ ...quickTradeData, asset: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select asset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                <SelectItem value="USDT">Tether (USDT)</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="number"
              placeholder="Amount"
              value={quickTradeData.amount}
              onChange={(e) =>
                setQuickTradeData({ ...quickTradeData, amount: e.target.value })
              }
            />

            <div className="space-y-2">
              <label className="text-sm font-medium">Payment Methods</label>
              <PaymentMethodSelector
                selectedMethods={quickTradeData.paymentMethods}
                onMethodsChange={(methods) =>
                  setQuickTradeData({ ...quickTradeData, paymentMethods: methods })
                }
              />
            </div>

            <Button onClick={handleQuickTrade}>Create Trade</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Link href="/trades/search">
        <Button variant="outline">
          <Search className="mr-2 h-4 w-4" />
          Find Trades
        </Button>
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            View all notifications
          </DropdownMenuItem>
          <DropdownMenuItem>
            Notification settings
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            Trading preferences
          </DropdownMenuItem>
          <DropdownMenuItem>
            Security settings
          </DropdownMenuItem>
          <DropdownMenuItem>
            Payment methods
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
