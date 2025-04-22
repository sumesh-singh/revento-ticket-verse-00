
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle } from 'lucide-react';

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  error?: string;
  icon?: React.ReactNode;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onIconClick?: () => void;
  name?: string;
  value?: string;
  required?: boolean;
  onBlur?: any;
  ref?: React.Ref<HTMLInputElement>;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(({
  id,
  label,
  type = "text",
  placeholder,
  error,
  icon,
  className,
  onChange,
  onIconClick,
  ...props
}, ref) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`pl-10 pr-10 transition-all duration-200 focus:scale-[1.02] ${className}`}
          onChange={onChange}
          ref={ref}
          {...props}
        />
        {icon && (
          <button
            type="button"
            onClick={onIconClick}
            className="absolute right-1 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            {icon}
          </button>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-500 flex items-center mt-1 animate-fade-in">
          <AlertTriangle className="h-4 w-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
});

FormInput.displayName = "FormInput";

export default FormInput;
