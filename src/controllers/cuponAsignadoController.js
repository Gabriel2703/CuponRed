const { pool } = require('../config/database');

// Asignar cupón a usuario
const asignarCupon = async (req, res) => {
    const { id_cupon, id_usuario } = req.body;
    try {
        // Verificar que el cupón esté disponible
        const [cuponRows] = await pool.query('SELECT * FROM cupones WHERE id_cupon = ? AND estado = "disponible"', [id_cupon]);
        if (cuponRows.length === 0) {
            return res.status(400).json({ mensaje: 'El cupón no está disponible para asignar' });
        }
        // Asignar cupón
        await pool.query('INSERT INTO cupones_asignados (id_cupon, id_usuario) VALUES (?, ?)', [id_cupon, id_usuario]);
        // Cambiar estado del cupón a "asignado"
        await pool.query('UPDATE cupones SET estado = "asignado" WHERE id_cupon = ?', [id_cupon]);
        res.status(201).json({ mensaje: 'Cupón asignado exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al asignar cupón', error: error.message });
    }
};

// Canjear cupón
const canjearCupon = async (req, res) => {
    const { id_cupon, monto_venta, descuento_aplicado } = req.body;
    try {
        // Verificar que el cupón esté asignado y no usado
        const [cuponRows] = await pool.query('SELECT * FROM cupones WHERE id_cupon = ? AND estado = "asignado"', [id_cupon]);
        if (cuponRows.length === 0) {
            return res.status(400).json({ mensaje: 'El cupón no está asignado o ya fue usado/vencido' });
        }
        // Marcar cupón como usado
        await pool.query('UPDATE cupones SET estado = "usado" WHERE id_cupon = ?', [id_cupon]);
        // Registrar transacción
        await pool.query('INSERT INTO transacciones_uso_cupon (id_cupon, monto_venta, descuento_aplicado) VALUES (?, ?, ?)', [id_cupon, monto_venta, descuento_aplicado]);
        res.json({ mensaje: 'Cupón canjeado exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al canjear cupón', error: error.message });
    }
};

// Historial de cupones asignados a un usuario
const historialCuponesUsuario = async (req, res) => {
    const { id_usuario } = req.params;
    try {
        const [rows] = await pool.query(
            'SELECT ca.*, c.tipo, c.valor, c.descripcion, c.codigo, c.estado, c.fecha_vencimiento FROM cupones_asignados ca JOIN cupones c ON ca.id_cupon = c.id_cupon WHERE ca.id_usuario = ?',
            [id_usuario]
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener historial', error: error.message });
    }
};

module.exports = {
    asignarCupon,
    canjearCupon,
    historialCuponesUsuario
}; 