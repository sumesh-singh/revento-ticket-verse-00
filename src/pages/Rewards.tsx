
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Gift, Trophy, Ticket, Calendar, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Rewards = () => {
  useEffect(() => {
    // Animation effect for elements
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
      
      <main className="flex-1 pt-28">
        <section className="py-16 hero-gradient">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 animate-on-scroll">
              Earn rewards for every win in 
              <span className="bg-clip-text text-transparent bg-gradient-primary"> college events & hackathons!</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto animate-on-scroll">
              Participate in events, earn points, and redeem exclusive rewards. The more you engage, the more you earn!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll">
              <Link to="/auth?mode=signup&role=user" className="btn-primary flex items-center justify-center gap-2">
                <span>Join Revento</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/events" className="btn-secondary flex items-center justify-center gap-2">
                <span>Browse Events</span>
              </Link>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-on-scroll">
              <h2 className="text-3xl font-display font-bold mb-4">How It Works</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Earning rewards is simple with our point-based system. Here's how you can start collecting points today.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="step-card animate-on-scroll">
                <div className="step-number">1</div>
                <h3 className="text-xl font-bold mb-2">Attend Events</h3>
                <p className="text-gray-600">
                  Participate in campus events, hackathons, or workshops and get your ticket scanned.
                </p>
              </div>
              
              <div className="step-card animate-on-scroll" style={{animationDelay: "0.2s"}}>
                <div className="step-number">2</div>
                <h3 className="text-xl font-bold mb-2">Earn Points</h3>
                <p className="text-gray-600">
                  Get points for attendance, participation, winning competitions, and completing challenges.
                </p>
              </div>
              
              <div className="step-card animate-on-scroll" style={{animationDelay: "0.4s"}}>
                <div className="step-number">3</div>
                <h3 className="text-xl font-bold mb-2">Redeem Rewards</h3>
                <p className="text-gray-600">
                  Use your points to claim exclusive rewards, discounts, and special experiences.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-on-scroll">
              <h2 className="text-3xl font-display font-bold mb-4">Available Rewards</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore the exciting rewards you can earn with your Revento points.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Campus Store Voucher",
                  points: 500,
                  icon: <Gift className="h-10 w-10 text-primary" />,
                  description: "Get a $10 voucher for your campus store",
                  limited: false
                },
                {
                  title: "Premium Event Access",
                  points: 1000,
                  icon: <Ticket className="h-10 w-10 text-primary" />,
                  description: "VIP access to premium campus events",
                  limited: true
                },
                {
                  title: "Tech Conference Pass",
                  points: 2500,
                  icon: <Calendar className="h-10 w-10 text-primary" />,
                  description: "Free pass to an upcoming tech conference",
                  limited: true
                },
                {
                  title: "Mentorship Session",
                  points: 1500,
                  icon: <Star className="h-10 w-10 text-primary" />,
                  description: "One-hour mentorship with industry professionals",
                  limited: false
                },
                {
                  title: "Campus Merch Bundle",
                  points: 750,
                  icon: <Gift className="h-10 w-10 text-primary" />,
                  description: "Exclusive campus merchandise bundle",
                  limited: false
                },
                {
                  title: "Hackathon Fast-Track",
                  points: 1200,
                  icon: <Trophy className="h-10 w-10 text-primary" />,
                  description: "Guaranteed spot in the next campus hackathon",
                  limited: true
                }
              ].map((reward, index) => (
                <div 
                  key={index} 
                  className="feature-card animate-on-scroll" 
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      {reward.icon}
                    </div>
                    <div className="flex items-center py-1 px-3 bg-gradient-primary text-white rounded-full text-sm font-medium">
                      {reward.points} points
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{reward.title}</h3>
                  <p className="text-gray-600 mb-4">{reward.description}</p>
                  {reward.limited && (
                    <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
                      Limited availability
                    </span>
                  )}
                  <Button className="w-full mt-4">Redeem Reward</Button>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-on-scroll">
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <h2 className="text-3xl font-display font-bold mb-4">Ready to Start Earning?</h2>
                  <p className="text-lg text-gray-600 mb-6">
                    Create your Revento account today and begin collecting points at your next event.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/auth?mode=signup&role=user" className="btn-primary flex items-center justify-center gap-2">
                      <span>Sign Up Now</span>
                      <ArrowRight size={18} />
                    </Link>
                    <Link to="/events" className="btn-secondary flex items-center justify-center gap-2">
                      <span>Browse Events</span>
                    </Link>
                  </div>
                </div>
                <div className="bg-gradient-primary min-h-[300px] flex items-center justify-center p-8">
                  <img 
                    src="https://illustrations.popsy.co/white/digital-nomad.svg" 
                    alt="Students earning rewards" 
                    className="w-full max-w-md mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Rewards;
