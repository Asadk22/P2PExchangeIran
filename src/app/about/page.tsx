'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  CreditCard, 
  Wallet, 
  ChevronDown, 
  Lock,
  HeartHandshake, 
  Scale, 
  Globe, 
  Zap, 
  Shield, 
  Users,
  ArrowRight, 
  Check, 
  Star, 
  TrendingUp, 
  Sparkles,
  Clock,
  BadgeCheck
} from 'lucide-react';
import Image from 'next/image';
import { WavePattern, NetworkPattern, FloatingCircles } from '@/components/animations/background-animations';

const FEATURES = [
  {
    title: "Secure Escrow",
    description: "Your funds are protected with our state-of-the-art escrow system",
    icon: Lock,
    stats: "100% Secure"
  },
  {
    title: "Global Network",
    description: "Connect with traders worldwide",
    icon: Globe,
    stats: "180+ Countries"
  },
  {
    title: "Fast Transactions",
    description: "Complete trades in minutes, not hours",
    icon: Zap,
    stats: "3.2s Avg. Time"
  }
];

const SUCCESS_STORIES = [
  {
    name: "Sarah K.",
    location: "United States",
    story: "This platform transformed how I handle international payments. The escrow system gives me peace of mind.",
    amount: "$250K+",
    trades: "500+"
  },
  {
    name: "Michael R.",
    location: "Germany",
    story: "The best P2P trading experience I've had. Professional traders and excellent support team.",
    amount: "$1M+",
    trades: "1000+"
  },
  {
    name: "David L.",
    location: "Singapore",
    story: "Been trading here for 2 years. The platform keeps getting better with new features and improvements.",
    amount: "$500K+",
    trades: "750+"
  }
];

const LIVE_UPDATES = [
  "New user from Germany joined",
  "Successful trade completed: €5000",
  "New verification approved",
  "Trade volume reached $5.2M today"
];

