import React, { useState } from 'react';
import { 
  Search, Package, Calendar, Tag, Weight, Layers, 
  Cpu, Copy, Check, ArrowRight, AlertCircle, RefreshCw 
} from 'lucide-react';
import { itemService } from '../services/itemService';

const TrackItem = () => {
  const [trackingId,setTrackingId] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);

  const track=async(e)=>{

    e.preventDefault()
    try{
      const data=await itemService.trackItem(trackingId)
      console.log(data)
      console.log(data.item.image)

      setItemDetails(data.item)
    }
    catch(err){
      console.log(`${err}`)
    }
  }



  const copyTrackingId = () => {
    if (itemDetails?.trackingId) {
      navigator.clipboard.writeText(itemDetails.trackingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Status badge styling helper
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'in transit':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'processing':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-10 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="w-full max-w-4xl space-y-8">
        
        {/* Header & Search Bar */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="text-center max-w-md mx-auto space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Track Your Shipment
            </h1>
            <p className="text-sm text-gray-500">
              Enter your unique tracking ID below to check item status, weight, category, and processing details.
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={track} className="flex items-center gap-2 max-w-xl mx-auto">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter Tracking ID (e.g. TRK-12345)"
                className="w-full pl-11 pr-4 py-3.5 text-sm rounded-2xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all font-mono"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 rounded-2xl transition-all shadow-sm flex items-center shrink-0"
            >
              {loading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Track</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </>
              )}
            </button>
          </form>

          {/* Search Hint */}
          <p className="text-xs text-center text-gray-400">
            Tip: Try searching with <span className="font-mono text-gray-600 font-semibold">TRK-12345</span>
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-rose-50 border border-rose-100 text-rose-700 px-5 py-4 rounded-2xl flex items-center space-x-3 text-sm animate-fade-in">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Item Details Display Card */}
        {itemDetails && (
          <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-6 animate-fade-in">
            
            {/* Top Bar: Status & Copy ID */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <span className="text-xs text-gray-400 uppercase font-semibold tracking-wider">
                  Tracking ID
                </span>
                <span className="font-mono text-sm font-bold text-gray-800 bg-gray-100 px-3 py-1 rounded-lg">
                  {itemDetails.trackingId}
                </span>
                <button
                  onClick={copyTrackingId}
                  className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Copy Tracking ID"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Status Badge */}
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-400 font-medium">Status:</span>
                <span className={`px-3.5 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(itemDetails.status)}`}>
                  {itemDetails.status}
                </span>
              </div>
            </div>

            {/* Main Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Product Image */}
              <div className="md:col-span-1">
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                  <img
                    src={itemDetails.image}
                    alt={itemDetails.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Information Grid */}
              <div className="md:col-span-2 space-y-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                    {itemDetails.name}
                  </h2>
                </div>

                {/* Attributes Grid */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  
                  {/* Category */}
                  <div className="bg-gray-50/70 p-3.5 rounded-2xl border border-gray-100/80">
                    <div className="flex items-center text-xs text-gray-400 font-medium mb-1">
                      <Tag className="w-3.5 h-3.5 mr-1.5 text-indigo-500" /> Category
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{itemDetails.category}</span>
                  </div>

                  {/* Quantity */}
                  <div className="bg-gray-50/70 p-3.5 rounded-2xl border border-gray-100/80">
                    <div className="flex items-center text-xs text-gray-400 font-medium mb-1">
                      <Layers className="w-3.5 h-3.5 mr-1.5 text-indigo-500" /> Quantity
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{itemDetails.quantity} Pcs</span>
                  </div>

                  {/* Weight */}
                  <div className="bg-gray-50/70 p-3.5 rounded-2xl border border-gray-100/80">
                    <div className="flex items-center text-xs text-gray-400 font-medium mb-1">
                      <Weight className="w-3.5 h-3.5 mr-1.5 text-indigo-500" /> Weight
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{itemDetails.weight}</span>
                  </div>

                  {/* Created At */}
                  <div className="bg-gray-50/70 p-3.5 rounded-2xl border border-gray-100/80">
                    <div className="flex items-center text-xs text-gray-400 font-medium mb-1">
                      <Calendar className="w-3.5 h-3.5 mr-1.5 text-indigo-500" /> Created At
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{itemDetails.createdAt}</span>
                  </div>

                </div>

                {/* Processing Method */}
                <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-2xl flex items-start space-x-3 mt-2">
                  <Cpu className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-indigo-600 block uppercase tracking-wide">
                      Processing Method
                    </span>
                    <p className="text-sm font-medium text-gray-800 mt-0.5">
                      {itemDetails.processingMethod}
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default TrackItem;