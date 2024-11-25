import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const saveCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
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

      const response = await axios.post('https://clothes-production-bc86.up.railway.app/api/orders', orderData);
      localStorage.removeItem('cart');
      setCart([]);
      navigate(`/order/${response.data.order._id}`);
    } catch (error) {
      console.error('Failed to create order:', error.message);
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
              <li key={item.productId} className="list-group-item">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <h5 className="mb-1">{item.name}</h5>
                    <p className="mb-0 text-muted">Rp{item.price.toLocaleString()}</p>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex justify-content-end align-items-center">
                      <div className="input-group" style={{ width: '120px' }}>
                        <button 
                          className="btn btn-outline-secondary" 
                          type="button" 
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="form-control text-center"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 1)}
                        />
                        <button 
                          className="btn btn-outline-secondary" 
                          type="button" 
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button 
                        className="btn btn-outline-danger ms-2" 
                        onClick={() => removeFromCart(item.productId)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="card-footer">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Total: Rp{calculateTotal().toLocaleString()}</h4>
              <button 
                className="btn btn-primary" 
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

