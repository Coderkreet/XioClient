import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getAllBlogs } from '../../api/admin-api';
import { Link } from 'react-router-dom';

const AllBlogs = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state

  useEffect(() => {
    // Always scroll to top on mount
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);         

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await getAllBlogs();
        setBlogs(res?.data || []);
      } catch {
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Use first 3 blogs for slider (or all if less than 3)
  const sliderBlogs = blogs.slice(0, 3);

  // Auto-slide functionality
  useEffect(() => {
    if (sliderBlogs.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderBlogs.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [sliderBlogs.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderBlogs.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderBlogs.length) % sliderBlogs.length);
  };

  // Floating orb for background effect
  const FloatingOrb = ({ size, delay, duration }) => (
    <div 
      className={`absolute rounded-full bg-[#4A088C]/30 blur-xl animate-pulse ${size}`}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`
      }}
    />
  );

  // Blog Skeleton Loader Component
  const BlogLoader = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[90rem] mx-auto z-10 relative">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="rounded-3xl overflow-hidden border border-[#727FA6]/30 bg-[#433C73]/50 shadow-lg relative animate-pulse">
          <div className="p-6">
            <div className="h-40 w-full bg-[#2A2653] rounded-lg mb-3"></div>
            <div className="h-6 bg-[#2A2653] rounded mb-2 w-3/4"></div>
            <div className="h-4 bg-[#2A2653] rounded mb-4 w-full"></div>
            <div className="h-8 w-24 bg-[#2A2653] rounded-xl"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#120540] via-[#252041] to-[#450862] text-white overflow-hidden relative">
      {/* Breadcrumb Navigation */}
      <div className="relative z-20 pt-8 pb-2 max-w-7xl mx-auto">
        <nav className="text-sm text-[#AEA7D9] flex items-center space-x-2">
          <Link to="/" className="hover:underline hover:text-white font-semibold transition-colors">Home</Link>
          <span className="mx-1">/</span>
          <span className="text-[#727FA6]">Blogs</span>
        </nav>
      </div>

      {/* Animated Background Orbs */}
      <div className="absolute inset-0 -z-10">
        <FloatingOrb size="w-96 h-96 -top-48 -left-48" delay={0} duration={8} />
        <FloatingOrb size="w-72 h-72 top-1/3 -right-36" delay={2} duration={10} />
        <FloatingOrb size="w-80 h-80 bottom-1/4 left-1/4" delay={4} duration={12} />
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 pt-16 pb-8 text-center">
        <h1 className="text-6xl md:text-7xl font-bold mb-4 text-[#AEA7D9] animate-pulse">BLOGS</h1>
        <p className="text-xl md:text-2xl text-[#727FA6] max-w-3xl mx-auto leading-relaxed mb-6">
          Explore the latest insights, news, and trends in crypto, blockchain, and technology.
        </p>
      </div>

      {/* Slider Section */}
      {loading ? (
        <div className="relative mb-12 max-w-[90rem] mx-auto z-10 flex items-center justify-center min-h-[22rem]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#AEA7D9]"></div>
        </div>
      ) : (
        <div className="relative mb-12 max-w-[90rem] mx-auto z-10">
          <div className="relative overflow-hidden rounded-3xl border border-[#727FA6] bg-[#433C73]/70 shadow-2xl min-h-[20rem]">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {sliderBlogs.length > 0 ? (
                sliderBlogs.map((blog) => (
                  <div key={blog._id} className="w-full flex-shrink-0 relative flex items-center justify-center" style={{ minHeight: '22rem', height: '22rem' }}>
                    <div className="relative w-full h-full flex items-center justify-center">
                      {blog.image && (
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="absolute inset-0 w-full h-full object-cover rounded-3xl z-0"
                          style={{ filter: 'brightness(0.5)' }}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#120540]/80 via-[#433C73]/60 to-[#4A088C]/40 rounded-3xl z-10" />
                      <div className="relative z-20 flex flex-col items-center justify-center w-full h-full p-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-[#AEA7D9] drop-shadow-lg text-center">{blog.title}</h2>
                        <p className="text-lg opacity-90 text-[#E0E0F0] mb-6 max-w-2xl drop-shadow-lg text-center">{blog.description}</p>
                        <Link to={`/blog/${blog._id}`} className="inline-block bg-[#4A088C] hover:bg-[#433C73] text-white text-base px-6 py-3 rounded-xl transition-all font-bold shadow-lg">
                          Read more
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full flex-shrink-0 flex items-center justify-center h-[20rem] md:h-[24rem]">
                  <div className="text-center w-full">
                    <h2 className="text-3xl font-bold text-[#AEA7D9] mb-2">No Blogs Available</h2>
                    <p className="text-lg text-[#727FA6]">Please check back later for new blog posts.</p>
                  </div>
                </div>
              )}
            </div>
            {/* Slider Navigation */}
            {sliderBlogs.length > 1 && (
              <>
                <button 
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#120540] bg-opacity-70 hover:bg-opacity-90 border border-[#433C73] rounded-full p-2 transition-all z-20"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#120540] bg-opacity-70 hover:bg-opacity-90 border border-[#433C73] rounded-full p-2 transition-all z-20"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
            {/* Slider Indicators */}
            {sliderBlogs.length > 1 && (
              <div className="flex justify-center space-x-2 mt-4">
                {sliderBlogs.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all border border-[#AEA7D9] ${
                      index === currentSlide ? 'bg-[#AEA7D9]' : 'bg-[#727FA6]'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Blog Cards Grid */}
      {loading ? (
        <BlogLoader />
      ) : blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[90rem] mx-auto z-10 relative">
          {blogs.map((blog) => (
            <div key={blog._id} className="rounded-3xl overflow-hidden border border-[#727FA6] bg-[#433C73]/70 shadow-2xl relative hover:shadow-purple-500/20 transition-shadow duration-300">
              <div className="p-6">
                {blog.image && (
                  <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover rounded-lg mb-3 border border-gray-200" />
                )}
                <h3 className="font-bold text-lg mb-2 leading-tight text-white">
                  {blog.title}
                </h3>
                <p className="text-sm opacity-80 mb-4 text-[#727FA6]">{blog.description}</p>
                <Link to={`/blog/${blog._id}`} className="bg-[#4A088C] hover:bg-[#433C73] text-white text-xs px-4 py-2 rounded-xl transition-all font-bold inline-block">
                  Read more
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-[#727FA6]">
          <p>No blogs found.</p>
        </div>
      )}
    </div>
  );
};

export default AllBlogs;