
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Shield } from 'lucide-react';

const UserCredentials = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="text-center text-gray-500 py-8">
        No user is currently authenticated
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="mr-2 h-6 w-6 text-primary" />
          User Credentials
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <User className="h-5 w-5 text-gray-500" />
          <div>
            <p className="text-sm font-medium">User ID</p>
            <p className="text-xs text-gray-500">{user.id}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Mail className="h-5 w-5 text-gray-500" />
          <div>
            <p className="text-sm font-medium">Email</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Shield className="h-5 w-5 text-gray-500" />
          <div>
            <p className="text-sm font-medium">Role</p>
            <p className="text-xs text-gray-500 capitalize">{user.role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCredentials;
