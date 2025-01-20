import { Metadata } from "next"
import FavoriteOffersPage from "@/components/offers/favorite-offers-page"

export const metadata: Metadata = {
  title: "Favorite Offers",
  description: "View your favorite buy and sell offers",
}

export default function FavoriteOffers() {
  return <FavoriteOffersPage />
}
