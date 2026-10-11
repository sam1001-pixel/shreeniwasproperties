import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { SignJWT, jwtVerify } from 'jose';

const SALT_ROUNDS = 10;

/**
 * Hash password securely using bcrypt
 */
export async function hashPassword(plainText: string): Promise<string> {
  return bcrypt.hash(plainText, SALT_ROUNDS);
}

/**
 * Compare plain text password against bcrypt hash safely
 */
export async function comparePassword(plainText: string, hashed: string): Promise<boolean> {
  if (!hashed) return false;
  // If password was stored in plain text legacy, safely verify & allow
  if (!hashed.startsWith('$2a$') && !hashed.startsWith('$2b$')) {
    return plainText === hashed;
  }
  return bcrypt.compare(plainText, hashed);
}

/**
 * Generate cryptographically secure random token (64 hex characters)
 */
export function generateSecureToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Hash token using SHA-256 for secure DB storage (protects tokens if DB is leaked)
 */
export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

/**
 * Retrieve deployment-managed JWT Secret.
 * Never defaults to a predictable hardcoded string.
 * Fails closed in production if unset.
 */
export function getJwtSecretKey(): Uint8Array {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('[Security] FATAL: ADMIN_JWT_SECRET environment variable is not configured in production.');
    }
    // In local development, use an ephemeral generated secret so it is never a static predictable string
    if (!(global as any).__dev_ephemeral_jwt_secret) {
      console.warn('[Security WARNING] ADMIN_JWT_SECRET is unset. Using a temporary ephemeral secret for local development.');
      (global as any).__dev_ephemeral_jwt_secret = crypto.randomBytes(32).toString('hex');
    }
    return new TextEncoder().encode((global as any).__dev_ephemeral_jwt_secret);
  }
  return new TextEncoder().encode(secret);
}

/**
 * Sign an encrypted, tamper-proof session JWT for Admin access
 */
export async function createAdminSessionToken(payload: { email: string; role: string; level: string }): Promise<string> {
  const secretKey = getJwtSecretKey();
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secretKey);
}

/**
 * Verify session JWT against deployment secret
 */
export async function verifyAdminSessionToken(token: string) {
  try {
    const secretKey = getJwtSecretKey();
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (e) {
    return null;
  }
}

/**
 * Server-side helper to extract and verify admin claims from an incoming Request
 * Supports both HttpOnly cookie ('shreeniwas_admin_token') and 'Authorization: Bearer <token>'
 */
export async function getAdminSession(request: Request): Promise<{ email: string; role: string; level?: string } | null> {
  try {
    // 1. Check Authorization: Bearer <token>
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
      const bearerToken = authHeader.substring(7).trim();
      const payload = await verifyAdminSessionToken(bearerToken);
      if (payload && (payload.role === 'SUPER_ADMIN' || payload.role === 'STAFF_ADMIN' || payload.role === 'admin' || payload.role === 'ADMIN')) {
        return payload as any;
      }
    }

    // 2. Check Cookie header
    const cookieHeader = request.headers.get('cookie') || '';
    const match = cookieHeader.match(/shreeniwas_admin_token=([^;]+)/);
    if (match && match[1]) {
      const cookieToken = decodeURIComponent(match[1]);
      const payload = await verifyAdminSessionToken(cookieToken);
      if (payload && (payload.role === 'SUPER_ADMIN' || payload.role === 'STAFF_ADMIN' || payload.role === 'admin' || payload.role === 'ADMIN')) {
        return payload as any;
      }
    }
  } catch (err) {
    console.warn('[Security] Admin session extraction error:', err);
  }
  return null;
}
