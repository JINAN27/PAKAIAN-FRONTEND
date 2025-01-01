const API_BASE_URL = 'https://clothes-production-bc86.up.railway.app';

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
};

export const fetchProductDetails = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return await response.json();
  } catch (error) {
    throw new Error('Error fetching product details');
  }
};

