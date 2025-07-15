import { useState, useEffect } from "react";
import { getAllRoadMaps } from "../api/admin-api";
import AOS from 'aos';
import 'aos/dist/aos.css';

const ProjectPlan = () => {
  const [activeYear, setActiveYear] = useState("");
  const [roadmapData, setRoadmapData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRoadmaps() {
      try {
        const res = await getAllRoadMaps();
        const dataArray = Array.isArray(res) ? res : res?.data || [];
        const grouped = {};
        dataArray.forEach((item) => {
          const year = item.year.toString();
          if (!grouped[year]) grouped[year] = [];
          grouped[year].push({
            quarter: item.quarter,
            milestone: item.milestone,
            points: item.list || [],
          });
        });
        setRoadmapData(grouped);
        const years = Object.keys(grouped).sort();
        if (years.length > 0) setActiveYear(years[0]);
      } catch (error) {
        console.error("Error fetching roadmap:", error);
        setRoadmapData({});
      } finally {
        setLoading(false);
      }
    }
    fetchRoadmaps();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  if (loading) return <div className="text-center py-10 text-white">Loading...</div>;

  return (
    <section
      id="roadmap"
      className="relative py-16 px-4 sm:px-6 md:px-12 bg-gradient-to-b from-[#120540] via-[#1b0a2d] to-[#433C73]"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2
          className="text-4xl md:text-5xl font-bold mb-[5rem] bg-gradient-to-r from-[#4A088C] to-[#AEA7D9] bg-clip-text text-transparent drop-shadow"
          data-aos="fade-up"
        >
          Roadmap
        </h2>
        {/* <p
          className="text-[#AEA7D9] text-lg max-w-3xl mx-auto mb-12"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          A journey marked by innovation and progress, Mr Mint&apos;s roadmap charts a course through Web 3.0 evolution with milestones including product launches, cross-blockchain development, and the establishment of a vibrant community.
        </p> */}

        {/* Year Tabs */}
        <div className="flex justify-center flex-wrap gap-3 mb-12" data-aos="fade-up" data-aos-delay="300">
          {Object.keys(roadmapData).map((year, index) => (
            <button
              key={year}
              onClick={() => setActiveYear(year)}
              className={`px-6 py-2 rounded-full font-semibold transition-all border-2 border-transparent shadow font-medium
                ${activeYear === year
                  ? "bg-gradient-to-r from-[#4A088C] to-[#AEA7D9] text-white border-[#727FA6] scale-105"
                  : "bg-[#120540] text-[#AEA7D9] hover:border-[#433C73] hover:text-white"}
              `}
              // data-aos="zoom-in"
              // data-aos-delay={index * 100}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative flex flex-col md:flex-row md:items-start gap-10 md:gap-0">
          {/* <div
            className="hidden md:block absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-[#4A088C] to-[#AEA7D9] opacity-30 z-0"
            style={{ transform: 'translateX(-50%)' }}
          /> */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full z-10">
            {roadmapData[activeYear]?.length > 0 ? (
              roadmapData[activeYear].map((item, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center group"
                  data-aos="fade-up"
                  data-aos-delay={index * 200}
                >
                  <div className="bg-[#120540] border border-[#433C73] rounded-2xl shadow-xl p-6 w-full max-w-xs md:max-w-none transition-transform group-hover:scale-105">
                    <h4 className="text-xl font-bold text-[#AEA7D9] mb-2 text-center md:text-left">{item.quarter}</h4>
                    <h5 className="text-lg font-semibold text-white mb-3 text-center md:text-left">{item.milestone}</h5>
                    <ul className="list-disc pl-5 space-y-2 text-[#AEA7D9] text-left">
                      {item.points.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Mobile connector */}
                  {/* {index !== roadmapData[activeYear].length - 1 && (
                    <div className="block md:hidden w-1 h-8 bg-gradient-to-b from-[#4A088C] to-[#727FA6] opacity-30 mt-2 mb-2" />
                  )} */}
                </div>
              ))
            ) : (
              <p className="text-[#AEA7D9] text-center w-full col-span-3">No data available for {activeYear}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectPlan;
