import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/auth/rate-limiter';
import { ForgotPasswordSchema } from '@/lib/auth/validation';
import { generateSecureToken, hashToken } from '@/lib/auth/security';
import { sendPasswordResetEmail } from '@/lib/email/email-service';

export interface ResetTokenRecord {
  email: string;
  expiresAt: number;
  used: boolean;
}

// Global variable across API requests in Node runtime
const globalResetTokens = (global as any).__resetTokenStore || new Map<string, ResetTokenRecord>();
(global as any).__resetTokenStore = globalResetTokens;

/**
 * Validates and resolves a strictly trusted production or local site origin.
 * Defends against Host Header Injection and Password Reset Poisoning attacks.
 */
function getTrustedSiteOrigin(request: Request): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
  if (envUrl && (envUrl.startsWith('https://') || (process.env.NODE_ENV !== 'production' && envUrl.startsWith('http://')))) {
    return envUrl.replace(/\/$/, '');
  }

  const ALLOWED_HOSTS = new Set([
    'www.shreeniwasproperties.in',
    'shreeniwasproperties.in',
    'shreeniwasproperties-pi.vercel.app',
    'localhost:3000',
    '127.0.0.1:3000',
  ]);

  const rawHost = (request.headers.get('host') || '').trim().toLowerCase();
  if (ALLOWED_HOSTS.has(rawHost)) {
    const isLocal = rawHost.includes('localhost') || rawHost.includes('127.0.0.1');
    const proto = isLocal ? 'http' : 'https';
    return `${proto}://${rawHost}`;
  }

  // Canonical fallback prevents hostile injection
  return 'https://www.shreeniwasproperties.in';
}

export async function POST(request: Request) {
  try {
    const rawIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
                  request.headers.get('x-real-ip') || 
                  '127.0.0.1';

    // Rate limit: 3 requests per 15 minutes per IP to prevent spam
    const rate = checkRateLimit(`forgot_pass_${rawIp}`, { maxAttempts: 3, windowMs: 15 * 60 * 1000 });
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
    });

    // Resolve trusted site origin (Host Header Injection defended)
    const siteOrigin = getTrustedSiteOrigin(request);
    const absoluteResetLink = `${siteOrigin}/reset-password?token=${rawToken}&email=${encodeURIComponent(email)}`;

    // Dispatch email to recipient
    await sendPasswordResetEmail({
      toEmail: email,
      resetLink: absoluteResetLink,
      expiresInMinutes: 15,
    });

    // Generic response to avoid user enumeration
    return NextResponse.json({
      success: true,
      message: 'If an account exists with this email address, a password reset link has been dispatched to your Gmail / email inbox.',
      expiresInMinutes: 15,
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to process password reset request' },
      { status: 500 }
    );
  }
}
