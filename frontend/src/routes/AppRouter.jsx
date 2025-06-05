import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import CuponesPage from '../pages/CuponesPage';
import HistorialPage from '../pages/HistorialPage';
import PerfilPage from '../pages/PerfilPage';
import AdminPage from '../pages/AdminPage';
import RegistroComercioPage from '../pages/RegistroComercioPage';
import AdminLoginPage from '../pages/AdminLoginPage';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/cupones" element={<CuponesPage />} />
        <Route path="/historial" element={<HistorialPage />} />
        <Route path="/perfil" element={<PerfilPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/registro-comercio" element={<RegistroComercioPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
} 