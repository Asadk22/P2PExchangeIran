'use client'

import { Inter } from "next/font/google"
import "./globals.css"
import { MainNav } from '@/components/layout/main-nav'
import { Toaster } from "@/components/ui/toaster"
import { Providers } from './providers'
import Footer from '@/components/layout/footer'
import { HelpWidget } from '@/components/help/help-widget';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#1C1F26] text-white`}>
        <Providers>
          <div className="relative min-h-screen flex flex-col">
            <MainNav />
            <main className="flex-1 container mx-auto px-4">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
          <HelpWidget />
        </Providers>
      </body>
    </html>
  )
}
