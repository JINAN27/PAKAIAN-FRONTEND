import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Shipping() {
  const { orderId } = useParams();
  const navigate = useNavigate();
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
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    try {
      const response = await axios.get('https://clothes-production-bc86.up.railway.app/api/provinces');
      setProvinces(response.data);
    } catch (err) {
      setError('Gagal mengambil data provinsi: ' + err.message);
    }
  };

  const fetchCities = async (provinceId) => {
    try {
      const response = await axios.get(`https://clothes-production-bc86.up.railway.app/api/cities/${provinceId}`);
      setCities(response.data);
    } catch (err) {
      setError('Gagal mengambil data kota: ' + err.message);
    }
  };

  const fetchDistricts = async (cityId) => {
    try {
      const response = await axios.get(`https://clothes-production-bc86.up.railway.app/api/districts/${cityId}`);
      setDistricts(response.data);
    } catch (err) {
      setError('Gagal mengambil data kecamatan: ' + err.message);
    }
  };

  const handleProvinceChange = (e) => {
    const provinceId = e.target.value;
    setSelectedProvince(provinceId);
    setSelectedCity('');
    setSelectedDistrict('');
    fetchCities(provinceId);
  };

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setSelectedCity(cityId);
    setSelectedDistrict('');
    fetchDistricts(cityId);
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
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

      const response = await axios.post(`https://clothes-production-bc86.up.railway.app/api/shipping-cost/${orderId}`, shippingData);
      setShippingCost(response.data.shippingCost);
    } catch (err) {
      setError('Gagal menghitung biaya pengiriman: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmShipping = async () => {
    try {
      await axios.post(`https://clothes-production-bc86.up.railway.app/api/orders/${orderId}/confirm-shipping`, {
        shippingCost: shippingCost.cost,
        shippingAddress: {
          province: selectedProvince,
          city: selectedCity,
          district: selectedDistrict
        }
      });
      navigate(`/order/${orderId}`);
    } catch (err) {
      setError('Gagal mengkonfirmasi pengiriman: ' + err.message);
    }
  };

  if (loading) return <div>Menghitung biaya pengiriman...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Detail Pengiriman</h2>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Provinsi:</label>
        <select 
          value={selectedProvince} 
          onChange={handleProvinceChange}
          style={{ width: '100%', padding: '5px' }}
        >
          <option value="">Pilih Provinsi</option>
          {provinces.map(province => (
            <option key={province.id} value={province.id}>{province.name}</option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Kota:</label>
        <select 
          value={selectedCity} 
          onChange={handleCityChange} 
          disabled={!selectedProvince}
          style={{ width: '100%', padding: '5px' }}
        >
          <option value="">Pilih Kota</option>
          {cities.map(city => (
            <option key={city.id} value={city.id}>{city.name}</option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Kecamatan:</label>
        <select 
          value={selectedDistrict} 
          onChange={handleDistrictChange} 
          disabled={!selectedCity}
          style={{ width: '100%', padding: '5px' }}
        >
          <option value="">Pilih Kecamatan</option>
          {districts.map(district => (
            <option key={district.id} value={district.id}>{district.name}</option>
          ))}
        </select>
      </div>
      <button 
        onClick={calculateShipping}
        disabled={!selectedProvince || !selectedCity || !selectedDistrict}
        style={{ padding: '10px 20px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '5px', marginRight: '10px' }}
      >
        Hitung Biaya Pengiriman
      </button>
      {shippingCost && (
        <div style={{ marginTop: '20px' }}>
          <h3>Biaya Pengiriman:</h3>
          <p>Rp{shippingCost.cost.toLocaleString()}</p>
          <button 
            onClick={handleConfirmShipping}
            style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', marginTop: '10px' }}
          >
            Konfirmasi Pengiriman
          </button>
        </div>
      )}
    </div>
  );
}