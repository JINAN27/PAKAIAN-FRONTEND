import React, { useEffect, useState } from 'react'
import './ProductList.css' // Pastikan file CSS ini ada

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [priceRange, setPriceRange] = useState([0, 1000000])

  const itemsPerPage = 6

  useEffect(() => {
    setIsLoading(true)
    fetch('https://clothes-production-bc86.up.railway.app/api/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data)
        setIsLoading(false)
      })
      .catch(error => {
        setError(error.message)
        setIsLoading(false)
      })
  }, [])

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    product.price >= priceRange[0] && product.price <= priceRange[1]
  )

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem)

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredProducts.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="product-list-container">
      <h1 className="product-list-title">Koleksi Produk Kami</h1>
      
      <div className="product-list-content">
        {/* Sidebar for filters */}
        <div className="product-list-sidebar">
          <div className="product-list-filter">
            <h2 className="filter-title">Filter</h2>
            <div className="filter-section">
              <label htmlFor="search" className="filter-label">Cari Produk</label>
              <div className="search-input-container">
                <input
                  id="search"
                  type="text"
                  placeholder="Cari produk..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>
            <div className="filter-section">
              <label className="filter-label">Rentang Harga</label>
              <input
                type="range"
                min="0"
                max="1000000"
                step="10000"
                value={priceRange[1]}
                onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="price-range-slider"
              />
              <div className="price-range-values">
                <span>Rp{priceRange[0].toLocaleString()}</span>
                <span>Rp{priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="product-list-main">
          {isLoading ? (
            <div className="product-grid">
              {[...Array(itemsPerPage)].map((_, index) => (
                <div key={index} className="product-card skeleton">
                  <div className="product-image skeleton-image"></div>
                  <div className="product-details">
                    <div className="skeleton-text"></div>
                    <div className="skeleton-text"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : currentItems.length > 0 ? (
            <div className="product-grid">
              {currentItems.map(product => (
                <div key={product._id} className="product-card">
                  <div className="product-image-container">
                    <img
                      src={`https://clothes-production-bc86.up.railway.app${product.image}`}
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
              ))}
            </div>
          ) : (
            <p className="no-products-message">
              Tidak ada produk yang tersedia.
            </p>
          )}
          
          <div className="pagination">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              Sebelumnya
            </button>
            <span className="pagination-info">
              Halaman {currentPage} dari {Math.ceil(filteredProducts.length / itemsPerPage)}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === Math.ceil(filteredProducts.length / itemsPerPage)}
              className="pagination-button"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

