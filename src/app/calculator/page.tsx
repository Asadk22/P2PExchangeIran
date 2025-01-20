import { Metadata } from "next"
import CalculatorPage from "@/components/calculator/calculator-page"

export const metadata: Metadata = {
  title: "Bitcoin Price Calculator - P2P Exchange",
  description: "Calculate Bitcoin value in multiple currencies with real-time exchange rates",
}

export default function Calculator() {
  return <CalculatorPage />
}
