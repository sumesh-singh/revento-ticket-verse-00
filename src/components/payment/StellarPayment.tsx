
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Loader2, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';
import { PaymentRequest, stellarPaymentService } from '@/services/StellarPaymentService';

interface StellarPaymentProps {
  eventId: string;
  eventName: string;
  ticketType: string;
  price: number;
  currency: string;
  userEmail: string;
  onPaymentComplete: (transactionId: string) => void;
  onCancel: () => void;
}

const StellarPayment = ({
  eventId,
  eventName,
  ticketType,
  price,
  currency,
  userEmail,
  onPaymentComplete,
  onCancel
}: StellarPaymentProps) => {
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [walletAddress, setWalletAddress] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmitPayment = async () => {
    if (!walletAddress) {
      toast({
        title: "Wallet Address Required",
        description: "Please enter your Stellar wallet address to continue",
        variant: "destructive",
      });
      return;
    }
    
    setPaymentStatus('processing');
    
    const paymentRequest: PaymentRequest = {
      amount: price, // This will now be a number as expected
      currency,
      eventId,
      eventName,
      ticketType,
      userEmail
    };
    
    try {
      const response = await stellarPaymentService.initializePayment(paymentRequest);
      
      if (response.success && response.transactionId) {
        setTransactionId(response.transactionId);
        setPaymentStatus('success');
        toast({
          title: "Payment Successful",
          description: "Your payment has been processed successfully",
        });
        
        // Call the callback after a short delay
        setTimeout(() => {
          onPaymentComplete(response.transactionId);
        }, 2000);
      } else {
        setPaymentStatus('error');
        toast({
          title: "Payment Failed",
          description: response.error || "An unknown error occurred",
          variant: "destructive",
        });
      }
    } catch (error) {
      setPaymentStatus('error');
      toast({
        title: "Payment Failed",
        description: "An error occurred while processing your payment",
        variant: "destructive",
      });
    }
  };
  
  const generateTestWalletAddress = () => {
    // Generate a fake Stellar wallet address for testing
    const addressPrefix = 'G';
    const addressBody = Array(55).fill(0).map(() => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'[Math.floor(Math.random() * 32)]).join('');
    setWalletAddress(addressPrefix + addressBody);
    
    toast({
      title: "Test Wallet Generated",
      description: "A test wallet address has been generated for demonstration",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stellar Payment</CardTitle>
        <CardDescription>Secure blockchain payment for your ticket</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="bg-muted p-4 rounded-md">
          <h3 className="font-medium mb-2">Payment Summary</h3>
          <div className="space-y-1 text-sm">
            <p><span className="text-muted-foreground">Event:</span> {eventName}</p>
            <p><span className="text-muted-foreground">Ticket Type:</span> {ticketType}</p>
            <p><span className="text-muted-foreground">Amount:</span> {price} {currency}</p>
          </div>
        </div>
        
        {paymentStatus === 'idle' && (
          <>
            <div className="space-y-2">
              <label htmlFor="walletAddress" className="text-sm font-medium">
                Stellar Wallet Address
              </label>
              <div className="flex space-x-2">
                <Input 
                  id="walletAddress"
                  placeholder="Enter your Stellar wallet address"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={generateTestWalletAddress}
                >
                  Test
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                We'll use this address to process your Stellar blockchain payment
              </p>
            </div>
            
            <div>
              <Button
                variant="link"
                size="sm"
                className="px-0 text-xs"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                {showAdvanced ? 'Hide' : 'Show'} advanced options
              </Button>
              
              {showAdvanced && (
                <div className="mt-2 p-3 border rounded-md">
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs font-medium">Network</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <input type="radio" id="testnet" name="network" defaultChecked />
                        <label htmlFor="testnet" className="text-xs">Testnet</label>
                        
                        <input type="radio" id="mainnet" name="network" />
                        <label htmlFor="mainnet" className="text-xs">Public Network</label>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-xs font-medium">Memo (Optional)</label>
                      <Input 
                        size="sm"
                        className="mt-1 text-xs"
                        placeholder="Add a memo to your transaction"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
        
        {paymentStatus === 'processing' && (
          <div className="flex flex-col items-center py-6">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <h3 className="font-medium mb-1">Processing Payment</h3>
            <p className="text-sm text-center text-muted-foreground">
              Please wait while we process your payment on the Stellar network
            </p>
          </div>
        )}
        
        {paymentStatus === 'success' && (
          <div className="flex flex-col items-center py-6">
            <div className="bg-green-100 p-3 rounded-full mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="font-medium mb-1">Payment Successful</h3>
            <p className="text-sm text-center text-muted-foreground mb-2">
              Your ticket has been secured with blockchain technology
            </p>
            <div className="bg-muted p-3 rounded-md w-full text-center">
              <p className="text-xs mb-1">Transaction ID</p>
              <p className="font-mono text-sm break-all">{transactionId}</p>
            </div>
            
            <Button 
              variant="link" 
              size="sm" 
              className="mt-2 flex items-center"
              onClick={() => window.open(`https://stellar.expert/explorer/testnet/tx/${transactionId}`, '_blank')}
            >
              <span>View on Stellar Explorer</span>
              <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
          </div>
        )}
        
        {paymentStatus === 'error' && (
          <div className="flex flex-col items-center py-6">
            <div className="bg-red-100 p-3 rounded-full mb-4">
              <AlertCircle className="h-10 w-10 text-red-600" />
            </div>
            <h3 className="font-medium mb-1">Payment Failed</h3>
            <p className="text-sm text-center text-muted-foreground">
              We encountered an error while processing your payment
            </p>
            <Button 
              variant="outline" 
              size="sm"
              className="mt-4"
              onClick={() => setPaymentStatus('idle')}
            >
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={onCancel}
          disabled={paymentStatus === 'processing' || paymentStatus === 'success'}
        >
          Cancel
        </Button>
        
        {paymentStatus === 'idle' && (
          <Button onClick={handleSubmitPayment}>
            Pay with Stellar
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default StellarPayment;
