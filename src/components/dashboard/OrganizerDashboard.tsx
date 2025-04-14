import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, BarChart2, MessageSquare, Users, ChevronRight, PlusCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const OrganizerDashboard = () => {
  const [events, setEvents] = useState([]);
  const [recentActivity, setRecentActivity] = useState([
    {
      action: "New ticket purchase",
      event: "Tech Conference 2025",
      time: "2 hours ago"
    },
    {
      action: "Announcement published",
      event: "Developer Hackathon",
      time: "Yesterday"
    },
    {
      action: "Event schedule updated",
      event: "AI Summit",
      time: "2 days ago"
    },
    {
      action: "New review (5 stars)",
      event: "Tech Conference 2025",
      time: "3 days ago"
    }
  ]);

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('organizer_events') || '[]');
    
    if (savedEvents.length === 0) {
      const defaultEvents = [
        {
          id: 1,
          name: "Tech Conference 2025",
          date: "Apr 15, 2025",
          attendees: "248 Registered",
          status: "Published"
        },
        {
          id: 2,
          name: "Developer Hackathon",
          date: "May 12, 2025",
          attendees: "156 Registered",
          status: "Draft"
        },
        {
          id: 3,
          name: "AI Summit",
          date: "Jun 20, 2025",
          attendees: "89 Registered",
          status: "Published"
        }
      ];
      setEvents(defaultEvents);
    } else {
      const formattedEvents = savedEvents.map(event => ({
        id: event.id,
        name: event.title || event.name,
        date: event.date ? new Date(event.date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }) : 'No date',
        attendees: `${event.salesCount || 0} Registered`,
        status: event.status.charAt(0).toUpperCase() + event.status.slice(1)
      }));
      
      setEvents(formattedEvents.slice(0, 3));
      
      if (savedEvents.length > 0 && savedEvents[0].createdAt) {
        const latestEvent = savedEvents[0];
        const newActivity = {
          action: "New event created",
          event: latestEvent.title || latestEvent.name,
          time: "Just now"
        };
        setRecentActivity([newActivity, ...recentActivity.slice(0, 3)]);
      }
    }
  }, []);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Organizer Dashboard</h1>
        <Button asChild>
          <Link to="/dashboard/organizer/create-event" className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4" />
            <span>Create Event</span>
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title="Managed Events"
          description="Your active and upcoming events"
          icon={<Calendar className="w-5 h-5" />}
          value={`${events.length} Active`}
          linkTo="/dashboard/organizer/events"
          color="bg-purple-50"
          iconColor="text-purple-500"
        />
        
        <DashboardCard
          title="Analytics"
          description="Track attendance and engagement"
          icon={<BarChart2 className="w-5 h-5" />}
          value="2.5K Views"
          linkTo="/dashboard/organizer/analytics"
          color="bg-blue-50"
          iconColor="text-blue-500"
        />
        
        <DashboardCard
          title="Announcements"
          description="Communicate with attendees"
          icon={<MessageSquare className="w-5 h-5" />}
          value="5 Drafts"
          linkTo="/dashboard/organizer/announcements"
          color="bg-pink-50"
          iconColor="text-pink-500"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Event Performance</CardTitle>
            <CardDescription>Last 30 days metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 text-center">
                <p className="text-muted-foreground text-sm">Ticket Sales</p>
                <p className="text-3xl font-bold mt-1">1,248</p>
                <p className="text-green-500 text-sm">+12% from last month</p>
              </div>
              <div className="border rounded-lg p-4 text-center">
                <p className="text-muted-foreground text-sm">Revenue</p>
                <p className="text-3xl font-bold mt-1">$24.8K</p>
                <p className="text-green-500 text-sm">+8% from last month</p>
              </div>
              <div className="border rounded-lg p-4 text-center">
                <p className="text-muted-foreground text-sm">Attendees</p>
                <p className="text-3xl font-bold mt-1">856</p>
                <p className="text-amber-500 text-sm">+2% from last month</p>
              </div>
              <div className="border rounded-lg p-4 text-center">
                <p className="text-muted-foreground text-sm">Reviews</p>
                <p className="text-3xl font-bold mt-1">4.8/5</p>
                <p className="text-green-500 text-sm">+0.2 from last month</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link to="/dashboard/organizer/analytics">View Full Analytics</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Events you're organizing</CardDescription>
          </CardHeader>
          <CardContent>
            {events.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-muted-foreground mb-3">You haven't created any events yet</p>
                <Button asChild size="sm">
                  <Link to="/dashboard/organizer/create-event">Create Your First Event</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {events.map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border hover:shadow-md transition-all duration-300">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{event.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          event.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {event.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{event.date} • {event.attendees}</p>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/dashboard/organizer/events">
                        <span className="sr-only">View event</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link to="/dashboard/organizer/events">Manage Events</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates from your events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-white rounded-lg border hover:shadow-md transition-all duration-300">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <div>
                  <h3 className="font-medium">{activity.action}</h3>
                  <p className="text-sm text-muted-foreground">{activity.event} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
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

export default OrganizerDashboard;
