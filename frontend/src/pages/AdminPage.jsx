import React, { useEffect, useState } from 'react';
import {
  getEstadisticasGenerales,
  getRankingEntregados,
  getRankingCanjeados,
  getCuponesEntregadosMes,
  getCuponesCanjeadosMes,
  getComercioMasInteraccion,
  getComerciosAdmin,
  aprobarComercio
} from '../services/authService';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement);

export default function AdminPage() {
  const [stats, setStats] = useState(null);
  const [rankingEntregados, setRankingEntregados] = useState([]);
  const [rankingCanjeados, setRankingCanjeados] = useState([]);
  const [entregadosMes, setEntregadosMes] = useState([]);
  const [canjeadosMes, setCanjeadosMes] = useState([]);
  const [masInteraccion, setMasInteraccion] = useState(null);
  const [comercios, setComercios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [s, re, rc, em, cm, mi, cs] = await Promise.all([
          getEstadisticasGenerales(token),
          getRankingEntregados(token),
          getRankingCanjeados(token),
          getCuponesEntregadosMes(token),
          getCuponesCanjeadosMes(token),
          getComercioMasInteraccion(token),
          getComerciosAdmin(token)
        ]);
        setStats(s);
        setRankingEntregados(re);
        setRankingCanjeados(rc);
        setEntregadosMes(em);
        setCanjeadosMes(cm);
        setMasInteraccion(mi);
        setComercios(cs);
      } catch (err) {
        setError('Error al cargar datos del dashboard');
      }
      setLoading(false);
    }
    fetchData();
  }, [token]);

  const handleAprobar = async (id) => {
    try {
      await aprobarComercio(id, token);
      setComercios(comercios.map(c => c.id_comercio === id ? { ...c, activo: 1 } : c));
    } catch {
      alert('Error al aprobar comercio');
    }
  };

  // Preparar datos para gráficos
  const entregadosPorComercio = {
    labels: rankingEntregados.map(c => c.nombre),
    datasets: [{
      label: 'Cupones entregados',
      data: rankingEntregados.map(c => c.cupones_entregados),
      backgroundColor: 'rgba(59,130,246,0.7)'
    }]
  };
  const canjeadosPorComercio = {
    labels: rankingCanjeados.map(c => c.nombre),
    datasets: [{
      label: 'Cupones canjeados',
      data: rankingCanjeados.map(c => c.cupones_canjeados),
      backgroundColor: 'rgba(16,185,129,0.7)'
    }]
  };
  const entregadosPorMes = {
    labels: [...new Set(entregadosMes.map(e => e.mes))],
    datasets: [{
      label: 'Cupones entregados',
      data: entregadosMes.reduce((acc, cur) => {
        const idx = acc.findIndex(e => e.label === cur.mes);
        if (idx === -1) acc.push({ label: cur.mes, value: cur.cantidad });
        else acc[idx].value += cur.cantidad;
        return acc;
      }, []).map(e => e.value),
      backgroundColor: 'rgba(59,130,246,0.5)'
    }]
  };
  const canjeadosPorMes = {
    labels: canjeadosMes.map(e => e.mes),
    datasets: [{
      label: 'Cupones canjeados',
      data: canjeadosMes.map(e => e.cantidad),
      backgroundColor: 'rgba(16,185,129,0.5)'
    }]
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Panel de Administración</h1>
        {loading ? <div>Cargando...</div> : error ? <div className="text-red-600">{error}</div> : (
          <>
            {/* Estadísticas globales */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded shadow p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{stats?.total_comercios}</div>
                <div className="text-gray-600">Comercios</div>
              </div>
              <div className="bg-white rounded shadow p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{stats?.total_usuarios}</div>
                <div className="text-gray-600">Clientes</div>
              </div>
              <div className="bg-white rounded shadow p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{stats?.total_cupones}</div>
                <div className="text-gray-600">Cupones</div>
              </div>
              <div className="bg-white rounded shadow p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">{stats?.cupones_usados}</div>
                <div className="text-gray-600">Cupones Canjeados</div>
              </div>
            </div>
            {/* Gráficos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded shadow p-4">
                <h2 className="font-bold mb-2">Ranking: Cupones entregados por comercio</h2>
                <Bar data={entregadosPorComercio} options={{ responsive: true, plugins: { legend: { display: false } } }} />
              </div>
              <div className="bg-white rounded shadow p-4">
                <h2 className="font-bold mb-2">Ranking: Cupones canjeados por comercio</h2>
                <Bar data={canjeadosPorComercio} options={{ responsive: true, plugins: { legend: { display: false } } }} />
              </div>
              <div className="bg-white rounded shadow p-4">
                <h2 className="font-bold mb-2">Cupones entregados por mes</h2>
                <Bar data={entregadosPorMes} options={{ responsive: true, plugins: { legend: { display: false } } }} />
              </div>
              <div className="bg-white rounded shadow p-4">
                <h2 className="font-bold mb-2">Cupones canjeados por mes</h2>
                <Line data={canjeadosPorMes} options={{ responsive: true, plugins: { legend: { display: false } } }} />
              </div>
            </div>
            {/* Comercio con más interacción */}
            <div className="bg-white rounded shadow p-4 mb-8">
              <h2 className="font-bold mb-2">Comercio con más interacción</h2>
              {masInteraccion ? (
                <div>
                  <span className="font-bold text-blue-700">{masInteraccion.nombre}</span> —
                  <span className="ml-2">Entregados: <b>{masInteraccion.cupones_entregados}</b></span> |
                  <span className="ml-2">Canjeados: <b>{masInteraccion.cupones_canjeados}</b></span> |
                  <span className="ml-2">Total interacción: <b>{masInteraccion.interaccion_total}</b></span>
                </div>
              ) : <span>No hay datos</span>}
            </div>
            {/* Comercios pendientes de aprobación */}
            <div className="bg-white rounded shadow p-4">
              <h2 className="font-bold mb-2">Comercios pendientes de aprobación</h2>
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="py-2">Nombre</th>
                    <th>Usuario</th>
                    <th>Dirección</th>
                    <th>Teléfono</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {comercios.filter(c => c.activo === 0).length === 0 ? (
                    <tr><td colSpan={5} className="text-center py-4">No hay comercios pendientes</td></tr>
                  ) : comercios.filter(c => c.activo === 0).map(c => (
                    <tr key={c.id_comercio} className="border-t">
                      <td className="py-2">{c.nombre}</td>
                      <td>{c.usuario}</td>
                      <td>{c.direccion}</td>
                      <td>{c.telefono}</td>
                      <td>
                        <button
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                          onClick={() => handleAprobar(c.id_comercio)}
                        >Aprobar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 