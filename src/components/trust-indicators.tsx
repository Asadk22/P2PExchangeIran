'use client'

import { Clock, Shield, Wallet } from "lucide-react"

const stats = [
  {
    value: "$500M+",
    label: "Monthly Volume"
  },
  {
    value: "50K+",
    label: "Active Users"
  },
  {
    value: "100+",
    label: "Countries"
  },
  {
    value: "99.9%",
    label: "Success Rate"
  }
]

const features = [
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock assistance in multiple languages"
  },
  {
    icon: Wallet,
    title: "Instant Settlements",
    description: "Quick and secure transaction processing"
  },
  {
    icon: Shield,
    title: "Secure Platform",
    description: "Enterprise-grade security measures"
  }
]

export default function TrustIndicators() {
  return (
    <div className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#c5f82a]/5 blur-3xl"></div>
      <div className="relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            <span className="text-white">Trusted by</span>
            <span className="text-[#c5f82a] ml-3">Thousands</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Join our growing community of satisfied traders worldwide
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-[#1C1F26] rounded-2xl p-8 border border-gray-800">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#c5f82a]/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-[#c5f82a]" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
