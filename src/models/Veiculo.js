// models/Veiculo.js - Modelo para cadastro de veículos

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Veiculo = sequelize.define('Veiculo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    matricula: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    capacidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'veiculos',
    timestamps: true,
});

module.exports = Veiculo;
