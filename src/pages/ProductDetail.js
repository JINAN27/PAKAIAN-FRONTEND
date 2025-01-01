import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductDetail } from '../app/features/useProductDetail';
import { ProductImage } from '../components/ProductImage';
import { ProductInfo } from '../components/ProductInfo';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { LoginModal } from '../components/LoginModal';
import { Toast } from '../components/Toast';
import { useAuth } from '../contexts/AuthContext';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();
  const {
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
  } = useProductDetail(id);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !product) {
    return <ErrorMessage message={error || 'Product not found'} />;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <ProductImage product={product} />
        <ProductInfo 
          product={product}
          quantity={quantity}
          handleQuantityChange={handleQuantityChange}
          handleAddToCart={handleAddToCart}
          onBack={() => navigate(-1)}
          isLoggedIn={isLoggedIn}
        />
      </div>
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
      {toastMessage && (
        <Toast 
          message={toastMessage} 
          onClose={() => setToastMessage('')}
        />
      )}
    </div>
  );
};

