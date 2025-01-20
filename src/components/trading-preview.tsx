"use client";

import React, { useEffect, useState } from 'react';
import { getHistoricalData, getMarketDepth, getOpenTrades, CURRENCY_PAIRS } from '@/lib/api';
import LineChart from './line-chart';

export default function TradingPreview() {
  const [selectedPair, setSelectedPair] = useState('USD/IRR');
  const [timeRange, setTimeRange] = useState('All');
  const [marketDepth, setMarketDepth] = useState<Record<string, any>>({});
  const [openTrades, setOpenTrades] = useState<Record<string, any>>({});
  const [chartData, setChartData] = useState<[number, number][]>([]);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update historical data when pair or time range changes
  useEffect(() => {
    if (!mounted) return;
    
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getHistoricalData(selectedPair, timeRange);
        // console.log("data-->>>",data)
        setChartData(data);
      } catch (error) {
        console.error('Error fetching historical data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedPair, timeRange, mounted]);

  // Update market depth and open trades
  useEffect(() => {
    if (!mounted) return;

    const depth = getMarketDepth();
    const trades = getOpenTrades();
    setMarketDepth(depth);
    setOpenTrades(trades);
  }, [selectedPair, mounted]);

  return (
    <div className="w-full bg-[#1E222D] rounded-lg overflow-hidden">
      {/* Main container with reduced height */}
      <div className="grid grid-cols-4 gap-4 p-4">
        {/* Chart Section - Takes up 3/4 of the space */}
        <div className="col-span-3 bg-[#2A2E39] rounded-lg p-4">
          {/* Currency selection */}
          <div className="flex gap-2 mb-4">
            {Object.keys(CURRENCY_PAIRS).map((pair) => (
              <button
                key={pair}
                onClick={() => setSelectedPair(pair)}
                className={`px-4 py-2 rounded text-sm ${
                  selectedPair === pair
                    ? 'bg-[#00C853] text-white'
                    : 'bg-[#1E222D] text-[#9CA3AF] hover:bg-[#2A2E39]'
                }`}
              >
                {pair}
              </button>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2 mb-4">
            <button 
              className="bg-[#00C853] text-white py-2 rounded hover:bg-[#00A846] transition-colors flex-1"
              onClick={() => console.log('Create Buy Order')}
            >
              Create Buy Order
            </button>
            <button 
              className="bg-[#FF3D57] text-white py-2 rounded hover:bg-[#FF2442] transition-colors flex-1"
              onClick={() => console.log('Create Sell Order')}
            >
              Create Sell Order
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="bg-[#1E222D] p-3 rounded">
              <div className="text-[#9CA3AF] text-sm">Price</div>
              <div className="text-white">
                {marketDepth[selectedPair]?.price?.toLocaleString()} IRR
              </div>
            </div>
            <div className="bg-[#1E222D] p-3 rounded">
              <div className="text-[#9CA3AF] text-sm">24h Volume</div>
              <div className="text-white">
                {marketDepth[selectedPair]?.volume?.toLocaleString()} IRR
              </div>
            </div>
            <div className="bg-[#1E222D] p-3 rounded">
              <div className="text-[#9CA3AF] text-sm">24h High</div>
              <div className="text-white">
                {marketDepth[selectedPair]?.high?.toLocaleString()} IRR
              </div>
            </div>
            <div className="bg-[#1E222D] p-3 rounded">
              <div className="text-[#9CA3AF] text-sm">24h Low</div>
              <div className="text-white">
                {marketDepth[selectedPair]?.low?.toLocaleString()} IRR
              </div>
            </div>
          </div>

          {/* Buy/Sell buttons */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <button className="bg-[#00C853] text-white py-2 rounded hover:bg-[#00A846] transition-colors">
              Buy {selectedPair.split('/')[0]}
            </button>
            <button className="bg-[#FF3D57] text-white py-2 rounded hover:bg-[#FF2442] transition-colors">
              Sell {selectedPair.split('/')[0]}
            </button>
          </div>

          {/* Chart */}
          <div className="h-[300px] mb-4">
            {mounted && (loading ? (
              <div className="h-full bg-[#2A2E39] animate-pulse rounded" />
            ) : chartData.length > 0 ? (
              <LineChart data={chartData} label={selectedPair} />
            ) : (
              <div className="h-full flex items-center justify-center text-[#9CA3AF]">
                No data available
              </div>
            ))}
          </div>

          {/* Time range selector */}
          <div className="flex gap-1 justify-center bg-[#1E222D] p-1 rounded-md">
            {['1D', '1M', '3M', '1Y', '5Y', 'All'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded text-xs ${
                  timeRange === range
                    ? 'bg-[#00C853] text-white'
                    : 'text-[#9CA3AF] hover:bg-[#2A2E39]'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Order Book Section */}
        <div className="col-span-1 bg-[#2A2E39] rounded-lg p-4">
          <h3 className="text-white font-semibold mb-2">Order Book</h3>

          {/* Headers */}
          <div className="grid grid-cols-5 text-[#9CA3AF] text-xs bg-[#1E222D] py-2 px-2 sticky top-0 z-10">
            <div>Type</div>
            <div>Price (IRR)</div>
            <div className="text-right">Amount</div>
            <div className="text-right">Total (M)</div>
            <div className="text-right">Action</div>
          </div>

          {/* Trades List with fixed height and scroll */}
          <div className="h-[400px] overflow-y-auto custom-scrollbar">
            {openTrades[selectedPair]?.map((trade: any) => {
              const [baseCurrency] = selectedPair.split('/');
              return (
                <div 
                  key={trade.id} 
                  className="grid grid-cols-5 text-xs py-1.5 px-2 hover:bg-[#1E222D] items-center border-b border-[#1E222D]"
                >
                  <div className={`flex items-center ${trade.type === 'buy' ? 'text-[#00C853]' : 'text-[#FF3D57]'}`}>
                    {trade.type === 'buy' ? 'BUY' : 'SELL'} {baseCurrency}
                  </div>
                  <div className="text-white">
                    {trade.price.toLocaleString()}
                  </div>
                  <div className="text-right text-[#9CA3AF]">
                    {trade.amount}
                  </div>
                  <div className="text-right text-[#9CA3AF]">
                    {(trade.total / 1000000).toFixed(2)}
                  </div>
                  <div className="text-right">
                    <button 
                      className={`px-2 py-1 rounded text-xs ${
                        trade.type === 'buy' 
                          ? 'bg-[#00C853] text-white hover:bg-[#00A846]' 
                          : 'bg-[#FF3D57] text-white hover:bg-[#FF2442]'
                      }`}
                    >
                      Trade
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}