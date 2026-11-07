const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { Usuario } = require('../models');

// Iniciar sesión
router.post('/login', async (req, res) => {
  const { nombreUsuario, contrasena } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { nombreUsuario } });
    if (!usuario || !await bcrypt.compare(contrasena, usuario.contrasena)) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    // Guardar en la sesión (Cookie)
    req.session.usuario = {
      id: usuario.id,
      nombreUsuario: usuario.nombreUsuario,
      rol: usuario.rol
    };

    res.json({ mensaje: 'Login exitoso', usuario: req.session.usuario });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cerrar sesión
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ mensaje: 'Error al salir' });
    res.clearCookie('connect.sid');
    res.json({ mensaje: 'Sesión cerrada' });
  });
});

// Consultar usuario actual
router.get('/me', (req, res) => {
  if (req.session && req.session.usuario) {
    return res.json({ usuario: req.session.usuario });
  }
  res.status(401).json({ usuario: null });
});

module.exports = router;