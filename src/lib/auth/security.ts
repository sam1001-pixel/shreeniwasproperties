import bcrypt from 'bcryptjs';
import crypto from 'crypto';

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
