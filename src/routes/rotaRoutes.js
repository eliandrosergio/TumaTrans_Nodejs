// routes/rotaRoutes.js - Rotas para rotas (que coisa né)

const express = require('express');
const router = express.Router();
const rotaController = require('../controllers/rotaController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, rotaController.create);
router.get('/', authMiddleware, rotaController.list);

module.exports = router;
