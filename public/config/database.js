// config/database.js
import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carrega as variáveis de ambiente do arquivo .env na raiz do projeto
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Validação das variáveis de ambiente
const requiredEnvVars = ['DB_HOST', 'DB_PORT', 'DB_DATABASE', 'DB_USER', 'DB_PASSWORD'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('❌ Variáveis de ambiente ausentes:', missingEnvVars.join(', '));
  process.exit(1);
}

console.log('📊 Configurações do banco de dados:');
console.log(`   Host: ${process.env.DB_HOST}`);
console.log(`   Port: ${process.env.DB_PORT}`);
console.log(`   Database: ${process.env.DB_DATABASE}`);
console.log(`   User: ${process.env.DB_USER}`);

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
    sslmode: 'require'
  },
  // Configurações adicionais para melhor performance
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  // Configurações adicionais para resolver problemas de autenticação
  application_name: 'task-manager-app',
  keepAlive: true,
  keepAliveInitialDelayMillis: 10000
});

// Teste de conexão
pool.on('connect', () => {
  console.log('✅ Conectado ao banco de dados PostgreSQL');
});

pool.on('error', (err) => {
  console.error('❌ Erro inesperado no pool de conexões:', err);
  if (err.message.includes('SASL')) {
    console.log('\n💡 Possíveis soluções para erro SASL:');
    console.log('1. Verifique se o usuário está correto (deve ser apenas "postgres")');
    console.log('2. Verifique se a senha está correta');
    console.log('3. Tente regenerar a senha no Supabase');
    console.log('4. Verifique se o projeto está ativo');
  }
  process.exit(-1);
});

export default pool;