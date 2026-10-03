-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 2. ENUMS
CREATE TYPE user_role AS ENUM ('tenant', 'buyer', 'landlord', 'seller', 'agent', 'admin');
CREATE TYPE listing_purpose AS ENUM ('rent', 'sale', 'commercial_lease', 'commercial_sale');
CREATE TYPE property_category AS ENUM (
  'apartment', 'villa', 'independent_house', 'penthouse', 'plot',
  'commercial_office', 'retail_shop', 'warehouse', 'co_working'
);
CREATE TYPE property_status AS ENUM ('draft', 'pending_approval', 'active', 'reserved', 'rented', 'sold', 'archived');
CREATE TYPE furnishing_type AS ENUM ('unfurnished', 'semi_furnished', 'fully_furnished');
CREATE TYPE inquiry_status AS ENUM ('new', 'contacted', 'tour_scheduled', 'negotiating', 'closed', 'cancelled');

-- 3. PROFILES
CREATE TABLE public.profiles (
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

-- 4. PROPERTIES
CREATE TABLE public.properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  
  purpose listing_purpose NOT NULL,
  category property_category NOT NULL,
  status property_status DEFAULT 'active' NOT NULL,
  
  price NUMERIC(14, 2) NOT NULL,
  security_deposit NUMERIC(14, 2) DEFAULT 0,
  maintenance_charges NUMERIC(10, 2) DEFAULT 0,
  price_negotiable BOOLEAN DEFAULT false NOT NULL,
  
  carpet_area_sqft NUMERIC(10, 2) NOT NULL,
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
  city TEXT DEFAULT 'Jaipur' NOT NULL,
  state TEXT DEFAULT 'Rajasthan' NOT NULL,
  pincode TEXT NOT NULL,
  landmark TEXT,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  coordinates GEOGRAPHY(Point, 4326) NOT NULL,
  
  amenities TEXT[] DEFAULT '{}' NOT NULL,
  virtual_tour_url TEXT,
  video_walkthrough_url TEXT,
  
  is_featured BOOLEAN DEFAULT false NOT NULL,
  is_verified BOOLEAN DEFAULT false NOT NULL,
  views_count INTEGER DEFAULT 0 NOT NULL,
  
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX properties_coordinates_gix ON public.properties USING GIST(coordinates);
CREATE INDEX properties_purpose_category_idx ON public.properties (purpose, category, status);
CREATE INDEX properties_price_idx ON public.properties (price);
CREATE INDEX properties_locality_trgm_idx ON public.properties USING GIN(locality gin_trgm_ops);

-- 5. MEDIA
CREATE TABLE public.property_media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  url TEXT NOT NULL,
  media_type TEXT DEFAULT 'photo' CHECK (media_type IN ('photo', 'floor_plan', '360_panorama', 'document')),
  caption TEXT,
  sort_order SMALLINT DEFAULT 0 NOT NULL,
  is_cover BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 6. INQUIRIES
CREATE TABLE public.inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
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

-- 7. RLS POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles read" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Active properties public read" ON public.properties FOR SELECT USING (status = 'active');
CREATE POLICY "Owners manage properties" ON public.properties FOR ALL TO authenticated USING ((select auth.uid()) = owner_id) WITH CHECK ((select auth.uid()) = owner_id);
CREATE POLICY "Public lead submission" ON public.inquiries FOR INSERT WITH CHECK (true);
