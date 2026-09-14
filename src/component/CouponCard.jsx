import React, { useState } from 'react';
import { Ticket, Copy, Check, Clock, CheckCircle2, XCircle } from 'lucide-react';

const CouponCard = ({ coupon }) => {
  const [copied, setCopied] = useState(false);

  const { code, discount, expiresAt, isUsed, isExpired } = coupon;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Determine tag state and styling
  const getStatusTag = () => {
    if (isUsed) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full border border-gray-200">
          <CheckCircle2 className="w-3 h-3 text-gray-500" /> Used
        </span>
      );
    }
    if (isExpired) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-rose-50 text-rose-600 rounded-full border border-rose-100">
          <XCircle className="w-3 h-3 text-rose-500" /> Expired
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
        <Ticket className="w-3 h-3 text-emerald-600" /> Active
      </span>
    );
  };

  return (
    <div className={`relative bg-white border rounded-2xl p-4 sm:p-5 shadow-sm transition-all duration-200 ${isExpired || isUsed ? 'border-gray-100 opacity-75' : 'border-indigo-100 hover:shadow-md'}`}>
      <div className="flex items-center justify-between gap-3">
        
        {/* Left: Discount & Code */}
        <div className="flex items-center space-x-3.5 min-w-0">
          <div className={`p-3 rounded-xl shrink-0 ${isExpired || isUsed ? 'bg-gray-100 text-gray-400' : 'bg-indigo-50 text-indigo-600'}`}>
            <Ticket className="w-6 h-6" />
          </div>

          <div className="min-w-0 space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">{discount}% OFF</span>
              {getStatusTag()}
            </div>
            
            {/* Coupon Code */}
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs font-semibold text-gray-600 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-200/60">
                {code}
              </span>
              {!isExpired && !isUsed && (
                <button
                  onClick={handleCopy}
                  className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Copy Code"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right: Expiration Date */}
        <div className="text-right shrink-0">
          <div className="flex items-center justify-end text-xs text-gray-400 font-medium mb-0.5">
            <Clock className="w-3 h-3 mr-1" /> Expires
          </div>
          <span className="text-xs font-semibold text-gray-700">{expiresAt}</span>
        </div>

      </div>
    </div>
  );
};

export default CouponCard;