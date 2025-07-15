import { useState, useEffect, useRef } from 'react';
import { Copy, Wallet, CheckCircle, ArrowRight, ArrowLeft, Zap, Shield, Globe } from 'lucide-react';

import meta from "../UserAssets/slider/MetaMask_Fox.svg";
import web from "../UserAssets/web3.png";
import trust from "../UserAssets/trust.png";
import { getAllTokensV2 } from '../api/admin-api';


const TokenImportGuide = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [copied, setCopied] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const sliderRef = useRef(null);

  const [tokenData, setTokenData] = useState([]);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await getAllTokensV2();
        if (response?.data && Array.isArray(response.data)) {
          setTokenData(response.data);
        } else if (Array.isArray(response)) {
          setTokenData(response);
        } else {
          setTokenData([]);
        }
      } catch (error) {
        console.error("Error fetching tokens:", error);
        setTokenData([]);
      }
    };

    fetchTokens();

    console.log("tokenData////////////" , tokenData)
  }, []);

  // Use the first token from tokenData, or fallback values
  const tokenDetails = tokenData[0] || {
    tokenName: '-',
    symbol: '-',
    decimals: '-',
    address: '-',
    network: '-'
  };

  const wallets = [
    {
      name: "MetaMask",
      icon: meta,
      color: "from-orange-500 to-yellow-500",
      steps: [
        "Open MetaMask extension",
        "Click on 'Import tokens' at the bottom",
        "Select 'Custom Token' tab",
        "Paste the contract address",
        "Token symbol and decimals will auto-fill",
        "Click 'Add Custom Token'"
      ]
    },
    {
      name: "Trust Wallet",
      icon: trust,
      color: "from-blue-500 to-cyan-500",
      steps: [
        "Open Trust Wallet app",
        "Tap the '+' icon in top right",
        "Search for 'XIOCOIN' or paste contract",
        "Toggle on the token",
        "Token will appear in your wallet"
      ]
    },
    {
      name: "Other Web3 Wallets",
      icon: web,
      color: "from-purple-500 to-pink-500",
      steps: [
        "Open your Web3 wallet",
        "Look for 'Add Token' or 'Custom Token'",
        "Paste the contract address",
        "Verify token details",
        "Confirm to add the token"
      ]
    }
  ];

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % wallets.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + wallets.length) % wallets.length);
  };

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className=" px-[2rem] py-[4rem]  relative overflow-hidden bg-gradient-to-b from-[#120540] via-[#1b0a2d] to-[#433C73]" >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute  h-1 bg-purple-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: `translate(${mousePos.x * 0.01}px, ${mousePos.y * 0.01}px)`
          }}
        />

        {/* Glowing Orbs */}
        <div
          className="absolute  rounded-full bg-purple-600/10 blur-3xl"
          style={{
            top: '10%',
            left: '10%',
            animation: 'pulse 4s ease-in-out infinite'
          }}
        />
        <div
          className="absolute w-80 h-80 rounded-full bg-pink-600/10 blur-3xl"
          style={{
            bottom: '10%',
            right: '10%',
            animation: 'pulse 6s ease-in-out infinite reverse'
          }}
        />
      </div>

      <div className="mx-[2rem] relative z-10">
        {/* Header with Enhanced Animations */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center mb-6">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse"></div>
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white text-2xl font-bold shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                XIO
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold  mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent relative">
            Import XIOCOIN to Your Wallet
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-lg -z-10 animate-pulse"></div>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto opacity-90">
            Follow our step-by-step guide to add XIOCOIN to MetaMask, Trust Wallet, and other Web3 wallets
          </p>
        </div>

        {/* Enhanced Token Details Card */}
        <div className={`bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-lg rounded-2xl p-8 mb-12 border border-purple-500/20 shadow-2xl relative group transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ animationDelay: '0.2s' }}>
          {/* Animated Border */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/50 to-pink-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur"></div>

          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <div className="relative">
              <Wallet className="mr-3 text-purple-400 transform group-hover:rotate-12 transition-transform duration-300" size={28} />
              <div className="absolute inset-0 bg-purple-400 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
            Token Details
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {[
                { label: "Token Name", value: tokenDetails.tokenName },
                { label: "Symbol", value: tokenDetails.symbol },
                { label: "Decimals", value: tokenDetails.decimals }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-black/30 rounded-lg border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group/item transform hover:scale-105">
                  <span className="text-gray-300 font-medium">{item.label}:</span>
                  <span className="text-white font-bold group-hover/item:text-purple-300 transition-colors">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-black/30 rounded-lg border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group/contract">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300 font-medium">Contract Address:</span>
                  <button
                    onClick={() => copyToClipboard(tokenDetails.address, 'contract')}
                    className="flex items-center space-x-2 px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                  >
                    {copied === 'contract' ? (
                      <CheckCircle size={16} className="text-green-400 animate-bounce" />
                    ) : (
                      <Copy size={16} className="text-white" />
                    )}
                    <span className="text-white text-sm">
                      {copied === 'contract' ? 'Copied!' : 'Copy'}
                    </span>
                  </button>
                </div>
                <div className="text-white font-mono text-sm break-all bg-black/50 p-3 rounded group-hover/contract:bg-black/70 transition-colors">
                  {tokenDetails.address}
                </div>
              </div>

              <div className="flex justify-between items-center p-4 bg-black/30 rounded-lg border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 transform hover:scale-105">
                <span className="text-gray-300 font-medium">Network:</span>
                <span className="text-white font-bold">{tokenDetails.network}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Wallet Slider */}
          <div className={`relative transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ animationDelay: '0.4s' }}>
            <h2 className="text-3xl font-bold  mb-8 text-center relative bg-gradient-to-r from-[#4A088C] to-[#fbaeff] bg-clip-text text-transparent">
              Choose Your Wallet
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
            </h2>

            <div className="relative overflow-hidden rounded-2xl group">
              {/* Slider Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div
                ref={sliderRef}
                className="flex transition-all duration-700 ease-out sm:h-[30rem] h-auto flex-col sm:flex-row"
                style={
            window.innerWidth < 640
              ? {}
              : { transform: `translateX(-${currentSlide * 100}%)` }
                }
              >
                {wallets.map((wallet, index) => (
            <div
              key={index}
              className={`w-full flex-shrink-0 ${
                window.innerWidth < 640
                  ? currentSlide === index
              ? 'block'
              : 'hidden'
                  : ''
              }`}
            >
              <div className={`bg-gradient-to-br ${wallet.color} p-1 rounded-2xl shadow-2xl transform transition-all duration-500 ${currentSlide === index ? 'scale-100' : 'scale-95'}`}>
                <div className="bg-gray-900/90 backdrop-blur-lg rounded-2xl p-8 relative overflow-hidden">
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(147, 51, 234, 0.1) 2px, rgba(147, 51, 234, 0.1) 4px)`
              }}></div>
                  </div>

                  <div className="text-center mb-8 relative z-10">
              <div className="mb-4 transform hover:scale-110 transition-transform duration-300 cursor-pointer flex justify-center">
                <img
                  src={wallet.icon}
                  alt={`${wallet.name} logo`}
                  className="w-16 h-16 object-contain rounded-full shadow-lg"
                />
              </div>

              <h3 className="text-3xl font-bold text-white mb-2">{wallet.name}</h3>
              <p className="text-gray-300">Step-by-step import guide</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
              {wallet.steps.map((step, stepIndex) => (
                <div key={stepIndex} className="bg-black/40 rounded-lg p-4 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group/step"
                  style={{ animationDelay: `${stepIndex * 0.1}s` }}>
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${wallet.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 transform group-hover/step:rotate-12 transition-transform duration-300`}>
                {stepIndex + 1}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed group-hover/step:text-white transition-colors duration-300">{step}</p>
                  </div>
                </div>
              ))}
                  </div>
                </div>
              </div>
            </div>
                ))}
              </div>
            </div>

            {/* Enhanced Navigation */}
            <div className="flex flex-col sm:flex-row justify-center items-center mt-8 gap-4">
              {/* <button
                onClick={prevSlide}
                className="flex items-center space-x-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-all duration-300 text-white font-medium transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 group w-full sm:w-auto justify-center"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Previous</span>
              </button> */}

              <div className="flex space-x-2 justify-center">
                {wallets.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${index === currentSlide
                  ? 'bg-purple-500 shadow-lg shadow-purple-500/50'
                  : 'bg-gray-600 hover:bg-gray-500'
                }`}
            />
                ))}
              </div>

              {/* <button
                onClick={nextSlide}
                className="flex items-center space-x-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-all duration-300 text-white font-medium transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 group w-full sm:w-auto justify-center"
              >
                <span>Next</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button> */}
            </div>
          </div>

          {/* Enhanced Quick Actions */}
        <div className={`mt-16 grid md:grid-cols-3 gap-6 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ animationDelay: '0.6s' }}>
          {[
            {
              icon: Shield,
              color: "from-green-900/50 to-emerald-900/50",
              borderColor: "border-green-500/20",
              iconColor: "text-green-400",
              title: "Verify Token",
              description: "Always verify the contract address before adding any token"
            },
            {
              icon: Globe,
              color: "from-blue-900/50 to-cyan-900/50",
              borderColor: "border-blue-500/20",
              iconColor: "text-blue-400",
              title: "Official Links",
              description: "Only use official XIOCOIN website and verified social media"
            },
            {
              icon: Zap,
              color: "from-purple-900/50 to-pink-900/50",
              borderColor: "border-purple-500/20",
              iconColor: "text-purple-400",
              title: "Need Help?",
              description: "Join our community for support and updates"
            }
          ].map((item, index) => (
            <div key={index} className={`bg-gradient-to-br ${item.color} backdrop-blur-lg rounded-2xl p-6 ${item.borderColor} border text-center group hover:border-opacity-60 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl relative overflow-hidden`}>
              {/* Hover Effect Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="relative mb-4 inline-block">
                  <item.icon size={48} className={`${item.iconColor} mx-auto transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`} />
                  <div className={`absolute inset-0 ${item.iconColor} blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300`}></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">{item.title}</h3>
                <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      

      {/* Custom Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default TokenImportGuide;