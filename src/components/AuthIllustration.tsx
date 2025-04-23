
import React from 'react';

interface AuthIllustrationProps {
  role: 'user' | 'organizer';
}

const AuthIllustration: React.FC<AuthIllustrationProps> = ({ role }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="max-w-md p-8 text-white">
        <h2 className="text-4xl font-display font-bold mb-8">
          {role === 'user' 
            ? 'Discover Amazing Events' 
            : 'Create Unforgettable Events'}
        </h2>
        
        <div className="mb-8">
          <p className="text-xl mb-4">
            {role === 'user'
              ? 'Join Revento and earn rewards for participating in events and hackathons'
              : 'Organize events with ease and connect with your audience'}
          </p>
          <ul className="space-y-3">
            {role === 'user' ? (
              <>
                <li className="flex items-center">
                  <svg className="h-6 w-6 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Seamless ticket access via digital wallet
                </li>
                <li className="flex items-center">
                  <svg className="h-6 w-6 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Earn points and redeem exciting rewards
                </li>
                <li className="flex items-center">
                  <svg className="h-6 w-6 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Discover events with interactive campus map
                </li>
              </>
            ) : (
              <>
                <li className="flex items-center">
                  <svg className="h-6 w-6 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Create and manage events with powerful tools
                </li>
                <li className="flex items-center">
                  <svg className="h-6 w-6 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Access real-time analytics and attendee data
                </li>
                <li className="flex items-center">
                  <svg className="h-6 w-6 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Blockchain-verified ticketing system
                </li>
              </>
            )}
          </ul>
        </div>
        
        {/* Removed image */}
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 rounded-full bg-purple-500/30 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 rounded-full bg-blue-500/30 blur-3xl"></div>
      </div>
    </div>
  );
};

export default AuthIllustration;
