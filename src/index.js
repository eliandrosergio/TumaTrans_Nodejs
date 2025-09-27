// index.js - Servidor principal com EJS e rotas

// Variáveis
const express = require('express');
const https = require('https'); // Para usar HTTPS (segurança extra)
const http = require('http'); // Para redirecionar HTTP -> HTTPS
const fs = require('fs'); // Para trabalhar com filesystems
const app = express();
const dotenv = require('dotenv');
const { sequelize } = require('./models');
const expressLayouts = require('express-ejs-layouts');

const PORT = process.env.PORT || 3000; // Porta para o HTTP
const PORTS = process.env.PORTS || 4000; // Porta para o HTTPS

// Carrega variáveis de ambiente
dotenv.config();

// Verifica se os arquivos de certificado existem antes de ler
const secureDir = './secure';
if (!fs.existsSync(secureDir)) {
    console.error('Pasta ./secure/ não existe! Crie-a e adicione os certificados.');
    process.exit(1);
}

const privateKeyPath = `${secureDir}/key.pem`; // caminho da chave SSL
const certificatePath = `${secureDir}/cert.pem`; // caminho do certificado SSL
if (!fs.existsSync(privateKeyPath) || !fs.existsSync(certificatePath)) {
    console.error(`Certificados não encontrados em ${secureDir}. Gere-os com OpenSSL.`);
    process.exit(1);
}

// Caminhos para os arquivos do certificado SSL
const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
const certificate = fs.readFileSync(certificatePath, 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Configura o servidor HTTPS
const httpsServer = https.createServer(credentials, app);

// Configurações
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Pasta para CSS, JS estático
app.use(expressLayouts);

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

app.use('/api/auth', authRoutes);
app.use('/api/alunos', alunoRoutes);
app.use('/api/motoristas', motoristaRoutes);
app.use('/api/rotas', rotaRoutes);
app.use('/api/veiculos', veiculoRoutes);
app.use('/nav', navRoutes);

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

// Servidor HTTP para redirecionar para HTTPS
http.createServer((req, res) => {
    res.writeHead(301, { Location: `https://localhost:${PORTS}${req.url}` });
    res.end();
}).listen(PORT, () => {
    console.log('Redirecionamento HTTP na porta 80');
});

// Inicia servidor HTTPS
httpsServer.listen(PORTS, () => {
    console.log(`Servidor HTTPS rodando na porta ${PORTS}. Acesse https://localhost:${PORT}`);
});
