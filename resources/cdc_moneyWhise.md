Cahier des charges – MoneyWise 
1. Contexte 
La gestion des finances personnelles est souvent négligée à cause d’un manque d’outils simples et accessibles. MoneyWise permet à tout utilisateur de suivre ses revenus, ses dépenses, de les classer par catégorie, et d’analyser sa situation financière via des graphiques et rapports téléchargeables. 
2. Objectif 
Créer une application web où les utilisateurs peuvent : 
● Ajouter et gérer leurs dépenses et revenus 
● Catégoriser leurs transactions 
● Visualiser l’évolution de leur budget avec des graphiques clairs 
● Exporter leurs données au format PDF ou Excel 
3. Cibles utilisateurs 
● Particuliers souhaitant mieux gérer leur budget 
● Étudiants, salariés ou freelances
4. Fonctionnalités principales 
Authentification 
● Inscription et connexion sécurisée (email + mot de passe) 
● Gestion de session 
● Mot de passe oublié 
Gestion financière 
● Ajout d’une transaction (type : revenu ou dépense) 
● Champs : montant, catégorie, description, date 
● Modification / suppression d’une transaction 
● Catégories personnalisables (ex : "loyer", "alimentation", "loisirs", "freelance"...) ● Solde disponible calculé automatiquement 
Visualisation 
● Graphiques : 
○ Répartition des dépenses par catégorie (camembert) 
○ Évolution mensuelle des revenus/dépenses (courbe ou barres) ● Vue filtrée par mois ou année 
Exportation 
● Export des transactions en PDF ou Excel (CSV) 
● Génération automatique d’un rapport mensuel
Extras 
● Design responsive (mobile / tablette / desktop) 
● (Optionnel) Notifications ou alertes budget dépassé ● (Optionnel) Thème clair/sombre 
Link: https://www.figma.com/community/file/1227525441534506928 Link: https://www.figma.com/community/file/1496029882992276524 
5. Technologies recommandées 
● Frontend : React.js + Tailwind CSS 
● Graphiques : Chart.js ou Recharts 
● Backend : Django REST ou Node.js + Express ● Base de données : PostgreSQL ou MongoDB 
● Auth : JWT ou Firebase Auth 
● Export : jsPDF (PDF), SheetJS (Excel) 
● Hébergement : Vercel + Render/Heroku 
6. Structure des pages 
● / : Tableau de bord (résumé, graphiques) 
● /transactions : Liste des transactions 
● /add : Formulaire ajout revenu/dépense 
● /login – /register : Authentification
● /profile : Paramètres utilisateur (catégories, export) 
NB: Cette structure ne constitue pas forcément la structure complète. Vous pourrez compléter si besoin 
7. Design UI 
● Style épuré, inspiré de Mint, Revolut 
● Couleurs : vert (positif), rouge (négatif), blanc/gris pour la neutralité 
● Sidebar verticale + graphiques centraux 
● Responsive mobile-first 
User Stories (format agile) 
Authentification 
● US001 : En tant qu’utilisateur, je veux m’inscrire et me connecter pour gérer mes données personnelles. 
● US002 : En tant qu’utilisateur, je veux pouvoir me déconnecter de manière sécurisée. ● US003 : En tant qu’utilisateur, je veux récupérer mon mot de passe si je l’oublie. 
Gestion des finances 
● US004 : En tant qu’utilisateur, je veux ajouter une transaction en choisissant un type (revenu ou dépense), un montant, une catégorie, une description et une date. 
● US005 : En tant qu’utilisateur, je veux modifier ou supprimer une transaction existante. ● US006 : En tant qu’utilisateur, je veux créer mes propres catégories personnalisées.
● US007 : En tant qu’utilisateur, je veux visualiser mon solde disponible calculé automatiquement. 
Visualisation et analyse 
● US008 : En tant qu’utilisateur, je veux voir un graphique montrant la répartition de mes dépenses par catégorie. 
● US009 : En tant qu’utilisateur, je veux voir un graphique représentant mes revenus et dépenses sur le temps. 
● US010 : En tant qu’utilisateur, je veux filtrer mes graphiques par mois ou par année. 
Exportation et rapports 
● US011 : En tant qu’utilisateur, je veux pouvoir exporter mes transactions sous forme de fichier PDF ou Excel. 
● US012 : En tant qu’utilisateur, je veux pouvoir générer un rapport mensuel de mes finances. 
Autres 
● US013 : En tant qu’utilisateur, je veux utiliser l’application sur mobile aussi facilement que sur ordinateur. 
● US014 : En tant qu’utilisateur, je veux pouvoir activer un thème sombre pour le confort visuel (optionnel). 
● US015 : En tant qu’utilisateur, je veux recevoir une alerte si je dépasse un seuil de dépenses (optionnel).
