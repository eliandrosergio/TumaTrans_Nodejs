// routes/motoristaRoutes.js - Rotas para motoristas

const express = require('express');
const router = express.Router();
const motoristaController = require('../controllers/motoristaController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/list', authMiddleware, motoristaController.list);
router.get('/ver', authMiddleware, motoristaController.formList);
router.post('/create', authMiddleware, motoristaController.create);
router.get('/cadastro', authMiddleware, motoristaController.formCreate);

module.exports = router;
