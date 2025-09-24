const express = require('express');
const { query } = require('../config/database');
const { authenticate, authorize } = require('../middleware/auth');
const logger = require('../utils/logger');

const router = express.Router();

/**
 * @route GET /api/blog/posts
 * @desc Récupérer tous les articles de blog
 * @access Public
 */
router.get('/posts', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, status = 'published', featured } = req.query;

    let whereClause = 'WHERE status = $1';
    const params = [status];
    let paramIndex = 2;

    if (category) {
      whereClause += ` AND category_id = $${paramIndex}`;
      params.push(category);
      paramIndex++;
    }

    if (featured !== undefined) {
      whereClause += ` AND is_featured = $${paramIndex}`;
      params.push(featured === 'true');
      paramIndex++;
    }

    const offset = (page - 1) * limit;

    // Récupérer le nombre total
    const countResult = await query(
      `SELECT COUNT(*) FROM blog_posts ${whereClause}`,
      params
    );
    const total = parseInt(countResult.rows[0].count);

    // Récupérer les articles
    const result = await query(
      `SELECT bp.id, bp.title, bp.slug, bp.excerpt, bp.featured_image,
              bp.author_id, bp.category_id, bp.status, bp.is_featured,
              bp.tags, bp.published_at, bp.created_at,
              c.name as category_name, c.slug as category_slug, c.color as category_color,
              u.first_name as author_first_name, u.last_name as author_last_name
       FROM blog_posts bp
       LEFT JOIN categories c ON bp.category_id = c.id
       LEFT JOIN users u ON bp.author_id = u.id
       ${whereClause}
       ORDER BY bp.published_at DESC, bp.created_at DESC
       LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
      [...params, limit, offset]
    );

    res.json({
      success: true,
      data: {
        posts: result.rows,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    logger.error('Erreur lors de la récupération des articles:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des articles'
    });
  }
});

/**
 * @route GET /api/blog/posts/:slug
 * @desc Récupérer un article par son slug
 * @access Public
 */
router.get('/posts/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const result = await query(
      `SELECT bp.*, c.name as category_name, c.slug as category_slug, c.color as category_color,
              u.first_name as author_first_name, u.last_name as author_last_name
       FROM blog_posts bp
       LEFT JOIN categories c ON bp.category_id = c.id
       LEFT JOIN users u ON bp.author_id = u.id
       WHERE bp.slug = $1 AND bp.status = 'published'`,
      [slug]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Article non trouvé'
      });
    }

    const post = result.rows[0];

    // Incrémenter le compteur de vues
    await query('UPDATE blog_posts SET views_count = views_count + 1 WHERE id = $1', [post.id]);

    res.json({
      success: true,
      data: {
        post: {
          ...post,
          views_count: post.views_count + 1
        }
      }
    });

  } catch (error) {
    logger.error('Erreur lors de la récupération de l\'article:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de l\'article'
    });
  }
});

/**
 * @route GET /api/blog/categories
 * @desc Récupérer toutes les catégories
 * @access Public
 */
router.get('/categories', async (req, res) => {
  try {
    const result = await query(
      'SELECT id, name, slug, description, color FROM categories WHERE is_active = true ORDER BY name'
    );

    res.json({
      success: true,
      data: {
        categories: result.rows
      }
    });

  } catch (error) {
    logger.error('Erreur lors de la récupération des catégories:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des catégories'
    });
  }
});

/**
 * @route POST /api/blog/posts
 * @desc Créer un nouvel article
 * @access Private (Admin/Super Admin)
 */
router.post('/posts', authenticate, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const {
      title, slug, excerpt, content, featured_image, category_id,
      status = 'draft', is_featured = false, tags, meta_title, meta_description
    } = req.body;

    // Validation des données requises
    if (!title || !slug || !content) {
      return res.status(400).json({
        success: false,
        message: 'Titre, slug et contenu requis'
      });
    }

    const result = await query(
      `INSERT INTO blog_posts (
        title, slug, excerpt, content, featured_image, author_id, category_id,
        status, is_featured, tags, meta_title, meta_description, published_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *`,
      [
        title, slug, excerpt, content, featured_image, req.user.id, category_id,
        status, is_featured, tags, meta_title, meta_description,
        status === 'published' ? new Date() : null
      ]
    );

    logger.info('Article créé', { postId: result.rows[0].id, title, authorId: req.user.id });

    res.status(201).json({
      success: true,
      message: 'Article créé avec succès',
      data: {
        post: result.rows[0]
      }
    });

  } catch (error) {
    logger.error('Erreur lors de la création de l\'article:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création de l\'article'
    });
  }
});

/**
 * @route PUT /api/blog/posts/:id
 * @desc Mettre à jour un article
 * @access Private (Admin/Super Admin ou auteur)
 */
router.put('/posts/:id', authenticate, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Vérifier que l'article existe et que l'utilisateur a le droit de le modifier
    const postCheck = await query('SELECT author_id FROM blog_posts WHERE id = $1', [id]);
    if (postCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Article non trouvé'
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
      `UPDATE blog_posts SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`,
      values
    );

    logger.info('Article mis à jour', { postId: id });

    res.json({
      success: true,
      message: 'Article mis à jour avec succès',
      data: {
        post: result.rows[0]
      }
    });

  } catch (error) {
    logger.error('Erreur lors de la mise à jour de l\'article:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour de l\'article'
    });
  }
});

/**
 * @route DELETE /api/blog/posts/:id
 * @desc Supprimer un article
 * @access Private (Admin/Super Admin ou auteur)
 */
router.delete('/posts/:id', authenticate, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query('DELETE FROM blog_posts WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Article non trouvé'
      });
    }

    logger.info('Article supprimé', { postId: id });

    res.json({
      success: true,
      message: 'Article supprimé avec succès'
    });

  } catch (error) {
    logger.error('Erreur lors de la suppression de l\'article:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression de l\'article'
    });
  }
});

module.exports = router;
