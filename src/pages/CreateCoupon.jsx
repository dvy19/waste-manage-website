import React, { useState , useEffect } from 'react';
import { Award, Plus, Sparkles, AlertCircle, Ticket } from 'lucide-react';
import CouponCard from '../component/CouponCard';
import { itemService } from '../services/itemService';
import { authService } from '../services/authService';

const CreateCoupon = () => {
  // Current user reward points
  const [points, setPoints] = useState(650);

  const[stats,setStats]=useState(null);

  const userStats = async () => {
      try {
        const stat = await authService.getUserStats();
        console.log(stat);
        // Backend returns { message: "...", stats: { itemsAdded: 10, points: 100, ... } }
        setStats(stat.stats);

      } catch (err) {
        console.error(`Error fetching user stats: ${err}`);
      } 
    };
  
  const [coupons, setCoupons] = useState([]);

  const canCreateCoupon = stats?.points >= 500;

  const getCoup=async()=>{

    try{

      const coup=await itemService.getUserCoupons()

      console.log(coup.coupons)

      setCoupons(coup.coupons)
    }
    
    catch(err){
      console.log(`${err}`)
    }

  }


  const handleSubmit=async()=>{

    if (!canCreateCoupon) return;

    try{

      const coupon=await itemService.createCoupon()

      console.log(coupon)
    
      setStats(prev => ({
          ...prev,
          points: prev.points - 500
      }));

      setCoupons(prev => [
          coupon.coupon,
          ...prev
      ]); 
      }
    catch(err){
      console.log(`${err}`)
    }
  }

  
    useEffect(() => {
      userStats();
      getCoup();
    }, []);

  

  

  return (
    <div className="min-h-screen bg-gray-50/50 py-10 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="w-full max-w-3xl space-y-8">
        
        {/* Header & Points Card */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Reward Coupons</h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Redeem your earned points for discount coupons.
              </p>
            </div>

            {/* Points Counter Badge */}
            <div className="flex items-center space-x-3 bg-indigo-50/80 border border-indigo-100 px-4 py-2.5 rounded-2xl self-start sm:self-auto">
              <div className="p-2 bg-indigo-600 text-white rounded-xl">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-indigo-600 font-semibold block uppercase tracking-wider">
                  Available Points
                </span>
                <span className="text-xl font-extrabold text-gray-900">{stats?.points}</span>
              </div>
            </div>
          </div>

          {/* Action Section */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50 p-4 sm:p-5 rounded-2xl border border-gray-100">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-5 h-5 text-indigo-600 shrink-0" />
              <p className="text-xs sm:text-sm text-gray-600">
                Generate a <strong>10% OFF</strong> coupon for <span className="font-semibold text-gray-900">500 Points</span>.
              </p>
            </div>

            {/* Create Coupon Button */}
            <button
              onClick={handleSubmit}
              disabled={!canCreateCoupon}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center space-x-2 transition-all shadow-sm shrink-0 ${
                canCreateCoupon
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95 cursor-pointer'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Create Coupon</span>
            </button>
          </div>

          {/* Alert Message when points <= 500 */}
          {!canCreateCoupon && (
            <div className="flex items-center space-x-2 text-xs text-amber-600 bg-amber-50 border border-amber-100 p-3 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>You need more than 500 points to generate a new coupon.</span>
            </div>
          )}
        </div>

        {/* Section: Created / Active Coupons */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Active Coupons</h2>
            <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
              {coupons.length}
            </span>
          </div>

          {coupons.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {coupons.map((coupon) => (
                <CouponCard key={coupon?._id} coupon={coupon} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-8 text-center space-y-2">
              <Ticket className="w-8 h-8 text-gray-300 mx-auto" />
              <p className="text-sm font-medium text-gray-500">No active coupons available.</p>
            </div>
          )}
        </div>

        

      </div>
    </div>
  );
};

export default CreateCoupon;