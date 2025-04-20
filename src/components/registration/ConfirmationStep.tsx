
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { TicketTier } from '@/types';

interface RegistrationSummary {
  name: string;
  email: string;
  phone: string;
  ticketType: string;
  dietaryRestrictions?: string;
  teamMembers: string[];
  ticketTiers: TicketTier[];
}

interface ConfirmationStepProps {
  formData: RegistrationSummary;
  agreedToTerms: boolean;
  onTermsChange: (checked: boolean) => void;
}

const ConfirmationStep = ({ formData, agreedToTerms, onTermsChange }: ConfirmationStepProps) => {
  const selectedTicket = formData.ticketTiers.find(t => t.id === formData.ticketType);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Registration Summary</h3>
        <div className="bg-muted p-4 rounded-md space-y-2">
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Phone:</strong> {formData.phone}</p>
          <p><strong>Ticket:</strong> {selectedTicket?.name || 'Standard'}</p>
          
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
            checked={agreedToTerms}
            onCheckedChange={(checked) => onTermsChange(!!checked)}
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
      
      <div className="p-4 border rounded-md">
        <h4 className="font-medium mb-2">Payment Details</h4>
        <p className="text-sm text-muted-foreground mb-2">
          You will be redirected to complete payment via Stellar blockchain after confirming your registration.
        </p>
        <div className="flex justify-between items-center">
          <span className="font-medium">Total:</span>
          <span className="font-bold text-lg">
            ${selectedTicket?.price.toFixed(2) || '0.00'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationStep;
