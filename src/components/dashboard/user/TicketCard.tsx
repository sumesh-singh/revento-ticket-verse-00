
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, Calendar, Download, QrCode as QrCodeIcon, ExternalLink, Copy, CheckCircle2 } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { toast } from '@/hooks/use-toast';

export interface Ticket {
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
}

interface TicketCardProps {
  ticket: Ticket;
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
  const qrCodeUrl = ticket.txHash 
    ? `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(ticket.txHash)}&color=6366F1&bgcolor=FFFFFF`
    : `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(ticket.ticketNumber)}&color=6366F1&bgcolor=FFFFFF`;

  React.useEffect(() => {
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
        <h3 className="text-lg font-semibold">{ticket.eventName}</h3>
        <p className="text-sm text-muted-foreground">
          {ticket.date} • {ticket.time}
        </p>
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

export default TicketCard;
