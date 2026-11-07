const estaAutenticado = (req, res, next) => {
  if (req.session && req.session.usuario) {
    return next();
  }
  return res.status(401).json({ mensaje: 'No autorizado. Inicie sesión.' });
};

module.exports = { estaAutenticado };