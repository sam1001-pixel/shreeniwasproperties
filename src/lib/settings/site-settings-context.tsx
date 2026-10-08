'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { siteConfig } from '@/config/site';

export interface PaymentSettings {
  upiId: string;
  merchantName: string;
  customQrUrl: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountHolder: string;
  accountType: string;
  standardPassFee: number;
  premiumPassFee: number;
  vipSiteVisitFee: number;
  enableDirectUpiPay: boolean;
  enableDownloadQr: boolean;
  enableShareQr: boolean;
  paymentInstructions: string;
}

export const DEFAULT_PAYMENT_SETTINGS: PaymentSettings = {
  upiId: '6376117833@okbizaxis',
  merchantName: 'Shreeniwas Properties',
  customQrUrl: '',
  bankName: 'HDFC Bank Ltd',
  accountNumber: '50200089123456',
  ifscCode: 'HDFC0001234',
  accountHolder: 'Shreeniwas Properties Pvt Ltd',
  accountType: 'Current Account',
  standardPassFee: 500,
  premiumPassFee: 999,
  vipSiteVisitFee: 499,
  enableDirectUpiPay: true,
  enableDownloadQr: true,
  enableShareQr: true,
  paymentInstructions: 'Scan QR with any UPI app (GPay, PhonePe, Paytm, BHIM) or tap Direct Pay buttons below. After payment, enter your 12-digit UTR reference number for instant confirmation.',
};

export interface GlobalSiteSettings {
  siteTitle: string;
  tagline: string;
  logoUrl: string;
  heroBgUrl: string;
  contactEmail: string;
  supportPhone: string;
  headOffice: string;
  whatsappLink: string;
  instagramLink: string;
  facebookLink: string;
  youtubeLink: string;
  linkedinLink: string;
  twitterLink: string;
  maintenanceMode: boolean;
  payment: PaymentSettings;
}

export const DEFAULT_SITE_SETTINGS: GlobalSiteSettings = {
  siteTitle: 'Shreeniwas Rentals',
  tagline: 'Verified Rentals, Luxury Villas & Properties in Jodhpur',
  logoUrl: '/logo/shreeniwas-logo-transparent.png',
  heroBgUrl: '/hero/jodhpur-hero-royal.jpg',
  contactEmail: siteConfig.contact.email,
  supportPhone: siteConfig.contact.phone,
  headOffice: siteConfig.contact.address,
  whatsappLink: siteConfig.links.whatsapp,
  instagramLink: siteConfig.links.instagram,
  facebookLink: siteConfig.links.facebook,
  youtubeLink: siteConfig.links.youtube,
  linkedinLink: 'https://linkedin.com/company/shreeniwasproperties',
  twitterLink: 'https://x.com/shreeniwasprop',
  maintenanceMode: false,
  payment: DEFAULT_PAYMENT_SETTINGS,
};

interface SiteSettingsContextType {
  settings: GlobalSiteSettings;
  updateSettings: (newSettings: Partial<GlobalSiteSettings>) => void;
  updatePaymentSettings: (newPayment: Partial<PaymentSettings>) => void;
  resetToDefaults: () => void;
  isLoading: boolean;
}

const SiteSettingsContext = createContext<SiteSettingsContextType>({
  settings: DEFAULT_SITE_SETTINGS,
  updateSettings: () => {},
  updatePaymentSettings: () => {},
  resetToDefaults: () => {},
  isLoading: true,
});

