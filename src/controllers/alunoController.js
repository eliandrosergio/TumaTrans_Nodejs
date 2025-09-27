// controllers/alunoController.js - Operações CRUD para alunos

const { Aluno } = require('../models');

// Listar todos
exports.list = async (req, res) => {
    console.log(req.user);
    try {
        const alunos = await Aluno.findAll();
        res.json(alunos);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao listar alunos.' });
    }
};

// Mostrar formulário da lista dos alunos
exports.formList = (req, res) => {
    res.render('alunoViews/ver_aluno', { title: 'Lista de Alunos Cadastrados' });
};

// Cadastrar aluno
exports.create = async (req, res) => {
    try {
        const aluno = await Aluno.create(req.body);
        res.status(201).json({ message: 'Aluno cadastrado com sucesso.', aluno });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao cadastrar aluno.' });
    }
};

// Mostrar formulário de cadastro
exports.formCreate = (req, res) => {
    res.render('alunoViews/cadastro_aluno', { title: 'Cadastrar Aluno' });
};

// Buscar por ID
exports.findById = async (req, res) => {
    try {
        const aluno = await Aluno.findByPk(req.params.id);
        if (!aluno) {
            return res.status(404).json({ error: 'Aluno não encontrado.' });
        }
        res.json(aluno);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar aluno.' });
    }
};

// Atualizar
exports.update = async (req, res) => {
    try {
        const [updated] = await Aluno.update(req.body, { where: { id: req.params.id } });
        if (!updated) {
            return res.status(404).json({ error: 'Aluno não encontrado.' });
        }
        res.json({ message: 'Aluno atualizado com sucesso.' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar aluno.' });
    }
};

// Deletar
exports.delete = async (req, res) => {
    try {
        const deleted = await Aluno.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ error: 'Aluno não encontrado.' });
        }
        res.json({ message: 'Aluno excluído com sucesso.' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao excluir aluno.' });
    }
};
