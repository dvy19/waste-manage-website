import React from 'react';
import { Package, CheckCircle2, Clock, Truck, ChevronRight } from 'lucide-react';

export default function UserOrderCard({ order }) {
  

  const unitPrice = parseFloat(order.item.price) || 0;
  const totalPrice = unitPrice * (order.item.quantity);

  const placedAt="2026-12-12"
  const isDelivered=false

  // Format date nicely
  const formattedDate = new Date(placedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden p-5 sm:p-6">
      {/* Top Header Row: Order ID, Date & Delivery Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <Package className="w-5 h-5 text-indigo-600" />
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Order #{order._id}
          </span>
          <span className="text-gray-300">•</span>
          <div className="flex items-center text-xs text-gray-500 font-medium">
            <Clock className="w-3.5 h-3.5 mr-1 text-gray-400" />
            Placed on {formattedDate}
          </div>
        </div>

        {/* Status Badge */}
        <div>
          {isDelivered ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
              Delivered
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
              <Truck className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              In Transit
            </span>
          )}
        </div>
      </div>

      {/* Main Body Row: Image, Details & Pricing */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4">
        {/* Item Info */}
        <div className="flex items-center space-x-4 min-w-0">
          <img
            src={order.item.image}
            className="w-16 h-16 rounded-xl object-cover bg-gray-50 border border-gray-200 flex-shrink-0"
          />
          <div className="min-w-0">
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider block">
              {order.item.manufacturer}
            </span>
            <h4 className="text-base font-bold text-gray-900 truncate">
              {order.item.about}
            </h4>
            <div className="text-xs text-gray-500 mt-0.5 space-x-2">
              <span>Qty: <strong className="text-gray-700 font-semibold">{order.item.quantity}</strong></span>
              <span>•</span>
              <span>Unit Price: <strong className="text-gray-700 font-semibold">${unitPrice.toFixed(2)}</strong></span>
            </div>
          </div>
        </div>

        {/* Total Price & Action Button */}
        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100 sm:space-x-6">
          <div className="text-left sm:text-right">
            <span className="text-xs text-gray-400 block font-medium">Total Amount</span>
            <span className="text-lg font-extrabold text-gray-900">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          <button 
            className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-2 rounded-xl transition-colors"
          >
            <span>Details</span>
            <ChevronRight className="w-4 h-4 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}