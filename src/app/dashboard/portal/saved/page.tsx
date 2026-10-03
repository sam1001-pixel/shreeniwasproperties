import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, Bed, Bath, Square, Send, Trash2 } from "lucide-react";

const savedProperties = [
  {
    id: 1,
    slug: 'luxury-3-bhk-apartment-jaipur',
    title: "Modern 3 BHK Apartment",
    location: "C-Scheme, Jaipur",
    price: "₹45,000 /mo",
    beds: 3,
    baths: 3,
    sqft: 1800,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
    type: "Rent"
  },
  {
    id: 2,
    slug: 'royal-4-bhk-villa-jodhpur',
    title: "Luxury Heritage Villa",
    location: "Shastri Nagar, Jodhpur",
    price: "₹1.85 Cr",
    beds: 4,
    baths: 4,
    sqft: 3200,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80",
    type: "Sale"
  }
];

export default function SavedPropertiesPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-bold font-serif text-[#0A1628]">Saved Properties</h1>
            <p className="text-gray-500 text-sm mt-1">Properties you have bookmarked across Rajasthan.</p>
          </div>
          <Link href="/properties" className="bg-[#0A1628] text-[#C9A96E] px-6 py-3 rounded-xl font-semibold hover:bg-[#0A1628]/90 transition-colors">
            Find More Properties
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="relative h-48 w-full">
                <Image src={property.image} alt={property.title} fill className="object-cover" />
                <span className="absolute top-3 left-3 bg-[#0A1628] text-[#C9A96E] text-xs font-bold px-3 py-1 rounded-full uppercase">
                  {property.type}
                </span>
                <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full text-rose-500 hover:bg-white transition-colors" title="Remove">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 space-y-3">
                <div className="text-xl font-bold text-[#0A1628]">{property.price}</div>
                <h3 className="font-bold text-lg font-serif text-[#0A1628]">{property.title}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-1 text-[#C9A96E]" />
                  {property.location}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-600">
                  <span>{property.beds} Beds</span>
                  <span>•</span>
                  <span>{property.baths} Baths</span>
                  <span>•</span>
                  <span>{property.sqft} sq.ft</span>
                </div>

                <Link
                  href={`/properties/${property.slug}`}
                  className="block w-full text-center bg-[#0A1628] text-white py-2.5 rounded-xl font-medium text-sm hover:bg-[#0A1628]/90 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
