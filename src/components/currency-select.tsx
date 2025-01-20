'use client'

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const countries = [
  // Main focus countries
  { code: "IR", name: "Iran", flag: "🇮🇷" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
]

const currencies = [
  // Main currencies
  { code: "IRR", name: "Iranian Rial", flag: "🇮🇷" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧" },
  { code: "USD", name: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦" },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
]

const banks = {
  // Iranian Banks
  IR: [
    { code: "MELLAT", name: "Bank Mellat", country: "IR" },
    { code: "MELLI", name: "Bank Melli Iran", country: "IR" },
    { code: "SADERAT", name: "Bank Saderat Iran", country: "IR" },
    { code: "SEPAH", name: "Bank Sepah", country: "IR" },
    { code: "TEJARAT", name: "Bank Tejarat", country: "IR" },
    { code: "PARSIAN", name: "Parsian Bank", country: "IR" },
    { code: "PASARGAD", name: "Bank Pasargad", country: "IR" },
  ],
  // UK Banks
  GB: [
    { code: "HSBC", name: "HSBC UK", country: "GB" },
    { code: "BARCLAYS", name: "Barclays Bank", country: "GB" },
    { code: "LLOYDS", name: "Lloyds Bank", country: "GB" },
    { code: "NATWEST", name: "NatWest", country: "GB" },
  ],
  // German Banks
  DE: [
    { code: "DEUTSCHE", name: "Deutsche Bank", country: "DE" },
    { code: "COMMERZBANK", name: "Commerzbank", country: "DE" },
    { code: "SPARKASSE", name: "Sparkasse", country: "DE" },
    { code: "POSTBANK", name: "Postbank", country: "DE" },
  ],
  // US Banks
  US: [
    { code: "JPMORGAN", name: "JPMorgan Chase", country: "US" },
    { code: "BANKOFAMERICA", name: "Bank of America", country: "US" },
    { code: "CITIBANK", name: "Citibank", country: "US" },
    { code: "WELLSFARGO", name: "Wells Fargo", country: "US" },
  ],
  // Canadian Banks
  CA: [
    { code: "RBC", name: "Royal Bank of Canada", country: "CA" },
    { code: "TD", name: "TD Bank", country: "CA" },
    { code: "SCOTIABANK", name: "Scotiabank", country: "CA" },
    { code: "BMO", name: "Bank of Montreal", country: "CA" },
  ],
  // Australian Banks
  AU: [
    { code: "CBA", name: "Commonwealth Bank", country: "AU" },
    { code: "NAB", name: "National Australia Bank", country: "AU" },
    { code: "ANZ", name: "ANZ Bank", country: "AU" },
    { code: "WESTPAC", name: "Westpac", country: "AU" },
  ],
}

interface CurrencySelectProps {
  type: "currency" | "country" | "bank"
  countryCode?: string // Required for bank selection
  onSelect?: (value: string) => void
  value?: string
}

export function CurrencySelect({ type, countryCode, onSelect, value }: CurrencySelectProps) {
  let data = []
  
  if (type === "currency") {
    data = currencies
  } else if (type === "country") {
    data = countries
  } else if (type === "bank" && countryCode) {
    data = banks[countryCode] || []
  }

  return (
    <Select 
      value={value} 
      onValueChange={onSelect}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={`Select ${type}`}>
          {value && type !== "bank" && (
            <div className="flex items-center gap-2">
              <span className="text-lg">
                {data.find(item => item.code === value)?.flag}
              </span>
              <span>
                {data.find(item => item.code === value)?.name}
              </span>
            </div>
          )}
          {value && type === "bank" && (
            <div className="flex items-center gap-2">
              <span>
                {data.find(item => item.code === value)?.name}
              </span>
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {data.map((item) => (
          <SelectItem
            key={item.code}
            value={item.code}
            className="cursor-pointer"
          >
            <div className="flex items-center gap-3">
              {type !== "bank" && (
                <span className="text-lg">{item.flag}</span>
              )}
              <span>{item.name}</span>
              <span className="ml-auto text-sm text-muted-foreground">
                {item.code}
              </span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
