import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import CommerceDashboard from '../pages/CommerceDashboard';
import CommerceCoupons from '../pages/CommerceCoupons';
import CommerceCouponForm from '../pages/CommerceCouponForm';
import CommerceStats from '../pages/CommerceStats';
import CommerceProfile from '../pages/CommerceProfile';
import CommerceNavbar from '../components/CommerceNavbar';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const CommerceLayout = ({ children }) => {
  return (
    <>
      <CommerceNavbar />
      {children}
    </>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rutas del panel de comercios */}
      <Route
        path="/commerce/dashboard"
        element={
          <PrivateRoute>
            <CommerceLayout>
              <CommerceDashboard />
            </CommerceLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/commerce/coupons"
        element={
          <PrivateRoute>
            <CommerceLayout>
              <CommerceCoupons />
            </CommerceLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/commerce/coupons/new"
        element={
          <PrivateRoute>
            <CommerceLayout>
              <CommerceCouponForm />
            </CommerceLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/commerce/coupons/edit/:id"
        element={
          <PrivateRoute>
            <CommerceLayout>
              <CommerceCouponForm />
            </CommerceLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/commerce/stats"
        element={
          <PrivateRoute>
            <CommerceLayout>
              <CommerceStats />
            </CommerceLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/commerce/profile"
        element={
          <PrivateRoute>
            <CommerceLayout>
              <CommerceProfile />
            </CommerceLayout>
          </PrivateRoute>
        }
      />

      {/* Redirección por defecto */}
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes; 