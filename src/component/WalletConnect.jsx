import React, { useEffect, useState } from "react";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { getAllConnectWallets, getAllHeaderContent } from "../api/admin-api";
import { SiBinance, SiTether } from "react-icons/si";

const getTokenPrice = async (symbol) => {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`
    );
    const data = await res.json();
    return data[symbol]?.usd || 0;
  } catch (error) {
    console.error("Failed to fetch price:", error);
    return 0;
  }
};

const WalletConnectButton = () => {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();

  return (
    <div>
      {!isConnected ? (
        <button
          onClick={() => open()}
          className="px-6 py-2 border border-white/40 font-semibold rounded-md"
          style={{
            backgroundImage: "linear-gradient(to right, #120540, #433C73)",
          }}
        >
          Connect Wallet
        </button>
      ) : (
        <span
          onClick={() => open()}
          className="px-2 py-1 bg-gray-500 rounded-sm cursor-pointer"
        >
          {address?.slice(0, 4) + "..." + address?.slice(-4)}
        </span>
      )}
    </div>
  );
};

const WalletConnect = () => {
  const [walletContent, setWalletContent] = useState(null);
  const [logoUrl, setLogoUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saleEnabled, setSaleEnabled] = useState(true); // Toggle for purchase section

  const [selectedToken, setSelectedToken] = useState("bnb");
  const [pricePerToken] = useState(0.012091);
  const [bnbPrice, setBnbPrice] = useState(0);
  const [purchaseAmount, setPurchaseAmount] = useState("");

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const targetDate = new Date("2025-07-05T18:00:00"); // <-- SET YOUR TARGET DATE
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      const days = String(
        Math.floor(difference / (1000 * 60 * 60 * 24))
      ).padStart(2, "0");
      const hours = String(
        Math.floor((difference / (1000 * 60 * 60)) % 24)
      ).padStart(2, "0");
      const minutes = String(
        Math.floor((difference / 1000 / 60) % 60)
      ).padStart(2, "0");
      const seconds = String(Math.floor((difference / 1000) % 60)).padStart(
        2,
        "0"
      );

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllHeaderContent();
        if (res?.data?.navLogo) {
          setLogoUrl(res.data.navLogo);
        }
      } catch (err) {
        console.error("Error fetching logo:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const data = await getAllConnectWallets();
        if (Array.isArray(data.data) && data.data.length > 0) {
          setWalletContent(data.data[0]);
        } else if (typeof data.data === "object" && data.data !== null) {
          setWalletContent(data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchWallets();
  }, []);

  useEffect(() => {
    const fetchPrice = async () => {
      const symbol = selectedToken === "bnb" ? "binancecoin" : "tether";
      const tokenPrice = await getTokenPrice(symbol);
      setBnbPrice(tokenPrice);
    };
    if (saleEnabled) fetchPrice();
  }, [selectedToken, saleEnabled]);

  const getTokenUSDValue = () => {
    const rate = selectedToken === "bnb" ? bnbPrice : 1;
    return (parseFloat(purchaseAmount || 0) * rate).toFixed(2);
  };

  const getTokenAmount = () => {
    const usd = getTokenUSDValue();
    return (parseFloat(usd) / pricePerToken).toFixed(2);
  };

  const leftTitle = walletContent?.leftTitle || "XIO PRESALE IS CLOSED";
  const leftDescription =
    walletContent?.leftDescription || `Stay tuned for future updates.`;

  const tokenRaised = 20.46;
  const tokenTarget = 41.34;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#433C73] via-[#1b0a2d] to-[#120540] flex items-center justify-center p-4">
      <div className="max-w-3xl w-full grid grid-cols-1  gap-8">
        {/* Left Section */}
        <div className="bg-black/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
          <div className="flex justify-between items-center mb-8">
            <WalletConnectButton />
            <img
              src={logoUrl}
              className="w-12 h-12 rounded-lg bg-white/10 p-1"
              alt="logo"
            />
          </div>

          {!saleEnabled ? (
            <div className="text-center mb-8">
              <h2 className="text-white text-2xl font-bold mb-4">
                {leftTitle}
              </h2>
              {leftDescription.split("\n").map((line, idx) => (
                <p
                  key={idx}
                  className="text-gray-300 text-sm leading-relaxed mb-3"
                >
                  {line}
                </p>
              ))}
            </div>
          ) : (
            <div className="text-white">
              <h2 className="text-2xl font-bold text-center mb-6 text-[#9797e4] tracking-wide">
                &gt;&gt;&gt; BUY XIO &lt;&lt;&lt;
              </h2>
              <div className="flex justify-center mb-4 gap-4 mt-6">
                {Object.entries(timeLeft).map(([label, value]) => (
                  <div
                    key={label}
                    className="flex flex-col items-center justify-center px-4 py-3 rounded-lg border-2 text-white font-bold text-lg min-w-[65px]"
                    style={{
                      borderColor: "#4b4b91",
                      backgroundColor: "#0A0F2C",
                      boxShadow: "0 0 10px #4b4b91",
                    }}
                  >
                    <span className="text-2xl">{value}</span>
                    <span className="text-xs tracking-wider">
                      {label.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 mt-8 gap-y-6 text-[1rem] text-gray-400 mb-4">
                <div className="flex gap-x-4 justify-between sm:justify-start">
                  Total Tokens Sold: <br />
                  <span className="text-white font-semibold">
                    1,242,125,342
                  </span>
                </div>
                <div className="flex gap-x-4 justify-between sm:justify-start">
                  Price: <br />
                  <span className="text-white font-semibold">
                    ${pricePerToken}
                  </span>
                </div>
              </div>

              <div className="text-right text-sm mb-1">
                Amount Raised:{" "}
                <span className="text-[#9797e4] font-semibold">
                  $10,747,411.11
                </span>
              </div>

              <div className="mb-4">
                <div className="text-sm mb-1 text-[#9797e4]">Stage 22</div>
                <div className="relative h-8 bg-gray-700 rounded-lg overflow-hidden border border-gray-600">
                  {/* Background pattern with diagonal lines */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="h-full w-full" style={{
                      backgroundImage: `repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 2px,
                        #9797e4 2px,
                        #9797e4 4px
                      )`,
                      backgroundSize: '8px 8px'
                    }}></div>
                  </div>
                  
                  {/* Progress bar with glow effect */}
                  <div
                    className="h-full relative"
                    style={{ width: `${(tokenRaised / tokenTarget) * 100}%` }}
                  >
                    <div className="h-full bg-gradient-to-r from-[#9797e4] to-[#7c7cd4] rounded-l-lg relative">
                      {/* Glow effect */}
                      <div className="absolute inset-0 rounded-l-lg shadow-[0_0_15px_rgba(151,151,228,0.8)]"></div>
                      
                      {/* Animated shine overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                    </div>
                  </div>
                  
                  {/* Progress indicator */}
                  <div className="absolute top-1/2 transform -translate-y-1/2 right-2">
                    <div className="w-3 h-3 bg-[#9797e4] rounded-full shadow-[0_0_8px_rgba(151,151,228,1)]"></div>
                  </div>
                </div>
                
                {/* Enhanced stats display */}
                <div className="flex justify-between items-center mt-2 text-sm">
                  <div className="text-gray-400">
                    <span className="text-[#9797e4] font-semibold">{tokenRaised}M</span> / {tokenTarget}M
                  </div>
                  <div className="text-[#9797e4] font-bold">
                    {((tokenRaised / tokenTarget) * 100).toFixed(2)}%
                  </div>
                </div>
              </div>

              <div className="flex justify-between gap-2 my-6">
                {/* <button disabled className="w-full py-2 rounded bg-gray-800 text-gray-500 border border-gray-600 cursor-not-allowed">ETH</button> */}
                <button
                  className={`w-full py-2 rounded border flex items-center justify-center gap-2 ${
                    selectedToken === "bnb" ? "bg-[#9797e4]" : "bg-gray-800"
                  }`}
                  onClick={() => setSelectedToken("bnb")}
                >
                  <SiBinance size={22} color="#F3BA2F" />
                  BNB
                </button>
                <button
                  className={`w-full py-2 rounded border flex items-center justify-center gap-2 ${
                    selectedToken === "usdt" ? "bg-[#9797e4]" : "bg-gray-800"
                  }`}
                  onClick={() => setSelectedToken("usdt")}
                >
                  <SiTether size={22} color="#26A17B" />
                  USDT
                </button>
                <button
                  disabled
                  className="w-full py-2 rounded bg-gray-800 text-gray-500 border border-gray-600 cursor-not-allowed"
                >
                  OTHER
                </button>
              </div>

              <div className="text-sm text-gray-400 mb-1">Purchase Amount</div>
              <div className="flex items-center mb-4">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={purchaseAmount}
                  onChange={(e) => setPurchaseAmount(e.target.value)}
                  className="flex-1 p-3 rounded bg-black border border-white/20 text-white"
                />
                <span className="ml-2 text-gray-300 font-semibold uppercase">
                  {selectedToken}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div className="p-3 bg-black border border-white/10 rounded">
                  <div className="text-gray-400">Amount You'll Get</div>
                  <div className="text-white text-lg font-bold">
                    {getTokenAmount()}
                  </div>
                </div>
                <div className="p-3 bg-black border border-white/10 rounded">
                  <div className="text-gray-400">USD Worth</div>
                  <div className="text-white text-lg font-bold">
                    ${getTokenUSDValue()}
                  </div>
                </div>
              </div>

              <button
                className="w-full bg-[#9797e4] hover:bg-[#4f4f7f] transition p-3 rounded text-lg font-bold"
                onClick={() =>
                  alert(`Purchased with ${selectedToken.toUpperCase()}`)
                }
              >
                BUY TOKENS
              </button>
            </div>
          )}

          {/* Toggle Button (for testing mode only) */}
          <button
            onClick={() => setSaleEnabled(!saleEnabled)}
            className="mt-8 text-sm text-purple-300 underline"
          >
            Toggle {saleEnabled ? "Disabled" : "Enabled"} Mode
          </button>
        </div>

        {/* Right Section */}
        {/* <div className="flex flex-col justify-center text-white text-center lg:text-left">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#7b05f1] via-[#AEA7D9] to-[#ff9bf3] text-transparent bg-clip-text">
            Join the Oilconomy with XIO Token Presale
          </h1>
          <p className="text-gray-300 text-lg">XIO Protocol is the first Web3 ecosystem for people and businesses in the Oil and Gas industry.</p>
        </div> */}
      </div>
    </div>
  );
};

export default WalletConnect;
