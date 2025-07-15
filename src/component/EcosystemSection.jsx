import React, { useEffect, useState, useRef } from 'react';
import { FaCogs } from 'react-icons/fa';
import { getAllEcosystems } from '../api/admin-api';
// import { getAllEcosystems } from '../api/landingpage-api';

const EcosystemSection = () => {
  const [ecosystemData, setEcosystemData] = useState({
    title: '',
    description: '',
    cards: [],
  });

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const cardsRef = useRef([]);
  const backgroundRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllEcosystems();
        const data = Array.isArray(response.data) ? response.data[0] : response.data;
        setEcosystemData({
          title: data?.title || '',
          description: data?.description || '',
          cards: data?.cards || [],
        });
      } catch (error) {
        console.error('Failed to fetch ecosystem data:', error);
        setEcosystemData({
          title: '',
          description: '',
          cards: [],
        });
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (ecosystemData.cards.length > 0 && typeof window !== 'undefined') {
      import('gsap').then((gsap) => {
        const { gsap: gsapCore } = gsap;
        const masterTl = gsapCore.timeline();
        masterTl.fromTo(backgroundRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: "power2.out" }
        );
        gsapCore.set(".floating-orb", { 
          x: () => gsapCore.utils.random(-100, 100),
          y: () => gsapCore.utils.random(-100, 100),
          scale: () => gsapCore.utils.random(0.5, 1.5)
        });
        gsapCore.to(".floating-orb", {
          x: () => gsapCore.utils.random(-200, 200),
          y: () => gsapCore.utils.random(-200, 200),
          rotation: 360,
          duration: () => gsapCore.utils.random(10, 20),
          repeat: -1,
          ease: "none"
        });
        masterTl.fromTo(titleRef.current,
          { 
            opacity: 0, 
            y: -50,
            scale: 0.8,
            rotationX: -90
          },
          { 
            opacity: 1, 
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 1.2, 
            ease: "elastic.out(1, 0.5)" 
          },
          0.3
        );
        const descWords = descriptionRef.current?.children || [];
        masterTl.fromTo(descWords,
          { opacity: 0, y: 20, rotationX: -45 },
          { 
            opacity: 1, 
            y: 0,
            rotationX: 0,
            duration: 0.8, 
            stagger: 0.05,
            ease: "back.out(1.7)" 
          },
          "-=0.8"
        );
        const cards = cardsRef.current.filter(Boolean);
        gsapCore.set(cards, {
          opacity: 0,
          scale: 0,
          y: 100,
          rotationY: -90,
          transformOrigin: "center bottom"
        });
        masterTl.to(cards, {
          opacity: 1,
          scale: 1,
          y: 0,
          rotationY: 0,
          duration: 0.8,
          stagger: {
            amount: 1.2,
            from: "start",
            ease: "power2.out"
          },
          ease: "back.out(1.4)"
        }, "-=0.4");
        cards.forEach((card) => {
          gsapCore.to(card, {
            y: () => gsapCore.utils.random(-10, -20),
            duration: () => gsapCore.utils.random(2, 4),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: card.dataset.index * 0.2
          });
        });
        cards.forEach((card) => {
          const icon = card.querySelector('.card-icon');
          const text = card.querySelector('.card-text');
          card.addEventListener('mouseenter', () => {
            const hoverTl = gsapCore.timeline();
            hoverTl
              .to(card, {
                scale: 1.15,
                rotationY: 5,
                z: 50,
                duration: 0.4,
                ease: "back.out(1.7)"
              })
              .to(icon, {
                rotation: 360,
                scale: 1.2,
                duration: 0.6,
                ease: "back.out(2)"
              }, 0)
              .to(text, {
                color: "#C570FB",
                textShadow: "0 0 20px rgba(197, 112, 251, 0.5)",
                duration: 0.3
              }, 0);
          });
          card.addEventListener('mouseleave', () => {
            const leaveTl = gsapCore.timeline();
            leaveTl
              .to(card, {
                scale: 1,
                rotationY: 0,
                z: 0,
                duration: 0.4,
                ease: "power2.out"
              })
              .to(icon, {
                rotation: 0,
                scale: 1,
                duration: 0.6,
                ease: "back.out(1.7)"
              }, 0)
              .to(text, {
                color: "#f1f5f9",
                textShadow: "none",
                duration: 0.3
              }, 0);
          });
        });
        const waveAnimation = () => {
          gsapCore.to(cards, {
            y: (index) => Math.sin(Date.now() * 0.002 + index * 0.5) * 10,
            duration: 0.1,
            ease: "none"
          });
          requestAnimationFrame(waveAnimation);
        };
        setTimeout(() => {
          waveAnimation();
        }, 2000);
        const handleScroll = () => {
          const scrollY = window.scrollY;
          const sectionTop = sectionRef.current?.offsetTop || 0;
          const parallaxSpeed = (scrollY - sectionTop) * 0.1;
          gsapCore.to(".floating-orb", {
            y: parallaxSpeed,
            duration: 0.1,
            ease: "none"
          });
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
          cards.forEach((card) => {
            card.removeEventListener('mouseenter', () => {});
            card.removeEventListener('mouseleave', () => {});
          });
        };
      });
    }
  }, [ecosystemData.cards]);

  const splitTextIntoWords = (text) => {
    return text.split(' ').map((word, index) => (
      <span key={index} className="inline-block mr-2">
        {word}
      </span>
    ));
  };

  return (
    <section 
      ref={sectionRef}
      className="font2 py-20 px-4 relative overflow-hidden w-full  bg-gradient-to-b from-[#120540] via-[#1b0a2d] to-[#433C73]  text-white"
    >
      <div className="absolute inset-0 opacity-40 pointer-events-none select-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
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
      <div className=" mx-auto text-center relative z-10">
        <h2 
          ref={titleRef}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-[#5E2FF4] via-[#C570FB] to-[#FF3CAC] bg-clip-text text-transparent"
          style={{ perspective: '1000px' }}
        >
          {'Ecosystem'}
        </h2>
        <div 
          ref={descriptionRef}
          className="text-gray-300 text-base sm:text-lg md:text-xl  mx-auto mb-20"
        >
          {splitTextIntoWords(ecosystemData.description || 
            "The ecosystem of XIOCOIN revolves around creating a seamless and efficient marketplace for digital assets, particularly focusing on decentralized finance and blockchain innovation."
          )}
        </div>
        <div className="grid grid-cols-1 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {ecosystemData.cards.length > 0 ? (
            ecosystemData.cards.map((card, idx) => (
              <div
                key={card.serialNumber || idx}
                ref={(el) => (cardsRef.current[idx] = el)}
                className="group relative cursor-pointer"
                style={{ perspective: '1000px' }}
              >
                <div className="bg-gradient-to-br from-[#1a1a2e]/80 via-[#16213e]/60 to-[#0f3460]/80 backdrop-blur-xl relative rounded-2xl p-8 shadow-2xl text-center flex items-center justify-center flex-col border border-purple-500/20 min-h-48 transition-all duration-500"
                  style={{ minHeight: '12rem', height: 'auto', wordBreak: 'break-word', overflowWrap: 'break-word' }}
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#5E2FF4]/20 via-[#C570FB]/20 to-[#FF3CAC]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                  {/* Icon Container */}
                  <div className="card-icon bg-gradient-to-br from-[#5E2FF4] via-[#C570FB] to-[#FF3CAC] absolute -top-8 w-16 h-16 flex items-center justify-center rounded-full text-white shadow-2xl overflow-hidden border-4 border-white/20">
                    {card.logo ? (
                      <img 
                        src={card.logo} 
                        alt={`Logo ${idx + 1}`} 
                        className="w-8 h-8 object-contain filter brightness-110" 
                      />
                    ) : (
                      <FaCogs size={32} className="drop-shadow-lg" />
                    )}
                  </div>
                  {/* Card Content */}
                  <div className="relative mb-5 z-10 w-full">
                    <p className="card-text text-[1.5rem] font-semibold text-slate-100 mt-8 leading-relaxed tracking-wide break-words whitespace-pre-line">
                      {card.text}
                    </p>
                  </div>
                  {/* Serial Number at the bottom */}
                  <div className="absolute  bottom-2 left-1/2 transform -translate-x-1/2 text-lg font-bold text-[#C570FB] bg-white/10 px-4 py-1 rounded-full shadow-md border border-[#C570FB]/30">
                    {card.serialNumber}
                  </div>
                  {/* Bottom Accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5E2FF4] via-[#C570FB] to-[#FF3CAC] rounded-b-2xl opacity-60"></div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full">
              <p className="text-gray-500 text-xl">No ecosystem cards found.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
