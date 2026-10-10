import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

function getMiddlewareJwtSecret(): Uint8Array | null {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      console.error('[Security ALERT] ADMIN_JWT_SECRET is missing in production environment.');
      return null;
    }
    // In development only, require setting in .env.local or fallback to dev-only string
    return new TextEncoder().encode('dev_local_only_secret_key_change_in_production');
  }
  return new TextEncoder().encode(secret);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect internal Admin Dashboard Routes (redirect to /admin portal)
  if (pathname.startsWith('/dashboard/admin')) {
    const token = request.cookies.get('shreeniwas_admin_token')?.value;

    if (!token) {
      const adminUrl = new URL('/admin', request.url);
      return NextResponse.redirect(adminUrl);
    }

    const secretKey = getMiddlewareJwtSecret();
    if (!secretKey) {
      const response = NextResponse.redirect(new URL('/admin?error=auth_unconfigured', request.url));
      response.cookies.delete('shreeniwas_admin_token');
      return response;
    }

    try {
      const { payload } = await jwtVerify(token, secretKey);
      if (!payload || !payload.role) {
        throw new Error('Invalid token');
      }
    } catch (err) {
      const response = NextResponse.redirect(new URL('/admin?error=session_expired', request.url));
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
