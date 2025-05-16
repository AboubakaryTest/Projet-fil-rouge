CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Vue avec masquage d'email (on ne montre que les 3 premiers caractères)
CREATE OR REPLACE VIEW masked_users AS
SELECT
  id,
  username,
  CONCAT(LEFT(email, 3), '***@***') AS masked_email,
  created_at
FROM users;
