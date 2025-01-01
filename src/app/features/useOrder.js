import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchOrder, updatePaymentStatus } from '../api/orderApi';

export const useOrder = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getOrder = async () => {
      try {
        const data = await fetchOrder(orderId);
        setOrder(data);
      } catch (err) {
        setError('Gagal mengambil detail order: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    getOrder();
  }, [orderId]);

  const handlePaymentUpdate = async () => {
    try {
      const updatedOrder = await updatePaymentStatus(orderId);
      setOrder(updatedOrder);
    } catch (err) {
      setError('Gagal memperbarui status pembayaran: ' + err.message);
    }
  };

  const handleProceedToShipping = () => {
    navigate(`/shipping/${orderId}`);
  };

  return { order, loading, error, handlePaymentUpdate, handleProceedToShipping };
};
