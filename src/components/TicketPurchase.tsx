
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Loader2, Ticket, Shield, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/badge';

interface TicketTier {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  benefits: string[];
  available: boolean;
  maxPerTransaction: number;
}

interface EventDetails {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
}

interface TicketPurchaseProps {
  event: EventDetails;
  ticketTiers: TicketTier[];
  onSuccess?: (ticketId: string) => void;
}

const TicketPurchase = ({ event, ticketTiers, onSuccess }: TicketPurchaseProps) => {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const selectedTicketTier = ticketTiers.find(tier => tier.id === selectedTier);
  
  const handlePurchase = async () => {
    if (!isAuthenticated) {
      // Save current event and selected tier to session storage for after login
      sessionStorage.setItem('pendingPurchase', JSON.stringify({
        eventId: event.id,
        tierId: selectedTier,
        quantity
      }));
      
      toast({
        title: "Authentication Required",
        description: "Please sign in to continue with your purchase",
        variant: "destructive",
      });
      
      navigate('/auth');
      return;
    }
    
    if (!selectedTier) {
      toast({
        title: "No ticket selected",
        description: "Please select a ticket tier to continue",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // This is a placeholder for the actual purchase logic
      // In a real implementation, this would connect to your payment gateway
      // and blockchain integration
      
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      // Generate a mock ticket ID - in reality this would come from your backend
      const mockTicketId = `TIX-${Date.now().toString(36).toUpperCase()}`;
      
      toast({
        title: "Purchase successful!",
        description: "Your ticket has been added to your account",
      });
      
      // Call the success callback if provided
      if (onSuccess) {
        onSuccess(mockTicketId);
      }
      
      // Redirect to the user's tickets page
      navigate('/dashboard/user/tickets');
      
    } catch (error) {
      console.error('Purchase failed:', error);
      toast({
        title: "Purchase failed",
        description: "There was an error processing your purchase. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Ticket className="h-5 w-5 mr-2 text-primary" />
          Select Your Ticket
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {ticketTiers.map(tier => (
            <div 
              key={tier.id}
              className={`border rounded-lg p-4 transition-all duration-200 ${
                !tier.available ? 'opacity-60 cursor-not-allowed' : 
                selectedTier === tier.id ? 'border-primary bg-primary/5' : 'cursor-pointer hover:border-primary'
              }`}
              onClick={() => tier.available && setSelectedTier(tier.id)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium">{tier.name}</h3>
                    {selectedTier === tier.id && (
                      <Check className="h-4 w-4 ml-2 text-primary" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{tier.description}</p>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-lg">
                    {tier.currency === 'USD' ? '$' : tier.currency} {tier.price}
                  </span>
                  {!tier.available && (
                    <Badge variant="outline" className="ml-2 text-red-500 bg-red-50">
                      Sold Out
                    </Badge>
                  )}
                </div>
              </div>
              
              {tier.benefits.length > 0 && (
                <div className="mt-3">
                  <h4 className="text-sm font-medium mb-1">Benefits</h4>
                  <ul className="text-sm text-muted-foreground">
                    {tier.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <Shield className="h-3 w-3 mt-1 mr-2 text-primary" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedTier === tier.id && tier.available && (
                <div className="mt-4 flex items-center">
                  <span className="text-sm mr-3">Quantity:</span>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="h-7 w-7"
                    onClick={(e) => {
                      e.stopPropagation();
                      setQuantity(prev => Math.max(1, prev - 1));
                    }}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="mx-3 font-medium">{quantity}</span>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="h-7 w-7"
                    onClick={(e) => {
                      e.stopPropagation();
                      setQuantity(prev => Math.min(tier.maxPerTransaction, prev + 1));
                    }}
                    disabled={quantity >= tier.maxPerTransaction}
                  >
                    +
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter>
        <div className="w-full">
          {selectedTier && selectedTicketTier && (
            <div className="mb-4 p-3 bg-muted rounded-lg flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Total:</p>
                <p className="text-lg font-bold">
                  {selectedTicketTier.currency === 'USD' ? '$' : selectedTicketTier.currency} 
                  {(selectedTicketTier.price * quantity).toFixed(2)}
                </p>
              </div>
              {quantity > 1 && (
                <div className="text-sm text-muted-foreground">
                  {quantity} × {selectedTicketTier.name}
                </div>
              )}
            </div>
          )}
          
          <Button 
            className="w-full"
            disabled={!selectedTier || isProcessing || !ticketTiers.find(t => t.id === selectedTier)?.available}
            onClick={handlePurchase}
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Continue to Payment
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TicketPurchase;
