import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './pages/Navigation';
import { ProductList } from './pages/ProductList';
import { ProductDetail } from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import OrderDetails from './pages/OrderDetails';
import Shipping from './pages/Shipping';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<ProductList />} />
    <Route path="/detail/:id" element={<ProductDetail />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/order/:orderId" element={<OrderDetails />} />
    <Route path="/shipping/:orderId" element={<Shipping />} />
  </Routes>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navigation />
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
