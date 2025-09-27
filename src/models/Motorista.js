// models/Motorista.js - Modelo para cadastro de motoristas

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Motorista = sequelize.define('Motorista', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefone_emergencia: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'motoristas',
    timestamps: true,
});

module.exports = Motorista;
