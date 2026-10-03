'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SavedPropertiesPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard/portal');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#C9A96E]/30 border-t-[#C9A96E] rounded-full animate-spin mx-auto"></div>
        <p className="text-[#C9A96E] font-serif text-lg font-bold">Redirecting to Saved Favorites...</p>
      </div>
    </div>
  );
}
