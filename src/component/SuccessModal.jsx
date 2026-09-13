import React from 'react';
import { FiCheckCircle, FiAward, FiX, FiArrowRight } from 'react-icons/fi';

export default function SuccessModal({ isOpen, onClose, points = 100, onViewHome }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      {/* Modal Container */}
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 text-center space-y-5 transform transition-all scale-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition"
        >
          <FiX className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="mx-auto w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-inner">
          <FiCheckCircle className="w-10 h-10 stroke-[2]" />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Item Added!
          </h3>
          <p className="text-sm text-gray-600">
            Thank you for contributing to recycling and sustainability.
          </p>
        </div>

        {/* Points Reward Card */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-center space-x-3 shadow-sm">
          <div className="p-2 bg-amber-500 text-white rounded-xl shadow-md">
            <FiAward className="w-6 h-6" />
          </div>
          <div className="text-left">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
              Congrats!
            </span>
            <span className="text-base font-extrabold text-amber-950">
              You got <span className="text-emerald-600">{points}</span> new points 🎉
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={onViewHome || onClose}
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-md transition cursor-pointer"
          >
            <span>Awesome</span>
            <FiArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}