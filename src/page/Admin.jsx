import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  Settings, 
  BarChart3, 
  Wallet, 
  Shield, 
  Bell, 
  Search,
  Menu,
  X,
  ChevronDown,
  LogOut,
  User,
  PlusCircle,
  FileText,
  CreditCard,
  Activity,
  TrendingUp,
  Calendar,
  Filter,
  MoreVertical,
  Star,
  DollarSign,
  Eye,
  Download,
  Sliders,
  Wallet2,
  List,
  HelpCircle
} from 'lucide-react';
import Sidebar from '../component/Sidebar';
import { Link, Outlet } from 'react-router-dom';
import { HiOutlineArrowCircleDown } from 'react-icons/hi';
import { GrOverview, GrSystem } from 'react-icons/gr';
import { RiRoadMapLine } from 'react-icons/ri';
import { createFooterLink } from '../api/admin-api';
import { FaBlog, FaOptinMonster, FaTeamspeak } from 'react-icons/fa';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('HeroSection');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const menuItems = [
    { id: 'HeroSection', label: 'Hero Section', icon: HiOutlineArrowCircleDown },
    { id: 'HeroSlider', label: 'Hero Slider', icon: Sliders },
    { id: 'HeroWallet', label: 'Hero Wallet', icon: Wallet2 },
    { id: 'HeroOverview', label: 'Overview', icon: GrOverview },
    { id: 'HeroListedOn', label: 'Listed On', icon: List },
    { id: 'HeroEcosystem', label: 'Ecosystem', icon: GrSystem },
    { id: 'HeroOurProducts', label: 'Our Products', icon: FileText },
    { id: 'HeroRoadmap', label: 'Roadmap', icon: RiRoadMapLine },
    { id: 'HeroTokenomics', label: 'Tokenomics', icon: DollarSign },
    { id: 'HeroImportToken', label: 'Import Token', icon: DollarSign },
    { id: 'HeroEvents', label: 'Events', icon: Calendar },
    { id: 'HeroNews', label: 'News', icon: Eye },
    { id: 'HeroFaqs', label: 'Faqs', icon: HelpCircle},
    { id: 'HeroFooter', label: 'Footer', icon: FaOptinMonster },
    { id: 'TermsAndConditions', label: 'Terms Of Use', icon: FaTeamspeak },
    { id: 'PrivacyPolicy', label: 'Privacy Policy', icon: FaTeamspeak },
    { id: 'CookiePolicy', label: 'Cookie Policy', icon: FaTeamspeak },
    { id: 'Blogs', label: 'Blogs', icon: FaBlog },
  ];

  return (
    <div className="min-h-screen bg-slate-900 flex overflow-hidden">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        userDropdownOpen={userDropdownOpen}
        setUserDropdownOpen={setUserDropdownOpen}
        menuItems={menuItems}
      />
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto transition-all duration-300 lg:ml-0">
        {/* Top Header */}
        <header className="h-20 bg-slate-800/50 backdrop-blur-xl border-b border-slate-700/50 flex items-center justify-between px-4 md:px-8 flex-shrink-0 w-full">
          <div className="flex items-center space-x-4 md:space-x-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-slate-400 hover:text-white p-2 hover:bg-slate-700/50 rounded-xl transition-colors duration-200 focus:outline-none"
              aria-label="Open sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>
            {/* Search */}
            <div className="relative w-40 sm:w-60 md:w-80">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search anything..."
                className="pl-12 pr-6 py-3 bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 w-full"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Notifications */}
           <Link to={"/admin/Contact"}> <button  className="relative p-3 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-2xl transition-all duration-200 group">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-xs text-white flex items-center justify-center font-bold"></span>
            </button></Link>
            {/* Current Time */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-700/30 rounded-2xl">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-slate-300 text-sm font-medium">
                {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
        </header>
        {/* Main Content Area */}
        <main className="flex-1 p-2 sm:p-4 md:p-8 overflow-auto w-full">
          <Outlet />
        </main>
      </div>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}