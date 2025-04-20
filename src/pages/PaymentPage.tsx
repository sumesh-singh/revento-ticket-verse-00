
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StellarPayment from '@/components/payment/StellarPayment';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const paymentDetails = location.state?.paymentDetails;

  if (!paymentDetails) {
    navigate('/events');
    return null;
  }

  const handlePaymentComplete = (transactionId: string) => {
    navigate(`/dashboard/user/tickets?transaction=${transactionId}`);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Complete Your Purchase</CardTitle>
        </CardHeader>
        <CardContent>
          <StellarPayment
            eventId={paymentDetails.eventId}
            eventName={paymentDetails.eventName}
            ticketType={paymentDetails.ticketType}
            price={paymentDetails.price}
            currency={paymentDetails.currency}
            userEmail={paymentDetails.userEmail}
            onPaymentComplete={handlePaymentComplete}
            onCancel={handleCancel}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentPage;
