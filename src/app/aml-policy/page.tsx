'use client';

import { useState } from 'react';
import {
  Shield,
  UserCheck,
  AlertTriangle,
  FileSearch,
  BadgeAlert,
  Scale,
  Building2,
  FileText,
  Network,
  Lock,
  AlertCircle,
  Globe,
  MessageSquare,
  UserCog,
  FileWarning,
  BookOpen,
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
    icon: Shield,
    content: `Our company, incorporated under local laws, operates an internet-enabled peer-to-peer (P2P) marketplace for the purchase and sale of digital assets.

We are registered as a Money Services Business with appropriate regulatory authorities. Our Anti-Money Laundering (AML) policies and procedures are designed to deter illicit activities on the platform, protect users, the business, and the digital currencies and financial services communities from exploitation by criminals.

We maintain full compliance with all applicable banking and financial regulations, including the Bank Secrecy Act and related regulatory guidelines.`
  },
  {
    id: 'compliance-overview',
    title: 'Compliance Overview',
    icon: Scale,
    subsections: [
      {
        title: 'Key Compliance Measures',
        content: `• Appointment of Chief Compliance Officer
• Risk-based KYC procedures
• Customer Due Diligence (CDD)
• Enhanced Due Diligence (EDD)
• Law enforcement cooperation
• Regulatory compliance
• Anti-fraud systems implementation`
      },
      {
        title: 'Compliance Leadership',
        content: `• Independent compliance oversight
• Expert compliance management
• Regular policy reviews
• Staff training programs
• Compliance reporting structure
• Risk assessment protocols`
      }
    ]
  },
  {
    id: 'kyc-requirements',
    title: 'KYC Requirements',
    icon: UserCheck,
    subsections: [
      {
        title: 'Identity Verification',
        content: `• Government-issued photo ID
• Proof of residence documentation
• Facial verification with ID
• Phone number verification
• Email verification
• Identity validation checks`
      },
      {
        title: 'Risk-Based Approach',
        content: `• Tiered verification levels
• Transaction volume limits
• Risk assessment criteria
• Enhanced due diligence
• Ongoing monitoring
• Regular reviews`
      }
    ]
  },
  {
    id: 'monitoring-reporting',
    title: 'Monitoring & Reporting',
    icon: FileSearch,
    subsections: [
      {
        title: 'Transaction Monitoring',
        content: `• Real-time transaction screening
• Blockchain analytics
• Pattern recognition
• Risk scoring system
• Automated alerts
• Manual review procedures`
      },
      {
        title: 'Suspicious Activity Reports',
        content: `• SAR filing procedures
• Suspicious activity criteria
• Investigation protocols
• Documentation requirements
• Confidentiality measures
• Record retention policies`
      }
    ]
  },
  {
    id: 'sanctions-compliance',
    title: 'Sanctions Compliance',
    icon: AlertTriangle,
    subsections: [
      {
        title: 'Sanctions Screening',
        content: `• OFAC compliance measures
• SDN list screening
• Sanctions monitoring
• Blocked persons checks
• Country restrictions
• Regular updates`
      },
      {
        title: 'Compliance Actions',
        content: `• Account freezing procedures
• Sanctions violation handling
• OFAC license applications
• Compliance documentation
• Appeal procedures
• Regulatory reporting`
      }
    ]
  },
  {
    id: 'staff-training',
    title: 'Staff Training',
    icon: BookOpen,
    subsections: [
      {
        title: 'Training Programs',
        content: `• BSA/AML/OFAC training
• Compliance procedures
• Risk identification
• Red flags awareness
• Reporting procedures
• Documentation requirements`
      },
      {
        title: 'Ongoing Education',
        content: `• Regular updates
• New regulation training
• Case study reviews
• Best practices
• Compliance testing
• Performance monitoring`
      }
    ]
  }
];

export default function AMLPolicy() {
  const [selectedSection, setSelectedSection] = useState<string>('introduction');
  
  // Find the currently selected section
  const currentSection = SECTIONS.find(section => section.id === selectedSection);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Anti-Money Laundering Policy</h1>
          <p className="text-sm text-gray-400">
            Last updated: {LAST_UPDATED}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Our comprehensive approach to preventing money laundering and ensuring regulatory compliance
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
                      {currentSection.content.split('\n\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
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
            Contact Compliance
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
