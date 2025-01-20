"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Share2, Clock, ArrowLeft } from "lucide-react"

interface BlogArticleProps {
  slug: string
}

export default function BlogArticle({ slug }: BlogArticleProps) {
  // In a real application, you would fetch the article data based on the slug
  const article = {
    title: "Understanding P2P Exchange: A Beginner's Guide",
    description: "Learn the fundamentals of peer-to-peer currency exchange and how it works.",
    publishDate: "January 2, 2025",
    readTime: "5 min read",
    author: {
      name: "Sarah Chen",
      role: "Financial Analyst",
      image: "/team/sarah.jpg"
    },
    content: `
      <h2>Introduction to P2P Exchange</h2>
      <p>Peer-to-peer (P2P) currency exchange is revolutionizing how people transfer money across borders. Unlike traditional exchanges, P2P platforms connect buyers and sellers directly, offering better rates and more flexibility.</p>

      <h2>How P2P Exchange Works</h2>
      <p>In a P2P exchange, users create offers to buy or sell currency at their preferred rates. Other users can browse these offers and choose the ones that best match their needs. The platform acts as an escrow service to ensure safe transactions.</p>

      <h2>Key Benefits</h2>
      <ul>
        <li>Better exchange rates than traditional services</li>
        <li>Multiple payment methods available</li>
        <li>Direct transactions with other users</li>
        <li>Enhanced security through escrow service</li>
      </ul>

      <h2>Getting Started</h2>
      <p>To start trading on a P2P platform, you'll need to:</p>
      <ol>
        <li>Create and verify your account</li>
        <li>Add your preferred payment methods</li>
        <li>Browse available offers or create your own</li>
        <li>Complete your first trade</li>
      </ol>
    `,
    relatedArticles: [
      {
        title: "5 Tips for Safe P2P Trading",
        image: "/blog/tips-1.svg",
        readTime: "4 min read"
      },
      {
        title: "Understanding Exchange Rates",
        image: "/blog/basics-2.svg",
        readTime: "6 min read"
      },
      {
        title: "Common Trading Mistakes to Avoid",
        image: "/blog/tips-3.svg",
        readTime: "7 min read"
      }
    ]
  }

  return (
    <div className="flex-1 py-8">
      {/* Back Button */}
      <div className="container mb-8">
        <Button variant="ghost" asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Link>
        </Button>
      </div>

      {/* Article Header */}
      <article className="container max-w-4xl mx-auto">
        <div className="space-y-4 text-center mb-8">
          <h1 className="text-4xl font-bold">{article.title}</h1>
          <p className="text-xl text-muted-foreground">{article.description}</p>
          
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {article.readTime}
            </span>
            <span>•</span>
            <span>{article.publishDate}</span>
          </div>
        </div>

        {/* Author Info */}
        <div className="flex items-center justify-between py-6 border-y">
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 rounded-full overflow-hidden">
              <Image
                src={article.author.image}
                alt={article.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="font-semibold">{article.author.name}</div>
              <div className="text-sm text-muted-foreground">{article.author.role}</div>
            </div>
          </div>
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>

        {/* Article Content */}
        <div 
          className="prose prose-lg max-w-none py-12"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Related Articles */}
        <section className="border-t pt-12">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {article.relatedArticles.map((related, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative aspect-video">
                  <Image
                    src={related.image}
                    alt={related.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{related.title}</h3>
                  <span className="text-sm text-muted-foreground">{related.readTime}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </article>
    </div>
  )
}
