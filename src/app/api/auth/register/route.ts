import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/auth/rate-limiter';
import { RegisterSchema } from '@/lib/auth/validation';
import { hashPassword } from '@/lib/auth/security';

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';

    // Rate limit check: 5 registrations per 15 minutes per IP
    const rate = checkRateLimit(`register_${ip}`, { maxAttempts: 5, windowMs: 15 * 60 * 1000 });
    if (!rate.allowed) {
      return NextResponse.json(
        { error: `Too many registration attempts. Please try again in ${rate.retryAfterSeconds} seconds.` },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parseResult = RegisterSchema.safeParse(body);

    if (!parseResult.success) {
      const errorMsg = parseResult.error.errors[0]?.message || 'Invalid registration details';
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const { firstName, lastName, email, phone, password, role } = parseResult.data;

    // Hash password with bcrypt
    const hashedPassword = await hashPassword(password);
    const fullName = `${firstName} ${lastName}`.trim();

    return NextResponse.json({
      success: true,
      message: 'Account registered successfully',
      user: {
        name: fullName,
        email,
        phone,
        role: role === 'owner' ? 'Property Owner' : 'Property Seeker',
      },
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Registration error occurred' },
      { status: 500 }
    );
  }
}
