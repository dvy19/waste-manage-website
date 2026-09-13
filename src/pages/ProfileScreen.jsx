import React from 'react';
import { Package, User, Settings, LogOut, ChevronRight, MapPin, Mail } from 'lucide-react';
import Navbar from '../component/Navbar';
const ProfileScreen = () => {
  // Sample user data (Replace with dynamic data/props)
  const user = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    address: "123 Mulberry St, New York, NY 10001",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  };

  const menuItems = [
    { id: 1, label: 'Track Item', icon: Package, onClick: () => console.log('Track Item clicked') },
    { id: 2, label: 'Edit Profile', icon: User, onClick: () => console.log('Edit Profile clicked') },
    { id: 3, label: 'More Settings', icon: Settings, onClick: () => console.log('More Settings clicked') },
  ];

  return (
    <>
    <Navbar></Navbar>
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
        
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover ring-4 ring-gray-50 shadow-md mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
          
          {/* User Email */}
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Mail className="w-4 h-4 mr-1.5 shrink-0" />
            <span>{user.email}</span>
          </div>

          {/* User Address */}
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <MapPin className="w-4 h-4 mr-1.5 shrink-0" />
            <span className="truncate max-w-[250px]">{user.address}</span>
          </div>
        </div>

        {/* Action List Items */}
        <div className="space-y-2 pt-2 border-t border-gray-100">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.onClick}
                className="w-full flex items-center justify-between p-3.5 rounded-xl hover:bg-gray-50 transition-colors text-gray-700 hover:text-gray-900 group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-gray-100 text-gray-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </button>
            );
          })}
        </div>

        {/* Logout Button */}
        <div className="pt-2">
          <button
            onClick={() => console.log('Logout clicked')}
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-red-600 hover:bg-red-50 active:bg-red-100 transition-colors font-medium text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>

      </div>
    </div>
    </>
  );
};

export default ProfileScreen;