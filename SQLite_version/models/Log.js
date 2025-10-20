const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Log = sequelize.define('Log', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    acao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tabela: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    registro_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    dados_anteriores: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    dados_novos: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    ip: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'logs',
    timestamps: true,
});

Log.associate = (models) => {
    Log.belongsTo(models.Usuario, {
        foreignKey: 'usuario_id',
        as: 'usuario'
    });
};

module.exports = Log;
