import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommerceStats = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalCoupons: 0,
    activeCoupons: 0,
    usedCoupons: 0,
    expiredCoupons: 0,
    salesByMonth: [],
    topCoupons: []
  });
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('month'); // month, year, all

  useEffect(() => {
    fetchStats();
    fetchSales();
  }, [timeRange]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/commerce/stats?timeRange=${timeRange}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
      setLoading(false);
    }
  };

  const fetchSales = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/commerce/sales?timeRange=${timeRange}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSales(response.data);
    } catch (error) {
      console.error('Error al cargar ventas:', error);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount);
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
          <h1 className="text-3xl font-bold">Estadísticas y Ventas</h1>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="p-2 border rounded-lg"
          >
            <option value="month">Último mes</option>
            <option value="year">Último año</option>
            <option value="all">Todo el tiempo</option>
          </select>
        </div>

        {/* Resumen de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-600">Ventas Totales</h3>
            <p className="text-3xl font-bold text-green-600">
              {formatCurrency(stats.totalSales)}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-600">Total Cupones</h3>
            <p className="text-3xl font-bold">{stats.totalCoupons}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-600">Cupones Activos</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.activeCoupons}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-600">Cupones Usados</h3>
            <p className="text-3xl font-bold text-purple-600">{stats.usedCoupons}</p>
          </div>
        </div>

        {/* Top Cupones */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-2xl font-bold mb-4">Cupones más Populares</h2>
          <div className="space-y-4">
            {stats.topCoupons.map((coupon) => (
              <div key={coupon.id} className="flex justify-between items-center p-4 border-b">
                <div>
                  <h3 className="font-semibold">{coupon.title}</h3>
                  <p className="text-sm text-gray-600">{coupon.uses} usos</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{coupon.discount}% descuento</p>
                  <p className="text-sm text-gray-600">
                    {formatCurrency(coupon.totalSales)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Historial de Ventas */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Historial de Ventas</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cupón
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Monto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descuento
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sales.map((sale) => (
                  <tr key={sale.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(sale.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {sale.couponTitle}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{sale.customerName}</div>
                      <div className="text-sm text-gray-500">{sale.customerEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(sale.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(sale.discount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommerceStats; 