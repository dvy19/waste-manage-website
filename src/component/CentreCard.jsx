import React from 'react';
import { 
  FiMapPin, 
  FiUser, 
  FiBox, 
  FiArrowRight, 
} from 'react-icons/fi';
import { useNavigate } from 'react-router';

export default function CentreCard({
  image = 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
  name = 'EcoRecycle Tech Hub',
  mainMaterial = 'E-Waste & Metals',
  owner = 'Alexander Wright',
  location = 'Greenzone Sector 4, City Center',
  id
}) {

    const navigate=useNavigate()
  return (
    <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col justify-between">
      <div>
        {/* Centre Image with Tag */}
        <div className="relative h-48 w-full overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-emerald-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1 border border-emerald-100">
            <span>Verified Centre</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-4">
          {/* Centre Name */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
              {name}
            </h3>
            <p className="flex items-center text-xs text-gray-500 mt-1">
              <FiMapPin className="w-3.5 h-3.5 text-gray-400 mr-1 shrink-0" />
              <span className="truncate">{location}</span>
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100 text-xs">
            {/* Main Material */}
            <div className="space-y-0.5">
              <span className="text-gray-400 font-medium uppercase tracking-wider text-[10px] flex items-center gap-1">
                <FiBox className="w-3 h-3 text-emerald-600" />
                Material
              </span>
              <p className="font-semibold text-gray-800 truncate">{mainMaterial}</p>
            </div>

            {/* Owner */}
            <div className="space-y-0.5">
              <span className="text-gray-400 font-medium uppercase tracking-wider text-[10px] flex items-center gap-1">
                <FiUser className="w-3 h-3 text-blue-600" />
                Owner
              </span>
              <p className="font-semibold text-gray-800 truncate">{owner}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-5 pt-0">
        <button
          type="button"
          onClick={()=>{navigate(`/centre-details/${id}`)}}
          
          className="w-full inline-flex items-center justify-center space-x-2 py-2.5 px-4 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white font-semibold text-sm rounded-xl transition-all duration-200 cursor-pointer group/btn"
        >
          <span>View Details</span>
          <FiArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}