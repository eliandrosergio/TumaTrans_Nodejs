// middlewares/authMiddleware.js - Verifica token JWT

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = (req, res, next) => {
    // middlewares/authMiddleware.js
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ error: 'Acesso negado. Cabeçalho Authorization não fornecido.' });
    }
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Adiciona user ao request
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token inválido.' });
    }
};

module.exports = authMiddleware;
