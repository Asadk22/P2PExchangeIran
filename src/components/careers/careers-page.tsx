"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { Heart, Users, Coffee, Building2, Code, HeartHandshake } from "lucide-react"

const benefits = [
  {
    icon: Heart,
    title: "Health insurance package",
    description: "We take care of our team with comprehensive health coverage including medical, dental, and vision insurance."
  },
  {
    icon: Users,
    title: "We're a global team",
    description: "Work with talented individuals from around the world. Our diverse team brings unique perspectives and ideas."
  },
  {
    icon: Coffee,
    title: "Work life balance",
    description: "Flexible working hours, remote work options, and generous time off to help you maintain a healthy work-life balance."
  },
  {
    icon: Building2,
    title: "Modern office space",
    description: "State-of-the-art facilities designed for collaboration and innovation, with all the amenities you need."
  },
  {
    icon: Code,
    title: "Latest tech stack",
    description: "Work with cutting-edge technologies and tools to solve challenging problems in the fintech space."
  },
  {
    icon: HeartHandshake,
    title: "Learning & Development",
    description: "Continuous learning opportunities through workshops, conferences, and professional development programs."
  }
]

const departments = [
  {
    title: "Engineering",
    positions: [
      "Senior Frontend Developer",
      "Backend Engineer",
      "DevOps Engineer",
      "Mobile Developer"
    ]
  },
  {
    title: "Design",
    positions: [
      "UI/UX Designer",
      "Product Designer",
      "Visual Designer"
    ]
  },
  {
    title: "Product & Business",
    positions: [
      "Product Manager",
      "Business Development",
      "Market Analyst"
    ]
  },
  {
    title: "Customer Support",
    positions: [
      "Customer Success Manager",
      "Support Specialist",
      "Technical Support"
    ]
  },
  {
    title: "Marketing",
    positions: [
      "Digital Marketing Manager",
      "Content Writer",
      "Social Media Specialist"
    ]
  },
  {
    title: "Legal & Compliance",
    positions: [
      "Compliance Officer",
      "Legal Counsel",
      "Risk Analyst"
    ]
  }
]

export default function CareersPage() {
  return (
    <div className="flex-1 space-y-16 py-12">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <Image
          src="/careers-hero.svg"
          alt="Join our team"
          fill
          className="object-cover brightness-50"
        />
        <div className="container relative h-full flex flex-col justify-center items-center text-center text-white space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">Join the family</h1>
          <p className="text-xl max-w-2xl">
            Help us build the future of P2P currency exchange. We're looking for talented 
            individuals who share our passion for innovation and excellence.
          </p>
          <Button size="lg" className="bg-[#D1F366] text-black hover:bg-[#bfdd5d]">
            View Open Positions
          </Button>
        </div>
      </section>

      {/* What it's like Section */}
      <section className="container">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">What's it like to work with us?</h2>
          <p className="text-lg text-muted-foreground">
            We're building a team of passionate individuals who want to make a difference 
            in the world of finance. Our culture is built on trust, innovation, and 
            collaboration.
          </p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="container">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">Our mission</h2>
          <p className="text-lg text-muted-foreground">
            We're on a mission to make currency exchange accessible to everyone, everywhere. 
            We believe in creating a more inclusive financial system that serves people 
            from all walks of life.
          </p>
          <div className="aspect-video relative rounded-lg overflow-hidden">
            <Image
              src="/office-culture.svg"
              alt="Our office culture"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container">
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center">We've got you covered</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6 space-y-4">
                <benefit.icon className="h-8 w-8 text-[#D1F366]" />
                <h3 className="text-xl font-semibold">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="container">
        <div className="space-y-8">
          <h2 className="text-3xl font-bold">Department openings</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-semibold mb-4">{dept.title}</h3>
                <ul className="space-y-2">
                  {dept.positions.map((position, posIndex) => (
                    <li key={posIndex}>
                      <Button variant="link" className="p-0 h-auto text-left">
                        {position}
                      </Button>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How to Join Section */}
      <section className="container">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">How to join the family</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="aspect-square relative max-w-[200px] mx-auto">
                <Image
                  src="/apply-step-1.svg"
                  alt="Submit your application"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-semibold">Submit your application</h3>
            </div>
            <div className="text-center space-y-4">
              <div className="aspect-square relative max-w-[200px] mx-auto">
                <Image
                  src="/apply-step-2.svg"
                  alt="Prepare for a call"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-semibold">Prepare for a call</h3>
            </div>
            <div className="text-center space-y-4">
              <div className="aspect-square relative max-w-[200px] mx-auto">
                <Image
                  src="/apply-step-3.svg"
                  alt="Get hired"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-semibold">Get hired!</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Interview Process Section */}
      <section className="container">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold text-center">How do we run your interview?</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="h-8 w-8 rounded-full bg-[#D1F366] flex items-center justify-center">
                <span className="font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Initial Chat</h3>
                <p className="text-muted-foreground">
                  A brief conversation to get to know you and understand your interests and experience.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-8 w-8 rounded-full bg-[#D1F366] flex items-center justify-center">
                <span className="font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Technical Assessment</h3>
                <p className="text-muted-foreground">
                  Demonstrate your skills through practical exercises relevant to your role.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-8 w-8 rounded-full bg-[#D1F366] flex items-center justify-center">
                <span className="font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Team Interview</h3>
                <p className="text-muted-foreground">
                  Meet your potential teammates and learn more about our culture and work environment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Culture Gallery */}
      <section className="container">
        <h2 className="text-3xl font-bold mb-8">Life at Our Company</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-square relative rounded-lg overflow-hidden">
              <Image
                src={`/culture-${i}.svg`}
                alt={`Office culture ${i}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
