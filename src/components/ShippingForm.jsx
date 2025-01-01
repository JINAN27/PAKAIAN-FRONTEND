import React from 'react';

export const ShippingForm = ({
  provinces,
  cities,
  districts,
  selectedProvince,
  selectedCity,
  selectedDistrict,
  onProvinceChange,
  onCityChange,
  onDistrictChange,
  onCalculateShipping,
  shippingCost,
  onConfirmShipping
}) => {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Detail Pengiriman</h2>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Provinsi:</label>
        <select 
          value={selectedProvince} 
          onChange={(e) => onProvinceChange(e.target.value)}
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
          onChange={(e) => onCityChange(e.target.value)} 
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
          onChange={(e) => onDistrictChange(e.target.value)} 
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
        onClick={onCalculateShipping}
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
            onClick={onConfirmShipping}
            style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', marginTop: '10px' }}
          >
            Konfirmasi Pengiriman
          </button>
        </div>
      )}
    </div>
  );
};