export function SiteSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<GlobalSiteSettings>(DEFAULT_SITE_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  const loadSettings = () => {
    try {
      const saved = localStorage.getItem('shreeniwas_platform_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Seamlessly migrate legacy Jaipur or external unsplash placeholder image to Jodhpur Royal Palace
        if (
          !parsed.heroBgUrl ||
          parsed.heroBgUrl.includes('47145ed94245') ||
          parsed.heroBgUrl.includes('hawa-mahal') ||
          parsed.heroBgUrl.includes('unsplash.com')
        ) {
          parsed.heroBgUrl = '/hero/jodhpur-hero-royal.jpg';
          localStorage.setItem('shreeniwas_platform_settings', JSON.stringify(parsed));
        }

        // Set official logoUrl if not configured or using legacy placeholder
        if (!parsed.logoUrl || parsed.logoUrl.includes('unsplash.com') || parsed.logoUrl === '') {
          parsed.logoUrl = '/logo/shreeniwas-logo-transparent.png';
          localStorage.setItem('shreeniwas_platform_settings', JSON.stringify(parsed));
        }

        // Sync site title to Shreeniwas Rentals
        if (parsed.siteTitle === 'Shreeniwas Properties') {
          parsed.siteTitle = 'Shreeniwas Rentals';
          localStorage.setItem('shreeniwas_platform_settings', JSON.stringify(parsed));
        }

        // Merge payment settings safely if not present
        const mergedPayment: PaymentSettings = {
          ...DEFAULT_PAYMENT_SETTINGS,
          ...(parsed.payment || {}),
        };

        setSettings((prev) => ({
          ...prev,
          ...parsed,
          payment: mergedPayment,
        }));
      }
    } catch (err) {
      console.error('Failed to load site settings from storage:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();

    // Pull from persistent server database
    fetch('/api/admin/sync?key=shreeniwas_platform_settings', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (data?.success && data?.data) {
          const parsed = data.data;
          const mergedPayment: PaymentSettings = {
            ...DEFAULT_PAYMENT_SETTINGS,
            ...(parsed.payment || {}),
          };
          setSettings(prev => ({
            ...prev,
            ...parsed,
            payment: mergedPayment,
          }));
          try {
            localStorage.setItem('shreeniwas_platform_settings', JSON.stringify(parsed));
          } catch (e) {}
        }
      })
      .catch(() => {});

    const handleUpdateEvent = () => loadSettings();
    window.addEventListener('shreeniwas_data_updated', handleUpdateEvent);
    window.addEventListener('storage', handleUpdateEvent);

    return () => {
      window.removeEventListener('shreeniwas_data_updated', handleUpdateEvent);
      window.removeEventListener('storage', handleUpdateEvent);
    };
  }, []);

  const updateSettings = (newSettings: Partial<GlobalSiteSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    try {
      localStorage.setItem('shreeniwas_platform_settings', JSON.stringify(updated));
      window.dispatchEvent(new Event('shreeniwas_data_updated'));
      fetch('/api/admin/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'shreeniwas_platform_settings', data: updated }),
      }).catch(() => {});
    } catch (err) {
      console.error('Failed to persist site settings:', err);
    }
  };

  const updatePaymentSettings = (newPayment: Partial<PaymentSettings>) => {
    const updatedPayment = { ...settings.payment, ...newPayment };
    const updated = { ...settings, payment: updatedPayment };
    setSettings(updated);
    try {
      localStorage.setItem('shreeniwas_platform_settings', JSON.stringify(updated));
      localStorage.setItem('shreeniwas_payment_settings', JSON.stringify(updatedPayment));
      window.dispatchEvent(new Event('shreeniwas_data_updated'));
      fetch('/api/admin/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'shreeniwas_platform_settings', data: updated }),
      }).catch(() => {});
      fetch('/api/admin/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'shreeniwas_payment_settings', data: updatedPayment }),
      }).catch(() => {});
    } catch (err) {
      console.error('Failed to persist payment settings:', err);
    }
  };

  const resetToDefaults = () => {
    setSettings(DEFAULT_SITE_SETTINGS);
    try {
      localStorage.setItem('shreeniwas_platform_settings', JSON.stringify(DEFAULT_SITE_SETTINGS));
      localStorage.setItem('shreeniwas_payment_settings', JSON.stringify(DEFAULT_PAYMENT_SETTINGS));
      window.dispatchEvent(new Event('shreeniwas_data_updated'));
    } catch (err) {
      console.error('Failed to reset site settings:', err);
    }
  };

  return (
    <SiteSettingsContext.Provider
      value={{
        settings,
        updateSettings,
        updatePaymentSettings,
        resetToDefaults,
        isLoading,
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
}
