import { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Building2,
  Wallet,
  CreditCard,
  Gift,
  Coins,
  Banknote,
  ShoppingBag,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { TradesTour } from '@/components/tour/TradesTour';

interface TradeFilterProps {
  onFilterChange: (filters: any) => void;
  initialFilters?: any;
}

const PAYMENT_CATEGORIES = [
  { 
    id: 'bank_transfers',
    label: 'Bank transfers',
    icon: Building2,
    choices: 64
  },
  {
    id: 'online_wallets',
    label: 'Online wallets',
    icon: Wallet,
    choices: 238
  },
  {
    id: 'cards',
    label: 'Debit/credit cards',
    icon: CreditCard,
    choices: 20
  },
  {
    id: 'gift_cards',
    label: 'Gift cards',
    icon: Gift,
    choices: 102
  },
  {
    id: 'digital_currencies',
    label: 'Digital currencies',
    icon: Coins,
    choices: 46
  },
  {
    id: 'cash',
    label: 'Cash payments',
    icon: Banknote,
    choices: 20
  },
  {
    id: 'goods',
    label: 'Goods and services',
    icon: ShoppingBag,
    choices: 3
  }
];

export function TradeFilter({ onFilterChange, initialFilters }: TradeFilterProps) {
  const [amount, setAmount] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState('Bitcoin');
  const [selectedPayment, setSelectedPayment] = useState('all');
  const [offerLocation, setOfferLocation] = useState('All');
  const [traderLocation, setTraderLocation] = useState('All');
  const [recentTraders, setRecentTraders] = useState(false);
  const [verifiedOffers, setVerifiedOffers] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
      setSelectedPayment(categoryId);
    }
  };

  const handleFindOffers = () => {
    onFilterChange({
      amount,
      crypto: selectedCrypto,
      paymentMethod: selectedPayment,
      offerLocation,
      traderLocation,
      recentTraders,
      verifiedOffers,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">Filters</h2>
        <TradesTour />
      </div>
      
      <div className="space-y-6">
        {/* Cryptocurrency */}
        <div className="space-y-3">
          <label className="text-[15px] text-white">Cryptocurrency</label>
          <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
            <SelectTrigger className="w-full bg-[#1A1A1A] border-0 text-white h-[52px] px-4">
              <SelectValue placeholder="Select cryptocurrency" />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1A1A] border-0">
              <SelectItem value="Bitcoin" className="text-gray-200 hover:bg-[#242424]">Bitcoin (BTC)</SelectItem>
              <SelectItem value="Ethereum" className="text-gray-200 hover:bg-[#242424]">Ethereum (ETH)</SelectItem>
              <SelectItem value="Tether" className="text-gray-200 hover:bg-[#242424]">Tether (USDT)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Payment Method */}
        <div className="space-y-3">
          <label className="text-[15px] text-white">Payment method</label>
          <Select value={selectedPayment} onValueChange={setSelectedPayment}>
            <SelectTrigger className="w-full bg-[#1A1A1A] border-0 text-white h-[52px] px-4">
              <SelectValue placeholder="Select payment method">
                {selectedPayment && PAYMENT_CATEGORIES.find(c => c.id === selectedPayment) && (
                  <div className="flex items-center gap-3">
                    {React.createElement(PAYMENT_CATEGORIES.find(c => c.id === selectedPayment)!.icon, {
                      className: 'w-5 h-5'
                    })}
                    <span>{PAYMENT_CATEGORIES.find(c => c.id === selectedPayment)!.label}</span>
                    <span className="text-sm text-gray-500">
                      CHOICES: {PAYMENT_CATEGORIES.find(c => c.id === selectedPayment)!.choices}
                    </span>
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-[#1A1A1A] border-0 p-0">
              {PAYMENT_CATEGORIES.map((category) => {
                const Icon = category.icon;
                const isSelected = selectedPayment === category.id;
                return (
                  <SelectItem 
                    key={category.id} 
                    value={category.id}
                    className={`flex items-center justify-between py-3 px-4 cursor-pointer ${
                      isSelected ? 'bg-white text-black' : 'text-gray-200 hover:bg-[#242424]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-black' : ''}`} />
                      <span>{category.label}</span>
                    </div>
                    <div className="flex items-center">
                      <span className={`text-sm ${isSelected ? 'text-gray-600' : 'text-gray-500'}`}>
                        CHOICES: {category.choices}
                      </span>
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Amount */}
        <div className="space-y-3">
          <label className="text-[15px] text-white">Amount</label>
          <Input
            type="text"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-[#1A1A1A] border-0 text-white h-[52px] px-4 placeholder:text-gray-500"
          />
        </div>

        {/* Offer Location */}
        <div className="space-y-3">
          <label className="text-[15px] text-white">Offer Location</label>
          <Select value={offerLocation} onValueChange={setOfferLocation}>
            <SelectTrigger className="w-full bg-[#1A1A1A] border-0 text-white h-[52px] px-4">
              <SelectValue placeholder="Select offer location" />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1A1A] border-0">
              <SelectItem value="All" className="text-gray-200 hover:bg-[#242424]">All Locations</SelectItem>
              <SelectItem value="Iran" className="text-gray-200 hover:bg-[#242424]">Iran</SelectItem>
              <SelectItem value="Turkey" className="text-gray-200 hover:bg-[#242424]">Turkey</SelectItem>
              <SelectItem value="UAE" className="text-gray-200 hover:bg-[#242424]">UAE</SelectItem>
              <SelectItem value="Germany" className="text-gray-200 hover:bg-[#242424]">Germany</SelectItem>
              <SelectItem value="UK" className="text-gray-200 hover:bg-[#242424]">United Kingdom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Trader Location */}
        <div className="space-y-3">
          <label className="text-[15px] text-white">Trader Location</label>
          <Select value={traderLocation} onValueChange={setTraderLocation}>
            <SelectTrigger className="w-full bg-[#1A1A1A] border-0 text-white h-[52px] px-4">
              <SelectValue placeholder="Select trader location" />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1A1A] border-0">
              <SelectItem value="All" className="text-gray-200 hover:bg-[#242424]">All Locations</SelectItem>
              <SelectItem value="Iran" className="text-gray-200 hover:bg-[#242424]">Iran</SelectItem>
              <SelectItem value="Turkey" className="text-gray-200 hover:bg-[#242424]">Turkey</SelectItem>
              <SelectItem value="UAE" className="text-gray-200 hover:bg-[#242424]">UAE</SelectItem>
              <SelectItem value="Germany" className="text-gray-200 hover:bg-[#242424]">Germany</SelectItem>
              <SelectItem value="UK" className="text-gray-200 hover:bg-[#242424]">United Kingdom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Switches */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <label className="text-[15px] text-white">Recently Active Traders</label>
            <Switch
              checked={recentTraders}
              onCheckedChange={setRecentTraders}
              className="data-[state=checked]:bg-green-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-[15px] text-white">Verified Offers Only</label>
            <Switch
              checked={verifiedOffers}
              onCheckedChange={setVerifiedOffers}
              className="data-[state=checked]:bg-green-500"
            />
          </div>
        </div>

        {/* Find Offers Button */}
        <Button 
          onClick={handleFindOffers}
          className="w-full bg-green-500 hover:bg-green-600 text-white h-[52px] rounded-xl"
        >
          Find Offers
        </Button>
      </div>
    </div>
  );
}
