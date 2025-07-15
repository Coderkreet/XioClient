import { useState, useEffect, useRef } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
} from "recharts";

import {
  getTokenomics,
  getAllMarketStats,
  getAllTokenTrackers,
} from "../api/admin-api";
import AOS from "aos";
import "aos/dist/aos.css";

const tabs = ["Token", "Market", "Tracker"];

// Colors array for the pie chart
const colors = [
  "#63E6BE",
  "#EC4899",
  "#A855F7",
  "#3B82F6",
  "#FACC15",
  "#67E8F9",
  "#C084FC",
  "#60A5FA",
  "#38BDF8",
  "#818CF8",
  "#4ADE80",
  "#F472B6",
  "#FB923C",
];

export default function TokenomicsTabs() {
  const [activeTab, setActiveTab] = useState("Token");
  const [tokenomicsData, setTokenomicsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [marketStats, setMarketStats] = useState(null);
  const [tokenTrackers, setTokenTrackers] = useState(null);

  // GSAP Animation Refs
  const headerRef = useRef(null);
  const tabsRef = useRef(null);
  const contentRef = useRef(null);
  const chartRef = useRef(null);
  const tableRef = useRef(null);
  const marketRef = useRef(null);
  const trackerRef = useRef(null);
  const gsapRef = useRef(null);

  // Initialize GSAP
  useEffect(() => {
    // Create GSAP instance
    const gsap = window.gsap || {
      timeline: () => ({
        to: () => {},
        from: () => {},
        fromTo: () => {},
        set: () => {},
      }),
      to: () => {},
      from: () => {},
      fromTo: () => {},
      set: () => {},
    };

    // Try to load GSAP if not available
    if (!window.gsap) {
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
      script.onload = () => {
        gsapRef.current = window.gsap;
        initializeAnimations();
      };
      document.head.appendChild(script);
    } else {
      gsapRef.current = gsap;
      initializeAnimations();
    }
  }, []);

  const initializeAnimations = () => {
    const gsap = gsapRef.current;
    if (!gsap) return;

    // Header entrance animation
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "back.out(1.7)" }
      );
    }

    // Tabs stagger animation
    if (tabsRef.current) {
      const tabButtons = tabsRef.current.children;
      gsap.fromTo(
        tabButtons,
        { opacity: 0, y: 20, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.5,
          ease: "power2.out",
        }
      );
    }

    // Floating animation for header elements
    gsap.to(headerRef.current?.querySelector("h2"), {
      y: -10,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
    });

    // Continuous glow effect for active elements
    startContinuousAnimations();
  };

  const startContinuousAnimations = () => {
    const gsap = gsapRef.current;
    if (!gsap) return;

    // Subtle breathing effect for the entire section
    gsap.to(".tokenomics-section", {
      scale: 1.005,
      duration: 4,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
    });

    // Glowing border animation for active tab
    gsap.to(".active-tab", {
      boxShadow:
        "0 0 30px rgba(6, 182, 212, 0.4), 0 0 60px rgba(6, 182, 212, 0.2)",
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
    });
  };

  const animateTabSwitch = (newTab) => {
    const gsap = gsapRef.current;
    if (!gsap) return;

    // Content fade out and in
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setActiveTab(newTab);
          gsap.fromTo(
            contentRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
          );
        },
      });
    }
  };

  // Animate content based on active tab
  useEffect(() => {
    const gsap = gsapRef.current;
    if (!gsap) return;

    if (
      activeTab === "Token" &&
      chartRef.current &&
      tableRef.current &&
      !loading
    ) {
      // Chart animation (REMOVE this block to disable pie chart rotation)
      // gsap.fromTo(chartRef.current,
      //   { opacity: 0, scale: 0.8, rotation: -10 },
      //   { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)" }
      // );

      // Table rows stagger
      const tableRows = tableRef.current?.querySelectorAll("tbody tr");
      if (tableRows) {
        gsap.fromTo(
          tableRows,
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, delay: 0.3 }
        );
      }

      // Pie chart rotation (REMOVE this block to disable pie chart rotation)
      // gsap.to(chartRef.current?.querySelector('.recharts-pie'), {
      //   rotation: 360,
      //   duration: 20,
      //   ease: "none",
      //   repeat: -1,
      //   transformOrigin: "center"
      // });
    }

    if (activeTab === "Market" && marketRef.current && !loading) {
      const elements = marketRef.current.children;
      gsap.fromTo(
        elements,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
        }
      );

      // Price pulsing effect
      const priceElement = marketRef.current?.querySelector(".price-display");
      if (priceElement) {
        gsap.to(priceElement, {
          scale: 1.05,
          duration: 1.5,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
    }

    if (activeTab === "Tracker" && trackerRef.current && !loading) {
      const cards = trackerRef.current?.querySelectorAll(".tracker-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, rotationX: -15 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power2.out",
          }
        );
      }

      // Stats counter animation
      const statsElements =
        trackerRef.current?.querySelectorAll(".stat-number");
      if (statsElements) {
        statsElements.forEach((el) => {
          gsap.from(el, {
            textContent: 0,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            onUpdate: function () {
              el.textContent = Math.floor(
                this.targets()[0].textContent
              ).toLocaleString();
            },
          });
        });
      }
    }
  }, [activeTab, loading, tokenomicsData, marketStats, tokenTrackers]);

  // Hover animations for interactive elements
  const addHoverAnimations = () => {
    const gsap = gsapRef.current;
    if (!gsap) return;

    // Tab buttons hover
    document.querySelectorAll(".tab-button").forEach((button) => {
      button.addEventListener("mouseenter", () => {
        gsap.to(button, { scale: 1.05, duration: 0.3, ease: "power2.out" });
      });
      button.addEventListener("mouseleave", () => {
        gsap.to(button, { scale: 1, duration: 0.3, ease: "power2.out" });
      });
    });

    // Table rows hover
    document.querySelectorAll(".table-row").forEach((row) => {
      row.addEventListener("mouseenter", () => {
        gsap.to(row, { x: 10, duration: 0.3, ease: "power2.out" });
      });
      row.addEventListener("mouseleave", () => {
        gsap.to(row, { x: 0, duration: 0.3, ease: "power2.out" });
      });
    });
  };



  useEffect(() => {
    addHoverAnimations();
  }, [tokenomicsData]);

  useEffect(() => {
    fetchTokenomicsData();
    fetchMarketStats();
    fetchTokenTrackers();
  }, []);

  const fetchTokenomicsData = async () => {
    try {
      setLoading(true);
      const response = await getTokenomics();
      if (response?.data) {
        const transformedData = response.data.map((item, index) => ({
          ...item,
          name: item.title,
          value: item.percentage,
          tokens: item.tokenQuantity.toLocaleString(),
          color: colors[index % colors.length],
        }));
        setTokenomicsData(transformedData);
      }
      setError(null);
    } catch (err) {
      console.error("Error fetching tokenomics:", err);
      setError("Failed to fetch tokenomics data");
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  const removeFocusFromPieSlices = () => {
    const sectors = document.querySelectorAll(".recharts-pie-sector");
    sectors.forEach((sector) => {
      sector.setAttribute("tabindex", "-1");
      sector.setAttribute("focusable", "false");
      sector.style.outline = "none";
      sector.style.stroke = "none";
    });
  };

  // Run on initial load and whenever data changes
  removeFocusFromPieSlices();
}, [tokenomicsData]);


  const fetchMarketStats = async () => {
    try {
      setLoading(true);
      const response = await getAllMarketStats();
      if (response.data && response.data.length > 0) {
        setMarketStats(response.data[0]);
      }
      setError(null);
    } catch (err) {
      console.error("Error fetching market stats:", err);
      setError("Failed to load market data");
    } finally {
      setLoading(false);
    }
  };

  const fetchTokenTrackers = async () => {
    try {
      setLoading(true);
      const response = await getAllTokenTrackers();
      if (response?.data) {
        setTokenTrackers(response.data);
      }
      setError(null);
    } catch (err) {
      console.error("Error fetching token trackers:", err);
      setError("Failed to load token tracker data");
    } finally {
      setLoading(false);
    }
  };

  const renderTable = () => (
    <div className="overflow-x-auto w-full" ref={tableRef}>
      <table className="w-full text-left text-[#AEA7D9]">
        <thead className="uppercase bg-gradient-to-r from-[#4A088C] to-[#433C73] text-white">
          <tr>
            <th className="text-[1rem] font-semibold">Details</th>
            <th className="text-[1rem] font-semibold">% (Ptc.)</th>
            <th className="text-[1rem] font-semibold">Token Qty</th>
          </tr>
        </thead>
        <tbody className="bg-[#120540]/50">
          {tokenomicsData.map((item) => (
            <tr
              key={item._id}
              className="border-b border-[#727FA6]/40 hover:bg-[#433C73]/30 transition-colors duration-200"
            >
              <td className="text-[0.9rem] text-white">{item.title}</td>
              <td className="text-[0.9rem] text-[#AEA7D9]">
                {item.percentage}%
              </td>
              <td className="text-[0.9rem] text-[#AEA7D9]">
                {item.tokenQuantity.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderMarket = () => {
    if (loading)
      return (
        <p className="text-center text-[#AEA7D9]">Loading market data...</p>
      );
    if (error) return <p className="text-red-400 text-center">{error}</p>;
    if (!marketStats) return null;

    return (
      <div
        ref={marketRef}
        className="bg-gradient-to-br from-[#120540]/60 via-[#1b0a2d]/60 to-[#433C73]/60 rounded-xl p-8 border border-[#727FA6]/30 break-words whitespace-normal"
      >
        <div className="flex flex-col items-center justify-between mb-6 break-words whitespace-normal">
          <p className="text-lg font-semibold text-[#AEA7D9] mb-2 break-words whitespace-normal">
            Today's Market Price:
          </p>
          <p className="text-3xl font-bold text-transparent bg-gradient-to-r from-[#AEA7D9] to-white bg-clip-text mb-2 break-words whitespace-normal">
            ${marketStats.price}
          </p>
          <p
            className={`text-lg font-semibold ${
              marketStats.change24h >= 0 ? "text-green-400" : "text-red-400"
            } break-words whitespace-normal`}
          >
            {marketStats.change24h >= 0 ? "+" : ""}
            {marketStats.change24h}% (24h)
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">
          <div className="text-center break-words whitespace-normal">
            <p className="text-lg font-bold text-white break-words whitespace-normal">
              Market Cap
            </p>
            <p className="text-[#AEA7D9] break-words whitespace-normal">
              ${marketStats.marketCap}
            </p>
          </div>
          <div className="text-center break-words whitespace-normal">
            <p className="text-lg font-bold text-white break-words whitespace-normal">
              Volume 24h
            </p>
            <p className="text-[#AEA7D9] break-words whitespace-normal">
              ${marketStats.volume24h}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderTracker = () => {
    if (loading)
      return (
        <p className="text-center text-[#AEA7D9]">Loading tracker data...</p>
      );
    if (error) return <p className="text-red-400 text-center">{error}</p>;
    if (!tokenTrackers) return null;

    return (
      <div
        ref={trackerRef}
        className="bg-gradient-to-br from-[#120540]/60 via-[#1b0a2d]/60 to-[#433C73]/60 rounded-xl p-8 border border-[#727FA6]/30 break-words whitespace-normal"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl border border-[#727FA6]/30 bg-[#433C73]/20 break-words whitespace-normal">
            <p className="text-xl text-[#AEA7D9] font-bold mb-1 break-words whitespace-normal">
              Total Holders
            </p>
            <p className="text-3xl font-bold text-white break-words whitespace-normal">
              {tokenTrackers.totalHolders.toLocaleString()}
            </p>
            <p
              className={`text-sm ${
                parseFloat(tokenTrackers.holdersChange) >= 0
                  ? "text-green-400"
                  : "text-red-400"
              } break-words whitespace-normal`}
            >
              {tokenTrackers.holdersChange}% this week
            </p>
          </div>
          <div className="p-6 rounded-xl border border-[#727FA6]/30 bg-[#4A088C]/20 break-words whitespace-normal">
            <p className="text-xl text-[#AEA7D9] font-bold mb-1 break-words whitespace-normal">
              Total Transactions
            </p>
            <p className="text-3xl font-bold text-white break-words whitespace-normal">
              {tokenTrackers.totalTransactions.toLocaleString()}
            </p>
            <p
              className={`text-sm ${
                parseFloat(tokenTrackers.transactionsChange) >= 0
                  ? "text-green-400"
                  : "text-red-400"
              } break-words whitespace-normal`}
            >
              {tokenTrackers.transactionsChange}% this week
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="bg-[#120540]/50 p-4 rounded-lg text-center break-words whitespace-normal">
            <p className="text-[#AEA7D9] text-sm font-medium break-words whitespace-normal">
              Circulating Supply
            </p>
            <p className="text-white font-bold break-words whitespace-normal">
              {tokenTrackers.circulatingSupply.toLocaleString()}
            </p>
          </div>
          <div className="bg-[#120540]/50 p-4 rounded-lg text-center break-words whitespace-normal">
            <p className="text-[#AEA7D9] text-sm font-medium break-words whitespace-normal">
              Total Supply
            </p>
            <p className="text-white font-bold break-words whitespace-normal">
              {tokenTrackers.totalSupply.toLocaleString()}
            </p>
          </div>
          <div className="bg-[#120540]/50 p-4 rounded-lg text-center break-words whitespace-normal">
            <p className="text-[#AEA7D9] text-sm font-medium break-words whitespace-normal">
              Burned Tokens
            </p>
            <p className="text-white font-bold break-words whitespace-normal">
              {tokenTrackers.BurnedToken.toLocaleString()}
            </p>
          </div>
          <div className="bg-[#120540]/50 p-4 rounded-lg text-center break-words whitespace-normal">
            <p className="text-[#AEA7D9] text-sm font-medium break-words whitespace-normal">
              Max Supply
            </p>
            <p className="text-white font-bold break-words whitespace-normal">
              1234567890
            </p>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 900,
      once: true,
      offset: 60,
      easing: "ease-in-out",
    });
  }, []);

  const renderCustomLabel = ({ percent, x, y, midAngle }) => {
    if (percent < 0.05) return null; // skip small values
    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <section className="relative py-16 px-4 sm:px-6 md:px-12 bg-gradient-to-b from-[#433C73] via-[#1b0a2d] to-[#120540]">
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className="text-center mb-10" data-aos="fade-down">
          <h2 className=" text-4xl sm:text-6xl font-extrabold bg-gradient-to-r from-[#4A088C] to-[#AEA7D9] bg-clip-text text-transparent drop-shadow mb-4">
            Tokenomics
          </h2>
          <div
            ref={tabsRef}
            className="flex justify-center flex-wrap gap-4"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => animateTabSwitch(tab)}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 border shadow-md
                  ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-[#4A088C] to-[#433C73] text-white border-transparent"
                      : "bg-[#120540] text-[#AEA7D9] border-[#727FA6] hover:bg-[#433C73]/30"
                  }`}
                data-aos="zoom-in"
                data-aos-delay={300 + tabs.indexOf(tab) * 100}
              >
                {tab}
              </button>
            ))}
          </div>
          {/* <p className="mt-6 text-[#AEA7D9] max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="400">
            Our comprehensive token distribution strategy ensures a robust and sustainable ecosystem with strategic allocations for private/public sales, marketing initiatives, staking rewards, and R&D investments to promote long-term growth and community engagement.
          </p> */}
        </div>
        <div ref={contentRef} data-aos="fade-up" data-aos-delay="500">
          {activeTab === "Token" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div
                ref={chartRef}
                className="bg-gradient-to-br from-[#120540]/70 via-[#1b0a2d]/70 to-[#433C73]/70 rounded-xl px-4 py-6 border border-[#727FA6]/50 w-full max-w-full overflow-x-hidden"
                data-aos="zoom-in"
                data-aos-delay="600"
              >
                <h3 className="text-lg sm:text-xl font-bold text-center mb-4 text-[#AEA7D9]">
                  Token Distribution Chart
                </h3>

                {loading ? (
                  <p className="text-center text-[#AEA7D9]">Loading chart...</p>
                ) : error ? (
                  <p className="text-center text-red-400">{error}</p>
                ) : (
                  <div className="w-full">
                    <ResponsiveContainer
                      width="100%"
                      height={window.innerWidth < 640 ? 250 : 300} // Adjust height for small screens
                    >
                      <PieChart>
                        <Pie
                          data={tokenomicsData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="45%"
                          outerRadius={window.innerWidth < 640 ? 80 : 100}
                          stroke="#1f2937"
                          labelLine={false}
                          // label={renderCustomLabel}
                        >
                          {tokenomicsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #727FA6",
                            borderRadius: "12px",
                            color: "#AEA7D9",
                            fontSize: "0.875rem",
                            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                            backdropFilter: "blur(6px)",
                          }}
                          formatter={(value, name) => [`${value}%`, name]}
                        />
                        <Legend
                          verticalAlign="bottom"
                          height={70}
                          iconType="circle"
                          wrapperStyle={{
                            color: "#AEA7D9",
                            fontSize: "0.75rem",
                            textAlign: "center",
                            paddingTop: "10px",
                            display: "flex",
                            justifyContent: "center",
                            flexWrap: "wrap",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
              <style>
  {`
    .recharts-pie-sector:focus,
    .recharts-pie-sector:active {
      outline: none !important;
      stroke: none !important;
    }
    .recharts-pie-sector {
      outline: none !important;
    }
  `}
</style>


              <div
                className="bg-gradient-to-br from-[#120540]/70 via-[#1b0a2d]/70 to-[#433C73]/70 rounded-xl p-6 border border-[#727FA6]/50"
                data-aos="zoom-in"
                data-aos-delay="700"
              >
                <h3 className="text-xl font-bold text-center mb-4 text-[#AEA7D9]">
                  Detailed Breakdown
                </h3>
                {loading ? (
                  <p className="text-center">Loading table...</p>
                ) : error ? (
                  <p className="text-red-400 text-center">{error}</p>
                ) : (
                  renderTable()
                )}
              </div>
            </div>
          )}

          {activeTab === "Market" && (
            <div data-aos="fade-up" data-aos-delay="600">
              {renderMarket()}
            </div>
          )}

          {activeTab === "Tracker" && (
            <div data-aos="fade-up" data-aos-delay="600">
              {renderTracker()}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
