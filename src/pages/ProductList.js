import React, { useEffect, useState } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/products') // Sesuaikan dengan URL API backend Anda
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => setError(error.message));
  }, []);

  return (
    <div>
      <h1>Daftar Produk</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <ul>
        {products.length > 0 ? (
          products.map(product => (
            <li key={product._id} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px' }}>
              {product.image && (
                <img
                  src={`http://localhost:3000${product.image}`} // Pastikan URL ini sesuai dengan path gambar
                  alt={product.name}
                  width="100"
                />
              )}
              <h2>{product.name}</h2>
              <p>Harga: Rp{product.price}</p>
              <button onClick={() => window.location.href = `/detail/${product._id}`}>Detail</button>
            </li>
          ))
        ) : (
          <p>Tidak ada produk yang tersedia.</p>
        )}
      </ul>
    </div>
  );
}

export default ProductList;
