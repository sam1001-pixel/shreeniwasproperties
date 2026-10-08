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

-- 3. Create RLS Policies allowing Read & Write operations
DROP POLICY IF EXISTS "Allow read admin_store" ON public.admin_store;
CREATE POLICY "Allow read admin_store" 
ON public.admin_store FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Allow write admin_store" ON public.admin_store;
CREATE POLICY "Allow write admin_store" 
ON public.admin_store FOR ALL 
USING (true) 
WITH CHECK (true);

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
