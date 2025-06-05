import axios from "axios";

const API_URL = "http://localhost:3000/api/comercios";

export const loginComercio = async (usuario, password) => {
  const response = await axios.post(`${API_URL}/login`, { usuario, password });
  return response.data;
};

export const registerComercio = async (data) => {
  const response = await axios.post(`${API_URL}/register`, data);
  return response.data;
};

export const loginAdmin = async (usuario, password) => {
  const response = await axios.post(`${API_URL}/login`, { usuario, password });
  return response.data;
};

export const getEstadisticasGenerales = async (token) => {
  const response = await axios.get('http://localhost:3000/api/reportes/estadisticas', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getRankingEntregados = async (token) => {
  const response = await axios.get('http://localhost:3000/api/reportes/ranking-entregados', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getRankingCanjeados = async (token) => {
  const response = await axios.get('http://localhost:3000/api/reportes/ranking-canjeados', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getCuponesEntregadosMes = async (token) => {
  const response = await axios.get('http://localhost:3000/api/reportes/cupones-entregados-mes', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getCuponesCanjeadosMes = async (token) => {
  const response = await axios.get('http://localhost:3000/api/reportes/cupones-canjeados-mes', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getComercioMasInteraccion = async (token) => {
  const response = await axios.get('http://localhost:3000/api/reportes/comercio-mas-interaccion', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getComerciosAdmin = async (token) => {
  const response = await axios.get('http://localhost:3000/api/admin/comercios', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const aprobarComercio = async (id, token) => {
  const response = await axios.put(`http://localhost:3000/api/admin/aprobar-comercio/${id}`, { activo: true }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}; 