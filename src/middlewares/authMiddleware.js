// middlewares/authMiddleware.js - Verifica token JWT

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = (req, res, next) => {
    // lendo o token do header Authorization, cookie ou query/body
    const token = req.header('Authorization')?.replace('Bearer ', '') || 
                req.cookies.authToken ||
                req.query.authToken || 
                req.body.authToken ||
                req.cookies.authToken;

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
