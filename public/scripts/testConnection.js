import pool from '../config/database.js';

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso!');
    
    // Testa uma query simples
    const result = await client.query('SELECT NOW()');
    console.log('✅ Query de teste executada com sucesso:', result.rows[0]);
    
    client.release();
  } catch (err) {
    console.error('❌ Erro ao conectar com o banco de dados:', err.message);
  } finally {
    await pool.end();
    console.log('✅ Conexão encerrada');
  }
}

testConnection();