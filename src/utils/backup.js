const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const criarBackup = () => {
    const dataAtual = new Date().toISOString().replace(/:/g, '-').split('.')[0];
    const pastaBackup = path.join(__dirname, '..', 'backups');
    
    if (!fs.existsSync(pastaBackup)) {
        fs.mkdirSync(pastaBackup);
    }
    
    const arquivoOrigem = path.join(__dirname, '..', 'db.sqlite');
    const arquivoDestino = path.join(pastaBackup, `backup-${dataAtual}.sqlite`);
    
    fs.copyFile(arquivoOrigem, arquivoDestino, (err) => {
        if (err) {
            console.error('Erro ao criar backup:', err);
        } else {
            console.log(`Backup criado: ${arquivoDestino}`);
            limparBackupsAntigos(pastaBackup);
        }
    });
};

const limparBackupsAntigos = (pastaBackup) => {
    fs.readdir(pastaBackup, (err, arquivos) => {
        if (err) return;
        
        const backups = arquivos
            .filter(f => f.startsWith('backup-') && f.endsWith('.sqlite'))
            .map(f => ({
                nome: f,
                tempo: fs.statSync(path.join(pastaBackup, f)).mtime.getTime()
            }))
            .sort((a, b) => b.tempo - a.tempo);
        
        // Manter apenas os 10 backups mais recentes
        backups.slice(10).forEach(backup => {
            fs.unlinkSync(path.join(pastaBackup, backup.nome));
            console.log(`Backup antigo removido: ${backup.nome}`);
        });
    });
};

// Executar backup diariamente às 2h da manhã
const agendarBackup = () => {
    const agora = new Date();
    const proximoBackup = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate() + 1, 2, 0, 0);
    const tempoAteProximo = proximoBackup.getTime() - agora.getTime();
    
    setTimeout(() => {
        criarBackup();
        setInterval(criarBackup, 24 * 60 * 60 * 1000); // Diariamente
    }, tempoAteProximo);
};

module.exports = { criarBackup, agendarBackup };
