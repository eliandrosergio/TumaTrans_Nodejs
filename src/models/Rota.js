// models/Rota.js - Modelo para cadastro de rotas

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Rota = sequelize.define('Rota', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    horario_inicio: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    horario_fim: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    pontos_parada: {
        type: DataTypes.TEXT, // JSON ou string com pontos
        allowNull: false,
    },
}, {
    tableName: 'rotas',
    timestamps: true,
});

module.exports = Rota;
