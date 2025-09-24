const { Pool } = require('pg');
require('dotenv').config();

// Configuration de la base de données PostgreSQL
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'ferlo_impact_hub',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20, // nombre maximum de clients dans le pool
  idleTimeoutMillis: 30000, // délai avant fermeture d'une connexion inactive
  connectionTimeoutMillis: 2000, // délai maximum pour établir une connexion
};

// Pool de connexions PostgreSQL
const pool = new Pool(dbConfig);

// Test de connexion
pool.on('connect', () => {
  console.log('✅ Connexion à PostgreSQL établie');
});

pool.on('error', (err) => {
  console.error('❌ Erreur de connexion PostgreSQL:', err);
  process.exit(-1);
});

// Fonction utilitaire pour exécuter des requêtes
const query = async (text, params) => {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } catch (error) {
    console.error('Erreur lors de l\'exécution de la requête:', error);
    throw error;
  } finally {
    client.release();
  }
};

// Fonction pour les transactions
const transaction = async (callback) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  pool,
  query,
  transaction
};