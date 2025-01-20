'use client';

import { useState } from 'react';
import {
  FileText,
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
  UserX,
  ShieldAlert,
  Siren,
  Scroll,
  BadgeAlert,
  Wallet,
  Network,
  Lock,
  Globe,
  Mail,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Users,
  Banknote
} from 'lucide-react';

// Define the type for our section items
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
    icon: FileText,
    content: `These Terms and Conditions were last updated on ${LAST_UPDATED}. By using our platform, you acknowledge that you have read, understood, and agree to be bound by these terms.`
  },
  {
    id: 'identity-verification',
    title: 'Identity Verification',
    icon: UserCog,
    subsections: [
      {
        title: 'Verification Requirements',
        content: `• Users must be at least 18 years old
• Valid government-issued ID required
• Proof of address may be requested
• Selfie verification with ID document
• Active phone number verification
• Email verification required`
      },
      {
        title: 'Verification Process',
        content: `• Email verification through confirmation link
• Phone number verification via SMS code
• ID document upload with selfie
• Additional verification may be required for high-value transactions
• Regular verification updates may be required`
      }
    ]
  },
  {
    id: 'currency-exchange',
    title: 'Currency Exchange Rules',
    icon: CircleDollarSign,
    subsections: [
      {
        title: 'Supported Currencies',
        content: `Our platform supports exchanges between:
• Major international currencies (EUR, USD, GBP, etc.)
• Local currencies as permitted by law
• Currencies subject to regulatory approval
• Currencies with stable banking channels

Restrictions apply to:
• Currencies under sanctions
• High-risk jurisdictions
• Restricted territories
• Volatile currencies`
      },
      {
        title: 'Exchange Rate Determination',
        content: `Exchange rates are determined by:
• Real-time market rates
• Peer-to-peer negotiations
• Banking system spreads
• Local market conditions
• Transaction volume
• Payment method premiums
• Regional variations
• Market depth`
      },
      {
        title: 'Transaction Limits',
        content: `Limits are based on:
• User verification level
• Banking regulations
• Local currency restrictions
• Payment method capacity
• Risk assessment
• Transaction history
• Account age
• Compliance requirements`
      }
    ]
  },
  {
    id: 'payment-methods',
    title: 'Payment Methods & Processing',
    icon: CreditCard,
    subsections: [
      {
        title: 'Approved Payment Methods',
        content: `We support the following payment methods:
• Bank transfers (domestic/international)
• SEPA transfers (EU region)
• Wire transfers
• Local bank deposits
• Mobile banking
• Payment cards (where applicable)
• Electronic money transfers
• Regional payment systems

Each payment method must:
• Be registered in user's legal name
• Have clear transaction records
• Support verification
• Meet security standards
• Comply with local laws`
      },
      {
        title: 'Payment Processing',
        content: `Transaction processing includes:
• Bank processing times
• Clearing periods
• Settlement windows
• Verification checks
• Security holds
• Compliance reviews
• Risk assessments
• Payment confirmations`
      },
      {
        title: 'Payment Restrictions',
        content: `Prohibited payment methods:
• Anonymous payment systems
• Third-party payments
• Cash deposits by unknown parties
• Unregistered payment services
• High-risk payment providers
• Sanctioned banking systems
• Non-compliant financial services
• Unverified payment channels`
      }
    ]
  },
  {
    id: 'banking-compliance',
    title: 'Banking & Financial Compliance',
    icon: Building2,
    subsections: [
      {
        title: 'Banking Requirements',
        content: `Users must comply with:
• Bank account ownership rules
• Transaction documentation
• Source of funds verification
• Banking sector regulations
• Foreign exchange laws
• Cross-border rules
• Banking hours and cut-offs
• Settlement procedures`
      },
      {
        title: 'Documentation Requirements',
        content: `Required documents include:
• Bank statements
• Proof of payment
• Transaction receipts
• Bank confirmations
• Source of funds proof
• Tax declarations
• Financial statements
• Identity verification`
      },
      {
        title: 'Banking Partnerships',
        content: `Our platform maintains:
• Banking relationships
• Payment processor agreements
• Financial institution partnerships
• Regulatory registrations
• Banking licenses
• Payment service provisions
• Settlement agreements
• Clearing arrangements`
      }
    ]
  },
  {
    id: 'risk-management',
    title: 'Risk Management & Security',
    icon: Shield,
    subsections: [
      {
        title: 'Transaction Risks',
        content: `Users acknowledge:
• Exchange rate fluctuations
• Bank processing delays
• Payment system outages
• Regulatory changes
• Banking system risks
• Counter-party risks
• Settlement risks
• Operational risks`
      },
      {
        title: 'Security Measures',
        content: `Platform security includes:
• Bank-level encryption
• Payment verification
• Multi-factor authentication
• Transaction monitoring
• Fraud detection
• Account security
• System audits
• Real-time alerts`
      },
      {
        title: 'Dispute Prevention',
        content: `Risk mitigation through:
• Payment confirmation
• Transaction verification
• Bank receipt validation
• Settlement confirmation
• Escrow services
• Dispute resolution
• Chargeback prevention
• Fraud protection`
      }
    ]
  },
  {
    id: 'user-obligations',
    title: 'User Responsibilities & Conduct',
    icon: UserCog,
    subsections: [
      {
        title: 'Account Requirements',
        content: `Users must maintain:
• Valid bank accounts
• Updated KYC information
• Accurate personal details
• Transaction records
• Payment proofs
• Communication logs
• Activity history
• Compliance documentation`
      },
      {
        title: 'Trading Conduct',
        content: `Users must:
• Use personal bank accounts
• Follow payment instructions
• Meet transaction deadlines
• Provide accurate information
• Maintain sufficient funds
• Report issues promptly
• Keep payment proofs
• Follow platform rules`
      },
      {
        title: 'Prohibited Activities',
        content: `Users must not:
• Use unauthorized banks
• Provide false information
• Manipulate exchange rates
• Abuse payment systems
• Engage in fraud
• Violate banking laws
• Circumvent limits
• Share accounts`
      }
    ]
  },
  {
    id: 'registration',
    title: 'Account Registration & Verification',
    icon: UserCog,
    subsections: [
      {
        title: 'Eligibility Requirements',
        content: `To use our platform, you must:
• Be at least 18 years old
• Have legal capacity to enter into contracts
• Not be a resident of restricted jurisdictions
• Not be on any sanctions or watchlists
• Have a valid government-issued ID
• Provide accurate personal information
• Pass our KYC verification process`
      },
      {
        title: 'Verification Levels',
        content: `Our platform implements a tiered verification system:

Level 1 (Basic):
• Email verification
• Phone verification
• Basic personal information
• Transaction limits apply

Level 2 (Intermediate):
• Government ID verification
• Proof of address
• Facial verification
• Higher transaction limits

Level 3 (Advanced):
• Enhanced due diligence
• Source of funds verification
• Professional/business documentation
• Highest transaction limits`
      },
      {
        title: 'Account Security',
        content: `You are responsible for:
• Maintaining strong passwords
• Enabling 2FA authentication
• Keeping security credentials confidential
• Reporting suspicious activities
• Regular security reviews
• Device management
• API key security`
      }
    ]
  },
  {
    id: 'trading-rules',
    title: 'Trading Rules',
    icon: CircleDollarSign,
    subsections: [
      {
        title: 'Transaction Initiation',
        content: `• Rate confirmation required before transaction
• No cancellation after both parties confirm
• Sufficient balance verification required
• Clear transaction instructions must be followed
• Bank account ownership verification required`
      },
      {
        title: 'Payment Processing',
        content: `• International transfers may take 1-3 business days
• Only personal bank accounts accepted
• Business accounts not supported
• Family and Friends transfer reference required
• Currency rate locked at transaction start`
      },
      {
        title: 'Transaction Limits',
        content: `• Daily transaction limits apply
• Monthly volume restrictions
• Risk-based transaction limits
• Additional verification for high-value transfers
• Regular review of transaction patterns`
      }
    ]
  },
  {
    id: 'payment-compliance',
    title: 'Payment & Compliance',
    icon: CircleDollarSign,
    subsections: [
      {
        title: 'Payment Methods',
        content: `Approved payment methods must:
• Be registered in the user's legal name
• Have clear transaction records
• Support dispute resolution
• Meet regulatory requirements
• Be verifiable and traceable

Restricted payment methods:
• Anonymous payment systems
• Third-party payments
• Cash deposits
• Gift cards
• Prepaid cards
• Cryptocurrency mixers`
      },
      {
        title: 'Transaction Monitoring',
        content: `We monitor transactions for:
• Unusual patterns
• High-risk indicators
• Velocity checks
• Amount structuring
• Geographic risks
• Network analysis
• Counterparty risks
• Payment method abuse`
      },
      {
        title: 'Compliance Requirements',
        content: `Users must comply with:
• Local currency regulations
• International sanctions
• Tax reporting obligations
• Banking regulations
• Currency export/import laws
• Electronic money regulations
• Financial crime prevention laws`
      }
    ]
  },
  {
    id: 'aml-policy',
    title: 'Anti-Money Laundering (AML)',
    icon: ShieldAlert,
    subsections: [
      {
        title: 'Risk Assessment',
        content: `We assess risks based on:
• User profile and history
• Transaction patterns
• Geographic location
• Payment methods
• Volume and frequency
• Source of funds
• Business nature
• Network connections`
      },
      {
        title: 'Monitoring & Reporting',
        content: `Our AML program includes:
• Real-time transaction monitoring
• Suspicious activity reporting
• Large transaction reporting
• Pattern analysis
• Blockchain analytics
• Regulatory reporting
• Cooperation with authorities
• Record keeping requirements`
      },
      {
        title: 'Enhanced Due Diligence',
        content: `Additional scrutiny for:
• High-value transactions
• High-risk countries
• Political exposed persons
• Complex transaction patterns
• Unusual business activities
• Non-resident users
• High-risk payment methods`
      }
    ]
  },
  {
    id: 'fraud-prevention',
    title: 'Fraud Prevention & Security',
    icon: Siren,
    subsections: [
      {
        title: 'Fraud Detection',
        content: `We employ multiple fraud detection methods:
• Machine learning algorithms
• Behavioral analysis
• Device fingerprinting
• IP monitoring
• Payment verification
• Identity validation
• Network analysis
• Pattern recognition`
      },
      {
        title: 'Security Measures',
        content: `Platform security includes:
• Multi-factor authentication
• IP whitelisting
• Session management
• API security
• Encryption protocols
• Cold storage
• Regular security audits
• Penetration testing`
      },
      {
        title: 'Account Protection',
        content: `User protection measures:
• Login notifications
• Suspicious activity alerts
• Transaction confirmations
• Device management
• API key controls
• Password policies
• Security checkups
• Recovery procedures`
      }
    ]
  },
  {
    id: 'liability',
    title: 'Liability & Risk Management',
    icon: AlertTriangle,
    subsections: [
      {
        title: 'Platform Risks',
        content: `Users acknowledge:
• Market volatility risks
• Counterparty risks
• Technical risks
• Regulatory risks
• Operational risks
• Cybersecurity risks
• Financial risks
• Legal risks`
      },
      {
        title: 'User Responsibilities',
        content: `Users are responsible for:
• Account security
• Transaction verification
• Payment confirmation
• Due diligence
• Risk assessment
• Compliance obligations
• Loss prevention
• Dispute evidence`
      },
      {
        title: 'Platform Limitations',
        content: `We are not liable for:
• Market losses
• Payment disputes
• Technical failures
• Third-party actions
• Regulatory changes
• Force majeure events
• User negligence
• Network issues`
      }
    ]
  },
  {
    id: 'regulatory-compliance',
    title: 'Regulatory Compliance',
    icon: Landmark,
    subsections: [
      {
        title: 'Licensing & Registration',
        content: `Our platform maintains:
• Required licenses
• Regulatory registrations
• Compliance programs
• Audit requirements
• Reporting obligations
• Capital requirements
• Insurance coverage`
      },
      {
        title: 'Regulatory Framework',
        content: `We comply with:
• Financial regulations
• Data protection laws
• Consumer protection
• Securities laws
• Banking regulations
• Tax requirements
• International standards`
      },
      {
        title: 'User Obligations',
        content: `Users must comply with:
• Tax reporting
• Currency regulations
• Sanctions programs
• Local laws
• Disclosure requirements
• Record keeping
• Reporting obligations`
      }
    ]
  },
  {
    id: 'account-termination',
    title: 'Account Termination & Suspension',
    icon: UserX,
    subsections: [
      {
        title: 'Termination Grounds',
        content: `Accounts may be terminated for:
• Terms violation
• Fraudulent activity
• AML/KYC violations
• Regulatory requirements
• Security concerns
• Extended inactivity
• User request
• Legal obligations`
      },
      {
        title: 'Suspension Process',
        content: `Account suspension includes:
• Immediate access restriction
• Fund freezing
• Investigation period
• Evidence collection
• Appeal process
• Resolution timeline
• Reinstatement conditions`
      },
      {
        title: 'Asset Recovery',
        content: `Post-termination process:
• Fund withdrawal procedures
• Verification requirements
• Time limitations
• Documentation needs
• Legal considerations
• Recovery options
• Support assistance`
      }
    ]
  },
  {
    id: 'dispute-resolution',
    title: 'Dispute Resolution & Arbitration',
    icon: Gavel,
    subsections: [
      {
        title: 'Dispute Process',
        content: `Our dispute resolution includes:
• Initial investigation
• Evidence collection
• Mediation process
• Appeal procedures
• Arbitration options
• Legal recourse
• Resolution timeline`
      },
      {
        title: 'Evidence Requirements',
        content: `Required documentation:
• Transaction records
• Communication logs
• Payment proofs
• Identity verification
• Bank statements
• Time stamps
• Digital signatures`
      },
      {
        title: 'Resolution Timeline',
        content: `Dispute handling timeline:
• Initial response: 24 hours
• Investigation: 3-5 days
• Evidence review: 2-3 days
• Decision: 5-7 days
• Appeal window: 14 days
• Final resolution: 30 days`
      }
    ]
  },
  {
    id: 'updates-modifications',
    title: 'Terms Updates & Modifications',
    icon: History,
    content: `We reserve the right to modify these terms:
• With prior notice
• For regulatory compliance
• For security improvements
• For service enhancements
• For risk management
• For legal requirements

Changes will be:
• Communicated via email
• Posted on platform
• Given notice period
• Clearly highlighted
• Version controlled
• Archived for reference`
  },
  {
    id: 'contact-support',
    title: 'Contact & Support',
    icon: HeartHandshake,
    content: `For assistance:
• Support Email: support@p2pexchange.com
• Legal Email: legal@p2pexchange.com
• Compliance: compliance@p2pexchange.com
• Security: security@p2pexchange.com
• Phone: [Phone Number]
• Address: [Legal Address]

Response Times:
• General Inquiries: 24 hours
• Security Issues: Immediate
• Legal Matters: 48 hours
• Compliance: 48 hours`
  },
  {
    id: 'user-responsibilities',
    title: 'User Responsibilities',
    icon: Shield,
    subsections: [
      {
        title: 'Account Security',
        content: `• Maintain account security
• Keep login credentials confidential
• Report suspicious activities
• Regular password updates
• Enable two-factor authentication when available`
      },
      {
        title: 'Transaction Obligations',
        content: `• Provide accurate information
• Use only personal bank accounts
• Follow transaction instructions
• Maintain sufficient funds
• Respond to support team inquiries
• Keep transaction records`
      },
      {
        title: 'Compliance Requirements',
        content: `• Follow anti-money laundering regulations
• Provide source of funds when requested
• Comply with local currency regulations
• Report suspicious transactions
• Maintain transaction documentation`
      }
    ]
  },
  {
    id: 'platform-security',
    title: 'Platform Security',
    icon: Lock,
    subsections: [
      {
        title: 'Security Measures',
        content: `• Advanced encryption protocols
• Regular security audits
• Fraud detection systems
• Secure payment processing
• Multi-factor authentication`
      },
      {
        title: 'Data Protection',
        content: `• Personal data encryption
• Secure storage protocols
• Limited data access
• Regular backup systems
• Privacy protection measures`
      }
    ]
  },
];

export default function TermsAndConditions() {
  const [selectedSection, setSelectedSection] = useState<string>('introduction');
  
  // Find the currently selected section
  const currentSection = SECTIONS.find(section => section.id === selectedSection);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-sm text-gray-400">
            Last updated: {LAST_UPDATED}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            These terms govern your use of our P2P fiat currency exchange platform
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
            <HeartHandshake className="h-4 w-4" />
            Contact Legal
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
