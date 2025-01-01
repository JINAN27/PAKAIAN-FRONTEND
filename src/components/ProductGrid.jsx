import React from 'react';
import { ProductCard } from './ProductCard';

export const ProductGrid = ({ products, isLoading }) => (
  <div className="product-grid">
    {isLoading ? (
      [...Array(6)].map((_, index) => (
        <div key={index} className="product-card skeleton">
          <div className="product-image skeleton-image"></div>
          <div className="product-details">
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
          </div>
        </div>
      ))
    ) : products.length > 0 ? (
      products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))
    ) : (
      <p className="no-products-message">
        Tidak ada produk yang tersedia.
      </p>
    )}
  </div>
);

