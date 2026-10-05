'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { siteConfig } from '@/config/site';

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
}

export const DEFAULT_SITE_SETTINGS: GlobalSiteSettings = {
  siteTitle: siteConfig.name,
  tagline: 'Exclusive Real Estate & Rental Network in Rajasthan',
  logoUrl: '',
  heroBgUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2070&auto=format&fit=crop',
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
};

interface SiteSettingsContextType {
  settings: GlobalSiteSettings;
  updateSettings: (newSettings: Partial<GlobalSiteSettings>) => void;
  resetToDefaults: () => void;
  isLoading: boolean;
}

const SiteSettingsContext = createContext<SiteSettingsContextType>({
  settings: DEFAULT_SITE_SETTINGS,
  updateSettings: () => {},
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
        setSettings((prev) => ({
          ...prev,
          ...parsed,
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
    } catch (err) {
      console.error('Failed to persist site settings:', err);
    }
  };

  const resetToDefaults = () => {
    setSettings(DEFAULT_SITE_SETTINGS);
    try {
      localStorage.setItem('shreeniwas_platform_settings', JSON.stringify(DEFAULT_SITE_SETTINGS));
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
