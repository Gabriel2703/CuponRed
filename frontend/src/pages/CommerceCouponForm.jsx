import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const CommerceCouponForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    discount: '',
    maxUses: '',
    expiryDate: '',
    minimumPurchase: '',
    terms: ''
  });

  useEffect(() => {
    if (id) {
      fetchCoupon();
    }
  }, [id]);

  const fetchCoupon = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/commerce/coupons/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const coupon = response.data;
      setFormData({
        title: coupon.title,
        description: coupon.description,
        discount: coupon.discount,
        maxUses: coupon.maxUses,
        expiryDate: new Date(coupon.expiryDate).toISOString().split('T')[0],
        minimumPurchase: coupon.minimumPurchase,
        terms: coupon.terms
      });
    } catch (error) {
      console.error('Error al cargar cupón:', error);
      navigate('/commerce/coupons');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const url = id ? `/api/commerce/coupons/${id}` : '/api/commerce/coupons';
      const method = id ? 'put' : 'post';

      await axios[method](url, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      navigate('/commerce/coupons');
    } catch (error) {
      console.error('Error al guardar cupón:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          {id ? 'Editar Cupón' : 'Crear Nuevo Cupón'}
        </h1>

        <form onSubmit={handleSubmit} className="max-w-2xl bg-white p-6 rounded-lg shadow">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg"
                placeholder="Ej: 20% de descuento en ropa"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg"
                rows="3"
                placeholder="Describe el cupón y sus beneficios"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descuento (%)
                </label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  required
                  min="1"
                  max="100"
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Máximo de usos
                </label>
                <input
                  type="number"
                  name="maxUses"
                  value={formData.maxUses}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha de vencimiento
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Compra mínima ($)
                </label>
                <input
                  type="number"
                  name="minimumPurchase"
                  value={formData.minimumPurchase}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Términos y condiciones
              </label>
              <textarea
                name="terms"
                value={formData.terms}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                rows="3"
                placeholder="Especifica los términos y condiciones del cupón"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/commerce/coupons')}
                className="px-6 py-2 border rounded-lg hover:bg-gray-100 transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? 'Guardando...' : 'Guardar Cupón'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommerceCouponForm; 