import React, { useState } from 'react';
import { 
  Tag, 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2, 
  X, 
  ShoppingBag, 
  Ticket 
} from 'lucide-react';
import { useLocation } from 'react-router';
import { itemService } from '../services/itemService';
import { authService } from '../services/authService';

export default function BuyItem({ 
  selectedQuantity = 1,
  onBack = () => {}
}) {
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // e.g. 0.20 for 20%
  const [couponApplied, setCouponApplied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const[coupon,setCoupon]=useState({})


  const [idempotencyKey] = useState(() => crypto.randomUUID());

  const {state}=useLocation()

  const checkCoupon=async()=>{

    try{
        const data=await itemService.checkCoupon({
            code:couponCode
        })

        console.log(data)

        setCoupon(data.coupon)

        setAppliedDiscount(data.coupon.discount / 100);
        setCouponApplied(true);
        setErrorMsg("");
        setIsCouponModalOpen(false);

    } catch (err) {
        console.log(err);

        setCoupon({});
        setAppliedDiscount(0);
        setCouponApplied(false);
        setErrorMsg("Invalid coupon code");
    }
}


const createOrder=async()=>{

  console.log(item._id)
  console.log(item.quantity)

    try{

      const order=await authService.createOrder({
        idempotencyKey,
        id:item._id,
        quantity:item.quantity,
        amount:item.price
      })

      console.log(idempotencyKey)

      console.log(order)
      
    }
     catch(err){
        console.log(`${err}`)
    }
}
  


    const item=state?.item
    //console.log(item)

  // Calculations
  const unitPrice = parseFloat(item.price) || 0;
  const subtotal = unitPrice * selectedQuantity;
  const discountAmount = subtotal * appliedDiscount;
  const grandTotal = subtotal - discountAmount;

  const handleApplyCoupon = (e) => {
    e?.preventDefault();
    if (!couponCode.trim()) {
      setErrorMsg('Please enter a valid coupon code.');
      return;
    }

    // Apply 20% discount for any non-empty coupon entered
    setAppliedDiscount(data.coupon.discount / 100);
    setCouponApplied(true);
    setErrorMsg('');
    setIsCouponModalOpen(false);
  };

  const handleRemoveCoupon = () => {
    setAppliedDiscount(0);
    setCouponApplied(false);
    setCouponCode('');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Top Bar Navigation */}
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Product Details</span>
        </button>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Checkout Summary</h1>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-6 sm:p-8 space-y-6">

          {/* BuyItemCard - Selected Item Info */}
          <div>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Item Details
            </h2>
            <div className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <img
                src={item.image || 'https://via.placeholder.com/150'}
                alt={item.name}
                className="w-20 h-20 rounded-lg object-cover bg-white border border-gray-200"
              />
              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                  {item.manufacturer || 'Unknown Brand'}
                </span>
                <h3 className="text-base font-semibold text-gray-900 truncate">
                  {item.name || 'Product Name'}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Unit Price: <span className="font-medium text-gray-700">${unitPrice.toFixed(2)}</span>
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-500 block">Quantity</span>
                <span className="text-base font-bold text-gray-900">x{selectedQuantity}</span>
              </div>
            </div>
          </div>

          {/* Coupon Section */}
          <div className="pt-4 border-t border-gray-100">
            {!couponApplied ? (
              <button
                onClick={() => setIsCouponModalOpen(true)}
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-dashed border-indigo-400 bg-indigo-50/50 text-indigo-700 text-sm font-semibold hover:bg-indigo-50 transition-colors w-full sm:w-auto justify-center"
              >
                <Tag className="w-4 h-4" />
                <span>Use Coupon Code</span>
              </button>
            ) : (
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span>
                    Coupon <strong className="uppercase">{couponCode}</strong> applied (20% OFF)
                  </span>
                </div>
                <button
                  onClick={handleRemoveCoupon}
                  className="text-xs text-green-700 hover:text-green-900 font-semibold underline"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Price Breakdown */}
          <div className="pt-4 border-t border-gray-100 space-y-3">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Payment Summary
            </h2>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal ({selectedQuantity} {selectedQuantity > 1 ? 'items' : 'item'})</span>
              <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
            </div>

            {couponApplied && (
              <div className="flex justify-between text-sm text-green-600 font-medium">
                <span>Discount (20%)</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-sm text-gray-600">
              <span>Estimated Shipping</span>
              <span className="text-green-600 font-medium">FREE</span>
            </div>

            <div className="pt-3 border-t border-gray-200 flex justify-between items-baseline">
              <span className="text-base font-bold text-gray-900">Total Amount</span>
              <span className="text-2xl font-extrabold text-indigo-600">
                ${grandTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Confirm Order Button */}
          <button
            onClick={createOrder}
            className="w-full py-4 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Confirm & Pay ${grandTotal.toFixed(2)}</span>
          </button>

          <div className="flex items-center justify-center space-x-1 text-xs text-gray-400 pt-2">
            <ShieldCheck className="w-4 h-4 text-gray-400" />
            <span>Guaranteed 256-bit encrypted checkout</span>
          </div>
        </div>
      </div>

      {/* Coupon Modal */}
      {isCouponModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-5 relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <div className="flex items-center space-x-2">
                <Ticket className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-bold text-gray-900">Apply Coupon Code</h3>
              </div>
              <button
                onClick={() => setIsCouponModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleApplyCoupon} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Enter Promo / Coupon Code
                </label>
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="e.g. SAVE20"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 uppercase tracking-wider font-semibold text-gray-800 outline-none transition-all"
                  autoFocus
                />
                {errorMsg && (
                  <p className="text-xs text-red-500 mt-1.5">{errorMsg}</p>
                )}
                <p className="text-xs text-gray-400 mt-2">
                  Tip: Enter any coupon code to automatically get 20% off.
                </p>
              </div>

              {/* Modal Actions */}
              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCouponModalOpen(false)}
                  className="w-1/2 py-2.5 px-4 rounded-xl font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 px-4 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 transition-colors"
                  onClick={checkCoupon}
                >
                  Apply
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}