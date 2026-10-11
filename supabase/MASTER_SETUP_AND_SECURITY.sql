-- ==============================================================================
-- SHREENIWAS RENTALS & PROPERTIES - COMPLETE MASTER DATABASE & SECURITY SCRIPT
-- Paste and Run this entire script in Supabase Dashboard -> SQL Editor -> Run
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 2. SAFE ENUMS CREATION
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('tenant', 'buyer', 'landlord', 'seller', 'agent', 'admin');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE listing_purpose AS ENUM ('rent', 'sale', 'commercial_lease', 'commercial_sale');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE property_category AS ENUM (
    'apartment', 'villa', 'independent_house', 'penthouse', 'plot',
    'commercial_office', 'retail_shop', 'warehouse', 'co_working'
  );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE property_status AS ENUM ('draft', 'pending_approval', 'active', 'reserved', 'rented', 'sold', 'archived');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE furnishing_type AS ENUM ('unfurnished', 'semi_furnished', 'fully_furnished');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE inquiry_status AS ENUM ('new', 'contacted', 'tour_scheduled', 'negotiating', 'closed', 'cancelled');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 3. TABLES CREATION (IF NOT EXISTS)

-- A. PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role user_role DEFAULT 'tenant' NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  email TEXT NOT NULL,
  avatar_url TEXT,
  is_verified BOOLEAN DEFAULT false NOT NULL,
  rera_number TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- B. PROPERTIES
CREATE TABLE IF NOT EXISTS public.properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  purpose listing_purpose NOT NULL DEFAULT 'rent',
  category property_category NOT NULL DEFAULT 'apartment',
  status property_status DEFAULT 'active' NOT NULL,
  price NUMERIC(14, 2) NOT NULL,
  security_deposit NUMERIC(14, 2) DEFAULT 0,
  maintenance_charges NUMERIC(10, 2) DEFAULT 0,
  price_negotiable BOOLEAN DEFAULT false NOT NULL,
  carpet_area_sqft NUMERIC(10, 2) NOT NULL DEFAULT 1000,
  super_builtup_area_sqft NUMERIC(10, 2),
  bedrooms SMALLINT DEFAULT 0 NOT NULL,
  bathrooms SMALLINT DEFAULT 0 NOT NULL,
  balconies SMALLINT DEFAULT 0 NOT NULL,
  furnishing furnishing_type DEFAULT 'unfurnished' NOT NULL,
  floor_number SMALLINT,
  total_floors SMALLINT,
  parking_slots SMALLINT DEFAULT 0 NOT NULL,
  facing TEXT,
  property_age_years SMALLINT,
  available_from DATE DEFAULT CURRENT_DATE NOT NULL,
  address_line TEXT NOT NULL,
  locality TEXT NOT NULL,
  city TEXT DEFAULT 'Jodhpur' NOT NULL,
  state TEXT DEFAULT 'Rajasthan' NOT NULL,
  pincode TEXT NOT NULL DEFAULT '342001',
  landmark TEXT,
  latitude DOUBLE PRECISION DEFAULT 26.2389 NOT NULL,
  longitude DOUBLE PRECISION DEFAULT 73.0243 NOT NULL,
  amenities TEXT[] DEFAULT '{}' NOT NULL,
  virtual_tour_url TEXT,
  video_walkthrough_url TEXT,
  is_featured BOOLEAN DEFAULT false NOT NULL,
  is_verified BOOLEAN DEFAULT false NOT NULL,
  views_count INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- C. PROPERTY MEDIA
CREATE TABLE IF NOT EXISTS public.property_media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  url TEXT NOT NULL,
  media_type TEXT DEFAULT 'photo' CHECK (media_type IN ('photo', 'floor_plan', '360_panorama', 'document')),
  caption TEXT,
  sort_order SMALLINT DEFAULT 0 NOT NULL,
  is_cover BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- D. INQUIRIES
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  inquiry_type TEXT DEFAULT 'general' CHECK (inquiry_type IN ('general', 'schedule_visit', 'request_callback', 'make_offer')),
  preferred_tour_date DATE,
  status inquiry_status DEFAULT 'new' NOT NULL,
  assigned_agent_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- E. ADMIN STORE (Key-Value Permanent Store)
CREATE TABLE IF NOT EXISTS public.admin_store (
  key TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- F. USER ACCOUNTS (Protected Credentials Store)
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

-- ==============================================================================
-- 4. ENABLE ROW LEVEL SECURITY (RLS) ON ALL TABLES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_store ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_accounts ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- 5. HARDENED LEAST-PRIVILEGE RLS POLICIES
-- ==============================================================================

-- 5A. ADMIN_STORE POLICIES
DROP POLICY IF EXISTS "Allow read admin_store" ON public.admin_store;
DROP POLICY IF EXISTS "Allow write admin_store" ON public.admin_store;
DROP POLICY IF EXISTS "Service role manages admin_store" ON public.admin_store;
DROP POLICY IF EXISTS "Public reads whitelisted admin_store keys" ON public.admin_store;

CREATE POLICY "Service role manages admin_store"
ON public.admin_store FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

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

-- 5B. PROFILES POLICIES
DROP POLICY IF EXISTS "Public profiles read" ON public.profiles;
DROP POLICY IF EXISTS "Users read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Service role manages profiles" ON public.profiles;

CREATE POLICY "Users read own profile"
ON public.profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users update own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Service role manages profiles"
ON public.profiles FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- 5C. PROPERTIES & MEDIA POLICIES
DROP POLICY IF EXISTS "Active properties public read" ON public.properties;
DROP POLICY IF EXISTS "Owners manage properties" ON public.properties;
DROP POLICY IF EXISTS "Service role manages properties" ON public.properties;

CREATE POLICY "Active properties public read"
ON public.properties FOR SELECT
USING (status = 'active');

CREATE POLICY "Owners manage properties"
ON public.properties FOR ALL
TO authenticated
USING (auth.uid() = owner_id)
WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Service role manages properties"
ON public.properties FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Public read property media" ON public.property_media;
CREATE POLICY "Public read property media"
ON public.property_media FOR SELECT
USING (true);

-- 5D. INQUIRIES POLICIES
DROP POLICY IF EXISTS "Public lead submission" ON public.inquiries;
DROP POLICY IF EXISTS "Users read own inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Service role manages inquiries" ON public.inquiries;

CREATE POLICY "Public lead submission"
ON public.inquiries FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users read own inquiries"
ON public.inquiries FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Service role manages inquiries"
ON public.inquiries FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- 5E. USER_ACCOUNTS POLICIES (Strictly Server Service Role Only)
DROP POLICY IF EXISTS "Service role manages user_accounts" ON public.user_accounts;

CREATE POLICY "Service role manages user_accounts"
ON public.user_accounts FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Reload PostgREST schema cache immediately
NOTIFY pgrst, 'reload schema';
