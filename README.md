# 🚌 Sistema de Gestão de Transporte Escolar

[![Versão](https://img.shields.io/badge/versão-2.0-blue.svg)](https://github.com/eliandrosergio/gestao-transporte-escolar)
[![Node.js](https://img.shields.io/badge/Node.js-14+-green.svg)](https://nodejs.org/)
[![Licença](https://img.shields.io/badge/licença-MIT-orange.svg)](LICENSE)
[![Express](https://img.shields.io/badge/Express-5.1.0-yellow.svg)](https://expressjs.com/)

> Sistema completo e profissional para gestão de transporte escolar do **Complexo Escolar Privado Tchiungo** em Luanda, Angola. Desenvolvido em Node.js com interface web moderna, segura e responsiva.

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Novidades Versão 2.0](#-novidades-versão-20)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Uso](#-uso)
- [API Endpoints](#-api-endpoints)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Modelos de Dados](#-modelos-de-dados)
- [Níveis de Acesso](#-níveis-de-acesso)
- [Segurança](#-segurança)
- [Sistema de Backup](#-sistema-de-backup)
- [Auditoria e Logs](#-auditoria-e-logs)
- [Troubleshooting](#-troubleshooting)
- [Roadmap](#-roadmap)
- [Licença](#-licença)
- [Autor](#-autor)

## 🎯 Sobre o Projeto

O Sistema de Gestão de Transporte Escolar é uma aplicação web full-stack projetada para facilitar o controle e organização do transporte de estudantes. O sistema oferece funcionalidades completas de CRUD (Create, Read, Update, Delete) para alunos, motoristas, veículos, rotas e usuários, com interface moderna, sistema de auditoria e segurança robusta.

### ✨ Características Principais

- 🔐 **Autenticação JWT** com criptografia bcrypt
- 🌐 **Servidor HTTPS** com certificados SSL personalizados
- 📱 **Interface Responsiva** com Bootstrap 5
- 🗄️ **Banco SQLite** portátil com Sequelize ORM
- 🎨 **Templates EJS** com sistema de layouts
- 📝 **Sistema de Auditoria** completo com logs
- 💾 **Backup Automático** diário às 2h da manhã
- ✅ **Validações Profissionais** de dados
- 🔄 **Hot Reload** com Nodemon para desenvolvimento
- 👥 **4 Níveis de Acesso** (Admin, Gerente, Aluno, Motorista)

## 🚀 Funcionalidades

### 👨‍🎓 Gestão de Alunos
- ✅ Cadastro completo de alunos
- 📋 Listagem com filtros e busca
- ✏️ Edição de dados pessoais
- 🗑️ Exclusão com confirmação modal
- 📝 Dados: nome, processo único, endereço, telefones (aluno e responsável), data de nascimento
- 🔍 Visualização detalhada individual
- ✅ Validação de dados (telefones, datas, campos obrigatórios)

### 🚗 Gestão de Motoristas
- ✅ Cadastro de condutores
- 📋 Listagem completa
- ✏️ Edição de informações
- 🗑️ Remoção com confirmação
- 📞 Telefone principal e de emergência
- 🏠 Controle de endereços
- ✅ Validação de contatos

### 🚐 Gestão de Veículos
- ✅ Registro de veículos da frota
- 🚌 Controle de capacidade
- 🆔 Gestão de matrículas únicas
- 📊 Modelos, descrições e especificações
- ✏️ Edição e exclusão
- ✅ Validação de capacidade e matrícula

### 🗺️ Gestão de Rotas
- ✅ Criação de rotas personalizadas
- ⏰ Horários de início e fim
- 📍 Pontos de parada detalhados
- 🔗 Associação com motoristas
- 🔗 Associação com veículos
- 👥 Vinculação de alunos
- 📊 Visualização de alunos por rota
- ✅ Validação de horários

### 🔐 Sistema de Autenticação
- 👤 Login/logout seguro
- 🔑 Redefinição de senha
- 👁️ Toggle mostrar/ocultar senha
- 🛡️ Middleware de autorização JWT
- 🏠 Painéis baseados em permissões
- 🔒 Senhas criptografadas com bcrypt
- ⏱️ Tokens com expiração (1 hora)

### 👥 Gestão de Usuários **[NOVO v2.0]**
- ✅ Criar, editar e excluir usuários
- 🔐 4 níveis de acesso: Admin, Gerente, Aluno, Motorista
- ✅ Validação robusta (senha mínima 8 caracteres, email válido)
- 🔄 Confirmação de senha ao cadastrar
- 👁️ Toggle para mostrar/ocultar senha
- 🛡️ Proteção: não pode deletar a si mesmo
- 📋 Listagem com filtros

### 📊 Relatórios
- 📈 Dashboard com estatísticas em tempo real
- 📊 Total de alunos, motoristas, veículos e rotas
- ⏰ Próximos horários do dia
- 🗺️ Alunos por rota
- 📋 Relatórios detalhados
- 📝 Logs de auditoria **[NOVO v2.0]**

## 🆕 Novidades Versão 2.0

### 📝 Sistema de Logs e Auditoria
- ✅ Registro automático de todas as ações (CREATE, UPDATE, DELETE)
- 📊 Rastreamento de usuário, data/hora e IP
- 💾 Dados anteriores e novos salvos em JSON
- 🔍 Histórico completo de mudanças
- 📋 Consulta de logs via API
- 🔐 Auditoria para compliance

### ✅ Validações Profissionais
- 📞 Validação de telefones (formato e tamanho)
- 📧 Validação de emails
- 📅 Validação de datas de nascimento (idade entre 3-25 anos)
- ⏰ Validação de horários de rotas
- 🔢 Validação de capacidades (1-100)
- 📝 Validação de tamanhos mínimos de campos
- 🚫 Mensagens de erro claras e específicas

### 💾 Backup Automático
- 🕐 Backup diário às 2h da manhã
- 💾 Armazenamento dos 10 últimos backups
- 🗑️ Limpeza automática de backups antigos
- 🔧 Função de backup manual disponível
- 🛡️ Proteção contra perda de dados
- 📁 Backups salvos em `backups/backup-YYYY-MM-DD-HH-MM-SS.sqlite`

### 👤 Gestão Completa de Usuários
- ✅ CRUD completo de usuários
- 🔐 4 níveis de acesso bem definidos
- ✅ Validação de senhas fortes (mínimo 8 caracteres)
- 🔄 Confirmação de senha ao cadastrar
- 👁️ Toggle para mostrar/ocultar senha em todos os formulários
- 🛡️ Proteção contra auto-exclusão
- 📋 Listagem com informações de nível e data de cadastro

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** v5.1.0 - Framework web minimalista
- **Sequelize** v6.37.7 - ORM para banco de dados
- **SQLite** v5.1.7 - Banco de dados embarcado e portátil

### Frontend
- **EJS** v3.1.10 - Template engine
- **Bootstrap** v5.3.8 - Framework CSS responsivo
- **Bootstrap Icons** - Ícones modernos
- **JavaScript ES6+** - Interações do cliente
- **Express-EJS-Layouts** v2.5.1 - Sistema de layouts

### Segurança
- **JSON Web Token** v9.0.2 - Autenticação stateless
- **bcryptjs** v3.0.2 - Criptografia de senhas (10 rounds)
- **dotenv** v17.2.2 - Variáveis de ambiente
- **cookie-parser** v1.4.7 - Gerenciamento de cookies

### Ferramentas de Desenvolvimento
- **Nodemon** v3.1.10 - Auto-restart durante desenvolvimento
- **Sequelize CLI** v6.6.3 - Migrations e seeds

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:

- **Node.js** (versão 14 ou superior) - [Download](https://nodejs.org/)
- **npm** ou **yarn** (gerenciador de pacotes)
- **Git** - [Download](https://git-scm.com/)

## 🚀 Instalação

### 1. Clone o repositório
```bash
git clone https://github.com/eliandrosergio/gestao-transporte-escolar.git
cd gestao-transporte-escolar/src
