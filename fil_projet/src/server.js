const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const fileUpload = require('express-fileupload');
const path = require('path');
require('dotenv').config();

// Import des modules internes
const { pool } = require('./config/database');
const logger = require('./utils/logger');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const authMiddleware = require('./middleware/auth');

// Import des routes
const authRoutes = require('./routes/auth');
const memberRoutes = require('./routes/members');
const blogRoutes = require('./routes/blog');
const eventRoutes = require('./routes/events');
const messageRoutes = require('./routes/messages');
const statsRoutes = require('./routes/stats');

const app = express();
const PORT = process.env.PORT || 5000;

// ===== MIDDLEWARES DE SÉCURITÉ =====

// Configuration CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
  credentials: process.env.CORS_CREDENTIALS === 'true',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Headers de sécurité
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Rate limiting global
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: {
    success: false,
    message: 'Trop de requêtes, veuillez réessayer plus tard.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// ===== MIDDLEWARES DE PARSING =====

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Configuration upload de fichiers
app.use(fileUpload({
  createParentPath: true,
  limits: { 
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB par défaut
  },
  abortOnLimit: true,
  responseOnLimit: JSON.stringify({
    success: false,
    message: 'Fichier trop volumineux',
  }),
}));

// Servir les fichiers statiques
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/docs', express.static(path.join(__dirname, '../docs')));

// ===== MIDDLEWARE DE LOGGING =====

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });
  next();
});

// ===== ROUTES PRINCIPALES =====

// Route de santé
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Ferlo Impact Hub API fonctionne correctement',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV
  });
});

// Documentation API
app.get('/api/docs', (req, res) => {
  res.sendFile(path.join(__dirname, '../docs/api-documentation.html'));
});

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/stats', statsRoutes);

// Route API racine
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Bienvenue sur l\'API Ferlo Impact Hub',
    version: '1.0.0',
    endpoints: {
      authentication: '/api/auth',
      members: '/api/members',
      blog: '/api/blog', 
      events: '/api/events',
      messages: '/api/messages',
      statistics: '/api/stats',
      documentation: '/api/docs'
    },
    support: 'support@ferloimpacthub.org'
  });
});

// ===== GESTION DES ERREURS =====

// Route non trouvée
app.use(notFound);

// Gestionnaire d'erreurs global
app.use(errorHandler);

// ===== DÉMARRAGE DU SERVEUR =====

app.listen(PORT, async () => {
  try {
    // Test de connexion à la base de données
    await pool.query('SELECT NOW()');
    
    logger.info('🚀 Serveur Ferlo Impact Hub démarré avec succès', {
      port: PORT,
      environment: process.env.NODE_ENV,
      database: 'PostgreSQL connecté',
      timestamp: new Date().toISOString()
    });
    
    console.log('\n🌟 FERLO IMPACT HUB - BACKEND API');
    console.log('=====================================');
    console.log(`🔧 Environnement: ${process.env.NODE_ENV}`);
    console.log(`🌐 Serveur: http://localhost:${PORT}`);
    console.log(`📖 Documentation: http://localhost:${PORT}/api/docs`);
    console.log(`🏥 Santé: http://localhost:${PORT}/health`);
    console.log(`📊 API: http://localhost:${PORT}/api`);
    console.log('=====================================\n');
    
  } catch (error) {
    logger.error('❌ Erreur lors du démarrage du serveur:', error);
    console.error('❌ Impossible de démarrer le serveur:', error.message);
    process.exit(1);
  }
});

// Gestion des signaux de fermeture
process.on('SIGTERM', async () => {
  logger.info('Signal SIGTERM reçu, fermeture du serveur...');
  await pool.end();
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('Signal SIGINT reçu, fermeture du serveur...');
  await pool.end();
  process.exit(0);
});

// Gestion des erreurs non capturées
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Rejet de promesse non géré:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  logger.error('Exception non capturée:', error);
  process.exit(1);
});

module.exports = app;