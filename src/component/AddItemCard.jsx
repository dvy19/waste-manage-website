import React from 'react';
import { 
  FiPlus, 
  FiZap, 
  FiGift, 
  FiArrowRight 
} from 'react-icons/fi';

import { useNavigate } from 'react-router';

export default function AddItemCard({ onAddItemClick }) {

    const navigate=useNavigate()
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-green-700 text-white p-6 sm:p-8 shadow-xl shadow-green-900/10 border border-emerald-500/20">
      
      {/* Decorative Background Patterns */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        {/* Left Column: Content & Copy */}
        <div className="space-y-3.5 max-w-xl">
          
          {/* Multi-badge Highlight Header */}
          <div className="inline-flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center space-x-1.5 bg-amber-400 text-amber-950 text-xs font-black px-3 py-1 rounded-full shadow-md uppercase tracking-wide">
              <FiZap className="w-3.5 h-3.5 fill-current" />
              <span>Earn 10x Points</span>
            </span>
            <span className="inline-flex items-center space-x-1 bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full">
              <FiGift className="w-3.5 h-3.5" />
              <span>Unlock Coupons</span>
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            Turn Your Waste into Worth!
          </h2>

          {/* Subheading */}
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Give your dry waste, reusable materials, and handcraft items a second life. Add them today to clear space, protect the planet, and claim exclusive rewards.
          </p>

          {/* Value Props Bullet List */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-emerald-100/90 pt-1">
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              <span>100% Verified Recycling</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              <span>Instant Coupon Rewards</span>
            </div>
          </div>
        </div>

        {/* Right Column: CTA Button */}
        <div className="w-full md:w-auto shrink-0 pt-2 md:pt-0">
          <button
            type="button"
            onClick={()=>{navigate('/add-item')}}
            className="group w-full md:w-auto inline-flex items-center justify-center space-x-3 bg-white hover:bg-emerald-50 text-emerald-800 font-bold px-7 py-4 rounded-2xl shadow-lg shadow-black/10 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition duration-200 cursor-pointer"
          >
            <div className="p-1 bg-emerald-600 text-white rounded-lg group-hover:bg-emerald-700 transition">
              <FiPlus className="w-5 h-5 stroke-[3]" />
            </div>
            <span className="text-base">Add Items Now</span>
            <FiArrowRight className="w-5 h-5 text-emerald-600 group-hover:translate-x-1 transition duration-200" />
          </button>
        </div>

      </div>
    </div>
  );
}