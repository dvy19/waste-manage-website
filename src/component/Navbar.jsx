import React, { useState } from 'react';
import { 
  FiTrash2, 
  FiAward, 
  FiUser, 
  FiMenu, 
  FiX 
} from 'react-icons/fi';
import { useNavigate } from 'react-router';

export default function Navbar({ points = 150, onProfileClick, activePage = 'home' }) {

  const navigate=useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home', key: 'home' },
    { name: 'Centered', href: '#centered', key: 'centered' },
    { name: 'About', href: '#about', key: 'about' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* LEFT: Brand Logo */}
          <div className="flex items-center space-x-2 shrink-0">
            <div className="p-2 bg-green-600 text-white rounded-xl shadow-md shadow-green-200">
              <FiTrash2 className="w-5 h-5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-gray-900">
              Waste<span className="text-green-600">War</span>
            </span>
          </div>

          {/* MIDDLE: Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-green-600 ${
                  activePage === link.key
                    ? 'text-green-600 font-semibold border-b-2 border-green-600 py-5'
                    : 'text-gray-600'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* RIGHT: Points Display & Profile Icon */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Points Badge */}
            <div className="flex items-center space-x-1.5 bg-amber-50 text-amber-700 border border-amber-200/80 px-3 py-1.5 rounded-full shadow-xs">
              <FiAward className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-semibold uppercase tracking-wider">Points:</span>
              <span className="text-sm font-bold">{points}</span>
            </div>

            {/* Profile Button */}
            <button
              type="button"
              onClick={()=>{navigate('/user-profile')}}
              className="p-2 rounded-full text-gray-600 hover:text-green-600 hover:bg-gray-100 transition cursor-pointer border border-gray-200"
              aria-label="User Profile"
            >
              <FiUser className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-3">
            {/* Compact Points Badge for Mobile */}
            <div className="flex items-center space-x-1 bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full text-xs font-bold">
              <FiAward className="w-3.5 h-3.5 text-amber-500" />
              <span>{points}</span>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                activePage === link.key
                  ? 'bg-green-50 text-green-600 font-semibold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {link.name}
            </a>
          ))}
          
          <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Account</span>
            <button
              type="button"
              onClick={onProfileClick}
              className="flex items-center space-x-2 text-sm font-semibold text-gray-700 hover:text-green-600"
            >
              <FiUser className="w-4 h-4" />
              <span>Profile</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}