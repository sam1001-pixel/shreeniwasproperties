'use client';

import { useState } from 'react';
import Link from 'next/link';
import { UploadCloud, CheckCircle2, ArrowRight, ArrowLeft, Building, MapPin, Sparkles } from "lucide-react";

const steps = [
  { id: 'basic', title: 'Basic Info' },
  { id: 'specs', title: 'Specifications' },
  { id: 'location', title: 'Location' },
  { id: 'amenities', title: 'Amenities' },
  { id: 'photos', title: 'Photos' },
  { id: 'review', title: 'Review & Submit' }
];

export default function AddPropertyWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    purpose: 'rent',
    category: 'apartment',
    price: '',
    maintenance: '',
    carpetArea: '',
    bedrooms: '3',
    bathrooms: '2',
    balconies: '2',
    furnishing: 'semi_furnished',
    floor: '4',
    city: 'Jaipur',
    locality: '',
    address: '',
    pincode: '',
    amenities: ['lift', 'security_24x7', 'power_backup', 'parking'],
    description: ''
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6">
        <div className="bg-white max-w-lg w-full p-8 rounded-2xl shadow-lg border border-gray-100 text-center space-y-6">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold font-serif text-[#0A1628]">Listing Submitted!</h2>
          <p className="text-gray-600">Your property has been submitted for admin approval. It will go live on Shreeniwas Properties within 2 hours.</p>
          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/dashboard/landlord" className="bg-[#0A1628] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#0A1628]/90 transition-colors">
              Go to Owner Dashboard
            </Link>
            <Link href="/properties" className="border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
              Browse Properties
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Title */}
        <div className="text-center">
          <span className="text-xs uppercase tracking-widest text-[#C9A96E] font-bold">Landlord Portal</span>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-[#0A1628] mt-1">List Your Property in Rajasthan</h1>
          <p className="text-gray-500 text-sm mt-2">Reach 10,000+ active buyers and tenants across Jaipur, Jodhpur, Udaipur, and all major cities.</p>
        </div>

        {/* Stepper Progress Header */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[500px]">
            {steps.map((step, idx) => (
              <div key={step.id} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  idx <= currentStep ? 'bg-[#0A1628] text-[#C9A96E]' : 'bg-gray-100 text-gray-400'
                }`}>
                  {idx + 1}
                </div>
                <span className={`text-xs font-medium ${idx === currentStep ? 'text-[#0A1628] font-bold' : 'text-gray-400'}`}>
                  {step.title}
                </span>
                {idx < steps.length - 1 && <div className="w-8 h-[2px] bg-gray-200 mx-2" />}
              </div>
            ))}
          </div>
        </div>

        {/* Form Body */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-gray-100 space-y-6">
          {/* Step 1: Basic Info */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold font-serif text-[#0A1628]">Basic Property Information</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Title</label>
                <input
                  type="text"
                  placeholder="e.g. Luxury 3 BHK Villa in Vaishali Nagar"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A96E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Listing Purpose</label>
                  <select
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A96E]"
                  >
                    <option value="rent">For Rent</option>
                    <option value="sale">For Sale</option>
                    <option value="commercial_lease">Commercial Lease</option>
                    <option value="commercial_sale">Commercial Sale</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A96E]"
                  >
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa / Independent House</option>
                    <option value="penthouse">Penthouse</option>
                    <option value="plot">Plot / Land</option>
                    <option value="commercial_office">Commercial Office</option>
                    <option value="retail_shop">Retail Shop</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                  <input
                    type="number"
                    placeholder="e.g. 45000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A96E]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Maintenance Charges (₹/mo)</label>
                  <input
                    type="number"
                    placeholder="e.g. 2500"
                    value={formData.maintenance}
                    onChange={(e) => setFormData({ ...formData, maintenance: e.target.value })}
                    className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A96E]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Specs */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold font-serif text-[#0A1628]">Specifications & Area</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Carpet Area (sq.ft)</label>
                  <input
                    type="number"
                    placeholder="e.g. 1800"
                    value={formData.carpetArea}
                    onChange={(e) => setFormData({ ...formData, carpetArea: e.target.value })}
                    className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A96E]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms (BHK)</label>
                  <select
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                    className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A96E]"
                  >
                    <option value="1">1 BHK</option>
                    <option value="2">2 BHK</option>
                    <option value="3">3 BHK</option>
                    <option value="4">4+ BHK</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
                  <select
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                    className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A96E]"
                  >
                    <option value="1">1 Bathroom</option>
                    <option value="2">2 Bathrooms</option>
                    <option value="3">3 Bathrooms</option>
                    <option value="4">4+ Bathrooms</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Furnishing Status</label>
                  <select
                    value={formData.furnishing}
                    onChange={(e) => setFormData({ ...formData, furnishing: e.target.value })}
                    className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A96E]"
                  >
                    <option value="unfurnished">Unfurnished</option>
                    <option value="semi_furnished">Semi-Furnished</option>
                    <option value="fully_furnished">Fully Furnished</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Floor Number</label>
                  <input
                    type="number"
                    placeholder="e.g. 4"
                    value={formData.floor}
                    onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                    className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A96E]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Location */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold font-serif text-[#0A1628]">Location Details in Rajasthan</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A96E]"
                  >
                    <option>Jaipur</option>
                    <option>Jodhpur</option>
                    <option>Udaipur</option>
                    <option>Kota</option>
                    <option>Ajmer</option>
                    <option>Bikaner</option>
                    <option>Bhilwara</option>
                    <option>Alwar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Locality / Area</label>
                  <input
                    type="text"
                    placeholder="e.g. Vaishali Nagar, Shastri Nagar, C-Scheme"
                    value={formData.locality}
                    onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                    className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A96E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Address</label>
                <input
                  type="text"
                  placeholder="Building Name, Street, Block"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A96E]"
                />
              </div>
            </div>
          )}

          {/* Step 4: Amenities */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold font-serif text-[#0A1628]">Property Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['Lift', 'Swimming Pool', 'Gym', 'Car Parking', '24/7 Security', 'Power Backup', 'CCTV', 'Garden', 'Clubhouse', 'Vastu Compliant', 'Intercom', 'Wi-Fi'].map((item) => (
                  <label key={item} className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                    <input type="checkbox" defaultChecked className="rounded text-[#0A1628] focus:ring-[#C9A96E]" />
                    <span className="text-sm font-medium text-gray-700">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Photos */}
          {currentStep === 4 && (
            <div className="space-y-6 text-center">
              <h3 className="text-xl font-bold font-serif text-[#0A1628]">Upload High-Res Photos</h3>
              <div className="border-2 border-dashed border-gray-300 p-10 rounded-2xl bg-gray-50 hover:bg-gray-100/50 transition-colors cursor-pointer flex flex-col items-center justify-center">
                <UploadCloud className="w-12 h-12 text-[#C9A96E] mb-3" />
                <p className="font-medium text-[#0A1628]">Click or drag & drop property photos here</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG or WEBP (Max 10MB per image)</p>
              </div>
            </div>
          )}

          {/* Step 6: Review */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold font-serif text-[#0A1628]">Review Your Listing</h3>
              <div className="bg-gray-50 p-6 rounded-xl space-y-3 text-sm">
                <p><strong>Title:</strong> {formData.title || 'Luxury 3 BHK Villa in Vaishali Nagar'}</p>
                <p><strong>Purpose:</strong> {formData.purpose.toUpperCase()}</p>
                <p><strong>Category:</strong> {formData.category.toUpperCase()}</p>
                <p><strong>Price:</strong> ₹{formData.price || '45,000'}</p>
                <p><strong>Location:</strong> {formData.locality || 'Vaishali Nagar'}, {formData.city}</p>
              </div>
            </div>
          )}

          {/* Buttons Navigation */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-100">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-colors ${
                currentStep === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 bg-[#0A1628] hover:bg-[#0A1628]/90 text-[#C9A96E] font-semibold px-8 py-3 rounded-xl transition-colors shadow-md"
            >
              {currentStep === steps.length - 1 ? 'Publish Property' : 'Next Step'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
