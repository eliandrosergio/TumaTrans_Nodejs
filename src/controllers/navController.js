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

// Secção de controle do Home
exports.home = async (req, res) => {
    res.render('navViews/home_logout', { title: 'Gestão de Transporte Escolar' });
};

exports.homeControl = async (req, res) => {
    res.render('navViews/painel_control', { title: 'Centro de Controle' });
};
