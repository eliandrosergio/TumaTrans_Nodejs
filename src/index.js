// index.js - Servidor principal com EJS e rotas

// Variáveis de libs locais
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const { sequelize } = require('./models');
const cookieParser = require('cookie-parser'); // Para ler cookies
const expressLayouts = require('express-ejs-layouts');

// Variáveis de arquivos locais
const logAction = require('./middlewares/logMiddleware');
const { agendarBackup } = require('./utils/backup');

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
const relatorioRoutes = require('./routes/relatorioRoutes');
const motoristaRoutes = require('./routes/motoristaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const veiculoRoutes = require('./routes/veiculoRoutes');
const viagemRoutes = require('./routes/viagemRoutes');
const alunoRoutes = require('./routes/alunoRoutes');
const authRoutes = require('./routes/authRoutes');
const rotaRoutes = require('./routes/rotaRoutes');
const navRoutes = require('./routes/navRoutes');

app.use('/api/motoristas', motoristaRoutes);
app.use('/api/relatorios', relatorioRoutes);
app.use('/api/veiculos', veiculoRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/viagens', viagemRoutes);
app.use('/api/alunos', alunoRoutes);
app.use('/api/rotas', rotaRoutes);
app.use('/api/auth', authRoutes);
app.use('', navRoutes);
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

// Aciona o Sistema de Backup Automático do BD:
agendarBackup();
console.log('Sistema de backup automático ativado.');

// Inicia servidor HTTPS
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}. Acesse https://localhost:${PORT}`);
});
