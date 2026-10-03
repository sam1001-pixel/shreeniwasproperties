export type ListingPurpose = 'rent' | 'sale' | 'commercial_lease' | 'commercial_sale';

export type PropertyCategory =
  | 'apartment' | 'villa' | 'independent_house' | 'penthouse' | 'plot'
  | 'commercial_office' | 'retail_shop' | 'warehouse' | 'co_working';

export type PropertyStatus = 'draft' | 'pending_approval' | 'active' | 'reserved' | 'rented' | 'sold' | 'archived';

export type FurnishingType = 'unfurnished' | 'semi_furnished' | 'fully_furnished';

export type UserRole = 'tenant' | 'buyer' | 'landlord' | 'seller' | 'agent' | 'admin';

export type InquiryStatus = 'new' | 'contacted' | 'tour_scheduled' | 'negotiating' | 'closed' | 'cancelled';

export interface Property {
  id: string;
  slug: string;
  owner_id: string;
  title: string;
  description: string;
  purpose: ListingPurpose;
  category: PropertyCategory;
  status: PropertyStatus;
  price: number;
  security_deposit: number;
  maintenance_charges: number;
  price_negotiable: boolean;
  carpet_area_sqft: number;
  super_builtup_area_sqft?: number;
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  furnishing: FurnishingType;
  floor_number?: number;
  total_floors?: number;
  parking_slots: number;
  facing?: string;
  property_age_years?: number;
  available_from: string;
  address_line: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  latitude: number;
  longitude: number;
  amenities: string[];
  virtual_tour_url?: string;
  video_walkthrough_url?: string;
  is_featured: boolean;
  is_verified: boolean;
  views_count: number;
  created_at: string;
  updated_at: string;
  // Relations
  media?: PropertyMedia[];
  owner?: UserProfile;
}

export interface PropertyMedia {
  id: string;
  property_id: string;
  url: string;
  media_type: 'photo' | 'floor_plan' | '360_panorama' | 'document';
  caption?: string;
  sort_order: number;
  is_cover: boolean;
}

export interface UserProfile {
  id: string;
  role: UserRole;
  full_name: string;
  phone?: string;
  email: string;
  avatar_url?: string;
  is_verified: boolean;
  rera_number?: string;
  bio?: string;
  created_at: string;
}

export interface Inquiry {
  id: string;
  property_id: string;
  user_id?: string;
  full_name: string;
  email: string;
  phone: string;
  message: string;
  inquiry_type: 'general' | 'schedule_visit' | 'request_callback' | 'make_offer';
  preferred_tour_date?: string;
  status: InquiryStatus;
  created_at: string;
  property?: Property;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image?: string;
  category: string;
  author_id?: string;
  is_published: boolean;
  published_at?: string;
  seo_title?: string;
  seo_description?: string;
  created_at: string;
  author?: UserProfile;
}

export interface Payment {
  id: string;
  user_id: string;
  property_id?: string;
  amount: number;
  currency: string;
  purpose: string;
  gateway: string;
  gateway_order_id?: string;
  gateway_payment_id?: string;
  status: 'pending' | 'captured' | 'failed' | 'refunded';
  created_at: string;
}
