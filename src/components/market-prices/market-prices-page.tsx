"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RefreshCw, ArrowRight } from "lucide-react"

const currencies = [
  { code: "USD", name: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧" },
  { code: "AED", name: "UAE Dirham", flag: "🇦🇪" },
  { code: "TRY", name: "Turkish Lira", flag: "🇹🇷" },
]

const currencyRates = [
  {
    flag: "🇺🇸",
    code: "USD",
    amount: "1 USD =",
    irrValue: "527,000 IRR",
    totalValue: "Total value in IRR: 527,000",
    lastUpdate: "Last updated: 3 min ago",
  },
  {
    flag: "🇪🇺",
    code: "EUR",
    amount: "1 EUR =",
    irrValue: "575,000 IRR",
    totalValue: "Total value in IRR: 575,000",
    lastUpdate: "Last updated: 5 min ago",
  },
  {
    flag: "🇬🇧",
    code: "GBP",
    amount: "1 GBP =",
    irrValue: "670,000 IRR",
    totalValue: "Total value in IRR: 670,000",
    lastUpdate: "Last updated: 2 min ago",
  },
  {
    flag: "🇦🇪",
    code: "AED",
    amount: "1 AED =",
    irrValue: "143,500 IRR",
    totalValue: "Total value in IRR: 143,500",
    lastUpdate: "Last updated: 4 min ago",
  },
  {
    flag: "🇹🇷",
    code: "TRY",
    amount: "1 TRY =",
    irrValue: "18,200 IRR",
    totalValue: "Total value in IRR: 18,200",
    lastUpdate: "Last updated: 1 min ago",
  },
]

const popularConversions = [
  { from: "IRR", to: "USD" },
  { from: "IRR", to: "EUR" },
  { from: "IRR", to: "GBP" },
  { from: "IRR", to: "AED" },
  { from: "IRR", to: "TRY" },
]

export default function MarketPricesPage() {
  const [amount, setAmount] = useState("1")
  const [fromCurrency, setFromCurrency] = useState("IRR")
  const [toCurrency, setToCurrency] = useState("USD")

  return (
    <div className="flex-1 space-y-12 py-8">
      {/* Main Calculator Section */}
      <section className="container max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-4">
          Peer-to-Peer Currency Exchange Rates
        </h1>
        <p className="text-center text-muted-foreground mb-8">
          Compare current market prices with peer-to-peer exchange rates based on trades over the past 24 hours
        </p>

        <Card className="p-6">
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount in IRR</label>
                <Input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ""))}
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Amount in selected currency</label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={(parseInt(amount) / 527000).toFixed(2)}
                    readOnly
                    className="text-lg flex-1"
                  />
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.flag} {currency.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 text-sm text-center">
              <div>
                <div className="text-muted-foreground">Buy orders</div>
                <div>Offers: 10,580</div>
              </div>
              <div>
                <div className="text-muted-foreground">Sell orders</div>
                <div>Offers: 18,640</div>
              </div>
              <div>
                <div className="text-muted-foreground">Last trades</div>
                <div>Offers: 12,043</div>
              </div>
              <div>
                <div className="text-muted-foreground">All offers</div>
                <div>Offers: 31,049</div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button>Find an offer</Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Currency Cards */}
      <section className="container max-w-4xl">
        <div className="grid md:grid-cols-2 gap-4">
          {currencyRates.map((rate, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{rate.flag}</span>
                <span className="font-medium">{rate.code}</span>
              </div>
              <div className="text-xl font-semibold mb-1">{rate.amount}</div>
              <div className="text-2xl font-bold mb-2">{rate.irrValue}</div>
              <div className="text-sm text-muted-foreground">{rate.totalValue}</div>
              <div className="text-sm text-muted-foreground">{rate.lastUpdate}</div>
              <Button variant="outline" className="w-full mt-4">
                Update calculator
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* P2P Exchange Rate Calculator */}
      <section className="container max-w-4xl">
        <h2 className="text-xl font-semibold text-center mb-4">
          Peer-to-Peer currency exchange rates
        </h2>
        <p className="text-center text-muted-foreground mb-8">
          Explore the foreign currency peer-to-peer exchange rates based on P2P trades for the past 24 hours
        </p>

        <Card className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount in IRR</label>
              <Input
                type="text"
                value="1,000,000"
                readOnly
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Amount in USD</label>
              <Input
                type="text"
                value="1.90"
                readOnly
                className="text-lg"
              />
            </div>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            To exchange IRR to any other foreign currency, you need to first exchange IRR for USD and then exchange the USD for your preferred currency.
          </div>
        </Card>
      </section>

      {/* Exchange Rate Cards */}
      <section className="container max-w-4xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {currencies.map((currency, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{currency.flag}</span>
                <span className="font-medium">{currency.code}</span>
              </div>
              <div className="text-xl font-semibold mb-1">1 USD =</div>
              <div className="text-lg font-medium mb-2">{currency.code}</div>
              <div className="text-sm text-muted-foreground">
                Google&apos;s exchange rate: 1.00 USD
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Popular Conversions */}
      <section className="container max-w-4xl">
        <h2 className="text-xl font-semibold text-center mb-4">
          Popular currency conversions
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {popularConversions.map((conversion, index) => (
            <Button key={index} variant="outline">
              {conversion.from} to {conversion.to}
            </Button>
          ))}
        </div>
      </section>
    </div>
  )
}
