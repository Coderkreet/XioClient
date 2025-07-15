import React, { useEffect, useRef, useState } from "react";
import Tilt from "react-parallax-tilt";
import AOS from "aos";
import "aos/dist/aos.css";
import { getAllListedPlatforms } from "../api/admin-api";
import { Link } from "react-router-dom";

const ListedOnSection = () => {
  const [platforms, setPlatforms] = useState([]);
  const [platformName, setPlatformName] = useState('');
  const sliderRef = useRef(null);
  const animationFrameRef = useRef(null);
  const scrollAmountRef = useRef(0);
  const isPausedRef = useRef(false);

  useEffect(() => {
    AOS.init({ duration: 100, once: true });
  }, []);

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const res = await getAllListedPlatforms();
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setPlatforms(res.data[0].platforms || []);
          setPlatformName(res.data[0].platformName || '');
        } else if (res.data && res.data.platforms) {
          setPlatforms(res.data.platforms);
          setPlatformName(res.data.platformName || '');
        } else {
          setPlatforms([]);
          setPlatformName('');
        }
      } catch {
        setPlatforms([]);
        setPlatformName('');
      }
    };
    fetchPlatforms();
  }, []);

  const sliderItems = [...platforms, ...platforms]; // for infinite loop effect

  useEffect(() => {
    const slider = sliderRef.current;
    let speed = 1.2;

    const animate = () => {
      if (slider && !isPausedRef.current) {
        scrollAmountRef.current += speed;
        if (scrollAmountRef.current >= slider.scrollWidth / 2) {
          scrollAmountRef.current = 0;
        }
        slider.scrollLeft = scrollAmountRef.current;
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [platforms]);

  const handleMouseEnter = () => {
    isPausedRef.current = true;
  };

  const handleMouseLeave = () => {
    isPausedRef.current = false;
  };

  return (
    <section className="w-full py-12 px-4 bg-gradient-to-r from-[#6e00ff] via-[#9b00cc] to-[#ff007a] text-white">
      <div className="max-w-8xl mx-auto text-center">
        {platformName && (
          <h2 className="text-2xl sm:text-3xl  md:text-4xl font-bold mb-[3rem]" data-aos="fade-up">
            {platformName}
          </h2>
        )}

        <div
          ref={sliderRef}
          className="flex gap-4 items-center overflow-x-auto no-scrollbar"
          style={{ scrollBehavior: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
        >
          {sliderItems.map((item, index) => (
            <Tilt
              key={item._id || index}
              transitionSpeed={500}
              glareEnable={false}
              className="flex-shrink-0 rounded-xl overflow-hidden shadow-lg border-2 border-white/20 bg-white/10"
              style={{ width: '100%', maxWidth: '260px', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              data-aos="zoom-in"
            >
              <Link
                to={item.link}
                     target="_blank"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="flex flex-col items-center space-y-2 p-4 w-full"
              >
                {/* Logo */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-14 sm:h-16 md:h-20 object-contain transform transition duration-500 hover:scale-110 hover:drop-shadow-[0_0_10px_#fff]"
                />
                {/* Name */}
                <p className="text-md font-bold sm:text-base ">{item.title}</p>
              </Link>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ListedOnSection;
