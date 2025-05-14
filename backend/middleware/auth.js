const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'dev-secret';

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(403).json({ error: 'Token requis.' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(403).json({ error: 'Token invalide.' });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // On ajoute les infos du token à la requête
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalide ou expiré.' });
  }
};
