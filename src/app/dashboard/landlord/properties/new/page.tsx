'use client';

import { useState } from 'react';
import Link from 'next/link';
import { UploadCloud, CheckCircle2, ArrowRight, ArrowLeft, Building, MapPin, Sparkles, AlertCircle, Camera, Trash2 } from "lucide-react";
import AmenitiesShowcase from '@/components/shared/amenities-showcase';

const steps = [
  { id: 'basic', title: 'Basic Info' },
  { id: 'specs', title: 'Specifications' },
  { id: 'location', title: 'Location' },
  { id: 'amenities', title: 'Amenities' },
  { id: 'photos', title: 'Photos' },
  { id: 'review', title: 'Review & Submit' }
];

const AMENITIES_LIST = [
  'Lift', 'Swimming Pool', 'Gym', 'Car Parking', '24/7 Security', 
  'Power Backup', 'CCTV', 'Garden', 'Clubhouse', 'Vastu Compliant', 
  'Intercom', 'Wi-Fi'
];

export default function AddPropertyWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    purpose: '',
    category: '',
    price: '',
    maintenance: '',
    carpetArea: '',
    bedrooms: '',
    bathrooms: '',
    balconies: '',
    furnishing: '',
    floor: '',
    city: '',
    locality: '',
    address: '',
    pincode: '',
    amenities: [] as string[],
    photos: [] as string[],
    description: ''
  });

  const validateCurrentStep = (): boolean => {
    setErrorMsg('');
    if (currentStep === 0) {
      if (!formData.title.trim()) {
        setErrorMsg('Please enter a Property Title.');
        return false;
      }
      if (!formData.purpose) {
        setErrorMsg('Please select a Listing Purpose (Rent, Sale, Commercial).');
        return false;
      }
      if (!formData.category) {
        setErrorMsg('Please select a Property Category.');
        return false;
      }
      if (!formData.price || Number(formData.price) <= 0) {
        setErrorMsg('Please enter a valid Price.');
        return false;
      }
    } else if (currentStep === 1) {
      if (!formData.carpetArea || Number(formData.carpetArea) <= 0) {
        setErrorMsg('Please enter Carpet Area (sq.ft).');
        return false;
      }
      if (!formData.bedrooms) {
        setErrorMsg('Please select Bedrooms (BHK).');
        return false;
      }
      if (!formData.bathrooms) {
        setErrorMsg('Please select Bathrooms.');
        return false;
      }
      if (!formData.furnishing) {
        setErrorMsg('Please select Furnishing Status.');
        return false;
      }
    } else if (currentStep === 2) {
      if (!formData.city) {
        setErrorMsg('Please select a City.');
        return false;
      }
      if (!formData.locality.trim()) {
        setErrorMsg('Please enter Locality / Area.');
        return false;
      }
      if (!formData.address.trim()) {
        setErrorMsg('Please enter Full Address.');
        return false;
      }
    } else if (currentStep === 3) {
      if (formData.amenities.length === 0) {
        setErrorMsg('Please select at least 1 amenity.');
        return false;
      }
    } else if (currentStep === 4) {
      if (formData.photos.length === 0) {
        setErrorMsg('Please upload or select at least 1 property photo.');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      return;
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save property to localStorage so it appears live across listings
      try {
        const existing = localStorage.getItem('shreeniwas_admin_properties');
        const parsed = existing ? JSON.parse(existing) : [];
        const newProp = {
          id: Date.now(),
          title: formData.title,
          type: formData.category === 'villa' ? 'Luxury Villa' : formData.category === 'apartment' ? 'Apartment' : 'Property',
          location: `${formData.locality}, ${formData.city}`,
          price: `₹${Number(formData.price).toLocaleString('en-IN')}`,
          status: 'Ready to Move',
          image: formData.photos[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800',
          bedrooms: formData.bedrooms,
          bathrooms: formData.bathrooms,
          sqft: formData.carpetArea,
          purpose: formData.purpose,
          verified: true
        };
        parsed.unshift(newProp);
        localStorage.setItem('shreeniwas_admin_properties', JSON.stringify(parsed));
        window.dispatchEvent(new Event('shreeniwas_data_updated'));
      } catch (e) {}

      setSubmitted(true);
    }
  };

  const handleBack = () => {
    setErrorMsg('');
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => {
      const exists = prev.amenities.includes(amenity);
      const updated = exists 
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity];
      return { ...prev, amenities: updated };
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      filesArray.forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setFormData(prev => ({
              ...prev,
              photos: [...prev.photos, event.target!.result as string]
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemovePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, idx) => idx !== index)
    }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6">
        <div className="bg-white max-w-lg w-full p-8 rounded-2xl shadow-lg border border-gray-100 text-center space-y-6">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold font-serif text-[#0A1628]">Listing Submitted Successfully!</h2>
          <p className="text-gray-600">Your property listing has been created and published on Shreeniwas Properties.</p>
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
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-[#0A1628] mt-1">Post Free Property Listing</h1>
          <p className="text-gray-500 text-sm mt-2">Fill out the details below to list your property in Jaipur, Jodhpur, Udaipur, Kota & major cities.</p>
        </div>

        {/* Stepper Progress Header */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 overflow-x-auto no-scrollbar">
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

        {/* Error Alert Banner */}
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form Body */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-gray-100 space-y-6">
          {/* Step 1: Basic Info */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold font-serif text-[#0A1628]">Basic Property Information</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Title <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="e.g. 3 BHK Villa in Vaishali Nagar"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A96E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Listing Purpose <span className="text-red-500">*</span></label>
                  <select
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A96E]"
                  >
                    <option value="">-- Select Purpose --</option>
                    <option value="rent">For Rent</option>
                    <option value="sale">For Sale</option>
                    <option value="commercial_lease">Commercial Lease</option>
                    <option value="commercial_sale">Commercial Sale</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category <span className="text-red-500">*</span></label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A96E]"
                  >
                    <option value="">-- Select Category --</option>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹) <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    placeholder="Enter price in ₹"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A96E]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Maintenance Charges (₹/mo)</label>
                  <input
                    type="number"
                    placeholder="Optional maintenance charges"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Carpet Area (sq.ft) <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    placeholder="Enter sq.ft"
                    value={formData.carpetArea}
                    onChange={(e) => setFormData({ ...formData, carpetArea: e.target.value })}
                    className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A96E]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms (BHK) <span className="text-red-500">*</span></label>
                  <select
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                    className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A96E]"
                  >
                    <option value="">-- Select BHK --</option>
                    <option value="1">1 BHK</option>
                    <option value="2">2 BHK</option>
                    <option value="3">3 BHK</option>
                    <option value="4">4+ BHK</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms <span className="text-red-500">*</span></label>
                  <select
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                    className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A96E]"
                  >
                    <option value="">-- Select Bathrooms --</option>
                    <option value="1">1 Bathroom</option>
                    <option value="2">2 Bathrooms</option>
                    <option value="3">3 Bathrooms</option>
                    <option value="4">4+ Bathrooms</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Furnishing Status <span className="text-red-500">*</span></label>
                  <select
                    value={formData.furnishing}
                    onChange={(e) => setFormData({ ...formData, furnishing: e.target.value })}
                    className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A96E]"
                  >
                    <option value="">-- Select Furnishing --</option>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">City <span className="text-red-500">*</span></label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A96E]"
                  >
                    <option value="">-- Select City --</option>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Locality / Area <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    placeholder="e.g. Vaishali Nagar, C-Scheme"
                    value={formData.locality}
                    onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                    className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A96E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Address <span className="text-red-500">*</span></label>
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
              <h3 className="text-xl font-bold font-serif text-[#0A1628]">Property Amenities <span className="text-red-500">*</span></h3>
              <p className="text-xs text-gray-500">Select at least one amenity for your property listing.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {AMENITIES_LIST.map((item) => {
                  const isChecked = formData.amenities.includes(item);
                  return (
                    <label 
                      key={item} 
                      onClick={() => handleAmenityToggle(item)}
                      className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-colors ${
                        isChecked 
                          ? 'bg-[#0A1628]/5 border-[#0A1628] text-[#0A1628] font-bold' 
                          : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        checked={isChecked}
                        onChange={() => {}}
                        className="rounded text-[#0A1628] focus:ring-[#C9A96E]" 
                      />
                      <span className="text-sm font-medium">{item}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 5: Photos */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold font-serif text-[#0A1628]">Upload Property Photos <span className="text-red-500">*</span></h3>
              
              <label className="border-2 border-dashed border-gray-300 p-8 rounded-2xl bg-gray-50 hover:bg-gray-100/50 transition-colors cursor-pointer flex flex-col items-center justify-center">
                <Camera className="w-10 h-10 text-[#C9A96E] mb-2" />
                <p className="font-semibold text-[#0A1628] text-sm">Click to Upload Photos from Device</p>
                <p className="text-xs text-gray-400 mt-1">Select PNG, JPG, or WEBP images</p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>

              {formData.photos.length > 0 && (
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-3">Uploaded Photos ({formData.photos.length})</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {formData.photos.map((photo, idx) => (
                      <div key={idx} className="relative group rounded-xl overflow-hidden border border-gray-200 aspect-video bg-gray-100">
                        <img src={photo} alt={`Property ${idx}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(idx)}
                          className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-lg opacity-90 hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 6: Review */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold font-serif text-[#0A1628]">Review Your Listing</h3>
              <div className="bg-gray-50 p-6 rounded-xl space-y-3 text-sm border border-gray-200">
                <p><strong>Title:</strong> {formData.title}</p>
                <p><strong>Purpose:</strong> {formData.purpose.toUpperCase()}</p>
                <p><strong>Category:</strong> {formData.category.toUpperCase()}</p>
                <p><strong>Price:</strong> ₹{Number(formData.price).toLocaleString('en-IN')}</p>
                <p><strong>Specs:</strong> {formData.bedrooms} BHK | {formData.bathrooms} Bath | {formData.carpetArea} sq.ft</p>
                <p><strong>Location:</strong> {formData.locality}, {formData.city}</p>
                <p><strong>Address:</strong> {formData.address}</p>
                <p><strong>Amenities:</strong> {formData.amenities.join(', ')}</p>
                <p><strong>Photos Uploaded:</strong> {formData.photos.length} photos</p>
              </div>
            </div>
          )}

          {/* Buttons Navigation */}
          <div className="flex justify-between items-center fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200 z-50 sm:static sm:bg-transparent sm:p-0 sm:pt-6 sm:border-gray-100">
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

        {/* Property Amenities Standards Showcase */}
        <div className="pt-6">
          <AmenitiesShowcase />
        </div>
      </div>
    </div>
  );
}
