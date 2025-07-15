import React from "react";
import coin from "../assets/coins.png";
import btn from '../assets/btn.png';
import shadow1 from "../assets/shadow1.png";

const saleDetails = [
    {
        label: "Start",
        value: "June 1, 2025 (00:00 GMT)"
    },
    {
        label: "End",
        value: "June 30, 2025 (00:00 GMT)"
    },
    {
        label: "Number of Tokens for Sale",
        value: "1,000,000 Tokens"
    },
    {
        label: "Tokens exchange rate",
        value: "1 ETH = 400 XIO | 1 BNB = 150 XIO"
    },
    {
        label: "Minimal Transaction",
        value: "0.1 ETH / 0.1 BNB"
    },
    {
        label: "Acceptable currencies",
        value: "ETH, BNB, etc."
    }
];

export default function ICOTokenSale() {
    return (
        <section className="md:px-10  px-4  font1">
            <div className="max-w-7xl mx-auto relative">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                    <div className="flex flex-col gap-5 items-start lg:w-1/3">
                        <h1 className="bg-gradient-to-r from-[#5E2FF4] via-[#C570FB] to-[#5E2FF4] bg-clip-text text-transparent uppercase font-bold">ICO coindox Token</h1>
                        <h2 className="md:text-4xl text-3xl lg:text-4xl  font-bold mb-6">ICO Tokens<br />Details and Sale</h2>
                        <img src={coin} alt="" className="" />
                    </div>

                    <div className="lg:w-2/3 w-full space-y-8">
                        <div className="flex flex-wrap justify-center gap-4 text-sm">
                            <button className="px-10 py-2 border border-white/40 font2 rounded-md font-semibold" style={{ backgroundImage: `url(${btn})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                Token Name: XIO
                            </button>
                            <button className="px-10 py-2 border border-white/40 font2 rounded-md font-semibold" style={{ backgroundImage: `url(${btn})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                Ticker: XIO
                            </button>
                            <button className="px-10 py-2 border border-white/40 font2 rounded-md font-semibold" style={{ backgroundImage: `url(${btn})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                Chain: BNB
                            </button>
                        </div>

                        <p className="text-text_color font-semibold  max-w-2xl mx-auto leading-tight">
                            Our token distribution ensures a robust ecosystem, enabling us to enhance pre-sale sales, marketing, liquidity staking, and support for research and development, all aimed at fostering sustainable growth and community engagement.
                        </p>
                        {/* <div className="relative w-full h-auto before:content-[''] before:absolute before:-top-10  md:before:-left-[4.6%] before:rounded-full md:before:w-[81%] before:w-[100%] before:h-1 before:bg-[#5E2FF4]">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-16">
                                {saleDetails.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-[#1A1730] border border-[#2E2B50] p-4 rounded-2xl  relative before:content-[''] before:absolute before:-top-10  before:-left-[-49%] before:w-1 before:h-11 before:rounded-full before:bg-[#5E2FF4]"
                                    >
                                        <div className="w-5 h-5 rounded-full bg-red-500 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                                        <h4 className="text-sm text-gray-400 mb-1">{item.label}</h4>
                                        <p className="text-base text-white font-medium">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div> */}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10">
                            {saleDetails.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-[#1A1730] border border-[#2E2B50] p-4 rounded-2xl  relative "
                                >
                                    <h4 className="text-sm text-gray-400 mb-1">{item.label}</h4>
                                    <p className="text-base text-white font-medium">{item.value}</p>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

                <div className="absolute top-0 left-0  w-1/2 h-full pointer-events-none">
                    <img src={shadow1} className="w-full h-full" alt="" />
                </div>
            </div>
        </section>
    );
}