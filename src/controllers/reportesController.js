const { pool } = require('../config/database');

// Reporte: Cupones usados
const cuponesUsados = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM cupones WHERE estado = "usado"');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener cupones usados', error: error.message });
    }
};

// Reporte: Cupones disponibles
const cuponesDisponibles = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM cupones WHERE estado = "disponible"');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener cupones disponibles', error: error.message });
    }
};

// Reporte: Cupones asignados
const cuponesAsignados = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM cupones WHERE estado = "asignado"');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener cupones asignados', error: error.message });
    }
};

// Reporte: Estadísticas generales
const estadisticasGenerales = async (req, res) => {
    try {
        const [[{ total_usuarios }]] = await pool.query('SELECT COUNT(*) as total_usuarios FROM usuarios');
        const [[{ total_comercios }]] = await pool.query('SELECT COUNT(*) as total_comercios FROM comercios');
        const [[{ total_cupones }]] = await pool.query('SELECT COUNT(*) as total_cupones FROM cupones');
        const [[{ cupones_usados }]] = await pool.query('SELECT COUNT(*) as cupones_usados FROM cupones WHERE estado = "usado"');
        const [[{ cupones_disponibles }]] = await pool.query('SELECT COUNT(*) as cupones_disponibles FROM cupones WHERE estado = "disponible"');
        const [[{ cupones_asignados }]] = await pool.query('SELECT COUNT(*) as cupones_asignados FROM cupones WHERE estado = "asignado"');
        res.json({
            total_usuarios,
            total_comercios,
            total_cupones,
            cupones_usados,
            cupones_disponibles,
            cupones_asignados
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener estadísticas', error: error.message });
    }
};

// Ranking: Comercios que más cupones entregaron
const rankingComerciosEntregados = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT c.id_comercio, c.nombre, COUNT(cu.id_cupon) as cupones_entregados
            FROM comercios c
            LEFT JOIN cupones cu ON cu.id_comercio_origen = c.id_comercio
            GROUP BY c.id_comercio, c.nombre
            ORDER BY cupones_entregados DESC
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener ranking', error: error.message });
    }
};

// Ranking: Comercios con más cupones canjeados
const rankingComerciosCanjeados = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT c.id_comercio, c.nombre, COUNT(t.id_transaccion) as cupones_canjeados
            FROM comercios c
            LEFT JOIN cupones cu ON cu.id_comercio_origen = c.id_comercio
            LEFT JOIN transacciones_uso_cupon t ON t.id_cupon = cu.id_cupon
            GROUP BY c.id_comercio, c.nombre
            ORDER BY cupones_canjeados DESC
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener ranking', error: error.message });
    }
};

// Cupones entregados por comercio por mes
const cuponesEntregadosPorMes = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT c.nombre, DATE_FORMAT(cu.fecha_creacion, '%Y-%m') as mes, COUNT(*) as cantidad
            FROM cupones cu
            JOIN comercios c ON cu.id_comercio_origen = c.id_comercio
            GROUP BY c.nombre, mes
            ORDER BY mes DESC, c.nombre
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener reporte', error: error.message });
    }
};

// Cupones canjeados por mes
const cuponesCanjeadosPorMes = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT DATE_FORMAT(t.fecha_uso, '%Y-%m') as mes, COUNT(*) as cantidad
            FROM transacciones_uso_cupon t
            GROUP BY mes
            ORDER BY mes DESC
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener reporte', error: error.message });
    }
};

// Comercio con más interacción (entregados + canjeados)
const comercioMasInteraccion = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT c.id_comercio, c.nombre,
                COUNT(DISTINCT cu.id_cupon) as cupones_entregados,
                COUNT(DISTINCT t.id_transaccion) as cupones_canjeados,
                (COUNT(DISTINCT cu.id_cupon) + COUNT(DISTINCT t.id_transaccion)) as interaccion_total
            FROM comercios c
            LEFT JOIN cupones cu ON cu.id_comercio_origen = c.id_comercio
            LEFT JOIN transacciones_uso_cupon t ON t.id_cupon = cu.id_cupon
            GROUP BY c.id_comercio, c.nombre
            ORDER BY interaccion_total DESC
            LIMIT 1
        `);
        res.json(rows[0] || {});
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener reporte', error: error.message });
    }
};

module.exports = {
    cuponesUsados,
    cuponesDisponibles,
    cuponesAsignados,
    estadisticasGenerales,
    rankingComerciosEntregados,
    rankingComerciosCanjeados,
    cuponesEntregadosPorMes,
    cuponesCanjeadosPorMes,
    comercioMasInteraccion
}; 