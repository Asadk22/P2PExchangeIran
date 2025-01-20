"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"
import BlogSearch from "./blog-search"

const categories = [
  "All",
  "News",
  "Security",
  "Trading Tips",
  "Market Analysis",
  "Platform Updates",
  "Stories"
]

const basicArticles = [
  {
    title: "Understanding P2P Exchange: A Beginner's Guide",
    description: "Learn the fundamentals of peer-to-peer currency exchange and how it works.",
    image: "/blog/basics-1.svg",
    category: "The Basics",
    readTime: "5 min read"
  },
  {
    title: "How to Create Your First Trade",
    description: "Step-by-step guide to creating and managing your first P2P trade.",
    image: "/blog/basics-2.svg",
    category: "The Basics",
    readTime: "7 min read"
  },
  {
    title: "Understanding Exchange Rates",
    description: "Everything you need to know about currency exchange rates and market dynamics.",
    image: "/blog/basics-3.svg",
    category: "The Basics",
    readTime: "6 min read"
  }
]

const tipsArticles = [
  {
    title: "Top Trading Strategies for Success",
    description: "Expert strategies to maximize your trading success and minimize risks.",
    image: "/blog/tips-1.svg",
    category: "Tips & Tricks",
    readTime: "8 min read"
  },
  {
    title: "5 Common Trading Mistakes to Avoid",
    description: "Learn about common pitfalls and how to avoid them in P2P trading.",
    image: "/blog/tips-2.svg",
    category: "Tips & Tricks",
    readTime: "6 min read"
  },
  {
    title: "Best Practices for Secure Trading",
    description: "Essential security practices to protect your trades and account.",
    image: "/blog/tips-3.svg",
    category: "Tips & Tricks",
    readTime: "7 min read"
  }
]

const whatsNewArticles = [
  {
    title: "Introducing Enhanced Security Features",
    description: "New security measures to make your trading experience safer than ever.",
    image: "/blog/new-1.svg",
    category: "What's New",
    readTime: "4 min read"
  },
  {
    title: "Mobile App Update: New Features",
    description: "Check out the latest features added to our mobile trading app.",
    image: "/blog/new-2.svg",
    category: "What's New",
    readTime: "5 min read"
  },
  {
    title: "Expanded Payment Methods",
    description: "We've added new payment methods to make trading even more convenient.",
    image: "/blog/new-3.svg",
    category: "What's New",
    readTime: "3 min read"
  }
]

const stories = [
  {
    title: "From Beginner to Pro: Sarah's Story",
    description: "How Sarah became a successful trader on our platform.",
    image: "/blog/story-1.svg",
    category: "Stories",
    readTime: "10 min read"
  },
  {
    title: "Building a Trading Business",
    description: "John's journey of building a successful trading business.",
    image: "/blog/story-2.svg",
    category: "Stories",
    readTime: "12 min read"
  },
  {
    title: "International Trading Success",
    description: "How Maria connects traders across continents.",
    image: "/blog/story-3.svg",
    category: "Stories",
    readTime: "8 min read"
  }
]

export default function BlogPage() {
  return (
    <div className="flex-1 space-y-12 py-8">
      {/* Header */}
      <section className="container text-center space-y-4">
        <h1 className="text-4xl font-bold">Exchange University</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Learn everything you need to know about P2P currency exchange and trading
        </p>
        <div className="flex justify-center gap-8 pt-4">
          <div className="text-center">
            <div className="text-2xl font-bold">100+</div>
            <div className="text-sm text-muted-foreground">Articles</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">50k+</div>
            <div className="text-sm text-muted-foreground">Readers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">4.8</div>
            <div className="text-sm text-muted-foreground">Rating</div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="container">
        <Card className="grid md:grid-cols-2 overflow-hidden">
          <div className="relative aspect-video md:aspect-auto">
            <Image
              src="/blog/featured-post.svg"
              alt="Featured post"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-8 flex flex-col justify-center bg-[#D1F366]">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Building Trust in P2P Exchange</h2>
              <p className="text-gray-700">
                Discover how our platform ensures secure and reliable transactions between users.
                Learn about our verification process and security measures.
              </p>
              <Button variant="secondary">Read More →</Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Categories */}
      <section className="container">
        <div className="flex items-center gap-2 overflow-x-auto pb-4">
          <BlogSearch />
          {categories.map((category) => (
            <Button
              key={category}
              variant="outline"
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* The Basics */}
      <section className="container space-y-6">
        <h2 className="text-2xl font-bold">The Basics</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {basicArticles.map((article, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative aspect-video">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{article.category}</span>
                  <span className="text-sm text-muted-foreground">{article.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold">{article.title}</h3>
                <p className="text-muted-foreground">{article.description}</p>
                <Button variant="link" className="p-0">Read More →</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Tips & Tricks */}
      <section className="container space-y-6">
        <h2 className="text-2xl font-bold">Tips & Tricks</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {tipsArticles.map((article, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative aspect-video">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{article.category}</span>
                  <span className="text-sm text-muted-foreground">{article.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold">{article.title}</h3>
                <p className="text-muted-foreground">{article.description}</p>
                <Button variant="link" className="p-0">Read More →</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* What's New */}
      <section className="container space-y-6">
        <h2 className="text-2xl font-bold">What's New?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {whatsNewArticles.map((article, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative aspect-video">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{article.category}</span>
                  <span className="text-sm text-muted-foreground">{article.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold">{article.title}</h3>
                <p className="text-muted-foreground">{article.description}</p>
                <Button variant="link" className="p-0">Read More →</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Stories */}
      <section className="container space-y-6">
        <h2 className="text-2xl font-bold">Stories</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((article, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative aspect-video">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{article.category}</span>
                  <span className="text-sm text-muted-foreground">{article.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold">{article.title}</h3>
                <p className="text-muted-foreground">{article.description}</p>
                <Button variant="link" className="p-0">Read More →</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#D1F366] py-12">
        <div className="container text-center space-y-6">
          <h2 className="text-3xl font-bold">Start trading today</h2>
          <p className="text-xl">Join millions of users worldwide on our platform</p>
          <Button size="lg" variant="secondary">
            Get Started
          </Button>
        </div>
      </section>
    </div>
  )
}
