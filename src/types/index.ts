
export type PaymentMethod = 'crypto' | 'stellar' | 'fiat';
export type TicketStatus = 'upcoming' | 'attended' | 'cancelled';
export type RegistrationStatus = 'pending' | 'confirmed' | 'cancelled';
export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type UserRole = 'user' | 'organizer' | 'admin';

export interface TicketTier {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  benefits: string[];
  available: boolean;
  maxPerTransaction: number;
}

export interface TicketType {
  id: number;
  name: string;
  price: string;
  available: boolean;
}

export interface Event {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  description: string;
  category: string;
  price: string;
  attendees: number;
  organizer: string;
  organizerId: string;
  image: string;
  ticketTiers: TicketTier[];
  ticketTypes: TicketType[];
  placeId?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  createdAt?: any;
  updatedAt?: any;
}

export interface Ticket {
  id: string;
  userId: string;
  eventId: string;
  registrationId: string;
  eventName: string;
  date: string;
  time: string;
  location: string;
  ticketType: string;
  ticketNumber: string;
  status: TicketStatus;
  image: string;
  paymentMethod: PaymentMethod;
  txHash: string | null;
  ipfsCid: string | null;
  blockchain: string | null;
  tokenId: string | null;
  purchaseDate: string;
  placeId?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface TicketPurchaseProps {
  event: {
    id: string;
    title: string;
    date: string;
    location: string;
    image: string;
  };
  ticketTiers: TicketTier[];
  onSuccess?: (ticketId: string) => void;
}

export interface RegistrationFormData {
  name: string;
  email: string;
  phone: string;
  ticketType: string;
  dietaryRestrictions: string;
  teamMembers: string[];
  agreedToTerms: boolean;
}

export interface Registration {
  id: string;
  userId: string;
  eventId: string;
  ticketType: string;
  personal: {
    name: string;
    email: string;
    phone: string;
    dietaryRestrictions?: string;
  };
  teamMembers: string[];
  transactionId: string;
  status: RegistrationStatus;
  createdAt: any;
  updatedAt: any;
}

export interface Transaction {
  id: string;
  userId: string;
  eventId: string;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  status: TransactionStatus;
  createdAt: any;
  updatedAt?: any;
  paymentDetails?: {
    txHash?: string;
    provider?: string;
    paymentDate?: any;
    settlementDate?: any;
  };
}

// PaymentDetails interface for passing data to payment page
export interface PaymentDetails {
  eventId: string;
  eventName: string;
  ticketType: string;
  price: number;
  currency: string;
  userEmail: string;
  quantity?: number;
  registrationId?: string;
  transactionId?: string;
  registrationData?: RegistrationFormData;
}

export interface UserProfile {
  id: string;
  username: string;
  name: string;
  email: string;
  role: UserRole;
  rewardPoints?: number;
  avatarUrl?: string;
  phone?: string;
  bio?: string;
  preferences?: {
    notifications?: boolean;
    emailUpdates?: boolean;
    theme?: string;
  };
  orgName?: string; // For organizers
  createdAt?: any;
  updatedAt?: any;
}
