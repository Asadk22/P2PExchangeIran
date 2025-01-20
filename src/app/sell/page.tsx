'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  TrendingDown,
  ChevronDown,
  Shield,
  Users,
  AlertCircle,
  LineChart,
  Timer,
  Banknote,
  CheckCircle2,
  Info
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
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Mock exchange rate data
const MOCK_RATES = {
  EUR: { buy: 47800, sell: 47500 },
  USD: { buy: 43500, sell: 43200 },
  GBP: { buy: 55200, sell: 54900 },
};

const MOCK_RECENT_TRADES = [
  { amount: '5,000', from: 'IRR', to: 'EUR', rate: '47,650', time: '2 min ago', status: 'completed' },
  { amount: '10,000', from: 'IRR', to: 'USD', rate: '43,400', time: '5 min ago', status: 'pending' },
  { amount: '3,000', from: 'IRR', to: 'GBP', rate: '55,100', time: '7 min ago', status: 'completed' },
];

const MOCK_MARKET_STATS = {
  volume24h: 1250000,
  trades24h: 342,
  avgTradeSize: 3650,
  successRate: 99.2
};

const MOCK_PAYMENT_METHODS = [
  { id: 'bank', name: 'Bank Transfer', processingTime: '1-3 hours', fee: '1%' },
  { id: 'card', name: 'Credit/Debit Card', processingTime: 'Instant', fee: '2.5%' },
  { id: 'crypto', name: 'Crypto Transfer', processingTime: '10-30 mins', fee: '0.5%' }
];

