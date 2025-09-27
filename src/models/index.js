// models/index.js - Carrega e associa todos os modelos

const sequelize = require('../config/database');
const Aluno = require('./Aluno');
const Motorista = require('./Motorista');
const Rota = require('./Rota');
const Veiculo = require('./Veiculo');
const Usuario = require('./Usuario');

// Associações (exemplos relacionais)
Rota.belongsTo(Motorista); // Uma rota tem um motorista
Motorista.hasMany(Rota);   // Um motorista pode ter várias rotas

Rota.belongsTo(Veiculo);  // Uma rota tem um veículo
Veiculo.hasMany(Rota);     // Um veículo pode ter várias rotas

Aluno.belongsToMany(Rota, { through: 'AlunoRota' }); // Alunos em múltiplas rotas
Rota.belongsToMany(Aluno, { through: 'AlunoRota' }); // Rotas com múltiplos alunos

// Exporta tudo
module.exports = {
    sequelize,
    Aluno,
    Motorista,
    Rota,
    Veiculo,
    Usuario,
};
