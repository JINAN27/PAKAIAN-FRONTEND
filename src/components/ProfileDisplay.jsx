import React from 'react';

export const ProfileDisplay = ({ user, onLogout }) => {
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Profile</h2>
        </div>
        <div className="card-body">
          <p className="card-text"><strong>Email:</strong> {user.email}</p>
          <button className="btn btn-danger" onClick={onLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

