'use client'

import dynamic from 'next/dynamic'
import React from 'react'

// Dynamically import icons
const Shield = dynamic(() => import('lucide-react').then(mod => mod.Shield))
const Zap = dynamic(() => import('lucide-react').then(mod => mod.Zap))
const Globe2 = dynamic(() => import('lucide-react').then(mod => mod.Globe2))
const CheckCircle2 = dynamic(() => import('lucide-react').then(mod => mod.CheckCircle2))
// const ChartLineUp = dynamic(() => import('lucide-react').then(mod => mod.ChartLineUp))
const Wallet = dynamic(() => import('lucide-react').then(mod => mod.Wallet))

const features = [
  {
    Icon: Shield,
    title: "Secure Trading",
    description: "Multi-layer security with escrow protection and fraud prevention"
  },
  {
    Icon: Zap,
    title: "Instant Matching",
    description: "Advanced algorithms to find the best trading partners quickly"
  },
  {
    Icon: Globe2,
    title: "Global Network",
    description: "Connect with traders from over 100 countries worldwide"
  },
  {
    Icon: CheckCircle2,
    title: "Verified Users",
    description: "All traders are verified through our multi-step process"
  },
  // {
  //   Icon: ChartLineUp,
  //   title: "Market Analysis",
  //   description: "Real-time market data and advanced trading analytics"
  // },
  {
    Icon: Wallet,
    title: "Multiple Payment Methods",
    description: "Support for various local and international payment options"
  }
]

export default function FeaturesSection() {
  return (
    <div className="py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-6">
          <span className="text-white">Why Choose</span>
          <span className="text-[#c5f82a] ml-3">IranP2P</span>
        </h2>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto">
          Experience the future of international money exchange with our innovative platform
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ Icon, title, description }) => (
          <div key={title} className="bg-black/50 border border-[#c5f82a]/10 rounded-xl p-6">
            <div className="w-12 h-12 rounded-xl bg-[#c5f82a]/10 flex items-center justify-center mb-4">
              <Icon className="w-6 h-6 text-[#c5f82a]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-400">{description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
