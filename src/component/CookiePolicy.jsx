import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAllCookiePolicies } from '../api/admin-api';
import Footer from './Footer';

const CookiePolicy = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Always scroll to top on mount
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-section]');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          // setActiveSection(section.dataset.section);
        }
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchPolicy = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await getAllCookiePolicies();
        if (
          res &&
          res.data &&
          Array.isArray(res.data) &&
          res.data.length > 0 &&
          Array.isArray(res.data[0].cookiePolicy)
        ) {
          setSections(res.data[0].cookiePolicy);
        } else {
          setSections([]);
        }
      } catch {
        setError('Failed to load cookie policy.');
        setSections([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPolicy();
  }, []);

  const FloatingOrb = ({ size, delay, duration }) => (
    <div
      className={`absolute rounded-full bg-[#4A088C]/30 blur-xl animate-pulse ${size}`}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`
      }}
    />
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#120540] via-[#433C73] to-[#4A088C] text-white overflow-hidden relative">
      {/* Breadcrumb */}
      <div className="relative z-20 pt-8 px-6 max-w-7xl mx-auto">
        <nav className="flex items-center text-[#AEA7D9] text-base font-medium space-x-2">
          <button
            onClick={() => navigate('/')}
            className="hover:text-white transition underline"
            type="button"
          >
            Home
          </button>
          <span className="mx-1">/</span>
          <span className="text-[#727FA6]">Cookie Policy</span>
        </nav>
      </div>

      {/* Animated Background */}
      <div className="absolute inset-0">
        <FloatingOrb size="w-96 h-96 -top-48 -left-48" delay={0} duration={8} />
        <FloatingOrb size="w-72 h-72 top-1/3 -right-36" delay={2} duration={10} />
        <FloatingOrb size="w-80 h-80 bottom-1/4 left-1/4" delay={4} duration={12} />
        <div
          className="absolute w-64 h-64 bg-[#727FA6]/20 rounded-full blur-3xl transition-all duration-300 pointer-events-none"
          style={{
            left: mousePosition.x - 128,
            top: mousePosition.y - 128,
          }}
        />
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>
      </div>

      {/* Hero Section */}
      <div className={`relative z-10 pt-16 pb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-8">
            <div className="inline-block relative">
              <div className="w-32 h-32 bg-[#4A088C] rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse shadow-2xl">
                <div className="w-24 h-24 bg-[#433C73] rounded-full flex items-center justify-center">
                  <FileText className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#AEA7D9] rounded-full animate-bounce" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-[#727FA6] rounded-full animate-pulse" />
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-[#AEA7D9] animate-pulse">
            COOKIE POLICY
          </h1>
          <p className="text-xl md:text-2xl text-[#727FA6] max-w-4xl mx-auto leading-relaxed mb-8">
            How we use cookies and similar technologies on the XIO Platform. Please review our cookie practices.
          </p>
          {/* <div className="text-sm text-gray-400">
            Last updated: January 2025
          </div> */}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-8xl mx-auto px-6 pb-16">
        <div className="grid lg:grid-cols-1 gap-8">
          {/* Cookie Policy Content */}
          <div className={`lg:col-span-3 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="bg-[#433C73]/70 p-8 rounded-3xl border border-[#727FA6] shadow-2xl">
              {loading ? (
                <div className="text-center text-[#AEA7D9] py-8">Loading cookie policy...</div>
              ) : error ? (
                <div className="text-center text-red-400 py-8">{error}</div>
              ) : sections.length === 0 ? (
                <div className="text-center text-[#AEA7D9] py-8">No cookie policy found.</div>
              ) : (
                sections.map((section, idx) => (
                  <section key={section._id || idx} className="mb-12">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 bg-[#4A088C] rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold">{idx + 1}</span>
                      </div>
                      <h2 className="text-3xl font-bold text-white">{section.title}</h2>
                    </div>
                    <div className="text-[#dad5fd] text-[1.2rem] leading-relaxed whitespace-pre-line space-y-4">
                      {section.description}
                    </div>
                  </section>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 bg-[#120540] border-t border-[#433C73] py-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Cookie Usage</h3>
            <p className="text-[#727FA6]">We use cookies to enhance your experience</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Your Choices</h3>
            <p className="text-[#727FA6]">You can manage your cookie preferences anytime</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Transparency</h3>
            <p className="text-[#727FA6]">We are open about our cookie practices</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CookiePolicy;
