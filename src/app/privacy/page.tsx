'use client';

import { useState } from 'react';
import {
  Shield,
  Lock,
  Eye,
  Database,
  Share2,
  Globe,
  MessageSquare,
  UserCheck,
  FileText,
  Mail,
  Server,
  Key,
  AlertTriangle,
  Settings,
  Cookie,
  Users,
  Clock
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
    content: `We take steps to protect your privacy. This Privacy Notice describes the types of personal information we may collect from you in connection with your use of our website, mobile application, P2P trading platform, and other online properties (collectively, the "Platform"), or when you use any of our products, services, content, features, technologies, or functions (collectively, the "Services").

This Notice is designed to help you understand our privacy practices and your privacy choices when you use our Platform and Services. Please note that our Service offerings may vary by region.

For all purposes, the English language version of this privacy notice shall be the original, governing instrument. In the event of any conflict between this version and any subsequent translation, the English version shall govern and control.`
  },
  {
    id: 'information-collection',
    title: 'Information We Collect',
    icon: Database,
    subsections: [
      {
        title: 'Personal Information',
        content: `• Full name and contact details
• Email address and phone number
• Date of birth and nationality
• Government-issued identification
• Residential address
• Profile information and preferences
• Transaction and trading history
• Payment information and methods
• Device and browser information
• IP address and location data`
      },
      {
        title: 'Platform Activity Data',
        content: `• Account username and profile
• Trade chat messages and attachments
• Transaction and offer history
• Wallet addresses and balances
• Trading preferences and settings
• Platform usage statistics
• Login and session information
• Device characteristics and identifiers`
      }
    ]
  },
  {
    id: 'data-usage',
    title: 'How We Use Your Data',
    icon: Settings,
    subsections: [
      {
        title: 'Primary Purposes',
        content: `• Account creation and maintenance
• Identity verification and KYC
• Transaction processing and escrow
• Platform security and fraud prevention
• Customer support and communication
• Service improvement and optimization
• Legal compliance and reporting
• Risk assessment and management`
      },
      {
        title: 'Secondary Purposes',
        content: `• Service personalization
• Market research and analytics
• Product development
• Marketing communications
• Performance monitoring
• User experience improvement
• Statistical analysis
• Regulatory compliance`
      }
    ]
  },
  {
    id: 'data-sharing',
    title: 'Information Sharing',
    icon: Share2,
    subsections: [
      {
        title: 'Service Providers',
        content: `• Identity verification services
• Payment processors
• Cloud storage providers
• Analytics services
• Customer support tools
• Security services
• Marketing partners
• Compliance services`
      },
      {
        title: 'Legal Requirements',
        content: `• Law enforcement requests
• Regulatory obligations
• Court orders and subpoenas
• Fraud investigations
• Legal proceedings
• Government requests
• User protection measures
• Platform security needs`
      }
    ]
  },
  {
    id: 'cookies',
    title: 'Cookies & Tracking',
    icon: Cookie,
    subsections: [
      {
        title: 'Cookie Usage',
        content: `• Essential platform functionality
• User authentication
• Security measures
• Preference settings
• Performance monitoring
• Analytics collection
• Marketing optimization
• Session management`
      },
      {
        title: 'Tracking Controls',
        content: `• Cookie preferences management
• Opt-out options available
• Third-party tracking controls
• Marketing preferences
• Analytics participation
• Device identifier settings
• Advertising choices
• Privacy controls`
      }
    ]
  },
  {
    id: 'data-security',
    title: 'Data Security',
    icon: Lock,
    subsections: [
      {
        title: 'Security Measures',
        content: `• Encryption protocols
• Access controls
• Data backup systems
• Security monitoring
• Incident response plans
• Regular security audits
• Staff training
• Vulnerability testing`
      },
      {
        title: 'Data Protection',
        content: `• Secure data storage
• Transfer encryption
• Access restrictions
• Regular updates
• Security protocols
• Breach prevention
• Data integrity checks
• Recovery procedures`
      }
    ]
  },
  {
    id: 'user-rights',
    title: 'Your Rights',
    icon: UserCheck,
    subsections: [
      {
        title: 'Data Rights',
        content: `• Access your personal data
• Request data correction
• Delete your information
• Restrict processing
• Data portability
• Withdraw consent
• Object to processing
• File complaints`
      },
      {
        title: 'Control Options',
        content: `• Privacy settings
• Marketing preferences
• Cookie controls
• Profile visibility
• Communication options
• Data sharing choices
• Account deletion
• Information updates`
      }
    ]
  },
  {
    id: 'data-retention',
    title: 'Data Retention',
    icon: Clock,
    subsections: [
      {
        title: 'Retention Period',
        content: `• Account active period
• Legal requirements
• Business purposes
• Regulatory compliance
• Dispute resolution
• Audit requirements
• Security measures
• Backup retention`
      },
      {
        title: 'Data Deletion',
        content: `• Account closure process
• Data removal timeline
• Retention exceptions
• Archive policies
• Backup destruction
• System purge
• Verification process
• Confirmation notices`
      }
    ]
  },
  {
    id: 'contact',
    title: 'Contact Us',
    icon: Mail,
    content: `For any questions about this Privacy Policy or our privacy practices, please contact our Privacy Team:

Email: privacy@ourplatform.com
Response Time: Within 48 hours

For urgent privacy concerns, please mark your communication as "Privacy Urgent".

For users in specific regions, additional privacy rights and contact options may be available. Please refer to the regional addendums in this policy for more information.`
  }
];

export default function PrivacyPage() {
  const [selectedSection, setSelectedSection] = useState<string>('introduction');
  
  // Find the currently selected section
  const currentSection = SECTIONS.find(section => section.id === selectedSection);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-sm text-gray-400">
            Last updated: {LAST_UPDATED}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Our commitment to protecting your privacy and personal information
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
            Contact Privacy Team
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
