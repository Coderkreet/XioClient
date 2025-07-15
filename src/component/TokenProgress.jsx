import React from 'react';
import spiral from "../assets/spiral.png"
const TokenProgress = () => {
    return (
        <div>
        <div className="w-full font1 px-5 lg:p-0  flex flex-col lg:flex-row justify-between items-center gap-10">
            <div className="text-center md:ml-20">
                <p className="text-sm mb-4">ICO Will Start In..</p>
                <div className="flex gap-4 justify-center">
                    {[
                        { label: 'DAYS', value: '91' },
                        { label: 'HOURS', value: '3' },
                        { label: 'MINS', value: '2' },
                        { label: 'SECS', value: '3' }
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className="w-16 h-16 bg-white/10 rounded-full flex flex-col justify-center items-center"
                        >
                            <span className="text-lg font-bold">{item.value}</span>
                            <span className="text-xs text-gray-400">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full max-w-xl p-10">
                <div className="flex justify-between text-sm mb-1">
                    <span>Raised - <strong>1,450 Tokens</strong></span>
                    <span>Target - <strong>150,000 Tokens</strong></span>
                </div>

                <div className="relative w-full h-2 rounded-full bg-gradient-to-r from-[#A863E2] to-[#2D005F]">
                    <div className="absolute top-0 left-0 h-2 bg-white rounded-full" style={{ width: '1%' }}></div>
                </div>

                <div className="flex justify-between text-xs text-gray-300 mt-2">
                    <span>| PRE SELL</span>
                    <span>| SOFT CAP</span>
                    <span>| BONUS</span>
                </div>
            </div>

            </div>
           
           
        </div>
    );
};

export default TokenProgress;
