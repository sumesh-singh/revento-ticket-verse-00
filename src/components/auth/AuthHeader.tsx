
import React from 'react';

interface AuthHeaderProps {
  mode: 'login' | 'signup' | 'forgot-password';
}

const AuthHeader = ({ mode }: AuthHeaderProps) => {
  return (
    <div className="text-center animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-display font-bold mb-2 bg-clip-text text-transparent bg-gradient-primary">
        {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Join Revento' : 'Verify Your Account'}
      </h1>
      <p className="text-gray-600">
        {mode === 'login' || mode === 'signup' 
          ? 'Earn rewards for every win in events & hackathons!' 
          : 'Complete the verification process to continue'}
      </p>
    </div>
  );
};

export default AuthHeader;

