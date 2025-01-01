import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../app/api/cartOrdersApi';
import { loadCartFromStorage, saveCartToStorage } from '../utils/cartStorage';
import CartItem from '../components/CartItem';
import CartTotal from '../components/CartTotal';

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = loadCartFromStorage();
    setCart(storedCart);
  }, []);

  const saveCart = (updatedCart) => {
    setCart(updatedCart);
    saveCartToStorage(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.productId !== productId);
    saveCart(updatedCart);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cart.map(item =>
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    );
    saveCart(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = async () => {
    try {
      const order = await createOrder(cart);
      saveCart([]);
      navigate(`/order/${order._id}`);
    } catch (error) {
      alert('Failed to create order. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          Your cart is empty.
        </div>
      ) : (
        <div className="card">
          <ul className="list-group list-group-flush">
            {cart.map((item) => (
              <CartItem 
                key={item.productId} 
                item={item} 
                onUpdateQuantity={updateQuantity} 
                onRemove={removeFromCart} 
              />
            ))}
          </ul>
          <div className="card-footer">
            <CartTotal total={calculateTotal()} />
            <button 
              className="btn btn-primary mt-3" 
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
