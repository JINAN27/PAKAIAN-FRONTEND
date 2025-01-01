import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile } from '../api/userApi';

export const useProfile = (setIsLoggedIn) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const userData = await fetchUserProfile(token);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching profile:', error);
        alert(error.message);
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    getUserProfile();
  }, [navigate, setIsLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return { user, loading, handleLogout };
};

