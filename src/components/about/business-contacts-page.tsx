"use client"

import { Card } from "@/components/ui/card"
import Image from "next/image"

const coreValues = [
  {
    title: "We build the foundation of the next digital economy",
    description: "Our mission is to accelerate the future of P2P finance and create a more inclusive global economy for everyone. We're building a world where you can share value as easily as information, and we're starting with making it simple to buy and sell digital currencies."
  },
  {
    title: "We never compromise on security",
    description: "The safety and security of our users is our number one priority, and we're committed to providing the highest level of protection for their assets and personal information. We employ state-of-the-art security measures and constantly update our systems."
  },
  {
    title: "We rigorously protect the best price",
    description: "We believe that everyone should have access to fair and competitive exchange rates. Our platform ensures transparency in pricing and helps users find the best rates available in the market, while maintaining the highest standards of security."
  },
  {
    title: "We facilitate global economic fair process trading fairly",
    description: "We're committed to creating a level playing field for all users, regardless of their location or background. Our platform promotes fair trading practices and helps bridge the gap between different currencies and economies."
  }
]

const teamMembers = [
  {
    name: "Sarah Chen",
    role: "Chief Executive Officer",
    image: "/team/ceo.jpg"
  },
  {
    name: "Michael Roberts",
    role: "Chief Technology Officer",
    image: "/team/cto.jpg"
  },
  {
    name: "Emily Thompson",
    role: "Head of Global Operations",
    image: "/team/operations.jpg"
  },
  {
    name: "David Kim",
    role: "Chief Security Officer",
    image: "/team/security.jpg"
  },
  {
    name: "Maria Garcia",
    role: "Head of Customer Experience",
    image: "/team/customer.jpg"
  }
]

export default function BusinessContactsPage() {
  return (
    <div className="flex-1 space-y-16 py-12">
      {/* Hero Section */}
      <section className="container text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          We are the world's largest people-powered marketplace
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Empowering millions of users worldwide with secure and fair currency exchange
        </p>
      </section>

      {/* Core Values Section */}
      <section className="container">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Core Values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {coreValues.map((value, index) => (
              <Card key={index} className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="container">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Meet the team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Our team is dedicated to creating a safe, fast, and simple currency exchange experience. 
              Meet the people behind our mission to revolutionize P2P trading.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="group relative">
                <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="mt-4 space-y-1">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is Our Platform Section */}
      <section className="container bg-black text-white rounded-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">What is Our Platform?</h2>
            <p className="text-lg text-gray-300">
              We're building the future of currency exchange, where anyone can safely and easily 
              trade currencies peer-to-peer. Our platform connects buyers and sellers directly, 
              providing the best rates and fastest transactions.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-[#D1F366] flex items-center justify-center">
                  <span className="text-black font-bold">1M+</span>
                </div>
                <p>Active users worldwide</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-[#D1F366] flex items-center justify-center">
                  <span className="text-black font-bold">350+</span>
                </div>
                <p>Payment methods supported</p>
              </div>
            </div>
          </div>
          <div className="relative h-[400px]">
            <Image
              src="/platform-preview.png"
              alt="Platform Preview"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="container">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-bold">Get in Touch</h2>
          <p className="text-lg text-muted-foreground">
            Have questions about our platform or interested in partnership opportunities? 
            Our team is here to help.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Business Inquiries</h3>
              <p className="text-muted-foreground">business@yourplatform.com</p>
            </Card>
            <Card className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Press Contact</h3>
              <p className="text-muted-foreground">press@yourplatform.com</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
