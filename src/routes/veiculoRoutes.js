// routes/veiculoRoutes.js - Rotas para veículos

const express = require('express');
const router = express.Router();
const veiculoController = require('../controllers/veiculoController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rotas de formulários (devem vir antes das rotas com parâmetros)
router.get('/cadastro', authMiddleware, veiculoController.formCreate);
router.get('/ver', authMiddleware, veiculoController.formList);
router.get('/editar', authMiddleware, veiculoController.formEdit);

// Rotas de operações
router.post('/list', authMiddleware, veiculoController.list);
router.post('/create', authMiddleware, veiculoController.create);

// Rotas com parâmetros (devem vir por último)
router.get('/:id', authMiddleware, veiculoController.findById);
router.put('/:id', authMiddleware, veiculoController.update);
router.delete('/:id', authMiddleware, veiculoController.delete);

module.exports = router;
