import axios from 'axios';

const API_BASE_URL = 'https://pakaian-backend-production.up.railway.app/api/orders';

export const fetchOrder = async (orderId) => {
  const response = await axios.get(`${API_BASE_URL}/${orderId}`);
  return response.data.order;
};

export const updatePaymentStatus = async (orderId) => {
  const response = await axios.put(`${API_BASE_URL}/${orderId}/payment-status`, {
    status: 'sudah dibayar',
  });
  return response.data.order;
};
