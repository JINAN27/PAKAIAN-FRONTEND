import axios from 'axios';

const BASE_URL = 'https://clothes-production-bc86.up.railway.app/api';

export const fetchProvinces = async () => {
  const response = await axios.get(`${BASE_URL}/provinces`);
  return response.data;
};

export const fetchCities = async (provinceId) => {
  const response = await axios.get(`${BASE_URL}/cities/${provinceId}`);
  return response.data;
};

export const fetchDistricts = async (cityId) => {
  const response = await axios.get(`${BASE_URL}/districts/${cityId}`);
  return response.data;
};

export const calculateShippingCost = async (orderId, shippingData) => {
  const response = await axios.post(`${BASE_URL}/shipping-cost/${orderId}`, shippingData);
  return response.data;
};

export const confirmShipping = async (orderId, shippingData) => {
  const response = await axios.post(`${BASE_URL}/orders/${orderId}/confirm-shipping`, shippingData);
  return response.data;
};

