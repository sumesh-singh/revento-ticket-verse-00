
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, QrCode, Info } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useAuth } from '@/context/AuthContext';

// Function to get gradient based on category
const getCategoryGradient = (category: string) => {
  const gradients = {
    'Technology': 'from-blue-500 to-indigo-600',
    'Entertainment': 'from-pink-500 to-rose-600',
    'Business': 'from-emerald-500 to-teal-600',
    'Education': 'from-amber-500 to-orange-600',
    'Sports': 'from-green-500 to-lime-600',
    'Art': 'from-violet-500 to-purple-600',
    'Food': 'from-yellow-500 to-amber-600',
    'Health': 'from-cyan-500 to-sky-600',
  };
  
  return gradients[category] || 'from-gray-500 to-gray-700';
};

interface Event {
  id: string | undefined;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image: string;
}

interface TicketDisplayProps {
  event: Event;
}

const TicketDisplay = ({ event }: TicketDisplayProps) => {
  const { user } = useAuth();
  const [ticketId, setTicketId] = useState('');
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  useEffect(() => {
    // Generate a unique ticket ID
    const uniqueId = `TIX-${Date.now().toString(36).toUpperCase()}`;
    setTicketId(uniqueId);
  }, []);
  
  const gradientClasses = getCategoryGradient(event.category);
  
  return (
    <Card className="overflow-hidden">
      <div className="p-4 bg-secondary">
        <h3 className="text-lg font-semibold mb-2">Ticket Preview</h3>
        <p className="text-sm text-muted-foreground">How your ticket will look after registration</p>
      </div>
      
      <CardContent className="p-4">
        <div className="ticket-card relative overflow-hidden rounded-lg border p-1">
          <div className={`bg-gradient-to-r ${gradientClasses} absolute inset-0 opacity-20 z-0`}></div>
          
          <div className="relative z-10 p-3">
            <div className="flex justify-between items-start mb-3">
              <div>
                <Badge className="mb-2">{event.category}</Badge>
                <h4 className="font-bold text-lg leading-tight">{event.title}</h4>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  <span>{event.date} • {event.time}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <MapPin className="h-3.5 w-3.5 mr-1" />
                  <span>{event.location}</span>
                </div>
              </div>
              
              <div className="relative">
                <div 
                  className={`w-16 h-16 bg-white rounded-md shadow-md flex items-center justify-center ${isImageLoaded ? 'opacity-100' : 'animate-pulse bg-gray-200'}`}
                >
                  {isImageLoaded ? (
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticketId}`} 
                      alt="QR Code"
                      className="w-14 h-14"
                      onLoad={() => setIsImageLoaded(true)}
                    />
                  ) : (
                    <QrCode className="w-10 h-10 text-gray-400" />
                  )}
                </div>
                
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <button className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                      <Info className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">About Your Ticket</h4>
                      <p className="text-xs text-muted-foreground">
                        Your ticket includes a unique QR code for easy check-in. 
                        After registration, this ticket will be securely stored and verified.
                      </p>
                      <div className="text-xs">
                        <p>ID: {ticketId}</p>
                        <p>Owner: {user?.name || 'You'}</p>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </div>
            
            <div 
              className="ticket-image aspect-video overflow-hidden rounded-md relative mb-3"
              style={{ opacity: isImageLoaded ? 1 : 0.7 }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent z-0"></div>
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover"
                loading="lazy"
                onLoad={() => setIsImageLoaded(true)}
              />
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <div className="font-medium">
                ID: {ticketId.slice(0, 6)}...
              </div>
              <div className="text-right text-xs text-muted-foreground">
                Attendee: {user?.name || 'Preview Only'}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketDisplay;
