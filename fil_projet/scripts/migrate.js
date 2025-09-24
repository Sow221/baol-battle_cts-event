const fs = require('fs');
const path = require('path');
const { pool } = require('../src/config/database');

/**
 * 🗄️ SCRIPT DE MIGRATION - FERLO IMPACT HUB
 * 
 * Ce script crée toutes les tables nécessaires pour l'application
 * Ferlo Impact Hub dans l'ordre correct des dépendances.
 */

const migrations = [
  {
    name: '001_create_users_table',
    sql: `
      -- Table des utilisateurs administrateurs
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        role VARCHAR(20) DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin', 'moderator')),
        is_active BOOLEAN DEFAULT true,
        two_fa_secret VARCHAR(255),
        two_fa_enabled BOOLEAN DEFAULT false,
        last_login TIMESTAMP,
        login_attempts INTEGER DEFAULT 0,
        locked_until TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Index pour optimiser les requêtes
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
      CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
    `
  },
  {
    name: '002_create_members_table',
    sql: `
      -- Table des membres de la communauté
      CREATE TABLE IF NOT EXISTS members (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        member_code VARCHAR(20) UNIQUE NOT NULL,
        type VARCHAR(20) NOT NULL CHECK (type IN ('eleve', 'etudiant', 'alumni', 'partenaire')),
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(20),
        date_of_birth DATE,
        gender VARCHAR(10) CHECK (gender IN ('M', 'F', 'Autre')),
        commune VARCHAR(100),
        address TEXT,
        establishment VARCHAR(255),
        level_class VARCHAR(50),
        field_of_study VARCHAR(100),
        graduation_year INTEGER,
        profession VARCHAR(100),
        company VARCHAR(255),
        skills TEXT[],
        interests TEXT[],
        bio TEXT,
        photo_url VARCHAR(500),
        card_generated BOOLEAN DEFAULT false,
        card_generated_at TIMESTAMP,
        is_active BOOLEAN DEFAULT true,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Index pour optimiser les requêtes
      CREATE INDEX IF NOT EXISTS idx_members_type ON members(type);
      CREATE INDEX IF NOT EXISTS idx_members_commune ON members(commune);
      CREATE INDEX IF NOT EXISTS idx_members_gender ON members(gender);
      CREATE INDEX IF NOT EXISTS idx_members_establishment ON members(establishment);
      CREATE INDEX IF NOT EXISTS idx_members_active ON members(is_active);
      CREATE INDEX IF NOT EXISTS idx_members_created ON members(created_at);
    `
  },
  {
    name: '003_create_categories_table',
    sql: `
      -- Table des catégories pour le blog
      CREATE TABLE IF NOT EXISTS categories (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) UNIQUE NOT NULL,
        slug VARCHAR(100) UNIQUE NOT NULL,
        description TEXT,
        color VARCHAR(7) DEFAULT '#3B82F6',
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Index pour optimiser les requêtes
      CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
      CREATE INDEX IF NOT EXISTS idx_categories_active ON categories(is_active);
    `
  },
  {
    name: '004_create_blog_posts_table',
    sql: `
      -- Table des articles de blog
      CREATE TABLE IF NOT EXISTS blog_posts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        excerpt TEXT,
        content TEXT NOT NULL,
        featured_image VARCHAR(500),
        author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
        status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
        is_featured BOOLEAN DEFAULT false,
        tags TEXT[],
        meta_title VARCHAR(255),
        meta_description TEXT,
        views_count INTEGER DEFAULT 0,
        published_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Index pour optimiser les requêtes
      CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
      CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
      CREATE INDEX IF NOT EXISTS idx_blog_posts_author ON blog_posts(author_id);
      CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category_id);
      CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published_at);
      CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(is_featured);
    `
  },
  {
    name: '005_create_events_table',
    sql: `
      -- Table des événements
      CREATE TABLE IF NOT EXISTS events (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        content TEXT,
        type VARCHAR(50) NOT NULL CHECK (type IN ('tutorat', 'masterclass', 'mentorat', 'conference', 'atelier', 'autre')),
        location VARCHAR(255),
        is_online BOOLEAN DEFAULT false,
        online_link VARCHAR(500),
        start_datetime TIMESTAMP NOT NULL,
        end_datetime TIMESTAMP NOT NULL,
        max_participants INTEGER,
        current_participants INTEGER DEFAULT 0,
        registration_required BOOLEAN DEFAULT true,
        registration_deadline TIMESTAMP,
        organizer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        featured_image VARCHAR(500),
        status VARCHAR(20) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
        tags TEXT[],
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Index pour optimiser les requêtes
      CREATE INDEX IF NOT EXISTS idx_events_slug ON events(slug);
      CREATE INDEX IF NOT EXISTS idx_events_type ON events(type);
      CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
      CREATE INDEX IF NOT EXISTS idx_events_start_date ON events(start_datetime);
      CREATE INDEX IF NOT EXISTS idx_events_organizer ON events(organizer_id);
    `
  },
  {
    name: '006_create_event_registrations_table',
    sql: `
      -- Table des inscriptions aux événements
      CREATE TABLE IF NOT EXISTS event_registrations (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
        member_id UUID REFERENCES members(id) ON DELETE CASCADE,
        guest_name VARCHAR(100),
        guest_email VARCHAR(255),
        guest_phone VARCHAR(20),
        registration_type VARCHAR(20) DEFAULT 'member' CHECK (registration_type IN ('member', 'guest')),
        status VARCHAR(20) DEFAULT 'registered' CHECK (status IN ('registered', 'confirmed', 'attended', 'cancelled')),
        notes TEXT,
        registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Index pour optimiser les requêtes
      CREATE INDEX IF NOT EXISTS idx_event_registrations_event ON event_registrations(event_id);
      CREATE INDEX IF NOT EXISTS idx_event_registrations_member ON event_registrations(member_id);
      CREATE INDEX IF NOT EXISTS idx_event_registrations_status ON event_registrations(status);
      CREATE INDEX IF NOT EXISTS idx_event_registrations_type ON event_registrations(registration_type);

      -- Contrainte unique pour éviter les inscriptions multiples
      CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_member_event 
      ON event_registrations(event_id, member_id) 
      WHERE member_id IS NOT NULL;
    `
  },
  {
    name: '007_create_messages_table',
    sql: `
      -- Table des messages de contact
      CREATE TABLE IF NOT EXISTS messages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        sender_name VARCHAR(100) NOT NULL,
        sender_email VARCHAR(255) NOT NULL,
        sender_phone VARCHAR(20),
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        type VARCHAR(50) DEFAULT 'contact' CHECK (type IN ('contact', 'partnership', 'support', 'complaint', 'suggestion')),
        priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
        status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'resolved', 'archived')),
        assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
        response TEXT,
        responded_at TIMESTAMP,
        responded_by UUID REFERENCES users(id) ON DELETE SET NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Index pour optimiser les requêtes
      CREATE INDEX IF NOT EXISTS idx_messages_status ON messages(status);
      CREATE INDEX IF NOT EXISTS idx_messages_type ON messages(type);
      CREATE INDEX IF NOT EXISTS idx_messages_priority ON messages(priority);
      CREATE INDEX IF NOT EXISTS idx_messages_assigned ON messages(assigned_to);
      CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at);
      CREATE INDEX IF NOT EXISTS idx_messages_sender_email ON messages(sender_email);
    `
  },
  {
    name: '008_create_activity_logs_table',
    sql: `
      -- Table des logs d'activité
      CREATE TABLE IF NOT EXISTS activity_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE SET NULL,
        action VARCHAR(100) NOT NULL,
        resource_type VARCHAR(50) NOT NULL,
        resource_id UUID,
        resource_name VARCHAR(255),
        old_values JSONB,
        new_values JSONB,
        ip_address INET,
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Index pour optimiser les requêtes
      CREATE INDEX IF NOT EXISTS idx_activity_logs_user ON activity_logs(user_id);
      CREATE INDEX IF NOT EXISTS idx_activity_logs_action ON activity_logs(action);
      CREATE INDEX IF NOT EXISTS idx_activity_logs_resource ON activity_logs(resource_type, resource_id);
      CREATE INDEX IF NOT EXISTS idx_activity_logs_created ON activity_logs(created_at);
    `
  },
  {
    name: '009_create_statistics_table',
    sql: `
      -- Table pour les statistiques pré-calculées
      CREATE TABLE IF NOT EXISTS statistics (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        metric_name VARCHAR(100) NOT NULL,
        metric_type VARCHAR(50) NOT NULL CHECK (metric_type IN ('count', 'sum', 'average', 'percentage')),
        value DECIMAL(15,2) NOT NULL,
        filters JSONB,
        period_start DATE,
        period_end DATE,
        calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP
      );

      -- Index pour optimiser les requêtes
      CREATE INDEX IF NOT EXISTS idx_statistics_metric ON statistics(metric_name);
      CREATE INDEX IF NOT EXISTS idx_statistics_period ON statistics(period_start, period_end);
      CREATE INDEX IF NOT EXISTS idx_statistics_calculated ON statistics(calculated_at);
      CREATE INDEX IF NOT EXISTS idx_statistics_expires ON statistics(expires_at);
    `
  },
  {
    name: '010_create_notifications_table',
    sql: `
      -- Table des notifications
      CREATE TABLE IF NOT EXISTS notifications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        type VARCHAR(50) DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
        is_read BOOLEAN DEFAULT false,
        action_url VARCHAR(500),
        expires_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Index pour optimiser les requêtes
      CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
      CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(is_read);
      CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);
      CREATE INDEX IF NOT EXISTS idx_notifications_created ON notifications(created_at);
    `
  }
];

