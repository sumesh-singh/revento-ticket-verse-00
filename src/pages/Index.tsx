
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import EventsPreview from '../components/EventsPreview';
import HowItWorks from '../components/HowItWorks';
import MapPreview from '../components/MapPreview';
import Chatbot from '../components/Chatbot';
import Footer from '../components/Footer';
import Events from '../components/Events';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const [animationReady, setAnimationReady] = useState(false);

  useEffect(() => {
    // Allow animations to start after initial page load
    const timer = setTimeout(() => {
      setAnimationReady(true);
    }, 200);

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

    // Observe all elements with animate-on-scroll class once animation is ready
    if (animationReady) {
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      animatedElements.forEach((el) => observer.observe(el));
    }

    return () => {
      clearTimeout(timer);
      if (animationReady) {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach((el) => observer.unobserve(el));
      }
    };
  }, [animationReady]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Ticket styling */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .event-card-gradient {
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%);
        }
        
        .ticket-card {
          position: relative;
          transition: all 0.3s ease;
          transform-style: preserve-3d;
        }
        
        .ticket-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
        }
        
        .ticket-image {
          position: relative;
          overflow: hidden;
          border-radius: 0.5rem;
        }
        
        .ticket-image::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, #6366f1dd, #8b5cf6dd, #6366f1dd);
          background-size: 200% 200%;
          animation: gradient-shift 5s ease infinite;
          mix-blend-mode: overlay;
          z-index: 1;
          opacity: 0.5;
        }

        /* Animation classes */
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-on-scroll.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}} />
      
      <Navbar />
      <main>
        <Hero />
        <Features />
        <EventsPreview isLoggedIn={isAuthenticated} />
        <Events />
        <HowItWorks />
        <MapPreview />
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
};

export default Index;
