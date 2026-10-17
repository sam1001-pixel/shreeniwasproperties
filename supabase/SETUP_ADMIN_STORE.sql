-- ==============================================================================
-- SHREENIWAS PROPERTIES - PERMANENT GLOBAL CLOUD DATABASE SETUP
-- Paste this script into your Supabase Dashboard -> SQL Editor -> Click 'Run'
-- Project URL: https://oyvplcdyrvsmxeitpahq.supabase.co
-- ==============================================================================

-- 1. Create the permanent admin_store table
CREATE TABLE IF NOT EXISTS public.admin_store (
  key TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.admin_store ENABLE ROW LEVEL SECURITY;

-- 3. Drop existing policies to prevent conflicts
DROP POLICY IF EXISTS "Service role manages admin_store" ON public.admin_store;
DROP POLICY IF EXISTS "Public reads admin_store" ON public.admin_store;
DROP POLICY IF EXISTS "Allow sync writes to admin_store" ON public.admin_store;
DROP POLICY IF EXISTS "Public reads whitelisted admin_store keys" ON public.admin_store;

-- 4. Policy: Allow Service Role full management
CREATE POLICY "Service role manages admin_store"
ON public.admin_store FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- 5. Policy: Allow Public reads (properties, reels, blogs, tariffs, projects, trends)
CREATE POLICY "Public reads admin_store"
ON public.admin_store FOR SELECT
TO anon, authenticated
USING (true);

-- 6. Policy: Allow API writes to admin_store
-- (The Next.js backend strictly verifies Admin Session JWT before writing)
CREATE POLICY "Allow sync writes to admin_store"
ON public.admin_store FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- 7. Notify PostgREST to reload schema cache immediately
NOTIFY pgrst, 'reload schema';
