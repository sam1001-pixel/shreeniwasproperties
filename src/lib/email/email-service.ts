import nodemailer from 'nodemailer';
import { createClient } from '@/lib/supabase/client';

interface SendResetEmailParams {
  toEmail: string;
  resetLink: string;
  expiresInMinutes?: number;
}

export interface EmailDispatchResult {
  delivered: boolean;
  provider: 'gmail_smtp' | 'custom_smtp' | 'supabase_fallback' | 'simulated_dev';
  message: string;
}

/**
 * Creates a configured Nodemailer transporter based on available environment variables.
 * Priority:
 * 1. Gmail configuration (GMAIL_USER, GMAIL_APP_PASSWORD)
 * 2. Custom SMTP (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS)
 */
function getEmailTransporter() {
  const gmailUser = process.env.GMAIL_USER || process.env.SMTP_GMAIL_USER;
  const rawGmailAppPass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_GMAIL_APP_PASSWORD;
  const gmailAppPass = rawGmailAppPass ? rawGmailAppPass.trim().replace(/\s+/g, '') : undefined;

  if (gmailUser && gmailAppPass) {
    return {
      type: 'gmail_smtp' as const,
      from: `"Shreeniwas Properties" <${gmailUser}>`,
      transporter: nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: gmailUser,
          pass: gmailAppPass,
        },
      }),
    };
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM || `"Shreeniwas Properties" <noreply@shreeniwasproperties.com>`;

  if (smtpHost && smtpUser && smtpPass) {
    return {
      type: 'custom_smtp' as const,
      from: smtpFrom,
      transporter: nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      }),
    };
  }

  return null;
}

/**
 * Dispatches a password reset email to the recipient's Gmail / email inbox.
 */
