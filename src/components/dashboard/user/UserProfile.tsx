
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Settings, Bell, Lock, CreditCard, FileText, Mail, Share2 } from 'lucide-react';

const UserProfile = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground mt-2">Manage your account settings and preferences</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Your personal details</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <User className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold">Alex Johnson</h2>
            <p className="text-muted-foreground">alex.johnson@example.com</p>
            <div className="w-full mt-6 space-y-2">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Member Since</span>
                <span className="font-medium">January 2025</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Status</span>
                <span className="font-medium text-green-500">Active</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Reward Tier</span>
                <span className="font-medium">Silver</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Events Attended</span>
                <span className="font-medium">12</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Edit Profile</Button>
          </CardFooter>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <SettingItem 
                icon={<User className="w-5 h-5" />}
                title="Personal Information"
                description="Update your personal details"
              />
              
              <SettingItem 
                icon={<Bell className="w-5 h-5" />}
                title="Notification Preferences"
                description="Control what notifications you receive"
              />
              
              <SettingItem 
                icon={<Lock className="w-5 h-5" />}
                title="Security Settings"
                description="Update password and security options"
              />
              
              <SettingItem 
                icon={<CreditCard className="w-5 h-5" />}
                title="Payment Methods"
                description="Manage your payment cards and options"
              />
              
              <SettingItem 
                icon={<Share2 className="w-5 h-5" />}
                title="Connected Accounts"
                description="Manage social and other connected accounts"
              />
              
              <SettingItem 
                icon={<FileText className="w-5 h-5" />}
                title="Privacy Preferences"
                description="Control your privacy settings"
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Communication Preferences</CardTitle>
            <CardDescription>Control how we contact you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-500" />
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-muted-foreground">Receive updates about events and offers</p>
                </div>
              </div>
              <div className="relative inline-block w-12 h-6 rounded-full bg-green-500">
                <span className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white"></span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-purple-500" />
                <div>
                  <h3 className="font-medium">Push Notifications</h3>
                  <p className="text-sm text-muted-foreground">Get alerts on your mobile device</p>
                </div>
              </div>
              <div className="relative inline-block w-12 h-6 rounded-full bg-green-500">
                <span className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white"></span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-orange-500" />
                <div>
                  <h3 className="font-medium">Marketing Communications</h3>
                  <p className="text-sm text-muted-foreground">Receive promotional offers and updates</p>
                </div>
              </div>
              <div className="relative inline-block w-12 h-6 rounded-full bg-gray-300">
                <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white"></span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Update Preferences</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Event Preferences</CardTitle>
            <CardDescription>Customize your event experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-3">Interested Categories</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Technology</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Business</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Education</span>
                <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">Entertainment</span>
                <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm">Health</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">+ Add</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium mb-3">Location Preferences</h3>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>Default Location</span>
                  <span className="font-medium">New York, NY</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>Search Radius</span>
                  <span className="font-medium">5 miles</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>Location Services</span>
                  <span className="font-medium text-green-500">Enabled</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Update Preferences</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SettingItem = ({ icon, title, description }: SettingItemProps) => {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <Button variant="ghost" size="sm">
        <ChevronRightIcon className="h-5 w-5" />
      </Button>
    </div>
  );
};

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default UserProfile;
