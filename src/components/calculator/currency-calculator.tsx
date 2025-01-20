"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRightLeft } from "lucide-react"

const currencies = [
  { code: "EUR", name: "Euro" },
  { code: "USD", name: "US Dollar" },
  { code: "IRR", name: "Iranian Rial" },
  { code: "AED", name: "UAE Dirham" },
  { code: "TRY", name: "Turkish Lira" },
]

export default function CurrencyCalculator() {
  const [amount, setAmount] = useState("1")
  const [fromCurrency, setFromCurrency] = useState("EUR")
  const [toCurrency, setToCurrency] = useState("IRR")
  const [rate] = useState(45000) // This would come from your API

  const handleSwap = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const calculatedAmount = parseFloat(amount) * rate

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Currency Calculator</h1>
        
        <Card className="p-6">
          <div className="space-y-8">
            {/* Amount Input */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full"
                placeholder="Enter amount"
                min="0"
              />
            </div>

            {/* Currency Selection */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-center">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  From
                </label>
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

              <button
                onClick={handleSwap}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors mt-6"
              >
                <ArrowRightLeft className="h-6 w-6" />
              </button>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  To
                </label>
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

            {/* Result */}
            <div className="pt-6 border-t">
              <div className="text-center">
                <p className="text-lg">
                  <span className="font-semibold">{amount} {fromCurrency}</span>
                  {" = "}
                  <span className="font-semibold">
                    {calculatedAmount.toLocaleString()} {toCurrency}
                  </span>
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  1 {fromCurrency} = {rate.toLocaleString()} {toCurrency}
                </p>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="text-sm text-gray-500 mt-6">
              <p>
                * Exchange rates are updated in real-time. The rates shown are for informational purposes only and may vary from the actual exchange rate at the time of transaction.
              </p>
            </div>
          </div>
        </Card>

        {/* Additional Information */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Why Use Our Calculator?</h3>
            <ul className="space-y-3 text-gray-600">
              <li>• Real-time exchange rates</li>
              <li>• Support for multiple currencies</li>
              <li>• Fast and accurate calculations</li>
              <li>• User-friendly interface</li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Need to Exchange?</h3>
            <p className="text-gray-600 mb-4">
              Ready to exchange currencies? Use our P2P platform to find the best rates and trusted traders in your area.
            </p>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Popular exchanges:</p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• EUR to IRR</li>
                <li>• USD to IRR</li>
                <li>• AED to IRR</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
