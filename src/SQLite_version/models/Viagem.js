const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Viagem = sequelize.define('Viagem', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    rota_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'rotas',
            key: 'id'
        }
    },
    motorista_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'motoristas',
            key: 'id'
        }
    },
    data_viagem: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    horario_inicio: {
        type: DataTypes.TIME,
        allowNull: true,
    },
    horario_fim: {
        type: DataTypes.TIME,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pendente' // pendente, em_andamento, finalizada
    },
}, {
    tableName: 'viagens',
    timestamps: true,
});

Viagem.associate = (models) => {
    Viagem.belongsTo(models.Rota, {
        foreignKey: 'rota_id',
        as: 'rota'
    });
    Viagem.belongsTo(models.Motorista, {
        foreignKey: 'motorista_id',
        as: 'motorista'
    });
    Viagem.hasMany(models.PresencaAluno, {
        foreignKey: 'viagem_id',
        as: 'presencas'
    });
};

module.exports = Viagem;
