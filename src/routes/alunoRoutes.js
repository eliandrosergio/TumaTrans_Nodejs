// routes/alunoRoutes.js - Rotas para alunos

const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/list', authMiddleware, alunoController.list);
router.get('/ver', authMiddleware, alunoController.formList);
router.post('/create', authMiddleware, alunoController.create);
router.get('/cadastro', authMiddleware, alunoController.formCreate);
router.get('/:id', authMiddleware, alunoController.findById);
router.put('/:id', authMiddleware, alunoController.update);
router.delete('/:id', authMiddleware, alunoController.delete);

module.exports = router;
