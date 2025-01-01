import React from 'react';

export const ErrorMessage = ({ message }) => (
  <div className="container mt-5">
    <div className="alert alert-danger" role="alert">
      {message}
    </div>
  </div>
);

