import axios from 'axios';

export const createOrder = async (cart) => {
  const orderData = {
    products: cart.map(item => ({
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    })),
    bankDetails: {
      bankName: 'Bank XYZ',
      accountNumber: '1234567890',
      accountHolder: 'John Doe'
    }
  };

  const response = await axios.post(
    'https://pakaian-backend-production.up.railway.app/api/orders',
    orderData
  );
  return response.data.order;
};
