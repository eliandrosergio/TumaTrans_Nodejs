# Sistema de Gestão de Transporte Escolar
## TumaTrans

---

## 1. APRESENTAÇÃO DO PROJETO

### 1.1 Visão Geral

O **Sistema de Gestão de Transporte Escolar** é uma aplicação web completa desenvolvida para modernizar e otimizar a gestão do transporte de estudantes do TumaTrans. O sistema foi projetado para atender às necessidades de diferentes tipos de usuários: administradores, gerentes, motoristas e alunos.

### 1.2 Objetivo Principal

Criar uma plataforma digital centralizada que permita:
- Controlar e monitorizar rotas de transporte escolar
- Gerenciar cadastros de alunos, motoristas e veículos
- Registrar presenças em tempo real
- Gerar relatórios gerenciais
- Facilitar a comunicação entre todos os envolvidos no transporte escolar

### 1.3 Problemas Resolvidos

O sistema resolve diversos desafios enfrentados pela instituição:

1. **Controle de Presenças**: Antes feito manualmente em papel, agora é digital e em tempo real
2. **Gestão de Rotas**: Organização clara de horários, paragens e alunos por rota
3. **Comunicação**: Motoristas e alunos podem confirmar presenças digitalmente
4. **Relatórios**: Geração automática de estatísticas e históricos de viagens
5. **Segurança**: Sistema de autenticação com diferentes níveis de acesso

### 1.4 Benefícios Imediatos

- ✅ **Redução de custos** com papel e processos manuais
- ✅ **Maior segurança** no controle de entrada/saída de alunos
- ✅ **Transparência** para pais e responsáveis
- ✅ **Eficiência operacional** para a administração
- ✅ **Relatórios instantâneos** para tomada de decisões

---

## 2. LINGUAGENS DE PROGRAMAÇÃO UTILIZADAS

### 2.1 JavaScript (Node.js)

**Função no Projeto**: Linguagem principal do backend (servidor)

**O que é**: JavaScript é uma linguagem de programação versátil e moderna. No backend, utilizamos Node.js, que permite executar JavaScript no servidor.

**Onde é usado no projeto**:
- Toda a lógica de negócio (processamento de dados)
- Comunicação com a base de dados
- Autenticação e segurança
- APIs (rotas que fornecem dados)

**Arquivos principais**:
- `src/index.js` - Arquivo principal do servidor
- `src/controllers/*` - Lógica de cada módulo
- `src/routes/*` - Definição de rotas
- `src/models/*` - Estrutura dos dados

**Exemplo de uso no projeto**:
```javascript
// Cadastrar um aluno
exports.create = async (req, res) => {
    try {
        const aluno = await Aluno.create(req.body);
        res.status(201).json({ message: 'Aluno cadastrado com sucesso.' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao cadastrar aluno.' });
    }
};
```

### 2.2 JavaScript (Frontend)

**Função no Projeto**: Linguagem do lado do cliente (navegador)

**Onde é usado**:
- Interações dinâmicas nas páginas
- Validação de formulários
- Chamadas às APIs
- Atualização de conteúdo sem recarregar a página

**Exemplo no projeto**:
```javascript
// Carregar lista de alunos dinamicamente
async function carregarAlunos() {
    const response = await fetch('/api/alunos/list', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const alunos = await response.json();
    // Exibir na tabela...
}
```

### 2.3 HTML (HyperText Markup Language)

**Função no Projeto**: Estrutura das páginas web

**O que é**: Linguagem de marcação que define a estrutura e conteúdo das páginas.

**Onde é usado**:
- Estrutura de todas as páginas (formulários, tabelas, botões)
- Templates EJS (arquivos `.ejs` que geram HTML dinâmico)

**Exemplo no projeto**:
```html
<div class="card">
    <div class="card-body">
        <h2>Cadastrar Aluno</h2>
        <form id="alunoForm">
            <input type="text" id="nome" required>
            <button type="submit">Cadastrar</button>
        </form>
    </div>
</div>
```

### 2.4 CSS (Cascading Style Sheets)

**Função no Projeto**: Estilização visual das páginas

**O que é**: Linguagem de estilos que define cores, tamanhos, posicionamentos e animações.

**Onde é usado**:
- Design visual de toda a aplicação
- Responsividade (adaptação a diferentes dispositivos)
- Utilizamos **Bootstrap 5** (framework CSS) para acelerar o desenvolvimento

