// middlewares/permissaoMiddleware.js - Permissões de níveis de usuários

const permissaoMiddleware = (niveisPermitidos) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Não autenticado.' });
        }

        if (!niveisPermitidos.includes(req.user.nivel)) {
            return res.status(403).json({ error: 'Sem permissão para esta ação.' });
        }

        next();
    };
};

const podeEditar = (req, res, next) => {
    const nivel = req.user.nivel;
    
    if (nivel === 'admin' || nivel === 'gerente') {
        return next();
    }
    
    return res.status(403).json({ error: 'Sem permissão para editar.' });
};

const podeAdicionar = (req, res, next) => {
    const nivel = req.user.nivel;
    
    if (nivel === 'admin' || nivel === 'gerente') {
        return next();
    }
    
    return res.status(403).json({ error: 'Sem permissão para adicionar.' });
};

const podeDeletar = (req, res, next) => {
    const nivel = req.user.nivel;
    
    if (nivel === 'admin' || nivel === 'gerente') {
        return next();
    }
    
    return res.status(403).json({ error: 'Sem permissão para deletar.' });
};

module.exports = {
    permissaoMiddleware,
    podeEditar,
    podeAdicionar,
    podeDeletar
};
