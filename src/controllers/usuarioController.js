const { pool } = require('../config/database');
const bcrypt = require('bcryptjs');

// Obtener todos los usuarios
const getUsuarios = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener usuarios', error: error.message });
    }
};

// Obtener un usuario por ID
const getUsuarioById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener usuario', error: error.message });
    }
};

// Crear un nuevo usuario
const createUsuario = async (req, res) => {
    const { nombre, apellido, telefono, email } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO usuarios (nombre, apellido, telefono, email) VALUES (?, ?, ?, ?)',
            [nombre, apellido, telefono, email]
        );
        res.status(201).json({
            mensaje: 'Usuario creado exitosamente',
            id: result.insertId
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear usuario', error: error.message });
    }
};

// Actualizar un usuario
const updateUsuario = async (req, res) => {
    const { nombre, apellido, telefono, email, activo } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE usuarios SET nombre = ?, apellido = ?, telefono = ?, email = ?, activo = ? WHERE id_usuario = ?',
            [nombre, apellido, telefono, email, activo, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.json({ mensaje: 'Usuario actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar usuario', error: error.message });
    }
};

// Eliminar un usuario (soft delete)
const deleteUsuario = async (req, res) => {
    try {
        const [result] = await pool.query(
            'UPDATE usuarios SET activo = FALSE WHERE id_usuario = ?',
            [req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.json({ mensaje: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar usuario', error: error.message });
    }
};

module.exports = {
    getUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario
}; 