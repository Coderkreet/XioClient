import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";
import icon from "../assets/icon.svg";
import bg1 from "../assets/coinbg1.png";
import bg2 from "../assets/coinbg2.png";
import bg3 from "../assets/coinbg3.png";
import updatecoin from "../assets/xioimg.png";
import { getAllHeaderContent } from "../api/admin-api";
import { Link } from "react-router-dom";
import checkIcon from "../UserAssets/checkIcon.webp";
import Solodpr from "../assets/images/SolidProof.png"
const HeroSection = () => {
  const [content, setContent] = useState(null);
  const sectionRef = useRef();
  const coinRef = useRef();
  const textRef = useRef();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllHeaderContent();
        const data = res?.data;
        let floatImgs =
          data && data.logoImage && Array.isArray(data.logoImage) && data.logoImage.length > 0
            ? data.logoImage
            : [data.logoImage, data.logoImage, data.logoImage];

        setContent({
          headingLines: [data?.headerTitle || "Your Digital"],
          exploreText: data?.subTitle || "Explore, Create, and Transact!",
          description: data?.description || "Xiocoin leverages Web3 technology, ushering in a new era of interaction.",
          auditText: data?.sideLogoTitle || "Smart Contract Audit By",
          auditIcon: data?.sideLogo || icon,
          floatingImages: floatImgs,
          backgroundCoin: data?.staticImage || updatecoin,
          lightPaper: data?.lightPaper || "",
          whitePaper: data?.whitePaper || "",
          onePager: data?.onePager || "",
          auditReport: data?.auditReport || "",
          solidProof: data?.solidProof || "",
        });
      } catch (error) {
        console.error("Failed to fetch header content:", error);
        setContent({
          headingLines: [""],
          exploreText: "",
          description: "",
          auditText: "",
          auditIcon: icon,
          floatingImages: [bg1, bg2, bg3],
          backgroundCoin: updatecoin,
          lightPaper: "",
          whitePaper: "",
          onePager: "",
          auditReport: "",
          solidProof: "",
        });
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (content) {
      const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 1 } });

      // Enhanced animation: more dynamic entrance with bounce and rotation
      tl.fromTo(
        coinRef.current,
        { opacity: 0, scale: 0.8, y: -50 },
        { opacity: 1, scale: 1, y: 0 }
      )
        .fromTo(
          textRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0 },
          "-=0.5"
        )
        .fromTo(
          sectionRef.current.querySelectorAll(".button"),
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.15 },
          "-=0.5"
        );
    }
  }, [content]);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#120540]  via-[#1b0a2d] to-[#433C73] mt-[-3rem] min-h-screen">
      {/* Background Graphics - Floating Coins */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {(content?.floatingImages || [bg1, bg2, bg3]).map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`coin${index + 1}`}
            className={`coin${index + 1} w-[1%] md:w-auto h-auto absolute`}
            data-aos="zoom-in"
            data-aos-delay={index * 200}
          />
        ))}
      </div>

      {/* Background Graphics - Animated Lines and Effects */}
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

      <div
        className="relative bg-cover bg-center min-h-screen flex flex-col items-center justify-center bg-no-repeat overflow-hidden z-10"
        ref={sectionRef}
      >
        <div
          className="w-full flex flex-col items-center justify-center mb-2 relative z-20"
          data-aos="fade-up"
        >
          <div className="relative flex items-center justify-center">
            <img
              ref={coinRef}
              src={content?.backgroundCoin || updatecoin}
              alt="Coin"
              className="w-[300px] mt-3 sm:w-[300px] md:w-[320px] lg:w-[380px] xl:w-[420px] max-w-full  drop-shadow-2xl "
              style={{ marginTop: "4rem" }}
            />
          </div>
        </div>

        <section
          ref={textRef}
          className="font1 px-4 sm:px-6 lg:px-8 w-full flex flex-col mt-[-2rem] items-center justify-center z-20"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold z-0 leading-tight text-center"
            data-aos="fade-right"
          >
            <span className="bg-gradient-to-r from-[#ac59ff] via-[#AEA7D9] to-[#f86eff] bg-clip-text text-transparent">
              {content?.headingLines?.[0] || 'Your Digital'}
            </span>
          </h1>

          <div
            className="flex flex-col items-center gap-3 md:gap-4 w-full max-w-2xl"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl bg-gradient-to-r from-[#AEA7D9] via-[#727FA6] to-[#cd9bff] bg-clip-text text-transparent text-center">
              {content?.exploreText || 'Explore, Create, and Transact!'}
            </p>
            <p className="text-[#AEA7D9]/80 text-sm sm:text-base md:text-lg lg:text-xl text-center leading-relaxed">
              {content?.description || 'Xiocoin leverages Web3 technology, ushering in a new era of interaction.'}
            </p>

            <div
              className="w-full flex flex-col lg:flex-row sm:flex-row flex-wrap justify-center gap-3 md:gap-4 mb-4 mt-2"
              data-aos="zoom-in"
              data-aos-delay="500"
            >
              {/* First row: Whitepaper and Lightpaper side by side on all screens */}
              <div className="flex flex-row gap-3 sm:gap-4 w-full justify-center">
                <a
                  href={content?.whitePaper || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`button text-center flex-1 max-w-[220px] px-6 sm:px-8 md:px-10 py-2 md:py-3 font2 font-semibold text-white hover:scale-105 transition-transform duration-300 ${
                    !content?.whitePaper ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                  style={{
                    boxShadow:
                      "0 4px 24px 0 rgba(74,8,140,0.10), 0 1.5px 0 0 #AEA7D9, -2px -2px 12px 0 rgba(174,167,217,0.15)",
                    borderTop: "3px solid",
                    borderLeft: "3px solid",
                    borderImage: "linear-gradient(135deg, #AEA7D9 0%, #4A088C 100%) 1",
                    backgroundImage: "linear-gradient(to right, #4A088C, #AEA7D9)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    pointerEvents: content?.whitePaper ? "auto" : "none",
                  }}
                  title={content?.whitePaper ? "Open Whitepaper" : "Coming Soon"}
                >
                  Whitepaper
                </a>
                <a
                  href={content?.lightPaper || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`button text-center flex-1 max-w-[220px] px-6 sm:px-8 md:px-10 py-2 md:py-3 font2 font-semibold text-white hover:scale-105 transition-transform duration-300 ${
                    !content?.lightPaper ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                  style={{
                    boxShadow:
                      "0 4px 24px 0 rgba(74,8,140,0.10), 0 1.5px 0 0 #AEA7D9, -2px -2px 12px 0 rgba(174,167,217,0.15)",
                    borderTop: "3px solid",
                    borderLeft: "3px solid",
                    borderImage: "linear-gradient(135deg, #AEA7D9 0%, #4A088C 100%) 1",
                    backgroundImage: "linear-gradient(to right, #433C73, #727FA6)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    pointerEvents: content?.lightPaper ? "auto" : "none",
                  }}
                  title={content?.lightPaper ? "Open Lightpaper" : "Coming Soon"}
                >
                  Lightpaper
                </a>
              </div>
              {/* Second row: One Pager centered, fixed width on all screens */}
              <div className="flex w-full justify-center mt-3">
                <a
                  href={content?.onePager || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`button text-center w-full max-w-[220px] px-6 sm:px-8 md:px-10 py-2 md:py-3 font2 font-semibold text-white hover:scale-105 transition-transform duration-300 ${
                    !content?.onePager ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                  style={{
                    boxShadow:
                      "0 4px 24px 0 rgba(74,8,140,0.10), 0 1.5px 0 0 #AEA7D9, -2px -2px 12px 0 rgba(174,167,217,0.15)",
                    borderTop: "3px solid",
                    borderLeft: "3px solid",
                    borderImage: "linear-gradient(135deg, #AEA7D9 0%, #4A088C 100%) 1",
                    backgroundImage: "linear-gradient(to right, #433C73, #927FA6)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    pointerEvents: content?.onePager ? "auto" : "none",
                  }}
                  title={content?.onePager ? "Open One Pager" : "Coming Soon"}
                >
                  One Pager
                </a>
              </div>
            </div>

{/* Audit Badge Section */}
{/* Static SolidProof Badge Section */}
<div className="mt-8 flex flex-col items-center justify-center gap-4">
  {/* Flying Icons Row */}
  <div className="flex items-center justify-center gap-8">
    <div className="flex flex-col items-center">
      <img src={checkIcon} alt="Audited" className="w-6 sm:w-8 md:w-10 brightness-110" />
      <span className="mt-1 text-xs sm:text-xl text-[#AEA7D9] font-semibold">Audited</span>
    </div>
    <div className="flex flex-col items-center">
      <img src={checkIcon} alt="Secured" className="w-6 sm:w-8 md:w-10 brightness-110" />
      <span className="mt-1 text-xs sm:text-xl text-[#AEA7D9] font-semibold">Secured</span>
    </div>
    <div className="flex flex-col items-center">
      <img src={checkIcon} alt="Verified" className="w-6 sm:w-8 md:w-10 brightness-110" />
      <span className="mt-1 text-xs sm:text-xl text-[#AEA7D9] font-semibold">Verified</span>
    </div>
  </div>

  {/* Logo with Text */}
  <div className="flex items-center gap-4 mt-4">
    <img
      src={Solodpr}
      alt="SolidProof Icon"
      className="h-10 sm:h-12 md:h-16 brightness-110"
    />
    <p    onClick={() => {
          if (content?.solidProof) {
            window.open(content.solidProof, '_blank');
          }
        }} className="text-white text-xl sm:text-2xl md:text-3xl font-semibold">
      <span 
      
        className={`${content?.solidProof ? 'cursor-pointer hover:text-[#AEA7D9]' : 'cursor-default'} text-[#AEA7D9]`}
      >
        SOLID
      </span>Proof
    </p>
  </div>
</div>



            <p
              className="mt-2 mb-4 text-xs sm:text-sm md:text-base lg:text-lg xl:text-2xl text-[#AEA7D9]/80 flex items-center justify-center gap-6"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              {content?.auditText || 'Smart Contract Audit By'}
              <Link to={content?.auditReport || '#'}
              >
                <img
                  src={content?.auditIcon || icon}
                  className="h-4 sm:h-5 md:h-6 lg:h-7 filter brightness-110"
                  alt="Audit Icon"
                />
              </Link>
            </p>
          </div>
        </section>
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
    </div>
  );
};

export default HeroSection;
