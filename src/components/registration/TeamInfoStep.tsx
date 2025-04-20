
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface TeamInfoStepProps {
  formData: {
    dietaryRestrictions: string;
    teamMembers: string[];
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleTeamMemberChange: (index: number, value: string) => void;
  addTeamMember: () => void;
  removeTeamMember: (index: number) => void;
}

const TeamInfoStep = ({
  formData,
  handleChange,
  handleTeamMemberChange,
  addTeamMember,
  removeTeamMember,
}: TeamInfoStepProps) => {
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
};

export default TeamInfoStep;
