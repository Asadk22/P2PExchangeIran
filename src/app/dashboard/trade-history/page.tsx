import { Metadata } from "next"
import TradeHistoryPage from "@/components/trade/trade-history-page"

export const metadata: Metadata = {
  title: "Trade History",
  description: "View your trading history and past transactions",
}

export default function TradeHistory() {
  return <TradeHistoryPage />
}
