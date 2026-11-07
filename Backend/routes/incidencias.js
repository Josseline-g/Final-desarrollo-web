const express = require('express');
const router = express.Router();
const { Incidencia, Equipo, Usuario } = require('../models');
const { estaAutenticado } = require('../middlewares/auth');

// Obtener todas las incidencias
router.get('/', estaAutenticado, async (req, res) => {
  try {
    const incidencias = await Incidencia.findAll({
      include: [
        { model: Equipo, attributes: ['nombre', 'codigo'] },
        { model: Usuario, as: 'creador', attributes: ['id', 'nombreUsuario'] }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(incidencias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear nueva incidencia
router.post('/', estaAutenticado, async (req, res) => {
  const { equipoId, descripcion } = req.body;
  try {
    const nuevaIncidencia = await Incidencia.create({
      descripcion,
      equipoId,
      usuarioId: req.session.usuario.id
    });
    res.status(201).json(nuevaIncidencia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint de Cierre con Validación de Rol/Propietario
router.patch('/:id/cerrar', estaAutenticado, async (req, res) => {
  const { id } = req.params;
  const usuarioActual = req.session.usuario;

  try {
    const incidencia = await Incidencia.findByPk(id);

    if (!incidencia) {
      return res.status(404).json({ mensaje: 'Incidencia no encontrada' });
    }

    if (incidencia.estado === 'cerrada') {
      return res.status(400).json({ mensaje: 'La incidencia ya está cerrada' });
    }

    // Regla de negocio: Solo el creador o un técnico pueden cerrar
    const esPropietario = incidencia.usuarioId === usuarioActual.id;
    const esTecnico = usuarioActual.rol === 'tecnico';

    if (!esPropietario && !esTecnico) {
      return res.status(403).json({ 
        mensaje: 'No tienes permiso. Solo el usuario que la creó o un técnico pueden cerrarla.' 
      });
    }

    incidencia.estado = 'cerrada';
    await incidencia.save();

    res.json({ mensaje: 'Incidencia cerrada con éxito', incidencia });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;