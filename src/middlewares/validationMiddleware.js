const validarAluno = (req, res, next) => {
    const { nome, num_processo, endereco, telefone_aluno, telefone_encarregado, data_nascimento } = req.body;
    
    if (!nome || nome.trim().length < 3) {
        return res.status(400).json({ error: 'Nome deve ter pelo menos 3 caracteres.' });
    }
    
    if (!num_processo || num_processo.trim().length === 0) {
        return res.status(400).json({ error: 'Número do processo é obrigatório.' });
    }
    
    if (!telefone_aluno || !/^\d{9,15}$/.test(telefone_aluno.replace(/\D/g, ''))) {
        return res.status(400).json({ error: 'Telefone do aluno inválido.' });
    }
    
    if (!telefone_encarregado || !/^\d{9,15}$/.test(telefone_encarregado.replace(/\D/g, ''))) {
        return res.status(400).json({ error: 'Telefone do encarregado inválido.' });
    }
    
    if (!data_nascimento) {
        return res.status(400).json({ error: 'Data de nascimento é obrigatória.' });
    }
    
    const idade = new Date().getFullYear() - new Date(data_nascimento).getFullYear();
    if (idade < 3 || idade > 25) {
        return res.status(400).json({ error: 'Data de nascimento inválida para estudante.' });
    }
    
    next();
};

const validarMotorista = (req, res, next) => {
    const { nome, telefone, telefone_emergencia } = req.body;
    
    if (!nome || nome.trim().length < 3) {
        return res.status(400).json({ error: 'Nome deve ter pelo menos 3 caracteres.' });
    }
    
    if (!telefone || !/^\d{9,15}$/.test(telefone.replace(/\D/g, ''))) {
        return res.status(400).json({ error: 'Telefone inválido.' });
    }
    
    if (!telefone_emergencia || !/^\d{9,15}$/.test(telefone_emergencia.replace(/\D/g, ''))) {
        return res.status(400).json({ error: 'Telefone de emergência inválido.' });
    }
    
    next();
};

const validarVeiculo = (req, res, next) => {
    const { matricula, modelo, capacidade } = req.body;
    
    if (!matricula || matricula.trim().length === 0) {
        return res.status(400).json({ error: 'Matrícula é obrigatória.' });
    }
    
    if (!modelo || modelo.trim().length < 2) {
        return res.status(400).json({ error: 'Modelo deve ter pelo menos 2 caracteres.' });
    }
    
    if (!capacidade || capacidade < 1 || capacidade > 100) {
        return res.status(400).json({ error: 'Capacidade deve estar entre 1 e 100.' });
    }
    
    next();
};

const validarRota = (req, res, next) => {
    const { nome, horario_inicio, horario_fim, motorista_id, veiculo_id } = req.body;
    
    if (!nome || nome.trim().length < 3) {
        return res.status(400).json({ error: 'Nome da rota deve ter pelo menos 3 caracteres.' });
    }
    
    if (!horario_inicio || !horario_fim) {
        return res.status(400).json({ error: 'Horários são obrigatórios.' });
    }
    
    if (horario_inicio >= horario_fim) {
        return res.status(400).json({ error: 'Horário de início deve ser anterior ao de fim.' });
    }
    
    if (!motorista_id || !veiculo_id) {
        return res.status(400).json({ error: 'Motorista e veículo são obrigatórios.' });
    }
    
    next();
};

module.exports = {
    validarAluno,
    validarMotorista,
    validarVeiculo,
    validarRota
};
