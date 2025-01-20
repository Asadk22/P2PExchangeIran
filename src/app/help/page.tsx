'use client';

import { useState } from 'react';
import {
  Banknote,
  CircleDollarSign,
  Shield,
  UserCog,
  Building2,
  CreditCard,
  Scale,
  AlertTriangle,
  History,
  HeartHandshake,
  Gavel,
  Landmark,
  FileText,
  Globe,
  Mail
} from 'lucide-react';

type Section = {
  id: string;
  title: string;
  icon: any;
  content?: string;
  subsections?: {
    title: string;
    content: string;
  }[];
};

const LAST_UPDATED = "January 3, 2025";

const SECTIONS: Section[] = [
  {
    id: 'buying-currency',
    title: 'Buying Foreign Currency',
    icon: Banknote,
    subsections: [
      {
        title: 'How to Buy Foreign Currency',
        content: `• Select the currency you want to buy (USD, EUR, GBP)
• Browse available offers from verified sellers
• Choose an offer with suitable rates and limits
• Enter the amount you want to buy
• Confirm the trade details and payment method`
      },
      {
        title: 'Payment Methods',
        content: `• Iranian bank transfers
• Card to card transfers
• Other local payment methods as specified by seller`
      },
      {
        title: 'Transaction Limits',
        content: `• Minimum transaction: 100 USD equivalent
• Maximum transaction: Based on seller limits
• Daily trading limits may apply`
      }
    ]
  },
  {
    id: 'selling-currency',
    title: 'Selling Foreign Currency',
    icon: CircleDollarSign,
    subsections: [
      {
        title: 'How to Sell Foreign Currency',
        content: `• Create a sell offer with your preferred rate
• Specify acceptable payment methods
• Set your minimum and maximum limits
• Wait for buyers to initiate trades
• Confirm receipt of payment before releasing funds`
      },
      {
        title: 'Seller Requirements',
        content: `• Verified account status
• Valid Iranian bank account
• Complete KYC verification if required
• Maintain sufficient balance`
      }
    ]
  },
  {
    id: 'escrow-service',
    title: 'Escrow Protection',
    icon: Shield,
    subsections: [
      {
        title: 'How Escrow Works',
        content: `• Seller deposits foreign currency to our escrow
• Buyer sends IRR payment directly to seller
• Seller confirms receipt of payment
• We release foreign currency to buyer`
      },
      {
        title: 'Service Fees',
        content: `• Small percentage fee on successful trades
• Fee varies by transaction volume
• Transparent fee structure
• No hidden charges`
      }
    ]
  },
  {
    id: 'trade-process',
    title: 'Trade Process',
    icon: HeartHandshake,
    subsections: [
      {
        title: 'Starting a Trade',
        content: `• Choose an offer from the marketplace
• Enter trade amount within limits
• Confirm exchange rate and total
• Begin the escrow process`
      },
      {
        title: 'Completing a Trade',
        content: `• Follow the step-by-step instructions
• Make payment within time limit
• Upload payment proof if required
• Confirm receipt of funds`
      }
    ]
  },
  {
    id: 'disputes',
    title: 'Dispute Resolution',
    icon: Gavel,
    subsections: [
      {
        title: 'Filing a Dispute',
        content: `• Contact support within 24 hours
• Provide transaction details
• Submit payment evidence
• Wait for support team review`
      },
      {
        title: 'Resolution Process',
        content: `• Both parties submit evidence
• Support team reviews case
• Decision based on evidence
• Funds released accordingly`
      }
    ]
  },
  {
    id: 'security',
    title: 'Account Security',
    icon: Shield,
    subsections: [
      {
        title: 'Account Protection',
        content: `• Enable 2FA authentication
• Use strong unique password
• Never share login credentials
• Monitor account activity`
      },
      {
        title: 'Safe Trading',
        content: `• Only trade through our platform
• Use escrow protection
• Verify trader reputation
• Follow security guidelines`
      }
    ]
  }
];

export default function HelpPage() {
  const [selectedSection, setSelectedSection] = useState<string>('buying-currency');
  
  // Find the currently selected section
  const currentSection = SECTIONS.find(section => section.id === selectedSection);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Help Center</h1>
          <p className="text-sm text-gray-400">
            Last updated: {LAST_UPDATED}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Find answers to common questions about our fiat currency exchange platform
          </p>
        </div>

        <div className="flex gap-8">
          {/* Left Sidebar Navigation */}
          <div className="w-1/4 bg-gray-800 rounded-lg p-4">
            <nav className="space-y-2">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setSelectedSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    selectedSection === section.id
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-700 text-gray-300'
                  }`}
                >
                  {section.icon && <section.icon className="h-5 w-5" />}
                  <span className="text-sm font-medium">{section.title}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Right Content Area */}
          <div className="w-3/4 bg-gray-800 rounded-lg p-6">
            {currentSection && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  {currentSection.icon && (
                    <currentSection.icon className="h-6 w-6 text-primary" />
                  )}
                  <h2 className="text-2xl font-semibold">{currentSection.title}</h2>
                </div>

                {currentSection.content ? (
                  <div className="prose prose-invert max-w-none">
                    <div className="space-y-4 text-gray-300">
                      {currentSection.content.split('•').map((point, index) => (
                        point.trim() && (
                          <div key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <p>{point.trim()}</p>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {currentSection.subsections?.map((subsection, index) => (
                      <div key={index} className="bg-gray-700/50 rounded-lg p-4">
                        <h3 className="text-xl font-medium mb-4 text-primary">
                          {subsection.title}
                        </h3>
                        <div className="prose prose-invert max-w-none">
                          <div className="space-y-3 text-gray-300">
                            {subsection.content.split('•').map((point, pointIndex) => (
                              point.trim() && (
                                <div key={pointIndex} className="flex items-start gap-2">
                                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
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

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm">
            <Mail className="h-4 w-4" />
            Contact Support
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm">
            <Globe className="h-4 w-4" />
            Language Options
          </button>
        </div>
      </div>
    </div>
  );
}
