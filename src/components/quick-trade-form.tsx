'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';

export default function QuickTradeForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [type, setType] = useState('buy');
  const [amount, setAmount] = useState('');
  const [cryptocurrency, setCryptocurrency] = useState('BTC');
  const [price, setPrice] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
  const [location, setLocation] = useState('');
  const [terms, setTerms] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to create a trade offer.",
        variant: "destructive",
      });
      router.push('/login');
      return;
    }

    // Redirect to create trade page with pre-filled values
    router.push(`/trades/create?type=${type}&amount=${amount}&cryptocurrency=${cryptocurrency}&price=${price}&paymentMethod=${paymentMethod}&location=${location}&terms=${terms}`);
  };

  return (
    <Card className="bg-[#1C1F26] border-gray-800 p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-2 p-1 bg-[#232731] rounded-lg">
          <button
            type="button"
            className={`py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              type === 'buy'
                ? 'bg-[#4CAF50] text-white'
                : 'text-gray-400 hover:text-white hover:bg-[#2A2F3A]'
            }`}
            onClick={() => setType('buy')}
          >
            Buy Cryptocurrency
          </button>
          <button
            type="button"
            className={`py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              type === 'sell'
                ? 'bg-[#E57373] text-white'
                : 'text-gray-400 hover:text-white hover:bg-[#2A2F3A]'
            }`}
            onClick={() => setType('sell')}
          >
            Sell Cryptocurrency
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-white mb-2 block">
              Cryptocurrency
            </label>
            <Select value={cryptocurrency} onValueChange={setCryptocurrency}>
              <SelectTrigger className="bg-[#232731] border-gray-800 text-white">
                <SelectValue placeholder="Select cryptocurrency" />
              </SelectTrigger>
              <SelectContent className="bg-[#232731] border-gray-800">
                <SelectItem value="BTC" className="text-white hover:bg-[#2A2F3A]">Bitcoin (BTC)</SelectItem>
                <SelectItem value="ETH" className="text-white hover:bg-[#2A2F3A]">Ethereum (ETH)</SelectItem>
                <SelectItem value="USDT" className="text-white hover:bg-[#2A2F3A]">Tether (USDT)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-white mb-2 block">
              Amount
            </label>
            <Input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-[#232731] border-gray-800 text-white"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-white mb-2 block">
              Price per unit (EUR)
            </label>
            <Input
              type="number"
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="bg-[#232731] border-gray-800 text-white"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-white mb-2 block">
              Payment Method
            </label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger className="bg-[#232731] border-gray-800 text-white">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent className="bg-[#232731] border-gray-800">
                <SelectItem value="bank_transfer" className="text-white hover:bg-[#2A2F3A]">Bank Transfer</SelectItem>
                <SelectItem value="cash" className="text-white hover:bg-[#2A2F3A]">Cash</SelectItem>
                <SelectItem value="paypal" className="text-white hover:bg-[#2A2F3A]">PayPal</SelectItem>
                <SelectItem value="wise" className="text-white hover:bg-[#2A2F3A]">Wise</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-white mb-2 block">
              Location
            </label>
            <Input
              type="text"
              placeholder="e.g., Berlin, Germany"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-[#232731] border-gray-800 text-white"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-white mb-2 block">
              Trade Terms (Optional)
            </label>
            <Textarea
              placeholder="Any specific terms or requirements"
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              className="bg-[#232731] border-gray-800 text-white min-h-[100px]"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button 
            type="submit"
            className="flex-1 bg-[#4040F2] hover:bg-[#3333D1] text-white"
          >
            Create Trade
          </Button>
          <Button 
            type="button"
            variant="outline"
            onClick={() => router.push('/')}
            className="flex-1 bg-transparent hover:bg-red-500 hover:text-white text-red-500 border-red-500"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}
