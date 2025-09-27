// controllers/veiculoController.js - Operações CRUD para veículos

const { Veiculo } = require('../models');

// Listar todos
exports.list = async (req, res) => {
    try {
        const veiculo = await Veiculo.findAll();
        res.json(veiculo);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao listar veiculos.' });
    }
};

// Mostrar formulário da lista dos alunos
exports.formList = (req, res) => {
    res.render('veiculoViews/ver_veiculo', { title: 'Lista de Veiculos Cadastrados' });
};

// Cadastrar veiculo
exports.create = async (req, res) => {
    try {
        const veiculo = await Veiculo.create(req.body);
        res.status(201).json({ message: 'Veículo cadastrado com sucesso.', veiculo });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao cadastrar rota.' });
    }
};

// Mostrar formulário de cadastro
exports.formCreate = (req, res) => {
    res.render('veiculoViews/cadastro_veiculo', { title: 'Cadastrar Veiculo' });
};

// Outros métodos (update, delete) podem ser adicionados depois
