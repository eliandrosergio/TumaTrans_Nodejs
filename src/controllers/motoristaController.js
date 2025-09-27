// controllers/motoristaController.js - Operações CRUD para motoristas

const { Motorista } = require('../models');

// Listar todos
exports.list = async (req, res) => {
    try {
        const motoristas = await Motorista.findAll();
        res.json(motoristas);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao listar motoristas.' });
    }
};

// Mostrar formulário da lista dos alunos
exports.formList = (req, res) => {
    res.render('motoristaViews/ver_motorista', { title: 'Lista de Motoristas Cadastrados' });
};

// Cadastrar motorista
exports.create = async (req, res) => {
    try {
        const motorista = await Motorista.create(req.body);
        res.status(201).json({ message: 'Motorista cadastrado com sucesso.', motorista });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao cadastrar motorista.' });
    }
};

// Mostrar formulário de cadastro
exports.formCreate = (req, res) => {
    res.render('motoristaViews/cadastro_motorista', { title: 'Cadastrar Motorista' });
};
