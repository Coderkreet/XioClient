import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import shadow1 from "../assets/shadow1.png";
import shadow2 from "../assets/shadow2.png";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { getAllFAQs } from "../api/admin-api";

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllFAQs();
        if (Array.isArray(res)) {
          setFaqs(res);
        } else if (res && Array.isArray(res.data)) {
          setFaqs(res.data);
        } else {
          setFaqs([]);
        }
      } catch (err) {
        setFaqs([]);
        console.error("Error fetching FAQs:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const mid = Math.ceil(faqs.length / 2);
  const leftColumn = faqs.slice(0, mid);
  const rightColumn = faqs.slice(mid);

  return (
    <section className="relative bg-gradient-to-b from-[#120540] via-[#1b0a2d] to-[#433C73]  py-16 px-4 font1 overflow-hidden">
      {/* Section Heading */}
      <div className="max-w-6xl mx-auto text-center mb-12" data-aos="zoom-in">
        <h2 className="text-3xl md:text-4xl font-bold  mb-3 bg-gradient-to-r from-[#4A088C] to-[#fbaeff] bg-clip-text text-transparent">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-400 text-xl mt-3">
          Below is a list of frequently asked questions and answers from partners.
        </p>
        <p className="text-gray-400 text-sm mt-2">
          Please check this FAQ before contacting us.
        </p>
      </div>

      {/* FAQ Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {[leftColumn, rightColumn].map((column, colIdx) => (
          <div key={colIdx} className="space-y-4">
            {column.map((item, idx) => {
              const globalIndex = colIdx === 0 ? idx : idx + leftColumn.length;
              const isOpen = openIndex === globalIndex;
              return (
                <div
                  key={item._id || globalIndex}
                  data-aos="fade-up"
                  data-aos-delay={globalIndex * 100}
                  className="border border-gray-700 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleAnswer(globalIndex)}
                    className="w-full text-left px-4 py-3 bg-[#100029] text-white font-medium flex items-center justify-between hover:bg-[linear-gradient(to_right,_#27B9DE,_#D426F6)]"
                  >
                    <span>{item.question}</span>
                    {isOpen ? (
                      <FaChevronUp className="ml-4" />
                    ) : (
                      <FaChevronDown className="ml-4" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 py-3 bg-[#0F0F1A] text-gray-300 text-sm">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Background Decorations with AOS */}
      <div
        className=" absolute top-0 left-0 w-1/2 h-full pointer-events-none"
        data-aos="fade-right"
        data-aos-delay="300"
      >
        <img src={shadow2} className="w-full h-full object-cover" alt="" />
      </div>
      <div
        className="absolute hidden sm:block top-0 right-0 w-1/2 h-full pointer-events-none"
        data-aos="fade-left"
        data-aos-delay="300"
      >
        <img src={shadow1} className="w-full h-full object-cover" alt="" />
      </div>
    </section>
  );
};

export default FaqSection;
