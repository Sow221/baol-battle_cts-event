const { body, param, query, validationResult } = require('express-validator');

/**
 * Middleware pour gérer les erreurs de validation
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Erreurs de validation',
      errors: errors.array().map(error => ({
        field: error.param,
        message: error.msg,
        value: error.value
      }))
    });
  }
  
  next();
};

/**
 * Validations pour l'authentification
 */
const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email invalide'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Le mot de passe doit contenir au moins 6 caractères'),
  handleValidationErrors
];

const validateRegister = [
  body('username')
    .isLength({ min: 3, max: 50 })
    .isAlphanumeric()
    .withMessage('Nom d\'utilisateur invalide (3-50 caractères alphanumériques)'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email invalide'),
  body('password')
    .isLength({ min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Le mot de passe doit contenir au moins 8 caractères avec majuscule, minuscule, chiffre et caractère spécial'),
  body('first_name')
    .isLength({ min: 2, max: 100 })
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
    .withMessage('Prénom invalide'),
  body('last_name')
    .isLength({ min: 2, max: 100 })
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
    .withMessage('Nom invalide'),
  handleValidationErrors
];

/**
 * Validations pour les membres
 */
const validateMember = [
  body('type')
    .isIn(['eleve', 'etudiant', 'alumni', 'partenaire'])
    .withMessage('Type de membre invalide'),
  body('first_name')
    .isLength({ min: 2, max: 100 })
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
    .withMessage('Prénom invalide'),
  body('last_name')
    .isLength({ min: 2, max: 100 })
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
    .withMessage('Nom invalide'),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Email invalide'),
  body('phone')
    .optional()
    .matches(/^[0-9+\-\s()]+$/)
    .withMessage('Numéro de téléphone invalide'),
  body('gender')
    .optional()
    .isIn(['M', 'F', 'Autre'])
    .withMessage('Genre invalide'),
  body('date_of_birth')
    .optional()
    .isISO8601()
    .withMessage('Date de naissance invalide'),
  handleValidationErrors
];

/**
 * Validations pour les articles de blog
 */
const validateBlogPost = [
  body('title')
    .isLength({ min: 5, max: 255 })
    .withMessage('Le titre doit contenir entre 5 et 255 caractères'),
  body('content')
    .isLength({ min: 50 })
    .withMessage('Le contenu doit contenir au moins 50 caractères'),
  body('status')
    .optional()
    .isIn(['draft', 'published', 'archived'])
    .withMessage('Statut invalide'),
  body('category_id')
    .optional()
    .isUUID()
    .withMessage('ID de catégorie invalide'),
  handleValidationErrors
];

/**
 * Validations pour les événements
 */
const validateEvent = [
  body('title')
    .isLength({ min: 5, max: 255 })
    .withMessage('Le titre doit contenir entre 5 et 255 caractères'),
  body('type')
    .isIn(['tutorat', 'masterclass', 'mentorat', 'conference', 'atelier', 'autre'])
    .withMessage('Type d\'événement invalide'),
  body('start_datetime')
    .isISO8601()
    .custom(value => {
      if (new Date(value) <= new Date()) {
        throw new Error('La date de début doit être dans le futur');
      }
      return true;
    })
    .withMessage('Date de début invalide'),
  body('end_datetime')
    .isISO8601()
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.start_datetime)) {
        throw new Error('La date de fin doit être après la date de début');
      }
      return true;
    })
    .withMessage('Date de fin invalide'),
  body('max_participants')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Nombre maximum de participants invalide'),
  handleValidationErrors
];

/**
 * Validations pour les messages
 */
const validateMessage = [
  body('sender_name')
    .isLength({ min: 2, max: 100 })
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
    .withMessage('Nom de l\'expéditeur invalide'),
  body('sender_email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email invalide'),
  body('subject')
    .isLength({ min: 5, max: 255 })
    .withMessage('Le sujet doit contenir entre 5 et 255 caractères'),
  body('message')
    .isLength({ min: 10 })
    .withMessage('Le message doit contenir au moins 10 caractères'),
  body('type')
    .optional()
    .isIn(['contact', 'partnership', 'support', 'complaint', 'suggestion'])
    .withMessage('Type de message invalide'),
  handleValidationErrors
];

/**
 * Validation des paramètres UUID
 */
const validateUUID = [
  param('id')
    .isUUID()
    .withMessage('ID invalide'),
  handleValidationErrors
];

/**
 * Validation de pagination
 */
const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Numéro de page invalide'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limite invalide (1-100)'),
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  validateLogin,
  validateRegister,
  validateMember,
  validateBlogPost,
  validateEvent,
  validateMessage,
  validateUUID,
  validatePagination
};