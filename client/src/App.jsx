import React from 'react'
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeatureSection from './components/FeatureSection';
import Playbook from './components/Playbook';
import Testimonials from './components/Testimonials';

const App = () => {
  return (
    <div style={{ backgroundColor: 'var(--old-lace)' }}>
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto pt-20 px-6">
          <HeroSection />
          <FeatureSection />
          <Playbook />
          <Testimonials />
        </div>
      </>
    </div>
  );
};

export default App;
