
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TicketDisplay from '../components/TicketDisplay';
import EventRegistration from '../components/EventRegistration';
import TicketPurchase from '../components/TicketPurchase';
import EventDetailsSection from '../components/event/EventDetailsSection';
import EventActions from '../components/event/EventActions';
import { toast } from '@/hooks/use-toast';
import { Event, TicketTier } from '@/types';
import type { TicketTier } from '../types'; 

type Event = {
  // ... other props
  ticketTypes: TicketTier[];
  id: number;
  name: string;
  description: string;
};

const ticketTiers: TicketTier[] = [
  {
    id: "standard",
    name: "Standard Admission",
    price: 99,
    currency: "USD",
    description: "General access to all main event areas and sessions",
    benefits: ["Access to all sessions", "Coffee and snacks", "Conference materials"],
    available: true,
    maxPerTransaction: 5
  },
  {
    id: "vip",
    name: "VIP Access",
    price: 299,
    currency: "USD",
    description: "Premium experience with exclusive perks and priority access",
    benefits: ["Priority seating", "Exclusive networking event", "Speaker meet & greet", "Premium swag bag"],
    available: true,
    maxPerTransaction: 3
  },
  {
    id: "workshop",
    name: "Workshop Bundle",
    price: 199,
    currency: "USD",
    description: "Standard admission plus access to all workshop sessions",
    benefits: ["Standard admission benefits", "Hands-on workshops", "Certificate of completion"],
    available: false,
    maxPerTransaction: 2
  }
];

const EventDetail = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [showRegistration, setShowRegistration] = useState(false);
  
  const event: Event = {
    id: eventId || "",
    title: "Tech Conference 2025",
    date: "April 15, 2025",
    time: "10:00 AM - 5:00 PM",
    location: "Convention Center, Downtown",
    description: "Join us for the most anticipated tech event of the year! Connect with industry leaders, discover cutting-edge technologies, and expand your network.",
    category: "Technology",
    price: "$99",
    attendees: 248,
    organizer: "Tech Events Ltd",
    image: "https://source.unsplash.com/random/1200x600/?tech,conference",
    ticketTiers: ticketTiers,
    ticketTypes: ticketTiers
  };

  const handleGetTicket = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to continue with registration",
        variant: "destructive",
      });
      // Save the current event to sessionStorage for redirect after login
      sessionStorage.setItem('pendingEventRegistration', eventId);
      navigate('/auth');
      return;
    }
    
    setShowRegistration(true);
  };
  
  const handleShareEvent = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Check out this event: ${event.title}`,
        url: window.location.href,
      })
      .catch(error => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Event link copied to clipboard",
      });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <EventActions eventTitle={event.title} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Event details */}
            <div className="lg:col-span-2">
              <div className="rounded-xl overflow-hidden mb-6">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-[400px] object-cover"
                  loading="lazy"
                  aria-label={`Image for event: ${event.title}`}
                />
              </div>
              
              <EventDetailsSection event={event} />

              {showRegistration ? (
                <EventRegistration 
                  event={event}
                  onCancel={() => setShowRegistration(false)}
                />
              ) : null}
            </div>
            
            {/* Right column - Ticket and registration */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {!showRegistration && (
                  <TicketPurchase
                    event={{
                      id: event.id,
                      title: event.title,
                      date: event.date,
                      location: event.location,
                      image: event.image
                    }}
                    ticketTiers={ticketTiers}
                  />
                )}
                
                {/* Ticket Preview */}
                {isAuthenticated && !showRegistration && (
                  <TicketDisplay event={event} />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventDetail;
