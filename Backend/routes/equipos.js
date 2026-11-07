const express = require('express');
const router = express.Router();
const { Equipo } = require('../models');
const { estaAutenticado } = require('../middlewares/auth');

router.get('/', estaAutenticado, async (req, res) => {
  try {
    const equipos = await Equipo.findAll();
    res.json(equipos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;