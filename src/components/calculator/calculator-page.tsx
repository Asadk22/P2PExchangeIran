"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight } from "lucide-react"

const currencies = [
  { code: "IRR", name: "Iranian Rial" },
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "AED", name: "UAE Dirham" },
  { code: "TRY", name: "Turkish Lira" },
]

const popularConversions = [
  { from: "IRR", to: "USD" },
  { from: "IRR", to: "EUR" },
  { from: "IRR", to: "GBP" },
  { from: "IRR", to: "AED" },
  { from: "IRR", to: "TRY" },
]

const conversionTable = [
  { irr: "1,000,000", usd: "23.70", rate: "42,194" },
  { irr: "5,000,000", usd: "118.50", rate: "42,194" },
  { irr: "10,000,000", usd: "237.00", rate: "42,194" },
  { irr: "50,000,000", usd: "1,185.00", rate: "42,194" },
  { irr: "100,000,000", usd: "2,370.00", rate: "42,194" },
]

interface Offer {
  user: string;
  paymentMethod: string;
  timeActive: string;
  tradeSpeed: string;
  price: string;
  limits: string;
}

const buyOffers: Offer[] = [
  {
    user: "IranTrade",
    paymentMethod: "IR Bank Transfer",
    timeActive: "Seen 4 minutes",
    tradeSpeed: "New Offer",
    price: "42,350 IRR/USD",
    limits: "Min purchase: 1,000,000 IRR\nMax purchase: 100,000,000 IRR"
  },
  {
    user: "TehranExchange",
    paymentMethod: "Shetab",
    timeActive: "Seen 5 minutes",
    tradeSpeed: "Under 5 minutes",
    price: "42,200 IRR/USD",
    limits: "Min purchase: 5,000,000 IRR\nMax purchase: 200,000,000 IRR"
  },
  {
    user: "SafePay_IR",
    paymentMethod: "IR Card to Card",
    timeActive: "Seen 10 minutes",
    tradeSpeed: "Under 10 minutes",
    price: "42,150 IRR/USD",
    limits: "Min purchase: 2,000,000 IRR\nMax purchase: 150,000,000 IRR"
  }
]

const sellOffers: Offer[] = [
  {
    user: "IranMarket",
    paymentMethod: "IR Bank Transfer",
    timeActive: "Seen 1 hour ago",
    tradeSpeed: "4 min",
    price: "42,000 IRR/USD",
    limits: "Min sell: 1,000,000 IRR\nMax sell: 50,000,000 IRR"
  },
  {
    user: "FastExchange_IR",
    paymentMethod: "Shetab",
    timeActive: "Seen 1 minute",
    tradeSpeed: "New Offer",
    price: "41,950 IRR/USD",
    limits: "Min sell: 2,000,000 IRR\nMax sell: 100,000,000 IRR"
  }
]

export default function CalculatorPage() {
  const [amount, setAmount] = useState("1000000")
  const [fromCurrency, setFromCurrency] = useState("IRR")
  const [toCurrency, setToCurrency] = useState("USD")
  const [currentRate] = useState("42,194")
  const [timeFrame, setTimeFrame] = useState("24h")

  const calculateConversion = (value: string, from: string, to: string) => {
    const numValue = parseFloat(value.replace(/,/g, ""))
    if (from === "IRR" && to === "USD") {
      return (numValue / parseFloat(currentRate.replace(/,/g, ""))).toFixed(2)
    } else if (from === "USD" && to === "IRR") {
      return (numValue * parseFloat(currentRate.replace(/,/g, ""))).toLocaleString()
    }
    return "0"
  }

  return (
    <div className="flex-1 space-y-12 py-8">
      {/* Calculator Section */}
      <section className="container max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-4">
          Iranian Rial (IRR) Exchange Calculator
        </h1>
        <p className="text-center text-muted-foreground mb-8">
          Use our currency calculator to find out exactly how much your Iranian Rials are worth in major global currencies,
          using accurate, up-to-date exchange rates. Get real-time and historical trends for your selected currency pair.
        </p>

        <Card className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount in {fromCurrency}</label>
              <Input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ""))}
                className="text-lg"
              />
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Amount in {toCurrency}</label>
              <Input
                type="text"
                value={calculateConversion(amount, fromCurrency, toCurrency)}
                readOnly
                className="text-lg"
              />
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      </section>

      {/* Current Rate Section */}
      <section className="container max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">
          Current IRR/USD Exchange Rate
        </h2>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-3xl font-bold">{currentRate} IRR/USD</span>
        </div>
        <Tabs defaultValue={timeFrame} className="w-full">
          <TabsList>
            <TabsTrigger value="24h">24h</TabsTrigger>
            <TabsTrigger value="1w">1w</TabsTrigger>
            <TabsTrigger value="1m">1m</TabsTrigger>
            <TabsTrigger value="1y">1y</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="h-[200px] bg-gray-100 rounded-lg mt-4">
          {/* Rate chart would go here */}
        </div>
      </section>

      {/* Buy/Sell Offers */}
      <section className="container max-w-4xl space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Offers to Buy USD with IRR</h2>
          <Card className="divide-y">
            {buyOffers.map((offer, index) => (
              <div key={index} className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">{offer.user}</div>
                  <div className="text-sm text-muted-foreground">{offer.paymentMethod}</div>
                  <div className="text-xs text-muted-foreground">{offer.timeActive}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{offer.price}</div>
                  <div className="text-xs text-muted-foreground whitespace-pre-line">{offer.limits}</div>
                  <Button size="sm" className="mt-2">Buy USD</Button>
                </div>
              </div>
            ))}
          </Card>
          <div className="text-center">
            <Button variant="outline">See more offers <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Offers to Sell USD for IRR</h2>
          <Card className="divide-y">
            {sellOffers.map((offer, index) => (
              <div key={index} className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">{offer.user}</div>
                  <div className="text-sm text-muted-foreground">{offer.paymentMethod}</div>
                  <div className="text-xs text-muted-foreground">{offer.timeActive}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{offer.price}</div>
                  <div className="text-xs text-muted-foreground whitespace-pre-line">{offer.limits}</div>
                  <Button size="sm" className="mt-2">Sell USD</Button>
                </div>
              </div>
            ))}
          </Card>
          <div className="text-center">
            <Button variant="outline">See more offers <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </div>
        </div>
      </section>

      {/* Popular Conversions */}
      <section className="container max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">Popular currency conversions</h2>
        <div className="flex flex-wrap gap-4">
          {popularConversions.map((conversion, index) => (
            <Button key={index} variant="outline">
              {conversion.from} to {conversion.to}
            </Button>
          ))}
        </div>
      </section>

      {/* Conversion Table */}
      <section className="container max-w-4xl">
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-xl font-semibold">IRR to USD Conversion Table</h2>
          <p className="text-muted-foreground">
            The current market exchange rates are updated every 3 minutes.
            Below, you'll see fixed IRR to USD conversion value increments.
          </p>
        </div>

        <Card className="overflow-hidden">
          <div className="grid grid-cols-3 gap-4 p-4 font-semibold bg-gray-50">
            <div>IRR</div>
            <div>USD</div>
            <div>Rate (IRR/USD)</div>
          </div>
          {conversionTable.map((row, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 p-4 border-t">
              <div>{row.irr}</div>
              <div>{row.usd}</div>
              <div>{row.rate}</div>
            </div>
          ))}
        </Card>
      </section>
    </div>
  )
}
