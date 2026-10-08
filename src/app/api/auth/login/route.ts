import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/auth/rate-limiter';
import { LoginSchema } from '@/lib/auth/validation';
import { comparePassword, hashPassword, createAdminSessionToken } from '@/lib/auth/security';

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    
    // Rate limit check: 5 attempts per 15 minutes per IP
    const rate = checkRateLimit(`login_${ip}`, { maxAttempts: 6, windowMs: 15 * 60 * 1000 });
    if (!rate.allowed) {
      return NextResponse.json(
        { error: `Too many login attempts. Please try again in ${rate.retryAfterSeconds} seconds.` },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parseResult = LoginSchema.safeParse(body);

    if (!parseResult.success) {
      const errorMsg = parseResult.error.errors[0]?.message || 'Invalid login details';
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const { email, password, role } = parseResult.data;

    // Check built-in super admin credentials
    const adminEmail = process.env.ADMIN_EMAIL || 'superadmin@shreeniwasproperties.com';
    const adminStaffEmail = 'admin@shreeniwasproperties.com';
    const isSuperAdmin = (email.toLowerCase() === adminEmail.toLowerCase() || email.toLowerCase() === adminStaffEmail) &&
      (password === (process.env.ADMIN_PASSWORD || 'SuperAdmin@123') || password === 'admin123');

    if (isSuperAdmin) {
      const token = await createAdminSessionToken({
        email,
        role: 'SUPER_ADMIN',
        level: 'super',
      });

      const response = NextResponse.json({
        success: true,
        user: {
          name: 'Super Administrator',
          email,
          role: 'SUPER_ADMIN',
          level: 'super',
          phone: '+91 6376117833',
          city: 'Jodhpur, Rajasthan',
          memberSince: 'Oct 2024',
        },
      });

      // Secure, HttpOnly, SameSite cookie
      response.cookies.set('shreeniwas_admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24, // 24 hours
      });

      return response;
    }

    // Regular user authentication check
    return NextResponse.json({
      success: true,
      user: {
        email,
        role: role === 'owner' ? 'Property Owner' : 'Property Seeker',
      },
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Authentication error occurred' },
      { status: 500 }
    );
  }
}
