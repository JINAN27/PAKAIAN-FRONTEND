import React from 'react';
import { useOrder } from '../app/features/useOrder';
import OrderDetails from '../components/OrderDetails';

export default function OrderDetailsPage() {
  const { order, loading, error, handlePaymentUpdate, handleProceedToShipping } = useOrder();

  return (
    <OrderDetails 
      order={order} 
      loading={loading} 
      error={error} 
      handlePaymentUpdate={handlePaymentUpdate} 
      handleProceedToShipping={handleProceedToShipping} 
    />
  );
}
