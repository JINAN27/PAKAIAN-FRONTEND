import React, { useEffect, useState } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // State untuk pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Jumlah item per halaman

  // State untuk search
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('https://clothes-production-bc86.up.railway.app/api/products') // Sesuaikan dengan URL API backend Anda
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => setError(error.message));
  }, []);

  // Filter produk berdasarkan searchQuery
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Hitung indeks data yang akan ditampilkan
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Fungsi untuk berpindah halaman
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredProducts.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h1>Daftar Produk</h1>
      
      {/* Input Pencarian */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Cari produk..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{ padding: '10px', width: '300px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
      </div>
      
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <ul>
        {currentItems.length > 0 ? (
          currentItems.map(product => (
            <li key={product._id} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px' }}>
              {product.image && (
                <img
                  src={`https://clothes-production-bc86.up.railway.app${product.image}`} // Pastikan URL ini sesuai dengan path gambar
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
      
      {/* Tombol navigasi halaman */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span style={{ margin: '0 10px' }}>Halaman {currentPage} dari {Math.ceil(filteredProducts.length / itemsPerPage)}</span>
        <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredProducts.length / itemsPerPage)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default ProductList;
