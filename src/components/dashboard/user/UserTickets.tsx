import React, { useState, useEffect } from 'react';
import { QrCode as QrCodeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import TicketCard from './TicketCard';
import TicketSkeleton from './TicketSkeleton';
import { Ticket, TicketStatus, PaymentMethod } from '@/types';

const UserTickets = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTickets = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const dummyTickets: Ticket[] = [
          {
            id: 1,
            eventName: "Tech Conference 2025",
            date: "April 15, 2025",
            time: "9:00 AM - 5:00 PM",
            location: "Convention Center, Downtown",
            ticketType: "VIP",
            ticketNumber: "TC2025-VIP-0042",
            status: "upcoming",
            image: "/placeholder.svg",
            paymentMethod: "crypto",
            txHash: "0x7cb68c9d2bbaa39b2b2393f3b2c99ea3bd18f6b34c8e424c5ef3c4b9e5b95d7c",
            ipfsCid: "QmTK6FtdNmx6h23LHdpzQDk9LjZZtzQwVPXHXH5ScvdFQF",
            blockchain: "Ethereum",
            tokenId: "42",
            purchaseDate: "2025-03-15T14:32:21Z"
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
            image: "/placeholder.svg",
            paymentMethod: "stellar",
            txHash: "3389e9f0f1a65f19736cacf544c2e825313e8447f569233bb8db39aa607c8889",
            ipfsCid: "QmW8er4QxTGZUVv6noCb5a28KFse2gkSY9kcETaFpTQW7d",
            blockchain: "Stellar",
            tokenId: "1204",
            purchaseDate: "2025-04-01T09:15:43Z"
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
            image: "/placeholder.svg",
            paymentMethod: "fiat",
            txHash: null,
            ipfsCid: null,
            blockchain: null,
            tokenId: null,
            purchaseDate: "2025-02-20T16:27:55Z"
          }
        ];
        
        setTickets(dummyTickets);
      } catch (error) {
        console.error("Error loading tickets:", error);
        toast({
          title: "Failed to load tickets",
          description: "There was a problem fetching your tickets. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTickets();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Tickets</h1>
        <p className="text-muted-foreground mt-2">View and manage your event tickets</p>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <TicketSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          {tickets.length === 0 ? (
            <div className="text-center py-12 bg-muted/20 rounded-lg border border-dashed">
              <QrCodeIcon className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No tickets yet</h3>
              <p className="mt-2 text-muted-foreground">When you purchase tickets for events, they'll appear here.</p>
              <Button 
                onClick={() => window.location.href = '/events'}
                className="mt-4"
              >
                Browse Events
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserTickets;