**Exemplo no projeto**:
```css
.card {
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    margin-bottom: 20px;
}
```

### 2.5 SQL (Structured Query Language)

**Função no Projeto**: Linguagem de consulta à base de dados

**O que é**: Linguagem para criar, ler, atualizar e deletar dados no banco de dados.

**Onde é usado**:
- Gerenciado automaticamente pelo **Sequelize ORM**
- Criação de tabelas, consultas e relacionamentos

**Exemplo (gerado pelo Sequelize)**:
```sql
SELECT * FROM alunos WHERE rota_id = 1;
INSERT INTO viagens (rota_id, data_viagem) VALUES (1, '2025-10-15');
```

---

## 3. TECNOLOGIAS E FRAMEWORKS

### 3.1 Backend (Servidor)

#### 3.1.1 Node.js v18+
- **Tipo**: Ambiente de execução JavaScript
- **Função**: Executar o código do servidor
- **Por que foi escolhido**: Rápido, eficiente e com grande comunidade

#### 3.1.2 Express.js v5.1.0
- **Tipo**: Framework web
- **Função**: Criar APIs e gerenciar rotas
- **Por que foi escolhido**: Simples, flexível e muito usado

#### 3.1.3 Sequelize v6.37.7
- **Tipo**: ORM (Object-Relational Mapping)
- **Função**: Facilitar comunicação com o banco de dados
- **Vantagens**: 
  - Escreve SQL automaticamente
  - Valida dados antes de salvar
  - Gerencia relacionamentos entre tabelas

#### 3.1.4 SQLite v5.1.7
- **Tipo**: Banco de dados
- **Função**: Armazenar todos os dados do sistema
- **Por que foi escolhido**: 
  - Leve e portátil (arquivo único)
  - Não precisa de servidor separado
  - Ideal para projetos de pequeno/médio porte

#### 3.1.5 JWT (JSON Web Tokens)
- **Biblioteca**: jsonwebtoken v9.0.2
- **Função**: Autenticação e segurança
- **Como funciona**: Gera "tokens" únicos para cada usuário logado

#### 3.1.6 Bcrypt.js v3.0.2
- **Função**: Criptografia de senhas
- **Como funciona**: Transforma senhas em códigos irreversíveis

### 3.2 Frontend (Cliente)

#### 3.2.1 EJS (Embedded JavaScript) v3.1.10
- **Tipo**: Template engine
- **Função**: Gerar HTML dinâmico no servidor
- **Exemplo**:
```ejs
<h2>Bem-vindo, <%= usuario.nome %></h2>
```

#### 3.2.2 Bootstrap v5.3.8
- **Tipo**: Framework CSS
- **Função**: Design responsivo e componentes prontos
- **Recursos usados**:
  - Sistema de grid responsivo
  - Botões, cards, modais
  - Ícones (Bootstrap Icons)

#### 3.2.3 Bootstrap Icons
- **Função**: Ícones vetoriais para interface
- **Exemplos usados**: 
  - `bi-bus-front` (ícone de ônibus)
  - `bi-person` (ícone de pessoa)
  - `bi-check-circle` (ícone de confirmação)

### 3.3 Ferramentas de Desenvolvimento

#### 3.3.1 Nodemon v3.1.10
- **Função**: Reiniciar servidor automaticamente ao modificar código
- **Uso**: Apenas em desenvolvimento

#### 3.3.2 Dotenv v17.2.2
- **Função**: Gerenciar variáveis de ambiente
- **Exemplo**: Armazenar chave secreta do JWT

#### 3.3.3 Cookie-parser v1.4.7
- **Função**: Ler e manipular cookies do navegador
- **Uso**: Manter usuário logado

### 3.4 Arquitetura do Sistema

#### Padrão MVC (Model-View-Controller)

```
┌─────────────────────────────────────────┐
│           CLIENTE (Navegador)           │
│  - HTML/CSS/JavaScript                  │
│  - Bootstrap para design                │
└─────────────┬───────────────────────────┘
              │ HTTP Requests
              ▼
┌─────────────────────────────────────────┐
│      SERVIDOR (Node.js + Express)       │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │    ROTAS (routes/)              │   │
│  │  - Recebe requisições           │   │
│  └───────────┬─────────────────────┘   │
│              │                          │
│  ┌───────────▼─────────────────────┐   │
│  │  CONTROLLERS (controllers/)     │   │
│  │  - Lógica de negócio            │   │
│  └───────────┬─────────────────────┘   │
│              │                          │
│  ┌───────────▼─────────────────────┐   │
│  │    MODELS (models/)             │   │
│  │  - Estrutura dos dados          │   │
│  └───────────┬─────────────────────┘   │
└──────────────┼─────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│     BANCO DE DADOS (SQLite)             │
│  - Armazena: alunos, rotas, viagens     │
└─────────────────────────────────────────┘
```

