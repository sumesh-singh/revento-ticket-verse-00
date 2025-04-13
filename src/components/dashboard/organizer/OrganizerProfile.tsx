
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, User, Mail, Phone, MapPin, Globe, FileText, Edit, Settings, Briefcase, Shield, Clock, Bell } from 'lucide-react';

const OrganizerProfile = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Organizer Profile</h1>
        <p className="text-muted-foreground mt-2">Manage your organization details and settings</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Organization</CardTitle>
            <CardDescription>Your organization details</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center mb-4">
              <Building className="w-12 h-12 text-purple-500" />
            </div>
            <h2 className="text-xl font-bold">TechEvents Inc.</h2>
            <p className="text-muted-foreground">organizer@techevents.example</p>
            <div className="w-full mt-6 space-y-2">
              <ProfileField icon={<Briefcase className="w-4 h-4" />} label="Type" value="Corporation" />
              <ProfileField icon={<Phone className="w-4 h-4" />} label="Contact" value="(555) 123-4567" />
              <ProfileField icon={<MapPin className="w-4 h-4" />} label="Location" value="New York, NY" />
              <ProfileField icon={<Globe className="w-4 h-4" />} label="Website" value="techevents.example.com" />
              <ProfileField icon={<Shield className="w-4 h-4" />} label="Verified" value="Yes" />
              <ProfileField icon={<Clock className="w-4 h-4" />} label="Member Since" value="January 2023" />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Edit Organization</Button>
          </CardFooter>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your organizer account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Organization Profile</h3>
                    <p className="text-sm text-muted-foreground">Update your organization details</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Legal Documents</h3>
                    <p className="text-sm text-muted-foreground">Manage your organization's documents</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <Settings className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Billing Settings</h3>
                    <p className="text-sm text-muted-foreground">Manage payment methods and billing</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email Preferences</h3>
                    <p className="text-sm text-muted-foreground">Customize email templates and settings</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Notification Settings</h3>
                    <p className="text-sm text-muted-foreground">Manage alert preferences</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Organization Members</CardTitle>
            <CardDescription>Team members who can manage events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Sarah Johnson", role: "Admin", email: "sarah@techevents.example", joined: "Jan 2023" },
                { name: "David Lee", role: "Event Manager", email: "david@techevents.example", joined: "Mar 2023" },
                { name: "Michelle Wong", role: "Event Manager", email: "michelle@techevents.example", joined: "May 2023" }
              ].map((member, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border hover:shadow-sm transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">{member.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full">
                          {member.role}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {member.email}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Button variant="ghost" size="sm">Manage</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <User className="w-4 h-4 mr-2" />
              <span>Invite Team Member</span>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Subscription Plan</CardTitle>
            <CardDescription>Your current plan and usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-purple-800">Pro Plan</h3>
                  <p className="text-sm text-purple-600">Unlimited events, premium features</p>
                </div>
                <span className="text-lg font-bold text-purple-700">$49/month</span>
              </div>
              <div className="mt-4">
                <p className="text-xs text-purple-700">Renews on May 15, 2025</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Plan Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm">Unlimited events</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm">Advanced analytics</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm">Priority support</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm">Custom branding</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm">5 team members</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm">API access</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Change Plan</Button>
            <Button variant="outline" className="border-red-200 text-red-500 hover:bg-red-50">Cancel Plan</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

interface ProfileFieldProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const ProfileField = ({ icon, label, value }: ProfileFieldProps) => {
  return (
    <div className="flex justify-between py-2 border-b">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>
      <span className="font-medium">{value}</span>
    </div>
  );
};

export default OrganizerProfile;
