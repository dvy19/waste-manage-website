import React, { useState } from 'react';
import MapPicker from './MapPicker';

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { authService } from '../services/authService';
import{ useNavigate} from 'react-router-dom'


export default function UserDetails({ onSubmit, onBack }) {

  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    phoneNumber: '',
    city: '',
    pinCode: '',
    address: '',
    profile: null,
    profilePreview: null,
    coordinates: [null,null]
  });

  const [location, setLocation] = useState(null);

  const center = [28.6692, 77.4538];

  const LocationSelector=({ setLocation })=> {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;

        setFormData(prev => ({
          ...prev,
          coordinates: [
              Number(lng.toFixed(2)),
              Number(lat.toFixed(2))
            ]
      }));

     setLocation({
          lat,
          lng,
        });
      },
    });
  
    return null;
  }

  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState('');

  // Handle standard text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle profile image upload preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        profile: file,
        profilePreview: previewUrl,
      }));
    }
  };

  const handleSubmit=async(e)=>{

    e.preventDefault()

  
    console.log("cliekd")
    console.log(formData)

    try{

      const prof=await authService.createProfile(formData)
      console.log(prof)
    }
    catch(err){
      console.log(`${err}`)
    }
  }


  return (
    <div className="min-h-screen flex-col  items-center  bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Complete Your Profile
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please enter your address and location information
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={()=>{navigate('/home')}}>
          
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="relative w-28 h-28 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50 group hover:border-blue-500 transition">
              {formData.profilePreview ? (
                <img
                  src={formData.profilePreview}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-2 text-gray-400 group-hover:text-blue-500 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mx-auto">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                  </svg>
                  <span className="text-xs mt-1 block font-medium">Upload</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            <span className="text-xs text-gray-500">Allowed formats: JPG, PNG, WEBP</span>
          </div>

          {/* Form Fields Grid */}
          <div className="space-y-4">
            
            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 placeholder-gray-400 text-sm"
              />
            </div>

            {/* City and PIN Code Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="New York"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 placeholder-gray-400 text-sm"
                />
              </div>

              <div>
                <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700 mb-1">
                  PIN / ZIP Code
                </label>
                <input
                  id="pinCode"
                  name="pinCode"
                  type="text"
                  required
                  value={formData.pinCode}
                  onChange={handleChange}
                  placeholder="10001"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 placeholder-gray-400 text-sm"
                />
              </div>
            </div>

            {/* Home Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Home Address
              </label>
              <textarea
                id="address"
                name="address"
                rows="3"
                required
                value={formData.address}
                onChange={handleChange}
                placeholder="Street name, apartment, suite, etc."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 placeholder-gray-400 text-sm resize-none"
              ></textarea>
            </div>
          </div>

          {/* Location Coordinates Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-slate-800">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span className="font-semibold text-sm">Location Coordinates</span>
              </div>
              
              <button
                type="button"
                
                disabled={isLocating}
                className="text-xs font-medium bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 px-3 py-1.5 rounded-md transition shadow-sm cursor-pointer disabled:opacity-50"
              >
                {isLocating ? 'Detecting...' : 'Get Current Location'}
              </button>
            </div>

            {/* Display Values */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
                <span className="text-xs text-gray-500 block uppercase tracking-wider">Latitude</span>
                <span className="text-sm font-mono font-bold text-slate-800">
                  {formData.coordinates[1] ? `${formData.coordinates[1]}°` : '—'}
                </span>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
                <span className="text-xs text-gray-500 block uppercase tracking-wider">Longitude</span>
                <span className="text-sm font-mono font-bold text-slate-800">
                  {formData.coordinates[0] ? `${formData.coordinates[0]}°` : '—'}
                </span>
              </div>
            </div>

            {locationError && (
              <p className="text-xs text-red-500 text-center">{locationError}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-2">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="w-1/3 py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition cursor-pointer"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className="flex-1 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition cursor-pointer"
            >
              Save Details
            </button>
          </div>

        </form>
      </div>


      <MapContainer
            center={center}
            zoom={23}
            style={{ height: "500px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
      
            <LocationSelector setLocation={setLocation} />
      
            {location && (
              <Marker position={[location.lat, location.lng]} />
            )}
          </MapContainer>
    </div>
  );
}