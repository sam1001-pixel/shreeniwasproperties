import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { generateDailyExcelReport } from '@/lib/export/daily-report-generator';
import { sendDailyReportEmail } from '@/lib/email/email-service';

export const dynamic = 'force-dynamic';

const BACKUP_FILE = path.join(process.cwd(), 'data', 'admin_backup_store.json');

function readBackupStore(): Record<string, any> {
  try {
    if (fs.existsSync(BACKUP_FILE)) {
      const raw = fs.readFileSync(BACKUP_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('[Daily Report API] Error reading backup store:', err);
  }
  return {};
}

/**
 * GET /api/cron/daily-report
 * Triggered automatically by Vercel Cron or external schedulers.
 */
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    // Optional security check for Vercel Cron
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      const url = new URL(request.url);
      const queryKey = url.searchParams.get('key');
      if (queryKey !== cronSecret) {
        return NextResponse.json({ error: 'Unauthorized cron request' }, { status: 401 });
      }
    }

    const store = readBackupStore();
    const platformSettings = store.shreeniwas_platform_settings || {};

    const targetEmail = process.env.OWNER_EMAIL || platformSettings.contactEmail || 'owner@shreeniwasproperties.com';
    const targetPhone = process.env.OWNER_PHONE || platformSettings.supportPhone || '+916376117833';

    const reportData = generateDailyExcelReport({
      inquiries: store.shreeniwas_inquiries || [],
      visitRecords: store.shreeniwas_property_visit_records || [],
      attendance: store.shreeniwas_admin_attendance || [],
      users: store.shreeniwas_registered_users || [],
      properties: store.shreeniwas_admin_properties || [],
    });

    // Send email with attached Excel
    const emailResult = await sendDailyReportEmail({
      toEmail: targetEmail,
      reportBuffer: reportData.buffer,
      filename: reportData.filename,
      reportDateStr: reportData.reportDateStr,
      stats: reportData.stats,
    });

    const cleanPhone = targetPhone.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(reportData.whatsappSummary)}`;

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      reportDate: reportData.reportDateStr,
      filename: reportData.filename,
      stats: reportData.stats,
      targetEmail,
      targetPhone,
      emailResult,
      whatsappUrl,
    });
  } catch (err: any) {
    console.error('[Daily Report Cron GET] Failed:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to generate and dispatch daily report' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/cron/daily-report
 * Triggered manually from the Super Admin Console for immediate generation & test dispatch.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const store = readBackupStore();
    const platformSettings = store.shreeniwas_platform_settings || {};

    // Allow overriding data from client's active state if provided
    const inquiries = Array.isArray(body.inquiries) ? body.inquiries : (store.shreeniwas_inquiries || []);
    const visitRecords = Array.isArray(body.visitRecords) ? body.visitRecords : (store.shreeniwas_property_visit_records || []);
    const attendance = Array.isArray(body.attendance) ? body.attendance : (store.shreeniwas_admin_attendance || []);
    const users = Array.isArray(body.users) ? body.users : (store.shreeniwas_registered_users || []);
    const properties = Array.isArray(body.properties) ? body.properties : (store.shreeniwas_admin_properties || []);

    const targetEmail = body.targetEmail || process.env.OWNER_EMAIL || platformSettings.contactEmail || 'owner@shreeniwasproperties.com';
    const targetPhone = body.targetPhone || process.env.OWNER_PHONE || platformSettings.supportPhone || '+916376117833';
    const sendEmail = body.sendEmail !== false; // Default true

    const reportData = generateDailyExcelReport({
      inquiries,
      visitRecords,
      attendance,
      users,
      properties,
    });

    let emailResult = null;
    if (sendEmail) {
      emailResult = await sendDailyReportEmail({
        toEmail: targetEmail,
        reportBuffer: reportData.buffer,
        filename: reportData.filename,
        reportDateStr: reportData.reportDateStr,
        stats: reportData.stats,
      });
    }

    const cleanPhone = targetPhone.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(reportData.whatsappSummary)}`;

    // Return base64 buffer so admin UI can also trigger immediate browser download
    const base64Data = reportData.buffer.toString('base64');

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      reportDate: reportData.reportDateStr,
      filename: reportData.filename,
      stats: reportData.stats,
      targetEmail,
      targetPhone,
      emailResult,
      whatsappSummary: reportData.whatsappSummary,
      whatsappUrl,
      excelBase64: base64Data,
    });
  } catch (err: any) {
    console.error('[Daily Report POST] Failed:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to generate daily report' },
      { status: 500 }
    );
  }
}
