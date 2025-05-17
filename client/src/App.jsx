import React from 'react'
import Navbar from './components/landing/Navbar';
import HeroSection from './components/landing/HeroSection';
import FeatureSection from './components/landing/FeatureSection';
import Playbook from './components/landing/Playbook';
import Testimonials from './components/landing/Testimonials';
import Cta from './components/landing/Cta';
import Footer from './components/landing/Footer';

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
        <Cta />
        <Footer />
      </>
    </div>
  );
};

export default App;
