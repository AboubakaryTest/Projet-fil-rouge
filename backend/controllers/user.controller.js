const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

const SECRET = process.env.JWT_SECRET || 'dev-secret';

module.exports = {
  async register(req, res) {
    const { username, email, password } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    const existingUser = await userModel.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email déjà utilisé.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.createUser(username, email, hashedPassword);

    return res.status(201).json({ message: 'Utilisateur créé.' });
  },

  async login(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Email ou mot de passe invalide.' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Email ou mot de passe invalide.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
  expiresIn: '1h'
    });

    return res.status(200).json({ message: 'Connexion réussie.', token });
  },
  async getProfile(req, res) {
    const userId = req.user.id;
    const conn = await pool.getConnection();
    try {
      const result = await conn.query('SELECT id, username, email, created_at FROM users WHERE id = ?', [userId]);
      res.json(result[0]);
    } finally {
      conn.release();
    }
  },

  async updateProfile(req, res) {
    const { username, email } = req.body;
    const userId = req.user.id;
    if (!username || !email) {
      return res.status(400).json({ error: 'Champs requis.' });
    }

    const conn = await pool.getConnection();
    try {
      await conn.query('UPDATE users SET username = ?, email = ? WHERE id = ?', [username, email, userId]);
      res.json({ message: 'Profil mis à jour.' });
    } finally {
      conn.release();
    }
  },

  async deleteProfile(req, res) {
    const userId = req.user.id;
    const conn = await pool.getConnection();
    try {
      await conn.query('DELETE FROM users WHERE id = ?', [userId]);
      res.json({ message: 'Compte supprimé.' });
    } finally {
      conn.release();
    }
  },
  
  async maskedUsers(req, res) {
    const conn = await pool.getConnection();
    try {
      const rows = await conn.query('SELECT * FROM masked_users');
      res.json(rows);
    } finally {
      conn.release();
    }
  }
};
