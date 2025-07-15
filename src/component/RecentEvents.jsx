// import { getEvent } from "../api/landingpage-api";
import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getAllEvents } from "../api/admin-api";

gsap.registerPlugin(ScrollTrigger);

const tabs = ["Events", "Upcoming Events", "Gallery"];

const EventsSection = () => {
  const [activeTab, setActiveTab] = useState("Events");
  const [events, setEvents] = useState([]);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const tabsRef = useRef(null);
  const gridRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllEvents();
        if (Array.isArray(res)) {
          setEvents(res);
        } else if (Array.isArray(res.data)) {
          setEvents(res.data);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: 50, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
    ).fromTo(
      tabsRef.current.children,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      },
      "-=0.5"
    );

    gsap.to(headingRef.current, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    gsap.to(sectionRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
      y: -50,
    });
  }, []);

  useEffect(() => {
    if (cardsRef.current.length > 0) {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 30, rotationX: -15 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    }
  }, [activeTab, events]);

  const handleTabClick = (tab) => {
    gsap.to(cardsRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      onComplete: () => {
        setActiveTab(tab);
      },
    });
  };

  const handleTabDoubleClick = (tab) => {
    console.log("Double clicked on:", tab);
    // Example double-click action: re-trigger entrance animation
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      }
    );
  };

  const renderData = events.filter((event) => {
    if (activeTab === "Events") return event.type === "event";
    if (activeTab === "Upcoming Events") return event.type === "upcoming";
    if (activeTab === "Gallery") return event.type === "gallery";
    return false;
  });

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 md:px-1 bg-gradient-to-b from-[#433C73] via-[#1b0a2d] to-[#120540] overflow-hidden"
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#7f00ff]/20 to-[#e100ff]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-[#4A088C]/20 to-[#fbaeff]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-br from-[#e100ff]/30 to-transparent rounded-full blur-2xl animate-bounce"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Heading */}
        <div className="text-center mb-16">
          <h2
            ref={headingRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 font2 bg-gradient-to-r from-[#4A088C] via-[#7f00ff] to-[#fbaeff] bg-clip-text text-transparent relative"
          >
            Events
            <div className="absolute -inset-4 bg-gradient-to-r from-[#7f00ff]/10 to-[#e100ff]/10 rounded-full blur-xl -z-10"></div>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#7f00ff] to-[#e100ff] mx-auto rounded-full shadow-[0_0_20px_#7f00ff]"></div>
        </div>

        {/* Enhanced Filter Buttons */}
        <div
          ref={tabsRef}
          className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-16"
        >
          {tabs.map((tab, index) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              onDoubleClick={() => handleTabDoubleClick(tab)}
              className={`group relative px-8 py-4 rounded-2xl text-sm sm:text-base lg:text-lg font-semibold transition-all duration-500 transform hover:scale-105 ${
                activeTab === tab
                  ? "bg-gradient-to-r from-[#4A088C] to-[#AEA7D9] text-white shadow-[0_0_30px_#7f00ff] border-2 border-[#4A088C]/50"
                  : "bg-gradient-to-r from-[#433C73] to-[#727FA6] border-2 border-white/20 text-white hover:border-[#4A088C]/50 hover:bg-gradient-to-r hover:from-[#4A088C]/20 hover:to-[#AEA7D9]/20"
              }`}
              style={{ backgroundImage: activeTab === tab ? "linear-gradient(to right, #4A088C, #AEA7D9)" : "linear-gradient(to right, #433C73, #727FA6)" }}
            >
              {/* Button Glow Effect */}
              <div className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
                activeTab === tab 
                  ? "opacity-100 bg-gradient-to-r from-[#4A088C]/20 to-[#AEA7D9]/20 blur-xl" 
                  : "opacity-0 group-hover:opacity-100 bg-gradient-to-r from-[#4A088C]/10 to-[#AEA7D9]/10 blur-xl"
              }`}></div>
              {/* Button Content */}
              <span className="relative z-10 flex items-center gap-2">
                {tab === "Events" && "🎉"}
                {tab === "Upcoming Events" && "📅"}
                {tab === "Gallery" && "🖼️"}
                {tab}
              </span>
              {/* Active Tab Indicator */}
              {activeTab === tab && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#4A088C] rounded-full animate-pulse shadow-[0_0_10px_#4A088C]"></div>
              )}
            </button>
          ))}
        </div>

        {/* Enhanced Cards Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 px-2 sm:px-4"
        >
          {renderData.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-gradient-to-r from-[#4A088C] to-[#AEA7D9] rounded-2xl">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#4A088C]/20 to-[#AEA7D9]/20 rounded-full mb-6 backdrop-blur-sm border border-white/10">
                <span className="text-3xl">📭</span>
              </div>
              <p className="text-xl text-white mb-2">No Events Available</p>
              <p className="text-sm text-white/80">Check back later for exciting events!</p>
            </div>
          ) : (
            renderData.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className="group relative bg-gradient-to-r from-[#4A088C] to-[#AEA7D9] backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-700 hover:scale-105 border border-white/10 hover:border-[#4A088C]/50 hover:shadow-[0_0_40px_#4A088C/30]"
                style={{ backgroundImage: "linear-gradient(to right, #4A088C, #AEA7D9)" }}
              >
                {/* Card Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#4A088C]/10 via-transparent to-[#AEA7D9]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.text}
                    className="w-full h-64 sm:h-72 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  {/* Floating Tag */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-[#4A088C] to-[#AEA7D9] text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                    {activeTab === "Events" && "🎉 Event"}
                    {activeTab === "Upcoming Events" && "📅 Upcoming"}
                    {activeTab === "Gallery" && "🖼️ Gallery"}
                  </div>
                </div>
                {/* Card Content */}
                <div className="relative p-6">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 text-transparent bg-gradient-to-r from-[#e1cef4] to-[#AEA7D9] bg-clip-text group-hover:from-[#bdabd0] group-hover:to-[#AEA7D9] transition-all duration-500">
                    {item.text}
                  </h3>
                  {/* Card Bottom Accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4A088C] to-[#AEA7D9] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;