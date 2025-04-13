
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Filter } from 'lucide-react';
import { Event } from '@/components/EventCard';

const UserEvents = () => {
  const events: Event[] = [
    {
      id: 1,
      name: "Tech Conference 2025",
      date: "April 15, 2025",
      location: "Convention Center",
      category: "Technology",
      image: "/placeholder.svg",
      price: "$99"
    },
    {
      id: 2,
      name: "Music Festival",
      date: "May 20, 2025",
      location: "Central Park",
      category: "Entertainment",
      image: "/placeholder.svg",
      price: "$149"
    },
    {
      id: 3,
      name: "Startup Meetup",
      date: "June 5, 2025",
      location: "Innovation Hub",
      category: "Business",
      image: "/placeholder.svg",
      price: "Free"
    },
    {
      id: 4,
      name: "Design Workshop",
      date: "June 12, 2025",
      location: "Creative Studio",
      category: "Education",
      image: "/placeholder.svg",
      price: "$49"
    },
    {
      id: 5,
      name: "AI Summit",
      date: "July 8, 2025",
      location: "Research Center",
      category: "Technology",
      image: "/placeholder.svg",
      price: "$129"
    },
    {
      id: 6,
      name: "Wellness Retreat",
      date: "July 15, 2025",
      location: "Meditation Center",
      category: "Health",
      image: "/placeholder.svg",
      price: "$79"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Nearby Events</h1>
        <p className="text-muted-foreground mt-2">Discover events happening in your area</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Calendar className="h-4 w-4" />
            <span>All Dates</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <MapPin className="h-4 w-4" />
            <span>5 mi radius</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Users className="h-4 w-4" />
            <span>Any Audience</span>
          </Button>
        </div>
        <Button variant="secondary" size="sm" className="gap-1">
          <Filter className="h-4 w-4" />
          <span>More Filters</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <EventCard key={event.id} event={event} index={index} />
        ))}
      </div>
      
      <Card className="mt-8">
        <CardContent className="pt-6">
          <div className="aspect-video relative rounded-lg overflow-hidden bg-slate-100">
            {/* This would be a real map in production */}
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <MapPin className="h-8 w-8 mx-auto text-gray-400" />
                <p className="text-muted-foreground mt-2">Interactive Map View</p>
                <p className="text-xs text-muted-foreground">Click to show events on map</p>
              </div>
            </div>
            {/* Sample overlay pins */}
            <div className="absolute top-1/4 left-1/3 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs animate-pulse">3</div>
            <div className="absolute top-1/2 right-1/4 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs animate-pulse">2</div>
            <div className="absolute bottom-1/3 left-1/2 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs animate-pulse">1</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const EventCard = ({ event, index }: { event: Event; index: number }) => {
  return (
    <div 
      className="event-card animate-fade-in rounded-lg overflow-hidden border hover:shadow-lg transition-all duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative h-48">
        <img 
          src={event.image} 
          alt={event.name} 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-xs font-medium px-3 py-1 rounded-full">
          {event.category}
        </div>
        {event.price && (
          <div className="absolute top-4 right-4 bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
            {event.price}
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-lg font-bold mb-1">{event.name}</h3>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              <span>{event.location}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 flex justify-between items-center">
        <span className="text-sm text-muted-foreground">3 friends attending</span>
        <Button size="sm">Register</Button>
      </div>
    </div>
  );
};

export default UserEvents;
