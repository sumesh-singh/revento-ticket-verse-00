
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import UserDashboard from '@/components/dashboard/UserDashboard';
import OrganizerDashboard from '@/components/dashboard/OrganizerDashboard';
import UserTickets from '@/components/dashboard/user/UserTickets';
import UserRewards from '@/components/dashboard/user/UserRewards';
import UserEvents from '@/components/dashboard/user/UserEvents';
import UserProfile from '@/components/dashboard/user/UserProfile';
import OrganizerEvents from '@/components/dashboard/organizer/OrganizerEvents';
import OrganizerAnalytics from '@/components/dashboard/organizer/OrganizerAnalytics';
import OrganizerAnnouncements from '@/components/dashboard/organizer/OrganizerAnnouncements';
import OrganizerProfile from '@/components/dashboard/organizer/OrganizerProfile';
import EventCreation from '@/components/dashboard/organizer/EventCreation';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { isAuthenticated, user, loading } = useAuth();
  const navigate = useNavigate();
  
  // Use the actual user role from context instead of a local state
  const userRole = user?.role || 'user';
  
  // Redirect to login if not authenticated and not loading
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access the dashboard.",
        variant: "destructive",
      });
      navigate('/auth');
    }
  }, [isAuthenticated, loading, navigate]);
  
  // Show loading or redirect to auth while checking authentication
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <DashboardLayout userRole={userRole}>
      <Routes>
        {/* Default dashboard route */}
        <Route path="/" element={
          userRole === 'user' 
            ? <Navigate to="/dashboard/user" replace />
            : <Navigate to="/dashboard/organizer" replace />
        } />
        
        {/* User dashboard routes */}
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/user/tickets" element={<UserTickets />} />
        <Route path="/user/rewards" element={<UserRewards />} />
        <Route path="/user/events" element={<UserEvents />} />
        <Route path="/user/profile" element={<UserProfile />} />
        
        {/* Organizer dashboard routes */}
        <Route path="/organizer" element={<OrganizerDashboard />} />
        <Route path="/organizer/events" element={<OrganizerEvents />} />
        <Route path="/organizer/analytics" element={<OrganizerAnalytics />} />
        <Route path="/organizer/announcements" element={<OrganizerAnnouncements />} />
        <Route path="/organizer/profile" element={<OrganizerProfile />} />
        <Route path="/organizer/create-event" element={<EventCreation />} />
        
        {/* Catch-all for dashboard routes */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;
