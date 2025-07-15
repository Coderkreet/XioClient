import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, User, MessageCircle, Star, Shield, Zap, Globe, CheckCircle } from 'lucide-react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { createContact } from '../api/admin-api';
import Swal from 'sweetalert2';
const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Always scroll to top on mount
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.subject || !formData.message) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Fields',
        text: 'Please fill in all required fields.',
        confirmButtonColor: '#4A088C',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      
      await createContact(formData);
      
      Swal.fire({
        icon: 'success',
        title: 'Message Sent!',
        text: 'We\'ll get back to you soon.',
        confirmButtonColor: '#4A088C',
      });

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to send message. Please try again.',
        confirmButtonColor: '#4A088C',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const FloatingOrb = ({ size, delay, duration }) => (
    <div 
      className={`absolute rounded-full bg-[#4A088C]/30 blur-xl animate-pulse ${size}`}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`
      }}
    />
  );

  const features = [
    { icon: Shield, title: "Secure", description: "End-to-end encryption" },
    { icon: Zap, title: "Fast", description: "Lightning quick response" },
    { icon: Globe, title: "Global", description: "Worldwide support" },
    { icon: CheckCircle, title: "Verified", description: "Trusted by thousands" }
  ];

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
          <span className="text-[#727FA6]">Contact</span>
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

{/* <Navbar/> */}

      {/* Hero Section */}
      <div className={`relative z-10 pt-16 pb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-8">
            <div className="inline-block relative">
              <div className="w-32 h-32 bg-[#4A088C] rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse shadow-2xl">
                <div className="w-24 h-24 bg-[#433C73] rounded-full flex items-center justify-center">
                  <MessageCircle className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#AEA7D9] rounded-full animate-bounce" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-[#727FA6] rounded-full animate-pulse" />
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-[#AEA7D9] animate-pulse">
            GET IN TOUCH
          </h1>
          <p className="text-xl md:text-2xl text-[#727FA6] max-w-4xl mx-auto leading-relaxed mb-12">
            Connect with our world-class team. Experience the future of communication with cutting-edge technology and premium support.
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-[#120540]/60 border border-[#433C73] rounded-2xl p-6 transition-all duration-500 hover:scale-105"
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-[#4A088C] rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-[#727FA6]">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section (Split Layout) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 grid lg:grid-cols-1 gap-16">

        {/* Left Info Card */}
        {/* <div className="space-y-8">
          <div className="bg-[#433C73]/70 p-8 rounded-3xl border border-[#727FA6] shadow-2xl">
            <h2 className="text-4xl font-bold mb-8 text-[#AEA7D9]">Contact Information</h2>
            <div className="space-y-8">
              {[{
                icon: Mail,
                title: "Email",
                values: ["contact@xioplatform.com", "support@xioplatform.com"]
              }, {
                icon: Phone,
                title: "Phone",
                values: ["+1 (555) 123-4567", "+1 (555) 987-6543"]
              }, {
                icon: MapPin,
                title: "Address",
                values: ["123 Innovation Street", "Tech District, Future City 12345"]
              }].map((item, i) => (
                <div key={i} className="flex items-start space-x-6">
                  <div className="bg-[#4A088C] p-4 rounded-xl">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    {item.values.map((val, j) => (
                      <p key={j} className="text-[#727FA6] text-lg">{val}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#433C73]/70 p-8 rounded-3xl border border-[#727FA6] shadow-2xl grid grid-cols-3 gap-6 text-center">
            <div><div className="text-3xl font-bold text-white mb-2 animate-pulse">24/7</div><div className="text-[#AEA7D9]">Support</div></div>
            <div><div className="text-3xl font-bold text-white mb-2 animate-pulse">150+</div><div className="text-[#AEA7D9]">Countries</div></div>
            <div><div className="text-3xl font-bold text-white mb-2 animate-pulse">99.9%</div><div className="text-[#AEA7D9]">Uptime</div></div>
          </div>
        </div> */}

        {/* Right Form */}
        <div className="bg-[#433C73]/70 p-8 rounded-3xl border border-[#727FA6] shadow-2xl space-y-8">
          <h2 className="text-4xl font-bold text-[#AEA7D9]">Send Message</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { label: "Full Name", name: "fullName", type: "text", placeholder: "John Doe", icon: User },
              { label: "Email Address", name: "email", type: "email", placeholder: "john@example.com", icon: Mail },
              { label: "Phone Number", name: "phone", type: "tel", placeholder: "(555) 123-4567", icon: Phone },
              { label: "Subject", name: "subject", type: "text", placeholder: "How can we help?", icon: null }
            ].map(({ label, name, type, placeholder, icon: Icon }, idx) => (
              <div key={idx}>
                <label className="block text-sm font-medium text-[#AEA7D9] mb-3">{label}</label>
                <div className="relative">
                  {Icon && <Icon className="absolute left-4 top-4 w-5 h-5 text-[#AEA7D9]" />}
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className={`w-full ${Icon ? "pl-12" : "pl-4"} pr-4 py-4 bg-[#120540]/30 border border-[#727FA6] rounded-xl focus:ring-2 focus:ring-[#AEA7D9] text-white placeholder-[#AEA7D9] backdrop-blur-sm transition-all duration-300`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#AEA7D9] mb-3">Message</label>
            <div className="relative">
              <MessageCircle className="absolute left-4 top-4 w-5 h-5 text-[#AEA7D9]" />
              <textarea
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-[#120540]/30 border border-[#727FA6] rounded-xl focus:ring-2 focus:ring-[#AEA7D9] text-white placeholder-[#AEA7D9] backdrop-blur-sm resize-none transition-all duration-300"
                placeholder="Tell us about your project or inquiry..."
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-[#4A088C] hover:bg-[#433C73] text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                <span>Sending...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Send className="w-6 h-6 mr-3" />
                <span>Send Message</span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 bg-[#120540] border-t border-[#433C73] py-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          {["Quick Response", "Global Coverage", "Expert Team"].map((title, idx) => (
            <div key={idx}>
              <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
              <p className="text-[#727FA6]">{idx === 0 ? "We respond within 2 hours during business hours" : idx === 1 ? "24/7 support across all time zones" : "Certified professionals ready to help"}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
