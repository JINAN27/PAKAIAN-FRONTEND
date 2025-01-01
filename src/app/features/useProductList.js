import { useState, useEffect } from 'react';
import { fetchProducts } from '../api/productApi';

export const useProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 1000000]);

  const itemsPerPage = 6;

  useEffect(() => {
    setIsLoading(true);
    fetchProducts()
      .then(data => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

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

  return {
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
    totalPages: Math.ceil(filteredProducts.length / itemsPerPage),
  };
};

