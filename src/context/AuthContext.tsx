
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@/types/auth.types';
import { useAuthOperations } from '@/hooks/useAuthOperations';

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
  const authOperations = useAuthOperations();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        if (session) {
          setIsAuthenticated(true);
          // Use setTimeout to avoid potential deadlocks
          setTimeout(async () => {
            try {
              const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
              
              console.log('Profile fetched on auth change:', profile);
              
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
              } else {
                console.warn('No profile found for user', session.user.id);
              }
            } catch (error) {
              console.error('Error fetching user profile on auth change:', error);
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
          console.log('Existing session found for user:', session.user.id);
          setIsAuthenticated(true);
          
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          console.log('Profile from existing session:', profile);
          
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
          } else {
            console.warn('No profile found for existing session user', session.user.id);
          }
        } else {
          console.log('No existing session found');
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

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      await authOperations.login(email, password);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (email: string, password: string, userData: any) => {
    setLoading(true);
    try {
      await authOperations.register(email, password, userData);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const success = await authOperations.logout();
      if (success) {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleUpdateUser = async (data: Partial<User>) => {
    if (!user) return;
    try {
      await authOperations.updateUser(user.id, data);
      // Update local user state
      setUser({ ...user, ...data });
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login: handleLogin, 
      register: handleRegister, 
      logout: handleLogout, 
      updateUser: handleUpdateUser,
      loading: loading || authOperations.loading
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
