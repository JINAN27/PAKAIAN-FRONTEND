import React from 'react';

export const Sidebar = ({
  searchQuery,
  setSearchQuery,
  priceRange,
  setPriceRange,
}) => (
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
);

