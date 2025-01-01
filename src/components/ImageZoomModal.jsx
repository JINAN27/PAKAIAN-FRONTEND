import React from 'react';
import './ImageZoomModal.css';

export const ImageZoomModal = ({ isOpen, onClose, imageSrc, altText }) => {
  if (!isOpen) return null;

  return (
    <div className="image-zoom-modal" onClick={onClose}>
      <div className="image-zoom-modal__content">
        <img src={imageSrc} alt={altText} className="image-zoom-modal__image" />
      </div>
    </div>
  );
};

