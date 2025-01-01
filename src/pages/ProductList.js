import React from 'react';
import { useProductList } from '../app/features/useProductList';
import { Sidebar } from '../components/Sidebar';
import { ProductGrid } from '../components/ProductGrid';
import { Pagination } from '../components/Pagination';
import './ProductList.css';

export const ProductList = () => {
  const {
    currentItems,
    isLoading,
    error,
    currentPage,
    searchQuery,
    setSearchQuery,
    priceRange,
    setPriceRange,
    nextPage,
    prevPage,
    totalPages,
  } = useProductList();

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="product-list-container">
      <h1 className="product-list-title">Koleksi Produk Kami</h1>
      
      <div className="product-list-content">
        <Sidebar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />

        <div className="product-list-main">
          <ProductGrid products={currentItems} isLoading={isLoading} />
          
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        </div>
      </div>
    </div>
  );
};

