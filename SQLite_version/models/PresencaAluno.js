const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PresencaAluno = sequelize.define('PresencaAluno', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    viagem_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'viagens',
            key: 'id'
        }
    },
    aluno_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'alunos',
            key: 'id'
        }
    },
    paragem: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    horario_entrada: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    confirmado_motorista: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    confirmado_aluno: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    tableName: 'presencas_alunos',
    timestamps: true,
});

PresencaAluno.associate = (models) => {
    PresencaAluno.belongsTo(models.Viagem, {
        foreignKey: 'viagem_id',
        as: 'viagem'
    });
    PresencaAluno.belongsTo(models.Aluno, {
        foreignKey: 'aluno_id',
        as: 'aluno'
    });
};

module.exports = PresencaAluno;
