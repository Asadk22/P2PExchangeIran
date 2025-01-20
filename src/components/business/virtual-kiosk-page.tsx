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
  Monitor,
  Lock,
  Smartphone,
  Printer,
  Settings,
  HelpCircle,
  CheckCircle2
} from "lucide-react"

const features = [
  {
    icon: <Monitor className="h-8 w-8" />,
    title: "Digital Exchange Counter",
    description: "Convert your physical exchange counter into a digital kiosk"
  },
  {
    icon: <Smartphone className="h-8 w-8" />,
    title: "Mobile Integration",
    description: "Allow customers to start transactions from their phones"
  },
  {
    icon: <Lock className="h-8 w-8" />,
    title: "Secure Transactions",
    description: "Bank-grade security for all operations"
  }
]

const useCases = [
  {
    icon: <Building2 className="h-6 w-6" />,
    title: "Hotels & Resorts",
    description: "Offer currency exchange services to your guests",
    details: "Perfect for international hotels"
  },
  {
    icon: <Store className="h-6 w-6" />,
    title: "Shopping Centers",
    description: "Automated currency exchange kiosks",
    details: "Serve international shoppers"
  },
  {
    icon: <Globe2 className="h-6 w-6" />,
    title: "Tourist Locations",
    description: "Easy currency exchange for tourists",
    details: "Support multiple languages"
  },
  {
    icon: <Building className="h-6 w-6" />,
    title: "Business Districts",
    description: "Serve business travelers",
    details: "High-volume exchange capabilities"
  },
  {
    icon: <Printer className="h-6 w-6" />,
    title: "Transport Hubs",
    description: "Airports and train stations",
    details: "24/7 automated service"
  },
  {
    icon: <Settings className="h-6 w-6" />,
    title: "Custom Locations",
    description: "Flexible deployment options",
    details: "Adaptable to your needs"
  }
]

const features2 = [
  {
    title: "Real-Time Rates",
    description: "Always up-to-date exchange rates with competitive spreads"
  },
  {
    title: "Multiple Currencies",
    description: "Support for all major currencies and local payment methods"
  },
  {
    title: "Compliance Built-in",
    description: "Automated KYC and AML checks for regulatory compliance"
  },
  {
    title: "Digital Receipts",
    description: "Paperless transaction records sent directly to customers"
  },
  {
    title: "Remote Management",
    description: "Monitor and manage all kiosks from a central dashboard"
  },
  {
    title: "Custom Branding",
    description: "White-label solution with your brand identity"
  }
]

export function VirtualKioskPage() {
  return (
    <div className="min-h-screen bg-[#111]">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Virtual Currency Exchange Kiosk
              </h1>
              <p className="text-lg text-gray-400">
                Transform any location into a digital currency exchange point. 
                Offer convenient fiat currency exchange services with our virtual kiosk solution.
              </p>
              <div className="flex gap-4">
                <Button className="bg-[#c6f135] text-black hover:bg-[#b3dc2f]">
                  Request Demo
                </Button>
                <Button variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/images/virtual-kiosk.svg"
                alt="Virtual Kiosk"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-[#1A1A1A]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-gray-400">Modern solutions for currency exchange</p>
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

      {/* Interactive Demo */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">See It In Action</h2>
              <p className="text-gray-400">
                Watch how easy it is for customers to exchange currency using our virtual kiosk. 
                Simple, fast, and secure transactions.
              </p>
              <Button className="bg-[#c6f135] text-black hover:bg-[#b3dc2f]">
                Watch Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/images/kiosk-demo.svg"
                alt="Kiosk Demo"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-[#1A1A1A]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Perfect For Any Location</h2>
            <p className="text-gray-400">Deploy virtual kiosks wherever your customers need them</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="p-6 bg-[#252525] border-gray-800">
                <div className="text-[#c6f135] mb-4">{useCase.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                <p className="text-gray-400 mb-4">{useCase.description}</p>
                <p className="text-sm text-gray-500">{useCase.details}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Advanced Features</h2>
            <p className="text-gray-400">Everything you need for modern currency exchange</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {features2.map((feature, index) => (
              <Card key={index} className="p-6 bg-[#1A1A1A] border-gray-800">
                <div className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-[#c6f135] flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1A1A1A]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-gray-400 mb-8">
              Transform your currency exchange business with our virtual kiosk solution.
            </p>
            <Button className="bg-[#c6f135] text-black hover:bg-[#b3dc2f]">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
