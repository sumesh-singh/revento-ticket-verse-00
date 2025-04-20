
export type PaymentMethod = 'crypto' | 'stellar' | 'fiat';
export type TicketStatus = 'upcoming' | 'attended' | 'cancelled';

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
  image: string;
  ticketTiers: TicketTier[];
  ticketTypes: TicketType[];
  placeId?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Ticket {
  id: number;
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
  onGetTicket?: () => void;
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
