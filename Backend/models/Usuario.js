const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombreUsuario: { type: DataTypes.STRING, unique: true, allowNull: false },
  contrasena: { type: DataTypes.STRING, allowNull: false },
  rol: { 
    type: DataTypes.ENUM('usuario', 'tecnico'), 
    defaultValue: 'usuario',
    allowNull: false 
  }
});

module.exports = Usuario;