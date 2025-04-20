
export interface TicketPurchaseProps {
  event: {
    id: string;
    title: string;
    date: string;
    location: string;
    image: string;
  };
  ticketTiers: TicketTier[];
  onGetTicket?: () => void;  // Make this optional
}
