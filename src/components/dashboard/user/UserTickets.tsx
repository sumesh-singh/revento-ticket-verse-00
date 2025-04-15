
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, Calendar, Download, QrCode as QrCodeIcon, ExternalLink, Copy, CheckCircle2 } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

const UserTickets = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // This would be replaced with an actual API call in a real implementation
  useEffect(() => {
    const loadTickets = async () => {
      setIsLoading(true);
      try {
        // Simulate API call to fetch user tickets
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock ticket data
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
            <Card key={i} className="overflow-hidden">
              <div className="h-48 bg-gray-200 animate-pulse"></div>
              <CardHeader>
                <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded mt-2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full grid grid-cols-3 gap-2">
                  <div className="h-9 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-9 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-9 bg-gray-200 animate-pulse rounded"></div>
                </div>
              </CardFooter>
            </Card>
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
    paymentMethod?: 'crypto' | 'stellar' | 'fiat';
    txHash?: string | null;
    ipfsCid?: string | null;
    blockchain?: string | null;
    tokenId?: string | null;
    purchaseDate?: string;
  };
}

const TicketCard = ({ ticket }: TicketCardProps) => {
  const [qrLoaded, setQrLoaded] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [copied, setCopied] = useState(false);

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

  // Copy blockchain transaction hash to clipboard
  const copyTxHash = () => {
    if (!ticket.txHash) return;
    
    navigator.clipboard.writeText(ticket.txHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    toast({
      title: "Copied to clipboard",
      description: "Transaction hash copied",
    });
  };

  // Generate QR code URL for this ticket
  // In a real implementation, this would encode more information and possibly include blockchain verification data
  const qrCodeUrl = ticket.txHash 
    ? `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(ticket.txHash)}&color=6366F1&bgcolor=FFFFFF`
    : `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(ticket.ticketNumber)}&color=6366F1&bgcolor=FFFFFF`;

  useEffect(() => {
    // Show QR code after a short delay for better UX
    const timer = setTimeout(() => {
      setShowQrCode(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Get the appropriate blockchain explorer URL based on the blockchain
  const getExplorerUrl = () => {
    if (!ticket.txHash) return null;
    
    switch (ticket.blockchain) {
      case 'Ethereum':
        return `https://etherscan.io/tx/${ticket.txHash}`;
      case 'Stellar':
        return `https://stellar.expert/explorer/public/tx/${ticket.txHash}`;
      default:
        return null;
    }
  };

  // Get IPFS gateway URL for the ticket metadata
  const getIpfsUrl = () => {
    if (!ticket.ipfsCid) return null;
    return `https://ipfs.io/ipfs/${ticket.ipfsCid}`;
  };

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
        
        {ticket.paymentMethod && ticket.paymentMethod !== 'fiat' && (
          <div className="absolute bottom-3 left-3">
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${
              ticket.paymentMethod === 'crypto' 
                ? 'bg-purple-100 text-purple-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {ticket.paymentMethod === 'crypto' ? 'NFT Ticket' : 'Stellar Token'}
            </span>
          </div>
        )}
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
        
        {ticket.txHash && (
          <div>
            <p className="text-sm text-muted-foreground flex items-center">
              Transaction
              {getExplorerUrl() && (
                <a 
                  href={getExplorerUrl() || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-1 text-primary hover:text-primary/80"
                >
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </p>
            <div className="flex items-center">
              <p className="font-mono text-xs truncate flex-1">
                {ticket.txHash.slice(0, 18)}...{ticket.txHash.slice(-4)}
              </p>
              <button 
                onClick={copyTxHash}
                className="ml-1 p-1 hover:text-primary"
                aria-label="Copy transaction hash"
              >
                {copied ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>
        )}
        
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
                    {ticket.tokenId && (
                      <p>Token ID: {ticket.tokenId}</p>
                    )}
                    {ticket.purchaseDate && (
                      <p>Purchased: {new Date(ticket.purchaseDate).toLocaleDateString()}</p>
                    )}
                  </div>
                  
                  {ticket.ipfsCid && (
                    <div className="mt-2 pt-2 border-t">
                      <a 
                        href={getIpfsUrl() || '#'} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs flex items-center text-primary hover:underline"
                      >
                        View on IPFS
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  )}
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
