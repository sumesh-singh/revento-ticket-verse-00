
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StellarPayment from '@/components/payment/StellarPayment';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { PaymentDetails, RegistrationFormData } from '@/types';
import { Textarea } from '@/components/ui/textarea';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const paymentDetails = location.state?.paymentDetails as PaymentDetails | undefined;
  const [registrationStep, setRegistrationStep] = useState<'registration' | 'payment'>(
    paymentDetails?.registrationData ? 'payment' : 'registration'
  );
  
  const [formData, setFormData] = useState<RegistrationFormData>({
    name: '',
    email: paymentDetails?.userEmail || '',
    phone: '',
    ticketType: paymentDetails?.ticketType || '',
    dietaryRestrictions: '',
    teamMembers: [],
    agreedToTerms: false,
  });

  if (!paymentDetails) {
    navigate('/events');
    return null;
  }

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Update payment details with registration data
    const updatedPaymentDetails = {
      ...paymentDetails,
      registrationData: formData
    };

    // Continue to payment step
    setRegistrationStep('payment');
  };

  const handlePaymentComplete = (transactionId: string) => {
    // Create a ticket in local storage to simulate database persistence
    const newTicket = {
      id: Date.now(),
      eventName: paymentDetails.eventName,
      date: "April 15, 2025", // Hardcoded for demo
      time: "9:00 AM - 5:00 PM", // Hardcoded for demo
      location: "Convention Center, Downtown", // Hardcoded for demo
      ticketType: paymentDetails.ticketType,
      ticketNumber: `TIX-${Date.now().toString(36).toUpperCase()}`,
      status: "upcoming",
      image: "https://source.unsplash.com/random/800x600/?event",
      paymentMethod: "stellar" as const,
      txHash: transactionId,
      ipfsCid: `QmW8er4QxTGZUVv6noCb5a28KFse2gkSY9kc${Date.now().toString(36).substring(2, 8)}`,
      blockchain: "Stellar",
      tokenId: Math.floor(Math.random() * 10000).toString(),
      purchaseDate: new Date().toISOString()
    };

    // Store the ticket in localStorage (in a real app, this would be in a database)
    const existingTickets = JSON.parse(localStorage.getItem('userTickets') || '[]');
    localStorage.setItem('userTickets', JSON.stringify([...existingTickets, newTicket]));

    // Show success message
    toast({
      title: "Ticket Purchased Successfully!",
      description: "Your ticket has been added to your account",
    });

    // Navigate to tickets page
    navigate(`/dashboard/user/tickets?transaction=${transactionId}`);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>{registrationStep === 'registration' ? 'Registration Details' : 'Complete Your Purchase'}</CardTitle>
          <CardDescription>
            {registrationStep === 'registration' 
              ? 'Please provide your information to complete registration' 
              : `Purchasing ${paymentDetails.ticketType} for ${paymentDetails.eventName}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {registrationStep === 'registration' ? (
            <form onSubmit={handleRegistrationSubmit} className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Your full name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="your@email.com"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    placeholder="Your phone number"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dietaryRestrictions">Dietary Restrictions (Optional)</Label>
                  <Textarea 
                    id="dietaryRestrictions" 
                    name="dietaryRestrictions" 
                    value={formData.dietaryRestrictions} 
                    onChange={handleChange} 
                    placeholder="Please list any dietary restrictions or allergies"
                  />
                </div>
              </div>
              
              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit">
                  Continue to Payment
                </Button>
              </div>
            </form>
          ) : (
            <StellarPayment
              eventId={paymentDetails.eventId}
              eventName={paymentDetails.eventName}
              ticketType={paymentDetails.ticketType}
              price={paymentDetails.price}
              currency={paymentDetails.currency}
              userEmail={paymentDetails.userEmail}
              onPaymentComplete={handlePaymentComplete}
              onCancel={handleCancel}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentPage;
