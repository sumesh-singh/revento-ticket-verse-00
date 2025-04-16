import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  Building, 
  User as UserIcon, 
  CreditCard, 
  FileText,
  AlertTriangle,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { toast } from '@/hooks/use-toast';
import PasswordStrengthMeter from '@/components/PasswordStrengthMeter';
import { useForm } from 'react-hook-form';
import AuthIllustration from '@/components/AuthIllustration';
import { useAuth } from '@/context/AuthContext';

type UserRole = 'user' | 'organizer';
type AuthMode = 'login' | 'signup' | 'forgot-password';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register: registerUser, isAuthenticated } = useAuth();
  const [role, setRole] = useState<UserRole>('user');
  const [mode, setMode] = useState<AuthMode>('login');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [recoverOpen, setRecoverOpen] = useState(false);
  const [recoverEmail, setRecoverEmail] = useState("");
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const watchPassword = watch("password", "");

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Effect to initialize from query params if any
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleParam = params.get('role');
    const modeParam = params.get('mode');
    
    if (roleParam === 'organizer') setRole('organizer');
    if (modeParam === 'signup') setMode('signup');
  }, [location]);

  const toggleRole = (newRole: UserRole) => {
    setRole(newRole);
    reset(); // Clear form when changing roles
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleFormSubmit = async (data: any) => {
    setIsFormSubmitting(true);
    
    try {
      if (mode === 'login') {
        await login(data.email, data.password);
        
        toast({
          title: "Welcome back!",
          description: `You have successfully logged in as a ${role}.`,
        });
        
        navigate('/dashboard');
      } else if (mode === 'signup') {
        // For demo: check if email exists
        if (data.email === 'existing@example.com') {
          toast({
            title: "Email already exists",
            description: "Please use a different email or login with this one.",
            variant: "destructive",
          });
          setIsFormSubmitting(false);
          return;
        }
        
        await registerUser(data.email, data.password);
        
        toast({
          title: "Account created!",
          description: `Your ${role} account has been created successfully.`,
        });
        
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setIsFormSubmitting(false);
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

  // Render specific forms based on mode
  const renderForm = () => {
    switch (mode) {
      case 'login':
        return (
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 w-full">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    placeholder="your@email.com"
                    className="pl-10"
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500 flex items-center mt-1">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    {errors.email.message as string}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type={passwordVisible ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    {...register("password", { 
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters"
                      }
                    })}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-8 w-8 p-0"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                    <span className="sr-only">Toggle password visibility</span>
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 flex items-center mt-1">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    {errors.password.message as string}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm">Remember me</Label>
              </div>
              <Button
                type="button"
                variant="link"
                className="text-sm"
                onClick={() => setRecoverOpen(true)}
              >
                Forgot password?
              </Button>
            </div>
            
            <Button type="submit" className="w-full" disabled={isFormSubmitting}>
              {isFormSubmitting ? "Logging in..." : "Login"}
            </Button>
            
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Button
                type="button"
                variant="link"
                className="p-0"
                onClick={() => setMode('signup')}
              >
                Sign up
              </Button>
            </div>
          </form>
        );
        
      case 'signup':
        return (
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 w-full">
            <div className="space-y-4">
              {role === 'organizer' && (
                <div className="space-y-2 business-fields">
                  <Label htmlFor="orgName">Organization Name</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="orgName"
                      placeholder="Company or Institution Name"
                      className="pl-10"
                      {...register("orgName", { 
                        required: role === 'organizer' ? "Organization name is required" : false 
                      })}
                    />
                  </div>
                  {errors.orgName && (
                    <p className="text-sm text-red-500 flex items-center mt-1">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      {errors.orgName.message as string}
                    </p>
                  )}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="fullName"
                    placeholder="Your full name"
                    className="pl-10"
                    {...register("fullName", { required: "Full name is required" })}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-sm text-red-500 flex items-center mt-1">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    {errors.fullName.message as string}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    placeholder="your@email.com"
                    className="pl-10"
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500 flex items-center mt-1">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    {errors.email.message as string}
                  </p>
                )}
              </div>
              
              {role === 'organizer' && (
                <div className="space-y-2 business-fields">
                  <Label htmlFor="taxId">Tax ID / Registration Number</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="taxId"
                      placeholder="e.g., EIN: 12-3456789"
                      className="pl-10"
                      {...register("taxId", { 
                        required: role === 'organizer' ? "Tax ID is required" : false 
                      })}
                    />
                  </div>
                  {errors.taxId && (
                    <p className="text-sm text-red-500 flex items-center mt-1">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      {errors.taxId.message as string}
                    </p>
                  )}
                  
                  <div className="mt-4">
                    <Label htmlFor="document">Verification Document (PDF)</Label>
                    <div className="mt-2 flex items-center">
                      <label
                        htmlFor="document-upload"
                        className="cursor-pointer relative bg-white border border-gray-300 rounded-md py-2 px-3 flex items-center justify-center hover:bg-gray-50 w-full"
                      >
                        <FileText className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">Upload Document</span>
                        <input
                          id="document-upload"
                          type="file"
                          className="sr-only"
                          accept=".pdf,.png,.jpg"
                          {...register("document", { 
                            required: role === 'organizer' ? "Document is required" : false 
                          })}
                        />
                      </label>
                    </div>
                    {errors.document && (
                      <p className="text-sm text-red-500 flex items-center mt-1">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        {errors.document.message as string}
                      </p>
                    )}
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type={passwordVisible ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    {...register("password", { 
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters"
                      }
                    })}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-8 w-8 p-0"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                    <span className="sr-only">Toggle password visibility</span>
                  </Button>
                </div>
                <PasswordStrengthMeter password={watchPassword} />
                {errors.password && (
                  <p className="text-sm text-red-500 flex items-center mt-1">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    {errors.password.message as string}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    {...register("confirmPassword", { 
                      required: "Please confirm your password",
                      validate: value => value === watchPassword || "Passwords do not match"
                    })}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 flex items-center mt-1">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    {errors.confirmPassword.message as string}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-sm">
                I agree to the <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
              </Label>
            </div>
            
            <Button type="submit" className="w-full" disabled={isFormSubmitting}>
              {isFormSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
            
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Button
                type="button"
                variant="link"
                className="p-0"
                onClick={() => setMode('login')}
              >
                Log in
              </Button>
            </div>
          </form>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/90 to-secondary relative overflow-hidden">
          <AuthIllustration role={role} />
        </div>
        
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-2 bg-clip-text text-transparent bg-gradient-primary">
                {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Join Revento' : 'Verify Your Account'}
              </h1>
              <p className="text-gray-600">
                {mode === 'login' || mode === 'signup' 
                  ? 'Earn rewards for every win in events & hackathons!' 
                  : 'Complete the verification process to continue'}
              </p>
            </div>
            
            {(mode === 'login' || mode === 'signup') && (
              <div className="role-switch p-1 rounded-full flex">
                <ToggleGroup 
                  type="single" 
                  value={role} 
                  onValueChange={(value) => value && toggleRole(value as UserRole)}
                  className="w-full"
                >
                  <ToggleGroupItem 
                    value="user" 
                    className={`w-1/2 rounded-full transition-all ${
                      role === 'user' 
                        ? 'bg-white text-primary shadow-sm' 
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                    aria-label="Toggle User role"
                  >
                    <UserIcon className="mr-2 h-4 w-4" />
                    User
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="organizer" 
                    className={`w-1/2 rounded-full transition-all ${
                      role === 'organizer' 
                        ? 'bg-white text-primary shadow-sm' 
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                    aria-label="Toggle Organizer role"
                  >
                    <Building className="mr-2 h-4 w-4" />
                    Organizer
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            )}
            
            <div className="mt-6">
              {renderForm()}
            </div>
            
            {(mode === 'login' || mode === 'signup') && (
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-background text-gray-500">Or continue with</span>
                </div>
              </div>
            )}
            
            {(mode === 'login' || mode === 'signup') && (
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
            )}
          </div>
        </div>
      </div>
      
      {/* Password Recovery Sheet */}
      <Sheet open={recoverOpen} onOpenChange={setRecoverOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Reset Password</SheetTitle>
            <SheetDescription>
              Enter your email address and we'll send you instructions to reset your password.
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handlePasswordRecovery} className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="recover-email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="recover-email"
                  placeholder="your@email.com"
                  className="pl-10"
                  value={recoverEmail}
                  onChange={(e) => setRecoverEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button type="submit" className="flex-1">
                Send Recovery Link
              </Button>
              <Button type="button" variant="outline" onClick={() => setRecoverOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Auth;
