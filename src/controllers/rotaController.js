// controllers/rotaController.js - Operações CRUD para rotas

const { Rota } = require('../models');

// Cadastrar rota
exports.create = async (req, res) => {
    try {
        const rota = await Rota.create(req.body);
        res.status(201).json({ message: 'Rota cadastrado com sucesso.', rota });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao cadastrar rota.' });
    }
};

// Listar todos
exports.list = async (req, res) => {
    try {
        const rota = await Rota.findAll();
        res.json(rota);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao listar rotas.' });
    }
};
