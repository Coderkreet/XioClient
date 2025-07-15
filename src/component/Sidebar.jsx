import React, { useState } from 'react';
import {
  Home, Users, Settings, BarChart3, Wallet, Shield, FileText, CreditCard
} from 'lucide-react';
import { User, ChevronDown, X, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { getAllHeaderContent } from '../api/admin-api';

// Reusable infinite scroll animation hook
export function useHorizontalInfiniteScroll(ref, items) {
  const animationFrameRef = useRef(null);
  const scrollAmountRef = useRef(0);
  const isPausedRef = useRef(false);



  useEffect(() => {
    const slider = ref.current;
    let speed = 1.2;

    const animate = () => {
      if (slider && !isPausedRef.current) {
        scrollAmountRef.current += speed;
        if (slider.scrollWidth > 0 && scrollAmountRef.current >= slider.scrollWidth / 2) {
          scrollAmountRef.current = 0;
        }
        slider.scrollLeft = scrollAmountRef.current;
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameRef.current);
    // eslint-disable-next-line
  }, [items]);
}

export default function Sidebar({ sidebarOpen, setSidebarOpen, activeMenu, setActiveMenu, menuItems }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
    window.location.reload();
  };
  const [logoUrl, setLogoUrl] = useState("");
  const fetchData = async () => {
    try {
      const res = await getAllHeaderContent();
      if (res?.data?.navLogo) {
        setLogoUrl(res.data.navLogo); 
      }
    } catch (err) {
      console.error("Error fetching logo:", err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-slate-800/95 to-slate-900/95 backdrop-blur-xl border-r border-slate-700/50 transform transition-transform duration-300 ease-in-out flex flex-col h-full max-h-screen
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      lg:translate-x-0 lg:static lg:inset-0`}>
      <div className="flex items-center justify-between h-20 px-8 border-b border-slate-700/50 flex-shrink-0">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-200 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
            {/* <div className="w-5 h-5 bg-white/20 rounded-lg transform rotate-45"> */}
            <img src={logoUrl} alt="" />
            {/* </div> */}
          </div>
          <div>
            <span className="text-xl font-bold text-white">XIOCOIN</span>
            <p className="text-xs text-slate-400">Admin Panel</p>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-slate-400 hover:text-white p-2 hover:bg-slate-700/50 rounded-xl transition-colors duration-200 focus:outline-none"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <nav className="mt-8 px-6 flex-1 overflow-y-auto">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveMenu(item.id);
                  setSidebarOpen(false);
                  if (item.id === 'HeroSection') {
                    navigate('/admin/HeroSection');
                  } else if (item.id === 'HeroSlider') {
                    navigate('/admin/HeroSlider');
                  } else if (item.id === 'HeroWallet') {
                    navigate('/admin/HeroWallet');
                  }
                  else if (item.id === 'HeroOverview') {
                    navigate('/admin/HeroOverview');
                  } else if (item.id === 'HeroListedOn') {
                    navigate('/admin/HeroListedOn');
                    
                  } else if (item.id === 'HeroEcosystem') {
                    navigate('/admin/HeroEcosystem');
                  }
                   else if (item.id === 'HeroOurProducts') {
                    navigate('/admin/HeroOurProducts');
                  }
                  else if (item.id === 'HeroRoadmap') {
                    navigate('/admin/HeroRoadmap');
                  }
                  else if (item.id === 'HeroTokenomics') {
                    navigate('/admin/HeroTokenomics');
                  }
                  else if (item.id === 'HeroEvents') {
                    navigate('/admin/HeroEvents');
                  }
                  else if (item.id === 'HeroNews') {
                    navigate('/admin/HeroNews');
                  }
                  else if (item.id === 'HeroFaqs') {
                    navigate('/admin/HeroFaqs');
                  }
                  else if (item.id === 'HeroImportToken') {
                    navigate('/admin/HeroImportToken');
                  }
                  else if (item.id === 'HeroFooter') {
                    navigate('/admin/HeroFooter');
                  }
                  else if (item.id === 'TermsAndConditions') {
                    navigate('/admin/TermsAndConditions');
                  }
                  else if (item.id === 'PrivacyPolicy') {
                    navigate('/admin/PrivacyPolicy');
                  }
                  else if (item.id === 'CookiePolicy') {
                    navigate('/admin/CookiePolicy');
                  }
                  else if (item.id === 'Blogs') {
                    navigate('/admin/Blogs');
                  }
                  else if (item.id === 'Contact') {
                    navigate('/admin/Contact');
                  }
                }}
                className={`w-full flex items-center px-4 py-4 text-sm font-medium rounded-2xl transition-all duration-200 group ${
                  activeMenu === item.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 mr-4 ${activeMenu === item.id ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                {item.label}
                {activeMenu === item.id && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </nav>
      {/* User Profile Section */}
      <div className="p-6 border-t border-slate-700/50 flex-shrink-0">
        <div className="relative">
         
    
          {/* Logout always visible at bottom */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 mt-4 text-sm text-red-400 hover:bg-red-600/20 hover:text-red-300 transition-colors duration-200 rounded-2xl"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
