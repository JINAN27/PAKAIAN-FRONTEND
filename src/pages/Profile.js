import React from 'react';
import { useProfile } from '../app/features/useProfile';
import { ProfileDisplay } from '../components/ProfileDisplay';

function Profile({ setIsLoggedIn }) {
  const { user, loading, handleLogout } = useProfile(setIsLoggedIn);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info" role="alert">
          Loading...
        </div>
      </div>
    );
  }

  return <ProfileDisplay user={user} onLogout={handleLogout} />;
}

export default Profile;

