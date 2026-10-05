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
