require('dotenv').config();
const express = require('express');
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:8080', // autorise le front Vue.js
  credentials: true                // si tu veux envoyer des cookies ou des headers spéciaux
}));


const app = express();
app.use(cors());
app.use(express.json());

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
