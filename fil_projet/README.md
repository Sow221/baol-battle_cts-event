# 🌟 Ferlo Impact Hub - Backend API

## 📋 Description

Backend complet pour le site web Ferlo Impact Hub (FIH), une association dédiée au renforcement de l'éducation dans la zone du Ferlo via tutorat, masterclasses, mentorat, inclusion et innovation.

## 🚀 Technologies utilisées

- **Runtime** : Node.js
- **Framework** : Express.js
- **Base de données** : PostgreSQL
- **Authentification** : JWT + 2FA (Speakeasy)
- **Sécurité** : Helmet, Rate Limiting, CORS
- **Email** : Nodemailer
- **PDF** : PDFKit
- **CSV Export** : csv-writer
- **Logs** : Winston

## 🏗️ Architecture du projet

```
ferlo-impact-hub-backend/
├── src/
│   ├── controllers/          # Contrôleurs des routes
│   ├── middleware/          # Middlewares personnalisés
│   ├── models/              # Modèles de données
│   ├── routes/              # Définition des routes
│   ├── services/            # Services métier
│   ├── utils/               # Utilitaires
│   ├── config/              # Configuration
│   └── server.js            # Point d'entrée
├── scripts/                 # Scripts de migration et seed
├── docs/                    # Documentation API
├── uploads/                 # Fichiers uploadés
└── tests/                   # Tests unitaires
```

## 🛠️ Installation et démarrage

### 1. Cloner le projet
```bash
git clone <repository-url>
cd ferlo-impact-hub-backend
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configuration de l'environnement
```bash
cp .env.example .env
```

### 4. Configuration PostgreSQL
Créer une base de données PostgreSQL et configurer les variables d'environnement dans `.env`

### 5. Migration de la base de données
```bash
npm run migrate
```

### 6. Seed des données (optionnel)
```bash
npm run seed
```

### 7. Démarrage du serveur
```bash
# Développement
npm run dev

