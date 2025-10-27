// controllers/navController.js - Controles de navegação

// Secção do login, logout e redefinição de senha
exports.login = async (req, res) => {
    res.render('navViews/login', { title: 'Login' });
};

exports.logout = async (req, res) => {
    res.render('navViews/logout', { title: 'Logout' }); // Redireciona para login
};

exports.redefinir_senha = async (req, res) => {
    res.render('navViews/redefinir_senha', { title: 'Redefinir Senha' });
};

exports.painelControl = async (req, res) => {
    res.render('navViews/painel_control', { title: 'Centro de Controle' });
};
