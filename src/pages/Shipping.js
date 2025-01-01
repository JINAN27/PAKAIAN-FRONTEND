import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useShipping } from '../app/features/useShipping';
import { ShippingForm } from '../components/ShippingForm';

export default function Shipping() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const {
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
  } = useShipping(orderId);

  const onConfirmShipping = async () => {
    const success = await handleConfirmShipping();
    if (success) {
      navigate(`/order/${orderId}`);
    }
  };

  if (loading) return <div>Menghitung biaya pengiriman...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ShippingForm
      provinces={provinces}
      cities={cities}
      districts={districts}
      selectedProvince={selectedProvince}
      selectedCity={selectedCity}
      selectedDistrict={selectedDistrict}
      onProvinceChange={handleProvinceChange}
      onCityChange={handleCityChange}
      onDistrictChange={handleDistrictChange}
      onCalculateShipping={calculateShipping}
      shippingCost={shippingCost}
      onConfirmShipping={onConfirmShipping}
    />
  );
}

