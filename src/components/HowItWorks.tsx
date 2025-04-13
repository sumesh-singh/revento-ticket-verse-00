
import React, { useEffect, useRef } from 'react';
import { Search, UserCheck, QrCode, Award } from 'lucide-react';

const steps = [
  {
    title: 'Browse Events',
    description: 'Find events that match your interests from our extensive catalog.',
    icon: Search,
    color: 'bg-primary'
  },
  {
    title: 'Register',
    description: 'Secure your spot with instant blockchain-based ticketing.',
    icon: UserCheck,
    color: 'bg-secondary'
  },
  {
    title: 'Attend & Scan',
    description: 'Get verified instantly with our QR scan at the event entrance.',
    icon: QrCode,
    color: 'bg-accent'
  },
  {
    title: 'Earn Rewards',
    description: 'Collect points for every event you attend and redeem for perks.',
    icon: Award,
    color: 'bg-emerald-500'
  }
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );

    const stepsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );

    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }

    stepsRef.current.forEach((ref) => {
      if (ref) stepsObserver.observe(ref);
    });

    return () => {
      if (sectionRef.current) {
        sectionObserver.unobserve(sectionRef.current);
      }
      stepsRef.current.forEach((ref) => {
        if (ref) stepsObserver.unobserve(ref);
      });
    };
  }, []);

  return (
    <section className="py-20 bg-gray-50" ref={sectionRef}>
      <div className="container mx-auto px-4 animate-on-scroll">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our simple four-step process makes attending events easier than ever
          </p>
        </div>

        <div className="relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gray-200 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {steps.map((step, index) => (
              <div
                key={step.title}
                ref={(el) => (stepsRef.current[index] = el)}
                className="step-card animate-on-scroll"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`step-number ${step.color}`}>
                  {index + 1}
                </div>
                <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center text-white mb-6`}>
                  <step.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
