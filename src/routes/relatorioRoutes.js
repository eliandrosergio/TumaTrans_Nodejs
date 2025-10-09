const express = require('express');
const router = express.Router();
const relatorioController = require('../controllers/relatorioController');
const authMiddleware = require('../middlewares/authMiddleware');

// Dashboard - estatísticas gerais
router.get('/dashboard', authMiddleware, relatorioController.dashboard);

// Próximos horários
router.get('/proximos-horarios', authMiddleware, relatorioController.proximosHorarios);

// Relatório de alunos por rota
router.get('/alunos-por-rota', authMiddleware, relatorioController.alunosPorRota);

// Logs de atividades
router.get('/logs', authMiddleware, relatorioController.logs);

// Views dos relatórios
router.get('/ver', authMiddleware, (req, res) => {
    res.render('relatorioViews/ver_relatorios', { title: 'Relatórios' });
});

router.get('/alunos-rota', authMiddleware, (req, res) => {
    res.render('relatorioViews/alunos_por_rota', { title: 'Alunos por Rota' });
});

// Relatório de viagens - NOVAS ROTAS
router.get('/viagens', authMiddleware, relatorioController.formRelatorioViagens);
router.get('/viagens-data', authMiddleware, relatorioController.relatorioViagens);

module.exports = router;
