import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CommerceDashboard = () => {
  const [commerceData, setCommerceData] = useState(null);
  const [stats, setStats] = useState({
    totalCoupons: 0,
    activeCoupons: 0,
    usedCoupons: 0,
    totalSales: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCommerceData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/commerce/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCommerceData(response.data);
      } catch (error) {
        console.error('Error al cargar datos del comercio:', error);
        navigate('/login');
      }
    };

    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/commerce/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(response.data);
      } catch (error) {
        console.error('Error al cargar estadísticas:', error);
      }
    };

    fetchCommerceData();
    fetchStats();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Panel de Comercio</h1>
        
        {/* Resumen de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-600">Total Cupones</h3>
            <p className="text-3xl font-bold">{stats.totalCoupons}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-600">Cupones Activos</h3>
            <p className="text-3xl font-bold text-green-600">{stats.activeCoupons}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-600">Cupones Usados</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.usedCoupons}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-600">Ventas Totales</h3>
            <p className="text-3xl font-bold text-purple-600">${stats.totalSales}</p>
          </div>
        </div>

        {/* Acciones rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => navigate('/commerce/coupons/new')}
            className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition"
          >
            Crear Nuevo Cupón
          </button>
          <button
            onClick={() => navigate('/commerce/coupons')}
            className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition"
          >
            Gestionar Cupones
          </button>
        </div>

        {/* Información del comercio */}
        {commerceData && (
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-2xl font-bold mb-4">Información del Comercio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Nombre:</p>
                <p className="font-semibold">{commerceData.name}</p>
              </div>
              <div>
                <p className="text-gray-600">Email:</p>
                <p className="font-semibold">{commerceData.email}</p>
              </div>
              <div>
                <p className="text-gray-600">Dirección:</p>
                <p className="font-semibold">{commerceData.address}</p>
              </div>
              <div>
                <p className="text-gray-600">Teléfono:</p>
                <p className="font-semibold">{commerceData.phone}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommerceDashboard; 