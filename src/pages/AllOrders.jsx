import React, { useState, useEffect } from 'react';
import UserOrderCard from '../component/UserOrderCard';
import {authService} from '../services/authService'; // Adjust import path if needed
import { PackageX, ShoppingBag, Loader2 } from 'lucide-react';

export default function AllOrders() {
  const [order, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getOrders = async () => {
    try {
      const orders = await authService.getUserOrders();
      console.log(orders);
      setOrder(orders.orders || []);
    } catch (err) {
      console.log(`${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Page Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <ShoppingBag className="w-7 h-7 text-indigo-600" />
            Your Orders
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            View and track all products you have ordered.
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-3">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            <p className="text-sm text-gray-500 font-medium">Loading your orders...</p>
          </div>
        ) : order.length > 0 ? (
          /* Vertical List of UserOrderCards */
          <div className="space-y-4">
            {order.map((item) => (
              <UserOrderCard key={item._id || item.id} order={item} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto">
              <PackageX className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No orders placed yet</h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              You haven't placed any orders yet. Start shopping to see your purchase history here.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}