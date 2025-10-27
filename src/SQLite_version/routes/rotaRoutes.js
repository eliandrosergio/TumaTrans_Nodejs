// routes/rotaRoutes.js - Rotas para rotas (que coisa né)

const express = require('express');
const router = express.Router();
const rotaController = require('../controllers/rotaController');
const authMiddleware = require('../middlewares/authMiddleware');
const { podeAdicionar, podeDeletar } = require('../middlewares/permissaoMiddleware');

// Rotas de formulários (devem vir antes das rotas com parâmetros)
router.get('/cadastro', authMiddleware, rotaController.formCreate);
router.get('/ver', authMiddleware, rotaController.formList);
router.get('/editar', authMiddleware, rotaController.formEdit);

// Rotas de operações
router.post('/list', authMiddleware, rotaController.list);
router.post('/create', authMiddleware, podeAdicionar, rotaController.create);

// Rotas com parâmetros (devem vir por último)
router.get('/:id', authMiddleware, rotaController.findById);
router.put('/:id', authMiddleware, rotaController.update);
router.delete('/:id', authMiddleware, podeDeletar, rotaController.delete);

module.exports = router;
