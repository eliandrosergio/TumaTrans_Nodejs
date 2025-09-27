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
