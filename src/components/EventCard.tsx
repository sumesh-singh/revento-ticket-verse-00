
import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  category: string;
  image: string;
  price?: string;
}

const EventCard: React.FC<{ event: Event; index: number }> = ({ event, index }) => {
  return (
    <div 
      className="event-card animate-on-scroll"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Link to={`/events/${event.id}`}>
        <div className="relative h-80">
          <img 
            src={event.image} 
            alt={event.name} 
            className="w-full h-full object-cover object-center"
          />
          <div className="event-card-gradient"></div>
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-xs font-medium px-3 py-1 rounded-full">
            {event.category}
          </div>
          {event.price && (
            <div className="absolute top-4 right-4 bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
              {event.price}
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-xl font-bold mb-2">{event.name}</h3>
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
            <button className="mt-4 bg-white text-primary font-medium text-sm py-2 px-4 rounded-lg hover:bg-primary hover:text-white transition-all duration-300">
              Register Now
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
