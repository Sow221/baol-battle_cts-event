const logger = require('../utils/logger');

/**
 * Middleware de gestion d'erreur 404 - Route non trouvée
 */
const notFound = (req, res, next) => {
  const error = new Error(`Route non trouvée - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Middleware de gestion d'erreurs globales
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log de l'erreur
  logger.error('Erreur API:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  let message = 'Erreur du serveur';
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Erreur de validation Postgres
  if (err.code === '23505') {
    message = 'Cette ressource existe déjà';
    statusCode = 400;
  }

  // Erreur de contrainte foreign key
  if (err.code === '23503') {
    message = 'Référence invalide vers une ressource inexistante';
    statusCode = 400;
  }

  // Erreur de connexion à la base de données
  if (err.code === 'ECONNREFUSED') {
    message = 'Erreur de connexion à la base de données';
    statusCode = 503;
  }

  // Erreur JWT
  if (err.name === 'JsonWebTokenError') {
    message = 'Token invalide';
    statusCode = 401;
  }

  if (err.name === 'TokenExpiredError') {
    message = 'Token expiré';
    statusCode = 401;
  }

  // Erreur de validation
  if (err.name === 'ValidationError') {
    message = 'Données de validation invalides';
    statusCode = 400;
  }

  // En développement, inclure la stack trace
  const responseError = {
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { 
      stack: err.stack,
      original: err.message 
    })
  };

  res.status(statusCode).json(responseError);
};

module.exports = {
  notFound,
  errorHandler
};