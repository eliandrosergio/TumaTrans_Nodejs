const { Usuario } = require('../models');
const bcrypt = require('bcryptjs');

// Listar todos os usuários
exports.list = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            attributes: { exclude: ['password'] } // Não mostrar senhas
        });
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao listar usuários.' });
    }
};

// Mostrar formulário de lista
exports.formList = (req, res) => {
    res.render('usuarioViews/ver_usuario', { title: 'Lista de Usuários' });
};

// Criar usuário
exports.create = async (req, res) => {
    const { username, email, password, nivel, vinculo_id } = req.body;
    try {
        const nivelUsuario = req.user.nivel;

        if (nivel === 'admin' && nivelUsuario !== 'admin') {
            return res.status(403).json({ error: 'Apenas admins podem criar outros admins.' });
        }

        if (nivel === 'gerente' && nivelUsuario !== 'admin') {
            return res.status(403).json({ error: 'Apenas admins podem criar gerentes.' });
        }

        if (!username || username.length < 3) {
            return res.status(400).json({ error: 'Username deve ter pelo menos 3 caracteres.' });
        }
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ error: 'Email inválido.' });
        }
        if (!password || password.length < 8) {
            return res.status(400).json({ error: 'Senha deve ter pelo menos 8 caracteres.' });
        }
        if (!['admin', 'gerente', 'aluno', 'motorista'].includes(nivel)) {
            return res.status(400).json({ error: 'Nível inválido.' });
        }

        const existe = await Usuario.findOne({ where: { username } });
        if (existe) {
            return res.status(400).json({ error: 'Username já existe.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const usuario = await Usuario.create({ 
            username, 
            email: email || null, 
            password: hashedPassword, 
            nivel,
            vinculo_id: vinculo_id || null
        });
        
        res.status(201).json({ 
            message: 'Usuário criado com sucesso.', 
            usuario: { id: usuario.id, username: usuario.username, email: usuario.email, nivel: usuario.nivel }
        });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao criar usuário.' });
    }
};

// Mostrar formulário de cadastro
exports.formCreate = (req, res) => {
    res.render('usuarioViews/cadastro_usuario', { title: 'Cadastrar Usuário' });
};

// Buscar por ID
exports.findById = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id, {
            attributes: { exclude: ['password'] }
        });
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }
        res.json(usuario);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar usuário.' });
    }
};

// Atualizar
exports.update = async (req, res) => {
    try {
        const { username, email, password, nivel } = req.body;
        const updateData = {};

        if (username) {
            if (username.length < 3) {
                return res.status(400).json({ error: 'Username deve ter pelo menos 3 caracteres.' });
            }
            updateData.username = username;
        }
        if (email) {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return res.status(400).json({ error: 'Email inválido.' });
            }
            updateData.email = email;
        }
        if (password) {
            if (password.length < 8) {
                return res.status(400).json({ error: 'Senha deve ter pelo menos 8 caracteres.' });
            }
            updateData.password = await bcrypt.hash(password, 10);
        }
        if (nivel) {
            if (!['admin', 'gerente', 'aluno', 'motorista'].includes(nivel)) {
                return res.status(400).json({ error: 'Nível inválido.' });
            }
            updateData.nivel = nivel;
        }

        const [updated] = await Usuario.update(updateData, { 
            where: { id: req.params.id } 
        });
        
        if (!updated) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }
        res.json({ message: 'Usuário atualizado com sucesso.' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar usuário.' });
    }
};

// Deletar
exports.delete = async (req, res) => {
    try {
        // Não permitir deletar o próprio usuário
        if (req.user.id == req.params.id) {
            return res.status(400).json({ error: 'Você não pode deletar seu próprio usuário.' });
        }

        const deleted = await Usuario.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }
        res.json({ message: 'Usuário excluído com sucesso.' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao excluir usuário.' });
    }
};

// Mostrar formulário de edição
exports.formEdit = (req, res) => {
    res.render('usuarioViews/editar_usuario', { title: 'Editar Usuário' });
};