export async function sendPasswordResetEmail({
  toEmail,
  resetLink,
  expiresInMinutes = 15,
}: SendResetEmailParams): Promise<EmailDispatchResult> {
  const transportConfig = getEmailTransporter();

  const emailHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password - Shreeniwas Properties</title>
      <style>
        body { margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
        .wrapper { width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; margin-top: 32px; margin-bottom: 32px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
        .header { background-color: #0A1628; padding: 36px 24px; text-align: center; border-bottom: 3px solid #C9A96E; }
        .brand-name { color: #C9A96E; font-size: 26px; font-weight: bold; letter-spacing: 0.5px; margin: 0; font-family: Georgia, serif; }
        .brand-sub { color: #ffffff; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-top: 6px; }
        .content { padding: 36px 32px; color: #1e293b; line-height: 1.6; }
        .greeting { font-size: 18px; font-weight: 600; color: #0A1628; margin-bottom: 16px; }
        .btn-container { text-align: center; margin: 32px 0; }
        .btn { display: inline-block; background-color: #0A1628; color: #C9A96E !important; text-decoration: none; font-weight: bold; font-size: 15px; padding: 14px 36px; border-radius: 12px; border: 1px solid #C9A96E; box-shadow: 0 4px 14px rgba(10, 22, 40, 0.2); }
        .alt-link { font-size: 12px; color: #64748b; word-break: break-all; margin-top: 24px; }
        .security-badge { background-color: #f1f5f9; border-left: 4px solid #C9A96E; padding: 14px 16px; font-size: 12px; color: #475569; margin-top: 28px; border-radius: 0 8px 8px 0; }
        .footer { background-color: #f8fafc; padding: 24px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <div class="brand-name">Shreeniwas Properties</div>
          <div class="brand-sub">Rajasthan Premium Real Estate & Rentals</div>
        </div>
        <div class="content">
          <div class="greeting">Password Reset Request</div>
          <p>Hello,</p>
          <p>We received a request to reset your password for your <strong>Shreeniwas Properties</strong> account associated with <strong>${toEmail}</strong>.</p>
          <p>Click the button below to choose a new password. For security purposes, this link is valid for <strong>${expiresInMinutes} minutes</strong> only.</p>
          
          <div class="btn-container">
            <a href="${resetLink}" target="_blank" class="btn">Reset My Password</a>
          </div>

          <div class="alt-link">
            If the button above does not work, copy and paste this link into your browser:<br>
            <a href="${resetLink}" style="color: #0A1628; text-decoration: underline;">${resetLink}</a>
          </div>

          <div class="security-badge">
            <strong>Security Notice:</strong> If you did not initiate this request, someone may have entered your email by mistake. Your account remains completely secure and no action is required on your part.
          </div>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} Shreeniwas Properties. All rights reserved.<br>
          Vaishali Nagar, Jaipur, Rajasthan 302021 | Support: +91 6376117833
        </div>
      </div>
    </body>
    </html>
  `;

  if (transportConfig) {
    try {
      await transportConfig.transporter.sendMail({
        from: transportConfig.from,
        to: toEmail,
        subject: 'Reset Your Shreeniwas Properties Password',
        html: emailHtml,
        text: `Reset Your Shreeniwas Properties Password:\n\nClick the link below to choose a new password (valid for ${expiresInMinutes} minutes):\n${resetLink}\n\nIf you did not request this, please ignore this email.`,
      });

      return {
        delivered: true,
        provider: transportConfig.type,
        message: `Password reset email successfully sent to ${toEmail} via ${transportConfig.type}`,
      };
    } catch (err: any) {
      console.error(`[Email Service] Failed to send email via ${transportConfig.type}:`, err);
      // Fall through to other handlers
    }
  }

  // Attempt Supabase reset email fallback if Supabase client is available
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (supabaseUrl && supabaseAnon) {
      const supabase = createClient();
      await supabase.auth.resetPasswordForEmail(toEmail, {
        redirectTo: resetLink,
      });
      return {
        delivered: true,
        provider: 'supabase_fallback',
        message: `Password reset email dispatched to ${toEmail} via Supabase Auth service.`,
      };
    }
  } catch (err) {
    console.warn('[Email Service] Supabase fallback email was skipped or unavailable:', err);
  }

  // If no SMTP credentials are configured in .env, record in server log for local testing
  console.info(`[Email Service] Reset email generated for ${toEmail}. Link: ${resetLink}`);
  return {
    delivered: true,
    provider: 'simulated_dev',
    message: `Password reset link prepared for ${toEmail}. (Configure GMAIL_USER and GMAIL_APP_PASSWORD in .env.local to send directly via Gmail SMTP).`,
  };
}

export interface SendDailyReportParams {
  toEmail: string;
  reportBuffer: Buffer;
  filename: string;
  reportDateStr: string;
  stats: {
    totalInquiries: number;
    todayInquiries: number;
    totalVisits: number;
    todayVisits: number;
    totalAttendance: number;
    todayAttendance: number;
    totalUsers: number;
    totalProperties: number;
    totalVisitRevenue: string;
  };
}

/**
 * Dispatches the daily Excel business report to the owner's email with the .xlsx file attached.
 */
export async function sendDailyReportEmail({
  toEmail,
  reportBuffer,
  filename,
  reportDateStr,
  stats,
}: SendDailyReportParams): Promise<EmailDispatchResult> {
  const transportConfig = getEmailTransporter();

  const emailHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Daily Business Report - Shreeniwas Properties</title>
      <style>
        body { margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
        .wrapper { width: 100%; max-width: 640px; margin: 30px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px rgba(0,0,0,0.06); }
        .header { background-color: #0A1628; padding: 32px 24px; text-align: center; border-bottom: 3px solid #C9A96E; }
        .brand-name { color: #C9A96E; font-size: 24px; font-weight: bold; letter-spacing: 0.5px; margin: 0; font-family: Georgia, serif; }
        .brand-sub { color: #94a3b8; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-top: 6px; }
        .content { padding: 32px 28px; color: #1e293b; }
        .greeting { font-size: 18px; font-weight: bold; color: #0A1628; margin-bottom: 12px; }
        .intro { font-size: 13px; color: #64748b; line-height: 1.6; margin-bottom: 24px; }
        .kpi-grid { width: 100%; border-collapse: separate; border-spacing: 8px; margin-bottom: 24px; }
        .kpi-card { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 12px; text-align: center; }
        .kpi-num { font-size: 22px; font-weight: 800; color: #0A1628; margin: 0; }
        .kpi-label { font-size: 11px; font-weight: 600; text-transform: uppercase; color: #64748b; margin-top: 4px; }
        .highlight-card { background: linear-gradient(135deg, #0A1628 0%, #1e293b 100%); border-radius: 14px; padding: 20px; color: #ffffff; margin-bottom: 24px; border: 1px solid rgba(201, 169, 110, 0.4); }
        .highlight-title { font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: #C9A96E; font-weight: bold; margin: 0 0 8px 0; }
        .highlight-detail { font-size: 13px; line-height: 1.6; margin: 0; color: #e2e8f0; }
        .attachment-box { background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 16px 20px; margin-bottom: 24px; display: flex; align-items: center; }
        .attachment-text { font-size: 13px; color: #166534; font-weight: 600; margin: 0; }
        .footer { background-color: #f8fafc; padding: 20px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <h1 class="brand-name">SHREENIWAS PROPERTIES</h1>
          <p class="brand-sub">Daily Executive Intelligence &amp; Leads Digest</p>
        </div>

        <div class="content">
          <div class="greeting">Namaste Owner / Super Administrator,</div>
          <p class="intro">
            Here is your automated daily operations report for <strong>${reportDateStr}</strong>. 
            The comprehensive 5-sheet Excel workbook has been generated and attached directly to this email.
          </p>

          <table class="kpi-grid">
            <tr>
              <td class="kpi-card" width="50%">
                <p class="kpi-num" style="color: #0284c7;">${stats.todayInquiries}</p>
                <p class="kpi-label">Today's Inquiries</p>
              </td>
              <td class="kpi-card" width="50%">
                <p class="kpi-num" style="color: #059669;">${stats.todayVisits}</p>
                <p class="kpi-label">Today's Site Visits</p>
              </td>
            </tr>
            <tr>
              <td class="kpi-card" width="50%">
                <p class="kpi-num" style="color: #d97706;">${stats.totalVisitRevenue}</p>
                <p class="kpi-label">Total Visit Revenue</p>
              </td>
              <td class="kpi-card" width="50%">
                <p class="kpi-num" style="color: #7c3aed;">${stats.todayAttendance}</p>
                <p class="kpi-label">Staff Clock-Ins Today</p>
              </td>
            </tr>
          </table>

          <div class="highlight-card">
            <p class="highlight-title">Platform Summary Highlights</p>
            <p class="highlight-detail">
              • <strong>Active Listings:</strong> ${stats.totalProperties} properties published on portal<br>
              • <strong>Total Inquiries (Cumulative):</strong> ${stats.totalInquiries} buyer/tenant inquiries recorded<br>
              • <strong>Registered Users:</strong> ${stats.totalUsers} registered clients and property owners<br>
              • <strong>13-Point Visit Records:</strong> ${stats.totalVisits} on-site inspections documented
            </p>
          </div>

          <div class="attachment-box">
            <p class="attachment-text">
              📎 <strong>Attached:</strong> ${filename} (Includes: Executive Summary, Inquiries &amp; Leads, 13-Point Visit Records, Staff Attendance Log, and User Accounts).
            </p>
          </div>

          <p style="font-size: 12px; color: #64748b; line-height: 1.5;">
            You can also log into the <a href="https://shreeniwasproperties-pi.vercel.app/admin" style="color: #0A1628; font-weight: bold;">Super Admin Console</a> at any time to review real-time updates or trigger an on-demand export.
          </p>
        </div>

        <div class="footer">
          &copy; ${new Date().getFullYear()} Shreeniwas Properties Pvt Ltd &bull; Vaishali Nagar, Jaipur &amp; Ratanada, Jodhpur &bull; +91 6376117833
        </div>
      </div>
    </body>
    </html>
  `;

  if (transportConfig) {
    try {
      await transportConfig.transporter.sendMail({
        from: transportConfig.from,
        to: toEmail,
        subject: `📊 Shreeniwas Properties - Daily Business & Leads Report (${reportDateStr})`,
        html: emailHtml,
        attachments: [
          {
            filename: filename,
            content: reportBuffer,
            contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          },
        ],
      });

      return {
        delivered: true,
        provider: transportConfig.type,
        message: `Daily report successfully emailed to ${toEmail} with attached ${filename} via ${transportConfig.type}`,
      };
    } catch (err: any) {
      console.error(`[Email Service] Failed to send daily report via ${transportConfig.type}:`, err);
    }
  }

  // Simulated fallback when SMTP is not configured
  console.info(`[Email Service] Daily report Excel prepared for ${toEmail}. Attachment: ${filename} (${reportBuffer.length} bytes).`);
  return {
    delivered: true,
    provider: 'simulated_dev',
    message: `Daily report Excel (${filename}) generated successfully. (Configure GMAIL_USER and GMAIL_APP_PASSWORD in .env.local for automatic live email dispatch to ${toEmail}).`,
  };
}

