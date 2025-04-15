
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, Calendar, Download, QrCode as QrCodeIcon } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { toast } from '@/hooks/use-toast';

const UserTickets = () => {
  const dummyTickets = [
    {
      id: 1,
      eventName: "Tech Conference 2025",
      date: "April 15, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Convention Center, Downtown",
      ticketType: "VIP",
      ticketNumber: "TC2025-VIP-0042",
      status: "upcoming",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      eventName: "Music Festival",
      date: "May 20, 2025",
      time: "4:00 PM - 11:00 PM",
      location: "Central Park, Eastside",
      ticketType: "General Admission",
      ticketNumber: "MF2025-GA-1204",
      status: "upcoming",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      eventName: "Startup Meetup",
      date: "March 10, 2025",
      time: "7:00 PM - 9:00 PM",
      location: "Innovation Hub",
      ticketType: "Standard",
      ticketNumber: "SM2025-STD-0342",
      status: "attended",
      image: "/placeholder.svg"
    }
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Tickets</h1>
        <p className="text-muted-foreground mt-2">View and manage your event tickets</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyTickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

interface TicketCardProps {
  ticket: {
    id: number;
    eventName: string;
    date: string;
    time: string;
    location: string;
    ticketType: string;
    ticketNumber: string;
    status: string;
    image: string;
  };
}

const TicketCard = ({ ticket }: TicketCardProps) => {
  const [qrLoaded, setQrLoaded] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);

  // Handle ticket sharing functionality
  const handleShareTicket = () => {
    if (navigator.share) {
      navigator.share({
        title: `My Ticket to ${ticket.eventName}`,
        text: `Check out my ticket to ${ticket.eventName}!`,
        url: window.location.href,
      }).catch(error => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Ticket link copied to clipboard",
      });
    }
  };

  // Generate QR code URL for this ticket
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(ticket.ticketNumber)}&color=6366F1&bgcolor=FFFFFF`;

  useEffect(() => {
    // Show QR code after a short delay for better UX
    const timer = setTimeout(() => {
      setShowQrCode(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg group event-card">
      <div className="relative h-48">
        <img 
          src={ticket.image} 
          alt={ticket.eventName} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-medium px-3 py-1 rounded-full ${
            ticket.status === 'upcoming' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            {ticket.status === 'upcoming' ? 'Upcoming' : 'Attended'}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/90 text-gray-800">
            {ticket.ticketType}
          </span>
        </div>
      </div>
      
      <CardHeader>
        <CardTitle>{ticket.eventName}</CardTitle>
        <CardDescription>
          {ticket.date} • {ticket.time}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-2">
        <div>
          <p className="text-sm text-muted-foreground">Location</p>
          <p className="font-medium">{ticket.location}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Ticket #</p>
          <p className="font-medium">{ticket.ticketNumber}</p>
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="w-full flex justify-center">
                <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden relative">
                  {showQrCode ? (
                    <>
                      {!qrLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <QrCodeIcon className="h-12 w-12 text-gray-300 animate-pulse" />
                        </div>
                      )}
                      <img 
                        src={qrCodeUrl}
                        alt={`QR Code for ${ticket.ticketNumber}`}
                        className={`w-full h-full object-cover transition-opacity duration-300 ${qrLoaded ? 'opacity-100' : 'opacity-0'}`}
                        onLoad={() => setQrLoaded(true)}
                      />
                    </>
                  ) : (
                    <QrCodeIcon className="h-12 w-12 text-gray-300" />
                  )}
                </div>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">Ticket Information</h4>
                  <p className="text-sm">
                    Present this QR code at the event entrance for quick check-in.
                  </p>
                  <div className="text-sm text-muted-foreground mt-2">
                    <p>Event: {ticket.eventName}</p>
                    <p>Date: {ticket.date}</p>
                    <p>Type: {ticket.ticketType}</p>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </CardContent>
      
      <CardFooter className="grid grid-cols-3 gap-2">
        <Button variant="outline" size="sm" className="w-full" onClick={handleShareTicket}>
          <Share2 className="h-4 w-4 mr-1" />
          <span>Share</span>
        </Button>
        <Button variant="outline" size="sm" className="w-full">
          <Calendar className="h-4 w-4 mr-1" />
          <span>Add</span>
        </Button>
        <Button variant="outline" size="sm" className="w-full">
          <Download className="h-4 w-4 mr-1" />
          <span>Save</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserTickets;
