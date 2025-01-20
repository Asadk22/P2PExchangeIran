"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import Link from "next/link"

const traderBenefits = [
  { name: "Badge on your profile", powerTrader: true, expertTrader: true },
  { name: "Be the first to try new features", powerTrader: true, expertTrader: true },
  { name: "Featured offers", powerTrader: true, expertTrader: true },
  { name: "Get offer promotion", powerTrader: true, expertTrader: true },
  { name: "Instant deposits", powerTrader: true, expertTrader: true },
  { name: "No bond requirement", powerTrader: true, expertTrader: true },
  { name: "Priority support", powerTrader: false, expertTrader: true },
  { name: "Dedicated account manager", powerTrader: false, expertTrader: true },
  { name: "Lowered fees", powerTrader: false, expertTrader: true },
]

export default function RewardsPage() {
  return (
    <div className="flex-1 space-y-24 py-8">
      {/* Hero Section */}
      <section className="container max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="text-sm font-medium">Trader Rewards Program</div>
            <h1 className="text-4xl font-bold">
              Grow With Our Platform
            </h1>
            <p className="text-xl text-muted-foreground">
              Access game-changing benefits, become a community leader, and expand your network through our Trader Rewards.
            </p>
            <Button className="bg-[#c6f135] text-black hover:bg-[#b3dc2f]">
              Learn More
            </Button>
          </div>
          <div className="relative h-[400px]">
            <Image
              src="/rewards-hero.svg"
              alt="Rewards Program Hero"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold">
            Trader Program Benefits
          </h2>
          <p className="text-xl text-muted-foreground">
            Each level comes with a set of exclusive benefits. As traders move up a level, they unlock even more perks
          </p>
        </div>

        <div className="grid md:grid-cols-[1fr,auto,auto] gap-8">
          {/* Benefits List */}
          <div className="space-y-4">
            {traderBenefits.map((benefit, index) => (
              <div key={index} className="text-lg">
                {benefit.name}
              </div>
            ))}
          </div>

          {/* Power Trader Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-full bg-blue-500" />
              <div className="font-medium">Power Trader</div>
            </div>
            {traderBenefits.map((benefit, index) => (
              <div key={index} className="flex justify-center">
                {benefit.powerTrader ? (
                  <Check className="text-green-500" />
                ) : (
                  <X className="text-red-500" />
                )}
              </div>
            ))}
          </div>

          {/* Expert Trader Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-full bg-purple-500" />
              <div className="font-medium">Expert Trader</div>
            </div>
            {traderBenefits.map((benefit, index) => (
              <div key={index} className="flex justify-center">
                {benefit.expertTrader ? (
                  <Check className="text-green-500" />
                ) : (
                  <X className="text-red-500" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <Button asChild className="bg-[#c6f135] text-black hover:bg-[#b3dc2f]">
            <Link href="/trader-program">
              Explore the Trader Program
            </Link>
          </Button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative h-[400px]">
            <Image
              src="/rewards-faq.svg"
              alt="Questions"
              fill
              className="object-contain"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">
              Questions?
            </h2>
            <p className="text-xl text-muted-foreground">
              We&apos;re here to help
            </p>
            <Button className="bg-[#c6f135] text-black hover:bg-[#b3dc2f]">
              Read Our FAQ
            </Button>
          </div>
        </div>
      </section>

      {/* How to Join Section */}
      <section className="container max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold">
            How to Join
          </h2>
          <p className="text-muted-foreground">
            You&apos;ll automatically be enrolled in the Trader Program once you meet the requirements. To join the Peer Program, submit an application today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <div className="text-center space-y-4">
            <div className="relative h-12 mb-4">
              <Image
                src="/trader-program-logo.svg"
                alt="Trader Program"
                fill
                className="object-contain"
              />
            </div>
            <Button className="w-full bg-[#c6f135] text-black hover:bg-[#b3dc2f]">
              Start Trading
            </Button>
          </div>

          <div className="text-center space-y-4">
            <div className="relative h-12 mb-4">
              <Image
                src="/peer-program-logo.svg"
                alt="Peer Program"
                fill
                className="object-contain"
              />
            </div>
            <Button className="w-full bg-[#c6f135] text-black hover:bg-[#b3dc2f]">
              Apply Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
