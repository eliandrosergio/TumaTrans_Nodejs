const { Viagem, PresencaAluno, Aluno, Rota, Motorista } = require('../models');
const { Op } = require('sequelize');

// Motorista: Iniciar viagem
exports.iniciarViagem = async (req, res) => {
    try {
        const { rota_id } = req.body;
        const motorista_id = req.user.vinculo_id;
        const hoje = new Date().toISOString().split('T')[0];
        
        // Verifica se já existe viagem hoje para esta rota
        const viagemExistente = await Viagem.findOne({
            where: {
                rota_id,
                motorista_id,
                data_viagem: hoje,
                status: { [Op.in]: ['pendente', 'em_andamento'] }
            }
        });
        
        if (viagemExistente) {
            return res.status(400).json({ error: 'Já existe uma viagem ativa para esta rota hoje.' });
        }
        
        const viagem = await Viagem.create({
            rota_id,
            motorista_id,
            data_viagem: hoje,
            horario_inicio: new Date().toTimeString().split(' ')[0],
            status: 'em_andamento'
        });
        
        res.status(201).json({ message: 'Viagem iniciada com sucesso.', viagem });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao iniciar viagem.' });
    }
};

// Motorista: Finalizar viagem
exports.finalizarViagem = async (req, res) => {
    try {
        const { viagem_id } = req.body;
        
        const viagem = await Viagem.findByPk(viagem_id);
        if (!viagem) {
            return res.status(404).json({ error: 'Viagem não encontrada.' });
        }
        
        await viagem.update({
            horario_fim: new Date().toTimeString().split(' ')[0],
            status: 'finalizada'
        });
        
        res.json({ message: 'Viagem finalizada com sucesso.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao finalizar viagem.' });
    }
};

// Motorista: Registrar presença do aluno
exports.registrarPresencaMotorista = async (req, res) => {
    try {
        const { viagem_id, aluno_id, paragem } = req.body;
        
        const presenca = await PresencaAluno.create({
            viagem_id,
            aluno_id,
            paragem,
            horario_entrada: new Date().toTimeString().split(' ')[0],
            confirmado_motorista: true
        });
        
        res.status(201).json({ message: 'Presença registrada.', presenca });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao registrar presença.' });
    }
};

// Aluno: Confirmar entrada no veículo
exports.confirmarEntradaAluno = async (req, res) => {
    try {
        const aluno_id = req.user.vinculo_id;
        const { viagem_id, paragem } = req.body;
        
        // Busca presença já registrada pelo motorista
        let presenca = await PresencaAluno.findOne({
            where: { viagem_id, aluno_id }
        });
        
        if (presenca) {
            // Atualiza confirmação do aluno
            await presenca.update({ confirmado_aluno: true });
        } else {
            // Cria novo registro se motorista ainda não registrou
            presenca = await PresencaAluno.create({
                viagem_id,
                aluno_id,
                paragem,
                horario_entrada: new Date().toTimeString().split(' ')[0],
                confirmado_aluno: true
            });
        }
        
        res.json({ message: 'Entrada confirmada com sucesso.', presenca });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao confirmar entrada.' });
    }
};

// Listar viagens ativas (motorista vê suas viagens)
exports.listarViagensAtivas = async (req, res) => {
    try {
        const nivel = req.user.nivel;
        const vinculoId = req.user.vinculo_id;
        let viagens;
        
        if (nivel === 'motorista') {
            viagens = await Viagem.findAll({
                where: {
                    motorista_id: vinculoId,
                    status: { [Op.in]: ['pendente', 'em_andamento'] }
                },
                include: [
                    { model: Rota, as: 'rota' }
                ]
            });
        } else if (nivel === 'aluno') {
            const aluno = await Aluno.findByPk(vinculoId);
            if (aluno && aluno.rota_id) {
                viagens = await Viagem.findAll({
                    where: {
                        rota_id: aluno.rota_id,
                        status: 'em_andamento'
                    },
                    include: [
                        { model: Rota, as: 'rota' },
                        { model: Motorista, as: 'motorista' }
                    ]
                });
            }
        }
        
        res.json(viagens || []);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao listar viagens.' });
    }
};

// Relatório de viagens (admin/gerente)
exports.relatorioViagens = async (req, res) => {
    try {
        const { data_inicio, data_fim } = req.query;
        
        const where = {};
        if (data_inicio && data_fim) {
            where.data_viagem = {
                [Op.between]: [data_inicio, data_fim]
            };
        }
        
        const viagens = await Viagem.findAll({
            where,
            include: [
                { model: Rota, as: 'rota' },
                { model: Motorista, as: 'motorista' },
                {
                    model: PresencaAluno,
                    as: 'presencas',
                    include: [{ model: Aluno, as: 'aluno' }]
                }
            ],
            order: [['data_viagem', 'DESC'], ['horario_inicio', 'DESC']]
        });
        
        res.json(viagens);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao gerar relatório.' });
    }
};

// Formulário para motorista ver suas viagens
exports.formViagensMotorista = (req, res) => {
    res.render('viagemViews/motorista_viagens', { title: 'Minhas Viagens' });
};

// Formulário para aluno confirmar presença
exports.formViagensAluno = (req, res) => {
    res.render('viagemViews/aluno_confirmar', { title: 'Confirmar Presença' });
};

// Verificar se aluno já confirmou presença
exports.verificarPresencaAluno = async (req, res) => {
    try {
        const aluno_id = req.user.vinculo_id;
        const { viagem_id } = req.query;
        
        const presenca = await PresencaAluno.findOne({
            where: { viagem_id, aluno_id }
        });
        
        if (presenca) {
            res.json({
                existe: true,
                confirmado_motorista: presenca.confirmado_motorista,
                confirmado_aluno: presenca.confirmado_aluno,
                horario_entrada: presenca.horario_entrada
            });
        } else {
            res.json({ existe: false });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao verificar presença.' });
    }
};

// Buscar presenças de uma viagem (para motorista ver confirmações)
exports.buscarPresencasViagem = async (req, res) => {
    try {
        const { viagem_id } = req.query;
        
        const presencas = await PresencaAluno.findAll({
            where: { viagem_id },
            include: [{ model: Aluno, as: 'aluno', attributes: ['id', 'nome'] }]
        });
        
        res.json(presencas);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar presenças.' });
    }
};
