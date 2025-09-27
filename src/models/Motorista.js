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

Motorista.associate = (models) => {
    // Um motorista pode ter várias rotas
    Motorista.hasMany(models.Rota, {
        foreignKey: 'motorista_id',
        as: 'rotas'
    });
};

module.exports = Motorista;
