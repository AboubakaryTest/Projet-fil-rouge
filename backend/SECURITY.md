# Sécurité du backend

## 🔐 Authentification
- JWT avec expiration 1h
- Stockage du token côté client (Vue + Pinia)

## 🔒 Mots de passe
- Hashage avec bcrypt (10 rounds)

## 🚨 Protection brute force
- express-rate-limit sur /login : 3 tentatives par 10 min

## 🧼 Validation
- express-validator sur /register (email, password, username)

## 🔍 CORS
- Origine strictement définie (localhost:5173)

## 🧪 Bonus
- Vue SQL `masked_users` pour masquer les emails
