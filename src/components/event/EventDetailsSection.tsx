
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock, Navigation, Bus, Parking } from "lucide-react";
import GoogleMap from "../GoogleMap";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Event } from "@/types";

interface EventDetailsSectionProps {
  event: Event;
}

const EventDetailsSection = ({ event }: EventDetailsSectionProps) => {
  const handleGetDirections = () => {
    // Open Google Maps directions in a new tab
    const encodedAddress = encodeURIComponent(event.location);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank');
    
    toast({
      title: "Opening Directions",
      description: "Google Maps will open in a new tab",
    });
  };

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
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Location</h2>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={handleGetDirections}
            >
              <Navigation className="h-4 w-4" />
              <span>Get Directions</span>
            </Button>
          </div>
        </div>
        
        <div className="mb-4 rounded-xl overflow-hidden border shadow-sm">
          <GoogleMap location={event.location} className="w-full ticket-map" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="bg-muted rounded-lg p-4 flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <Bus className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Public Transport</h3>
              <p className="text-sm text-muted-foreground">Click the bus icon on the map to see public transport options</p>
            </div>
          </div>
          
          <div className="bg-muted rounded-lg p-4 flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <Parking className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Parking Available</h3>
              <p className="text-sm text-muted-foreground">Nearby parking spots are highlighted on the map</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsSection;
