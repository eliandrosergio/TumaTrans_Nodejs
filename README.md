# 🚌 Sistema de Gestão de Transporte Escolar

[![Versão](https://img.shields.io/badge/versão-1.4.0-blue.svg)](https://github.com/eliandrosergio/gestao-transporte-escolar)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Licença](https://img.shields.io/badge/licença-MIT-orange.svg)](LICENSE)
[![Express](https://img.shields.io/badge/Express-5.1.0-yellow.svg)](https://expressjs.com/)

> Sistema completo para gestão de transporte escolar do **Complexo Escolar Privado Beira Alta II**, desenvolvido em Node.js com interface web moderna e segura.

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Uso](#-uso)
- [API Endpoints](#-api-endpoints)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Modelos de Dados](#-modelos-de-dados)
- [Segurança](#-segurança)
- [Screenshots](#-screenshots)
- [Contribuição](#-contribuição)
- [Licença](#-licença)
- [Autor](#-autor)

## 🎯 Sobre o Projeto

O Sistema de Gestão de Transporte Escolar é uma aplicação web full-stack projetada para facilitar o controle e organização do transporte de estudantes. O sistema oferece funcionalidades completas de CRUD (Create, Read, Update, Delete) para alunos, motoristas, veículos e rotas, com interface moderna e segura.

### ✨ Características Principais

- 🔐 **Autenticação JWT** com criptografia bcrypt
- 🌐 **Servidor HTTPS** com certificados SSL personalizados
- 📱 **Interface Responsiva** com Bootstrap 5
- 🗄️ **Banco SQLite** portátil com Sequelize ORM
- 🎨 **Templates EJS** com sistema de layouts
- 🔄 **Hot Reload** com Nodemon para desenvolvimento

## 🚀 Funcionalidades

### 👨‍🎓 Gestão de Alunos
- ✅ Cadastro de novos alunos
- 📋 Listagem de alunos cadastrados
- 📝 Dados: nome, processo, endereço, telefones, data de nascimento
- 🔍 Visualização detalhada

### 🚗 Gestão de Motoristas
- ✅ Cadastro de motoristas
- 📋 Listagem com informações de contato
- 📞 Telefone principal e de emergência
- 🏠 Controle de endereços

### 🚐 Gestão de Veículos
- ✅ Registro de veículos
- 🚌 Controle de capacidade
- 🆔 Gestão de matrículas
- 📊 Modelos e especificações

### 🗺️ Gestão de Rotas
- ✅ Criação de rotas
- ⏰ Horários de início e fim
- 📍 Pontos de parada
- 🔗 Associação com motoristas e veículos

### 🔐 Sistema de Autenticação
- 👤 Login/logout seguro
- 🔑 Redefinição de senha
- 🛡️ Middleware de autorização
- 🏠 Painéis baseados em permissões

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** v5.1.0 - Framework web
- **Sequelize** v6.37.7 - ORM para banco de dados
- **SQLite** v5.1.7 - Banco de dados embarcado

### Frontend
- **EJS** v3.1.10 - Template engine
- **Bootstrap** v5.3.8 - Framework CSS
- **JavaScript ES6+** - Interações do cliente
- **Express-EJS-Layouts** v2.5.1 - Sistema de layouts

### Segurança
- **JSON Web Token** v9.0.2 - Autenticação
- **bcryptjs** v3.0.2 - Criptografia de senhas
- **HTTPS** v1.0.0 - Comunicação segura

### Ferramentas de Desenvolvimento
- **Nodemon** v3.1.10 - Auto-restart
- **dotenv** v17.2.2 - Variáveis de ambiente
- **Sequelize CLI** v6.6.3 - Migrations e seeds

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Node.js** (versão 16 ou superior)
- **npm** ou **yarn**
- **Git**

## 🚀 Instalação

### 1. Clone o repositório
```bash
git clone https://github.com/eliandrosergio/gestao-transporte-escolar.git
cd gestao-transporte-escolar/src
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

Edite o arquivo `.env`:
```env
PORT=3000
PORTS=4000
JWT_SECRET=seu_jwt_secret_muito_seguro_aqui
NODE_ENV=development
```

### 4. Gere certificados SSL
```bash
mkdir secure
# Gere certificados auto-assinados (apenas para desenvolvimento)
openssl req -x509 -newkey rsa:4096 -keyout secure/key.pem -out secure/cert.pem -days 1460 -nodes
```

### 5. Configure o banco de dados
```bash
# O banco SQLite será criado automaticamente
# Executar migrations (se houver)
npx sequelize-cli db:migrate
```

## ⚙️ Configuração

### Estrutura de Certificados SSL
O projeto requer certificados SSL na pasta `src/secure/`:
- `key.pem` - Chave privada
- `cert.pem` - Certificado público

### Banco de Dados
O arquivo `db.sqlite` será criado automaticamente na raiz do projeto na primeira execução.

## 🎯 Uso

### Desenvolvimento
```bash
npm run dev
```
Servidor rodará em:
- HTTP: `http://localhost:3000` (redireciona para HTTPS)
- HTTPS: `https://localhost:4000`

### Produção
```bash
npm start
```

### Primeiro Acesso
1. Acesse `https://localhost:4000`
2. Aceite o certificado auto-assinado (apenas desenvolvimento)
3. Faça login ou registre um novo usuário
4. Acesse o painel de controle

## 🔌 API Endpoints

### Autenticação
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Fazer login
- `POST /api/auth/reset-password` - Redefinir senha

### Alunos
- `GET /api/alunos/cadastro` - Formulário de cadastro
- `POST /api/alunos/create` - Criar aluno
- `GET /api/alunos/ver` - Formulário de listagem
- `POST /api/alunos/list` - Listar alunos

### Motoristas
- `GET /api/motoristas/cadastro` - Formulário de cadastro
- `POST /api/motoristas/create` - Criar motorista
- `GET /api/motoristas/ver` - Formulário de listagem
- `POST /api/motoristas/list` - Listar motoristas

### Veículos
- `GET /api/veiculos/cadastro` - Formulário de cadastro
- `POST /api/veiculos/create` - Criar veículo
- `GET /api/veiculos/ver` - Formulário de listagem
- `POST /api/veiculos/list` - Listar veículos

### Rotas
- `POST /api/rotas/` - Criar rota
- `GET /api/rotas/` - Listar rotas

### Navegação
- `GET /nav/login` - Página de login
- `GET /nav/logout` - Logout
- `GET /nav/home` - Home público
- `GET /nav/homeControl` - Painel de controle (autenticado)
- `GET /nav/redefinir_senha` - Redefinir senha

## 📁 Estrutura do Projeto

```
src/
├── config/
│   └── database.js          # Configuração do Sequelize
├── controllers/
│   ├── alunoController.js   # Controlador de alunos
│   ├── authController.js    # Controlador de autenticação
│   ├── motoristaController.js
│   ├── navController.js     # Controlador de navegação
│   ├── rotaController.js
│   └── veiculoController.js
├── middlewares/
│   └── authMiddleware.js    # Middleware JWT
├── models/
│   ├── Aluno.js            # Modelo de dados do aluno
│   ├── Motorista.js
│   ├── Rota.js
│   ├── Usuario.js
│   ├── Veiculo.js
│   └── index.js            # Índice dos modelos
├── routes/
│   ├── alunoRoutes.js      # Rotas dos alunos
│   ├── authRoutes.js
│   ├── motoristaRoutes.js
│   ├── navRoutes.js
│   ├── rotaRoutes.js
│   └── veiculoRoutes.js
├── secure/
│   ├── cert.pem           # Certificado SSL
│   └── key.pem           # Chave privada SSL
├── views/
│   ├── alunoViews/       # Templates de alunos
│   ├── layouts/          # Layouts principais
│   ├── motoristaViews/   # Templates de motoristas
│   ├── navViews/         # Templates de navegação
│   ├── veiculoViews/     # Templates de veículos
│   └── home.ejs          # Página inicial
├── index.js              # Servidor principal
├── package.json          # Dependências e scripts
└── .gitignore           # Arquivos ignorados
```

## 🗄️ Modelos de Dados

### Aluno
```javascript
{
  id: INTEGER (PK),
  nome: STRING,
  num_processo: STRING (UNIQUE),
  endereco: STRING,
  telefone_aluno: STRING,
  telefone_encarregado: STRING,
  data_nascimento: DATEONLY,
  timestamps: true
}
```

### Motorista
```javascript
{
  id: INTEGER (PK),
  nome: STRING,
  endereco: STRING,
  telefone: STRING,
  telefone_emergencia: STRING,
  timestamps: true
}
```

### Veículo
```javascript
{
  id: INTEGER (PK),
  matricula: STRING (UNIQUE),
  modelo: STRING,
  capacidade: INTEGER,
  timestamps: true
}
```

### Rota
```javascript
{
  id: INTEGER (PK),
  nome: STRING,
  descricao: STRING,
  horario_inicio: TIME,
  horario_fim: TIME,
  pontos_parada: TEXT,
  timestamps: true,
  // Associações
  MotoristaId: INTEGER (FK),
  VeiculoId: INTEGER (FK)
}
```

### Usuário
```javascript
{
  id: INTEGER (PK),
  username: STRING (UNIQUE),
  email: STRING (UNIQUE),
  password: STRING (HASHED),
  nivel: STRING,
  timestamps: true
}
```

## 🔒 Segurança

### Características de Segurança Implementadas
- **Criptografia de Senhas**: Bcrypt com salt rounds
- **JWT Tokens**: Autenticação stateless com expiração
- **HTTPS Obrigatório**: Certificados SSL customizados
- **Validação de Entrada**: Sanitização de dados
- **Middleware de Autorização**: Proteção de rotas sensíveis

### Middleware de Autenticação
Todas as rotas protegidas passam pelo middleware que:
1. Verifica presença do token JWT
2. Valida assinatura do token
3. Decodifica informações do usuário
4. Adiciona `req.user` para uso nos controladores

## 📸 Screenshots

### Tela de Login
Interface moderna com validação em tempo real e toggle de visualização de senha.

### Painel de Controle
Dashboard centralizado com acesso rápido a todas as funcionalidades do sistema.

### Listagem de Alunos