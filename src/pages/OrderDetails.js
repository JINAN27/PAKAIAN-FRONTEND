import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function OrderDetails() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        console.log('Mengambil order dengan ID:', orderId);
        const response = await axios.get(`https://clothes-production-bc86.up.railway.app/api/orders/${orderId}`);
        console.log('Data order diterima:', response.data);
        setOrder(response.data.order);
        setLoading(false);
      } catch (err) {
        console.error('Error saat mengambil order:', err);
        setError('Gagal mengambil detail order: ' + err.message);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handlePaymentUpdate = async () => {
    try {
      const response = await axios.put(`https://clothes-production-bc86.up.railway.app/api/orders/${orderId}/payment-status`, {
        status: 'sudah dibayar'
      });
      setOrder(response.data.order);
    } catch (err) {
      console.error('Error saat memperbarui status pembayaran:', err);
      setError('Gagal memperbarui status pembayaran: ' + err.message);
    }
  };

  const handleProceedToShipping = () => {
    navigate(`/shipping/${orderId}`);
  };

  if (loading) return <div>Memuat...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!order) return <div>Order tidak ditemukan</div>;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Detail Order</h2>
      <div style={{ marginBottom: '20px' }}>
        <h3>ID Order:</h3>
        <p>{order._id}</p>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <h3>Status:</h3>
        <p>{order.status}</p>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <h3>Produk:</h3>
        <ul>
          {order.products.map((product) => (
            <li key={product.productId}>
              {product.name} - Jumlah: {product.quantity} - Harga: Rp{product.price.toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <h3>Total Harga:</h3>
        <p>Rp{order.totalAmount.toLocaleString()}</p>
      </div>
      {order.status === 'belum dibayar' && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Detail Bank:</h3>
          <p>Nama Bank: {order.bankDetails.bankName}</p>
          <p>Nomor Rekening: {order.bankDetails.accountNumber}</p>
          <p>Pemilik Rekening: {order.bankDetails.accountHolder}</p>
        </div>
      )}
      {order.status === 'belum dibayar' && (
        <button 
          onClick={handlePaymentUpdate}
          style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', marginRight: '10px' }}
        >
          Tandai Sudah Dibayar
        </button>
      )}
      {order.status === 'sudah dibayar' && !order.shippingDetails && (
        <button 
          onClick={handleProceedToShipping}
          style={{ padding: '10px 20px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Pilih Pengiriman
        </button>
      )}
      {order.shippingDetails && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Detail Pengiriman:</h3>
          <p>Provinsi: {order.shippingDetails.province}</p>
          <p>Kota: {order.shippingDetails.city}</p>
          <p>Kecamatan: {order.shippingDetails.district}</p>
          <p>Biaya Pengiriman: Rp{order.shippingDetails.cost.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}