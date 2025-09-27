// controllers/rotaController.js - Operações CRUD para rotas

const { Rota } = require('../models');

// Listar todos
exports.list = async (req, res) => {
    try {
        const rota = await Rota.findAll();
        res.json(rota);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao listar rotas.' });
    }
};

// Mostrar formulário da lista das rotas
exports.formList = (req, res) => {
    res.render('rotaViews/ver_rota', { title: 'Lista de Rotas Cadastradas' });
};

// Cadastrar rota
exports.create = async (req, res) => {
    try {
        const rota = await Rota.create(req.body);
        res.status(201).json({ message: 'Rota cadastrado com sucesso.', rota });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao cadastrar rota.' });
    }
};

// Mostrar formulário de cadastro
exports.formCreate = (req, res) => {
    res.render('rotaViews/cadastro_rota', { title: 'Cadastrar Rota' });
};

// Buscar por ID
exports.findById = async (req, res) => {
    try {
        const rota = await Rota.findByPk(req.params.id);
        if (!rota) {
            return res.status(404).json({ error: 'Rota não encontrada.' });
        }
        res.json(rota);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar rota.' });
    }
};

// Atualizar
exports.update = async (req, res) => {
    try {
        const [updated] = await Rota.update(req.body, { where: { id: req.params.id } });
        if (!updated) {
            return res.status(404).json({ error: 'Rota não encontrada.' });
        }
        res.json({ message: 'Rota atualizada com sucesso.' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar rota.' });
    }
};

// Deletar
exports.delete = async (req, res) => {
    try {
        const deleted = await Rota.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ error: 'Rota não encontrada.' });
        }
        res.json({ message: 'Rota excluída com sucesso.' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao excluir rota.' });
    }
};

// Mostrar formulário de edição
exports.formEdit = (req, res) => {
    res.render('rotaViews/editar_rota', { title: 'Editar Rota' });
};
