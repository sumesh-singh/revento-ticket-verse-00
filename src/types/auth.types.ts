
export type User = {
  id: string;
  username: string;
  name: string;
  email: string;
  role: 'user' | 'organizer';
  rewardPoints?: number;
  avatarUrl?: string;
};

export type LoginFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type SignupFormValues = {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  orgName?: string;
  termsAccepted: boolean;
};
