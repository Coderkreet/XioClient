import React, { useEffect } from 'react';
import Navbar from '../component/Navbar';
import HeroSection from '../component/HeroSection';
import TokenProgress from '../component/TokenProgress';
import PlatformSection from '../component/PlatformSection';
import EcosystemSection from '../component/EcosystemSection';
import OurProducts from '../component/OurProducts';
import RecentEvents from '../component/RecentEvents';
import FaqSection from '../component/FaqSection';
import Footer from '../component/Footer';
import Slider from '../component/Slider';
import Featured from '../component/Featured';
import Choose from '../component/Choose';
import ProjectPlan from '../component/ProjectPlan';
import ICOTokenSale from '../component/ICOTokenSale';
import ListedOnSection from '../component/ListedOnSection';
import Overview from '../component/Overview';
import EventsSection from '../component/EventsSection';
import TokenomicsTabs from '../component/TokenomicsSection';

import slider1 from '../assets/slider1.png'
import slider2 from '../assets/slider2.png'
import slider3 from '../assets/slider3.png'
import slider4 from '../assets/slider4.png'
import slider5 from '../assets/slider5.png'
import WalletConnect from '../component/WalletConnect';
import NewsListOnSection from '../component/NewsListOnSection';
import TokenImportGuide from '../component/TokenImportGuide';


const Landing = () => {
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
   useEffect(() => {
    // Always scroll to top on mount
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, 10);
  }, []);
  
  return (
    <div className="bg-gradient-to-b from-[#433C73] via-[#1b0a2d] to-[#120540] text-text_color scroll-smooth">
      <div className="p-4">
        <Navbar />
      </div>

      <div className='' id="home">
        <HeroSection />
      </div>



      <div  id="platform">
        <PlatformSection />
      </div>
      <div id="xiocoin-blockchain">

        <WalletConnect/>

      </div>
      {/* <Slider data={sliderData1} direction="left" /> */}
     
      <Overview />

      <ListedOnSection />

      <div id="ecosystem">
        <EcosystemSection />
      </div>

      <div id="products">
        <OurProducts />
      </div>

      <div id="roadmap">
        <ProjectPlan />
      </div>

      <div id="tokenomics">
        <TokenomicsTabs />
      </div>

      <div id="">
        <NewsListOnSection />
      </div>


      <TokenImportGuide />

      {/* <div id="project-plan">
        <ProjectPlan />
      </div> */}





      {/* <ICOTokenSale />

      <Featured   /> */}


      <div id="events">
        <RecentEvents />
      </div>

{/* Faq */}
      <div id="faq">
        <FaqSection />
      </div>
{/* Blog */}
      {/* <div id="blogs">
        <div className="text-center py-10">Blogs Section Placeholder</div>
      </div> */}


{/* pending */}
      {/* <div id="mr-mint-backchain">
        <div className="text-center py-10">Mr Mint Backchain Section Placeholder</div>
      </div> */}

      <Footer />
    </div>
  );
};

export default Landing;