import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/auth/rate-limiter';
import { ResetPasswordSchema } from '@/lib/auth/validation';
import { hashPassword, hashToken } from '@/lib/auth/security';
import { updateUserPassword } from '@/lib/auth/user-store';

const globalResetTokens = (global as any).__resetTokenStore || new Map<string, any>();

export async function POST(request: Request) {
  try {
    const rawIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
                  request.headers.get('x-real-ip') || 
                  '127.0.0.1';

    // Rate limit: 5 attempts per 15 minutes
    const rate = checkRateLimit(`reset_pass_${rawIp}`, { maxAttempts: 5, windowMs: 15 * 60 * 1000 });
    if (!rate.allowed) {
      return NextResponse.json(
        { error: `Too many attempts. Please try again in ${rate.retryAfterSeconds} seconds.` },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parseResult = ResetPasswordSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.errors[0]?.message || 'Invalid password reset submission' },
        { status: 400 }
      );
    }

    const { token, password } = parseResult.data;
    const hashed = hashToken(token);

    const record = globalResetTokens.get(hashed);

    // Validate token exists, not expired, and not already used
    if (!record) {
      return NextResponse.json(
        { error: 'Invalid or unrecognized reset token. Please request a new link.' },
        { status: 400 }
      );
    }

    if (Date.now() > record.expiresAt) {
      globalResetTokens.delete(hashed);
      return NextResponse.json(
        { error: 'Password reset link has expired. Please request a new link.' },
        { status: 400 }
      );
    }

    if (record.used) {
      return NextResponse.json(
        { error: 'This password reset link has already been used.' },
        { status: 400 }
      );
    }

    // Mark as used immediately to prevent replay attacks
    record.used = true;
    globalResetTokens.set(hashed, record);

    // Hash the new password using bcrypt
    const hashedPassword = await hashPassword(password);

    // Persist new password into the database / user store
    await updateUserPassword(record.email, hashedPassword);

    return NextResponse.json({
      success: true,
      message: 'Password has been reset successfully. Please sign in with your new password.',
      email: record.email,
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Error occurred while resetting password' },
      { status: 500 }
    );
  }
}
