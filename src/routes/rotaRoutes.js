// routes/rotaRoutes.js - Rotas para rotas (que coisa né)

const express = require('express');
const router = express.Router();
const rotaController = require('../controllers/rotaController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, rotaController.create);
router.get('/', authMiddleware, rotaController.list);
router.get('/ver', authMiddleware, rotaController.formList);
router.get('/cadastro', authMiddleware, rotaController.formCreate);
router.get('/:id', authMiddleware, rotaController.findById);
router.put('/:id', authMiddleware, rotaController.update);
router.delete('/:id', authMiddleware, rotaController.delete);

module.exports = router;
