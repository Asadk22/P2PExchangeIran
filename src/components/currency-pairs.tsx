'use client'

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import CurrencyConverter from "./currency-converter"

const currencyPairs = [
  {
    pair: "USD/IRR",
    name: "US Dollar",
    flag: "🇺🇸",
    rate: "42,300",
    change: "+0.8%",
    volume: "$12.5M",
    trend: "up"
  },
  {
    pair: "EUR/IRR",
    name: "Euro",
    flag: "🇪🇺",
    rate: "46,100",
    change: "+0.5%",
    volume: "$8.2M",
    trend: "up"
  },
  {
    pair: "GBP/IRR",
    name: "British Pound",
    flag: "🇬🇧",
    rate: "53,700",
    change: "-0.3%",
    volume: "$6.4M",
    trend: "down"
  },
  {
    pair: "AED/IRR",
    name: "UAE Dirham",
    flag: "🇦🇪",
    rate: "11,520",
    change: "+0.2%",
    volume: "$5.4M",
    trend: "up"
  },
  {
    pair: "TRY/IRR",
    name: "Turkish Lira",
    flag: "🇹🇷",
    rate: "1,450",
    change: "-0.7%",
    volume: "$3.8M",
    trend: "down"
  },
  {
    pair: "CNY/IRR",
    name: "Chinese Yuan",
    flag: "🇨🇳",
    rate: "5,920",
    change: "+0.4%",
    volume: "$2.9M",
    trend: "up"
  }
]

export default function CurrencyPairs() {
  return (
    <section className="py-20 bg-[#0a0a0a]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            <span className="text-white">Popular</span>
            <span className="text-[#c5f82a] ml-3">Exchange Pairs</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-16">
            Most traded currency pairs on our platform
          </p>

          {/* Currency Converter */}
          <CurrencyConverter />
        </div>

        {/* Currency Pairs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currencyPairs.map((pair) => (
            <Card 
              key={pair.pair} 
              className="bg-[#1C1F26] border-gray-800 hover:border-[#c5f82a]/30 transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{pair.flag}</span>
                    <div>
                      <h3 className="font-medium text-white">{pair.pair}</h3>
                      <p className="text-sm text-gray-400">{pair.name}</p>
                    </div>
                  </div>
                  <div
                    className={`text-sm ${
                      pair.trend === "up" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {pair.change}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-[#c5f82a]">
                    {pair.rate}
                  </div>
                  <div className="text-sm text-gray-400">
                    24h Vol: {pair.volume}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4 bg-[#c5f82a]/10 hover:bg-[#c5f82a]/20 text-[#c5f82a] py-2 rounded-lg transition-colors"
                >
                  Trade Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
