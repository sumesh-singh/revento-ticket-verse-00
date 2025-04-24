
import React from 'react';
import AuthIllustration from '@/components/AuthIllustration';
import { cn } from '@/lib/utils';

interface AuthLayoutProps {
  children: React.ReactNode;
  role: 'user' | 'organizer';
}

const AuthLayout = ({ children, role }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/90 to-secondary relative overflow-hidden">
          <AuthIllustration role={role} />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
          <div className="w-full max-w-md space-y-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

