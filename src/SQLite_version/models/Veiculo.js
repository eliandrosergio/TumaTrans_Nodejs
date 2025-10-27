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
    descricao: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    capacidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'veiculos',
    timestamps: true,
});

Veiculo.associate = (models) => {
    // Um veículo pode ter várias rotas
    Veiculo.hasMany(models.Rota, {
        foreignKey: 'veiculo_id',
        as: 'rotas'
    });
};

module.exports = Veiculo;
