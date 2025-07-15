import React, { useState } from "react";
import Event1 from "../assets/images/11.webp";

const tabs = ["Events", "Upcoming Events", "Gallery"];

const tabData = {
  Events: [
    { img: Event1, alt: "Event 1" },
    { img: Event1, alt: "Event 2" },
    { img: Event1, alt: "Event 3" },
    { img: Event1, alt: "Event 3" },
    { img: Event1, alt: "Event 3" },
    { img: Event1, alt: "Event 3" },
  ],
  "Upcoming Events": [
    { img: Event1, alt: "Upcoming Event 1" },
    { img: Event1, alt: "Upcoming Event 2" },
  ],
  Gallery: [
    { img: Event1, alt: "Gallery Image 1" },
    { img: Event1, alt: "Gallery Image 2" },
      { img: Event1, alt: "Event 3" },
  ],
};

const EventsSection = () => {
  const [activeTab, setActiveTab] = useState("Events");

  return (
    <section className="w-full bg-gradient-to-br from-[#0e1a2b] to-[#05141f] md:py-5 px-4 text-white font-sans">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Events</h2>

        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-md border transition duration-300 text-sm md:text-base font-medium ${
                activeTab === tab
                  ? "bg-gradient-to-r from-[#7f00ff] to-[#e100ff] text-white shadow-lg"
                  : "bg-transparent border-white hover:bg-white hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          {tabData[activeTab].map((event, index) => (
            <div key={index} className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={event.img}
                alt={event.alt}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;