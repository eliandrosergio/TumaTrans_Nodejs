// routes/veiculoRoutes.js - Rotas para veículos

const express = require('express');
const router = express.Router();
const veiculoController = require('../controllers/veiculoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/list', authMiddleware, veiculoController.list);
router.get('/ver', authMiddleware, veiculoController.formList);
router.post('/create', authMiddleware, veiculoController.create);
router.get('/cadastro', authMiddleware, veiculoController.formCreate);
router.get('/:id', authMiddleware, veiculoController.findById);
router.put('/:id', authMiddleware, veiculoController.update);
router.delete('/:id', authMiddleware, veiculoController.delete);

module.exports = router;
