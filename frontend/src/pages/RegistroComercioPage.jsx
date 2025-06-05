import React, { useState, useEffect } from 'react';
import { registerComercio } from '../services/authService';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistroComercioPage = () => {
  const [form, setForm] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    categoria_principal: '',
    usuario: '',
    password: ''
  });
  const [categorias, setCategorias] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener categorías para el select
    axios.get('http://localhost:3000/api/categorias', {
      headers: { Authorization: '' } // Quitar auth si no es necesario
    })
      .then(res => setCategorias(res.data))
      .catch(() => setCategorias([]));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMensaje('');
    setError('');
    try {
      await registerComercio(form);
      setMensaje('¡Registro exitoso! Espera la activación por un administrador.');
      setForm({ nombre: '', direccion: '', telefono: '', categoria_principal: '', usuario: '', password: '' });
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al registrar comercio');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Registro de Comercio</h2>
        {mensaje && <div className="mb-4 text-green-600">{mensaje}</div>}
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre del comercio" className="mb-3 w-full p-2 border rounded" required />
        <input name="direccion" value={form.direccion} onChange={handleChange} placeholder="Dirección" className="mb-3 w-full p-2 border rounded" required />
        <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono" className="mb-3 w-full p-2 border rounded" required />
        <select name="categoria_principal" value={form.categoria_principal} onChange={handleChange} className="mb-3 w-full p-2 border rounded" required>
          <option value="">Selecciona una categoría</option>
          {categorias.map(cat => (
            <option key={cat.id_categoria} value={cat.id_categoria}>{cat.nombre}</option>
          ))}
        </select>
        <input name="usuario" value={form.usuario} onChange={handleChange} placeholder="Usuario" className="mb-3 w-full p-2 border rounded" required />
        <input name="password" value={form.password} onChange={handleChange} placeholder="Contraseña" type="password" className="mb-3 w-full p-2 border rounded" required />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Registrarse</button>
        <button type="button" className="mt-4 w-full text-blue-600 hover:underline" onClick={() => navigate('/')}>Volver al login</button>
      </form>
    </div>
  );
};

export default RegistroComercioPage; 