/**
 * Rajasthan Location & GPS Geolocation Service
 * Computes closest Rajasthan city based on user's GPS coordinates using Haversine formula.
 */

export interface RajasthanCityCoord {
  name: string;
  slug: string;
  lat: number;
  lng: number;
  popularLocalities: string[];
}

export const RAJASTHAN_CITIES_COORDS: RajasthanCityCoord[] = [
  {
    name: 'Jaipur',
    slug: 'jaipur',
    lat: 26.9124,
    lng: 75.7873,
    popularLocalities: ['Mansarovar', 'Vaishali Nagar', 'C-Scheme', 'Malviya Nagar', 'Jagatpura', 'Tonk Road']
  },
  {
    name: 'Jodhpur',
    slug: 'jodhpur',
    lat: 26.2389,
    lng: 73.0243,
    popularLocalities: ['Ratanada', 'Shastri Nagar', 'Sardarpura', 'Paota', 'Pal Road']
  },
  {
    name: 'Udaipur',
    slug: 'udaipur',
    lat: 24.5854,
    lng: 73.7125,
    popularLocalities: ['Fatehpura', 'Shobhagpura', 'Lake Pichola', 'Sukher', 'Hiran Magri']
  },
  {
    name: 'Kota',
    slug: 'kota',
    lat: 25.2138,
    lng: 75.8648,
    popularLocalities: ['RK Puram', 'Vigyan Nagar', 'Talwandi', 'Kunhari']
  },
  {
    name: 'Ajmer',
    slug: 'ajmer',
    lat: 26.4499,
    lng: 74.6399,
    popularLocalities: ['Vaishali Nagar', 'Panchsheel Nagar', 'Civil Lines', 'Ana Sagar']
  },
  {
    name: 'Bikaner',
    slug: 'bikaner',
    lat: 28.0229,
    lng: 73.3119,
    popularLocalities: ['Sadul Ganj', 'Jai Narayan Vyas Colony', 'Pawan Puri', 'Kanta Khaturia']
  },
  {
    name: 'Bhilwara',
    slug: 'bhilwara',
    lat: 25.3407,
    lng: 74.6313,
    popularLocalities: ['Subhash Nagar', 'Shastri Nagar', 'Bhopal Ganj', 'Patel Nagar']
  },
  {
    name: 'Alwar',
    slug: 'alwar',
    lat: 27.5530,
    lng: 76.6346,
    popularLocalities: ['Moti Doongri', 'Kala Kuan', 'Neemrana Corridor', 'Scheme 2']
  }
];

/**
 * Calculates distance in kilometers between two geo-coordinates
 */
function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Finds the closest Rajasthan city to given latitude & longitude
 */
export function findNearestRajasthanCity(lat: number, lng: number): {
  city: RajasthanCityCoord;
  distanceKm: number;
} {
  let nearestCity = RAJASTHAN_CITIES_COORDS[0];
  let minDistance = haversineDistance(lat, lng, nearestCity.lat, nearestCity.lng);

  for (let i = 1; i < RAJASTHAN_CITIES_COORDS.length; i++) {
    const city = RAJASTHAN_CITIES_COORDS[i];
    const dist = haversineDistance(lat, lng, city.lat, city.lng);
    if (dist < minDistance) {
      minDistance = dist;
      nearestCity = city;
    }
  }

  return {
    city: nearestCity,
    distanceKm: Math.round(minDistance)
  };
}

export const STORAGE_KEY_DETECTED_CITY = 'shreeniwas_user_detected_city';
export const EVENT_NAME_LOCATION_DETECTED = 'shreeniwas_location_detected';

/**
 * Gets currently saved detected city from localStorage, fallback 'Jaipur'
 */
export function getSavedDetectedCity(): string {
  if (typeof window === 'undefined') return 'Jaipur';
  try {
    const saved = localStorage.getItem(STORAGE_KEY_DETECTED_CITY);
    if (saved) return saved;
  } catch (e) {}
  return 'Jaipur';
}

/**
 * Saves detected city and broadcasts event across the application
 */
export function saveDetectedCity(cityName: string) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_DETECTED_CITY, cityName);
    window.dispatchEvent(new CustomEvent(EVENT_NAME_LOCATION_DETECTED, { detail: cityName }));
  } catch (e) {}
}

/**
 * Requests browser GPS position and returns detected city
 */
export async function detectUserCityViaGPS(): Promise<{
  success: boolean;
  cityName: string;
  distanceKm?: number;
  error?: string;
}> {
  if (typeof window === 'undefined' || !navigator.geolocation) {
    return { success: false, cityName: 'Jaipur', error: 'Geolocation is not supported by your browser.' };
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const result = findNearestRajasthanCity(latitude, longitude);
        saveDetectedCity(result.city.name);
        resolve({
          success: true,
          cityName: result.city.name,
          distanceKm: result.distanceKm
        });
      },
      (err) => {
        resolve({
          success: false,
          cityName: getSavedDetectedCity(),
          error: err.message || 'Unable to retrieve location.'
        });
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  });
}
