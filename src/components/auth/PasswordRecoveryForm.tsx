
import React from 'react';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface PasswordRecoveryFormProps {
  email: string;
  onEmailChange: (email: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const PasswordRecoveryForm = ({
  email,
  onEmailChange,
  onSubmit,
  onCancel
}: PasswordRecoveryFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4 mt-6">
      <div className="space-y-2">
        <Label htmlFor="recover-email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            id="recover-email"
            placeholder="your@email.com"
            className="pl-10"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-2 mt-6">
        <Button type="submit" className="flex-1">
          Send Recovery Link
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default PasswordRecoveryForm;

