import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`https://clothes-production-bc86.up.railway.app/api/products/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        return response.json();
      })
      .then(data => setProduct(data))
      .catch(error => setError('Error fetching product details'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
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

    alert(`${product.name} dengan jumlah ${quantity} berhasil ditambahkan ke keranjang!`);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = Number(event.target.value);
    setQuantity(newQuantity > 0 ? newQuantity : 1);
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error || 'Product not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img 
            src={`https://clothes-production-bc86.up.railway.app${product.image}`} 
            alt={product.name} 
            className="img-fluid rounded"
          />
        </div>
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
            <button onClick={handleAddToCart} className="btn btn-primary btn-lg">
              Add to Cart
            </button>
            <button onClick={() => navigate(-1)} className="btn btn-secondary btn-lg">
              Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

