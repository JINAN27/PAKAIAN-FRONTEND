import { useState, useEffect } from 'react';
import { fetchProvinces, fetchCities, fetchDistricts, calculateShippingCost, confirmShipping } from '../api/shippingApi';

export const useShipping = (orderId) => {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [shippingCost, setShippingCost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProvinceData();
  }, []);

  const fetchProvinceData = async () => {
    try {
      const data = await fetchProvinces();
      setProvinces(data);
    } catch (err) {
      setError('Gagal mengambil data provinsi: ' + err.message);
    }
  };

  const handleProvinceChange = async (provinceId) => {
    setSelectedProvince(provinceId);
    setSelectedCity('');
    setSelectedDistrict('');
    try {
      const data = await fetchCities(provinceId);
      setCities(data);
    } catch (err) {
      setError('Gagal mengambil data kota: ' + err.message);
    }
  };

  const handleCityChange = async (cityId) => {
    setSelectedCity(cityId);
    setSelectedDistrict('');
    try {
      const data = await fetchDistricts(cityId);
      setDistricts(data);
    } catch (err) {
      setError('Gagal mengambil data kecamatan: ' + err.message);
    }
  };

  const handleDistrictChange = (districtId) => {
    setSelectedDistrict(districtId);
  };

  const calculateShipping = async () => {
    setLoading(true);
    setError(null);
    try {
      const shippingData = {
        province: selectedProvince,
        city: selectedCity,
        district: selectedDistrict,
      };
      const data = await calculateShippingCost(orderId, shippingData);
      setShippingCost(data.shippingCost);
    } catch (err) {
      setError('Gagal menghitung biaya pengiriman: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmShipping = async () => {
    try {
      await confirmShipping(orderId, {
        shippingCost: shippingCost.cost,
        shippingAddress: {
          province: selectedProvince,
          city: selectedCity,
          district: selectedDistrict
        }
      });
      return true;
    } catch (err) {
      setError('Gagal mengkonfirmasi pengiriman: ' + err.message);
      return false;
    }
  };

  return {
    provinces,
    cities,
    districts,
    selectedProvince,
    selectedCity,
    selectedDistrict,
    shippingCost,
    loading,
    error,
    handleProvinceChange,
    handleCityChange,
    handleDistrictChange,
    calculateShipping,
    handleConfirmShipping
  };
};

