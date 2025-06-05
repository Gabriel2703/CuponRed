const { pool } = require('../config/database');

// CRUD de categorías
const getCategorias = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM categorias');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener categorías', error: error.message });
    }
};

const createCategoria = async (req, res) => {
    const { nombre, descripcion } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)', [nombre, descripcion]);
        res.status(201).json({ mensaje: 'Categoría creada', id: result.insertId });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear categoría', error: error.message });
    }
};

const updateCategoria = async (req, res) => {
    const { nombre, descripcion } = req.body;
    try {
        const [result] = await pool.query('UPDATE categorias SET nombre = ?, descripcion = ? WHERE id_categoria = ?', [nombre, descripcion, req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        }
        res.json({ mensaje: 'Categoría actualizada' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar categoría', error: error.message });
    }
};

const deleteCategoria = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM categorias WHERE id_categoria = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        }
        res.json({ mensaje: 'Categoría eliminada' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar categoría', error: error.message });
    }
};

// Preferencias de usuario
const getPreferenciasUsuario = async (req, res) => {
    const { id_usuario } = req.params;
    try {
        const [rows] = await pool.query(
            'SELECT pc.id_preferencia, c.id_categoria, c.nombre, c.descripcion FROM preferencias_clientes pc JOIN categorias c ON pc.id_categoria = c.id_categoria WHERE pc.id_usuario = ?',
            [id_usuario]
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener preferencias', error: error.message });
    }
};

const addPreferenciaUsuario = async (req, res) => {
    const { id_usuario, id_categoria } = req.body;
    try {
        // Evitar duplicados
        const [existe] = await pool.query('SELECT * FROM preferencias_clientes WHERE id_usuario = ? AND id_categoria = ?', [id_usuario, id_categoria]);
        if (existe.length > 0) {
            return res.status(400).json({ mensaje: 'La preferencia ya existe' });
        }
        await pool.query('INSERT INTO preferencias_clientes (id_usuario, id_categoria) VALUES (?, ?)', [id_usuario, id_categoria]);
        res.status(201).json({ mensaje: 'Preferencia agregada' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al agregar preferencia', error: error.message });
    }
};

const deletePreferenciaUsuario = async (req, res) => {
    const { id_usuario, id_categoria } = req.body;
    try {
        const [result] = await pool.query('DELETE FROM preferencias_clientes WHERE id_usuario = ? AND id_categoria = ?', [id_usuario, id_categoria]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Preferencia no encontrada' });
        }
        res.json({ mensaje: 'Preferencia eliminada' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar preferencia', error: error.message });
    }
};

module.exports = {
    getCategorias,
    createCategoria,
    updateCategoria,
    deleteCategoria,
    getPreferenciasUsuario,
    addPreferenciaUsuario,
    deletePreferenciaUsuario
}; 