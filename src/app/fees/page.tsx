'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calculator,
  CreditCard,
  Wallet,
  Clock,
  Shield,
  Info,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Percent
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Mock fee data
const TRADING_FEES = {
  standard: {
    maker: 0.15,
    taker: 0.25,
    withdrawal: 1.0,
    minimumTrade: 100,
  },
  pro: {
    maker: 0.10,
    taker: 0.20,
    withdrawal: 0.8,
    minimumTrade: 1000,
  },
  vip: {
    maker: 0.05,
    taker: 0.15,
    withdrawal: 0.5,
    minimumTrade: 10000,
  }
};

const PAYMENT_METHOD_FEES = {
  bank: {
    name: 'Bank Transfer',
    deposit: 0,
    withdrawal: 1.0,
    processingTime: '1-3 business days',
    limits: { min: 100, max: 50000 }
  },
  card: {
    name: 'Credit/Debit Card',
    deposit: 2.5,
    withdrawal: 'N/A',
    processingTime: 'Instant',
    limits: { min: 10, max: 5000 }
  },
  crypto: {
    name: 'Cryptocurrency',
    deposit: 0,
    withdrawal: 0.5,
    processingTime: '10-30 minutes',
    limits: { min: 50, max: 100000 }
  }
};

const VOLUME_TIERS = [
  { tier: 1, volume: '0-9,999', makerFee: 0.15, takerFee: 0.25 },
  { tier: 2, volume: '10,000-49,999', makerFee: 0.12, takerFee: 0.22 },
  { tier: 3, volume: '50,000-99,999', makerFee: 0.10, takerFee: 0.20 },
  { tier: 4, volume: '100,000-499,999', makerFee: 0.08, takerFee: 0.18 },
  { tier: 5, volume: '500,000+', makerFee: 0.05, takerFee: 0.15 }
];

