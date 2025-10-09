const express = require('express');
const router = express.Router();
const viagemController = require('../controllers/viagemController');
const authMiddleware = require('../middlewares/authMiddleware');
const { permissaoMiddleware } = require('../middlewares/permissaoMiddleware');

// Forms
router.get('/motorista', authMiddleware, permissaoMiddleware(['motorista']), viagemController.formViagensMotorista);
router.get('/aluno', authMiddleware, permissaoMiddleware(['aluno']), viagemController.formViagensAluno);

// APIs
router.post('/iniciar', authMiddleware, permissaoMiddleware(['motorista']), viagemController.iniciarViagem);
router.post('/finalizar', authMiddleware, permissaoMiddleware(['motorista']), viagemController.finalizarViagem);
router.post('/registrar-presenca', authMiddleware, permissaoMiddleware(['motorista']), viagemController.registrarPresencaMotorista);
router.post('/confirmar-entrada', authMiddleware, permissaoMiddleware(['aluno']), viagemController.confirmarEntradaAluno);
router.post('/listar-ativas', authMiddleware, viagemController.listarViagensAtivas);

module.exports = router;