async function runMigrations() {
  console.log('🚀 Début des migrations de base de données...\n');

  try {
    // Créer la table de suivi des migrations
    await pool.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Récupérer les migrations déjà exécutées
    const { rows: executedMigrations } = await pool.query(
      'SELECT name FROM migrations ORDER BY id'
    );
    const executedNames = executedMigrations.map(row => row.name);

    // Exécuter les nouvelles migrations
    for (const migration of migrations) {
      if (!executedNames.includes(migration.name)) {
        console.log(`📝 Exécution de la migration: ${migration.name}`);
        
        await pool.query(migration.sql);
        await pool.query(
          'INSERT INTO migrations (name) VALUES ($1)',
          [migration.name]
        );
        
        console.log(`✅ Migration ${migration.name} terminée`);
      } else {
        console.log(`⏭️  Migration ${migration.name} déjà exécutée`);
      }
    }

    console.log('\n🎉 Toutes les migrations ont été exécutées avec succès !');
    console.log('\n📊 Tables créées:');
    console.log('   - users (utilisateurs administrateurs)');
    console.log('   - members (membres de la communauté)');
    console.log('   - categories (catégories du blog)');
    console.log('   - blog_posts (articles de blog)');
    console.log('   - events (événements)');
    console.log('   - event_registrations (inscriptions aux événements)');
    console.log('   - messages (messages de contact)');
    console.log('   - activity_logs (journaux d\'activité)');
    console.log('   - statistics (statistiques pré-calculées)');
    console.log('   - notifications (notifications utilisateurs)');
    
  } catch (error) {
    console.error('❌ Erreur lors des migrations:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

// Exécuter les migrations si ce script est appelé directement
if (require.main === module) {
  runMigrations()
    .then(() => {
      console.log('\n🏁 Processus de migration terminé.');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Échec des migrations:', error);
      process.exit(1);
    });
}

module.exports = { runMigrations, migrations };