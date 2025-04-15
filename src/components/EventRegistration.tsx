
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react';

interface Event {
  id: string | undefined;
  title: string;
  ticketTypes: Array<{
    id: number;
    name: string;
    price: string;
    available: boolean;
  }>;
}

interface EventRegistrationProps {
  event: Event;
  onCancel: () => void;
}

const EventRegistration = ({ event, onCancel }: EventRegistrationProps) => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  // Form data state
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    ticketType: '',
    dietaryRestrictions: '',
    teamMembers: [''],
    agreedToTerms: false,
  });
  
  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (name, checked) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleTeamMemberChange = (index, value) => {
    const updatedTeamMembers = [...formData.teamMembers];
    updatedTeamMembers[index] = value;
    setFormData(prev => ({ ...prev, teamMembers: updatedTeamMembers }));
  };
  
  const addTeamMember = () => {
    setFormData(prev => ({
      ...prev, 
      teamMembers: [...prev.teamMembers, '']
    }));
  };
  
  const removeTeamMember = (index) => {
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
    } else if (currentStep === 2) {
      // For demo purposes, we'll allow this step to pass without validation
      return true;
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
    if (!validateCurrentStep()) return;
    
    setIsLoading(true);
    
    // Simulate API call to register for event
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsComplete(true);
      
      toast({
        title: "Registration successful!",
        description: "Your ticket has been emailed to you",
      });
      
      // In a real app, you would make an API call to submit registration data:
      // await registerForEvent(event.id, formData);
      
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
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
                <Label htmlFor="email">Email Address</Label>
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
                <Label htmlFor="phone">Phone Number</Label>
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
                <Label htmlFor="ticketType">Ticket Type</Label>
                <Select 
                  onValueChange={(value) => handleSelectChange('ticketType', value)}
                  value={formData.ticketType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select ticket type" />
                  </SelectTrigger>
                  <SelectContent>
                    {event.ticketTypes
                      .filter(ticket => ticket.available)
                      .map(ticket => (
                        <SelectItem key={ticket.id} value={ticket.id.toString()}>
                          {ticket.name} - {ticket.price}
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dietaryRestrictions">Dietary Restrictions (if any)</Label>
              <Textarea 
                id="dietaryRestrictions" 
                name="dietaryRestrictions" 
                value={formData.dietaryRestrictions} 
                onChange={handleChange} 
                placeholder="Please list any dietary restrictions or allergies"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Team Members (for group events)</Label>
              {formData.teamMembers.map((member, index) => (
                <div key={index} className="flex gap-2 mt-2">
                  <Input
                    value={member}
                    onChange={(e) => handleTeamMemberChange(index, e.target.value)}
                    placeholder={`Team member ${index + 1} name`}
                  />
                  {index > 0 && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon"
                      onClick={() => removeTeamMember(index)}
                    >
                      ✕
                    </Button>
                  )}
                </div>
              ))}
              
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={addTeamMember}
              >
                + Add Team Member
              </Button>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Registration Summary</h3>
              <div className="bg-muted p-4 rounded-md space-y-2">
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Phone:</strong> {formData.phone}</p>
                <p><strong>Ticket:</strong> {
                  event.ticketTypes.find(t => t.id.toString() === formData.ticketType)?.name || 'Standard'
                }</p>
                
                {formData.dietaryRestrictions && (
                  <p><strong>Dietary Restrictions:</strong> {formData.dietaryRestrictions}</p>
                )}
                
                {formData.teamMembers.filter(m => m).length > 0 && (
                  <div>
                    <p><strong>Team Members:</strong></p>
                    <ul className="list-disc list-inside">
                      {formData.teamMembers
                        .filter(member => member)
                        .map((member, index) => (
                          <li key={index}>{member}</li>
                        ))
                      }
                    </ul>
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={formData.agreedToTerms}
                  onCheckedChange={(checked) => handleCheckboxChange('agreedToTerms', checked)}
                />
                <label 
                  htmlFor="terms" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the terms and conditions
                </label>
              </div>
            </div>
            
            <div className="rounded-lg border p-4 bg-yellow-50">
              <p className="text-sm text-amber-800">
                By proceeding, you confirm all provided information is accurate and you agree to the event's policies.
              </p>
            </div>
          </div>
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
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>Personal Details</span>
            <span>Event Details</span>
            <span>Confirmation</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {isComplete ? (
          <div className="py-6 text-center space-y-4">
            <div className="bg-green-100 text-green-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
              <Check className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold">Registration Complete!</h3>
            <p className="text-muted-foreground">
              Thank you for registering for {event.title}. 
              Your ticket has been emailed to you and is also available in your account.
            </p>
            <Button 
              className="mt-4" 
              onClick={onCancel}
            >
              View Event
            </Button>
          </div>
        ) : (
          renderStepContent()
        )}
      </CardContent>
      
      {!isComplete && (
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
              disabled={isLoading}
            >
              {isLoading ? (
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
      )}
    </Card>
  );
};

export default EventRegistration;