export default function About() {
  const [tradingVolume, setTradingVolume] = useState(5234567);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [liveUpdateIndex, setLiveUpdateIndex] = useState(0);

  useEffect(() => {
    const storyInterval = setInterval(() => {
      setCurrentStoryIndex((prev) => (prev + 1) % SUCCESS_STORIES.length);
    }, 5000);

    const updateInterval = setInterval(() => {
      setLiveUpdateIndex((prev) => (prev + 1) % LIVE_UPDATES.length);
    }, 3000);

    return () => {
      clearInterval(storyInterval);
      clearInterval(updateInterval);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white relative overflow-hidden">
      {/* Background Animations */}
      <WavePattern />
      <NetworkPattern />
      <FloatingCircles />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section - Made more compact */}
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Transform Your Financial Freedom
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Experience the future of peer-to-peer fiat exchange. Fast, secure,
              and borderless transactions at your fingertips.
            </motion.p>

            {/* Stats Section - Compact Grid */}
            <div className="grid grid-cols-3 gap-3 max-w-2xl mx-auto mb-6">
              {/* Trading Volume */}
              <motion.div 
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative bg-gradient-to-br from-[#1C2127] to-[#2A2F37] rounded-lg p-3 h-20 flex flex-col justify-center items-center">
                  <div className="text-xl font-bold text-[#00C853]">
                    ${(tradingVolume / 1000000).toFixed(1)}M+
                  </div>
                  <div className="text-xs text-gray-400">24h Volume</div>
                </div>
              </motion.div>

              {/* Transaction Time */}
              <motion.div 
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative bg-gradient-to-br from-[#1C2127] to-[#2A2F37] rounded-lg p-3 h-20 flex flex-col justify-center items-center">
                  <div className="text-xl font-bold text-[#00C853]">3.2s</div>
                  <div className="text-xs text-gray-400">Avg. Speed</div>
                </div>
              </motion.div>

              {/* Success Rate */}
              <motion.div 
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="relative bg-gradient-to-br from-[#1C2127] to-[#2A2F37] rounded-lg p-3 h-20 flex flex-col justify-center items-center">
                  <div className="text-xl font-bold text-[#00C853]">99.9%</div>
                  <div className="text-xs text-gray-400">Success Rate</div>
                </div>
              </motion.div>
            </div>

            {/* Live Updates - Compact */}
            <div className="mb-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={liveUpdateIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-gradient-to-r from-[#1C2127]/50 via-[#2A2F37]/50 to-[#1C2127]/50 backdrop-blur-sm rounded-full py-1.5 px-4 inline-flex items-center gap-2"
                >
                  <div className="w-1.5 h-1.5 bg-[#00C853] rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-300">{LIVE_UPDATES[liveUpdateIndex]}</span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Scroll Indicator */}
            <motion.div 
              className="mt-4"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown className="w-6 h-6 text-[#00C853] mx-auto" />
            </motion.div>
          </div>
        </div>

        {/* Why Choose Us - Interactive Cards */}
        <section className="py-12 bg-black/20 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-center mb-8"
            >
              Why Leading Traders Choose Us
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {FEATURES.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-lg bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-all duration-300"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-green-500">
                      <feature.icon className="w-6 h-6" />
                      <h3 className="text-xl font-semibold">{feature.title}</h3>
                    </div>
                    <p className="text-gray-400">{feature.description}</p>
                    <div className="flex items-center gap-8">
                      <div className="text-[#00C853] font-bold">{feature.stats}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories Carousel */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-16 text-center">Success Stories</h2>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStoryIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="max-w-4xl mx-auto bg-[#242424] rounded-2xl p-8"
              >
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00C853] to-[#69F0AE] flex items-center justify-center">
                    <span className="text-3xl font-bold">{SUCCESS_STORIES[currentStoryIndex].name[0]}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold">{SUCCESS_STORIES[currentStoryIndex].name}</h3>
                      <span className="text-gray-400">from {SUCCESS_STORIES[currentStoryIndex].location}</span>
                    </div>
                    <p className="text-gray-300 text-lg mb-6">"{SUCCESS_STORIES[currentStoryIndex].story}"</p>
                    <div className="flex items-center gap-8">
                      <div>
                        <div className="text-[#00C853] font-bold">{SUCCESS_STORIES[currentStoryIndex].amount}</div>
                        <div className="text-sm text-gray-400">Total Volume</div>
                      </div>
                      <div>
                        <div className="text-[#00C853] font-bold">{SUCCESS_STORIES[currentStoryIndex].trades}</div>
                        <div className="text-sm text-gray-400">Successful Trades</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* How It Works - Interactive Timeline */}
        <section className="py-20 bg-[#1f1f1f] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/patterns/circuit.svg')] opacity-5"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl font-bold mb-16 text-center">Your Journey to Financial Freedom</h2>

            <div className="max-w-5xl mx-auto">
              {[
                {
                  step: "01",
                  title: "Quick Registration",
                  description: "Create your account in minutes. No complex paperwork required.",
                  icon: Check
                },
                {
                  step: "02",
                  title: "Choose Your Trade",
                  description: "Browse hundreds of offers or create your own. Set your terms.",
                  icon: Globe
                },
                {
                  step: "03",
                  title: "Secure Transaction",
                  description: "Trade with confidence using our escrow system. Your money is always protected.",
                  icon: Lock
                },
                {
                  step: "04",
                  title: "Grow Your Network",
                  description: "Build your reputation and unlock premium features.",
                  icon: TrendingUp
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="relative flex gap-8 mb-12"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0, x: -50 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: index * 0.2 } }
                  }}
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#242424] flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-[#00C853]" />
                  </div>
                  <div>
                    <div className="text-sm text-[#00C853] mb-2">Step {step.step}</div>
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-[#242424] to-[#1a1a1a] rounded-3xl p-12"
              >
                <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
                <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                  Join thousands of successful traders who have already discovered the power of P2P trading.
                  Your financial freedom starts here.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <button className="group relative px-8 py-4 bg-[#00C853] rounded-xl font-semibold text-white overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                    <span className="relative">Start Trading Now</span>
                  </button>
                  <button className="group px-8 py-4 border-2 border-[#00C853] rounded-xl font-semibold text-[#00C853] hover:bg-[#00C853]/10 transition-colors">
                    Watch Demo
                  </button>
                </div>

                <div className="mt-12 flex items-center justify-center gap-8 text-gray-400">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    <span>Bank-grade security</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>24/7 Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="w-5 h-5" />
                    <span>Verified Users</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
