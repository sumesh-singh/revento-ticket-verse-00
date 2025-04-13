
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import EventsPreview from '../components/EventsPreview';
import HowItWorks from '../components/HowItWorks';
import MapPreview from '../components/MapPreview';
import Chatbot from '../components/Chatbot';
import Footer from '../components/Footer';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <EventsPreview isLoggedIn={isAuthenticated} />
        <HowItWorks />
        <MapPreview />
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
};

export default Index;
