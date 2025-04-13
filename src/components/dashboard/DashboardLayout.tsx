
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Calendar, BarChart2, User, Ticket, Star, MapPin, MessageSquare, PlusCircle, LogOut, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole: 'user' | 'organizer';
  onToggleRole: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, userRole, onToggleRole }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname.includes(path);

  const userNavItems = [
    { icon: Ticket, title: 'My Tickets', path: '/dashboard/user/tickets' },
    { icon: Star, title: 'Rewards Hub', path: '/dashboard/user/rewards' },
    { icon: MapPin, title: 'Nearby Events', path: '/dashboard/user/events' },
    { icon: User, title: 'Profile', path: '/dashboard/user/profile' },
  ];

  const organizerNavItems = [
    { icon: Calendar, title: 'Event Manager', path: '/dashboard/organizer/events' },
    { icon: BarChart2, title: 'Analytics', path: '/dashboard/organizer/analytics' },
    { icon: MessageSquare, title: 'Announcements', path: '/dashboard/organizer/announcements' },
    { icon: User, title: 'Profile', path: '/dashboard/organizer/profile' },
  ];

  const navItems = userRole === 'user' ? userNavItems : organizerNavItems;

  return (
    <div className="min-h-screen bg-gray-50" data-role={userRole}>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <Sidebar className="border-r border-gray-200">
            <SidebarHeader className="flex flex-col items-center p-4">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <span className="text-white font-bold text-xl">R</span>
                </div>
                <span className="font-display font-bold text-xl bg-clip-text text-transparent bg-gradient-primary">
                  Revento
                </span>
              </Link>
              
              <div className="w-full mb-2">
                <div className="role-switch w-full p-1 bg-gray-100 rounded-full flex">
                  <button 
                    className={cn(
                      "w-1/2 text-sm font-medium py-2 rounded-full transition-all duration-300 focus:outline-none",
                      userRole === 'user' 
                        ? "bg-primary text-white shadow-md" 
                        : "text-gray-500 hover:text-gray-700"
                    )}
                    onClick={userRole === 'organizer' ? onToggleRole : undefined}
                  >
                    User
                  </button>
                  <button 
                    className={cn(
                      "w-1/2 text-sm font-medium py-2 rounded-full transition-all duration-300 focus:outline-none",
                      userRole === 'organizer' 
                        ? "bg-purple-600 text-white shadow-md" 
                        : "text-gray-500 hover:text-gray-700"
                    )}
                    onClick={userRole === 'user' ? onToggleRole : undefined}
                  >
                    Organizer
                  </button>
                </div>
              </div>
            </SidebarHeader>
            
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton asChild isActive={isActive(item.path)}>
                        <Link to={item.path}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>
              
              {userRole === 'organizer' && (
                <SidebarGroup className="mt-4">
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link to="/dashboard/organizer/create-event" className="text-purple-600 hover:text-purple-700">
                          <PlusCircle className="h-4 w-4" />
                          <span>Create Event</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroup>
              )}
            </SidebarContent>
            
            <SidebarFooter className="mt-auto">
              <SidebarGroup>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/settings">
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/">
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            </SidebarFooter>
          </Sidebar>
          
          <div className="flex-1 overflow-auto">
            <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
