const { pool } = require('../config/database');

// Obtener todos los cupones
const getCupones = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM cupones');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener cupones', error: error.message });
    }
};

// Obtener cupón por ID
const getCuponById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM cupones WHERE id_cupon = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ mensaje: 'Cupón no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener cupón', error: error.message });
    }
};

// Crear cupón
const createCupon = async (req, res) => {
    const { id_comercio_origen, tipo, valor, descripcion, codigo, fecha_vencimiento } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO cupones (id_comercio_origen, tipo, valor, descripcion, codigo, estado, fecha_vencimiento) VALUES (?, ?, ?, ?, ?, "disponible", ?)',
            [id_comercio_origen, tipo, valor, descripcion, codigo, fecha_vencimiento]
        );
        res.status(201).json({ mensaje: 'Cupón creado exitosamente', id: result.insertId });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear cupón', error: error.message });
    }
};

// Actualizar cupón
const updateCupon = async (req, res) => {
    const { tipo, valor, descripcion, codigo, estado, fecha_vencimiento } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE cupones SET tipo = ?, valor = ?, descripcion = ?, codigo = ?, estado = ?, fecha_vencimiento = ? WHERE id_cupon = ?',
            [tipo, valor, descripcion, codigo, estado, fecha_vencimiento, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Cupón no encontrado' });
        }
        res.json({ mensaje: 'Cupón actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar cupón', error: error.message });
    }
};

// Eliminar cupón (soft delete)
const deleteCupon = async (req, res) => {
    try {
        const [result] = await pool.query('UPDATE cupones SET estado = "vencido" WHERE id_cupon = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Cupón no encontrado' });
        }
        res.json({ mensaje: 'Cupón marcado como vencido' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar cupón', error: error.message });
    }
};

module.exports = {
    getCupones,
    getCuponById,
    createCupon,
    updateCupon,
    deleteCupon
}; 