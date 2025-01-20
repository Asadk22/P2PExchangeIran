import { Metadata } from "next"
import CareersPage from "@/components/careers/careers-page"

export const metadata: Metadata = {
  title: "Careers - Join Our Team",
  description: "Join our team and help build the future of P2P currency exchange",
}

export default function Careers() {
  return <CareersPage />
}
