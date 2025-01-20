"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const features = [
  {
    title: "Real-Time Exchange Rates",
    description: "Access live IRR exchange rates against major currencies (USD, EUR, GBP)",
    icon: "📈"
  },
  {
    title: "Automated Bank Transfers",
    description: "Integrate direct bank transfer processing for IRR and supported currencies",
    icon: "🏦"
  },
  {
    title: "Trade History Analysis",
    description: "Track and analyze trading patterns and market trends",
    icon: "📊"
  },
  {
    title: "Instant Trade Matching",
    description: "Connect with available trade partners based on your criteria",
    icon: "🤝"
  }
];

const endpoints = [
  {
    method: "GET",
    path: "/api/trades",
    description: "Get a list of available currency exchange trades with optional filters"
  },
  {
    method: "POST",
    path: "/api/trades/create",
    description: "Create a new currency exchange trade"
  },
  {
    method: "GET",
    path: "/api/trades/{id}",
    description: "Get detailed information about a specific trade"
  }
];

export default function APIPage() {
  return (
    <div className="min-h-screen bg-[#2D1B69]">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold text-white mb-6">
            Currency Exchange APIs for Developers
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Integrate real-time Fiat currency exchange capabilities into your applications. 
            Access IRR exchange rates, automate trades, and streamline currency conversions.
          </p>
          <div className="flex gap-4">
            <Button className="bg-[#4CAF50] hover:bg-[#45a049] text-white">
              Get API Keys
            </Button>
            <Button variant="outline" className="text-white border-white hover:bg-white/10">
              View Documentation
            </Button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-white mb-12 text-center">
          Streamline Your Trading Process
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 bg-[#3D2B79] border-0 text-white">
              <div className="flex items-start gap-4">
                <div className="text-3xl">{feature.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* API Reference */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-white mb-12 text-center">
          API Reference
        </h2>
        <div className="space-y-4">
          {endpoints.map((endpoint, index) => (
            <Card key={index} className="p-6 bg-[#1A103F] border-0">
              <div className="flex items-center gap-4 mb-2">
                <span className={`px-2 py-1 rounded text-sm font-mono
                  ${endpoint.method === 'GET' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-blue-500/20 text-blue-400'
                  }`}>
                  {endpoint.method}
                </span>
                <code className="text-gray-300 font-mono">{endpoint.path}</code>
              </div>
              <p className="text-gray-400">{endpoint.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
