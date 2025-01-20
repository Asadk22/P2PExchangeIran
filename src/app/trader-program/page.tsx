import { Metadata } from "next"
import { TraderProgramPage } from "@/components/trader-program/trader-program-page"

export const metadata: Metadata = {
  title: "Trader Program FAQs",
  description: "Learn about our Trader Program benefits and requirements",
}

export default function Page() {
  return <TraderProgramPage />
}
