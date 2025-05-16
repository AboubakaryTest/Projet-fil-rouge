# Projet-fil-rouge
# 📘 README – Projet Fil Rouge : Intégration et Sécurisation d'une BDD

## 📌 Contexte

Ce projet est un système d’authentification full-stack sécurisé avec :
- **Frontend** : Vue.js (Vite)
- **Backend** : Express.js (Node.js)
- **Base de données** : MariaDB
- **Sécurité** : JWT, hashing, rate limiting, data masking
- **Infrastructure** : Docker / Docker Compose

## 🚀 Fonctionnalités principales

### 👤 Côté utilisateur :
- Inscription avec validation des champs
- Connexion avec JWT
- Limitation des tentatives de connexion
- Accès au profil
- Mise à jour des informations
- Suppression du compte
- Déconnexion

### 🔐 Sécurité :
- Mots de passe hachés avec **bcrypt**
- Authentification via **JWT**
- Middleware de validation (`express-validator`)
- Rate limiting (`express-rate-limit`)
- Requêtes CORS contrôlées
- Vue SQL `masked_users` pour masquer les emails

## 🧱 Technologies utilisées

| Côté | Stack |
|------|-------|
| Frontend | Vue.js + Vite + Pinia + Axios |
| Backend | Express.js + Node.js + JWT + bcrypt |
| BDD | MariaDB + SQL |
| Outils | Docker + Docker Compose |

## 🐳 Installation locale (avec Docker)

### 1. Cloner le projet

```bash
git clone https://github.com/AboubakaryTest/Projet-fil-rouge.git
cd PROJET_FIL_ROUGE
```

### 2. Lancer les conteneurs

```bash
docker-compose up --build
```

Le projet démarre avec :
- `frontend` → http://localhost:5173
- `backend` → http://localhost:3000
- `MariaDB` → port 3306 (local)

## 🗃️ Base de données

- Script d'initialisation : `db/init.sql`
- Table principale : `users`
- Vue sécurisée : `masked_users` (masquage des emails)

```sql
SELECT * FROM masked_users;
```

## 🔒 Sécurité (CIA)

| Aspect | Description |
|--------|-------------|
| Confidentialité | Hash des mots de passe, JWT, routes protégées, CORS |
| Intégrité | Validation des champs, requêtes contrôlées |
| Disponibilité | Docker Compose, conteneurs redémarrables, volumes persistants |

## 📁 Structure du projet

```
projet-fil-rouge/
├── backend/           # Express API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── app.js
│   └── Dockerfile
├── frontend/          # Vue 3 (Vite)
│   ├── src/
│   ├── Dockerfile
├── db/
│   └── init.sql
├── docker-compose.yml
└── README.md
```

## 🧪 Routes de l'API

| Méthode | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Créer un compte |
| POST | `/api/users/login` | Connexion (JWT) |
| GET | `/api/users/me` | Récupérer le profil |
| PUT | `/api/users/update` | Modifier ses infos |
| DELETE | `/api/users/delete` | Supprimer le compte |
| GET | `/api/users/masked` | Voir les utilisateurs avec data masking |

## ✅ Avancement des objectifs du cahier des charges

| Élément | Statut |
|--------|--------|
| Full-stack (Vue + Express + DB) | ✅ |
| Auth sécurisée (JWT, bcrypt) | ✅ |
| Dockerisation complète | ✅ |
| Data masking (SQL VIEW) | ✅ |
| Limitation login / bruteforce | ✅ |
| CIA analysée et documentée | ✅ |
| Middleware de validation | ✅ |
| Routes protégées | ✅ |
| Interface utilisateur (frontend) | ✅ |
| Suppression / modification compte | ✅ |
| Readme + documentation sécurité | ✅ |

## 📌 Auteur

> Projet réalisé dans le cadre du **Projet Fil Rouge – Sécurisation d’une BDD**  
> Encadré par : *Boris Rose*  
> Réalisé par : **Abdourahman** – Mai 2025
