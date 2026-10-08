import { siteConfig } from '@/config/site';

/**
 * Enterprise RealEstateAgent / LocalBusiness Schema (Jodhpur Level)
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['RealEstateAgent', 'LocalBusiness'],
    '@id': `${siteConfig.url}/#realestateagent`,
    name: 'Shreeniwas Rentals & Properties Jodhpur',
    alternateName: ['Shreeniwas Properties', 'Shree Niwas Real Estate Jodhpur'],
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo/shreeniwas-logo-icon.png`,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200',
    description: 'Premier verified real estate agency in Jodhpur, Rajasthan offering luxury villas, rental residences, commercial offices, JDA approved plots, and heritage properties.',
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    priceRange: '₹₹ - ₹₹₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '103, Jodhana Arcade, Bombay Motor Circle',
      addressLocality: 'Jodhpur',
      addressRegion: 'Rajasthan',
      postalCode: '342003',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 26.2734,
      longitude: 73.0125,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Jodhpur',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Sardarpura, Jodhpur',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Shastri Nagar, Jodhpur',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Ratanada, Jodhpur',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Paota, Jodhpur',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Pal Road, Jodhpur',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Chopasni Housing Board, Jodhpur',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Kudi Bhagtasni, Jodhpur',
      },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        opens: '10:00',
        closes: '18:00',
      },
    ],
    sameAs: [
      siteConfig.links.instagram,
      siteConfig.links.facebook,
      siteConfig.links.youtube,
      'https://maps.google.com/?q=Bombay+Motor+Circle+Jodhpur',
    ],
  };
}

/**
 * FAQ Schema for Jodhpur Real Estate Search Intent
 */
export function generateLocalFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are the top residential areas to rent or buy property in Jodhpur?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The most sought-after residential localities in Jodhpur include Shastri Nagar, Sardarpura, Ratanada, Paota, and Pal Road. These areas offer excellent connectivity to AIIMS Jodhpur, top schools, and city commercial centers.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Shreeniwas Properties deal in JDA approved plots and villas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Shreeniwas Properties strictly verifies legal titles, JDA approvals, and RERA registration compliance for all residential plots, luxury villas, and commercial complexes listed on our platform.',
        },
      },
      {
        '@type': 'Question',
        name: 'How can I schedule a VIP property site visit in Jodhpur?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can book a guaranteed VIP site visit directly through our website with verified advisor accompaniment and cab pickup options, or connect with our Jodhpur advisory desk via WhatsApp at +91 6376117833.',
        },
      },
    ],
  };
}

/**
 * RealEstateListing / SingleFamilyResidence Schema
 */
export function generatePropertyDetailSchema(property: {
  title: string;
  description: string;
  price: string;
  location: string;
  city: string;
  type: string;
  images?: string[];
  slug: string;
}) {
  const numericPrice = property.price.replace(/[^0-9]/g, '') || '0';

  return {
    '@context': 'https://schema.org',
    '@type': ['RealEstateListing', 'SingleFamilyResidence'],
    name: property.title,
    description: property.description,
    url: `${siteConfig.url}/properties/${property.slug}`,
    image: property.images && property.images.length > 0 ? property.images : [siteConfig.ogImage],
    offers: {
      '@type': 'Offer',
      price: numericPrice,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      businessFunction: 'http://purl.org/goodrelations/v1#LeaseOut',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.location,
      addressLocality: property.city || 'Jodhpur',
      addressRegion: 'Rajasthan',
      addressCountry: 'IN',
    },
  };
}
