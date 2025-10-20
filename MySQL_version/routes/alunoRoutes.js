// routes/alunoRoutes.js - Rotas para alunos

const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validarAluno } = require('../middlewares/validationMiddleware');
const logAction = require('../middlewares/logMiddleware');
const { podeAdicionar, podeDeletar } = require('../middlewares/permissaoMiddleware');

// Rotas de formulários (devem vir antes das rotas com parâmetros)
router.get('/cadastro', authMiddleware, alunoController.formCreate);
router.get('/ver', authMiddleware, alunoController.formList);
router.get('/editar', authMiddleware, alunoController.formEdit);
router.get('/cadastrar-rota', authMiddleware, alunoController.formCadastrarAlunosRota);

// Rotas de operações
router.post('/list', authMiddleware, alunoController.list);
router.post('/create', authMiddleware, podeAdicionar, validarAluno, logAction('CREATE', 'alunos'), alunoController.create);
router.post('/cadastrar-alunos-rota', authMiddleware, podeAdicionar, alunoController.cadastrarAlunosNaRota);

// Rotas com parâmetros (devem vir por último)
router.get('/:id', authMiddleware, alunoController.findById);
router.put('/:id', authMiddleware, validarAluno, logAction('UPDATE', 'alunos'), alunoController.update);
router.delete('/:id', authMiddleware, podeDeletar, logAction('DELETE', 'alunos'), alunoController.delete);


module.exports = router;
