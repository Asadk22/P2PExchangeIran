import { Metadata } from "next"
import BusinessContactsPage from "@/components/about/business-contacts-page"

export const metadata: Metadata = {
  title: "Business Contacts - Meet Our Team",
  description: "Meet our team and learn about our core values and mission",
}

export default function BusinessContacts() {
  return <BusinessContactsPage />
}