---

## 4. SOBRE O PROJETO

### 4.1 Estrutura de Pastas

```
src/
├── config/
│   └── database.js          # Configuração do banco de dados
├── controllers/             # Lógica de negócio
│   ├── alunoController.js
│   ├── motoristaController.js
│   ├── rotaController.js
│   ├── veiculoController.js
│   ├── viagemController.js
│   ├── usuarioController.js
│   └── authController.js
├── models/                  # Estrutura das tabelas
│   ├── Aluno.js
│   ├── Motorista.js
│   ├── Rota.js
│   ├── Veiculo.js
│   ├── Viagem.js
│   ├── PresencaAluno.js
│   ├── Usuario.js
│   └── Log.js
├── routes/                  # Definição de rotas
│   ├── alunoRoutes.js
│   ├── motoristaRoutes.js
│   ├── rotaRoutes.js
│   └── ...
├── middlewares/             # Filtros de segurança
│   ├── authMiddleware.js
│   ├── permissaoMiddleware.js
│   └── validationMiddleware.js
├── views/                   # Páginas EJS
│   ├── alunoViews/
│   ├── motoristaViews/
│   ├── rotaViews/
│   └── ...
├── utils/                   # Utilidades
│   └── backup.js
├── public/                  # Arquivos estáticos
│   ├── css/
│   └── js/
├── .env                     # Variáveis de ambiente
├── index.js                 # Arquivo principal
└── package.json             # Dependências do projeto
```

### 4.2 Funcionalidades Principais

#### 4.2.1 Gestão de Usuários
- **Cadastro** com diferentes níveis de acesso (admin, gerente, motorista, aluno)
- **Login** com autenticação JWT
- **Redefinição de senha** via e-mail
- **Permissões** específicas para cada tipo de usuário

#### 4.2.2 Gestão de Alunos
- Cadastro completo (nome, processo, contatos, endereço)
- Vinculação a rotas e paragens
- Visualização por diferentes níveis de usuário

#### 4.2.3 Gestão de Motoristas
- Cadastro com dados pessoais e de emergência
- Vinculação a rotas e veículos
- Histórico de viagens

#### 4.2.4 Gestão de Veículos
- Cadastro de frota (modelo, matrícula, capacidade)
- Alocação a rotas
- Manutenção de registos

#### 4.2.5 Gestão de Rotas
- Criação de rotas com horários
- Definição de pontos de paragem
- Vinculação de motorista e veículo
- Cadastro de alunos por paragem

#### 4.2.6 Sistema de Viagens
**Para Motoristas**:
- Iniciar viagem em tempo real
- Registrar presença de alunos por paragem
- Finalizar viagem
- Ver confirmações dos alunos

**Para Alunos**:
- Ver viagem ativa da sua rota
- Confirmar entrada no veículo
- Visualizar horários e motorista

#### 4.2.7 Relatórios
- Dashboard com estatísticas gerais
- Alunos por rota
- Relatório de viagens (com filtro de datas)
- Próximos horários
- Logs do sistema

### 4.3 Níveis de Acesso e Permissões

#### Administrador
✅ Acesso total a todas as funcionalidades
✅ Criar/editar/deletar tudo
✅ Gerenciar usuários (inclusive outros admins)
✅ Visualizar todos os relatórios

#### Gerente
✅ Criar/editar/deletar: alunos, motoristas, veículos, rotas
✅ Visualizar todos os relatórios
✅ Gerenciar usuários (exceto admin e gerente)
❌ Não pode gerenciar outros gerentes ou admins

#### Motorista
✅ Ver suas rotas
✅ Iniciar/finalizar viagens
✅ Registrar presença de alunos
✅ Ver alunos das suas rotas
❌ Não pode cadastrar/editar/deletar

#### Aluno
✅ Ver sua rota e horários
✅ Confirmar presença no veículo
✅ Ver motorista e veículo da sua rota
❌ Não pode cadastrar/editar/deletar

### 4.4 Segurança Implementada

1. **Autenticação JWT**
   - Token gerado no login
   - Expira em 1 hora
   - Armazenado no localStorage

