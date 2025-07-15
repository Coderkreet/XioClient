import React, { useEffect, useState, useRef } from "react";
// Note: GSAP imports would be handled in your actual project
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaNetworkWired,
  FaUsers,
  FaShieldAlt,
  FaChartLine,
} from "react-icons/fa";
import { getAllOverviews } from "../api/admin-api";
// import { getAllOverviews } from "../api/admin-api";

// Register GSAP plugins (would be in your actual project)
// gsap.registerPlugin(ScrollTrigger);

const Overview = () => {
  const [overview, setOverview] = useState(null); // for section title/desc
  const [cards, setCards] = useState([]); // for the slides
  const [currentSlide, setCurrentSlide] = useState(0);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const particlesRef = useRef([]);
  const glowRef = useRef(null);
  const intervalRef = useRef(null);

 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllOverviews();
        if (Array.isArray(response?.data) && response.data.length > 0) {
          setOverview(response.data[0]);
          setCards(response.data[0].card || []);
        }
      } catch (err) {
        console.error("Error fetching overview data:", err);
      }
    };
    fetchData();
  }, []);


  // Auto-rotate slides
  useEffect(() => {
    if (!cards.length) return;
    intervalRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % cards.length);
    }, 4000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [cards.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % cards.length);
      }, 4000);
    }
  };

  // Updated color palette based on the provided theme
  const icons = [
    <FaNetworkWired className="text-[#AEA7D9] text-2xl" />,
    <FaUsers className="text-[#AEA7D9] text-2xl" />,
    <FaShieldAlt className="text-[#AEA7D9] text-2xl" />,
    <FaChartLine className="text-[#AEA7D9] text-2xl" />,
  ];

  const iconBorders = [
    "border-[#4A088C] bg-[#AEA7D9]/10 shadow-[#4A088C]/20",
    "border-[#120540] bg-[#AEA7D9]/10 shadow-[#120540]/20", 
    "border-[#433C73] bg-[#AEA7D9]/10 shadow-[#433C73]/20",
    "border-[#AEA7D9] bg-[#AEA7D9]/10 shadow-[#AEA7D9]/20",
  ];

  const gradients = [
    "from-[#4A088C]/20 to-[#4A088C]/5",
    "from-[#120540]/20 to-[#120540]/5",
    "from-[#433C73]/20 to-[#433C73]/5",
    "from-[#AEA7D9]/20 to-[#AEA7D9]/5",
  ];

  return (
    <section 
      ref={sectionRef}
      className="w-full h-full bg-gradient-to-br from-[#120540]  via-[#1b0a2d] to-[#433C73] text-white py-[5rem] px-6 sm:px-12 md:px-20 font-sans relative overflow-hidden"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#4A088C]/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#AEA7D9]/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#433C73]/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({length: 12}).map((_, i) => (
          <div
            key={i}
            ref={el => particlesRef.current[i] = el}
            className={`absolute w-2 h-2 rounded-full animate-pulse ${
              i % 4 === 0 ? 'bg-[#4A088C]/30' :
              i % 4 === 1 ? 'bg-[#120540]/30' :
              i % 4 === 2 ? 'bg-[#433C73]/30' : 'bg-[#AEA7D9]/30'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="w-full mx-auto relative z-10">
        {/* Enhanced Header Section */}
        <div className="text-center mb-20 relative">
          <div 
            ref={glowRef}
            className="absolute inset-0 bg-gradient-to-r from-[#4A088C]/20 via-[#433C73]/20 to-[#AEA7D9]/20 blur-3xl -z-10"
          />
          <h2 ref={headerRef} className="text-[3rem] font-bold mb-8 leading-tight  bg-gradient-to-r from-[#4A088C] to-[#fbaeff] bg-clip-text text-transparent relative">
            {overview?.text || 'Overview'}
            <div className="absolute -top-4 -right-4 w-4 h-4 bg-[#4A088C]/60 rounded-full animate-ping"></div>
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-[#4A088C] via-[#433C73] to-[#AEA7D9] mx-auto rounded-full relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#4A088C] via-[#433C73] to-[#AEA7D9] rounded-full animate-pulse blur-sm"></div>
          </div>
          <p className="mt-6 text-[#AEA7D9] text-lg max-w-2xl mx-auto">
            {overview?.topDescription || 'Discover the future of technology through our advanced solutions'}
          </p>
        </div>

        {/* Enhanced Cards Section */}
        <div className="mx-auto">
          <div className="relative min-h-[500px]">
            {cards.map((item, index) => (
              <div
                key={item._id}
                ref={el => cardsRef.current[index] = el}
                className={`absolute inset-0 transition-all duration-700 ${
                  index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center h-full">
                  {/* Enhanced Left Image Section */}
                  <div className="flex justify-center">
                    <div className="relative group w-full max-w-lg">
                      {/* Outer glow effect */}
                      <div className="absolute -inset-6 bg-gradient-to-r from-[#4A088C]/30 via-[#433C73]/30 to-[#AEA7D9]/30 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-all duration-700"></div>
                      
                      {/* Main container */}
                      <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent p-3 rounded-3xl backdrop-blur-xl border border-white/20 group-hover:border-white/40 transition-all duration-500">
                        <div className="relative overflow-hidden rounded-2xl">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full aspect-[4/3] object-cover transition-all duration-700 group-hover:scale-110"
                          />
                          
                          {/* Live indicator */}
                          {/* <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#4A088C]/90 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm border border-[#4A088C]/30">
                            <div className="w-2 h-2 bg-[#AEA7D9] rounded-full animate-pulse"></div>
                            Live
                          </div> */}

                          {/* Scanning line effect */}
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#AEA7D9]/30 to-transparent h-1 animate-pulse opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                               style={{
                                 animation: 'scan 3s linear infinite',
                                 background: 'linear-gradient(to bottom, transparent, rgba(174, 167, 217, 0.3), transparent)'
                               }}></div>
                        </div>

                        {/* Corner decorations */}
                        <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-[#4A088C]/60 rounded-tl-lg"></div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 border-r-2 border-t-2 border-[#AEA7D9]/60 rounded-tr-lg"></div>
                        <div className="absolute -bottom-2 -left-2 w-8 h-8 border-l-2 border-b-2 border-[#433C73]/60 rounded-bl-lg"></div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-[#727FA6]/60 rounded-br-lg"></div>
                      </div>

                      {/* Floating elements */}
                      <div className="absolute -top-6 -left-6 w-4 h-4 bg-[#4A088C]/40 rounded-full animate-bounce"></div>
                      <div className="absolute -bottom-6 -right-6 w-3 h-3 bg-[#AEA7D9]/50 rounded-full animate-bounce"></div>
                      <div className="absolute top-1/2 -right-8 w-2 h-2 bg-[#433C73]/60 rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  {/* Enhanced Right Content Section */}
                  <div className="space-y-6">
                    <div className={`group relative p-8 rounded-3xl border border-white/10 bg-gradient-to-br ${gradients[index % gradients.length]} backdrop-blur-xl hover:border-white/30 transition-all duration-700 hover:transform hover:scale-[1.02] hover:shadow-2xl overflow-hidden`}>
                      
                      {/* Background pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="w-full h-full" style={{
                          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                          backgroundSize: '20px 20px'
                        }}></div>
                      </div>

                      {/* Content */}
                      <div className="relative z-10">
                        <div className="flex items-start gap-8">
                          <div className="flex-shrink-0">
                            <div className={`w-20 h-20 flex items-center justify-center rounded-2xl border-2 ${iconBorders[index % iconBorders.length]} shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 relative overflow-hidden`}>
                              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                              {icons[index % icons.length]}
                            </div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="text-[1rem] font-bold text-white mb-4 leading-tight">
                              {item.title}
                            </h3>
                            <p className="text-[#AEA7D9] leading-relaxed text-[1rem]">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Animated border */}
                      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#4A088C] via-[#433C73] to-[#AEA7D9] transition-all duration-700 group-hover:w-full"></div>
                      
                      {/* Corner accent */}
                      <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-xl"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Navigation Dots */}
          <div className="mt-16 flex justify-center items-center space-x-4">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`relative transition-all duration-500 ${
                  currentSlide === index
                    ? 'w-12 h-4 bg-gradient-to-r from-[#e9d2ff] via-[#e9e6ff] to-[#AEA7D9] rounded-full'
                    : 'w-4 h-4 bg-[#727FA6]/40 hover:bg-[#AEA7D9]/60 rounded-full'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                {currentSlide === index && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#f1e3ff] via-[#cdc7f4] to-[#AEA7D9] rounded-full animate-pulse blur-sm opacity-60"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100px); }
          100% { transform: translateY(500px); }
        }
      `}</style>
    </section>
  );
};

export default Overview;