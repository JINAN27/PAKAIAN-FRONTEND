export const loadCartFromStorage = () => {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  };
  
  export const saveCartToStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  