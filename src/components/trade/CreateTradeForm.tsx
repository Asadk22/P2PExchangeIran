'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const TRADE_TYPES = [
  { value: 'crypto', label: 'Cryptocurrency' },
  { value: 'fiat', label: 'Fiat Currency' },
];

const CRYPTO_ASSETS = [
  { value: 'BTC', label: 'Bitcoin (BTC)' },
  { value: 'ETH', label: 'Ethereum (ETH)' },
  { value: 'USDT', label: 'Tether (USDT)' },
];

const FIAT_ASSETS = [
  { value: 'USD', label: 'US Dollar (USD)' },
  { value: 'EUR', label: 'Euro (EUR)' },
  { value: 'GBP', label: 'British Pound (GBP)' },
];

const PAYMENT_METHODS = [
  { value: 'shaparak', label: 'Shaparak' },
  { value: 'shetab', label: 'Shetab' },
  { value: 'paypal', label: 'PayPal' },
  { value: 'bank_transfer', label: 'Bank Transfer' },
  { value: 'cash_deposit', label: 'Cash Deposit' },
  { value: 'card_to_card', label: 'Card to Card' },
  { value: 'perfect_money', label: 'Perfect Money' },
  { value: 'wise', label: 'Wise (TransferWise)' },
];

const formSchema = z.object({
  tradeType: z.enum(['crypto', 'fiat']),
  assetType: z.string().min(1, 'Please select an asset'),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Amount must be a positive number',
  }),
  pricePerUnit: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Price must be a positive number',
  }),
  paymentMethod: z.string().min(1, 'Please select a payment method'),
  paymentDetails: z.string().min(10, 'Please provide detailed payment instructions'),
  paymentWindow: z.string().refine(
    (val) => !isNaN(Number(val)) && Number(val) >= 15 && Number(val) <= 120,
    {
      message: 'Payment window must be between 15 and 120 minutes',
    }
  ),
  termsAndConditions: z.string(),
});

export default function CreateTradeForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tradeType: 'crypto',
      assetType: '',
      amount: '',
      pricePerUnit: '',
      paymentMethod: '',
      paymentDetails: '',
      paymentWindow: '30',
      termsAndConditions: 'Please make sure to complete the payment within the specified time window.',
    },
  });

  const tradeType = form.watch('tradeType');
  const assets = tradeType === 'crypto' ? CRYPTO_ASSETS : FIAT_ASSETS;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      setError(null);

      // Convert string values to numbers
      const payload = {
        ...values,
        amount: Number(values.amount),
        pricePerUnit: Number(values.pricePerUnit),
        paymentWindow: Number(values.paymentWindow),
      };

      const res = await fetch('/api/trades', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        // Handle validation errors
        if (res.status === 400 && data.missingFields) {
          const missingFieldsMessage = `Missing fields: ${data.missingFields.join(', ')}`;
          throw new Error(missingFieldsMessage);
        }
        
        // Handle other errors
        throw new Error(data.error || 'Failed to create trade');
      }

      toast({
        title: 'Success',
        description: 'Your trade has been created successfully.',
      });

      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      console.error('Trade creation error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to create trade';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Trade</CardTitle>
        <CardDescription>
          List your trade offer on the marketplace. All prices are in Iranian Rial (IRR).
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-4 bg-destructive/15 text-destructive rounded-lg">
            {error}
          </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="tradeType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trade Type</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select trade type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {TRADE_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="assetType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asset</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select asset" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {assets.map((asset) => (
                          <SelectItem key={asset.value} value={asset.value}>
                            {asset.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={loading}
                        type="number"
                        step="any"
                        placeholder="Enter amount"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pricePerUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price per Unit (IRR)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={loading}
                        type="number"
                        step="any"
                        placeholder="Enter price"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PAYMENT_METHODS.map((method) => (
                        <SelectItem key={method.value} value={method.value}>
                          {method.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Instructions</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={loading}
                      placeholder="Enter detailed payment instructions"
                      className="min-h-[100px]"
                    />
                  </FormControl>
                  <FormDescription>
                    Provide clear instructions for completing the payment.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentWindow"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Window (minutes)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      type="number"
                      min="15"
                      max="120"
                      placeholder="Enter payment window"
                    />
                  </FormControl>
                  <FormDescription>
                    Time allowed for payment completion (15-120 minutes)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="termsAndConditions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Terms and Conditions</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={loading}
                      placeholder="Enter trade terms and conditions"
                      className="min-h-[100px]"
                    />
                  </FormControl>
                  <FormDescription>
                    Specify any additional terms or conditions for the trade.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Creating Trade...' : 'Create Trade'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
