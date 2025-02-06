const BASE_URL = 'https://pakaian-backend-production.up.railway.app/api';

export const fetchUserProfile = async (token) => {
  const response = await fetch(`${BASE_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch profile');
  }
  
  return response.json();
};

