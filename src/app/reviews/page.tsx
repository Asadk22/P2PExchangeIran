import { Metadata } from "next"
import ReviewsPage from "@/components/reviews/reviews-page"

export const metadata: Metadata = {
  title: "Customer Reviews - P2P Exchange",
  description: "Read what our customers are saying about their P2P exchange experience",
}

export default function Reviews() {
  return <ReviewsPage />
}
