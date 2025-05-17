import React from 'react'
import Navbar from '../landing/Navbar';
import HeroSection from '../landing/HeroSection';
import FeatureSection from '../landing/FeatureSection';
import Playbook from '../landing/Playbook';
import Testimonials from '../landing/Testimonials';
import Cta from '../landing/Cta';
import Footer from '../landing/Footer';

const LandingPage = () => {
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

export default LandingPage;
