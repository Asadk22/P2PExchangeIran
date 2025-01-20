'use client'

import { Shield, CheckCircle, Globe, Zap } from "lucide-react"

const benefits = [
  {
    icon: Shield,
    title: "Secure Escrow Service",
    description: "Your funds are protected with our automated escrow system until the trade is complete"
  },
  {
    icon: CheckCircle,
    title: "Verified Traders",
    description: "Trade with confidence knowing all users are verified through our multi-step process"
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description: "Access a worldwide network of traders and multiple payment methods"
  },
  {
    icon: Zap,
    title: "Fast Settlements",
    description: "Quick and efficient trade processing with real-time updates"
  }
]

export default function WhyTradeWithUs() {
  return (
    <div className="bg-[#1C1F26] rounded-2xl p-8 border border-[#c5f82a]/10 hover:border-[#c5f82a]/30 transition-all duration-300">
      <h3 className="text-xl font-semibold mb-6 text-[#c5f82a] flex items-center gap-2">
        <Shield className="w-6 h-6" />
        Why Trade with Us?
      </h3>
      <ul className="space-y-6">
        {benefits.map((benefit) => (
          <li key={benefit.title} className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#c5f82a]/10 flex items-center justify-center flex-shrink-0">
              <benefit.icon className="w-6 h-6 text-[#c5f82a]" />
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">{benefit.title}</h4>
              <p className="text-gray-400 text-sm">{benefit.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
