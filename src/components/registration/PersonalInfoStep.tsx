
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface PersonalInfoStepProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    ticketType: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  ticketTiers: {
    id: string;
    name: string;
    available: boolean;
    price: number;
  }[];
}

const PersonalInfoStep = ({ formData, handleChange, handleSelectChange, ticketTiers }: PersonalInfoStepProps) => {
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
          <select
            id="ticketType"
            name="ticketType"
            value={formData.ticketType}
            onChange={(e) => handleSelectChange('ticketType', e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select ticket type</option>
            {ticketTiers
              .filter(ticket => ticket.available)
              .map(ticket => (
                <option key={ticket.id} value={ticket.id}>
                  {ticket.name} - ${ticket.price}
                </option>
              ))
            }
          </select>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
