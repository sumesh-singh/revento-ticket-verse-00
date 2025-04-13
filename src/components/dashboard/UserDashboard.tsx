
import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Star, MapPin, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const UserDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Welcome back, Alex!</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title="My Tickets"
          description="View and manage your event tickets"
          icon={<Ticket className="w-5 h-5" />}
          value="2 Upcoming"
          linkTo="/dashboard/user/tickets"
          color="bg-blue-50"
          iconColor="text-blue-500"
        />
        
        <DashboardCard
          title="Rewards Hub"
          description="Check your reward points and perks"
          icon={<Star className="w-5 h-5" />}
          value="750 Points"
          linkTo="/dashboard/user/rewards"
          color="bg-purple-50"
          iconColor="text-purple-500"
        />
        
        <DashboardCard
          title="Nearby Events"
          description="Discover events in your area"
          icon={<MapPin className="w-5 h-5" />}
          value="5 Trending"
          linkTo="/dashboard/user/events"
          color="bg-pink-50"
          iconColor="text-pink-500"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Events you've registered for</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Tech Conference 2025",
                  date: "Apr 15, 2025",
                  location: "Convention Center"
                },
                {
                  name: "Music Festival",
                  date: "May 20, 2025",
                  location: "Central Park"
                }
              ].map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border hover:shadow-md transition-all duration-300">
                  <div>
                    <h3 className="font-medium">{event.name}</h3>
                    <p className="text-sm text-muted-foreground">{event.date} • {event.location}</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/dashboard/user/tickets">
                      <span className="sr-only">View ticket</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link to="/dashboard/user/tickets">View All Tickets</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Reward Status</CardTitle>
            <CardDescription>Current tier: Silver</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full" style={{width: '60%'}}></div>
              </div>
              <p className="text-sm text-center text-muted-foreground">750 / 1,000 points to Gold tier</p>
              
              <div className="mt-6 space-y-3">
                <h4 className="font-medium">Available Perks</h4>
                {[
                  {
                    name: "15% Off Next Ticket",
                    points: "500 pts"
                  },
                  {
                    name: "VIP Access Upgrade",
                    points: "1000 pts"
                  }
                ].map((perk, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border hover:shadow-md transition-all duration-300">
                    <div>
                      <h3 className="font-medium">{perk.name}</h3>
                      <p className="text-sm text-muted-foreground">{perk.points}</p>
                    </div>
                    <Button variant="secondary" size="sm">Redeem</Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link to="/dashboard/user/rewards">View Rewards Hub</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  value: string;
  linkTo: string;
  color: string;
  iconColor: string;
}

const DashboardCard = ({ title, description, icon, value, linkTo, color, iconColor }: DashboardCardProps) => {
  return (
    <Card className="hover:shadow-md transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center space-x-4">
          <div className={`p-2 rounded-full ${color}`}>
            <div className={iconColor}>{icon}</div>
          </div>
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" asChild className="w-full">
          <Link to={linkTo} className="flex items-center justify-center gap-1">
            <span>View Details</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserDashboard;
