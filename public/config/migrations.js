import pool from './database.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigrations() {
  try {
    console.log('Iniciando migrações...');

    // Lê o arquivo de migração
    const migrationPath = path.join(__dirname, '../migrations/002_create_tasks_table.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

    // Executa a migração
    await pool.query(migrationSQL);
    
    console.log('Migração executada com sucesso!');
  } catch (error) {
    console.error('Erro ao executar migração:', error);
    throw error;
  }
}

// Executa as migrações
runMigrations().catch(console.error); 