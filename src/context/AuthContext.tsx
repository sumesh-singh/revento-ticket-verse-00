
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { createUserProfile, getUserProfile, updateUserProfile } from '../services/FirestoreService';
import { toast } from '@/hooks/use-toast';

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
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Get user data from Firestore
          const userProfileResult = await getUserProfile(firebaseUser.uid);
          
          if (userProfileResult.success) {
            const userData = userProfileResult.data;
            setUser({
              id: firebaseUser.uid,
              username: userData.username || '',
              name: userData.name || firebaseUser.displayName || 'User',
              email: firebaseUser.email || '',
              role: userData.role || 'user',
              rewardPoints: userData.rewardPoints || 0,
              avatarUrl: userData.avatarUrl || firebaseUser.photoURL || undefined,
            });
          } else {
            // Fallback to just Firebase auth data if profile not found
            setUser({
              id: firebaseUser.uid,
              username: firebaseUser.displayName?.toLowerCase().replace(/\s+/g, '') || '',
              name: firebaseUser.displayName || 'User',
              email: firebaseUser.email || '',
              role: 'user',
              avatarUrl: firebaseUser.photoURL || undefined,
            });
          }
          
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const register = async (email: string, password: string, userData: any) => {
    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Update Firebase Auth profile with username/display name
      if (userData.name) {
        await updateProfile(firebaseUser, { displayName: userData.name });
      }
      
      // Create user profile in Firestore
      await createUserProfile(firebaseUser.uid, {
        username: userData.username,
        name: userData.name,
        email: firebaseUser.email,
        role: userData.role || 'user',
        rewardPoints: 0,
      });
      
      toast({
        title: "Registration successful",
        description: "Your account has been created.",
      });
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateUser = async (data: Partial<User>) => {
    if (!user) return;
    
    try {
      await updateUserProfile(user.id, data);
      
      // Update local state
      setUser(prev => prev ? { ...prev, ...data } : null);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
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

  const logout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error: any) {
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      });
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
