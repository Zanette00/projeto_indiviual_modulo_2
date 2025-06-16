import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Client } from 'pg';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carrega variáveis de ambiente
dotenv.config({ path: path.join(__dirname, '../../.env') });

const runSQLScript = async () => {
  const filePath = path.join(__dirname, 'init.sql');
  console.log('📄 Lendo arquivo SQL:', filePath);

  if (!fs.existsSync(filePath)) {
    console.error('❌ Arquivo SQL não encontrado:', filePath);
    return;
  }

  // Configuração do cliente PostgreSQL com parâmetros individuais
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    const sql = fs.readFileSync(filePath, 'utf8');
    const start = Date.now();
    
    // Conecta ao banco de dados
    await client.connect();
    console.log('✅ Conexão com o banco de dados estabelecida');
    
    // Executa o script SQL
    await client.query(sql);
    console.log(`✅ Script SQL executado com sucesso em ${Date.now() - start}ms!`);
    
  } catch (err) {
    console.error('❌ Erro ao processar script SQL:', err);
  } finally {
    try {
      await client.end();
      console.log('✅ Conexão com o banco de dados encerrada');
    } catch (err) {
      console.error('❌ Erro ao encerrar conexão:', err);
    }
  }
};

// Executa o script
console.log('🚀 Iniciando execução do script SQL...');
runSQLScript()
  .then(() => console.log('✅ Processo concluído'))
  .catch(err => {
    console.error('❌ Erro fatal:', err);
    process.exit(1);
  });