2. **Criptografia de Senhas**
   - Bcrypt com 10 rounds
   - Senhas nunca são armazenadas em texto plano

3. **Validação de Dados**
   - Middleware de validação em todas as entradas
   - Proteção contra SQL Injection (via Sequelize)
   - Sanitização de inputs

4. **Controle de Permissões**
   - Middleware que verifica nível de acesso
   - Rotas protegidas por autenticação
   - Logs de todas as ações importantes

5. **Sistema de Logs**
   - Registra todas as operações CRUD
   - Armazena IP do usuário
   - Guarda dados antigos e novos

### 4.5 Backup Automático

O sistema possui backup automático da base de dados:
- Executado diariamente às 2h da manhã
- Mantém os 10 backups mais recentes
- Arquivo SQLite copiado para pasta `backups/`
- Nomeação: `backup-YYYY-MM-DDTHH-MM-SS.sqlite`

### 4.6 Fluxo de Funcionamento

#### Fluxo de uma Viagem Completa

```
1. ADMINISTRADOR
   └─> Cadastra: alunos, motoristas, veículos
   └─> Cria rota com horários e paragens
   └─> Vincula alunos às paragens

2. MOTORISTA (no dia da viagem)
   └─> Faz login no sistema
   └─> Seleciona a rota
   └─> Clica em "Iniciar Viagem"
   └─> Em cada paragem:
       └─> Registra presença dos alunos que entraram

3. ALUNO (durante a viagem)
   └─> Faz login no sistema
   └─> Vê viagem ativa da sua rota
   └─> Ao entrar no veículo:
       └─> Clica em "Confirmar Presença"

4. SISTEMA (automático)
   └─> Registra horários
   └─> Compara confirmações (motorista vs aluno)
   └─> Gera dados para relatórios

5. MOTORISTA (ao fim da viagem)
   └─> Clica em "Finalizar Viagem"
   └─> Sistema registra horário de fim

6. ADMINISTRADOR/GERENTE
   └─> Acessa relatório de viagens
   └─> Vê estatísticas:
       - Total de alunos
       - Confirmados por motorista
       - Confirmados por aluno
       - Horários de início/fim
```

### 4.7 Tecnologias de Interface

#### Design Responsivo
O sistema adapta-se automaticamente a:
- 📱 Smartphones (iOS/Android)
- 📱 Tablets
- 💻 Notebooks
- 🖥️ Desktops

#### Componentes de Interface
- **Cards**: Organização visual de conteúdo
- **Tabelas**: Listagem de dados com ações
- **Modais**: Confirmações e alertas
- **Formulários**: Validação em tempo real
- **Badges**: Indicadores visuais de status
- **Botões**: Ações claras e intuitivas

### 4.8 Performance e Otimização

1. **Auto-refresh Inteligente**
   - Atualização automática de dados críticos
   - Motorista: confirmações de alunos (10s)
   - Aluno: status da viagem (15s)

2. **Carregamento Eficiente**
   - Dados carregados sob demanda
   - Cache de recursos estáticos
   - Minificação de CSS/JS (produção)

3. **Banco de Dados**
   - Índices em campos frequentemente consultados
   - Relacionamentos otimizados
   - Queries eficientes via Sequelize

### 4.9 Manutenibilidade

O código foi desenvolvido com boas práticas:

1. **Organização Clara**
   - Separação de responsabilidades (MVC)
   - Um arquivo por funcionalidade
   - Nomenclatura descritiva

2. **Comentários**
   - Explicações nos pontos complexos
   - Documentação de funções importantes

3. **Reutilização**
   - Funções auxiliares compartilhadas
   - Componentes de interface reutilizáveis
   - Middlewares modulares

4. **Escalabilidade**
   - Fácil adicionar novos módulos
   - Estrutura permite crescimento
   - Base para futuras melhorias

---

## 5. INSTALAÇÃO E CONFIGURAÇÃO

### 5.1 Requisitos do Sistema

- **Node.js**: versão 18 ou superior
- **npm**: versão 8 ou superior
- **Sistema Operacional**: Windows, Linux ou macOS
- **Navegador**: Chrome, Firefox, Safari ou Edge (versões recentes)

### 5.2 Instalação Passo a Passo

```bash
# 1. Navegar até a pasta src
cd src/

# 2. Instalar dependências
npm install

# 3. Iniciar o servidor
npm start
```

### 5.3 Primeiro Acesso

