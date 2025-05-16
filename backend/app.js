require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const rateLimit = require('express-rate-limit');

app.use(express.json());
app.use(cors());

app.use(cors({
  origin: 'http://localhost:8080', // autorise le front Vue.js
  credentials: true                // si tu veux envoyer des cookies ou des headers spéciaux
}));

const userRoutes = require('./routes/user.routes');
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

const pool = require('./config/db');

pool.getConnection()
  .then(conn => {
    console.log('✅ Connexion DB réussie');
    conn.release();
  })
  .catch(err => {
    console.error('❌ Erreur connexion DB:', err);
  });


  // Limiter les requêtes de login : 3 tentatives toutes les 10 minutes
const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 3,
  message: { error: "Trop de tentatives, réessayez plus tard." }
});
