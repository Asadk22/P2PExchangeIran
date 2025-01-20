"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export function TraderProgramPage() {
  return (
    <div className="min-h-screen bg-[#111]">
      {/* Navigation */}
      <nav className="border-b border-gray-800">
        <div className="container py-4">
          <div className="flex items-center gap-2">
            <Link href="/rewards" className="text-sm text-muted-foreground hover:text-white">Home</Link>
            <span className="text-sm text-muted-foreground">/</span>
            <Link href="/rewards" className="text-sm text-muted-foreground hover:text-white">Knowledge base</Link>
            <span className="text-sm text-muted-foreground">/</span>
            <Link href="/rewards" className="text-sm text-muted-foreground hover:text-white">Account</Link>
            <span className="text-sm text-muted-foreground">/</span>
            <span className="text-sm">Managing Your Account</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">Trader Program FAQs</h1>
            <p className="text-sm text-muted-foreground">Modified on Wed, Aug 28 at 8:26 PM</p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* What is the Trader Program */}
            <section className="space-y-4">
              <h2 className="text-xl font-medium">What is the Trader Program?</h2>
              <p className="text-gray-300">
                The Trader Program provides exclusive perks and benefits to active and well-respected members of our platform. 
                There are two different levels, Power Trader and Expert Trader.
              </p>
            </section>

            {/* Benefits */}
            <section className="space-y-4">
              <h2 className="text-xl font-medium">What are the benefits of the Trader Program?</h2>
              
              <div className="space-y-6">
                {/* Power Trader */}
                <div className="space-y-2">
                  <h3 className="font-medium">Power Trader</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-300">
                    <li>A badge on your profile</li>
                    <li>Be the first to try new features</li>
                    <li>Faster dispute resolution</li>
                    <li>There is no bond requirement on gift card trades</li>
                    <li>Priority support</li>
                  </ul>
                </div>

                {/* Expert Trader */}
                <div className="space-y-2">
                  <h3 className="font-medium">Expert Trader</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-300">
                    <li>A badge on your profile</li>
                    <li>Be the first to try new features</li>
                    <li>Featured offers (available to members with dedicated account managers)</li>
                    <li>Get offer promotion (available to members with dedicated account managers)</li>
                    <li>Instant deposits</li>
                    <li>There is no bond requirement on gift card trades</li>
                    <li>Priority support</li>
                    <li>Dedicated account manager</li>
                    <li>Lowered fees (we have temporarily paused this benefit)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Requirements */}
            <section className="space-y-4">
              <h2 className="text-xl font-medium">What are the requirements to join the Trader Program?</h2>
              
              <div className="space-y-6">
                {/* Power Trader Requirements */}
                <div className="space-y-2">
                  <h3 className="font-medium">Power Trader</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-300">
                    <li>Follow our Terms of Service</li>
                    <li>You&apos;ve had an account for at least 90 days</li>
                    <li>Verified ID and proof of address</li>
                    <li>A good behavior score*</li>
                    <li>You complete at least 250 trades every 90 days**</li>
                  </ul>
                </div>

                {/* Expert Trader Requirements */}
                <div className="space-y-2">
                  <h3 className="font-medium">Expert Trader</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-300">
                    <li>Follow our Terms of Service</li>
                    <li>You&apos;ve had an account for at least 90 days</li>
                    <li>Verified ID and proof of address</li>
                    <li>A good behavior score*</li>
                    <li>You complete at least 1,000 trades every 90 days**</li>
                  </ul>
                </div>

                <div className="text-sm text-muted-foreground space-y-2">
                  <p>*To be a good trader on our platform, we expect honest trading, prompt release times, keeping the trade on our platform, etc. You can refer to our Terms of Service for more information on acceptable behavior while using the marketplace.</p>
                  <p>**A trade must be worth 20 USD or more to count toward the Trader Program.</p>
                </div>
              </div>
            </section>

            {/* FAQ Questions */}
            <section className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-medium">How will I know if I&apos;m eligible to be part of the Trader Program?</h2>
                <p className="text-gray-300">
                  Once you meet the requirements, we&apos;ll send a notification to your account letting you know! 
                  We&apos;ll also send an email to the address linked to your account.
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-medium">I&apos;ve met all the requirements. How do I get an account badge?</h2>
                <p className="text-gray-300">
                  Great question! Once you&apos;ve completed the required number of trades and your account is in good standing, 
                  you can <Link href="#" className="text-[#c6f135] hover:underline">contact our support team</Link>. 
                  They&apos;ll review your account and add the badge if you meet the requirements. 
                  Once you have your badge, you can begin enjoying the benefits of the program!
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-medium">I&apos;ve completed the required number of trades. Why doesn&apos;t my account have a badge?</h2>
                <p className="text-gray-300">
                  We define trades as both buying and selling cryptocurrency on our platform. If you&apos;ve only done one or the other, 
                  you won&apos;t be eligible for the Trader Program. However, if you&apos;ve been buying and selling cryptocurrency but 
                  don&apos;t have a badge, you can <Link href="#" className="text-[#c6f135] hover:underline">contact us</Link> for help with your badge!
                </p>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-medium">Can I lose my Trader Program status?</h2>
                <p className="text-gray-300">
                  Yes, you can. We look at your account on a rolling basis, so the requirements need to be met consistently over a 90-day period 
                  to keep your Trader Program status. You can also lose your Trader Program status if you break our Terms of Service and/or 
                  eligibility requirements.
                </p>
              </div>
            </section>

            {/* Contact Support */}
            <section className="space-y-2">
              <h2 className="text-xl font-medium">Questions? Comments? Feedback? Suggestions?</h2>
              <p className="text-gray-300">
                We&apos;d love to hear from you! You can reach out to our support team, and we&apos;ll get back to you.
              </p>
              <p className="text-sm text-muted-foreground">
                If you need any assistance from our Support team, do not hesitate to <Link href="#" className="text-[#c6f135] hover:underline">contact us</Link>.
              </p>
            </section>

            {/* Related Articles */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Articles in this folder */}
              <section className="space-y-4">
                <h2 className="text-xl font-medium">Articles in this folder</h2>
                <div className="space-y-2">
                  <Link href="#" className="block text-[#c6f135] hover:underline">Account Locked</Link>
                  <Link href="#" className="block text-[#c6f135] hover:underline">Adding Bank Account to User Profile</Link>
                  <Link href="#" className="block text-[#c6f135] hover:underline">Creating an Account on Platform</Link>
                  <Link href="#" className="block text-[#c6f135] hover:underline">Closing Account</Link>
                </div>
              </section>

              {/* You may like to read */}
              <section className="space-y-4">
                <h2 className="text-xl font-medium">You may like to read</h2>
                <div className="space-y-2">
                  <Link href="#" className="block text-[#c6f135] hover:underline">Power Trader</Link>
                  <Link href="#" className="block text-[#c6f135] hover:underline">Featured Offers</Link>
                  <Link href="#" className="block text-[#c6f135] hover:underline">Potential Risks When Trading Cryptocurrency</Link>
                  <Link href="#" className="block text-[#c6f135] hover:underline">Feedback and Reputation</Link>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
