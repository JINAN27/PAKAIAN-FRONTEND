import React from 'react';

export const ProductCard = ({ product }) => (
  <div className="product-card">
    <div className="product-image-container">
      <img
        src={`https://pakaian-backend-production.up.railway.app${product.image}`}
        alt={product.name}
        className="product-image"
      />
    </div>
    <div className="product-details">
      <h2 className="product-name">{product.name}</h2>
      <p className="product-price">Rp{product.price.toLocaleString()}</p>
    </div>
    <div className="product-action">
      <button 
        onClick={() => window.location.href = `/detail/${product._id}`}
        className="view-detail-button"
      >
        Lihat Detail
      </button>
    </div>
  </div>
);

