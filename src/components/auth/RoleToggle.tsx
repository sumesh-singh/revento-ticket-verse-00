
import React from 'react';
import { Building, User } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface RoleToggleProps {
  role: 'user' | 'organizer';
  onRoleChange: (role: 'user' | 'organizer') => void;
}

const RoleToggle = ({ role, onRoleChange }: RoleToggleProps) => {
  return (
    <div className="role-switch p-1 rounded-full flex">
      <ToggleGroup 
        type="single" 
        value={role} 
        onValueChange={(value) => value && onRoleChange(value as 'user' | 'organizer')}
        className="w-full bg-slate-100 rounded-full transition-all"
      >
        <ToggleGroupItem 
          value="user" 
          className={`w-1/2 rounded-full transition-all duration-300 ${
            role === 'user' 
              ? 'bg-white text-primary shadow-sm transform scale-105' 
              : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
          }`}
          aria-label="Toggle User role"
        >
          <User className="mr-2 h-4 w-4" />
          User
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="organizer" 
          className={`w-1/2 rounded-full transition-all duration-300 ${
            role === 'organizer' 
              ? 'bg-white text-primary shadow-sm transform scale-105' 
              : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
          }`}
          aria-label="Toggle Organizer role"
        >
          <Building className="mr-2 h-4 w-4" />
          Organizer
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default RoleToggle;

