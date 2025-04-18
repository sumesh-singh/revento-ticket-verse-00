import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import GoogleMap from "../GoogleMap";

interface EventDetailsSectionProps {
  event: {
    category: string;
    price: string;
    title: string;
    date: string;
    time: string;
    location: string;
    attendees: number;
    description: string;
  };
}

const EventDetailsSection = ({ event }: EventDetailsSectionProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-2">
        <Badge>{event.category}</Badge>
        <Badge variant="outline" className="text-green-600 bg-green-50">
          {event.price}
        </Badge>
      </div>
      
      <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center text-gray-600">
          <Calendar className="h-5 w-5 mr-2 flex-shrink-0" />
          <span>{event.date}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <Clock className="h-5 w-5 mr-2 flex-shrink-0" />
          <span>{event.time}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <MapPin className="h-5 w-5 mr-2 flex-shrink-0" />
          <span>{event.location}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <Users className="h-5 w-5 mr-2 flex-shrink-0" />
          <span>{event.attendees} attendees</span>
        </div>
      </div>
      
      <div className="prose max-w-none">
        <h2 className="text-2xl font-semibold mb-4">About the Event</h2>
        <p className="text-gray-700">{event.description}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Location</h2>
        <GoogleMap location={event.location} className="w-full" />
      </div>
    </div>
  );
};

export default EventDetailsSection;
