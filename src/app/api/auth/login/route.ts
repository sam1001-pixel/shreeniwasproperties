import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/auth/rate-limiter';
import { LoginSchema } from '@/lib/auth/validation';
import { comparePassword, createAdminSessionToken } from '@/lib/auth/security';
import { findUserByEmail } from '@/lib/auth/user-store';

export async function POST(request: Request) {
  try {
    const rawIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
                  request.headers.get('x-real-ip') || 
                  '127.0.0.1';
    
    // Rate limit check: 5 attempts per 15 minutes per IP
    const rate = checkRateLimit(`login_${rawIp}`, { maxAttempts: 6, windowMs: 15 * 60 * 1000 });
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
    const normalizedEmail = email.toLowerCase().trim();

    // -------------------------------------------------------------------------
    // 1. Administrator Authentication
    // -------------------------------------------------------------------------
    const adminEmail = (process.env.ADMIN_EMAIL || 'superadmin@shreeniwasproperties.com').toLowerCase();
    const staffEmail = (process.env.STAFF_ADMIN_EMAIL || 'admin@shreeniwasproperties.com').toLowerCase();

    const isTargetingAdmin = normalizedEmail === adminEmail || normalizedEmail === staffEmail;

    if (isTargetingAdmin) {
      const isSuper = normalizedEmail === adminEmail;
      const targetPass = isSuper
        ? process.env.ADMIN_PASSWORD
        : (process.env.STAFF_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD);
      const targetHash = isSuper
        ? process.env.ADMIN_PASSWORD_HASH
        : (process.env.STAFF_ADMIN_PASSWORD_HASH || process.env.ADMIN_PASSWORD_HASH);

      if (!targetPass && !targetHash) {
        console.error('[Security ALERT] ADMIN_PASSWORD or ADMIN_PASSWORD_HASH is not configured in environment.');
        return NextResponse.json(
          { error: 'Administrator authentication is not properly configured. Contact system owner.' },
          { status: 500 }
        );
      }

      // Check password using timing-safe comparison
      let adminAuthPassed = false;
      if (targetHash) {
        adminAuthPassed = await comparePassword(password, targetHash);
      } else if (targetPass) {
        adminAuthPassed = await comparePassword(password, targetPass);
      }

      if (adminAuthPassed) {
        const isSuper = normalizedEmail === adminEmail;
        const token = await createAdminSessionToken({
          email: normalizedEmail,
          role: isSuper ? 'SUPER_ADMIN' : 'STAFF_ADMIN',
          level: isSuper ? 'super' : 'staff',
        });

        const response = NextResponse.json({
          success: true,
          user: {
            name: isSuper ? 'Super Administrator' : 'Staff Administrator',
            email: normalizedEmail,
            role: isSuper ? 'SUPER_ADMIN' : 'STAFF_ADMIN',
            level: isSuper ? 'super' : 'staff',
            phone: '+91 6376117833',
            city: 'Jodhpur, Rajasthan',
            memberSince: 'Oct 2024',
          },
        });

        // Set secure, HttpOnly session cookie
        response.cookies.set('shreeniwas_admin_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 60 * 60 * 24, // 24 hours
        });

        return response;
      }

      return NextResponse.json(
        { error: 'Invalid administrator email or password.' },
        { status: 401 }
      );
    }

    // -------------------------------------------------------------------------
    // 2. Regular User Authentication (Verified against persistent store)
    // -------------------------------------------------------------------------
    const existingUser = await findUserByEmail(normalizedEmail);

    if (!existingUser) {
      return NextResponse.json(
        { error: 'No account found with this email. Please check your credentials or register.' },
        { status: 401 }
      );
    }

    const passwordMatches = await comparePassword(password, existingUser.passwordHash);
    if (!passwordMatches) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        phone: existingUser.phone,
        role: existingUser.role || (role === 'owner' ? 'Property Owner' : 'Property Seeker'),
      },
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Authentication error occurred' },
      { status: 500 }
    );
  }
}
