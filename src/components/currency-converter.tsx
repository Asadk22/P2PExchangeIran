'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeftRight } from "lucide-react"

const currencies = [
  {
    code: "IRR",
    name: "Iranian Rial",
    flag: "🇮🇷",
    symbol: "IRR"
  },
  {
    code: "USD",
    name: "US Dollar",
    flag: "🇺🇸",
    symbol: "$"
  },
  {
    code: "EUR",
    name: "Euro",
    flag: "🇪🇺",
    symbol: "€"
  },
  {
    code: "GBP",
    name: "British Pound",
    flag: "🇬🇧",
    symbol: "£"
  },
  {
    code: "AED",
    name: "UAE Dirham",
    flag: "🇦🇪",
    symbol: "د.إ"
  },
  {
    code: "TRY",
    name: "Turkish Lira",
    flag: "🇹🇷",
    symbol: "₺"
  },
  {
    code: "CNY",
    name: "Chinese Yuan",
    flag: "🇨🇳",
    symbol: "¥"
  }
]

const rates = {
  USD: 42300,
  EUR: 46100,
  GBP: 53700,
  AED: 11520,
  TRY: 1450,
  CNY: 5920,
  IRR: 1
}

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>('1')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('IRR')
  const [timestamp, setTimestamp] = useState<string>('')

  const convertCurrency = (amount: number, from: string, to: string) => {
    const rateFrom = rates[from as keyof typeof rates]
    const rateTo = rates[to as keyof typeof rates]
    return ((amount * rateFrom) / rateTo).toFixed(2)


  useEffect(() => {
    setTimestamp(new Date().toLocaleString())
  }, [])
  }

  const handleSwap = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const convertedAmount = convertCurrency(parseFloat(amount) || 0, fromCurrency, toCurrency)

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-[#1C1F26] rounded-2xl p-8 border border-[#c5f82a]/10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-6 items-center">
          {/* From Currency */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-400">From</label>
              <span className="text-sm text-[#c5f82a]">
                {currencies.find(c => c.code === fromCurrency)?.symbol}
              </span>
            </div>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-black/20 border-gray-800 focus:border-[#c5f82a]"
              placeholder="Enter amount"
            />
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger className="bg-black/20 border-gray-800">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    <div className="flex items-center gap-2">
                      <span>{currency.flag}</span>
                      <span>{currency.code}</span>
                      <span className="text-gray-400">- {currency.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Swap Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSwap}
            className="w-12 h-12 rounded-full bg-[#c5f82a]/10 hover:bg-[#c5f82a]/20 text-[#c5f82a]"
          >
            <ArrowLeftRight className="w-6 h-6" />
          </Button>

          {/* To Currency */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-400">To</label>
              <span className="text-sm text-[#c5f82a]">
                {currencies.find(c => c.code === toCurrency)?.symbol}
              </span>
            </div>
            <Input
              type="text"
              value={convertedAmount}
              readOnly
              className="bg-black/20 border-gray-800"
            />
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger className="bg-black/20 border-gray-800">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    <div className="flex items-center gap-2">
                      <span>{currency.flag}</span>
                      <span>{currency.code}</span>
                      <span className="text-gray-400">- {currency.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Rate Display */}
        <div className="mt-6 text-center text-sm text-gray-400">
          <p>
            1 {fromCurrency} = {convertCurrency(1, fromCurrency, toCurrency)}{" "}
            {toCurrency}
          </p>
          {/* <p className="text-xs mt-1">
            Last updated: {new Date().toLocaleString()}
          </p> */}
          {timestamp && (
          <p className="text-xs mt-1">Last updated: {timestamp}</p>
        )}
        </div>
      </div>
    </div>
  )
}
