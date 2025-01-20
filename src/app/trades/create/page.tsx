'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const tradeFormSchema = z.object({
  type: z.enum(['buy', 'sell']),
  cryptocurrency: z.enum(['BTC', 'ETH', 'USDT']),
  amount: z.string().min(1, 'Amount is required'),
  price: z.string().min(1, 'Price is required'),
  paymentMethod: z.enum(['bank_transfer', 'paypal', 'cash']),
  location: z.string().min(1, 'Location is required'),
  terms: z.string().optional(),
});

type TradeFormValues = z.infer<typeof tradeFormSchema>;

export default function CreateTradePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const defaultType = searchParams.get('type') || 'buy';

  const form = useForm<TradeFormValues>({
    resolver: zodResolver(tradeFormSchema),
    defaultValues: {
      type: defaultType as 'buy' | 'sell',
      cryptocurrency: 'BTC',
      amount: '',
      price: '',
      paymentMethod: 'bank_transfer',
      location: '',
      terms: '',
    },
  });

  async function onSubmit(data: TradeFormValues) {
    try {
      const response = await fetch('/api/trades/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create trade');
      }

      toast({
        title: 'Success',
        description: 'Your trade has been created successfully.',
      });

      router.push('/trades');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create trade. Please try again.',
        variant: 'destructive',
      });
    }
  }

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    router.push('/login');
    return null;
  }

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Create New Trade</CardTitle>
          <CardDescription>
            Set up your trade offer with the details below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Tabs defaultValue={defaultType} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="buy">Buy Cryptocurrency</TabsTrigger>
                  <TabsTrigger value="sell">Sell Cryptocurrency</TabsTrigger>
                </TabsList>
                <TabsContent value="buy">
                  <p className="text-sm text-muted-foreground mb-4">
                    Create an offer to buy cryptocurrency from other users
                  </p>
                </TabsContent>
                <TabsContent value="sell">
                  <p className="text-sm text-muted-foreground mb-4">
                    Create an offer to sell cryptocurrency to other users
                  </p>
                </TabsContent>
              </Tabs>

              <FormField
                control={form.control}
                name="cryptocurrency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cryptocurrency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select cryptocurrency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                        <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                        <SelectItem value="USDT">Tether (USDT)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input placeholder="0.00" type="number" step="0.00000001" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the amount of cryptocurrency you want to trade
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price per unit (EUR)</FormLabel>
                    <FormControl>
                      <Input placeholder="0.00" type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormDescription>
                      Set your desired price per unit in EUR
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="cash">Cash (In Person)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Berlin, Germany" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter your location for the trade
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trade Terms (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Any specific terms or requirements"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Add any specific terms or requirements for the trade
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <Button type="submit" className="flex-1">
                  Create Trade
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/dashboard')}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
