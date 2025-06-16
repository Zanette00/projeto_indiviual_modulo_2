import { Client } from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

async function testConnection() {
  console.log('🔍 Testando conexão direta com Supabase...');
  
  // Usando a string de conexão completa
  const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  
  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('📝 Tentando conectar com string de conexão...');
    await client.connect();
    console.log('✅ Conectado com sucesso!');
    
    const result = await client.query('SELECT NOW()');
    console.log('✅ Query de teste executada:', result.rows[0]);
    
  } catch (err) {
    console.error('❌ Erro ao conectar:', err.message);
    console.log('\n💡 Sugestões para resolver o erro:');
    console.log('1. Copie a string de conexão completa do Supabase');
    console.log('2. Substitua a senha na string de conexão');
    console.log('3. Verifique se o projeto está ativo');
    console.log('4. Tente regenerar a senha no Supabase');
  } finally {
    await client.end();
    console.log('✅ Conexão encerrada');
  }
}

testConnection(); 