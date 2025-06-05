import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const CommerceNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo y nombre */}
          <div className="flex items-center">
            <Link to="/commerce/dashboard" className="text-xl font-bold text-blue-600">
              CupónRed
            </Link>
          </div>

          {/* Enlaces de navegación */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/commerce/dashboard"
              className={`${
                isActive('/commerce/dashboard')
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              } px-3 py-2 text-sm font-medium`}
            >
              Dashboard
            </Link>
            <Link
              to="/commerce/coupons"
              className={`${
                isActive('/commerce/coupons')
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              } px-3 py-2 text-sm font-medium`}
            >
              Cupones
            </Link>
            <Link
              to="/commerce/stats"
              className={`${
                isActive('/commerce/stats')
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              } px-3 py-2 text-sm font-medium`}
            >
              Estadísticas
            </Link>
            <Link
              to="/commerce/profile"
              className={`${
                isActive('/commerce/profile')
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              } px-3 py-2 text-sm font-medium`}
            >
              Perfil
            </Link>
          </div>

          {/* Botón de cerrar sesión */}
          <div>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-red-600 px-3 py-2 text-sm font-medium"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/commerce/dashboard"
            className={`${
              isActive('/commerce/dashboard')
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            } block px-3 py-2 rounded-md text-base font-medium`}
          >
            Dashboard
          </Link>
          <Link
            to="/commerce/coupons"
            className={`${
              isActive('/commerce/coupons')
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            } block px-3 py-2 rounded-md text-base font-medium`}
          >
            Cupones
          </Link>
          <Link
            to="/commerce/stats"
            className={`${
              isActive('/commerce/stats')
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            } block px-3 py-2 rounded-md text-base font-medium`}
          >
            Estadísticas
          </Link>
          <Link
            to="/commerce/profile"
            className={`${
              isActive('/commerce/profile')
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            } block px-3 py-2 rounded-md text-base font-medium`}
          >
            Perfil
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left text-red-600 hover:bg-red-50 block px-3 py-2 rounded-md text-base font-medium"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default CommerceNavbar; 