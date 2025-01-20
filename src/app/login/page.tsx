'use client';

import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  useEffect(() => {
    const message = searchParams?.get('message');
    if (message) {
      toast({
        title: 'Success',
        description: message,
      });
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      if (!email || !password) {
        setError('Please enter both email and password');
        return;
      }

      console.log('Starting login attempt...');
      const res = await signIn('credentials', {
        email: email.toLowerCase(),
        password,
        redirect: false,
        callbackUrl: '/',
      });

      console.log('Login response:', JSON.stringify(res, null, 2));

      if (!res) {
        setError('No response from authentication server');
        return;
      }

      if (res.error) {
        console.error('Login error:', res.error);
        setError(res.error);
        return;
      }

      if (!res.ok) {
        setError('Authentication failed');
        return;
      }

      console.log('Login successful, redirecting...');
      router.push('/');
      router.refresh();
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-white">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-white/60">
          Sign in to your account to continue
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/10 backdrop-blur-lg py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 text-red-500 p-3 rounded text-sm">
                {error}
              </div>
            )}

            <div>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="name@example.com"
                className="bg-white/20 border-white/10 text-white placeholder:text-white/60"
              />
            </div>

            <div>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
                className="bg-white/20 border-white/10 text-white placeholder:text-white/60"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox 
                  id="remember"
                  name="remember"
                  className="border-white/20 data-[state=checked]:bg-white data-[state=checked]:border-white"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-white">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-white hover:text-white/80">
                  Forgot password?
                </Link>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-white text-purple-600 hover:bg-white/90"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-white/60 bg-transparent">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Button
                onClick={() => signIn('google')}
                type="button"
                className="w-full bg-white text-gray-800 hover:bg-white/90 flex items-center justify-center gap-2"
                disabled={loading}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </Button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <div className="text-sm text-gray-500">
              Don't have an account?{' '}
              <Link href="/register" className="text-primary hover:underline">
                Register here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
