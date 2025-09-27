// controllers/authController.js - Registro, login e redefinição de senha

const { Usuario } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.register = async (req, res) => {
    const { username, email, password, nivel } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const usuario = await Usuario.create({ username, email, password: hashedPassword, nivel });
        res.status(201).json({ message: 'Usuário registrado com sucesso.', usuario });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao registrar usuário.' });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ where: { username } });
        if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }
        const token = jwt.sign({ id: usuario.id, nivel: usuario.nivel }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // Depois de: const token = jwt.sign(...)
        res.cookie('authToken', token, { 
            httpOnly: false, // Para JavaScript acessar
            maxAge: 3600000 // 1 hora
        });
        res.json({ message: 'Login bem-sucedido.', token });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao fazer login.' });
    }
};

exports.resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(404).json({ error: 'E-mail não encontrado.' });
        } else if (newPassword.length < 8)
        {
            return res.status(500).json({ error: 'Senha deve ter pelo menos 8 caracteres.' });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await usuario.update({ password: hashedPassword });
        res.json({ message: 'Senha redefinida com sucesso.' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao redefinir senha.' });
    }
};
