
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthHeader from '@/components/auth/AuthHeader';
import RoleToggle from '@/components/auth/RoleToggle';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import PasswordRecoveryForm from '@/components/auth/PasswordRecoveryForm';

type UserRole = 'user' | 'organizer';
type AuthMode = 'login' | 'signup' | 'forgot-password';

type LoginFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

type SignupFormValues = {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  orgName?: string;
  termsAccepted: boolean;
};

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register: registerUser, isAuthenticated, loading } = useAuth();
  const [role, setRole] = useState<UserRole>('user');
  const [mode, setMode] = useState<AuthMode>('login');
  const [recoverOpen, setRecoverOpen] = useState(false);
  const [recoverEmail, setRecoverEmail] = useState("");
  const [signupError, setSignupError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleParam = params.get('role');
    const modeParam = params.get('mode');
    
    if (roleParam === 'organizer') setRole('organizer');
    if (modeParam === 'signup') setMode('signup');
  }, [location]);

  const toggleRole = (newRole: UserRole) => {
    if (newRole) {
      setRole(newRole);
    }
  };

  const handleLoginSubmit = async (data: LoginFormValues) => {
    try {
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleSignupSubmit = async (data: SignupFormValues) => {
    setSignupError("");
    
    if (!data.termsAccepted) {
      toast({
        title: "Terms required",
        description: "You must accept the Terms of Service and Privacy Policy.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Clear any previous errors
      setSignupError("");
      
      const userData = {
        name: data.fullName,
        username: data.username,
        role: role,
        orgName: role === 'organizer' ? data.orgName : undefined
      };
      
      console.log('Signup data:', { email: data.email, userData });
      
      await registerUser(data.email, data.password, userData);
      
      toast({
        title: "Account created!",
        description: `Your ${role} account has been created successfully.`,
      });
      
      // Redirect will happen automatically via the useEffect since isAuthenticated will be true
    } catch (error: any) {
      console.error('Registration error:', error);
      
      // Set specific error state for the component
      setSignupError(error.message || "Failed to create account");
      
      toast({
        title: "Registration error",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePasswordRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recoverEmail) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Recovery instructions sent",
      description: "Please check your email for password recovery instructions.",
    });
    
    setRecoverOpen(false);
  };

  return (
    <>
      <AuthLayout role={role}>
        <AuthHeader mode={mode} />
        <RoleToggle role={role} onRoleChange={toggleRole} />
        
        <div className="mt-6">
          {mode === 'login' ? (
            <LoginForm
              onSubmit={handleLoginSubmit}
              onForgotPassword={() => setRecoverOpen(true)}
              onSwitchMode={() => setMode('signup')}
              loading={loading}
            />
          ) : (
            <SignupForm
              onSubmit={handleSignupSubmit}
              onSwitchMode={() => setMode('login')}
              loading={loading}
              role={role}
              errorMessage={signupError}
            />
          )}
        </div>
        
        {(mode === 'login' || mode === 'signup') && (
          <>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
              <Button variant="outline" className="w-full">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    fill="currentColor"
                  />
                </svg>
                Facebook
              </Button>
            </div>
          </>
        )}
      </AuthLayout>
      
      <Sheet open={recoverOpen} onOpenChange={setRecoverOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Reset Password</SheetTitle>
            <SheetDescription>
              Enter your email address and we'll send you instructions to reset your password.
            </SheetDescription>
          </SheetHeader>
          <PasswordRecoveryForm
            email={recoverEmail}
            onEmailChange={setRecoverEmail}
            onSubmit={handlePasswordRecovery}
            onCancel={() => setRecoverOpen(false)}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Auth;
