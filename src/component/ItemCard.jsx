import React from 'react';
import { Package, Copy, ExternalLink, Check } from 'lucide-react';
import { useNavigate } from 'react-router';

const ItemCard = ({ item }) => {

  const [copied, setCopied] = React.useState(false);

  const navigate=useNavigate()

  const handleCopyTracking = () => {
    navigator.clipboard.writeText(item.trackingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (<div className="w-full bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    
    {/* Left Section: Image + Details */}
    <div className="flex items-center space-x-4 min-w-0 flex-1">
      {/* Image */}
      <div className="relative shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover bg-gray-50 border border-gray-100"
        />
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1 space-y-1">
        {/* Category Tag */}
        <span className="inline-block px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
          {item.category}
        </span>

        {/* Name */}
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
          {item.name}
        </h3>

        {/* Tracking ID (Mobile view) */}
        <div className="flex sm:hidden items-center space-x-1.5 text-xs text-gray-500 pt-0.5">
          <Package className="w-3.5 h-3.5 shrink-0 text-gray-400" />
          <span className="font-mono text-xs font-medium text-gray-700 truncate">
            {item.trackingId}
          </span>
        </div>
      </div>
    </div>

    {/* Right Section: Tracking Info & Action (Desktop/Tablet) */}
    <div className="flex items-center justify-between sm:justify-end gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100 shrink-0">
      {/* Tracking Details Badge */}
      <div className="hidden sm:flex flex-col items-end mr-1">
        <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">
          Tracking ID
        </span>
        <div className="flex items-center space-x-1.5 mt-0.5">
          <Package className="w-4 h-4 text-gray-400" />
          <span className="font-mono text-sm font-semibold text-gray-800">
            {item.trackingId}
          </span>
        </div>
      </div>

      {/* Copy Button */}
      <button
        onClick={handleCopyTracking}
        title="Copy Tracking ID"
        className="flex items-center space-x-1.5 px-3 py-2 text-xs font-medium rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors border border-gray-200/60 shrink-0"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-green-600" />
            <span className="text-green-600">Copied</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 text-gray-500" />
            <span>Copy ID</span>
          </>
        )}
      </button>

      {/* View Details / Action Button */}
      <button 
        onClick={() => {navigate('/track-item')}}
        className="flex items-center space-x-1 px-4 py-2 text-xs font-medium rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-sm shrink-0"
      >
        <span>Track</span>
        <ExternalLink className="w-3.5 h-3.5 ml-1" />
      </button>
    </div>

  </div>
</div>
  );
};

export default ItemCard;