export default function FeesPage() {
  const [selectedTier, setSelectedTier] = useState('standard');
  const [tradeAmount, setTradeAmount] = useState('1000');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('bank');

  // Calculate estimated fees
  const calculateFees = () => {
    const amount = parseFloat(tradeAmount) || 0;
    const tier = TRADING_FEES[selectedTier];
    return {
      makerFee: (amount * (tier.maker / 100)).toFixed(2),
      takerFee: (amount * (tier.taker / 100)).toFixed(2),
      withdrawalFee: (amount * (tier.withdrawal / 100)).toFixed(2)
    };
  };

  const fees = calculateFees();

  return (
    <div className="min-h-screen bg-[#1C1F26]">
      {/* Header */}
      <div className="bg-[#2A2F3A] border-b border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Transparent Fee Structure</h1>
            <p className="text-gray-400">
              Our competitive fees are designed to provide the best value for traders of all sizes
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Fee Calculator */}
          <div className="lg:col-span-2 space-y-8">
            {/* Fee Calculator */}
            <Card className="p-6 bg-[#2A2F3A] border-gray-800">
              <div className="flex items-center gap-2 mb-6">
                <Calculator className="h-5 w-5 text-[#c5f82a]" />
                <h2 className="text-xl font-semibold text-white">Fee Calculator</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="text-sm text-gray-400">Trade Amount (EUR)</label>
                  <Input
                    type="text"
                    value={tradeAmount}
                    onChange={(e) => setTradeAmount(e.target.value)}
                    className="bg-[#1C1F26] border-gray-700"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-sm text-gray-400">Account Tier</label>
                  <Select value={selectedTier} onValueChange={setSelectedTier}>
                    <SelectTrigger className="bg-[#1C1F26] border-gray-700">
                      <SelectValue placeholder="Select tier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="pro">Pro</SelectItem>
                      <SelectItem value="vip">VIP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-[#1C1F26]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Maker Fee</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-gray-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Fee for adding liquidity to the order book</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-xl font-semibold text-white">{fees.makerFee} EUR</p>
                  <p className="text-sm text-gray-400">({TRADING_FEES[selectedTier].maker}%)</p>
                </div>
                <div className="p-4 rounded-lg bg-[#1C1F26]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Taker Fee</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-gray-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Fee for removing liquidity from the order book</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-xl font-semibold text-white">{fees.takerFee} EUR</p>
                  <p className="text-sm text-gray-400">({TRADING_FEES[selectedTier].taker}%)</p>
                </div>
                <div className="p-4 rounded-lg bg-[#1C1F26]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Withdrawal Fee</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-gray-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Fee for withdrawing funds</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-xl font-semibold text-white">{fees.withdrawalFee} EUR</p>
                  <p className="text-sm text-gray-400">({TRADING_FEES[selectedTier].withdrawal}%)</p>
                </div>
              </div>
            </Card>

            {/* Volume-Based Tiers */}
            <Card className="p-6 bg-[#2A2F3A] border-gray-800">
              <div className="flex items-center gap-2 mb-6">
                <Percent className="h-5 w-5 text-[#c5f82a]" />
                <h2 className="text-xl font-semibold text-white">Volume-Based Tiers</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-gray-800">
                      <th className="pb-4 text-gray-400">Tier</th>
                      <th className="pb-4 text-gray-400">30d Volume (EUR)</th>
                      <th className="pb-4 text-gray-400">Maker Fee</th>
                      <th className="pb-4 text-gray-400">Taker Fee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {VOLUME_TIERS.map((tier) => (
                      <tr key={tier.tier} className="border-b border-gray-800">
                        <td className="py-4 text-white">Tier {tier.tier}</td>
                        <td className="py-4 text-white">{tier.volume}</td>
                        <td className="py-4 text-white">{tier.makerFee}%</td>
                        <td className="py-4 text-white">{tier.takerFee}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Right Column - Payment Methods and Info */}
          <div className="space-y-6">
            {/* Payment Method Fees */}
            <Card className="p-6 bg-[#2A2F3A] border-gray-800">
              <h3 className="text-lg font-medium text-white mb-4">Payment Method Fees</h3>
              <div className="space-y-4">
                {Object.entries(PAYMENT_METHOD_FEES).map(([key, method]) => (
                  <div
                    key={key}
                    className="p-4 rounded-lg bg-[#1C1F26] border border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#363B47] flex items-center justify-center">
                          {key === 'bank' && <Wallet className="h-4 w-4 text-[#c5f82a]" />}
                          {key === 'card' && <CreditCard className="h-4 w-4 text-[#c5f82a]" />}
                          {key === 'crypto' && <Shield className="h-4 w-4 text-[#c5f82a]" />}
                        </div>
                        <span className="text-white font-medium">{method.name}</span>
                      </div>
                      <Clock className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Deposit Fee</span>
                        <span className="text-white">{method.deposit}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Withdrawal Fee</span>
                        <span className="text-white">{method.withdrawal}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Processing Time</span>
                        <span className="text-white">{method.processingTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Limits</span>
                        <span className="text-white">
                          {method.limits.min}-{method.limits.max} EUR
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Additional Information */}
            <Card className="p-6 bg-[#2A2F3A] border-gray-800">
              <h3 className="text-lg font-medium text-white mb-4">Important Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-[#c5f82a] mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Fee Calculation</p>
                    <p className="text-sm text-gray-400">
                      Fees are calculated and deducted automatically at the time of transaction
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-[#c5f82a] mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Security Deposits</p>
                    <p className="text-sm text-gray-400">
                      Some transactions may require a security deposit which is fully refundable
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-[#c5f82a] mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Processing Times</p>
                    <p className="text-sm text-gray-400">
                      Processing times may vary depending on network conditions and payment methods
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Links */}
            <Card className="p-6 bg-[#2A2F3A] border-gray-800">
              <h3 className="text-lg font-medium text-white mb-4">Need Help?</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-between border-gray-700">
                  Contact Support
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between border-gray-700">
                  Fee FAQ
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between border-gray-700">
                  Terms & Conditions
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
