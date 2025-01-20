'use client';

import { useState } from 'react';
import {
  Store,
  FileText,
  ShieldCheck,
  DollarSign,
  Bell,
  Scale,
  Clock,
  Globe,
  MessageSquare,
  Briefcase,
  UserCheck,
  AlertTriangle,
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

const LAST_UPDATED = "January 2, 2025";

const SECTIONS: Section[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    icon: Store,
    content: `Welcome to our Vendor Terms and Conditions. This document outlines the terms and conditions for vendors operating on our P2P exchange platform. By registering as a vendor, you agree to comply with these terms.`
  },
  {
    id: 'eligibility',
    title: 'Eligibility Requirements',
    icon: UserCheck,
    subsections: [
      {
        title: 'Basic Requirements',
        content: `• Must be at least 18 years old
• Valid government-issued identification
• Clean criminal record
• Proof of address
• Bank account in good standing
• Successful KYC/AML verification`
      },
      {
        title: 'Business Requirements',
        content: `• Valid business registration (if applicable)
• Tax identification number
• Professional references
• Minimum capital requirements
• Clean credit history
• Compliance with local regulations`
      }
    ]
  },
  {
    id: 'obligations',
    title: 'Vendor Obligations',
    icon: Scale,
    subsections: [
      {
        title: 'Operational Requirements',
        content: `• Maintain accurate transaction records
• Respond to customer inquiries promptly
• Keep payment methods up to date
• Follow platform guidelines
• Report suspicious activities
• Maintain service quality standards`
      },
      {
        title: 'Compliance Requirements',
        content: `• Follow AML/KYC procedures
• Maintain required licenses
• Report taxable income
• Protect customer data
• Follow dispute resolution procedures
• Comply with local regulations`
      }
    ]
  },
  {
    id: 'fees',
    title: 'Fees & Payments',
    icon: DollarSign,
    subsections: [
      {
        title: 'Platform Fees',
        content: `• Transaction fees structure
• Payment processing fees
• Currency conversion fees
• Premium service fees
• Withdrawal fees
• Dispute resolution fees`
      },
      {
        title: 'Payment Terms',
        content: `• Payment settlement timeline
• Minimum withdrawal amounts
• Payment methods accepted
• Chargeback policies
• Refund procedures
• Fee adjustment policies`
      }
    ]
  },
  {
    id: 'security',
    title: 'Security Measures',
    icon: ShieldCheck,
    subsections: [
      {
        title: 'Account Security',
        content: `• Two-factor authentication required
• Regular security audits
• Secure communication protocols
• Password requirements
• Session management
• Access control measures`
      },
      {
        title: 'Transaction Security',
        content: `• Encryption standards
• Fraud prevention measures
• Suspicious activity monitoring
• Transaction limits
• Verification procedures
• Security incident reporting`
      }
    ]
  },
  {
    id: 'prohibited',
    title: 'Prohibited Activities',
    icon: AlertTriangle,
    subsections: [
      {
        title: 'Banned Transactions',
        content: `• Money laundering activities
• Terrorist financing
• Illegal goods and services
• Fraudulent transactions
• Market manipulation
• Unauthorized currency exchange`
      },
      {
        title: 'Account Violations',
        content: `• Multiple account creation
• Identity falsification
• Platform manipulation
• Terms violation
• Unauthorized access
• Misuse of customer data`
      }
    ]
  },
  {
    id: 'termination',
    title: 'Account Termination',
    icon: Bell,
    subsections: [
      {
        title: 'Termination Conditions',
        content: `• Terms violation consequences
• Account suspension procedures
• Appeal process
• Final settlement terms
• Data retention policy
• Service discontinuation`
      },
      {
        title: 'Reinstatement Process',
        content: `• Appeal requirements
• Review procedure
• Documentation needed
• Waiting period
• Compliance verification
• Probation terms`
      }
    ]
  },
  {
    id: 'updates',
    title: 'Terms Updates',
    icon: Clock,
    subsections: [
      {
        title: 'Change Process',
        content: `• Notice period requirements
• Communication methods
• Implementation timeline
• Feedback process
• Acceptance requirements
• Documentation updates`
      },
      {
        title: 'Vendor Rights',
        content: `• Right to terminate
• Data portability
• Service continuity
• Compensation terms
• Dispute resolution
• Legal recourse`
      }
    ]
  }
];

export default function VendorTerms() {
  const [selectedSection, setSelectedSection] = useState<string>('introduction');
  
  // Find the currently selected section
  const currentSection = SECTIONS.find(section => section.id === selectedSection);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Vendor Terms</h1>
          <p className="text-sm text-gray-400">
            Last updated: {LAST_UPDATED}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Terms and conditions for vendors operating on our P2P exchange platform
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
            <FileText className="h-4 w-4" />
            Download PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm">
            <MessageSquare className="h-4 w-4" />
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
