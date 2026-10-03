-- Seed Properties in Rajasthan Cities
INSERT INTO public.properties (
  slug, title, description, purpose, category, status, price, security_deposit, maintenance_charges,
  price_negotiable, carpet_area_sqft, bedrooms, bathrooms, balconies, furnishing, parking_slots,
  facing, address_line, locality, city, state, pincode, latitude, longitude, coordinates,
  amenities, is_featured, is_verified, owner_id
) VALUES 
(
  'luxury-3-bhk-apartment-vaishali-nagar-jaipur',
  'Luxury 3 BHK Apartment in Vaishali Nagar',
  'Spacious modern apartment with modular kitchen, wooden flooring, and park views in heart of Jaipur.',
  'rent', 'apartment', 'active', 45000, 90000, 2500, true, 1800, 3, 3, 2, 'semi_furnished', 2,
  'North-East', 'Block B, Vaishali Nagar', 'Vaishali Nagar', 'Jaipur', 'Rajasthan', '302021',
  26.9124, 75.7433, ST_SetSRID(ST_MakePoint(75.7433, 26.9124), 4326),
  ARRAY['lift', 'swimming_pool', 'gym', 'parking', 'power_backup', 'security_24x7'], true, true, '00000000-0000-0000-0000-000000000000'
),
(
  'royal-4-bhk-villa-shastri-nagar-jodhpur',
  'Royal Independent 4 BHK Villa',
  'Architectural heritage villa with private garden, marble flooring, and 24/7 security near Shastri Circle.',
  'sale', 'villa', 'active', 18500000, 0, 5000, false, 3200, 4, 4, 3, 'fully_furnished', 3,
  'East', 'Road No 3, Shastri Nagar', 'Shastri Nagar', 'Jodhpur', 'Rajasthan', '342003',
  26.2731, 73.0086, ST_SetSRID(ST_MakePoint(73.0086, 26.2731), 4326),
  ARRAY['garden', 'parking', 'cctv', 'water_supply', 'vastu_compliant', 'servant_room'], true, true, '00000000-0000-0000-0000-000000000000'
),
(
  'lake-view-5-bhk-penthouse-fateh-sagar-udaipur',
  'Panoramic Lake View 5 BHK Penthouse',
  'Unmatched luxury penthouse overlooking Lake Fateh Sagar with terrace pool and private elevator access.',
  'sale', 'penthouse', 'active', 35000000, 0, 10000, true, 4500, 5, 5, 4, 'fully_furnished', 4,
  'North', 'Fateh Sagar Lake Road', 'Fateh Sagar', 'Udaipur', 'Rajasthan', '313001',
  24.6001, 73.6796, ST_SetSRID(ST_MakePoint(73.6796, 24.6001), 4326),
  ARRAY['swimming_pool', 'clubhouse', 'wifi', 'air_conditioning', 'intercom'], true, true, '00000000-0000-0000-0000-000000000000'
);
