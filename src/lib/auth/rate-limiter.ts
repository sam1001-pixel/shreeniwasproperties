interface RateLimitRecord {
  count: number;
  resetAt: number;
}

// In-memory token bucket cache per identifier (IP or email)
const rateLimitMap = new Map<string, RateLimitRecord>();

/**
 * Clean up expired rate limits periodically
 */
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitMap.entries()) {
    if (now > record.resetAt) {
      rateLimitMap.delete(key);
    }
  }
}, 60 * 1000);

export interface RateLimitOptions {
  windowMs?: number; // window duration in ms (default: 15 mins)
  maxAttempts?: number; // max allowed requests within window (default: 5)
}

/**
 * Check if the given identifier has exceeded rate limits.
 * Returns { allowed: boolean, remaining: number, retryAfterSeconds: number }
 */
export function checkRateLimit(
  key: string,
  options: RateLimitOptions = {}
): { allowed: boolean; remaining: number; retryAfterSeconds: number } {
  const windowMs = options.windowMs || 15 * 60 * 1000;
  const maxAttempts = options.maxAttempts || 5;
  const now = Date.now();

  const current = rateLimitMap.get(key);

  if (!current || now > current.resetAt) {
    rateLimitMap.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });
    return {
      allowed: true,
      remaining: maxAttempts - 1,
      retryAfterSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (current.count >= maxAttempts) {
    const retryAfterSeconds = Math.max(1, Math.ceil((current.resetAt - now) / 1000));
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds,
    };
  }

  current.count += 1;
  return {
    allowed: true,
    remaining: maxAttempts - current.count,
    retryAfterSeconds: Math.ceil((current.resetAt - now) / 1000),
  };
}
