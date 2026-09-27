import { pool } from '../config/database.js';
import jwt from 'jsonwebtoken';
export async function getSessionUser(req) {
  const token = req.cookies.authToken;
  if (!token) {
    return null;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
const user = await pool.query(
  'SELECT id, name, email, profileimage FROM users WHERE id = $1',
  [decoded.userId]
);    const userData = user.rows[0];
    if (!userData) {
      return null;
    }
    return userData || null;
  } catch (err) {
    console.error('JWT Verification Failed:', err.message);
    return null;
  }
}
export async function requireLogin(req, res, next) {
  const user = await getSessionUser(req);   // ← await!
  if (!user) {
      res.clearCookie('authToken');
    return res.redirect('/login');
  }

  
  req.user = user;
  next();
}