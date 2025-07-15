import React, { useEffect, useState, useRef } from 'react';
import { getAllHeaderSliders } from '../api/admin-api';
import { useHorizontalInfiniteScroll } from './Sidebar';

const PlatformSection = () => {
  const [sliderImages, setSliderImages] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const res = await getAllHeaderSliders();
        if (res && Array.isArray(res.data) && res.data.length > 0 && Array.isArray(res.data[0].images)) {
          setSliderImages(res.data[0].images);
        } else {
          setSliderImages([]);
        }
      } catch {
        setSliderImages([]);
      }
    };
    fetchSliders();
  }, []);

  // Duplicate images for seamless infinite scroll
  const duplicatedImages = [...sliderImages, ...sliderImages];
  useHorizontalInfiniteScroll(sliderRef, sliderImages);

  return (
    <div className="w-full bg-gradient-to-r from-teal-400 via-purple-500 to-blue-600 py-4 overflow-hidden">
      <div className="relative">
        <div
          ref={sliderRef}
          className="flex gap-4 items-center overflow-x-auto no-scrollbar"
          style={{ scrollBehavior: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
        >
          {duplicatedImages.map((img, index) => (
            <div
              key={index}
              className="flex-shrink-0 rounded-xl overflow-hidden shadow-lg border-2 border-white/20 bg-white/10"
              style={{ width: '260px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <img
                src={img}
                alt={`Slider ${index + 1}`}
                className="w-full h-full object-contain p-2"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
            </div>
          ))}
        </div>
        {/* Gradient overlays for smooth fade effect */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-teal-400 to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-blue-600 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default PlatformSection;
