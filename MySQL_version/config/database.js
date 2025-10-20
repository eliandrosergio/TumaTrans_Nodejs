// config/database.js - Configuração do Sequelize com MySQL

const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Carrega variáveis de ambiente
dotenv.config();
const HOST = process.env.MYSQL_HOST
const USER = process.env.MYSQL_USER
const PASS = process.env.MYSQL_PASS
const PORT = process.env.MYSQL_PORT || 3307;
const DB = process.env.MYSQL_DB

// Conexão com MySQL
const sequelize = new Sequelize({
    dialect: 'mysql',
    host: `${HOST}`, // Endereço do servidor MySQL
    database: `${DB}`, // Nome do banco de dados
    username: `${USER}`, // Usuário do MySQL
    password: `${PASS}`, // Senha do MySQL
    port: PORT, // Porta padrão do MySQL
    logging: false, // Desliga logs para não poluir o console
});

module.exports = sequelize;
