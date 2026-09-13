import React from 'react';
import { Package, Copy, ExternalLink, Check } from 'lucide-react';

const ItemCard = ({ item }) => {

  const [copied, setCopied] = React.useState(false);


  const handleCopyTracking = () => {
    navigator.clipboard.writeText(itemData.trackingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-[60%] bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Left Section: Image + Details */}
        <div className="flex items-center space-x-4 min-w-0">
          {/* Image */}
          <div className="relative shrink-0">
            <img
              src={itemData.image}
              alt={itemData.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover bg-gray-50 border border-gray-100"
            />
          </div>

          {/* Info */}
          <div className="min-w-0 space-y-1">
            {/* Category Tag */}
            <span className="inline-block px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
              {itemData.category}
            </span>

            {/* Name */}
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
              {itemData.name}
            </h3>

            {/* Tracking ID (Mobile view) */}
            <div className="flex sm:hidden items-center space-x-2 text-2xl text-gray-500 pt-1">
              <Package className="w-3.5 h-3.5" />
              <span className="font-mono">{itemData.trackingId}</span>
            </div>
          </div>
        </div>

        {/* Right Section: Tracking Info & Action (Desktop/Tablet) */}
        <div className="flex items-center justify-between sm:justify-end gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
          {/* Tracking Details Badge */}
          <div className="hidden sm:flex flex-col items-end mr-2">
            <span className="text-xs text-gray-400 font-medium">Tracking ID</span>
            <div className="flex items-center space-x-1.5 mt-0.5">
              <Package className="w-4 h-4 text-gray-500" />
              <span className="font-mono  text-xl font-medium text-gray-700">
                {itemData.trackingId}
              </span>
            </div>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopyTracking}
            title="Copy Tracking ID"
            className="flex items-center space-x-1.5 px-3 py-2 text-xs font-medium rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors border border-gray-200/60"
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
            onClick={() => console.log('View status clicked')}
            className="flex items-center space-x-1 px-4 py-2 text-xs font-medium rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-sm"
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