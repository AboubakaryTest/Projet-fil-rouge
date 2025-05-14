const pool = require('../config/db');

module.exports = {
  async createUser(username, email, hashedPassword) {
    const conn = await pool.getConnection();
    try {
      await conn.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword]
      );
    } finally {
      conn.release();
    }
  },

  async findByEmail(email) {
    const conn = await pool.getConnection();
    try {
      const rows = await conn.query('SELECT * FROM users WHERE email = ?', [email]);
      return rows[0]; // retourne l'utilisateur ou undefined
    } finally {
      conn.release();
    }
  }
};
