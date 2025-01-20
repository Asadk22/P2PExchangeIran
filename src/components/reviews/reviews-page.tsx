"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const stats = [
  {
    value: "14M+",
    label: "global users"
  },
  {
    value: "300+",
    label: "payment methods"
  },
  {
    value: "425M+",
    label: "monthly transactions"
  }
]

const reviews = [
  {
    text: "The P2P mobile app absolutely went above and beyond my expectations. It is so much more user friendly and convenient for making trades and I've already referred 7 friends to P2P mobile app. P2P is one of the very few platforms I am comfortable using for my transactions, and myself and my friends are members and customers (especially now that the mobile app is up and running). P2P is unlike any other cryptocurrency trading platform. I trust P2P for my needs.",
    author: "Alex Anderson",
    location: "United States"
  },
  {
    text: "It's normal to sometimes win and sometimes lose in every aspect of life. I love how your moderators handle the issues with professionalism. Keep up the good work. Try as much to reduce out the few bad ones.",
    author: "Junior Kyungu Kishyet",
    location: "Kenya"
  },
  {
    text: "Best ever you'll find, enough trading time... variety of payment method for almost all countries it's 4 years I've been using this platform and still counting!",
    author: "Eliel Abboy",
    location: "Philippines"
  },
  {
    text: "I have using P2P wallet long time ago and I'm still happy with the company even now on.",
    author: "Noobaha NgakaMa",
    location: "Indonesia"
  },
  {
    text: "I really appreciate the variety of investment tools and resources this app offers, especially the market analysis and real-time data. These features help me make informed investment decisions, allowing me to navigate the market with greater confidence.",
    author: "Juyyess",
    location: "Singapore"
  },
  {
    text: "Great customer service, they helped me two times at the same time to get back my money. And a great website for buying and selling. A life saver!",
    author: "rhopro",
    location: "Thailand"
  },
  {
    text: "The support is great and the important thing is that finds solutions to any problems. I am very grateful to you.",
    author: "Noushina Chakheel",
    location: "India"
  },
  {
    text: "Very good p2p platform using it from last 5 year i love it",
    author: "Sonu Verma",
    location: "India"
  }
]

export default function ReviewsPage() {
  return (
    <div className="flex-1">
      {/* App Banner */}
      <div className="bg-[#D1F366] text-center py-3">
        <p className="text-sm">
          Get the crypto trading app reviewers call "The one to beat in P2P"
        </p>
        <p className="text-xs">Download on iOS and Android</p>
      </div>

      {/* Hero Section */}
      <section className="bg-black text-white py-20 text-center space-y-8">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">
            What our customers are saying
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Curious about the experiences of our buyers and sellers? Here's a glimpse of what some of our 14,000,000+ million have to say about our services.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-[#D1F366] text-4xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Reviews from real buyers and sellers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {reviews.map((review, index) => (
              <Card key={index} className="p-6 bg-gray-50">
                <p className="text-gray-600 mb-4">{review.text}</p>
                <div className="text-sm">
                  <div className="font-semibold">{review.author}</div>
                  <div className="text-gray-500">{review.location}</div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-[#D1F366] text-black hover:bg-[#D1F366]/90"
            >
              Leave a review
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
