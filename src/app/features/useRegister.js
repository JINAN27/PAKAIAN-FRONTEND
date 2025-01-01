import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/authApi';

export const useRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await registerUser(email, password);
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      setError(error.message);
      console.error('Error registering:', error);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleRegister,
  };
};

