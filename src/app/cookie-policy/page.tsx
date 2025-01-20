'use client';

import { useState } from 'react';
import {
  Cookie,
  Shield,
  Settings,
  Info,
  AlertTriangle,
  Clock,
  FileText,
  Lock,
  Globe,
  MessageSquare,
  Mail,
  ExternalLink,
  ToggleLeft,
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
    icon: Cookie,
    content: `We take all required steps to protect your privacy. In this Cookie Policy, we describe what cookies are and our approach to handling them on our web platform, mobile application, P2P trading platform, and other online properties and services. This Policy is designed to help you learn about our cookie practices and understand your privacy choices when you use our website and services.

For all purposes, the English language version of this Cookie Policy shall be the original source for all cookie-related information and guidelines. In case of any conflict between this version and a translation into any other language, the English language version shall be considered absolute.`
  },
  {
    id: 'what-are-cookies',
    title: 'What Are Cookies',
    icon: Info,
    content: `A cookie is a small text file that a website saves on your computer or mobile device when you visit that website. These cookies usually contain information about your visit to our website.

Unfortunately, in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to a website. We suggest that you leave cookies enabled if you're not sure whether they're needed for a service that you use.`
  },
  {
    id: 'cookie-types',
    title: 'Types of Cookies We Use',
    icon: Settings,
    subsections: [
      {
        title: 'Account Cookies',
        content: `• Manage signup process
• Handle general administration
• Remember site preferences
• Maintain login sessions
• Store account settings
• Enable account features`
      },
      {
        title: 'Login Cookies',
        content: `• Keep you logged in
• Remember device information
• Track browser details
• Monitor access ports
• Maintain session security
• Enable smooth navigation`
      },
      {
        title: 'Functionality Cookies',
        content: `• Newsletter subscriptions
• Email preferences
• Order processing
• Payment facilities
• Survey participation
• Form submissions`
      },
      {
        title: 'Site Preference Cookies',
        content: `• Remember your preferences
• Customize your experience
• Store language settings
• Save display options
• Remember region settings
• Maintain theme choices`
      }
    ]
  },
  {
    id: 'third-party',
    title: 'Third-Party Cookies',
    icon: ExternalLink,
    subsections: [
      {
        title: 'Analytics Cookies',
        content: `• Google Analytics tracking
• Usage statistics
• Visitor behavior analysis
• Performance monitoring
• Feature optimization
• User experience improvement`
      },
      {
        title: 'Marketing Cookies',
        content: `• Affiliate tracking
• Advertisement delivery
• Marketing optimization
• Campaign tracking
• Conversion monitoring
• Promotional content`
      }
    ]
  },
  {
    id: 'cookie-control',
    title: 'Cookie Controls',
    icon: ToggleLeft,
    subsections: [
      {
        title: 'Browser Settings',
        content: `• Adjust browser preferences
• Block specific cookies
• Clear cookie data
• Manage permissions
• Control storage
• Set privacy levels`
      },
      {
        title: 'Platform Controls',
        content: `• Essential cookies (cannot be disabled)
• Marketing preferences
• Analytics participation
• Cookie consent choices
• Notification settings
• Privacy options`
      }
    ]
  },
  {
    id: 'cookie-settings',
    title: 'Cookie Settings',
    icon: Settings,
    content: `You can control your cookie preferences through our cookie settings panel. However, please note that certain cookies are essential for the platform's functionality and cannot be disabled:

• Login Cookies: Required to keep you logged in
• Site Cookies: Essential for website functionality
• Security Cookies: Necessary for platform safety

You can manage optional cookies such as analytics, marketing, and preference cookies through your browser settings or our cookie management tool.`
  },
  {
    id: 'contact',
    title: 'Contact Us',
    icon: Mail,
    content: `For more information about our cookie practices or to report any concerns, please contact us:

Email: privacy@ourplatform.com
Response Time: Within 48 hours

For urgent cookie-related inquiries, please mark your message as "Cookie Policy Question" in the subject line.`
  }
];

export default function CookiePolicy() {
  const [selectedSection, setSelectedSection] = useState<string>('introduction');
  
  // Find the currently selected section
  const currentSection = SECTIONS.find(section => section.id === selectedSection);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-sm text-gray-400">
            Last updated: {LAST_UPDATED}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Understanding how we use cookies to improve your experience
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
            <Settings className="h-4 w-4" />
            Manage Cookies
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
