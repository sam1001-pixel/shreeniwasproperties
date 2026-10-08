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
 * Compare plain text password against bcrypt hash
 */
export async function comparePassword(plainText: string, hashed: string): Promise<boolean> {
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

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'shreeniwas_secure_master_jwt_secret_key_2026_jodhpur'
);

/**
 * Sign an encrypted, tamper-proof session JWT for Admin access
 */
export async function createAdminSessionToken(payload: { email: string; role: string; level: string }): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);
}

/**
 * Verify session JWT
 */
export async function verifyAdminSessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (e) {
    return null;
  }
}
