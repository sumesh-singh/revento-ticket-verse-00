
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
    console.log("Setting up Firebase auth listener");
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          console.log("Firebase user authenticated:", firebaseUser.uid);
          // Get user data from Firestore
          const userProfileResult = await getUserProfile(firebaseUser.uid);
          
          if (userProfileResult.success && userProfileResult.data) {
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
            console.log("User profile loaded from Firestore");
          } else {
            // Fallback to just Firebase auth data if profile not found
            console.log("No Firestore profile found, using Firebase auth data");
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
        console.log("No Firebase user found, not authenticated");
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      console.log("Attempting login with:", email);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful for:", userCredential.user.uid);
      
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    } catch (error: any) {
      console.error("Login error:", error.code, error.message);
      let errorMessage = "Invalid email or password";
      
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = "Invalid email or password";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Too many failed login attempts. Please try again later.";
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = "Network error. Please check your connection.";
      } else {
        errorMessage = error.message;
      }
      
      toast({
        title: "Login failed",
        description: errorMessage,
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
      console.log("Attempting registration for:", email);
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      console.log("User created in Firebase Auth:", firebaseUser.uid);
      
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
        ...(userData.orgName && { orgName: userData.orgName })
      });
      
      console.log("User profile created in Firestore");
      
      toast({
        title: "Registration successful",
        description: "Your account has been created.",
      });
    } catch (error: any) {
      console.error("Registration error:", error.code, error.message);
      let errorMessage = "Registration failed";
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "Email is already in use. Please try another email or login.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Invalid email address.";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "Password is too weak. Please use a stronger password.";
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = "Network error. Please check your connection.";
      } else {
        errorMessage = error.message;
      }
      
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
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
