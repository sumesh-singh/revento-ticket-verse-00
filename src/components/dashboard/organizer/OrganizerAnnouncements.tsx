
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, MessageSquare, Edit, Trash2, Send, Globe, Bell, Users, Filter, Calendar } from 'lucide-react';

const OrganizerAnnouncements = () => {
  const announcements = [
    {
      id: 1,
      title: "Important Information for Tech Conference",
      content: "Please bring your photo ID for check-in. The venue has changed to the Main Convention Center.",
      date: "April 10, 2025",
      status: "scheduled",
      event: "Tech Conference 2025",
      recipients: "All Attendees",
      channels: ["Email", "App"],
      scheduledFor: "Apr 12, 2025 9:00 AM"
    },
    {
      id: 2,
      title: "Hackathon Schedule Update",
      content: "We've updated the schedule for the Developer Hackathon. Please check the event page for details.",
      date: "May 5, 2025",
      status: "draft",
      event: "Developer Hackathon",
      recipients: "All Attendees",
      channels: ["Email"]
    },
    {
      id: 3,
      title: "Keynote Speaker Announcement",
      content: "We're excited to announce our keynote speaker for the AI Summit: Dr. Jane Smith, AI Research Director at TechCorp.",
      date: "June 1, 2025",
      status: "sent",
      event: "AI Summit",
      recipients: "All Attendees",
      channels: ["Email", "SMS", "App"],
      sentOn: "Mar 15, 2025 10:15 AM",
      openRate: "68%"
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Announcements</h1>
          <p className="text-muted-foreground mt-2">Communicate with your attendees</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>New Announcement</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Announcements</CardTitle>
            <CardDescription>All communications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{announcements.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Open Rate</CardTitle>
            <CardDescription>Average engagement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">68%</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Click Rate</CardTitle>
            <CardDescription>Link engagement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">42%</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Button variant="outline" size="sm" className="gap-1">
          <Calendar className="h-4 w-4" />
          <span>All Time</span>
        </Button>
        <Button variant="outline" size="sm" className="gap-1">
          <Filter className="h-4 w-4" />
          <span>All Events</span>
        </Button>
        <Button variant="outline" size="sm" className="gap-1">
          <Bell className="h-4 w-4" />
          <span>All Channels</span>
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Announcements</CardTitle>
          <CardDescription>Manage all your communication with attendees</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="border rounded-lg p-4 hover:shadow-md transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{announcement.title}</h3>
                      <StatusBadge status={announcement.status} />
                    </div>
                    
                    <p className="text-sm text-muted-foreground mt-1">
                      {announcement.event}
                      {announcement.status === "scheduled" && ` • Scheduled for ${announcement.scheduledFor}`}
                      {announcement.status === "sent" && ` • Sent on ${announcement.sentOn}`}
                    </p>
                    
                    <div className="mt-3">
                      <p className="text-sm line-clamp-2">{announcement.content}</p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3 mt-3">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="w-3 h-3" />
                        <span>{announcement.recipients}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {announcement.channels.map((channel, index) => (
                          <span key={index} className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                            {channel}
                          </span>
                        ))}
                      </div>
                      
                      {announcement.status === "sent" && announcement.openRate && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <span>Open rate: {announcement.openRate}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex md:flex-col gap-2 mt-3 md:mt-0">
                    {announcement.status === "draft" && (
                      <>
                        <Button variant="default" size="sm" className="gap-1">
                          <Send className="w-3.5 h-3.5" />
                          <span>Send</span>
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </Button>
                      </>
                    )}
                    
                    {announcement.status === "scheduled" && (
                      <>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1 border-red-200 text-red-500 hover:bg-red-50">
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Cancel</span>
                        </Button>
                      </>
                    )}
                    
                    {announcement.status === "sent" && (
                      <>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Globe className="w-3.5 h-3.5" />
                          <span>View</span>
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Duplicate</span>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Previous</Button>
          <Button variant="outline">Next</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Announcement Templates</CardTitle>
          <CardDescription>Quick-start your communications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Event Reminder", description: "Remind attendees about upcoming events" },
              { title: "Schedule Change", description: "Inform about changes to the event schedule" },
              { title: "Venue Update", description: "Provide updated venue information" },
              { title: "Post-Event Thank You", description: "Thank attendees after an event" },
              { title: "Feedback Request", description: "Ask for feedback after an event" },
              { title: "Special Offer", description: "Announce special discounts or offers" }
            ].map((template, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-all duration-300 cursor-pointer">
                <h3 className="font-medium">{template.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  let bgColor = "bg-gray-100 text-gray-800";
  
  if (status === "sent") {
    bgColor = "bg-green-100 text-green-800";
  } else if (status === "draft") {
    bgColor = "bg-amber-100 text-amber-800";
  } else if (status === "scheduled") {
    bgColor = "bg-blue-100 text-blue-800";
  }
  
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${bgColor}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default OrganizerAnnouncements;