Após iniciar o servidor:
1. Abrir navegador em: `http://localhost:3000`
2. O sistema irá exibir a página inicial
3. Criar primeiro usuário administrador via registro

### 5.4 Configurações Importantes

**Arquivo `.env`**:
```
JWT_SECRET=eSTUDIO_2025
PORT=3000
```

**Banco de Dados**:
- Criado automaticamente em: `src/db.sqlite`
- Backups em: `src/backups/`

---

## 6. CONCLUSÃO

### 6.1 Resultados Alcançados

O Sistema de Gestão de Transporte Escolar representa uma solução moderna e completa para a digitalização de processos educacionais. Com tecnologias atuais e arquitetura bem estruturada, o sistema oferece:

✅ **Interface intuitiva** para todos os tipos de usuários
✅ **Segurança robusta** com autenticação e criptografia
✅ **Relatórios em tempo real** para gestão eficiente
✅ **Controle de presença** digital e automatizado
✅ **Escalabilidade** para crescimento futuro

### 6.2 Aprendizados Técnicos

O desenvolvimento deste projeto proporcionou experiência prática em:

1. **Desenvolvimento Full-Stack**
   - Frontend (HTML, CSS, JavaScript)
   - Backend (Node.js, Express)
   - Banco de Dados (SQLite, Sequelize)

2. **Segurança de Aplicações**
   - Autenticação e autorização
   - Criptografia de dados sensíveis
   - Controle de acesso por níveis

3. **Design de Software**
   - Arquitetura MVC
   - APIs RESTful
   - Padrões de projeto

4. **Ferramentas Modernas**
   - Git para controle de versão
   - npm para gestão de pacotes
   - Bootstrap para design responsivo

### 6.3 Possíveis Melhorias Futuras

1. **Notificações**
   - SMS/Email para pais e responsáveis
   - Alertas de chegada em tempo real

2. **Rastreamento GPS**
   - Localização em tempo real dos veículos
   - Previsão de chegada às paragens

3. **Aplicativo Mobile**
   - App nativo para Android e iOS
   - Melhor experiência em smartphones

4. **Dashboard Avançado**
   - Gráficos interativos
   - Análise preditiva de dados
   - Exportação de relatórios em PDF/Excel

5. **Integração**
   - Sistema de pagamentos
   - Integração com sistema acadêmico
   - API pública para terceiros

### 6.4 Impacto Social

Este projeto demonstra como a tecnologia pode:
- **Melhorar a educação** através da digitalização
- **Aumentar a segurança** de estudantes
- **Otimizar recursos** institucionais
- **Facilitar a comunicação** entre todos os envolvidos
- **Contribuir para a sustentabilidade** (redução de papel)

---

## ANEXOS

### A. Glossário de Termos Técnicos

**API (Application Programming Interface)**: Interface que permite comunicação entre diferentes partes do sistema

**Backend**: Parte do sistema que roda no servidor, não visível ao usuário

**Bootstrap**: Framework CSS para criação de interfaces responsivas

**Cookie**: Pequeno arquivo armazenado no navegador para manter sessão

**CRUD**: Create, Read, Update, Delete - operações básicas de banco de dados

**EJS**: Template engine para gerar HTML dinâmico

**Express**: Framework web para Node.js

**Frontend**: Parte do sistema visível e interativa com o usuário

**JWT**: JSON Web Token - padrão para autenticação

**Middleware**: Função intermediária que processa requisições

**MVC**: Model-View-Controller - padrão arquitetural

**Node.js**: Ambiente para executar JavaScript no servidor

**ORM**: Object-Relational Mapping - facilita acesso ao banco de dados

**Responsivo**: Design que se adapta a diferentes tamanhos de tela

**REST**: Padrão arquitetural para APIs web

**Sequelize**: ORM para Node.js

**SQLite**: Sistema de banco de dados leve e portátil

**Token**: Código único para identificar sessão de usuário

### B. Recursos Adicionais

**Documentação Oficial das Tecnologias**:
- Node.js: https://nodejs.org/docs
- Express: https://expressjs.com
- Sequelize: https://sequelize.org
- Bootstrap: https://getbootstrap.com

**Comunidades e Suporte**:
- Stack Overflow: https://stackoverflow.com
- GitHub: https://github.com
- MDN Web Docs: https://developer.mozilla.org

---

**Desenvolvido por**: eliandrosergio  
**Ano**: 2025  
**Licença**: MIT  
**Instituição**: TumaTrans