import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/auth/rate-limiter';
import { ForgotPasswordSchema } from '@/lib/auth/validation';
import { generateSecureToken, hashToken } from '@/lib/auth/security';

// In-memory token store for demonstration / local persistence
// Structure: hashedToken -> { email: string, expiresAt: number, used: boolean }
export interface ResetTokenRecord {
  email: string;
  expiresAt: number;
  used: boolean;
  plainTokenForPreview?: string; // only provided in non-production preview for testing
}

// Global variable across API requests in Node runtime
const globalResetTokens = (global as any).__resetTokenStore || new Map<string, ResetTokenRecord>();
(global as any).__resetTokenStore = globalResetTokens;

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';

    // Rate limit: 3 requests per 15 minutes per IP to prevent spam
    const rate = checkRateLimit(`forgot_pass_${ip}`, { maxAttempts: 3, windowMs: 15 * 60 * 1000 });
    if (!rate.allowed) {
      return NextResponse.json(
        { error: `Too many password reset requests. Please retry in ${rate.retryAfterSeconds} seconds.` },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parseResult = ForgotPasswordSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.errors[0]?.message || 'Invalid email address' },
        { status: 400 }
      );
    }

    const { email } = parseResult.data;

    // Generate cryptographically secure token with 15-minute TTL
    const rawToken = generateSecureToken();
    const hashed = hashToken(rawToken);
    const ttlMs = 15 * 60 * 1000;
    const expiresAt = Date.now() + ttlMs;

    // Store hashed token (anti-tamper single-use)
    globalResetTokens.set(hashed, {
      email,
      expiresAt,
      used: false,
      plainTokenForPreview: rawToken,
    });

    const resetLink = `/reset-password?token=${rawToken}&email=${encodeURIComponent(email)}`;

    // Generic response to avoid user enumeration
    return NextResponse.json({
      success: true,
      message: 'If an account exists with this email address, a password reset link has been dispatched.',
      previewResetLink: resetLink, // Dev convenience preview
      expiresInMinutes: 15,
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to process password reset request' },
      { status: 500 }
    );
  }
}
