import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CommerceCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, active, used, expired
  const navigate = useNavigate();

  useEffect(() => {
    fetchCoupons();
  }, [filter]);

  const fetchCoupons = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/commerce/coupons?filter=${filter}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCoupons(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar cupones:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (couponId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este cupón?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/commerce/coupons/${couponId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchCoupons();
      } catch (error) {
        console.error('Error al eliminar cupón:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Gestión de Cupones</h1>
          <button
            onClick={() => navigate('/commerce/coupons/new')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Crear Nuevo Cupón
          </button>
        </div>

        {/* Filtros */}
        <div className="mb-6">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border rounded-lg"
          >
            <option value="all">Todos los cupones</option>
            <option value="active">Cupones activos</option>
            <option value="used">Cupones usados</option>
            <option value="expired">Cupones vencidos</option>
          </select>
        </div>

        {/* Lista de cupones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons.map((coupon) => (
            <div key={coupon.id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{coupon.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  coupon.status === 'active' ? 'bg-green-100 text-green-800' :
                  coupon.status === 'used' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {coupon.status === 'active' ? 'Activo' :
                   coupon.status === 'used' ? 'Usado' : 'Vencido'}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{coupon.description}</p>
              
              <div className="space-y-2 mb-4">
                <p><span className="font-semibold">Descuento:</span> {coupon.discount}%</p>
                <p><span className="font-semibold">Válido hasta:</span> {formatDate(coupon.expiryDate)}</p>
                <p><span className="font-semibold">Usos:</span> {coupon.uses}/{coupon.maxUses}</p>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => navigate(`/commerce/coupons/edit/${coupon.id}`)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(coupon.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        {coupons.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No hay cupones disponibles</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommerceCoupons; 