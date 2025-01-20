import { Metadata } from "next"
import InvitePage from "@/components/invite/invite-page"

export const metadata: Metadata = {
  title: "Invite a Friend",
  description: "Invite friends to join our platform",
}

export default function Invite() {
  return <InvitePage />
}
