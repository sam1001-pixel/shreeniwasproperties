-- ==============================================================================
-- SHREENIWAS RENTALS & PROPERTIES - SECURITY HARDENING MIGRATION
-- Run this script in Supabase Dashboard -> SQL Editor -> Run
-- Fixes Critical Finding 1 & High-Risk Finding 2/7
-- ==============================================================================

-- 1. HARDEN ADMIN_STORE (Row Level Security)
ALTER TABLE IF EXISTS public.admin_store ENABLE ROW LEVEL SECURITY;

-- Drop insecure open policies
DROP POLICY IF EXISTS "Allow read admin_store" ON public.admin_store;
DROP POLICY IF EXISTS "Allow write admin_store" ON public.admin_store;
DROP POLICY IF EXISTS "Service role manages admin_store" ON public.admin_store;
DROP POLICY IF EXISTS "Public reads whitelisted admin_store keys" ON public.admin_store;

-- Policy A: Full access strictly restricted to server-side service_role
CREATE POLICY "Service role manages admin_store"
ON public.admin_store FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Policy B: Public client reads restricted ONLY to whitelisted non-sensitive keys
CREATE POLICY "Public reads whitelisted admin_store keys"
ON public.admin_store FOR SELECT
TO anon, authenticated
USING (
  key IN (
    'shreeniwas_admin_properties',
    'shreeniwas_new_projects',
    'shreeniwas_blog_posts',
    'shreeniwas_blocked_visit_dates',
    'shreeniwas_admin_reels',
    'shreeniwas_tariff_settings',
    'hero_slides',
    'site_settings'
  )
);

-- 2. HARDEN USER PROFILES (Prevent Public Exposure of PII)
ALTER TABLE IF EXISTS public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public profiles read" ON public.profiles;
DROP POLICY IF EXISTS "Users read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Service role manages profiles" ON public.profiles;

-- Users can only read and manage their own profile
CREATE POLICY "Users read own profile"
ON public.profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users update own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Service role full access for backend management
CREATE POLICY "Service role manages profiles"
ON public.profiles FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- 3. HARDEN INQUIRIES & LEAD DATA
ALTER TABLE IF EXISTS public.inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users read own inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Service role manages inquiries" ON public.inquiries;

-- Users can only read inquiries they submitted
CREATE POLICY "Users read own inquiries"
ON public.inquiries FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Service role manages all leads
CREATE POLICY "Service role manages inquiries"
ON public.inquiries FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- 4. CREATE SECURE USER ACCOUNTS TABLE (Protected Credentials Store)
CREATE TABLE IF NOT EXISTS public.user_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'Property Seeker',
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE public.user_accounts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role manages user_accounts" ON public.user_accounts;

-- Strictly restricted to service_role — anon and public cannot select or modify password_hash!
CREATE POLICY "Service role manages user_accounts"
ON public.user_accounts FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
