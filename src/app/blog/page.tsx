import { Metadata } from "next"
import BlogPage from "@/components/blog/blog-page"

export const metadata: Metadata = {
  title: "Blog - Learn About P2P Exchange",
  description: "Stay updated with the latest news, tips, and insights about P2P currency exchange",
}

export default function Blog() {
  return <BlogPage />
}
