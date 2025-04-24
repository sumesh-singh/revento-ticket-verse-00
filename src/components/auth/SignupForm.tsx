
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Eye, EyeOff, Mail, Lock, Building, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import PasswordStrengthMeter from '@/components/PasswordStrengthMeter';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface SignupFormValues {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  orgName?: string;
  termsAccepted: boolean;
}

interface SignupFormProps {
  onSubmit: (data: SignupFormValues) => Promise<void>;
  onSwitchMode: () => void;
  loading: boolean;
  role: 'user' | 'organizer';
  errorMessage?: string;
}

const SignupForm = ({ 
  onSubmit, 
  onSwitchMode, 
  loading, 
  role,
  errorMessage 
}: SignupFormProps) => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = React.useState(false);
  
  const form = useForm<SignupFormValues>({
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      orgName: "",
      termsAccepted: false
    },
    mode: "onChange"
  });

  const watchPassword = form.watch("password", "");

  const handleSubmit = async (data: SignupFormValues) => {
    console.log("Form submitted with data:", data);
    await onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 w-full animate-fade-in">
        {errorMessage && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="fullName"
          rules={{ required: "Full name is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input 
                    {...field}
                    type="text"
                    placeholder="John Doe" 
                    className="pl-10" 
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="username"
          rules={{ 
            required: "Username is required",
            pattern: {
              value: /^[a-zA-Z0-9_-]+$/,
              message: "Username can only contain letters, numbers, underscores and dashes"
            }
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input 
                    {...field}
                    type="text"
                    placeholder="johndoe" 
                    className="pl-10" 
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {role === 'organizer' && (
          <FormField
            control={form.control}
            name="orgName"
            rules={{ 
              required: role === 'organizer' ? "Organization name is required" : false 
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input 
                      {...field}
                      type="text"
                      placeholder="Company or Institution Name" 
                      className="pl-10" 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        <FormField
          control={form.control}
          name="email"
          rules={{ 
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input 
                    {...field}
                    type="email"
                    placeholder="your@email.com" 
                    className="pl-10" 
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          rules={{ 
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters"
            }
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input 
                    {...field}
                    type={passwordVisible ? "text" : "password"}
                    placeholder="••••••••" 
                    className="pl-10" 
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    {passwordVisible ? 
                      <EyeOff className="h-5 w-5 text-gray-400" /> : 
                      <Eye className="h-5 w-5 text-gray-400" />
                    }
                  </button>
                </div>
              </FormControl>
              <FormMessage />
              <PasswordStrengthMeter password={watchPassword} />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="confirmPassword"
          rules={{ 
            required: "Please confirm your password",
            validate: value => value === watchPassword || "Passwords do not match"
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input 
                    {...field}
                    type={confirmPasswordVisible ? "text" : "password"}
                    placeholder="••••••••" 
                    className="pl-10" 
                  />
                  <button
                    type="button"
                    onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    {confirmPasswordVisible ? 
                      <EyeOff className="h-5 w-5 text-gray-400" /> : 
                      <Eye className="h-5 w-5 text-gray-400" />
                    }
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex items-center space-x-2">
          <Controller
            control={form.control}
            name="termsAccepted"
            render={({ field }) => (
              <Checkbox 
                id="termsAccepted"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor="termsAccepted" className="text-sm">
            I agree to the <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
          </Label>
        </div>
        
        <Button 
          type="submit" 
          className="w-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </Button>
        
        <div className="text-center text-sm animate-fade-in">
          Already have an account?{" "}
          <Button
            type="button"
            variant="link"
            className="p-0 hover:text-primary transition-colors"
            onClick={onSwitchMode}
          >
            Log in
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignupForm;
