const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rotas de formulários
router.get('/cadastro', authMiddleware, usuarioController.formCreate);
router.get('/ver', authMiddleware, usuarioController.formList);
router.get('/editar', authMiddleware, usuarioController.formEdit);

// Rotas de operações
router.post('/list', authMiddleware, usuarioController.list);
router.post('/create', authMiddleware, usuarioController.create);

// Rotas com parâmetros
router.get('/:id', authMiddleware, usuarioController.findById);
router.put('/:id', authMiddleware, usuarioController.update);
router.delete('/:id', authMiddleware, usuarioController.delete);

module.exports = router;
