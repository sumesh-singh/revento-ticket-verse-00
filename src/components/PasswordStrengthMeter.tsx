
import React, { useMemo } from 'react';

interface PasswordStrengthMeterProps {
  password: string;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  const strength = useMemo(() => {
    if (!password) return 0;
    
    let score = 0;
    
    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Character variety checks
    if (/[A-Z]/.test(password)) score += 1; // Uppercase
    if (/[a-z]/.test(password)) score += 1; // Lowercase
    if (/[0-9]/.test(password)) score += 1; // Numbers
    if (/[^A-Za-z0-9]/.test(password)) score += 1; // Special characters
    
    // Normalize to 0-4 range
    return Math.min(4, Math.floor(score / 1.5));
  }, [password]);
  
  const getLabel = () => {
    if (!password) return '';
    switch (strength) {
      case 0: return 'Very weak';
      case 1: return 'Weak';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Strong';
      default: return '';
    }
  };
  
  const getColor = () => {
    switch (strength) {
      case 0: return 'bg-red-500';
      case 1: return 'bg-orange-500';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-lime-500';
      case 4: return 'bg-green-500';
      default: return 'bg-gray-200';
    }
  };
  
  if (!password) return null;
  
  return (
    <div className="mt-2">
      <div className="flex items-center gap-2">
        <div className="h-1.5 flex-1 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-300 ${getColor()}`} 
            style={{ width: `${Math.max(5, (strength + 1) * 25)}%` }}
          ></div>
        </div>
        <span className={`text-xs font-medium ${
          strength <= 1 ? 'text-red-500' : 
          strength === 2 ? 'text-yellow-500' : 
          'text-green-600'
        }`}>
          {getLabel()}
        </span>
      </div>
      
      {strength <= 2 && (
        <ul className="text-xs text-gray-500 mt-2 space-y-1">
          {password.length < 8 && (
            <li className="flex items-center gap-1">
              <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Use at least 8 characters
            </li>
          )}
          {!/[A-Z]/.test(password) && (
            <li className="flex items-center gap-1">
              <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Add uppercase letters
            </li>
          )}
          {!/[0-9]/.test(password) && (
            <li className="flex items-center gap-1">
              <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Add numbers
            </li>
          )}
          {!/[^A-Za-z0-9]/.test(password) && (
            <li className="flex items-center gap-1">
              <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Add special characters (!@#$%^&*)
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default PasswordStrengthMeter;
