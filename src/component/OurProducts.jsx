import React, { useEffect, useState } from 'react';
import { GoArrowUpRight } from 'react-icons/go';
import { getAllProducts } from '../api/admin-api';
import AOS from 'aos';
import 'aos/dist/aos.css';

const OurProducts = () => {
  const [section, setSection] = useState({ text: '', description: '', cards: [] });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setSection({
            text: res.data[0].text || 'Our Products',
            description: res.data[0].description || '',
            cards: Array.isArray(res.data[0].cards) ? res.data[0].cards : []
          });
        } else if (res.data && res.data.cards) {
          setSection({
            text: res.data.text || 'Our Products',
            description: res.data.description || '',
            cards: Array.isArray(res.data.cards) ? res.data.cards : []
          });
        } else {
          setSection({ text: 'Our Products', description: '', cards: [] });
        }
      } catch {
        setSection({ text: 'Our Products', description: '', cards: [] });
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-[#433C73] via-[#1b0a2d] to-[#120540] text-white">
      <div className="max-w-6xl mx-auto text-center">
        {/* Title + Description */}
        <h2
          className="text-3xl md:text-5xl font-bold mb-4 flex justify-center items-center gap-2 bg-gradient-to-r from-[#4A088C] to-[#fbaeff] bg-clip-text text-transparent"
          data-aos="fade-up"
        >
          {section.text}
        </h2>
        {section.description && (
          <p
            className="text-[#AEA7D9] md:text-lg max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {section.description}
          </p>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 justify-items-center">
          {section.cards.map((product, index) => (
            <div
              key={product._id || index}
              data-aos="zoom-in-up"
              data-aos-delay={index * 150}
              style={{
                backgroundImage: `url(${product.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              className={`relative w-full h-[380px] bg-[#120540] rounded-2xl overflow-hidden group transition-all hover:scale-[1.02] duration-300 max-w-xs shadow-[0px_0px_50px_#4A088C]`}
            >
              <div className="flex flex-col justify-end h-full">
                <div className="flex items-center justify-between p-4 bg-gradient-to-t from-[#120540]/80 via-transparent to-transparent">
                  <div>
                    <p className="text-sm text-white font-semibold">{product.title}</p>
                    <a href={product.url || '#'} target="_blank" rel="noopener noreferrer">
                      <button className="mt-2 px-4 py-1.5 text-xs text-white border border-[#727FA6] rounded-full font-medium hover:bg-[#433C73]/20 transition">
                        Explore Now
                      </button>
                    </a>
                  </div>
                  <a href={product.url || '#'} target="_blank" rel="noopener noreferrer">
                    <button className="bg-white w-10 h-8 flex items-center justify-center rounded-xl shadow">
                      <GoArrowUpRight className="text-[#120540]" />
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProducts;
