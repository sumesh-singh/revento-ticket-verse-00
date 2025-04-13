
import React, { useEffect, useRef } from 'react';
import { Ticket, Map, MessageCircle, Gift } from 'lucide-react';

const featuresData = [
  {
    title: 'Instant Ticketing',
    description: 'Receive and verify tickets in seconds with our blockchain-based smart wallet system.',
    icon: Ticket,
    color: 'bg-primary'
  },
  {
    title: 'Interactive Map',
    description: 'Find events near you with our interactive map showing all upcoming events in your area.',
    icon: Map,
    color: 'bg-secondary'
  },
  {
    title: 'Chatbot Support',
    description: '24/7 assistance with our AI chatbot to answer all your questions instantly.',
    icon: MessageCircle,
    color: 'bg-accent'
  },
  {
    title: 'Rewards System',
    description: 'Earn points for attending events and redeem them for exclusive perks and discounts.',
    icon: Gift,
    color: 'bg-emerald-500'
  }
];

const Features = () => {
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
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

    featureRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      featureRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Revento?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform offers the best features for a seamless event experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature, index) => (
            <div
              key={feature.title}
              ref={(el) => (featureRefs.current[index] = el)}
              className="feature-card animate-on-scroll"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`${feature.color} w-14 h-14 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg`}>
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
