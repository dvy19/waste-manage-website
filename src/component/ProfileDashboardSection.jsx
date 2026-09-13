import React, { useEffect, useState } from 'react';
import { Package, Award, ShoppingBag, Heart } from 'lucide-react';
import { authService } from '../services/authService';

const ProfileDashboardSection = () => {
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);

  const userStats = async () => {
    try {
      const stat = await authService.getUserStats();
      console.log(stat);
      // Backend returns { message: "...", stats: { itemsAdded: 10, points: 100, ... } }
      setStatsData(stat.stats);
    } catch (err) {
      console.error(`Error fetching user stats: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    userStats();
  }, []);

  // Map API object to UI card configuration
  const dashboardCards = [
    {
      id: 1,
      number: statsData?.itemsAdded ?? 0,
      heading: 'Items Added',
      subheading: 'Total items contributed',
      icon: Package,
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      id: 2,
      number: statsData?.points ?? 0,
      heading: 'Points Earned',
      subheading: 'Rewards balance',
      icon: Award,
      color: 'bg-amber-50 text-amber-600',
    },
    {
      id: 3,
      number: '12',
      heading: 'Total Orders',
      subheading: 'Active purchases',
      icon: ShoppingBag,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      id: 4,
      number: '5',
      heading: 'Saved Items',
      subheading: 'In your wishlist',
      icon: Heart,
      color: 'bg-rose-50 text-rose-600',
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Section Title */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="text-xs sm:text-sm text-gray-500">
          Quick summary of your profile activity and stats.
        </p>
      </div>

      {/* 2x2 Grid Layout */}
      <div className="grid grid-cols-2 gap-4">
        {dashboardCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
            >
              {/* Top Header inside Card: Icon & Stat Number */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                  {loading ? (
                    <span className="inline-block w-12 h-7 bg-gray-200 animate-pulse rounded-md" />
                  ) : (
                    card.number
                  )}
                </span>
                <div className={`p-2.5 rounded-xl ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              {/* Card Details: Heading & Subheading */}
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-gray-800">
                  {card.heading}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5 font-medium truncate">
                  {card.subheading}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileDashboardSection;