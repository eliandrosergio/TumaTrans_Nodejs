// utils/backup.js -> Cria backup dos dados da base de dados MySQL

const fs = require('fs');
const path = require('path');
const mysqldump = require('mysqldump');
const dotenv = require('dotenv');
dotenv.config();

// Configurações do banco
const DB_CONFIG = {
    connection: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASS || '',
        database: process.env.MYSQL_DB || 'test',
        port: parseInt(process.env.MYSQL_PORT || '3306'),
    },
    dumpToFile: null // será definido dinamicamente
};

const criarBackup = async () => {
    const dataAtual = new Date().toISOString().replace(/[:]/g, '-').split('.')[0];
    const pastaBackup = path.join(__dirname, '..', 'backups');

    if (!fs.existsSync(pastaBackup)) {
        fs.mkdirSync(pastaBackup);
    }

    const arquivoDestino = path.join(pastaBackup, `backup-${dataAtual}.sql`);
    DB_CONFIG.dumpToFile = arquivoDestino;

    try {
        await mysqldump(DB_CONFIG);
        console.log(`✅ Backup criado: ${arquivoDestino}`);
        limparBackupsAntigos(pastaBackup);
    } catch (err) {
        console.error('❌ Erro ao criar backup:', err.message);
    }
};

const limparBackupsAntigos = (pastaBackup) => {
    fs.readdir(pastaBackup, (err, arquivos) => {
        if (err) return;

        const backups = arquivos
            .filter(f => f.startsWith('backup-') && f.endsWith('.sql'))
            .map(f => ({
                nome: f,
                tempo: fs.statSync(path.join(pastaBackup, f)).mtime.getTime()
            }))
            .sort((a, b) => b.tempo - a.tempo);

        // Manter apenas os 10 backups mais recentes
        backups.slice(10).forEach(backup => {
            fs.unlinkSync(path.join(pastaBackup, backup.nome));
            console.log(`🗑️ Backup antigo removido: ${backup.nome}`);
        });
    });
};

// 🕑 Executar backup diariamente às 2h da manhã
const agendarBackup = () => {
    const agora = new Date();
    const proximoBackup = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate() + 1, 2, 0, 0);
    const tempoAteProximo = proximoBackup.getTime() - agora.getTime();

    criarBackup();
    setTimeout(() => {
        criarBackup();
        setInterval(criarBackup, 24 * 60 * 60 * 1000); // Diariamente
    }, tempoAteProximo);
};

module.exports = { criarBackup, agendarBackup };
