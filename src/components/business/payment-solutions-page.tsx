"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  Building2, 
  Store, 
  Wallet, 
  Globe2, 
  Shield, 
  Users,
  ArrowRight,
  Banknote,
  CreditCard,
  Receipt,
  Building,
  HelpCircle
} from "lucide-react"

const features = [
  {
    icon: <Building2 className="h-8 w-8" />,
    title: "For Money Exchanges",
    description: "Modernize your traditional exchange business with our digital solutions"
  },
  {
    icon: <Store className="h-8 w-8" />,
    title: "For Retail Businesses",
    description: "Accept multiple currencies and expand your international customer base"
  },
  {
    icon: <Wallet className="h-8 w-8" />,
    title: "For Travel Agencies",
    description: "Offer convenient currency exchange services to your travelers"
  }
]

const solutions = [
  {
    icon: <Building className="h-6 w-6" />,
    title: "Multi-Currency Support",
    description: "Handle transactions in EUR, USD, GBP, and more",
    details: "Real-time exchange rates and competitive spreads"
  },
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: "Payment Processing",
    description: "Accept international cards and bank transfers",
    details: "Support for major payment methods worldwide"
  },
  {
    icon: <Receipt className="h-6 w-6" />,
    title: "Digital Receipts",
    description: "Automated transaction documentation",
    details: "Compliant with international regulations"
  },
  {
    icon: <Globe2 className="h-6 w-6" />,
    title: "Cross-Border Transfers",
    description: "Seamless international money transfers",
    details: "Fast and secure global transactions"
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Compliance Tools",
    description: "Built-in KYC and AML verification",
    details: "Stay compliant with local regulations"
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Business Management",
    description: "Complete back-office solution",
    details: "Track transactions and manage staff"
  }
]

export function PaymentSolutionsPage() {
  return (
    <div className="min-h-screen bg-[#111]">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Modernize Your Currency Exchange Business
              </h1>
              <p className="text-lg text-gray-400">
                Transform your traditional money exchange business with our digital solutions. 
                Handle multiple currencies, process payments, and manage compliance all in one place.
              </p>
              <div className="flex gap-4">
                <Button className="bg-[#c6f135] text-black hover:bg-[#b3dc2f]">
                  Start Free Trial
                </Button>
                <Button variant="outline">
                  Schedule Demo
                </Button>
              </div>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/images/payment-solutions.svg"
                alt="Payment Solutions"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-[#1A1A1A]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Built for Your Business</h2>
            <p className="text-gray-400">Solutions tailored for currency exchange businesses</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 bg-[#252525] border-gray-800">
                <div className="text-[#c6f135] mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Complete Exchange Solution</h2>
            <p className="text-gray-400">Everything you need to run a modern currency exchange</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <Card key={index} className="p-6 bg-[#1A1A1A] border-gray-800">
                <div className="text-[#c6f135] mb-4">{solution.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{solution.title}</h3>
                <p className="text-gray-400 mb-4">{solution.description}</p>
                <p className="text-sm text-gray-500">{solution.details}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Demo */}
      <section className="py-20 bg-[#1A1A1A]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Easy Integration</h2>
              <p className="text-gray-400">
                Get started quickly with our easy-to-use dashboard and APIs. 
                Our team will help you every step of the way.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#c6f135] flex items-center justify-center text-black">1</div>
                  <span>Sign up for an account</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#c6f135] flex items-center justify-center text-black">2</div>
                  <span>Complete verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#c6f135] flex items-center justify-center text-black">3</div>
                  <span>Start accepting payments</span>
                </div>
              </div>
              <Button className="bg-[#c6f135] text-black hover:bg-[#b3dc2f]">
                View Documentation
              </Button>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/images/integration-demo.svg"
                alt="Integration Demo"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to modernize your exchange business?</h2>
            <p className="text-gray-400 mb-8">
              Join hundreds of businesses that trust our platform for their currency exchange operations.
            </p>
            <Button className="bg-[#c6f135] text-black hover:bg-[#b3dc2f]">
              Get Started Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
