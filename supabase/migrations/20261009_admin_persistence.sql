-- ==============================================================================
-- SHREENIWAS RENTALS & PROPERTIES - DATABASE PERSISTENCE SCHEMA
-- Run this script in Supabase Dashboard -> SQL Editor -> Run
-- ==============================================================================

-- 1. Create Key-Value Permanent Admin Store for all dynamic portal datasets
CREATE TABLE IF NOT EXISTS public.admin_store (
  key TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.admin_store ENABLE ROW LEVEL SECURITY;

-- 3. Least-Privilege RLS Policies
DROP POLICY IF EXISTS "Allow read admin_store" ON public.admin_store;
DROP POLICY IF EXISTS "Allow write admin_store" ON public.admin_store;
DROP POLICY IF EXISTS "Service role manages admin_store" ON public.admin_store;
DROP POLICY IF EXISTS "Public reads whitelisted admin_store keys" ON public.admin_store;

-- Write operations strictly restricted to server-side service_role
CREATE POLICY "Service role manages admin_store"
ON public.admin_store FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Public read access restricted strictly to whitelisted public marketing keys
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

-- 4. Automatic timestamp trigger on update
CREATE OR REPLACE FUNCTION update_admin_store_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_update_admin_store_timestamp ON public.admin_store;
CREATE TRIGGER trg_update_admin_store_timestamp
BEFORE UPDATE ON public.admin_store
FOR EACH ROW
EXECUTE FUNCTION update_admin_store_timestamp();
