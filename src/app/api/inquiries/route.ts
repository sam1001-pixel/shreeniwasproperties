import { NextResponse } from 'next/server';
import { z } from 'zod';
import { checkRateLimit } from '@/lib/auth/rate-limiter';

// Anti-XSS and Input Sanitization Schema
const InquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(80).trim(),
  email: z.string().email('Invalid email address').max(100).trim(),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').max(15).trim(),
  topic: z.string().max(100).default('Rent Inquiry'),
  message: z.string().min(5, 'Message must be at least 5 characters').max(1000).trim(),
});

function sanitizeHtml(str: string): string {
  return str.replace(/[<>]/g, '');
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';

    // Rate Limiting: Max 5 inquiries per 10 minutes per IP
    const rate = checkRateLimit(`inquiry_${ip}`, { maxAttempts: 5, windowMs: 10 * 60 * 1000 });
    if (!rate.allowed) {
      return NextResponse.json(
        { error: `Too many submissions. Please wait ${rate.retryAfterSeconds} seconds before trying again.` },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = InquirySchema.safeParse(body);

    if (!result.success) {
      const errorMsg = result.error.errors[0]?.message || 'Invalid form data';
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const data = result.data;
    const sanitizedRecord = {
      id: `INQ-${Date.now().toString().slice(-6)}`,
      name: sanitizeHtml(data.name),
      email: sanitizeHtml(data.email),
      phone: sanitizeHtml(data.phone),
      topic: sanitizeHtml(data.topic),
      message: sanitizeHtml(data.message),
      createdAt: new Date().toISOString(),
      status: 'Pending',
    };

    return NextResponse.json({
      success: true,
      message: 'Inquiry received securely. An advisor will connect with you shortly.',
      inquiry: sanitizedRecord,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Server error occurred' },
      { status: 500 }
    );
  }
}
