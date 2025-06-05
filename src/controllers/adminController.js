const { pool } = require('../config/database');

// Aprobar comercio
const aprobarComercio = async (req, res) => {
    try {
        const [result] = await pool.query('UPDATE comercios SET activo = TRUE WHERE id_comercio = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Comercio no encontrado' });
        }
        res.json({ mensaje: 'Comercio aprobado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al aprobar comercio', error: error.message });
    }
};

// Listar todos los usuarios
const getUsuarios = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener usuarios', error: error.message });
    }
};

// Listar todos los comercios
const getComercios = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM comercios');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener comercios', error: error.message });
    }
};

module.exports = {
    aprobarComercio,
    getUsuarios,
    getComercios
}; 