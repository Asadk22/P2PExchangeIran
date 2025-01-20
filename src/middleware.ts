import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default withAuth(
  async function middleware(req: NextRequest) {
    // Public paths that don't require authentication
    const publicPaths = ['/auth/signin', '/auth/signup', '/'];
    const isPublicPath = publicPaths.some(path => req.nextUrl.pathname.startsWith(path));

    if (isPublicPath) {
      return NextResponse.next();
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ token }) {
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    '/trades/:path*',
    '/dashboard/:path*',
    '/disputes/:path*',
    '/admin/:path*',
    '/api/trades/:path*',
    '/api/disputes/:path*',
    '/api/users/:path*',
  ],
};
