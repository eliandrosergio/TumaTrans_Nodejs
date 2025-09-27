// models/index.js - Carrega e associa todos os modelos

const sequelize = require('../config/database');
const Aluno = require('./Aluno');
const Motorista = require('./Motorista');
const Rota = require('./Rota');
const Veiculo = require('./Veiculo');
const Usuario = require('./Usuario');

// Criar as associações
const models = { Aluno, Motorista, Rota, Veiculo, Usuario };

// Executar associações se existirem
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

module.exports = {
    sequelize,
    ...models
};
