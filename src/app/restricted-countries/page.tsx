'use client';

import { useState } from 'react';
import {
  Globe,
  FileText,
  AlertTriangle,
  Shield,
  Scale,
  Info,
  MessageSquare,
  MapPin,
  Flag,
  Building,
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
    icon: Globe,
    content: `This document outlines our platform's geographical restrictions and limitations. Due to regulatory requirements and compliance obligations, our services are not available in certain jurisdictions. Please review this information carefully to understand our geographical service limitations.`
  },
  {
    id: 'fully-restricted',
    title: 'Fully Restricted Countries',
    icon: AlertTriangle,
    subsections: [
      {
        title: 'High-Risk Jurisdictions',
        content: `• North Korea - Complete restriction
• Iran - Complete restriction
• Syria - Complete restriction
• Cuba - Complete restriction
• Crimea Region - Complete restriction
• Venezuela - Complete restriction`
      },
      {
        title: 'Sanctioned Territories',
        content: `• OFAC sanctioned countries
• UN sanctioned regions
• EU sanctioned territories
• Disputed territories
• Conflict zones
• Embargoed regions`
      }
    ]
  },
  {
    id: 'partial-restrictions',
    title: 'Partial Restrictions',
    icon: Scale,
    subsections: [
      {
        title: 'Limited Services',
        content: `• Restricted trading pairs
• Volume limitations
• KYC requirements
• Payment method restrictions
• Withdrawal limits
• Trading hour restrictions`
      },
      {
        title: 'Affected Regions',
        content: `• Specific US states
• Select EU countries
• Certain Asian regions
• Specific African nations
• Caribbean territories
• Pacific island nations`
      }
    ]
  },
  {
    id: 'compliance',
    title: 'Compliance Requirements',
    icon: Shield,
    subsections: [
      {
        title: 'Regulatory Framework',
        content: `• International sanctions
• Local regulations
• Financial restrictions
• Trading limitations
• Reporting requirements
• Licensing obligations`
      },
      {
        title: 'Verification Process',
        content: `• Identity verification
• Address verification
• Document requirements
• Residency proof
• Banking information
• Compliance checks`
      }
    ]
  },
  {
    id: 'exceptions',
    title: 'Exceptions & Exemptions',
    icon: Flag,
    subsections: [
      {
        title: 'Special Permits',
        content: `• Licensed entities
• Authorized operators
• Regulated institutions
• Government approval
• Special permissions
• Diplomatic exceptions`
      },
      {
        title: 'Conditional Access',
        content: `• Enhanced due diligence
• Additional documentation
• Special monitoring
• Regular reviews
• Risk assessment
• Compliance reporting`
      }
    ]
  },
  {
    id: 'monitoring',
    title: 'Monitoring & Updates',
    icon: Building,
    subsections: [
      {
        title: 'Continuous Monitoring',
        content: `• Regular assessments
• Compliance updates
• Risk monitoring
• Policy reviews
• Regulatory changes
• Market conditions`
      },
      {
        title: 'Change Management',
        content: `• Policy updates
• Communication process
• Implementation timeline
• User notifications
• Service adjustments
• Documentation updates`
      }
    ]
  },
  {
    id: 'consequences',
    title: 'Non-Compliance Consequences',
    icon: AlertTriangle,
    subsections: [
      {
        title: 'Violations',
        content: `• Account termination
• Fund freezing
• Legal action
• Regulatory reporting
• Access restriction
• Service suspension`
      },
      {
        title: 'Reporting Obligations',
        content: `• Suspicious activity
• Unauthorized access
• Compliance violations
• Regulatory breaches
• Identity misrepresentation
• Documentation falsification`
      }
    ]
  }
];

export default function RestrictedCountries() {
  const [selectedSection, setSelectedSection] = useState<string>('introduction');
  
  // Find the currently selected section
  const currentSection = SECTIONS.find(section => section.id === selectedSection);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Restricted Countries</h1>
          <p className="text-sm text-gray-400">
            Last updated: {LAST_UPDATED}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Countries and regions where our services are restricted or unavailable
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
