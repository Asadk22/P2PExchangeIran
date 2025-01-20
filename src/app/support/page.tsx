"use client"

import { useState } from "react"
import {
  Search,
  Phone,
  Mail,
  HelpCircle,
  Banknote,
  Shield,
  Clock,
  Building2,
  Users,
  Globe,
  CreditCard,
  AlertCircle
} from "lucide-react"
import { Input } from "@/components/ui/input"

type Section = {
  id: string
  title: string
  icon: any
  content?: string
  subsections?: {
    title: string
    content: string
  }[]
}

const LAST_UPDATED = "January 3, 2025"

const SECTIONS: Section[] = [
  {
    id: "contact",
    title: "Contact Support",
    icon: Building2,
    subsections: [
      {
        title: "How to Contact Support",
        content: `Our support team is available through multiple channels:
• Live Chat Support - Available 24/7 for immediate assistance
• Email Support - Response within 24 hours
• Phone Support - Available during business hours
• Social Media Support - Available on Twitter and Facebook
• Support Ticket System - For complex issues requiring investigation
• Regional Support Numbers - Available for specific countries`
      },
      {
        title: "Business Hours and Response Times",
        content: `Our support hours and response times vary by region:
• Live Chat: 24/7 availability
• Email Support: Within 24 hours
• Phone Support: Monday to Friday, 9 AM - 6 PM (Local Time)
• Emergency Support: 24/7 for urgent issues
• Business Support: Extended hours for business clients
• Holiday Schedule: Limited support during major holidays`
      },
      {
        title: "Emergency Support",
        content: `For urgent issues requiring immediate attention:
• 24/7 Emergency Hotline
• Priority Support Queue
• Immediate Response Team
• Critical Issue Resolution
• Account Security Emergencies
• Transaction Urgencies
• Technical Emergency Support
• Fraud Prevention Support`
      }
    ]
  },
  {
    id: "general",
    title: "General Information",
    icon: HelpCircle,
    subsections: [
      {
        title: "Account Verification Process",
        content: `Our verification process ensures security:
• Basic Verification: Email and phone verification
• Identity Verification: Government ID upload
• Address Verification: Proof of residence
• Enhanced Verification: Video verification
• Business Verification: Company documents
• Verification Levels: Different limits for each level
• Processing Time: 24-48 hours typically
• Required Documents: Based on verification level`
      },
      {
        title: "Supported Countries and Territories",
        content: `We currently support:
• European Union Countries
• United Kingdom
• United States
• Middle East Region
• Asian Countries
• African Nations
• South American Countries
• Regional Restrictions Apply
• Regulatory Compliance Required
• Local Banking Partners`
      },
      {
        title: "Fee Structure and Pricing",
        content: `Our transparent fee structure:
• Exchange Fees: 0.5% - 1%
• Bank Transfer Fees: Varies by region
• Card Payment Fees: 1.5% - 3%
• Volume Discounts Available
• Business Account Pricing
• Premium Account Benefits
• Special Rate Programs
• Loyalty Rewards`
      }
    ]
  },
  {
    id: "exchange",
    title: "Currency Exchange",
    icon: Banknote,
    subsections: [
      {
        title: "How to Exchange Currencies",
        content: `Step-by-step exchange process:
• Select currencies to exchange
• Enter amount to exchange
• Choose payment method
• Review exchange rate
• Confirm transaction details
• Complete payment
• Track transaction status
• Receive exchanged funds`
      },
      {
        title: "Understanding Exchange Rates",
        content: `Our exchange rates explained:
• Real-time market rates
• Rate calculation method
• Spread explanation
• Rate guarantees
• Rate lock duration
• Volume-based rates
• Business rates
• Special rate programs`
      },
      {
        title: "Payment Methods",
        content: `Available payment methods:
• Bank Transfers (SEPA, SWIFT)
• Credit/Debit Cards
• Local Payment Systems
• Mobile Payment Solutions
• Digital Wallets
• Regional Payment Options
• Business Payment Methods
• Instant Transfer Options`
      }
    ]
  }
]

export default function Support() {
  const [selectedSection, setSelectedSection] = useState<string>("contact")
  const [searchQuery, setSearchQuery] = useState("")
  
  // Find the currently selected section
  const currentSection = SECTIONS.find(section => section.id === selectedSection)

  return (
    <div className="min-h-screen bg-[#111]">
      {/* Hero Section with Search */}
      <section className="bg-[#c6f135] py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-black mb-6">
              Hi, how can we help you?
            </h1>
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter the search term here..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-lg bg-white text-black placeholder:text-gray-500"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {/* Left Sidebar Navigation */}
            <div className="w-1/4 bg-[#1A1A1A] rounded-lg p-4">
              <nav className="space-y-2">
                {SECTIONS.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setSelectedSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      selectedSection === section.id
                        ? "bg-[#c6f135] text-black"
                        : "hover:bg-[#252525] text-gray-300"
                    }`}
                  >
                    {section.icon && <section.icon className="h-5 w-5" />}
                    <span className="text-sm font-medium">{section.title}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Right Content Area */}
            <div className="w-3/4 bg-[#1A1A1A] rounded-lg p-6">
              {currentSection && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    {currentSection.icon && (
                      <currentSection.icon className="h-6 w-6 text-[#c6f135]" />
                    )}
                    <h2 className="text-2xl font-semibold text-white">{currentSection.title}</h2>
                  </div>

                  {currentSection.content ? (
                    <div className="prose prose-invert max-w-none">
                      <div className="space-y-4 text-gray-300">
                        {currentSection.content.split("•").map((point, index) => (
                          point.trim() && (
                            <div key={index} className="flex items-start gap-2">
                              <div className="w-2 h-2 rounded-full bg-[#c6f135] mt-2" />
                              <p>{point.trim()}</p>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {currentSection.subsections?.map((subsection, index) => (
                        <div key={index} className="bg-[#252525] rounded-lg p-4">
                          <h3 className="text-xl font-medium mb-4 text-[#c6f135]">
                            {subsection.title}
                          </h3>
                          <div className="prose prose-invert max-w-none">
                            <div className="space-y-3 text-gray-300">
                              {subsection.content.split("•").map((point, pointIndex) => (
                                point.trim() && (
                                  <div key={pointIndex} className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#c6f135] mt-2" />
                                    <p>{point.trim()}</p>
                                  </div>
                                )
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Quick Contact Options */}
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-[#1A1A1A] p-6 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#252525] rounded-lg">
                  <Phone className="h-6 w-6 text-[#c6f135]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-white">Call Us</h3>
                  <p className="text-gray-400">Available 24/7 for urgent inquiries</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1A1A1A] p-6 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#252525] rounded-lg">
                  <Mail className="h-6 w-6 text-[#c6f135]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-white">Email Support</h3>
                  <p className="text-gray-400">Get help via email within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
