const express = require('express');
const { query } = require('../config/database');
const { authenticate, authorize } = require('../middleware/auth');
const logger = require('../utils/logger');

const router = express.Router();

/**
 * @route GET /api/events
 * @desc Récupérer tous les événements
 * @access Public
 */
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, type, status = 'upcoming', featured } = req.query;

    let whereClause = 'WHERE status = $1';
    const params = [status];
    let paramIndex = 2;

    if (type) {
      whereClause += ` AND type = $${paramIndex}`;
      params.push(type);
      paramIndex++;
    }

    if (featured !== undefined) {
      whereClause += ` AND featured = $${paramIndex}`;
      params.push(featured === 'true');
      paramIndex++;
    }

    const offset = (page - 1) * limit;

    // Récupérer le nombre total
    const countResult = await query(
      `SELECT COUNT(*) FROM events ${whereClause}`,
      params
    );
    const total = parseInt(countResult.rows[0].count);

    // Récupérer les événements
    const result = await query(
      `SELECT e.id, e.title, e.slug, e.description, e.type, e.location,
              e.is_online, e.online_link, e.start_datetime, e.end_datetime,
              e.max_participants, e.current_participants, e.registration_required,
              e.registration_deadline, e.organizer_id, e.featured_image, e.status,
              e.tags, e.created_at,
              u.first_name as organizer_first_name, u.last_name as organizer_last_name
       FROM events e
       LEFT JOIN users u ON e.organizer_id = u.id
       ${whereClause}
       ORDER BY e.start_datetime ASC
       LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
      [...params, limit, offset]
    );

    res.json({
      success: true,
      data: {
        events: result.rows,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    logger.error('Erreur lors de la récupération des événements:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des événements'
    });
  }
});

/**
 * @route GET /api/events/:slug
 * @desc Récupérer un événement par son slug
 * @access Public
 */
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const result = await query(
      `SELECT e.*, u.first_name as organizer_first_name, u.last_name as organizer_last_name
       FROM events e
       LEFT JOIN users u ON e.organizer_id = u.id
       WHERE e.slug = $1`,
      [slug]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Événement non trouvé'
      });
    }

    res.json({
      success: true,
      data: {
        event: result.rows[0]
      }
    });

  } catch (error) {
    logger.error('Erreur lors de la récupération de l\'événement:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de l\'événement'
    });
  }
});

/**
 * @route POST /api/events
 * @desc Créer un nouvel événement
 * @access Private (Admin/Super Admin)
 */
router.post('/', authenticate, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const {
      title, slug, description, content, type, location, is_online, online_link,
      start_datetime, end_datetime, max_participants, registration_required,
      registration_deadline, featured_image, tags
    } = req.body;

    // Validation des données requises
    if (!title || !slug || !type || !start_datetime || !end_datetime) {
      return res.status(400).json({
        success: false,
        message: 'Titre, slug, type, date de début et date de fin requis'
      });
    }

    const result = await query(
      `INSERT INTO events (
        title, slug, description, content, type, location, is_online, online_link,
        start_datetime, end_datetime, max_participants, registration_required,
        registration_deadline, organizer_id, featured_image, tags
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING *`,
      [
        title, slug, description, content, type, location, is_online, online_link,
        start_datetime, end_datetime, max_participants, registration_required,
        registration_deadline, req.user.id, featured_image, tags
      ]
    );

    logger.info('Événement créé', { eventId: result.rows[0].id, title, organizerId: req.user.id });

    res.status(201).json({
      success: true,
      message: 'Événement créé avec succès',
      data: {
        event: result.rows[0]
      }
    });

  } catch (error) {
    logger.error('Erreur lors de la création de l\'événement:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création de l\'événement'
    });
  }
});

/**
 * @route PUT /api/events/:id
 * @desc Mettre à jour un événement
 * @access Private (Admin/Super Admin ou organisateur)
 */
router.put('/:id', authenticate, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Vérifier que l'événement existe
    const eventCheck = await query('SELECT organizer_id FROM events WHERE id = $1', [id]);
    if (eventCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Événement non trouvé'
      });
    }

    // Construire la requête de mise à jour
    const fields = Object.keys(updates);
    if (fields.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Aucune donnée à mettre à jour'
      });
    }

    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
    const values = fields.map(field => updates[field]);
    values.unshift(id);

    const result = await query(
      `UPDATE events SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`,
      values
    );

    logger.info('Événement mis à jour', { eventId: id });

    res.json({
      success: true,
      message: 'Événement mis à jour avec succès',
      data: {
        event: result.rows[0]
      }
    });

  } catch (error) {
    logger.error('Erreur lors de la mise à jour de l\'événement:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour de l\'événement'
    });
  }
});

/**
 * @route DELETE /api/events/:id
 * @desc Supprimer un événement
 * @access Private (Admin/Super Admin ou organisateur)
 */
router.delete('/:id', authenticate, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query('DELETE FROM events WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Événement non trouvé'
      });
    }

    logger.info('Événement supprimé', { eventId: id });

    res.json({
      success: true,
      message: 'Événement supprimé avec succès'
    });

  } catch (error) {
    logger.error('Erreur lors de la suppression de l\'événement:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression de l\'événement'
    });
  }
});

/**
 * @route POST /api/events/:id/register
 * @desc S'inscrire à un événement
 * @access Private
 */
router.post('/:id/register', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { guest_name, guest_email, guest_phone } = req.body;

    // Vérifier que l'événement existe et permet les inscriptions
    const eventResult = await query(
      'SELECT id, max_participants, current_participants, registration_required, status FROM events WHERE id = $1',
      [id]
    );

    if (eventResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Événement non trouvé'
      });
    }

    const event = eventResult.rows[0];

    if (!event.registration_required) {
      return res.status(400).json({
        success: false,
        message: 'Les inscriptions ne sont pas ouvertes pour cet événement'
      });
    }

    if (event.status !== 'upcoming') {
      return res.status(400).json({
        success: false,
        message: 'L\'événement n\'accepte plus d\'inscriptions'
      });
    }

    if (event.max_participants && event.current_participants >= event.max_participants) {
      return res.status(400).json({
        success: false,
        message: 'L\'événement est complet'
      });
    }

    // Créer l'inscription
    const registrationResult = await query(
      `INSERT INTO event_registrations (
        event_id, member_id, guest_name, guest_email, guest_phone, registration_type
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [
        id,
        req.user ? req.user.id : null,
        guest_name || (req.user ? `${req.user.first_name} ${req.user.last_name}` : null),
        guest_email || (req.user ? req.user.email : null),
        guest_phone,
        req.user ? 'member' : 'guest'
      ]
    );

    // Mettre à jour le compteur de participants
    await query(
      'UPDATE events SET current_participants = current_participants + 1 WHERE id = $1',
      [id]
    );

    logger.info('Inscription à l\'événement', { eventId: id, registrationId: registrationResult.rows[0].id });

    res.status(201).json({
      success: true,
      message: 'Inscription réussie',
      data: {
        registration: registrationResult.rows[0]
      }
    });

  } catch (error) {
    logger.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'inscription'
    });
  }
});

module.exports = router;
