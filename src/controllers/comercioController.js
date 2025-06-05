const { pool } = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registro de comercio
const registerComercio = async (req, res) => {
    const { nombre, direccion, telefono, categoria_principal, usuario, password } = req.body;
    // Validación de campos obligatorios
    if (!nombre || !direccion || !telefono || !categoria_principal || !usuario || !password) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios: nombre, direccion, telefono, categoria_principal, usuario, password' });
    }
    try {
        // Verificar si el usuario ya existe
        const [existe] = await pool.query('SELECT * FROM comercios WHERE usuario = ?', [usuario]);
        if (existe.length > 0) {
            return res.status(400).json({ mensaje: 'El usuario ya existe' });
        }
        // Hashear contraseña
        const password_hash = await bcrypt.hash(password, 10);
        // Crear comercio con activo en FALSE
        await pool.query(
            'INSERT INTO comercios (nombre, direccion, telefono, categoria_principal, usuario, password_hash, activo) VALUES (?, ?, ?, ?, ?, ?, FALSE)',
            [nombre, direccion, telefono, categoria_principal, usuario, password_hash]
        );
        res.status(201).json({ mensaje: 'Registro exitoso. Tu cuenta será activada por un administrador antes de poder ingresar.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al registrar comercio', error: error.message });
    }
};

// Login de comercio
const loginComercio = async (req, res) => {
    const { usuario, password } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM comercios WHERE usuario = ?', [usuario]);
        if (rows.length === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        const comercio = rows[0];
        if (!comercio.activo) {
            return res.status(403).json({ mensaje: 'Tu cuenta aún no ha sido activada por un administrador.' });
        }
        const passwordValida = await bcrypt.compare(password, comercio.password_hash);
        if (!passwordValida) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
        }
        // Generar JWT
        const token = jwt.sign({ id: comercio.id_comercio, usuario: comercio.usuario, rol: comercio.rol }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.json({ token, comercio: { id: comercio.id_comercio, nombre: comercio.nombre, usuario: comercio.usuario, rol: comercio.rol } });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al iniciar sesión', error: error.message });
    }
};

// Obtener todos los comercios (solo admin)
const getComercios = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM comercios');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener comercios', error: error.message });
    }
};

// Activar o desactivar comercio (solo admin)
const setActivo = async (req, res) => {
    const { activo } = req.body;
    try {
        const [result] = await pool.query('UPDATE comercios SET activo = ? WHERE id_comercio = ?', [activo, req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Comercio no encontrado' });
        }
        res.json({ mensaje: 'Estado actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar estado', error: error.message });
    }
};

// Eliminar comercio (soft delete)
const deleteComercio = async (req, res) => {
    try {
        const [result] = await pool.query('UPDATE comercios SET activo = FALSE WHERE id_comercio = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Comercio no encontrado' });
        }
        res.json({ mensaje: 'Comercio eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar comercio', error: error.message });
    }
};

module.exports = {
    registerComercio,
    loginComercio,
    getComercios,
    setActivo,
    deleteComercio
}; 