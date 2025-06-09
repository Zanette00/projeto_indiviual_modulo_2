require('dotenv').config();
const fs = require('fs');
const path = require('path');
const pool = require('../config/database');

async function runSQLScript() {
  try {
    // Caminho para o arquivo init.sql dentro da pasta migrations
    const filePath = path.resolve(__dirname, './init.sql');
    const sql = fs.readFileSync(filePath, 'utf8');

    console.log(`Executando script SQL de: ${filePath}`);
    const result = await pool.query(sql);
    console.log('Script SQL executado com sucesso!');

    return result;
  } catch (err) {
    console.error('Erro ao executar o script SQL:', err.message);
    process.exit(1);
  } finally {
    // Encerra o pool após execução
    await pool.end();
  }
}

// Executa quando chamado via `node scripts/runSQLScript.js`
if (require.main === module) {
  runSQLScript();
}

module.exports = runSQLScript;