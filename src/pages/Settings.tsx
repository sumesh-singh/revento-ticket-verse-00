
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access settings.",
        variant: "destructive",
      });
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);
  
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-6">Settings</h1>
          
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="account">
              <AccountSettings />
            </TabsContent>
            
            <TabsContent value="notifications">
              <NotificationSettings />
            </TabsContent>
            
            <TabsContent value="privacy">
              <PrivacySettings />
            </TabsContent>
            
            <TabsContent value="appearance">
              <AppearanceSettings />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

const AccountSettings = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Changes Saved",
      description: "Your account information has been updated.",
    });
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
        <form onSubmit={handleSave} className="space-y-4 max-w-md">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
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
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
            />
          </div>
          
          <Button type="submit">Save Changes</Button>
        </form>
      </div>
      
      <Separator />
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={handleSave} className="space-y-4 max-w-md">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input 
              id="currentPassword" 
              name="currentPassword" 
              type="password" 
              value={formData.currentPassword} 
              onChange={handleChange} 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input 
              id="newPassword" 
              name="newPassword" 
              type="password" 
              value={formData.newPassword} 
              onChange={handleChange} 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input 
              id="confirmPassword" 
              name="confirmPassword" 
              type="password" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
            />
          </div>
          
          <Button type="submit">Update Password</Button>
        </form>
      </div>
      
      <Separator />
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Danger Zone</h2>
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h3 className="text-lg font-medium text-red-800 mb-2">Delete Account</h3>
          <p className="text-red-700 mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Button variant="destructive">Delete Account</Button>
        </div>
      </div>
    </div>
  );
};

const NotificationSettings = () => {
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    eventReminders: true,
    newEvents: true,
    specialOffers: false,
    accountActivity: true,
    rewardPoints: true
  });
  
  const handleToggle = (key: string) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };
  
  const handleSave = () => {
    toast({
      title: "Notification Settings Saved",
      description: "Your notification preferences have been updated.",
    });
  };
  
  return (
    <div className="space-y-6 max-w-md">
      <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Email Updates</h3>
            <p className="text-sm text-muted-foreground">Receive updates about your account via email</p>
          </div>
          <Switch 
            checked={notifications.emailUpdates} 
            onCheckedChange={() => handleToggle('emailUpdates')} 
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Event Reminders</h3>
            <p className="text-sm text-muted-foreground">Get reminders before your upcoming events</p>
          </div>
          <Switch 
            checked={notifications.eventReminders} 
            onCheckedChange={() => handleToggle('eventReminders')} 
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">New Events</h3>
            <p className="text-sm text-muted-foreground">Be notified when new events match your interests</p>
          </div>
          <Switch 
            checked={notifications.newEvents} 
            onCheckedChange={() => handleToggle('newEvents')} 
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Special Offers</h3>
            <p className="text-sm text-muted-foreground">Receive promotions and discount offers</p>
          </div>
          <Switch 
            checked={notifications.specialOffers} 
            onCheckedChange={() => handleToggle('specialOffers')} 
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Account Activity</h3>
            <p className="text-sm text-muted-foreground">Get notified about important account activity</p>
          </div>
          <Switch 
            checked={notifications.accountActivity} 
            onCheckedChange={() => handleToggle('accountActivity')} 
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Reward Points</h3>
            <p className="text-sm text-muted-foreground">Notifications about reward points earned or redeemed</p>
          </div>
          <Switch 
            checked={notifications.rewardPoints} 
            onCheckedChange={() => handleToggle('rewardPoints')} 
          />
        </div>
      </div>
      
      <Button onClick={handleSave} className="mt-6">Save Preferences</Button>
    </div>
  );
};

