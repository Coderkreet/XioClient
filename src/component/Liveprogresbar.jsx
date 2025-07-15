import { useState } from "react";
import smallc from "../assets/smallxio.png";

const LivePriceBar = () => {
  const [currentPrice, setCurrentPrice] = useState(12051.48);
  
  const formatNumber = (num) => {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  
  return (
    <div className="w-full max-w-xl mx-auto text-white px-4 sm:px-6 md:px-10 ml-6 sm:ml-10">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2 mt-7">
        <img src={smallc} alt="XIO Coin" className="h-4 sm:h-5" />
        <div className="flex items-center ">
          <h2 className="text-purple-300 md:text-xl sm:text-sm font-bold">Live Price</h2>
          <div className="ml-2 h-2 w-2 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50 animate-pulse"></div>
        </div>
      </div>
      
      {/* Current Price */}
      <div className="grid grid-cols-3 gap-y-1 mb-3">
        <div className="col-span-1">
          <div className="text-gray-400 text-xs">Current Price</div>
          <div className="text-white text-sm font-bold">
            {formatNumber(currentPrice)}
          </div>
        </div>
      </div>
      
      {/* Two Bars Side by Side */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-2">
        {/* Left Bar - Daily */}
        <div className="flex-1 relative">
          {/* High/Low values above bar */}
          <div className="flex justify-between text-center mb-1">
            <div className="text-[8px] border-l sm:text-[10px] text-white">
              <div>11,082.30</div>
              <div>Daily Low</div>
            </div>
            
            <div className="text-[8px]  sm:text-[10px] text-white">
              <div>12,248.15</div>
              <div>Daily High</div>
            </div>
          </div>
          
          <div className="h-1 w-full bg-gradient-to-r from-purple-600 to-purple-500 rounded"></div>
          
          {/* Price Marker */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img src={smallc} alt="XIO Coin" className="h-4 sm:h-5 mx-auto" />
          </div>
          
          {/* Center price below the bar */}
          <div className="text-[9px] sm:text-[11px] text-white text-center ">
            <div>|</div>
            <div>12,000.00</div>
          </div>
        </div>
        
        {/* Right Bar - 52 Week */}
        <div className="flex-1 relative">
          {/* High/Low values above bar */}
          <div className="flex justify-between text-center mb-1">
            <div className="text-[8px] sm:text-[10px] text-white">
              <div>10,440.64</div>
              <div>52 Week Low</div>
            </div>
            
            <div className="text-[8px] border-r sm:text-[10px] text-white">
              <div>15,265.42</div>
              <div>52 Week High</div>
            </div>
          </div>
          
          <div className="h-1 w-full bg-gradient-to-r from-purple-600 to-purple-500 rounded"></div>
          
          {/* Center price below the bar */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img src={smallc} alt="XIO Coin" className="h-4 sm:h-5 mx-auto" />
          </div>
          <div className="text-[9px] sm:text-[11px] text-white text-center">
            <div>|</div>
            <div>12,166.60</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePriceBar;