import React, { useEffect, useState } from "react";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import {
  getAllConnectWallets,
  getAllHeaderContent,
  getXioData,
  purchaseXioCoin,
} from "../api/admin-api";
import { SiBinance, SiTether } from "react-icons/si";
import { ethers } from "ethers";
import Swal from "sweetalert2";
import USDTPaymentMain from "./USDTPaymentMain";
import BinancePaymentMain from "./BinancePaymentMain";

// USDT Contract Configuration
const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955";
const BNB_ADDRESS = "0xd530011C55c2558Ae367eB47A26a7636F888a50C";
const USDT_ABI = [
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

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
  const [saleEnabled, setSaleEnabled] = useState(true); // Toggle for purchase section

  const [selectedToken, setSelectedToken] = useState("bnb");
  const [pricePerToken, setPricePerToken] = useState(0.012091);
  const [bnbPrice, setBnbPrice] = useState(0);
  const [purchaseAmount, setPurchaseAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  // Helper to close all modals and show a SweetAlert
  const closeAllModals = (type, message) => {
    setShowPaymentModal(false);
    // If you have other modals like setShowWalletModal, close them here
    // setShowWalletModal && setShowWalletModal(false);
    if (type === 'success') {
      Swal.fire({
        icon: 'success',
        title: 'Payment Successful',
        text: message || 'Your payment was successful!',
        confirmButtonText: 'OK',
        timer: 5000,
        showConfirmButton: true,
      });
    } else if (type === 'error') {
      Swal.fire({
        icon: 'error',
        title: 'Payment Failed',
        text: message || 'Payment was rejected or failed.',
        confirmButtonText: 'OK',
        timer: 5000,
        showConfirmButton: true,
      });
    }
  };
  const [xioData, setXioData] = useState(null);
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [purchaseError, setPurchaseError] = useState(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState(null);

  const [walletType, setWalletType] = useState("");
  const [recipientAddress] = useState(
    // TODO: Replace with your actual payment address
    // "0x0000000000000000000000000000000000000000"
    import.meta.env.VITE_PAYMENT_ADDRESS
  );

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

        console.log("Header Content:", res);
        const xioData = await getXioData();
        console.log("XIO Data:", xioData);

        if (xioData.success) {
          setPricePerToken(xioData.data.price || 0.0015);
          setXioData(xioData.data);
        }
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

  // Payment handling functions
  const handleConnectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });

        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x38" }],
          });
        } catch (switchError) {
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: "0x38",
                    chainName: "Binance Smart Chain",
                    nativeCurrency: {
                      name: "BNB",
                      symbol: "BNB",
                      decimals: 18,
                    },
                    rpcUrls: ["https://bsc-dataseed1.binance.org/"],
                    blockExplorerUrls: ["https://bscscan.com/"],
                  },
                ],
              });
            } catch (addError) {
              console.error("Error adding BSC network:", addError);
              throw new Error("Failed to add BSC network");
            }
          } else {
            throw switchError;
          }
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();
        console.log("Connected wallet address:", userAddress);

        return { provider, signer, userAddress };
      } else {
        Swal.fire({
          icon: "error",
          title: "Connection Failed",
          text: "Wallet is not installed.",
        });
        throw new Error("Wallet is not installed.");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      Swal.fire({
        icon: "error",
        title: "Connection Failed",
        text: error.message || "Failed to connect wallet. Please try again.",
      });
      throw error;
    }
  };

  const handleBuyTokens = async () => {
    if (!purchaseAmount || parseFloat(purchaseAmount) <= 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid Amount",
        text: "Please enter a valid purchase amount.",
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Connect wallet
      const { provider, signer, userAddress } = await handleConnectWallet();

      // Check network
      const chainId = await window.ethereum.request({
        method: "eth_chainId",
      });
      if (chainId !== "0x38") {
        throw new Error("Please connect to BSC network first");
      }

      if (selectedToken === "usdt") {
        // USDT Payment
        const usdtContract = new ethers.Contract(
          USDT_ADDRESS,
          USDT_ABI,
          signer
        );

        try {
          const decimals = await usdtContract.decimals();
          console.log(`Token decimals: ${decimals}`);
        } catch (error) {
          console.error("Error fetching USDT decimals:", error);
          throw new Error("Invalid USDT contract on BSC network");
        }

        const balance = await usdtContract.balanceOf(userAddress);
        const amountInUSDT = ethers.parseUnits(purchaseAmount.toString(), 18);

        if (balance < amountInUSDT) {
          throw new Error("Insufficient USDT balance");
        }

        const tx = await usdtContract.transfer(recipientAddress, amountInUSDT);
        await tx.wait();
        console.log("Transaction hash:", tx.hash);

        Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          text: `Successfully purchased ${getTokenAmount()} XIO tokens with ${purchaseAmount} USDT`,
        });
      } else {
        // BNB Payment
        const balance = await provider.getBalance(userAddress);
        const amountInBNB = ethers.parseEther(purchaseAmount.toString());

        if (balance < amountInBNB) {
          throw new Error("Insufficient BNB balance");
        }

        console.log(`💸 BNB Transfer: From ${userAddress} To ${BNB_ADDRESS}`);
        const tx = await signer.sendTransaction({
          to: recipientAddress,
          value: amountInBNB,
        });
        await tx.wait();
        console.log("Transaction hash:", tx.hash);

        Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          text: `Successfully purchased ${getTokenAmount()} XIO tokens with ${purchaseAmount} BNB`,
        });
      }
    } catch (error) {
      console.error("Error during payment:", error);
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: error.message || "Failed to complete payment. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  async function handlePurchase(data) {
    // setPurchaseLoading(true);
    // setPurchaseError(null);
    // setPurchaseSuccess(null);

    console.log("Purchase data:", data);

    if (
      !purchaseAmount ||
      isNaN(purchaseAmount) ||
      Number(purchaseAmount) <= 0
    ) {
      setPurchaseError("Please enter a valid amount.");
      setPurchaseLoading(false);
      return;
    }

    try {
      const res = await purchaseXioCoin({
        amount: getTokenAmount(),
        recipientAddress: data?.recipientAddress,
        userAddress: data?.userAddress,
        txResponse: data?.txResponse,
      });

      if (res.success) {
        setPurchaseSuccess("Purchase successful!");
        setPurchaseAmount("");
        closeAllModals('success', `You have successfully purchased ${getTokenAmount()} XPFI Coin.`);
      } else {
        setPurchaseError(res.message || "Purchase failed.");
        closeAllModals('error', res.message || "Purchase failed.");
      }
    } catch (err) {
      console.error(err);
      setPurchaseError("An error occurred during purchase.");
      closeAllModals('error', "An error occurred during purchase.");
    } finally {
      setPurchaseLoading(false);
    }
  }

  const formatNumberWithSuffix = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(2) + "B"; // Convert to billions and add "B"
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + "M"; // Convert to millions and add "M"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + "K"; // Convert to thousands and add "K"
    }
    return num; // Return the number as is if it's less than a thousand
  };



  const checkValidPurchaseAmount = () => {
    
    console.log("purchase Amount ", purchaseAmount)
    if (
      purchaseAmount === "" ||
      isNaN(purchaseAmount) ||
      Number(purchaseAmount) < 0
    ) {
      Swal.fire({
        icon: "error",
        title: "Invalid Amount",
        text: "Minimum purchase amount is $1. Please enter a valid amount.",
        confirmButtonText: "OK",
        timer: 5000,
        showConfirmButton: true,
      });
    } else {
      setShowPaymentModal(true);
    }
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
                    {xioData?.soldQuantity || "0"}
                  </span>
                </div>
                <div className="flex gap-x-4 justify-between sm:justify-start">
                  Price: <br />
                  <span className="text-white font-semibold">
                    ${pricePerToken}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm mb-1">
                {/* Left: Phase Number */}
                <div className="text-[#9797e4] text-xl font-semibold">
                  Phase 22
                </div>

                {/* Right: Amount Raised */}
                <div>
                  Amount Raised:{" "}
                  <span className="text-[#9797e4] font-semibold">
                    $10,747,411.11
                  </span>
                </div>
              </div>

              <br />
              <div className="mb-4">
                <div className="flex items-center gap-4">
                  <div className="md:text-lg md:font-bold font-bold text-sm text-[#6b46c1] whitespace-nowrap">
                    Stage {xioData?.stage}
                  </div>
                  <div className="relative h-3 bg-gray-800/50 rounded-full overflow-hidden border border-gray-600/30 flex-1 min-w-[120px] backdrop-blur-sm">
                    {/* Striped background: Only shows in unfilled area */}
                    <div className="absolute inset-0 z-0">
                      <div
                        className="h-full w-full opacity-25"
                        style={{
                          backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 3px,
              #581c87 3px,
              #581c87 4px
            )`,
                          backgroundSize: "12px 12px",
                        }}
                      />
                    </div>

                    {/* Filled progress bar */}
                    <div
                      className="absolute inset-y-0 left-0 z-10"
                      style={{
                        width: `${
                          (xioData?.soldQuantity / xioData?.totalQuantity) * 100
                        }%`,
                      }}
                    >
                      <div className="h-full bg-gradient-to-r from-[#a855f7] via-[#7c3aed] to-[#6b46c1] rounded-full relative overflow-hidden">
                        {/* Inner glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/10 rounded-full"></div>

                        {/* Animated shine effect */}
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full transform -skew-x-12 w-6"
                          style={{
                            animation: "shimmer 2s ease-in-out infinite",
                            left: "-24px",
                          }}
                        ></div>

                        {/* Outer glow */}
                        <div className="absolute inset-0 rounded-full shadow-[0_0_12px_rgba(168,85,247,0.6)]"></div>
                      </div>
                    </div>

                    {/* Progress indicator dot - only show when progress > 5% */}
                    {(xioData?.soldQuantity / xioData?.totalQuantity) * 100 >
                      5 && (
                      <div
                        className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-20 transition-all duration-300"
                        style={{
                          left: `${(tokenRaised / tokenTarget) * 100}%`,
                        }}
                      >
                        <div className="w-4 h-4 bg-gradient-to-r from-[#a855f7] to-[#7c3aed] rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)] border-2 border-white/20">
                          <div className="w-full h-full rounded-full bg-gradient-to-r from-white/30 to-transparent"></div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="text-[#6b46c1] md:text-lg md:font-bold  font-bold text-sm whitespace-nowrap">
                    {(
                      (xioData?.soldQuantity / xioData?.totalQuantity) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                </div>

                <style jsx>{`
                  @keyframes shimmer {
                    0% {
                      transform: translateX(-100%) skewX(-12deg);
                    }
                    100% {
                      transform: translateX(400%) skewX(-12deg);
                    }
                  }
                `}</style>
              </div>
              {/* Enhanced stats display */}
              <div className="flex justify-center items-center mt-2 text-sm">
                <div className="text-gray-400">
                  {/* <span className="text-[#9797e4] font-semibold">{xioData?.soldQuantity}M</span> /{" "}
                  {xioData?.totalQuantity}B */}
                  <span className="text-[#9797e4] font-semibold">
                    {xioData?.soldQuantity
                      ? formatNumberWithSuffix(xioData?.soldQuantity)
                      : 0}
                  </span>{" "}
                  /{" "}
                  <span className="text-[#9797e4] font-semibold">
                    {xioData?.totalQuantity
                      ? formatNumberWithSuffix(xioData?.totalQuantity)
                      : 0}
                  </span>
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
                className="w-full bg-[#9797e4] hover:bg-[#4f4f7f] transition p-3 rounded text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={checkValidPurchaseAmount}
                disabled={
                  isProcessing ||
                  !purchaseAmount ||
                  parseFloat(purchaseAmount) <= 0
                }
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing...
                  </div>
                ) : (
                  `BUY TOKENS WITH ${selectedToken.toUpperCase()}`
                )}
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

      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gray-800 w-full max-w-md mx-4 rounded-xl border border-gray-700 shadow-2xl">
            <div className="p-6">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 mb-6">
                  <img
                    src={logoUrl}
                    alt="App Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                {selectedToken === "bnb" ? (
                  <BinancePaymentMain
                    amount={Number(purchaseAmount)}
                    walletType={walletType}
                    onSuccess={handlePurchase}
                    onFailure={() => closeAllModals('error', 'Payment was rejected or failed.')}
                  />
                ) : selectedToken === "usdt" ? (
                  <USDTPaymentMain
                    amount={Number(purchaseAmount)}
                    walletType={walletType}
                    onSuccess={handlePurchase}
                    onFailure={() => closeAllModals('error', 'Payment was rejected or failed.')}
                  />
                ) : null}
                <div className="mt-6 w-full">
                  <button
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                    onClick={() => closeAllModals('error', 'Payment modal closed.')}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

  );
};

export default WalletConnect;
