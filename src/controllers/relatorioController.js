const { Aluno, Motorista, Rota, Veiculo } = require('../models');
const { Op } = require('sequelize');

// Dashboard com estatísticas
exports.dashboard = async (req, res) => {
    try {
        const totalAlunos = await Aluno.count();
        const totalMotoristas = await Motorista.count();
        const totalVeiculos = await Veiculo.count();
        const totalRotas = await Rota.count();
        
        res.json({
            totalAlunos,
            totalMotoristas,
            totalVeiculos,
            totalRotas
        });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar estatísticas.' });
    }
};

// Próximos horários
exports.proximosHorarios = async (req, res) => {
    try {
        const agora = new Date();
        const horaAtual = agora.toTimeString().slice(0, 5);
        
        const rotas = await Rota.findAll({
            where: {
                horario_inicio: {
                    [Op.gte]: horaAtual
                }
            },
            include: [
                { model: Motorista, as: 'motorista' },
                { model: Veiculo, as: 'veiculo' }
            ],
            order: [['horario_inicio', 'ASC']],
            limit: 3
        });
        
        res.json(rotas);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar próximos horários.' });
    }
};

// Relatório de alunos por rota
exports.alunosPorRota = async (req, res) => {
    try {
        const rotas = await Rota.findAll({
            include: [
                {
                    model: Aluno,
                    as: 'alunos'
                },
                {
                    model: Motorista,
                    as: 'motorista'
                },
                {
                    model: Veiculo,
                    as: 'veiculo'
                }
            ]
        });
        
        res.json(rotas);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao gerar relatório.' });
    }
};
