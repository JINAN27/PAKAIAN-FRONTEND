import React from 'react';

export const ProductInfo = ({ product, quantity, handleQuantityChange, handleAddToCart, onBack, isLoggedIn }) => (
  <div className="col-md-6">
    <h1 className="mb-4">{product.name}</h1>
    <h2 className="text-primary mb-3">Rp{product.price.toLocaleString()}</h2>
    <p className="mb-4">{product.description}</p>
    <div className="row mb-4">
      <div className="col-6">
        <p><strong>Stok:</strong> {product.stock}</p>
        <p><strong>Ukuran:</strong> {product.size}</p>
      </div>
      <div className="col-6">
        <p><strong>Warna:</strong> {product.color}</p>
        <p><strong>Brand:</strong> {product.brand}</p>
      </div>
    </div>
    <div className="mb-4">
      <label htmlFor="quantity" className="form-label">Jumlah:</label>
      <input
        id="quantity"
        type="number"
        min="1"
        max={product.stock}
        value={quantity}
        onChange={handleQuantityChange}
        className="form-control"
        style={{width: '100px'}}
      />
    </div>
    <div className="d-grid gap-2">
      <button 
        onClick={handleAddToCart} 
        className="btn btn-primary btn-lg"
        disabled={!isLoggedIn}
      >
        {isLoggedIn ? 'Add to Cart' : 'Login to Add to Cart'}
      </button>
      <button onClick={onBack} className="btn btn-secondary btn-lg">
        Kembali
      </button>
    </div>
  </div>
);

