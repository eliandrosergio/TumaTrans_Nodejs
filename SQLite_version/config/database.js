// config/database.js - Configuração do Sequelize com SQLite

const { Sequelize } = require('sequelize');
const path = require('path');

// Conexão com SQLite (arquivo local: db.sqlite na raiz do projeto)
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', 'db.sqlite'), // Arquivo portátil
    logging: false, // Desliga logs para não poluir o console
});

module.exports = sequelize;
