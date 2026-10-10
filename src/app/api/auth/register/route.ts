import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { checkRateLimit } from '@/lib/auth/rate-limiter';
import { RegisterSchema } from '@/lib/auth/validation';
import { hashPassword } from '@/lib/auth/security';
import { findUserByEmail, saveUser } from '@/lib/auth/user-store';

export async function POST(request: Request) {
  try {
    const rawIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
                  request.headers.get('x-real-ip') || 
                  '127.0.0.1';

    // Rate limit check: 5 registrations per 15 minutes per IP
    const rate = checkRateLimit(`register_${rawIp}`, { maxAttempts: 5, windowMs: 15 * 60 * 1000 });
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

    // Check if account already exists
    const existing = await findUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email address already exists. Please sign in.' },
        { status: 400 }
      );
    }

    // Hash password with bcrypt
    const hashedPassword = await hashPassword(password);
    const fullName = `${firstName} ${lastName}`.trim();
    const now = new Date().toISOString();

    const newUser = {
      id: crypto.randomUUID(),
      email: email.trim().toLowerCase(),
      name: fullName,
      phone: phone || '',
      role: role === 'owner' ? 'Property Owner' : 'Property Seeker',
      passwordHash: hashedPassword,
      createdAt: now,
      updatedAt: now,
    };

    await saveUser(newUser);

    return NextResponse.json({
      success: true,
      message: 'Account registered successfully',
      user: {
        name: fullName,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
      },
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Registration error occurred' },
      { status: 500 }
    );
  }
}
