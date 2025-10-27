// models/Usuario.js - Modelo para usuários (admins, motoristas, etc.)

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: { isEmail: true }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nivel: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    vinculo_id: {
        type: DataTypes.INTEGER,
        allowNull: true, 
    },
}, {
    tableName: 'usuarios',
    timestamps: true,
});

module.exports = Usuario;
