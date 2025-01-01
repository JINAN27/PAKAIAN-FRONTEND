import React from 'react';

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <li className="list-group-item">
      <div className="row align-items-center">
        <div className="col-md-6">
          <h5 className="mb-1">{item.name}</h5>
          <p className="mb-0 text-muted">Rp{item.price.toLocaleString()}</p>
        </div>
        <div className="col-md-6">
          <div className="d-flex justify-content-end align-items-center">
            <div className="input-group" style={{ width: '120px' }}>
              <button 
                className="btn btn-outline-secondary" 
                type="button" 
                onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <input
                type="number"
                className="form-control text-center"
                min="1"
                value={item.quantity}
                onChange={(e) => onUpdateQuantity(item.productId, parseInt(e.target.value) || 1)}
              />
              <button 
                className="btn btn-outline-secondary" 
                type="button" 
                onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
              >
                +
              </button>
            </div>
            <button 
              className="btn btn-outline-danger ms-2" 
              onClick={() => onRemove(item.productId)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
