import React from 'react'
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeatureSection from './components/FeatureSection';

const App = () => {
  return (
    <div className='bg-neutral-100'>
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto pt-20 px-6">
          <HeroSection />
          <FeatureSection />
        </div>
      </>
    </div>
  );
};

export default App;
