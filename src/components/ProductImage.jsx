import React, { useState } from 'react';
import { ImageZoomModal } from './ImageZoomModal';
import './ProductImage.css';

export const ProductImage = ({ product }) => {
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const handleImageClick = () => {
    setIsZoomOpen(true);
  };

  const handleCloseZoom = () => {
    setIsZoomOpen(false);
  };

  return (
    <div className="col-md-6 product-detail-image">
      <div className="product-image-container">
        <img 
          src={`https://clothes-production-bc86.up.railway.app${product.image}`} 
          alt={product.name} 
          className="img-fluid rounded product-detail-image__img"
          onClick={handleImageClick}
        />
      </div>
      <ImageZoomModal 
        isOpen={isZoomOpen}
        onClose={handleCloseZoom}
        imageSrc={`https://clothes-production-bc86.up.railway.app${product.image}`}
        altText={product.name}
      />
    </div>
  );
};

