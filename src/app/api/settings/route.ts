import { NextResponse } from 'next/server';
import { DEFAULT_SITE_SETTINGS } from '@/lib/settings/site-settings-context';

export async function GET() {
  return NextResponse.json({
    success: true,
    settings: DEFAULT_SITE_SETTINGS,
  });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
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
