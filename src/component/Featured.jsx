import React from 'react'
// import group from '../assets/group.png'
import slider1 from '../assets/slider1.png'
import slider2 from '../assets/slider2.png'
import slider3 from '../assets/slider3.png'
import slider4 from '../assets/slider4.png'
import slider5 from '../assets/slider5.png'

import f1 from "../assets/sliderimg/f1.png"
import f2 from "../assets/sliderimg/f2.png"
import f3 from "../assets/sliderimg/f3.png"
import f4 from "../assets/sliderimg/f4.png"
import f5 from "../assets/sliderimg/f5.png"
import f6 from "../assets/sliderimg/f6.png"

import third1 from "../assets/sliderimg/third1.png"
import third2 from "../assets/sliderimg/third2.png"
import third3 from "../assets/sliderimg/third3.png"
import third4 from "../assets/sliderimg/third4.png"
import third5 from "../assets/sliderimg/third5.png"
import third6 from "../assets/sliderimg/third6.png"


import sec1 from "../assets/sliderimg/sec1.png"
import sec2 from "../assets/sliderimg/sec2.png"
import sec3 from "../assets/sliderimg/sec3.png"
import sec4 from "../assets/sliderimg/sec4.png"
import sec5 from "../assets/sliderimg/sec5.png"
import sec6 from "../assets/sliderimg/sec6.png"

import fourth1 from "../assets/sliderimg/fourth1.png"
import fourth2 from "../assets/sliderimg/fourth2.png"
import fourth3 from "../assets/sliderimg/fourth3.png"
import fourth4 from "../assets/sliderimg/fourth4.png"


const Featured = () => {
  const data = [
    { id: 2, image: f1 },
    { id: 1, image: f2 },
    { id: 3, image: f3 },
    { id: 4, image: f4 },
    { id: 5, image: f5 },
    { id: 1, image: f6 },
    { id: 2, image: f1 },
    { id: 3, image: f3 },
    { id: 4, image: f4 },
    { id: 5, image: f5 },
  ]

  const sliderData3 = [
    { id: 1, image: third1 },
    { id: 2, image: third2 },
    { id: 3, image: third3 },
    { id: 4, image: third4 },
    { id: 5, image: third5 },
    { id: 1, image: third6 },
    { id: 2, image: third1 },
    { id: 3, image: third2 },
    { id: 4, image: third3 },
    { id: 5, image: third6 },
  ]

  const sliderData1 = [
    { id: 1, image: slider1 },
    { id: 2, image: slider2 },
    { id: 3, image: slider3 },
    { id: 4, image: slider4 },
    { id: 5, image: slider5 },
    { id: 1, image: slider1 },
    { id: 2, image: slider2 },
    { id: 3, image: slider3 },
    { id: 4, image: slider4 },
    { id: 5, image: slider5 },
  ]
  const sliderData2 = [
    { id: 1, image: sec1 },
    { id: 2, image: sec2 },
    { id: 3, image: sec3 },
    { id: 4, image: sec4 },
    { id: 5, image: sec5 },
    { id: 1, image: sec6 },
    { id: 2, image: sec2 },
    { id: 3, image: sec3 },
    { id: 4, image: sec4 },
    { id: 5, image: sec5 },
  ]

  const sliderData4 = [
    { id: 1, image: fourth1 },
    { id: 2, image: fourth2 },
    { id: 3, image: fourth3 },
    { id: 4, image: fourth4 },
    { id: 5, image: fourth1 },
    { id: 1, image: fourth3 },
    { id: 2, image: fourth4 },
    { id: 3, image: fourth2 },
    { id: 4, image: fourth1 },
    { id: 5, image: fourth3 },
  ]

  return (

    <div className="p-10 bg-gradient-to-r  overflow-hidden  ">
      {/* Top Slider - Scrolls Left */}
      <div className="slider-container h-28 flex items-center overflow-hidden">
        <div className="slider flex animate-slide-left">
          {[...data, ...data].map((item, index) => (
            <div
              key={`top-${index}-${item.id}`}
              className="flex-shrink-0 px-5 py-1  flex items-center justify-center"
            >
              <img
                src={item.image}
                alt={`Slider ${item.id}`}
                className=" h-20 object-contain"
              />
            </div>
          ))}
        </div>
      </div>


      {/* Top Slider - Scrolls Left */}
      <div className="slider-container h-28 flex  items-center overflow-hidden relative">
        <div className="slider flex scroll-right">
          {[...sliderData3, ...sliderData3].map((item, index) => (
            <div
              key={`top-${index}-${item.id}`}
              className="flex-shrink-0 px-5 py-1 flex items-center justify-center"
            >
              <img
                src={item.image}
                alt={`Slider ${item.id}`}
                className="h-20 object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="slider-container h-28 flex  items-center overflow-hidden">
        <div className="slider flex animate-slide-left">
          {[...sliderData4, ...sliderData4].map((item, index) => (
            <div
              key={`top-${index}-${item.id}`}
              className="flex-shrink-0 px-5 py-1 flex items-center justify-center"
            >
              <img
                src={item.image}
                alt={`Slider ${item.id}`}
                className=" h-20  object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="slider-container h-28 flex  items-center overflow-hidden">
        <div className="slider flex scroll-right">
          {[...sliderData2, ...sliderData2].map((item, index) => (
            <div
              key={`top-${index}-${item.id}`}
              className="flex-shrink-0 px-5 py-1 flex items-center justify-center"
            >
              <img
                src={item.image}
                alt={`Slider ${item.id}`}
                className=" h-20 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Featured