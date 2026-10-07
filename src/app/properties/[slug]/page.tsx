'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ChevronRight, MapPin, Share2, Heart, CheckCircle2, 
  BedDouble, Bath, Square, Car, Shield, Wifi, 
  Trees, Phone, MessageSquare, Building2, ImageIcon, Video, Home, Crown, CreditCard, ChevronLeft,
  Clock, ShieldCheck, Zap, Compass, Navigation, School, Stethoscope, Plane, Train, Sparkles, Check,
  AlertCircle, ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ScheduleVisitModal from '@/components/shared/schedule-visit-modal';
import SavePropertyButton from '@/components/shared/save-property-button';
import PropertyShareModal from '@/components/shared/property-share-modal';

const BASE_MOCK_PROPERTIES: Record<string, any> = {
  'royal-heritage-residency-jaipur': {
    title: 'The Royal Heritage Residency Villa',
    location: 'Vaishali Nagar, Jaipur',
    city: 'Jaipur',
    price: '₹3.5 Cr',
    pricePerSqft: '₹10,937/sq.ft',
    status: 'Ready to Move',
    type: 'Luxury Villa',
    bhk: '4 BHK',
    area: '3,200 sq.ft',
    carpetArea: '2,850 sq.ft',
    baths: 4,
    balconies: 3,
    furnishing: 'Fully Furnished',
    floor: 'G+2 Villa',
    parking: '2 Covered Slots',
    facing: 'East (Vastu Compliant)',
    age: '0-1 Years',
    available: 'Immediate',
    reraApproved: true,
    zeroBrokerage: true,
    description: 'Experience unparalleled luxury in this exquisite 4 BHK villa located in the heart of Vaishali Nagar, Jaipur. Featuring premium Italian marble flooring, state-of-the-art modular kitchen, double-height ceilings, and private terrace lounge overlooking the Pink City landscape.',
    amenities: [
      { name: 'Private Elevator', icon: Building2 },
      { name: 'Infinity Pool', icon: Bath },
      { name: 'Fitness Gym', icon: Shield },
      { name: 'Covered Parking', icon: Car },
      { name: '100% Power Backup', icon: Zap },
      { name: '24x7 Smart Security', icon: ShieldCheck },
      { name: 'Landscaped Garden', icon: Trees },
      { name: 'High-Speed Wi-Fi', icon: Wifi },
    ],
    nearbyHighlights: [
      { name: 'Jaipur International Airport', distance: '12.5 km', icon: Plane },
      { name: 'Jaipur Junction Railway Station', distance: '5.2 km', icon: Train },
      { name: 'DPS & Tagored Public School', distance: '1.2 km', icon: School },
      { name: 'Fortis & Eternal Hospital', distance: '2.4 km', icon: Stethoscope },
      { name: 'Mansarovar Metro Station', distance: '1.8 km', icon: Navigation },
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&q=80&w=800',
    ]
  },
  'lakeview-palace-heights-udaipur': {
    title: 'Lakeview Palace Heights Penthouse',
    location: 'Fatehpura, Udaipur',
    city: 'Udaipur',
    price: '₹1.8 Cr',
    pricePerSqft: '₹8,181/sq.ft',
    status: 'Under Construction',
    type: 'Penthouse Apartment',
    bhk: '3 BHK',
    area: '2,200 sq.ft',
    carpetArea: '1,950 sq.ft',
    baths: 3,
    balconies: 2,
    furnishing: 'Semi-Furnished',
    floor: '12th Floor (Top Penthouse)',
    parking: '1 Covered Slot',
    facing: 'North-East',
    age: 'New Construction',
    available: 'Possession in Dec 2024',
    reraApproved: true,
    zeroBrokerage: false,
    description: 'Overlooking the serene waters of Lake Pichola and Fateh Sagar, this exclusive 3 BHK Penthouse combines contemporary architecture with iconic Mewar royal elegance. Features private sky lounge and panoramic city views.',
    amenities: [
      { name: 'Rooftop Pool', icon: Bath },
      { name: 'Clubhouse & Lounge', icon: Building2 },
      { name: '24x7 Security', icon: ShieldCheck },
      { name: 'Covered Parking', icon: Car },
      { name: 'Power Backup', icon: Zap },
      { name: 'High-Speed Wi-Fi', icon: Wifi },
    ],
    nearbyHighlights: [
      { name: 'Maharana Pratap Airport', distance: '21.0 km', icon: Plane },
      { name: 'Udaipur City Railway Station', distance: '4.8 km', icon: Train },
      { name: 'Fateh Sagar Lakefront', distance: '1.1 km', icon: Navigation },
      { name: 'Geetanjali Hospital', distance: '6.2 km', icon: Stethoscope },
    ],
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    ]
  },
  'sun-city-heritage-haveli-jodhpur': {
    title: 'Sun City Heritage Haveli',
    location: 'Ratanada, Jodhpur',
    city: 'Jodhpur',
    price: '₹5.2 Cr',
    pricePerSqft: '₹11,555/sq.ft',
    status: 'Ready to Move',
    type: 'Heritage Haveli',
    bhk: '5+ BHK',
    area: '4,500 sq.ft',
    carpetArea: '4,100 sq.ft',
    baths: 6,
    balconies: 4,
    furnishing: 'Fully Furnished (Heritage Decor)',
    floor: 'Palatial Courtyard Estate',
    parking: '4 Covered Slots',
    facing: 'East (Auspicious)',
    age: 'Restored Landmark',
    available: 'Immediate',
    reraApproved: true,
    zeroBrokerage: true,
    description: 'An architectural jewel in Jodhpur featuring authentic carved sandstone jharokhas, private central courtyard pool, and majestic Mehrangarh Fort views. Ideal for luxury family living or high-end heritage boutique residency.',
    amenities: [
      { name: 'Private Courtyard', icon: Trees },
      { name: 'Heritage Fountain Pool', icon: Bath },
      { name: 'Carved Jharokha Balcony', icon: Building2 },
      { name: 'Full Power Backup', icon: Zap },
      { name: 'CCTV Security', icon: ShieldCheck },
    ],
    nearbyHighlights: [
      { name: 'Jodhpur Civil Airport', distance: '4.5 km', icon: Plane },
      { name: 'Jodhpur Railway Station', distance: '3.2 km', icon: Train },
      { name: 'Mehrangarh Fort', distance: '5.0 km', icon: Navigation },
      { name: 'AIIMS Jodhpur', distance: '4.8 km', icon: Stethoscope },
    ],
  },
  'shreeniwas-prime-enclave-jaipur': {
    id: 4,
    slug: 'shreeniwas-prime-enclave-jaipur',
    title: 'Shreeniwas Prime Enclave',
    location: 'Mansarovar, Jaipur',
    city: 'Jaipur',
    price: '₹85 Lakh',
    pricePerSqft: '₹5,666/sq.ft',
    status: 'Ready to Move',
    type: 'Modern Apartment',
    bhk: '3 BHK',
    area: '1,500 sq.ft',
    carpetArea: '1,320 sq.ft',
    baths: 3,
    balconies: 2,
    furnishing: 'Semi-Furnished',
    floor: '6th Floor of 12',
    parking: '1 Covered Slot',
    facing: 'North-East',
    age: 'Ready to Move',
    available: 'Immediate',
    reraApproved: true,
    zeroBrokerage: true,
    description: 'A contemporary 3 BHK apartment in the thriving locality of Mansarovar, Jaipur. Features cross-ventilation, Italian-style tiles, branded fittings, and access to an exclusive community clubhouse and rooftop yoga zone.',
    amenities: [
      { name: 'Clubhouse', icon: Building2 },
      { name: 'Children Play Area', icon: Trees },
      { name: '24x7 Security', icon: ShieldCheck },
      { name: 'Power Backup', icon: Zap },
      { name: 'Covered Parking', icon: Car },
    ],
    nearbyHighlights: [
      { name: 'Mansarovar Metro Station', distance: '1.2 km', icon: Navigation },
      { name: 'Jaipur International Airport', distance: '8.5 km', icon: Plane },
      { name: 'Apex Hospital', distance: '1.8 km', icon: Stethoscope },
    ],
    images: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    ]
  },
  'pink-city-commercial-plaza-jaipur': {
    id: 5,
    slug: 'pink-city-commercial-plaza-jaipur',
    title: 'Pink City Commercial Plaza',
    location: 'C-Scheme, Jaipur',
    city: 'Jaipur',
    price: '₹2.1 Cr',
    pricePerSqft: '₹14,000/sq.ft',
    status: 'Ready to Move',
    type: 'Commercial',
    bhk: 'Office Space',
    area: '1,500 sq.ft',
    carpetArea: '1,400 sq.ft',
    baths: 2,
    balconies: 1,
    furnishing: 'Bare Shell / Fitted',
    floor: '4th Floor Commercial Complex',
    parking: '3 Reserved Slots',
    facing: 'Main Road Frontage',
    age: 'New Construction',
    available: 'Immediate',
    reraApproved: true,
    zeroBrokerage: false,
    description: 'Grade-A premium commercial office suite in prestigious C-Scheme, Jaipur. Equipped with high-speed elevators, centralized HVAC, round-the-clock facility management, and glass facade frontage ideal for corporate headquarters or legal consultancies.',
    amenities: [
      { name: 'Central Air Conditioning', icon: Zap },
      { name: 'High-Speed Elevators', icon: Building2 },
      { name: 'Triple Tier Security', icon: ShieldCheck },
      { name: 'Valet Parking', icon: Car },
    ],
    nearbyHighlights: [
      { name: 'MI Road Business Hub', distance: '0.8 km', icon: Navigation },
      { name: 'Jaipur Junction', distance: '3.0 km', icon: Train },
    ],
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    ]
  },
  'lake-city-royal-residency-udaipur': {
    id: 6,
    slug: 'lake-city-royal-residency-udaipur',
    title: 'Lake City Royal Residency',
    location: 'Shobhagpura, Udaipur',
    city: 'Udaipur',
    price: '₹65 Lakh',
    pricePerSqft: '₹4,814/sq.ft',
    status: 'Ready to Move',
    type: 'Apartment',
    bhk: '2 BHK',
    area: '1,350 sq.ft',
    carpetArea: '1,180 sq.ft',
    baths: 2,
    balconies: 2,
    furnishing: 'Semi-Furnished',
    floor: '3rd Floor of 7',
    parking: '1 Covered Slot',
    facing: 'East Facing',
    age: 'Ready to Move',
    available: 'Immediate',
    reraApproved: true,
    zeroBrokerage: true,
    description: 'Charming 2 BHK residence in prime Shobhagpura, Udaipur. Peaceful residential neighborhood, landscaped gardens, water treatment plant, and rapid connectivity to Sukher and the university campus.',
    amenities: [
      { name: 'Gated Security', icon: ShieldCheck },
      { name: 'Community Garden', icon: Trees },
      { name: 'Covered Parking', icon: Car },
      { name: 'Power Backup', icon: Zap },
    ],
    nearbyHighlights: [
      { name: 'Sukher Circle', distance: '1.5 km', icon: Navigation },
      { name: 'Fateh Sagar Lake', distance: '4.2 km', icon: Trees },
    ],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
    ]
  },
  'royal-palms-luxury-villa-jodhpur': {
    id: 7,
    slug: 'royal-palms-luxury-villa-jodhpur',
    title: 'Royal Palms Luxury Villa',
    location: 'Sardarpura, Jodhpur',
    city: 'Jodhpur',
    price: '₹4.1 Cr',
    pricePerSqft: '₹11,080/sq.ft',
    status: 'Ready to Move',
    type: 'Luxury Villa',
    bhk: '4 BHK',
    area: '3,700 sq.ft',
    carpetArea: '3,300 sq.ft',
    baths: 4,
    balconies: 3,
    furnishing: 'Fully Furnished',
    floor: 'Independent G+2 Villa',
    parking: '2 Covered Slots',
    facing: 'North-East (Vastu Compliant)',
    age: '0-1 Years',
    available: 'Immediate',
    reraApproved: true,
    zeroBrokerage: true,
    description: 'Palatial 4 BHK luxury villa situated in prestigious Sardarpura, Jodhpur. Designed with Jodhpur red stone accents, private lawn, modular chef kitchen, home theatre lounge, and private rooftop deck.',
    amenities: [
      { name: 'Private Garden Lawn', icon: Trees },
      { name: 'Home Automation', icon: Zap },
      { name: '24x7 Security', icon: ShieldCheck },
      { name: 'Covered Parking', icon: Car },
    ],
    nearbyHighlights: [
      { name: 'Jodhpur Junction', distance: '2.5 km', icon: Train },
      { name: 'AIIMS Jodhpur', distance: '3.8 km', icon: Stethoscope },
    ],
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    ]
  },
  'marwar-courtyard-heritage-haveli-jodhpur': {
    id: 8,
    slug: 'marwar-courtyard-heritage-haveli-jodhpur',
    title: 'Marwar Courtyard Heritage Haveli',
    location: 'Old City, Jodhpur',
    city: 'Jodhpur',
    price: '₹6.8 Cr',
    pricePerSqft: '₹13,600/sq.ft',
    status: 'Ready to Move',
    type: 'Heritage Haveli',
    bhk: '6 BHK',
    area: '5,000 sq.ft',
    carpetArea: '4,600 sq.ft',
    baths: 6,
    balconies: 5,
    furnishing: 'Heritage Restored Furnishing',
    floor: 'Heritage Courtyard Mansion',
    parking: '3 Covered Slots',
    facing: 'East Facing',
    age: 'Historically Restored',
    available: 'Immediate',
    reraApproved: true,
    zeroBrokerage: true,
    description: 'Majestic 6 BHK restored Marwari haveli offering undisturbed views of Mehrangarh Fort. Features hand-carved stone arches, central open courtyard, frescoed ceilings, and heritage brass fittings throughout.',
    amenities: [
      { name: 'Heritage Courtyard', icon: Trees },
      { name: 'Fort View Terrace', icon: Building2 },
      { name: '24x7 Smart CCTV', icon: ShieldCheck },
      { name: 'Complete Power Backup', icon: Zap },
    ],
    nearbyHighlights: [
      { name: 'Mehrangarh Fort', distance: '1.2 km', icon: Navigation },
      { name: 'Clock Tower Market', distance: '0.6 km', icon: Trees },
    ],
    images: [
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    ]
  }
};

