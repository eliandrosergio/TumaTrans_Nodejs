// routes/navRoutes.js - Rotas para navegação

const express = require('express');
const router = express.Router();
const navController = require('../controllers/navController');
const authMiddleware = require('../middlewares/authMiddleware');

// Secção do login, logout e redefinição de senha
router.get('/login', navController.login);
router.get('/logout', navController.logout);
router.get('/redefinir_senha', navController.redefinir_senha);

// Secção de controle do Home
router.get('/home', navController.home);
router.get('/homeControl', authMiddleware, navController.homeControl);

module.exports = router;
