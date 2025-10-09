// controllers/alunoController.js - Operações CRUD para alunos

const { Aluno } = require('../models');

// Listar todos
exports.list = async (req, res) => {
    try {
        const nivel = req.user.nivel;
        const vinculoId = req.user.vinculo_id;
        let alunos;

        if (nivel === 'admin' || nivel === 'gerente') {
            alunos = await Aluno.findAll();
        } else if (nivel === 'motorista') {
            const { Rota } = require('../models');
            const rotas = await Rota.findAll({ where: { motorista_id: vinculoId } });
            const rotaIds = rotas.map(r => r.id);
            alunos = await Aluno.findAll({ where: { rota_id: rotaIds } });
        } else if (nivel === 'aluno') {
            const alunoVinculado = await Aluno.findByPk(vinculoId);
            if (alunoVinculado && alunoVinculado.rota_id) {
                alunos = await Aluno.findAll({ where: { rota_id: alunoVinculado.rota_id } });
            } else {
                alunos = [alunoVinculado];
            }
        }

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
        const nivel = req.user.nivel;
        const vinculoId = req.user.vinculo_id;
        const alunoId = req.params.id;

        if (nivel === 'aluno' && vinculoId != alunoId) {
            return res.status(403).json({ error: 'Você só pode editar seus próprios dados.' });
        }

        const [updated] = await Aluno.update(req.body, { where: { id: alunoId } });
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

// Mostrar formulário de edição
exports.formEdit = (req, res) => {
    res.render('alunoViews/editar_aluno', { title: 'Editar Aluno' });
};
