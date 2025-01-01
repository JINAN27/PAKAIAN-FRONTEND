import React from 'react';

export default function CartTotal({ total }) {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <h4 className="mb-0">Total: Rp{total.toLocaleString()}</h4>
    </div>
  );
}
