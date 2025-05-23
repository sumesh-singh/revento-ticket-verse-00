
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Demo: check if user is logged in
    // In a real app, this would use auth context or redux
    const checkLoginStatus = () => {
      const hasToken = localStorage.getItem('auth_token');
      setIsLoggedIn(!!hasToken);
    };
    
    checkLoginStatus();
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <section className="pt-28 md:pt-32 pb-16 hero-gradient overflow-hidden">
      <div 
        ref={heroRef} 
        className="container mx-auto px-4 grid md:grid-cols-2 gap-8 md:gap-12 items-center animate-on-scroll"
      >
        <div className="text-center md:text-left flex flex-col items-center md:items-start gap-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
            Smart Access to <span className="bg-clip-text text-transparent bg-gradient-primary">Smarter Events!</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-xl">
            Experience the future of event access with our wallet-based ticketing system. 
            Fast, secure, and rewarding for all student and public events.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start w-full sm:w-auto">
            {isLoggedIn ? (
              <Link to="/dashboard" className="btn-primary flex items-center justify-center gap-2 group">
                <span>My Dashboard</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <>
                <Link to="/auth?mode=signup&role=user" className="btn-primary flex items-center justify-center gap-2 group">
                  <span>Join Now</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/auth?mode=signup&role=organizer" className="btn-secondary flex items-center justify-center gap-2 group">
                  <span>Organize Events</span>
                  <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="relative hidden md:block will-change-transform">
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="relative z-10 h-full max-h-[500px] w-full">
            <img 
              src="public/lovable-uploads/57e0eac2-019e-4bb4-8bc8-94eb92282994.png" 
              alt="Students at an event" 
              className="rounded-2xl shadow-lg object-cover h-full w-full animate-float will-change-transform"
              loading="eager"
            />
          </div>
          <div className="absolute top-5 -right-4 bg-white rounded-lg shadow-lg p-4 z-20 animate-float">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">✓</div>
              <div>
                <p className="font-semibold text-sm">Tickets Verified</p>
                <p className="text-gray-500 text-xs">Blockchain Secured</p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 z-20 animate-float" style={{animationDelay: "1s"}}>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-sm">Rewards Earned</p>
                <p className="text-gray-500 text-xs">+25 points</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
