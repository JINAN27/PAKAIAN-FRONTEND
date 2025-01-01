import { useState, useEffect } from 'react';
import { fetchProductDetails } from '../api/productApi';
import { useAuth } from '../../contexts/AuthContext';

export const useProductDetail = (id) => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    setLoading(true);
    fetchProductDetails(id)
      .then(data => setProduct(data))
      .catch(error => setError('Error fetching product details'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleQuantityChange = (event) => {
    const newQuantity = Number(event.target.value);
    setQuantity(newQuantity > 0 ? newQuantity : 1);
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    if (!product) return;

    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    const itemIndex = existingCart.findIndex(item => item.productId === product._id);

    if (itemIndex === -1) {
      existingCart.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: quantity
      });
    } else {
      existingCart[itemIndex].quantity += quantity;
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));

    setToastMessage(`${product.name} dengan jumlah ${quantity} berhasil ditambahkan ke keranjang!`);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  return {
    product,
    quantity,
    loading,
    error,
    isLoggedIn,
    showLoginModal,
    toastMessage,
    handleQuantityChange,
    handleAddToCart,
    closeLoginModal,
    setShowLoginModal,
    setToastMessage
  };
};

