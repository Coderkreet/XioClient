import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaTelegramPlane,
  
} from "react-icons/fa";
import { IoIosArrowRoundForward, IoIosArrowUp } from "react-icons/io";
// import { getLatestLogo } from "../api/landingpage-api";
import { getAllCopyWrites, getAllFooterLinks, getAllHeaderContent , getAllDescriptions } from "../api/admin-api";
import { Link } from 'react-router-dom';

const Footer = () => {
  const [logoUrl, setLogoUrl] = useState("");
  const [footerLinks, setFooterLinks] = useState([]);
  const [copyright, setCopyright] = useState(null);
const [dis , setDis] = useState("")
  const fetchData = async () => {
    try {
      const res = await getAllHeaderContent();
      const res2 = await getAllDescriptions()
      if (res2?.data && res2.data.length > 0) {
        setDis(res2.data[0].description)
        console.log("discrp",res2)
      }
      if (res?.data?.navLogo) {
        setLogoUrl(res.data.navLogo); 
      }
    } catch {
      // Error fetching logo
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {
    const fetchFooterLinks = async () => {
      try {
        const res = await getAllFooterLinks();
        if (res?.data && Array.isArray(res.data)) {
          console.log(res?.data)
          setFooterLinks(res.data);
        } else if (Array.isArray(res)) {
          setFooterLinks(res);
        } else {
          setFooterLinks([]);
        }
      } catch {
        setFooterLinks([]);
      }
    };
    const fetchCopyright = async () => {
      try {
        const res = await getAllCopyWrites();
        if (res && Array.isArray(res.data) && res.data.length > 0) {
          setCopyright(res.data[0]);
        } else {
          setCopyright(null);
        }
      } catch {
        setCopyright(null);
      }
    };
    fetchData();
    fetchFooterLinks();
    fetchCopyright();
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFooterLinkClick = (e, path) => {
    if (path.startsWith('#')) {
      e.preventDefault();
      const id = path.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <footer className="w-full text-white py-10 px-[3rem] justify-center items-center sm:px-6 md:px-12 lg:px-20 font1 bg-black relative overflow-hidden">
      {/* Background Graphics */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Lines */}
        <div className="absolute inset-0">
          {/* Horizontal Lines */}
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent animate-pulse"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-pulse delay-1000"></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/25 to-transparent animate-pulse delay-2000"></div>
          {/* Extra Horizontal Lines */}
          <div className="absolute top-[15%] left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-400/20 to-transparent animate-pulse delay-500"></div>
          <div className="absolute top-[85%] left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-pulse delay-1500"></div>
          <div className="absolute top-[35%] left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-400/15 to-transparent animate-pulse delay-3000"></div>
          <div className="absolute top-[65%] left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-400/15 to-transparent animate-pulse delay-3500"></div>
          
          {/* Diagonal Lines */}
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent transform rotate-12 animate-pulse delay-500"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/15 to-transparent transform -rotate-12 animate-pulse delay-1500"></div>
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-purple-400/15 to-transparent transform rotate-6 animate-pulse delay-2500"></div>
          {/* Extra Diagonal Lines */}
          <div className="absolute top-0 left-[15%] w-px h-full bg-gradient-to-b from-transparent via-pink-400/15 to-transparent transform rotate-3 animate-pulse delay-1000"></div>
          <div className="absolute top-0 right-[15%] w-px h-full bg-gradient-to-b from-transparent via-cyan-400/15 to-transparent transform -rotate-3 animate-pulse delay-2000"></div>
          <div className="absolute top-0 left-[35%] w-px h-full bg-gradient-to-b from-transparent via-violet-400/12 to-transparent transform rotate-9 animate-pulse delay-4000"></div>
          <div className="absolute top-0 right-[35%] w-px h-full bg-gradient-to-b from-transparent via-indigo-400/12 to-transparent transform -rotate-9 animate-pulse delay-4500"></div>
          
          {/* Curved Lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
            <path d="M0,200 Q300,100 600,200 T1200,200" fill="none" stroke="url(#gradient1)" strokeWidth="1" opacity="0.3">
              <animate attributeName="d" dur="8s" repeatCount="indefinite" values="M0,200 Q300,100 600,200 T1200,200;M0,200 Q300,300 600,200 T1200,200;M0,200 Q300,100 600,200 T1200,200"/>
            </path>
            <path d="M0,400 Q400,300 800,400 T1200,400" fill="none" stroke="url(#gradient2)" strokeWidth="1" opacity="0.2">
              <animate attributeName="d" dur="10s" repeatCount="indefinite" values="M0,400 Q400,300 800,400 T1200,400;M0,400 Q400,500 800,400 T1200,400;M0,400 Q400,300 800,400 T1200,400"/>
            </path>
            {/* Additional Complex Curved Lines */}
            <path d="M0,150 Q200,50 400,150 Q600,250 800,150 Q1000,50 1200,150" fill="none" stroke="url(#gradient3)" strokeWidth="1" opacity="0.25">
              <animate attributeName="d" dur="12s" repeatCount="indefinite" values="M0,150 Q200,50 400,150 Q600,250 800,150 Q1000,50 1200,150;M0,150 Q200,250 400,150 Q600,50 800,150 Q1000,250 1200,150;M0,150 Q200,50 400,150 Q600,250 800,150 Q1000,50 1200,150"/>
            </path>
            <path d="M0,500 Q300,350 600,500 Q900,650 1200,500" fill="none" stroke="url(#gradient4)" strokeWidth="1" opacity="0.18">
              <animate attributeName="d" dur="14s" repeatCount="indefinite" values="M0,500 Q300,350 600,500 Q900,650 1200,500;M0,500 Q300,650 600,500 Q900,350 1200,500;M0,500 Q300,350 600,500 Q900,650 1200,500"/>
            </path>
            {/* Bezier Curves */}
            <path d="M0,100 C200,0 400,200 600,100 C800,0 1000,200 1200,100" fill="none" stroke="url(#gradient5)" strokeWidth="1" opacity="0.15">
              <animate attributeName="d" dur="16s" repeatCount="indefinite" values="M0,100 C200,0 400,200 600,100 C800,0 1000,200 1200,100;M0,100 C200,200 400,0 600,100 C800,200 1000,0 1200,100;M0,100 C200,0 400,200 600,100 C800,0 1000,200 1200,100"/>
            </path>
            <path d="M0,550 C300,450 600,650 900,550 C1050,500 1150,600 1200,550" fill="none" stroke="url(#gradient6)" strokeWidth="1" opacity="0.12">
              <animate attributeName="d" dur="18s" repeatCount="indefinite" values="M0,550 C300,450 600,650 900,550 C1050,500 1150,600 1200,550;M0,550 C300,650 600,450 900,550 C1050,600 1150,500 1200,550;M0,550 C300,450 600,650 900,550 C1050,500 1150,600 1200,550"/>
            </path>
            
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent"/>
                <stop offset="50%" stopColor="#8B5CF6"/>
                <stop offset="100%" stopColor="transparent"/>
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent"/>
                <stop offset="50%" stopColor="#3B82F6"/>
                <stop offset="100%" stopColor="transparent"/>
              </linearGradient>
              <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent"/>
                <stop offset="25%" stopColor="#EC4899"/>
                <stop offset="75%" stopColor="#8B5CF6"/>
                <stop offset="100%" stopColor="transparent"/>
              </linearGradient>
              <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent"/>
                <stop offset="33%" stopColor="#06B6D4"/>
                <stop offset="66%" stopColor="#8B5CF6"/>
                <stop offset="100%" stopColor="transparent"/>
              </linearGradient>
              <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent"/>
                <stop offset="50%" stopColor="#7C3AED"/>
                <stop offset="100%" stopColor="transparent"/>
              </linearGradient>
              <linearGradient id="gradient6" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent"/>
                <stop offset="50%" stopColor="#6366F1"/>
                <stop offset="100%" stopColor="transparent"/>
              </linearGradient>
            </defs>
          </svg>
          
          {/* Geometric Shapes */}
          <div className="absolute top-10 left-10 w-20 h-20 border border-purple-500/20 rounded-full animate-spin slow"></div>
          <div className="absolute bottom-20 right-20 w-16 h-16 border border-blue-500/20 transform rotate-45 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-12 h-12 border border-purple-400/15 rounded-full animate-ping slow"></div>
          <div className="absolute bottom-1/3 left-1/4 w-8 h-8 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full animate-bounce slow"></div>
          
          {/* Additional Geometric Shapes */}
          <div className="absolute top-20 right-10 w-14 h-14 border-2 border-pink-400/20 rounded-lg transform rotate-12 animate-spin reverse-slow"></div>
          <div className="absolute bottom-32 left-16 w-10 h-10 border border-cyan-400/20 rounded-full animate-pulse slow"></div>
          <div className="absolute top-1/2 left-10 w-6 h-6 bg-gradient-to-br from-violet-500/15 to-indigo-500/15 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute bottom-1/4 right-1/3 w-18 h-18 border border-purple-300/15 rounded-full animate-ping delay-2000"></div>
          
          {/* Hexagon and Triangle Shapes */}
          <div className="absolute top-1/4 left-1/3 w-16 h-16 clip-path-hexagon bg-gradient-to-br from-purple-500/10 to-blue-500/10 animate-pulse delay-1500"></div>
          <div className="absolute bottom-1/4 right-1/4 w-12 h-12 clip-path-triangle bg-gradient-to-br from-pink-500/10 to-cyan-500/10 animate-spin slow"></div>
          
          {/* Floating Particles */}
          <div className="absolute top-[20%] left-[20%] w-2 h-2 bg-purple-400/40 rounded-full animate-float"></div>
          <div className="absolute top-[40%] left-[80%] w-1 h-1 bg-blue-400/40 rounded-full animate-float delay-1000"></div>
          <div className="absolute top-[60%] left-[10%] w-1.5 h-1.5 bg-pink-400/40 rounded-full animate-float delay-2000"></div>
          <div className="absolute top-[80%] left-[70%] w-1 h-1 bg-cyan-400/40 rounded-full animate-float delay-3000"></div>
          <div className="absolute top-[10%] left-[60%] w-2 h-2 bg-violet-400/40 rounded-full animate-float delay-500"></div>
          <div className="absolute top-[30%] left-[40%] w-1 h-1 bg-indigo-400/40 rounded-full animate-float delay-1500"></div>
          <div className="absolute top-[70%] left-[90%] w-1.5 h-1.5 bg-purple-300/40 rounded-full animate-float delay-2500"></div>
          <div className="absolute top-[90%] left-[30%] w-1 h-1 bg-blue-300/40 rounded-full animate-float delay-3500"></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_1px,_rgba(139,92,246,0.05)_1px)] bg-[length:50px_50px]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,_transparent_24px,_rgba(139,92,246,0.03)_25px,_rgba(139,92,246,0.03)_26px,_transparent_27px)] bg-[length:100px_100px]"></div>
          
          {/* Glow Effects */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-400/5 rounded-full blur-2xl animate-pulse delay-2000"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-pink-500/4 rounded-full blur-3xl animate-pulse delay-3000"></div>
          <div className="absolute bottom-0 left-0 w-88 h-88 bg-cyan-500/4 rounded-full blur-3xl animate-pulse delay-4000"></div>
          
        
          {/* Network Connection Lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
            <g opacity="0.1">
              <line x1="100" y1="100" x2="300" y2="200" stroke="url(#networkGradient)" strokeWidth="1">
                <animate attributeName="opacity" dur="3s" repeatCount="indefinite" values="0.1;0.3;0.1"/>
              </line>
              <line x1="300" y1="200" x2="500" y2="150" stroke="url(#networkGradient)" strokeWidth="1">
                <animate attributeName="opacity" dur="3s" repeatCount="indefinite" values="0.1;0.3;0.1" begin="0.5s"/>
              </line>
              <line x1="500" y1="150" x2="700" y2="250" stroke="url(#networkGradient)" strokeWidth="1">
                <animate attributeName="opacity" dur="3s" repeatCount="indefinite" values="0.1;0.3;0.1" begin="1s"/>
              </line>
              <line x1="700" y1="250" x2="900" y2="180" stroke="url(#networkGradient)" strokeWidth="1">
                <animate attributeName="opacity" dur="3s" repeatCount="indefinite" values="0.1;0.3;0.1" begin="1.5s"/>
              </line>
              <line x1="900" y1="180" x2="1100" y2="220" stroke="url(#networkGradient)" strokeWidth="1">
                <animate attributeName="opacity" dur="3s" repeatCount="indefinite" values="0.1;0.3;0.1" begin="2s"/>
              </line>
              {/* Vertical connections */}
              <line x1="200" y1="300" x2="400" y2="450" stroke="url(#networkGradient)" strokeWidth="1">
                <animate attributeName="opacity" dur="4s" repeatCount="indefinite" values="0.1;0.3;0.1"/>
              </line>
              <line x1="600" y1="350" x2="800" y2="500" stroke="url(#networkGradient)" strokeWidth="1">
                <animate attributeName="opacity" dur="4s" repeatCount="indefinite" values="0.1;0.3;0.1" begin="1s"/>
              </line>
              <line x1="1000" y1="300" x2="1200" y2="450" stroke="url(#networkGradient)" strokeWidth="1">
                <animate attributeName="opacity" dur="4s" repeatCount="indefinite" values="0.1;0.3;0.1" begin="2s"/>
              </line>
            </g>
            <defs>
              <linearGradient id="networkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6"/>
                <stop offset="100%" stopColor="#3B82F6"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Up Arrow at Top Center */}
      <button
        onClick={scrollToTop}
        className="absolute left-1/2 -top-1 transform -translate-x-1/2 bg-gradient-to-br from-[#4A088C] via-[#433C73] to-[#AEA7D9] p-2 rounded-full shadow-lg hover:scale-110 transition z-[1200]"
        title="Go to top"
      >
        <IoIosArrowUp size={32} className="text-white" />
      </button>

      {/* Main Content */}
      <div className="max-w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 relative z-10">
        {/* Logo & Description */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            {logoUrl && (
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center cursor-pointer bg-gradient-to-br from-[#4A088C] via-[#433C73] to-[#AEA7D9]"
                onClick={scrollToTop}
                title="Go to top"
              >
                <img src={logoUrl} alt="XIO Coin" className="w-16 h-16 object-contain" />
              </div>
            )}
          </div>
          <p className="text-sm sm:text-base text-gray-400 mb-6 leading-relaxed">
            {dis}
          </p>
        </div>

        {/* Get in Touch */}
        <div>
          <h3 className="text-xl sm:text-[1.7rem] font-bold mb-4 sm:mb-6">Get in touch</h3>
          <Link    
            onClick={() => window.open('https://xiowallet.com/', '_blank', 'noopener,noreferrer')}
          className="block text-sm sm:text-base text-gray-400 mb-2 hover:text-white transition">
            Wallet
          </Link>

          <a
            href="#products"
            className="block text-sm sm:text-base text-gray-400 mb-2 hover:text-white transition"
            onClick={e => handleFooterLinkClick(e, '#products')}
          >
            Products
          </a>
          <a
            href="#ecosystem"
            className="block text-sm sm:text-base text-gray-400 mb-2 hover:text-white transition"
            onClick={e => handleFooterLinkClick(e, '#ecosystem')}
          >
            Ecosystem
          </a>
          <a
            href="#roadmap"
            className="block text-sm sm:text-base text-gray-400 mb-2 hover:text-white transition"
            onClick={e => handleFooterLinkClick(e, '#roadmap')}
          >
            Roadmap
          </a>
          <a
            href="#tokenomics"
            className="block text-sm sm:text-base text-gray-400 mb-2 hover:text-white transition"
            onClick={e => handleFooterLinkClick(e, '#tokenomics')}
          >
            Tokenomics
          </a>
          <a
            href="#events"
            className="block text-sm sm:text-base text-gray-400 mb-2 hover:text-white transition"
            onClick={e => handleFooterLinkClick(e, '#events')}
          >
            Events
          </a>
          <a
            href="#faq"
            className="block text-sm sm:text-base text-gray-400 mb-2 hover:text-white transition"
            onClick={e => handleFooterLinkClick(e, '#faq')}
          >
            FAQ
          </a>
          {/* <Link to="/" className="block text-sm sm:text-base text-gray-400 mb-2 hover:text-white transition">
            Staking
          </Link> */}
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-xl sm:text-[1.7rem] font-bold mb-4 sm:mb-6">Support</h3>
          <Link
            to="/terms-of-use"
            className="block text-sm sm:text-base text-gray-400 mb-2 hover:text-white transition"
          >
            Terms of Use
          </Link>
          <Link
            to="/privacy-policy"
            className="block text-sm sm:text-base text-gray-400 mb-2 hover:text-white transition"
          >
            Privacy Policy
          </Link>
          <Link
            to="/cookie-policy"
            className="block text-sm sm:text-base text-gray-400 mb-2 hover:text-white transition"
          >
            Cookie Policy
          </Link>
        </div>

        {/* Resources & Newsletter */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold mb-4">Resources</h3>
          <Link to="/contact-us" className="block text-sm sm:text-base text-gray-400 mb-2 hover:text-white transition">
            Contact Us
          </Link>
          <Link to="/blogs" className="block text-sm sm:text-base text-gray-400 mb-4 hover:text-white transition">
            Blog
          </Link>
          <Link to="/login" className="block text-sm sm:text-base text-gray-400 mb-4 hover:text-white transition">
            Admin Login
          </Link>

          {/* <p className="text-sm mb-2">Sign up to our Newsletter!</p>
          <div className="relative w-[15rem] mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent border-b-2 border-gray-500 text-white text-sm w-full pr-12 py-2 focus:outline-none"
            />
            <button className="absolute right-0 top-1 text-purple-500 hover:text-white transition-all">
              <IoIosArrowRoundForward size={24} />
            </button>
          </div> */}
        </div>
      </div>

      {/* SOCIAL ICONS RIGHT SIDE */}
      <div className="max-w-11/12 mx-auto mt-10 flex justify-end relative z-10">
        <div className="flex flex-row gap-4">
          {footerLinks.map((link, i) =>
            link.logo ? (
              <a href={link.url} key={i} target="_blank" rel="noopener noreferrer">
                <div className="bg-gradient-to-br from-[#4A088C] via-[#433C73] to-[#AEA7D9] p-2 rounded-full hover:scale-110 transition">
                  <img
                    src={link.logo}
                    alt={link.platform || "logo"}
                    className="w-8 h-8 rounded-full object-contain"
                  />
                </div>
              </a>
            ) : null
          )}
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-6 max-w-11/12 mx-auto flex flex-col items-center text-xs sm:text-sm text-gray-500 gap-2 relative z-10">
        {copyright && (
          <>
            <div className="text-center text-gray-400 mb-2 w-full max-w-2xl">{copyright.description}</div>
            <hr className="w-24 border-gray-600 my-2" />
            <div className="text-center text-gray-500 font-semibold">{copyright.title}</div>
          </>
        )}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes reverse-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spin-reverse-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        .animate-spin.slow {
          animation: slow 20s linear infinite;
        }
        .animate-spin.reverse-slow {
          animation: reverse-slow 25s linear infinite;
        }
        .animate-pulse.slow {
          animation: pulse 4s ease-in-out infinite;
        }
        .animate-bounce.slow {
          animation: bounce 3s ease-in-out infinite;
        }
        .animate-ping.slow {
          animation: ping 3s ease-in-out infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }
        .animate-spin-reverse-slow {
          animation: spin-reverse-slow 35s linear infinite;
        }
        .clip-path-hexagon {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
        .clip-path-triangle {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
        .w-18 { width: 4.5rem; }
        .h-18 { height: 4.5rem; }
        .w-88 { width: 22rem; }
        .h-88 { height: 22rem; }
      `}</style>
    </footer>
  );
};

export default Footer;