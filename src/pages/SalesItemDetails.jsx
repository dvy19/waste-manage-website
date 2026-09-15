import React, { useEffect, useState } from 'react';
import { ShoppingCart, Zap, Package, ShieldCheck, Heart, Share2, Check } from 'lucide-react';
import { itemService } from '../services/itemService';
import { useNavigate, useParams, useSearchParams } from 'react-router';

export default function SalesItemDetails({ formData }) {

    const {id}=useParams();
    console.log(id)

    const[item,setItem]=useState(null)

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantityCount, setQuantityCount] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const navigate=useNavigate();


  const getItemDetails=async(id)=>{

    try{

        const item=await itemService.getSaleItemById(id)

        console.log(item.item)

        setItem(item.item)

    }
    catch(err){
        console.log(`${err}`)
    }
  }

  useEffect(()=>{
    getItemDetails(id)
  } , [id])

  
const inStock = item?.quantity > 0;

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Main Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-6 sm:p-8 lg:p-12">
          
          {/* Left Column: Image Gallery */}
          <div className="flex flex-col space-y-4">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 group">
              <img
                src={item?.image}
                alt={item?.name}
                className="w-full h-full object-center object-contain group-hover:scale-105 transition-transform duration-300 ease-in-out"
              />
              {/* Wishlist Button Overlay */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 backdrop-blur-md shadow-md text-gray-600 hover:text-red-500 transition-colors"
                aria-label="Add to Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
            </div>
          </div>

          {/* Right Column: Item Information */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              {/* Brand / Manufacturer */}
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-50 px-3 py-1 rounded-full">
                  {item?.manufacturer}
                </span>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                {item?.name}
              </h1>

              {/* Price & Stock Badge */}
              <div className="flex items-baseline space-x-4">
                <span className="text-3xl font-extrabold text-gray-900">
                  ${item?.price}
                </span>
                <span className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full ${
                  inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {inStock ? `In Stock (${item.availableQuantity} available)` : 'Out of Stock'}
                </span>
              </div>

              {/* Materials */}
              {item?.materials.length > 0 && (
                <div className="pt-2">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Materials
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item?.materials.map((mat, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium border border-gray-200"
                      >
                        <Check className="w-3.5 h-3.5 text-indigo-600" />
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description / About */}
              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  About this item
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {item?.about}
                </p>
              </div>

              {/* Purchase Options */}
              {inStock && (
                <div className="pt-4">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setQuantityCount(Math.max(1, quantityCount - 1))}
                      className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100 active:bg-gray-200"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-semibold text-gray-800">
                      {quantityCount}
                    </span>
                    <button
                      onClick={() => setQuantityCount(Math.min(item?.quantity, quantityCount + 1))}
                      className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100 active:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-gray-100 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  disabled={!inStock}
                  className="w-full py-3.5 px-6 rounded-xl font-semibold text-gray-900 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5 text-gray-700" />
                  <span>Add to Cart</span>
                </button>

                <button
                  disabled={!inStock}
                  className="w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2"

                  onClick={()=>{
                    navigate(
                      '/buy-now',{
                         state:{
                            item:item
                          }
                      }
                     
                    )
                  }}
                >
                  <Zap className="w-5 h-5" />
                  <span>Buy Now</span>
                </button>
              </div>

              {/* Assurance badges */}
              <div className="flex items-center justify-center space-x-6 pt-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Package className="w-4 h-4 text-indigo-600" />
                  <span>Fast Shipping</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}