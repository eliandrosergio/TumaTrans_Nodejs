const { Log } = require('../models');

const logAction = (acao, tabela) => {
    return async (req, res, next) => {
        const originalJson = res.json;
        
        res.json = async function(data) {
            if (res.statusCode === 200 || res.statusCode === 201) {
                try {
                    await Log.create({
                        usuario_id: req.user?.id || null,
                        acao,
                        tabela,
                        registro_id: data.aluno?.id || data.motorista?.id || data.veiculo?.id || data.rota?.id || req.params.id || null,
                        dados_novos: JSON.stringify(req.body),
                        ip: req.ip || req.connection.remoteAddress,
                    });
                } catch (err) {
                    console.error('Erro ao criar log:', err);
                }
            }
            originalJson.call(this, data);
        };
        next();
    };
};

module.exports = logAction;
