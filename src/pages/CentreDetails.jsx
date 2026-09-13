import React, { useEffect, useState } from 'react';
import { 
  FiArrowLeft, 
  FiMapPin, 
  FiUser, 
  FiBox, 
  FiPhone, 
  FiMail, 
  FiClock, 
  FiCheckCircle, 
} from 'react-icons/fi';
import { useParams } from 'react-router';
import { adminService } from '../services/adminService';

export default function CentreDetailScreen({
  
  onBack,
}) {

    const {id}=useParams();

    const[centre,setCentre]=useState({})

    //console.log(id)


    const getDetails=async()=>{

        try{

            const details=await adminService.getSingleCentre(id)

            //console.log(details)

            setCentre(details.centre)
        }
        catch(err){
            console.log(`${err}`)
        }
    };


    useEffect((id)=>{
        getDetails(id)
    } , [id])


  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Navigation Bar */}
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 bg-white px-4 py-2 rounded-xl shadow-xs border border-gray-200 transition cursor-pointer"
        >
          <FiArrowLeft className="w-4 h-4 mr-2" />
          <span>Back to Centres</span>
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          
          {/* Header Image */}
          <div className="relative h-64 sm:h-80 w-full bg-gray-200">
            <img
              src={centre.image}
              alt={centre.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 border border-emerald-100">
              <span>Verified Collection Centre</span>
            </div>
          </div>

          {/* Details Body */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Title & Location */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                {centre.name}
              </h1>
              <p className="flex items-center text-sm text-gray-500 mt-2">
                <FiMapPin className="w-4 h-4 text-emerald-600 mr-1.5 shrink-0" />
                <span>{centre.location}</span>
              </p>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-center space-x-3">
                <div className="p-3 bg-emerald-600 text-white rounded-xl shadow-sm">
                  <FiBox className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block">
                    Main Material
                  </span>
                  <span className="text-sm font-bold text-gray-900">{centre.mainMaterial}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center space-x-3">
                <div className="p-3 bg-blue-600 text-white rounded-xl shadow-sm">
                  <FiUser className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-blue-800 uppercase tracking-wider block">
                    Centre Owner
                  </span>
                  <span className="text-sm font-bold text-gray-900">{centre.owner}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2 pt-2">
              <h3 className="text-base font-bold text-gray-900">About the Centre</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{centre.description}</p>
            </div>

            {/* Contact & Hours */}
            <div className="border-t border-gray-100 pt-6 space-y-3 text-sm text-gray-700">
              <h3 className="text-base font-bold text-gray-900 mb-3">Contact Information</h3>
              <div className="flex items-center space-x-3">
                <FiPhone className="w-4 h-4 text-gray-400" />
                <span>{centre.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiMail className="w-4 h-4 text-gray-400" />
                <span>{centre.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiClock className="w-4 h-4 text-gray-400" />
                <span>{centre.timing}</span>
              </div>
            </div>

            {/* Accepted Items List */}
            {centre.acceptedItems && (
              <div className="border-t border-gray-100 pt-6 space-y-3">
                <h3 className="text-base font-bold text-gray-900">Accepted Materials</h3>
                <div className="grid grid-cols-2 gap-2">
                  {centre.acceptedItems.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs font-medium text-gray-700 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                      <FiCheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}