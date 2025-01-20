import { Metadata } from "next"
import BlogArticle from "@/components/blog/blog-article"

type Props = {
  params: { slug: string }
}

export const metadata: Metadata = {
  title: "Article - P2P Exchange Blog",
  description: "Read our latest insights about P2P currency exchange",
}

export default function ArticlePage({ params }: Props) {
  return <BlogArticle slug={params.slug} />
}
