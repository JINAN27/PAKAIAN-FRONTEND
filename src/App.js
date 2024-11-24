import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import OrderDetails from './pages/OrderDetails';
import Shipping from './pages/Shipping';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // Pengguna sudah login
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      {/* Navigasi */}
      <nav style={{ padding: '10px', background: '#f0f0f0' }}>
        {!isLoggedIn ? (
          <>
            <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
            <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
            <Link to="/register" style={{ marginRight: '10px' }}>Register</Link>
          </>
        ) : (
          <>
            <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
            <Link to="/profile" style={{ marginRight: '10px' }}>Profile</Link>
            <Link to="/cart" style={{ marginRight: '10px' }}>Cart</Link>
            <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>
          </>
        )}
      </nav>

      {/* Rute */}
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/detail/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order/:orderId" element={<OrderDetails />} />
        <Route path="/shipping/:orderId" element={<Shipping />} />
      </Routes>
    </Router>
  );
}

export default App;