const bcrypt = require('bcryptjs');
const { pool } = require('../src/config/database');

/**
 * 🌱 SCRIPT DE SEED - FERLO IMPACT HUB
 * 
 * Ce script ajoute des données de test pour faciliter le développement
 */

async function seedDatabase() {
  console.log('🌱 Début du seeding de la base de données...\n');

  try {
    // 1. Créer un utilisateur administrateur par défaut
    console.log('👤 Création de l\'utilisateur administrateur...');
    
    const hashedPassword = await bcrypt.hash('admin123!', 12);
    
    await pool.query(`
      INSERT INTO users (username, email, password_hash, first_name, last_name, role, two_fa_enabled)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (email) DO NOTHING
    `, [
      'admin',
      'admin@ferloimpacthub.org',
      hashedPassword,
      'Admin',
      'Ferlo Impact Hub',
      'super_admin',
      false
    ]);

    // 2. Créer des catégories de blog
    console.log('📂 Création des catégories de blog...');
    
    const categories = [
      { name: 'Actualités', slug: 'actualites', description: 'Dernières nouvelles de Ferlo Impact Hub', color: '#3B82F6' },
      { name: 'Éducation', slug: 'education', description: 'Articles sur l\'éducation et l\'apprentissage', color: '#10B981' },
      { name: 'Événements', slug: 'evenements', description: 'Annonces et retours sur nos événements', color: '#F59E0B' },
      { name: 'Partenariats', slug: 'partenariats', description: 'Nos collaborations et partenariats', color: '#8B5CF6' },
      { name: 'Innovation', slug: 'innovation', description: 'Innovation et nouvelles technologies', color: '#EF4444' }
    ];

    for (const category of categories) {
      await pool.query(`
        INSERT INTO categories (name, slug, description, color)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (slug) DO NOTHING
      `, [category.name, category.slug, category.description, category.color]);
    }

    // 3. Créer quelques membres de test
    console.log('👥 Création de membres de test...');
    
    const members = [
      {
        member_code: 'FIH001',
        type: 'eleve',
        first_name: 'Aminata',
        last_name: 'Diallo',
        email: 'aminata.diallo@example.com',
        phone: '77123456',
        gender: 'F',
        commune: 'Linguère',
        establishment: 'Lycée de Linguère',
        level_class: 'Terminale S'
      },
      {
        member_code: 'FIH002',
        type: 'etudiant',
        first_name: 'Moussa',
        last_name: 'Ba',
        email: 'moussa.ba@example.com',
        phone: '76234567',
        gender: 'M',
        commune: 'Dahra',
        establishment: 'Université Gaston Berger',
        field_of_study: 'Informatique'
      },
      {
        member_code: 'FIH003',
        type: 'alumni',
        first_name: 'Fatou',
        last_name: 'Sow',
        email: 'fatou.sow@example.com',
        phone: '77345678',
        gender: 'F',
        commune: 'Yang-Yang',
        profession: 'Ingénieure',
        company: 'TechSenegal',
        graduation_year: 2020
      },
      {
        member_code: 'FIH004',
        type: 'partenaire',
        first_name: 'Abdoulaye',
        last_name: 'Ndiaye',
        email: 'abdoulaye.ndiaye@example.com',
        phone: '76456789',
        gender: 'M',
        commune: 'Ranérou',
        company: 'ONG Éducation pour Tous'
      }
    ];

    for (const member of members) {
      await pool.query(`
        INSERT INTO members (
          member_code, type, first_name, last_name, email, phone, gender, 
          commune, establishment, level_class, field_of_study, profession, 
          company, graduation_year
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        ON CONFLICT (member_code) DO NOTHING
      `, [
        member.member_code, member.type, member.first_name, member.last_name,
        member.email, member.phone, member.gender, member.commune,
        member.establishment, member.level_class, member.field_of_study,
        member.profession, member.company, member.graduation_year
      ]);
    }

    // 4. Créer quelques événements de test
    console.log('📅 Création d\'événements de test...');
    
    const { rows: [admin] } = await pool.query('SELECT id FROM users LIMIT 1');
    
    const events = [
      {
        title: 'Masterclass en Mathématiques',
        slug: 'masterclass-mathematiques-2024',
        description: 'Session intensive de mathématiques pour les élèves de terminale',
        type: 'masterclass',
        location: 'Centre Communautaire de Linguère',
        start_datetime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Dans 7 jours
        end_datetime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000), // 3h plus tard
        max_participants: 30,
        registration_required: true
      },
      {
        title: 'Atelier de Programmation',
        slug: 'atelier-programmation-janvier',
        description: 'Initiation à la programmation avec Python',
        type: 'atelier',
        location: 'En ligne',
        is_online: true,
        online_link: 'https://meet.google.com/xyz-abc-def',
        start_datetime: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // Dans 14 jours
        end_datetime: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000), // 2h plus tard
        max_participants: 50,
        registration_required: true
      }
    ];

    for (const event of events) {
      await pool.query(`
        INSERT INTO events (
          title, slug, description, type, location, is_online, online_link,
          start_datetime, end_datetime, max_participants, registration_required,
          organizer_id
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        ON CONFLICT (slug) DO NOTHING
      `, [
        event.title, event.slug, event.description, event.type, event.location,
        event.is_online, event.online_link, event.start_datetime, event.end_datetime,
        event.max_participants, event.registration_required, admin.id
      ]);
    }

    console.log('\n✅ Seeding terminé avec succès !');
    console.log('\n📋 Données créées:');
    console.log('   - 1 utilisateur administrateur (admin@ferloimpacthub.org / admin123!)');
    console.log('   - 5 catégories de blog');
    console.log('   - 4 membres de test');
    console.log('   - 2 événements de test');
    console.log('\n🔐 Connexion admin:');
    console.log('   Email: admin@ferloimpacthub.org');
    console.log('   Mot de passe: admin123!');

  } catch (error) {
    console.error('❌ Erreur lors du seeding:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

// Exécuter le seeding si ce script est appelé directement
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('\n🏁 Processus de seeding terminé.');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Échec du seeding:', error);
      process.exit(1);
    });
}

module.exports = { seedDatabase };