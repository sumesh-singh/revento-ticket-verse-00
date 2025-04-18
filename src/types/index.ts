
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

export interface Event {
  id: string | number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string;
  price: string;
  attendees: number;
  organizer: string;
  image: string;
  ticketTiers: TicketTier[];
  ticketTypes?: {
    id: string;
    name: string;
    price: string;
    available: boolean;
  }[];
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
}