export default function SellIranianRial() {
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');
  const [amount, setAmount] = useState('1000');
  const [rateProgress, setRateProgress] = useState(0);
  const [showRateAlert, setShowRateAlert] = useState(false);
  const [marketTrend, setMarketTrend] = useState({ trend: 'down', percentage: '1.8' });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('bank');
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  // Simulate live rate updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRateProgress((prev) => {
        if (prev >= 100) {
          // Simulate rate update
          const variation = (Math.random() - 0.5) * 100;
          const newRate = MOCK_RATES[selectedCurrency].sell + variation;
          MOCK_RATES[selectedCurrency].sell = Math.round(newRate);
          return 0;
        }
        return prev + 10;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedCurrency]);

  // Calculate foreign currency amount based on IRR input
  const calculateForeignCurrency = () => {
    const rate = MOCK_RATES[selectedCurrency]?.sell || 0;
    const numAmount = parseFloat(amount.replace(/,/g, '')) || 0;
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(numAmount / rate);
  };

  return (
    <div className="min-h-screen bg-[#1C1F26]">
      {/* Market Banner */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-[#2A2F3A] border-b border-gray-800 sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              {Object.entries(MOCK_RATES).map(([currency, rates]) => (
                <motion.div 
                  key={currency}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#363B47] cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-gray-400">IRR/{currency}</span>
                  <span className="text-white font-medium">{rates.sell}</span>
                  <motion.span 
                    className={marketTrend.trend === 'up' ? 'text-green-500' : 'text-red-500'}
                    animate={{ y: marketTrend.trend === 'up' ? -2 : 2 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    <TrendingDown className="h-4 w-4" />
                  </motion.span>
                </motion.div>
              ))}
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Timer className="h-4 w-4" />
              <span>Next update:</span>
              <Progress value={rateProgress} className="w-20 h-2" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Exchange Interface */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-[#2A2F3A] border-gray-800">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Sell Iranian Rial</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                  className="text-[#c5f82a] hover:text-[#d4ff33]"
                >
                  {showAdvancedOptions ? 'Simple View' : 'Advanced Options'}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="text-sm text-gray-400">You Sell (IRR)</label>
                  <Input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-[#1C1F26] border-gray-700"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-sm text-gray-400">You Receive</label>
                  <div className="flex gap-4">
                    <Input
                      type="text"
                      value={calculateForeignCurrency()}
                      readOnly
                      className="flex-1 bg-[#1C1F26] border-gray-700"
                    />
                    <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                      <SelectTrigger className="w-32 bg-[#1C1F26] border-gray-700">
                        <SelectValue placeholder="Currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="mt-6 pt-6 border-t border-gray-800">
                <h3 className="text-sm font-medium text-white mb-4">Select Payment Method</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {MOCK_PAYMENT_METHODS.map((method) => (
                    <div
                      key={method.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedPaymentMethod === method.id
                          ? 'border-[#c5f82a] bg-[#1C1F26]'
                          : 'border-gray-700 bg-[#1C1F26] hover:border-gray-600'
                      }`}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{method.name}</span>
                        {selectedPaymentMethod === method.id && (
                          <CheckCircle2 className="h-4 w-4 text-[#c5f82a]" />
                        )}
                      </div>
                      <div className="text-sm text-gray-400">
                        <p>Processing: {method.processingTime}</p>
                        <p>Fee: {method.fee}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {showAdvancedOptions && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-6 pt-6 border-t border-gray-800"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-white mb-4">Rate Protection</h3>
                      <Select defaultValue="standard">
                        <SelectTrigger className="w-full bg-[#1C1F26] border-gray-700">
                          <SelectValue placeholder="Select Protection" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard (30 mins)</SelectItem>
                          <SelectItem value="extended">Extended (1 hour)</SelectItem>
                          <SelectItem value="guaranteed">Guaranteed Rate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-white mb-4">Settlement Speed</h3>
                      <Select defaultValue="standard">
                        <SelectTrigger className="w-full bg-[#1C1F26] border-gray-700">
                          <SelectValue placeholder="Select Speed" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="express">Express (+ 1% fee)</SelectItem>
                          <SelectItem value="instant">Instant (+ 2% fee)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="mt-6 flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  <span>Rate: 1 {selectedCurrency} = </span>
                  <span className="text-white font-medium">{MOCK_RATES[selectedCurrency].sell} IRR</span>
                </div>
                <Button className="bg-[#c5f82a] text-black hover:bg-[#d4ff33]">
                  Continue to Sell
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>

            {/* Recent Trades */}
            <Card className="p-6 bg-[#2A2F3A] border-gray-800">
              <h3 className="text-lg font-medium text-white mb-4">Recent Trades</h3>
              <div className="space-y-4">
                {MOCK_RECENT_TRADES.map((trade, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#1C1F26]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#363B47] flex items-center justify-center">
                        <Banknote className="h-5 w-5 text-[#c5f82a]" />
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {trade.amount} {trade.from}
                        </p>
                        <p className="text-sm text-gray-400">Rate: {trade.rate}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">{trade.time}</p>
                      <div className="flex items-center gap-1 text-green-400">
                        <CheckCircle2 className="h-4 w-4" />
                        <span className="text-xs capitalize">{trade.status}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Market Info & Trust Indicators */}
          <div className="space-y-6">
            {/* Market Statistics */}
            <Card className="p-6 bg-[#2A2F3A] border-gray-800">
              <h3 className="text-lg font-medium text-white mb-4">Market Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#1C1F26] rounded-lg">
                  <p className="text-gray-400 text-sm mb-1">24h Volume</p>
                  <p className="text-white font-medium">
                    {MOCK_MARKET_STATS.volume24h.toLocaleString()} IRR
                  </p>
                </div>
                <div className="p-4 bg-[#1C1F26] rounded-lg">
                  <p className="text-gray-400 text-sm mb-1">24h Trades</p>
                  <p className="text-white font-medium">
                    {MOCK_MARKET_STATS.trades24h}
                  </p>
                </div>
                <div className="p-4 bg-[#1C1F26] rounded-lg">
                  <p className="text-gray-400 text-sm mb-1">Avg Trade Size</p>
                  <p className="text-white font-medium">
                    {MOCK_MARKET_STATS.avgTradeSize} IRR
                  </p>
                </div>
                <div className="p-4 bg-[#1C1F26] rounded-lg">
                  <p className="text-gray-400 text-sm mb-1">Success Rate</p>
                  <p className="text-white font-medium">
                    {MOCK_MARKET_STATS.successRate}%
                  </p>
                </div>
              </div>
            </Card>

            {/* Selling Guide */}
            <Card className="p-6 bg-[#2A2F3A] border-gray-800">
              <h3 className="text-lg font-medium text-white mb-4">Selling Guide</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#363B47] flex items-center justify-center">
                    <Shield className="h-4 w-4 text-[#c5f82a]" />
                  </div>
                  <div>
                    <p className="text-white">Secure Transaction</p>
                    <p className="text-sm text-gray-400">Protected by escrow service</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#363B47] flex items-center justify-center">
                    <Users className="h-4 w-4 text-[#c5f82a]" />
                  </div>
                  <div>
                    <p className="text-white">Verified Buyers</p>
                    <p className="text-sm text-gray-400">Trade with trusted users</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#363B47] flex items-center justify-center">
                    <Info className="h-4 w-4 text-[#c5f82a]" />
                  </div>
                  <div>
                    <p className="text-white">24/7 Support</p>
                    <p className="text-sm text-gray-400">Help available anytime</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Tips */}
            <Card className="p-6 bg-[#2A2F3A] border-gray-800">
              <h3 className="text-lg font-medium text-white mb-4">Quick Tips</h3>
              <div className="space-y-3 text-sm">
                <p className="text-gray-400">• Verify your account for higher limits</p>
                <p className="text-gray-400">• Keep your transaction receipts</p>
                <p className="text-gray-400">• Double-check payment details</p>
                <p className="text-gray-400">• Contact support if needed</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
