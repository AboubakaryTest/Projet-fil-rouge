
# 🔐 SECURITY.md – Projet Fil Rouge

## 🛡️ Objectif

Ce document détaille les **mesures de sécurité** mises en œuvre dans le projet full-stack "Fil Rouge" (Vue.js + Express + MariaDB).

---

## ✅ Authentification & Session

- Utilisation de **JWT (JSON Web Tokens)** pour gérer l'authentification.
- Les tokens JWT ont une **durée d’expiration** (1h) pour éviter les sessions longues.
- Les routes critiques sont **protégées par un middleware d’authentification**.

---

## 🔑 Mots de passe & Hachage

- Tous les mots de passe sont hachés avec **bcrypt** avant d’être stockés en base de données.
- Niveau de sécurité : `bcrypt.hash(password, 10)` (10 rounds de salage).
- Aucun mot de passe n’est jamais stocké ou renvoyé en clair.

---

## 🚨 Protection contre les attaques

### Bruteforce
- **express-rate-limit** utilisé pour limiter les tentatives de connexion (max 5 tentatives par 15 min).

### CORS
- Seules les requêtes venant de `http://localhost:5173` sont autorisées par le backend.

### Validation des données
- Utilisation de **express-validator** pour s'assurer que les champs email, mot de passe et nom sont valides avant toute insertion.

### Sanitizing
- Les entrées sont assainies pour éviter les injections et attaques XSS.

---

## 🔐 Data Masking

- Vue SQL nommée `masked_users` créée côté MariaDB.
- Cette vue masque les adresses email (ex: `exa***@***`) pour protéger les informations sensibles lors des affichages publics ou partagés.

---

## 🔒 CIA : Confidentialité, Intégrité, Disponibilité

| Aspect         | Mesures mises en place |
|----------------|------------------------|
| **Confidentialité** | JWT, hashing bcrypt, data masking, CORS |
| **Intégrité**       | Validations des données, contraintes SQL, middleware |
| **Disponibilité**   | Architecture Docker, base persistante, logs & redémarrage facile |

---

## 🔐 Bonnes pratiques futures

- Utiliser HTTPS + certificats SSL en production
- Rotation de clés JWT
- Audit de dépendances avec `npm audit` ou `OWASP Dependency Check`
- Tests de sécurité avec SonarQube ou ZAP Proxy

---

## 📋 Auteur

Projet réalisé dans le cadre du **Projet Fil Rouge – Sécurisation d’une BDD**  
Rédigé par : **Abdourahman**  
Encadré par : *Boris Rose – Mai 2025*
