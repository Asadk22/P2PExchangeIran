import { Metadata } from "next"
import MarketPricesPage from "@/components/market-prices/market-prices-page"

export const metadata: Metadata = {
  title: "Market Prices - P2P Exchange",
  description: "Compare current market prices with peer-to-peer exchange rates for major currencies",
}

export default function MarketPrices() {
  return <MarketPricesPage />
}
