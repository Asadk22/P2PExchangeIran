"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import Image from "next/image"

interface SearchResult {
  title: string
  description: string
  image: string
  category: string
  readTime: string
}

export default function BlogSearch() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])

  // Mock search results - in a real app, this would come from your backend
  const mockSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    // Simulate API call with mock results
    const results: SearchResult[] = [
      {
        title: "Understanding P2P Exchange",
        description: "A comprehensive guide to P2P currency exchange",
        image: "/blog/basics-1.svg",
        category: "The Basics",
        readTime: "5 min read"
      },
      {
        title: "Trading Tips for Beginners",
        description: "Essential tips for new traders",
        image: "/blog/tips-1.svg",
        category: "Tips & Tricks",
        readTime: "7 min read"
      }
    ]

    setSearchResults(results)
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsSearchOpen(true)}
        className="relative"
      >
        <Search className="h-5 w-5" />
      </Button>

      {isSearchOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
          <div className="fixed inset-0 max-w-2xl mx-auto mt-20 p-4">
            <Card className="w-full">
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    className="flex-1"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      mockSearch(e.target.value)
                    }}
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Search Results */}
                <div className="mt-4 space-y-4">
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      className="flex gap-4 p-2 hover:bg-muted/50 rounded-lg cursor-pointer"
                    >
                      <div className="relative h-16 w-24 rounded-lg overflow-hidden">
                        <Image
                          src={result.image}
                          alt={result.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{result.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {result.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <span>{result.category}</span>
                          <span>•</span>
                          <span>{result.readTime}</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {searchQuery && searchResults.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No results found for "{searchQuery}"
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </>
  )
}