# Production
npm start
```

## 📊 Base de données - Tables principales

### 1. **users** - Utilisateurs/Administrateurs
- Gestion des comptes admin avec authentification 2FA
- Rôles et permissions

### 2. **members** - Membres de la communauté
- Élèves, étudiants, alumni, partenaires
- Informations complètes : genre, commune, établissement
- Génération de cartes membres

### 3. **blog_posts** - Articles de blog
- Gestion des actualités et articles
- Système de catégories et tags
- Statut de publication

### 4. **events** - Événements et activités
- Calendrier d'événements
- Types d'événements (masterclass, tutorat, etc.)
- Gestion des inscriptions

### 5. **messages** - Messages de contact
- Formulaires de contact du site
- Réponses des administrateurs
- Statut de traitement

## 🔐 Authentification et sécurité

### JWT + 2FA
- Tokens JWT pour l'authentification
- 2FA avec codes TOTP (Google Authenticator)
- Rate limiting sur les endpoints sensibles
- Protection CSRF et XSS

### Middleware de sécurité
- `helmet` pour les headers de sécurité
- `cors` configuré pour les origines autorisées
- `express-rate-limit` pour limiter les requêtes
- Validation des données avec `express-validator`

## 📡 API Endpoints

### Authentification
```
POST /api/auth/login          # Connexion
POST /api/auth/register       # Inscription admin
POST /api/auth/verify-2fa     # Vérification 2FA
POST /api/auth/setup-2fa      # Configuration 2FA
POST /api/auth/refresh        # Refresh token
POST /api/auth/logout         # Déconnexion
```

### Gestion des membres
```
GET    /api/members           # Liste des membres
POST   /api/members           # Créer un membre
GET    /api/members/:id       # Détails d'un membre
PUT    /api/members/:id       # Modifier un membre
DELETE /api/members/:id       # Supprimer un membre
GET    /api/members/export    # Export CSV/PDF
POST   /api/members/:id/card  # Générer carte membre
```

### Blog et actualités
```
GET    /api/blog              # Liste des articles
POST   /api/blog              # Créer un article
GET    /api/blog/:id          # Détails d'un article
PUT    /api/blog/:id          # Modifier un article
DELETE /api/blog/:id          # Supprimer un article
```

### Événements
```
GET    /api/events            # Liste des événements
POST   /api/events            # Créer un événement
GET    /api/events/:id        # Détails d'un événement
PUT    /api/events/:id        # Modifier un événement
DELETE /api/events/:id        # Supprimer un événement
GET    /api/events/calendar   # Calendrier des événements
```

### Messages/Contact
```
GET    /api/messages          # Liste des messages
POST   /api/messages          # Nouveau message
GET    /api/messages/:id      # Détails d'un message
PUT    /api/messages/:id      # Répondre/modifier statut
DELETE /api/messages/:id      # Supprimer un message
```

### Statistiques
```
GET    /api/stats/dashboard   # Statistiques générales
GET    /api/stats/members     # Stats des membres
GET    /api/stats/activity    # Stats d'activité
GET    /api/stats/export      # Export des stats
```

## 📈 Fonctionnalités principales

### 1. Gestion complète des membres
- ✅ CRUD complet (Create, Read, Update, Delete)
- ✅ Filtrage par type, genre, commune, établissement
- ✅ Génération automatique de cartes membres (PDF)
- ✅ Export CSV/PDF des listes

### 2. Système de blog/actualités
- ✅ Éditeur d'articles avec catégories
- ✅ Système de publication/brouillon
- ✅ Upload d'images pour les articles
- ✅ Filtrage et recherche

### 3. Calendrier d'événements
- ✅ Gestion complète des événements
- ✅ Types d'événements (tutorat, masterclass, etc.)
- ✅ Calendrier intégré avec vue mensuelle
- ✅ Inscriptions aux événements

### 4. Messages et communication
- ✅ Réception des messages de contact
- ✅ Système de réponse intégré
- ✅ Envoi d'emails avec Nodemailer
- ✅ Statuts de traitement

### 5. Statistiques et rapports
- ✅ Dashboard avec graphiques
- ✅ Évolution par mois, genre, commune
- ✅ Export PDF/CSV des rapports
- ✅ Métriques d'engagement

## 🔧 Configuration

### Variables d'environnement (.env)
```env
# Serveur
PORT=5000
NODE_ENV=production

# Base de données
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ferlo_impact_hub
DB_USER=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=24h

# Email (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Upload
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

## 🧪 Tests

```bash
# Lancer tous les tests
npm test

# Tests avec coverage
npm run test:coverage

# Tests en mode watch
npm run test:watch
```

## 📚 Documentation API

La documentation complète de l'API est disponible à l'adresse : `http://localhost:5000/api/docs`

### Format des réponses
Toutes les réponses de l'API suivent ce format standardisé :

```json
{
  "success": true,
  "message": "Description de l'opération",
  "data": {},
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

## 🚀 Déploiement

### Option 1 : Render
1. Connecter le repository GitHub à Render
2. Configurer les variables d'environnement
3. Déployer automatiquement

### Option 2 : Heroku
```bash
heroku create ferlo-impact-hub-api
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main
```

## 🛡️ Sécurité

- ✅ Protection contre les injections SQL (requêtes préparées)
- ✅ Protection XSS (sanitisation des entrées)
- ✅ Rate limiting pour éviter les attaques DDoS
- ✅ CORS configuré pour les origines autorisées
- ✅ Headers de sécurité avec Helmet
- ✅ Authentification 2FA pour les admins
- ✅ Logs de sécurité avec Winston

## 📞 Support

Pour toute question ou problème :
- 📧 Email : support@ferloimpacthub.org
- 📱 WhatsApp : [Lien vers le groupe]
- 📖 Documentation : `/docs`

## 📄 License

MIT © Ferlo Impact Hub