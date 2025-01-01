import React from 'react';

export default function CitySelector({ cities, selectedCity, onChange, disabled }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{ display: 'block', marginBottom: '5px' }}>Kota:</label>
      <select
        value={selectedCity}
        onChange={onChange}
        disabled={disabled}
        style={{ width: '100%', padding: '5px' }}
      >
        <option value="">Pilih Kota</option>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
}
