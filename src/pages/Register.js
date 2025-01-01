import React from 'react';
import { useRegister } from '../app/features/useRegister';
import { RegisterForm } from '../components/RegisterForm';

export default function Register() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleRegister,
  } = useRegister();

  return (
    <RegisterForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleRegister={handleRegister}
      error={error}
    />
  );
}

