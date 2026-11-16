import { query } from '../../config/db.js';

// Columns that are safe to send to the client (no password_hash).
const SAFE_COLUMNS = 'id, name, phone, email, profile_pic_url, upi_id, created_at';

export async function createUser({ name, phone, email, passwordHash, upiId, profilePicUrl }) {
  const { rows } = await query(
    `INSERT INTO users (name, phone, email, password_hash, upi_id, profile_pic_url)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING ${SAFE_COLUMNS}`,
    [name, phone || null, email, passwordHash, upiId, profilePicUrl || null]
  );
  return rows[0];
}

// Full row including password_hash, because login needs it to check the password.
export async function findByEmail(email) {
  const { rows } = await query('SELECT * FROM users WHERE email = $1', [email]);
  return rows[0];
}

// Only used to check for duplicates at signup.
export async function findByPhone(phone) {
  const { rows } = await query('SELECT id FROM users WHERE phone = $1', [phone]);
  return rows[0];
}

export async function findById(id) {
  const { rows } = await query(`SELECT ${SAFE_COLUMNS} FROM users WHERE id = $1`, [id]);
  return rows[0];
}