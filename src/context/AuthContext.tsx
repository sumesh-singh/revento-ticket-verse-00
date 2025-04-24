
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { createUserProfile } from '@/services/SupabaseService';

export type User = {
  id: string;
  username: string;
  name: string;
  email: string;
  role: 'user' | 'organizer';
  rewardPoints?: number;
  avatarUrl?: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, userData: any) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setIsAuthenticated(true);
          // Don't call additional Supabase functions directly in the callback
          // Use setTimeout to avoid potential deadlocks
          setTimeout(async () => {
            try {
              const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
              
              if (profile) {
                setUser({
                  id: profile.id,
                  username: profile.username,
                  name: profile.name,
                  email: profile.email,
                  role: profile.role,
                  rewardPoints: profile.reward_points,
                  avatarUrl: profile.avatar_url
                });
              }
            } catch (error) {
              console.error('Error fetching user profile:', error);
            }
          }, 0);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    );

    // Check for existing session
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          setIsAuthenticated(true);
          
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (profile) {
            setUser({
              id: profile.id,
              username: profile.username,
              name: profile.name,
              email: profile.email,
              role: profile.role,
              rewardPoints: profile.reward_points,
              avatarUrl: profile.avatar_url
            });
          }
        }
      } catch (error) {
        console.error('Error checking user session:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkUser();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

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
      
      // Register with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: userData.name,
            username: userData.username,
            role: userData.role,
            orgName: userData.orgName
          }
        }
      });

      if (error) throw error;
      
      if (!data.user) {
        throw new Error("User registration failed");
      }
      
      // Create user profile explicitly
      const profileData = {
        id: data.user.id,
        username: userData.username,
        name: userData.name,
        email: email,
        role: userData.role,
        org_name: userData.orgName
      };
      
      // Create user profile in our profiles table
      const { success, error: profileError } = await createUserProfile(data.user.id, profileData);
      
      if (!success) {
        throw new Error(profileError || "Failed to create user profile");
      }

      toast({
        title: "Registration successful",
        description: "Your account has been created.",
      });

      return;
    } catch (error: any) {
      console.error('Registration error:', error);
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
      
      setIsAuthenticated(false);
      setUser(null);
      
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Logout error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateUser = async (data: Partial<User>) => {
    if (!user) return;
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: data.name,
          username: data.username,
          email: data.email,
          org_name: data.role === 'organizer' ? data.avatarUrl : null,
          avatar_url: data.avatarUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      // Update local user state
      setUser({ ...user, ...data });
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      register, 
      logout, 
      updateUser,
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
