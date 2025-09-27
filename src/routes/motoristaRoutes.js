// routes/motoristaRoutes.js - Rotas para motoristas

const express = require('express');
const router = express.Router();
const motoristaController = require('../controllers/motoristaController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rotas de formulários (devem vir antes das rotas com parâmetros)
router.get('/cadastro', authMiddleware, motoristaController.formCreate);
router.get('/ver', authMiddleware, motoristaController.formList);
router.get('/editar', authMiddleware, motoristaController.formEdit);

// Rotas de operações
router.post('/list', authMiddleware, motoristaController.list);
router.post('/create', authMiddleware, motoristaController.create);

// Rotas com parâmetros (devem vir por último)
router.get('/:id', authMiddleware, motoristaController.findById);
router.put('/:id', authMiddleware, motoristaController.update);
router.delete('/:id', authMiddleware, motoristaController.delete);

module.exports = router;
