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

// Buscar por ID
exports.findById = async (req, res) => {
    try {
        const motorista = await Motorista.findByPk(req.params.id);
        if (!motorista) {
            return res.status(404).json({ error: 'Motorista não encontrado.' });
        }
        res.json(motorista);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar motorista.' });
    }
};

// Atualizar
exports.update = async (req, res) => {
    try {
        const [updated] = await Motorista.update(req.body, { where: { id: req.params.id } });
        if (!updated) {
            return res.status(404).json({ error: 'Motorista não encontrado.' });
        }
        res.json({ message: 'Motorista atualizado com sucesso.' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar motorista.' });
    }
};

// Deletar
exports.delete = async (req, res) => {
    try {
        const deleted = await Motorista.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ error: 'Motorista não encontrado.' });
        }
        res.json({ message: 'Motorista excluído com sucesso.' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao excluir motorista.' });
    }
};

// Mostrar formulário de edição
exports.formEdit = (req, res) => {
    res.render('motoristaViews/editar_motorista', { title: 'Editar Motorista' });
};
