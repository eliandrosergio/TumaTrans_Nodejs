// index.js - Servidor principal com EJS e rotas

// Variáveis
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const { sequelize } = require('./models');
const cookieParser = require('cookie-parser'); // Para ler cookies
const expressLayouts = require('express-ejs-layouts');

// Carrega variáveis de ambiente
dotenv.config();

// Porta para o servidor
const PORT = process.env.PORT || 3000;

// Configurações
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Pasta para CSS, JS estático
app.use(expressLayouts);

// Depois das linhas existentes de app.use(), adicione:
app.use(cookieParser());

// Configura EJS
app.set('view engine', 'ejs');
app.set('views', './views'); // Pasta para templates
app.set('layout', 'layouts/main'); // Layout padrão

// Rotas (já existentes)
const authRoutes = require('./routes/authRoutes');
const alunoRoutes = require('./routes/alunoRoutes');
const motoristaRoutes = require('./routes/motoristaRoutes');
const rotaRoutes = require('./routes/rotaRoutes');
const veiculoRoutes = require('./routes/veiculoRoutes');
const navRoutes = require('./routes/navRoutes');
const relatorioRoutes = require('./routes/relatorioRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/alunos', alunoRoutes);
app.use('/api/motoristas', motoristaRoutes);
app.use('/api/rotas', rotaRoutes);
app.use('/api/veiculos', veiculoRoutes);
app.use('/nav', navRoutes);
app.use('/api/relatorios', relatorioRoutes);

// Rota inicial
app.get('/', (req, res) => {
    res.render('home', { title: 'Gestão de Transporte Escolar' });
});

// Sincroniza o BD
sequelize.sync({ force: false }) // Use force: true só se quiser recriar
    .then(() => {
        console.log('Banco de dados sincronizado com sucesso.');
    })
    .catch(err => {
        console.error('Erro ao sincronizar BD:', err);
    });

// Inicia servidor HTTPS
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}. Acesse https://localhost:${PORT}`);
});
