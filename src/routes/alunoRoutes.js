// routes/alunoRoutes.js - Rotas para alunos

const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validarAluno } = require('../middlewares/validationMiddleware');
const logAction = require('../middlewares/logMiddleware');

// Rotas de formulários (devem vir antes das rotas com parâmetros)
router.get('/cadastro', authMiddleware, alunoController.formCreate);
router.get('/ver', authMiddleware, alunoController.formList);
router.get('/editar', authMiddleware, alunoController.formEdit);

// Rotas de operações
router.post('/list', authMiddleware, alunoController.list);
router.post('/create', authMiddleware, validarAluno, logAction('CREATE', 'alunos'), alunoController.create);

// Rotas com parâmetros (devem vir por último)
router.get('/:id', authMiddleware, alunoController.findById);
router.put('/:id', authMiddleware, validarAluno, logAction('UPDATE', 'alunos'), alunoController.update);
router.delete('/:id', authMiddleware, logAction('DELETE', 'alunos'), alunoController.delete);

module.exports = router;
