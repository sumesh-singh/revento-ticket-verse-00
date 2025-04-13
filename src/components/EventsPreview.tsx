
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface EventPreviewProps {
  isLoggedIn: boolean;
}

const EventsPreview = ({ isLoggedIn }: EventPreviewProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Sample events data
  const events = [
    {
      id: 1,
      title: 'Tech Summit 2025',
      date: 'Apr 28-30, 2025',
      location: 'Convention Center',
      image: 'https://source.unsplash.com/random/300x200/?tech',
      category: 'Technology',
      attendees: 1240
    },
    {
      id: 2,
      title: 'Music Festival',
      date: 'May 15-17, 2025',
      location: 'Central Park',
      image: 'https://source.unsplash.com/random/300x200/?music',
      category: 'Entertainment',
      attendees: 5800
    },
    {
      id: 3,
      title: 'Startup Pitch Night',
      date: 'Apr 22, 2025',
      location: 'Innovation Hub',
      image: 'https://source.unsplash.com/random/300x200/?startup',
      category: 'Business',
      attendees: 380
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50/50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-display font-bold">Upcoming Events</h2>
            <p className="text-gray-600 mt-2">Discover exciting events happening near you</p>
          </div>
          <Link to="/events" className="text-primary font-medium hidden md:block hover:underline">
            View all events →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <div key={event.id} className="group relative will-change-transform">
              {isLoading ? (
                <div className="rounded-xl overflow-hidden shadow-md">
                  <Skeleton className="w-full h-48" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <div className="flex gap-3">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-4 w-1/3" />
                    </div>
                    <Skeleton className="h-10 w-full mt-4" />
                  </div>
                </div>
              ) : (
                <div className={`event-card rounded-xl overflow-hidden shadow-md transition-all duration-300 
                  ${!isLoggedIn ? 'hover:opacity-100 opacity-90 hover:shadow-lg' : 'hover:shadow-lg'}`}>
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className={`w-full h-full object-cover transition-transform duration-500 
                        ${isLoggedIn ? 'group-hover:scale-105' : 'blur-[2px] group-hover:blur-0 group-hover:scale-105'}`}
                    />
                    <div className="event-card-gradient absolute inset-0 flex flex-col justify-end p-5">
                      <div className="flex justify-between items-center">
                        <span className="bg-primary/80 text-white text-xs font-medium py-1 px-2 rounded">
                          {event.category}
                        </span>
                        <span className="bg-white/80 text-gray-800 text-xs font-medium py-1 px-2 rounded flex items-center gap-1">
                          <Users size={12} />
                          {event.attendees.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    
                    {!isLoggedIn && (
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center p-5 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                        <Lock size={40} className="text-white/80 mb-2" />
                        <p className="text-white font-medium text-center">Login to unlock full details</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-5">
                    <h3 className="font-display font-bold text-xl mb-2">{event.title}</h3>
                    <div className="flex flex-col gap-2 mb-4">
                      <div className="flex items-center text-gray-600 text-sm">
                        <Calendar size={16} className="mr-2" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <MapPin size={16} className="mr-2" />
                        {event.location}
                      </div>
                    </div>
                    {isLoggedIn ? (
                      <Button className="w-full group">
                        Register Now
                        <span className="ml-1 group-hover:ml-2 transition-all">→</span>
                      </Button>
                    ) : (
                      <Link to="/auth" className="block">
                        <Button variant="outline" className="w-full">
                          Login to Register
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link to="/events" className="text-primary font-medium hover:underline">
            View all events →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventsPreview;
