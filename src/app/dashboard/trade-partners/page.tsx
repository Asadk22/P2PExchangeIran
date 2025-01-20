import { Metadata } from "next"
import TradePartnersPage from "@/components/trade/trade-partners-page"

export const metadata: Metadata = {
  title: "Recent Trade Partners",
  description: "View your recent trading partners and history",
}

export default function TradePartners() {
  return <TradePartnersPage />
}
