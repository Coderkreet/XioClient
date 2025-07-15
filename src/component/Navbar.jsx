import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { getAllHeaderContent } from '../api/admin-api';
import logo from '../assets/coinbg3.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [logoUrl, setLogoUrl] = useState("");

    const navItems = [
        { label: 'Products', path: '#products' },
        { label: 'Ecosystem', path: '#ecosystem' },
        { label: 'Roadmap', path: '#roadmap' },
        { label: 'Tokenomics', path: '#tokenomics' },
        { label: 'Events', path: '#events' },
        { label: 'FAQ', path: '#faq' },
        { label: 'Blogs', path: '/blogs' },
    ];

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

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

    // Handle scroll effect and active section
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
            // Active section logic
            let found = '';
            for (const item of navItems) {
                if (item.path.startsWith('#')) {
                    const id = item.path.replace('#', '');
                    const el = document.getElementById(id);
                    if (el) {
                        const rect = el.getBoundingClientRect();
                        if (rect.top <= 120 && rect.bottom > 120) {
                            found = id;
                            break;
                        }
                    }
                }
            }
            setActiveSection(found);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLinkClick = (path) => {
        setIsOpen(false);
        if (path.startsWith('#')) {
            const id = path.replace('#', '');
            setTimeout(() => {
                const el = document.getElementById(id);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 50);
        } else {
            window.location.href = path;
        }
    };

    return (
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#f12dc093] backdrop-blur-md shadow-xl'
            : 'bg-white/10 backdrop-blur-lg shadow-sm'
        }`}
      >
        <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[4rem]">
            {/* Logo Section */}
            <div className="flex items-center group cursor-pointer">
              <div onClick={scrollToTop} className="w-10 h-10 lg:w-[6rem] lg:h-[6rem]  rounded-xl flex items-center justify-center  transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-purple-500/25">
                <img src={logoUrl} alt="" />
              </div>
              <div className="ml-3 hidden sm:block">
                <h1 className="text-white font-bold text-lg lg:text-xl"></h1>
              </div>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden text-[3rem] xl:flex items-center space-x-1">
              {navItems.map((item) => {
                const id = item.path.replace('#', '');
                const isActive = activeSection === id;
                return (
                  <button
                    key={item.label}
                    onClick={() => handleLinkClick(item.path)}
                    className={`relative px-4 py-2 text-xl font-medium transition-all duration-300 group ${
                      isActive
                        ? 'text-white bg-gradient-to-r from-purple-600/40 to-indigo-600/40 rounded-lg shadow-lg'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    <div className={`absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-lg transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                    {/* <div className={`absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300 ${isActive ? 'w-full left-0' : 'group-hover:w-full group-hover:left-0'}`}></div> */}
                  </button>
                );
              })}
            </div>
            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link >
                <button
            onClick={() => window.open('https://xiowallet.com/', '_blank', 'noopener,noreferrer')}
                  className="relative px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 overflow-hidden group"
                >
                   Xio Wallet
                </button>
              </Link>
            </div>
            {/* Mobile Menu Button */}
            <div className="xl:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-300"
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                <div className="relative w-6 h-6">
                  <Menu
                    size={24}
                    className={`absolute inset-0 transition-all duration-300 ${
                      isOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                    }`}
                  />
                  <X
                    size={24}
                    className={`absolute inset-0 transition-all duration-300 ${
                      isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        <div
          className={`xl:hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}
        >
          <div className="bg-gray-800/95 backdrop-blur-lg border-t border-gray-700">
            <div className="px-4 py-6 space-y-3">
              {navItems.map((item) => {
                const id = item.path.replace('#', '');
                const isActive = activeSection === id;
                return (
                  <button
                    key={item.label}
                    onClick={() => handleLinkClick(item.path)}
                    className={`w-full text-left px-4 py-3 font-medium rounded-lg transition-all duration-300 transform hover:translate-x-1 flex items-center justify-between ${
                      isActive
                        ? 'text-white bg-gradient-to-r from-purple-600/20 to-indigo-600/20'
                        : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-600/10 hover:to-indigo-600/10'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown size={16} className="text-gray-500 rotate-[-90deg]" />
                  </button>
                );
              })}
              {/* Mobile Action Buttons */}
              <div className="pt-4 space-y-3 border-t border-gray-700">
                <button
                  onClick={() => handleLinkClick('https://xiowallet.io/')}
                  className="w-full px-4 py-3 border-2 border-purple-500 text-purple-400 font-semibold rounded-lg hover:bg-purple-500 hover:text-white transition-all duration-300"
                >
                  Xio Wallet
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
};

export default Navbar;