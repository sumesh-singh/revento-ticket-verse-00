
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginFormProps {
  onSubmit: (data: LoginFormValues) => Promise<void>;
  onForgotPassword: () => void;
  onSwitchMode: () => void;
  loading: boolean;
}

const LoginForm = ({ onSubmit, onForgotPassword, onSwitchMode, loading }: LoginFormProps) => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full animate-fade-in">
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
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input 
                    {...field}
                    placeholder="johndoe@example.com" 
                    className="pl-10" 
                  />
                </div>
              </FormControl>
              {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          rules={{ required: "Password is required" }}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input 
                    {...field}
                    type={passwordVisible ? "text" : "password"}
                    className="pl-10" 
                    placeholder="••••••••"
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
              {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
            </FormItem>
          )}
        />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Controller
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <Checkbox 
                  id="rememberMe" 
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label htmlFor="rememberMe" className="text-sm">Remember me</Label>
          </div>
          <Button
            type="button"
            variant="link"
            className="text-sm"
            onClick={onForgotPassword}
          >
            Forgot password?
          </Button>
        </div>
        
        <Button 
          type="submit" 
          className="w-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
        
        <div className="text-center text-sm animate-fade-in">
          Don't have an account?{" "}
          <Button
            type="button"
            variant="link"
            className="p-0 hover:text-primary transition-colors"
            onClick={onSwitchMode}
          >
            Sign up
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;

