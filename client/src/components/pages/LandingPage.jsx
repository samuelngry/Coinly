import React from 'react'
import Navbar from '../landing/Navbar';
import HeroSection from '../landing/HeroSection';
import FeatureSection from '../landing/FeatureSection';
import Playbook from '../landing/Playbook';
import Testimonials from '../landing/Testimonials';
import Cta from '../landing/Cta';
import Footer from '../landing/Footer';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
  
        if (token && user) {
            const parsedUser = JSON.parse(user);
  
            if (parsedUser.onboarding_completed) {
                navigate('/home');
            } else {
                navigate('/onboard');
            }
        } 
    }, [navigate])

  return (
    <div>
      <>
        <Navbar />
        <div className="max-w-6xl mx-auto pt-4 lg:pt-30 px-6">
          <HeroSection />
          <FeatureSection />
          <Testimonials />
        </div>
        <Cta />
        <Footer />
      </>
    </div>
  );
};

export default LandingPage;
