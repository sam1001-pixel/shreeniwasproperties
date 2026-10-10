import { NextResponse } from 'next/server';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import { checkRateLimit, extractClientIp } from '@/lib/auth/rate-limiter';

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

const BACKUP_FILE = path.join(process.cwd(), 'data', 'admin_backup_store.json');
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function POST(request: Request) {
  try {
    const clientIp = extractClientIp(request);

    // Rate Limiting: Max 5 inquiries per 10 minutes per IP
    const rate = checkRateLimit(`inquiry_${clientIp}`, { maxAttempts: 5, windowMs: 10 * 60 * 1000 });
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
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      createdAt: new Date().toISOString(),
      status: 'Pending',
    };

    // 1. Persist inquiry into admin backup store
    try {
      const dir = path.dirname(BACKUP_FILE);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      let store: Record<string, any> = {};
      if (fs.existsSync(BACKUP_FILE)) {
        store = JSON.parse(fs.readFileSync(BACKUP_FILE, 'utf-8'));
      }
      const existingInquiries = Array.isArray(store.shreeniwas_inquiries) ? store.shreeniwas_inquiries : [];
      store.shreeniwas_inquiries = [sanitizedRecord, ...existingInquiries];
      fs.writeFileSync(BACKUP_FILE, JSON.stringify(store, null, 2), 'utf-8');
    } catch (err) {
      console.warn('[Inquiries POST] Error saving to backup file:', err);
    }

    // 2. Persist to Supabase if configured
    if (SUPABASE_URL && SUPABASE_KEY) {
      try {
        await fetch(`${SUPABASE_URL}/rest/v1/inquiries`, {
          method: 'POST',
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            full_name: sanitizedRecord.name,
            email: sanitizedRecord.email,
            phone: sanitizedRecord.phone,
            message: `${sanitizedRecord.topic}: ${sanitizedRecord.message}`,
            inquiry_type: 'general',
            status: 'new',
          }),
        });
      } catch (err) {
        console.warn('[Inquiries POST] Error saving to Supabase:', err);
      }
    }

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
