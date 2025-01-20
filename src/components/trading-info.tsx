'use client'

import { Shield } from "lucide-react"

export default function TradingInfo() {
  return (
    <div className="space-y-8">
      <div className="bg-[#1C1F26] rounded-2xl p-8 border border-[#c5f82a]/10 hover:border-[#c5f82a]/30 transition-all duration-300">
        <h3 className="text-xl font-semibold mb-6 text-[#c5f82a] flex items-center gap-2">
          <Shield className="w-6 h-6" />
          Why Trade with Us?
        </h3>
        <ul className="space-y-6">
          <li className="flex items-start gap-4 group">
            <div className="w-10 h-10 rounded-full bg-[#c5f82a]/10 flex items-center justify-center group-hover:bg-[#c5f82a]/20 transition-colors">
              <Shield className="w-5 h-5 text-[#c5f82a]" />
            </div>
            <div>
              <p className="font-medium text-white group-hover:text-[#c5f82a] transition-colors">Secure Escrow Service</p>
              <p className="text-gray-400">Your funds are protected until the trade is complete</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
