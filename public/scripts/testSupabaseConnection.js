import { Client } from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

async function testSupabaseConnection() {
  console.log('🔍 Testando conexão com Supabase...');
  
  // Verifica se a string de conexão está disponível
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL não encontrada no arquivo .env');
    console.log('💡 Obtenha a string de conexão em:');
    console.log('   Supabase > Project Settings > Database > Connection string > URI');
    return;
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    console.log('✅ Conectado ao Supabase com sucesso!');
    
    // Testa uma query simples
    const result = await client.query('SELECT NOW()');
    console.log('✅ Query de teste executada:', result.rows[0]);
    
  } catch (err) {
    console.error('❌ Erro ao conectar:', err.message);
    if (err.message.includes('Tenant or user not found')) {
      console.log('\n💡 Possíveis soluções:');
      console.log('1. Verifique se a string de conexão está correta');
      console.log('2. Certifique-se de que o projeto está ativo no Supabase');
      console.log('3. Verifique se a senha está correta');
      console.log('4. Tente regenerar a string de conexão no Supabase');
    }
  } finally {
    await client.end();
    console.log('✅ Conexão encerrada');
  }
}

testSupabaseConnection(); 