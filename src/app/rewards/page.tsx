import { Metadata } from "next"
import RewardsPage from "@/components/rewards/rewards-page"

export const metadata: Metadata = {
  title: "Rewards Program - P2P Exchange",
  description: "Access game-changing benefits and become a community leader through our Trader Program",
}

export default function Rewards() {
  return <RewardsPage />
}
