
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { createUserProfile } from '@/services/SupabaseService';
import { User } from '@/types/auth.types';

export function useAuthOperations() {
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });

      return;
    } catch (error: any) {
      toast({
        title: "Authentication error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, userData: any) => {
    setLoading(true);
    try {
      console.log('Registration data:', { email, userData });
      
      // First, sign up with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: userData.name,
            username: userData.username,
            role: userData.role,
            orgName: userData.orgName
          },
          emailRedirectTo: window.location.origin + '/auth'
        }
      });

      if (error) {
        console.error('Auth signup error:', error);
        throw error;
      }
      
      if (!data?.user?.id) {
        throw new Error("User registration failed - no user ID returned");
      }

      console.log('Auth signup successful, user created with ID:', data.user.id);
      
      // Create user profile with properly formatted data
      const profileData = {
        id: data.user.id,
        username: userData.username,
        name: userData.name,
        email,
        role: userData.role,
        org_name: userData.role === 'organizer' ? userData.orgName : null
      };
      
      console.log('Creating profile with data:', profileData);
      
      // Explicit profile creation step
      const profileResult = await createUserProfile(data.user.id, profileData);
      
      if (!profileResult.success) {
        console.error('Profile creation failed:', profileResult.error);
        throw new Error(profileResult.error || "Failed to create user profile");
      }

      console.log('Profile created successfully:', profileResult.data);

      toast({
        title: "Registration successful",
        description: "Your account has been created.",
      });
      
      return { userId: data.user.id };
    } catch (error: any) {
      console.error('Registration process error:', error);
      toast({
        title: "Registration error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: "Logout error",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  const updateUser = async (userId: string, data: Partial<User>) => {
    try {
      const updateData: Record<string, any> = {
        name: data.name,
        username: data.username,
        email: data.email,
        updated_at: new Date().toISOString()
      };
      
      if (data.role === 'organizer') {
        updateData.org_name = data.avatarUrl || null;
      }
      
      if (data.avatarUrl) {
        updateData.avatar_url = data.avatarUrl;
      }
      
      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', userId);

      if (error) throw error;
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  return {
    login,
    register,
    logout,
    updateUser,
    loading
  };
}
