import { Metadata } from "next"
import TraderBadgesPage from "@/components/badges/trader-badges-page"

export const metadata: Metadata = {
  title: "Trader Program Badges",
  description: "View your trader program status and badges",
}

export default function TraderBadges() {
  return <TraderBadgesPage />
}
