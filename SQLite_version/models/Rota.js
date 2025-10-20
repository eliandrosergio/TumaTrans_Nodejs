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
    motorista_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'motoristas',
            key: 'id'
        }
    },
    veiculo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'veiculos',
            key: 'id'
        }
    },
}, {
    tableName: 'rotas',
    timestamps: true,
});

Rota.associate = (models) => {
    // Uma rota pertence a um motorista
    Rota.belongsTo(models.Motorista, {
        foreignKey: 'motorista_id',
        as: 'motorista'
    });
    
    // Uma rota pertence a um veículo
    Rota.belongsTo(models.Veiculo, {
        foreignKey: 'veiculo_id',
        as: 'veiculo'
    });
    
    // Uma rota pode ter vários alunos
    Rota.hasMany(models.Aluno, {
        foreignKey: 'rota_id',
        as: 'alunos'
    });
};

module.exports = Rota;