const PrivacySettings = () => {
  const [privacy, setPrivacy] = useState({
    profileVisibility: true,
    showAttendance: true,
    locationServices: false,
    dataCollection: true
  });
  
  const handleToggle = (key: string) => {
    setPrivacy(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };
  
  const handleSave = () => {
    toast({
      title: "Privacy Settings Saved",
      description: "Your privacy preferences have been updated.",
    });
  };
  
  return (
    <div className="space-y-6 max-w-md">
      <h2 className="text-xl font-semibold mb-4">Privacy Settings</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Profile Visibility</h3>
            <p className="text-sm text-muted-foreground">Allow other users to view your profile</p>
          </div>
          <Switch 
            checked={privacy.profileVisibility} 
            onCheckedChange={() => handleToggle('profileVisibility')} 
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Event Attendance</h3>
            <p className="text-sm text-muted-foreground">Show others which events you're attending</p>
          </div>
          <Switch 
            checked={privacy.showAttendance} 
            onCheckedChange={() => handleToggle('showAttendance')} 
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Location Services</h3>
            <p className="text-sm text-muted-foreground">Allow the app to access your location</p>
          </div>
          <Switch 
            checked={privacy.locationServices} 
            onCheckedChange={() => handleToggle('locationServices')} 
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Data Collection</h3>
            <p className="text-sm text-muted-foreground">Allow us to collect usage data to improve our services</p>
          </div>
          <Switch 
            checked={privacy.dataCollection} 
            onCheckedChange={() => handleToggle('dataCollection')} 
          />
        </div>
      </div>
      
      <Button onClick={handleSave} className="mt-6">Save Settings</Button>
      
      <div className="mt-8">
        <h3 className="font-medium mb-2">Export Your Data</h3>
        <p className="text-sm text-muted-foreground mb-4">
          You can request a copy of your personal data that we have stored.
        </p>
        <Button variant="outline">Request Data Export</Button>
      </div>
    </div>
  );
};

const AppearanceSettings = () => {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('medium');
  
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };
  
  const handleFontSizeChange = (newSize: string) => {
    setFontSize(newSize);
  };
  
  const handleSave = () => {
    toast({
      title: "Appearance Settings Saved",
      description: "Your appearance preferences have been updated.",
    });
  };
  
  return (
    <div className="space-y-8 max-w-md">
      <div>
        <h2 className="text-xl font-semibold mb-4">Theme</h2>
        <div className="grid grid-cols-3 gap-4">
          <div 
            className={`border rounded-md p-4 cursor-pointer ${theme === 'light' ? 'bg-primary/10 border-primary' : ''}`}
            onClick={() => handleThemeChange('light')}
          >
            <div className="bg-white border rounded-md p-3 mb-2">
              <div className="w-full h-3 bg-gray-200 rounded mb-2"></div>
              <div className="w-3/4 h-3 bg-gray-200 rounded"></div>
            </div>
            <p className="text-sm text-center font-medium">Light</p>
          </div>
          
          <div 
            className={`border rounded-md p-4 cursor-pointer ${theme === 'dark' ? 'bg-primary/10 border-primary' : ''}`}
            onClick={() => handleThemeChange('dark')}
          >
            <div className="bg-gray-900 border border-gray-700 rounded-md p-3 mb-2">
              <div className="w-full h-3 bg-gray-700 rounded mb-2"></div>
              <div className="w-3/4 h-3 bg-gray-700 rounded"></div>
            </div>
            <p className="text-sm text-center font-medium">Dark</p>
          </div>
          
          <div 
            className={`border rounded-md p-4 cursor-pointer ${theme === 'system' ? 'bg-primary/10 border-primary' : ''}`}
            onClick={() => handleThemeChange('system')}
          >
            <div className="bg-gradient-to-r from-white to-gray-900 border rounded-md p-3 mb-2">
              <div className="w-full h-3 bg-gradient-to-r from-gray-200 to-gray-700 rounded mb-2"></div>
              <div className="w-3/4 h-3 bg-gradient-to-r from-gray-200 to-gray-700 rounded"></div>
            </div>
            <p className="text-sm text-center font-medium">System</p>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Font Size</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button 
              variant={fontSize === 'small' ? 'default' : 'outline'}
              onClick={() => handleFontSizeChange('small')}
            >
              Small
            </Button>
            <Button 
              variant={fontSize === 'medium' ? 'default' : 'outline'}
              onClick={() => handleFontSizeChange('medium')}
            >
              Medium
            </Button>
            <Button 
              variant={fontSize === 'large' ? 'default' : 'outline'}
              onClick={() => handleFontSizeChange('large')}
            >
              Large
            </Button>
          </div>
          <div className="p-4 border rounded-md">
            <p className={`${fontSize === 'small' ? 'text-sm' : fontSize === 'medium' ? 'text-base' : 'text-lg'}`}>
              This is a preview of your selected font size.
            </p>
          </div>
        </div>
      </div>
      
      <Button onClick={handleSave}>Save Appearance Settings</Button>
    </div>
  );
};

export default Settings;
