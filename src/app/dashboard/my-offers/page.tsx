import { Metadata } from "next"
import MyOffersPage from "@/components/offers/my-offers-page"

export const metadata: Metadata = {
  title: "My Offers",
  description: "View and manage your buy and sell offers",
}

export default function MyOffers() {
  return <MyOffersPage />
}
