'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const username = formData.get('username') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string
    const terms = formData.get('terms')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (!terms) {
      setError('Please accept the terms and conditions')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      router.push('/login?registered=true')
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen gradient-bg flex flex-col justify-center">
      <div className="container relative">
        <div className="mx-auto max-w-[500px] relative z-20">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Create your account
              </h1>
              <p className="text-muted-100 text-white/60">
                Join the largest P2P cryptocurrency marketplace in Iran
              </p>
            </div>

            <div className="glass-effect p-8 rounded-xl">
              <div className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      id="email"
                      placeholder="name@example.com"
                      type="email"
                      name="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      required
                      className="h-12 px-4 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      id="username"
                      placeholder="Choose a username"
                      type="text"
                      name="username"
                      autoCapitalize="none"
                      autoComplete="username"
                      required
                      className="h-12 px-4 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      id="password"
                      placeholder="Create a password"
                      type="password"
                      name="password"
                      autoComplete="new-password"
                      required
                      className="h-12 px-4 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      id="confirmPassword"
                      placeholder="Confirm password"
                      type="password"
                      name="confirmPassword"
                      autoComplete="new-password"
                      required
                      className="h-12 px-4 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" name="terms" className="border-white/20 data-[state=checked]:bg-primary" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none text-white/70"
                    >
                      I agree to the{' '}
                      <Link href="/terms" className="text-white hover:underline">
                        terms and conditions
                      </Link>
                    </label>
                  </div>

                  {error && (
                    <div className="text-sm text-red-400 bg-red-500/10 p-3 rounded-lg text-center">
                      {error}
                    </div>
                  )}

                  <Button 
                    disabled={loading}
                    className="w-full h-12 text-base font-medium hover-scale"
                  >
                    {loading ? 'Creating account...' : 'Create account'}
                  </Button>

                  <p className="text-center text-sm text-white/60">
                    By creating an account, you agree to our{' '}
                    <Link href="/terms" className="text-white hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-white hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-transparent px-2 text-white/40">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid gap-3">
                  <Button 
                    variant="outline" 
                    className="h-12 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white hover-scale"
                  >
                    <svg
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="google"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 488 512"
                    >
                      <path
                        fill="currentColor"
                        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                      ></path>
                    </svg>
                    Continue with Google
                  </Button>
                </div>
              </div>
            </div>

            <p className="text-center text-sm text-white/60">
              Already have an account?{' '}
              <Link
                href="/login"
                className="underline underline-offset-4 hover:text-white transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-20">
          <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
          <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
        </div>
      </div>
    </div>
  )
}
