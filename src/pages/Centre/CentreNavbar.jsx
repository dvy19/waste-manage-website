import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

export default function CentreNavbar() {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [toastMessage, setToastMessage] = useState('');
  const moreDropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target)) {
        setIsMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    
      

     
      <nav className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            

            {/* RIGHT SIDE: Logo as "WasteWar" */}
            <div className="flex items-center space-x-3">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                  )}
                </svg>
              </button>

              <div 
                onClick={() => { setActiveTab('home'); triggerToast('WasteWar Logo clicked'); }}
                className="flex items-center space-x-2 cursor-pointer group"
              >
                <div className="flex flex-col text-right">
                  <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-emerald-600 transition duration-150">
                    Waste<span className="text-emerald-600">War</span>
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 -mt-1">
                    Sustainability
                  </span>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition duration-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* MIDDLE ELEMENTS: Home, Profile, Dropdown More */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              <button
                onClick={() => { setActiveTab('home'); triggerToast('Navigated to Home'); }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition duration-150 ${activeTab === 'home' ? 'bg-emerald-50 text-emerald-600 shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
              >
                Home
              </button>

              <button
                onClick={() => { setActiveTab('profile'); triggerToast('Navigated to Profile'); }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition duration-150 ${activeTab === 'profile' ? 'bg-emerald-50 text-emerald-600 shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
              >
                None 
              </button>

              {/* Dropdown More */}
              <div className="relative" ref={moreDropdownRef}>
                <button
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-xl text-sm font-medium transition duration-150 ${isMoreOpen ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
                >
                  <span>More</span>
                  <svg className={`w-4 h-4 transition-transform duration-200 ${isMoreOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>

                {isMoreOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 transform origin-top-right transition-all animate-in fade-in zoom-in-95">
                    <button 
                      onClick={() => { setIsMoreOpen(false); triggerToast('Opened Analytics'); }}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center space-x-2 transition"
                    >
                      <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                      </svg>
                      <span>Analytics</span>
                    </button>
                    <button 
                      onClick={() => { setIsMoreOpen(false); triggerToast('Opened Impact Reports'); }}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center space-x-2 transition"
                    >
                      <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>Impact Reports</span>
                    </button>
                    <button 
                      onClick={() => { setIsMoreOpen(false); triggerToast('Opened Settings'); }}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center space-x-2 transition"
                    >
                      <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      <span>Settings</span>
                    </button>
                    <div className="border-t border-slate-100 my-1"></div>
                    <button 
                      onClick={() => { setIsMoreOpen(false); triggerToast('Opened Help & Support'); }}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center space-x-2 transition"
                    >
                      <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>Help & Support</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* LEFT SIDE: Logout & Profile action buttons */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => triggerToast('Profile settings clicked')}
                className="flex items-center space-x-2 p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                title="User Profile"
              >
                <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-semibold text-sm shadow-inner">
                  WW
                </div>
                <span className="hidden md:inline font-medium text-sm">Account</span>
              </button>

              <button 
                onClick={() => triggerToast('Logged out successfully')}
                className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition duration-150 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
                Logout
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
            <button
              onClick={() => { setActiveTab('home'); setIsMobileMenuOpen(false); triggerToast('Navigated to Home'); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition ${activeTab === 'home' ? 'bg-emerald-50 text-emerald-600 font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Home
            </button>
            <button
              onClick={() => { setActiveTab('profile'); setIsMobileMenuOpen(false); triggerToast('Navigated to Profile'); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition ${activeTab === 'profile' ? 'bg-emerald-50 text-emerald-600 font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Profile
            </button>
            <div className="pt-2 pb-1 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">More Options</div>
            <button
              onClick={() => { setIsMobileMenuOpen(false); triggerToast('Opened Analytics'); }}
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition"
            >
              Analytics
            </button>
            <button
              onClick={() => { setIsMobileMenuOpen(false); triggerToast('Opened Impact Reports'); }}
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition"
            >
              Impact Reports
            </button>
            <button
              onClick={() => { setIsMobileMenuOpen(false); triggerToast('Opened Settings'); }}
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition"
            >
              Settings
            </button>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between px-2">
              <button 
                onClick={() => { setIsMobileMenuOpen(false); triggerToast('Profile settings clicked'); }}
                className="flex items-center space-x-2 text-sm text-slate-700 font-medium"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">WW</div>
                <span>My Account</span>
              </button>
              <button
                onClick={() => { setIsMobileMenuOpen(false); triggerToast('Logged out successfully'); }}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>

    

    
  );
}