export default function PropertyDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || '';

  const [property, setProperty] = useState<any>(BASE_MOCK_PROPERTIES['royal-heritage-residency-jaipur']);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('overview');
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const resolveProperty = () => {
      // 1. Check admin-created/edited properties in localStorage FIRST so updates take effect immediately
      try {
        const savedProps = localStorage.getItem('shreeniwas_admin_properties');
        if (savedProps && slug) {
          const parsed = JSON.parse(savedProps);
          const slugClean = slug.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          const match = parsed.find((p: any) => 
            p.id?.toString().toLowerCase() === slug.toLowerCase() ||
            p.slug?.toLowerCase() === slug.toLowerCase() ||
            (p.title && p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slugClean) ||
            p.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').includes(slugClean) ||
            slugClean.includes(p.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-'))
          );

          if (match) {
            setProperty({
              title: match.title,
              location: match.location || 'Jaipur, Rajasthan',
              city: match.location?.split(',')[1]?.trim() || match.city || 'Jaipur',
              price: match.price || 'Price on Request',
              pricePerSqft: match.pricePerSqft || '₹8,500/sq.ft',
              status: match.status || 'Ready to Move',
              type: match.type || 'Luxury Villa',
              bhk: match.bedrooms ? `${match.bedrooms} BHK` : '3 BHK',
              area: match.sqft ? `${match.sqft} sq.ft` : '2,400 sq.ft',
              carpetArea: match.sqft ? `${Number(match.sqft) * 0.85} sq.ft` : '2,040 sq.ft',
              baths: match.bathrooms || 3,
              balconies: 2,
              furnishing: match.furnishing || 'Semi-Furnished',
              floor: match.floor || 'Ground + 1',
              parking: match.parking || '2 Covered Slots',
              facing: match.facing || 'East (Vastu Compliant)',
              age: match.age || '0-1 Years',
              available: 'Immediate',
              reraApproved: true,
              zeroBrokerage: true,
              description: match.description || `Exclusive verified listing on Shreeniwas Properties: ${match.title} situated in prime ${match.location}. Built with royal Rajasthani standards, premium fittings, and serene surroundings.`,
              amenities: match.amenities && match.amenities.length > 0 ? match.amenities.map((a: string) => ({ name: a, icon: ShieldCheck })) : [
                { name: '100% Power Backup', icon: Zap },
                { name: '24x7 Security', icon: ShieldCheck },
                { name: 'Covered Parking', icon: Car },
                { name: 'Landscaped Garden', icon: Trees },
              ],
              nearbyHighlights: [
                { name: 'City Center Hub', distance: '2.5 km', icon: Navigation },
                { name: 'Nearby Airport / Junction', distance: '8.0 km', icon: Plane },
                { name: 'Top Educational Institution', distance: '1.5 km', icon: School },
                { name: 'Super Specialty Hospital', distance: '2.0 km', icon: Stethoscope },
              ],
              images: match.image ? [match.image] : (match.images && match.images.length > 0 ? match.images : [
                'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200'
              ]),
              googleMapsUrl: match.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${match.title} ${match.location}`)}`
            });
            return;
          }
        }
      } catch (e) {}

      // 2. Check built-in mock properties by direct key
      if (slug && BASE_MOCK_PROPERTIES[slug]) {
        setProperty(BASE_MOCK_PROPERTIES[slug]);
        return;
      }

      // 3. Check built-in mock properties by ID or slug match
      if (slug) {
        const directMatch = Object.entries(BASE_MOCK_PROPERTIES).find(([key, p]: [string, any]) => 
          key.toLowerCase() === slug.toLowerCase() ||
          p.id?.toString() === slug.toString() ||
          p.slug === slug ||
          p.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').includes(slug.toLowerCase()) ||
          slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').includes(p.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-'))
        );
        if (directMatch) {
          setProperty(directMatch[1]);
          return;
        }
      }

      // 4. Fallback default
      setProperty(BASE_MOCK_PROPERTIES['royal-heritage-residency-jaipur']);
    };

    resolveProperty();

    window.addEventListener('shreeniwas_data_updated', resolveProperty);
    window.addEventListener('storage', resolveProperty);
    return () => {
      window.removeEventListener('shreeniwas_data_updated', resolveProperty);
      window.removeEventListener('storage', resolveProperty);
    };
  }, [slug]);

  // Load and sync saved favorite status for this property
  useEffect(() => {
    try {
      const stored = localStorage.getItem('shreeniwas_user_favorites');
      if (stored && slug) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const match = parsed.some((item: string) => 
            item === slug || 
            item === property?.id || 
            property?.title?.toLowerCase().includes(item.toLowerCase())
          );
          setIsSaved(match);
        }
      }
    } catch (e) {}

    const handleFavsUpdate = () => {
      try {
        const stored = localStorage.getItem('shreeniwas_user_favorites');
        if (stored && slug) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            const match = parsed.some((item: string) => 
              item === slug || 
              item === property?.id || 
              property?.title?.toLowerCase().includes(item.toLowerCase())
            );
            setIsSaved(match);
          }
        }
      } catch (e) {}
    };

    window.addEventListener('shreeniwas_favorites_updated', handleFavsUpdate);
    return () => window.removeEventListener('shreeniwas_favorites_updated', handleFavsUpdate);
  }, [slug, property]);

  const handleToggleSave = () => {
    const nextSaved = !isSaved;
    setIsSaved(nextSaved);

    try {
      const propIdentifier = property?.id || slug;
      const stored = localStorage.getItem('shreeniwas_user_favorites');
      const list: string[] = stored ? JSON.parse(stored) : [];
      let updatedList: string[];

      if (nextSaved) {
        updatedList = Array.from(new Set([...list, String(propIdentifier), slug]));
      } else {
        updatedList = list.filter(item => item !== String(propIdentifier) && item !== slug);
      }
      localStorage.setItem('shreeniwas_user_favorites', JSON.stringify(updatedList));

      // Also sync into user portal favorites if session active
      const session = localStorage.getItem('shreeniwas_user_session');
      if (session) {
        const parsed = JSON.parse(session);
        if (parsed?.email) {
          const userFavsKey = `shreeniwas_saved_favorites_${parsed.email}`;
          const existing = JSON.parse(localStorage.getItem(userFavsKey) || '[]');
          let nextUserFavs;
          if (nextSaved) {
            const item = {
              id: String(property?.id || slug),
              title: property?.title || 'Luxury Property',
              location: property?.location || 'Jaipur',
              price: property?.price || 'Price on Request',
              bhk: property?.bhk || '3 BHK',
              image: property?.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
              type: property?.type || 'Apartment'
            };
            nextUserFavs = [item, ...existing.filter((x: any) => x.id !== String(property?.id || slug))];
          } else {
            nextUserFavs = existing.filter((x: any) => x.id !== String(property?.id || slug) && x.id !== slug);
          }
          localStorage.setItem(userFavsKey, JSON.stringify(nextUserFavs));
        }
      }

      window.dispatchEvent(new Event('shreeniwas_favorites_updated'));
    } catch (e) {}
  };

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'photos', label: 'Photos' },
    { id: 'locality', label: 'Locality & Distance' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'agent', label: 'Agent & Visit' },
  ];

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#0A1628] pb-32 lg:pb-24">
      {/* Mobile Action Bar (Placed cleanly below fixed Navbar) */}
      <div className="md:hidden bg-white/95 border-b border-slate-200 px-4 py-2.5 pt-20 flex items-center justify-between shadow-sm">
        <Link href="/properties" className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-[#C9A96E] p-1.5 rounded-lg bg-slate-50">
          <ChevronLeft className="w-4 h-4"/> Back to Properties
        </Link>
        <div className="flex gap-2 items-center">
          <button onClick={handleShare} className="p-2 bg-slate-100 rounded-full shadow-sm text-slate-700" title="Share Property">
            {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4"/>}
          </button>
          <SavePropertyButton
            property={{
              id: property.id || slug,
              slug,
              title: property.title,
              location: property.location,
              price: property.price,
              bhk: property.bhk,
              image: property.images?.[0],
              type: property.type
            }}
          />
        </div>
      </div>

      {/* Desktop Breadcrumbs */}
      <div className="hidden md:block bg-white border-b border-slate-200 pt-24 sm:pt-28 pb-4">
        <div className="max-w-7xl mx-auto px-6 text-xs font-semibold text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-[#C9A96E]">Home</Link> <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/properties" className="hover:text-[#C9A96E]">Properties</Link> <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#0A1628]">{property.title}</span>
          </div>
          <div className="flex items-center gap-4">
            <SavePropertyButton
              property={{
                id: property.id || slug,
                slug,
                title: property.title,
                location: property.location,
                price: property.price,
                bhk: property.bhk,
                image: property.images?.[0],
                type: property.type
              }}
              variant="detail"
            />
            <button 
              onClick={handleShare}
              className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-[#C9A96E] font-bold cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              {copiedLink ? 'Link Copied!' : 'Share Listing'}
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Section Navbar */}
      <div className="bg-white border-b border-slate-200 sticky top-14 sm:top-16 z-30 shadow-sm hidden sm:block">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-6 overflow-x-auto no-scrollbar py-3 text-xs font-bold uppercase tracking-wider">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => {
                setActiveSection(s.id);
                document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`whitespace-nowrap transition-all cursor-pointer ${
                activeSection === s.id ? 'text-[#C9A96E] border-b-2 border-[#C9A96E] pb-1' : 'text-slate-500 hover:text-[#0A1628]'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto md:px-6 md:py-8 pt-16 md:pt-8">
        
        {/* Mobile Photo Carousel */}
        <div className="block md:hidden relative w-full h-[320px] overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.img 
              key={currentImageIndex}
              src={property.images[currentImageIndex] || property.images[0]}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-bold tracking-widest backdrop-blur-sm">
            {currentImageIndex + 1} / {property.images.length}
          </div>
        </div>

        {/* Desktop Photo Grid */}
        <div id="photos" className="hidden md:grid grid-cols-4 gap-2 rounded-3xl overflow-hidden h-[420px] lg:h-[480px] mb-8 relative border border-slate-200 shadow-md">
          <div className="col-span-2 h-full relative group">
            <img src={property.images[0]} alt="Main" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 cursor-pointer" />
            <span className="absolute top-4 left-4 bg-white/95 backdrop-blur text-[#0A1628] text-xs font-bold px-3 py-1.5 rounded-full shadow flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> RERA Approved Listing
            </span>
          </div>
          <div className="grid grid-rows-2 gap-2 h-full">
            <img src={property.images[1] || property.images[0]} alt="1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" />
            <img src={property.images[2] || property.images[0]} alt="2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" />
          </div>
          <div className="grid grid-rows-2 gap-2 h-full">
            <img src={property.images[3] || property.images[0]} alt="3" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" />
            <img src={property.images[4] || property.images[0]} alt="4" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" />
          </div>
        </div>

        {/* Property Header Banner */}
        <div id="overview" className="px-4 md:px-0 py-6 md:py-0 mb-8 flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Listing
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-serif font-bold text-[#0A1628] mb-2">{property.title}</h1>
            <div className="flex flex-wrap items-center gap-2 text-slate-600 text-sm md:text-base">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#C9A96E]" /> {property.location}
              </span>
              <span>•</span>
              <span className="text-emerald-700 font-semibold">{property.status}</span>
              <span>•</span>
              <a
                href={property.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${property.title} ${property.location}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200 transition-colors"
                title="Open location in Google Maps"
              >
                <span>📍 Map Location</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="flex md:flex-col items-baseline md:items-end justify-between w-full md:w-auto pt-4 md:pt-0 border-t border-slate-200 md:border-none">
            <span className="text-xs text-slate-400 block font-semibold uppercase">Asking Price</span>
            <span className="text-3xl font-serif font-bold text-[#0A1628]">{property.price}</span>
            <span className="text-xs font-mono text-emerald-700 mt-0.5">{property.pricePerSqft}</span>
          </div>
        </div>

        {/* Key Spec Cards */}
        <div className="px-4 md:px-0 mb-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { l: 'Property Type', v: property.type },
            { l: 'BHK Unit', v: property.bhk },
            { l: 'Super Area', v: property.area },
            { l: 'Carpet Area', v: property.carpetArea },
            { l: 'Facing', v: property.facing },
            { l: 'Furnishing', v: property.furnishing }
          ].map((s, i) => (
            <div key={i} className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-sm text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{s.l}</span>
              <p className="font-bold text-sm text-[#0A1628]">{s.v}</p>
            </div>
          ))}
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 px-4 md:px-0">
          
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
              <h2 className="text-xl md:text-2xl font-serif font-bold text-[#0A1628] mb-3">About Property</h2>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">{property.description}</p>
            </section>

            {/* Locality & Distance Matrix with Google Maps Redirect */}
            <section id="locality" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-[#C9A96E]" />
                  <h2 className="text-xl md:text-2xl font-serif font-bold text-[#0A1628]">Locality & Nearby Highlights</h2>
                </div>
                <a
                  href={property.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${property.title} ${property.location}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold transition-all shadow-sm group"
                >
                  <MapPin className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                  <span>View on Google Maps / Directions</span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {property.nearbyHighlights?.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-3.5 bg-[#FDFBF7] rounded-2xl border border-slate-200/60">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#0A1628]/5 flex items-center justify-center text-[#0A1628]">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-slate-700">{item.name}</span>
                    </div>
                    <span className="text-xs font-bold text-[#C9A96E] bg-[#C9A96E]/10 px-2.5 py-1 rounded-full">{item.distance}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Amenities Grid */}
            <section id="amenities" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
              <h2 className="text-xl md:text-2xl font-serif font-bold text-[#0A1628] mb-6">Property Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {property.amenities?.map((am: any, i: number) => (
                  <div key={i} className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/60">
                    <div className="p-2 bg-[#C9A96E]/10 rounded-xl text-[#C9A96E]">
                      <am.icon className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-xs text-slate-800">{am.name}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sticky Desktop Sidebar */}
          <div id="agent" className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              {/* VIP Visit Card */}
              <div className="bg-[#0A1628] text-white p-6 sm:p-8 rounded-3xl border border-[#C9A96E]/40 shadow-2xl relative overflow-hidden">
                <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#C9A96E]/10 rounded-full blur-2xl pointer-events-none"></div>

                <div className="flex items-center gap-2 mb-3">
                  <Crown className="w-5 h-5 text-[#C9A96E]" />
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#C9A96E]">VIP Service</span>
                </div>

                <h3 className="text-xl font-serif font-bold text-white mb-2">Schedule Accompanied Visit</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Experience a private walkthrough with a senior property advisor, dedicated cab pickup, and comprehensive title deed verification.
                </p>

                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 mb-6 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 font-bold block">Visit Booking Fee</span>
                    <span className="text-2xl font-bold text-[#C9A96E]">₹499</span>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-1 rounded-md font-bold">
                    100% Refundable
                  </span>
                </div>

                <button
                  onClick={() => setIsBookModalOpen(true)}
                  className="w-full py-4 bg-[#C9A96E] hover:bg-[#b59760] text-[#0A1628] font-extrabold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Crown className="w-4 h-4" /> Book VIP Visit Now
                </button>

                <div className="mt-4 pt-4 border-t border-white/10 flex gap-2">
                  <a href="https://wa.me/916376117833" target="_blank" rel="noreferrer" className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors">
                    <MessageSquare className="w-4 h-4" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* VIP Site Visit Booking Modal with 3 Time Variations (9am-12, 12-3pm, 5-7pm) */}
      <ScheduleVisitModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        propertyTitle={property.title}
        propertyLocation={property.location}
        propertyPrice={property.price}
      />

      {/* Multi-App Direct Property Share Modal */}
      <PropertyShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        property={{
          slug,
          title: property.title,
          price: property.price,
          location: property.location,
          type: property.type,
          bhk: property.bhk,
          image: property.images?.[0]
        }}
      />

      {/* Sticky Mobile Bottom Contact Bar */}
      <div className="block lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 p-3 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Total Price</span>
            <span className="text-lg font-bold text-[#0A1628] leading-none">{property.price}</span>
          </div>
          <div className="flex gap-2 flex-1 justify-end">
            <a href="https://wa.me/916376117833" target="_blank" rel="noreferrer" className="flex-1 max-w-[130px] py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5"/> WhatsApp
            </a>
            <button onClick={() => setIsBookModalOpen(true)} className="flex-1 max-w-[150px] py-2.5 bg-[#0A1628] text-[#C9A96E] rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border border-[#C9A96E]/30">
              <Crown className="w-3.5 h-3.5"/> Visit ₹499
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
