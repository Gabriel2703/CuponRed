import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginComercio } from '../services/authService';

export default function LoginPage() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usuario || !password) {
      setError('Completa todos los campos');
      return;
    }
    setError('');
    try {
      const data = await loginComercio(usuario, password);
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Usuario</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={usuario}
            onChange={e => setUsuario(e.target.value)}
            placeholder="Usuario o email"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 text-gray-700">Contraseña</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Contraseña"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Ingresar
        </button>
        <button
          className="mt-4 w-full text-blue-600 hover:underline"
          onClick={() => navigate('/registro-comercio')}
        >
          ¿Eres un comercio? Regístrate aquí
        </button>
      </form>
    </div>
  );
} 