
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Event, RegistrationFormData } from '@/types';
import PersonalInfoStep from './PersonalInfoStep';
import TeamInfoStep from './TeamInfoStep';
import ConfirmationStep from './ConfirmationStep';
import { useAuth } from '@/context/AuthContext';
import { registerForEvent } from '@/services/FirestoreService';

interface EventRegistrationProps {
  event: Event;
  onCancel: () => void;
  onSuccess?: (ticketId: string) => void;
}

const EventRegistration = ({ event, onCancel, onSuccess }: EventRegistrationProps) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;
  
  const [formData, setFormData] = useState<RegistrationFormData>({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    ticketType: '',
    dietaryRestrictions: '',
    teamMembers: [''],
    agreedToTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleTeamMemberChange = (index: number, value: string) => {
    const updatedTeamMembers = [...formData.teamMembers];
    updatedTeamMembers[index] = value;
    setFormData(prev => ({
      ...prev, 
      teamMembers: updatedTeamMembers
    }));
  };
  
  const addTeamMember = () => {
    setFormData(prev => ({
      ...prev, 
      teamMembers: [...prev.teamMembers, '']
    }));
  };
  
  const removeTeamMember = (index: number) => {
    const updatedTeamMembers = formData.teamMembers.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      teamMembers: updatedTeamMembers
    }));
  };
  
  const validateCurrentStep = () => {
    if (currentStep === 1) {
      if (!formData.name || !formData.email || !formData.phone || !formData.ticketType) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return false;
      }
    } else if (currentStep === 3) {
      if (!formData.agreedToTerms) {
        toast({
          title: "Terms and Conditions",
          description: "Please agree to the terms and conditions",
          variant: "destructive",
        });
        return false;
      }
    }
    return true;
  };
  
  const handleNext = () => {
    if (!validateCurrentStep()) return;
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      onCancel();
    }
  };

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to register for this event",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }
    
    if (!user) {
      toast({
        title: "User profile not found",
        description: "Please log in again",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.agreedToTerms) {
      toast({
        title: "Terms Agreement Required",
        description: "Please agree to the terms and conditions to continue",
        variant: "destructive",
      });
      return;
    }

    const selectedTier = event.ticketTiers.find(tier => tier.id === formData.ticketType);
    if (!selectedTier) {
      toast({
        title: "Invalid Ticket Type",
        description: "Please select a valid ticket type",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Register for the event in the database
      const result = await registerForEvent({
        userId: user.id,
        eventId: event.id,
        ticketType: selectedTier.id,
        amount: selectedTier.price,
        currency: selectedTier.currency,
        paymentMethod: 'stellar', // Default to Stellar
        personal: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          dietaryRestrictions: formData.dietaryRestrictions
        },
        teamMembers: formData.teamMembers.filter(member => !!member)
      });
      
      if (result.success) {
        // Navigate to payment page with registration and transaction IDs
        navigate('/payment', {
          state: {
            paymentDetails: {
              eventId: event.id,
              eventName: event.title,
              ticketType: selectedTier.name,
              price: selectedTier.price,
              currency: selectedTier.currency,
              userEmail: formData.email,
              registrationId: result.registrationId,
              transactionId: result.transactionId
            }
          }
        });
      } else {
        throw new Error(result.error || "Failed to register for the event");
      }
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            formData={formData}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
            ticketTiers={event.ticketTiers}
          />
        );
      case 2:
        return (
          <TeamInfoStep
            formData={formData}
            handleChange={handleChange}
            handleTeamMemberChange={handleTeamMemberChange}
            addTeamMember={addTeamMember}
            removeTeamMember={removeTeamMember}
          />
        );
      case 3:
        return (
          <ConfirmationStep
            formData={{ ...formData, ticketTiers: event.ticketTiers }}
            agreedToTerms={formData.agreedToTerms}
            onTermsChange={(checked) => handleCheckboxChange('agreedToTerms', checked)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register for {event.title}</CardTitle>
        <div className="mt-2">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>Personal Details</span>
            <span>Event Details</span>
            <span>Confirmation</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {renderStepContent()}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handleBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {currentStep === 1 ? 'Cancel' : 'Back'}
        </Button>
        
        {currentStep < totalSteps ? (
          <Button onClick={handleNext}>
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button 
            onClick={handleSubmit}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing
              </>
            ) : (
              'Complete Registration'
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default EventRegistration;
