
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Plus, MoreHorizontal, Edit, Copy, Trash2, Eye, Users, Ticket, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const OrganizerEvents = () => {
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    // Load events from localStorage on component mount
    const savedEvents = JSON.parse(localStorage.getItem('organizer_events') || '[]');
    
    // If no saved events exist, use the default sample events
    if (savedEvents.length === 0) {
      const defaultEvents = [
        {
          id: 1,
          name: "Tech Conference 2025",
          date: "April 15, 2025",
          time: "9:00 AM - 5:00 PM",
          location: "Convention Center, Downtown",
          status: "published",
          salesCount: 248,
          viewCount: 1856,
          image: "/placeholder.svg"
        },
        {
          id: 2,
          name: "Developer Hackathon",
          date: "May 12, 2025",
          time: "10:00 AM - 6:00 PM",
          location: "Innovation Hub",
          status: "draft",
          salesCount: 0,
          viewCount: 0,
          image: "/placeholder.svg"
        },
        {
          id: 3,
          name: "AI Summit",
          date: "June 20, 2025",
          time: "9:00 AM - 4:00 PM",
          location: "Research Center",
          status: "published",
          salesCount: 89,
          viewCount: 742,
          image: "/placeholder.svg"
        },
        {
          id: 4,
          name: "Startup Networking",
          date: "July 5, 2025",
          time: "6:00 PM - 9:00 PM",
          location: "Tech Campus",
          status: "upcoming",
          salesCount: 42,
          viewCount: 385,
          image: "/placeholder.svg"
        }
      ];
      setEvents(defaultEvents);
    } else {
      setEvents(savedEvents);
    }
  }, []);
  
  const handleDeleteEvent = (id) => {
    const updatedEvents = events.filter(event => event.id !== id);
    localStorage.setItem('organizer_events', JSON.stringify(updatedEvents));
    setEvents(updatedEvents);
    
    toast({
      title: "Event Deleted",
      description: "Your event has been successfully deleted.",
      variant: "default",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events Manager</h1>
          <p className="text-muted-foreground mt-2">Create and manage your events</p>
        </div>
        <Button asChild>
          <Link to="/dashboard/organizer/create-event" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Create Event</span>
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Events</CardTitle>
            <CardDescription>All your created events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{events.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Attendees</CardTitle>
            <CardDescription>People registered</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {events.reduce((acc, event) => acc + (event.salesCount || 0), 0)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Views</CardTitle>
            <CardDescription>Event page impressions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {events.reduce((acc, event) => acc + (event.viewCount || 0), 0)}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Events</CardTitle>
          <CardDescription>Manage and monitor all your events</CardDescription>
        </CardHeader>
        <CardContent>
          {events.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">You haven't created any events yet.</p>
              <Button asChild className="mt-4">
                <Link to="/dashboard/organizer/create-event">Create Your First Event</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-5">
              {events.map((event) => (
                <div key={event.id} className="relative flex flex-col md:flex-row gap-4 p-4 border rounded-lg hover:shadow-md transition-all duration-300">
                  <div className="w-full md:w-40 h-24 rounded-md overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.name || event.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{event.name || event.title}</h3>
                          <EventStatusBadge status={event.status} />
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {event.date} • {event.time || `${event.time || '00:00'} - ${event.endTime || '23:59'}`}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{event.location}</p>
                      </div>
                      
                      <div className="hidden md:flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8">
                          <Edit className="w-4 h-4 mr-1" />
                          <span>Edit</span>
                        </Button>
                        <Button variant="outline" size="sm" className="h-8">
                          <Eye className="w-4 h-4 mr-1" />
                          <span>Preview</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDeleteEvent(event.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <Ticket className="w-4 h-4 text-blue-500" />
                        <div>
                          <p className="text-xs text-muted-foreground">Tickets Sold</p>
                          <p className="font-medium">{event.salesCount || 0}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-500" />
                        <div>
                          <p className="text-xs text-muted-foreground">Page Views</p>
                          <p className="font-medium">{event.viewCount || 0}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-green-500" />
                        <div>
                          <p className="text-xs text-muted-foreground">Status</p>
                          <p className="font-medium capitalize">{event.status}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute md:hidden top-3 right-3">
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        {events.length > 5 && (
          <CardFooter className="flex justify-between">
            <Button variant="outline">Previous</Button>
            <Button variant="outline">Next</Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

const EventStatusBadge = ({ status }: { status: string }) => {
  let bgColor = "bg-gray-100 text-gray-800";
  
  if (status === "published") {
    bgColor = "bg-green-100 text-green-800";
  } else if (status === "draft") {
    bgColor = "bg-amber-100 text-amber-800";
  } else if (status === "upcoming") {
    bgColor = "bg-blue-100 text-blue-800";
  }
  
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${bgColor}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default OrganizerEvents;
