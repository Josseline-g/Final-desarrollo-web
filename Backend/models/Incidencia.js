const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Incidencia = sequelize.define('Incidencia', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  descripcion: { type: DataTypes.TEXT, allowNull: false },
  estado: { 
    type: DataTypes.ENUM('abierta', 'cerrada'), 
    defaultValue: 'abierta',
    allowNull: false 
  }
});

module.exports = Incidencia;