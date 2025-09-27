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

// Buscar por ID
exports.findById = async (req, res) => {
    try {
        const veiculo = await Veiculo.findByPk(req.params.id);
        if (!veiculo) {
            return res.status(404).json({ error: 'Veículo não encontrado.' });
        }
        res.json(veiculo);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar veículo.' });
    }
};

// Atualizar
exports.update = async (req, res) => {
    try {
        const [updated] = await Veiculo.update(req.body, { where: { id: req.params.id } });
        if (!updated) {
            return res.status(404).json({ error: 'Veículo não encontrado.' });
        }
        res.json({ message: 'Veículo atualizado com sucesso.' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar veículo.' });
    }
};

// Deletar
exports.delete = async (req, res) => {
    try {
        const deleted = await Veiculo.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ error: 'Veículo não encontrado.' });
        }
        res.json({ message: 'Veículo excluído com sucesso.' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao excluir veículo.' });
    }
};

// Mostrar formulário de edição
exports.formEdit = (req, res) => {
    res.render('veiculoViews/editar_veiculo', { title: 'Editar Veículo' });
};
