import { Client } from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

async function testConnection() {
  console.log('🔍 Testando conexão com SSL...');
  
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: {
      rejectUnauthorized: false,
      sslmode: 'require'
    },
    application_name: 'test-connection',
    keepAlive: true,
    connectionTimeoutMillis: 5000,
    query_timeout: 10000,
    statement_timeout: 10000,
    idle_in_transaction_session_timeout: 10000,
    client_encoding: 'utf8'
  });

  try {
    console.log('📝 Tentando conectar com as seguintes configurações:');
    console.log('Host:', process.env.DB_HOST);
    console.log('Porta:', process.env.DB_PORT);
    console.log('Database:', process.env.DB_NAME);
    console.log('Usuário:', process.env.DB_USER);
    console.log('SSL Mode:', 'require');
    
    await client.connect();
    console.log('✅ Conectado com sucesso!');
    
    // Testa uma query simples
    const result = await client.query('SELECT NOW()');
    console.log('✅ Query de teste executada:', result.rows[0]);
    
  } catch (err) {
    console.error('❌ Erro ao conectar:', err.message);
    console.log('\n💡 Sugestões para resolver o erro:');
    console.log('1. Verifique se o usuário e senha estão corretos');
    console.log('2. Tente regenerar a senha no Supabase');
    console.log('3. Verifique se o projeto está ativo no Supabase');
    console.log('4. Confirme se a string de conexão está correta');
    console.log('5. Tente usar a string de conexão completa do Supabase');
  } finally {
    await client.end();
    console.log('✅ Conexão encerrada');
  }
}

testConnection(); 