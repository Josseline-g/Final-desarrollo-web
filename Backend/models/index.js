const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Equipo = require('./equipo');
const Incidencia = require('./Incidencia');

// Relaciones (1 a Muchos)
Usuario.hasMany(Incidencia, { foreignKey: 'usuarioId' });
Incidencia.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'creador' });

Equipo.hasMany(Incidencia, { foreignKey: 'equipoId' });
Incidencia.belongsTo(Equipo, { foreignKey: 'equipoId' });

module.exports = { sequelize, Usuario, Equipo, Incidencia };