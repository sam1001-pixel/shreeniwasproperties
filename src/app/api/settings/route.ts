import { NextResponse } from 'next/server';
import { DEFAULT_SITE_SETTINGS } from '@/lib/settings/site-settings-context';
import { getAdminSession } from '@/lib/auth/security';
import fs from 'fs';
import path from 'path';

const BACKUP_FILE = path.join(process.cwd(), 'data', 'admin_backup_store.json');

export async function GET() {
  try {
    if (fs.existsSync(BACKUP_FILE)) {
      const raw = fs.readFileSync(BACKUP_FILE, 'utf-8');
      const store = JSON.parse(raw);
      if (store.site_settings) {
        return NextResponse.json({
          success: true,
          settings: { ...DEFAULT_SITE_SETTINGS, ...store.site_settings },
        });
      }
    }
  } catch (e) {
    // Fall back to default
  }

  return NextResponse.json({
    success: true,
    settings: DEFAULT_SITE_SETTINGS,
  });
}

export async function PUT(request: Request) {
  try {
    const session = await getAdminSession(request);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized: Administrator session required to modify site settings.' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Persist to backup store
    try {
      const dir = path.dirname(BACKUP_FILE);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      let store: Record<string, any> = {};
      if (fs.existsSync(BACKUP_FILE)) {
        store = JSON.parse(fs.readFileSync(BACKUP_FILE, 'utf-8'));
      }
      store.site_settings = body;
      fs.writeFileSync(BACKUP_FILE, JSON.stringify(store, null, 2), 'utf-8');
    } catch (err) {
      console.warn('[Settings PUT] Error persisting settings to backup:', err);
    }

    return NextResponse.json({
      success: true,
      message: 'Global site settings updated successfully',
      settings: body,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to update settings' },
      { status: 500 }
    );
  }
}
