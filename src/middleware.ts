import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'shreeniwas_secure_master_jwt_secret_key_2026_jodhpur'
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect Admin Routes and Admin API Routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/dashboard/admin')) {
    const token = request.cookies.get('shreeniwas_admin_token')?.value;

    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      loginUrl.searchParams.set('error', 'unauthorized');
      return NextResponse.redirect(loginUrl);
    }

    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      if (!payload || !payload.role) {
        throw new Error('Invalid token');
      }
    } catch (err) {
      const response = NextResponse.redirect(new URL('/login?error=session_expired', request.url));
      response.cookies.delete('shreeniwas_admin_token');
      return response;
    }
  }

  // Defend against path traversal / malicious URL probe attacks
  if (
    pathname.includes('..') ||
    pathname.includes('//') ||
    pathname.includes('.env') ||
    pathname.includes('.git') ||
    pathname.includes('.php')
  ) {
    return new NextResponse('Bad Request', { status: 400 });
  }

  const response = NextResponse.next();

  // Edge security response headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/admin/:path*',
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
