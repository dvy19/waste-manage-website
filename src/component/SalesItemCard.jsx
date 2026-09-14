import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { useNavigate } from 'react-router';

const SalesItemCard = ({ item}) => {
  

  const navigate=useNavigate()

  return (
    <div className="group relative bg-white border border-gray-100 rounded-2xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full"

    
    
    >
      {/* Top Section: Image & Wishlist Button */}
      <div>
        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gray-50 mb-3">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"

            onClick={()=>{navigate(`/buy-item/${item._id}`)}}
          />
          
          {/* Wishlist Button */}
          <button
            onClick={() => onFavorite && onFavorite(item)}
            className="absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-md text-gray-600 hover:text-red-500 hover:bg-white transition-colors shadow-sm"
            aria-label="Add to wishlist"
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>

        {/* Item Info */}
        <div className="space-y-1">
          {/* Manufacturer */}
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            {item.manufacturer}
          </p>

          {/* Product Name */}
          <h3 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors">
            {item.name}
          </h3>
        </div>
      </div>

      {/* Bottom Section: Price & Action Button */}
      <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-50">
        <div>
          <span className="text-xs text-gray-400 block font-medium">Price</span>
          <span className="text-base sm:text-lg font-bold text-gray-900">
            ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart && onAddToCart(item)}
          className="p-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 transition-all shadow-sm"
          aria-label="Add to cart"
        >
          <ShoppingCart className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default SalesItemCard;