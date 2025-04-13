
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import EventsPreview from '../components/EventsPreview';
import HowItWorks from '../components/HowItWorks';
import MapPreview from '../components/MapPreview';
import Chatbot from '../components/Chatbot';
import Footer from '../components/Footer';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Demo: check if user is logged in
    // In a real app, this would use auth context or redux
    const checkLoginStatus = () => {
      const hasToken = localStorage.getItem('auth_token');
      setIsLoggedIn(!!hasToken);
    };
    
    checkLoginStatus();

    // Intersection Observer for animation-on-scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all elements with animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Toggle demo login/logout (for testing only)
  const toggleLogin = () => {
    if (isLoggedIn) {
      localStorage.removeItem('auth_token');
      setIsLoggedIn(false);
    } else {
      localStorage.setItem('auth_token', 'demo_token');
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <EventsPreview isLoggedIn={isLoggedIn} />
        <HowItWorks />
        <MapPreview />
        
        {/* Demo toggle (for development only) - Remove for production */}
        <div className="fixed bottom-24 right-6 z-40">
          <button 
            onClick={toggleLogin}
            className="bg-secondary text-white rounded-full p-3 shadow-lg text-sm flex items-center gap-2"
          >
            {isLoggedIn ? 'Demo: Logout' : 'Demo: Login'}
          </button>
        </div>
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
};

export default Index;
