module.exports = (rolesPermitidos) => (req, res, next) => {
    if (!req.user || !rolesPermitidos.includes(req.user.rol)) {
        return res.status(403).json({ mensaje: 'Acceso denegado: permisos insuficientes' });
    }
    next();
}; 