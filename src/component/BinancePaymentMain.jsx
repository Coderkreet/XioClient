import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Swal from "sweetalert2";

const BinancePaymentMain = ({ amount, onSuccess, onFailure, walletType }) => {
  const [BNBAmount, setBNBAmount] = useState(0);
  const [walletConnected, setWalletConnected] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState(import.meta.env.VITE_PAYMENT_ADDRESS);

  useEffect(() => {
    setRecipientAddress(import.meta.env.VITE_PAYMENT_ADDRESS);
  }, []);

  useEffect(() => {
    if (!amount) return;
    setBNBAmount(amount);
  }, [amount]);

  const handleConnectWallet = async () => {
    try {
      if (!window.ethereum) throw new Error("Wallet is not installed.");

      // Wallet type check
      if (walletType === "safepal" && !window.ethereum.isSafePal && !navigator.userAgent.toLowerCase().includes("safepal")) {
        throw new Error("Please use SafePal wallet.");
      }
      if (walletType === "metamask" && !window.ethereum.isMetaMask) {
        throw new Error("Please use MetaMask wallet.");
      }
      if (walletType === "trustwallet" && !window.ethereum.isTrust) {
        throw new Error("Please use Trust Wallet.");
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Ensure BSC network
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x38" }],
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x38",
                chainName: "Binance Smart Chain",
                nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
                rpcUrls: ["https://bsc-dataseed1.binance.org/"],
                blockExplorerUrls: ["https://bscscan.com/"],
              },
            ],
          });
        } else {
          throw switchError;
        }
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      

      console.log("Connected wallet address:", userAddress);
      setWalletConnected(true);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      Swal.fire({
        icon: "error",
        title: "Connection Failed",
        text: error.message || "Failed to connect wallet. Please try again.",
      });
    }
  };

  const handleConnectAndPayment = async () => {
    try {
      if (!window.ethereum) throw new Error("Wallet is not installed.");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      if (!recipientAddress || !ethers.isAddress(recipientAddress)) {
        throw new Error("Invalid recipient address");
      }

      if (Number(BNBAmount) <= 0) {
        throw new Error("BNB amount must be greater than 0");
      }

      const value = ethers.parseEther(BNBAmount.toString());

      console.log("Sending BNB:", value)
      const tx = await signer.sendTransaction({
        to: recipientAddress,
        value,
      });

      await tx.wait();

      console.log("BNB Transaction hash:", tx.hash);
      await onSuccess({
        txResponse: tx,
        amount: BNBAmount,
        recipientAddress,
        userAddress,
      });
    } catch (error) {
      console.error("Error during BNB payment:", error);
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: error.message || "Failed to send BNB. Please try again.",
      });
      onFailure();
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-white mb-2">
          Pay <span className="text-blue-400">{BNBAmount}</span> BNB
        </h3>
        <p className="text-slate-400 text-sm">
          Please connect your wallet to proceed with the payment
        </p>
      </div>

      <div className="space-y-4">
        {!walletConnected ? (
          <button
            onClick={handleConnectWallet}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Connect Wallet
          </button>
        ) : (
          <div className="text-center">
            <p className="text-green-400 text-lg font-medium mb-4">
              Wallet Connected Successfully
            </p>
            <button
              onClick={handleConnectAndPayment}
              disabled={!walletConnected || !recipientAddress}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M8 12H16M16 12L12 8M16 12L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Pay BNB
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BinancePaymentMain;
