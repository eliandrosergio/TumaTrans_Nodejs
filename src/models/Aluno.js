// models/Aluno.js - Modelo para cadastro de alunos

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Aluno = sequelize.define('Aluno', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    num_processo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefone_aluno: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefone_encarregado: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    data_nascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
}, {
    tableName: 'alunos',
    timestamps: true, // Adiciona createdAt e updatedAt
});

module.exports = Aluno;
