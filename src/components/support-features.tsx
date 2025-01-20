'use client'

import { Clock, Shield, Wallet } from "lucide-react"

const features = [
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer service in multiple languages"
  },
  {
    icon: Shield,
    title: "Secure Platform",
    description: "Enterprise-grade security with multi-layer protection"
  },
  {
    icon: Wallet,
    title: "Fast Settlements",
    description: "Quick and efficient transaction processing"
  }
]

export default function SupportFeatures() {
  return (
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
  )
}
