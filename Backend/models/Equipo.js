const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Equipo = sequelize.define('Equipo', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  codigo: { type: DataTypes.STRING, unique: true, allowNull: false },
  ubicacion: { type: DataTypes.STRING }
});

module.exports = Equipo;