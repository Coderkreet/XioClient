import React, { useEffect, useRef, useState } from "react";
import { getAllNews } from "../api/admin-api";

const NewsListOnSection = () => {
  const [newsImages, setNewsImages] = useState([]);
  const sliderRef = useRef(null);
  const animationFrameRef = useRef(null);
  const scrollAmountRef = useRef(0);
  const isPausedRef = useRef(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await getAllNews();
        // API: { news: [ { images: [...] } ] }
        if (res.news && Array.isArray(res.news) && res.news.length > 0) {
          setNewsImages(res.news[0].images || []);
        } else if (res.news && res.news.images) {
          setNewsImages(res.news.images);
        } else {
          setNewsImages([]);
        }
      } catch {
        setNewsImages([]);
      }
    };
    fetchNews();
  }, []);

  const sliderItems = [...newsImages, ...newsImages]; // for infinite loop effect

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
  }, [newsImages]);

  const handleMouseEnter = () => {
    isPausedRef.current = true;
  };

  const handleMouseLeave = () => {
    isPausedRef.current = false;
  };

  return (
    <section className="w-full py-12 px-4 bg-gradient-to-r from-[#6e00ff] via-[#9b00cc] to-[#ff007a] text-white">
      <div className="max-w-8xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-[3rem]">In the News</h2>
        <div
          ref={sliderRef}
          className="flex gap-4 items-center overflow-x-auto no-scrollbar"
          style={{ scrollBehavior: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
        >
          {sliderItems.map((item, index) => (
            <a
              key={item._id || index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="flex-shrink-0 rounded-xl overflow-hidden shadow-lg border-2 border-white/20 bg-white/10"
              style={{ width: '100%', maxWidth: '260px', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {/* Logo */}
              <img
                src={item.image}
                alt="news"
                className="h-14 sm:h-16 md:h-20 object-contain transform transition duration-500 hover:scale-110 hover:drop-shadow-[0_0_10px_#fff] p-4"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsListOnSection;
