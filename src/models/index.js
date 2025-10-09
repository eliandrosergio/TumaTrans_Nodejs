// models/index.js - Carrega e associa todos os modelos

const sequelize = require('../config/database');
const Aluno = require('./Aluno');
const Motorista = require('./Motorista');
const Rota = require('./Rota');
const Veiculo = require('./Veiculo');
const Usuario = require('./Usuario');
const Log = require('./Log');
const Viagem = require('./Viagem');
const PresencaAluno = require('./PresencaAluno');

const models = { Aluno, Motorista, Rota, Veiculo, Usuario, Log, Viagem, PresencaAluno };

Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

module.exports = {
    sequelize,
    ...models
};
