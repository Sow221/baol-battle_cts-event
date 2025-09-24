const express = require('express');
const { query } = require('../config/database');
const { authenticate, authorize } = require('../middleware/auth');
const logger = require('../utils/logger');

const router = express.Router();

/**
 * @route GET /api/members
 * @desc Récupérer tous les membres
 * @access Private (Admin/Super Admin)
 */
router.get('/', authenticate, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const { page = 1, limit = 10, type, commune, is_active } = req.query;

    let whereClause = '';
    const params = [];
    let paramIndex = 1;

    if (type) {
      whereClause += ` AND type = $${paramIndex}`;
      params.push(type);
      paramIndex++;
    }

    if (commune) {
      whereClause += ` AND commune = $${paramIndex}`;
      params.push(commune);
      paramIndex++;
    }

    if (is_active !== undefined) {
      whereClause += ` AND is_active = $${paramIndex}`;
      params.push(is_active === 'true');
      paramIndex++;
    }

    const offset = (page - 1) * limit;

    // Récupérer le nombre total
    const countResult = await query(
      `SELECT COUNT(*) FROM members WHERE 1=1${whereClause}`,
      params
    );
    const total = parseInt(countResult.rows[0].count);

    // Récupérer les membres
    const result = await query(
      `SELECT id, member_code, type, first_name, last_name, email, phone,
              date_of_birth, gender, commune, address, establishment, level_class,
              field_of_study, graduation_year, profession, company, skills,
              interests, bio, photo_url, card_generated, is_active, created_at
       FROM members
       WHERE 1=1${whereClause}
       ORDER BY created_at DESC
       LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
      [...params, limit, offset]
    );

    res.json({
      success: true,
      data: {
        members: result.rows,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    logger.error('Erreur lors de la récupération des membres:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des membres'
    });
  }
});

/**
 * @route GET /api/members/:id
 * @desc Récupérer un membre par ID
 * @access Private (Admin/Super Admin)
 */
router.get('/:id', authenticate, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query(
      `SELECT id, member_code, type, first_name, last_name, email, phone,
              date_of_birth, gender, commune, address, establishment, level_class,
              field_of_study, graduation_year, profession, company, skills,
              interests, bio, photo_url, card_generated, is_active, created_at, updated_at
       FROM members WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Membre non trouvé'
      });
    }

    res.json({
      success: true,
      data: {
        member: result.rows[0]
      }
    });

  } catch (error) {
    logger.error('Erreur lors de la récupération du membre:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du membre'
    });
  }
});

/**
 * @route POST /api/members
 * @desc Créer un nouveau membre
 * @access Private (Admin/Super Admin)
 */
router.post('/', authenticate, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const {
      member_code, type, first_name, last_name, email, phone, date_of_birth,
      gender, commune, address, establishment, level_class, field_of_study,
      graduation_year, profession, company, skills, interests, bio, photo_url
    } = req.body;

    // Validation des données requises
    if (!member_code || !type || !first_name || !last_name) {
      return res.status(400).json({
        success: false,
        message: 'Code membre, type, prénom et nom requis'
      });
    }

    const result = await query(
      `INSERT INTO members (
        member_code, type, first_name, last_name, email, phone, date_of_birth,
        gender, commune, address, establishment, level_class, field_of_study,
        graduation_year, profession, company, skills, interests, bio, photo_url
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
      RETURNING *`,
      [
        member_code, type, first_name, last_name, email, phone, date_of_birth,
        gender, commune, address, establishment, level_class, field_of_study,
        graduation_year, profession, company, skills, interests, bio, photo_url
      ]
    );

    logger.info('Membre créé', { memberId: result.rows[0].id, memberCode: member_code });

    res.status(201).json({
      success: true,
      message: 'Membre créé avec succès',
      data: {
        member: result.rows[0]
      }
    });

  } catch (error) {
    logger.error('Erreur lors de la création du membre:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création du membre'
    });
  }
});

/**
 * @route PUT /api/members/:id
 * @desc Mettre à jour un membre
 * @access Private (Admin/Super Admin)
 */
router.put('/:id', authenticate, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Construire la requête de mise à jour dynamiquement
    const fields = Object.keys(updates);
    if (fields.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Aucune donnée à mettre à jour'
      });
    }

    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
    const values = fields.map(field => updates[field]);
    values.unshift(id); // Ajouter l'ID au début

    const result = await query(
      `UPDATE members SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Membre non trouvé'
      });
    }

    logger.info('Membre mis à jour', { memberId: id });

    res.json({
      success: true,
      message: 'Membre mis à jour avec succès',
      data: {
        member: result.rows[0]
      }
    });

  } catch (error) {
    logger.error('Erreur lors de la mise à jour du membre:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du membre'
    });
  }
});

/**
 * @route DELETE /api/members/:id
 * @desc Supprimer un membre
 * @access Private (Super Admin only)
 */
router.delete('/:id', authenticate, authorize('super_admin'), async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query('DELETE FROM members WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Membre non trouvé'
      });
    }

    logger.info('Membre supprimé', { memberId: id });

    res.json({
      success: true,
      message: 'Membre supprimé avec succès'
    });

  } catch (error) {
    logger.error('Erreur lors de la suppression du membre:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du membre'
    });
  }
});

module.exports = router;
